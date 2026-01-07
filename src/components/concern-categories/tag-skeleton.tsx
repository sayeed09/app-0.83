import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const TagSkeleton = () => (
  <SkeletonPlaceholder>
    <View>
      <SkeletonPlaceholder.Item width={70} height={50} />
    </View>
  </SkeletonPlaceholder>
);

export default TagSkeleton;
