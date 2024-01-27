import { LcEditBody } from "@/src/widgets/lc-edit-body"
import { LcEditIntro } from "@/src/widgets/lc-edit-intro"

export const LcEdit = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcEditIntro />
      <LcEditBody />
    </div> 
  )
}