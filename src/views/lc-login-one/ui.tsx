import { LcLoginIntro } from "@/src/widgets/lc-login-intro";
import { UserLoginForm } from './../../features/user-forms/ui/login/ui';

export const LcLoginOne = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcLoginIntro />
      <UserLoginForm />
    </div> 
  )
}