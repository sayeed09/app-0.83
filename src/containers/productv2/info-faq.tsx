import Header from "components/productv2/common/header";
import FAQ from "components/productv2/product-info-faq/faq";
import Info from "components/productv2/product-info-faq/info";
import { IFrequentlyAskedQuestion, VariantAdditionalResponse } from "models/product-details/product";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ProductInfoAndFAQtyle } from "styles/productv2";

interface Props {
    faq: IFrequentlyAskedQuestion[];
    variantAdditionalDetails: VariantAdditionalResponse;
}

const ProductInfoAndFaq = ({ faq, variantAdditionalDetails }: Props) => {
    const [selectedTab, setSelectedTab] = useState(faq?.length > 0 ? 'Faq' : 'Info');
    return <View style={ProductInfoAndFAQtyle.container}>
        {faq?.length > 0 && variantAdditionalDetails ?
            <View style={ProductInfoAndFAQtyle.tabsContainer}>
                <TouchableOpacity onPress={() => setSelectedTab("Faq")} style={[ProductInfoAndFAQtyle.tab, ProductInfoAndFAQtyle.tab1, selectedTab === "Faq" ? ProductInfoAndFAQtyle.active : {}]}>
                    <Text style={ProductInfoAndFAQtyle.tabTxt}>Frequently Asked Questions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab("Info")} style={[ProductInfoAndFAQtyle.tab, ProductInfoAndFAQtyle.tab2, selectedTab === "Info" ? ProductInfoAndFAQtyle.active : {}]}>
                    <Text style={ProductInfoAndFAQtyle.tabTxt}>Product Details</Text>
                </TouchableOpacity>
            </View>
            :
            faq?.length > 0 || variantAdditionalDetails ?
                <Header sectionHeader={faq?.length > 0 ? `<p><strong>Frequently </strong>Asked Questions</p>` : `<p><strong>Product </strong>Details</p>`} />
                : null}

        <View style={ProductInfoAndFAQtyle.tabItems}>
            {selectedTab == "Faq" && faq?.length > 0 && <FAQ faq={faq} />}
            {selectedTab == "Info" && variantAdditionalDetails && <Info variantAdditionalDetails={variantAdditionalDetails} />}
        </View>
    </View >

};
export default ProductInfoAndFaq;