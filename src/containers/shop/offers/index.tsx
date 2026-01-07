import React, { useEffect, useState } from 'react';
import { Keyboard, ListRenderItem, Pressable, ScrollView, TextInput, View } from 'react-native';
import AppModal from 'components/app-modal';
import OfferAppliedModal from 'components/cart/offer-applied-modal';
import OZCashForCart from 'components/cart/oziva-cash-cart';
import { useCheckoutState } from 'context/checkout';
import { useModalsDispatch, useModalsState } from 'context/modals';
import { useNotificationState } from 'context/notifications';
import useCart from 'hooks/cart';
import { FetchCartParam } from 'models/cart/fetchcart';
import { trackMoEngageAppEvent } from 'utils/common';
import { height } from 'utils/constants';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';

import { Box, Text } from '@components/base/foundation';
import WhiteCard from '@components/elements/card/white-card';
import Loader from '@components/elements/loader/loader';
import { useCartState } from '@context/cart/CartContext';
import LoginModal from 'components/login/standard/login-modal';
import { commonStyles } from 'styles/common';
import crashlytics from '@react-native-firebase/crashlytics';
import { cartService } from 'services/cart';
import { Offer } from 'models/offers';
import SvgRenderer from 'react-native-svg-renderer';

const ShopOffersContainer = ({ navigation, route }) => {
  const {
    cartItems,
    isOzivaCashSelected,
    cartLoading,
    totalDiscount,
    offerList,
    orderTotal
  } = useCartState();
  const { trackingTransparency } = useNotificationState();
  const { discount_code: discountCode } = useCheckoutState();
  const [customDiscountCode, setcustomDiscountCode] = useState('');
  const [showConfettiState, setShowConfettiState] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getCart } = useCart();
  const { loginModalVisbility } = useModalsState();

  const showConfetti = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      navigation.navigate('CartScreen');
      setShowSuccessModal(false);
    }, 4000);
  };

  useEffect(() => {
    if (showConfettiState) {
      showConfetti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfettiState]);


  const renderOffer: ListRenderItem<any> = (item) => {

    const applyCode = () => {
      crashlytics().log(`Applied coupon : ${item.code}, ${JSON.stringify(cartItems)}`);
      let input: FetchCartParam = { code: item?.code };
      getCart(input).then(() => {
        setShowConfettiState(true);
      }).catch((error) => {
        setShowConfettiState(false);
      });
      trackMoEngageAppEvent({
        event: `applied_coupon_app`,
        values: [
          { eventAttribute: 'coupon_code_applied', value: item?.code },
          { eventAttribute: 'coupon_id', value: item?.id ?? '' },
          {
            eventAttribute: 'coupon_code_type',
            value: item?.type,
          },
          {
            eventAttribute: 'coupon_code_description',
            value: item?.description,
          },
        ],
        trackingTransparency,
      });
    };
    return (
      <>
        <Box pt={3} key={item?.code} style={[commonStyles.pt0]} />
        <View style={[commonStyles.offerCardBox]}>
          <View style={[commonStyles.borderLeftGreen, commonStyles.mr8]}></View>
          <View style={[commonStyles.pad8, { flex: 0.7 }]}>
            <Text style={[commonStyles.h3Tag, commonStyles.mb0]}>
              {item.description}
            </Text>
            {item.validOn ? (
              <Text
                style={[
                  commonStyles.fs12,
                  commonStyles.grayColor,
                  commonStyles.mt4,
                ]}
              >
                {item.validOn}
              </Text>
            ) : null}
            <Text style={[commonStyles.fs13, commonStyles.mt8]}>
              <Text
                style={[
                  commonStyles.lightGreenColor,
                  commonStyles.fwBold,
                  commonStyles.fs14,
                ]}
              >
                {item.code}
              </Text>
            </Text>
          </View>
          <View
            style={[
              commonStyles.pt8,
              { flex: 0.3, alignItems: 'flex-end', marginRight: 15 },
            ]}
          >
            <Pressable onPress={() => {
              if (discountCode.code != item.code) {
                applyCode();
              }
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {discountCode.code == item.code ? <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/success_icon_svg.svg?v=1755607973' }} width={20} height={20} /> : null}
                <Text style={{
                  fontSize: 13,
                  color: (orderTotal ?? 0) / 100 < item.minSubtotal ? '#BDBDBD' : discountCode.code == item.code ? '#6BBD58' : '#FF6F00',
                  fontWeight: 'bold',
                }}>{discountCode.code == item.code ? 'APPLIED' : 'APPLY'}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </>
    );
  };
  const handleChange = text => {
    setcustomDiscountCode(text);
  };
  const handleApplyOffers = () => {
    Keyboard.dismiss();
    if (customDiscountCode) {
      let input: FetchCartParam = { code: customDiscountCode.toUpperCase() };
      getCart(input).then(() => {
        setShowConfettiState(true);
      }).catch((error) => {
        setShowConfettiState(false);
      });;
    }
  };

  return (
    <Box flex={1} backgroundColor="levelOneBg">
      <Box>
        <WhiteCard noBorderRadius>
          <View
            style={{
              borderRadius: 2,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                style={[
                  commonStyles.border0,
                  commonStyles.pl16,
                  commonStyles.pv8,
                  commonStyles.fs14,
                  commonStyles.pv8,
                  { color: '#000', textTransform: 'uppercase' }
                ]}
                placeholderTextColor="#7E7E7E"
                value={customDiscountCode}
                onChangeText={handleChange}
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="characters"
                keyboardType="default"
                textContentType="none"
                importantForAutofill="no"
                placeholder="Enter Coupon/Gift card code"
              />
            </View>
            <View style={[commonStyles.pr16]}>
              <Pressable onPress={handleApplyOffers}>
                <Text
                  style={[
                    commonStyles.fs14,
                    commonStyles.fwBold,
                    { color: '#FF6F00' }
                  ]}
                >
                  APPLY
                </Text>
              </Pressable>
            </View>
          </View>
          <Text
            style={[
              commonStyles.fs14,
              commonStyles.mt16,
              commonStyles.grayColor,
            ]}
          >
            You can either apply OZiva Cash or Offer
          </Text>
          <View
            style={[
              commonStyles.mt16,
              commonStyles.borderAll,
              commonStyles.radius4,
            ]}
          >
            <Text
              style={[
                commonStyles.h2Tag,
                commonStyles.pad8,
                commonStyles.borderBottom,
              ]}
            >
              OZiva Cash
            </Text>
            <View style={[commonStyles.pad8, commonStyles.pt0]}>
              <OZCashForCart fetchOffersLoading={loading} setShowConfettiState={setShowConfettiState} />
            </View>
          </View>
          {loading || cartLoading ? (
            <Loader />
          ) : (
            <>
              <Text style={[commonStyles.h2Tag, commonStyles.mt16]}>
                Offers
              </Text>
              <View style={{ height: height * 0.5 }}>
                <ScrollView>
                  {offerList && offerList.map((item: Offer) => renderOffer(item))}
                </ScrollView>
              </View>
            </>
          )}
        </WhiteCard>
      </Box>
      <AppModal
        animateFrom="center"
        modalVisible={showSuccessModal}
        component={() => (
          <OfferAppliedModal
            text1={`${isOzivaCashSelected ? `'OZiva Cash'` : `${discountCode?.code}`
              } Applied`}
            text2={`You save ${formatCurrencyWithSymbol(
              convertToRupees(
                Number(totalDiscount)
              ),
            )} on your purchase`}
            isLoginFailed={false}
          />
        )}
        style={{ borderRadius: 10 }}
        onBackButtonPress={() => {
          setShowSuccessModal(false);
          navigation.navigate('CartScreen');
        }}
      />
      {loginModalVisbility ? <LoginModal /> : null}
    </Box>
  );
};

export default ShopOffersContainer;
