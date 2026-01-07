import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { commonStyles } from '@styles/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OZFabIcon from 'assets/images/icons/OzivaFab';
import Clipboard from '@react-native-clipboard/clipboard';
import OZModal from 'components/modal';
import { offersStyles } from 'styles/offers';
import { cartService } from 'services/cart';
import { useModalsDispatch } from 'context/modals';
import { Offer } from 'models/offers';
import Header from 'components/productv2/common/header';

const ProductOffers = ({ productId, variantId, v2 }: { productId: string, variantId: string, v2?: boolean }) => {
  const [copiedCoupon, setCopiedCoupon] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerList, setOfferList] = useState<Offer[]>([]);
  const modalsDispatch = useModalsDispatch();

  const getOfferList = () => {
    const variables = {
      category: 'PRODUCT',
      productIds: [productId],
      variantIds: [variantId],
    };
    cartService.fetchOffersService(variables).then(response => {
      setOfferList(response.data);
    }).catch(err => {
      console.log("Error while fetching offers : ", err);
    })
  }

  useEffect(() => {
    if (productId && variantId) {
      getOfferList();
    }
  }, [productId, variantId]);
  const copyCode = (code: string) => {
    Clipboard.setString(code);
    setCopiedCoupon(code);
  };
  const renderOffer = ({ index, item }) => {
    return (
      <TouchableNativeFeedback
        key={item.code}
        onPress={() => {
          setSelectedOffer(item);
        }}
      >
        <View style={[offersStyles.offerGridListItem]}>
          <Text style={[offersStyles.offerListTitle, commonStyles.fw500]}>
            {item.description}
          </Text>
          <Text style={[offersStyles.offerListDtl, commonStyles.mb15]}>
            {item.validOn}
          </Text>
          <Text style={[offersStyles.offerListDtl]}>
            use code:{' '}
            <Text style={[offersStyles.offerListCode]}>{item.code}</Text>
          </Text>
          <Icon
            style={[
              offersStyles.offerArrow,
              {
                transform: [{ rotate: '90deg' }],
              },
            ]}
            name="chevron-up"
            color="#000"
            size={30}
          />

          <View style={offersStyles.DownTriangle}>
            <View style={[offersStyles.DownTriangleInner]} />
          </View>
          <View style={offersStyles.UpTriangle}>
            <View style={[offersStyles.UpTriangleInner]} />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const ModalContent = () => (
    <>
      <View style={[offersStyles.offerPopupDtls]}>
        <View
          style={[offersStyles.offerGridList, offersStyles.offerGridListPopup]}
        >
          <View
            style={[
              offersStyles.offerGridListItem,
              offersStyles.offerCopyCode,
              { width: 180 },
            ]}
          >
            <View style={[commonStyles.flexD]}>
              <OZFabIcon style={{ width: 22, height: 22 }} />
              <Text
                style={[
                  offersStyles.offerListCode,
                  commonStyles.fs16,
                  commonStyles.ml4,
                ]}
              >
                {selectedOffer?.code}
              </Text>
            </View>
            <View style={offersStyles.DownTriangle}>
              <View style={[offersStyles.DownTriangleInner]} />
            </View>
            <View style={offersStyles.UpTriangle}>
              <View style={[offersStyles.UpTriangleInner]} />
            </View>
          </View>
          <TouchableNativeFeedback
            onPress={() => {
              copyCode(selectedOffer?.code);
            }}
          >
            <Text
              style={[
                offersStyles.copyText,
                commonStyles.fs14,
                commonStyles.fw500,
              ]}
            >
              {copiedCoupon ? 'COPIED!' : 'COPY'}
            </Text>
          </TouchableNativeFeedback>
        </View>
        <View
          style={[
            offersStyles.offerListTitle,
            {
              minHeight: 10,
            },
          ]}
        >
          <Text style={[commonStyles.fs14, commonStyles.fw500]}>
            {selectedOffer?.description}
          </Text>
        </View>
        <Text
          style={[
            offersStyles.offerListDtl,
            commonStyles.mb15,
            commonStyles.fs14,
          ]}
        >
          Apply at cart
        </Text>
      </View>
      <View style={[offersStyles.offerPopFooter]}>
        <Text
          style={[
            offersStyles.offerListDtl,
            commonStyles.mb15,
            commonStyles.fs13,
            commonStyles.fs14,
            { color: '#6BBD58', fontWeight: '500' }
          ]}
        >
          {selectedOffer?.validOn}
        </Text>
      </View>
    </>
  );

  if (offerList && offerList.length > 0) {
    return (
      <>
        <View
          style={v2 ? [
            commonStyles.bgWhite,
            commonStyles.mt32,
          ] : [
            commonStyles.bgWhite,
            commonStyles.ph16,
            commonStyles.pt10,
            commonStyles.pb20,
            commonStyles.mt10,
            commonStyles.mb5,
            commonStyles.positionRelative
          ]}
        >
          <View>
            {offerList && offerList.length > 0 ? (
              <>
                {v2 ? <Header sectionHeader={`<p><strong>Offers</strong></p>`} /> :
                  <Text style={[commonStyles.h2Tag]}>Offers</Text>
                }
                <SafeAreaView style={v2 ? [offersStyles.offerGridList,
                commonStyles.ph16] : [offersStyles.offerGridList]}>
                  <FlatList
                    horizontal
                    data={offerList}
                    renderItem={item => renderOffer(item)}
                    keyExtractor={item => item.code}
                  />
                </SafeAreaView>
              </>
            ) : null}
          </View>
        {selectedOffer ? (
          <OZModal
            visible={selectedOffer !== null}
            title="Offers"
            onRequestClose={() => {
              setSelectedOffer(null);
              setCopiedCoupon('');
            }}
            setModalVisible={() => {
              setSelectedOffer(null);
              setCopiedCoupon('');
            }}
            transparent
            animationType="fade"
            contentContainerStyles={{ height: 'auto', alignItems: 'stretch' }}
          >
            <ModalContent />
          </OZModal>
        ) : null}
        </View>
      </>
    );
  } else {
    return <></>;
  }
};

export default ProductOffers;
