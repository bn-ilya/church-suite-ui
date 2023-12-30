import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['cyrillic'] });

export const About = () => {
  return (
      <div className="max-w-7xl w-full mx-auto grid grid-cols-12 gap-4 dark:bg-black light:bg-white py-36">
        <div className='col-span-5 flex flex-col gap-2 justify-center'>
          <div className='flex flex-col w-full text-5xl font-bold'>
            <h2>Разберемся</h2>
            <div>
              <h2 className='inline'>во что мы </h2>
              <h2 className='inline to-[#006FEE] from-[#99C7FB] text-gradient'>верим</h2>
            </div>
          </div>
          <p className='w-100 text-default-500 text-lg w-3/4'>Самый лучший способ в этом разобраться - прочитать наши статьи</p>
        </div>

        <div className="col-span-7 gap-2 grid grid-cols-3">
          <Card isFooterBlurred className="w-full h-[300px] col-span-3 sm:col-span-1">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Доктрины</p>
              <h4 className="text-black font-medium text-2xl">Бог триедин</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src="https://nextui.org/images/card-example-6.jpeg"
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Время на чтение:</p>
                <p className="text-black text-tiny font-medium">~3 минуты</p>
              </div>
              <Button className="text-tiny" color="primary" radius="full" size="sm">
                Читать
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="w-full h-[300px] col-span-3 sm:col-span-1">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Доктрины</p>
              <h4 className="text-white/90 font-medium text-xl">Библия - Слова Бога</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-5.jpeg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">Время на чтение:</p>
                  <p className="text-tiny text-white/60 font-medium">~5 минут</p>
                </div>
              </div>
              <Button radius="full" size="sm">Читать</Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred className="w-full h-[300px] col-span-3 sm:col-span-1">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Доктрины</p>
              <h4 className="text-white/90 font-medium text-xl">Иисус - Божий Сын</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-5.jpeg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                <p className="text-tiny text-white/60">Время на чтение:</p>
                  <p className="text-tiny text-white/60 font-medium">~4 минуты</p>
                </div>
              </div>
              <Button radius="full" size="sm">Читать</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
  )
};