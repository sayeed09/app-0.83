import React, { Component, createRef, PureComponent } from 'react';
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';

import { Indicator } from './indicator';

const styles = StyleSheet.create({
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
  indicatorContainerStyle: {
    marginTop: 18,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export class FlatListSlider extends PureComponent {
  slider = createRef();

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };
  //   this.props = { initialScrollIndex, data };

  constructor(props) {
    super(props);
    const { initialScrollIndex, data } = props;
    this.state = {
      index: initialScrollIndex,
      data,
      isGotoParticular: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    const { onRef, autoscroll } = this.props;
    if (onRef) {
      onRef(this);
    }
    if (autoscroll) {
      this.startAutoPlay();
    }
  }

  componentWillUnmount() {
    const { onRef, autoscroll } = this.props;
    if (onRef) {
      onRef(undefined);
    }

    if (autoscroll) {
      this.stopAutoPlay();
    }
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    const { data: stateData, isGotoParticular } = this.state;
    const { data, loop, currentIndexCallback } = this.props;
    if (!isGotoParticular) {
      if (viewableItems.length > 0) {
        const currentIndex = viewableItems[0].index;
        if (currentIndex % data.length === data.length - 1 && loop) {
          this.setState({
            index: currentIndex,
            data: [...stateData, ...data],
          });
        } else {
          this.setState({ index: currentIndex % data.length });
        }

        if (currentIndexCallback) {
          currentIndexCallback(currentIndex);
        }
      }
    } else {
      this.setState({ isGotoParticular: false });
    }
  };

  incrementSliderListIndex = () => {
    const { animation, data } = this.props;
    const { index } = this.state;
    const newIndex = index + 1;
    if (animation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    this.setState({ index: newIndex });
    this.slider.current?.scrollToIndex({
      index: newIndex % data.length,
      animated: true,
    });
  };

  decrementSliderListIndex = () => {
    const { animation, data } = this.props;
    const { index } = this.state;
    if (index > 0) {
      const newIndex = index - 1;
      if (animation) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      this.setState({ index: newIndex });
      this.slider.current.scrollToIndex({
        index: newIndex % data.length,
        animated: true,
      });
    }
  };

  startAutoPlay = () => {
    const { timer } = this.props;
    this.sliderTimer = setInterval(this.incrementSliderListIndex, timer);
  };

  stopAutoPlay = () => {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  };

  goToParticular = index => {
    this.setState({ isGotoParticular: true });
    const { data } = this.props;
    this.setState({ index });
    this.slider.current.scrollToIndex({
      index: index % data.length,
      animated: true,
    });
  };
  render() {
    const {
      width,
      contentContainerStyle,
      component,
      imageKey,
      onPress,
      data,
      local,
      height,
      cartItems,
      cartDispatch,
      navigation,
      separatorWidth,
      indicator,
      indicatorStyle,
      indicatorActiveColor,
      indicatorContainerStyle,
      indicatorActiveWidth,
      indicatorInActiveColor,
      indicatorCount,
      //   emptyComponent,
    } = this.props;
    const itemWidth = width;
    const { data: stateData, index: stateIndex } = this.state;
    const totalItemWidth = itemWidth + separatorWidth;

    return (
      <View>
        <FlatList
          ref={this.slider}
          windowSize={3}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          horizontal
          pagingEnabled
          snapToInterval={totalItemWidth}
          decelerationRate="fast"
          bounces={false}
          loop={false}
          contentContainerStyle={contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) =>
            React.cloneElement(component, {
              style: { width },
              item,
              key: (index + (item?.id || item?.node?.id)).toString(),
              imageKey,
              onPress,
              index: stateIndex % data.length,
              active: index === stateIndex,
              local,
              height,
              cartItems,
              cartDispatch,
              navigation,
            })
          }
          ItemSeparatorComponent={() => (
            <View style={{ width: separatorWidth }} />
          )}
          keyExtractor={(item, index) => item.toString() + index}
          onViewableItemsChanged={this.onViewableItemsChanged}
          //   viewabilityConfig={this.viewabilityConfig}
          // eslint-disable-next-line no-shadow
          getItemLayout={(data, index) => ({
            length: totalItemWidth,
            offset: totalItemWidth * index,
            index,
          })}
          data={stateData}
        //   ListEmptyComponent={React.cloneElement(emptyComponent)}
        />
        {indicator && (
          <Indicator
            itemCount={indicatorCount || data.length - 2}
            currentIndex={stateIndex % data.length}
            indicatorStyle={indicatorStyle}
            indicatorContainerStyle={[
              styles.indicatorContainerStyle,
              indicatorContainerStyle,
            ]}
            indicatorActiveColor={indicatorActiveColor}
            indicatorInActiveColor={indicatorInActiveColor}
            indicatorActiveWidth={indicatorActiveWidth}
            style={{ ...styles.indicator, ...indicatorStyle }}
            onAction={this.goToParticular}
          />
        )}
      </View>
    );
  }
}

FlatListSlider.defaultProps = {
  data: [],
  initialScrollIndex: 0,
  imageKey: 'image',
  local: false,
  width: Math.round(Dimensions.get('window').width),
  height: 230,
  separatorWidth: 0,
  loop: true,
  indicator: true,
  indicatorStyle: {},
  indicatorContainerStyle: {},
  indicatorActiveColor: '#3498db',
  indicatorInActiveColor: '#bdc3c7',
  indicatorActiveWidth: 6,
  animation: true,
  autoscroll: true,
  timer: 3000,
  onPress: {},
  contentContainerStyle: {},
  //   component: ,
};
