import React from 'react';

import BaseText, { BaseTextProps } from '@components/base/text';
import { TextType } from '@components/base/text/styled';

const CaptionSmall = (props: BaseTextProps): React.ReactElement => {
  const { children } = props;
  return (
    <BaseText {...props} textType={TextType.CAPTION_SMALL}>
      {children}
    </BaseText>
  );
};

export default CaptionSmall;
