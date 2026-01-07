import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const ArrowUp = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 172" {...props}>
    <G fill="none" strokeMiterlimit={10}>
      <Path d="M0 172V0h172v172z" />
      <Path
        d="M86 3.494L49.222 38.807a3.415 3.415 0 00-.981 3.306 3.443 3.443 0 002.391 2.486 3.377 3.377 0 003.346-.846L82.56 16.327V165.12a3.46 3.46 0 001.707 3.023 3.473 3.473 0 003.466 0 3.46 3.46 0 001.707-3.023V16.327l28.582 27.426a3.377 3.377 0 003.345.846 3.443 3.443 0 002.392-2.486 3.415 3.415 0 00-.98-3.306z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default ArrowUp;
