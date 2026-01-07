import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text } from '@components/base/foundation';
import { useCartState } from '@context/cart/CartContext';
import { trackMoEngageAppEvent } from '@utils/common';
import { useNotificationState } from 'context/notifications';
import { ProductCardModel } from 'models/product-card/card-model';
import MiniCard from 'components/product-cards/mini-cards';
import { commonStyles } from 'styles/common';
import { cartService } from 'services/cart';
import useLogin from 'hooks/login';

const PeopleAlsoBought = (): React.ReactElement | null => {
  const [upsellProduct, setUpsellProduct] = useState<any>([]);
  const { cartItems } = useCartState();
  const { trackingTransparency } = useNotificationState();
  const { handleLogout } = useLogin();

  const stringifyVariantIds = (): string => {
    const ids = cartItems.map(cartItem => cartItem?.id);
    return ids.join();
  };

  const cartUpsellProducts = () => {
    cartService.cartUpsellService(stringifyVariantIds()).then(response => {
      setUpsellProduct(response);
    }).catch(err => {
      if (err?.response?.status === 401) {
        handleLogout();
      }
    })
  }

  useEffect(() => {
    cartUpsellProducts();
  }, []);

  const trackContinueShopping = (productCardModel: ProductCardModel) => {
    trackMoEngageAppEvent({
      event: 'cart_suggest_products_add_to_cart_app',
      values: [
        { eventAttribute: 'product_name', value: productCardModel?.title },
        {
          eventAttribute: 'variant_id',
          value: productCardModel?.variantId,
        },
      ],
      trackingTransparency,
    });
  };

  const renderProduct = ({ item }) => {
    const productCardModel: ProductCardModel = {
      benefits: item.benefits,
      compareAtPrice: item.compare_at_price,
      image: item.image,
      price: item.price,
      title: item.title,
      productId: item.product_id,
      variantId: item.variant_id,
      handle: item.product_handle,
    };
    return (
      <MiniCard
        productCardModel={productCardModel}
        onAction={() => trackContinueShopping(productCardModel)}
      />
    );
  };

  if (cartItems.length === 0 || upsellProduct && upsellProduct.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        flex={1}
        px={2}
        py={4}
        style={{ backgroundColor: '#C8E6C8', minHeight: 180, padding: 0 }}
      >
        <Text style={[commonStyles.h2Tag, commonStyles.mb8]}>
          Add For Better Results
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={upsellProduct ? upsellProduct : null}
          horizontal
          renderItem={renderProduct}
          keyExtractor={item => item.variant_id.toString()}
        />
      </Box>
    </>
  );
};

export default PeopleAlsoBought;
