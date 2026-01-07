
import ProductDetails from 'containers/shop/product-details';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';


export default function ProductDetailsScreen() {
    const navigation = useNavigation();
    const route = useRouter();
    return (
        <>
            <ProductDetails navigation={navigation} route={route} />
        </>
    );
}
