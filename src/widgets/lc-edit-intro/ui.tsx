import { FC } from 'react';
import { LogoLiveChat } from '@/src/shared/ui';

export const LcEditIntro: FC = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-6 pt-16 pb-8 flex flex-col items-center gap-4">
      <LogoLiveChat width={150}/>
      <h1 className='subhead text-center max-w-[300px]'>Изменение данных</h1>
    </div>
  )
};

