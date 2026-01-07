import { color } from '@shopify/restyle';
import CloseSvg from 'assets/images/icons/standard-icons/close_icon';
import {
  CheckBoxWrap,
  RadioAction,
  RadioCheck,
} from 'components/base/checkbox/styled';
import BodyMedium from 'components/elements/text/body-medium';
import {
  ModalHeader,
  ModalHeaderTitle,
  ModalDetails,
} from 'components/styled/common';
import { Option, Variant } from 'models/product-details/product';
import React, { useEffect } from 'react';
import {
  View,
  Pressable,
  ScrollView,
  TouchableNativeFeedback,
  Text,
} from 'react-native';
import { height } from 'utils/constants';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVariant: Variant;
  variants: Variant[];
  option: Option;
  handleVariantSelection: (variant: Variant) => void;
}

const OptionsModalContent = (props: Props) => {
  const {
    option,
    setShowModal,
    selectedVariant,
    variants,
    handleVariantSelection,
  } = props;
  const showPrice = option.name === 'Size' ? true : false;

  const getSelectedValue = () => {
    return selectedVariant[`option${option.position}`];
  };
  const getCurrentVariant = (value: string) => {
    let filteredVariant = variants.filter(
      item => item[`option${option.position}`] === value,
    );
    // filter if option2 available
    if (selectedVariant.option2) {
      filteredVariant = filteredVariant.filter(
        item =>
          item[`option${option.position === 1 ? '2' : '1'}`] ===
          selectedVariant[`option${option.position === 1 ? '2' : '1'}`],
      );
    }
    return filteredVariant.length > 0 ? filteredVariant[0] : null;
  };
  const getSortedOptionsFromVariants = () => {
    let filteredOptions = new Set<string>();
    let sortedOptions = variants
      .sort((a, b) => a.position - b.position)
      .map(item => item[`option${option.position}`]);
    sortedOptions.forEach(item => filteredOptions.add(item));
    return filteredOptions;
  };
  const getOptionLineItem = () => {
    const optionItems: any = [];
    getSortedOptionsFromVariants().forEach(item => {
      const getVariant = getCurrentVariant(item);
      if (getVariant) {
        const optionItem = (
          <View key={item} style={[{ width: '100%' }]}>
            <TouchableNativeFeedback
              onPressIn={() => {
                handleVariantSelection(getVariant);
                setShowModal(false);
              }}
            >
              <CheckBoxWrap>
                <RadioAction
                  checked={getSelectedValue() === item ? true : false}
                >
                  <RadioCheck
                    checked={getSelectedValue() === item ? true : false}
                  />
                </RadioAction>

                <View
                  style={[
                    {
                      flexDirection: 'row',
                    },
                  ]}
                >
                  <BodyMedium
                    containerStyle={{ flex: 1 }}
                    style={[
                      {
                        color: '#010101',
                        paddingLeft: 8,
                        fontSize: 14,
                      },
                      item?.length > 26 && option.name == 'Size'
                        ? { height: 40 }
                        : { height: 20 },
                    ]}
                    totalNumberOfLines={2}
                  >
                    {item}
                  </BodyMedium>
                  {showPrice && (
                    <BodyMedium
                      containerStyle={{ flex: 1 }}
                      style={{
                        color: color ? `${color}` : '#010101',
                        paddingLeft: 8,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}
                    >
                      <>
                        <Text style={{ color: '#005655' }}>
                          {' '}
                          {formatCurrencyWithSymbol(getVariant.price)}
                        </Text>
                      </>
                    </BodyMedium>
                  )}
                </View>
              </CheckBoxWrap>
            </TouchableNativeFeedback>
          </View>
        );
        optionItems.push(optionItem);
      }
    });
    return optionItems;
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#00000099' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 22,
          }}
        >
          <ModalHeader white>
            <ModalHeaderTitle>{option.name}</ModalHeaderTitle>
            <Pressable onPress={() => setShowModal(false)}>
              <CloseSvg />
            </Pressable>
          </ModalHeader>
          <ModalDetails white>
            {/* check this for ios */}
            <ScrollView style={{ maxHeight: height - 250, flexGrow: 0 }}>
              {getOptionLineItem()}
            </ScrollView>
          </ModalDetails>
        </View>
      </View>
    </>
  );
};
export default OptionsModalContent;
