"use client";

import { Button, useDisclosure } from "@heroui/react";
import { FC } from "react";
import { ModalDelete } from "../modal/ui";

export const ButtonDelete: FC = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <Button fullWidth color="danger" variant="light" onPress={onOpen}>
      Отменить регистрацию
    </Button>
    <ModalDelete isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
    
  )
}