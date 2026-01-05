import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CloseSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        d="M20.181 4.943L19.238 4l-7.057 7.057L5.124 4l-.943.943L11.238 12l-7.057 7.057.943.943 7.057-7.057L19.238 20l.943-.943L13.124 12z"
        fill="#7e7e7e"
      />
    </Svg>
  );
}

export default CloseSvg;
