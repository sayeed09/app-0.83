import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const NetbankingIconComponent = ({ width, height }): React.ReactElement => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M19.3172 11.4395H4.54719V20.4274H2.86719V21.6564H20.9952V20.4274H19.3172V11.4395ZM5.77219 20.4274V12.6624H8.91119V20.4274H5.77219ZM10.1412 20.4274V12.6624H13.7172V20.4274H10.1412ZM14.9512 20.4274V12.6624H18.0872V20.4274H14.9512Z"
      fill="black"
      stroke="white"
      strokeWidth={0.4}
    />
    <Path
      d="M2 10.034H21.7L11.85 2L2 10.034ZM5.45 8.807L11.85 3.587L18.25 8.807H5.45Z"
      fill="black"
      stroke="white"
      strokeWidth={0.4}
    />
  </Svg>
);

export default NetbankingIconComponent;
