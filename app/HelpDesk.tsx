
import HelpDesk from 'containers/profile/help-desk';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function HelpDeskScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <HelpDesk navigation={navigation} route={route} />
        </>
    );
}
