import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import SecondaryButton from '@components/elements/button/secondary-button';
import GrayCard from '@components/elements/card/gray-card';
import WhiteCard from '@components/elements/card/white-card';
import Loader from '@components/elements/loader/loader';
// import SelectInput from '@components/elements/select/select';
import ProductRating from '@components/shared/product-ratings';
import { RatingWrapper, SmallText } from '@components/styled/common';
import { darkGreen, grayb3, green } from '@components/styles/colors';
import { commonStyles } from '@styles/common';
import {
  customerReviewsCustom,
  judgeMeAPIToken,
  ozivaShopifyDomain,
  // reviewSortKeys,
  width,
} from '@utils/constants';

import { setLoginModal } from 'actions/modals';
import LoginModal from 'components/login/standard/login-modal';
import { useModalsDispatch, useModalsState } from 'context/modals';
import { Product } from 'models/product';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { getUser } from 'services/auth';
import { CustomText } from '../../../AndroidFontFix';
import { ProductStyles } from './productStyles';
import { ProductForReview } from './write-a-review';

import FastImage from '@d11/react-native-fast-image';
import { parseRatings } from '@utils/common';
import { BaseView } from 'components/base/view';
import OZModal from 'components/modal';
import { router } from 'expo-router';
import { ICustomerReview, ICustomerReviewResponse } from 'models/product-details/customer-review';
import { axiosClient } from 'services/axios';
import { fetchJudgemeReviewsService, reportReviewService } from 'services/judgeme';

const sortOptions = {
  'Pictures First': 'PICTUREFIRST',
  'Most Recent': 'CREATED_AT',
  'Top Rated': 'RATING',
  'Low Rated': 'RATING'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseInput: {
    borderWidth: 1,
    color: '#000',
    borderColor: 'rgba(0,0,0,0.16)',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.014,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  formWrap: {
    marginHorizontal: 4,
    marginLeft: 0,
    marginTop: 8,
    flex: 1,
  }
});

const MostRecent = ({ item }, submitReport, navigation) => {
  return (
    <>

    </>
  );
};


interface Props {
  productId: string;
  navigation: any;
  product: ProductForReview;
  productAdditionalDetails: Product | undefined;
}

const RenderCustomerReviews = ({
  reviewsFrequency,
  reviewsRating,
  reviewsPercentage,
}) => (
  <View
    style={[
      commonStyles.flexRow,
      commonStyles.pv10,
      { justifyContent: 'center', alignItems: 'center' },
    ]}>
    <View style={{ width: width / 3 }}>
      <StarRatingDisplay
        maxStars={5}
        rating={Number(reviewsRating)}
        enableHalfStar
        color={darkGreen}
        starSize={22}
        starStyle={{ paddingHorizontal: 0, marginHorizontal: 1 }}
      />
    </View>
    <View style={[commonStyles.flex, commonStyles.flexRow]}>
      <Progress.Bar
        progress={reviewsPercentage / 100}
        width={width * 0.32}
        height={20}
        borderRadius={4}
        color="#006E5A"
        unfilledColor="#F2F2F2"
        borderColor="#F2F2F2"
        borderWidth={0}
      />
    </View>
    <View style={[commonStyles.flexRow, { width: width / 4.2 }]}>
      <Text style={[commonStyles.pl4]}>{reviewsPercentage}%</Text>
      <Text style={{ color: '#969696', marginLeft: 2 }}>({reviewsFrequency})</Text>
    </View>
  </View>
);

