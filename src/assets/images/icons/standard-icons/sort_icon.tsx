import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SortIconComponent = (): React.ReactElement => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <G fill="#006e5a" stroke="#006e5a" strokeWidth={0.3}>
      <Path
        data-name="Path 7719"
        d="M15.273 19.584a.465.465 0 00.924 0V5.418l2.766 2.489a.5.5 0 00.654 0 .384.384 0 000-.585l-3.551-3.2a.511.511 0 00-.65 0l-3.551 3.2a.384.384 0 000 .585.5.5 0 00.65 0l2.766-2.489v14.166z"
      />
      <Path
        data-name="Path 7720"
        d="M11.64 16.093a.5.5 0 00-.65 0l-2.766 2.49V4.416A.441.441 0 007.762 4a.441.441 0 00-.462.416v14.166l-2.763-2.489a.5.5 0 00-.65 0 .384.384 0 000 .585l3.551 3.2a.5.5 0 00.654 0l3.551-3.2a.392.392 0 00-.003-.585z"
      />
    </G>
  </Svg>
);

export default SortIconComponent;
