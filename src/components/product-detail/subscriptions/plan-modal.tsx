import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import OZModal from 'components/modal';

import {
  Plan,
  SubscriptionPlanResponseModel,
} from 'models/product-details/subscription-plan-response';
import { trackMoEngageAppEvent } from 'utils/common';
import {
  IProductResponse,
  IVariant,
} from 'models/product-details/product';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import SubscriptionDetails from './subscription-details';
import crashlytics from '@react-native-firebase/crashlytics';
import PDPButton from 'components/elements/button/pdp-button';
import { Product } from 'models/product';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
    paddingTop: 10,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
interface IProps {
  subscriptionPlans: SubscriptionPlanResponseModel;
  onCloseSubscriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  productData: IProductResponse;
  selectedVariant: IVariant;
  onHandleBuyNow: (selectedPlan: Plan) => void;
  isBuyNowLoading: boolean;
  variantImage: string;
  productAdditionalDetails: Product;
}

const PlanModal = (props: IProps): React.ReactElement => {
  const {
    subscriptionPlans,
    onCloseSubscriptionModal,
    productData,
    selectedVariant,
    onHandleBuyNow,
    isBuyNowLoading,
    productAdditionalDetails,
    variantImage
  } = props;

  const inset = useSafeAreaInsets();

  const [selectedPlan, setSelectedPlan] = useState<Plan | undefined>(subscriptionPlans.plans[0]);
  const RegularPurchase = () => {
    return (
      <TouchableNativeFeedback onPress={() => setSelectedPlan(undefined)}>
        <View
          style={{
            flexDirection: 'column',
            borderWidth: 1,
            flex: 0.35,
            marginVertical: 4,
            borderRadius: 4,
            marginHorizontal: 4,
            borderColor: !selectedPlan ? '#6BBD58' : '#BDBDBD',
            height: !selectedPlan ? 180 : 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 0.5,
              width: '100%',
              padding: 8,
              borderRadius: 4,
              paddingVertical: 18,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: !selectedPlan ? '#f1ffee' : '#F5F5F5',
            }}
          >
            <Text style={[commonStyles.fs16, commonStyles.fw500]}>
              One
            </Text>
            <Text style={[commonStyles.fs11, commonStyles.fw300]}>
              Time Purchase
            </Text>
          </View>
          <View style={{ flex: 0.5, padding: 8, paddingVertical: 18, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={[commonStyles.fs14, commonStyles.fw500]}>
              {' '}
              {formatCurrencyWithSymbol(selectedVariant.price)}
            </Text>
            <Text style={{ fontSize: 12, color: '#7E7E7E' }}>
              <Text style={{ textDecorationLine: 'line-through' }}>
                {formatCurrencyWithSymbol(selectedVariant.compareAtPrice)}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };
  return (
    <OZModal
      visible={true}
      onRequestClose={() => onCloseSubscriptionModal(false)}
      setModalVisible={() => onCloseSubscriptionModal(false)}
      title="Purchase Options"
      transparent
      animationType="fade"
      contentContainerStyles={{ height: 'auto' }}
      headerStyles={[
        {
          backgroundColor: '#F1FFEE',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        },
      ]}
    >
      <View style={[styles.modalView]}>
        <Text style={{ alignSelf: 'flex-start', marginLeft: 16, fontWeight: 500, fontSize: 14 }}>Select Duration</Text>
        <View
          style={[
            commonStyles.mh8,
            commonStyles.mt4,
            commonStyles.pv8,
            commonStyles.mb16,
            commonStyles.radius2,
            , { flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <RegularPurchase />
          {subscriptionPlans.plans.map((item, index) => {
            return (
              <>
                <TouchableNativeFeedback
                  onPress={() => {
                    setSelectedPlan(item);
                    trackMoEngageAppEvent({
                      event: 'subscribe_save_app',
                      values: [
                        {
                          eventAttribute: 'subscription_duration',
                          value: `${item.subscription_interval} Months`,
                        },
                        {
                          eventAttribute: 'product_name',
                          value: productData?.title,
                        },
                        {
                          eventAttribute: 'product_id',
                          value: productData?.id,
                        },
                      ],
                      skipGATrack: true,
                      trackingTransparency: true,
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'column',
                      borderWidth: 1,
                      flex: 0.35,
                      marginVertical: 4,
                      borderRadius: 4,
                      marginHorizontal: 4,
                      borderColor: selectedPlan === item ? '#6BBD58' : '#BDBDBD',
                      height: selectedPlan === item ? 180 : 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {index === 0 && (
                      <View
                        style={{
                          position: 'absolute',
                          top: -10,
                          zIndex: 999,
                          height: 20,
                          backgroundColor: '#FECC0E',
                          borderRadius: 10,
                          width: 'auto',
                          maxWidth: 120,
                          paddingHorizontal: 8,
                          overflow: 'hidden',
                          flexWrap: 'wrap',
                          alignSelf: 'center',
                          alignContent: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Text
                          style={[commonStyles.fw500, {
                            color: '#006E5A',
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontSize: 12,
                            lineHeight: 15,
                            letterSpacing: 0.4,
                          }]}
                        >
                          Recommended
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'column',
                        width: '100%',
                        padding: 8,
                        borderRadius: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selectedPlan === item ? '#f1ffee' : '#F5F5F5',
                        paddingVertical: 18,
                      }}
                    >
                      <Text style={[commonStyles.fs16, commonStyles.fw500]}>
                        {item.subscription_interval == 3 ? 'Three' : item.subscription_interval == 6 ? 'Six' : item.subscription_interval}
                      </Text>
                      <Text style={[commonStyles.fs11]}>Months</Text>
                    </View>
                    <View style={{ flex: 0.5, padding: 8, paddingVertical: 18, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={[commonStyles.fs13, commonStyles.fw500]}>
                        {' '}
                        ₹{item.base_price}
                        <Text style={[commonStyles.fs12, commonStyles.fw300]}>/month</Text>
                      </Text>
                      <Text style={{ fontSize: 12, color: '#7E7E7E' }}>
                        {item.compare_at_price - item.base_price > 0 ? (
                          <Text
                            style={{ textDecorationLine: 'line-through' }}
                          >
                            ₹{item.compare_at_price}
                          </Text>
                        ) : null}
                      </Text>
                      {item.compare_at_price - item.base_price > 0 ? (
                        <View style={{
                          position: 'absolute',
                          bottom: -8,
                          backgroundColor: '#FF6F00',
                          borderRadius: 10,
                          paddingVertical: 2,
                          paddingHorizontal: 8,
                        }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 12,
                            }}
                          >
                            Save : ₹{item.compare_at_price - item.base_price}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </>
            );
          })}
        </View>
        {selectedPlan && <SubscriptionDetails />}
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <PDPButton
            title={'BUY NOW'}
            productImage={variantImage}
            ratings={productAdditionalDetails?.averageRating}
            compareAtPrice={
              selectedPlan ? selectedPlan?.compare_at_price : selectedVariant.compareAtPrice
            }
            price={
              selectedPlan ? selectedPlan?.base_price : selectedVariant.price
            }
            onPress={() => {
              onHandleBuyNow(selectedPlan as Plan);
              crashlytics().log(
                `Proceed to subscription cart : ${JSON.stringify(
                  selectedPlan,
                )}`,
              );
            }} />
        </View>
      </View>
    </OZModal>
  );
};

export default PlanModal;
