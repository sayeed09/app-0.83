import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { width } from '@utils/constants';
interface IProps {
  height?: number;
}
const SliderSkeleton = ({ height }: IProps) => (
  <SkeletonPlaceholder>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View>
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width}
            height={height || 200}
          />
        </View>
      </View>
    </View>
  </SkeletonPlaceholder>
);

export default SliderSkeleton;
