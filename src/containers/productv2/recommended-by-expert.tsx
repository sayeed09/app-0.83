import Header from "components/productv2/common/header";
import { IRecommendedByExperts } from "models/product-details/product";
import React from "react";
import { Image, Text, View } from "react-native";
import { RecommendedByExpertStyle } from "styles/productv2";

const title = `<p>Recommended By <strong>Experts</strong></p>`;

const RecommendedByExpert = ({ recommendedByExperts }: { recommendedByExperts: IRecommendedByExperts }) => (recommendedByExperts?.description ?
    <View style={RecommendedByExpertStyle.container}>
        <Header sectionHeader={title} />

        <View style={RecommendedByExpertStyle.viewContainer}>
            <Image source={{ uri: recommendedByExperts.image }} width={70} height={70} />
            <View style={RecommendedByExpertStyle.txtContainer}>
                <Text style={RecommendedByExpertStyle.description}>{recommendedByExperts.description}</Text>
                <Text style={RecommendedByExpertStyle.expertName}>{recommendedByExperts.title}</Text>
            </View>
        </View>
    </View > : null)

export default RecommendedByExpert;