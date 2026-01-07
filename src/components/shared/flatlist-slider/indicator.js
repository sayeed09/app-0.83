/* eslint-disable no-plusplus */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  active: {},
  inactive: {},
});

export const renderIndicator = (
  count,
  currentIndex,
  indicatorStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth,
  onAction,
) => {
  const indicators = [];
  for (let i = 0; i < count; i++) {
    indicators.push(
      <Pressable key={i.toString()} onPress={() => onAction(i)}>
        <View
          style={[
            styles.indicator,
            indicatorStyle,
            i === currentIndex
              ? indicatorActiveColor
                ? {
                    ...styles.active,
                    ...{
                      backgroundColor: indicatorActiveColor,
                      width: indicatorActiveWidth,
                    },
                  }
                : styles.active
              : {
                  ...styles.inactive,
                  ...{ backgroundColor: indicatorInActiveColor },
                },
          ]}
        />
      </Pressable>,
    );
  }
  return indicators;
};

export const Indicator = ({
  itemCount,
  currentIndex,
  indicatorStyle,
  indicatorContainerStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth = 6,
  onAction,
}) => (
  <View style={[styles.container, indicatorContainerStyle]}>
    {renderIndicator(
      itemCount,
      currentIndex,
      indicatorStyle,
      indicatorActiveColor,
      indicatorInActiveColor,
      indicatorActiveWidth,
      onAction,
    )}
  </View>
);
