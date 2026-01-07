
import OrderConfirmation from 'containers/shop/order/order-confirmation';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function OrderConfirmationScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <OrderConfirmation navigation={navigation} />
        </>
    );
}
