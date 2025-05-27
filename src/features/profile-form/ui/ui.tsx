"use client";

import { useGetMeQuery } from "@/src/shared/api";
const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});
import { useEffect } from "react";
import { ProfileUserIntro } from "../components/profile-user-intro/ui";
import dynamic from "next/dynamic";

const getSubmission = async (submissionId: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}/submission/${submissionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const Controller = () => {
  const { data, error, isSuccess } = useGetMeQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    if (data) {
      const getForm = async () => {
        const { formio_form_id } = data;
        if (!formio_form_id) return;
        const result = await getSubmission(formio_form_id);
      };

      getForm();
    }
  }, [data]);

  if (!data?.formio_form_id) return;

  return (
    <>
      <ProfileUserIntro />
      <Form
        src={
          process.env.NEXT_PUBLIC_FORMIO_BASE_URL +
          "/form/" +
          process.env.NEXT_PUBLIC_FORMIO_FORM_ID +
          "/submission/" +
          data?.formio_form_id
        }
      />
    </>
  );
};
