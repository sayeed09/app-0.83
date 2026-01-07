import FastImage from "@d11/react-native-fast-image";
import { useShopState } from "context/shop";
import { ValueCommItems } from "models/shop";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "styles/common";
import { RUPEE_SYMBOL } from "utils/constants";

const ValueCommunication = ({selectedVariant, variantImage}) => {
  const { productValueComms } = useShopState();
  const [valueComms, setValueComms] = useState<ValueCommItems[]>();

  useEffect(() => {
    if(selectedVariant && productValueComms && productValueComms.length > 0) {
      let variantToPush: ValueCommItems = {
        compareAtPrice: selectedVariant.compareAtPrice,
        imageUrl: variantImage[0].src,
        price: selectedVariant.price,
        title: selectedVariant.title,
        subHeader: selectedVariant.subHeader,
      }
      setValueComms([variantToPush, ...productValueComms]);
    }
  }, [selectedVariant]);

  if(valueComms) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Your order includes FREE Consultation + Diet Plan!
        </Text>
        {valueComms && valueComms.map((item, idx) => (
          <View key={idx} style={styles.itemRow}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemContent}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
                {item.price < 1 && (
                  <FastImage source={{uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Group.png?v=1756672070'}} style={{width: 20, height: 20, marginLeft: 4}}/>
                )}
              </View>
              {item.price > 0 ? (
                <Text style={styles.itemSubtitle}>{item.subHeader}</Text>
               ) : null}
            </View>
            <View style={styles.itemPriceBlock}>
              <Text style={styles.itemMrp}>MRP: <Text style={{textDecorationLine: "line-through"}}>{RUPEE_SYMBOL}{item.compareAtPrice}</Text></Text>
              {item.price > 0 ? <Text style={[styles.itemPrice, {fontWeight: 'bold'}]}>{RUPEE_SYMBOL}{item.price}</Text> : 
                <FastImage source={{uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/FREE.png?v=1756986866'}} style={{height: 24, width: 38}}/>
              }
            </View>
          </View>
        ))}
        <View style={styles.payRow}>
          <Text style={[styles.payLabel, commonStyles.fw500]}>You pay only</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.payMrp}>₹{valueComms?.reduce((acc,current) => {
              return acc + current.compareAtPrice
            }, 0 )}
            </Text>
            <Text style={styles.payPrice}>₹{valueComms?.reduce((acc,current) => {
              return acc + current.price
            }, 0 )}
            </Text>
          </View>
        </View>
      </View>
    )
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF9E5",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFF3C9",
    padding: 8,
    margin: 8,
  },
  header: {
    color: "#006E5A",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 18,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "500",
    fontSize: 14,
    color: "#2D2D2D",
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#717171",
  },
  itemPriceBlock: {
    minWidth: 80,
    alignItems: "flex-end",
  },
  itemMrp: {
    fontSize: 13,
    color: "#888",
  },
  itemPrice: {
    fontWeight: "600",
    fontSize: 16,
    color: "#222",
  },
  freePrice: {
    color: "#fbeb87",
    borderWidth: 2,
    borderColor: "#fbeb87",
    backgroundColor: "#ff7000",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
  },
  payRow: {
    backgroundColor: "#FFF2BB",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payLabel: {
    color: "#333030",
    fontSize: 14,
  },
  payMrp: {
    color: "#717171",
    textDecorationLine: "line-through",
    fontSize: 14,
    marginRight: 4,
    fontWeight: "500",
  },
  payPrice: {
    color: "#006E5A",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default ValueCommunication;