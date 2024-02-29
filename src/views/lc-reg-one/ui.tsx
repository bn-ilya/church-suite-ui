import { LoginAppBar } from "@/src/features/login-app-bar";
import { UserRegisterForm } from "@/src/features/user-forms/ui/register";
import { LcRegIntro } from "@/src/widgets/lc-reg-intro";
import { LcRegIntroOne } from "@/src/widgets/lc-reg-intro-one";

export const LcRegOne = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntroOne />
      <UserRegisterForm />
    </div> 
  )
}