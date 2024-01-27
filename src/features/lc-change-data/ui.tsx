"use client";

import { Button } from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";

export const LcChangeData: FC = () => {
  const params = useSearchParams();
  const id = params.get('id');
const router = useRouter()

  const handleClick = (e: MouseEvent) => {
    router.push(`/livechat/edit/?id=${id}`);
  }

  return (
    <Button fullWidth color="primary" onClick={handleClick}>
      Изменить данные
    </Button>
  )
}