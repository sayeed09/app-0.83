
import NotificationSettingsContainer from 'containers/profile/notification-settings';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function NotificationSettingsScreen() {
    const navigation = useNavigation();

    return (
        <>
            <NotificationSettingsContainer navigation={navigation} />
        </>
    );
}
