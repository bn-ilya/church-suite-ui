"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { Spinner } from "@heroui/react";
import { useFormioAuth } from "@/src/shared/hooks/useFormioAuth";
import { useRouter } from "next/navigation";

const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

export const AdminAddForm = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useFormioAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  // Если проверка авторизации еще не завершена, показываем спиннер
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Если пользователь не авторизован, он будет перенаправлен на страницу авторизации
  // хуком useFormioAuth, но на всякий случай добавим проверку
  if (!isAuthenticated) {
    return null;
  }

  // Если форма успешно отправлена, показываем сообщение об успехе
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">
            Регистрация успешно добавлена
          </h2>
          <p className="mb-6">
            Новая регистрация была успешно создана в системе.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsSuccess(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Добавить еще
            </button>
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Вернуться к списку
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Формируем URL с учетом токена авторизации
  const formUrl = `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}`;

  return (
    <div data-bs-theme="dark" className={styles.wrapper}>
      <Form
        onSubmit={(submission) => {
          // Просто отмечаем успешную отправку формы, без дополнительных действий
          setIsSuccess(true);
        }}
        src={formUrl}
        options={{
          noAlerts: true,
          readOnly: false,
        }}
      />
    </div>
  );
};
