import { UserConfirmForm } from "@/src/features/user-forms/ui/confirm/ui";
import { CallInfoModal } from "@/src/shared/ui/call-info-modal";
import { LcRegIntroTwo } from "@/src/widgets/lc-reg-intro-two";

export const LcRegTwo = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntroTwo />
      <UserConfirmForm redirectPath="/livechat/register/3" />
      <CallInfoModal isOpen={true} />
    </div> 
  )
}