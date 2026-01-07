import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ThreeXAxisDots = (): React.ReactElement => (
  <Svg width={48} height={10} viewBox="0 0 48 1">
    <Path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
  </Svg>
);

export default ThreeXAxisDots;
