/* eslint-disable import/no-cycle */
import SliderSkeleton from '@containers/shop/products-slider-skeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLinkTo } from '@react-navigation/native';
import { setSnackbarVisible } from 'actions/shop';
import SuccessMessageIconComponent from 'assets/images/icons/standard-icons/success-message-tick';
import { FlatListSlider } from 'components/shared/flatlist-slider/flatlist-slider';
import ProductSkeleton from 'containers/shop/products-skeleton';
import { useShopDispatch, useShopState } from 'context/shop';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, View } from 'react-native';
import ReactMoE from 'react-native-moengage';
import { Snackbar } from 'react-native-paper';

import { initCart } from '@actions/cart';
import { loginSuccessful } from '@actions/modals';
import { setRecentNotifications } from '@actions/notification';
import { BaseView } from '@components/base/view';
import WhiteCard from '@components/elements/card/white-card';
import { useCartDispatch, useCartState } from '@context/cart/CartContext';
import { initialState } from '@context/cart/CartReducer';
import { useModalsDispatch } from '@context/modals';
import {
  useNotificationDispatch,
  useNotificationState,
} from '@context/notifications';
import { CartState } from '@models/shop/cart';
import { trackMoEngageAppEvent } from '@utils/common';
import { width } from '@utils/constants';
import { Text } from 'react-native';

import crashlytics from '@react-native-firebase/crashlytics';
import { filterBannerImagesHomeService } from 'services/home';
import { commonStyles } from 'styles/common';
import CategoriesThumbnails from './category-thumbnails';
import CertificatesList from './CertificatesList';
import HomeCleanProtein from './clean-protein';
import IconsForFact from './icons-for-facts';
import InSpotLight from './spotlight';

