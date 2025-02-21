import { Button, ModalFooter } from "@heroui/react"
import { FC } from "react"
import { IModalFooterQuestionProps } from "./ui.props"

export const ModalFooterQuestion: FC<IModalFooterQuestionProps> = ({isLoading, onClose, handleDelete}) => {
  return (
    <ModalFooter>
      <div className="grid grid-cols-2 w-full">
        <Button className="col-span-1" color="danger" variant="light" onPress={onClose}>
          Отмена
        </Button>
        <Button isLoading={isLoading} className="col-span-1" color="primary" onPress={handleDelete}>
          Я уверен
        </Button>
      </div>
    </ModalFooter>
  )
}