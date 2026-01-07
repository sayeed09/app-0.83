
import Cart from 'containers/shop/cart';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function CartScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <Cart navigation={navigation} route={route} />
        </>
    );
}
