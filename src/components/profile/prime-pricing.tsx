import { ProductCatalogResponse } from 'models/product-details/product'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { fetchProductById } from 'services/product'
import { commonStyles } from 'styles/common'
import { ozivaPrimeProductId } from 'utils/constants'
import { formatCurrencyWithSymbol } from 'utils/currency-utils'

const PrimePricing = () => {
    const [primeProductDetails, setPrimeProductDetails] =
    useState<ProductCatalogResponse>();
    const getPrimeProductDetails = async () => {
        const productDetails = await fetchProductById(
          ozivaPrimeProductId.toString(),
        );
        setPrimeProductDetails(productDetails);
      };
    
      useEffect(() => {
        getPrimeProductDetails();
      }, []);
    
    return (
        <>

            <View style={{ marginVertical: 16 }}>
                <Text style={[commonStyles.fs12, commonStyles.grayColor]}>
                    <>
                        MRP: <Text style={[commonStyles.strikeText, commonStyles.grayColor]}>
                            {primeProductDetails && primeProductDetails.data.variants[0].compareAtPrice && formatCurrencyWithSymbol(primeProductDetails.data.variants[0].compareAtPrice)}
                        </Text>
                        <Text style={[commonStyles.fs16, commonStyles.BlackColor, commonStyles.fwBold]}>{` `}{primeProductDetails && primeProductDetails.data.variants[0].compareAtPrice && formatCurrencyWithSymbol(primeProductDetails.data.variants[0].price)}</Text>
                    </>
                </Text>
                <Text style={[commonStyles.redColor, commonStyles.fs12]}>You save: {primeProductDetails && primeProductDetails.data.variants[0].compareAtPrice && formatCurrencyWithSymbol(primeProductDetails.data.variants[0].compareAtPrice - primeProductDetails.data.variants[0].price)}</Text>
            </View>

        </>
    )
}

export default PrimePricing