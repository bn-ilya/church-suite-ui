import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['cyrillic'] });

export const About = () => {
  return (
      <div className="max-w-7xl w-full mx-auto flex dark:bg-black light:bg-white py-44">
        <div className='w-full flex flex-col gap-3'>
          <div className='flex flex-col w-full text-5xl font-bold'>
            <h2>Разберемся</h2>
            <div>
              <h2 className='inline'>во что мы </h2>
              <h2 className='inline to-[#006FEE] from-[#99C7FB] text-gradient'>верим</h2>
            </div>
          </div>
          <p className='w-1/3 text-default-500 text-lg'>Самый лучший способ в этом разобраться - прочитать наши статьи</p>
        </div>
        <div>
        
        </div>
      </div>
    
  )
};