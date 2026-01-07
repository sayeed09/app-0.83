import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const SuccessMessageIconComponent = (): React.ReactElement => (
  <Svg width={22} height={22} viewBox="0 0 22 22">
    <Circle cx={11} cy={11} r={11} fill="#6bbd58" />
    <Path
      d="M14.494 7.755a.882.882 0 011.248 1.248l-5.295 5.294a.882.882 0 01-1.247 0l-2.942-2.941a.882.882 0 111.248-1.248l2.318 2.318z"
      fill="#fff"
      data-name="Icons/16px/Check"
    />
  </Svg>
);

export default SuccessMessageIconComponent;
