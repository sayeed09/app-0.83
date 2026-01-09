
import ShopOffersContainer from 'containers/shop/offers';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function ShopOffersScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <ShopOffersContainer navigation={navigation} route={route} />
        </>
    );
}
