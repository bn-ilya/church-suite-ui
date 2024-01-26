"use client";
import { CheckCircleIcon } from '@heroicons/react/16/solid';
import { Snippet } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const LcRegSucIntro: FC = () => {
  const params = useSearchParams();
  
  return (
    <div className="bg-gradient-to-b from-success-400 to-success-200">
      <div className={`mt-[64px] px-6 max-w-7xl mx-auto h-full`}>
        <div className='w-full py-[50px] md:py-[90px] flex flex-col items-center'>
          <div className="flex gap-3 items-center flex-col md:flex-row">
            <CheckCircleIcon width={50}/>
            <h1 className="text-xl md:text-4xl font-bold">Вы зарегистрированны</h1>
          </div>
          <div className="flex items-center flex-col md:flex-row p-5 gap-2 md:gap-4">
              <div className="text-base md:text-2xl">Ваш код:</div>
              <Snippet symbol="" size="lg" className="text-4xl font-bold">{params.get('id')}</Snippet>
          </div>
        </div>
      </div>
    </div>
  )
};

