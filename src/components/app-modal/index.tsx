import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';

import BaseText from '@components/base/text';
import PrimaryButton from '@components/elements/button/primary-Button';
import SecondaryButton from '@components/elements/button/secondary-button';
import {
  ModalDetails,
  ModalHeader,
  ModalHeaderTitle,
} from '@components/styled/common';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    minHeight: '30%',
    flex: 1,
  },
  viewBottom: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
  viewTop: {
    justifyContent: 'flex-start',
    margin: 0,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

const AppModal = ({ ...props }) => {
  const animateFrom = props.animateFrom || 'bottom';
  const modalStyle = props.style || {};
  const {
    modalVisible,
    modalContent,
    component,
    hideModal,
    onBackButtonPress,
  } = props;
  const [modalMarginBottom, setModalMarginBottom] = useState(0);
  const keyboardDidShow = (e: KeyboardEvent) => {
    setModalMarginBottom(e.endCoordinates.height);
  };

  const keyboardDidHide = () => {
    setModalMarginBottom(0);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      // Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      // Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const renderCancelButton = (renderVertically = false) => {
    const {
      cancelText,
      onCancel = () => {},
      underlinedActionButton = false,
    } = modalContent;

    if (cancelText) {
      if (underlinedActionButton) {
        return (
          <SecondaryButton
            title={cancelText || 'Cancel'}
            onAction={() => {
              hideModal();
              onCancel();
            }}
          />
        );
      }

      const verticalCancelStyle = { width: '100%', marginTop: 10 };
      const horizontalCancelStyle = { flex: 1, marginTop: 20, marginRight: 2 };

      return (
        <SecondaryButton
          title={cancelText || 'Cancel'}
          onAction={() => {
            hideModal();
            onCancel();
          }}
          style={renderVertically ? verticalCancelStyle : horizontalCancelStyle}
        />
      );
    }
    return <></>;
  };

  const renderButtons = () => {
    const {
      cancelText,
      // onCancel = () => {},
      okText,
      noHideOnOk,
      onOk = () => {},
      // underlinedActionButton = false,
      // alignButtonsVertically = false,
    } = modalContent;

    const verticalCancelStyle = { width: '100%', marginTop: 20 };
    const horizontalCancelStyle = { flex: 1, marginTop: 20, marginLeft: 2 };

    return (
      <View style={{ width: '100%', flexDirection: 'row' }}>
        {renderCancelButton()}
        <PrimaryButton
          style={cancelText ? horizontalCancelStyle : verticalCancelStyle}
          title={okText || 'OK'}
          onAction={() => {
            if (!noHideOnOk) hideModal();
            onOk();
          }}
        />
      </View>
    );
  };

  const renderButtonsVertically = () => {
    const {
      cancelText,
      // onCancel = () => {},
      okText,
      noHideOnOk,
      onOk = () => {},
      // underlinedActionButton = false,
      alignButtonsVertically = true,
    } = modalContent;
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PrimaryButton
          style={{
            width: cancelText ? '100%' : '100%',
            marginTop: 20,
          }}
          title={okText || 'OK'}
          onAction={() => {
            if (!noHideOnOk) hideModal();
            onOk();
          }}
        />
        {renderCancelButton(alignButtonsVertically)}
      </View>
    );
  };

  const renderModalContent = () => {
    const { header, body, alignButtonsVertically } = modalContent;
    return (
      <View>
        <ModalHeader>
          <ModalHeaderTitle>{header}</ModalHeaderTitle>
        </ModalHeader>
        <ModalDetails>
          <BaseText
            color="#737373"
            fWeight="300"
            align="center"
            mt="20px"
            style={{ lineHeight: 25 }}
          >
            {body}
          </BaseText>
          {alignButtonsVertically ? renderButtonsVertically() : renderButtons()}
        </ModalDetails>
      </View>
    );
  };

  const renderFromTop = () => (
    <RNModal
      isVisible={modalVisible}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      style={styles.viewTop}
      onBackButtonPress={() => onBackButtonPress()}
    >
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'flex-end',
          minHeight: '20%',
          maxHeight: '90%',
        }}
      >
        {modalContent ? renderModalContent() : component && component()}
      </View>
    </RNModal>
  );

  const renderFromBottom = () => (
    <RNModal
      isVisible={modalVisible}
      style={styles.viewBottom}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      backdropTransitionOutTiming={100}
      onBackButtonPress={() => onBackButtonPress()}
    >
      <View
        style={{
          backgroundColor: 'white',
          minHeight: '20%',
          maxHeight: '100%',
          marginBottom: modalMarginBottom,
        }}
      >
        {modalContent ? renderModalContent() : component && component()}
      </View>
    </RNModal>
  );

  const renderInCenter = () => (
    <RNModal
      isVisible={modalVisible}
      style={styles.centeredView}
      onBackButtonPress={() => onBackButtonPress()}
    >
      <View
        style={[
          {
            backgroundColor: 'white',
            minHeight: '20%',
            maxHeight: '100%',
            marginBottom: modalMarginBottom,
          },
          modalStyle,
        ]}
      >
        {modalContent ? renderModalContent() : component && component()}
      </View>
    </RNModal>
  );

  const render = () => (
    <View style={styles.container}>
      {animateFrom === 'top' && renderFromTop()}
      {animateFrom === 'bottom' && renderFromBottom()}
      {animateFrom === 'center' && renderInCenter()}
    </View>
  );

  return render();
};

export default AppModal;
