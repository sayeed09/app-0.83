import React from 'react';
import { Pressable, Switch } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Text } from 'components/base/foundation';
import ListItem from 'components/elements/lists/item';
import { Theme } from 'styles/theme';

const SwitchListItem = ({
  title,
  subTitle,
  onValueChange,
  value,
}: {
  title: string;
  subTitle?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}) => {
  const { colors } = useTheme<Theme>();
  return (
    <Pressable
      onPress={() => (onValueChange ? onValueChange(!value) : null)}
      p={4}
    >
      <ListItem
        right={
          <Switch
            onValueChange={onValueChange}
            value={value}
            thumbColor={value ? colors.brandPrimary : colors.levelOneBg}
            trackColor={{ true: colors.appBg, false: colors.appBg }}
          />
        }
      >
        <Text variant="heading3">{title}</Text>
        {!!subTitle && (
          <Text variant="body2" color="hintText" mt={1}>
            {subTitle}
          </Text>
        )}
      </ListItem>
    </Pressable>
  );
};

export default SwitchListItem;
