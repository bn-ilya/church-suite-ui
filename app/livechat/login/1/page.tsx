import { Transition } from "@/app/transition";
import { LoginAppBar } from "@/src/features/login-app-bar";
import { LcLoginOne } from "@/src/views/lc-login-one";

export default function LcLoginOnePage() {
  return (
    <>
      <Transition>
        <LcLoginOne />
      </Transition>

      <LoginAppBar />
    </>
  )
}
