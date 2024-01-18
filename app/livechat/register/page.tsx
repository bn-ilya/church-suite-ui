import { Form } from "@/components/liveChat/register/common/Form";
import { Intro } from "../../../components/liveChat/register/common/Intro";

export default function LiveChatRegister() {
  return (
    <div className={`mt-[64px] px-6`}>
      <Intro />
      <div className="container mx-auto">
        <Form />
      </div>
    </div>
  )
}
