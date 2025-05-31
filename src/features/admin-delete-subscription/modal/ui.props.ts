import { ModalProps } from "@heroui/react";

export interface IModalDeleteSubscriptionProps
  extends Omit<ModalProps, "children"> {
  submissionId: string;
  onSuccess: () => void;
}
