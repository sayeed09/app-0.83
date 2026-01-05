import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { Text } from 'components/base/foundation';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import WhiteCard from 'components/elements/card/white-card';
import ErrorText from 'components/form/validation-error-text';
import { ctaGreen, grayb3, grayd9 } from 'components/styles/colors';
import { Formik } from 'formik';
import { formStyles } from 'styles/form';
import { ozivaShopifyDomain, width } from 'utils/constants';
import * as Yup from 'yup';
import { judgemeCreateQuestionService, JudgeMeQuestionRequestPayload } from 'services/judgeme';

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
  iosTextInputMultilineField: {
    paddingTop: 10,
    height: 140,
    // paddingVertical: 14
  },
});
let handleSubmitBind;

const AskAQuestion = ({ route, navigation }): React.ReactElement => {
  const isIOS = Platform.OS === 'ios';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productId, productTitle } = route.params || {};

  const judgemeCreateQuestion = (values) => {
    setIsSubmitting(true);
    const questionPayload: JudgeMeQuestionRequestPayload = {
      url: ozivaShopifyDomain,
      shop_domain: ozivaShopifyDomain,
      platform: 'shopify',
      name: values.name,
      email: values.email,
      question_content: values.question,
      id: productId.split('/')[4],
      product_title: productTitle,
    };

    judgemeCreateQuestionService(questionPayload).then(response => {
      if(response){
        navigation.pop();
        showSnacbar();
      }
    }).catch(err => {
      console.log("Error : ", err);
      showErrorSnacbar();
    })
  }

  const showSnacbar = () => {
    Snackbar.show({
      text: "Thank you for your question! We'll notify you once it gets answered.",
      duration: 3000,
    });
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().required('Please enter your email'),
    question: Yup.string().required('Please enter your question'),
  });

  const showErrorSnacbar = () => {
    Snackbar.show({
      text: 'An error occured. Please check form and try again.',
      duration: 3000,
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <WhiteCard
          noBorderRadius
          style={{
            margin: 0,
            padding: 0,
            paddingHorizontal: 10,
            flex: 1,
          }}
        >
          <BaseView>
            <Formik
              initialValues={{
                name: '',
                email: '',
                question: '',
              }}
              validationSchema={ValidationSchema}
              onSubmit={values => judgemeCreateQuestion(values)}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
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
                      <Text style={styles.inputLabel}>Name (private)</Text>
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
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        placeholderTextColor={grayb3}
                      />
                      {errors.email && touched.email ? (
                        <ErrorText>{errors.email}</ErrorText>
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
                      <Text style={styles.inputLabel}>Question</Text>
                      <TextInput
                        onChangeText={handleChange('question')}
                        onBlur={handleBlur('question')}
                        value={values.question}
                        multiline
                        numberOfLines={10}
                        style={[
                          styles.inputField,
                          formStyles.textArea,
                          isIOS ? styles.iosTextInputMultilineField : {},
                        ]}
                        placeholder="Write your question here"
                        placeholderTextColor={grayb3}
                      />
                      {errors.question && touched.question ? (
                        <ErrorText>{errors.question}</ErrorText>
                      ) : null}
                    </View>
                  </>
                );
              }}
            </Formik>
          </BaseView>
        </WhiteCard>
      </ScrollView>
      <View style={{ padding: 5, backgroundColor: '#fff', zIndex: 10 }}>
        <PrimaryButton
          accentColor={ctaGreen}
          title="SUBMIT QUESTION"
          onAction={() => handleSubmitBind()}
          disabled={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default AskAQuestion;
