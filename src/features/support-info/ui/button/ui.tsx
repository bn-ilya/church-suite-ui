"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react"
import { FC, useState} from "react"
import { LifebuoyIcon } from "@heroicons/react/16/solid";
import { ISupportInfoButton } from "./ui.props";
import { SupportInfoModal } from "../modal/ui";
export const SupportInfoButton: FC<ISupportInfoButton> = ({bottomPosition}) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(prev => !prev);
  }

  const bottomClass = bottomPosition ? `bottom-[50px]` : `bottom-[20px]`

  return (
    <>
      <motion.div initial={{y:100}} animate={{y:0}} className={`fixed w-full h-auto flex p-3 justify-center ${bottomClass} z-50`}>
        <Button onClick={handleClick} radius="full" size="sm" startContent={<LifebuoyIcon width="16" />} color="primary" variant="faded">
          Техподдержка
        </Button>  
      </motion.div>

      <SupportInfoModal isOpen={isOpenModal} onClose={handleClick}/>
    </>
  )
}