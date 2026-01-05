import React from 'react';
import { FieldInputProps } from 'formik';

export type InputType = 'text' | 'number' | 'date';

export type LabelType = string | React.FunctionComponent | React.ElementType;

export interface InputProps {
  label: LabelType;
  type: InputType;
  name: string;
  field: FieldInputProps<any>;
  form: any;
}

export interface LabelProps {
  name: string;
  label: LabelType;
}
