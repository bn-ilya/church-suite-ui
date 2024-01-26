"use client";

import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

export const LcChangeData: FC = () => {
  const params = useSearchParams();
  const id = params.get('id');

  const handleClick = (e: MouseEvent) => {

  }

  return (
    <Button fullWidth color="primary">
      Изменить данные
    </Button>
  )
}