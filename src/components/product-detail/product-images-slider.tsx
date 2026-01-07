import FastImage from '@d11/react-native-fast-image';
import LeftArrow from 'assets/images/icons/left-arrow';
import RightArrow from 'assets/images/icons/right-arrow';
import { IImage } from 'models/product-details/product';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { ProductSliderThumbnailStyle } from 'styles/productv2';
import { width } from 'utils/constants';
import { resizeImageForDevice } from 'utils/image-utils';

interface Props {
  navigation: any;
  images: IImage[];
  toShowPreviewImageOnPDP: boolean;
}

const ProductImagesSlider = ({ images, navigation, toShowPreviewImageOnPDP }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainCarouselRef = useRef<FlatList>(null);
  const navCarouselRef = useRef<FlatList>(null);

  const isManualScroll = useRef(true);
  const handleScrollEnd = (event) => {
    if (!isManualScroll.current) {
      isManualScroll.current = true;
      return; // skip this update
    }
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
    setSelectedIndex(index);
    navCarouselRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleThumbnailPress = (index: number) => {
    if (index < 0 || index >= images.length) return;
    isManualScroll.current = false;
    mainCarouselRef.current?.scrollToIndex({ index, animated: true });
    navCarouselRef.current?.scrollToIndex({ index, animated: true });
    setSelectedIndex(index);
  };

  const renderImage = useCallback(({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        if (toShowPreviewImageOnPDP) {
          navigation.push('ProductImages', {
            imageUrl: item.src,
          })
        }
      }
      }
      style={{ width: width - 32 }}
    >
      <FastImage
        source={{
          uri: resizeImageForDevice(item.src, width),
          priority: index < 3 ? FastImage.priority.high : FastImage.priority.low,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          flex: 1,
          height: width,
          width: '100%',
          borderColor: '#ccc',
          borderWidth: 0,
        }}
      />
    </TouchableOpacity>
  ), [navigation, images]);

  const renderThumbnailItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleThumbnailPress(index)}>
      <FastImage
        style={[
          ProductSliderThumbnailStyle.item,
          selectedIndex === index
            ? ProductSliderThumbnailStyle.active
            : { opacity: 0.5 },
        ]}
        source={{ uri: resizeImageForDevice(item.src, 50) }}
      />
    </TouchableOpacity>
  );
  return (
    <View style={{ position: 'relative', width: width, paddingHorizontal: 16 }}>
      {/* Left Arrow */}
      <TouchableNativeFeedback disabled={selectedIndex === 0} onPress={() => handleThumbnailPress(selectedIndex - 1)}>
        <View
          style={[
            commonStyles.LeftArrow,
            commonStyles.pad10,
            selectedIndex === 0
              ? ProductSliderThumbnailStyle.mainSliderButtonDisabled
              : {},
          ]}
        >
          <LeftArrow />
        </View>
      </TouchableNativeFeedback>

      {/* Right Arrow */}
      <TouchableNativeFeedback disabled={selectedIndex === images.length - 1} onPress={() => handleThumbnailPress(selectedIndex + 1)}>
        <View
          style={[
            commonStyles.arrowRight,
            commonStyles.pad10,
            selectedIndex === images.length - 1
              ? ProductSliderThumbnailStyle.mainSliderButtonDisabled
              : {},
          ]}
        >
          <RightArrow />
        </View>
      </TouchableNativeFeedback>

      {/* Main Carousel */}
      <FlatList
        ref={mainCarouselRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderImage}
        onMomentumScrollEnd={handleScrollEnd}
      />

      {/* Thumbnails */}
      <View style={ProductSliderThumbnailStyle.container}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={renderThumbnailItem}
          ref={navCarouselRef}
          horizontal
          initialScrollIndex={Math.min(selectedIndex, images.length - 1)}
          style={ProductSliderThumbnailStyle.list}
        />
        {selectedIndex + 5 < images.length && (
          <Text>+{images.length - selectedIndex - 5}</Text>
        )}
      </View>
    </View>
  );
};

export default ProductImagesSlider;