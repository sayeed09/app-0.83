import { BaseView } from '@components/base/view';
import { CustomText } from '../../../../AndroidFontFix';
import { VariantAdditionalResponse } from "models/product-details/product";
import React from "react";
import { Text, View } from "react-native";
import { commonStyles } from "styles/common";
import { width } from "utils/constants";

interface Props {
    variantAdditionalDetails: VariantAdditionalResponse;

}
const Info = ({ variantAdditionalDetails }: Props) => (<BaseView
    AlignLeft
    style={[
        commonStyles.fs14,
        {
            borderColor: '#D9D9D9',
            borderWidth: 1,
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 16,

        },
    ]}
>
    <BaseView
        row
        style={[
            commonStyles.fs14,
            {
                flex: 1,
                borderBottomColor: '#D9D9D9',
                borderBottomWidth: 1,
                backgroundColor: '#f5f5f5',
            },
        ]}
        AlignLeft
    >
        <Text style={{ width: width / 3, color: '#000', padding: 16 }}>
            Net Quantity
        </Text>
        <Text
            style={{
                flex: 1,
                flexWrap: 'wrap',
                padding: 16,
                backgroundColor: '#fff',
            }}
        >
            {variantAdditionalDetails.data.variants[0]?.formatted_quantity}
        </Text>
    </BaseView>
    <BaseView
        row
        style={{
            flex: 1,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            backgroundColor: '#f5f5f5',
        }}
        AlignLeft
    >
        <Text style={{ width: width / 3, color: '#000', padding: 16 }}>
            Marketed By
        </Text>
        <Text
            style={{
                flex: 1,
                width,
                flexWrap: 'wrap',
                padding: 16,
                backgroundColor: '#fff',
            }}
        >
            <CustomText style={{ fontWeight: 'bold' }}>
                {
                    variantAdditionalDetails?.data?.variants[0]?.inventory_details
                        .sold_by.name
                }{' '}
            </CustomText>{' '}
            :{' '}
            {
                variantAdditionalDetails?.data?.variants[0].inventory_details
                    .sold_by.address
            }
        </Text>
    </BaseView>
    <BaseView
        row
        style={{
            flex: 1,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            backgroundColor: '#f5f5f5',
        }}
        AlignLeft
    >
        <Text style={{ width: width / 3, color: '#000', padding: 16 }}>
            Manufactured By
        </Text>
        <BaseView flex={1} AlignLeft>
            <View
                style={[
                    commonStyles.wAuto,
                    {
                        flex: 1,
                        width,
                        flexWrap: 'wrap',
                        padding: 16,
                        backgroundColor: '#fff',
                    },
                ]}
            >
                <Text style={[commonStyles.wAuto, { fontWeight: 'bold' }]}>
                    {
                        variantAdditionalDetails?.data?.variants[0].inventory_details
                            .manufatured_by.address
                    }
                </Text>
            </View>
        </BaseView>
    </BaseView>
    <BaseView
        row
        style={{
            flex: 1,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            backgroundColor: '#f5f5f5',
        }}
        AlignLeft
    >
        <Text style={{ width: width / 3, color: '#000', padding: 16 }}>
            Expiry Date
        </Text>
        <Text style={{ width, padding: 16, backgroundColor: '#fff' }}>
            {' '}
            {
                variantAdditionalDetails?.data?.variants[0].inventory_details
                    .expiry_date
            }
        </Text>
    </BaseView>
    <BaseView
        row
        style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
        }}
        AlignLeft
    >
        <Text style={{ width: width / 3, color: '#000', padding: 16 }}>
            Country of Origin
        </Text>
        <View
            style={{ width, padding: 16, backgroundColor: '#fff', height: 70 }}
        >
            <Text style={{ width }}>INDIA</Text>
        </View>
    </BaseView>
</BaseView>


);

export default Info;