"use client";

import { Button } from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";

export const LcChangeData: FC = () => {
  const router = useRouter()

  const handleClick = (e: MouseEvent) => {
    router.push(`/profile`);
  }

  return (
    <Button fullWidth color="primary" onClick={handleClick}>
      Изменить данные
    </Button>
  )
}