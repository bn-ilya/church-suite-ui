import { FC, useEffect } from 'react';
import { ISuccessModalProps } from './SuccessModal.interface';
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Snippet, useDisclosure } from '@nextui-org/react';

export const SuccessModal: FC<ISuccessModalProps> = ({isSuccess, id}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  useEffect(()=>{
    if (!isSuccess) return;
    onOpen();
  }, [isSuccess])

  return (  
  <Modal
    isOpen={isOpen} 
    placement="bottom"
    onOpenChange={onOpenChange} 
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Вы зарегистрированны 🎉</ModalHeader>
          <ModalBody>
            <Divider/>
              <div className="flex flex-col items-center p-3 gap-2">
                  <div className="text-base">Ваш код:</div>
                  <Snippet symbol="" size="lg" className="text-4xl font-bold">{id}</Snippet>
              </div>
            <Divider/>
            <p> 
              Обязательно сохраните код регистрации. Его необходимо будет предъявить при регистрации на конференции, а так же он понадобится для изменения данных о регистрации.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Закрыть
            </Button>
            <Button color="primary" onPress={onClose}>
              Изменить данные
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  )
};

