"use client";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { useSubmissionIds } from "./useSubmissionIds";
import {
  AdminSearchForm,
  SearchParams,
} from "@/src/features/admin-search-form";
import { Spinner } from "@heroui/react";

const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

const AdminPage = () => {
  const {
    submissionIds,
    updateSearchParams,
    isLoading,
    totalSum,
    totalUsers,
    subscriptionsCount,
  } = useSubmissionIds();

  const handleSearch = (params: SearchParams) => {
    updateSearchParams(params);
  };

  return (
    <div className="mt-[64px]">
      <div data-bs-theme="dark" className={styles.wrapper}>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Управление подписками
        </h1>

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

        {isLoading ? (
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
