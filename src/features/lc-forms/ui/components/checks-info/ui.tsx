import { FC } from "react"
import { IChecksInfoProps } from "./ui.props"
import { UploadInput } from "@/src/shared/ui"
import {Accordion, AccordionItem, Checkbox, Divider} from "@heroui/react";
import { Input } from "../input/ui";

export const ChecksInfo: FC<IChecksInfoProps> = ({refCallback, registerSenderName, defaultSenderName, ...props}) => {
  
  
  return (
    <div className="col-span-2">
      <div className="mb-2">
        <span className="text-sm">Чек(и) об оплате</span>
        <p className="text-xs">Обязательно в случае онлайн оплаты!</p>
      </div>
      <UploadInput refCallback={refCallback} {...props} />
      <Accordion isCompact variant="splitted" className="mt-2 col-span-2 px-0">
        <AccordionItem aria-label="" title={<div className="text-sm">Не получается пркирепить чек?</div>}>
        <Divider /> 
        <div className="flex flex-col py-6 gap-2">
          <p className="text-sm">Введите точное имя отправителя (из чека), мы свяжимся с вами позже, чтобы получить чек другим способом</p>
          <Input
              {...registerSenderName}
              label=""
              placeholder="Владимир Владимирович Владимов"
              defaultValue={defaultSenderName}
            />
            </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 