import useCart from 'hooks/cart';
import { ProductCardModel } from 'models/product-card/card-model';
import React, { useEffect, useState } from 'react';
import { commonStyles } from 'styles/common';
import crashlytics from '@react-native-firebase/crashlytics';
import { fetchProductById, fetchVariantAdditionalDetail } from 'services/product';
import { IImage, IOption, IVariant, ProductCatalogResponse } from 'models/product-details/product';
import OZModal from 'components/modal';
import ProductOptions from 'components/product-detail/options';
import { ScrollView, Text, View, } from 'react-native';
import PrimaryButton from 'components/elements/button/primary-Button';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import ProductDetailsLabel from 'components/base/label/product-details-label';
import { FIRST_FOLD_SECTIONS } from 'utils/product';
import ButtonWithIcon from 'components/elements/button/primary-buttonv2';

interface Props {
  productCartModel: ProductCardModel;
  addToCartCallback?: () => void;
}

const AddToCart = (props: Props) => {
  const { productCartModel, addToCartCallback } = props;
  const { handleAddToCart, clearDiscount } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<ProductCatalogResponse['data']>();
  const [variantPopUp, setVariantPopUp] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<IVariant>();
  const [variantAdditionDetails, setVariantAdditionalDetails] = useState<any>();

  const fetchProductDetails = async (variantId?: string) => {
    if (productCartModel.productId) {
      const productDetails = await fetchProductById(productCartModel.productId, FIRST_FOLD_SECTIONS.toString());
      let selectedVariant;
      if (variantId) {
        // select variant if it is passed from query
        selectedVariant =
          productDetails.data.variants.filter(item => item.id == variantId)
            .length > 0
            ? productDetails.data.variants.filter(
              item => item.id == variantId,
            )[0]
            : null;
      }
      if (!selectedVariant) {
        setSelectedVariant(
          productDetails.data.variants.sort(
            (a, b) => a.position - b.position,
          )[0],
        );
      } else {
        setSelectedVariant(selectedVariant);
      }
      setSelectedProduct(productDetails.data);
    }
  };

  const fetchVariantTitle = async () => {
    if (selectedVariant) {
      const variantAdditionDetails = await fetchVariantAdditionalDetail(selectedVariant.id);
      setVariantAdditionalDetails(variantAdditionDetails);
    }
  }

  useEffect(() => {
    fetchVariantTitle();
  }, [selectedVariant]);

  const addVariantToCart = (variant) => {
    clearDiscount();
    // Using selected variant as this is set after pop is open
    if (selectedVariant) {
      const productCartModel: ProductCardModel = {
        variantId: selectedVariant.id,
        title: selectedProduct ? selectedProduct.title : '',
        quantity: 1,
        image: selectedVariant.imageId,
        compareAtPrice: String(selectedVariant.compareAtPrice),
        price: String(selectedVariant.price),
        productId: selectedProduct ? selectedProduct.id : ''
      };
      if (addToCartCallback) addToCartCallback();
      handleAddToCart(productCartModel);
      setVariantPopUp(false);
    } else {
      handleAddToCart(variant);
    }
  }
  const handleModalClose = () => {
    setVariantPopUp(false);
    setSelectedProduct(undefined);
  }

  const isFlavourAvailable = selectedProduct && selectedProduct?.options && selectedProduct?.options.find(item => (item.name == "Flavour" || item.name == "Flavor"));
  const isSizeAvailable = selectedProduct && selectedProduct?.options && selectedProduct?.options.find(item => item.name == "Size");
  return (
    <>
      <View style={{ marginTop: 8, width: '100%' }}>
        <ButtonWithIcon
          title={productCartModel.options?.includes('Flavour') || productCartModel.options?.includes('Flavor') ? 'SELECT FLAVOUR' : productCartModel.options?.includes('Size') ? 'SELECT SIZE' : 'ADD TO CART'}
          onPress={() => {
            if (!productCartModel.options?.includes('Flavour') && !productCartModel.options?.includes('Size') && !productCartModel.options?.includes('Flavor')) {
              addVariantToCart(productCartModel);
            } else {
              fetchProductDetails();
              fetchVariantTitle();
              setVariantPopUp(true);
            }
          }}
          iconUri={
            ['Flavour', 'Flavor', 'Size'].some(opt =>
              productCartModel.options?.includes(opt)
            ) ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_left.png?v=1756098694' : undefined
          }
        />
      </View>
      {
        (variantPopUp && selectedProduct) ?
          <OZModal
            visible={true}
            onRequestClose={() => handleModalClose()}
            setModalVisible={() => handleModalClose()}
            title={(isSizeAvailable || isFlavourAvailable) ? isFlavourAvailable ? "Select Flavour & Size" : "Select Size" : "Add To Cart"}
            transparent
            animationType="fade"
            contentContainerStyles={{ height: 'auto', maxHeight: '80%' }}
            headerStyles={[
              {
                backgroundColor: '#F1FFEE',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
            ]}
          >
            <ScrollView style={{ maxHeight: '80%', width: '100%' }}>
              {(selectedProduct && selectedVariant) &&
                <ProductOptions
                  options={selectedProduct.options as IOption[]}
                  selectedVariant={selectedVariant as IVariant}
                  variants={selectedProduct.variants as IVariant[]}
                  hideSubscriptionText={true}
                  handleVariantSelection={variant => setSelectedVariant(variant)}
                  variantImages={selectedProduct.images as IImage[]} />
              }
            </ScrollView>
            <View style={[{
              flex: 1, width: '100%',
              paddingVertical: 8, paddingHorizontal: 16, marginHorizontal: -5, borderTopWidth: 1, borderColor: '#e0e0e0'
            }]}>
              <ProductDetailsLabel style={[commonStyles.fs14, { marginBottom: 0 }]}>
                {variantAdditionDetails?.data?.title
                  ? variantAdditionDetails?.data?.title
                  : selectedProduct.title as string}
              </ProductDetailsLabel>
            </View>
            <View style={[
              commonStyles.flex,
              commonStyles.flexRowCenter,
              commonStyles.mb20,
              commonStyles.ph16, { borderTopWidth: 1, borderColor: '#e0e0e0' }]}>
              <View style={{ flex: 0.6 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[commonStyles.fs14, { color: '#7e7e7e' }]}>Total MRP</Text>
                  {selectedVariant?.compareAtPrice - selectedVariant?.price > 0 ?
                    <>
                      <Text style={[commonStyles.fs14, commonStyles.ph4, { textDecorationLine: 'line-through', color: '#7e7e7e' }]}>
                        {formatCurrencyWithSymbol(selectedVariant?.compareAtPrice)}
                      </Text>
                      <Text style={[commonStyles.fs14, commonStyles.fwBold]}>
                        {formatCurrencyWithSymbol(selectedVariant?.price)}
                      </Text>
                    </> :
                    <Text style={[commonStyles.fs14]}>
                      {formatCurrencyWithSymbol(selectedVariant?.price)}
                    </Text>
                  }
                </View>
                {selectedVariant ?
                  selectedVariant.compareAtPrice - selectedVariant.price > 0 ?
                    <View style={[
                      commonStyles.flexD,
                      commonStyles.justifyStart,
                      commonStyles.width,
                    ]}>
                      <Text style={{ fontSize: 12, color: '#FF6F00' }}>You Save: </Text>
                      <Text style={{ fontSize: 12, color: '#FF6F00' }}> {formatCurrencyWithSymbol(selectedVariant?.compareAtPrice - selectedVariant?.price)}</Text>
                    </View> : null
                  : null}
              </View>
              <View style={{ flex: 0.4 }}>
                <PrimaryButton
                  style={{ marginTop: 8 }}
                  accentColor="#FF6F00"
                  textTransform='capatilize'
                  textStyle={[commonStyles.fs14, { lineHeight: 16 }]}
                  onAction={() => {
                    crashlytics().log(
                      `User added item to cart : ${JSON.stringify(
                        productCartModel.variantId,
                      )}`,
                    );
                    addVariantToCart(productCartModel);
                  }}
                  title={'ADD TO CART'} />
              </View>
            </View>
          </OZModal>
          : null
      }
    </>
  );
};
export default AddToCart;