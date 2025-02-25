"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Snippet, useDisclosure } from "@heroui/react";
import { FC, useEffect } from "react";
import { ISupportInfoModalProps } from './ui.props';
import { useRouter } from "next/navigation";

export const SupportInfoModal: FC<ISupportInfoModalProps> = ({isOpen: isOpenProp, onClose: onCloseProp}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();

  useEffect(()=>{
    if (isOpenProp) {
      onOpen()
    }

    return () => onClose();
  }, [isOpenProp])

  const handleClickTelegram = () => {
    router.push("https://t.me/ilyusha_bn")
  }

  const handleClose = () => {
    onClose();
    onCloseProp && onCloseProp();
  }

  return (
    <Modal size='xs' placement='center' backdrop="blur" isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="pt-6 flex flex-col items-center gap-3">
                <Snippet hideSymbol size="md" className="font-bold" hideCopyButton>+7 (928) 41-31-458</Snippet>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClickTelegram} fullWidth color="primary" onPress={onClose}>
                Telegram 
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}