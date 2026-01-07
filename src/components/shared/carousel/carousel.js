// Reference
// https://github.com/chilijung/react-native-carousel-view

/* eslint-disable no-plusplus */
import React, { Children, Component, PureComponent } from 'react';
import reactMixin from 'react-mixin';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

import styles from './styles/carousel';
import CarouselPager from './carouselPager';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    if (!props.height) {
      throw new Error('You must set a height props.');
    }
    this.state = {
      activePage: props.initialPage >= 0 ? props.initialPage : 0,
      sliderImages:this.children
    };
    this.getWidth = this.getWidth.bind(this);
    this.indicatorPressed = this.indicatorPressed.bind(this);
    this.renderPageIndicator = this.renderPageIndicator.bind(this);
    this.setUpTimer = this.setUpTimer.bind(this);
    this.animateNextPage = this.animateNextPage.bind(this);
    this.onAnimationBegin = this.onAnimationBegin.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.resetPager = this.resetPager.bind(this);
  }

  componentDidMount() {
    const { noAutoSlide } = this.props;
    if (!noAutoSlide) {
      this.resetPager();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.slideToIndex !== prevProps.slideToIndex) {
      this.setState({ activePage: this.props.slideToIndex });
      this.pager.scrollToPage(this.props.slideToIndex);
    }
  }

  onAnimationBegin() {
    const { onScrollBegin } = this.props;
    if (onScrollBegin) {
      onScrollBegin();
    }
    this.clearTimeout(this.timer);
  }

  onAnimationEnd(activePage) {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(activePage);
    }
    this.setState({ activePage }, this.setUpTimer());
  }

  setUpTimer() {
    const { animate, delay, noAutoSlide } = this.props;
    if (this.timer) {
      this.clearTimeout(this.timer);
    }
    if (animate && this.children.length > 1 && !noAutoSlide) {
      this.timer = this.setTimeout(this.animateNextPage, delay);
    }
  }

  getWidth() {
    const { width } = this.props;
    if (width) {
      return width;
    }
    return Dimensions.get('window').width;
  }

  indicatorPressed(activePage) {
    this.setState({ activePage });
    this.pager.scrollToPage(activePage);
  }

  resetPager() {
    const { initialPage } = this.props;
    if (initialPage > 0) {
      this.setState({ activePage: initialPage });
      this.pager.scrollToPage(initialPage, false);
    }
    if (this.children) {
      this.setUpTimer();
    }
  }

  animateNextPage() {
    let { activePage } = this.state;
    const { loop } = this.props;
    if (activePage < this.children.length - 1) {
      activePage++;
    } else if (loop) {
      activePage = 0;
    } else if (!loop) {
      // no loop, clear timer
      this.clearTimeout(this.timer);
      return;
    }
    this.indicatorPressed(activePage);
    this.setUpTimer();
  }

  renderPageIndicator() {
    const {
      hideIndicators,
      indicatorOffset,
      indicatorAtBottom,
      indicatorSpace,
      indicatorColor,
      inactiveIndicatorColor,
      indicatorSize,
      indicatorImage,
      indicatorText,
      inactiveIndicatorText,
    } = this.props;
    const { activePage } = this.state;
    if (hideIndicators === true) {
      return null;
    }
    const indicators = [];
    const positionIndicatorStyle = indicatorAtBottom
      ? { bottom: indicatorOffset }
      : { top: indicatorOffset };
    const indicatorWidth = this.children.length * indicatorSpace;
    let style;
    const position = {
      minWidth: indicatorWidth,
      left: (this.getWidth() - indicatorWidth) / 2,
    };
    this.children.forEach((child, i) => {
      style =
        i === activePage
          ? { color: indicatorColor }
          : { color: inactiveIndicatorColor };
      indicators.push(
        indicatorImage ? (
          <TouchableWithoutFeedback onPress={() => this.indicatorPressed(i)}>
            <View
              style={{
                borderColor: 'green',
                borderWidth: i === activePage ? 1 : 0,
              }}
            >
              <Image
                source={{
                  uri: indicatorImage[i]?.node?.src,
                  width: 35,
                  height: 50,
                }}
                style={{ borderColor: 'red', broderWidth: 1 }}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => this.indicatorPressed(i)}>
            <Text style={[style, { fontSize: indicatorSize }]}>
              {i === activePage ? indicatorText : inactiveIndicatorText}
            </Text>
          </TouchableWithoutFeedback>
        ),
      );
    });
    // only one item don't need indicators
    if (indicators.length === 1) {
      return null;
    }
    return (
      <View style={[styles.pageIndicator, position, positionIndicatorStyle]}>
        {indicators}
      </View>
    );
  }

  render() {
    const { height, contentContainerStyle, onScroll, indicatorImage } =
      this.props;
    const width = this.getWidth();
    return (
      <View style={{ width, flex: 1 }}>
        <View style={{ width, height, overflow: 'hidden', flex: 1 }}>
          <CarouselPager
            ref={pager => {
              this.pager = pager;
            }}
            width={width}
            height={height}
            contentContainerStyle={[
              height ? { height } : styles.contentContainer,
              contentContainerStyle,
            ]}
            onScroll={onScroll}
            onBegin={this.onAnimationBegin}
            onEnd={this.onAnimationEnd}
          >
           {this.props.images?this.props.images: this.children}
          </CarouselPager>
        </View>
        {indicatorImage ? (
          <ScrollView
            horizontal
            style={{
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <View style={{ height: 100, width: 450 }}>
              {this.renderPageIndicator()}
            </View>
          </ScrollView>
        ) : (
          this.renderPageIndicator()
        )}
      </View>
    );
  }
}
Carousel.defaultProps = {
  hideIndicators: false,
  indicatorColor: '#000000',
  indicatorSize: 20,
  inactiveIndicatorColor: '#999999',
  indicatorAtBottom: true,
  indicatorOffset: 0,
  indicatorText: '●',
  inactiveIndicatorText: '●',
  width: null,
  height: 200,
  initialPage: 0,
  indicatorSpace: 20,
  animate: true,
  delay: 1000,
  loop: true,
  onScroll: () => {},
};
reactMixin(Carousel.prototype, TimerMixin);
