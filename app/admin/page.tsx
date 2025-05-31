"use client";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { useSubmissionIds } from "./useSubmissionIds";
import {
  AdminSearchForm,
  SearchParams,
} from "@/src/features/admin-search-form";
import { Spinner, Button } from "@heroui/react";
import { useFormioAuth } from "@/src/shared/hooks/useFormioAuth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

const AdminPage = () => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    logout,
    user,
  } = useFormioAuth();
  const {
    submissionIds,
    updateSearchParams,
    isLoading: dataLoading,
    totalSum,
    totalUsers,
    subscriptionsCount,
  } = useSubmissionIds();

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
        <div className="flex justify-between items-center mb-4 px-6">
          <h1 className="text-2xl font-bold">Управление подписками</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{user?.email}</span>
            <Button
              color="danger"
              variant="light"
              size="sm"
              onClick={logout}
              startContent={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
            >
              Выйти
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 px-6">
          <div className="text-lg font-semibold">
            Общая сумма: {totalSum.toLocaleString("ru-RU")} ₽
          </div>
          <div className="text-lg font-semibold text-center">
            Количество подписок: {subscriptionsCount}
          </div>
          <div className="text-lg font-semibold text-right">
            Количество людей: {totalUsers}
          </div>
        </div>

        <AdminSearchForm onSearch={handleSearch} />

        {dataLoading ? (
          <div className="flex justify-center my-8">
            <Spinner size="lg" color="primary" />
          </div>
        ) : submissionIds.length === 0 ? (
          <div className="text-center my-8">
            <p>Подписки не найдены</p>
          </div>
        ) : (
          submissionIds.map((submissionId: string) => (
            <Form
              key={submissionId}
              src={
                process.env.NEXT_PUBLIC_FORMIO_BASE_URL +
                "form/" +
                process.env.NEXT_PUBLIC_FORMIO_FORM_ID +
                "/submission/" +
                submissionId
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPage;
