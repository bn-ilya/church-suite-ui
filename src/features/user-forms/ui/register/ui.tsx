import { Button } from "@nextui-org/react"
import { Input } from "../../components/input/ui"

export const UserRegisterForm = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <form className="grid grid-cols-2 gap-4">
        <Input
            isRequired
            type="text"
            label="Имя Фамилия"
            placeholder="Петр Петров"
          />
        <Input
          isRequired
          type="tel"
          label="Номер телефона"
          placeholder="+7 (xxx) xxx-xx-xx"
        />
        <Button type="submit" color="primary" className="col-span-2">
          Продолжить
        </Button>
      </form>
    </div>
  ) 
}