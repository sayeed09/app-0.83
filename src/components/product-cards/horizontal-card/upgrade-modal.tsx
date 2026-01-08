import { addProduct, removeItem, setIsCartUpgraded, setUpgradeSnackbar } from 'actions/cart';
import Loader from 'components/elements/loader/loader';
import { useCartDispatch } from "context/cart/CartContext";
import useCart from "hooks/cart";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { getUpgradedProductId, setUpgradedProductId } from "services/cart";
import { fetchProducts, fetchVariantAdditionalDetail } from "services/product";
import { PHMProductId, PHWProductId } from "utils/constants";
import { formatCurrencyWithSymbol } from "utils/currency-utils";
import { GATrackingService } from "utils/ga-tracking";

const UpgradeModal = ({ filteredVariants, index, setUpgradeCartItem, upgradeCartItem, setUpgradedCartPopup }) => {
  const recommendedVariant = filteredVariants && filteredVariants.length > 0 ? filteredVariants.filter(variant => variant.isRecommended)[0] : null;
  const cartDispatch = useCartDispatch();

  const [variantResponseList, setVariantResponseList] = useState<any[]>([]);
  const [selectedPack, setSelectedPack] = useState<any>(recommendedVariant);
  const [productReview, setProductReview] = useState<any>();

  const { getFormattedQtyString } = useCart();

  const getFormattedQty = async () => {
    if (filteredVariants && filteredVariants.length > 0) {
      const responseList = await Promise.all([...filteredVariants.map((item) => fetchVariantAdditionalDetail(item.id))]);
      if (responseList && responseList.length > 0) {
        if (upgradeCartItem.productId == Number(PHMProductId) || upgradeCartItem.productId == Number(PHWProductId)) {
          setVariantResponseList(responseList.map((item) => `${getFormattedQtyString(item.data.variants[0].quantity, upgradeCartItem.productId)}`));
        } else {
          setVariantResponseList(responseList.map((item) => `${getFormattedQtyString(item.data.variants[0].formatted_quantity, upgradeCartItem.productId)}`));
        }
      }
    }
  }

  const handleUpdateCart = () => {
    if (selectedPack) {
      cartDispatch(removeItem(Number(upgradeCartItem?.variantId)));
      cartDispatch(addProduct({
        id: Number(selectedPack.id),
        title: upgradeCartItem.title,
        quantity: 1,
        imageUrl: selectedPack?.src,
        selectedOptions: [],
        compareAtPrice: selectedPack.compareAtPrice,
        price: selectedPack.price,
        productId: String(upgradeCartItem?.productId),
      }));

      getUpgradedProductId().then(data => {
        const upgradededProductIdObj = {
          variantId: Number(selectedPack.id),
        };
        setUpgradedProductId([...data, upgradededProductIdObj]);
      })
      cartDispatch(setIsCartUpgraded(true));
      setUpgradedCartPopup(false);
      setUpgradeCartItem(null);
      cartDispatch(setUpgradeSnackbar(true))
    }
  }

  const getStarReviews = () => {
    if (upgradeCartItem) {
      fetchProducts([upgradeCartItem?.productId.toString()])
        .then((response) => {
          setProductReview(response?.data?.product[0]);
        })
        .catch((error) => {
          console.log('Get star review error', error);
        });
    }
  };

  useEffect(() => {
    if (index === 0) {
      getFormattedQty()
      getStarReviews();
    };
  }, []);

  if (filteredVariants?.length == 0) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <>
      {/* Scrollable card list */}
      <View style={styles.cardContainer}>
        {filteredVariants.length > 0 &&
          filteredVariants &&
          filteredVariants.map((item, ind) => (
            <TouchableOpacity
              key={item.id}
              style={selectedPack && selectedPack.id === item.id ? styles.activePackCard : styles.inactivePackCard}
              onPress={() => {
                const eventName = 'upgrade_cart_pack_selected';

                GATrackingService.trackCustomEvent(eventName, {
                  item_id: upgradeCartItem.variantId,
                  item_name: upgradeCartItem.title,
                  option: upgradeCartItem.productId,
                });
                setSelectedPack(item);
              }}
            >
              <View style={selectedPack && selectedPack.id === item.id ? styles.activeImageWrapper : styles.inactiveImageWrapper}>
                {item.isRecommended ? (
                  <View style={styles.activeRecommendeContainer}>
                    <Text style={selectedPack && selectedPack.id === item.id ? styles.activeRecommendedText : styles.inativeRecommendedText}>Recommended</Text>
                  </View>
                ) : <></>}

                <Image source={{ uri: item?.src }} style={selectedPack && selectedPack.id === item.id ? styles.activePackImage : styles.inActivePackImage} />

                <Text style={styles.packName}>
                  {item.option2
                    ? `${item.option2.slice(0, 13)}...`
                    : `${item.option1.slice(0, 16)}...`}
                </Text>

                <Text style={styles.packQty}>
                  {variantResponseList[ind]}
                </Text>
              </View>

              <View style={styles.pricingWrapper}>
                <Text style={styles.sellingPrice}>
                  {formatCurrencyWithSymbol(item.price)}
                </Text>
                <Text style={styles.mrp}>
                  {formatCurrencyWithSymbol(item.compareAtPrice)}
                </Text>
              </View>
              {item.compareAtPrice - item.price > 0 ? (
                <Text style={[styles.saveText]}>
                  Save: {formatCurrencyWithSymbol(item.compareAtPrice - item.price)}
                </Text>
              ) : <></>}
            </TouchableOpacity>
          ))}
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedPack?.src }} style={styles.footerImage} />

          <Text style={styles.ratingNumber}>
            {productReview?.averageRating}
          </Text>
          <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/star.png?v=1756883763' }} style={{ width: 14, height: 14 }} />
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => handleUpdateCart()}
        >
          <Text style={styles.ctaText}>UPDATE CART</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UpgradeModal;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  activeRecommendeContainer: {
    backgroundColor: '#FECC0E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
    position: 'absolute',
    top: '-8%',
    alignSelf: 'center',
  },
  activeRecommendedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006E5A',
  },
  inativeRecommendedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#006E5A',
  },
  activePackCard: {
    width: '35%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#6BBD58",
    backgroundColor: "#fff",
    height: 240,
  },
  inactivePackCard: {
    width: '30%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#FFF",
    height: 220,
  },
  activeCard: {
    borderColor: "#FF6F00",
    borderWidth: 2,
  },
  activeImageWrapper: {
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: '#F0FAF0',
    borderRadius: 4,
  },
  inactiveImageWrapper: {
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 4
  },
  activePackImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 16,
  },
  inActivePackImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginTop: 16,
  },
  packName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  packQty: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    marginBottom: 8
  },
  pricingWrapper: {
    alignItems: "center"
  },
  sellingPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  mrp: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
    marginBottom: 8
  },
  saveText: {
    fontSize: 12,
    lineHeight: 15,
    color: "#FFFFFF",
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 2,
    position: 'absolute',
    bottom: -12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  footer: {
    borderWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    padding: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 1,
    elevation: 4,
    alignItems: 'center',
    shadowRadius: 4

  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerImage: {
    width: 44,
    height: 44,
    resizeMode: "contain",
    marginRight: 4,
  },
  ratingsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 14,
    marginRight: 4,
    color: '#7E7E7E'
  },
  ctaButton: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    borderRadius: 8,
    width: '70%',
  },
  ctaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: 'center',
  },
});
