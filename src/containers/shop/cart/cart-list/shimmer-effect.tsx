import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing, TouchableHighlight } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { width } from "utils/constants";

interface IProps {
  children: any;
  onAction?: any;
}
export const ShimmerButtonWrapper = ({ children, onAction }: IProps) => {
  const shimmerTranslate = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerTranslate]);

  const translateX = shimmerTranslate.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <TouchableHighlight underlayColor={'#0000000a'} activeOpacity={0.7} onPress={() => {
      if(onAction){
        onAction()
      }
    }}>
      <View style={[styles.container]}>
        {children}

        {/* shimmer overlay */}
        <Animated.View
          pointerEvents={"none"}
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [
                { translateX },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255,255,255,0.5)",
              "transparent",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.shimmer}
          />
        </Animated.View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 8,
    position: "relative",
  },
  shimmer: {
    flex: 1,
    width: "100%",
  },
});
