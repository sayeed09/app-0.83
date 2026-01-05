import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { width } from 'utils/constants';

const ProductSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ marginLeft: 20, width: width / 2 }}>
          <SkeletonPlaceholder.Item marginTop={6} width={150} height={150} />
          <View
            style={{ marginTop: 6, width: 150, height: 20, borderRadius: 2 }}
          />
          <View
            style={{ marginTop: 6, width: 150, height: 20, borderRadius: 2 }}
          />
          <View
            style={{ marginTop: 6, width: 150, height: 20, borderRadius: 2 }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ marginLeft: 10, width: width / 2 }}>
          <SkeletonPlaceholder.Item marginTop={6} width={150} height={150} />
          <View
            style={{ marginTop: 6, width: 150, height: 20, borderRadius: 2 }}
          />
          <View
            style={{ marginTop: 6, width: 150, height: 20, borderRadius: 2 }}
          />
          <View
            style={{ marginTop: 6, width: 150, height: 20, borderRadius: 2 }}
          />
        </View>
      </View>
    </View>
  </SkeletonPlaceholder>
);

export default ProductSkeleton;
