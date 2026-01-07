import WhiteCard from 'components/elements/card/white-card';
import Accordian from 'components/shared/accordian';
import { FAQ } from 'containers/shop/product-details-metadata';
import { Faq } from 'models/product-details/product';
import React from 'react';
import { View } from 'react-native';
import { commonStyles } from 'styles/common';

interface Props {
  data: Faq[];
}
const FrequentlyAskedQuestions = (props: Props) => {
  const { data } = props;
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <>
      <View style={[commonStyles.pt4]}>
        <WhiteCard noBorderRadius style={[commonStyles.pt4, commonStyles.pb0]}>
          <Accordian
            title="Frequently Asked Questions"
            data={FAQ(data)}
            top
            contentColor="#fff"
            expand
          />
        </WhiteCard>
      </View>
    </>
  );
};
export default React.memo(FrequentlyAskedQuestions);
