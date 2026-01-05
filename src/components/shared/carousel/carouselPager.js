/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import React, { Children, Component } from 'react';
import { ScrollView } from 'react-native';

export default class CarouselPager extends Component {
  constructor(props) {
    super(props);
    this.scrollToPage = this.scrollToPage.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
  }

  onMomentumScrollEnd(e) {
    const { onEnd, width } = this.props;
    const activePage = e.nativeEvent.contentOffset.x / width;
    onEnd(activePage);
    
  }

  scrollToPage(page, animated) {
    const { width } = this.props;
    this.scrollView.scrollTo({
      x: page * width,
      y: 0,
      animated: typeof animated === 'undefined' ? true : animated,
    });
  }

  render() {
    const {
      onBegin,
      onScroll,
      children,
      contentContainerStyle,
      width,
      height,
    } = this.props;
    const newChildren = Children.map(children, element => {
      if (!React.isValidElement(element)) return;
      const a = element.props;
      const { style, ...restProps } = a;
      return React.cloneElement(element, {
        ...restProps, // add width and height from contentContainerStyle
        style: [{ width, height }, style],
      });
    });
    return React.createElement(
      ScrollView,
      {
        ref: scrollView => {
          this.scrollView = scrollView;
        },
        contentContainerStyle,
        automaticallyAdjustContentInsets: false,
        scrollEventThrottle: 16,
        horizontal: true,
        pagingEnabled: true,
        showsHorizontalScrollIndicator: false,
        bounces: false,
        onScrollBeginDrag: onBegin,
        onScroll,
        onMomentumScrollEnd: this.onMomentumScrollEnd,
        scrollsToTop: false,
      },
      newChildren,
    );
  }
}
