import React from 'react';
import { Text, View } from 'react-native';
import { BaseView } from '@components/base/view';
import { commonStyles } from '@styles/common';
import { width } from '@utils/constants';
import { CustomText } from '../../../AndroidFontFix';
import {
  IFrequentlyAskedQuestion,
  VariantAdditionalResponse,
  IReview,
} from 'models/product-details/product';

export const FAQ = (data: IFrequentlyAskedQuestion[]) => (
  <View>
    {data?.map((res, index) => (
      <View
        key={index}
        style={[commonStyles.flexColumn, commonStyles.mb16]}
      >
        <Text
          style={[
            commonStyles.fs14,
            commonStyles.fw500,
            commonStyles.mb8,
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
  </View>
);

export const ProductInformation = (
  variantAdditionalDetails: VariantAdditionalResponse,
) => {
  return (
    <>
      <BaseView
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
          <Text style={{ width: width / 3, color: '#7E7E7E', padding: 16 }}>
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
          <Text style={{ width: width / 3, color: '#7E7E7E', padding: 16 }}>
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
          <Text style={{ width: width / 3, color: '#7E7E7E', padding: 16 }}>
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
          <Text style={{ width: width / 3, color: '#7E7E7E', padding: 16 }}>
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
          <Text style={{ width: width / 3, color: '#7E7E7E', padding: 16 }}>
            Country of Origin
          </Text>
          <View
            style={{ width, padding: 16, backgroundColor: '#fff', height: 70 }}
          >
            <Text style={{ width }}>INDIA</Text>
          </View>
        </BaseView>
      </BaseView>
    </>
  );
};
