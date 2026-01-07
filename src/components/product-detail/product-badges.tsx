import React, { useState } from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { commonStyles } from '@styles/common';
import { ViewWrapper } from 'components/styled/common';
import OZModal from 'components/modal';
import { offersStyles } from 'styles/offers';
import { ProductBadgesInfo } from 'utils/constants';

const ProductBadges = props => {
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
  }>();

  const ModalContent = () => (
    <>
      <View
        style={[
          offersStyles.offerPopupDtls,
          commonStyles.mb0,
          commonStyles.pb4,
          commonStyles.pt8,
        ]}
      >
        <Text style={[offersStyles.offerListTitle, commonStyles.fs14]}>
          {modalContent?.description}
        </Text>
        {modalContent?.title == ProductBadgesInfo.PAYMENT.title ? (
          <Text
            style={[
              offersStyles.offerListTitle,
              commonStyles.fs14,
              commonStyles.mb0,
            ]}
          >
            100% Secure | 100% Easy
          </Text>
        ) : null}
      </View>
    </>
  );

  return (
    <>
      <View
        style={[
          commonStyles.borderTop,
          commonStyles.pad8,
          commonStyles.bgWhite,
        ]}
      >
        <ViewWrapper style={[commonStyles.flexColumn, commonStyles.alignStart]}>
          <View
            style={[
              commonStyles.flexD,
              commonStyles.mt16,
              commonStyles.alignCenter,
            ]}
          >
            {Object.keys(ProductBadgesInfo).map((key, index) => {
              let Icon = ProductBadgesInfo[key].icon;
            return (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() => setModalContent(ProductBadgesInfo[key])}
                >
                  <View
                    key={key}
                    style={[commonStyles.alignCenter, commonStyles.flex]}
                  >
                    <View
                      style={[
                        commonStyles.mb8,
                        commonStyles.pad4,
                        commonStyles.borderAll,
                        {
                          width: 40,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      ]}
                    >
                      <Icon />
                    </View>
                    <Text style={[commonStyles.fs12, commonStyles.textCenter]}>
                      {ProductBadgesInfo[key].title
                        .split(' ')
                        .splice(
                          0,
                          ProductBadgesInfo[key].title.split(' ').length - 1,
                        )
                        .join(' ')}
                    </Text>
                    <Text style={[commonStyles.fs12, commonStyles.textCenter]}>
                      {ProductBadgesInfo[key].title
                        .split(' ')
                        .splice(
                          ProductBadgesInfo[key].title.split(' ').length - 1,
                        )
                        .join()}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </View>
        </ViewWrapper>
      </View>
      {modalContent ? (
        <OZModal
          visible={modalContent != null ? true : false}
          title={modalContent.title}
          onRequestClose={() => {
            setModalContent(undefined);
          }}
          setModalVisible={() => {
            setModalContent(undefined);
          }}
          transparent
          animationType="fade"
          contentContainerStyles={{ height: 'auto', alignItems: 'stretch' }}
        >
          <ModalContent />
        </OZModal>
      ) : null}
    </>
  );
};

export default ProductBadges;
