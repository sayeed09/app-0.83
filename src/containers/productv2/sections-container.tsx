import { Comparison, Section, GoogleReviews as GoogleReviewsModel, ArticleSection, IconDescription as IconDescriptionModel } from "models/product-details/productv2";
import React from "react";
import GoogleReviews from "./google-reviews";
import ImageComparison from "./image-comparison";
import { getImageList } from "utils/product";
import { IProductResponse } from "models/product-details/product";
import Articles from "./articles";
import IconDescriptionContainer from "./icon-description";
import Banner from "./banner";
import { FlatList, View } from "react-native";

interface Props {
    productDetails: IProductResponse;
    itemRef: React.MutableRefObject<View | null>;
}
const SectionsContainer = ({ productDetails, itemRef }: Props) => {
    const ComparisonImage = ({ item }: { item: Section }) => item ? <ImageComparison headerSection={item?.header as string} imageComparisons={getImageList(item?.comparisons as Comparison[])} /> : null;
    const Article = ({ item }: { item: Section }) => item ? <Articles itemRef={itemRef} sectionHeader={item.header as string} articleSection={item.articleSection as ArticleSection[]} /> : null;
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
    return <>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={productDetails?.sections}
            renderItem={({ item }) => {
                const ComponentToRender = componentsMap[item.type];
                return ComponentToRender ? <ComponentToRender item={item} /> : null;
            }}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled
        />
        {/* {productDetails?.sections?.map((item, index) => {
            const ComponentToRender = componentsMap[item.type];
            return ComponentToRender ? <ComponentToRender item={item} key={index} /> : null;
        })} */}



    </>
}
export default SectionsContainer;