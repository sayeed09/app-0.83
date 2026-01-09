
import WriteAReview from 'containers/shop/write-a-review';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function WriteAReviewScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <WriteAReview navigation={navigation} route={route} />
        </>
    );
}
