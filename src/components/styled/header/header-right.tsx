import React from 'react';
import { Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import CartSvg from '@assets/images/icons/header-icons/cart';
import SearchSvg from '@assets/images/icons/header-icons/search';
import { AppStackDefinition } from '@routes/definitions';
import UserLineIconComponent from 'assets/images/icons/bottom-navigation/lined/user';

import { StyledButton } from '@components/base/button/styled';
import { useCartDispatch, useCartState } from '@context/cart/CartContext';
import { useNotificationState } from '@context/notifications';
import { trackMoEngageAppEvent } from '@utils/common';
import { width } from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    shadowColor: '#000',
    elevation: 1,
    flexDirection: 'row',
    maxWidth: width / 2,
  },
  logoWrapper: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  cartCountWrapper: {
    position: 'absolute',
    top: -8,
    right: 5,
    backgroundColor: '#ef4e24',
    borderRadius: 17 / 2,
    width: 17,
    height: 17,
    paddingHorizontal: 4,
    zIndex: 2,
  },
  cartCountText: {
    textAlign: 'center',
    lineHeight: 16,
    fontSize: 8,
    fontFamily: 'Roboto-Regular',
    color: 'white',
  },
});

const HeaderRight = ({
  navigation,
  hideIcons,
}: {
  hideIcons?: boolean;
  navigation: NativeStackNavigationProp<AppStackDefinition>;
}): React.ReactElement => {
  const { itemCount } = useCartState();
  const cartDispatch = useCartDispatch();
  const { recentNotifications, trackingTransparency } = useNotificationState();
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          // paddingHorizontal: 20,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <Pressable
            onPress={() => {
              trackMoEngageAppEvent({
                event: `search_bar_click_app`,
                values: [],
                trackingTransparency,
              });
              navigation.navigate('Search');
            }}
          >
            <SearchSvg />
          </Pressable>
        </View>  
        <View style={{ paddingHorizontal: 10 }}>
          <Pressable
            onPress={() => {
              trackMoEngageAppEvent({
                event: `cart_clicked_app`,
                values: [],
                trackingTransparency,
              });
              navigation.navigate('CartScreen');
            }}
          >
            <View style={{ paddingHorizontal: 10 }}>
              {itemCount !== 0 && (
                <View style={styles.cartCountWrapper}>
                  <Text style={styles.cartCountText}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </Text>
                </View>
              )}
              <CartSvg />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HeaderRight;
