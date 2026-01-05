import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Color } from '@components/styles/colors';

import { CardProps, CardWrap } from './card-styled';

interface Props extends CardProps {
  style?: StyleProp<ViewStyle> & React.CSSProperties;
  hoverStyles?: StyleProp<ViewStyle> & React.CSSProperties;
  children: any;
}

const GrayCard = (props: Props): React.ReactElement => {
  const { children, style } = props;

  return (
    <CardWrap
      {...props}
      style={[
        style,
        {
          borderColor: Color.SNOW,
          backgroundColor: Color.SNOW,
          elevation: 2,
        },
      ]}
    >
      {children}
    </CardWrap>
  );
};


export default GrayCard;
