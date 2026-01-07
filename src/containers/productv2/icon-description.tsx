import FastImage from "@d11/react-native-fast-image";
import Header from "components/productv2/common/header";
import { IconDescription as IconDescriptionModel } from "models/product-details/productv2";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import RenderHtml from 'react-native-render-html';
import { IconDescriptionStyle } from "styles/productv2";
import { width } from "utils/constants";

interface Props {
    sectionHeader: string;
    iconDescriptions: IconDescriptionModel[];
}
const tagsStyles = {
    p: {
        marginBottom: 0,
        color: '#424242'
    },
    strong: {
        color: '#000'
    }
};
const IconDescriptionContainer = ({ iconDescriptions, sectionHeader }: Props) => {
    const [selectedTab, setSelectedTab] = useState(iconDescriptions.length ? iconDescriptions[0] : undefined);
    return <View style={IconDescriptionStyle.container}>
        {sectionHeader ? <Header sectionHeader={sectionHeader} /> : null}

        <View style={IconDescriptionStyle.section}>
            {iconDescriptions.map((item, index) => {
                const isTabSelected = selectedTab?.title == item.title ? true : false;
                return <Pressable onPress={() => setSelectedTab(item)} key={item.title}>

                    <View style={[IconDescriptionStyle.item, isTabSelected ? IconDescriptionStyle.active : {}]} key={item.title}>
                        <View style={IconDescriptionStyle.label}>
                            <Image style={IconDescriptionStyle.icon} source={{ uri: item.src }} width={50} height={50} />
                            <Text style={IconDescriptionStyle.title} >{item.title}</Text>

                            <FastImage style={{ width: 24, height: 24, marginLeft: 'auto' }} source={{ uri: `https://cdn.shopify.com/s/files/1/2393/2199/files/${isTabSelected ? 'chevron_top.png' : 'chevron_bottom.png'}?v=1742374958` }} />

                        </View>
                        {isTabSelected ?
                            <RenderHtml
                                tagsStyles={tagsStyles}
                                source={{ html: item.description }} contentWidth={width - 16} /> : null
                        }
                    </View>
                </Pressable>
            })}
        </View>
    </View >
}
export default IconDescriptionContainer;