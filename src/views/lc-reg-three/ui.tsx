import { LcRegForm } from "@/src/features/lc-forms";
import { LcRegIntro } from "@/src/widgets/lc-reg-intro";
import { LcRegIntroThree } from "@/src/widgets/lc-reg-intro-three";

export const LcRegThree = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntroThree />
      <LcRegForm />
    </div> 
  )
}