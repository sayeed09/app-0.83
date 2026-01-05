import React from 'react';
import { Image, Text, View } from 'react-native';
import { commonStyles } from '@styles/common';
import { ViewWrapper } from 'components/styled/common';


const getItem = (text1, text2, image) => (<View
    style={[commonStyles.alignCenter, commonStyles.flex]}
>
    <View
        style={[
            commonStyles.mb8,
            commonStyles.pad4,
            // commonStyles.borderAll,
            {
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
            },
        ]}
    >
        <Image source={{ uri: image }} width={40} height={40} />
    </View>
    <Text style={[commonStyles.fs12, commonStyles.textCenter]}>
        {text1}
    </Text>
    <Text style={[commonStyles.fs12, commonStyles.textCenter]}>
        {text2}
    </Text>
</View>)
const ProductBadges = () => (<View
    style={[
        // commonStyles.borderTop,
        commonStyles.pad8,
        commonStyles.bgWhite,
    ]}
>
    <ViewWrapper style={[commonStyles.flexColumn, commonStyles.alignStart]}>
        <View
            style={[
                commonStyles.flexD,
                commonStyles.mt16,
                commonStyles.alignCenter,
            ]}
        >
            {getItem('Potent Plant', 'Based', 'https://cdn.shopify.com/s/files/1/2393/2199/files/Plant_Based_fc43f992-708e-4ceb-8351-09a6bd9d51c4.png?v=1731055107')}
            {getItem('No Side', 'Effects', 'https://cdn.shopify.com/s/files/1/2393/2199/files/No_Side_Effects_07e53ea8-02a0-4ab5-9956-70d847b5178e.png?v=1731055107')}
            {getItem('Fast', 'Delivery', 'https://cdn.shopify.com/s/files/1/2393/2199/files/Free_Shipping_884d30f6-49aa-4ee3-9ed7-2635a021aa1f.png?v=1731055107')}
            {getItem('Secure', 'Payments', 'https://cdn.shopify.com/s/files/1/2393/2199/files/Secure_Payments_ca26cd42-afed-457a-91ee-a6304c3ea1d6.png?v=1731055464')}

        </View>
    </ViewWrapper>
</View>
)

export default ProductBadges;