const HomePage = ({ navigation }) => {
  const cartDispatch = useCartDispatch();
  const { cartItems } = useCartState();
  const modalsDispatch = useModalsDispatch();
  const mounted = useRef(false);
  const flatListRef = useRef<FlatList>(null);
  const { trackingTransparency } = useNotificationState();
  const linkTo = useLinkTo();
  const [fetchBannersHome, setFetchBannersHome] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchBannerImageHome = () => {
    setLoading(true);
    filterBannerImagesHomeService().then(response => {
      setFetchBannersHome(response);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
    })
  }
  const handleDeeplinks = useCallback(
    async (url, title) => {
      if (url.includes('http')) {
        // Linking.openURL(url);
        crashlytics().log(`Opening URL in webview : ${JSON.stringify({ url, title })}`);
        navigation.navigate('BannerDeepLinksView', { uri: url, title });
      } else {
        const str = url.split('//');
        linkTo(`/${str[str.length - 1]}`);
      }
    },
    [linkTo, navigation],
  );
  // MoEngage Events
  const notificationDispatch = useNotificationDispatch();

  navigation.addListener('focus', () => {
    ReactMoE.setEventListener('pushClicked', async notificationPayload => {
      const fetchNotificationState = await AsyncStorage.getItem(
        'notifications',
      );
      const initialStateLazily = fetchNotificationState
        ? JSON.parse(fetchNotificationState)
        : [];
      const notifications =
        (await initialStateLazily?.recentNotifications) || [];
      notifications.push({
        ...notificationPayload?.payload,
        recievedAt: new Date(),
      });
      notificationDispatch(setRecentNotifications(notifications));
    });
  });

  const fetchRecentNotifications = async () => {
    const fetchNotificationState = await AsyncStorage.getItem('notifications');
    const initialStateLazily = fetchNotificationState
      ? JSON.parse(fetchNotificationState)
      : [];
    notificationDispatch(
      setRecentNotifications(initialStateLazily?.recentNotifications),
    );
  };

  const fetchCartItems = async () => {
    const fetchTryCartState = await AsyncStorage.getItem('cart');
    const initialStateLazily: CartState = fetchTryCartState
      ? JSON.parse(fetchTryCartState)
      : initialState;
    cartDispatch(initCart(initialStateLazily));
  };

  const fetchModalDetails = async () => {
    crashlytics().log("Fetching modal details...");
    const fetchModalState = await AsyncStorage.getItem('modals');
    const initialStateLazily = fetchModalState
      ? JSON.parse(fetchModalState)
      : undefined;
    modalsDispatch(loginSuccessful(initialStateLazily?.isLoginSuccessful));
    trackMoEngageAppEvent({
      event: `login_status_app`,
      values: [
        {
          eventAttribute: 'login_status',
          value: initialStateLazily?.isLoginSuccessful,
        },
      ],
      trackingTransparency,
    });
  };

  useEffect(() => {
    if (fetchBannersHome?.banners)
      try {
        mounted.current = true;
        fetchModalDetails();
        fetchCartItems();
        fetchRecentNotifications();
        trackMoEngageAppEvent({
          event: `home_screen_viewed_app`,
          values: [],
          trackingTransparency,
        });
      } catch (error) {
        console.log('error', 'error in cart init');
      }
    return () => {
      mounted.current = false;
    };
  }, [fetchBannersHome])

  type CollectionSections = {
    title: string;
    loaded: boolean;
  };

  const [sectionLoaded, setSectionLoaded] = useState<CollectionSections[]>();

  useEffect(() => {
    const sections = fetchBannersHome?.sections.map(item => ({
      title: item.title,
      loaded: false,
    }));
    setSectionLoaded(sections);
  }, [fetchBannersHome?.sections, setSectionLoaded]);

  useEffect(() => {
    crashlytics().log(`Home page loaded`);
    fetchBannerImageHome();
  }, []);

  const { snackBarVisible } = useShopState();
  const shopDispatch = useShopDispatch();

  const RenderBanners = props => {
    const { item, index } = props;
    return (
      <BaseView
        key={item.title + item.image}
        style={{ width, aspectRatio: 1.5 / 1 }}
      >
        <Pressable
          onPress={() => {
            trackMoEngageAppEvent({
              event: `carousel_${index + 1}_clicked_app`,
              values: [
                {
                  eventAttribute: 'item_name',
                  value: item.title,
                },
                { eventAttribute: 'url', value: item?.link },
              ],
              trackingTransparency: true,
            });
            handleDeeplinks(item?.link, item?.title);
          }}
        >
          <Image
            source={{ uri: item.image, }}
            style={{
              flex: 1,
              width,
              aspectRatio: 1.5 / 1,
            }}
          />
        </Pressable>
      </BaseView>
    );
  };

  const headerComponent = () => (
    <>
      {fetchBannersHome && (
        <>
          <FlatListSlider
            data={fetchBannersHome?.banners || []}
            width={width}
            timer={5000}
            component={<RenderBanners />}
            indicatorActiveWidth={20}
            indicatorActiveColor="#C3D3C3"
            autoscroll
            indicatorCount={fetchBannersHome?.banners?.length || 0}
          />
          <IconsForFact />
        </>
      )}
      {/* START CATEGORIES THUMBNAILS */}
      {fetchBannersHome && (
        <CategoriesThumbnails
          navigation={navigation}
          spotlightCategoryList={fetchBannersHome?.spotlightCategoryList}
        />
      )}
      {/* END CATEGORIES THUMBNAILS */}
      {/*  */}
    </>
  )

  const footerComponent = () => {
    const [inNewsId, setInNewsId] = useState(0);
    return (fetchBannersHome ? (
      <>
        {/* START CLEAN PROTEINS */}
        <HomeCleanProtein
          cleanProteinList={fetchBannersHome?.cleanProteinList}
          navigation={navigation}
        />
        {/* END CLEAN PROTEINS */}
        <CertificatesList list={fetchBannersHome?.certificateList} />
        {/* START LOVE BY MILIONS */}
        {/* <WhiteCard noBorderRadius>
          <Text
            style={[
              commonStyles.head18,
              commonStyles.mb16,
              commonStyles.textCenter,
            ]}
          >
            Loved By Millions
          </Text>

          {fetchBannersHome && fetchBannersHome?.lbt?.content && (
            <FlatList
              horizontal
              data={fetchBannersHome?.lbt?.content}
              keyExtractor={item => item.youtubeVideoId}
              renderItem={({ item }) => (
                <View
                  key={item?.customerName + item?.image}
                  style={{
                    justifyContent: 'space-between',
                    marginRight: 16,
                    width: 250,
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <YoutubePlayer
                    height={140}
                    width={250}
                    videoId={item.youtubeVideoId}
                    webViewStyle={{ opacity: 0.99 }}
                  />
                  <View
                    style={[
                      commonStyles.pv16,
                      commonStyles.pr16,
                      commonStyles.bgLightGray,
                      commonStyles.flexRow,
                      { width: '100%' },
                    ]}
                  >
                    <View
                      style={[
                        commonStyles.bgBlack,
                        commonStyles.mh8,
                        { width: 5 },
                      ]}
                    />
                    <View style={[commonStyles.pr16]}>
                      <Text
                        style={[commonStyles.fwBold, commonStyles.fs12]}
                      >
                        {item.review}
                      </Text>
                      <Text style={[commonStyles.mt8, commonStyles.fs12]}>
                        {item.customerName}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </WhiteCard> */}
        {/* END LOVE BY MILLIONS */}
        <WhiteCard noBorderRadius>
          <Text
            style={[
              commonStyles.head18,
              commonStyles.mb16,
              commonStyles.textCenter,
            ]}
          >
            Discover Now
          </Text>
        
        </WhiteCard>
      </>
    ) : null);
  }

  const renderNewsSlide = ({ item }) => (
    <View style={{ width }} key={item?.id}>
      <Text
        style={{
          fontFamily: 'Roboto-Regular',
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {item?.description}
      </Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <InSpotLight
      cartItems={cartItems}
      cartDispatch={cartDispatch}
      navigation={navigation}
      data={item}
      limit={6}
      sectionLoaded={sectionLoaded}
      setSectionLoaded={setSectionLoaded}
    />
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <WhiteCard noBorderRadius noPadding>
          {loading ? (
            <>
              <SliderSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : (
            <>
              <FlatList
                data={fetchBannersHome?.sections}
                renderItem={renderItem}
                keyExtractor={item => item.handle}
                ListHeaderComponent={headerComponent}
                ListFooterComponent={footerComponent}
                removeClippedSubviews={true}
                initialNumToRender={1}
              />
            </>
          )}
        </WhiteCard>
      </SafeAreaView>
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
    </>
  );
};

export default React.memo(HomePage);
