import { LoginAppBar } from "@/src/features/login-app-bar";
import { UserRegisterForm } from "@/src/features/user-forms/ui/register";
import { LcRegIntro } from "@/src/widgets/lc-reg-intro";

export const LcRegOne = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntro />
      <UserRegisterForm />
    </div> 
  )
}