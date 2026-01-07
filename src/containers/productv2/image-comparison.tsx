import Header from "components/productv2/common/header";
import Compare from "components/productv2/image-comparison";
import { After, Before, DefaultDragger } from "components/productv2/image-comparison";
import { ImageComparisonModel } from "models/product-details/productv2";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import SvgRenderer from "react-native-svg-renderer";
import { commonStyles } from "styles/common";
import { ImageComparionStyle } from "styles/productv2";
import { width } from "utils/constants";

interface Props {
    imageComparisons: ImageComparisonModel[];
    headerSection: string;
}
const ImageComparison = ({ imageComparisons, headerSection }: Props) => {
    const [state, setState] = useState({ scrollEnabled: true })
    const [currentIndx, setCurrentIndx] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onMoveStart = () => {
        setState({ scrollEnabled: false });
    }
    const onMoveEnd = () => {
        setState({ scrollEnabled: true });
    }
    useEffect(() => {
        if (flatListRef) {
            flatListRef?.current?.scrollToIndex({
                index: currentIndx,
                animated: true,
                viewPosition: 1
            });
        }
    }, [currentIndx])
    return <View style={ImageComparionStyle.container}>
        {headerSection ? <Header sectionHeader={headerSection} /> : null}
        <FlatList
            ref={flatListRef}
            horizontal
            data={imageComparisons}
            keyExtractor={(item, index) => item.image1 + index}
            scrollEnabled={false}
            style={ImageComparionStyle.sliderContainer}
            renderItem={({ item, index }) => (<View
                style={[ImageComparionStyle.item, imageComparisons.length > 1 && imageComparisons.length - 1 == index ? commonStyles.pr32 : {}]}>
                <Compare initial={125} draggerWidth={50} width={250} height={318} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd}>
                    <Before>
                        <Image source={{ uri: item.image1 }} style={ImageComparionStyle.itemImage} />
                    </Before>
                    <After>
                        <Image source={{ uri: item.image2 }} style={ImageComparionStyle.itemImage} />
                    </After>
                    <DefaultDragger />
                </Compare>
            </View>)
            } />
        <View style={ImageComparionStyle.btnContainer}>
            <TouchableOpacity style={currentIndx == 0 ? [commonStyles.loading] : {}} onPress={() => { currentIndx > 0 && setCurrentIndx(currentIndx => currentIndx - 1) }}>
                <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/left-arrow.svg?v=1723565978' }} />
            </TouchableOpacity>
            <TouchableOpacity style={currentIndx == imageComparisons.length - 1 ? [commonStyles.loading] : {}} onPress={() => { currentIndx < imageComparisons.length - 1 && setCurrentIndx(currentIndx => currentIndx + 1) }}>
                <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/right-arrow.svg?v=1723565917' }} />
            </TouchableOpacity>
        </View>
    </View>
}
export default ImageComparison;