import { UserConfirmForm } from "@/src/features/user-forms/ui/confirm/ui";
import { LcRegIntro } from "@/src/widgets/lc-reg-intro";

export const LcRegTwo = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntro />
      <UserConfirmForm />
    </div> 
  )
}