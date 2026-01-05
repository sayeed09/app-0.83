import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@shopify/restyle';
import { Box, Text } from 'components/base/foundation';
import { Theme } from 'styles/theme';

const PointsList = ({
  points,
  type = 'unordered',
}: {
  points: string[];
  type?: 'ordered' | 'unordered';
}) => {
  const { colors } = useTheme<Theme>();
  return (
    <Box>
      {points.map((point, index) => (
        <Box
          key={index.toString()}
          flexDirection="row"
          alignItems="flex-start"
          mb={1}
        >
          {type === 'unordered' && (
            <Icon name="check" size={18} color={colors.brandPrimary} />
          )}
          <Box flex={1} ml={1}>
            <Text>{point}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default memo(PointsList);
