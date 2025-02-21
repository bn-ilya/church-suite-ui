import { CheckIcon } from "@heroicons/react/16/solid"
import { ModalBody } from "@heroui/react"

export const ModalBodySuc = () => {
  return (
    <ModalBody>
      <div className="pt-6 flex flex-col items-center gap-3">
        <div className="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-green-600 dark:bg-zinc-800">
          <CheckIcon width={40} className="text-white dark:text-green-700" />
        </div>
        <div className="text-center">Данные успешно удалены</div>
      </div>
  </ModalBody>
  )
}