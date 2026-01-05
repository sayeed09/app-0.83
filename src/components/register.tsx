import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Formik } from 'formik';

import { useAuth } from '@context/auth';
import { useAsync } from '@hooks/use-async';

import { Loader } from './shared/loader';
import { CustomText } from '../../AndroidFontFix';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseInput: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: 'rgba(0,0,0,0.16)',
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 0.27,
    height: 40,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    paddingTop: 10,
  },
  inputLabel: {
    opacity: 0.6,
    fontSize: 14,
    color: '#525155',
    fontWeight: 'bold',
    letterSpacing: 0.23,
    lineHeight: 16,
    marginBottom: 10,
  },
  formWrap: {
    margin: 16,
    marginTop: 28,
    flex: 1,
  },
  bottomFloat: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: '100%',
  },
  primaryBtn: {
    borderRadius: 2,
    backgroundColor: '#937DFD',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.24,
    lineHeight: 24,
    textAlign: 'center',
    color: '#ffffff',
    overflow: 'hidden',
    borderColor: '#937DFD',
    borderWidth: 1,
  },
  textWithButton: {
    color: '#525155',
    fontSize: 13,
    letterSpacing: 0.24,
    lineHeight: 15,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  linkBtnText: {
    color: '#525155',
    fontSize: 13,
    letterSpacing: 0.24,
    lineHeight: 15,
    textAlign: 'center',
  },
  linkBtn: {
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
    color: '#525155',
    fontSize: 13,
    letterSpacing: 0.24,
    lineHeight: 15,
  },
  policyTerms: {
    color: '#525155',
    fontSize: 10,
    letterSpacing: 0.19,
    lineHeight: 12,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  policyTermsText: {
    color: '#525155',
    fontSize: 10,
    letterSpacing: 0.19,
    lineHeight: 12,
    textAlign: 'center',
  },
  policyTermsBtn: {
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
    color: '#525155',
    fontSize: 10,
    letterSpacing: 0.19,
    lineHeight: 12,
  },
});

const Register = ({ navigation }) => {
  const { user, register } = useAuth();
  const { isLoading, run } = useAsync();

  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 1,
        routes: [{ name: 'Dashboard' }],
      });
    }
  }, [navigation, user]);

  return (
    <>
      {isLoading && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              firstName: '',
              lastName: '',
            }}
            onSubmit={values => run(register(values))}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.formWrap}>
                <CustomText style={styles.inputLabel}>First Name</CustomText>
                <TextInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  style={styles.baseInput}
                  placeholder="First Name"
                />
                <CustomText style={styles.inputLabel}>Last Name</CustomText>
                <TextInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  style={styles.baseInput}
                  placeholder="Last Name"
                />
                <CustomText style={styles.inputLabel}>Email</CustomText>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.baseInput}
                  placeholder="Email"
                  autoComplete="email"
                />
                <CustomText style={styles.inputLabel}>
                  Password (8 characters minimum)
                </CustomText>
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.baseInput}
                  placeholder="Password"
                  autoComplete="password"
                  secureTextEntry
                />
                <View style={styles.bottomFloat}>
                  <View style={styles.textWithButton}>
                    <Text style={styles.linkBtnText}>Already registered? </Text>
                    <TouchableNativeFeedback onPress={() => navigation.pop()}>
                      <CustomText style={styles.linkBtn}>Login.</CustomText>
                    </TouchableNativeFeedback>
                  </View>
                  <TouchableNativeFeedback onPress={handleSubmit}>
                    <CustomText style={styles.primaryBtn}>Register</CustomText>
                  </TouchableNativeFeedback>
                  <View style={styles.policyTerms}>
                    <Text style={styles.policyTermsText}>
                      By pressing Next I agree to the{' '}
                    </Text>
                    <TouchableNativeFeedback>
                      <Text style={styles.policyTermsBtn}>Privacy Policy</Text>
                    </TouchableNativeFeedback>
                    <Text style={styles.policyTermsText}> & </Text>
                    <TouchableNativeFeedback>
                      <Text style={styles.policyTermsBtn}>Terms</Text>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;
