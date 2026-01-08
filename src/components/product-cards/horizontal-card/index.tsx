import FastImage from '@d11/react-native-fast-image';
import { decreaseQuantity, increaseQuantity, removeItem, setIsCartUpgraded } from 'actions/cart';
import DeleteIcon from 'assets/images/icons/delete';
import { ViewWrapper } from 'components/styled/common';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import { ProductCardModel } from 'models/product-card/card-model';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { ozivaPrimeProductId } from 'utils/constants';
import { convertToRupees } from 'utils/currency-utils';
import { GATrackingService } from 'utils/ga-tracking';

import ThreeMonthConsult from 'components/cart/three-month-consult';
import OZModal from 'components/modal';
import { router } from 'expo-router';
import useCart from 'hooks/cart';
import { TouchableOpacity } from 'react-native';
import { getUpgradedProductId } from 'services/cart';
import { trackMoEngageAppEvent } from 'utils/common';
import BenefitChips from './benefitchips';
import Pricing from './pricing';
import { HorizontalCardT1Style } from './style';
import UpgradeCart from './upgrade-cart';
import UpgradeModal from './upgrade-modal';

interface IProps {
  productCardModel?: ProductCardModel;
  onAction?: () => void;
  onClick?: () => void;
  navigation?: any;
  hideQuantityPicker?: boolean;
  handleDelete?: () => void;
  index: number;
  setCartItemPopupProductId?: (value: string) => void;
  filterVariantsList?: ProductCardModel[];
  setVariantDetails?: (value: any) => void;
  showQtyInCard: boolean;
  marginTop?: number;
}

