export type ButtonTypes = 'submit' | 'button' | 'reset';

export type ButtonVariants = 'primary' | 'secondary';
export interface ButtonProps {
  type: ButtonTypes;
  variant: ButtonVariants;
  disabled?: boolean;
}
