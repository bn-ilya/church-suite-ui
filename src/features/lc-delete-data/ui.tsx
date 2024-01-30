"use client";

import { useDeleteLiveChatClientMutation } from "@/src/shared/api";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { FC, MouseEvent } from "react";

export const LcDeleteData: FC = () => {
  const params = useSearchParams();
  const id = params.get('id');
  const [deleteData, {isLoading}] = useDeleteLiveChatClientMutation()

  const handleClick = () => {
    if (id) {
      deleteData(Number(id));
    }
  }

  return (
    <Button fullWidth color="danger" variant="light" onClick={handleClick} isLoading={isLoading}>
      Отменить регистрацию
    </Button>
  )
}