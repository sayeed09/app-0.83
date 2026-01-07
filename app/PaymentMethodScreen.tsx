
import PaymentMethod from 'containers/shop/payment/payment-method';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';

export default function PaymentMethodScreen() {
    const navigation = useNavigation();
    const route = useRouter();

    return (
        <>
            <PaymentMethod navigation={navigation} />
        </>
    );
}
