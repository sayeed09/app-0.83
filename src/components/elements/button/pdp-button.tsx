import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from 'styles/common';
import WhiteCard from '../card/white-card';
import { FooterStyle } from 'styles/productv2';
import { resizeImageForDevice } from 'utils/image-utils';
import SvgRenderer from 'react-native-svg-renderer';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

interface PDPButtonProps {
    ratings?: string;
    price: number;
    compareAtPrice: number;
    title: string;
    onPress: () => void;
    disabled?: boolean;
    productImage: string;
}

const PDPButton = (props: PDPButtonProps): React.ReactElement => {
    const savings = props.compareAtPrice - props.price;

    return (
        <WhiteCard noBorderRadius noPadding style={[commonStyles.pad8, commonStyles.flex]}>
            <View style={FooterStyle.container}>

                <View style={FooterStyle.thumbnailContainer}>
                    <Image
                        width={40}
                        height={40}
                        source={{ uri: resizeImageForDevice(props.productImage, 100) }}
                    />
                    <Text style={FooterStyle.ratingsText}>{props.ratings}</Text>
                    <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/0366/1004/8044/files/filled_star.svg?v=1724055254' }} width={12} height={12} />
                </View>
                <TouchableOpacity style={[FooterStyle.btn, props.disabled ? commonStyles.loading : {}]}
                    onPress={() => { !props.disabled && props.onPress() }}>
                    <View style={commonStyles.flexColumn}>
                        <View style={[commonStyles.flex, commonStyles.flexRow, commonStyles.alignCenter]}>
                            <Text style={FooterStyle.mrpText}>MRP:</Text>
                            {savings > 0 ? <Text style={[FooterStyle.mrpText, commonStyles.strikeText]}> {formatCurrencyWithSymbol(props.compareAtPrice)}</Text> : null}
                            <Text style={FooterStyle.sellingText}> {formatCurrencyWithSymbol(props.price)}</Text>
                        </View>
                        <View>
                            {savings > 0 ?
                                <Text style={FooterStyle.saveText}>Save : {formatCurrencyWithSymbol(savings)}</Text>
                                : null}
                        </View>
                    </View>
                    <View>
                        <Text style={FooterStyle.buyNow}>
                            {props.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </WhiteCard>
    );
};

export default PDPButton;
