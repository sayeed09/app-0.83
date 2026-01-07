import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { jsx } from '@emotion/core';

import { Color } from '@components/styles/colors';

import { CardProps, CardWrap } from './card-styled';

// import { CardProps, CardWrap } from './card.styled';

interface Props extends CardProps {
  style?: StyleProp<ViewStyle>;
  children: any;
}

const WhiteCard = (props: Props): React.ReactElement => {
  const { children, style, noPadding, noBorderRadius, ...restOfProps } = props;

  return (
    <CardWrap
      noPadding={noPadding}
      noBorderRadius={noBorderRadius}
      {...restOfProps}
      style={[
        {
          borderColor: noBorderRadius ? 'transparent' : '#D9D9D9',
          backgroundColor: Color.WHITE,
          elevation: noBorderRadius ? 1 : 2
        },
        style,
      ]}
    >
      {children}
    </CardWrap>
  );
};



export default WhiteCard;
