"use client";

import { useSetLcFormMutation } from "@/src/shared/api";
import { Form, FormioProvider, submission } from "@formio/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export const LcRegFormFormio = () => {
  const router = useRouter();
  const [
    setLcForm,
    { isLoading: isLoadingSetLcForm, error: errorSetLc, isSuccess },
  ] = useSetLcFormMutation();

  useEffect(() => {
    if (!isSuccess) return;
    router.push(`/livechat/register/success`);
  }, [isSuccess]);

  return (
    <div data-bs-theme="dark" className={styles.wrapper}>
      <Form
        onSubmit={(submission) => {
          setLcForm({ formio_form_id: submission["_id"] as string });
        }}
        src="http://192.168.0.97:3000/formio/archyz"
      />
    </div>
  );
};
