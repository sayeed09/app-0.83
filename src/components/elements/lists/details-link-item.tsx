import React, { ReactNode } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@shopify/restyle';
import { Box, Text } from 'components/base/foundation';
import ListItem from 'components/elements/lists/item';
import { Theme } from 'styles/theme';
import { Pressable } from 'react-native';

type DetailsLinkItemProps = {
  title: string;
  icon: ReactNode;
  onPress: () => any;
  includeChevron?: boolean;
};

const DetailsLinkItem = ({
  title,
  icon,
  onPress,
  includeChevron = true,
}: DetailsLinkItemProps) => {
  const { colors } = useTheme<Theme>();
  return (
    <Pressable onPress={onPress}>
      <ListItem
        left={<Box ml={4}>{icon}</Box>}
        right={
          includeChevron ? (
            <Box mr={3}>
              <Icon name="chevron-right" color={colors.bodyText} size={24} />
            </Box>
          ) : null
        }
      >
        <Text py={4}>{title}</Text>
      </ListItem>
    </Pressable>
  );
};

export default DetailsLinkItem;
