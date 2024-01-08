"use client";
import { FC, useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import { Calendar as CalendarAnt } from 'antd';
import type { CalendarProps } from 'antd';
import { useEventsCalendar } from '@/hooks/useEventsCalendar';
import { CalendarSkeleton } from '../CalendarSkeleton/CalendarSkeleton';
import { Chip } from '@nextui-org/react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { cssValueToNumber } from '@/utils/helpers/cssValueToNumber';
import { useWindowSize } from '@uidotdev/usehooks';

const fullConfig = resolveConfig(tailwindConfig)

let breakpoints: {[key in string]: number} = {};
for(const [key, value] of Object.entries(fullConfig.theme.screens)) {
  breakpoints[key] = cssValueToNumber(value);
}

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

  if (isLoading) return <CalendarSkeleton />;

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

