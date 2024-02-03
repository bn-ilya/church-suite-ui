"use client";
import { LcChangeData } from '@/src/features/lc-change-data';
import { LcDeleteData } from '@/src/features/lc-delete-data';
import { FC } from 'react';

export const LcRegSucInfo: FC = () => {
  return (
    <div className={`px-6 max-w-7xl mx-auto w-full h-full`}>
      <div className='w-full py-6 flex flex-col gap-4'>
        <div>
          <p> 
            Обязательно сохраните код регистрации. Его необходимо будет предъявить при регистрации на конференции, а так же он понадобится для изменения данных о регистрации.
          </p>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <LcChangeData />
          <LcDeleteData />
        </div>
      </div>
    </div>
  )
};

