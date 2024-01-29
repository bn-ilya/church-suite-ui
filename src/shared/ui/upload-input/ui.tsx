"use client"

import { ChangeEvent, FC, MouseEvent, useRef, useState } from 'react';
import { IUploadInputProps } from './ui.props';
import { Button, Chip } from '@nextui-org/react';
import { CheckCircleIcon } from '@heroicons/react/16/solid';

export const UploadInput: FC<IUploadInputProps> = ({refCallback, defaultNames, ...props}) => {
  const filePicker = useRef<HTMLInputElement | null>(null)
  const [filesNames, setFilesNames] = useState<Array<string>>(defaultNames || []);
  
  const handleChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let names: Array<string> = []; 
      for(let i = 0; i < e.target.files.length; i++) {
        names.push(e.target.files[i].name);
      }
      setFilesNames(names)
    }
  }

  const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    filePicker.current?.click();
  }

  return (
    <>
      <Button variant="flat" fullWidth onClick={handleClickButton}>
        Прикрепить чек(и)
      </Button> 
      <input
        className="hidden-accessibility"
        {...props}
        onChange={(e) => {
          props.onChange?.(e);
          handleChangeFiles(e);
        }}
        ref={(element) => {
          refCallback?.(element);
          filePicker.current = element;
        }}
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
        type="file"
        multiple
      />
      {!!filesNames.length && (
        <div className="p-3 border-2 rounded-xl light:border-zinc-300 dark:border-zinc-700 mt-2">
          <div className="text-sm mb-2">Прикрепленные файлы:</div>
          <div className="flex gap-2 flex-wrap">
            {filesNames.map((fileName, index) => (
              <Chip key={index} startContent={<CheckCircleIcon width={16} />} variant="faded" color="success" className="overflow-hidden [&>span]:text-nowrap [&>span]:text-ellipsis [&>span]:overflow-hidden">
                {fileName}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </>
  )
};

