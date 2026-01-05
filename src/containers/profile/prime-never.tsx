import React from 'react';
import { Text, View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import PrimeBenefits from 'containers/consult/prime-benefits';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import PrimeAddToCartButton from './prime-add-to-cart-button';
import { PrimeStyles } from 'styles/prime';
import PrimePricing from 'components/profile/prime-pricing';


const PrimeNever = ({navigation}) => {
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

            <Text style={[commonStyles.fwBold, commonStyles.fs18]}>
                Become a Prime Member
            </Text>
            <View style={[PrimeStyles.buyPrimeBox]}>
                <Text style={[commonStyles.fwBold, commonStyles.fs16]}>Be a Prime Member</Text>
                <Text style={[commonStyles.grayColor, commonStyles.fs12]}>Enjoying the benefits of Prime membership at 97% discount.</Text>
                <PrimePricing />
                <View style={[commonStyles.flexRow, commonStyles.justifyCenter]}>
                    <PrimeAddToCartButton navigation={navigation}/>
                </View>
            </View>
            <View style={[PrimeStyles.primeBenefits]}>
                <PrimeBenefits />
            </View>
        </>
    )
};

export default PrimeNever;
