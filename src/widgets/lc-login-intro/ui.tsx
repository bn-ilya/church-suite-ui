"use client";

import { motion } from "framer-motion";
import { FC } from "react";

export const LcLoginIntro: FC = () => {
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
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 1,
        }}
        className="subhead text-center"
      >
        Вход
      </motion.h1>
    </div>
  );
};
