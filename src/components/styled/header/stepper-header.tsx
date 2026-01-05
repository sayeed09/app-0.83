import { setIsCartUpgraded } from 'actions/cart';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import { width } from 'utils/constants';
import { commonStyles } from 'styles/common';

const routeArray = [{ screenName: 'CartScreen', name: 'Cart', isActive: false }, { screenName: 'AddressOrderSummaryScreen', name: 'Address', isActive: false }, { screenName: 'PaymentMethodScreen', name: 'Payment', isActive: false }];

const StepperHeader = ({ navigation }) => {
    const navState = navigation?.getState();
    const currentRouteName = navState ? navState?.routes[navState.index]?.name : null;
    const [updateRouteList, setUpdateRouteList] = useState(routeArray);
    const { cartItems } = useCartState();
    const cartDispatch = useCartDispatch();


    const getSteppers = () => {
        const indexOfCurrentScreen = routeArray.findIndex(route => route.screenName === currentRouteName);
        if (indexOfCurrentScreen > -1) {
            const activeSteppersList = routeArray.slice(0, indexOfCurrentScreen + 1).map(route => {
                return { ...route, isActive: true }
            });
            const inActiveSteppersList = routeArray.slice(indexOfCurrentScreen + 1, routeArray.length).map(route => {
                return { ...route, isActive: false }
            });
            setUpdateRouteList([...activeSteppersList, ...inActiveSteppersList]);
        };
    }

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getSteppers();
        });
        cartDispatch(setIsCartUpgraded(false));

        return unsub;
    }, [navigation]);

    return (
        <>
            {
                <View style={[styles.shadowContainer, { height: 40 }]}>
                    {(cartItems && cartItems.length > 0) ? <View style={[commonStyles.flex, commonStyles.flexRow, commonStyles.alignCenter, { width: width }]}>
                        <View>
                            <TouchableOpacity
                                style={commonStyles.pl16}
                                onPress={() => navigation.goBack()}>
                                <SvgRenderer
                                    style={styles.leftArrowIcon}
                                    source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/arrow.svg?v=1755707998' }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[commonStyles.flex, commonStyles.flexRow, commonStyles.alignCenter, styles.stepperContainer, commonStyles.justifySpaceAround]}>
                            <View>
                                <TouchableOpacity style={styles.stepItem}
                                    onPress={() => { navigation.navigate('CartScreen') }}>
                                    <Image
                                        source={{
                                            uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/greentick.png?v=1756792234'
                                        }} style={styles.stepIcon} />
                                    <Text>{`Cart`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[commonStyles.alignCenter, styles.activeNavLine, currentRouteName == 'CartScreen' ? commonStyles.borderLeftGreenDisabled : styles.activeColor]}></View>
                            <View>
                                <TouchableOpacity style={styles.stepItem}
                                    onPress={() => {
                                        if (currentRouteName === 'PaymentMethodScreen')
                                            navigation.navigate('AddressOrderSummaryScreen')
                                    }}>
                                    <Image
                                        source={{
                                            uri: currentRouteName != 'CartScreen' ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/greentick.png?v=1756792234' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/greytick.png?v=1756792233'
                                        }} style={styles.stepIcon} />
                                    <Text>{`Address`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[commonStyles.alignCenter, styles.activeNavLine, currentRouteName == 'PaymentMethodScreen' ? styles.activeColor : commonStyles.borderLeftGreenDisabled]}></View>
                            <View>
                                <View style={styles.stepItem}>
                                    <Image
                                        source={{
                                            uri: currentRouteName == 'PaymentMethodScreen' ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/greentick.png?v=1756792234' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/greytick.png?v=1756792233'
                                        }} style={styles.stepIcon} />
                                    <Text>{`Payment`}</Text>
                                </View>
                            </View>
                        </View>
                    </View> : <View style={styles.emptyCartHeader}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}>
                            <SvgRenderer
                                style={styles.leftArrowIcon}
                                source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/arrow.svg?v=1755707998' }}
                            />
                        </TouchableOpacity>
                    </View>}
                </View>
            }

        </>
    );
};

const styles = StyleSheet.create({
    shadowContainer: {
        backgroundColor: '#ffffff',
    },
    stepperContainer: {
        marginRight: 8,
    },
    activeNavLine: {
        height: 2,
        width: width * 0.15
    },
    activeColor: {
        backgroundColor: '#6BBD58',
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    leftArrowIcon: {
        width: 24,
    },
    stepIcon: {
        width: 15,
        height: 15,
        marginRight: 2,
    },
    cashbackContainer: {
        width: width,
        // paddingTop: 12,
        paddingHorizontal: 18,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 10,
        borderRadius: 20,
        zIndex: 1,
    },
    cashbackTextContainer: {
        flexDirection: 'column',
    },
    cashbackIcon: {
        width: 20,
        height: 20,
        marginRight: 2,
    },
    savedText: {
        fontSize: 14,
    },
    highlightedText: {
        fontWeight: 'bold',
        color: '#FF6F00',
        fontSize: 18
    },
    emptyCartHeader: {
        backgroundColor: '#ffffff',
        height: 40,
        marginTop: 20,
        marginLeft: 16
    }

});

export default React.memo(StepperHeader);
