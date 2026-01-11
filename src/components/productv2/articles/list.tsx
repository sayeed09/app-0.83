import FastImage from '@d11/react-native-fast-image';
import OZModal from 'components/modal';
import { Article as ArticleModel, ArticleSection } from "models/product-details/productv2";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ArticlesStyle } from 'styles/productv2';
import Article from './article';


interface Props {
    selectedArticleSec: ArticleSection;
    setSelectedArticleSec: React.Dispatch<React.SetStateAction<ArticleSection | undefined>>;
    setSelectedArticle: React.Dispatch<React.SetStateAction<ArticleModel | undefined>>;
    selectedArticle: ArticleModel | undefined;
}
const List = ({ articles, setSelectedArticle }: { articles: ArticleModel[], setSelectedArticle: (article) => void }) => (<ScrollView >
    <View style={ArticlesStyle.listArticleContainer} >
        {articles.map((item) => <View style={ArticlesStyle.listArticleItem} key={item.title}>
            <TouchableOpacity onPress={() => setSelectedArticle(item)} style={ArticlesStyle.listingItem}>
                <Text style={ArticlesStyle.listArticleTitle}>{item.title}</Text>
                <FastImage style={ArticlesStyle.listingItemIcon} source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right_cf094bdc-8b99-4fc6-a4b6-58bf78a7f46f.png?v=1742907669' }} />
            </TouchableOpacity>
        </View>)}
    </View>

</ScrollView>)

const ArticleList = ({ selectedArticleSec, setSelectedArticleSec, setSelectedArticle, selectedArticle }: Props) => {
    return <View>

        <OZModal
            visible={true}
            title={selectedArticleSec.sectionTitle}
            onRequestClose={() => {
                setSelectedArticleSec(undefined)
            }}
            setModalVisible={() => {
                setSelectedArticleSec(undefined)
            }}
            headerStyles={ArticlesStyle.listArticleModalHeader}
            transparent
            animationType="fade"
            contentContainerStyles={{ height: 'auto', alignItems: 'stretch' }}
        >

            {selectedArticle ?
                <Article
                    onBack={() => { selectedArticleSec && selectedArticleSec?.articles.length > 1 ? setSelectedArticle(undefined) : null }}
                    selectedArticle={selectedArticle as ArticleModel}
                />
                :
                <List articles={selectedArticleSec.articles} setSelectedArticle={setSelectedArticle} />
            }
        </OZModal>

    </View >
}
export default ArticleList;