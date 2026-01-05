import { FlatList, Text, View } from 'react-native';
import { commonStyles } from '@styles/common';
import { ViewWrapper } from 'components/styled/common';
import { ProductCardModel } from 'models/product-card/card-model';
import { setProductList } from 'actions/product';
import { fetchProducts } from 'services/product';
import { useProductDispatch, useProductState } from 'context/product';
import { Product } from 'models/product';
import { trackMoEngageAppEvent } from 'utils/common';
import SuccessMessageIconComponent from 'assets/images/icons/standard-icons/success-message-tick';
import { Snackbar } from 'react-native-paper';
import StandardCards from 'components/product-cards/standard-card';
import { useShopDispatch, useShopState } from 'context/shop';
import { setSnackbarVisible } from 'actions/shop';
import React, { useEffect, useState } from 'react';
import { cartService } from 'services/cart';
import { useModalsDispatch } from 'context/modals';
import { setLoginModal } from 'actions/modals';
import useLogin from 'hooks/login';

interface IProps {
  variantIds: string[];
  navigation: any;
}
const ProductPeopleAlsoBought = (props: IProps) => {
  const { snackBarVisible } = useShopState();
  const shopDispatch = useShopDispatch();
  const modalsDispatch = useModalsDispatch();
  const { handleLogout } = useLogin();
  const [upsellProduct, setUpsellProduct] = useState<any>([]);

  const stringifyVariantIds = (): string => {
    const ids = variantIds.map(item => item);
    return ids.join();
  };
  const { variantIds } = props;
  const productDispatch = useProductDispatch();
  const { products: allProductLists, spotlightReviewStatus } =
    useProductState();

  const cartUpsellProducts = () => {
    cartService.cartUpsellService(stringifyVariantIds()).then(response => {
      setUpsellProduct(response);
      fetchProductAdditionalDetailList(
        response.map(item => item.product_id),
      );
    }).catch(err => {
      console.log("Err : ", err);
      if(err?.response?.status === 401){
        handleLogout();
      }
    })
  }

  useEffect(() => {
    cartUpsellProducts();
  }, []);
  const renderItem = ({ item }) => {
    const productAdditionalDetail =
      allProductLists && allProductLists.length > 0
        ? allProductLists?.filter(val => val.id == item.product_id).length > 0
          ? allProductLists?.filter(val => val.id == item.product_id)[0]
          : null
        : null;
    let productCardModel: ProductCardModel = {
      benefits: item.benefits,
      compareAtPrice: item.compare_at_price,
      image: item.image,
      price: item.price,
      productId: item.product_id,
      title: item.title,
      handle: item.product_handle,
      variantId: item.variant_id,
      numberOfReviews: productAdditionalDetail?.numberOfReviews,
      averageRating: productAdditionalDetail?.averageRating,
      benefitsNew: item.benefitsNew
    };
    return (
      <StandardCards
        productCardModel={productCardModel}
        navigation={props.navigation}
        onAction={() => handleAddToCart(productCardModel)}
      />
    );
  };
  const handleAddToCart = productCardModel => {
    trackMoEngageAppEvent({
      event: `upsell_pdp_a2c_app`,
      values: [
        {
          eventAttribute: 'product_id',
          value: productCardModel?.productId as string,
        },
        {
          eventAttribute: 'variant_id',
          value: productCardModel?.variantId as string,
        },
      ],
      trackingTransparency: true,
    });
  };
  const fetchProductAdditionalDetailList = async (productIds: string[]) => {
    if (productIds && productIds.length > 0) {
      const responseProductAdditionalDetail = await fetchProducts(
        productIds,
      );
      productDispatch(
        setProductList([
          ...responseProductAdditionalDetail.data.product,
          ...(allProductLists as Product[]),
        ]),
      );
    }
  };
  if (upsellProduct && upsellProduct.length === 0) {
    return null;
  }
  return (
    <>
      <ViewWrapper
        style={[
          commonStyles.flexColumn,
          commonStyles.alignStart,
          commonStyles.ph16,
          commonStyles.bgWhite,
          commonStyles.pt16,
          commonStyles.mt4,
        ]}
      >
        <View style={[commonStyles.flexRow]}>
          <Text style={[commonStyles.h2Tag]}>People Also Bought</Text>
        </View>
        <View style={[commonStyles.flexD, commonStyles.mb8]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={upsellProduct?.relatedProducts}
            horizontal
            renderItem={renderItem}
            keyExtractor={item => item.variant_id.toString()}
          />
        </View>
      </ViewWrapper>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => shopDispatch(setSnackbarVisible(false))}
        action={{
          label: 'View Cart',
          color: 'red',
          onPress: () => {
            props.navigation.navigate('CartScreen');
          },
        }}
        duration={1000}
      >
        <View style={{ flexDirection: 'row' }}>
          <SuccessMessageIconComponent />
          <Text style={{ color: '#fff', marginLeft: 5, marginTop: 2 }}>
            Item added to cart
          </Text>
        </View>
      </Snackbar>
    </>
  );
};

export default ProductPeopleAlsoBought;
