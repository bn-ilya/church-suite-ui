"use client";

import { useGetEventsQuery } from "@/src/shared/api";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

interface ICalendarEvent {
  name: string,
  month: number,
  date: number,
}

export const useEventsCalendar = () => {
  const {data, isLoading, } = useGetEventsQuery();
  const [events, setEvents] = useState<Array<ICalendarEvent>>([]);

  useEffect(() => {
    if (!data || !data.length) return;

    const events: Array<ICalendarEvent> = data.map(event => {
      const dateEvent = dayjs(event.attributes.date);

      return {
        name: event.attributes.name,
        month: dateEvent.month(),
        date: dateEvent.date(),
      }
    })

    setEvents(events);
  }, [data])

  return {isLoading, events};
}