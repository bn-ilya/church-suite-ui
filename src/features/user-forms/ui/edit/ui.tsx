import { IEditDataUser } from "@/src/shared/api";
import { useForm } from "react-hook-form";
import { useEditOnSubmit } from "../../model/hooks/useEditOnSubmit";
import { Button } from "@nextui-org/react";
import { ErrorModal } from "@/src/shared/ui";
import { FC } from "react";
import { IUserEditFormProps } from "./ui.props";
import { Input } from "../../components/input/ui";
import { SuccessModal } from "@/src/shared/ui/success-modal";

export const UserEditForm: FC<IUserEditFormProps> = ({name}) => {
  const {onSubmit, isLoading, errorMsg, data, isSuccess} = useEditOnSubmit()
  const {register, handleSubmit, formState: {errors}} = useForm<IEditDataUser>({mode: "onBlur"});

  return (
    <div className="max-w-xl w-full mx-auto px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <Input
            isRequired
            {...register("name", {required: 'Заполните имя, фамилию'})}
            isInvalid={!!errors?.name}
            errorMessage={errors?.name?.message}
            type="text"
            label="Имя Фамилия"
            placeholder="Петр Петров"
            defaultValue={name}
        />
        <Button isLoading={isLoading} type="submit" color="primary" className="col-span-2">
          Изменить
        </Button>
      </form>

      <ErrorModal error={errorMsg} />
      <SuccessModal message={isSuccess ? "Данные обновлены" : ''} />
    </div>
  ) 
}