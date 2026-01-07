import React from 'react';
import { Pressable, Text } from 'react-native';
import { BaseView } from '../view';
import { CheckBoxAction, CheckBoxCheck } from './styled';

interface Props {
  checked: boolean;
  setCheckbox: (checked: boolean) => void;
  title: string;
  labelContainerStyles?: any;
  size?: number;
  titleFontSize?: number;
}

const OZCheckbox = (props: Props): React.ReactElement => {
  const { checked, setCheckbox, title, labelContainerStyles, size, titleFontSize } = props;
  return (
    <Pressable onPress={() => setCheckbox(!checked)}>
      <BaseView row>
        <CheckBoxAction size={size || 18} checked={checked}>
          <CheckBoxCheck checked={checked} />
        </CheckBoxAction>
        <Text
          style={[
            {
              marginLeft: 10,
              paddingVertical: 4,
              fontFamily: 'Roboto-Regular',
              fontSize: titleFontSize || 15,
              lineHeight: 18,
            },
            labelContainerStyles,
          ]}
        >
          {title}
        </Text>
      </BaseView>
    </Pressable>
  );
};

export default OZCheckbox;
