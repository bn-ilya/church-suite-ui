import { Transition } from "@/app/transition";
import { AccessDeniedUser } from "@/src/features/access-denied-user";
import { SupportInfo } from "@/src/features/support-info";
import { LcRegTwo } from "@/src/views/lc-reg-two";

export default function LcRegTwoPage() {
  return (
    <>
      <Transition>
        <LcRegTwo />
      </Transition>
      <AccessDeniedUser />
      <SupportInfo />
    </>
  )
}
