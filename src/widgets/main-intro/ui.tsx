import { LogoChurch } from '@/src/shared/ui';
import { unbounded } from '@/src/shared/fonts';

export const MainIntro = () => {
  return (
    <div className={`h-dvh sm:h-screen w-full relative`}>
      <div className="max-w-7xl mx-auto h-full flex  flex-col gap-4 justify-center items-center">
        <div className='flex gap-4 sm:gap-8 items-center'>
          <LogoChurch className='w-[55px] lg:w-[80px] h-auto text-white' />
          <h1 className={`${unbounded.className} text-[26px] sm:text-[36px] lg:text-[54px] font-bold w-min sm:w-auto leading-[1] text-white`}>Церковь Кропоткина</h1>
        </div>
        <p className='max-w-[600px] lg:max-w-[800px] text-white text-center text-sm sm:text-base lg:text-lg px-4'>Доборо пожаловать, будьте как дома</p>
      </div>
      <video muted={true} autoPlay={true} loop={true} className="absolute top-0 left-0 min-w-full min-h-full object-cover z-[-1]">
        <source src='/video/intro-video.mp4' type="video/mp4"/>
      </video>
    </div>
    
  )
};