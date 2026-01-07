import { UserAddress, UserAddressDelete } from 'models/shop/address';
import { axiosClient } from './axios';
import { checkoutEndpoint, userAddressesPath, userEndpoint } from 'utils/constants';

export interface PincodeData {
  Districtname: string;
  statename: string;
}

interface PincodeResponsePayload {
  success: string;
  data: PincodeData[];
}

interface UserAddressCreateResponsePayload {
  status: boolean;
}
export interface SaveAddressResponseModel {
  status: boolean;
  data: UserAddress;
}

export const fetchCityStateFromPincode = async (pincode: number) => {
  try {
    const { data } = await axiosClient.get<PincodeResponsePayload>(
      `${checkoutEndpoint}/checkout/shipping/${pincode}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching city and state : ", error);
    throw error;
  }
};


export const getAllAddressService = async () => {
  try {
    const { data } = await axiosClient.get(userAddressesPath);
    return data;
  } catch (error) {
    console.error("Error fetching address : ", error);
    throw error;
  }
}

export const createUserAddressService = async (userAddressPayload: UserAddress) => {
  try {
    const { data } = await axiosClient.post<SaveAddressResponseModel>(`${userEndpoint}/address`, userAddressPayload);
    return data;
  } catch (error) {
    console.log("Error while creating address");
    throw error;
  }
}

export const updateUserAddressService = async (userAddressPayload: UserAddress) => {
  try {
    const { data } = await axiosClient.put<SaveAddressResponseModel>(`${userEndpoint}/address`, userAddressPayload);
    return data;
  } catch (error) {
    console.log("Error while creating address");
    throw error;
  }
}

export const deleteUserAddressService = async (addressId: string) => {
  try {
    const { data } = await axiosClient.delete<UserAddressCreateResponsePayload>(`${userEndpoint}/address/${addressId}`);
    return data;
  } catch (error) {
    console.log("Error while creating address");
    throw error;
  }
}
