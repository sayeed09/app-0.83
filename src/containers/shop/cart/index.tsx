import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import CartList from '@containers/shop/cart/cart-list';
import CartBottomBar from '@containers/shop/cart/cart-list/cart-bottom-bar';
import CartPriceDetails from '@containers/shop/cart/cart-list/cart-price-details';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initCart, setCartLoading, setStorageCartFetched } from 'actions/cart';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import { initialState } from 'context/cart/CartReducer';
import { CartState, IVariantDetailsState } from 'models/shop/cart';
import PeopleAlsoBought from '@components/cart/people-also-bought';
import { IBaseProps } from '@models/common';
import LoginModal from 'components/login/standard/login-modal';
import FooterDetails from './cart-list/footer-details';
import Loader from '@components/elements/loader/loader';
import { width } from 'utils/constants';
import { BaseView } from 'components/base/view';
import TrustBadges from 'containers/trust-badges';
import LinearGradient from 'react-native-linear-gradient';
import OZModal from 'components/modal';
import CartConsultationContent from 'components/product-cards/horizontal-card/cart-consultation-popup';
import CartItemPopupContent from 'components/product-cards/horizontal-card/cart-item-popup';
import PrimaryButton from 'components/elements/button/primary-Button';
import { View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import { remainingProductsInStock } from 'utils/product';
import { useModalsState } from 'context/modals';
import { UserAddress } from 'models/shop/address';
import { getAllAddressService } from 'services/address';
import { setUserAddressList } from 'actions/checkout';
import { useCheckoutDispatch } from 'context/checkout';
import useLogin from 'hooks/login';
import { useAuthDispatch, useAuthState } from 'context/auth';
import { setRedirectToCheckout } from 'actions/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartSavingInformation from 'components/cart/cart-savings-information';
import CashCartOffer from 'components/cart/cart-cash-offer';
import { convertToRupees } from 'utils/currency-utils';
import { cartService } from 'services/cart';

const loaderStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: '#fff',
    width,
    height: '100%',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: '#006E5A'
  },
  nudge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6F2',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  text: {
    color: '#F04E23',
    fontSize: 13,
    fontWeight: '500',
  },
  footerNudge: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    elevation: 10,
    justifyContent: 'center',

  },
  proceedCTA: {
    paddingVertical: 8
  },
  cashbackContainer: {
    width: width,
    paddingHorizontal: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 8
  },
  cashbackTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savedText: {
    fontSize: 13,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: '#FF6F00',
    fontSize: 18
  },
});

