import styled from '@emotion/native';

export interface CardProps {
  shadow?: boolean;
  noPadding?: boolean;
  noBorderRadius?: boolean;
}

export const CardWrap = styled.View(props => ({
  padding: props.noPadding ? 0 : 15,
  borderRadius: props.noBorderRadius ? 0 : 6,
  borderWidth: 1,
}));
