import AsyncStorage from "@react-native-async-storage/async-storage";
import { Comparison } from "models/product-details/productv2";

export const FIRST_FOLD_SECTIONS = ['newBenefits', 'variants', 'recommendedByExpert', 'images', 'clinicalStudy'];
export const SECOND_FOLD_SECTIONS = ['sections', 'seo', 'footer', 'faq'];

export const getImageList = (comparisons: Comparison[]) => {
    let list: {
        image1: string,
        image2: string
    }[] = [];
    if (comparisons) {
        comparisons.map((item) => {
            list.push(
                {
                    image1: item.mobileImage1,
                    image2: item.mobileImage2
                }
            )
        })
    }
    return list;
}

const sessionStorage: Record<string, number> = {};

export const remainingProductsInStock = (productId: string, min = 49, max = 99) => {
    if (sessionStorage[productId]) {
        return sessionStorage[productId];
    }

    const productLeft = Math.floor(Math.random() * (max - min + 1)) + min;
    sessionStorage[productId] = productLeft;

    return productLeft;
};