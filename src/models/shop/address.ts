export enum AddressType {
  HOME = 'HOME',
  OFFICE = 'WORK',
  OTHER = 'OTHER',
}

interface AddressTypeObject {
  id: number;
  type: AddressType;
}

export const addressTypes: AddressTypeObject[] = [
  {
    id: 1,
    type: AddressType.HOME,
  },
  {
    id: 2,
    type: AddressType.OFFICE,
  },
  {
    id: 3,
    type: AddressType.OTHER,
  },
];

export interface UserAddress {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  zip: string;
  city: string;
  name?: string;
  phone: string;
  country: string;
  address1: string;
  address2?: string;
  province: string;
  lastName: string;
  firstName: string;
  countryCode?: '';
  countryName?: '';
  provinceCode?: '';
  defaultAddress: boolean;
  addressType: string;
  acceptsMarketing: boolean;
  userId?: number;
  addressId?: number;
  state?: string;
  email?: string;
}

export interface UserAddressDelete {
  addressId?: number;
}


export interface UpdateCheckoutRequestModel {
  shipping_address: AddressModel;
  billing_address?: AddressModel;
}
export interface AddressModel {
  first_name: string;
  last_name: string;
  email?: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  country_name: string;
  accepts_marketing?: boolean;
  save_address?: boolean;
}

export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  address1: string;
  address2?: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  addressType: string;
  isBillingAddDifferent: boolean;
  acceptsMarketing: boolean;
  saveAddress: boolean;

  // Billing fields (conditionally required)
  billingPhone?: string;
  billingFirstName?: string;
  billingLastName?: string;
  billingPincode?: string;
  billingAddress1?: string;
  billingAddress2?: string;
  billingStates?: string;
  billingCity?: string;
  billingCountry?: string;
  emailRequired?: boolean;
}