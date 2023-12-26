import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <header>
      <Link href="/">Главная</Link>
      <Link href="/events/">События</Link>
      <Link href="/blog/">Блог</Link>
      <Link href="/contacts/">Контакты</Link>
    </header>
  )
};

export default Header;
