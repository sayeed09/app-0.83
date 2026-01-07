/* eslint-disable no-nested-ternary */
import styled from '@emotion/native';

interface AppViewProps {
  row?: boolean;
  Center?: boolean;
  Right?: boolean;
  AlignRight?: boolean;
  AlignLeft?: boolean;
  wrap?: boolean;
  flex?: number;
}

export const BaseView = styled.View((props: AppViewProps) => ({
  maxWidth: '100%',
  flex: props.flex ? props.flex : 0,
  alignItems: props.AlignLeft
    ? 'flex-start'
    : props.AlignRight
    ? 'flex-end'
    : 'center',
  flexDirection: props.row ? 'row' : 'column',
  justifyContent: props.Center
    ? 'center'
    : props.Right
    ? 'flex-end'
    : 'flex-start',
  flexWrap: props.wrap ? 'wrap' : 'nowrap',
}));
