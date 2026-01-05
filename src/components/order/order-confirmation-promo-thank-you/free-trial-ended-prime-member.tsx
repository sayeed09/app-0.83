import React from 'react';
import { Pressable } from 'react-native';
import { BaseView } from 'components/base/view';
import WhiteCard from 'components/elements/card/white-card';
import { primeStyles } from 'components/profile/prime-summary';
import {
  ctaGreen,
  orderPromoLightGreen,
  primaryOrange,
} from 'components/styles/colors';
import { width } from 'utils/constants';

import { Box, Text } from '@components/base/foundation';
import { CustomText } from '../../../../AndroidFontFix';

const FreeTrialEndedPrime = ({ navigation }): React.ReactElement => (
  <WhiteCard noBorderRadius style={{ marginBottom: 10 }}>
    <BaseView
      AlignLeft
      style={{
        background: orderPromoLightGreen,
        borderColor: ctaGreen,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingTop: 14,
      }}
    >
      <BaseView row style={{ marginBottom: 20 }}>
        <Box
          borderTopLeftRadius={13}
          borderBottomRightRadius={13}
          borderTopRightRadius={1}
          borderBottomLeftRadius={1}
          pt={2}
          pb={2}
          pr={3}
          pl={3}
          bg="brandSecondary"
          alignItems="center"
          justifyContent="center"
          mr={3}
          style={primeStyles.primeLeaf}
        >
          <CustomText style={{ fontWeight: 'bold', fontSize: 11 }}>PRIME</CustomText>
        </Box>
        <CustomText variant="heading1" style={{ fontWeight: 'bold', flex: 1, width: '100%' }}>Your OZiva Prime Free Trial has ended</CustomText>
      </BaseView>
      <Text variant="heading2" style={{ marginBottom: 4 }}>
        Be a Prime Member
      </Text>
      <Text style={{ marginBottom: 20, opacity: 0.6 }}>
        Avail OZiva Cash benefits, cashback offers, and get free consultations
        and diet plans through chat with our experts.
      </Text>
      <BaseView style={{ marginBottom: 10 }}>
        <Pressable onPress={() => {
          navigation.navigate('OZivaPrime');
        }}>
          <BaseView
            row
            style={{
              width,
              backgroundColor: primaryOrange,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', paddingVertical: 10, marginLeft: 5 }}>
              KNOW MORE
            </Text>
          </BaseView>
        </Pressable>
      </BaseView>
    </BaseView>
  </WhiteCard>
);

export default FreeTrialEndedPrime;
