import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { IErrorModalProps } from "./ui.props";

export const ErrorModal: FC<IErrorModalProps> = ({error, textBtn, onCloseCallback}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(()=>{
    if (error) {
      onOpen()
    }
  }, [error])

  const onCloseHandler = () => {
    onCloseCallback && onCloseCallback();
    onClose();
  }

  return (
    <Modal size='xs' placement='center' backdrop="blur" isOpen={isOpen} onClose={onCloseHandler}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Ошибочка</ModalHeader>
            <ModalBody>
              <p>
                {error}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                {textBtn || 'Понятненько'} 
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}