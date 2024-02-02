"use client";

import { Button, Divider } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormDataToSend } from "../../model/type";
import { costRegister } from "../../model/data";
import { SwitchCountClients } from "../components/switch-count-client/ui";
import { useWatchForm } from "../../model/hooks/useWatchForm";
import { useRegOnSubmit } from "../../model/hooks/useRegOnSubmit";
import { useRedirectSuccess } from "../../model/hooks/useRedirectSuccess";
import { Input } from "../components/input/ui";
import { PayInfo } from "../components/pay-info/ui";
import { ChecksInfo } from "../components/checks-info/ui";

export const LcRegForm = () => {
  const [isShowCount, setIsShowCount] = useState(false);
  const [sumRegister, setSumRegister] = useState(costRegister)
  const {register, watch, handleSubmit, formState: {errors}} = useForm<FormDataToSend>();
  useWatchForm(watch, setSumRegister, costRegister);
  const {onSubmit, isSuccess, isAddingClient, isUploadedImage, data} = useRegOnSubmit();
  useRedirectSuccess(isSuccess, data, 'register');
  const {ref, ...inputFiles} = register("files");

  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <Input
          isRequired
          {...register("name", {required: 'Заполните имя'})}
          isInvalid={!!errors?.name}
          errorMessage={errors?.name?.message}
          type="text"
          label="Имя Фамилия"
          placeholder="Петр Петров"
        />
        <Input
          isRequired
          {...register("city", {required: 'Заполните город'})}
          isInvalid={!!errors?.city}
          errorMessage={errors?.city?.message}
          type="text"
          label="Город"
          placeholder="г. Кропоткин"
        />
        <Input
          isRequired
          {...register("tel", {required: 'Заполните телефон', pattern: /^[\d\+][\d\(\)\ -]{4,14}\d$/})}
          isInvalid={!!errors?.tel}
          errorMessage={errors?.tel?.message}
          type="tel"
          label="Номер телефона"
          placeholder="+7 (xxx) xxx-xx-xx"
        />
        <SwitchCountClients defaultSelected={false} setIsShowCount={setIsShowCount}/>
        {isShowCount && (
          <Input
            {...register("count", {required: 'Заполните количество'})}
            isInvalid={!!errors?.count}
            errorMessage={errors?.count?.message}
            type="number"
            label="Количество человек (с учетом вас)"
            placeholder="Введите количество "
            defaultValue="1"
          />
        )}
        <Input
          {...register("comment")}
          isInvalid={!!errors?.comment}
          errorMessage={errors?.comment?.message}
          label="Комментарий"
          placeholder="Необязательно"
        />
        <Divider className="col-span-2 my-2" />
        <PayInfo sumRegister={sumRegister} />
        <ChecksInfo refCallback={ref} {...inputFiles}/>
        <Button isLoading={isAddingClient || isUploadedImage} type="submit" color="primary" className="col-span-2">
          Отправить
        </Button>
      </form>
    </div>
  )
}