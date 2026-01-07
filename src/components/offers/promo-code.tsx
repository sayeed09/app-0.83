import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@shopify/restyle';
import { Box, Text } from 'components/base/foundation';
import { Theme } from 'styles/theme';
import { Pressable } from 'react-native';

const styles = {
  icon: { transform: [{ scaleX: -1 }] },
};

const PromoCode = ({
  code,
  onPress,
}: {
  code: string;
  onPress?: () => any;
}) => {
  const { colors } = useTheme<Theme>();
  return (
    <Box pt={2} alignSelf="flex-start">
      <Pressable
        onPress={onPress}
        borderStyle="dashed"
        borderWidth={1}
        borderRadius={2}
        py={2}
        px={4}
        minWidth={180}
        alignItems="center"
        borderColor="ctaLightGreen"
        backgroundColor="levelTwoBg"
        justifyContent="center"
        height={33}
      >
        <Text style={{ fontSize: 13 }} color="brandPrimary">
          {code}
        </Text>
      </Pressable>
      <Box position="absolute" right={20} top={2} style={styles.icon}>
        <Icon name="content-cut" size={12} color={colors.brandPrimary} />
      </Box>
    </Box>
  );
};

export default PromoCode;
