import Loader from '@components/elements/loader/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import { commonStyles } from '@styles/common';
import { initCart, setCartLoading } from 'actions/cart';
import WhiteCard from 'components/elements/card/white-card';
import BackToTopButton from 'components/product-detail/backto-top-button';
import ProductFooter from 'components/product-detail/footer';
import BackIcon from 'components/styled/header/back-icon';
import HeaderRight from 'components/styled/header/header-right';
import ProductContainer from 'containers/product/product-container';
import ProductContainerV2 from 'containers/productv2/product-container';
import { useCartDispatch } from 'context/cart/CartContext';
import { useLocalSearchParams } from 'expo-router';
import { Product } from 'models/product';
import {
  IImage,
  IProductResponse,
  IVariant,
  VariantAdditionalResponse,
} from 'models/product-details/product';
import { FetchSubscriptionsModel } from 'models/product-details/subscription-plan-response';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  fetchProductById,
  fetchProducts,
  fetchVariantAdditionalDetail,
  fetchVariantSubscriptionDetail,
} from 'services/product';
import { height } from 'utils/constants';
import { capitalize } from 'utils/math';
import { FIRST_FOLD_SECTIONS, SECOND_FOLD_SECTIONS } from 'utils/product';

export const CONTENT_OFFSET_THRESHOLD = 300;
export const PDP_3_TEMPLATE = "pdp3";

