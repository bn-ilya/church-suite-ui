"use client"

import { Button } from "@nextui-org/react"
import { Input } from "../../components/input/ui"
import { useForm } from "react-hook-form";
import { ILoginDataUser } from "@/src/shared/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/shared/model";
import { setPhone } from "@/src/entities/user";
import { useLoginOnSubmit } from "../../model/hooks/useLoginOnSubmit";
import { ErrorHandler, ErrorModal } from "@/src/shared/ui";

export const UserLoginForm = () => {
  const {onSubmit, isLoading, errorInfo, data} = useLoginOnSubmit()
  const {register, handleSubmit, formState: {errors}} = useForm<ILoginDataUser>({mode: "onChange"});
  const router = useRouter();

  useEffect(()=>{
    if (data) {
      localStorage.setItem("id", String(data.id));
      router.push(`/livechat/login/2`);
    }
  }, [data])

  return (
    <div className="max-w-xl w-full mx-auto px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <Input
          startContent={
            <span className="text-[12px] text-zinc-400">+7</span>
          }
          isRequired
          {...register("phone", {required: "Заполниие телефон", pattern: {value: /^[0-9+-]+$/, message: "Используются недопустимые символы"}, minLength: {value: 10, message: "Недостаточно символов. Требуется 10"}, maxLength: {value: 10, message: "Лишние символы. Требуется 10"}})}
          isInvalid={!!errors?.phone}
          errorMessage={errors?.phone?.message}
          type="tel"
          label="Номер телефона"
          placeholder="(xxx) xxx-xx-xx"
        />
        <Button isLoading={isLoading} type="submit" color="primary" className="col-span-2">
          Продолжить
        </Button>
      </form>

      <ErrorHandler message={errorInfo.errorMsg} code={errorInfo.errorCode}/>
    </div>
  ) 
}