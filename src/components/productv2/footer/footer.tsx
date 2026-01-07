import PDPButton from "components/elements/button/pdp-button";
import { Product } from "models/product";
import { IVariant } from "models/product-details/product";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import SvgRenderer from "react-native-svg-renderer";
import { FooterStyle } from "styles/productv2";
import { remainingProductsInStock } from "utils/product";

interface Props {
    handleBuyNow: () => void;
    buyNowBtnDisabled: boolean;
    selectedVariant: IVariant;
    image: string;
    productAdditionalDetails: Product;
    productId: string;
    isOutOfStock?: boolean;
}

const FooterV2 = ({ handleBuyNow, selectedVariant, buyNowBtnDisabled, image,
    productAdditionalDetails, productId, isOutOfStock }: Props) => {
    const [productLeftCount, setProductLeftCount] = useState(0);

    useEffect(() => {
        getRemainingProducts();
    }, []);
    const getRemainingProducts = async () => {
        setProductLeftCount(await remainingProductsInStock(productId))
    }

    return <>
        {productLeftCount > 0 &&
            <View style={FooterStyle.sellingNudgeContainer}>
                <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Timer.svg?v=1728993233' }} width={22} height={22} />
                <Text style={FooterStyle.sellingNudgeText}>Selling out fast! Less than {productLeftCount} left</Text>
            </View>
        }
        <View style={FooterStyle.container}>
            <PDPButton
                title={isOutOfStock ? 'OUT OF STOCK' : 'BUY NOW'}
                productImage={image}
                ratings={productAdditionalDetails?.averageRating}
                onPress={() => { !buyNowBtnDisabled && handleBuyNow() }}
                compareAtPrice={
                    selectedVariant.compareAtPrice
                }
                price={
                    selectedVariant.price
                } />
        </View>

    </>

}

export default FooterV2;