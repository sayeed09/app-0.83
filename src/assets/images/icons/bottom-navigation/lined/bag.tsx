import * as React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

const BagLineIconComponent = (): React.ReactElement => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={6} cy={6.75} r={1.125} stroke="#7E7E7E" strokeWidth={0.75} />
    <Circle cx={6} cy={12} r={1.125} stroke="#7E7E7E" strokeWidth={0.75} />
    <Circle cx={6} cy={17.25} r={1.125} stroke="#7E7E7E" strokeWidth={0.75} />
    <Rect
      x={8.625}
      y={5.625}
      width={10.5}
      height={2.25}
      rx={1.125}
      stroke="#7E7E7E"
      strokeWidth={0.75}
    />
    <Rect
      x={8.625}
      y={10.875}
      width={10.5}
      height={2.25}
      rx={1.125}
      stroke="#7E7E7E"
      strokeWidth={0.75}
    />
    <Rect
      x={8.625}
      y={16.125}
      width={10.5}
      height={2.25}
      rx={1.125}
      stroke="#7E7E7E"
      strokeWidth={0.75}
    />
  </Svg>
);

export default BagLineIconComponent;
