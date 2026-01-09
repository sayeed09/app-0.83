
import Orders from 'containers/profile/orders';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function OrdersScreen() {
    const navigation = useNavigation();
    return (
        <>
            <Orders navigation={navigation} />
        </>
    );
}
