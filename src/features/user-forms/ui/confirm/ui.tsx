import { Button } from "@nextui-org/react"
import { Input } from "../../components/input/ui"

export const UserConfirmForm = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <form className="grid grid-cols-2 gap-4">
        <Input
          isRequired
          type="tel"
          label="Код подтверждения"
          placeholder="XXXX"
        />
        <Button type="submit" color="primary" className="col-span-2">
          Продолжить
        </Button>
      </form>
    </div>
  )
} 