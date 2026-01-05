import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ReactMoE from 'react-native-moengage';
import { setCartDeliveryCharge } from 'actions/cart';
import { setPaymentMethod, setPaymentMethodsToShow, updateAddress } from 'actions/checkout';
import Loader from 'components/elements/loader/loader';
import { useAuthState } from 'context/auth';
import { useNotificationState } from 'context/notifications';
import { PaymentMethodType } from 'models/payment';
import { GATrackingService } from 'utils/ga-tracking';

import OrderSummaryAccordion from '@components/order/order-summary-accordion';
import { useCartDispatch, useCartState } from '@context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from '@context/checkout';
import {
  getVariantIds,
  trackMoEngageAppEvent,
  updateUserMoEngageProfile,
} from '@utils/common';
import { convertToRupees } from '@utils/currency-utils';

import { getCartLineItems } from '../common';
import { PrimeMemberShipType } from 'models/prime';
import { userAuthCheckService } from 'services/user';
import { incentiveAmountService } from 'services/checkout';
import { IncentiveAmountPayload, IncentiveValue } from 'models/shop/checkout';
import useLogin from 'hooks/login';
import AddressList from './address-list';
import PrimaryButton from 'components/elements/button/primary-Button';
import { UserAddress } from 'models/shop/address';
import { styles } from 'styles/address';
import AddAddress from './address-form';
import { ShimmerButtonWrapper } from '../cart/cart-list/shimmer-effect';
import FooterDetails from '../cart/cart-list/footer-details';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddressOrderSummary = ({ navigation, route }): React.ReactElement => {
  const {
    checkout_id: checkoutId,
    discount_code: discountCode,
    address: selectedAddress,
    userAddressList
  } = useCheckoutState();
  const { trackingTransparency } = useNotificationState();
  const checkoutDispatch = useCheckoutDispatch();
  const { cartItems, lineItems } = useCartState();
  const cartDispatch = useCartDispatch();
  const { user: authUser, userData } = useAuthState();
  const { handleLogout } = useLogin();
  const [resetDeliveryChargeState, setDeliveryChargeState] = useState(0);
  const [incentiveValue, setIncentiveValue] = useState<IncentiveValue>();
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [saveAddressSubmit, setSaveAddressSubmit] = useState(false);
  const [setDefaultAddress, setDefaultAddressFlag] = useState(true);
  const [editAddressId, setEditAddressId] = useState<number | undefined>();
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (showShippingForm) {
        // Stop navigation and hide the shipping form instead
        e.preventDefault();
        setShowShippingForm(false);
      } else {
        navigation.dispatch(e.data.action);
      }
    });

    return unsubscribe;
  }, [navigation, showShippingForm]);


  const incentiveAmount = () => {
    const payload: IncentiveAmountPayload = {
      paymentMethod: PaymentMethodType.UPI,
    };
    incentiveAmountService(checkoutId, payload).then(response => {
      checkoutDispatch(setPaymentMethod(PaymentMethodType.UPI))
      setIncentiveValue(response);
    }).catch(err => {
      console.log("Error : ", err);
      if (err?.response?.status === 401) {
        handleLogout();
        navigation.navigate('CartScreen');
      }
    })
  }

  const handleSelectedAddress = (addressList: UserAddress[]) => {
    const sortedAddressList = addressList;

    if (addressList.length > 0) {
      const defaultAddress = sortedAddressList.filter(
        (item) => item.defaultAddress
      );
      if (defaultAddress.length > 0) {
        checkoutDispatch(updateAddress(defaultAddress[0]));
      } else {
        checkoutDispatch(updateAddress(sortedAddressList[0]));
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    if (
      userAddressList && userAddressList.length > 0 &&
      !selectedAddress
    ) {
      handleSelectedAddress(userAddressList);
    }
    // check and select if selected address is deleted
    if (
      userAddressList && userAddressList.length > 0 &&
      userAddressList.filter((item) => item.id === selectedAddress?.id)
        .length === 0 && setDefaultAddress
    ) {
      handleSelectedAddress(userAddressList);
      setDefaultAddressFlag(false);
    }
    if (userAddressList && userAddressList.length === 0) {
      setShowShippingForm(true)
    }

  }, [userAddressList])

  const userAuthCheck = () => {
    const payload = {
      phone: authUser?.phone,
      productID: null,
      orderID: null,
      hash: authUser?.authToken,
    };
    userAuthCheckService(payload).then(response => {
    }).catch(err => {
      console.log("Error : ", err);
    })
  }

  useEffect(() => {
    userAuthCheck();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      incentiveAmount();
    }
    if (errorMessage) {
      setErrorMessage('')
    }
  }, [selectedAddress]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      incentiveAmount();
      setDeliveryChargeState(
        resetDeliveryChargeState => resetDeliveryChargeState + 1,
      );
    });
  }, []);

  useEffect(() => {
    if (incentiveValue) {
      checkoutDispatch(
        setPaymentMethodsToShow(incentiveValue?.paymentOptions),
      );
      // Update the cart for online payment incentive
      // const lineItems = [...incentiveValue?.line_items];
      cartDispatch(
        setCartDeliveryCharge({
          freeShipping: incentiveValue?.free_shipping,
          shippingName: incentiveValue?.shipping_name,
          shippingCharges: incentiveValue?.shipping_charges,
          orderSubtotal: incentiveValue?.order_subtotal,
          orderTotal: incentiveValue?.order_total,
          totalDiscount: incentiveValue?.discount_value,
          lineItems: getCartLineItems(lineItems),
          orderTotalMRP: incentiveValue?.orderTotalMrp,
          cashback:
            (userData?.prime?.current_status === PrimeMemberShipType.Prime
              ? incentiveValue?.cashbackPrime
              : incentiveValue?.cashbackNonPrime) || 0,
        }),
      );

      if (incentiveValue?.customer?.id)
        ReactMoE.identifyUser(incentiveValue && incentiveValue?.customer?.id.toString());

      if (incentiveValue && incentiveValue.shipping_address) {
        updateUserMoEngageProfile(incentiveValue && incentiveValue.shipping_address);
      }
    }
  }, [resetDeliveryChargeState]);

  const trackContinueShopping = () => {
    const cartValues = getVariantIds(incentiveValue?.line_items);
    trackMoEngageAppEvent({
      event: 'added_address_app',
      values: [
        {
          eventAttribute: 'product_name',
          value: cartValues.names.toString() || '',
        },
        {
          eventAttribute: 'product_id',
          value: cartValues.ids.toString() || '',
        },
        {
          eventAttribute: 'price',
          value: cartValues.price.toString() || '',
        },
        {
          eventAttribute: 'quantity',
          value: cartValues?.quantity.toString() || '',
        },
      ],
      trackingTransparency,
      skipGATrack: true,
    });
    GATrackingService.trackShippingInfo(
      cartItems.map(item => ({
        item_id: String(item.productId),
        item_name: item?.productTitle,
        quantity: 1,
        price: convertToRupees(Number(item?.price)),
      })),
      discountCode?.code,
    );
  };
  const handleSubmit = () => {
    setSaveAddressSubmit(true);
  }
  const handleSaveAddress = (show) => {
    setShowShippingForm(false);
    setSaveAddressSubmit(false);
    setFormSubmitSuccess(false);
    setEditAddressId(undefined);
    setErrorMessage('')
    if (!showShippingForm) {
      trackContinueShopping();
      navigation.navigate('PaymentMethodScreen');
    }
  }
  const handleEditAddress = (addressId) => {
    setEditAddressId(addressId);
    const editAddress = userAddressList.find((item) => item.id === addressId);
    checkoutDispatch(updateAddress(editAddress as UserAddress));
    setShowShippingForm(true)
  }
  useEffect(() => {
    if (formSubmitSuccess) {
      handleSaveAddress(false);
    } else {
      setSaveAddressSubmit(false);
    }
  }, [formSubmitSuccess])

  return (
    <SafeAreaView style={[styles.container]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.scrollView]}>
        <OrderSummaryAccordion />
        {!showShippingForm ?
          <Pressable onPress={() => {
            setEditAddressId(undefined);
            setShowShippingForm(true);
          }}>
            <View style={styles.addAddressButton}>
              <Text style={styles.addAddressButtonText}>ADD NEW ADDRESS</Text>
            </View>
          </Pressable> : null}
        <View style={styles.contentContainer}>
          {!showShippingForm ?
            <AddressList navigation={navigation}
              setEditAddressId={handleEditAddress}
              errorMessage={errorMessage}
            /> : null}
          <AddAddress navigation={navigation} route={route}
            saveAddressSubmit={saveAddressSubmit}
            setSaveAddressSubmit={setSaveAddressSubmit}
            editAddressId={editAddressId}
            showShippingForm={showShippingForm}
            setFormSubmitSuccess={setFormSubmitSuccess}
            setErrorMessage={setErrorMessage}
            setLoading={setLoading}
          />
        </View>

        <View style={{ backgroundColor: '#FFF', marginBottom: 16 }}>
          <FooterDetails showTrustBadges={true} />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <ShimmerButtonWrapper onAction={() => handleSubmit()}>
          <PrimaryButton accentColor="#FF6F00" title={showShippingForm ? 'SAVE' : 'CONTINUE TO PAYMENT'}
            disabled={!incentiveValue}
            style={{ paddingHorizontal: 0 }}
            loading={loading}
          />
        </ShimmerButtonWrapper>
      </View>
    </SafeAreaView>
  );
};
export default AddressOrderSummary;
