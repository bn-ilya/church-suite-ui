import { LogoLiveChat } from '@/src/shared/ui';
import { FC } from 'react';

export const LcRegIntro: FC = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-6 pt-16 pb-8 flex flex-col items-center gap-4">
      <LogoLiveChat width={150}/>
      <h1 className='subhead text-center'>Регистрация</h1>
    </div>
  )
};

