/* eslint-disable @typescript-eslint/naming-convention */
import OZCheckbox from 'components/base/checkbox/oz-checkbox';
import { RadioAction, RadioCheck } from 'components/base/checkbox/styled';
import { BaseView } from 'components/base/view';
import ErrorText from 'components/form/validation-error-text';
import OZModal from 'components/modal';
import { gray7E, grayb3 } from 'components/styles/colors';
import { Formik } from 'formik';
import { AddressType, addressTypes, UserAddress } from 'models/shop/address';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    createUserAddressService,
    fetchCityStateFromPincode,
    getAllAddressService,
    PincodeData,
    updateUserAddressService,
} from 'services/address';
import { getUserPhone } from 'services/auth';
import { states, width } from 'utils/constants';
import * as Yup from 'yup';

import PrimaryButton from '@components/elements/button/primary-Button';
import { useCheckoutDispatch, useCheckoutState } from '@context/checkout';
import { CustomerAddressPayload } from '@models/shop/checkout';
import {
    updateUserMoEngageProfile,
} from '@utils/common';
import { setSubscriptionAddress } from 'actions/checkout';
import { useModalsDispatch } from 'context/modals';
import { useLocalSearchParams } from 'expo-router';
import useLogin from 'hooks/login';
import { SafeAreaView } from 'react-native-safe-area-context';
import { patchAddressService } from 'services/checkout';
import { commonStyles } from 'styles/common';
import { getProvinceFromPincode } from 'utils/checkout';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    disabledInput: {
        backgroundColor: '#ccc',
    },
    inputFocused: { borderColor: '#6BBD58' },
    textFocused: { color: '#6BBD58' },
    baseInput: {
        borderWidth: 1,
        color: '#000',
        borderColor: 'rgba(0,0,0,0.16)',
        fontSize: 14,
        // lineHeight: 20,
        letterSpacing: 0.014,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 16,
        borderRadius: 2,
        height: 50,
    },
    inputLabel: {
        opacity: 0.6,
        fontSize: 14,
        color: '#525155',
        fontWeight: 'bold',
        letterSpacing: 0.23,
        lineHeight: 16,
        marginBottom: 5,
    },
    formWrap: {
        marginHorizontal: 10,
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
    addressSectiontitles: {
        padding: 8,
        backgroundColor: 'white',
        marginHorizontal: 16,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    checkBoxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingHorizontal: 0,
    },
});

const requiredString = 'This field is required';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .required(requiredString)
        .min(3, 'Please enter at least 3 characters'),
    lastName: Yup.string()
        .trim()
        .required(requiredString)
        .min(3, 'Please enter at least 3 characters'),
    mobile: Yup.string()
        .trim()
        .required()
        .matches(/^[0-9]+$/, 'Please enter only digits')
        .min(10, 'Please enter exactly 10 digits')
        .max(10, 'Please enter exactly 10 digits'),
    email: Yup.string()
        .matches(emailRegex, "Please enter a valid email")
        .required("Email is Required")
        .trim(),
    address1: Yup.string()
        .trim()
        .max(255, 'Address too long')
        .required(requiredString),
    address2: Yup.string().trim().max(255, 'Address too long'),
    pincode: Yup.string()
        .required(requiredString)
        .matches(/^[1-9][0-9]{5}$/, 'Please enter valid pincode')
        .min(6, 'Please enter valid pincode')
        .max(6, 'Please enter valid pincode'),
    city: Yup.string().trim().required(requiredString),
    state: Yup.string().trim().required(requiredString),
    country: Yup.string().required(requiredString),
});

