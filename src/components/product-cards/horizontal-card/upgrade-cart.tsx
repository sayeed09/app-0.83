import { useCartState } from 'context/cart/CartContext';
import useCart from 'hooks/cart';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TAG_HEIGHT = 20;

const UpgradeCart = ({ handleUpgradeClick, filteredVariant, productId }) => {

  const { userUpgradedToday } = useCartState();
  const { getFormattedQty, formattedQty } = useCart();

  useEffect(() => {
    getFormattedQty(filteredVariant, productId);
  }, [filteredVariant]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>Experts Recommended</Text>
        </View>
        <View style={styles.upgradeBox}>
          <View style={styles.upgradeText}>
            <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/upgradeskus.png?v=1756902935' }} width={44} height={44} />

            <View style={styles.textContainer}>
              <Text style={styles.text1}>
                Switch to More Savings <Text style={styles.text2}>{`(${formattedQty})`}</Text>
              </Text>


              <Text style={styles.text3}>
                {userUpgradedToday} users upgraded today for better value!
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeClick}>
            <Text style={styles.buttonText}>UPGRADE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default UpgradeCart;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    paddingBottom: 4,
    paddingTop: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderColor: '#F4E47C',
    borderWidth: 1,
    backgroundColor: '#FFF29E',
    minHeight: 68,
    position:'relative'
  },
  tagContainer: {
    position: 'absolute',
    top: -(TAG_HEIGHT/2),
    alignSelf: 'center',
    backgroundColor: '#FFA102',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    height: TAG_HEIGHT,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  upgradeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upgradeText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flexShrink: 1,
    marginLeft: 4,
  },
  text1: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  text2: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
  text3: {
    fontSize: 12,
    color: '#424242',
    marginTop: 2,
  },
  upgradeButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
