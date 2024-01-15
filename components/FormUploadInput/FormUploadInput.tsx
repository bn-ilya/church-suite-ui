import { ChangeEvent, FC, MouseEvent, useRef, useState } from 'react';
import { IFormUploadInputProps } from './FormUploadInput.interface';
import { Button, Chip } from '@nextui-org/react';
import { CheckCircleIcon } from '@heroicons/react/16/solid';

export const FormUploadInput: FC<IFormUploadInputProps> = ({register}) => {
  const filePicker = useRef<HTMLInputElement | null>(null)
  const [filesNames, setFilesNames] = useState<Array<string>>([]);
  
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

  const inputFiles = register("files");
  return (
    <>
      <Button variant="flat" fullWidth onClick={handleClickButton}>
        Прикрепить чек(и)
      </Button> 
      <input
        className="hidden-accessibility"
        {...inputFiles}
        onChange={(e) => {
          inputFiles.onChange(e);
          handleChangeFiles(e);
        }}
        ref={(e) => {
          inputFiles.ref(e);
          filePicker.current = e;
        }}
        type="file"
        multiple
      />
      {!!filesNames.length && (
        <div className="p-3 border-2 rounded-xl border-zinc-700 mt-2">
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
