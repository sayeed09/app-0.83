import { Collection } from 'models/collection';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface IProps {
  collection: Collection;
  isSelected: boolean;
  fontColor?: any;
  handleOnClick: (item) => void;
}
const Tab = ({ collection, isSelected, handleOnClick, fontColor }: IProps) => (
  <Pressable onPress={() => handleOnClick(collection)}>
    <View
      style={[
        commonStyles.pv8,
        commonStyles.ph16,
        isSelected
          ? { borderColor: '#6BBD58', backgroundColor: '#F1FFEE' }
          : { borderColor: '#E0E0E0' },
        { borderWidth: 1, borderRadius: 2, margin: 4 }
      ]}
    >
      <Text style={[commonStyles.fs13, commonStyles.fw500, {color: fontColor}]}>
        {collection.name}
      </Text>
    </View>
  </Pressable>
);
export default Tab;
