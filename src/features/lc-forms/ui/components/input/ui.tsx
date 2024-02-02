import {Input as InputNext, InputProps} from '@nextui-org/react';
import { FC } from 'react';

export const Input: FC<InputProps> = (props) => {
  return (
    <InputNext
      labelPlacement="outside"
      className="col-span-2"
      {...props}
    />
  )  
}