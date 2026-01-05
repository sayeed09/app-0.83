import { transform } from 'lodash';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function RightArrow({color, width, height}: {color?: string, width: number, height: number}) {
  return (
    <Svg
      style={{ opacity: 1, zIndex: 1 }}
      width={width ? width : 8}
      height={height ? height : 13}
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.375 13L0.300003 11.925L5.25 6.97495L0.300003 2.02495L1.375 0.949951L7.4 6.97495L1.375 13Z"
        fill={color || '#000'}
      />
    </Svg>
  );
}

export default RightArrow;
