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

const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

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
    subscriptionsCount,
  } = useSubmissions();

  const handleSearch = (params: SearchParams) => {
    updateSearchParams(params);
  };

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
        </div>

        <AdminSearchForm onSearch={handleSearch} />

        {dataLoading ? (
          <div className="flex justify-center my-8">
            <Spinner size="lg" color="primary" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center my-8">
            <p>Регистрации не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {submissions.map((submission) => (
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
                          className="p-3 bg-default-200/50 rounded-lg"
                        >
                          <p className="text-md font-medium">{user.name}</p>
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