const ProductDetails = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<IVariant>();
  const [productDetails, setProductDetails] =
    useState<IProductResponse>();
  const [productAdditionalDetails, setProductAdditionalDetail] = useState<
    Product | undefined
  >(undefined);
  const [variantAdditionalDetails, setVariantAdditionalDetails] =
    useState<VariantAdditionalResponse>();
  const [subscriptionPlanDetails, setSubscriptionPlanDetails] =
    useState<FetchSubscriptionsModel>();
  const [subscriptionPlansLoading, setSubscriptionPlansLoading] =
    useState<boolean>(false);
  const [dataSourceCords, setDataSourceCords] = useState<number>();
  const cartDispatch = useCartDispatch();

  const [productVariantImages, setProductVariantImages] = useState<IImage[]>([]);
  const {
    queryString,
    productTitle,
    variantId,
  } = useLocalSearchParams<any>();

  const productId = queryString ? JSON.parse(queryString) : null;


  let flatListRef: any = useRef();


  useEffect(() => {
    setLoading(true);
    fetchProductDetails(route?.params?.variantId);
    setHeader();
  }, [route?.params]);

  useEffect(() => {
    if (selectedVariant) {
      fetchSubscriptionPlans();
      fetchProductAdditionalDetails();
      if (selectedVariant.placeholderProduct) {
        const getComboData = async () => {
          const productDetailResponse = await fetchProductById(`${selectedVariant.placeholderProduct}`, SECOND_FOLD_SECTIONS.toString());
          setProductDetails((prevState: any) => {
            return {
              ...prevState,
              sections: productDetailResponse.data.sections
            }
          });
        }
        getComboData();
      } else {
        const nonComboData = async () => {
          const productDetailResponse = await fetchProductById(`${productId}`, SECOND_FOLD_SECTIONS.toString());
          setProductDetails((prevState: any) => {
            return {
              ...prevState,
              sections: productDetailResponse.data.sections
            }
          });
        }
        nonComboData();
      }
    }
  }, [selectedVariant]);

  useEffect(() => {
    if (selectedVariant && productDetails?.images) {
      setVariantImages(selectedVariant.id, productDetails?.images);
    }
  }, [productDetails, selectedVariant]);

  const fetchCartItems = async () => {
    cartDispatch(setCartLoading(true));
    const fetchTryCartState = await AsyncStorage.getItem('cart');
    cartDispatch(initCart(JSON.parse(fetchTryCartState as string)));
    cartDispatch(setCartLoading(false));
  };

  useEffect(() => {
    crashlytics().log(`Product details screen mounted`);
    navigation.addListener('focus', () => {
      fetchCartItems();
    });

    return () => {
      navigation.removeListener('focus', () => {
        fetchCartItems();
      });
    };
  }, []);
  useEffect(() => {
    if (productDetails?.sections)
      fetchProductAdditionalDetail(productId)

  }, [productDetails])

  const fetchProductAdditionalDetail = async productId => {

    const responseProductAdditionalDetail = await fetchProducts([
      productId,
    ]);
    if (responseProductAdditionalDetail.data.product.length > 0)
      setProductAdditionalDetail(responseProductAdditionalDetail.data.product[0]);
  };
  const setHeader = () => {
    // this params we will get it from the deep link as well and the title there is _ separated
    const headerTitle = `${route?.params?.productTitle
      ? `${capitalize(
        (route.params.productTitle as string)
          .split('_')
          .join(' ')
          .substring(0, 20),
      ).replace('Oziva', 'OZiva')}...`
      : ''
      }`;
    navigation.setOptions({
      title: headerTitle,
      headerLeft: () => (
        <BackIcon
          navigation={navigation}
          title={headerTitle}
          flatListRef={flatListRef}
          style={{ textTransform: 'none' }}
        />
      ),
      headerRight: () => <HeaderRight navigation={navigation} hideIcons />,
    });
  };
  const fetchProductDetails = async (variantId?: string) => {
    crashlytics().log(`Fetching product details of ${variantId}`);
    if (productId) {

      const productDetailResponse = await fetchProductById(productId, FIRST_FOLD_SECTIONS.toString());

      let selectedVariant;
      if (variantId) {
        // select variant if it is passed from query
        selectedVariant =
          productDetailResponse.data.variants.filter(item => item.id == variantId)
            .length > 0
            ? productDetailResponse.data.variants.filter(
              item => item.id == variantId,
            )[0]
            : null;
      }
      if (!selectedVariant) {
        setSelectedVariant(
          productDetailResponse.data.variants.sort(
            (a, b) => a.position - b.position,
          )[0],
        );
      } else {
        setSelectedVariant(selectedVariant);
      }
      if (productDetailResponse.data.templateName === PDP_3_TEMPLATE) {
        getProductDetails(productId)
      }
      setProductDetails(productDetailResponse.data);
      setLoading(false);
    }
  };

  const getProductDetails = async (productId: string) => {
    crashlytics().log(
      `Fetching product details of ${selectedVariant?.id}`,
    );
    const productDetailResponse = await fetchProductById(productId, SECOND_FOLD_SECTIONS.toString());
    setProductDetails(productDetail => ({
      ...productDetail,
      ...productDetailResponse.data
    }));
  }

  const fetchProductAdditionalDetails = async () => {
    crashlytics().log(
      `Fetching additional product details of ${selectedVariant?.id}`,
    );
    if (selectedVariant) {
      const variantAdditionDetails = await fetchVariantAdditionalDetail(
        selectedVariant.id,
      );
      setVariantAdditionalDetails(variantAdditionDetails);
    }
  };
  const fetchSubscriptionPlans = async () => {
    crashlytics().log(`Fetching subscription plan of ${selectedVariant?.id}`);
    setSubscriptionPlansLoading(true);
    const variantSubscriptionDetails = await fetchVariantSubscriptionDetail(
      selectedVariant?.id as string,
    );
    crashlytics().log(`Fetched subscription plan of ${variantSubscriptionDetails}`);
    setSubscriptionPlanDetails(variantSubscriptionDetails);
    setSubscriptionPlansLoading(false);
  };
  const handleVariantSelection = variant => {
    setSelectedVariant(variant);
  };

  const insets = useSafeAreaInsets();

  const setVariantImages = (variantId, images) => {
    let selectedVariantImages = images.filter((item) => item.variantIds.indexOf(Number(variantId)) > -1);
    let commonImages = images.filter((item) => item.variantIds.length == 0);
    setProductVariantImages([...selectedVariantImages, ...commonImages]);
  }
  if (loading) {
    return (
      <View style={[commonStyles.flex]}>
        <WhiteCard noBorderRadius noPadding style={{ height: height }}>
          <Loader />
        </WhiteCard>
      </View>
    );
  }
  if (!loading && !((productDetails?.variants?.length as number) > 0)) {
    return (
      <View style={[commonStyles.flex]}>
        <WhiteCard noBorderRadius noPadding style={{ height: height }}>
          <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <Text variant="heading1">Product not found</Text>
          </View>
        </WhiteCard>
      </View>
    );
  }
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        flex: 1,
      }}
    >
      <View style={[commonStyles.flex]}>
        <BackToTopButton
          showBackToTop={showBackToTop}
          backToTop={() => {
            if (flatListRef && flatListRef?.scrollTo) {
              flatListRef?.scrollTo({ y: 0 });
              setShowBackToTop(false);
            }
          }}
        />

        {productDetails?.templateName == PDP_3_TEMPLATE ?
          <ProductContainerV2
            navigation={navigation}
            productDetails={productDetails as IProductResponse}
            selectedVariant={selectedVariant as IVariant}
            variantAdditionalDetails={variantAdditionalDetails as VariantAdditionalResponse}
            productAdditionalDetails={productAdditionalDetails}
            productId={productId}
            productVariantImages={productVariantImages}
            handleVariantSelection={handleVariantSelection}
          />
          :
          <ScrollView
            ref={ref => {
              flatListRef = ref;
            }}
            style={[commonStyles.flex]}
            removeClippedSubviews
            onScrollEndDrag={event => {
              if (
                event.nativeEvent.contentOffset.y > CONTENT_OFFSET_THRESHOLD &&
                !showBackToTop
              ) {
                setShowBackToTop(true);
              } else if (
                event.nativeEvent.contentOffset.y < CONTENT_OFFSET_THRESHOLD &&
                showBackToTop
              ) {
                setShowBackToTop(false);
              }
            }}
            showsVerticalScrollIndicator={false}

          >
            <ProductContainer
              navigation={navigation}
              productDetails={productDetails as IProductResponse}
              selectedVariant={selectedVariant as IVariant}
              variantAdditionalDetails={variantAdditionalDetails as VariantAdditionalResponse}
              productAdditionalDetails={productAdditionalDetails}
              productId={productId}
              productVariantImages={productVariantImages}
              setProductAdditionalDetail={setProductAdditionalDetail}
              handleVariantSelection={handleVariantSelection}
              scrollToBottom={(y) => {
                if (flatListRef && flatListRef?.scrollTo) {
                  flatListRef?.scrollTo({ y: y });
                  setShowBackToTop(false);
                }
              }}
            />

          </ScrollView>
        }
        <ProductFooter
          subscriptionPlanDetails={
            subscriptionPlanDetails as FetchSubscriptionsModel
          }
          selectedVariant={selectedVariant as IVariant}
          subscriptionPlansLoading={subscriptionPlansLoading}
          navigation={navigation}
          productDetails={productDetails as IProductResponse}
          variantAdditionalDetails={
            variantAdditionalDetails as VariantAdditionalResponse
          }
          productAdditionalDetails={productAdditionalDetails}
        />

      </View>
    </SafeAreaView>
  );
};
export default ProductDetails;
