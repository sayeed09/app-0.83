import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { AxiosError } from 'axios';
import { Box, SafeBottomSpace, Text } from 'components/base/foundation';
import Loader from 'components/elements/loader/loader';
import PromoCode from 'components/offers/promo-code';
import { FullPageErrorFallback } from 'components/shared/error';
import { Offer } from 'models/offers';
import { Theme } from 'styles/theme';
import PrimaryButton from 'components/elements/button/primary-Button';
import { width } from 'utils/constants';
import { commonStyles } from 'styles/common';
import Clipboard from '@react-native-clipboard/clipboard';
import { cartService } from 'services/cart';
import { OffersModal } from 'models/shop/cart';
import { setLoginModal } from 'actions/modals';
import { useModalsDispatch } from 'context/modals';
import useLogin from 'hooks/login';

const keyExtractor = (item: Offer) => item?.id;

const UpperArrow = () => (
  <>
    <View
      style={{
        width: 4,
        height: 4,
        position: 'absolute',
        // top: -10,
        top: -1,
        left: 80,
        borderLeftWidth: 7,
        borderLeftColor: 'transparent',
        borderRightWidth: 7,
        borderRightColor: 'transparent',
        borderTopWidth: 7,
        borderTopColor: '#6BBD58',
        borderStyle: 'dashed',
      }}
    />
    <View
      style={{
        width: 4,
        height: 4,
        position: 'absolute',
        top: -1,
        left: 81,
        borderLeftWidth: 6,
        borderLeftColor: 'transparent',
        borderRightWidth: 6,
        borderRightColor: 'transparent',
        borderTopWidth: 6,
        borderTopColor: '#FFFFFF',
        borderStyle: 'dashed',
      }}
    />
  </>
);
const DownArrow = () => (
  <>
    <View
      style={{
        width: 4,
        height: 4,
        position: 'absolute',
        bottom: -1,
        left: 80,
        borderLeftWidth: 7,
        borderLeftColor: 'transparent',
        borderRightWidth: 7,
        borderRightColor: 'transparent',
        borderBottomWidth: 7,
        borderBottomColor: '#6BBD58',
        borderStyle: 'dashed',
      }}
    />
    <View
      style={{
        width: 4,
        height: 4,
        position: 'absolute',
        bottom: -1,
        left: 81,
        borderLeftWidth: 6,
        borderLeftColor: 'transparent',
        borderRightWidth: 6,
        borderRightColor: 'transparent',
        borderBottomWidth: 6,
        borderBottomColor: '#FFFFFF',
        borderStyle: 'dashed',
      }}
    />
  </>
);
const Offers = () => {
  const { colors } = useTheme<Theme>();
  const [copiedCoupon, setCopiedCoupon] = useState('');
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [offerList, setOfferList] = useState<Offer[]>();
  const modalsDispatch = useModalsDispatch();

  const getOfferList = () => {
    setLoading(true);
    const variables = {
      category: 'DEALS',
      productIds: [],
      variantIds: [],
    };
    cartService.fetchOffersService(variables).then(response => {
      setOfferList(response.data);
      setLoading(false);
    }).catch(err => {
      console.log("Error while fetching offers : ", err);
      setLoading(false);
      setError(err);
    })
  }

  useEffect(() => {
    getOfferList();
  }, []);

  const renderOffer: ListRenderItem<Offer> = ({ item }) => {
    const copyCode = (code: string) => {
      Clipboard.setString(code);
      setCopiedCoupon(code);
    };
    return (
      <>
        <View
          style={{
            margin: 5,
            borderColor: '#6BBD58',
            borderStyle: 'dashed',
            borderWidth: 1,
            padding: 5,
            borderRadius: 1,
            marginVertical: 8,
            backgroundColor: '#F1FFEE',
            position: 'relative',
          }}
        >
          <UpperArrow />
          <DownArrow />

          <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 6 }}>
            {item.description}
          </Text>
          <Text style={{ fontSize: 12 }}>Apply at cart</Text>
          {item.validOn ? (
            <Text style={{ marginTop: 8, fontSize: 13, color: '#7E7E7E' }}>
              {item.validOn}
            </Text>
          ) : null}
          <View
            style={{
              borderBottomColor: '#E0E0E0',
              borderBottomWidth: 1.5,
              marginTop: 16,
            }}
          />
          <View
            style={{
              marginVertical: 16,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <PromoCode code={item.code} />
            <PrimaryButton
              style={[commonStyles.fs14,
                {
                  width: width * 0.5 - 20,
                  marginRight: 2,
                  height: 35,
                  marginTop: 8,
                  justifyContent: 'center',
                }
              ]}
              accentColor="#FF6F00"
              title={`${copiedCoupon === item.code ? 'COPIED!' : 'COPY'}`}
              onAction={() => {
                copyCode(item.code);
              }}
              paddingVertical={4}
            />
          </View>
        </View>
      </>
    );
  };

  if (!offerList && loading) {
    return <Loader />;
  }
  if (error) {
    return <FullPageErrorFallback error={error as AxiosError} />;
  }
  const offers = offerList ?? [];
  return (
    <Box flex={1} backgroundColor="levelOneBg" paddingTop={3}>
      <FlatList
        refreshing={loading}
        onRefresh={getOfferList}
        contentContainerStyle={{
          backgroundColor: colors.levelOneBg,
        }}
        data={offers}
        renderItem={renderOffer}
        keyExtractor={keyExtractor}
        ListFooterComponent={SafeBottomSpace}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default Offers;
