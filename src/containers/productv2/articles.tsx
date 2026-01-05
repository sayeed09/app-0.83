import AnimatedNumber from "components/productv2/articles/animate-number";
import ArticleList from "components/productv2/articles/list";
import Header from "components/productv2/common/header";
import { Image } from "expo-image";
import { Article as ArticleModel, ArticleSection } from "models/product-details/productv2";
import React, { useEffect, useState } from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { ArticlesStyle } from "styles/productv2";

interface Props {
    sectionHeader: string;
    articleSection: ArticleSection[];
    articleSectionFocused: boolean;
}

const Articles = ({ sectionHeader, articleSection, articleSectionFocused }: Props) => {
    const [selectedArticleSec, setSelectedArticleSec] = useState<ArticleSection>();
    const [selectedArticle, setSelectedArticle] = useState<ArticleModel>();
    const [animateToNumberList, setAnimateToNumberList] = React.useState(new Array(articleSection.length).fill(0));

    useEffect(() => {
        if (articleSectionFocused)
            setTimeout(() => {
                setAnimateToNumberList(articleSection.map((item) => item.articles.length))
            }, 500)
    }, [articleSectionFocused])
    useEffect(() => {
        if (selectedArticleSec && selectedArticleSec.articles.length == 1) {
            setSelectedArticle(selectedArticleSec.articles[0])
        }
    }, [selectedArticleSec]);

    const resetValues = () => {
        setSelectedArticleSec(undefined);
        setSelectedArticle(undefined)
    }
    return <View style={ArticlesStyle.container}>
        <Header sectionHeader={sectionHeader} />

        <View style={ArticlesStyle.section}>
            {articleSection.map((item, index) => <TouchableNativeFeedback key={item.sectionTitle} onPress={() => setSelectedArticleSec(item)}>

                <View style={ArticlesStyle.item}>
                    <View style={ArticlesStyle.countSec}>
                        <AnimatedNumber style={ArticlesStyle.count} number={animateToNumberList[index]} />
                    </View>
                    <Text style={ArticlesStyle.sectionTitle}>
                        {item.sectionTitle}
                    </Text>
                    <Image style={ArticlesStyle.arrowIcon} source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right_cf094bdc-8b99-4fc6-a4b6-58bf78a7f46f.png?v=1742907669' }} />
                </View>
            </TouchableNativeFeedback>
            )}
        </View>

        {selectedArticleSec && selectedArticleSec.articles.length > 1 &&
            <ArticleList
                selectedArticleSec={selectedArticleSec as ArticleSection}
                setSelectedArticleSec={resetValues} setSelectedArticle={setSelectedArticle}
                selectedArticle={selectedArticle}
            />
        }


    </View>
}
export default Articles;