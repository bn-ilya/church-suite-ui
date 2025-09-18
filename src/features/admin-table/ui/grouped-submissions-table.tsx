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

interface GroupedSubmissionsTableProps {
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

export const GroupedSubmissionsTable = ({
  submissions,
  localUpdates,
  onMarkPresent,
  onMarkAbsent,
  onUpdateAmount,
}: GroupedSubmissionsTableProps) => {
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
          {submissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell>
                <div className="space-y-1">
                  {submission.users.map((user, index) => (
                    <div key={`${submission._id}_${index}`} className="text-sm">
                      <span className="font-medium">
                        {user.firstName} {user.lastName}
                      </span>
                      {user.phone && (
                        <span className="text-gray-500 ml-2">
                          ({user.phone})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  size="sm"
                  variant="underlined"
                  defaultValue={submission.total.toString()}
                  onBlur={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (!isNaN(newValue) && newValue !== submission.total) {
                      onUpdateAmount(submission, "total", newValue);
                    }
                  }}
                  endContent={<span className="text-xs text-gray-500">₽</span>}
                  classNames={{
                    input: "text-right",
                    inputWrapper: "min-w-[100px]",
                  }}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  size="sm"
                  variant="underlined"
                  defaultValue={submission.paid_amount.toString()}
                  onBlur={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (
                      !isNaN(newValue) &&
                      newValue !== submission.paid_amount
                    ) {
                      onUpdateAmount(submission, "paid_amount", newValue);
                    }
                  }}
                  endContent={<span className="text-xs text-gray-500">₽</span>}
                  classNames={{
                    input: "text-right",
                    inputWrapper: "min-w-[100px]",
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  color={submission.isPaid ? "success" : "warning"}
                  variant="flat"
                  size="sm"
                >
                  {submission.isPaid ? "Оплачено" : "Не оплачено"}
                </Chip>
              </TableCell>
              <TableCell>
                <span className="text-sm">{submission.comment || "—"}</span>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  {submission.users.map((user, index) => {
                    const userId = `${submission._id}_${index}`;
                    const isPresent =
                      localUpdates[userId] !== undefined
                        ? localUpdates[userId]
                        : user.isPresent;

                    return (
                      <div
                        key={userId}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs text-gray-600 truncate max-w-[80px]">
                          {user.firstName}
                        </span>
                        <Chip
                          color={isPresent ? "success" : "default"}
                          variant="flat"
                          size="sm"
                          className="text-xs cursor-pointer"
                          onClick={() => {
                            if (isPresent) {
                              onMarkAbsent(submission._id, userId);
                            } else {
                              onMarkPresent(submission._id, userId);
                            }
                          }}
                        >
                          {isPresent ? "+" : "−"}
                        </Chip>
                      </div>
                    );
                  })}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  as="a"
                  href={`/admin/submission/${submission.submissionId}`}
                  target="_blank"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
