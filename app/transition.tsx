"use client";

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useContext, useRef } from 'react';

function FrozenRouter({children} : {
  children: ReactNode
}) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
      <LayoutRouterContext.Provider value={frozen}>
          {children}
      </LayoutRouterContext.Provider>
  );
}

interface ITransitionProps {
	children: ReactNode
}

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.75
    }
  },
	in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5
    }
  }
};

export const Transition: FC<ITransitionProps> = ({children}) => {
	const pathname = usePathname();

  return (
		<AnimatePresence mode='popLayout'>
			<motion.div	
				key={pathname}
				variants={variants}
				animate="in"
				initial="out"
				exit="out"
			>
				<FrozenRouter>{children}</FrozenRouter>
			</motion.div>
		</AnimatePresence>
	);
};