import React from 'react';
import { Text } from 'react-native';
import { errorRed } from 'components/styles/colors';
import { CustomText } from '../../../AndroidFontFix';
import { commonStyles } from 'styles/common';

const ErrorText = ({ children }): React.ReactElement => (
  <CustomText style={[commonStyles.fs12, commonStyles.redColor]}>
    {children}
  </CustomText>
);

export default ErrorText;
