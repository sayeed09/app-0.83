import React from 'react';

import { Label } from '@components/styled/common';

const ProductLabel = props => (
  <Label
    numberOfLines={2}
    ellipsizeMode="tail"
    style={{
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
    }}
  >
    {props?.children}
  </Label>
);

export default ProductLabel;
