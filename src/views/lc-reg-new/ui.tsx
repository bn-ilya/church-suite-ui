import { LcRegForm } from "@/src/features/lc-forms";
import { LcRegIntro } from "@/src/widgets/lc-reg-intro";

export const LcRegNew = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntro />
      <LcRegForm />
    </div> 
  )
}