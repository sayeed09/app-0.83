import { setSnackbarVisible } from 'actions/shop';
import SuccessMessageIconComponent from 'assets/images/icons/standard-icons/success-message-tick';
import CollectionBubbles from 'components/concern-categories/collection-bubbles';
import ProductList from 'components/concern-categories/product-list';
import { useShopDispatch, useShopState } from 'context/shop';
import { snakeCase } from 'lodash';
import {
  Collection,
  CollectionByHandleResponse,
  CollectionByTypeResponseModel,
} from 'models/collection';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { CollectionService } from 'services/collection';
import { trackMoEngageAppEvent } from 'utils/common';
import { DefaultCollectionByHandleQuery, width } from 'utils/constants';

const Categories = ({ route, navigation }) => {
  const [collectionData, setCollectionData] =
    useState<CollectionByTypeResponseModel>();
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [collectionByHandleData, setSelectedCollectionByHandle] =
    useState<CollectionByHandleResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const { snackBarVisible } = useShopState();
  const shopDispatch = useShopDispatch();
  const collectionHandleByNavigation = route?.params?.collectionHandle;

  useEffect(() => {
    fetchCollectionByType();
    navigation.addListener('blur', () => {
      navigation.setParams({
        collectionHandle: null,
      });
    });
  }, []);

  useEffect(() => {
    if (collectionData && collectionHandleByNavigation) {
      const currentCollection = collectionData?.data?.collections.filter(
        item => item.handle === collectionHandleByNavigation,
      ) as Collection[];
      setSelectedCollection(
        currentCollection.length > 0
          ? currentCollection[0]
          : collectionData?.data?.collections[0],
      );
    }
  }, [collectionHandleByNavigation, collectionData, route]);

  useEffect(() => {
    if (selectedCollection) {
      fetchCollectionByHandle(selectedCollection.handle);
    }
  }, [selectedCollection]);
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
  };

  const fetchCollectionByType = async () => {
    const collectionData = await CollectionService.getByCollectionGroup(
      'CATEGORY',
    );
    setCollectionData(collectionData);
    if (
      collectionData?.data?.collections.length > 0 &&
      !collectionHandleByNavigation
    ) {
      setSelectedCollection(collectionData?.data?.collections[0]);
    }
  };
  const trackBubbles = (item: Collection) => {
    trackMoEngageAppEvent({
      event: `categories_${snakeCase(item.handle)}_app`,
      values: [],
      skipGATrack: true,
    });
  };
  const headerComponent = () => (
    <View style={{ width: width }}>
      <CollectionBubbles
        collections={
          collectionData?.data?.collections || ([] as Collection[])
        }
        handleClickOnBubble={item => {
          setSelectedCollection(item);
          trackBubbles(item);
        }}
        selectedCollection={selectedCollection as Collection}
      />
    </View>
  )
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ProductList
        navigation={navigation}
        products={collectionByHandleData?.data?.products || []}
        selectedCollectionName={selectedCollection?.name as string}
        isLoading={isLoading}
        hideSubCollection
        headerComponent={headerComponent}
      />
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
    </SafeAreaView>
  );
};

export default Categories;
