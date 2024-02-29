import { UserConfirmForm } from "@/src/features/user-forms/ui/confirm/ui";
import { CallInfoModal } from "@/src/shared/ui/call-info-modal";
import { LcLoginIntroTwo } from "@/src/widgets/lc-login-intro-two";

export const LcLoginTwo = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcLoginIntroTwo />
      <UserConfirmForm redirectPath="/profile" />
      <CallInfoModal isOpen={true} />
    </div> 
  )
}