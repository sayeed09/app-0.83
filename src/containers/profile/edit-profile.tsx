import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
// import { useQueryClient } from 'react-query';
// import { getUserDetails } from 'rest/profile-react-query';
import CalendatSvgIcon from 'assets/images/icons/standard-icons/calendar-icon';
// import ListItem from 'components/elements/lists/item';
import dayjs from 'dayjs';
import { FormikErrors, useFormik } from 'formik';

import {
  Box,
  // Image,
  Text,
} from '@components/base/foundation';
import PrimaryButton from '@components/elements/button/primary-Button';
import { UserDetails } from '@models/user';
import { useAuthDispatch } from 'context/auth';
import { useCheckoutDispatch } from 'context/checkout';
import { useModalsDispatch } from 'context/modals';
import useLogin from 'hooks/login';
import { UserProfileResponseModel } from 'models/auth';
import { getUserProfileDataService, updateUserProfileService } from 'services/user';
// import { client } from 'services/api-client';
// import { userProfilePath } from 'utils/constants';

const styles = {
  profileImage: { width: 60, height: 60, borderRadius: 60 },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  inputContainer: {
    padding: 0,
    margin: 0,
  },
  inputFocused: { borderBottomColor: '#6BBD58', borderBottomWidth: 1 },
  textFocused: { color: '#6BBD58' },
};

