"use client";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { useSubmissions } from "./useSubmissions";
import {
  AdminSearchForm,
  SearchParams,
} from "@/src/features/admin-search-form";
import {
  Spinner,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@heroui/react";
import { DeleteSubscriptionButton } from "@/src/features/admin-delete-subscription";
import { useFormioAuth } from "@/src/shared/hooks/useFormioAuth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { AdminAppBar } from "@/src/features/admin-app-bar/ui";
import { useEffect, useState, useMemo } from "react";

// Ключ для хранения параметров поиска в localStorage
const SEARCH_PARAMS_STORAGE_KEY = "admin_search_params";

// Функция для фильтрации пользователей на основе параметров поиска
const filterUsersBySearchParams = (
  users: any[],
  searchParams: SearchParams
) => {
  if (!searchParams || !searchParams.field || !searchParams.value) {
    return users;
  }

  // Получаем имя поля пользователя из пути поиска
  // Например, из 'data.users.0.name' получаем 'name'
  const fieldMatch = searchParams.field.match(/data\.users\.\d+\.(.+)$/);
  if (!fieldMatch) {
    return users; // Если поле не относится к пользователям, возвращаем всех
  }

  const userField = fieldMatch[1];
  const searchValue = searchParams.value;
  const operator = searchParams.operator || "equals";

  return users.filter((user: any) => {
    const userValue = user[userField];

    // Если значение не определено, считаем, что оно не соответствует фильтру
    if (userValue === undefined || userValue === null) {
      return false;
    }

    // Преобразуем значение в строку для сравнения
    const userValueStr = String(userValue);

    switch (operator) {
      case "equals":
        return userValueStr === searchValue;
      case "ne":
        return userValueStr !== searchValue;
      case "gt":
        return parseFloat(userValueStr) > parseFloat(searchValue);
      case "gte":
        return parseFloat(userValueStr) >= parseFloat(searchValue);
      case "lt":
        return parseFloat(userValueStr) < parseFloat(searchValue);
      case "lte":
        return parseFloat(userValueStr) <= parseFloat(searchValue);
      case "regex":
        // Создаем регулярное выражение для поиска по части строки (регистронезависимый)
        const regex = new RegExp(searchValue, "i");
        return regex.test(userValueStr);
      default:
        return true;
    }
  });
};

const AdminPage = () => {
  const router = useRouter();
  const {
    isAuthenticated,
    isLoading: authLoading,
    logout,
    user,
  } = useFormioAuth();
  const {
    submissions,
    updateSearchParams,
    refreshSubscriptions,
    isLoading: dataLoading,
    totalSum,
    paidAmount,
    totalUsers,
    summableFieldsStats,
    subscriptionsCount,
  } = useSubmissions();

  // Состояние для хранения последних параметров поиска
  const [initialSearchParams, setInitialSearchParams] =
    useState<SearchParams | null>(null);

  // Состояние для хранения текущих параметров поиска
  const [currentSearchParams, setCurrentSearchParams] =
    useState<SearchParams | null>(null);

  // Загружаем сохраненные параметры поиска при монтировании компонента
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedParams = localStorage.getItem(SEARCH_PARAMS_STORAGE_KEY);
        if (savedParams) {
          const params = JSON.parse(savedParams) as SearchParams;
          setInitialSearchParams(params);
          setCurrentSearchParams(params);
          updateSearchParams(params);
        }
      } catch (error) {
        console.error("Ошибка при загрузке параметров поиска:", error);
      }
    }
  }, []);

  const handleSearch = (params: SearchParams) => {
    // Сохраняем параметры поиска в localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(SEARCH_PARAMS_STORAGE_KEY, JSON.stringify(params));
      } catch (error) {
        console.error("Ошибка при сохранении параметров поиска:", error);
      }
    }

    // Обновляем параметры поиска
    setCurrentSearchParams(params);
    updateSearchParams(params);
  };

  // Фильтруем пользователей в каждой регистрации на основе параметров поиска
  const filteredSubmissions = useMemo(() => {
    if (!submissions || submissions.length === 0 || !currentSearchParams) {
      return submissions;
    }

    // Проверяем, относится ли поиск к полям пользователя
    const isUserFieldSearch = currentSearchParams.field?.includes("data.users");

    // Если поиск не по полям пользователя, возвращаем все регистрации без изменений
    if (!isUserFieldSearch) {
      return submissions;
    }

    // Фильтруем пользователей в каждой регистрации
    return submissions
      .map((submission) => {
        if (!submission.users || submission.users.length === 0) {
          return submission;
        }

        // Фильтруем пользователей
        const filteredUsers = filterUsersBySearchParams(
          submission.users,
          currentSearchParams
        );

        // Возвращаем копию регистрации с отфильтрованными пользователями
        return {
          ...submission,
          users: filteredUsers,
        };
      })
      .filter((submission) => submission.users && submission.users.length > 0);
  }, [submissions, currentSearchParams]);

  // Если проверка авторизации еще не завершена, показываем спиннер
  if (authLoading) {
    return (
      <div className="mt-[64px] flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Если пользователь не авторизован, он будет перенаправлен на страницу авторизации
  // хуком useFormioAuth, но на всякий случай добавим проверку
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-[64px]">
      <div data-bs-theme="dark" className={styles.wrapper}>
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 px-6 gap-4">
          <h1 className="text-2xl font-bold text-center">
            Управление регистрацией
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-4 px-6">
          <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Общая сумма:</span>
            <span className="font-semibold">
              {totalSum.toLocaleString("ru-RU")} ₽
            </span>
          </div>
          <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Сдано денег:</span>
            <span className="font-semibold">
              {paidAmount.toLocaleString("ru-RU")} ₽
            </span>
          </div>
          <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Регистрации:</span>
            <span className="font-semibold">{subscriptionsCount}</span>
          </div>
          <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Люди:</span>
            <span className="font-semibold">{totalUsers}</span>
          </div>
          {/* Отображаем статистику для каждого суммируемого поля */}
          {Object.entries(summableFieldsStats).map(([label, value]) => (
            <div
              key={label}
              className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center"
            >
              <span className="text-sm text-gray-500 mr-2">{label}:</span>
              <span className="font-semibold">
                {value.toLocaleString("ru-RU")}
              </span>
            </div>
          ))}
        </div>

        <AdminSearchForm
          onSearch={handleSearch}
          initialParams={initialSearchParams}
        />

        {dataLoading ? (
          <div className="flex justify-center my-8">
            <Spinner size="lg" color="primary" />
          </div>
        ) : filteredSubmissions?.length === 0 ? (
          <div className="text-center my-8">
            <p>Регистрации не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredSubmissions.map((submission) => (
              <Card key={submission._id}>
                <CardBody
                  onClick={() => {
                    router.push(`/admin/submission/${submission._id}`);
                  }}
                  as="button"
                >
                  <div className="space-y-3">
                    {submission.users && submission.users.length > 0 ? (
                      submission.users.map((user, index) => (
                        <div
                          key={index}
                          className="p-3 bg-default-200/50 rounded-lg w-full"
                        >
                          <p className="text-md font-medium">
                            {user.name || "⚠️ Без имени! ⚠️"}
                          </p>
                          {user.email && (
                            <p className="text-sm text-gray-500 mt-1">
                              Email: {user.email}
                            </p>
                          )}
                          {user.phone && (
                            <p className="text-sm text-gray-500">
                              Телефон: {user.phone}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-default-200/50 rounded-lg">
                        <p className="text-md font-medium text-gray-500">
                          Нет данных о пользователях
                        </p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
      <AdminAppBar />
    </div>
  );
};

export default AdminPage;
