import { Transition } from "@/app/transition";
import { AccessDeniedUser } from "@/src/features/access-denied-user";
import { SupportInfo } from "@/src/features/support-info";
import { LcRegThree } from "@/src/views/lc-reg-three";

export default function LcRegThreePage() {
  return (
    <>
      <Transition>
        <LcRegThree />
      </Transition>
      
      <AccessDeniedUser />
      <SupportInfo />
    </>
  )
}
