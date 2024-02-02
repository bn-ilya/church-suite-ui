import { FC } from "react"
import { IChecksInfoProps } from "./ui.props"
import { UploadInput } from "@/src/shared/ui"

export const ChecksInfo: FC<IChecksInfoProps> = ({refCallback, ...props}) => {
  return (
    <div className="col-span-2">
      <div className="mb-2">
        <span className="text-sm">Чек(и) об оплате</span>
        <p className="text-xs">Обязательно в случае онлайн оплаты!</p>
      </div>
      <UploadInput refCallback={refCallback} {...props} />
    </div>
  )
}