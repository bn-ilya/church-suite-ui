"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { ICallInfoModalProps } from './ui.props';
import { PhoneIcon } from '@heroicons/react/16/solid';

export const CallInfoModal: FC<ICallInfoModalProps> = ({isOpen: isOpenProp}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(()=>{
    if (isOpenProp) {
      onOpen()
    }

    return () => onClose();
  }, [isOpenProp])

  return (
    <Modal size='xs' placement='center' backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
                <div className="pt-6 flex flex-col items-center gap-3">
                  <div className="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-green-600 dark:bg-zinc-800">
                    <PhoneIcon width={40} className="text-white dark:text-green-700" />
                  </div>
                  <div className="text-center">Поступит звонок с кодом в голосовом сообщении</div>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="primary" onPress={onClose}>
                Понятненько 
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}