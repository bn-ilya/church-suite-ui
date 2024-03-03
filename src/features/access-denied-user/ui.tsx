"use client";

import { useGetMeQuery } from "@/src/shared/api"
import { ErrorModal } from "@/src/shared/ui";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AccessDeniedUser = () => {
  const [skip, setSkip] = useState(false);
  const {data, error, isLoading} = useGetMeQuery(null, {refetchOnMountOrArgChange: true, skip});
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (data && !error && skip) {
      if (data.confirmed && data.lc_form) {
        setErrorMsg("Вы уже зарегистрированы")
      }
      if(data.confirmed && !data.lc_form && pathname === "/livechat/register/1"){
        setErrorMsg("Вы уже зарегистрировали пользовтеля, но ещё нужно зарегистрироваться на livechat. Сделать это можно в профиле")
      }
    }
  }, [data, error, skip])

  useEffect(()=>{
    if (!isLoading) {
      setSkip(true);
    }
  }, [isLoading])

  const handleClose = () => {
    router.push("/profile")
  }

  return <ErrorModal error={errorMsg}  textBtn="В профиль" onCloseCallback={handleClose}/>
}