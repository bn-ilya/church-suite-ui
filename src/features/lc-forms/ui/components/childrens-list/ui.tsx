import { Dispatch, SetStateAction } from "react";
import { Input } from "../input/ui";
import { UseFormRegister } from "react-hook-form";
import { IChildrensListProps } from "./ui.props";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { MinusIcon } from "@heroicons/react/16/solid";

export const ChildrensList = ({
  countChildrens,
  setCountChildrens,
  register,
}: IChildrensListProps) => {
  return (
    <div className="flex flex-col col-span-2 gap-4">
      {new Array(countChildrens).fill("").map((_, index) => {
        return (
          <div className="flex items-end col-span-2 gap-2" key={index}>
            <Input
              {...register(`childrens.${index}`)}
              autoFocus={index + 1 === countChildrens}
              type="text"
              label={`Дочерний ${index + 1}`}
              placeholder="Имя Фамилия"
            />
            <Button
              isIconOnly
              variant="faded"
              type="button"
              onClick={() => setCountChildrens((value) => value - 1)}
            >
              <MinusIcon width={16} className="text-primary" />
            </Button>
          </div>
        );
      })}
      <Button
        variant="solid"
        size="sm"
        onClick={() => setCountChildrens((value) => value + 1)}
      >
        <PlusIcon width={16} className="text-zinc-400" />
      </Button>
    </div>
  );
};
