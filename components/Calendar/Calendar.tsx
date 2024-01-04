"use client";
import { FC } from 'react';
import type { Dayjs } from 'dayjs';
import { Calendar as CalendarAnt } from 'antd';
import type { CalendarProps } from 'antd';
import { useEventsCalendar } from '@/hooks/useEventsCalendar';

export const Calendar: FC = () => {
  const {isLoading, events} = useEventsCalendar()
  
  if (isLoading) return <p>Загрузка...</p>;

  const dateCellRender = (value: Dayjs) => {
    for (let event of events) {
      if (value.month() === event.month && value.date() === event.date) {
        return (
          <ul className="events">
            {event.name}
          </ul>
        );
      }
    }
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };


  return (
    <div className="px-6">
      <CalendarAnt cellRender={cellRender} />;
    </div>
  )
};

