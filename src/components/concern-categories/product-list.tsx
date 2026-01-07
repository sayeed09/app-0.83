import { BaseView } from 'components/base/view';
import StandardCards from 'components/product-cards/standard-card';
import ProductSkeleton from 'containers/shop/products-skeleton';
import { Collection, Product } from 'models/collection';
import { ProductCardModel } from 'models/product-card/card-model';
import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { commonStyles } from 'styles/common';
import { numberOfRows } from 'utils/constants';
import { fetchProducts } from 'services/product';
import { setProductList } from 'actions/product';
import { useProductDispatch, useProductState } from 'context/product';
import { Product as ProductModel } from 'models/product';
interface IProps {
  products: Product[];
  selectedCollectionName: string;
  selectedSubCollection?: Collection;
  navigation: any;
  isLoading: boolean;
  hideSubCollection?: boolean;
  headerComponent?: () => React.JSX.Element
}
const ProductList = (props: IProps) => {
  const {
    products,
    selectedCollectionName,
    navigation,
    selectedSubCollection,
    isLoading,
    hideSubCollection,
    headerComponent
  } = props;
  const productDispatch = useProductDispatch();
  const { products: allProductLists } = useProductState();

  useEffect(() => {
    fetchProductAdditionalDetailList(products.map(item => item.id));
  }, [products]);

  const renderProductList = useCallback(({ item }) => {
    const productAdditionalDetail =
      allProductLists && allProductLists.length > 0
        ? allProductLists?.filter(val => val.id == item.id).length > 0
          ? allProductLists?.filter(val => val.id == item.id)[0]
          : null
        : null;
    const productCardModel: ProductCardModel = {
      averageRating: productAdditionalDetail?.averageRating,
      numberOfReviews: productAdditionalDetail?.numberOfReviews,
      benefits: item.benefits,
      compareAtPrice: item.compareAtPrice.toString(),
      image: item.image,
      options: item.options,
      price: item.price.toString(),
      productId: item.id,
      title: item.title,
      variantId: item.variantId,
      benefitsNew: item.benefitsNew
    };
    return (
      <StandardCards
        productCardModel={productCardModel}
        navigation={navigation}
      />
    );
  }, [allProductLists]);
  const fetchProductAdditionalDetailList = async (productIds: string[]) => {
    if (productIds && productIds.length > 0) {
      const responseProductAdditionalDetail = await fetchProducts(
        productIds,
      );
      productDispatch(
        setProductList([
          ...responseProductAdditionalDetail.data.product,
          ...(allProductLists as ProductModel[]),
        ]),
      );
    }
  };
  return (
    <>
      <FlatList
        numColumns={numberOfRows}
        showsVerticalScrollIndicator={false}
        data={products || []}
        renderItem={renderProductList}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        ListEmptyComponent={
          isLoading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : !products ? (
            <BaseView Center style={{ height: 200 }}>
              <Text>No Products Available</Text>
            </BaseView>
          ) : null
        }
        onEndReachedThreshold={1}
        keyExtractor={(item, index) => item.id + index}
        ListHeaderComponent={<>
          {headerComponent && headerComponent()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingHorizontal: 8,
            }}
          >
            {selectedCollectionName && (
              <>
                <View>
                  <Text style={[commonStyles.fs14, commonStyles.fw500]}>
                    {selectedCollectionName}{' '}
                    {!hideSubCollection && (
                      <>: {selectedSubCollection?.name ?? 'All'}</>
                    )}
                  </Text>
                </View>
                {products?.length > 0 ? (
                  <View>
                    <Text style={[commonStyles.fs12]}>
                      {products?.length} Products
                    </Text>
                  </View>
                ) : null}
              </>
            )}
          </View>
        </>}
        contentContainerStyle={[commonStyles.mt4]}
        initialNumToRender={4}
      />
    </>
  );
};
export default ProductList;
