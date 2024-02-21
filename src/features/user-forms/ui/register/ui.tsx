"use client"

import { Button } from "@nextui-org/react"
import { Input } from "../../components/input/ui"
import { useForm } from "react-hook-form";
import { IRegDataUser } from "@/src/shared/api";
import { useCreateOnSubmit } from "../../model/hooks/useCreateOnSubmit";
import { ErrorModal } from "@/src/shared/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserRegisterForm = () => {
  const {onSubmit, isLoading, errorMsg, data} = useCreateOnSubmit()
  const {register, handleSubmit, formState: {errors}} = useForm<IRegDataUser>({mode: "onBlur"});
  const router = useRouter();

  useEffect(()=>{
    if (data) {
      router.push(`/livechat/register/2?phone=${data.phone}`);
    }
  }, [data])

  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <Input
            isRequired
            {...register("name", {required: 'Заполните имя, фамилию'})}
            isInvalid={!!errors?.name}
            errorMessage={errors?.name?.message}
            type="text"
            label="Имя Фамилия"
            placeholder="Петр Петров"
        />
        <Input
          isRequired
          {...register("phone", {required: "Заполниие телефон", pattern: {value: /^[0-9+-]+$/, message: "Используются недопустимые символы"}, minLength: {value: 10, message: "Недостаточно символов. Требуется 10"}, maxLength: {value: 10, message: "Лишние символы. Требуется 10"}})}
          isInvalid={!!errors?.phone}
          errorMessage={errors?.phone?.message}
          type="tel"
          label="Номер телефона"
          placeholder="+7 (xxx) xxx-xx-xx"
        />
        <Button isLoading={isLoading} type="submit" color="primary" className="col-span-2">
          Продолжить
        </Button>
      </form>

      <ErrorModal error={errorMsg} />
    </div>
  ) 
}