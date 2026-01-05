import {
  backgroundColor,
  border,
  BoxProps,
  createBox,
  createText,
  shadow,
  spacing,
  spacingShorthand,
  useRestyle,
  useTheme,
} from '@shopify/restyle';
import React, { PropsWithChildren } from 'react';
import {
  GestureResponderEvent,
  PressableProps,
  Image as RNImage,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  ScrollViewProps,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'styles/theme';

const restyleFunctions = [
  spacing,
  spacingShorthand,
  border,
  backgroundColor,
  shadow,
];

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
Text.defaultProps = { color: 'bodyText', variant: 'body1' };

export const Image = ({ source, ...props }: any) => {
  const resolvedSource = RNImage.resolveAssetSource(source as any);
  const isExternalImage = resolvedSource?.uri?.startsWith('http') ?? false;
  return isExternalImage ? (
    <Image source={source} {...props} />
  ) : (
    <RNImage source={source} {...(props as any)} />
  );
};

export const SafeTopSpace = React.memo(() => {
  const { top } = useSafeAreaInsets();
  return <Box height={top} />;
});
SafeTopSpace.displayName = 'SafeTopSpace';

export const SafeBottomSpace = React.memo(() => {
  const { bottom } = useSafeAreaInsets();
  return <Box height={bottom} />;
});
SafeBottomSpace.displayName = 'SafeBottomSpace';

export const ScrollView = React.forwardRef<
  typeof RNScrollView,
  PropsWithChildren<BoxProps<Theme> & Omit<ScrollViewProps, 'style'>>
>((props, ref) => {
  const innerProps = useRestyle(restyleFunctions, props);
  return (
    <RNScrollView
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...innerProps}
      ref={ref as any}
    />
  );
});

export const Pressable = React.forwardRef<
  View,
  BoxProps<Theme> & Omit<PressableProps, 'style'> & { borderless?: boolean }
>(({ children, borderless, onPress, ...props }, ref) => {
  const innerProps = useRestyle(restyleFunctions, props);
  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
    }
  };
  const { colors } = useTheme<Theme>();
  return (
    <RNPressable
      android_ripple={{ color: colors.appBg, borderless }}
      {...innerProps}
      onPress={handlePress}
      ref={ref}
    >
      {children}
    </RNPressable>
  );
});
Pressable.displayName = 'StyledPressable';

ScrollView.displayName = 'StyledScrollView';
export const Hr = (props: BoxProps<Theme>) => (
  <Box borderTopWidth={1} borderColor="levelOneBorder" {...props} />
);
