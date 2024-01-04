import { Calendar } from "@/components/Calendar/Calendar";
import { EventsIntro } from "@/components/EventsIntro/EventsIntro";

export default function Events() {
  return (
    <div className={`mt-[64px]`}>
      <EventsIntro/>
      <Calendar/>
    </div>
  )
}
