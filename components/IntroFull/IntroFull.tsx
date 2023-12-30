import { LogoChurch } from '../LogoChurch/LogoChurch';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['cyrillic'] });

export const IntroFull = () => {
  return (
    <div className={`h-screen w-full relative`}>
      <div className="max-w-7xl mx-auto h-full flex  flex-col gap-4 justify-center items-center">
        <div className='flex gap-8'>
          <LogoChurch className='w-[80px] h-auto text-white' />
          <h1 className={`${unbounded.className} text-[54px] font-bold leading-[2] text-white`}>Церковь Кропоткина</h1>
        </div>
        <p className='max-w-[800px] text-white text-center text-lg'>Мы рады, что вы посетили наш сайт. Это удобный способ познакомиться с нашей церковью, во что мы верим и чем занимаемся. Будьте как дома</p>
      </div>
      <video muted={true} autoPlay={true} loop={true} className="absolute top-0 left-0 min-w-full min-h-full object-cover z-[-1]">
        <source src='/video/intro-video.mp4' type="video/mp4"/>
      </video>
    </div>
    
  )
};