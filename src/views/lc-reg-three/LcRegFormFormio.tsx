"use client";

import { useSetLcFormMutation } from "@/src/shared/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";

const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});
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

  return (
    <div data-bs-theme="dark" className={styles.wrapper}>
      <Form
        onSubmit={(submission) => {
          setLcForm({ formio_form_id: submission["_id"] as string });
        }}
        src={process.env.NEXT_PUBLIC_FORMIO_BASE_URL + "/formio/archyz"}
      />
    </div>
  );
};
