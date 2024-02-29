import { LogoLiveChat } from "@/src/shared/ui"
import { Divider } from "@nextui-org/react"

export const ProfileUserIntro = () => {
  return (
    <>
      <div className="max-w-7xl w-full mx-auto px-6 pt-16 pb-4 flex flex-col items-center gap-4">
        <LogoLiveChat width={150}/>
        <h1 className='text-2xl text-center font-bold'>Данные пользователя</h1>
        <Divider className="my-2"/>
      </div>
    </>
  )
}