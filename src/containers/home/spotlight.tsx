import ProductSkeleton from '@containers/shop/products-skeleton';
import { gray7E, primaryOrange } from 'components/styles/colors';
import { useNotificationState } from 'context/notifications';
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { resizeImageForDevice } from 'utils/image-utils';

import { BaseView } from '@components/base/view';
import WhiteCard from '@components/elements/card/white-card';
import { trackMoEngageAppEvent } from '@utils/common';
import { DefaultCollectionByHandleQuery, width } from '@utils/constants';
import { BEST_SELLER } from '@utils/images';

import { setProductList, setSpotlightReviewStatus } from 'actions/product';
import { useProductDispatch, useProductState } from 'context/product';
import { CollectionByHandleResponse } from 'models/collection';
import { Product } from 'models/product';
import { CollectionService } from 'services/collection';
import { fetchProducts } from 'services/product';
import { commonStyles } from 'styles/common';
import RenderProductList from './product-list';

interface SpotlightCategoriesProps {
  selectedId: boolean;
  setSelectedId: React.Dispatch<boolean>;
  categories: any;
  scrollX: any;
}
const SpotlightCategories = (props: SpotlightCategoriesProps) => {
  const [showAnimatedView, setShowAnimatedView] = useState(false);
  const { trackingTransparency } = useNotificationState();
  const { selectedId, setSelectedId, categories, scrollX } = props;
  const scrollRef = useRef();
  const viewRef = useRef();

  const trackContinueShopping = value => {
    const eventName = value.title
      .trim()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .replace(/ +(?= )/g, '')
      .replace(/ /g, '_')
      .toLowerCase();
    trackMoEngageAppEvent({
      event: `${eventName}_clicked_app`,
      values: [
        {
          eventAttribute: 'category_name',
          value: value.title,
        },
        { eventAttribute: 'category_id', value: value.id },
        // { eventAttribute: 'Session duration', value: checkoutDetails?.quantity },
      ],
      trackingTransparency,
    });
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginVertical: 12 }}
    >
      <View style={{ flexDirection: 'row' }} ref={viewRef}>
        {showAnimatedView && (
          <Animated.View
            style={{
              position: 'absolute',
              borderWidth: 2,
              borderRadius: 35,
              width: 70,
              height: 70,
              top: 5,
              left: -1,
              borderColor: primaryOrange,
              transform: [{ translateX: scrollX }],
            }}
          />
        )}
        {categories.map((res, index) => (
          <View key={res.id} style={{ marginRight: 25 }}>
            <Pressable
              onPress={() => {
                if (res?.ref?.current?.measureLayout) {
                  setShowAnimatedView(true);
                  res?.ref?.current?.measureLayout(viewRef.current, x => {
                    scrollRef.current?.scrollTo({
                      x: x - 150,
                      y: 0,
                      animated: true,
                    });
                    Animated.timing(scrollX, {
                      toValue: x,
                      useNativeDriver: true,
                      easing: Easing.linear
                    }).start();
                  });
                }
                setSelectedId(res.handle);
                trackContinueShopping(res);
              }}
            >
              <BaseView>
                <BaseView
                  style={{
                    marginTop: 6,
                    padding: 4,
                  }}
                  ref={res.ref}
                >
                  {!showAnimatedView && index == 0 && (
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 34,
                        width: 68,
                        height: 68,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        margin: 'auto',
                        borderColor: primaryOrange,
                      }}
                    />
                  )}
                  <Image
                    source={
                      res?.image
                        ? {
                          uri: resizeImageForDevice(
                            res?.image,
                            width / 5,
                          ),
                        }
                        : BEST_SELLER
                    }
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 20,
                    }}
                  />
                </BaseView>
                <Text
                  style={{
                    paddingVertical: 5,
                    fontSize: 14,
                    fontFamily: 'Roboto-Regular',
                    color: res.handle === selectedId ? '#000' : gray7E,
                  }}
                >
                  {res?.title}
                </Text>
              </BaseView>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const InSpotLight = ({
  cartItems,
  cartDispatch,
  navigation,
  data,
  limit,
  sectionLoaded,
  setSectionLoaded,
}) => {
  const [selectedId, setSelectedId] = useState(
    data?.subCollections &&
    data?.subCollections.length > 0 &&
    data?.subCollections[0].handle,
  );
  const [collectionByHandleData, setSelectedCollectionByHandle] =
    useState<CollectionByHandleResponse>();
  const sectionCount = sectionLoaded?.length;
  const productDispatch = useProductDispatch();
  const { products: allProductLists, spotlightReviewStatus } =
    useProductState();
  const [review, setReviews] = useState([]);

  const fetchProductAdditionalDetailList = async (productIds: string[]) => {
    if (productIds && productIds.length > 0) {
      const responseProductAdditionalDetail = await fetchProducts(
        productIds,
      );
      setReviews(responseProductAdditionalDetail?.data?.product);
    }
  };
  useEffect(() => {
    fetchCollectionByHandle(selectedId);
  }, [selectedId]);
  const fetchCollectionByHandle = async (handle: string) => {
    const collectionByHandleData =
      await CollectionService.getByCollectionByHandle(
        handle,
        DefaultCollectionByHandleQuery.sortOrder,
        DefaultCollectionByHandleQuery.sortBy,
        DefaultCollectionByHandleQuery.page,
        DefaultCollectionByHandleQuery.limit,
      );
    setSelectedCollectionByHandle(collectionByHandleData);
    fetchProductAdditionalDetailList(
      collectionByHandleData?.data?.products.map(item => item.id),
    );
    return collectionByHandleData;
  };
  useEffect(() => {
    if (!spotlightReviewStatus && allProductLists?.length > 0) {
      productDispatch(setSpotlightReviewStatus(true));
    }
  }, [allProductLists]);

  useEffect(() => {
    if (sectionLoaded && sectionLoaded.length > 0) {
      productDispatch(
        setProductList([...review, ...(allProductLists as Product[])]),
      );
    }
  }, [sectionLoaded, review]);

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <RenderProductList item={item} navigation={navigation} />
      </View>
    );
  }, [collectionByHandleData &&
    collectionByHandleData?.data?.products])
  return (
    <WhiteCard
      noBorderRadius
      style={{ marginVertical: 6, paddingHorizontal: 6 }}
    >
      <View
        style={[
          commonStyles.flexRow,
          commonStyles.alignCenter,
          commonStyles.justifyCenter,
        ]}
      >
        <Text style={[commonStyles.head18]}>
          {data.title || 'In The Spotlight'}
        </Text>
        {/* <View style={[homeStyles.viewAllBTN]}>
          <Pressable onPress={() => viewAllOnClick(data.handle)}>
            <Text style={[homeStyles.viewAllBTNText]}>View All</Text>
          </Pressable>
        </View> */}
      </View>
      {data?.subCollections && data?.subCollections.length > 0 ? (
        <SpotlightCategories
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          scrollX={useRef(new Animated.Value(6.181)).current}
          categories={data?.subCollections?.map(item => ({
            ...item,
            ref: createRef(),
          }))}
        />
      ) : null}
      <View>
        {collectionByHandleData && collectionByHandleData?.data?.products ? (
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 16 }}
            numColumns={2}
            data={
              (collectionByHandleData &&
                collectionByHandleData?.data?.products) ||
              []
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
            removeClippedSubviews={true}
            initialNumToRender={2}
          />
        ) : (
          <View style={{ marginLeft: 10 }}>
            <ProductSkeleton />
          </View>
        )}
      </View>
    </WhiteCard>
  );
};

export default InSpotLight;
