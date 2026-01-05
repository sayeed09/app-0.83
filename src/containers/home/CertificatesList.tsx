import WhiteCard from 'components/elements/card/white-card';
import OZModal from 'components/modal';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

import { Image } from 'expo-image';
import { homeStyles } from './stylesHome';

const CertificatesList = ({ list }) => {
  const [showModal, setShowModal] = useState(false);

  const [modalContent, setModalContent] = useState({
    title: '',
    description: '',
    image: '',
  });

  const setModalData = (title: string, description: string, image: string) => {
    setModalContent({
      title,
      description,
      image,
    });
    setShowModal(true);
  };
  return (
    <>
      <WhiteCard noBorderRadius>
        {showModal ? (
          <OZModal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            setModalVisible={setShowModal}
            title={modalContent.title}
            transparent
            animationType="fade"
            contentContainerStyles={{ height: 'auto' }}
          >
            <View
              style={{
                marginBottom: 16,
              }}
            >
              {modalContent?.image ? (
                <View>
                  <Image
                    source={{
                      uri: modalContent.image,
                    }}
                    style={{
                      width: '95%',
                      aspectRatio: 8 / 10,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              ) : null}
              <Text style={[commonStyles.pv8, commonStyles.ph16]}>
                {modalContent.description}
              </Text>
            </View>
          </OZModal>
        ) : null}
        <View>
          <Text
            style={[
              commonStyles.head18,
              commonStyles.mb8,
              commonStyles.textCenter,
              commonStyles.darkGreenText,
            ]}
          >
            #HarTarahSeBetter
          </Text>
          <Text
            style={[
              homeStyles.subHeading,
              commonStyles.textCenter,
              commonStyles.mb16,
              commonStyles.pb8,
            ]}
          >
            India’s #1 Clean, Plant-Based Nutrition brand with Scientifically &
            Clinically-backed health solutions. Certified Clean & Vegan.
          </Text>
        </View>

        <View style={[homeStyles.HarTarahSeBetterSection, commonStyles.mt16]}>
          {list.length > 0 &&
            list.map((certificate, index) => (
              <View
                style={
                  index % 2 === 0
                    ? [homeStyles.HarTarahSeBetterSectionCards]
                    : [
                      homeStyles.HarTarahSeBetterSectionCards,
                      homeStyles.HTSBMiddleCard,
                    ]
                }
                key={certificate.title}
              >
                <Pressable
                  onPress={() =>
                    setModalData(
                      certificate.title,
                      certificate.description,
                      certificate.image,
                    )
                  }
                >
                  <View>
                    <Image
                      source={{
                        uri: certificate.image,
                      }}
                      style={{ width: '100%', aspectRatio: 8 / 10 }}
                    />
                  </View>
                  <View style={[commonStyles.mt8]}>
                    <Text
                      style={[
                        homeStyles.HarTarahSeBetterSectionText,
                        commonStyles.textCenter,
                      ]}
                    >
                      {certificate.title}
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))}
        </View>
      </WhiteCard>
    </>
  );
};
export default CertificatesList;
