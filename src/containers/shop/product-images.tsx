import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

import { height, width } from '@utils/constants';

export const ProductImages = ({ route }) => {
  const { imageUrl } = route?.params;
  const scale = new Animated.Value(1);

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <>
      {/* <WhiteCard style={{ height }} noBorderRadius noPadding>
        <Carousel
          height={height}
          indicatorAtBottom
          indicatorSize={10}
          indicatorOffset={10}
          indicatorSpace={40}
          indicatorColor="#000000"
          indicatorImage={productData?.node.images.edges}
          noAutoSlide
          initialPage={index}
        >
          <View>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.View style={StyleSheet.absoluteFill}>
                {productData && index ? (
                  <Animated.Image
                    source={{
                      uri: productData?.node.images.edges[index].node.src,
                    }}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      width,
                      height,
                      resizeMode: 'contain',
                      transform: [{ scale }],
                    }}
                  />
                ) : (
                  productData?.node.images.edges.map(banner => (
                    <Animated.Image
                      key={banner.node.src}
                      source={{
                        uri: banner.node.src,
                      }}
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        width,
                        height,
                        resizeMode: 'contain',
                        transform: [{ scale }],
                      }}
                    />
                  ))
                )}
              </Animated.View>
            </PinchGestureHandler>
          </View>
        </Carousel>
      </WhiteCard> */}

      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.Image
            source={{
              uri: imageUrl,
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              resizeMode: 'contain',
              transform: [{ scale }],
            }}
          />
        </Animated.View>
      </PinchGestureHandler>
    </>
  );
};
