"use client";

import { Button, InputOtp } from "@heroui/react";
import { Input } from "../../components/input/ui";
import { useRouter } from "next/navigation";
import { useConfirmOnSumbit } from "../../model/hooks/useConfirmOnSumbit";
import { useForm } from "react-hook-form";
import { IConfirmDataLogin } from "@/src/shared/api";
import { ErrorHandler } from "@/src/shared/ui";
import { FC, useEffect } from "react";
import { IUserConfirmForm } from "./ui.props";
import { useAppDispatch, useAppSelector } from "@/src/shared/model";
import { setId } from "@/src/entities/user";
import { RepeatVerify } from "@/src/features/repeat-verify";

export const UserConfirmForm: FC<IUserConfirmForm> = ({ redirectPath }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { onSubmit, isLoading, errorInfo, data } = useConfirmOnSumbit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IConfirmDataLogin>();

  useEffect(() => {
    if (data) {
      dispatch(setId({ id: data.user.id.toString() }));
      localStorage.setItem("jwt", data.jwt);
      router.push(redirectPath);
    }
  }, [data]);

  return (
    <div className="max-w-xl w-full mx-auto px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="grid grid-cols-2 gap-1 col-span-2">
          <div className="col-span-2 flex justify-center">
            <InputOtp
              length={4}
              isRequired
              autoFocus
              {...register("code", { required: "Заполните код" })}
              isInvalid={!!errors?.code}
              errorMessage={errors?.code?.message}
              type="text"
              autoComplete="one-time-code"
              label="Код подтверждения"
              placeholder="XXXX"
              onComplete={(e) => handleSubmit(onSubmit)(e)}
            />
          </div>
          <div className="col-span-2">
            <RepeatVerify />
          </div>
        </div>
        <Button
          isLoading={isLoading}
          type="submit"
          color="primary"
          className="col-span-2"
        >
          Продолжить
        </Button>
      </form>

      <ErrorHandler message={errorInfo.errorMsg} code={errorInfo.errorCode} />
    </div>
  );
};
