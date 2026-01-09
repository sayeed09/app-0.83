
import Support from 'containers/profile/support';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function SupportScreen() {
    const navigation = useNavigation();

    return (
        <>
            <Support navigation={navigation} />
        </>
    );
}
