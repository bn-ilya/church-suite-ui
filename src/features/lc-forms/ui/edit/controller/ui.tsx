"use client";

import { FC, useEffect } from 'react';
import { IControllerProps } from './ui.props';
import { Form } from '../form/ui';
import { prepareFormData } from '../../../lib/helpers/prepare-form-data';

export const Controller: FC<IControllerProps> = ({data}) => {
  const formData = prepareFormData(data);
  return <Form {...formData} />
};

