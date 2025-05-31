import { Modal, ModalContent } from "@heroui/react";
import { FC, useState } from "react";
import { IModalDeleteSubscriptionProps } from "./ui.props";
import { ModalFooterQuestion } from "../modal-footer-question/ui";
import { ModalFooterSuc } from "../modal-footer-suc/ui";
import { ModalBodyQuestion } from "../modal-body-question/ui";
import { ModalBodySuc } from "../modal-body-suc/ui";

export const ModalDeleteSubscription: FC<IModalDeleteSubscriptionProps> = ({
  isOpen,
  onOpenChange,
  submissionId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Получаем токен авторизации из localStorage
      const token = localStorage.getItem("formioToken");

      // Если токена нет, не выполняем запрос
      if (!token) {
        console.error("Токен авторизации не найден");
        setIsLoading(false);
        return;
      }

      // URL для удаления подписки
      const url = `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}/submission/${submissionId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "x-jwt-token": token,
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка при удалении: ${response.statusText}`);
      }

      setIsSuccess(true);
      onSuccess();
    } catch (error) {
      console.error("Ошибка при удалении подписки:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    if (isSuccess) {
      if (onOpenChange) {
        onOpenChange(false);
      }
      setIsSuccess(false);
    }
  };

  return (
    <Modal
      size="xs"
      placement="center"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleCloseSuccess}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {!isSuccess ? (
              <>
                <ModalBodyQuestion />
                <ModalFooterQuestion
                  isLoading={isLoading}
                  onClose={onClose}
                  handleDelete={handleDelete}
                />
              </>
            ) : (
              <>
                <ModalBodySuc />
                <ModalFooterSuc onClose={onClose} />
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
