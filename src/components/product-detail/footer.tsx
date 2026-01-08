import { addProduct, increaseQuantity, initCart } from 'actions/cart';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import {
  IProductResponse,
  IVariant,
  VariantAdditionalResponse,
} from 'models/product-details/product';
import {
  FetchSubscriptionsModel,
  Plan,
} from 'models/product-details/subscription-plan-response';
import { CartItem, CartState } from 'models/shop/cart';
import React, { useEffect, useState } from 'react';
import { trackMoEngageAppEvent } from 'utils/common';
import { FBTrackingService } from 'utils/fb-tracking';
import { GATrackingService } from 'utils/ga-tracking';


import FooterV2 from 'components/productv2/footer/footer';
import { Product } from 'models/product';
import PlanModal from './subscriptions/plan-modal';

interface Props {
  subscriptionPlanDetails: FetchSubscriptionsModel;
  selectedVariant: IVariant;
  subscriptionPlansLoading: boolean;
  productDetails: IProductResponse;
  navigation: any;
  variantAdditionalDetails: VariantAdditionalResponse;
  productAdditionalDetails: Product | undefined;
}

const ProductFooter = (props: Props) => {
  const {
    subscriptionPlanDetails,
    selectedVariant,
    subscriptionPlansLoading,
    productDetails,
    navigation,
    variantAdditionalDetails,
    productAdditionalDetails
  } = props;
  const cartDispatch = useCartDispatch();
  const [showSubscriptionModal, setShowSubscriptionModal] =
    useState<boolean>(false);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);
  const { cartItems } = useCartState();
  useEffect(() => {
    trackViewProduct();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setShowSubscriptionModal(false);
      setLoadingBuyNow(false);
    });
    return unsubscribe;
  }, [navigation]);
  const getAvailableVariants = () => {
    const filteredProducts = productDetails.variants?.filter(
      item => item.inventoryQuantity > 0,
    );
    return filteredProducts;
  };
  const getVariantImage = () => {
    let filteredImage = productDetails.images.filter(
      item => item.id === selectedVariant.imageId,
    );
    //   handle if no image found for a variant
    if (filteredImage.length === 0) {
      filteredImage = [productDetails.images[0]];
    }
    return filteredImage[0].src;
  };
  const trackAddToCartMoEngageEvent = () => {
    const productData = productDetails;
    const firebasePayload = {
      currency: 'INR',
      value: selectedVariant.price,
    };
    trackMoEngageAppEvent({
      event: 'add_to_cart_app',
      values: [
        { eventAttribute: 'product_name', value: productData?.title },
        { eventAttribute: 'product_id', value: productData?.id },
        { eventAttribute: 'price', value: selectedVariant.price },
        { eventAttribute: 'quantity', value: 1 },
      ],
      fbEvent: 'AddedToCart',
      firebasePayload,
    });
  };
  const trackViewProduct = () => {
    const productData = productDetails;
    trackMoEngageAppEvent({
      event: 'viewed_product_app',
      values: [
        {
          eventAttribute: 'category_name',
          value: '',
        },
        { eventAttribute: 'category_id', value: '' },
        { eventAttribute: 'product_name', value: productData?.title },
        {
          eventAttribute: 'product_id',
          value: productData.id,
        },
        {
          eventAttribute: 'variant_id',
          value: selectedVariant.id,
        },
      ],
      skipGATrack: true,
    });
    GATrackingService.trackViewProduct({
      item_id: String(productData?.id),
      item_name: productData?.title,
      quantity: 1,
      price: selectedVariant.price,
    });
  };
  const getOptionsFromVariant = () => {
    const options: string[] = [];
    if (selectedVariant.option1 != 'Default Title') {
      options.push(selectedVariant.option1);
    }
    if (selectedVariant.option2 && selectedVariant.option2 != 'Default Title') {
      options.push(selectedVariant.option2);
    }
    return options;
  };
  const processAndaddToCart = (selectedPlan?: Plan) => {
    setLoadingBuyNow(true);
    const productData = productDetails;
    if (selectedPlan) {
      const cartItem: CartItem[] = [
        {
          id: Number(selectedVariant.id),
          variant_id: selectedVariant.id,
          title:
            ((variantAdditionalDetails?.data.variants &&
              variantAdditionalDetails?.data?.variants.length > 0 &&
              variantAdditionalDetails?.data?.variants[0]?.title) ??
              productData.title) as string,
          quantity: 1,
          selectedOptions: getOptionsFromVariant(),
          imageUrl: getVariantImage(),
          compareAtPrice: selectedPlan.compare_at_price,
          price: selectedPlan.base_price,
          selectedPlan,
          productId: productData?.id,
          productTitle: productData.title,
          benefits: productData.benefits,
        },
      ];
      const subscriptionCartItem: CartState = {
        cartItems: cartItem,
        cartLoading: true,
        totalPrice: selectedPlan.base_price * 100,
        isSubscriptionItem: true,
        itemCount: 1,
        orderTotalMRP: selectedPlan?.compare_at_price * 100,
        orderSubtotal: selectedPlan?.base_price * 100,
        orderTotal:
          (selectedPlan.base_price) *
          100,
      };
      cartDispatch(initCart(subscriptionCartItem));
      trackMoEngageAppEvent({
        event: `pdp_buy_now_${selectedPlan.subscription_interval}_months_app`,
        values: [
          { eventAttribute: 'product_name', value: productData.title },
          {
            eventAttribute: 'product_id',
            value: productData?.id,
          },
          {
            eventAttribute: 'variant_id',
            value: selectedVariant.id,
          },
          {
            eventAttribute: 'price',
            value: selectedPlan.base_price * 100,
          },
          {
            eventAttribute: 'quantity',
            value: 1,
          },
          {
            eventAttribute: 'subscription_id',
            value: selectedPlan.plan_id,
          },
        ],
        skipGATrack: true,
      });
      setShowSubscriptionModal(false);
      navigation ? navigation.navigate('CartScreen') : null;
    } else {
      if (cartItems.some(item => item.id == Number(selectedVariant.id))) {
        cartDispatch(increaseQuantity(Number(selectedVariant.id)));
      } else {
        //Need to verify this
        cartDispatch(
          addProduct({
            id: Number(selectedVariant.id),
            title:
              variantAdditionalDetails?.data?.variants?.length > 0
                ? variantAdditionalDetails?.data?.variants[0]?.title
                : productData.title,
            quantity: 1,
            imageUrl: getVariantImage(),
            selectedOptions: [],
            compareAtPrice: selectedVariant.compareAtPrice,
            price: selectedVariant.price,
            productId: String(productData?.id),
          }),
        );
      }
      GATrackingService.trackAddToCart({
        item_id: String(productData.id),
        item_name: productData.title,
        quantity: 1,
        price: selectedVariant.price,
      });
      FBTrackingService.trackAddToCart({
        item_id: String(productData?.id),
        item_name: productData?.title,
        quantity: 1,
        price: selectedVariant.price,
      });
      trackAddToCartMoEngageEvent();
      setLoadingBuyNow(false);
      setShowSubscriptionModal(false);
      navigation.navigate('CartScreen');
    }
  };

  const handleBuyNow = () => {
    if (
      subscriptionPlansLoading ||
      loadingBuyNow ||
      getAvailableVariants().length === 0
    ) {
    } else {
      const eventName = 'atc1_app';

      GATrackingService.trackCustomEvent(eventName, {
        item_id: productDetails.id,
        item_name: productDetails.title,
      });
      trackMoEngageAppEvent({
        event: eventName,
        values: [
          {
            eventAttribute: 'title',
            value: productDetails.title,
          },
          {
            eventAttribute: 'id',
            value: productDetails.id,
          },
        ],
        skipGATrack: true,
      });

      if (!subscriptionPlansLoading) {
        if (
          subscriptionPlanDetails.data &&
          subscriptionPlanDetails.data.plans &&
          subscriptionPlanDetails?.data?.plans.length > 0
        ) {
          setShowSubscriptionModal(true);
        } else {
          processAndaddToCart();
        }
      }
    }
  };
  return (
    <>
      <FooterV2
        selectedVariant={selectedVariant}
        image={getVariantImage()}
        handleBuyNow={handleBuyNow}
        productAdditionalDetails={productAdditionalDetails as Product}
        buyNowBtnDisabled={subscriptionPlansLoading ||
          loadingBuyNow ||
          getAvailableVariants().length === 0}
        productId={productDetails.id}
        isOutOfStock={getAvailableVariants().length === 0}
      />

      {showSubscriptionModal && subscriptionPlanDetails.data && (
        <PlanModal
          variantImage={getVariantImage()}
          productAdditionalDetails={productAdditionalDetails as Product}
          subscriptionPlans={subscriptionPlanDetails.data}
          onCloseSubscriptionModal={setShowSubscriptionModal}
          productData={productDetails as IProductResponse}
          selectedVariant={selectedVariant as IVariant}
          onHandleBuyNow={processAndaddToCart}
          isBuyNowLoading={loadingBuyNow}
        />
      )}
    </>
  );
};
export default ProductFooter;
