"use client";

import { LcEditForm } from '@/src/features/lc-edit-form';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const LcEditBody: FC = () => {
  const params = useSearchParams();
  const id = Number(params.get('id'));

  // TODO
  if (!id) return <div>Не указан код клиента</div>

  return <LcEditForm id={id} />
};

