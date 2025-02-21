import {Input as InputNext, InputProps} from "@heroui/react";
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputNext
      labelPlacement="outside"
      className="col-span-2"
      {...props}
      ref={ref}
    />
  )  
})

Input.displayName = "Input"