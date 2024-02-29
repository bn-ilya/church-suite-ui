import { Transition } from "@/app/transition";
import { AccessDeniedUser } from "@/src/features/access-denied-user";
import { LoginAppBar } from "@/src/features/login-app-bar";
import { SupportInfo } from "@/src/features/support-info";
import { LcLoginOne } from "@/src/views/lc-login-one";

export default function LcLoginOnePage() {
  return (
    <>
      <Transition>
        <LcLoginOne />
      </Transition>

      <LoginAppBar />
      <AccessDeniedUser />
      <SupportInfo bottomPosition={50} />
    </>
  )
}
