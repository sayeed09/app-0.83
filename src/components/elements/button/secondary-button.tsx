import React from 'react';
import BaseButton, { BaseButtonProps } from '@components/base/button';
import { TextType } from '@components/base/text/styled';
const SecondaryButton = (props: BaseButtonProps): React.ReactElement => {
  const { fontSize, textColor } = props;
  return (
    <BaseButton
      {...props}
      textStyle={[
        {
          textTransform: props?.textTransform
            ? props?.textTransform
            : 'uppercase',
          fontFamily: 'Roboto-Medium',
          fontSize: fontSize || 14,
          color: textColor || '#FF6F00',
          textAlign: 'center',
        },
      ]}
      borderRadius={4}
      outline
      textType={TextType.BODY_SMALL}
    />
  );
};

export default SecondaryButton;