const AddAddress = ({ navigation, route }): React.ReactElement => {
    let handleSubmitFromOutside;
    const { checkout_id } = useCheckoutState();
    const [userPhone, setUserPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [statesModal, setStatesModal] = useState(false);
    const checkoutDispatch = useCheckoutDispatch();
    const modalsDispatch = useModalsDispatch();
    const { handleLogout } = useLogin();
    const [errorMessage, setErrorMessage] = useState('');
    const [userAddressList, setUserAddressList] = useState();
    const {
        address, isSubscription, screenName, navigateTo
    } = useLocalSearchParams<any>();
    const [checkedAddressType, setCheckedAddressType] = useState(
        AddressType[address?.addressType] || AddressType.HOME,
    );
    const [defaultAddress, setDefaultAddress] = useState(
        address?.defaultAddress || false,
    );
    const [acceptsMarketing, setAcceptsMarketing] = useState(
        address?.acceptsMarketing || false,
    );
    const [isFocused, setIsFocused] = useState({
        firstName: false,
        lastName: false,
        mobile: false,
        email: false,
        address1: false,
        address2: false,
        pincode: false,
        city: false,
        state: false,
        country: false,
    });

    const getAddresses = async () => {
        try {
            const addressList = await getAllAddressService();
            setUserAddressList(addressList);
        } catch (error: any) {
            console.log("Error : ", error);
            if (error?.response?.status === 401) {
                handleLogout();
                navigation.navigate(screenName === 'CartScreen' ? 'CartScreen' : 'ProfileScreen'); //To handle ProfileScreen and Checkout Screen navigation
            }
        }
    }

    useEffect(() => {
        (async () => {
            const userPhoneFromStorage = await getUserPhone();
            setUserPhone(userPhoneFromStorage);
        })();
        navigation.addListener('focus', () => {
            getAddresses();
        });
        return () => {
            navigation.removeListener('focus', () => {
                getAddresses();
            });
        };
    }, []);
    const handleInputFocus = (key, focused) => {
        let isFocusedCopy = Object.assign({}, isFocused);
        isFocusedCopy[key] = focused;
        setIsFocused(isFocusedCopy);
    };

    const checkIfFirstEnteredAddress = allAddresses =>
        allAddresses?.allUserAddresses?.data.length === 0 || !allAddresses;
    return (
        <>
            <SafeAreaView style={commonStyles.flex}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ flex: 1, position: 'relative' }}>
                            <Formik
                                validateOnChange
                                enableReinitialize
                                initialValues={{
                                    firstName: address?.firstName || '',
                                    lastName: address?.lastName || '',
                                    mobile: userPhone,
                                    email: address?.email || '',
                                    address1: address?.address1 || '',
                                    address2: address?.address2 || '',
                                    pincode: address?.zip || '',
                                    city: address?.city || '',
                                    state: address?.province || '',
                                    country: 'India',
                                }}
                                validationSchema={ValidationSchema}
                                onSubmit={async data => {
                                    setLoading(true);
                                    const isFirstAddress = checkIfFirstEnteredAddress(userAddressList);
                                    const userAddressPayloadToSave: UserAddress = {
                                        addressId: address?.id || undefined,
                                        acceptsMarketing: acceptsMarketing || false,
                                        address1: data.address1,
                                        address2: data.address2 === '' ? undefined : data.address2,
                                        firstName: data.firstName,
                                        lastName: data.lastName,
                                        email: data.email || '',
                                        city: data.city,
                                        phone: data.mobile,
                                        zip: data.pincode,
                                        country: data.country,
                                        province: data.state,
                                        addressType: checkedAddressType,
                                        defaultAddress: isFirstAddress || defaultAddress,
                                    };
                                    let addressPayloadToSend: CustomerAddressPayload = {
                                        ...userAddressPayloadToSave,
                                        checkoutId: checkout_id,
                                    };
                                    if (
                                        !addressPayloadToSend.province ||
                                        (addressPayloadToSend.province &&
                                            addressPayloadToSend.province === addressPayloadToSend.city)
                                    ) {
                                        addressPayloadToSend = await getProvinceFromPincode(
                                            addressPayloadToSend,
                                        );
                                        userAddressPayloadToSave.province =
                                            addressPayloadToSend.province;
                                    }
                                    try {
                                        const payload = { ...addressPayloadToSend };
                                        if (checkout_id) {
                                            await patchAddressService(checkout_id, payload);
                                        }
                                        if (address?.id) {
                                            await updateUserAddressService(
                                                userAddressPayloadToSave,
                                            );
                                        } else {
                                            await createUserAddressService(userAddressPayloadToSave);
                                        }
                                        Toast.show({
                                            text1: address?.id
                                                ? 'Your address has been updated.'
                                                : 'Your address has been saved.',
                                            position: 'bottom',
                                            bottomOffset: 70,
                                            type: 'success',
                                        });
                                        setLoading(false);
                                        updateUserMoEngageProfile(userAddressPayloadToSave);
                                        if (isSubscription) {
                                            checkoutDispatch(
                                                setSubscriptionAddress(userAddressPayloadToSave),
                                            );
                                            navigation.navigate('SubscriptionAddressOrderSummary');
                                        } else {
                                            navigation.navigate(
                                                navigateTo || 'AddressOrderSummaryScreen',
                                            );
                                        }
                                    } catch (error: any) {
                                        setLoading(false);
                                        if (error && error?.code === 'UNSERVICEABLEPINCODE') {
                                            setErrorMessage(error.message);
                                        }
                                        if (error?.response?.status === 401) {
                                            handleLogout();
                                            navigation.navigate(screenName === 'CartScreen' ? 'CartScreen' : 'ProfileScreen'); //To handle ProfileScreen and Checkout Screen navigation
                                        }
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                    setFieldError,
                                    values,
                                }) => {
                                    handleSubmitFromOutside = handleSubmit;

                                    const handlePincodeChange = async pincode => {
                                        if (pincode.length <= 6) {
                                            const finalPincode = pincode.trim();
                                            setFieldValue('pincode', finalPincode);
                                            if (pincode.length === 6) {
                                                try {
                                                    const response = await fetchCityStateFromPincode(
                                                        pincode,
                                                    );
                                                    const responseData: PincodeData = response.data[0]
                                                    if (responseData) {
                                                        const capitalizedStateName =
                                                            responseData.statename
                                                                .toLowerCase()
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            responseData.statename.slice(1).toLowerCase();
                                                        setFieldValue('city', responseData.Districtname);
                                                        setFieldValue('state', capitalizedStateName);
                                                    }
                                                } catch (e: any) {
                                                    console.log(e, 'error fetching city and state');
                                                    if (e?.response?.status === 401) {
                                                        handleLogout();
                                                        navigation.navigate(screenName === 'CartScreen' ? 'CartScreen' : 'ProfileScreen'); //To handle ProfileScreen and Checkout Screen navigation
                                                    }
                                                }
                                            } else {
                                                setFieldError('pincode', 'Pincode should be six digits');
                                            }
                                        }
                                    };

                                    return (
                                        <View style={{ backgroundColor: '#fff' }}>
                                            <View
                                                style={[styles.addressSectiontitles, { marginTop: 10 }]}
                                            >
                                                <Text
                                                    style={[commonStyles.h2Tag]}
                                                >
                                                    Contact Information
                                                </Text>
                                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                    <View style={{ ...styles.formWrap, marginLeft: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.firstName
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            First Name
                                                        </Text>
                                                        <TextInput
                                                            onChangeText={handleChange('firstName')}
                                                            onBlur={() => {
                                                                handleInputFocus('firstName', false);
                                                                handleBlur('firstName');
                                                            }}
                                                            value={values.firstName}
                                                            onFocus={() => handleInputFocus('firstName', true)}
                                                            style={
                                                                isFocused.firstName
                                                                    ? [styles.baseInput, styles.inputFocused]
                                                                    : styles.baseInput
                                                            }
                                                        />
                                                        {errors.firstName && touched.firstName ? (
                                                            <ErrorText>*{errors.firstName}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                    <View style={{ ...styles.formWrap, marginRight: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.lastName
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            Last Name
                                                        </Text>
                                                        <TextInput
                                                            onChangeText={handleChange('lastName')}
                                                            onBlur={() => {
                                                                handleInputFocus('lastName', false);
                                                                handleBlur('lastName');
                                                            }}
                                                            onFocus={() => handleInputFocus('lastName', true)}
                                                            value={values.lastName}
                                                            style={
                                                                isFocused.lastName
                                                                    ? [styles.baseInput, styles.inputFocused]
                                                                    : styles.baseInput
                                                            }
                                                        />
                                                        {errors.lastName && touched.lastName ? (
                                                            <ErrorText>*{errors.lastName}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ ...styles.formWrap, marginLeft: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.mobile
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            Mobile
                                                        </Text>
                                                        <TextInput
                                                            onChangeText={text => {
                                                                setFieldValue(
                                                                    'mobile',
                                                                    text.trim().replace(/^0+/, ''),
                                                                );
                                                            }}
                                                            onBlur={() => {
                                                                handleInputFocus('mobile', false);
                                                                handleBlur('mobile');
                                                            }}
                                                            onFocus={() => handleInputFocus('mobile', true)}
                                                            editable={values.mobile ? false : true}
                                                            value={values.mobile}
                                                            style={[
                                                                styles.baseInput,
                                                                values.mobile ? styles.disabledInput : null,
                                                                isFocused.mobile ? styles.textFocused : null,
                                                            ]}
                                                            autoCompleteType="tel"
                                                            keyboardType="numeric"
                                                        />
                                                        {errors.mobile && touched.mobile ? (
                                                            <ErrorText>*{errors.mobile}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                    <View style={{ ...styles.formWrap, marginRight: 0 }}>
                                                        <Text style={styles.inputLabel}>Email</Text>
                                                        <TextInput
                                                            onChangeText={text => {
                                                                const value = text;
                                                                setFieldValue('email', value);
                                                            }}
                                                            onBlur={() => {
                                                                handleBlur('email');
                                                            }}
                                                            value={values.email}
                                                            style={styles.baseInput}
                                                            autoCompleteType="email"
                                                            autoCapitalize="none"
                                                            keyboardType="email-address"
                                                            onEndEditing={() => {
                                                                setFieldValue('email', values.email.trim());
                                                            }}
                                                        />
                                                        {errors.email && touched.email ? (
                                                            <ErrorText>*{errors.email}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                </View>
                                                <BaseView AlignLeft style={{ marginTop: 20 }}>
                                                    <OZCheckbox
                                                        title="Notify me for orders, updates & offers"
                                                        checked={acceptsMarketing}
                                                        setCheckbox={setAcceptsMarketing}
                                                    />
                                                </BaseView>
                                            </View>

                                            <View
                                                style={[styles.addressSectiontitles, { marginTop: 10 }]}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    Shipping Address
                                                </Text>
                                                {errorMessage ? (
                                                    <Text
                                                        style={{
                                                            color: '#cd201f',
                                                            paddingRight: 5,
                                                            marginBottom: 16,
                                                        }}
                                                    >
                                                        {errorMessage}
                                                    </Text>
                                                ) : null}
                                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                    <View style={{ ...styles.formWrap, marginHorizontal: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.address1
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            Address
                                                        </Text>
                                                        <TextInput
                                                            onChangeText={handleChange('address1')}
                                                            onBlur={() => {
                                                                handleInputFocus('address1', false);
                                                                handleBlur('address1');
                                                            }}
                                                            onFocus={() => handleInputFocus('address1', true)}
                                                            value={values.address1}
                                                            style={
                                                                isFocused.address1
                                                                    ? [styles.baseInput, styles.inputFocused]
                                                                    : styles.baseInput
                                                            }
                                                        />
                                                        {errors.address1 && touched.address1 ? (
                                                            <ErrorText>*{errors.address1}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                    <View style={{ ...styles.formWrap, marginHorizontal: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.address2
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            Apartment, suite, etc. (optional)
                                                        </Text>
                                                        <TextInput
                                                            onChangeText={handleChange('address2')}
                                                            onBlur={() => {
                                                                handleInputFocus('address2', false);
                                                                handleBlur('address2');
                                                            }}
                                                            onFocus={() => handleInputFocus('address2', true)}
                                                            value={values.address2}
                                                            style={
                                                                isFocused.address2
                                                                    ? [styles.baseInput, styles.inputFocused]
                                                                    : styles.baseInput
                                                            }
                                                        />
                                                        {errors.address2 && touched.address2 ? (
                                                            <ErrorText>*{errors.address2}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                    <View style={{ ...styles.formWrap, marginLeft: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.pincode
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            Pincode
                                                        </Text>
                                                        <TextInput
                                                            keyboardType="numeric"
                                                            onChangeText={text => handlePincodeChange(text)}
                                                            onBlur={() => {
                                                                handleInputFocus('pincode', false);
                                                                handleBlur('pincode');
                                                            }}
                                                            onFocus={() => handleInputFocus('pincode', true)}
                                                            value={values.pincode}
                                                            style={
                                                                isFocused.pincode
                                                                    ? [styles.baseInput, styles.inputFocused]
                                                                    : styles.baseInput
                                                            }
                                                        />
                                                        {errors.pincode && touched.pincode ? (
                                                            <ErrorText>* {errors.pincode}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                    <View style={{ ...styles.formWrap, marginRight: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.city
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            City
                                                        </Text>
                                                        <TextInput
                                                            onChangeText={handleChange('city')}
                                                            onBlur={() => {
                                                                handleInputFocus('city', false);
                                                                handleBlur('city');
                                                            }}
                                                            onFocus={() => handleInputFocus('city', true)}
                                                            value={values.city}
                                                            style={
                                                                isFocused.city
                                                                    ? [styles.baseInput, styles.inputFocused]
                                                                    : styles.baseInput
                                                            }
                                                        />
                                                        {errors.city && touched.city ? (
                                                            <ErrorText>* {errors.city}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                    <View
                                                        style={{
                                                            ...styles.formWrap,
                                                            marginLeft: 0,
                                                        }}
                                                    >
                                                        <Text
                                                            style={
                                                                isFocused.state
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            State
                                                        </Text>
                                                        <Pressable
                                                            onPress={() => {
                                                                setStatesModal(true);
                                                                Keyboard.dismiss();
                                                            }}
                                                        >
                                                            <View>
                                                                <Text
                                                                    style={[
                                                                        styles.baseInput,
                                                                        { paddingVertical: 15 },
                                                                    ]}
                                                                >
                                                                    {values.state}
                                                                </Text>
                                                                <Icon
                                                                    name="chevron-down"
                                                                    size={28}
                                                                    color={gray7E}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: 10,
                                                                        right: 0,
                                                                    }}
                                                                />
                                                            </View>
                                                        </Pressable>

                                                        <OZModal
                                                            visible={statesModal}
                                                            onRequestClose={() => setStatesModal(false)}
                                                            setModalVisible={setStatesModal}
                                                            title="States"
                                                            transparent
                                                            animationType="fade"
                                                        >
                                                            <ScrollView>
                                                                <View
                                                                    style={{ flex: 1, width, marginHorizontal: 20 }}
                                                                >
                                                                    {states.map(state => (
                                                                        <Pressable
                                                                            key={state.id}
                                                                            onPress={() => {
                                                                                setFieldValue('state', state.name);
                                                                                setStatesModal(false);
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
                                                                                    {state.name}
                                                                                </Text>
                                                                            </BaseView>
                                                                        </Pressable>
                                                                    ))}
                                                                </View>
                                                            </ScrollView>
                                                        </OZModal>

                                                        {errors.state && touched.state ? (
                                                            <ErrorText>*{errors.state}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                    <View style={{ ...styles.formWrap, marginRight: 0 }}>
                                                        <Text
                                                            style={
                                                                isFocused.country
                                                                    ? [styles.inputLabel, styles.textFocused]
                                                                    : styles.inputLabel
                                                            }
                                                        >
                                                            Country
                                                        </Text>
                                                        <TextInput
                                                            onChangeText={handleChange('country')}
                                                            onBlur={() => {
                                                                handleInputFocus('country', false);
                                                                handleBlur('country');
                                                            }}
                                                            onFocus={() => handleInputFocus('country', true)}
                                                            value={values.country}
                                                            style={
                                                                isFocused.country
                                                                    ? [styles.baseInput, styles.textFocused]
                                                                    : styles.baseInput
                                                            }
                                                            editable={false}
                                                        />
                                                        {errors.country && touched.country ? (
                                                            <ErrorText>*{errors.country}</ErrorText>
                                                        ) : null}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }}
                            </Formik>
                        </View>
                        <View style={{ backgroundColor: '#fff', paddingBottom: 16 }}>
                            <View style={[styles.addressSectiontitles, { marginTop: 10, backgroundColor: '#fff' }]}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        marginBottom: 14,
                                        paddingTop: 10,
                                    }}
                                >
                                    Select Tag
                                </Text>
                                <BaseView row AlignLeft style={{ marginBottom: 25 }}>
                                    {addressTypes.map(addressType => (
                                        <Pressable
                                            key={addressType.id}
                                            onPress={() => setCheckedAddressType(addressType.type)}
                                        >
                                            <BaseView row AlignLeft style={{ marginRight: 22 }}>
                                                <RadioAction
                                                    checked={checkedAddressType === addressType.type ?? false}
                                                >
                                                    <RadioCheck
                                                        checked={checkedAddressType === addressType.type ?? false}
                                                    />
                                                </RadioAction>
                                                <Text
                                                    style={{
                                                        marginLeft: 10,
                                                        fontSize: 15,
                                                        fontFamily: 'Roboto-Regular',
                                                    }}
                                                >
                                                    {addressType.type}
                                                </Text>
                                            </BaseView>
                                        </Pressable>
                                    ))}
                                </BaseView>
                                <OZCheckbox
                                    title="Make Default Address"
                                    checked={defaultAddress}
                                    setCheckbox={setDefaultAddress}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={{ padding: 5, backgroundColor: '#fff' }}>
                    <PrimaryButton
                        accentColor="#F04E23"
                        title={address ? 'SAVE ADDRESS' : 'SAVE AND CONTINUE'}
                        onAction={() => {
                            handleSubmitFromOutside();
                        }}
                        loading={loading}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};
export default AddAddress;