const Cart: React.FunctionComponent<IBaseProps> = ({ navigation }) => {
  const cartDispatch = useCartDispatch();
  const checkoutDispatch = useCheckoutDispatch();
  const authDispatch = useAuthDispatch();

  const { cartItems, isSubscriptionItem, cartLoading, storageCartFetched, orderSubtotal, shippingCharges, orderTotal } = useCartState();
  const { loginModalVisbility } = useModalsState();
  const { user, isAuthenticated } = useAuthState();
  const { handleLogout } = useLogin();
  const [cartItemPopupProductId, setCartItemPopupProductId] = useState<string | boolean>();
  const [isConsultClick, setIsConsultClick] = useState(false);
  const [ozivaCash, setOzivaCash] = useState();
  const [variantDetails, setVariantDetails] = useState<IVariantDetailsState>({
    variantTitle: '',
    variantId: ''
  });
  const [userAddressFetched, setUserAddressFetched] = useState<boolean>(false);
  const [productLeftCount, setProductLeftCount] = useState(0);

  const getRemainingProducts = async () => {
    if (typeof cartItemPopupProductId === "string") setProductLeftCount(await remainingProductsInStock(cartItemPopupProductId));
  }

  const fetchCartItems = async () => {
    cartDispatch(setCartLoading(true));
    const fetchTryCartState = await AsyncStorage.getItem('cart');
    const initialStateLazily: CartState = fetchTryCartState
      ? JSON.parse(fetchTryCartState)
      : initialState;
    cartDispatch(initCart(initialStateLazily));
    cartDispatch(setCartLoading(false));
    cartDispatch(setStorageCartFetched(true));
  };

  const SortByDefaultAddres = (x: UserAddress, y: UserAddress) => {
    return x.defaultAddress === y.defaultAddress ? 0 : x.defaultAddress ? -1 : 1;
  };

  const getAddresses = async () => {
    try {
      cartDispatch(setCartLoading(true));
      const addressList = await getAllAddressService();
      const sortedAddressList = addressList.sort(SortByDefaultAddres);
      checkoutDispatch(setUserAddressList(sortedAddressList))
      cartDispatch(setCartLoading(false));
      setUserAddressFetched(true)
    } catch (error: any) {
      console.log("Error : ", error);
      cartDispatch(setCartLoading(false));
      if (error?.response?.status === 401) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      fetchCartItems();
    } else {
      cartDispatch(setStorageCartFetched(true));
    }
  }, []);

  useEffect(() => {
    getRemainingProducts();
  }, [cartItemPopupProductId]);


  useEffect(() => {
    if (user) {
      getAddresses();
    }
  }, [user]);

  const ozivaCashValue = () => {
    const payload = {
      cartValue: convertToRupees(
        Number(orderSubtotal) - Number(shippingCharges),
      ),
      phone: user?.phone,
    };
    cartService.ozivaCashValueService(payload).then(response => {
      setOzivaCash(response);
    }).catch(err => {
      console.log("Error : ", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        handleLogout();
      }
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      ozivaCashValue();
    }
  }, [isAuthenticated, orderTotal]);


  const insets = useSafeAreaInsets();

  return (
    <>

      <SafeAreaView
        style={{
          backgroundColor: '#fff',
          flex: 1,
          marginBottom: insets.bottom
        }}
      >
        <CartSavingInformation ozivaCash={ozivaCash}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CartList navigation={navigation} setCartItemPopupProductId={setCartItemPopupProductId} setVariantDetails={setVariantDetails} />
          {/* {!checkIfPrimeItemAddedInCart(cartItems) && cartItems.length > 0 && <OneMonthConsult setCartItemPopupProductId={setCartItemPopupProductId} setIsConsultClick={setIsConsultClick} />} */}
          {cartItems.length > 0 && <LinearGradient
            colors={['#FFFFFF', '#F1FFEE']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0.5 }}
            style={{ paddingVertical: 8, marginVertical: 16 }}
          >

            <Text style={loaderStyles.footerTitle}>Trusted by Millions for a Reason</Text>
            <TrustBadges />
          </LinearGradient>}

          {!isSubscriptionItem && cartItems.length > 0 && <PeopleAlsoBought />}
          {!isSubscriptionItem && cartItems.length > 0 && <CashCartOffer navigation={navigation} ozivaCash={ozivaCash} />}
          {cartItems.length > 0 ? <CartPriceDetails /> : null}
          {cartItems.length > 0 ? <FooterDetails showTrustBadges={false} /> : null}
        </ScrollView>
        {cartItems.length > 0 ? <CartBottomBar navigation={navigation} userAddressFetched={userAddressFetched} /> : null}
        {loginModalVisbility && (
          <>
            <LoginModal navigation={navigation} />
          </>
        )}
        {cartItemPopupProductId ?
          <OZModal
            visible={!!cartItemPopupProductId}
            onRequestClose={() => {
              if (isConsultClick) {
                setIsConsultClick(false);
              }
              setCartItemPopupProductId('');
            }}
            setModalVisible={() => {
              if (isConsultClick) {
                setIsConsultClick(false);
              }
              setCartItemPopupProductId('');
            }}
            title={isConsultClick ? '1 Month Nutritionist Diet Consultation + Diet Plan' : 'Quick Product Overview'}
            transparent
            animationType="fade"
            contentContainerStyles={isConsultClick ? { height: 520 } : { height: 600 }}
            backgroundColor='#F1FFEE'
          >
            {isConsultClick ? <CartConsultationContent /> : <CartItemPopupContent navigation={navigation} productId={cartItemPopupProductId} variantDetails={variantDetails} />}

            <View style={loaderStyles.footerNudge}>
              <View style={{ width: '100%', elevation: 20 }}>
                {/* Use nudge component from the pdp */}
                {!isConsultClick ? <View style={loaderStyles.nudge}>
                  <SvgRenderer
                    source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Timer.svg?v=1728993233' }}
                    style={loaderStyles.icon}
                  />
                  <Text style={loaderStyles.text}>
                    Selling out fast! Less than {productLeftCount} left
                  </Text>
                </View> : null}
              </View>
              <View style={loaderStyles.proceedCTA}>
                <PrimaryButton
                  accentColor="#FF6F00"
                  style={{ width: width * 0.96 }}
                  title={'PROCEED TO CHECKOUT'}
                  onAction={() => {
                    setCartItemPopupProductId('')
                    setIsConsultClick(false);
                    authDispatch(setRedirectToCheckout(true));
                  }}
                  disabled={false}
                />
              </View>
            </View>
          </OZModal> : <></>
        }

        {cartLoading || !storageCartFetched ? (
          <BaseView style={loaderStyles.overlay}>
            <BaseView style={{ height: '100%', width: '100%' }}>
              <Loader />
            </BaseView>
          </BaseView>
        ) : null}
      </SafeAreaView>

    </>
  );
};

export default Cart;
