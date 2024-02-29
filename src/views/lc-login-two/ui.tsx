import { UserConfirmForm } from "@/src/features/user-forms/ui/confirm/ui";
import { LcLoginIntroTwo } from "@/src/widgets/lc-login-intro-two";

export const LcLoginTwo = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcLoginIntroTwo />
      <UserConfirmForm redirectPath="/profile" />
    </div> 
  )
}