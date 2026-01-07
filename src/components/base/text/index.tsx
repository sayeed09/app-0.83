/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

import { Color } from '@components/styles/colors';

import { FontSize, FontWeight, LineHeight, TextFont, TextType } from './styled';

export interface BaseTextProps {
  color?: Color;
  fontWeight?:
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | 'bold'
  | 'normal';
  textType?: TextType;
  //   tip?: TipText;
  containerStyle?: StyleProp<ViewStyle> & React.CSSProperties;
  style?: StyleProp<TextStyle>;
  totalNumberOfLines?: any;
  children: any;
}

const BaseText = ({
  color = Color.SPACE,
  textType = TextType.H4,
  containerStyle = undefined,
  style = undefined,
  fontWeight = undefined,
  children,
  totalNumberOfLines,
}: BaseTextProps) => {
  const type = textType || TextType.H4;

  const textStyle: StyleProp<TextStyle> = {
    color,
    fontSize: FontSize[type],
    fontWeight: fontWeight || FontWeight[type],
    fontFamily: (TextFont[type] as any) as string,
    lineHeight: LineHeight[type],
    flex: 1,
    flexWrap: 'wrap',
    // @ts-ignore
    // wordBreak: 'break-word',
  };

  return (
    <View style={[containerStyle, { flexDirection: 'row' }]}>
      <Text
        numberOfLines={totalNumberOfLines || 0}
        ellipsizeMode="tail"
        style={[textStyle, style, { fontFamily: 'Roboto-Medium' }]}
      >
        {children}
      </Text>
    </View>
  );
};


export default BaseText;
