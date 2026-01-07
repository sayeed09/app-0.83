import WhiteCard from 'components/elements/card/white-card';
import Accordian from 'components/shared/accordian';
import {
  HowToUse as HowToUseHelper,
  WMIG,
} from 'containers/shop/product-details-metadata';
import { IHowToUse as HowToUseModel } from 'models/product-details/product';
import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface Props {
  data: HowToUseModel;
}
const HowToUse = (props: Props) => {
  const { data } = props;
  if (!data.data || data.data.length == 0) {
    return null;
  }
  return (
    <>
      <View style={[commonStyles.pt5]}>
        <WhiteCard noBorderRadius>
          <View>
            <Text style={[commonStyles.h2Tag]}>How To Use</Text>
            <View style={[commonStyles.pt0]}>
            <View>
              <View>
                {data.data.map((res, index) => (
                  <View
                    key={index}
                    style={[commonStyles.flexColumn, commonStyles.pb8]}
                  >
                    <Text
                      style={[{
                        fontSize: 14,
                        color: '#000',
                        flex: 1,
                        flexWrap: 'wrap',
                      }, commonStyles.fs14]}
                    >
                      {`${res}`}
                    </Text>
                  </View>
                ))}
                <Text style={[commonStyles.grayColor, commonStyles.fs12, commonStyles.mt8]}>
                  {data?.caption}
                </Text>
              </View>
            </View>
          </View>
          </View>
        </WhiteCard>
      </View>
    </>
  );
};
export default HowToUse;
