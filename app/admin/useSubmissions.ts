import { useEffect, useState } from "react";
import { SearchParams } from "@/src/features/admin-search-form";

interface User {
  firstName: string;
  lastName: string;
  [key: string]: any;
}

export interface SubmissionData {
  _id: string;
  users: User[];
  total?: number;
  paid_amount?: number;
  [key: string]: any;
}

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
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
        setSubmissions([]);
        setTotalSum(0);
        setTotalUsers(0);
        return;
      }

      // Определяем поля, которые нам нужны
      const selectFields = [
        "_id",
        "data.users",
        "data.total",
        "data.paid_amount",
        "data.firstName",
        "data.lastName",
        "data.first_name",
        "data.last_name",
        "data.name",
        "data.surname",
        "created",
        "modified",
      ].join(",");

      // Базовый URL с параметрами для получения всех подписок и сортировки по дате создания (сначала новые)
      let url = `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}/submission?limit=1000&sort=-created&select=${selectFields}`;

      // Добавляем параметры поиска, если они есть
      if (params && params.field && params.value) {
        // Для поиска по полям формы используем правильный синтаксис
        let fieldPath = params.field;

        // Для поиска по полям в массиве (например, datagrid) используем специальный синтаксис
        // Например: data.users.0.name=Иван превращается в data.users.name=Иван
        const datagridPattern = /^data\.([^.]+)\.0\.(.+)$/;
        const match = fieldPath.match(datagridPattern);

        if (match) {
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
      const data = await response.json();

      // Обрабатываем полученные данные
      const formattedSubmissions = data.map((submission: any) => {
        // Извлекаем данные о пользователях
        let users: any[] = [];

        // Проверяем разные возможные пути к данным пользователей
        if (submission.data?.users && Array.isArray(submission.data.users)) {
          users = submission.data.users;
        } else if (
          submission.data?.data?.users &&
          Array.isArray(submission.data.data.users)
        ) {
          users = submission.data.data.users;
        } else {
          // Если не нашли массив users, создаем пользователя из доступных полей
          // Ищем поля, которые могут содержать имя и фамилию
          const userFields = [
            "firstName",
            "lastName",
            "first_name",
            "last_name",
            "name",
            "surname",
          ];
          let foundUserData = false;

          for (const field of userFields) {
            if (submission.data && submission.data[field]) {
              foundUserData = true;
              break;
            }
          }

          if (foundUserData) {
            users = [
              {
                firstName:
                  submission.data.firstName ||
                  submission.data.first_name ||
                  submission.data.name ||
                  "",
                lastName:
                  submission.data.lastName ||
                  submission.data.last_name ||
                  submission.data.surname ||
                  "",
              },
            ];
          }
        }

        return {
          _id: submission._id,
          users: users.map((user: any) => {
            // Проверяем разные варианты полей имени и фамилии
            const firstName =
              user.firstName || user.first_name || user.name || "";
            const lastName =
              user.lastName || user.last_name || user.surname || "";

            return {
              firstName,
              lastName,
              ...user,
            };
          }),
          total: parseFloat(submission.data?.total || "0"),
          paid_amount: parseFloat(submission.data?.paid_amount || "0"),
          ...submission.data,
        };
      });

      setSubmissions(formattedSubmissions);

      // Рассчитываем общую сумму total, paid_amount и количество пользователей
      let sum = 0;
      let paid = 0;
      let usersCount = 0;

      formattedSubmissions.forEach((submission: SubmissionData) => {
        // Подсчет общей суммы
        if (submission.total) {
          sum += submission.total;
        }

        // Подсчет суммы сданных денег
        if (submission.paid_amount) {
          paid += Number(submission.paid_amount);
        }

        // Подсчет общего количества пользователей
        if (submission.users && Array.isArray(submission.users)) {
          usersCount += submission.users.length;
        }
      });

      setTotalSum(sum);
      setPaidAmount(paid);
      setTotalUsers(usersCount);
    } catch (error) {
      // Обрабатываем ошибку без логирования
      setSubmissions([]);
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
    submissions,
    updateSearchParams,
    refreshSubscriptions,
    isLoading,
    totalSum,
    paidAmount,
    totalUsers,
    subscriptionsCount: submissions.length,
  };
};
