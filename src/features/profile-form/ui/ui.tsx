"use client";
import styles from "./styles.module.scss";
import { useGetMeQuery } from "@/src/shared/api";
const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});
const FormioProvider = dynamic(
  () => import("@formio/react").then((mod) => mod.FormioProvider),
  {
    ssr: false,
  }
);
import { useEffect } from "react";
import { ProfileUserIntro } from "../components/profile-user-intro/ui";
import dynamic from "next/dynamic";
import { ErrorHandler } from "@/src/shared/ui";
import { useErrorReq } from "@/src/shared/model";
import { useRouter } from "next/navigation";

export const Controller = () => {
  const router = useRouter();
  const { data, error } = useGetMeQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { errorCode, errorMsg } = useErrorReq(error);

  useEffect(() => {
    if (data) {
      const { formio_form_id } = data;
      if (!formio_form_id) return router.push(`/register/3`);
    }
  }, [data]);

  if (!data?.formio_form_id) return;

  // Определяем baseUrl безопасно, проверяя наличие window
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin + process.env.NEXT_PUBLIC_FORMIO_BASE_URL
      : process.env.NEXT_PUBLIC_FORMIO_BASE_URL; // Фоллбэк для серверного рендеринга

  return (
    <div data-bs-theme="dark" className={styles.wrapper}>
      <ProfileUserIntro />
      <FormioProvider baseUrl={baseUrl}>
        <Form
          src={
            "form/" +
            process.env.NEXT_PUBLIC_FORMIO_FORM_ID +
            "/submission/" +
            data?.formio_form_id
          }
        />
      </FormioProvider>
      <ErrorHandler code={errorCode} message={errorMsg} />
    </div>
  );
};
