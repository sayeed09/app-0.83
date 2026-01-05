import React from 'react';
import {
  StyleProp,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';

import BodyMedium from '@components/elements/text/body-medium';
import InputSmall from '@components/elements/text/input-small';
import { Color } from '@components/styles/colors';
import { Whitespace } from '@components/styles/view';
import { AnswerOption } from '@components/types/common';
import { getPercentageValue } from '@utils/common';
import { formatCurrencyWithSymbol } from '@utils/currency-utils';
import { ElementProps } from '@utils/form-state';

import {
  CheckBoxAction,
  CheckBoxCheck,
  CheckBoxWrap,
  RadioAction,
  RadioCheck,
} from './styled';

export interface Props {
  style?: StyleProp<ViewStyle>;
  checkboxLabelContainer?: StyleProp<ViewStyle>;
  options: AnswerOption[];
  updateSelected?: (selected: AnswerOption, index: number) => void;
  mode?: string;
  disabled?: boolean;
  setValue?: (val: any) => void;
  setError?: (val: string) => void;
  elProps?: ElementProps;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  color?: string;
  showPrice?: boolean;
  showDiscountPrice?: boolean;
  totalNumberOfLines: number;
}

const CheckBox = ({
  updateSelected = undefined,
  mode = 'checkbox',
  disabled = false,
  setValue = undefined,
  setError = undefined,
  elProps = undefined,
  style = undefined,
  options,
  flexDirection,
  color,
  showPrice,
  showDiscountPrice,
  checkboxLabelContainer,
  totalNumberOfLines,
  ...otherProps
}: Props): React.ReactElement => {
  const isRadio = mode === 'radio';

  const onSelect = (item: AnswerOption, index: number) => {
    if (!disabled) {
      item.checked = !item.checked;
      if (updateSelected) updateSelected(item, index);
      if (otherProps.setValue) {
        if (mode === 'radio') {
          const selected = item.checked
            ? options.filter(op => op.id === item.id)
            : null;
          otherProps.setValue(selected);
        } else {
          const selected = options.filter(op => op.checked);
          otherProps.setValue(selected.length > 0 ? selected : null);
        }
        if (otherProps.setError) otherProps.setError('');
      }
    }
  };

  return (
    <>
      {options.map((item: AnswerOption, index: number) => (
        <View key={item.id} style={[{ width: '100%' }, style]}>
          <TouchableNativeFeedback onPress={() => onSelect(item, index)}>
            <CheckBoxWrap>
              {isRadio ? (
                <RadioAction checked={item?.checked}>
                  <RadioCheck checked={item?.checked} />
                </RadioAction>
              ) : (
                <CheckBoxAction checked={item?.checked}>
                  <CheckBoxCheck checked={item?.checked} />
                </CheckBoxAction>
              )}
              <View
                style={[
                  {
                    flexDirection: flexDirection ?? 'row',
                  },
                  checkboxLabelContainer,
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
                    (item?.name || item?.title)?.length > 26 &&
                      (item?.priceV2?.amount || showPrice)
                      ? { height: 40 }
                      : { height: 20 },
                  ]}
                  totalNumberOfLines={totalNumberOfLines || 1}
                >
                  {item?.name || item?.title}
                </BodyMedium>
                {(item?.priceV2?.amount || showPrice) && (
                  <BodyMedium
                    containerStyle={{ flex: 1 }}
                    style={{
                      color: color ? `${color}` : '#010101',
                      paddingLeft: 8,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    {item?.priceV2?.amount && (
                      <>
                        {showPrice &&
                          parseInt(item?.compareAtPriceV2?.amount, 10) >
                          parseInt(item?.priceV2?.amount, 10) && (
                            <Text
                              style={{
                                color: '#C5C5C5',
                                textDecorationLine: 'line-through',
                              }}
                            >
                              {formatCurrencyWithSymbol(
                                item?.compareAtPriceV2?.amount,
                              )}
                            </Text>
                          )}
                        {showDiscountPrice && (
                          <Text style={{ color: '#005655' }}>
                            {' '}
                            {formatCurrencyWithSymbol(item?.priceV2?.amount)}
                          </Text>
                        )}
                      </>
                    )}
                    {showPrice && (
                      <Text>
                        {' '}
                        {parseInt(item?.compareAtPriceV2?.amount, 10) >
                          parseInt(item?.priceV2?.amount, 10) && '|'}{' '}
                        <Text style={{ color: '#FF6F00' }}>
                          {item?.discount ||
                            (parseInt(item?.compareAtPriceV2?.amount, 10) >
                              parseInt(item?.priceV2?.amount, 10) &&
                              getPercentageValue(
                                item?.compareAtPriceV2?.amount,
                                item?.priceV2?.amount,
                              ))}
                        </Text>
                      </Text>
                    )}
                  </BodyMedium>
                )}
              </View>
            </CheckBoxWrap>
          </TouchableNativeFeedback>
        </View>
      ))}
      {elProps && elProps.error ? (
        <View
          style={{ marginTop: Whitespace.TINY, marginLeft: 2, width: '100%' }}
        >
          <InputSmall fontWeight="500" color={Color.ALERT}>
            {elProps.error}
          </InputSmall>
        </View>
      ) : (
        <View style={{ minHeight: 20 }} />
      )}
    </>
  );
};


export default CheckBox;
