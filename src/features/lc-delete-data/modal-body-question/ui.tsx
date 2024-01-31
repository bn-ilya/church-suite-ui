import { TrashIcon } from "@heroicons/react/16/solid"
import { ModalBody } from "@nextui-org/react"

export const ModalBodyQuestion = () => {
  return (
    <ModalBody>
      <div className="pt-6 flex flex-col items-center gap-3">
        <div className="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-red-600 dark:bg-zinc-800">
          <TrashIcon width={40} className="text-white dark:text-red-700" />
        </div>
        <div className="text-center">Вы точно хотите удалить данные регистрации?</div>
      </div>
  </ModalBody>
  )
}