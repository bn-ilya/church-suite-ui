import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";
import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserWithSubmission } from "../types";

interface UsersTableProps {
  users: UserWithSubmission[];
  localUpdates: Record<string, boolean | undefined>;
  isPresenceRequestPending: boolean;
  onMarkPresent: (user: UserWithSubmission) => void;
  onMarkAbsent: (user: UserWithSubmission) => void;
  onUpdateAmount: (
    user: UserWithSubmission,
    field: "total" | "paid_amount",
    value: number
  ) => void;
}

export const UsersTable = ({
  users,
  localUpdates,
  isPresenceRequestPending,
  onMarkPresent,
  onMarkAbsent,
  onUpdateAmount,
}: UsersTableProps) => {
  return (
    <div className="mt-6">
      <Table
        aria-label="Таблица пользователей"
        classNames={{
          wrapper: "w-full",
          tr: "hover:bg-default-100 transition-colors",
        }}
      >
        <TableHeader>
          <TableColumn>ИМЯ</TableColumn>
          <TableColumn>ТЕЛЕФОН</TableColumn>
          <TableColumn>СТАТУС ОПЛАТЫ</TableColumn>
          <TableColumn>КОММЕНТАРИЙ</TableColumn>
          <TableColumn>ПРИСУТСТВИЕ</TableColumn>
          <TableColumn>ДЕЙСТВИЯ</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.phone || "—"}</TableCell>
              <TableCell>
                <Chip
                  color={user.isPaid ? "success" : "warning"}
                  variant="flat"
                  size="sm"
                >
                  {user.isPaid ? "Оплачено" : "Не оплачено"}
                </Chip>
              </TableCell>
              <TableCell>
                <span className="text-sm">{user.comment || "—"}</span>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    as="a"
                    href={`/admin/submission/${user.submissionId}`}
                    target="_blank"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </Button>
                  {(
                    localUpdates[user._id] !== undefined
                      ? !localUpdates[user._id]
                      : !user.isPresent
                  ) ? (
                    <Button
                      isIconOnly
                      size="sm"
                      color="success"
                      variant="light"
                      isDisabled={isPresenceRequestPending}
                      onPress={() => onMarkPresent(user)}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="light"
                      isDisabled={isPresenceRequestPending}
                      onPress={() => onMarkAbsent(user)}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
