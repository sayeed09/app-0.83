import React from 'react';

import BaseButton, { BaseButtonProps } from '@components/base/button';

import { TextType } from '../../base/text/styled';
import { commonStyles } from 'styles/common';

const PrimaryButton = (props: BaseButtonProps): React.ReactElement => {
  const { style, accentColor } = props;
  return (
    <BaseButton
      {...props}
      textType={TextType.ANCHOR_SMALL}
      style={[style]}
      textStyle={[
        commonStyles.wAuto,
        {
          fontFamily: 'Roboto-Medium',
          fontSize: props?.fontSize || 14,
          textAlign: 'center',
          borderRadius: 3,
          paddingVertical: props?.paddingVertical || 14,
          color: props?.textColor || '#fff',
          backgroundColor: props?.disabled ? props.disabledColor ? '#FE8B6C' : '#E0E0E0' : accentColor,
          opacity: props?.disabled ? 0.5 : 1,
        }, props.textStyle
      ]}
      borderRadius={props?.borderRadius || 3}
    />
  );
};

export default PrimaryButton;
