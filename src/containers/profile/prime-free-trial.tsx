import React from 'react';
import { Text, View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import PrimeBenefits from 'containers/consult/prime-benefits';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import PrimeAddToCartButton from './prime-add-to-cart-button';
import { PrimeStyles } from 'styles/prime';
import dayjs from 'dayjs';
import PrimePricing from 'components/profile/prime-pricing';
import { UserProfileResponseModel } from 'models/auth';

interface IProps {
    primeData: UserProfileResponseModel | undefined;
    navigation: any;
}
  
const PrimeFreeTrial = ({navigation, primeData}: IProps) => {

    const freeTrialActiveTill = primeData && dayjs(primeData?.prime?.activation_date).format('MMMM D, YYYY');
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
            <View style={[commonStyles.flexRow]}>
                <View>
                    <View style={[commonStyles.flexRow]}>
                        <Text style={[commonStyles.fs18, commonStyles.mr8, commonStyles.fwBold]}>
                            Free Trial
                        </Text>
                        <Text
                            style={[
                                PrimeStyles.badge
                            ]}
                        >
                            ACTIVE
                        </Text>

                    </View>
                    <View style={[commonStyles.mt4]}>
                        <Text style={[commonStyles.fs12]}>Your Free trial is active till {freeTrialActiveTill} </Text>
                    </View>
                </View>
            </View>
            <View style={[PrimeStyles.buyPrimeBox]}>
                <Text style={[commonStyles.fs16, commonStyles.fwBold]}>Be a Prime Member</Text>
                <Text style={[commonStyles.fs12, commonStyles.grayColor]}>Enjoying the benefits of Prime membership at 97% discount.</Text>
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

export default PrimeFreeTrial;
