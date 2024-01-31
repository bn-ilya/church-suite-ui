import { Button, ModalFooter } from "@nextui-org/react"
import { FC } from "react"
import { IModalFooterSucProps } from "./ui.props"

export const ModalFooterSuc: FC<IModalFooterSucProps> = ({onClose}) => {
  return (
    <ModalFooter>
      <Button fullWidth color="primary" onPress={onClose}>
        Отлично!
      </Button>
    </ModalFooter>

  )
}