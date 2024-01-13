import { LiveChatRegister } from "@/components/LiveChatRegister/LiveChatRegister";
import { LiveChatRegisterIntro } from "@/components/LiveChatRegisterIntro/LiveChatRegisterIntro";

export default function LiveChat() {
  return (
    <div className={`mt-[64px] px-6`}>
      <LiveChatRegisterIntro />
      <div className="container mx-auto">
        <LiveChatRegister />
      </div>
    </div>
  )
}
