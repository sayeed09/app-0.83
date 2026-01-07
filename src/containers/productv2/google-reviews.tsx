import Header from "components/productv2/common/header";
import { FlatListSlider } from "components/shared/flatlist-slider/flatlist-slider";
import { GoogleReviews as GoogleReviewsModel, Review } from "models/product-details/productv2";
import React from "react";
import { Image, Text, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import SvgRenderer from "react-native-svg-renderer";
import { GoogleReviewsStyle } from "styles/productv2";
import { width } from "utils/constants";

interface Props {
    googleReview: GoogleReviewsModel;
    header?: string;
}
const RenderGoogleReview = props => {
    const { item }: { item: Review } = props;
    return <View style={GoogleReviewsStyle.reviewItem} key={item.reviewer}>
        <View style={GoogleReviewsStyle.reviewItemContainer}>
            <View style={GoogleReviewsStyle.iconContainer}>
                <Image source={{ uri: item.image }} width={40} height={40} />
                <Text style={GoogleReviewsStyle.reviewer}>{item.reviewer}</Text>
            </View>
            <StarRatingDisplay
                rating={item.rating}
                color={'#FECC0E'}
                starSize={12}
                starStyle={{ marginHorizontal: 1 }}
            />
            <Text style={GoogleReviewsStyle.reviewDesc}>{item.review}</Text>
        </View>

    </View>
}
const GoogleReviews = ({ googleReview, header }: Props) => (<View style={GoogleReviewsStyle.container}>
    {header ? <Header sectionHeader={header} /> : null}
    <View style={GoogleReviewsStyle.ratingContainer}>
        <SvgRenderer width={38} source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/google-icon-logo_1.svg?v=1723620685' }} />
        <Text style={GoogleReviewsStyle.ratingTxt}>{googleReview.ratings.toFixed(1)}</Text>
        <StarRatingDisplay
            rating={googleReview.ratings}
            color={'#FECC0E'}
            starSize={21}
            starStyle={{ marginHorizontal: 1 }}
        />
    </View>
    <View style={GoogleReviewsStyle.totalreviewContainer}>
        <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/verified.svg?v=1723651884' }} />
        <Text style={GoogleReviewsStyle.reviewTxt}>{googleReview.totalReviews}+ reviews</Text>
    </View>
    <View style={GoogleReviewsStyle.horizontalLine} />

    <View style={GoogleReviewsStyle.reviewListContainer}>
        <FlatListSlider
            data={googleReview.reviews || []}
            width={width}
            component={<RenderGoogleReview />}
            indicatorActiveWidth={20}
            indicatorActiveColor="#6BBD58"
            indicatorCount={googleReview.reviews?.length || 0}
            autoscroll={false}
            loop={false}
        />
    </View>

</View>)
export default GoogleReviews;