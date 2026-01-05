import crashlytics from '@react-native-firebase/crashlytics';
import { ViewWrapper } from 'components/styled/common';
import { Image } from 'expo-image';
import { IImage, IOption, IVariant } from 'models/product-details/product';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles } from 'styles/common';
import { ProductOptionItemStyle } from 'styles/productv2';
import { smlProdCardStyle } from 'styles/small-product-card';
import { tagStyle } from 'styles/tags';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import {
  resizeImageForDevice,
} from 'utils/image-utils';
import ProductTag from './product-tag';

interface IProps {
  option: string;
  position: number;
  showWithImage: boolean;
  selectedVariant: IVariant;
  variants: IVariant[];
  images: IImage[];
  handleVariantSelection: (variant: IVariant) => void;
  options: IOption[];
}
const OptionItem = (props: IProps) => {
  const {
    option,
    position,
    showWithImage,
    variants,
    selectedVariant,
    images,
    handleVariantSelection,
    options,
  } = props;
  const getVariantWRTSelection = () => {
    let allVariants = variants;
    let currentSelection: IVariant[] = [];
    if (options.length === 1) {
      currentSelection = allVariants.filter(item => {
        return item.option1 == option;
      });
    } else {
      let option1 = position == 1 ? option : selectedVariant.option1;
      let option2 = position == 2 ? option : selectedVariant.option2;
      currentSelection = allVariants.filter(item => {
        return item.option1 == option1 && item.option2 == option2;
      });
    }
    return currentSelection.length > 0 ? currentSelection[0] : null;
  };
  const getCurrentImg = () => {
    const variant = getVariantWRTSelection();
    const image = images.filter(item => item.id == variant?.imageId);
    return image.length > 0 ? image[0] : images[0];
  };

  const renderOptionWithImg = () => {
    const showSave = Number(getVariantWRTSelection()?.compareAtPrice) -
      Number(getVariantWRTSelection()?.price) >
      0 ? true : false;
    return (
      <View>
        <ProductTag attractor={getVariantWRTSelection()?.attractor || ""} />
        <View
          style={[
            commonStyles.mr8,
            smlProdCardStyle.smallProductCard,
            selectedVariant.id === getVariantWRTSelection()?.id
              ? smlProdCardStyle.smallProductCardActive
              : {},
            { minHeight: 311 }
          ]}
        >

          <View
            style={[
              commonStyles.pad8,
              commonStyles.flexColumn,
              commonStyles.alignStart,
              commonStyles.bgWhite,
            ]}
          >
            <Image
              source={{
                uri: resizeImageForDevice(getCurrentImg().src, 200),
              }}
              style={{ width: 114, height: 114 }}
            />
          </View>
          {getVariantWRTSelection()?.consumptionSpan ?
            <Text style={ProductOptionItemStyle.consumptionText}>{getVariantWRTSelection()?.consumptionSpan} {getVariantWRTSelection()?.consumptionSpanType}</Text>
            : null
          }
          <ViewWrapper
            style={[
              commonStyles.flexColumn,
              commonStyles.alignStart,
              commonStyles.pad8,
            ]}
          >
            <View style={[smlProdCardStyle.titleProduct]}>
              <Text style={[commonStyles.fw500, commonStyles.fs14]}>
                {option}
              </Text>
            </View>
            {getVariantWRTSelection()?.subHeader ?
              <Text style={ProductOptionItemStyle.subHeader}>{getVariantWRTSelection()?.subHeader}</Text>
              : null
            }
            <View style={[commonStyles.flexD, commonStyles.mt16]}>
              <Text style={[commonStyles.grayColor, commonStyles.fs12]}>
                MRP:
              </Text>
              {showSave ? (
                <Text
                  style={[
                    commonStyles.grayColor,
                    commonStyles.strikeText,
                    commonStyles.mh2,
                    commonStyles.fs12,
                  ]}
                  numberOfLines={1}
                >
                  {formatCurrencyWithSymbol(
                    Number(getVariantWRTSelection()?.compareAtPrice),
                  )}
                </Text>
              ) : <Text
                style={[commonStyles.fs14, commonStyles.fw500, commonStyles.mt4]}
                numberOfLines={1}
              >
                {formatCurrencyWithSymbol(
                  Number(getVariantWRTSelection()?.price),
                )}
              </Text>}
            </View>
            {showSave ?
              <Text
                style={[commonStyles.fs14, commonStyles.fw500, commonStyles.mt4]}
                numberOfLines={1}
              ><Text style={[commonStyles.fs12, commonStyles.fw500]}>
                  Now {" "}
                </Text>
                {formatCurrencyWithSymbol(
                  Number(getVariantWRTSelection()?.price),
                )}
              </Text> : null}
          </ViewWrapper>
          {showSave ?
            < LinearGradient
              colors={['#D9FDD1', '#FFF']}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={ProductOptionItemStyle.saveText}
            >
              <Image
                style={{ width: 20, height: 20, marginRight: 2 }}
                source={{
                  uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/PriceTag_icon_4084b690-627e-43f7-8412-b3fd8cdbade4.png?v=1747824743',
                }}
              />
              <Text style={{
                color: '#006E5A',
                fontSize: 12,
                fontWeight: 500,

              }}>Save {formatCurrencyWithSymbol(
                Number(getVariantWRTSelection()?.compareAtPrice) -
                Number(getVariantWRTSelection()?.price),
              )} today!</Text>
            </LinearGradient> : null}

        </View>

      </View >
    );
  };
  const renderOptionWithoutImg = () => {
    return (
      <View
        style={[
          commonStyles.mr8,
          tagStyle.tags,
          selectedVariant.id === getVariantWRTSelection()?.id
            ? smlProdCardStyle.smallProductCardActive
            : {},
        ]}
      >
        <Text style={[commonStyles.fw500, commonStyles.fs14]}>{option}</Text>
      </View>
    );
  };

  if (!getVariantWRTSelection()) {
    return null;
  }
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          crashlytics().log(`selected variant : ${JSON.stringify(getVariantWRTSelection())}`);
          handleVariantSelection(getVariantWRTSelection() as IVariant);
        }}
      >
        {showWithImage ? renderOptionWithImg() : renderOptionWithoutImg()}
      </TouchableOpacity>
    </>
  );
};
export default OptionItem;
