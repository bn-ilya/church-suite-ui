"use client";

import { IGetMeResUser, IGetMeResLcForm, useGetMeQuery } from "@/src/shared/api";
import { useEffect, useState } from "react";
import { LcEditForm } from '@/src/features/lc-forms';

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
      {
        lcFormData && (
          <LcEditForm data={lcFormData} />
        )
      }
    </>
  )
}