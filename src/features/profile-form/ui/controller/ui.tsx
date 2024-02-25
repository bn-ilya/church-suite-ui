"use client";

import { IGetMeResUser, IGetMeResLcForm, useGetMeQuery } from "@/src/shared/api";
import { useEffect, useState } from "react";
import { LcEditForm } from '@/src/features/lc-forms';
import { UserEditForm } from "@/src/features/user-forms/ui/edit";

export const Controller = () => {
  const {data} = useGetMeQuery();

  const [userData, setUserData] = useState<IGetMeResUser | null>(null);
  const [lcFormData, setLcFormData] = useState<IGetMeResLcForm | null>(null);

  useEffect(()=>{
    if (data) {
      const {lc_form, ...user} = data;
      setUserData(user);
      setLcFormData(lc_form || null);
    }
  }, [data])

  return (
    <>
      {  userData && (
          <UserEditForm name={userData.name} />
        )
      }
      {
        lcFormData && (
          <LcEditForm data={lcFormData} />
        )
      }
    </>
  )
}