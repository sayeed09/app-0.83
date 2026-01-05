import React, { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type ListItemProps = {
  left?: ReactNode;
  right?: ReactNode;
};

const ListItem = ({
  left,
  children,
  right,
}: PropsWithChildren<ListItemProps>) => {
  return (
    <View style={styles.container}>
      {left}

      <View
        style={[
          styles.content,
          left && styles.leftSpacing,
          right && styles.rightSpacing,
        ]}
      >
        {children}
      </View>

      {right}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  leftSpacing: {
    marginLeft: 12, // equivalent to ml={3}
  },
  rightSpacing: {
    marginRight: 12, // equivalent to mr={3}
  },
});