import React, { PropsWithChildren, ReactNode } from 'react';
import { Box } from 'components/base/foundation';

type ListItemProps = {
  left?: ReactNode;
  right?: ReactNode;
};

const ListItem = ({
  left,
  children,
  right,
}: PropsWithChildren<ListItemProps>) => (
  <Box flexDirection="row" alignItems="center">
    {left}
    <Box flex={1} ml={left ? 3 : undefined} mr={right ? 3 : undefined}>
      {children}
    </Box>
    {right}
  </Box>
);

export default ListItem;
