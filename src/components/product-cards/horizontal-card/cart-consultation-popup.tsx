import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { consultationData } from 'utils/constants';


const CartConsultationContent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Consultationbanner.png?v=1736322236' }}
        style={styles.banner}
        resizeMode="contain"
      />

      <View style={styles.body}>
        <View style={styles.row}>
          <Text>Here’s what you’re getting for </Text>
          <Text style={styles.consultationBadge}>1 Month</Text>
          <Text> :</Text>
        </View>

        {consultationData.map(item => (
          <View key={item.id} style={styles.listItem}>
            <Image source={{ uri: item.icon }} style={styles.itemIcon} />
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footerText}>
        Your plan is added to the cart! Proceed to checkout and boost your journey with OZiva! 🚀
      </Text>
    </ScrollView>
  );
};

export default React.memo(CartConsultationContent);

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: '#FFF',
  },
  banner: {
    width: '100%',
    height: 140,
    borderRadius: 10
  },
  body: {
    marginTop: 4,
    backgroundColor: '#F0FAF0',
    padding: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  itemText: {
    flex: 1,
    fontSize: 12,
    color: '#000',
    fontWeight: '500'
  },
  footerText: {
    marginVertical: 8,
    fontSize: 13,
    color: '#444',
    lineHeight: 18
  },
  consultationBadge: {
    fontSize: 12,
    color: '#FFF',
    backgroundColor: '#006E5A',
    width: 68,
    textAlign: 'center',
    borderRadius: 50,
    paddingVertical: 2,
    marginBottom: 8
  },
});
