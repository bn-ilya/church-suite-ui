import { Modal, ModalContent } from "@nextui-org/react"
import { FC } from "react"
import { IModalDeleteProps } from "./ui.props"
import { useRouter } from "next/navigation"
import { useDeleteUserMutation } from "@/src/shared/api"
import { ModalFooterQuestion } from "../modal-footer-question/ui"
import { ModalFooterSuc } from "../modal-footer-suc/ui"
import { ModalBodyQuestion } from "../modal-body-question/ui"
import { ModalBodySuc } from "../modal-body-suc/ui"

export const ModalDelete: FC<IModalDeleteProps> = ({isOpen, onOpenChange}) => {
  const router = useRouter();

  const [deleteUser, {isLoading, isSuccess}] = useDeleteUserMutation()

  const handleDelete = () => {
    deleteUser();
  }

  const handleCloseSuccess = () => {
    if (isSuccess) {
      router.push('/livechat/register/1');
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