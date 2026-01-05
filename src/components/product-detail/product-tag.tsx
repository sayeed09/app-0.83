import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

interface Props {
    attractor: string;
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 8,
        marginBottom: 4,
    },
    text: {
        textAlign: 'center',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    expertRecommendedText: {
        color: '#006E5A',
    },
    expertRecommendedBg: {
        backgroundColor: '#FECC0E',
    },
    otherTagsText: {
        color: '#fff',
    },
    otherTagBg: {
        backgroundColor: '#d9314e'
    },
    opacityZero: {
        opacity: 0
    }
})
const ProductTag = ({ attractor }: Props) => {
    const isExpert = attractor === "Expert Recommended";
    return <View style={[
        styles.container, isExpert ? styles.expertRecommendedBg
            : styles.otherTagBg, !attractor ? styles.opacityZero : {}]}>
        <Text style={[styles.text, isExpert ? styles.expertRecommendedText :
            styles.otherTagsText]}>{attractor}</Text></View >
};
export default ProductTag;