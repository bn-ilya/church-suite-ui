import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { FC } from "react"
import { IModalDeleteProps } from "./ui.props"
import { TrashIcon } from "@heroicons/react/16/solid"
import { useRouter, useSearchParams } from "next/navigation"
import { useDeleteLiveChatClientMutation } from "@/src/shared/api"
import { ModalFooterQuestion } from "../modal-footer-question/ui"
import { ModalFooterSuc } from "../modal-footer-suc/ui"
import { ModalBodyQuestion } from "../modal-body-question/ui"
import { ModalBodySuc } from "../modal-body-suc/ui"

export const ModalDelete: FC<IModalDeleteProps> = ({isOpen, onOpenChange}) => {
  const params = useSearchParams();
  const id = params.get('id');
  const router = useRouter();

  const [deleteData, {isLoading, isSuccess}] = useDeleteLiveChatClientMutation()

  const handleDelete = () => {
    if (id) {
      deleteData(Number(id));
    }
  }

  const handleCloseSuccess = () => {
    if (isSuccess) {
      router.push('/livechat/register/');
    }
  }

  return (
    <Modal size='xs' placement='center' backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleCloseSuccess}>
        <ModalContent>
          {(onClose) => (
            <>
              {
                !isSuccess
                ?
                  <>
                    <ModalBodyQuestion />
                    <ModalFooterQuestion isLoading={isLoading} onClose={onClose} handleDelete={handleDelete} />
                  </>
                :
                  <>
                    <ModalBodySuc />
                    <ModalFooterSuc onClose={onClose}/>
                  </>
              }
            </>
          )}
        </ModalContent>
      </Modal>
  )
}