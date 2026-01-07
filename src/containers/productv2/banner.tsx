import FastImage from "@d11/react-native-fast-image";
import Header from "components/productv2/common/header";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { BannerStyle } from "styles/productv2";
import { width } from "utils/constants";
import { resizeImageForDevice } from "utils/image-utils";

interface Props {
    title?: string;
    image: string;
}
const Banner = ({ image, title }: Props) => {
    const [imageHeight, setImageHeight] = useState(0);

    useEffect(() => {
        const uri = resizeImageForDevice(image, width);

        Image.getSize(uri, (width, height) => {
            const desiredWidth = width; // Set the desired width
            const calculatedHeight = (height / width) * desiredWidth;
            setImageHeight(calculatedHeight);
        });
    }, []);
    if (!imageHeight) {
        return null
    }
    return <View style={BannerStyle.container}>

        {title ?
            <Header sectionHeader={title} />
            : null}
        <View style={styles.container}>
            <FastImage
                source={{
                    uri: image,
                    priority:
                        FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{ width, height: imageHeight }}

            />
        </View>
    </View>


}
export default Banner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%', // Specify width
        height: '100%', // Automatically adjust height
    },
});