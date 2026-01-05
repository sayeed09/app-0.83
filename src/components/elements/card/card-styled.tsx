import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

export interface CardProps extends ViewProps {
  shadow?: boolean;
  noPadding?: boolean;
  noBorderRadius?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const CardWrap: React.FC<CardProps> = ({
  shadow,
  noPadding,
  noBorderRadius,
  style,
  children,
  ...rest
}) => {
  const computedStyle: ViewStyle = {
    padding: noPadding ? 0 : 15,
    borderRadius: noBorderRadius ? 0 : 6,
    borderWidth: 1,
    borderColor: '#000', // optional: replace with your default border color
    ...(shadow
      ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Android shadow
      }
      : {}),
  };

  return (
    <View style={[computedStyle, style]} {...rest}>
      {children}
    </View>
  );
};