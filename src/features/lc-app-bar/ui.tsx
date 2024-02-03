"use client";

import { motion } from "framer-motion";
import { HomeIcon, PencilIcon, UserIcon } from "@heroicons/react/16/solid"
import { Tab, Tabs } from "@nextui-org/react"
import { FC, Key } from "react"
import { useRouter } from "next/navigation";

export const LcAppBar: FC = () => {
  const router = useRouter();

  const handleSelect = (key: Key) => {
    router.push(`/livechat/${key}`)
  }

  return (
    <motion.div initial={{y:100}} animate={{y:0}} className="fixed bottom-0 w-full h-auto flex p-3">
      <Tabs onSelectionChange={handleSelect} fullWidth classNames={{
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
          key="edit"
          title={
            <div className="flex items-center space-x-2">
              <UserIcon width={16} />
              <span>Изменение</span>
            </div>
          }
        />
      </Tabs>
    </motion.div>
  )
}