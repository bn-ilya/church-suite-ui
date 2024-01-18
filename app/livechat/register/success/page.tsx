"use client";
import { SuccessInfo } from "@/components/liveChat/register/success/common/SuccessInfo";
import { SuccessIntro } from "@/components/liveChat/register/success/common/SuccessIntro";
import { useSearchParams } from "next/navigation"

export default function LiveChatRegisterSuccess() {
  const params = useSearchParams();
  return (
    <>
      <SuccessIntro />
      <SuccessInfo />
    </>
  )
}
