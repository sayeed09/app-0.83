
import EditProfile from 'containers/profile/edit-profile';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function EditProfileScreen() {
    const navigation = useNavigation();

    return (
        <>
            <EditProfile navigation={navigation} />
        </>
    );
}
