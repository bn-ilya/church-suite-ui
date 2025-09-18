import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from "@heroui/react";
import { UserWithSubmission } from "../types";

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserWithSubmission | null;
  localUpdates: Record<string, boolean | undefined>;
  onMarkPresent: (user: UserWithSubmission) => void;
  onMarkAbsent: (user: UserWithSubmission) => void;
}

export const UserInfoModal = ({
  isOpen,
  onClose,
  user,
  localUpdates,
  onMarkPresent,
  onMarkAbsent,
}: UserInfoModalProps) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          <h3>Информация о пользователе</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">
                {user.firstName} {user.lastName}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="font-medium">{user.email || "Не указан"}</p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Чек:</span>
                <p className="font-medium">{user.check || "Не указан"}</p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Телефон:</span>
                <p className="font-medium">{user.phone || "Не указан"}</p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Статус оплаты:</span>
                <div className="mt-1">
                  <Chip
                    color={user.isPaid ? "success" : "warning"}
                    variant="flat"
                    size="sm"
                  >
                    {user.isPaid ? "Оплачено" : "Не оплачено"}
                  </Chip>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Присутствие:</span>
                <div className="mt-1">
                  <Chip
                    color={
                      localUpdates[user._id] !== undefined
                        ? localUpdates[user._id]
                          ? "success"
                          : "default"
                        : user.isPresent
                        ? "success"
                        : "default"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {localUpdates[user._id] !== undefined
                      ? localUpdates[user._id]
                        ? "Пришел"
                        : "Не пришел"
                      : user.isPresent
                      ? "Пришел"
                      : "Не пришел"}
                  </Chip>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Сумма к оплате:</span>
                <p className="font-medium">
                  {user.total.toLocaleString("ru-RU")} ₽
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Оплачено:</span>
                <p className="font-medium">
                  {user.paid_amount.toLocaleString("ru-RU")} ₽
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Закрыть
          </Button>
          {(
            localUpdates[user._id] !== undefined
              ? !localUpdates[user._id]
              : !user.isPresent
          ) ? (
            <Button
              color="success"
              onPress={() => {
                onMarkPresent(user);
                onClose();
              }}
            >
              Отметить как пришедшего
            </Button>
          ) : (
            <Button
              color="warning"
              onPress={() => {
                onMarkAbsent(user);
                onClose();
              }}
            >
              Отметить как не пришедшего
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
