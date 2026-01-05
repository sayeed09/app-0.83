import WhiteCard from '@components/elements/card/white-card';
import crashlytics from '@react-native-firebase/crashlytics';
import { DefaultCollectionByHandleQuery, numberOfRows, searchDefaultCollection, width } from '@utils/constants';
import { setSnackbarVisible } from 'actions/shop';
import CartSvg from 'assets/images/icons/header-icons/cart';
import SearchSvg from 'assets/images/icons/header-icons/search';
import SearchIcon from 'assets/images/icons/header-icons/search-icon';
import CloseSvg from 'assets/images/icons/standard-icons/close_icon';
import SuccessMessageIconComponent from 'assets/images/icons/standard-icons/success-message-tick';
import { StyledActionButton } from 'components/base/button/styled';
import ProductList from 'components/concern-categories/product-list';
import Tab from 'components/concern-categories/tab';
import SecondaryButton from 'components/elements/button/secondary-button';
import StandardCards from 'components/product-cards/standard-card';
import BackIcon from 'components/styled/header/back-icon';
import ProductSkeleton from 'containers/shop/products-skeleton';
import { useCartState } from 'context/cart/CartContext';
import { useNotificationState } from 'context/notifications';
import { useSearchState } from 'context/search';
import { useShopDispatch, useShopState } from 'context/shop';
import { Collection, Product } from 'models/collection';
import { ProductCardModel } from 'models/product-card/card-model';
import { ISearchPayload, ISearchResponse, ISearchResultProduct } from 'models/search';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { CollectionService } from 'services/collection';
import { fetchSearchResultService } from 'services/search';
import { commonStyles } from 'styles/common';
import { trackMoEngageAppEvent } from 'utils/common';
import useDebounce from 'utils/debounce';

const styles = StyleSheet.create({
  cartCountWrapper: {
    position: 'absolute',
    top: -8,
    right: 5,
    backgroundColor: '#ef4e24',
    borderRadius: 17 / 2,
    width: 17,
    height: 17,
    paddingHorizontal: 4,
    zIndex: 2,
  },
  cartCountText: {
    textAlign: 'center',
    lineHeight: 16,
    fontSize: 8,
    fontFamily: 'Roboto-Regular',
    color: 'white',
  },
});

