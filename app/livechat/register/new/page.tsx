import { Transition } from "@/app/transition";
import { SupportInfo } from "@/src/features/support-info";
import { LcRegNew } from "@/src/views/lc-reg-new";

export default function LcRegNewPage() {
  return (
    <>
    <Transition>
      <LcRegNew />
    </Transition>

    <SupportInfo />
    </>
  )
}
