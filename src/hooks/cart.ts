import {
  addProduct,
  setCartDeliveryCharge,
  setCartLoading,
  toggleOzivaCashSelection,
  updateCart,
} from 'actions/cart';
import { setDiscountCode, setShowDiscount } from 'actions/checkout';
import { setLoginModal } from 'actions/modals';
import { setSnackbarVisible } from 'actions/shop';
import { useAuthState } from 'context/auth';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import { useCheckoutDispatch } from 'context/checkout';
import { useModalsDispatch } from 'context/modals';
import { useShopDispatch } from 'context/shop';
import {
  FetchCartParam,
  FetchCartRequestModel,
  FetchCartResponseModel,
} from 'models/cart/fetchcart';
import { PrimeMemberShipType } from 'models/prime';
import { ProductCardModel } from 'models/product-card/card-model';
import { IImage } from 'models/product-details/product';
import { CartItem, IVariantDetailsState } from 'models/shop/cart';
import { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { cartService, getGoogleReviewsJsonDataService, getUpgradedProductId, setUpgradedProductId } from 'services/cart';
import { fetchProductById, fetchProducts, fetchVariantAdditionalDetail } from 'services/product';
import { updateCartItems } from 'utils/cart';
import { formCartItemsForShipping, trackMoEngageAppEvent } from 'utils/common';
import { PHMProductId, PHWProductId } from 'utils/constants';
import { FBTrackingService } from 'utils/fb-tracking';
import { GATrackingService } from 'utils/ga-tracking';

const useCart = () => {
  const [data, setCartData] = useState<FetchCartResponseModel>();
  const [formattedQty, setFormattedQty] = useState<string>('');
  const { cartItems } = useCartState();
  const cartDispatch = useCartDispatch();
  const { isAuthenticated, userData } = useAuthState();
  const modalsDispatch = useModalsDispatch();
  const checkoutDispatch = useCheckoutDispatch();
  const shopDispatch = useShopDispatch();

  const [productDetail, setProductDetails] = useState<any>(null);
  const [imageList, setImageList] = useState<IImage[]>([]);
  const [googleReviews, setGoogleReviews] = useState<any>(null);
  const [productAdditionalDetails, setProductAdditionalDetail] = useState<any>(null);


  const addMissingVariant = (err, code) => {
    return new Promise<boolean>((resolve, reject) => {
      if (cartItems.length > 0) {
        const variantId = Number(err.split(':')[1].trim());
        cartDispatch(
          addProduct({
            id: variantId,
            quantity: 1,
          }),
        );
        let input: FetchCartParam = { code: code };
        getCart(input).then(() => {
          resolve(true);
        }).catch(() => {
          reject(false);
        });
      }
    });
  };

  const showErrorSnacbar = err => {
    Snackbar.show({
      text: err,
      duration: 2000,
      action: {
        text: 'Error',
        textColor: 'red',
        onPress: () => { },
      },
      numberOfLines: 3,
    });
  };
  const clearDiscount = () => {
    checkoutDispatch(setDiscountCode({ code: '', id: '' }));
  };

  const getCart = (input: FetchCartParam) => {
    return new Promise<FetchCartResponseModel>((resolve, reject) => {
      cartDispatch(setCartLoading(true));
      const requestModel: FetchCartRequestModel = {
        variants: formCartItemsForShipping(cartItems),
        discountCode: input.code?.trim() != '' ? input.code : undefined,
        cashApply: input.cashApply,
      };
      cartService
        .getCartFromServer(requestModel)
        .then((data: FetchCartResponseModel) => {
          setCartData(data);
          if (!input.cashApply) {
            checkoutDispatch(setDiscountCode({ code: data?.discount_code }));
            cartDispatch(toggleOzivaCashSelection(Boolean(input.cashApply)));
          } else {
            cartDispatch(toggleOzivaCashSelection(Boolean(input.cashApply)));
          }
          let cart_items = updateCartItems(cartItems, data?.line_items);
          cartDispatch(updateCart(cart_items));
          cartDispatch(
            setCartDeliveryCharge({
              freeShipping: data?.free_shipping,
              shippingName: data?.shipping_name,
              shippingCharges: data?.shipping_charges,
              orderSubtotal: data?.order_subtotal,
              orderTotal:
                data?.order_total,
              totalDiscount: data?.total_discount,
              lineItems: data?.line_items.reverse(),
              orderTotalMRP: data?.order_total_mrp,
              cashback:
                userData?.prime?.current_status === PrimeMemberShipType.Prime
                  ? data?.cashback_prime
                  : data?.cashback_non_prime,
            }),
          );
          checkoutDispatch(setShowDiscount(data?.total_discount >= 0));
          cartDispatch(setCartLoading(false));
          resolve(data as FetchCartResponseModel);
        })
        .catch(error => {
          console.log(error, 'error')
          if (
            !isAuthenticated &&
            error?.response?.data?.error?.errorCode === 'LOGIN_REQUIRED'
          ) {
            // Todo: check spell app wide
            showErrorSnacbar(
              error?.response?.data?.error?.description || 'error',
            );
            setTimeout(() => {
              modalsDispatch(setLoginModal(true));
            }, 1000);
            clearDiscount();
            cartDispatch(setCartLoading(false));
            reject(error);
          } else if (
            error?.response?.data?.error?.indexOf('Missing variant') > -1
          ) {
            // crashlytics().log(`Adding missing variant : ${code}, ${variantId}`);
            addMissingVariant(error?.response?.data?.error, input.code).then(() => {
              cartDispatch(setCartLoading(false));
              resolve(true as unknown as FetchCartResponseModel);
            }).catch((err) => {
              cartDispatch(setCartLoading(false));
              reject(err);
            });
          } else {
            if (cartItems.length > 0) {
              console.log(error?.response?.data?.error)
              if (!error?.response?.data?.error?.toLocaleLowerCase().includes('unauthorized access!!')) {
                showErrorSnacbar(error?.response?.data?.error || 'error');
              }
            }
            cartDispatch(setCartLoading(false));
            reject(error);
          }
        });
    });
  };
  const trackAddToCartMoEngageEvent = item => {
    const firebasePayload = {
      currency: 'INR',
      value: item.price,
    };
    trackMoEngageAppEvent({
      event: 'add_to_cart_app',
      values: [
        { eventAttribute: 'product_name', value: item.title },
        { eventAttribute: 'product_id', value: item?.id },
        { eventAttribute: 'price', value: item.price },
        { eventAttribute: 'quantity', value: 1 },
      ],
      fbEvent: 'AddedToCart',
      firebasePayload,
      trackingTransparency: true,
      skipGATrack: true,
    });
  };
  const addToCart = (res: CartItem) => {
    cartDispatch(addProduct(res));
  };
  const handleAddToCart = (productCardModel: ProductCardModel) => {
    return new Promise(resolve => {
      GATrackingService.trackAddToCart({
        item_id: productCardModel.variantId,
        item_name: productCardModel.title,
        quantity: 1,
        price: Number(productCardModel.price),
      });
      FBTrackingService.trackAddToCart({
        item_id: productCardModel.variantId,
        item_name: productCardModel.title,
        quantity: 1,
        price: Number(productCardModel.price),
      });
      addToCart({
        id: Number(productCardModel.variantId),
        title: productCardModel.title,
        quantity: 1,
        imageUrl: productCardModel.image,
        // selectedOptions: item?.node?.options,
        compareAtPrice: Number(productCardModel.compareAtPrice),
        price: Number(productCardModel.price),
        productId: productCardModel.productId,
        productTitle: productCardModel.title,
      });
      shopDispatch(setSnackbarVisible(true));
      trackAddToCartMoEngageEvent({
        id: Number(productCardModel.variantId),
        title: productCardModel.title,
        quantity: 1,
        price: Number(productCardModel.price) || 0,
      });
      resolve(true);
    });
  };

  const trackRemoveItemFromCart = (productCardModel) => {
    GATrackingService.trackRemoveFromCart({
      item_id: productCardModel?.productId as string,
      item_name: productCardModel?.title,
      quantity: 1,
      price: Number(productCardModel?.price),
    });

    trackMoEngageAppEvent({
      event: 'remove_from_cart_app',
      values: [
        {
          eventAttribute: 'item_id',
          value: productCardModel?.productId,
        },
        { eventAttribute: 'product_name', value: productCardModel?.title },
        {
          eventAttribute: 'discount',
          value:
            Number(productCardModel?.compareAtPrice) -
            Number(productCardModel?.price),
        },
        {
          eventAttribute: 'item_brand',
          value: 'OZiva',
        },
        { eventAttribute: 'item_variant', value: productCardModel?.variantId },
        {
          eventAttribute: 'price',
          value: Number(productCardModel?.price),
        },
        {
          eventAttribute: 'quantity',
          value: productCardModel?.quantity,
        },
        {
          eventAttribute: 'value',
          value: Number(productCardModel?.price),
        },
        {
          eventAttribute: 'currency',
          value: 'INR',
        },
      ],
    });
  };

  const handleUpgradeOnItemRemove = (variantId) => {
    getUpgradedProductId().then(response => {
      if (response && response.length > 0) {
        const checkIfItemUpgraded = response.filter(variant => variant.variantId !== Number(variantId));
        setUpgradedProductId(checkIfItemUpgraded);
      }
    });
  }

  const getFormattedQtyString = (qty: number | string, productId: string) => {
    if (productId == PHWProductId || productId == PHMProductId) {
      const gramQty = `${Number(qty) / 907} x 907 g`
      return `${Math.floor(Number(qty) / 453)}lbs/${gramQty}`;
    }
    return `${qty}`;
  }

  const getFormattedQty = async (filteredVariant, productId: string) => {
    if (filteredVariant && filteredVariant.length > 0) {
      const recommendedVariant = filteredVariant.filter(item => item.isRecommended);
      if (recommendedVariant?.length > 0) {
        const data = await fetchVariantAdditionalDetail(recommendedVariant[0].id);
        if (data) {
          if (productId == PHMProductId || productId == PHWProductId) {
            setFormattedQty(`${getFormattedQtyString(data.data.variants[0].quantity, productId)}`);
          } else {
            setFormattedQty(`${getFormattedQtyString(data.data.variants[0].formatted_quantity, productId)}`);
          }
        }
      }
    }
  }

  const getProductDetails = async (productId: any, variantDetails: IVariantDetailsState) => {
    try {
      if (productId) {
        const productDetailResponse = await fetchProductById(productId, ['sections', 'newBenefits', 'images', 'clinicalStudy', 'variants'].toString());

        if (productDetailResponse?.data) {
          setProductDetails(productDetailResponse?.data);
          setVariantImages(variantDetails.variantId, productDetailResponse?.data?.images || []);
          fetchProductAdditionalDetail(productId);
          const googleReviewsData = productDetailResponse?.data?.sections?.filter(section => section.type === 'GoogleReview');
          if (googleReviewsData) {
            setGoogleReviews(googleReviewsData[0].googleReview);
          } else {
            getGoogleReviewsJsonData();
          }
        }
      }
    } catch (error) {
      console.log('Error fetching product details:', error);
    }
  }

  const getGoogleReviewsJsonData = () => {
    getGoogleReviewsJsonDataService()
      .then((response: any) => {
        setGoogleReviews(response);
      })
      .catch((error) => {
        console.log('Get star review error', error);
      });
  }

  const fetchProductAdditionalDetail = async (productId: string) => {
    const responseProductAdditionalDetail = await fetchProducts([
      productId,
    ]);
    if (responseProductAdditionalDetail.data.product.length > 0)
      setProductAdditionalDetail(responseProductAdditionalDetail.data.product[0]);
  };

  const setVariantImages = (variantId, images) => {
    let selectedVariantImages = images.filter((item) => item.variantIds.indexOf(Number(variantId)) > -1);
    let commonImages = images.filter((item) => item.variantIds.length == 0);
    setImageList([...selectedVariantImages, ...commonImages]);
  }

  return { getCart, clearDiscount, data, handleAddToCart, trackRemoveItemFromCart, handleUpgradeOnItemRemove, getFormattedQtyString, getFormattedQty, formattedQty, getProductDetails, productDetail, imageList, googleReviews, productAdditionalDetails};
};
export default useCart;
