"use client";

import { motion } from "framer-motion";
import { PencilIcon, UserIcon } from "@heroicons/react/16/solid"
import { Tab, Tabs } from "@nextui-org/react"
import { FC, Key } from "react"
import { usePathname, useRouter } from "next/navigation";
import { getCodePath } from "@/src/shared/lib";

export const LoginAppBar: FC = () => {
  const router = useRouter();
  const path = usePathname();
  const codetPath = getCodePath(path);

  const handleSelect = (key: Key) => {
    router.push(`/livechat/${key}/1`)
  }

  return (
    <motion.div initial={{y:100}} animate={{y:0}} className="fixed bottom-0 w-full h-auto flex p-3">
      <div className="max-w-xl w-full mx-auto px-6">
      <Tabs keyboardActivation="manual" selectedKey={codetPath} onSelectionChange={handleSelect} fullWidth classNames={{
        tabList: "border border-default-200 backdrop-blur-lg dark:border-default-100 bg-default-200/20" 
      }} aria-label="Options" color="primary">
        <Tab
          key="register"
          title={
            <div className="flex items-center space-x-2">
              <PencilIcon width={16} />
              <span>Регистрация</span>
            </div>
          }
        />
        <Tab
          key="login"
          title={
            <div className="flex items-center space-x-2">
              <UserIcon width={16} />
              <span>Войти</span>
            </div>
          }
        />
      </Tabs>
      </div>
    </motion.div>
  )
}