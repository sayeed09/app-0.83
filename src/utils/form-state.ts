/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { MaskPhone } from './phone-mask';
import { NumberRegex } from './regex';

export interface FormStateProps {
  error : string;
  value: string | any[];
  validations: []
  setValue: (value: any) => any;
  setError: () => void;
  filesData: any;
  preview: any;
  elProps: ElementProps;
}
export interface ElementProps {
  value: string | [];
  onChange: () => void;
  onReset: () => void;
  setValue: () => void;
  setError: () => void;
  error: string;
  required: boolean;
}

export default function useFormInput(initValue: any, validations: any[] = []) {
  const restrict = validations.find(v => v.restrict);
  const initialValue = restrict?.restrict === 'phone' ? MaskPhone(initValue) : initValue;
  
  const [value, setValue] = useState(initialValue);
  const [preview, setPreview] = useState();
  const [filesData, setFiles] = useState();
  const [error, setError] = useState('');
  
  useEffect(() => {
    const isString = typeof(initialValue) === 'string';
    const isArray = initialValue instanceof Array;
    const val = isArray || isString ? initialValue : [initialValue];
    setValue(val);
  }, [initialValue]);

  const getValidatedVal = (e) => {
    let val = e.target.value;
    
    if (val && validations) {
      const restrict = validations.find(v => v.restrict);
      
      if(!restrict) return val;
      switch (restrict.restrict) {
        case 'number': 
          val = NumberRegex.test(val) ? e.target.value : value;
        case 'phone': 
          val = MaskPhone(val);
          break;
      }
      return val;
    }
    return val;
  };

  const handleChange = (e) => {
    if (e.target && e.target.type === 'file') {
      setFiles(e.target.files);
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      let val = getValidatedVal(e);
      if (val) {
        setValue(val);
        setError('');
      } else {
        handleReset();
      }
    }
  };

  const handleReset = () => {
    setValue('');
    setError('');
  };

  const isRequired = () => {
    return validations && validations.findIndex(v => v.required) > -1;
  };

  return {
    elProps: {
      value,
      onChange: handleChange,
      onReset: handleReset,
      setValue: setValue,
      setError: setError,
      error,
      required: isRequired()
    },
    value,
    validations,
    error,
    setError,
    filesData,
    preview,
    setValue
  };
}