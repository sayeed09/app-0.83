import * as React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

const BagFilledIconComponent = (): React.ReactElement => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={6} cy={6.75} r={1.5} fill="#6BBD58" />
    <Circle cx={6} cy={12} r={1.5} fill="#6BBD58" />
    <Circle cx={6} cy={17.25} r={1.5} fill="#6BBD58" />
    <Rect x={8.25} y={5.25} width={11.25} height={3} rx={1.5} fill="#6BBD58" />
    <Rect x={8.25} y={10.5} width={11.25} height={3} rx={1.5} fill="#6BBD58" />
    <Rect x={8.25} y={15.75} width={11.25} height={3} rx={1.5} fill="#6BBD58" />
  </Svg>
);

export default BagFilledIconComponent;
