"use client";
import { FC, useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import { Calendar as CalendarAnt } from 'antd';
import type { CalendarProps } from 'antd';
import { useEventsCalendar } from '../model/hooks/useEventsCalendar';
import { Skeleton } from './skeleton';
import { Chip } from "@heroui/react";
import { getBreakpoints } from '@/src/shared/lib';
import { useWindowSize } from '@uidotdev/usehooks';

const breakpoints = getBreakpoints();

export const Calendar: FC = () => {
  const [isMobileScreen, setMobileScreen] = useState(false);
  const {isLoading, events} = useEventsCalendar();
  const {width} = useWindowSize();
  
  useEffect(()=>{
    if (width === null) return;

    const isSmallScreen = width < breakpoints['sm'];
    const shouldSetMobileScreen = (isSmallScreen && !isMobileScreen) || (!isSmallScreen && isMobileScreen);

    if (shouldSetMobileScreen) {
      setMobileScreen(isSmallScreen);
    }
  }, [width])

  if (isLoading) return <Skeleton />;

  const dateCellRender = (value: Dayjs) => {
    for (let event of events) {
      if (value.month() === event.month && value.date() === event.date) {
        if (!isMobileScreen) {
          return (
            <ul className="events">
              <Chip size="sm">{event.name}</Chip>
            </ul>
          );
        }
      }
    }
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div className="px-2 sm:px-6">
      <CalendarAnt fullscreen={isMobileScreen ? false : true} cellRender={cellRender} />;
    </div>
  )
};

