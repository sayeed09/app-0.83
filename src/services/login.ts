
import axios from 'axios';
import { loginOtpEndpoint, policyToken, policyURL } from 'utils/constants';
import { getUser } from './auth';
import { axiosClient } from './axios';
import { IExpiredAccessToken, LoginData, LoginResponsePayload, VerifyOTPRequestPayload, OTPResponsePayload, AddressFetchProgressResponse } from 'models/auth';
import { AxiosError } from "axios";

export const generateOtp = async (LoginData: LoginData) => {
  try {
    const { data } = await axiosClient.post<LoginResponsePayload>(`${loginOtpEndpoint}/send/`, LoginData);
    return data;
  } catch (error) {
    console.error("Error while generating OTP:", error);
    throw error;
  }
};


export const validateOtp = async (otpData: VerifyOTPRequestPayload) => {
  try {
    const { data } = await axiosClient.post<OTPResponsePayload>(
      `${loginOtpEndpoint}/v2/validate/`,
      otpData
    );
    return data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 400) {
      // Handle invalid OTP case
      return undefined
    }
    console.error("Error while validating OTP:", error);
    throw error; // rethrow for other errors
  }
};


export const policyAndTermsService = async (policyType: string) => {
  try {
    const { data } = await axios.post(policyURL,
      `
      {
        shop {
          ${policyType} {
            body
            title
          }
        }
      }
    `, {
      headers: {
        'x-shopify-storefront-access-token': policyToken,
        'content-type': 'application/graphql'
      }
    });

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getRenewableAccessToken = async (expiredAccessToken: IExpiredAccessToken) => {
  const authorizationToken: string | undefined = await getUser().then(token => token?.refreshToken);
  const { data } = await axios
    .post<any>(
      `${loginOtpEndpoint}/refresh/`,
      expiredAccessToken, {
      headers: { 'Authorization': `Bearer ${authorizationToken}` }
    })
    .then((response) => {
      return response;
    }).catch((err) => {
      return err;
    })

  return data;
};


export const fetchAddressSaveProgress = async (token: string): Promise<AddressFetchProgressResponse> => {
  const { data } = await axiosClient
    .get<AddressFetchProgressResponse>(`${loginOtpEndpoint}/address/progress/?addressImportToken=${token}`)
    .then((response) => {
      return response;
    });
  return data;
};