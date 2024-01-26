import { LcForm } from "@/src/widgets/lc-form";
import { LcIntro } from "@/src/widgets/lc-intro";

export const LcReg = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcIntro />
      <LcForm />
    </div> 
  )
}