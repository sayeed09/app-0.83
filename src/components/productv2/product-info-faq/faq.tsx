import { IFrequentlyAskedQuestion } from "models/product-details/product";
import React from "react";
import { Text, View } from "react-native";
import { commonStyles } from "styles/common";

interface Props {
    faq: IFrequentlyAskedQuestion[];
}
const FAQ = ({ faq }: Props) => (<View>
    {faq?.map((res, index) => (
        <View
            key={index}
            style={[commonStyles.flexColumn, commonStyles.mb16]}
        >
            <Text
                style={[
                    commonStyles.fs16,
                    commonStyles.fw500,
                    commonStyles.mb4,
                    commonStyles.BlackColor,
                ]}
            >
                {res?.question}
            </Text>
            <Text style={[commonStyles.fs14, { flex: 1, flexWrap: 'wrap' }]}>
                {res?.answer}
            </Text>
        </View>
    ))}
</View>);

export default FAQ;