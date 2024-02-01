"use client";

import { LcEditForm } from '@/src/features/lc-forms';
import { LcSearchForm } from '@/src/features/lc-search-form';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const LcEditBody: FC = () => {
  const params = useSearchParams();
  const id = Number(params.get('id'));
  const code = Number(params.get('code'));

  if (!id && !code) return <LcSearchForm />

  return <LcEditForm id={id} code={code} />
};

