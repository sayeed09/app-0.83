import React, { useCallback, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import WhiteCard from "components/elements/card/white-card";
import ProductOptions from "components/product-detail/options";
import ProductImagesSlider from "components/product-detail/product-images-slider";
import CustomerReviews from "containers/shop/customer-reviews";
import ProductOffers from "containers/shop/product-offers";
import { IImage, VariantAdditionalResponse, IOption, IVariant, IProductResponse } from "models/product-details/product";
import { Product } from "models/product";
import ProductBadges from "./product-badges";
import RecommendedByExpert from "./recommended-by-expert";
import ProductInfoAndFaq from "./info-faq";
import TitleAndReviewv2 from "components/productv2/title-review/title";
import { Comparison, Section, GoogleReviews as GoogleReviewsModel, ArticleSection, IconDescription as IconDescriptionModel } from "models/product-details/productv2";
import { getImageList } from "utils/product";
import Articles from "./articles";
import GoogleReviews from "./google-reviews";
import IconDescriptionContainer from "./icon-description";
import ImageComparison from "./image-comparison";
import Banner from "./banner";
import ValueCommunication from "components/productv2/value-communication";
import { ScrollView } from "react-native-gesture-handler";
import { height } from "utils/constants";

interface Props {
    selectedVariant: IVariant;
    productDetails: IProductResponse;
    navigation: any;
    variantAdditionalDetails: VariantAdditionalResponse;
    productId: string;
    productVariantImages: IImage[] | undefined;
    productAdditionalDetails: Product | undefined;
    handleVariantSelection: (variant: any) => void;
}

const ProductContainerV2 = ({
    navigation,
    productDetails,
    selectedVariant,
    productId,
    productVariantImages,
    productAdditionalDetails,
    variantAdditionalDetails,
    handleVariantSelection,
}: Props) => {
    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };
    const flatListRef = useRef<ScrollView>(null);
    const [articleSectionFocused, setArticleSectionFocused] = useState(false);
const firstFoldSections = [
        {
            key: "titleAndReview",
            render: () => (
                <TitleAndReviewv2
                    title={
                        variantAdditionalDetails?.data?.title || productDetails.title
                    }
                    newBenefitChips={productDetails?.newBenefitChips}
                    productAdditionalDetails={productAdditionalDetails as Product}
                    clinicalStudies={productDetails.clinicalStudies}
                    scrollToBottom={() => scrollToItem(sections.length - 1)}
                />
            ),
        },
        {
            key: "productImages",
            render: () => (
                <ProductImagesSlider
                    navigation={navigation}
                    images={productVariantImages as IImage[]}
                    toShowPreviewImageOnPDP={true}
                />
            ),
        },
        {
            key: "productOptions",
            render: () => (
                <ProductOptions
                    options={productDetails.options as IOption[]}
                    selectedVariant={selectedVariant as IVariant}
                    variants={productDetails.variants as IVariant[]}
                    variantImages={productDetails.images as IImage[]}
                    handleVariantSelection={handleVariantSelection}
                />
            ),
        },
        {
            key: "valueCommunication",
            render: () => <ValueCommunication selectedVariant={selectedVariant} variantImage={productDetails.images.filter(item => item.id == selectedVariant?.imageId)} />,
        },
        {
            key: "productBadges",
            render: () => <ProductBadges />,
        },
        {
            key: "recommendedByExpert",
            render: () => (
                <RecommendedByExpert
                    recommendedByExperts={productDetails.recommendedByExperts}
                />
            ),
        },
        {
            key: "productOffers",
            render: () => (
                <ProductOffers
                    productId={productId}
                    variantId={selectedVariant?.id}
                    v2={true}
                />
            ),
        },

    ];

    const secondFoldSections = [{
        key: "productInfoAndFaq",
        render: () => (
            <ProductInfoAndFaq
                faq={productDetails?.faq}
                variantAdditionalDetails={
                    variantAdditionalDetails as VariantAdditionalResponse
                }
            />
        ),
    },
    {
        key: "customerReviews",
        render: () => (
            <View>
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
            </View>
        ),
    }];
    const ComparisonImage = ({ item }: { item: Section }) => item ? <ImageComparison headerSection={item?.header as string} imageComparisons={getImageList(item?.comparisons as Comparison[])} /> : null;
    const Article = ({ item }: { item: Section }) => item ? <Articles sectionHeader={item.header as string}
        articleSection={item.articleSection as ArticleSection[]} articleSectionFocused={articleSectionFocused} /> : null;
    const IconDescription = ({ item }: { item: Section }) => item ? <IconDescriptionContainer sectionHeader={item.header as string} iconDescriptions={item.iconDescriptions as IconDescriptionModel[]} /> : null;
    const Image = ({ item }: { item: Section }) => item ? <Banner title={item?.header} image={item.mobile as string} /> : null
    const GoogleReview = ({ item }: { item: Section }) => item ? <GoogleReviews googleReview={item.googleReview as GoogleReviewsModel} header={item.header as string} /> : null;

    const componentsMap = {
        ComparisonImage,
        Article,
        IconDescription,
        Image,
        GoogleReview,
    };
    const MemoizedComponentToRender = React.memo(({ item, ComponentToRender }: any) => (
        <ComponentToRender item={item} />
    ));

    const dynamicSections: any = productDetails?.sections?.map((item, index) => {
        const ComponentToRender = componentsMap[item.type];

        return ComponentToRender ?
            {
                key: item.type + index,
                render: () => (
                    <MemoizedComponentToRender item={item} ComponentToRender={ComponentToRender} />
                )
            } : null;
    }).filter(Boolean) || [];


    const scrollToItem = (index: number) => {
        flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0, // Center the item in the viewport
        });
    };

    const sections = [...firstFoldSections, ...dynamicSections, ...secondFoldSections];

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        viewableItems.forEach((item: any) => {
            if (item.item.key.indexOf('Article') > -1 && !articleSectionFocused)
                setArticleSectionFocused(true)
        });
    };

    const handleScrollToIndexFailed = (info: any) => {
        if (info.index < sections.length) {
            info.highestMeasuredFrameIndex
            setTimeout(() => {
                // this is done to handle, scroll to non rendered items;
                // fallback added to scroll on info,index again.
                flatListRef.current?.scrollToIndex({ index: info.index, animated: true })
                flatListRef.current?.scrollToIndex({ index: info.highestMeasuredFrameIndex, animated: true })
                flatListRef.current?.scrollToIndex({ index: info.index, animated: true })
            }, 300);
        }
    };

    return (
        <WhiteCard noBorderRadius noPadding style={{ flex: 1 }}>
            <FlatList
                data={sections}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => item.render()}
                initialNumToRender={2}
                maxToRenderPerBatch={5}
                windowSize={5}
                ref={flatListRef}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                removeClippedSubviews
                initialScrollIndex={0}
                onScrollToIndexFailed={handleScrollToIndexFailed}
            />
        </WhiteCard >
    );
};

export default ProductContainerV2;