import { Button, useDisclosure } from "@heroui/react";
import { FC } from "react";
import { IDeleteSubscriptionButtonProps } from "./ui.props";
import { ModalDeleteSubscription } from "../modal/ui";
import { TrashIcon } from "@heroicons/react/24/outline";

export const DeleteSubscriptionButton: FC<IDeleteSubscriptionButtonProps> = ({
  submissionId,
  onSuccess,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="danger"
        variant="flat"
        size="md"
        onPress={onOpen}
        className="w-full mt-2"
        startContent={<TrashIcon className="w-5 h-5" />}
      >
        Удалить
      </Button>

      <ModalDeleteSubscription
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        submissionId={submissionId}
        onSuccess={onSuccess}
      />
    </>
  );
};
