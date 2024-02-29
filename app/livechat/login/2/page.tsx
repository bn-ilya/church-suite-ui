import { Transition } from "@/app/transition";
import { AccessDeniedUser } from "@/src/features/access-denied-user";
import { SupportInfo } from "@/src/features/support-info";
import { LcLoginTwo } from "@/src/views/lc-login-two";

export default function LcLoginTwoPage() {
  return (
    <>
      <Transition>
        <LcLoginTwo />
      </Transition>
      
      <AccessDeniedUser />
      <SupportInfo />
    </>
  )
}
