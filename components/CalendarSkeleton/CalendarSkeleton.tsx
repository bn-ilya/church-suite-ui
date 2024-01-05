"use client";

import { Skeleton } from '@nextui-org/react';
import { FC } from 'react';

export const CalendarSkeleton: FC = () => {
  return (
    <div className='w-full px-6'>
      <Skeleton className="rounded-lg h-[750px]">
          <div className="h-24 rounded-lg"></div>
      </Skeleton>
    </div>
  )
};

