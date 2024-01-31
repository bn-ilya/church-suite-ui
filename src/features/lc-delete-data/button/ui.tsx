"use client";

import { useDeleteLiveChatClientMutation } from "@/src/shared/api";
import { Button, useDisclosure } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { ModalDelete } from "../modal/ui";

export const ButtonDelete: FC = () => {
  const params = useSearchParams();
  const id = params.get('id');
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [deleteData, {isLoading}] = useDeleteLiveChatClientMutation()

  const handleClick = () => {
    if (id) {
      deleteData(Number(id));
    }
  }

  return (
    <>
    <Button fullWidth color="danger" variant="light" onPress={onOpen}>
      Отменить регистрацию
    </Button>
    <ModalDelete isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
    
  )
}