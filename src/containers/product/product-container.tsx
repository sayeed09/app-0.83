import WhiteCard from "components/elements/card/white-card";
import BenefitChips from "components/product-detail/benefit-chips";
import ProductConsumerStudies from "components/product-detail/consumer-studies";
import HowToUse from "components/product-detail/howtouse";
import ProductLoveByThousands from "components/product-detail/love-by-thousands";
import ProductOptions from "components/product-detail/options";
import ProductPeopleAlsoBought from "components/product-detail/people-also-bought";
import ProductDescription from "components/product-detail/product-description";
import ProductImagesSlider from "components/product-detail/product-images-slider";
import ProductInfo from "components/product-detail/product-info";
import ProductRecommendedByExperts from "components/product-detail/recommended-by-experts";
import { WhatMakesItGood, AndEvenBetter } from "components/product-detail/wmig-even-better";
import CustomerReviews from "containers/shop/customer-reviews";
import ProductOffers from "containers/shop/product-offers";
import { IImage, VariantAdditionalResponse, IOption, IVariant, IConsumerStudy, ILovedByThousand, IHowToUse, IWhatMakesItGood, IScientificallyTested, IRecommendedByExperts, IFrequentlyAskedQuestion, IProductResponse } from "models/product-details/product";
import React from "react";
import { View } from "react-native";
import TitleAndReview from 'components/product-detail/title-review';
import FrequentlyAskedQuestions from 'components/product-detail/faq';
import { Product } from 'models/product';
import ProductBadges from "containers/productv2/product-badges";


interface Props {
    selectedVariant: IVariant;
    productDetails: IProductResponse;
    navigation: any;
    variantAdditionalDetails: VariantAdditionalResponse;
    productId: string;
    productVariantImages: IImage[] | undefined;
    productAdditionalDetails: Product | undefined;
    setProductAdditionalDetail: React.Dispatch<
        React.SetStateAction<Product | undefined>
    >;
    handleVariantSelection: (variant: any) => void;
    scrollToBottom: (y) => void
}
const ProductContainer = ({
    navigation,
    productDetails,
    selectedVariant,
    productId,
    productVariantImages,
    productAdditionalDetails,
    variantAdditionalDetails,
    setProductAdditionalDetail,
    handleVariantSelection,
    scrollToBottom
}
    : Props) => {
    let dataSourceCords = 0;

    return <><WhiteCard noBorderRadius noPadding>
        <ProductImagesSlider
            navigation={navigation}
            images={productVariantImages as IImage[]}
            toShowPreviewImageOnPDP={true}
        />
        <View style={{ padding: 16 }}>
            <TitleAndReview
                productId={productId}
                title={productDetails.title as string}
                setProductAdditionalDetail={setProductAdditionalDetail}
                productAdditionalDetails={productAdditionalDetails as Product}
                scrollToBottom={() => { scrollToBottom(dataSourceCords) }}
                variantAdditionalDetails={
                    variantAdditionalDetails as VariantAdditionalResponse
                }
            />
            <BenefitChips
                benefits={productDetails.benefits as string[]}
            />
        </View>
    </WhiteCard>
        <ProductOptions
            options={productDetails.options as IOption[]}
            selectedVariant={selectedVariant as IVariant}
            variants={productDetails.variants as IVariant[]}
            variantImages={productDetails.images as IImage[]}
            handleVariantSelection={variant => handleVariantSelection(variant)}
        />

        <ProductOffers
            productId={productId}
            variantId={selectedVariant?.id}
        />
        <ProductBadges />

        <ProductDescription
            description={productDetails.description as string}
        />
        <ProductConsumerStudies
            data={productDetails.consumerStudy as IConsumerStudy}
        />
        <ProductLoveByThousands
            data={productDetails.lovedByThousand as ILovedByThousand}
        />
        <HowToUse data={productDetails.howToUse as IHowToUse} />
        <WhatMakesItGood
            data={productDetails.whatMakesItGood as IWhatMakesItGood}
        />
        <AndEvenBetter
            data={
                productDetails.scientificallyTested as IScientificallyTested
            }
        />
        <ProductRecommendedByExperts
            data={
                productDetails.recommendedByExperts as IRecommendedByExperts
            }
        />
        <FrequentlyAskedQuestions
            data={productDetails.faq as IFrequentlyAskedQuestion[]}
        />
        <ProductInfo
            variantAdditionalDetails={
                variantAdditionalDetails as VariantAdditionalResponse
            }
        />
        <ProductPeopleAlsoBought
            variantIds={
                productDetails.variants.map(item => item.id) as string[]
            }
            navigation={navigation}
        />
        <View
            onLayout={event => {
                const layout = event.nativeEvent.layout;
                dataSourceCords = layout.y;
            }}
        >
            <CustomerReviews
                productId={productId}
                navigation={navigation}
                product={{
                    id: selectedVariant?.id as string,
                    title: productDetails.title as string,
                    image: productDetails.images[0].src as string,
                }}
                productAdditionalDetails={productAdditionalDetails as Product}
            />
        </View >
    </>

}

export default ProductContainer;