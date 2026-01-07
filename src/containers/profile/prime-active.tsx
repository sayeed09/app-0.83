import React from 'react';
import { Image, View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import PrimeBenefits from 'containers/consult/prime-benefits';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import dayjs from 'dayjs';
import { commonStyles } from 'styles/common';
import { PrimeStyles } from 'styles/prime';
import { Text } from 'components/base/foundation';
import { UserProfileResponseModel } from 'models/auth';

interface IProps {
  primeData: UserProfileResponseModel | undefined;
}
const PrimeActive = ({ primeData }: IProps) => {

  const primeMemberSince = primeData && dayjs(primeData?.prime?.activation_date).format('MMMM D, YYYY');
  const primeSavings = primeData && primeData?.wallet && primeData?.wallet?.prime_savings;
  
  const ozivaCashData = [{
    text: 'OZiva Cash Earnings',
    amount: primeData && primeData?.wallet && primeData?.wallet?.oziva_cash_earnings,
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/cash_earning_filled_icon_e1e803ec-676d-4f09-8246-50c609837629.png?v=1712317161'
  }, {
    text: 'OZiva Cash Redeemed',
    amount: primeData && primeData?.wallet && primeData?.wallet?.oziva_cash_redeemed,
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/cashback_savings_filled_icon_2be40df1-7cec-4256-8bb1-0807209c4738.png?v=1712317161'
  }]
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
      <View style={[commonStyles.flexRow, commonStyles.justifySpaceBetween, commonStyles.mv16]}>
        <View style={{ width: '50%' }}>
          <View style={[commonStyles.flexRow]}>
            <Text style={[commonStyles.fs18, commonStyles.mr4, commonStyles.fw500]}>
              Prime Savings
            </Text>
            <Text
              style={[
                PrimeStyles.badge,
              ]}
            >
              ACTIVE
            </Text>

          </View>
          <View style={[commonStyles.mt4]}>
            <Text style={[commonStyles.fs12, commonStyles.grayColor]}>Member since {primeMemberSince}</Text>
          </View>
        </View>
        <View style={[commonStyles.flexRow]}>
          <Text style={[commonStyles.fs10]}>worth {' '}</Text>
          <Text style={[commonStyles.fwBold, commonStyles.fs16]}>
            {formatCurrencyWithSymbol(primeSavings)}
          </Text>
        </View>
      </View>

      <View style={[commonStyles.flexRow, commonStyles.justifySpaceBetween]}>
        {
          ozivaCashData.map((cash) => {
            return (
              <>
                <View
                  style={[PrimeStyles.primeActiveCashBox]}
                >
                  <View style={{ marginRight: 5 }}>
                    <Image
                      source={{ uri: cash.image }}
                      style={{ width: 30, height: 30 }}
                    />
                  </View>
                  <View>
                    <Text style={[commonStyles.fs12, commonStyles.grayColor]}>{cash.text}</Text>
                    <Text style={[commonStyles.fs16, commonStyles.fwBold]}>{cash.amount}</Text>
                  </View>
                </View>
              </>
            )
          })
        }
      </View>
      <View style={[PrimeStyles.primeBenefits]}>
        <PrimeBenefits />
      </View>
    </>
  )
};

export default PrimeActive;
