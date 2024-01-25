"use client";

import { Skeleton as SkeletonNextUi } from '@nextui-org/react';
import { FC } from 'react';

export const Skeleton: FC = () => {
  return (
    <div className='w-full px-6'>
      <SkeletonNextUi className="rounded-lg h-[750px]">
          <div className="h-24 rounded-lg"></div>
      </SkeletonNextUi>
    </div>
  )
};