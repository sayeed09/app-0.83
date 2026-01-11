import FastImage from '@d11/react-native-fast-image';
import WhiteCard from 'components/elements/card/white-card';
import { router } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { homeStyles } from './stylesHome';
const HomeCleanProtein = ({ cleanProteinList, navigation }) => {
  return (
    <>
      <WhiteCard noBorderRadius>
        <View>
          <Text
            style={[
              commonStyles.head18,
              commonStyles.mb8,
              commonStyles.textCenter,
            ]}
          >
            Clean Protein, for everyone
          </Text>
          <Text
            style={[
              homeStyles.subHeading,
              commonStyles.textCenter,
              commonStyles.mb16,
              commonStyles.pb8,
            ]}
          >
            Live #HarTarahSeBetter with clean protein for all your needs!
            Manage weight, tone up, build lean muscle & improve stamina.
          </Text>
        </View>
        <ScrollView
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={[homeStyles.CleanProdSection]}>
            {cleanProteinList.length > 0 &&
              cleanProteinList.map(({ image, link, banner }) => (
                <Pressable
                  onPress={() => {
                    if (link.split('collections/').length > 1) {
                      // navigation.navigate('Collection', {
                      //   handle: link.split('collections/')[1],
                      //   banner,
                      // });
                      router.push({
                        pathname: '/Collection',
                        params: {
                          handle: link.split('collections/')[1],
                          banner,
                        },
                      });
                    }
                  }}
                  key={image}
                >
                  <View style={[homeStyles.CleanProdCards]}>
                    <View>
                      <FastImage
                        source={{
                          uri: image,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ width: '100%', aspectRatio: 2 / 3 }}
                      />
                    </View>
                  </View>
                </Pressable>
              ))}
          </View>
        </ScrollView>
      </WhiteCard>
    </>
  );
};
export default HomeCleanProtein;
