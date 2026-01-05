import React from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import BackSvg from 'assets/images/icons/header-icons/back-icon';
import { AppStackDefinition } from 'routes/definitions';

import { StyledButton } from '@components/base/button/styled';

import { CustomText } from '../../../../AndroidFontFix';

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    elevation: 1,
    flexDirection: 'row',
    marginLeft: 0,
    alignItems: 'center',
  },
  logoWrapper: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 12,
    width: 230
  },
});

const BackIcon = ({
  title,
  navigation,
  color,
  flatListRef,
  style,
  icon,
  goBackBy,
  onPress,
}: {
  title?: string;
  navigation: NativeStackNavigationProp<AppStackDefinition>;
  color?: string;
  flatListRef?: unknown;
  style?: StyleProp<TextStyle>;
  icon?: JSX.Element;
  goBackBy?: number;
  onPress?: any;
}): React.ReactElement => (
  <>
    <View style={styles.container}>
      <Pressable
        onPress={
          onPress ||
          (() => {
            if (flatListRef && flatListRef?.scrollTo) {
              flatListRef?.scrollTo({ y: 0 });
            }
            setTimeout(() => {
              if (!navigation.canGoBack()) {
                navigation.reset({
                  index: 1,
                  routes: [{ name: 'Home' }],
                });
              } else {
                navigation.pop(goBackBy ?? 1);
              }
            }, 100);
          })
        }
      >
        {icon || <BackSvg color={color} />}
      </Pressable>

      {title ? (
        <CustomText style={[styles.topBarTitle, { color }, style]}>
          {title}
        </CustomText>
      ) : null}
    </View>
  </>
);

export default BackIcon;
