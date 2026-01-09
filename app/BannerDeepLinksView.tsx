
import BannerDeepLinksView from 'containers/home/banner-deeplinks-view';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function BannerDeepLinksViewScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <BannerDeepLinksView route={route} />
        </>
    );
}
