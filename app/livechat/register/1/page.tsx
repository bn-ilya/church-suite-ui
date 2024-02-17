import { Transition } from "@/app/transition";
import { LoginAppBar } from "@/src/features/login-app-bar";
import { LcRegOne } from "@/src/views/lc-reg-one";

export default function LcRegOnePage() {
  return (
    <>
      <Transition>
        <LcRegOne />
      </Transition>

      <LoginAppBar />
    </>
  )
}
