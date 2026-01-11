import { setSnackbarVisible } from 'actions/shop';
import SuccessMessageIconComponent from 'assets/images/icons/standard-icons/success-message-tick';
import CollectionBubbles from 'components/concern-categories/collection-bubbles';
import ProductList from 'components/concern-categories/product-list';
import SubCollectionTags from 'components/concern-categories/subcollection-tags';
import { useShopDispatch, useShopState } from 'context/shop';
import { useLocalSearchParams } from 'expo-router';
import { snakeCase } from 'lodash';
import {
  Collection,
  CollectionByHandleResponse,
  CollectionByTypeResponseModel,
} from 'models/collection';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { CollectionService } from 'services/collection';
import { trackMoEngageAppEvent } from 'utils/common';
import { DefaultCollectionByHandleQuery, width } from 'utils/constants';

const Concerns = ({ route, navigation }) => {
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [selectedSubCollection, setSelectedSubCollection] =
    useState<Collection>();
  const [collectionByHandleData, setSelectedCollectionByHandle] =
    useState<CollectionByHandleResponse>();
  const [collectionData, setCollectionData] =
    useState<CollectionByTypeResponseModel>();
  const [subCollections, setSubCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubCollectionLoading, setIsSubCollectionLoading] = useState(true);
  const [subCollectionCords, setSubCollectionCords] = useState([]);

  const { snackBarVisible } = useShopState();
  const shopDispatch = useShopDispatch();
  const { collectionHandleByNavigation, subCollectionHandleByNavigation } = useLocalSearchParams<any>();

  useEffect(() => {
    fetchCollectionByType();
    navigation.addListener('blur', () => {
      navigation.setParams({
        collectionHandle: null,
        subCollectionHandle: null,
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
    if (subCollectionHandleByNavigation && subCollections) {
      const filteredSubCollection = subCollections.filter(
        item => item.handle == subCollectionHandleByNavigation,
      );
      if (filteredSubCollection.length > 0) {
        setSelectedSubCollection(filteredSubCollection[0]);
      }
    }
  }, [subCollectionHandleByNavigation, route, subCollections]);

  useEffect(() => {
    if (selectedCollection) {
      getCollections(selectedCollection.handle);
    }
  }, [selectedCollection]);

  const getCollections = async (handle: string) => {
    if (selectedCollection) {
      setIsSubCollectionLoading(true);
      const collectionByHandleData = await fetchCollectionByHandle(handle);
      setSubCollections(collectionByHandleData.data.subCollections);
      setIsSubCollectionLoading(false);
    }
  };
  useEffect(() => {
    if (selectedSubCollection) {
      fetchCollectionByHandle(selectedSubCollection.handle);
    } else if (selectedSubCollection === undefined) {
      fetchCollectionByHandle(selectedCollection ? selectedCollection.handle : '');
    }
  }, [selectedSubCollection]);
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
    return collectionByHandleData;
  };
  const fetchCollectionByType = async () => {
    const collectionData = await CollectionService.getByCollectionGroup(
      'CONCERN',
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
      event: `concern_${snakeCase(item.handle)}_app`,
      values: [],
      skipGATrack: true,
    });
  };
  const trackTab = (item: Collection | undefined) => {
    const handle = item ? item.handle : 'all';
    trackMoEngageAppEvent({
      event: `concern_${snakeCase(selectedCollection?.handle)}_${snakeCase(
        handle,
      )}_app`,
      values: [],
      skipGATrack: true,
    });
  };

  if (!collectionData) {
    return null;
  }
  return (
    <View>
      <ScrollView stickyHeaderIndices={[1]}>
        <View style={{ width }}>
          <CollectionBubbles
            collections={collectionData?.data?.collections}
            handleClickOnBubble={item => {
              setSelectedCollection(item);
              setSelectedSubCollection(undefined);
              trackBubbles(item);
            }}
            selectedCollection={selectedCollection as Collection}
          />
        </View>
        <View style={{ width }}>
          <SubCollectionTags
            collections={subCollections}
            handleClickOnTab={item => {
              setSelectedSubCollection(item);
              trackTab(item);
            }}
            selectedSubCollection={selectedSubCollection as Collection}
            loading={isSubCollectionLoading}
            setSubCollectionCords={setSubCollectionCords}
            subCollectionCords={subCollectionCords}
          />
        </View>
        <ProductList
          products={collectionByHandleData?.data?.products || []}
          navigation={navigation}
          selectedCollectionName={selectedCollection?.name as string}
          selectedSubCollection={selectedSubCollection as Collection}
          isLoading={isLoading}
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

export default Concerns;
