import { HoverColors } from './colors';

export interface WebProps {
  onMouseOut?: () => void;
  onMouseOver?: () => void;
  hoverColors?: HoverColors;
  hoverIcon?: React.ReactNode | null;
}
