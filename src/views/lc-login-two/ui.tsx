import { UserConfirmForm } from "@/src/features/user-forms/ui/confirm/ui";
import { LcLoginIntro } from "@/src/widgets/lc-login-intro";

export const LcLoginTwo = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcLoginIntro />
      <UserConfirmForm redirectPath="/profile" />
    </div> 
  )
}