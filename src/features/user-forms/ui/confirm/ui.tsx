"use client";

import { Button } from "@nextui-org/react"
import { Input } from "../../components/input/ui"
import { useRouter, useSearchParams } from "next/navigation";
import { useConfirmOnSumbit } from "../../model/hooks/useConfirmOnSumbit";
import { useForm } from "react-hook-form";
import { IConfirmDataLogin } from "@/src/shared/api";
import { ErrorModal } from "@/src/shared/ui";
import { FC, useEffect } from "react";
import { IUserConfirmForm } from "./ui.props";
import { useAppDispatch, useAppSelector } from "@/src/shared/model";
import { setId } from "@/src/entities/user";

export const UserConfirmForm: FC<IUserConfirmForm> = ({redirectPath}) => {
  const phone = useAppSelector(store => store.userSlice.phone);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const {onSubmit, isLoading, errorMsg, data} = useConfirmOnSumbit(phone);
  const {register, handleSubmit, formState: {errors}} = useForm<IConfirmDataLogin>();

  useEffect(() => {
    if (data) {
      dispatch(setId({id: data.user.id.toString()}))
      document.cookie = `Authorization=Bearer ${data.jwt}`;
      router.push(redirectPath);
    }
  }, [data])

  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <Input
          isRequired
          {...register("code", {required: 'Заполните код'})}
          isInvalid={!!errors?.code}
          errorMessage={errors?.code?.message}
          type="tel"
          label="Код подтверждения"
          placeholder="XXXX"
        />
        <Button isLoading={isLoading} type="submit" color="primary" className="col-span-2">
          Продолжить
        </Button>
      </form>

      <ErrorModal error={errorMsg} />
    </div>
  )
} 