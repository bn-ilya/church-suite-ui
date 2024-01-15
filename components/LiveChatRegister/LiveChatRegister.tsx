"use client";

import { ILiveChatClient } from "@/redux/interfaces/strapiApi/liveChatClient";
import { IFile } from "@/redux/interfaces/strapiApi/upload.interface";
import { useAddLiveChatClientMutation, useUploadImageMutation } from "@/redux/strapiApi";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/16/solid";
import { Button, Chip, Input } from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormData {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  files?: FileList,
  cheque?: Array<IFile['id']>
}

export const LiveChatRegister = () => {
  const filePicker = useRef<HTMLInputElement | null>(null)
  const [filesNames, setFilesNames] = useState<Array<string>>([]);
  const [addLiveChatClient, {isLoading}] = useAddLiveChatClientMutation();
  const [uploadImage, {isLoading: isLoadingImage, isError, error}] = useUploadImageMutation();
  const {register, handleSubmit, formState: {errors}} = useForm<IFormData>();
  
  useEffect(()=>{
    if (!isError) return;
      alert(JSON.stringify(error));
  }, [isError])

  const onSubmit: SubmitHandler<IFormData> = async (formData) => { 
    if (formData.files?.length) {
      const files = await uploadImage(formData.files).unwrap();
      formData.cheque = files.map(file => file.id);
      delete formData.files;
    }
    
    const data: ILiveChatClient = formData;
    await addLiveChatClient(data).unwrap();
  };

  const handleChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let names: Array<string> = []; 
      for(let i = 0; i < e.target.files.length; i++) {
        names.push(e.target.files[i].name);
      }
      setFilesNames(names)
    }
  }

  const inputFiles = register("files");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <Input
        isRequired
        {...register("name", {required: 'Заполните имя'})}
        isInvalid={!!errors?.name}
        errorMessage={errors?.name?.message}
        type="text"
        label="Имя Фамилия"
        placeholder="Петр Петров"
        labelPlacement="outside"
        className="col-span-2"
      />
      <Input
        isRequired
        {...register("city", {required: 'Заполните город'})}
        isInvalid={!!errors?.city}
        errorMessage={errors?.city?.message}
        type="text"
        label="Город"
        placeholder="г. Кропоткин"
        labelPlacement="outside"
        className="col-span-2"
      />
      <Input
        isRequired
        {...register("tel", {required: 'Заполните телефон'})}
        isInvalid={!!errors?.tel}
        errorMessage={errors?.tel?.message}
        type="tel"
        label="Номер телефона"
        placeholder="+7 (xxx) xxx-xx-xx"
        labelPlacement="outside"
        className="col-span-2"
      />
      <Input
        isRequired
        {...register("count", {required: 'Заполните количество'})}
        isInvalid={!!errors?.count}
        errorMessage={errors?.count?.message}
        type="number"
        label="Количество человек (с учетом вас)"
        placeholder="Введите количество "
        labelPlacement="outside"
        className="col-span-2"
      />
      <Input
        {...register("comment")}
        isInvalid={!!errors?.comment}
        errorMessage={errors?.comment?.message}
        label="Комментарий"
        placeholder="Необязательно"
        labelPlacement="outside"
        className="col-span-2"
      />
      <div className="col-span-2">
        <div className="mb-2">
          <span className="text-sm">Чек(и) об оплате</span>
          <p className="text-xs">Обязательно в случае онлайн оплаты!</p>
        </div>
        <Button variant="flat" fullWidth onClick={() => filePicker.current?.click()}>
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
      </div>
      <Button type="submit" color="primary" className="col-span-2">
        Отправить
      </Button> 
    </form>
  )
}