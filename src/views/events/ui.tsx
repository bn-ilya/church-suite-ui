import { EventsIntro } from "@/src/widgets/events-intro";
import { EventsCalendar } from "@/src/widgets/events-calendar";

export const Events = () => {
  return (
    <div className={`mt-[64px] bg-white`}>
      <EventsIntro/>
      <EventsCalendar/>
    </div> 
  )
}