import React, { useEffect } from 'react';
import ProductImagesSlider from 'components/product-detail/product-images-slider';
import TitleAndReviewv2 from 'components/productv2/title-review/title';
import GoogleReviews from 'containers/productv2/google-reviews';
import TrustBadges from 'containers/trust-badges';
import { IImage } from 'models/product-details/product';
import { ScrollView, View } from 'react-native';
import Loader from 'components/elements/loader/loader';
import { IVariantDetailsState } from 'models/shop/cart';
import useCart from 'hooks/cart';


interface IProps {
    navigation: any;
    productId: any;
    variantDetails: IVariantDetailsState;
}
const CartItemPopupContent = ({ navigation, productId, variantDetails,  }: IProps) => {

    const { getProductDetails, productDetail, productAdditionalDetails, googleReviews, imageList } = useCart();
    
    useEffect(() => {
        if (productId) getProductDetails(productId, variantDetails);
    }, [productId]);

    if (!productDetail) return (
        <>
            <Loader />
        </>
    );

    return (
        <ScrollView style={{ paddingRight: 30 }}>
            <TitleAndReviewv2
                title={variantDetails.variantTitle}
                newBenefitChips={productDetail?.newBenefitChips}
                productAdditionalDetails={productAdditionalDetails}
                clinicalStudies={productDetail.clinicalStudies}
                scrollToBottom={() => { }}
            />

            <ProductImagesSlider
                navigation={navigation}
                images={imageList as IImage[]}
                toShowPreviewImageOnPDP={false}
            />
            {
                googleReviews ? (
                    <GoogleReviews googleReview={googleReviews} header={'<p><strong>Google</strong>&nbsp;Reviews</p>' as string} />
                ) : null
            }

            {/* Badges */}
            <View style={{marginBottom: 32, marginTop: 16}}>
                <TrustBadges />
            </View>
        </ScrollView>
    );
};

export default React.memo(CartItemPopupContent);