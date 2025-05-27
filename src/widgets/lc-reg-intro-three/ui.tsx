"use client";

import { motion } from "framer-motion";
import { FC } from "react";

export const LcRegIntroThree: FC = () => {
  return (
    <div className="max-w-xl w-full mx-auto px-6 pt-16 pb-8 flex flex-col items-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.75,
        }}
      >
        <img src="/svg/logo.svg" alt="logo" />
      </motion.div>
      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1,
          }}
          className="subhead text-center mb-1"
        >
          Регистрация
        </motion.h1>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1,
          }}
          className="text-base text-center text-zinc-500"
        >
          Данные регистрации
        </motion.span>
      </div>
    </div>
  );
};
