import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { BaseToastProps,} from 'react-native-toast-message';

interface ErrorToastProps extends BaseToastProps {
  customStyles: StyleProp<ViewStyle>;
}

export const config: any = {
  success: ({ text1 }) => (
    <View
      style={{
        width: '100%',
        backgroundColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <Text style={{ color: '#fff' }}>{text1}</Text>
    </View>
  ),
  error: (props: ErrorToastProps) => {
    const { customStyles, text1 } = props;
    return (
      <View
        style={[
          {
            width: '100%',
            backgroundColor: '#000',
            paddingHorizontal: 12,
            paddingVertical: 10,
            elevation: 10,
          },
          customStyles,
        ]}
      >
        <Text style={{ color: '#fff' }}>{text1}</Text>
      </View>
    );
  },

};
