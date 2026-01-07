import * as React from 'react';
import { ActivityIndicator, Image, StyleProp, View, ViewProps } from 'react-native';

import BaseText from '@components/base/text';
import { Color } from '@components/styles/colors';

import { TextType } from '../text/styled';
import { BaseView } from '../view';
import { ButtonContainer, StyledActionButton } from './styled';

export enum ButtonType {
  PRIMARY,
  SECONDARY,
}

export interface BaseButtonProps extends ViewProps {
  title: string;
  fontWeight?:
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | 'bold'
  | 'normal';
  fontSize?: number;
  onAction?: () => void;
  savingText?: string;
  disabled?: boolean;
  disabledColor?: Color;
  width?: number | string;
  height?: number | string;
  buttonType?: ButtonType;
  style?: StyleProp<any> & React.CSSProperties;
  textStyle?: StyleProp<any> & React.CSSProperties;
  outline?: boolean;
  icon?: React.ReactNode | null;
  iconAlign?: 'left' | 'right';
  disabledIcon?: React.ReactNode;
  color?: Color;
  accentColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  textType?: TextType;
  bold?: boolean;
  className?: string;
  hoverTitle?: string;
  strikethrough?: boolean;
  saving?: boolean;
  type?: string;
  paddingVertical?: number;
  textColor?: string;
  textTransform?: string;
  loading?: boolean;
  loaderColor?: string;
  selectIcon?: boolean;
}

const BaseButton = ({
  width = '100%',
  height = 42,
  color = Color.WHITE,
  textType = TextType.H4,
  accentColor = Color.AZURE,
  borderRadius = 10,
  bold = false,
  iconAlign = 'left',
  strikethrough = false,
  saving = false,
  type = 'button',
  icon,
  title,
  disabled,
  outline,
  disabledIcon,
  onAction,
  style,
  textStyle,
  loading,
  loaderColor,
  selectIcon
}: BaseButtonProps): React.ReactElement => {

  const internalStyle: StyleProp<any> = { width, height, borderRadius };
  const titleColor = disabled ? Color.DISABLED : color;

  if (outline) {
    internalStyle.borderColor = disabled ? Color.DISABLED : accentColor;
    internalStyle.borderWidth = 1;
  } else {
    internalStyle.backgroundColor = disabled ? Color.DISABLED : accentColor;
  }

  const renderIconAndText = () => {
    if (iconAlign === 'left') {
      return (
        <BaseView row Center>
          <BaseText color={titleColor} textType={textType} style={textStyle}>
            {disabled ? disabledIcon || null : icon || null}

            {!loading ? title : null}
            {selectIcon ? <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_left.png?v=1756098694' }} width={24} height={24} /> : ' '}

          </BaseText>

          {loading && (
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginLeft: 5,
                zIndex: 9999,
                position: 'absolute',
              }}
            >
              <ActivityIndicator
                animating
                size="small"
                color={loaderColor || '#fff'}
              />
            </View>
          )}
        </BaseView>
      );
    }

    return (
      <>
        <BaseText color={titleColor} textType={textType} style={textStyle}>
          {title}
        </BaseText>
        {disabled ? disabledIcon || null : icon || null}
        {loading && (
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginLeft: 5,
              zIndex: 9999,
              position: 'absolute',
            }}
          >
            <ActivityIndicator
              animating
              size="small"
              color={loaderColor || '#fff'}
            />
          </View>
        )}
      </>
    );
  };

  if (onAction) {
    return (
      <StyledActionButton
        disabled={disabled || saving}
        onPress={onAction}
        style={[internalStyle, style]}
      >
        {renderIconAndText()}
      </StyledActionButton>
    );
  }

  return (
    <ButtonContainer style={[internalStyle, style]}>
      {renderIconAndText()}
    </ButtonContainer>
  );
};


export default BaseButton;
