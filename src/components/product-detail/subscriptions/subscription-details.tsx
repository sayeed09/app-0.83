import React from 'react';
import { Text, View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';

const SubscriptionDetails = (): React.ReactElement => (
  <>
    <View style={{
        backgroundColor: '#F5F5F5',
        margin: 8,
        width: '94%',
        paddingHorizontal: 8,
        borderRadius: 4,
        alignItems: 'flex-start'
      }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8}}>
          <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/delivery-truck.svg?v=1734594462' }} height={24} width={24} />
          <Text style={{color: '#006E5A', marginLeft: 8}}>Free fast shipping</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8}}>
          <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/back-in-time_1.svg?v=1734594462' }} height={24} width={24} />
          <Text style={{color: '#006E5A', marginLeft: 8}}>Delivered every month</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 8}}>
          <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/stop.svg?v=1734594462' }} height={24} width={24} />
          <Text style={{color: '#006E5A', marginLeft: 8}}>Pause or cancel anytime</Text>
        </View>
    </View>
  </>
);

export default SubscriptionDetails;
