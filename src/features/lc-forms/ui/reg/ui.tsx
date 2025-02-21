"use client";

import { Button, Divider } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormDataToSend } from "../../model/type";
import { costRegister } from "../../model/data";
import { SwitchCountClients } from "../components/switch-count-client/ui";
import { useRegOnSubmit } from "../../model/hooks/useRegOnSubmit";
import { useRedirectSuccess } from "../../model/hooks/useRedirectSuccess";
import { Input } from "../components/input/ui";
import { PayInfo } from "../components/pay-info/ui";
import { ChecksInfo } from "../components/checks-info/ui";
import { ErrorHandler } from "@/src/shared/ui";
import { ChildrensList } from "../components/childrens-list/ui";
import { countUsersByDefault } from "../../model/constatns";

export const LcRegForm = () => {
  const [isShowCount, setIsShowCount] = useState(false);
  const [countChildrens, setCountChildrens] = useState(0);
  const [sumRegister, setSumRegister] = useState(costRegister);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataToSend>();

  useEffect(() => {
    setSumRegister((countChildrens + countUsersByDefault) * costRegister);
  }, [countChildrens]);

  const {
    onSubmit,
    isSuccess,
    isLoading,
    errors: errorsSubmit,
    data,
  } = useRegOnSubmit();

  useRedirectSuccess(isSuccess, "register");
  const { ref, ...inputFiles } = register("files");

  useEffect(() => {
    if (isShowCount) {
      setCountChildrens(1);
    } else {
      setCountChildrens(0);
    }
  }, [isShowCount]);

  return (
    <div className="max-w-xl mx-auto px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <Input
          isRequired
          {...register("city", { required: "Заполните город" })}
          isInvalid={!!errors?.city}
          errorMessage={errors?.city?.message}
          type="text"
          label="Город"
          placeholder="г. Кропоткин"
        />
        <SwitchCountClients
          isSelected={isShowCount}
          setIsShowCount={setIsShowCount}
        />
        {isShowCount && (
          <ChildrensList
            setIsShowCount={setIsShowCount}
            countChildrens={countChildrens}
            register={register}
            setCountChildrens={setCountChildrens}
          />
        )}
        <Input
          {...register("comment")}
          isInvalid={!!errors?.comment}
          errorMessage={errors?.comment?.message}
          label="Комментарий"
          placeholder="Не обязательно"
        />
        <Divider className="col-span-2 my-2" />
        <PayInfo sumRegister={sumRegister} />
        <ChecksInfo
          refCallback={ref}
          registerSenderName={{ ...register("senderName") }}
          {...inputFiles}
        />
        <Button
          isLoading={isLoading}
          type="submit"
          color="primary"
          className="col-span-2"
        >
          Отправить
        </Button>
      </form>

      {errorsSubmit.map((error, index) => {
        return (
          <ErrorHandler
            message={error.errorMsg}
            code={error.errorCode}
            key={index}
          />
        );
      })}
    </div>
  );
};
