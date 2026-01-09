
import AskAQuestion from 'containers/shop/ask-a-question';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function AskAQuestionScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <AskAQuestion navigation={navigation} route={route} />
        </>
    );
}
