import { FC } from 'react';
import { IControllerProps } from './ui.props';
import { useGetLiveChatClientQuery } from '@/src/shared/api';
import { Form } from '../form/ui';
import { prepareFormData } from '../../lib/helpers/prepare-form-data';

export const Controller: FC<IControllerProps> = ({id}) => {
  const {data, isLoading} = useGetLiveChatClientQuery(id, {refetchOnMountOrArgChange: true});
  
  if (isLoading && !data) return <div>Загрузка</div>

  if (data) {
    const formData = prepareFormData(data);
    return <Form {...formData} id={id} />
  }
};

