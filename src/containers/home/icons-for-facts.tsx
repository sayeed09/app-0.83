import FastImage from '@d11/react-native-fast-image';
import { BaseView } from 'components/base/view';
import OZModal from 'components/modal';
import { darkGreen } from 'components/styles/colors';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { offersStyles } from 'styles/offers';
import { BACKED_BY_SCIENCE, CLEAN_PALNT_BASED_ICON } from 'utils/images';

const IconsForFact = () => {
  const [showModal, setShowModal] = useState(false);

  const [modalState, setModalState] = useState({ title: '', description: '' });

  const handleIconPress = ({ title, description }) => {
    setModalState({
      title,
      description,
    });
    setShowModal(true);
  };

  const ModalContent = () => (
    <>
      <View
        style={[
          commonStyles.mb0,
          commonStyles.pb4,
          commonStyles.pt8,
          commonStyles.ph16,
          commonStyles.wAuto,
        ]}
      >
        <Text style={[offersStyles.offerListTitle, commonStyles.fs14]}>
          {modalState.description}
        </Text>
      </View>
    </>
  );
  return (
    <View style={{ paddingTop: 16 }}>
      <Text
        style={{
          fontSize: 14,
          color: darkGreen,
          textAlign: 'center',
        }}
      >
        India’s Leading Clean,{' '}
        <Text style={{ fontFamily: 'Roboto-Medium', color: darkGreen }}>
          Plant Based Wellness Brand
        </Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingTop: 20,
        }}
      >
        <Pressable
          onPress={() =>
            handleIconPress({
              title: 'Clean Plant Based',
              description:
                'Staying away from preservatives, artificial sweeteners, colors, allergens - we source the most authentic ingredients from farms across the globe to ensure you get the Clean Nutrition to live an active life',
            })
          }
        >
          <BaseView
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <FastImage
              source={{uri: CLEAN_PALNT_BASED_ICON}}
              style={{ width: 44, height: 44 }}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Roboto-Regular',
                color: darkGreen,
                textAlign: 'center',
                paddingTop: 10,
              }}
            >
              Clean Plant Based
            </Text>
          </BaseView>
        </Pressable>
        <Pressable
          onPress={() => {
            handleIconPress({
              title: 'Backed By Science',
              description:
                'Trusted and credible, based on rigorous scientific research and empirical evidence.',
            });
          }}
        >
          <BaseView
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <FastImage
              source={{uri: BACKED_BY_SCIENCE}}
              style={{ width: 44, height: 44 }}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Roboto-Regular',
                color: darkGreen,
                textAlign: 'center',
                paddingTop: 10,
              }}
            >
              Backed By Science
            </Text>
          </BaseView>
        </Pressable>
      </View>
      {showModal && <OZModal
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        setModalVisible={setShowModal}
        title={modalState.title}
        transparent
        animationType="fade"
        contentContainerStyles={{ height: 'auto' }}
      >
        <ModalContent />
      </OZModal>}
    </View>
  );
};
export default IconsForFact;
