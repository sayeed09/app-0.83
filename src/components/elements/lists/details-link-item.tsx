import { useTheme } from '@shopify/restyle';
import { Box } from 'components/base/foundation';
import ListItem from 'components/elements/lists/item';
import React, { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from 'styles/theme';

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
        <Text style={{ paddingVertical: 12 }}>{title}</Text>
      </ListItem>
    </Pressable>
  );
};

export default DetailsLinkItem;
