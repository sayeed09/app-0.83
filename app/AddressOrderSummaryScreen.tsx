
import AddressOrderSummary from 'containers/shop/address/address-order-summary';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function AddressOrderSummaryScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <AddressOrderSummary navigation={navigation} route={route} />
        </>
    );
}
