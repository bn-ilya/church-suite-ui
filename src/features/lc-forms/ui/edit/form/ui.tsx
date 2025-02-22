"use client";

import { ErrorHandler } from "@/src/shared/ui";
import { SuccessModal } from "@/src/shared/ui/success-modal";
import { Alert, Button, Chip, Divider } from "@heroui/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { costRegister } from "../../../model/data";
import { useEditOnSubmit } from "../../../model/hooks/useEditOnSubmit";
import { useWatchForm } from "../../../model/hooks/useWatchForm";
import { useWatchPaymentProvenForm } from "../../../model/hooks/useWatchPaymentProvenForm";
import { FormDataToSend } from "../../../model/type";
import { ChecksInfo } from "../../components/checks-info/ui";
import { Input } from "../../components/input/ui";
import { PayInfo } from "../../components/pay-info/ui";
import { IFormProps } from "./ui.props";

export const Form: FC<IFormProps> = (props) => {
  const {
    city,
    count,
    comment,
    cheques,
    id,
    senderName,
    live_chat_client_childrens,
  } = props;

  const isPayment = !!cheques?.length || !!senderName;

  const [sumRegister, setSumRegister] = useState(costRegister * Number(count));
  const [paymentProven, setPaymenProven] = useState(isPayment);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataToSend>();
  useWatchForm(watch, setSumRegister, costRegister);

  useWatchPaymentProvenForm(watch, setPaymenProven);

  const {
    onSubmit,
    isSuccess,
    isAddingClient,
    errors: errorsSubmit,
    isUploadedImage,
  } = useEditOnSubmit({ id, disabled: !paymentProven });
  const { ref, ...inputFiles } = register("files");
  return (
    <div className="max-w-xl w-full mx-auto px-6">
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
          defaultValue={city}
        />
        {!!live_chat_client_childrens?.length && (
          <div className="col-span-2 my-2 flex gap-2 flex-wrap">
            <span className="text-sm text-zinc-400 text-nowrap">
              Вы зарегистрировали:
            </span>

            <div className="flex gap-1 flex-wrap">
              {live_chat_client_childrens.map((child, index) => (
                <Chip key={index} size="sm" variant="flat">
                  {child.name}
                </Chip>
              ))}
            </div>
          </div>
        )}
        <Input
          {...register("comment")}
          isInvalid={!!errors?.comment}
          errorMessage={errors?.comment?.message}
          label="Комментарий"
          placeholder="Не обязательно"
          defaultValue={comment}
        />
        <Divider className="col-span-2 my-2" />
        <PayInfo sumRegister={sumRegister} />
        <ChecksInfo
          refCallback={ref}
          defaultNames={cheques}
          defaultSenderName={senderName}
          registerSenderName={register("senderName")}
          {...inputFiles}
        />
        {!paymentProven && (
          <Alert className="col-span-2" color="primary">
            Для регистрации необходимо сделать оплату
          </Alert>
        )}
        <Button
          isDisabled={!paymentProven}
          isLoading={isAddingClient || isUploadedImage}
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

      <SuccessModal message={isSuccess ? "Данные обновлены" : ""} />
    </div>
  );
};
