import { FC } from "react"
import { IErrorHandlerProps } from "./ui.props"
import { ErrorModal } from ".."
import { useRouter } from "next/navigation"

export const ErrorHandler: FC<IErrorHandlerProps> = ({message, code}) => {
  const router = useRouter()

  if (code === 401 || code === 403) {
    return <ErrorModal error="Доступ запрещен!" textBtn="Войти" onCloseCallback={()=>{router.push("/livechat/login/1")}} />
  }
  
  if (message === "TypeError: Load failed") {
    return <ErrorModal error="Мы не знаем что это за паранормальная ошибка. Попробуйте прикрпить файл другого формата или воспользоваться не safari браузером. Если результата нет, то обратитесь в техподдержку" />
  }

  return <ErrorModal error={message} />
} 