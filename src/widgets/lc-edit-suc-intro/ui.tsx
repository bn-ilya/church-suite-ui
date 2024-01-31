"use client";
import { CheckCircleIcon } from '@heroicons/react/16/solid';
import { Snippet } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const LcEditSucIntro: FC = () => {
  const params = useSearchParams();
  
  return (
    <div className="bg-gradient-to-b dark:from-success-400 dark:to-success-200 from-zinc-200 to-zinc-100">
      <div className={`mt-[64px] px-6 max-w-7xl mx-auto h-full`}>
        <div className='w-full py-[50px] md:py-[90px] flex flex-col items-center'>
          <div className="flex gap-3 items-center flex-col md:flex-row">
            <CheckCircleIcon width={50} className='dark:text-white text-green-600'/>
            <h1 className="text-xl md:text-4xl font-bold dark:text-white text-green-600">Данные успешно изменены</h1>
          </div>
          <div className="flex items-center flex-col md:flex-row p-5 gap-2 md:gap-4">
              <div className="text-base md:text-2xl dark:text-white text-zinc-900">Ваш код:</div>
              <Snippet symbol="" size="lg" className="text-4xl font-bold">{params.get('code')}</Snippet>
          </div>
        </div>
      </div>
    </div>
  )
};