const EditProfile = ({
  navigation,
}: {
  navigation: any;
}) => {
  const [autoValidate, setAutoValidate] = useState(false);
  const [userProfileData, setUserProfileData] = useState<UserProfileResponseModel>();

  const modalsDispatch = useModalsDispatch();
  const authDispatch = useAuthDispatch();
  const checkoutDispatch = useCheckoutDispatch();
  const { handleLogout } = useLogin();

  const updateUserProfile = (profilePayload: UserDetails) => {
    updateUserProfileService(profilePayload).then(() => {
      Toast.show({ type: 'info', text1: 'Updated profile' });
      navigation.goBack();
    }).catch(error => {
      Toast.show({ type: 'error', text1: 'Error, could not update' });
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate('ProfileScreen');
      }
    })
  }

  const getUserProfile = () => {
    getUserProfileDataService()
      .then((response: UserProfileResponseModel) => {
        setUserProfileData(response);
      })
      .catch((error) => {
        console.log("Error while getting user profile : ", error);
        if (error?.response?.status === 401) {
          handleLogout();
          navigation.navigate('ProfileScreen');
        }
      });
  }

  const save = async (values: UserDetails) => {
    updateUserProfile(values)
  };
  const initialValues = {
    firstName: userProfileData?.userDetails?.firstName ?? '',
    lastName: userProfileData?.userDetails?.lastName ?? '',
    gender: userProfileData?.userDetails?.gender ?? '',
    dateOfBirth: userProfileData?.userDetails?.dateOfBirth,
    phone: userProfileData?.userDetails?.phone ?? '',
    email: userProfileData?.userDetails?.email ?? '',
  };

  const validate = (formValues: UserDetails) => {
    const formErrors: FormikErrors<UserDetails> = {};
    const a = dayjs(new Date());
    const b = dayjs(new Date(formValues?.dateOfBirth));
    const dateDiff = a.diff(b, 'years');
    if (dateDiff < 18) {
      formErrors.dateOfBirth = 'Age should be greater than 17 years';
    }
    if (!formValues.firstName.trim()) {
      formErrors.firstName = 'Name is required';
    }
    if (!formValues.lastName.trim()) {
      formErrors.lastName = 'Name is required';
    }
    if (formValues.firstName.length < 3) {
      formErrors.firstName = 'Please enter at least 3 characters';
    }
    if (formValues.lastName.length < 3) {
      formErrors.lastName = 'Please enter at least 3 characters';
    }
    // if (!formValues.dateOfBirth?.trim()) {
    //   formErrors.dateOfBirth = 'Date of birth is required';
    // }
    // if (!formValues.email.trim()) {
    //   formErrors.email = 'Email is required';
    // }
    return formErrors;
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const {
    submitForm,
    errors,
    setFieldValue,
    values,
    setFieldTouched,
  } = useFormik<UserDetails>({
    validate,
    initialValues,
    validateOnBlur: autoValidate,
    validateOnChange: autoValidate,
    onSubmit: save,
    enableReinitialize: true,
  });
  const handleSavePress = () => {
    setAutoValidate(true);
    return submitForm();
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    setFieldValue('dateOfBirth', dayjs(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    dateOfBirth: false,
    phone: false,
    email: false,
  });
  const handleInputFocus = (key, focused) => {
    let isFocusedCopy = Object.assign({}, isFocused);
    isFocusedCopy[key] = focused;
    setIsFocused(isFocusedCopy);
  };
  return (
    <Box flex={1} backgroundColor="levelOneBg">
      <ScrollView flex={1}>
        {/* <Box p={4}>
          <ListItem
            left={
              <Image
                source={{ uri: 'https://unsplash.it/180/180?image=1' }}
                style={styles.profileImage}
              />
            }
          >
            <Pressable onPress={upload}>
              <Text color="brandPrimary">Add a profile picture</Text>
            </Pressable>
          </ListItem>
        </Box> */}
        <Box pt={4}>
          <Input
            style={styles.inputContainer}
            label="First Name"
            errorMessage={errors.firstName}
            value={values.firstName}
            onChangeText={value => setFieldValue('firstName', value)}
            onBlur={() => {
              handleInputFocus('firstName', false);
              setFieldTouched('firstName', true);
            }}
            onFocus={() => handleInputFocus('firstName', true)}
            labelStyle={isFocused.firstName ? [styles.textFocused] : []}
            inputStyle={isFocused.firstName ? [styles.inputFocused] : []}
          />
        </Box>
        <Box>
          <Input
            style={styles.inputContainer}
            label="Last Name"
            errorMessage={errors.lastName}
            value={values.lastName}
            onChangeText={value => setFieldValue('lastName', value)}
            onBlur={() => {
              handleInputFocus('lastName', false);
              setFieldTouched('lastName', true);
            }}
            onFocus={() => handleInputFocus('lastName', true)}
            labelStyle={isFocused.lastName ? [styles.textFocused] : []}
            inputStyle={isFocused.lastName ? [styles.inputFocused] : []}
          />
        </Box>
        <Box>
          <Input label="Mobile" disabled value={values.phone} />
        </Box>
        <Box>
          <Input
            label="Email"
            autoCapitalize="none"
            onChangeText={value => setFieldValue('email', value)}
            errorMessage={errors.email}
            value={values.email}
            keyboardType="email-address"
            onBlur={() => {
              handleInputFocus('email', false);
              setFieldTouched('email', true);
            }}
            onFocus={() => handleInputFocus('email', true)}
            labelStyle={isFocused.email ? [styles.textFocused] : []}
            inputStyle={isFocused.email ? [styles.inputFocused] : []}
          />
        </Box>
        <Text px={3}>Gender</Text>
        <Box flexDirection="row">
          <CheckBox
            containerStyle={styles.checkBoxContainer}
            title="Male"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#FF6F00"
            onPress={() => setFieldValue('gender', 'Male')}
            checked={values.gender === 'Male'}
          />
          <CheckBox
            containerStyle={styles.checkBoxContainer}
            title="Female"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#FF6F00"
            onPress={() => setFieldValue('gender', 'Female')}
            checked={values.gender === 'Female'}
          />
        </Box>
        <Box pb={4}>
          <Pressable onPress={showDatePicker}>
            <Input
              label="DOB"
              errorMessage={errors.dateOfBirth}
              value={values.dateOfBirth}
              disabled
              rightIcon={
                <View style={{ marginRight: 8 }}>
                  <CalendatSvgIcon />
                </View>
              }
            />
          </Pressable>
        </Box>
      </ScrollView>
      <View style={{ padding: 5 }}>
        <PrimaryButton
          accentColor="#FF6F00"
          title="SAVE"
          onAction={handleSavePress}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        // minimumDate={new Date()}
        date={dayjs(values.dateOfBirth ?? new Date()).toDate()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Box>
  );
};
export default EditProfile;
