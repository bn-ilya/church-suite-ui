import { FC, useEffect } from 'react';
import { IControllerProps } from './ui.props';
import { IGetLiveChatClientDataRes, useLazyGetLiveChatClientByCodeQuery, useLazyGetLiveChatClientQuery } from '@/src/shared/api';
import { Form } from '../form/ui';
import { prepareFormData } from '../../lib/helpers/prepare-form-data';
import { Skeleton } from '../skeleton/ui';

const renderForm = (data: IGetLiveChatClientDataRes) => {
  const formData = prepareFormData(data);
  return <Form {...formData} id={data.id} />
}

export const Controller: FC<IControllerProps> = ({id, code}) => {
  const [getById, {data: dataById, isFetching: idFetchingById}] = useLazyGetLiveChatClientQuery();
  const [getByCode, {data: dataByCode, isFetching: idFetchingByCode}] = useLazyGetLiveChatClientByCodeQuery();
  
  useEffect(()=>{
    if (id) {
      getById(id);
    } else if (code) {
      getByCode(code);
    }
  }, [])

  if (idFetchingById || idFetchingByCode) return <Skeleton />

  if (dataById) {
    return renderForm(dataById);
  } else if (dataByCode) {
    return renderForm(dataByCode);
  }
};

