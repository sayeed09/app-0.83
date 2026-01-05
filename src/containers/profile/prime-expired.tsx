import React from 'react';
import { Text, View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import PrimeBenefits from 'containers/consult/prime-benefits';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

import PrimeAddToCartButton from './prime-add-to-cart-button';
import { PrimeStyles } from 'styles/prime';
import PrimePricing from 'components/profile/prime-pricing';
import { UserProfileResponseModel } from 'models/auth';

interface IProps {
  navigation: any;
  primeData: UserProfileResponseModel | undefined
}

const PrimeExpired = ({ navigation, primeData }: IProps) => {
  
  const primeSavings = primeData && primeData?.wallet && primeData?.wallet?.prime_savings;
  return (
    <>
      <View>
        <SvgRenderer
          width="70"
          height="37"
          source={{
            uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_logo.svg?v=1709117915',
          }}
          style={[commonStyles.mv16]}
        />
      </View>
      <View style={[commonStyles.flexRow, commonStyles.justifySpaceBetween]}>
        <View style={{ width: '50%' }}>
          <View style={[commonStyles.flexRow]}>
            <Text style={[commonStyles.fs18, commonStyles.fwBold, commonStyles.mr4]}>
              OZiva Prime Expired
            </Text>
            <Text
              style={[
                PrimeStyles.badge,
                {
                  backgroundColor: '#E0E0E0',
                  color: '#7E7E7E'
                }
              ]}
            >
              Expired
            </Text>

          </View>
          <View>
            <Text style={[commonStyles.fs12, commonStyles.grayColor]}>Your membership has expired</Text>
          </View>
        </View>
        <View style={[commonStyles.flexRow]}>
          <Text style={[commonStyles.fs10, commonStyles.grayColor]}>worth {' '}</Text>
          <Text style={[commonStyles.fs18, commonStyles.fwBold]}>
            {formatCurrencyWithSymbol(primeSavings)}
          </Text>
        </View>
      </View>


      <View style={[PrimeStyles.buyPrimeBox]}>
        <Text style={[commonStyles.fs16, commonStyles.fwBold]}>Renew NOW!</Text>
        <Text style={[commonStyles.fs12, commonStyles.grayColor]}>
          Continue enjoying the benefits of Prime membership at 97% discount.
        </Text>
        <PrimePricing />
        <View style={[commonStyles.flexRow, commonStyles.justifyCenter]}>
          <PrimeAddToCartButton navigation={navigation} />
        </View>
      </View>
      <View style={[PrimeStyles.primeBenefits]}>
        <PrimeBenefits />
      </View>
    </>
  );
};

export default PrimeExpired;
