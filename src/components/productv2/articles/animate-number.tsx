import React from "react";
import { useRef, useState, useEffect } from "react";
import { Animated, Easing, StyleProp, Text, TextStyle } from "react-native";
import { ArticlesStyle } from "styles/productv2";

interface AnimatedNumberProps {
  number: number;
  duration?: number;
  style?: StyleProp<TextStyle>
}

const AnimatedNumber = ({ number, duration = 2000, style = {} }: AnimatedNumberProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: number,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    const listenerId = animatedValue.addListener(({ value }) => {
      setDisplayNumber(Math.round(value));
    });

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [number, duration, animatedValue]);

  return (
    <Text style={style}>
      {displayNumber < 10 ? `0${displayNumber}` : displayNumber}
    </Text>
  );
};
export default AnimatedNumber;