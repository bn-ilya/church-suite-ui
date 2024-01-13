"use client";

import { useAddFormResultMutation, useUploadImageMutation } from "@/redux/strapiApi";
import { IFile } from "@/redux/strapiApi.interface";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormData {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  file?: FileList,
  cheque?: IFile['id']
}

export const LiveChatRegister = () => {
  const [addFormResult, {isLoading}] = useAddFormResultMutation();
  const [uploadImage, {isLoading: isLoadingImage}] = useUploadImageMutation();
  const {register, handleSubmit, formState: {errors}} = useForm<IFormData>();
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const body = data;
    if (data.file) {
      const files = await uploadImage(data.file[0]).unwrap();
      body.cheque = files[0].id;
    }
    await addFormResult({
      data: body,
    }).unwrap();
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
          {...register("file")}
          isInvalid={!!errors?.cheque}
          errorMessage={errors?.cheque?.message}
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <Button type="submit" color="primary" className="col-span-2">
        Отправить
      </Button> 
    </form>
  )
}