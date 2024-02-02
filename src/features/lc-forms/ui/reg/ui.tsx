"use client";

import { Accordion, AccordionItem, Button, Divider, Snippet, Switch } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UploadInput } from "@/src/shared/ui";
import { FormDataToSend } from "../../model/type";
import { costRegister } from "../../model/data";
import { SwitchCountClients } from "../components/switch-count-client/ui";
import { useWatchForm } from "../../model/hooks/useWatchForm";
import { useOnSubmit } from "../../model/hooks/useOnSubmit";
import { useRedirectSuccess } from "../../model/hooks/useRedirectSuccess";
import { Input } from "../components/input/ui";

export const LcRegForm = () => {
  const [isShowCount, setIsShowCount] = useState(false);
  const [sumRegister, setSumRegister] = useState(costRegister)
  const {register, watch, handleSubmit, formState: {errors}} = useForm<FormDataToSend>();
  useWatchForm(watch, setSumRegister, costRegister);
  const {onSubmit, isSuccess, isAddingClient, isUploadedImage, data} = useOnSubmit();
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
          {...register("tel", {required: 'Заполните телефон'})}
          isInvalid={!!errors?.tel}
          errorMessage={errors?.tel?.message}
          type="tel"
          label="Номер телефона"
          placeholder="+7 (xxx) xxx-xx-xx"
        />
        <SwitchCountClients setIsShowCount={setIsShowCount} />
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
        <div className="col-span-2 flex flex-col items-center">
          <div className="w-full flex justify-center">
            <span className="text-base font-bold text-success me-2">К оплате:</span>
            <span className="text-base font-bold text-success">{sumRegister}₽</span>
          </div>
          <span className="text-sm text-zinc-500">Стоимость за человека - {costRegister}₽</span>
        </div>
        <Accordion isCompact variant="splitted" className="col-span-2 px-0">
          <AccordionItem key="1" aria-label="Как оплатить?" title={<div className="text-sm">Как оплатить?</div>}>
            <Divider /> 
            <div className="flex flex-col items-center py-6 gap-2">
              <div className="text-sm text-center max-w-[250px]">Необходимо осуществить перевод на номер или карту:</div>
              <Snippet symbol="" size="md" className="font-bold">+7 (928) 41-31-458</Snippet>
              <Snippet symbol="" size="md" className="font-bold">2200 7010 0446 0801</Snippet>
            </div>
          </AccordionItem>
        </Accordion>
        <div className="col-span-2">
          <div className="mb-2">
            <span className="text-sm">Чек(и) об оплате</span>
            <p className="text-xs">Обязательно в случае онлайн оплаты!</p>
          </div>
          <UploadInput refCallback={ref} {...inputFiles} />
        </div>

        <Button isLoading={isAddingClient || isUploadedImage} type="submit" color="primary" className="col-span-2">
          Отправить
        </Button>
      </form>
    </div>
  )
}