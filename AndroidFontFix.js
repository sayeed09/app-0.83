import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { getManufacturerSync } from 'react-native-device-info';

export const CustomText: FunctionComponent<CustomTextProps> = ({
  children,
  style,
}) => {
  if (Platform.OS !== 'android') {
    return <Text style={style}>{children}</Text>;
  }

  let manufacturer = getManufacturerSync();

  let styles;

  switch (manufacturer) {
    case 'OnePlus':
      styles = StyleSheet.create({
        androidFontFixFontFamily: {
          fontFamily: 'Slate',
          // fontFamily: 'Roboto',
        },
      });
      break;

    case 'Oppo':
      styles = StyleSheet.create({
        androidFontFixFontFamily: {
          // fontFamily: 'Oppo Sans', // not sure of the name of the font
          fontFamily: 'Roboto',
        },
      });
      break;

    case 'LG': // https://github.com/facebook/react-native/issues/15114#issuecomment-366066157
      styles = StyleSheet.create({
        androidFontFixFontFamily: {
          // We don't know the default fontFamily for the LG platform
          fontFamily: 'Roboto',
        },
      });
      break;

    default:
      return <Text style={[style]}>{children}</Text>;
  }
  return (
    <Text style={[style, styles.androidFontFixFontFamily]}>{children}</Text>
  );
};