const Search = ({ navigation, route }) => {
  const inputRef = React.useRef<TextInput | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<ISearchResultProduct[]>();
  const { trackingTransparency } = useNotificationState();
  const [collectionData, setCollectionData] = useState<Collection[]>();
  const [selectedCollection, setSelectedCollectionTab] = useState(searchDefaultCollection);
  const [showViewMore, setShowViewMore] = useState(false);
  const [productsCount, setProductCount] = useState(0);
  const [collectionByHandle, setCollectionByHandle] = useState<Product[]>([]);
  const shopDispatch = useShopDispatch();
  const { snackBarVisible } = useShopState();
  const [pageNo, setPageNo] = useState(1);
  const { itemCount } = useCartState();
  const [collectionPageNo, setCollectionPageNo] = useState(1);
  const { searchParams } = useSearchState();

  const trackContinueShopping = () => {
    trackMoEngageAppEvent({
      event: 'searched_app',
      values: [{ eventAttribute: 'search_query', value: searchText }],
      trackingTransparency,
    });
  };

  const fetchSearchResult = (text) => {
    if (text != '') {
      trackContinueShopping();
      let payload: ISearchPayload = {
        minQueryLength: 1,
        productsCount: pageNo * 10,
        q: text,
        sort: searchParams['sort']
      }
      let headers = {
        "x-api-key": searchParams['x-api-key'],
        "x-store-id": searchParams['x-store-id'],
      }
      fetchSearchResultService(payload, headers).then((response: ISearchResponse) => {
        crashlytics().log(`fetch search result for : ${text}`);
        setIsLoading(false);
        if (response.statusCode == 200) {
          setSelectedCollectionTab(null as any);
          let products = response.payload.result;
          setSearchResult(products);
          setProductCount(products.length);
          if (response.payload.total <= pageNo * 10) {
            setShowViewMore(false);
          } else {
            setShowViewMore(true);
          }
          if (products.length < 1) {
            setSelectedCollectionTab(searchDefaultCollection);
          }
        }
      }).catch(err => {
        crashlytics().recordError(new Error(`Error while fetching search result : ${text}`));
        console.log("Error : ", err);
        setIsLoading(false);
      });
    }
  }
  const handleChangeText = text => {
    setSearchText(text);
    setIsLoading(true);
    if (text == '') {
      setSelectedCollectionTab(searchDefaultCollection);
    }
  };

  useDebounce(() => fetchSearchResult(searchText), [searchText, pageNo], 200);

  useEffect(() => {
    fetchConcerns();
    handleTabClick(searchDefaultCollection);
    setTimeout(() => {
      let routePrams = route?.params;
      if (routePrams?.searchText) {
        setSearchText(routePrams.searchText.trim());
        setIsLoading(true);
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      updateProductList(selectedCollection.handle);
    }
  }, [collectionPageNo, selectedCollection]);

  const fetchConcerns = async () => {
    const collectionData = await CollectionService.getByCollectionGroup(
      'CONCERN',
    );
    setCollectionData(collectionData.data.collections);
  }
  navigation.setOptions({
    headerLeft: () => (
      <>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, width: width }}>
          <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
            <BackIcon navigation={navigation} title="" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.8, borderWidth: 1, borderColor: '#D9D9D9', backgroundColor: '#f5f5f5', margin: 8, borderRadius: 4 }}>
            <StyledActionButton style={{ marginLeft: 8 }}>
              <SearchSvg color="#D9D9D9" />
            </StyledActionButton>
            <TextInput
              ref={inputRef}
              autoFocus={true}
              onChangeText={handleChangeText}
              style={{ height: 35, color: '#000000', width: '85%', backgroundColor: '#f5f5f5', padding: 10, paddingRight: 20 }}
              placeholder="Search for products"
              placeholderTextColor="#B3B3B3"
              value={searchText}
            />
            {searchText && (
              <StyledActionButton style={{ marginLeft: -20 }} onPress={() => {
                setSearchText('');
                inputRef?.current?.clear();
                setSelectedCollectionTab(searchDefaultCollection);
              }}>
                <CloseSvg />
              </StyledActionButton>
            )}
          </View>
          <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
            <StyledActionButton onPress={() => {
              navigation.navigate('CartScreen')
            }}>
              <View style={{ paddingHorizontal: 10 }}>
                {itemCount !== 0 && (
                  <View style={styles.cartCountWrapper}>
                    <Text style={styles.cartCountText}>
                      {itemCount > 9 ? '9+' : itemCount}
                    </Text>
                  </View>
                )}
                <CartSvg />
              </View>
            </StyledActionButton>
          </View>
        </View>
      </>
    ),
  });

  const productAttributes = (attributes) => {
    const sortedAttributes: any = [];
    attributes && attributes.forEach((attribute) => {
      attribute.id == 'new_benefits' ? sortedAttributes.push({ 'benefits': attribute.values }) :
        attribute.id == 'variant_id' ? sortedAttributes.push({ 'variantId': attribute.values }) :
          attribute.id == 'product_tag' ? sortedAttributes.push({ 'productTag': attribute.values }) :
            attribute.id == 'product_handle' ? sortedAttributes.push({ 'handle': attribute.values }) :
              attribute.id == 'options' ? sortedAttributes.push({ 'options': attribute.values[0].value }) : null;
    });
    return sortedAttributes;
  }

  const productList = ({ item }) => {
    const imageUrl = item?.mainImage?.replace('.png', '_200x.png');
    const attr = productAttributes(item?.attributes);
    const benefit = attr.filter(item => item.benefits)[0]['benefits'][0];
    const variantId = attr.filter(item => item.variantId)[0]['variantId'][0].value[0];
    const handle = attr.filter(item => item.handle)[0];
    const productTag = attr.filter(item => item.productTag)[0]['productTag'][0];
    const productOptions = attr.filter(item => item.options)[0]['options'][0];
    const options = JSON.parse(productOptions).map((item, index) => {
      return item.name;
    });

    const productModel: ProductCardModel = {
      productId: item.id,
      variantId: variantId,
      title: item.name,
      price: item.sellingPrice,
      compareAtPrice: item.price,
      benefits: benefit,
      handle: handle,
      image: imageUrl,
      options: options,
      averageRating: item.avgRatings,
      numberOfReviews: item.totalReviews,
      benefitsNew: JSON.parse(benefit.value)
    };
    return (
      <View style={{ flex: 1 }}>
        <StandardCards
          productCardModel={productModel}
          navigation={navigation}
        />
      </View>
    );
  };

  const handleTabClick = (item) => {
    crashlytics().log(`Search item clicked : ${JSON.stringify(item)}`);
    if (item.handle != selectedCollection?.handle) {
      setCollectionByHandle([]);
      setSearchResult(null as any);
      setSelectedCollectionTab(item);
      setCollectionPageNo(1);
    }
  }

  const updateProductList = async (handle) => {
    const collectionByHandleData = await CollectionService.getByCollectionByHandle(
      handle,
      DefaultCollectionByHandleQuery.sortOrder,
      DefaultCollectionByHandleQuery.sortBy,
      collectionPageNo,
      10,
    );
    if (collectionByHandleData.data.products.length == 10) {
      setShowViewMore(true);
    } else {
      setShowViewMore(false);
    }
    setCollectionByHandle((prevProducts) => [...prevProducts, ...collectionByHandleData.data.products]);
  }

  const handleViewAll = () => {
    if (selectedCollection) {
      setCollectionPageNo((prevPage) => prevPage + 1);
    }
    if (searchResult?.length == 10) {
      setPageNo((pageNo) => pageNo + 1);
    }
  }

  return (
    <WhiteCard noBorderRadius style={{ flex: 1, marginHorizontal: -5, padding: 8 }}>
      <ScrollView
        onScroll={() => Keyboard.dismiss()}
        showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 4 }}>
          {(searchResult && productsCount < 1 && searchText && !isLoading) &&
            <View style={[commonStyles.flex, commonStyles.alignCenter, commonStyles.justifyCenter, commonStyles.mh16, { height: 200 }]}>
              <SearchIcon />
              <Text style={[commonStyles.mv16, { fontWeight: 'bold' }]} variant="heading1">No results found for "{searchText}"</Text>
              <Text>Untill then, Explore our Bestsellers</Text>
            </View>
          }
          {
            (!searchText || productsCount < 1) && <View style={{ minHeight: 160 }}>
              <Text variant="heading1" style={[commonStyles.pv16, { fontFamily: 'Manrope-SemiBold' }]}>
                Discover solutions for better health
              </Text>
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: -8 }}>
                {collectionData && collectionData.map((item, index) => {
                  return <Tab fontColor={'#7e7e7e'} collection={item} isSelected={selectedCollection?.handle == item.handle} handleOnClick={() => handleTabClick(item)} />;
                })}
              </View>
            </View>
          }
          {(selectedCollection && (productsCount == 0 || !searchText)) &&
            <View>
              <Text variant="heading1" style={[commonStyles.pv16, { fontFamily: 'Manrope-SemiBold' }]}>
                {selectedCollection.name != "Bestseller" ? `Best Sellers in ${selectedCollection.name}` : 'Explore our Best Sellers'}
              </Text>
              <View style={{ marginTop: -25 }}>
                <ProductList
                  navigation={navigation}
                  products={collectionByHandle || []}
                  selectedCollectionName={''}
                  isLoading={isLoading}
                  hideSubCollection
                />
              </View>
            </View>
          }

          {(searchText && productsCount > 0 && !!searchResult) &&
            <>
              <View>
                <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Showing {productsCount} results for "{searchText}"</Text>
              </View>
              <View>
                <FlatList
                  numColumns={numberOfRows}
                  onScroll={() => Keyboard.dismiss()}
                  data={searchResult}
                  renderItem={productList}
                  keyExtractor={(item) => item?.id}
                  keyboardShouldPersistTaps="always"
                  removeClippedSubviews={true}
                  ListEmptyComponent={
                    isLoading ? (
                      <>
                        <ProductSkeleton />
                        <ProductSkeleton />
                      </>
                    ) : null}
                  onEndReachedThreshold={1}
                />
              </View>
            </>}
          {showViewMore && <View style={{ width: 200, alignSelf: 'center', marginTop: 16 }}>
            <SecondaryButton onAction={handleViewAll} title={'View More'}
              style={{
                borderColor: '#FF6F00',
                padding: 12
              }} />
          </View>}
        </View>
      </ScrollView>
      <Snackbar
        style={{ marginHorizontal: 'auto', marginVertical: 0, width: '90%' }}
        visible={snackBarVisible}
        onDismiss={() => shopDispatch(setSnackbarVisible(false))}
        action={{
          label: 'View Cart',
          color: 'red',
          onPress: () => {
            navigation.navigate('CartScreen');
          },
        }}
        duration={10000}>
        <View style={{ flexDirection: 'row' }}>
          <SuccessMessageIconComponent />
          <Text style={{ color: '#fff', marginLeft: 5, marginTop: 2 }}>
            Item added to cart
          </Text>
        </View>
      </Snackbar>
    </WhiteCard>
  );
};

export default Search;
