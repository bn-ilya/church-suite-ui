import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectSuccess = (isSuccess: boolean, form: string) => {
  const router = useRouter();

  useEffect(()=>{
    if (!isSuccess) return;
    router.push(`/livechat/${form}/success`); 
  }, [isSuccess])
}