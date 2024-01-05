import { Calendar } from "@/components/Calendar/Calendar";
import { CalendarSkeleton } from "@/components/CalendarSkeleton/CalendarSkeleton";
import { EventsIntro } from "@/components/EventsIntro/EventsIntro";

export default function Events() {
  return (
    <div className={`mt-[64px] bg-white`}>
      <EventsIntro/>
      <Calendar/>
    </div>
  )
}
