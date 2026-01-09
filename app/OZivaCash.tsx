
import OZivaCash from 'containers/profile/oziva-cash';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function OZivaCashScreen() {
    const navigation = useNavigation();

    return (
        <>
            <OZivaCash navigation={navigation} />
        </>
    );
}
