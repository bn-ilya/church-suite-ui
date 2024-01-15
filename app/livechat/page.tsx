import { LiveChatRegisterForm } from "@/components/LiveChatRegisterForm/LiveChatRegisterForm";
import { LiveChatRegisterIntro } from "@/components/LiveChatRegisterIntro/LiveChatRegisterIntro";

export default function LiveChat() {
  return (
    <div className={`mt-[64px] px-6`}>
      <LiveChatRegisterIntro />
      <div className="container mx-auto">
        <LiveChatRegisterForm />
      </div>
    </div>
  )
}
