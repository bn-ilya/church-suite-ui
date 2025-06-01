import { useEffect, useState } from "react";
import { SearchParams } from "@/src/features/admin-search-form";

interface Submission {
  _id: string;
  data?: {
    total?: string | number;
    paid_amount?: string | number;
    users?: Array<any>;
  };
}

export const useSubmissionIds = () => {
  const [submissionIds, setSubmissionIds] = useState<string[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const fetchSubmissions = async (params?: SearchParams) => {
    setIsLoading(true);
    try {
      // Получаем токен авторизации из localStorage
      const token = localStorage.getItem("formioToken");

      // Если токена нет, не выполняем запрос
      if (!token) {
        setSubmissionIds([]);
        setTotalSum(0);
        setTotalUsers(0);
        return;
      }

      // Базовый URL с параметрами для получения всех подписок и сортировки по дате создания (сначала новые)
      let url = `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}/submission?limit=1000&sort=-created`;

      // Добавляем параметры поиска, если они есть
      if (params && params.field && params.value) {
        // Для поиска по полям формы используем правильный синтаксис
        let fieldPath = params.field;

        // Для поиска по полям в массиве (например, datagrid) используем специальный синтаксис
        // Например: data.users.0.name=Иван превращается в data.users.name=Иван
        const datagridPattern = /^data\.([^.]+)\.0\.(.+)$/;
        const match = fieldPath.match(datagridPattern);

        if (match) {
          console.log(
            `Преобразование пути для datagrid: ${fieldPath} -> data.${match[1]}.${match[2]}`
          );
          fieldPath = `data.${match[1]}.${match[2]}`;
        }

        // Добавляем оператор к полю, если он указан
        if (params.operator && params.operator !== "equals") {
          // Для regex используем специальный синтаксис
          if (params.operator === "regex") {
            // Формируем регулярное выражение для поиска по части строки (регистронезависимый)
            // /value/i - i означает регистронезависимый поиск
            fieldPath += `__regex=/^.*${params.value}.*$/i`;
            url += `&${fieldPath}`;
          } else {
            // Для других операторов используем синтаксис с двойным подчеркиванием
            fieldPath += `__${params.operator}`;
            url += `&${fieldPath}=${encodeURIComponent(params.value)}`;
          }
        } else {
          // Для обычного равенства используем стандартный синтаксис
          url += `&${fieldPath}=${encodeURIComponent(params.value)}`;
        }
      }

      const response = await fetch(url, {
        headers: {
          "x-jwt-token": token,
        },
      });
      const data: Array<Submission> = await response.json();

      // Извлекаем ID подписок
      setSubmissionIds(data.map((submission) => submission["_id"]));

      // Рассчитываем общую сумму total, paid_amount и количество пользователей
      let sum = 0;
      let paid = 0;
      let usersCount = 0;

      data.forEach((submission) => {
        // Подсчет общей суммы
        if (submission.data?.total) {
          const total =
            typeof submission.data.total === "string"
              ? parseFloat(submission.data.total)
              : submission.data.total;

          if (!isNaN(total)) {
            sum += total;
          }
        }

        // Подсчет суммы сданных денег
        if (submission.data?.paid_amount) {
          const paidAmount =
            typeof submission.data.paid_amount === "string"
              ? parseFloat(submission.data.paid_amount)
              : submission.data.paid_amount;

          if (!isNaN(paidAmount)) {
            paid += paidAmount;
          }
        }

        // Подсчет общего количества пользователей
        if (submission.data?.users && Array.isArray(submission.data.users)) {
          usersCount += submission.data.users.length;
        }
      });

      setTotalSum(sum);
      setPaidAmount(paid);
      setTotalUsers(usersCount);
    } catch (error) {
      setSubmissionIds([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для обновления параметров поиска
  const updateSearchParams = (params: SearchParams) => {
    setSearchParams(params);
  };

  // Функция для обновления списка подписок (например, после удаления)
  const refreshSubscriptions = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Загружаем подписки при монтировании компонента, изменении параметров поиска или триггера обновления
  useEffect(() => {
    fetchSubmissions(searchParams || undefined);
  }, [searchParams, refreshTrigger]);

  return {
    submissionIds,
    updateSearchParams,
    refreshSubscriptions,
    isLoading,
    totalSum,
    paidAmount,
    totalUsers,
    subscriptionsCount: submissionIds.length,
  };
};
