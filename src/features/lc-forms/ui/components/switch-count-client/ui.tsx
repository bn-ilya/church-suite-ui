import { ChangeEvent, FC } from "react"
import { ISwitchCountClients } from "./ui.props";
import { Switch } from "@nextui-org/react";

export const SwitchCountClients: FC<ISwitchCountClients> = ({setIsShowCount}) => {
  
  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShowCount(e.target.checked);
  }
  
  return (
    <div className="col-span-2 flex gap-2 items-center">
      <Switch onChange={handleSwitch}/>
      <div className="text-sm">Я регистрирую не только себя</div>
    </div>
  )
}