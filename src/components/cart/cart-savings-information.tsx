import { useAuthState } from 'context/auth';
import { useCartState } from 'context/cart/CartContext';
import { useCheckoutState } from 'context/checkout';
import { PrimeMemberShipType } from 'models/prime';
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Text } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import { totalCashBack, width } from 'utils/constants';
import { convertToRupees, formatCurrencyWithSymbol } from 'utils/currency-utils';

interface IProps {
    ozivaCash: any;
}

const CartSavingInformation = ({ ozivaCash }: IProps) => {
    const [showSavingSummary, setShowSavingSummary] = useState(false);
    const { cartLoading, orderTotalMRP, orderSubtotal, orderTotal, totalDiscount, offerList, cashback, isOzivaCashSelected, cartItems, isSubscriptionItem } = useCartState();
    const { discount_code: discountCode } = useCheckoutState();
    const { userData } = useAuthState();
    const savings = orderTotalMRP - (orderSubtotal ?? 0) + (totalDiscount ?? 0);
    const couponDescriptionText = offerList.length > 0 ? offerList.filter(offers => offers.code === discountCode?.code)[0]?.description : '';
    const isPrime = userData?.prime?.current_status == PrimeMemberShipType.Prime;

    useEffect(() => {
        if (showSavingSummary) {
            setShowSavingSummary(false);
        }
    }, [isOzivaCashSelected, discountCode]);

    return (
        <>
            {!cartLoading && cartItems.length > 0 ? <Shadow style={Styles.cashbackContainer} distance={10}>
                {savings > 0 ? <Pressable onPress={() => setShowSavingSummary(prev => !prev)}>
                    <View style={Styles.cashbackTextContainer}>
                        <Text style={Styles.savedText}>
                            <Text style={Styles.highlightedText}>You saved ₹{savings / 100}</Text> on this order today!
                        </Text>
                        <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Down_chevron.svg?v=1765448277' }} width={24} height={24} style={{ transform: [{ rotate: showSavingSummary ? '180deg' : '0deg' }] }} />
                    </View>
                </Pressable> : !isSubscriptionItem ? totalCashBack(isPrime, cashback, orderTotal) > 0 ? <View style={Styles.cashbackTextContainer}>
                    <Text style={Styles.savedText}>
                        <Text style={Styles.highlightedText}>You earn ₹{totalCashBack(isPrime, cashback, orderTotal)} OZiva Cash</Text> on this order
                    </Text>
                </View> : <></> : <></>}
                {showSavingSummary ? <View>
                    {!isSubscriptionItem ? isOzivaCashSelected ?
                        <View style={Styles.couponDescriptionText}>
                            <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' }} width={20} height={20} />
                            <Text>₹{ozivaCash?.redeemable_cash} saved with OZiva Cash</Text>
                        </View> :
                        totalDiscount > 0 && <View style={Styles.couponDescriptionText}>
                            <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' }} width={20} height={20} />
                            <Text>{couponDescriptionText || `${formatCurrencyWithSymbol(convertToRupees(totalDiscount))} saved`} with {discountCode.code}</Text>
                        </View> : <></>}
                    {(orderTotalMRP - (orderSubtotal ?? 0) > 0) ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' }} width={20} height={20} />
                        <Text>₹{(orderTotalMRP - (orderSubtotal ?? 0)) / 100} saved with product price drop!</Text>
                    </View> : <></>}
                    {!isSubscriptionItem ? totalCashBack(isPrime, cashback, orderTotal) > 0 ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/done-icon.svg?v=1763061560' }} width={20} height={20} />
                        <Text>You earn {totalCashBack(isPrime, cashback, orderTotal)} OZiva Cash on this order</Text>
                    </View> : <></> : <></>}
                </View> : <></>}
            </Shadow> : <></>}
        </>
    )
}

export default CartSavingInformation;

const Styles = StyleSheet.create({
    icon: {
        width: 18,
        height: 18,
        marginRight: 8,
        resizeMode: 'contain',
    },
    text: {
        color: '#F04E23',
        fontSize: 13,
        fontWeight: '500',
    },
    cashbackContainer: {
        width: width,
        paddingHorizontal: 12,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 8
    },
    cashbackTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    couponDescriptionText: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    savedText: {
        fontSize: 13,
    },
    highlightedText: {
        fontWeight: 'bold',
        color: '#FF6F00',
        fontSize: 18
    },
});