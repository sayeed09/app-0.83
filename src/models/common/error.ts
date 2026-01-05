import { AxiosError } from 'axios';

export type ErrorMessageError = AxiosError | Error | string;
export interface ErrorFallbackProps {
  error: ErrorMessageError;
  onRetry?: () => void;
  title?: string;
  noMessage?: boolean;
}

export type ErrorMessageVariants = 'inline' | 'stacked';
export interface ErrorMessageProps {
  error: ErrorMessageError;
  variant?: ErrorMessageVariants;
}

export type ErrorMessageVariantProps = {
  [key in ErrorMessageVariants]: Record<string, any>;
};
