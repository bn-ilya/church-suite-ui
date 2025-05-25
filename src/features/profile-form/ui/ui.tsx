"use client";

import {
  IGetMeResUser,
  IGetMeResLcForm,
  useGetMeQuery,
} from "@/src/shared/api";
import { useEffect, useState } from "react";
import { LcEditForm } from "@/src/features/lc-forms";
import { UserEditForm } from "@/src/features/user-forms/ui/edit";
import { LcRegBtn } from "@/src/features/lc-reg-btn";
import { LcDeleteData } from "@/src/features/lc-delete-data";
import { useErrorReq } from "@/src/shared/model";
import { ErrorHandler } from "@/src/shared/ui";
import { ProfileUserIntro } from "../components/profile-user-intro/ui";
import { ProfileLcIntro } from "../components/profile-lc-intro/ui";

export const Controller = () => {
  const [skip, setSkip] = useState(false);
  const { data, error, isSuccess } = useGetMeQuery(null, {
    refetchOnMountOrArgChange: true,
    skip,
  });
  const { errorMsg, errorCode } = useErrorReq(error);

  const [userData, setUserData] = useState<IGetMeResUser | null>(null);
  const [lcFormData, setLcFormData] = useState<IGetMeResLcForm | null>(null);

  useEffect(() => {
    if (data) {
      const { lc_form, ...user } = data;
      setUserData(user);
      setLcFormData(lc_form || null);
      lc_form && setSkip(true);
    }
  }, [data]);

  return (
    <>
      <p>Скоро добавится возможность редактирования регистрации</p>
    </>
  );
};
