import { isIdInCart } from '@containers/shop/common';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Alert as AlertPopup,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import AddressCard from '@components/address/address-card';
import Alert from '@components/base/alert';
import { PrimaryButton, SecondaryButton } from '@components/base/buttons';
import {
  Box,
  Hr,
  Image,
  SafeBottomSpace,
  Text,
} from '@components/base/foundation';
import { BaseView } from '@components/base/view';
import PrimaryElementButton from '@components/elements/button/primary-Button';
import SecondaryElementButton from '@components/elements/button/secondary-button';
import WhiteCard from '@components/elements/card/white-card';
import ListItem from '@components/elements/lists/item';
import Loader from '@components/elements/loader/loader';
import OrderPricing from '@components/orders/pricing';
import { useCartState } from '@context/cart/CartContext';
import { CartItem } from '@models/shop/cart';
import crashlytics from '@react-native-firebase/crashlytics';
import { width } from '@utils/constants';
import { formatCurrencyWithSymbol } from '@utils/currency-utils';
import { useModalsDispatch } from 'context/modals';
import { router } from 'expo-router';
import useCart from 'hooks/cart';
import useLogin from 'hooks/login';
import { IOrderDetail } from 'models/order/order-response';
import { ProductCardModel } from 'models/product-card/card-model';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderService } from 'services/order';
import { cancelOrderService } from 'services/user';
import { trackMoEngageAppEvent } from 'utils/common';

const styles = StyleSheet.create({
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
  image: { width: 70, height: 70 },
});

const openEmail = () => Linking.openURL('mailto:community@oziva.in');

