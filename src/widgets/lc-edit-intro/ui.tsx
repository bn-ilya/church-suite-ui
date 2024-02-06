"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { LogoLiveChat } from '@/src/shared/ui';

export const LcEditIntro: FC = () => {
  return (
    <div
      className="max-w-7xl w-full mx-auto px-6 pt-16 pb-8 flex flex-col items-center gap-4">
        <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{
            delay: 0.75
          }}>
          <LogoLiveChat width={150}/>
        </motion.div>
        <motion.h1 initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 1}} className='subhead text-center max-w-[300px]'>Изменение данных</motion.h1>
    </div>
  )
};

