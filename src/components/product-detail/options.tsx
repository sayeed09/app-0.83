import { ViewWrapper } from 'components/styled/common';
import { IImage, IOption, IVariant } from 'models/product-details/product';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { tagStyle } from 'styles/tags';
import OptionItem from './option-item';

interface Props {
  options: IOption[];
  selectedVariant: IVariant;
  variants: IVariant[];
  handleVariantSelection: (variant: IVariant) => void;
  variantImages: IImage[];
  hideSubscriptionText?: boolean;
}
const ProductOptions = (props: Props) => {
  const {
    options,
    variants,
    selectedVariant,
    handleVariantSelection,
    variantImages,
    hideSubscriptionText
  } = props;

  return (
    <>
      {options
        .sort((a, b) => a.position - b.position)
        .map((option, index) => {
          if (
            option.values.filter(item => item != 'Default Title').length > 0
          ) {
            return (
              <View
                key={index}
                style={[
                  commonStyles.ph16,
                  commonStyles.bgWhite,
                  commonStyles.mt4,
                  commonStyles.pt16,
                  {
                    borderBottomColor: '#E0E0E0',
                    borderBottomWidth: 1
                  }
                ]}
              >
                <ViewWrapper
                  style={[commonStyles.flexColumn, commonStyles.alignStart]}
                >
                  <View style={[commonStyles.flexRow]}>
                    <Text style={[commonStyles.fs14]}>{option.name}: </Text>
                    <Text style={[commonStyles.fw500, commonStyles.fs14]}>
                      {selectedVariant[`option${option.position}`]}
                    </Text>
                  </View>

                  <ScrollView
                    contentContainerStyle={[
                      commonStyles.flexD,
                      commonStyles.mt16,
                      tagStyle.tagsList,
                    ]}
                    horizontal
                  >
                    {option.values
                      .filter(item => item !== 'Default Title')
                      .map(item => {
                        return (
                          <OptionItem
                            option={item}
                            position={option.position}
                            showWithImage={
                              index == options.length - 1 ? true : false
                            }
                            key={item}
                            selectedVariant={selectedVariant}
                            variants={variants}
                            images={variantImages}
                            handleVariantSelection={handleVariantSelection}
                            options={options}
                          />
                        );
                      })}
                  </ScrollView>
                </ViewWrapper>
                {index == options.length - 1 ?
                  <View
                    style={[
                      commonStyles.pb8,
                      commonStyles.bgWhite,
                    ]}
                  >
                    <Text style={[commonStyles.fs12, commonStyles.grayColor]}>
                      *MRP Inclusive of all taxes
                    </Text>
                  </View> : null}
              </View>
            );
          } else {
            return <></>;
          }
        })}
    </>
  );
};
export default ProductOptions;