const OrderDetails = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { order } = route.params;
  const { handleAddToCart } = useCart();
  const modalsDispatch = useModalsDispatch();
  const { handleLogout } = useLogin();
  const [loading, setLoading] = useState(false);

  const addToCart = (res: CartItem) => {
    let product: ProductCardModel = {
      productId: String(res.productId),
      variantId: String(res.id),
      price: String(res.price),
      title: String(res.title),
      image: String(res.imageUrl),
      quantity: res.quantity,
      compareAtPrice: String(res.price), //compare at price not available here
    };
    handleAddToCart(product);
    trackBuyAgain(product);
  };
  const trackBuyAgain = (item: ProductCardModel) => {
    trackMoEngageAppEvent({
      event: 'add_to_cart_buy_again_app',
      values: [
        { eventAttribute: 'product_name', value: item.title },
        { eventAttribute: 'product_id', value: item?.productId },
        { eventAttribute: 'price', value: item.price },
        { eventAttribute: 'quantity', value: 1 },
      ],
      trackingTransparency: true,
      skipGATrack: true,
    });
  };
  const { cartItems } = useCartState();
  const {
    createdAt,
    total,
    lineItems,
    totalDiscount,
    subtotal,
    shipping_charges,
    paymentMode,
    trackingURL,
    shippingAddress,
    cancelledAt,
    financialStatus,
    orderNumber,
  } = order;

  const [orderCancelled, setOrderCancelled] = useState(false);
  const [orderDetails, setOrderDetails] = useState<IOrderDetail>();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      crashlytics().log(`feetching order details : ${orderNumber}`);
      const ordersResponse = await OrderService.getOrderDetails(
        orderNumber as string,
      );
      setOrderDetails(ordersResponse.data);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate('ProfileScreen');
      }
    }
  }

  const cancelOrderById = () => {
    setLoading(true);
    cancelOrderService(Number(orderNumber)).then((response) => {
      Toast.show({
        type: 'success',
        text1: 'Order canceled successfully',
        position: 'bottom',
      });
      setOrderCancelled(true);
      setLoading(false);
    }).catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Could not cancel the order',
        position: 'bottom',
      });
      setLoading(false);
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate('ProfileScreen');
      }
    })
  }


  const cancelOrder = () => {
    AlertPopup.alert('Cancel Order', 'Are you sure you want to cancel order?', [
      {
        text: 'NO',
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress() {
          cancelOrderById();
        },
      },
    ]);
  };

  const getLineItemDetail = variantId => {
    let item = orderDetails?.lineItems.filter(
      item => item.variantId == variantId,
    );
    if (item && item?.length > 0) {
      return item[0];
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f2f2f2',
        flex: 1,
      }}
    >
      <ScrollView style={{ marginBottom: 16 }}>
        <Box backgroundColor="levelOneBg" pb={3}>
          <Box px={4} py={3}>
            <ListItem
              right={
                <Box alignItems="flex-end">
                  <Text variant="body2" color="hintText">
                    Total:
                  </Text>
                  <Text variant="heading3">
                    {formatCurrencyWithSymbol(total)}
                  </Text>
                </Box>
              }
            >
              <Text variant="body1">Order Number: #{orderNumber}</Text>
              <Text variant="body2" color="hintText">
                Order Date: {createdAt}
              </Text>
            </ListItem>
          </Box>
          <Hr />
          {!isEmpty(lineItems) &&
            lineItems?.map((item, index) => (
              <Box
                flexDirection="row"
                alignItems="flex-start"
                key={index.toString()}
                mx={4}
                py={2}
                borderColor="levelOneBorder"
                borderTopWidth={index === 0 ? 0 : 1}
              >
                <Pressable
                  onPress={() => {
                    crashlytics().log(`navigating on the product details screen from order details : ${item?.productId}`);
                    // navigation.navigate('ProductDetails', {
                    //   queryString: JSON.stringify(item?.productId),
                    //   productTitle: item.variantTitle,
                    // });
                    router.push({
                      pathname: '/ProductDetails',
                      params: {
                        queryString: JSON.stringify(item?.productId),
                        productTitle: item.variantTitle,
                      },
                    });
                  }}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                </Pressable>
                <Box flex={1} alignItems="flex-start">
                  <Text
                    variant="heading3"
                    ml={2}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                  <Text variant="body1" ml={2} mt={2} color="hintText">
                    {item.variantTitle}
                  </Text>
                  <Text variant="heading3" ml={2} mb={3} mt={2}>
                    {formatCurrencyWithSymbol(item.price)}
                  </Text>
                  {!getLineItemDetail(item?.variantId)?.hideBuyAgain && (
                    <Box ml={2}>
                      {isIdInCart(cartItems, item?.variantId) ? (
                        <PrimaryButton
                          size="large"
                          title="ADDED"
                          onPress={() => { }}
                        />
                      ) : (
                        <PrimaryButton
                          size="large"

                          title={
                            getLineItemDetail(item?.variantId)?.inStock
                              ? 'BUY AGAIN'
                              : 'OUT OF STOCK'
                          }
                          onPress={() => {
                            addToCart({
                              id: Number(item?.variantId),
                              title: item?.name,
                              quantity: item?.quantity,
                              imageUrl: item?.image,
                              selectedOptions: [],
                              compareAtPrice: item?.compareAtPrice,
                              price: item?.price,
                              productId: String(item?.productId),
                              productTitle: item?.productTitle,
                            });
                          }}
                          disabled={
                            !getLineItemDetail(item?.variantId)?.inStock}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
        </Box>
        <Box
          backgroundColor="levelOneBg"
          borderTopWidth={1}
          borderBottomWidth={1}
          borderColor="levelOneBorder"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          // pl={4}
          py={3}
        >
          {cancelledAt && (
            <SecondaryButton title={`CANCELLED on ${cancelledAt}`} />
          )}
          {orderCancelled && (
            <View style={{ flex: 0.9 }}>
              <SecondaryButton title="Order cancel requested this may take sometime" />
            </View>
          )}
          {!cancelledAt &&
            !orderCancelled &&
            financialStatus?.toLowerCase() === 'pending' && (
              <SecondaryButton
                title="CANCEL ORDER"
                onPress={() => cancelOrder()}
              />
            )}
          {!cancelledAt &&
            !orderCancelled &&
            financialStatus?.toLowerCase() === 'pending' && (
              <Box
                borderRightWidth={1}
                borderColor="levelOneBorder"
                height={30}
                my={3}
              />
            )}
          {!cancelledAt && !orderCancelled && (
            <SecondaryButton
              title="TRACK ORDER"
              onPress={
                trackingURL ? () => Linking.openURL(trackingURL) : undefined
              }
            />
          )}
          <SecondaryButton
            title="NEED HELP?"
            onPress={() => navigation.navigate('Contact')}
          />
        </Box>
        {/* {!cancelledAt && financialStatus?.toLowerCase() === 'pending' && ( */}
        {!cancelledAt && trackingURL && (
          <Box backgroundColor="levelOneBg" p={4}>
            <Alert message="You order is already shipped. To cancel, please refuse the order on delivery." />

            <Text variant="body2" pt={2}>
              For cancellation, mail us on{' '}
              <Text color="brandPrimary" variant="body2" onPress={openEmail}>
                community@oziva.in
              </Text>
            </Text>
          </Box>
        )}
        <Box backgroundColor="levelOneBg" mt={2} px={4} py={2} sty>
          <Text>Shipping Address</Text>
        </Box>
        <Hr />
        <WhiteCard noBorderRadius>
          <AddressCard
            address={shippingAddress}
            navigation={navigation}
            addressOrderSummary
          />
        </WhiteCard>
        <OrderPricing
          subTotal={subtotal}
          discount={totalDiscount}
          deliveryCharges={shipping_charges?.price || 0}
          total={total}
          paymentMode={paymentMode}
        />
        <SafeBottomSpace />
      </ScrollView>
      {cartItems?.length > 0 && (
        <View
          style={{
            flex: 1,
            width,
            flexDirection: 'row',
            padding: 5,
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
          }}
        >
          <SecondaryElementButton
            accentColor="#fff"
            title={
              <Text>
                Product(s) in cart{' '}
                <Text color="brandPrimary">{cartItems.length}</Text>
              </Text>
            }
            textColor="#000"
            textTransform="none"
            width="50%"
            style={{ justifyContent: 'center' }}
            onAction={() => {
              // clearFilters();
              // setShowFilter({ visible: false, content: null });
            }}
          />
          <PrimaryElementButton
            accentColor="#FF6F00"
            title="GO TO CART"
            borderRadius={3}
            width="50%"
            onAction={() => {
              navigation.navigate('CartScreen');
            }}
          />
        </View>
      )}
      {loading && !orderDetails && (
        <BaseView style={styles.overlay}>
          <BaseView style={{ height: '100%', width: '100%' }}>
            <Loader />
          </BaseView>
        </BaseView>
      )}
    </SafeAreaView>
  );
};
export default OrderDetails;
