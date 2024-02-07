import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const LoadingData = () => {
  const dot1Animation = useRef(new Animated.Value(1)).current;
  const dot2Animation = useRef(new Animated.Value(1)).current;
  const dot3Animation = useRef(new Animated.Value(1)).current;

  const animateDots = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot1Animation, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(dot1Animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(dot2Animation, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(dot2Animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(dot3Animation, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(dot3Animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    animateDots();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          { transform: [{ scale: dot1Animation }], backgroundColor: '#B3BCC2' },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { transform: [{ scale: dot2Animation }], backgroundColor: '#D0D8DB' },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { transform: [{ scale: dot3Animation }], backgroundColor: '#B3BCC2' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf:'center',
    justifyContent:'center'
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    alignSelf:'center',
    marginHorizontal: 2, // Adjust the space between the dots
  },
});

export default LoadingData;
