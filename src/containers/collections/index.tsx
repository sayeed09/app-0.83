import FastImage from '@d11/react-native-fast-image';
import { setSnackbarVisible } from 'actions/shop';
import SuccessMessageIconComponent from 'assets/images/icons/standard-icons/success-message-tick';
import ProductList from 'components/concern-categories/product-list';
import BackIcon from 'components/styled/header/back-icon';
import HeaderRight from 'components/styled/header/header-right';
import SliderSkeleton from 'containers/shop/products-slider-skeleton';
import { useShopDispatch, useShopState } from 'context/shop';
import { useLocalSearchParams } from 'expo-router';
import {
  CollectionByHandleResponse
} from 'models/collection';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { CollectionService } from 'services/collection';
import { DefaultCollectionByHandleQuery, width } from 'utils/constants';

const Collections = ({ navigation, route }) => {
  const [collectionByHandleData, setSelectedCollectionByHandle] =
    useState<CollectionByHandleResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const { snackBarVisible } = useShopState();
  const shopDispatch = useShopDispatch();
  const { handle, banner: getHandleByNavigation } = useLocalSearchParams<any>();

  useEffect(() => {
    if (getHandleByNavigation) {
      fetchCollectionByHandle(getHandleByNavigation);
    }
  }, [getHandleByNavigation]);

  const fetchCollectionByHandle = async (handle: string) => {
    setIsLoading(true);
    const collectionByHandleData =
      await CollectionService.getByCollectionByHandle(
        handle,
        DefaultCollectionByHandleQuery.sortOrder,
        DefaultCollectionByHandleQuery.sortBy,
        DefaultCollectionByHandleQuery.page,
        DefaultCollectionByHandleQuery.upperLimit,
      );
    setSelectedCollectionByHandle(collectionByHandleData);
    setIsLoading(false);
    const title = collectionByHandleData?.data?.title;
    if (title)
      navigation.setOptions({
        headerLeft: () => (
          <BackIcon
            navigation={navigation}
            title={`${title.length > 20 ? `${title.substring(0, 20)}....` : title
              }`}
            style={{ textTransform: 'none' }}
          />
        ),
        headerRight: () => <HeaderRight navigation={navigation} hideIcons />,
      });
  };
  return (
    <View>
      {isLoading && <SliderSkeleton />}
      {banner?.image && (
        <FastImage
          source={{
            uri: banner.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width,
            aspectRatio: 3 / 1,
          }}
        />
      )}
      <ScrollView>
        <ProductList
          navigation={navigation}
          products={collectionByHandleData?.data?.products || []}
          selectedCollectionName={collectionByHandleData?.data?.title as string}
          isLoading={isLoading}
          hideSubCollection
        />
      </ScrollView>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => shopDispatch(setSnackbarVisible(false))}
        action={{
          label: 'View Cart',
          color: 'red',
          onPress: () => {
            navigation.navigate('CartScreen');
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
    </View>
  );
};

export default Collections;
