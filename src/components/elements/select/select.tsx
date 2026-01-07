import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { isEmpty } from 'lodash';
import { StyledButton } from '@components/base/button/styled';
import { width } from '@utils/constants';
import { IOption, IVariant } from 'models/product-details/product';
import OptionsModalContent from 'components/product-detail/options-modal';

export const SelectInputStyles = StyleSheet.create({
  iconButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderColor: '#707070',
    borderWidth: 1,
  },
});
interface Props {
  selectedVariant: IVariant;
  variants: IVariant[];
  handleVariantSelection: (variant: IVariant) => void;
  option: IOption;
}
const SelectInput = (props: Props) => {
  const { selectedVariant, variants, option, handleVariantSelection } = props;
  const [showModal, setShowModal] = useState(false);

  const renderModal = () => (
    <Modal
      animationType="fade"
      visible={showModal}
      transparent
      style={{ width }}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <OptionsModalContent
        option={option}
        setShowModal={setShowModal}
        selectedVariant={selectedVariant}
        variants={variants}
        handleVariantSelection={handleVariantSelection}
      />
    </Modal>
  );
  const getSelectedValue = () => {
    return selectedVariant[`option${option.position}`];
  };
  // hide default title
  if (option.values.length === 1 && option.values[0] === 'Default Title') {
    return null;
  }
  return (
    <>
      {!isEmpty(option.values) && (
        <StyledButton onPress={() => setShowModal(true)}>
          <View
            style={[
              SelectInputStyles.iconButtonStyle,
              { borderColor: '#707070' },
            ]}
          >
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: '#7E7E7E', marginBottom: 4, fontSize: 12 }}>
                {option.name}
              </Text>

              <View>
                <Text
                  style={[{ color: '#000' }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {getSelectedValue()}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 24, justifyContent: 'flex-end' }}>
              {showModal ? (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={14}
                  color="#7E7E7E"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={14}
                  color="#7E7E7E"
                />
              )}
            </View>
          </View>
        </StyledButton>
      )}
      {renderModal()}
    </>
  );
};

export default SelectInput;
