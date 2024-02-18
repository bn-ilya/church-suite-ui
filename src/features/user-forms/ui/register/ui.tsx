"use client"

import { Button } from "@nextui-org/react"
import { Input } from "../../components/input/ui"
import { useForm } from "react-hook-form";
import { IRegDataUser } from "@/src/shared/api";
import { useCreateOnSubmit } from "../../model/hooks/useCreateOnSubmit";
import { ErrorModal } from "@/src/shared/ui";

export const UserRegisterForm = () => {
  const {onSubmit, isLoading, errorMsg} = useCreateOnSubmit()
  const {register, watch, handleSubmit, formState: {errors}} = useForm<IRegDataUser>();

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
          {...register("phone", {required: 'Заполните имя, фамилию'})}
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