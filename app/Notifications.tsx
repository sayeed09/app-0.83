
import Notifications from 'containers/notification';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function NotificationScreen() {
    const navigation = useNavigation();
    return (
        <>
            <Notifications navigation={navigation} />
        </>
    );
}
