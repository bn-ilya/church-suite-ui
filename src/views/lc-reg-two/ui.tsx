import { UserConfirmForm } from "@/src/features/user-forms/ui/confirm/ui";
import { LcRegIntro } from "@/src/widgets/lc-reg-intro";
import { LcRegIntroTwo } from "@/src/widgets/lc-reg-intro-two";

export const LcRegTwo = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntroTwo />
      <UserConfirmForm redirectPath="/livechat/register/3" />
    </div> 
  )
}