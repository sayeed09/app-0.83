import { useCheckoutDispatch, useCheckoutState } from '@context/checkout';
import { createCheckoutAction, setDiscountCode } from 'actions/checkout';
import { useAuthDispatch, useAuthState } from 'context/auth';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useCartState } from '@context/cart/CartContext';
import crashlytics from '@react-native-firebase/crashlytics';
import { setRedirectToCheckout } from 'actions/auth';
import { setLoginModal } from 'actions/modals';
import { useModalsDispatch } from 'context/modals';
import { useNotificationState } from 'context/notifications';
import useLogin from 'hooks/login';
import { CartItem } from 'models/shop/cart';
import { CheckoutCartItem, CreateCheckoutPayload, ISubscriptionObject } from 'rest/checkout/mutations/create-checkout';
import { getUser } from 'services/auth';
import { cartService } from 'services/cart';
import { createUserCheckoutService } from 'services/checkout';
import { fetchAddressSaveProgress } from 'services/login';
import { getVariantIds, trackMoEngageAppEvent } from 'utils/common';
import { FBTrackingService } from 'utils/fb-tracking';
import { GATrackingService } from 'utils/ga-tracking';
import FooterBar from './footer-bar';



const CartBottomBar = ({ navigation, userAddressFetched }): React.ReactElement => {
  const {
    cartLoading,
    isSubscriptionItem,
    cartItems,
    orderSubtotal,
    orderTotal,
    isOzivaCashSelected
  } = useCartState();
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const checkoutDispatch = useCheckoutDispatch();
  const { user: userInAuth, isAuthenticated, shipRocketImportToken, shipRocketLogin, redirectToCheckout } = useAuthState();
  const { handleLogout } = useLogin();
  const authDispatch = useAuthDispatch();
  const modalsDispatch = useModalsDispatch();


  const { discount_code: discountCode } = useCheckoutState();
  const { trackingTransparency } = useNotificationState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchAddressProgress, setAddressFetchProgress] = useState(false);

  const handleBuyNow = async () => {
    try {
      if (cartLoading) return;

      let checkoutId = '';
      setIsSubmitting(true);

      const user = await getUser();
      if (!user) {
        crashlytics().log('Login model populated.');
        setIsLoginSuccessful(false);
        setIsSubmitting(false);
        shipRocketLogin && setAddressFetchProgress(true)
        modalsDispatch(setLoginModal(true));
        authDispatch(setRedirectToCheckout(true));
        return;
      }
      if (!isSubscriptionItem) {
        const preparedCheckoutCartItems: CheckoutCartItem[] = cartItems.map(
          cartItem => ({
            variant_id: cartItem.id,
            image: cartItem.imageUrl,
            properties: {},
            ...cartItem,
          }),
        );

        const createCheckoutPayload: CreateCheckoutPayload = {
          line_items: preparedCheckoutCartItems,
          order_subtotal: orderSubtotal ?? 0,
          order_total: orderTotal ?? 0,
          discount_code: discountCode?.code,
          channel: 'app',
        };

        // if (deviceId) {
        //   createCheckoutPayload.deviceId = deviceId;
        // }

        const payload = {
          line_items: createCheckoutPayload.line_items,
          order_subtotal: createCheckoutPayload.order_subtotal,
          order_total: createCheckoutPayload.order_total,
          discount_code: createCheckoutPayload.discount_code,
          channel: createCheckoutPayload.channel,
          cash_apply: !!isOzivaCashSelected,
          deviceId: createCheckoutPayload.deviceId,
        };

        const checkoutData = await createUserCheckoutService(payload);

        crashlytics().log(
          `Placed Order button clicked on regular checkout : ${JSON.stringify(
            createCheckoutPayload,
          )}`,
        );
        if (checkoutData?.response?.data?.error?.description) {
          Toast.show({
            text1: `${checkoutData?.response?.data?.error?.description}`,
            position: 'bottom',
            bottomOffset: 70,
            type: 'success',
          });
          setIsSubmitting(false);
          return;
        }
        if (!checkoutData?.data) {
          // handle if checkout is not being created
          Toast.show({
            text1: `Please try again`,
            position: 'bottom',
            bottomOffset: 70,
            type: 'success',
          });
          navigation ? navigation.navigate('index') : null;
          return;
        }
        checkoutId = checkoutData.data.checkout_id;
        checkoutDispatch(createCheckoutAction(checkoutId));
        checkoutDispatch(setDiscountCode(discountCode));

        const cartValues = getVariantIds(cartItems);

        trackMoEngageAppEvent({
          event: 'place_order_app',
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

        GATrackingService.trackCheckout(
          cartItems.map(item => ({
            item_id: String(item.productId),
            item_name: item?.productTitle,
            quantity: 1,
            price: Number(item?.price),
          })),
          discountCode?.code,
        );
        FBTrackingService.trackCheckout(
          cartItems.map(item => ({
            item_id: String(item.productId),
            item_name: item?.productTitle,
            quantity: 1,
            price: Number(item?.price),
          })),
          discountCode?.code,
        );
        setIsSubmitting(false);
      } else {
        const subscriptionItem: ISubscriptionObject[] = cartItems.map(
          (cartItem: CartItem) => ({
            variantId: cartItem.variant_id,
            planId: cartItem.selectedPlan?.plan_id,
            duration: cartItem.selectedPlan?.subscription_interval,
          }),
        );

        try {
          const result = await cartService.proceedToCheckoutWithSubsriptionItem(
            subscriptionItem[0],
          );
          if (result && result.data && result.data.data.checkoutId) {
            checkoutId = result.data.data.checkoutId;
            checkoutDispatch(createCheckoutAction(result.data.data.checkoutId));
          }
        } catch (error) {
          console.log('Error occured : ', error);
        }
        setIsSubmitting(false);
      }
      try {
        setIsSubmitting(false);
        authDispatch(setRedirectToCheckout(false));
        navigation ? navigation.navigate('AddressOrderSummaryScreen') : null;
      } catch (error: any) {
        authDispatch(setRedirectToCheckout(false));
        navigation ? navigation.navigate('Addresses') : null;
        if (error?.response?.status === 401) {
          handleLogout();
          setIsSubmitting(false);
          setTimeout(() => {
            setIsLoginSuccessful(false);
            modalsDispatch(setLoginModal(true));
          }, 100);
        }
      }

    } catch (error: any) {
      authDispatch(setRedirectToCheckout(false));
      if (error?.response?.status === 401) {
        handleLogout();
        setIsSubmitting(false);
        setTimeout(() => {
          setIsLoginSuccessful(false);
          modalsDispatch(setLoginModal(true));
        }, 100);
      }
    }
  };


  useEffect(() => {
    if (isLoginSuccessful) {
      Toast.show({
        text1: 'Login Successful',
        position: 'bottom',
        bottomOffset: 80,
        type: 'success',
      });
      setIsLoginSuccessful(false);
    }

  }, [isLoginSuccessful, userInAuth]);

  useEffect(() => {
    if (isAuthenticated && redirectToCheckout && userAddressFetched && !cartLoading) {
      handleBuyNow();
      authDispatch(setRedirectToCheckout(false));
    }
  }, [isAuthenticated, userAddressFetched, cartLoading])

  useEffect(() => {
    if (redirectToCheckout) {
      handleBuyNow();
    }
  }, [redirectToCheckout]);

  useEffect(() => {
    if (shipRocketImportToken && isAuthenticated && fetchAddressProgress) {
      let attempts = 0;
      const maxAttempts = 5;

      const fetchData = async () => {
        try {
          const response = await fetchAddressSaveProgress(shipRocketImportToken as string);
          if (response.data.status === "COMPLETED") {
            authDispatch(setRedirectToCheckout(true));
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(fetchData, 2000);
          }
        } catch (err) {
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(fetchData, 2000);
          }
        }
      };

      fetchData();
    }
  }, [shipRocketImportToken, isAuthenticated, fetchAddressProgress]);

  return (
    <>
      <FooterBar
        handleSubmit={handleBuyNow}
        loading={isSubmitting}
        submitBtnTitle="ENTER ADDRESS"
      />
    </>
  );
};

export default CartBottomBar;
