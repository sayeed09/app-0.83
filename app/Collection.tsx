
import Collections from 'containers/collections';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function CollectionScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <Collections navigation={navigation} route={route} />
        </>
    );
}
