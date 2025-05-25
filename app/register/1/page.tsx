import { Transition } from "@/app/transition";
import { AccessDeniedUser } from "@/src/features/access-denied-user";
import { LoginAppBar } from "@/src/features/login-app-bar";
import { SupportInfo } from "@/src/features/support-info";
import { LcRegOne } from "@/src/views/lc-reg-one";

export default function LcRegOnePage() {
  return (
    <>
      <Transition>
        <LcRegOne />
      </Transition>

      <AccessDeniedUser />
      <LoginAppBar />
      <SupportInfo bottomPosition={50} />
    </>
  )
}
