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
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 px-6 gap-4">
          <h1 className="text-2xl font-bold text-center">
            Управление подписками
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
            <span className="text-sm text-gray-500 mr-2">Подписки:</span>
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
        ) : submissionIds.length === 0 ? (
          <div className="text-center my-8">
            <p>Подписки не найдены</p>
          </div>
        ) : (
          submissionIds.map((submissionId: string) => (
            <div key={submissionId} className="mb-12">
              <Form
                src={
                  process.env.NEXT_PUBLIC_FORMIO_BASE_URL +
                  "form/" +
                  process.env.NEXT_PUBLIC_FORMIO_FORM_ID +
                  "/submission/" +
                  submissionId
                }
              />
            </div>
          ))
        )}
      </div>
      <AdminAppBar />
    </div>
  );
};

export default AdminPage;
