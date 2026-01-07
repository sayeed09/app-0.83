import React from 'react';

import BaseText, { BaseTextProps } from '@components/base/text';
import { TextType } from '@components/base/text/styled';

const BodyMedium = (props: BaseTextProps): React.ReactElement => {
  const { children } = props;
  return (
    <BaseText {...props} textType={TextType.BODY_MEDIUM}>
      {children}
    </BaseText>
  );
};

export default BodyMedium;
