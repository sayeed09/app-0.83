
import OrderInProgress from 'containers/shop/order/order-inprogress';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function OrderInProgressScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <OrderInProgress navigation={navigation} route={route} />
        </>
    );
}
