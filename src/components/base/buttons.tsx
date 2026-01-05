import React, { ReactElement } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { Box, Text } from 'components/base/foundation';

export const PrimaryButton = ({
  title,
  onPress,
  isLoading = false,
  size = 'regular',
  icon,
  disabled,
}: {
  title: string;
  icon?: ReactElement;
  onPress?: () => any;
  isLoading?: boolean;
  size?: 'small' | 'regular' | 'large';
  disabled?: boolean;
}) => (
  <Pressable
    style={{
      borderRadius: 2,
      backgroundColor: disabled ? '#D1D5DB' : '#69B244',
      paddingVertical: 8,
      paddingHorizontal: 6,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    }}
    onPress={() => {
      disabled ? {} : onPress && onPress();
    }}
  >
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <>
        <Text variant="heading3" color={'onBrandPrimary'}>
          {title}
        </Text>
      </>
    )}
  </Pressable>
);

export const SecondaryButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => any;
}) => (
  <Pressable
    borderRadius={2}
    py={3}
    px={4}
    onPress={onPress}
    alignItems="center"
    justifyContent="center"
  >
    <Text variant="heading3" color={onPress ? 'brandPrimary' : 'disabledText'}>
      {title}
    </Text>
  </Pressable>
);
