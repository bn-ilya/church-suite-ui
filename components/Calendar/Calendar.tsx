"use client";
import { FC } from 'react';
import type { Dayjs } from 'dayjs';
import { Calendar as CalendarAnt } from 'antd';
import type { CalendarProps } from 'antd';

export const Calendar: FC = () => {
  const dateCellRender = (value: Dayjs) => {
    if (value.month() === 0 && value.date() === 7) {
      return (
        <ul className="events">
          Рождество
        </ul>
      );
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

