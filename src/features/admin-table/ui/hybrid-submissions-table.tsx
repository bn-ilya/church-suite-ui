import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Input,
} from "@heroui/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { GroupedSubmission } from "../types";

interface HybridSubmissionsTableProps {
  submissions: GroupedSubmission[];
  localUpdates: Record<string, boolean | undefined>;
  onMarkPresent: (submissionId: string, userId: string) => void;
  onMarkAbsent: (submissionId: string, userId: string) => void;
  onUpdateAmount: (
    submission: GroupedSubmission,
    field: "total" | "paid_amount",
    value: number
  ) => void;
}

export const HybridSubmissionsTable = ({
  submissions,
  localUpdates,
  onMarkPresent,
  onMarkAbsent,
  onUpdateAmount,
}: HybridSubmissionsTableProps) => {
  const allRows: Array<{
    key: string;
    submission: GroupedSubmission;
    user: any;
    userIndex: number;
    isFirstUser: boolean;
    isLastUser: boolean;
    groupStyles: string;
  }> = [];

  // Подготавливаем все строки с информацией о группировке
  submissions.forEach((submission) => {
    const userCount = submission.users.length;

    submission.users.forEach((user, userIndex) => {
      const isFirstUser = userIndex === 0;
      const isLastUser = userIndex === userCount - 1;

      // Определяем стили для группировки
      let groupStyles = "";
      if (userCount > 1) {
        if (isFirstUser) {
          groupStyles =
            "border-t-2 border-l-2 border-r-2 border-blue-200 bg-blue-50/30";
        } else if (isLastUser) {
          groupStyles =
            "border-b-2 border-l-2 border-r-2 border-blue-200 bg-blue-50/30";
        } else {
          groupStyles = "border-l-2 border-r-2 border-blue-200 bg-blue-50/30";
        }
      }

      allRows.push({
        key: `${submission._id}_${userIndex}`,
        submission,
        user,
        userIndex,
        isFirstUser,
        isLastUser,
        groupStyles,
      });
    });
  });

  return (
    <div className="mt-6">
      <Table aria-label="Таблица регистраций">
        <TableHeader>
          <TableColumn>УЧАСТНИКИ</TableColumn>
          <TableColumn>К ОПЛАТЕ</TableColumn>
          <TableColumn>ОПЛАЧЕНО</TableColumn>
          <TableColumn>СТАТУС ОПЛАТЫ</TableColumn>
          <TableColumn>КОММЕНТАРИЙ</TableColumn>
          <TableColumn>ПРИСУТСТВИЕ</TableColumn>
          <TableColumn>ДЕЙСТВИЯ</TableColumn>
        </TableHeader>
        <TableBody>
          {allRows.map((row) => {
            const userId = row.key;
            const isPresent =
              localUpdates[userId] !== undefined
                ? localUpdates[userId]
                : row.user.isPresent;

            return (
              <TableRow key={row.key} className={row.groupStyles}>
                <TableCell>
                  <div className="text-sm">
                    <span className="font-medium">
                      {row.user.firstName} {row.user.lastName}
                    </span>
                    {row.user.phone && (
                      <span className="text-gray-500 ml-2">
                        ({row.user.phone})
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Общие колонки - показываем для всех пользователей в группе */}
                <TableCell>
                  {row.isFirstUser ? (
                    <Input
                      type="number"
                      size="sm"
                      variant="underlined"
                      defaultValue={row.submission.total.toString()}
                      onBlur={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (
                          !isNaN(newValue) &&
                          newValue !== row.submission.total
                        ) {
                          onUpdateAmount(row.submission, "total", newValue);
                        }
                      }}
                      endContent={
                        <span className="text-xs text-gray-500">₽</span>
                      }
                      classNames={{
                        input: "text-right",
                        inputWrapper: "min-w-[100px]",
                      }}
                    />
                  ) : (
                    <div className="text-sm text-gray-400 text-right">
                      {row.submission.total} ₽
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  {row.isFirstUser ? (
                    <Input
                      type="number"
                      size="sm"
                      variant="underlined"
                      defaultValue={row.submission.paid_amount.toString()}
                      onBlur={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (
                          !isNaN(newValue) &&
                          newValue !== row.submission.paid_amount
                        ) {
                          onUpdateAmount(
                            row.submission,
                            "paid_amount",
                            newValue
                          );
                        }
                      }}
                      endContent={
                        <span className="text-xs text-gray-500">₽</span>
                      }
                      classNames={{
                        input: "text-right",
                        inputWrapper: "min-w-[100px]",
                      }}
                    />
                  ) : (
                    <div className="text-sm text-gray-400 text-right">
                      {row.submission.paid_amount} ₽
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  {row.isFirstUser ? (
                    <Chip
                      color={row.submission.isPaid ? "success" : "warning"}
                      variant="flat"
                      size="sm"
                    >
                      {row.submission.isPaid ? "Оплачено" : "Не оплачено"}
                    </Chip>
                  ) : (
                    <div className="text-sm text-gray-400">
                      {row.submission.isPaid ? "Оплачено" : "Не оплачено"}
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  {row.isFirstUser ? (
                    <span className="text-sm">
                      {row.submission.comment || "—"}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">
                      {row.submission.comment || "—"}
                    </span>
                  )}
                </TableCell>

                {/* Индивидуальные колонки для каждого пользователя */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Chip
                      color={isPresent ? "success" : "default"}
                      variant="flat"
                      size="sm"
                      className="text-xs cursor-pointer"
                      onClick={() => {
                        if (isPresent) {
                          onMarkAbsent(row.submission._id, userId);
                        } else {
                          onMarkPresent(row.submission._id, userId);
                        }
                      }}
                    >
                      {isPresent ? "Пришел" : "Не пришел"}
                    </Chip>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      color={isPresent ? "default" : "success"}
                      variant="flat"
                      onClick={() => {
                        if (isPresent) {
                          onMarkAbsent(row.submission._id, userId);
                        } else {
                          onMarkPresent(row.submission._id, userId);
                        }
                      }}
                    >
                      {isPresent ? "Не пришел" : "Пришел"}
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      as="a"
                      href={`/admin/submission/${row.submission.submissionId}`}
                      target="_blank"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
