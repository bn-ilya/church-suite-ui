"use client";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { useSubmissionIds } from "./useSubmissionIds";
const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

const AdminPage = () => {
  const { submissionIds } = useSubmissionIds();

  return (
    <div className="mt-[64px]">
      <div data-bs-theme="dark" className={styles.wrapper}>
        {submissionIds.map((submissionId: string) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
