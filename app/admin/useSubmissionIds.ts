import { useEffect, useState } from "react";

export const useSubmissionIds = () => {
  const [submissionIds, setSubmissionIds] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_FORMIO_BASE_URL +
        "form/" +
        process.env.NEXT_PUBLIC_FORMIO_FORM_ID +
        "/submission"
    ).then((res) => {
      console.log(res);
      res
        .json()
        .then((data: Array<{ _id: string }>) =>
          setSubmissionIds(data.map((submission) => submission["_id"]))
        );
    });
  }, []);

  return { submissionIds };
};
