import * as React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

function CheckRoundIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={52}
      height={52}
      viewBox="0 0 52 52"
      {...props}
    >
      <Path
        d="M9.655 19.685L0 11.558l3.337-3.9L9.1 12.506 19.576 0l3.893 3.337z"
        transform="translate(14.438 15.931)"
        fill="#006e5a"
      />
      <G data-name="Ellipse 462" fill="none" stroke="#006e5a" strokeWidth={5}>
        <Circle cx={26} cy={26} r={26} stroke="none" />
        <Circle cx={26} cy={26} r={23.5} />
      </G>
    </Svg>
  );
}

export default CheckRoundIcon;
