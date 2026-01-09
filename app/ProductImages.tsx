
import { ProductImages } from 'containers/shop/product-images';
import { useRouter } from 'expo-router';
import React from 'react';

export default function ProductImagesScreen() {
    const route = useRouter();

    return (
        <>
            <ProductImages route={route} />
        </>
    );
}
