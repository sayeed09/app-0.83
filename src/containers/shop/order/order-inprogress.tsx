import crashlytics from '@react-native-firebase/crashlytics';
import { setIsPaymentProcessing, setPaymentError } from 'actions/checkout';
import { useCheckoutDispatch } from 'context/checkout';
import { useLocalSearchParams } from 'expo-router';
import useLogin from 'hooks/login';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { postPaymentStatus } from 'services/checkout';
import { LOGO } from 'utils/images';

const styleSheet = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF'
    },
    paymentProcessed: {
        backgroundColor: '#F5F5F5',
        marginTop: 16,
        padding: 16,
        alignItems: 'center'
    },
    paymentProcessedText: {
        marginBottom: 8
    },
    progressText: {
        marginTop: 16,
        gap: 8
    }
});

interface IProps {
    navigation: any;
    route: any;
}


const OrderInProgress = ({ navigation, route }: IProps) => {
    const checkoutDispatch = useCheckoutDispatch();
    const { handleLogout } = useLogin();
    const { paymentId } = useLocalSearchParams<any>();


    let timeoutId, pollingIntervalId;
    const pollServer = () => {
        postPaymentStatus(paymentId).then(response => {
            let { status } = response.data;
            if (status === 'COMPLETED') {
                clearInterval(pollingIntervalId);
                clearTimeout(timeoutId);
                navigation.navigate('OrderConfirmationScreen');
            } else if (status === 'FAILED') {
                clearInterval(pollingIntervalId);
                clearTimeout(timeoutId);
                navigation.navigate('PaymentMethodScreen');
            }
        }).catch(error => {
            checkoutDispatch(setPaymentError('payment error'));
            crashlytics().recordError(
                `Error in order confirmation : ${paymentMethod} - ${checkoutId}`,
            );
            if (error?.response?.status === 401) {
                handleLogout();
                navigation.navigate('CartScreen');
            }
        })
    };

    useEffect(() => {
        pollingIntervalId = setInterval(pollServer, 3000);
        timeoutId = setTimeout(() => {
            clearInterval(pollingIntervalId);
            checkoutDispatch(setPaymentError('payment error'));
            checkoutDispatch(setIsPaymentProcessing(false));
            navigation.navigate('PaymentMethodScreen');
        }, 60000);
        return () => {
            clearInterval(pollingIntervalId);
            clearTimeout(timeoutId);
        };
    }, []);
    return (
        <>
            <View style={styleSheet.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={LOGO} />
                </View>
                <View style={styleSheet.paymentProcessed}>
                    <Text style={styleSheet.paymentProcessedText}>Your payment is being processed</Text>
                    <ActivityIndicator animating size="small" color="#006e5a" />
                </View>
                <View style={styleSheet.progressText}>
                    <Text>You will be redirected to the Order Summary Page, it might take a few seconds.</Text>
                    <Text>Please do not tap 'Back' or close the app.</Text>
                </View>
            </View>
        </>
    )
}

export default OrderInProgress