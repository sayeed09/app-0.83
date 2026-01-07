
import AddAddress from 'containers/shop/address/add-address';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function AddAddressScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <AddAddress navigation={navigation} route={route} />
        </>
    );
}
