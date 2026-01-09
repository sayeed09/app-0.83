
import OrderDetails from 'containers/profile/order-details';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function OrderDetailScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <OrderDetails navigation={navigation} route={route} />
        </>
    );
}
