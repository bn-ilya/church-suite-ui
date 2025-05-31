"use client";

import { ListBulletIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Tab, Tabs } from "@heroui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { FC, Key } from "react";

export const AdminAppBar: FC = () => {
  const router = useRouter();
  const path = usePathname();
  const pathSegments = path.split("/");
  const isAddPage = pathSegments.length > 2 && pathSegments[2] === "add";

  const handleSelect = (key: Key) => {
    if (key === "list") {
      router.push("/admin");
    } else if (key === "add") {
      router.push("/admin/add");
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed left-0 bottom-0 w-full h-auto flex p-3"
    >
      <div className="w-full mx-auto px-6 max-w-screen-md">
        <Tabs
          keyboardActivation="manual"
          selectedKey={isAddPage ? "add" : "list"}
          onSelectionChange={handleSelect}
          fullWidth
          classNames={{
            tabList:
              "border border-default-200 backdrop-blur-lg dark:border-default-100 bg-default-200/20",
          }}
          aria-label="Админ навигация"
          color="primary"
        >
          <Tab
            key="list"
            title={
              <div className="flex items-center space-x-2">
                <ListBulletIcon className="w-5 h-5" />
                <span>Список</span>
              </div>
            }
          />
          <Tab
            key="add"
            title={
              <div className="flex items-center space-x-2">
                <PlusCircleIcon className="w-5 h-5" />
                <span>Добавить</span>
              </div>
            }
          />
        </Tabs>
      </div>
    </motion.div>
  );
};
