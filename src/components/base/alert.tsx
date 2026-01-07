import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, Text } from 'components/base/foundation';

const Alert = ({
  type = 'info',
  message,
}: {
  type?: 'info' | 'error';
  message: string;
}) => (
  <Box
    borderRadius={8}
    borderWidth={1}
    borderColor="levelOneBorder"
    backgroundColor={type === 'info' ? 'infoBg' : 'errorBg'}
    p={2}
    flexDirection="row"
  >
    <Icon name="information-outline" size={14} color="bodyText" />
    <Text variant="body2" ml={1}>
      {message}
    </Text>
  </Box>
);

export default Alert;
