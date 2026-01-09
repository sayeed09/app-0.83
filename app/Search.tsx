
import Search from 'containers/search';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function SearchScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <Search navigation={navigation} route={route} />
        </>
    );
}
