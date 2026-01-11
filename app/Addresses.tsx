
import Addresses from 'containers/profile/addresses';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function AddressesScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <Addresses navigation={navigation} route={route} />
        </>
    );
}
