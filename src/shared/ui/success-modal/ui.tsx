"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { ISuccessModalProps } from './ui.props';
import { CheckIcon } from '@heroicons/react/16/solid';

export const SuccessModal: FC<ISuccessModalProps> = ({message, textBtn, onCloseCallback}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(()=>{
    if (message) {
      onOpen()
    }

    return () => onClose();
  }, [message])

  const onCloseHandler = () => {
    onClose();
    onCloseCallback && onCloseCallback();
  }

  return (
    <Modal size='xs' placement='center' backdrop="blur" isOpen={isOpen} onClose={onCloseHandler}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
                <div className="pt-6 flex flex-col items-center gap-3">
                  <div className="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-green-600 dark:bg-zinc-800">
                    <CheckIcon width={40} className="text-white dark:text-green-700" />
                  </div>
                  <div className="text-center">{message}</div>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="primary" onPress={onClose}>
                {textBtn || 'Понятненько'} 
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}