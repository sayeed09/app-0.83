import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const ClockIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15.64}
    height={15.64}
    viewBox="0 0 15.64 15.64"
    {...props}
  >
    <G fill="#7e7e7e" stroke="#7e7e7e" strokeWidth={0.8}>
      <Path
        data-name="Path 7729"
        d="M7.82.4a7.42 7.42 0 107.42 7.42A7.429 7.429 0 007.82.4zm0 13.912a6.492 6.492 0 116.492-6.492 6.5 6.5 0 01-6.492 6.492z"
      />
      <Path
        data-name="Path 7730"
        d="M8.37 3.388h-.865v4.5l2.721 2.721.612-.611L8.37 7.53z"
      />
    </G>
  </Svg>
);

export default ClockIcon;
