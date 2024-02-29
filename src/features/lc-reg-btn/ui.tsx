"use client"

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"


export const LcRegBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/livechat/register/new');
  }

  return (
    <div className="max-w-xl w-full mx-auto px-6 grid grid-cols-2 gap-4 pt-4">
        <Button onClick={handleClick} type="submit" color="primary" className="col-span-2">
          Зарегистрироваться на Live Chat
        </Button>
    </div>
  )
}