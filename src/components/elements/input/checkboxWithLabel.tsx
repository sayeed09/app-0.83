import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import CheckBox, { Props as CheckBoxProps } from '@components/base/checkbox';
import { BaseView } from '@components/base/view';

import CaptionSmall from '../text/caption-small';

interface Props extends CheckBoxProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

const CheckboxWithLabel = (props: Props): React.ReactElement => {
  const { label, containerStyle, mode, options, error, ...otherProps } = props;
  return (
    <View style={containerStyle}>
      <CaptionSmall
        style={{
          paddingBottom: 13,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </CaptionSmall>
      <BaseView row AlignLeft style={{ flexWrap: 'wrap' }}>
        <CheckBox mode={mode || 'checkbox'} options={options} {...otherProps} />
      </BaseView>
    </View>
  );
};


export default CheckboxWithLabel;
