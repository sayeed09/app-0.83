import FastImage from '@d11/react-native-fast-image';
import { router } from 'expo-router';
import * as React from 'react';
import { Pressable, View } from 'react-native';

const CategoriesThumbnails = ({ navigation, spotlightCategoryList }) => (
  <View style={{ paddingVertical: 12 }}>
    {spotlightCategoryList.length > 0 &&
      spotlightCategoryList.map((category, index) => (
        <View
          style={{
            borderRadius: 8,
            marginVertical: 8,
            marginHorizontal: 16,
            overflow: 'hidden',
          }}
          key={index}
        >
          <Pressable
            onPress={() => {
              if (category.link.split('collections/').length > 1) {
                // navigation.navigate('Concerns', {
                //   collectionHandle: category.link.split('collections/')[1],
                // });
                router.push({
                  pathname: '/Concerns',
                  params: {
                    collectionHandle: category.link.split('collections/')[1],
                  },
                });
              }
            }}
          >
            <FastImage
              source={{
                uri: category.image,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={{
                aspectRatio: 4 / 1,
              }}
            />
          </Pressable>
        </View>
      ))}
  </View>
);
export default CategoriesThumbnails;
