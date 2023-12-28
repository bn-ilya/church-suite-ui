import Image from 'next/image';
import LogoChurch from '../../public/logoChurch/logoChurch.svg';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['cyrillic'] });

export const IntroFull = () => {
  return (
    <div className={`h-screen w-full relative`}>
      <div className="container h-full w-full flex justify-center items-center">
        <div className='flex gap-5'>
          <Image
            priority
            src={LogoChurch}
            className='w-[50px] h-auto'
            alt="Логотип церкви"
          />
          <h1 className={`${unbounded.className} text-[30px] color-white text-white font-bold leading-[2]`}>Церковь Кропоткина</h1>
        </div>

      </div>
      <video muted={true} autoPlay={false} loop={true} className="absolute top-0 left-0 min-w-full min-h-full object-cover z-[-1]">
        <source src='/video/intro-video.mp4' type="video/mp4"/>
      </video>
    </div>
    
  )
};