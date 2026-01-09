
import OZivaPrime from 'containers/profile/oziva-prime';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function OZivaPrimeScreen() {
    const navigation = useNavigation();

    return (
        <>
            <OZivaPrime navigation={navigation} />
        </>
    );
}
