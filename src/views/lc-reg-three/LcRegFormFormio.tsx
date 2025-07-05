"use client";

import dynamic from "next/dynamic";
import { useSetLcFormMutation } from "@/src/shared/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

const FormioProvider = dynamic(
  () => import("@formio/react").then((mod) => mod.FormioProvider),
  {
    ssr: false,
  }
);

export const LcRegFormFormio = () => {
  const router = useRouter();
  const [
    setLcForm,
    { isLoading: isLoadingSetLcForm, error: errorSetLc, isSuccess },
  ] = useSetLcFormMutation();

  useEffect(() => {
    if (!isSuccess) return;
    router.push(`/register/success`);
  }, [isSuccess, router]);

  // Определяем baseUrl безопасно, проверяя наличие window
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin + process.env.NEXT_PUBLIC_FORMIO_BASE_URL
      : process.env.NEXT_PUBLIC_FORMIO_BASE_URL; // Фоллбэк для серверного рендеринга

  return (
    <div data-bs-theme="dark" className={styles.wrapper}>
      <FormioProvider baseUrl={baseUrl}>
        <Form
          onSubmit={(submission) => {
            setLcForm({ formio_form_id: submission["_id"] as string });
          }}
          src={"form/" + process.env.NEXT_PUBLIC_FORMIO_FORM_ID}
        />
      </FormioProvider>
    </div>
  );
};
