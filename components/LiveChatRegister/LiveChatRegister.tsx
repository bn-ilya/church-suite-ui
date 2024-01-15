"use client";

import { ILiveChatClient } from "@/redux/interfaces/strapiApi/liveChatClient";
import { IFile } from "@/redux/interfaces/strapiApi/upload.interface";
import { useAddLiveChatClientMutation, useUploadImageMutation } from "@/redux/strapiApi";
import { Button, Input } from "@nextui-org/react";
import { useEffect } from "react";
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
        <div className="mb-1">
          <span className="text-sm">Чек(и) об оплате</span>
          <p className="text-xs">Обязательно в случае онлайн оплаты!</p>
        </div>
        <Input
          {...register("files")}
          isInvalid={!!errors?.cheque}
          errorMessage={errors?.cheque?.message}
          type="file"
          accept="image/png, image/jpeg"
          multiple
        />
      </div>
      <Button type="submit" color="primary" className="col-span-2">
        Отправить
      </Button> 
    </form>

    // {isError && (
    //   <div>
    //     {error.message}
    //   </div>
    // )}
  )
}