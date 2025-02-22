import { ChangeEvent, FC } from "react";
import { ISwitchCountClients } from "./ui.props";
import { Switch } from "@heroui/react";

export const SwitchCountClients: FC<ISwitchCountClients> = ({
  setIsShowCount,
  isSelected,
  handleSwitch: handleSwitchExternal,
}) => {
  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShowCount(e.target.checked);
    handleSwitchExternal(e.target.checked);
  };

  return (
    <div className="col-span-2 flex gap-2 items-center">
      <Switch onChange={handleSwitch} isSelected={isSelected} />
      <div className="text-sm">Я регистрирую не только себя</div>
    </div>
  );
};
