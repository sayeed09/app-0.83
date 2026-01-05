import { Product } from "models/product";
import { IClinicalStudy, INewBenefit } from "models/product-details/product";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { TitleReviewStyle } from "styles/productv2";
import { width } from "utils/constants";
import ClinicalStudy from "./clinical-study";


interface Props {
    title: string;
    newBenefitChips?: INewBenefit;
    productAdditionalDetails: Product;
    clinicalStudies: IClinicalStudy;
    scrollToBottom: () => void;
}

const TitleAndReviewv2 = ({ title, newBenefitChips, productAdditionalDetails, clinicalStudies, scrollToBottom }: Props) => (
    <View>
        <Text style={TitleReviewStyle.txt} >
            {title}
        </Text>
        <View style={TitleReviewStyle.withRatingsContainer}>
            {newBenefitChips?.for &&
                <View style={TitleReviewStyle.withContainer}>
                    <View style={TitleReviewStyle.item}>
                        <Text style={TitleReviewStyle.forTxt}>FOR</Text>
                        <Text style={TitleReviewStyle.descTxt}>{newBenefitChips?.for}</Text>
                    </View>
                    <View style={TitleReviewStyle.item}>
                        <Text style={TitleReviewStyle.forTxt}>WITH</Text>
                        <Text style={TitleReviewStyle.descTxt}>{newBenefitChips?.with}</Text>
                    </View>
                </View>}
            {+productAdditionalDetails?.averageRating > 0 &&
                <TouchableOpacity onPress={() => { scrollToBottom() }} style={TitleReviewStyle.reviewSec} >
                    <View style={TitleReviewStyle.reviewContainer}>
                        <Text style={TitleReviewStyle.reviewstxt}>{productAdditionalDetails?.averageRating}</Text>
                        <StarRatingDisplay
                            rating={+productAdditionalDetails?.averageRating}
                            color={'#FECC0E'}
                            starSize={12}
                            starStyle={{ marginHorizontal: 3 }}
                            maxStars={1}
                        />
                        <View style={TitleReviewStyle.horizontalLine} />
                        <Text style={TitleReviewStyle.reviewstxt}>{productAdditionalDetails?.numberOfReviews} Reviews</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
        <ClinicalStudy clinicalStudies={clinicalStudies?.data} />
    </View>
);

export default TitleAndReviewv2;