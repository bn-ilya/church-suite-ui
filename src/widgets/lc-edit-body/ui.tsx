"use client";

import { LcEditForm } from '@/src/features/lc-edit-form';
import { LcSearchForm } from '@/src/features/lc-search-form';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const LcEditBody: FC = () => {
  const params = useSearchParams();
  const id = Number(params.get('id'));

  // TODO
  if (!id) return <LcSearchForm />

  return <LcEditForm id={id} />
};

