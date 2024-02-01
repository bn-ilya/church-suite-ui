import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IAddLiveChatClientRes } from "@/src/shared/api";

export const useRedirectSuccess = (isSuccess: boolean, data: IAddLiveChatClientRes | undefined, form: string) => {
  const router = useRouter();

  useEffect(()=>{
    if (!isSuccess) return;
    router.push(`/livechat/${form}/success?id=${data?.data.id}&code=${data?.data.attributes.code}`); 
  }, [isSuccess])
}