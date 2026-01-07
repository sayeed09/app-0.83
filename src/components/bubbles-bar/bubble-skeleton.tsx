import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { commonStyles } from 'styles/common';

const BubbleSkeletonItem = () => {
  return (
    <SkeletonPlaceholder>
      <View>
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={60}
          height={60}
          borderRadius={60}
        />
      </View>
    </SkeletonPlaceholder>
  );
};
const BubbleSkeleton = () => (
  <>
    {new Array(4).fill(null).map((item, index) => {
      return (
        <View style={[commonStyles.pad8, { alignItems: 'center', width: 100 }]} key={index}>
          <View style={[commonStyles.pb8]}>
            <BubbleSkeletonItem />
          </View>
        </View>
      );
    })}
  </>
);

export default BubbleSkeleton;
