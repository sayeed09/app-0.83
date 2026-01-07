import { Collection } from 'models/collection';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface IProps {
  item: Collection;
  handleCollectionChange: (item) => void;
  isSelected: boolean;
  setCollectionCords: any;
  collectionCords: any;
}
const Bubble = ({
  item,
  handleCollectionChange,
  isSelected,
  setCollectionCords,
  collectionCords,
}: IProps) => (
  <View
    style={[commonStyles.pad8, { alignItems: 'center', width: 100 }]}
    onLayout={event => {
      setCollectionCords({
        ...collectionCords,
        [item.handle]: event.nativeEvent.layout.x,
      });
    }}
  >
    <Pressable onPress={() => handleCollectionChange(item)}>
      <View
        style={[
          commonStyles.flexColumn,
          commonStyles.alignCenter,
          commonStyles.wAuto,
        ]}
      >
        <View style={[commonStyles.pb8, commonStyles.wAuto]}>
          <Image
            source={{ uri: item.imgSrc }}
            style={
              isSelected
                ? {
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    borderWidth: 1,
                    borderColor: '#FF6F00',
                  }
                : {
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    borderWidth: 1,
                    borderColor: '#FFF',
                  }
            }
          />
        </View>
        <View>
          <Text
            style={[
              commonStyles.fs12,
              { textAlign: 'center', color: '#7E7E7E' },
              isSelected && { color: '#000000' },
            ]}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </Pressable>
  </View>
);

export default Bubble;