const HorizontalCard = ({
  productCardModel,
  onAction,
  onClick,
  navigation,
  hideQuantityPicker,
  handleDelete,
  index,
  setCartItemPopupProductId,
  filterVariantsList,
  setVariantDetails,
  marginTop
}: IProps) => {

  const cartDispatch = useCartDispatch();
  const { cartItems, isSubscriptionItem, isCartUpgraded, orderTotal, lineItems } = useCartState();
  const { trackRemoveItemFromCart, handleUpgradeOnItemRemove } = useCart();
  const [upgradeCartPopup, setUpgradeCartPopup] = useState(false);
  const [upgradeCartItem, setUpgradeCartItem] = useState<ProductCardModel>();
  const [isUpgraded, setIsUpgraded] = useState(false); //To check if first cart item is already upgraded or not;

  const checkForPrime = Number(productCardModel?.productId) == ozivaPrimeProductId;

  const handleUpgradeClick = (cartItem: ProductCardModel) => {
    trackMoEngageAppEvent({
      event: 'cart_upgrade_skus',
      values: [
        {
          eventAttribute: 'product_title',
          value: cartItem.title,
        },
        {
          eventAttribute: 'product_id',
          value: cartItem.productId,
        },
        {
          eventAttribute: 'variant_id',
          value: cartItem.variantId,
        },
        {
          eventAttribute: 'cart_amount',
          value: orderTotal,
        }
      ],
    });
    const eventName = 'atc1_app';
    GATrackingService.trackCustomEvent(eventName, {
      item_id: cartItem.productId,
      item_variant: cartItem.title,
      price: (Number(cartItem?.price) ?? 0) / 100,
      quantity: 1,
    });
    setUpgradeCartItem(cartItem);
    setUpgradeCartPopup(true);
  }

  useEffect(() => {
    if (index === 0) {
      getUpgradedProductId().then(response => {
        if (response && response.length > 0) {
          const checkIfFirstItemUpgraded = response.some(variant => variant.variantId == Number(productCardModel?.variantId));
          setIsUpgraded(checkIfFirstItemUpgraded);
        }
      });
    }
  }, [lineItems]);

  return (
    <>
      <View style={[checkForPrime && HorizontalCardT1Style.PrimeProductCard, index === 0 ? { marginTop: marginTop } : { marginTop: 8 }]}>
        <View style={!checkForPrime ? { borderWidth: 1, paddingVertical: 0, borderRadius: 2, borderColor: '#E0E0E0', marginHorizontal: 4 } : {}}>
          <View
            style={[
              HorizontalCardT1Style.StandardProductCard,
              commonStyles.bgWhite,
            ]}
          >
            {!hideQuantityPicker ? (
              <View style={[HorizontalCardT1Style.DeleteIcon]}>
                <Pressable
                  onPress={() => {
                    Alert.alert(
                      'Remove Product',
                      'Are you sure you want to remove this product?',
                      [
                        {
                          text: 'No',
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            if (handleDelete) {
                              handleDelete();
                              handleUpgradeOnItemRemove(productCardModel?.variantId);
                            } else {
                              cartDispatch(
                                removeItem(Number(productCardModel?.variantId)),
                              );
                              trackRemoveItemFromCart(productCardModel);
                              if (isSubscriptionItem) {
                                // navigation && navigation.navigate('ProductDetails', {
                                //   queryString: JSON.stringify(productCardModel?.productId),
                                //   productTitle: productCardModel?.title,
                                //   variantId: productCardModel?.variantId as string,
                                // });
                                router.push({
                                  pathname: '/ProductDetails',
                                  params: {
                                    queryString: JSON.stringify(productCardModel?.productId),
                                    productTitle: productCardModel?.title,
                                    variantId: productCardModel?.variantId,
                                  },
                                });
                              }
                              handleUpgradeOnItemRemove(productCardModel?.variantId);
                              cartDispatch(setIsCartUpgraded(false));
                            }
                          },
                        },
                      ],
                    );
                  }}
                >
                  <DeleteIcon />
                </Pressable>
              </View>
            ) : null}
            <View
              style={[
                commonStyles.pad8,
                commonStyles.flexColumn,
                commonStyles.alignCenter,
                commonStyles.bgWhite,
                { paddingRight: 0 }
              ]}
            >
              <TouchableOpacity onPress={() => {
                if (setCartItemPopupProductId && setVariantDetails && productCardModel?.productId) {
                  setCartItemPopupProductId(productCardModel?.productId);
                  setVariantDetails({
                    variantTitle: productCardModel?.title,
                    variantId: productCardModel?.variantId
                  });
                }
              }}>
                <FastImage
                  source={{
                    uri: productCardModel?.image,
                  }}
                  style={{ aspectRatio: 1 / 1, width: 70 }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
            </View>
            <ViewWrapper
              style={[
                commonStyles.flexColumn,
                commonStyles.alignStart,
                commonStyles.pad8,
                commonStyles.mb0,
                commonStyles.pb0,
                { width: '100%', flex: 1 },
              ]}
            >
              <View
                style={[HorizontalCardT1Style.titleProduct, commonStyles.flexD]}
              >
                <Text
                  style={[commonStyles.h3Tag, commonStyles.mb0, { width: '90%' }]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  onPress={() => {
                    if (setCartItemPopupProductId && productCardModel?.productId && setVariantDetails) {
                      setCartItemPopupProductId(productCardModel?.productId);
                      setVariantDetails({
                        variantTitle: productCardModel?.title,
                        variantId: productCardModel?.variantId
                      });
                    }
                  }}
                >
                  {productCardModel?.title}
                </Text>
              </View>
              <BenefitChips benefits={productCardModel?.benefits as string[]} />

              <ViewWrapper
                style={[commonStyles.flexRow, { justifyContent: 'space-between' }]}
              >
                <View style={{ flex: 1 }}>
                  <Pricing
                    price={productCardModel?.price as string}
                    compareAtPrice={productCardModel?.compareAtPrice as string}
                  />
                </View>
                <View>
                  {productCardModel?.subscriptionInterval ? (
                    <View>
                      <Text style={{ fontSize: 12, color: '#7e7e7e' }}>
                        {productCardModel?.subscriptionInterval} months
                      </Text>
                    </View>
                  ) : !hideQuantityPicker ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 16,
                      }}
                    >
                      {!checkForPrime && (
                        !isSubscriptionItem ? (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                borderColor: '#f5f5f5',
                                borderWidth: 1,
                                borderRadius: 2,
                                maxWidth: 70,
                              }}
                            >
                              <Pressable
                                onPress={() => {
                                  if (productCardModel?.quantity === 1) {
                                    Alert.alert(
                                      'Remove Product',
                                      'Are you sure you want to remove this product?',
                                      [
                                        {
                                          text: 'No',
                                          style: 'cancel',
                                        },
                                        {
                                          text: 'Yes',
                                          onPress: () => {
                                            cartDispatch(
                                              decreaseQuantity(
                                                Number(productCardModel?.variantId),
                                              ),
                                            );
                                            GATrackingService.trackRemoveFromCart({
                                              item_id: String(
                                                productCardModel?.productId,
                                              ),
                                              item_name: productCardModel?.title,
                                              quantity: 1,
                                              price: convertToRupees(
                                                Number(productCardModel?.price),
                                              ),
                                            });
                                          },
                                        },
                                      ],
                                    );
                                  } else {
                                    cartDispatch(
                                      decreaseQuantity(
                                        Number(productCardModel?.variantId),
                                      ),
                                    );
                                  }
                                }}
                              >
                                <View
                                  style={{
                                    ...styles?.quantityBtn,
                                    paddingLeft: 10,
                                    backgroundColor: '#f5f5f5',
                                  }}
                                >
                                  <Text>-</Text>
                                </View>
                              </Pressable>
                              <Text style={styles?.quantityBtn}>
                                {productCardModel?.quantity}
                              </Text>
                              <Pressable style={{ backgroundColor: '#f5f5f5' }}>
                                <View style={styles?.quantityBtn}>
                                  <Pressable
                                    onPress={() => {
                                      cartDispatch(
                                        increaseQuantity(
                                          Number(productCardModel?.variantId),
                                        ),
                                      );
                                    }}
                                  >
                                    <Text>+</Text>
                                  </Pressable>
                                </View>
                              </Pressable>
                            </View>
                          </>
                        ) : (
                          <View>
                            <Text>
                              {cartItems[0].selectedPlan?.subscription_interval}{' '}
                              Months
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                  ) : !checkForPrime && (!isSubscriptionItem ? (
                    <View style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                      <Text
                        style={[
                          commonStyles.fs10,
                          { textAlign: 'right', color: '#7e7e7e' },
                        ]}
                      >
                        Qty:{' '}
                      </Text>
                      <Text>{productCardModel?.quantity}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text>
                        {cartItems.length > 0 &&
                          cartItems[0].selectedPlan?.subscription_interval}{' '}
                        Months
                      </Text>
                    </View>
                  ))}
                </View>
              </ViewWrapper>
            </ViewWrapper>
          </View>
          {index === 0 && filterVariantsList && filterVariantsList.length > 0 && !isCartUpgraded && !isUpgraded && <UpgradeCart handleUpgradeClick={() => {
            if (productCardModel) {
              handleUpgradeClick(productCardModel);
            }
          }} filteredVariant={filterVariantsList} productId={productCardModel?.productId} />}
        </View>



        {
          checkForPrime && <View>
            <View style={{ backgroundColor: '#E0E0E0', height: 1, alignItems: 'center', marginHorizontal: 10 }} />
            <ThreeMonthConsult />
          </View>
        }
      </View>
      {upgradeCartPopup &&
        <OZModal
          visible={upgradeCartPopup}
          onRequestClose={() => setUpgradeCartPopup(false)}
          setModalVisible={() => setUpgradeCartPopup(false)}
          title={'Review Your Pack'}
          transparent
          animationType="fade"
          contentContainerStyles={{ height: 'auto' }}
          backgroundColor='#F1FFEE'
        >
          <UpgradeModal filteredVariants={filterVariantsList} index={index} setUpgradeCartItem={setUpgradeCartItem} upgradeCartItem={upgradeCartItem} setUpgradedCartPopup={setUpgradeCartPopup} />
        </OZModal>
      }
    </>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  quantityBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  topBarLabels: {
    padding: 5,
    textTransform: 'uppercase',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
  },
});
