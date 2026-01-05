import React from 'react';
import { Text, View } from 'react-native';

import { BoldText, MediumText } from '@components/styled/common';
import { darkGreen } from '@components/styles/colors';
import { commonStyles } from 'styles/common';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const ProductRating = (props): React.ReactElement => {
  const {
    productId,
    showRating,
    imageSize,
    reviews,
    labelStyles,
    productAdditionalDetail,
  } = props;

  if (!productAdditionalDetail)
    return (
      <StarRatingDisplay
        rating={0}
        enableHalfStar
        color={darkGreen}
        starSize={10}
        starStyle={{ marginHorizontal: 1 }}
      />
    );

  return (
    <>
      {showRating && productAdditionalDetail?.averageRating && (
        <BoldText style={labelStyles}>
          {productAdditionalDetail?.averageRating}
          <MediumText style={labelStyles}>/5</MediumText>
        </BoldText>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 6,
          marginBottom: 6,
        }}
      >
        {/* <StarRating
          disabled={false}
          maxStars={5}
          rating={Number(productAdditionalDetail?.averageRating ?? 5)}
          halfStarEnabled
          fullStarColor={darkGreen}
          starSize={imageSize || 12}
          starStyle={{ paddingHorizontal: 2 }}
        /> */}
        {!showRating && (
          <Text style={[commonStyles.fs12, { paddingLeft: 5 }]}>
            {productAdditionalDetail?.numberOfReviews || 8000} {reviews}
          </Text>
        )}
      </View>
    </>
  );
};

export default ProductRating;
