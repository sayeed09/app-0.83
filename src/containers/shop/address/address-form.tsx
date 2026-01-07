/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
} from 'react-native';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { CheckoutFormValues, UserAddress } from 'models/shop/address';
import {
  createUserAddressService,
  updateUserAddressService,
} from 'services/address';
import { updateAddress } from "actions/checkout";

import { useCheckoutDispatch, useCheckoutState } from '@context/checkout';
import { CustomerAddressPayload } from '@models/shop/checkout';
import { buildAddressPayload, getMergedInitialValues, getProvinceFromPincode, getUpdateRequestModel } from 'utils/checkout';
import {
  updateUserMoEngageProfile,
} from '@utils/common';
import { setSubscriptionAddress } from 'actions/checkout';
import { patchAddressService } from 'services/checkout';
import BillingAddressForm from './billing-address-form';
import ShippingAddressForm from './shipping-address';
import { useAuthState } from 'context/auth';
import { getValidationSchema } from 'utils/validation';
import { UNSERVICEABLE_PINCODE } from 'utils/constants';
import { useAddress } from 'hooks/use-address';

const AddAddress = ({
  navigation, route,
  saveAddressSubmit,
  setSaveAddressSubmit
  , editAddressId,
  showShippingForm,
  setFormSubmitSuccess,
  setErrorMessage,
  setLoading,
}): React.ReactElement => {
  const { checkout_id, userAddressList, address: currentAddress } = useCheckoutState();
  const { user } = useAuthState();
  const { getAddresses } = useAddress(navigation);

  const checkoutDispatch = useCheckoutDispatch();
  const { isSubscription, screenName } = route?.params || {};
  const selectedAddress = editAddressId ? userAddressList.find((item) => item.id === editAddressId) : !showShippingForm ? currentAddress : null;
  const formikRef = useRef<FormikProps<CheckoutFormValues>>(null);  // Here we type the ref


  useEffect(() => {
    if (saveAddressSubmit) {
      handleSubmitForm();
    }
  }, [saveAddressSubmit])
  const handleSubmitForm = async () => {
    const errors = await formikRef.current?.validateForm() as FormikErrors<CheckoutFormValues>;
    formikRef.current?.submitForm();
    if (Object.keys(errors).length > 0) {
      setSaveAddressSubmit(false);
    }
  }

  const handleSubmit = async (values: CheckoutFormValues) => {
    setLoading(true);
    const userAddressPayloadToSave = buildAddressPayload(values, selectedAddress as UserAddress);
    let addressPayloadToSend: CustomerAddressPayload = { ...userAddressPayloadToSave, checkoutId: checkout_id };
    try {
      if (!addressPayloadToSend.province) {
        addressPayloadToSend = await getProvinceFromPincode(addressPayloadToSend);
      }

      if (checkout_id && !showShippingForm) {
        const updateCheckoutRequestModel = getUpdateRequestModel(values);
        const data = await patchAddressService(checkout_id, updateCheckoutRequestModel);
        setFormSubmitSuccess(true);
        setErrorMessage();
      }

      else if (selectedAddress?.id) {
        const updatedAddress = await updateUserAddressService(userAddressPayloadToSave);
        checkoutDispatch(updateAddress(updatedAddress?.data));
        setFormSubmitSuccess(true)
      } else {
        const savedAddress = await createUserAddressService(userAddressPayloadToSave);
        checkoutDispatch(updateAddress(savedAddress?.data));
        setFormSubmitSuccess(true)
      }
      setLoading(false);
      updateUserMoEngageProfile(userAddressPayloadToSave);

      if (isSubscription) {
        checkoutDispatch(setSubscriptionAddress(userAddressPayloadToSave));
      } else {
        getAddresses(screenName);
      }

    } catch (error: any) {
      if (error?.response?.data?.error?.code === "UNSERVICEABLEPINCODE") {
        setErrorMessage(
          UNSERVICEABLE_PINCODE
        )
      } else {
        setErrorMessage(
          "There seems to be an issue with your address. Please verify the details and try again."
        )
      }
      setSaveAddressSubmit(false);

      setLoading(false);
      // handleError(error);
    }
  };



  return (
    <>
      <View style={{ flex: 1 }}>

        <Formik
          innerRef={formikRef}
          validateOnChange
          enableReinitialize
          initialValues={getMergedInitialValues(formikRef.current?.values || null, selectedAddress as UserAddress,
            user?.phone as string)}
          validationSchema={getValidationSchema(
            selectedAddress ? selectedAddress?.email :
              showShippingForm ? true : false)}
          onSubmit={handleSubmit}
        >
          {showShippingForm ? (
            <ShippingAddressForm navigation={navigation} />
          ) : (
            <BillingAddressForm navigation={navigation} />
          )}
        </Formik>
      </View>
    </>
  );
};
export default AddAddress;
