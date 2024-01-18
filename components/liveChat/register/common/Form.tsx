"use client";

import { ILiveChatClient } from "@/redux/interfaces/strapiApi/liveChatClient";
import { useAddLiveChatClientMutation, useUploadImageMutation } from "@/redux/strapiApi";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LiveChatFormData } from "@/utils/types/LiveChatFormData.interface";
import {useRouter}  from 'next/navigation';
import { useEffect } from "react";
import { FormUploadInput } from "@/components/FormUploadInput/FormUploadInput";

export const Form = () => {
  const [addLiveChatClient, {isLoading: isAddingClient, isSuccess, data}] = useAddLiveChatClientMutation();
  const [uploadImage, {isLoading: isUploadedImage, isError, error}] = useUploadImageMutation();
  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm<LiveChatFormData>();

  const onSubmit: SubmitHandler<LiveChatFormData> = async (formData) => { 
    if (formData.files?.length) {
      const files = await uploadImage(formData.files).unwrap();
      formData.cheque = files.map(file => file.id);
      delete formData.files;
    }
    
    const data: ILiveChatClient = formData;
    await addLiveChatClient(data).unwrap();
  };

  useEffect(()=>{
    if (!isSuccess) return;
    router.push(`/livechat/register/success?id=${data?.data.id}`,); 
  }, [isSuccess])

  return (
    <>
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
          <FormUploadInput register={register} />
        </div>

        <Button isLoading={isAddingClient || isUploadedImage} type="submit" color="primary" className="col-span-2">
          Отправить
        </Button>
      </form>
    </>
  )
}