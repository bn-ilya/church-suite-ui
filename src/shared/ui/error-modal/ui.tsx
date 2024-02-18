import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { IErrorModalProps } from "./ui.props";

export const ErrorModal: FC<IErrorModalProps> = ({error}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(()=>{
    if (error) {
      onOpen()
    }
  }, [error])

  return (
    <Modal size='xs' placement='center' backdrop="blur" isOpen={isOpen} onClose={onClose}>
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
                Понятненько
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}