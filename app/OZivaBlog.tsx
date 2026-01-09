
import OZivaBlog from 'containers/blog';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function OZivaBlogScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <OZivaBlog navigation={navigation} route={route} />
        </>
    );
}
