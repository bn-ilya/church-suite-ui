"use client";

import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormDataToSend } from "../../model/type";
import { useRouter }  from 'next/navigation';
import { FC, useEffect } from "react";
import { UploadInput } from "@/src/shared/ui";
import { useUpdateLiveChatClientMutation, useUploadImageMutation } from "@/src/shared/api";
import { IFormProps } from "./ui.props";

export const Form: FC<IFormProps> = (props) => {
  const {name, city, tel, count, comment, cheques, id} = props;

  const [updateLiveChatClient, {isLoading: isAddingClient, isSuccess, data}] = useUpdateLiveChatClientMutation();
  const [uploadImage, {isLoading: isUploadedImage, isError, error}] = useUploadImageMutation();
  const router = useRouter();

  const {register, handleSubmit, formState: {errors}} = useForm<FormDataToSend>();

  const onSubmit: SubmitHandler<FormDataToSend> = async (formData) => {     
    if (formData.files?.length) {
      const files = await uploadImage(formData.files).unwrap();
      formData.cheques = files.map(file => file.id);
      delete formData.files;
    }

    const data = {
      body: formData,
      id
    }

    await updateLiveChatClient(data).unwrap();
  };

  useEffect(()=>{
    if (!isSuccess) return;
    router.push(`/livechat/edit/success?id=${data?.data.id}`); 
  }, [isSuccess])

  const {ref, ...inputFiles} = register("files");
  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            isInvalid={!!errors?.name}
            errorMessage={errors?.name?.message}
            type="text"
            label="Имя Фамилия"
            placeholder="Петр Петров"
            labelPlacement="outside"
            className="col-span-2"
            defaultValue={name}
            {...register("name", {required: 'Заполните имя'})}
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
          defaultValue={city}
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
          defaultValue={String(tel)} //Todo 
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
          defaultValue={String(count)}
        />
        <Input
          {...register("comment")}
          isInvalid={!!errors?.comment}
          errorMessage={errors?.comment?.message}
          label="Комментарий"
          placeholder="Необязательно"
          labelPlacement="outside"
          className="col-span-2"
          defaultValue={comment}
        />
        <div className="col-span-2">
          <div className="mb-2">
            <span className="text-sm">Чек(и) об оплате</span>
            <p className="text-xs">Обязательно в случае онлайн оплаты!</p>
          </div>
          <UploadInput refCallback={ref} {...inputFiles} defaultNames={cheques} />
        </div>

        <Button isLoading={isAddingClient || isUploadedImage} type="submit" color="primary" className="col-span-2">
          Отправить
        </Button>
      </form>
    </div>
  )
}