"use client"
import { Button } from "@heroui/react";
import { FC, useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useTheme } from 'next-themes';

export const ThemeSwitcher: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null;
  
  const handleClick = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  return (
    <Button onClick={handleClick} isIconOnly color="primary" size='sm' radius='full' variant="faded" aria-label="Like">
        {theme === 'dark' ? (<SunIcon width={14} />) : (<MoonIcon width={14} />)}
    </Button>  
  )
};

