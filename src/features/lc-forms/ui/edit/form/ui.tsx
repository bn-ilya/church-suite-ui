"use client";

import { Button, Divider } from "@nextui-org/react";
import { FormDataToSend } from "../../../model/type";
import { FC, useState } from "react";
import { ErrorHandler } from "@/src/shared/ui";
import { IFormProps } from "./ui.props";
import { costRegister } from "../../../model/data";
import { useWatchForm } from "../../../model/hooks/useWatchForm";
import { useEditOnSubmit } from "../../../model/hooks/useEditOnSubmit";
import { useForm } from "react-hook-form";
import { SwitchCountClients } from "../../components/switch-count-client/ui";
import { PayInfo } from "../../components/pay-info/ui";
import { ChecksInfo } from "../../components/checks-info/ui";
import { Input } from "../../components/input/ui";
import { SuccessModal } from "@/src/shared/ui/success-modal";

export const Form: FC<IFormProps> = (props) => {
  const {city, count, comment, cheques, id, senderName} = props;

  const [isShowCount, setIsShowCount] = useState(Number(count) > 1 ? true : false);
  const [sumRegister, setSumRegister] = useState(costRegister * Number(count));
  const {register, watch, handleSubmit, formState: {errors}} = useForm<FormDataToSend>();
  useWatchForm(watch, setSumRegister, costRegister);
  const {onSubmit, isSuccess, isAddingClient, errors: errorsSubmit, isUploadedImage, data} = useEditOnSubmit(id);
  const {ref, ...inputFiles} = register("files");
  return (
    <div className="max-w-xl w-full mx-auto px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <Input
          isRequired
          {...register("city", {required: 'Заполните город'})}
          isInvalid={!!errors?.city}
          errorMessage={errors?.city?.message}
          type="text"
          label="Город"
          placeholder="г. Кропоткин"
          defaultValue={city}
        />
        <SwitchCountClients defaultSelected={isShowCount} setIsShowCount={setIsShowCount} />
        {isShowCount && (
          <Input
            {...register("count", {required: 'Заполните количество'})}
            isInvalid={!!errors?.count}
            errorMessage={errors?.count?.message}
            type="number"
            label="Количество человек (с учетом вас)"
            placeholder="Введите количество "
            defaultValue={String(count)}
          />
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
        <ChecksInfo refCallback={ref} defaultNames={cheques} defaultSenderName={senderName} registerSenderName={register("senderName")} {...inputFiles}/>
        <Button isLoading={isAddingClient || isUploadedImage} type="submit" color="primary" className="col-span-2">
          Отправить
        </Button>
      </form>

      {errorsSubmit.map((error, index) => {
        return <ErrorHandler message={error.errorMsg} code={error.errorCode} key={index} />
      })}

      <SuccessModal message={isSuccess ? "Данные обновлены" : ''} />
    </div>
  )
}