import { CheckoutFormValues, AddressModel, UpdateCheckoutRequestModel, UserAddress, AddressType } from 'models/shop/address';
import { CustomerAddressPayload } from 'models/shop/checkout';
import { fetchCityStateFromPincode, PincodeData } from 'services/address';

export const getProvinceFromPincode = async (
  addressPayload: CustomerAddressPayload,
) => {
  const response = await fetchCityStateFromPincode(Number(addressPayload.zip));
  // update if province is missing or wrongly updated for existing addresses
  const responseData = response && response.data.length > 0 ? response.data[0] : undefined;
  if (responseData) {
    const capitalizedStateName =
      responseData.statename.toLowerCase().charAt(0).toUpperCase() +
      responseData.statename.slice(1).toLowerCase();
    addressPayload.province = capitalizedStateName;
  }
  return addressPayload;
};

export const getUpdateRequestModel = (values: CheckoutFormValues) => {
  const shippingAddress: AddressModel = {
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    address1: values.address1,
    address2: values.address2 as string,
    zip: values.pincode,
    city: values.city,
    country: values.country,
    country_name: values.country,
    province: values.state,
    phone: values.mobile,
    accepts_marketing: values.acceptsMarketing,
    save_address: values.saveAddress,
  };
  let requestModel: UpdateCheckoutRequestModel = {
    shipping_address: shippingAddress,
  };
  if (values.isBillingAddDifferent) {
    const billingAddress: AddressModel = {
      first_name: values.billingFirstName as string,
      last_name: values.billingLastName as string,
      address1: values.billingAddress1 as string,
      address2: values.billingAddress2 as string,
      zip: values.billingPincode as string,
      city: values.billingCity as string,
      country: values.billingCountry as string,
      country_name: values.billingCountry as string,
      province: values.billingStates as string,
      phone: values.billingPhone as string,
    };
    requestModel.billing_address = billingAddress;
  }

  return requestModel;
};
export const buildAddressPayload = (values: CheckoutFormValues, selectedAddress: UserAddress | undefined) => {
  // Ensure all required fields are added to the address payload
  const userAddressPayloadToSave: UserAddress = {
    addressId: Number(selectedAddress?.id) || undefined, // Ensure the addressId is correctly set
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    address1: values.address1,
    address2: values.address2 || undefined, // Allow for an empty address2
    zip: values.pincode,
    city: values.city,
    country: values.country,
    province: values.state,
    phone: values.mobile,
    acceptsMarketing: values.acceptsMarketing || false,
    addressType: values.addressType, // Correctly map addressType
    defaultAddress: values.saveAddress || false, // Set defaultAddress based on saveAddress
  };

  return userAddressPayloadToSave;
};
export const buildInitialValues = (address: UserAddress | null, phone: string): CheckoutFormValues => {
  return {
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    mobile: phone || '',
    email: address?.email || '',
    address1: address?.address1 || '',
    address2: address?.address2 || '',
    pincode: address?.zip || '',
    city: address?.city || '',
    state: address?.province || '',
    country: 'India',
    isBillingAddDifferent: false,
    billingPhone: '',
    billingFirstName: '',
    billingLastName: '',
    billingPincode: '',
    billingAddress1: '',
    billingAddress2: '',
    billingStates: '',
    billingCity: '',
    billingCountry: 'India',
    saveAddress: address?.defaultAddress || true,
    acceptsMarketing: address?.acceptsMarketing || true,
    addressType: address?.addressType || 'HOME',
    emailRequired: address?.id && !address.email ? false : true
  };
};


export const getMergedInitialValues = (formikValues: CheckoutFormValues | null, address: UserAddress | null, phone: string) => {
  const newInitial = buildInitialValues(address, phone);

  if (!formikValues && !newInitial.isBillingAddDifferent) {
    // First time render, just return initial values
    return newInitial;
  }

  // Merge: keep existing form values except billing fields, override billing fields
  return {
    ...formikValues, // retain user-edited values
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    mobile: phone || '',
    email: address?.email || '',
    address1: address?.address1 || '',
    address2: address?.address2 || '',
    pincode: address?.zip || '',
    city: address?.city || '',
    state: address?.province || '',
    country: 'India',
    saveAddress: address?.defaultAddress || true,
    acceptsMarketing: address?.acceptsMarketing || true,
    addressType: address?.addressType || 'HOME',
    isBillingAddDifferent: formikValues ? formikValues?.isBillingAddDifferent as boolean : false,
  };
};


export const resetBillingAddress = (values: CheckoutFormValues) => {
  // Ensure all required fields are added to the address payload
  return {
    firstName: values?.firstName || '',
    lastName: values?.lastName || '',
    mobile: values.mobile || '',
    email: values?.email || '',
    address1: values?.address1 || '',
    address2: values?.address2 || '',
    pincode: values?.pincode || '',
    city: values?.city || '',
    state: values?.state || '',
    country: 'India',
    isBillingAddDifferent: false,
    billingPhone: '',
    billingFirstName: '',
    billingLastName: '',
    billingPincode: '',
    billingAddress1: '',
    billingAddress2: '',
    billingStates: '',
    billingCity: '',
    billingCountry: 'India',
    saveAddress: values?.saveAddress || true,
    acceptsMarketing: values?.acceptsMarketing || true,
    addressType: values?.addressType || 'HOME',
  };

};