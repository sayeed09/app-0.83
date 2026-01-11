import FastImage from '@d11/react-native-fast-image';
import { Hr, Text } from 'components/base/foundation';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import WhiteCard from 'components/elements/card/white-card';
import ErrorText from 'components/form/validation-error-text';
import { ctaGreen, darkGreen, grayb3, grayd9 } from 'components/styles/colors';
import { useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import StarRating from 'react-native-star-rating-widget';
import Toast from 'react-native-toast-message';
import { createJudgemeReviewService, JudgeMeReviewRequestPayload } from 'services/judgeme';
import { formStyles } from 'styles/form';
import { ozivaShopifyDomain, width } from 'utils/constants';
import * as Yup from 'yup';

export interface ProductForReview {
  id: string;
  title: string;
  image: string;
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  inputField: {
    color: '#000',
    borderColor: grayd9,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

const WriteAReview = ({ route, navigation }): React.ReactElement => {
  const {
    productId,
    productTitle,
    productImageUrl,
  } = useLocalSearchParams<any>();

  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createJudgemeReview = (values) => {
    setIsSubmitting(true);
    const reviewPayload: JudgeMeReviewRequestPayload = {
      url: ozivaShopifyDomain,
      shop_domain: ozivaShopifyDomain,
      platform: 'shopify',
      name: values.name,
      email: values.email,
      rating,
      title: values.reviewTitle,
      body: values.reviewBody,
      id: productId.split('/')[4],
    };
    createJudgemeReviewService(reviewPayload).then(response => {
      if (response) {
        navigation.pop();
        Toast.show({
          text1: 'Thank you for submitting your review!',
          position: 'bottom',
          bottomOffset: 60,
          type: 'success',
        });
      }
    }).catch(err => {
      console.log("Error : ", err);
      showErrorSnacbar();
    })
  }

  const showErrorSnacbar = () => {
    Snackbar.show({
      text: 'An error occured. Please check form and try again.',
      duration: 3000,
    });
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().required('Please enter your email'),
    starRating: Yup.string().required('Please give rating'),
    reviewTitle: Yup.string().required('Please enter your review title'),
    reviewBody: Yup.string().required('Please enter your review title'),
  });

  let handleSubmitBind;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
        extraScrollHeight={40}
      >
        <ScrollView>
          <WhiteCard
            noBorderRadius
            style={{ margin: 0, padding: 0, paddingHorizontal: 10 }}
          >
            <BaseView row AlignLeft>
              <FastImage
                source={{
                  uri: productImageUrl,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <BaseView style={{ flex: 1, marginTop: 10 }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ fontWeight: 'bold' }}
                >
                  {productTitle}
                </Text>
              </BaseView>
            </BaseView>
            <BaseView>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  starRating: '',
                  reviewTitle: '',
                  reviewBody: '',
                }}
                validationSchema={ValidationSchema}
                onSubmit={values => createJudgemeReview(values)}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => {
                  handleSubmitBind = handleSubmit;
                  return (
                    <>
                      <View
                        style={{
                          width,
                          marginHorizontal: 20,
                          paddingHorizontal: 20,
                          marginTop: 14,
                          marginBottom: 14,
                        }}
                      >
                        <Text style={styles.inputLabel}>
                          Name (Displayed publicly)
                        </Text>
                        <TextInput
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                          style={styles.inputField}
                          placeholder="Enter your name"
                          placeholderTextColor={grayb3}
                        />
                        {errors.name && touched.name ? (
                          <ErrorText>{errors.name}</ErrorText>
                        ) : null}
                      </View>
                      <View
                        style={{
                          width,
                          marginHorizontal: 20,
                          paddingHorizontal: 20,
                          marginTop: 14,
                          marginBottom: 14,
                        }}
                      >
                        <Text style={styles.inputLabel}>Email (private)</Text>
                        <TextInput
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          style={styles.inputField}
                          keyboardType="email-address"
                          placeholder="Enter your email"
                          placeholderTextColor={grayb3}
                        />
                        {errors.email && touched.email ? (
                          <ErrorText>{errors.email}</ErrorText>
                        ) : null}
                      </View>
                      <Hr />
                      <BaseView>
                        <Text style={{ marginBottom: 15 }}>
                          Rate this product
                        </Text>
                        <StarRating
                          rating={Number(rating)}
                          enableHalfStar
                          color={darkGreen}
                          starSize={24}
                          starStyle={{ marginHorizontal: 1 }}
                          onChange={userRating => {
                            setRating(userRating);
                            setFieldValue('starRating', userRating, true);
                          }} />
                        <Text style={{ marginTop: 15, marginBottom: 10 }}>
                          Rate on a scale of 5
                        </Text>
                        {errors.starRating && touched.starRating ? (
                          <ErrorText>{errors.starRating}</ErrorText>
                        ) : null}
                      </BaseView>
                      <View
                        style={{ height: 10, backgroundColor: grayd9, flex: 1 }}
                      />
                      <View
                        style={{
                          width,
                          marginHorizontal: 20,
                          paddingHorizontal: 20,
                          marginTop: 14,
                          marginBottom: 14,
                        }}
                      >
                        <Text style={styles.inputLabel}>Review Title</Text>

                        <TextInput
                          onChangeText={handleChange('reviewTitle')}
                          onBlur={handleBlur('reviewTitle')}
                          value={values.reviewTitle}
                          style={styles.inputField}
                          placeholder="Give your title"
                          placeholderTextColor={grayb3}
                        />
                        {errors.reviewTitle && touched.reviewTitle ? (
                          <ErrorText>{errors.reviewTitle}</ErrorText>
                        ) : null}
                      </View>
                      <View
                        style={{
                          width,
                          marginHorizontal: 20,
                          paddingHorizontal: 20,
                          marginTop: 14,
                          marginBottom: 14,
                        }}
                      >
                        <Text style={styles.inputLabel}>Review</Text>
                        <View>
                          <TextInput
                            onChangeText={handleChange('reviewBody')}
                            onBlur={handleBlur('reviewBody')}
                            value={values.reviewBody}
                            style={[
                              styles.inputField,
                              formStyles.textArea,
                              { paddingTop: 10 },
                            ]}
                            placeholder="Write your review here"
                            placeholderTextColor={grayb3}
                            multiline
                            numberOfLines={10}
                          />
                          {errors.reviewBody && touched.reviewBody ? (
                            <ErrorText>{errors.reviewBody}</ErrorText>
                          ) : null}
                        </View>
                      </View>
                    </>
                  );
                }}
              </Formik>
            </BaseView>
          </WhiteCard>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={{ padding: 5, backgroundColor: '#fff', zIndex: 10 }}>
        <PrimaryButton
          accentColor={ctaGreen}
          title="SUBMIT REVIEW"
          onAction={() => handleSubmitBind()}
          disabled={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};
export default WriteAReview;
