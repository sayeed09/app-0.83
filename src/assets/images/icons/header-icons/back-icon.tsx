import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BackSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        data-name="Path 7974"
        d="M12.236 19.64a1.294 1.294 0 000-1.83l-4.539-4.517h11.4a1.294 1.294 0 100-2.588h-11.4l4.539-4.517a1.294 1.294 0 00-1.825-1.834l-6.76 6.728a1.3 1.3 0 000 1.832l6.76 6.728a1.294 1.294 0 001.825-.002z"
        fill={props?.color || '#000000'}
      />
    </Svg>
  );
}

export default BackSvg;