const CustomerReviews = ({
  productId,
  navigation,
  product,
  productAdditionalDetails,
}: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [reviewData, setReviewData] = useState<ICustomerReview[]>([]);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalsDispatch = useModalsDispatch();
  const { loginModalVisbility } = useModalsState();
  const [reviewSummary, setReviewSummary] = useState();
  const [loading, setLoading] = useState(true);
  const [reviewFilters, setReviewFilters] = useState<IReviewFilter>({ page: 1, pageSize: 10, sortBy: 'PICTUREFIRST', sortOrder: 'DESC' });
  const [reviewFiltersModal, setReviewFilterModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Pictures First');

  interface IReviewFilter {
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string
  }

  const getCustomerReviews = async () => {
    let query = new URLSearchParams(reviewFilters);

    const { data } = await axiosClient.get<ICustomerReviewResponse>(
      `${customerReviewsCustom}/${productId}?${query}`,
    );
    setLoading(false);
    return (data?.data?.reviews);
  }


  const fetchJudgemReviews = () => {
    const payload = {
      api_token: judgeMeAPIToken,
      shop_domain: ozivaShopifyDomain,
      external_id: productId,
    };
    fetchJudgemeReviewsService(payload).then(response => {
      if (response) setReviewSummary(parseRatings(response));
    })
  }

  useEffect(() => {
    fetchJudgemReviews();
  }, []);

  useEffect(() => {
    if (pageNumber != 1)
      setReviewFilters(prevState => ({
        ...prevState,
        page: pageNumber
      }));
  }, [pageNumber]);

  useEffect(() => {
    async function customerReviews() {
      const data = await getCustomerReviews();
      const updatedReview = [...reviewData, ...data];
      setReviewData(updatedReview);
    }
    customerReviews();
  }, [reviewFilters]);

  const submitReport = async id => {
    const user = await getUser();
    if (!user) {
      setShowModal(true);
      setIsLoginSuccessful(false);
      modalsDispatch(setLoginModal(true));
      return;
    }
    Alert.alert(
      'Report abuse',
      'If you find this content inappropriate and think it should be removed from the OZiva site, let us know by clicking the button below.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await reportReviewService({
              userHash: user.authToken ?? '',
              reviewId: id,
            })
          },
        },
      ],
    );
  };


  const ListItem = memo(({ item }: any) => {
    return (
      <View key={item?.title} style={[commonStyles.pv5]}>
        <WhiteCard >
          <View
            style={[
              commonStyles.flexRow,
              { justifyContent: 'space-around', alignItems: 'center' },
            ]}
          >
            <View
              style={{
                backgroundColor: '#99C5BD',
                width: 35,
                height: 35,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 50,
              }}
            >
              <CustomText
                style={{
                  fontSize: 16,
                  lineHeight: 26,
                  fontWeight: 'bold',
                  color: '#006E5A',
                  textTransform: 'uppercase',
                }}
              >
                {item?.reviewer?.name?.charAt(0)}
              </CustomText>
            </View>
            <View
              style={[
                commonStyles.flexColumn,
                commonStyles.flex,
                commonStyles.pl10,
              ]}
            >
              <RatingWrapper>
                <StarRatingDisplay
                  rating={Number(item?.rating)}
                  enableHalfStar
                  color={darkGreen}
                  starSize={20}
                  starStyle={{ marginHorizontal: 1 }}
                />
                <Text style={[commonStyles.ph10, { color: '#969696' }]}>
                  {dayjs(item?.createdAt).format('DD/MM/YYYY')}
                </Text>
              </RatingWrapper>
              <View style={{ flexDirection: 'row' }}>
                {item?.verified === 'buyer' && (
                  <SmallText
                    style={{
                      fontSize: 8,
                      backgroundColor: '#006E5A',
                      color: '#fff',
                      paddingTop: 4,
                      textAlign: 'center',
                      paddingHorizontal: 6,
                      borderRadius: 10,
                      height: 20,
                    }}
                  >
                    Verified
                  </SmallText>
                )}
                <CustomText
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    color: '#000000',
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  {item?.reviewer?.name}
                </CustomText>
              </View>
            </View>
          </View>
          {item?.pictures && !item?.pictures.hidden ?
            <View style={[commonStyles.flexRow]}>
              {item?.pictures.map((image, index) => {
                return (
                  <Pressable
                    key={image?.urls?.compact}
                    style={{ margin: 4 }}
                    onPress={() =>
                      navigation.push('ProductImages', {
                        imageUrl: image?.urls?.huge,
                      })
                    }
                  >
                    <FastImage
                      source={{
                        uri: image?.urls?.compact,
                      }}
                      style={{ width: 100, height: 160 }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </Pressable>
                );
              })}
            </View>
            : null}
          <View style={[commonStyles.flexColumn]}>
            <CustomText
              style={{
                fontSize: 16,
                lineHeight: 26,
                color: '#000000',
                fontWeight: 'bold',
              }}
            >
              {item?.title}
            </CustomText>
            <Text style={{ color: '#969696', minHeight: 80 }}>{item?.body}</Text>
            {item?.replyContent && (
              <View style={[commonStyles.pt20]}>
                <GrayCard>
                  <Text>
                    <CustomText
                      style={{
                        fontSize: 16,
                        lineHeight: 26,
                        color: '#000000',
                        fontWeight: 'bold',
                      }}
                    >
                      Oziva
                    </CustomText>{' '}
                    replied:
                  </Text>
                  <Text style={[commonStyles.pl10]}>{item?.replyContent}</Text>
                </GrayCard>
              </View>
            )}
          </View>

          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <TouchableOpacity>
              <Text style={{ color: green, marginRight: 10 }}>HELPFUL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                submitReport(item.id);
              }}
            >
              <Text style={{ color: green }}>REPORT</Text>
            </TouchableOpacity>
          </View>
        </WhiteCard>
      </View>
    );
  });
  const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);
  return (
    <View style={[commonStyles.pv5, commonStyles.flex, {
      borderTopColor: '#eee', borderTopWidth: 1
    }]} key={productId}>
      <WhiteCard noBorderRadius >
        <CustomText style={[commonStyles.h2Tag, commonStyles.BlackColor]}>
          Customer Reviews
        </CustomText>
        <View
          style={[
            commonStyles.flexRow,
            commonStyles.flex,
            commonStyles.pv5,
            { justifyContent: 'space-between' },
          ]}>
          <View style={[commonStyles.flexColumn, { justifyContent: 'center', flexShrink: 1 }]}>
            <ProductRating
              productId={productId}
              showRating
              imageSize={24}
              labelStyles={{ fontSize: 20 }}
              productAdditionalDetail={productAdditionalDetails}
            />
            <View>
              {productAdditionalDetails?.numberOfReviews && (
                <Text style={[commonStyles.fs14]}>
                  Based on {productAdditionalDetails?.numberOfReviews} reviews
                </Text>
              )}
            </View>
          </View>
          <View style={[commonStyles.flexColumn]}>
            <SecondaryButton
              onAction={() => {
                router.push({
                  pathname: '/WriteAReview',
                  params: {
                    productId: product?.id,
                    productTitle: product.title,
                    productImageUrl: product.image,
                  },
                });
                // navigation.navigate('WriteAReview', {
                //   productId: product?.id,
                //   productTitle: product.title,
                //   productImageUrl: product.image,
                // });
              }}
              style={
                (ProductStyles.btn,
                {
                  width: (width - 40) / 2,
                  justifyContent: 'space-around',
                  margin: 2,
                })
              }
              title="Write a review"
              accentColor="#FF6F00"
              fontSize={12}
              height={38}
            />
            <Pressable
              onPress={() => {
                setReviewFilterModal(true);
                Keyboard.dismiss();
              }}
              style={
                (ProductStyles.btn,
                {
                  width: (width - 40) / 2,
                  justifyContent: 'center',
                  margin: 2,
                  flexDirection: 'row',
                  borderColor: '#bdbdbd',
                  borderWidth: 2,
                  height: 38,
                  alignItems: 'center'
                })
              }
            >
              <Text style={{ fontSize: 12, color: '#424242' }}>{selectedSort}</Text>
              <Icon name={'chevron-down'} size={24} />
            </Pressable>
            {/* <SecondaryButton
              onAction={() => {
                navigation.navigate('AskAQuestion', {
                  productId: product?.id,
                  productTitle: product?.title,
                  productImageUrl: product?.image,
                  // productHandle: product?.handle,
                });
              }}
              style={
                (ProductStyles.btn,
                {
                  width: width / 2,
                  justifyContent: 'space-around',
                  margin: 2,
                })
              }
              title="Ask a question"
              accentColor="#FF6F00"
              fontSize={12}
              height={38}
            /> */}

            <OZModal
              visible={reviewFiltersModal}
              onRequestClose={() => setReviewFilterModal(false)}
              setModalVisible={setReviewFilterModal}
              contentContainerStyles={{ height: 250 }}
              title="Sort By"
              transparent
              animationType="fade">
              <ScrollView>
                <View
                  style={{ flex: 1, width, marginHorizontal: 20 }}
                >
                  {Object.keys(sortOptions).map(state => (
                    <Pressable
                      key={state}
                      onPress={() => {
                        setReviewData([]);
                        setSelectedSort(state);
                        setReviewFilters(prevState => ({
                          ...prevState,
                          page: 1,
                          sortBy: sortOptions[state],
                          sortOrder: (sortOptions[state] == 'RATING') ? state == 'Top Rated' ? 'DESC' : 'ASC' : 'DESC'
                        }))
                        setReviewFilterModal(false);
                      }}
                    >
                      <BaseView
                        AlignLeft
                        style={{
                          borderBottomColor: grayb3,
                          borderBottomWidth: 1,
                        }}
                      >
                        <Text
                          style={{
                            paddingVertical: 16,
                            fontSize: 16,
                            fontFamily: 'Roboto-Regular',
                          }}
                        >
                          {state}
                        </Text>
                      </BaseView>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </OZModal>
          </View>
        </View>
        {reviewSummary && (
          <View style={[commonStyles.pv10]}>
            <RenderCustomerReviews
              reviewsFrequency={reviewSummary['rating-5']['data-frequency']}
              reviewsRating={reviewSummary['rating-5']['data-rating']}
              reviewsPercentage={reviewSummary['rating-5']['data-percentage']}
            />
            <RenderCustomerReviews
              reviewsFrequency={reviewSummary['rating-4']['data-frequency']}
              reviewsRating={reviewSummary['rating-4']['data-rating']}
              reviewsPercentage={reviewSummary['rating-4']['data-percentage']}
            />
            <RenderCustomerReviews
              reviewsFrequency={reviewSummary['rating-3']['data-frequency']}
              reviewsRating={reviewSummary['rating-3']['data-rating']}
              reviewsPercentage={reviewSummary['rating-3']['data-percentage']}
            />
            <RenderCustomerReviews
              reviewsFrequency={reviewSummary['rating-2']['data-frequency']}
              reviewsRating={reviewSummary['rating-2']['data-rating']}
              reviewsPercentage={reviewSummary['rating-2']['data-percentage']}
            />
            <RenderCustomerReviews
              reviewsFrequency={reviewSummary['rating-1']['data-frequency']}
              reviewsRating={reviewSummary['rating-1']['data-rating']}
              reviewsPercentage={reviewSummary['rating-1']['data-percentage']}
            />
          </View>
        )}
        <View>
        </View>
        <View>
          <FlatList
            data={reviewData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10} // Renders only 10 items initially
            maxToRenderPerBatch={5} // Renders items in batches of 5
            windowSize={5} // Opti
          />
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            {reviewData?.length !== 0 && (
              <SecondaryButton
                onAction={() => setPageNumber((pageNumber) => pageNumber + 1)}
                style={
                  (ProductStyles.btn,
                  {
                    justifyContent: 'center',
                    paddinVertical: 30,
                  })
                }
                textColor="#006E5A"
                title="VIEW MORE"
                accentColor="#fff"
                fontSize={12}
                height={38}
              />
            )}
          </>
        )}
      </WhiteCard>

      {loginModalVisbility ? <LoginModal /> : null}
    </View>
  );
};

export default React.memo(CustomerReviews);
