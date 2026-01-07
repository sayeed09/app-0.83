import { UserProfileResponseModel } from "models/auth";
import { carbonChatbotEndpoint, ordersEndpoint, userEndpoint, userProfilePath, walletRedeemEndpoint } from "utils/constants";
import { axiosClient } from "./axios";
import { UserDetails, UserProfileUpdateResponse } from "models/user";

export const getUserProfileDataService = async () => {
    try {
        const { data } = await axiosClient
            .get<UserProfileResponseModel>(`${userProfilePath}`)
            .then((response) => {
                return response;
            });
        return data;
    } catch (error) {
        console.log("Error while fetching profile data : ", error);
        throw error;
    }
};

export const updateUserProfileService = async (profilePayload: UserDetails) => {
    try {
        const { data } = await axiosClient.post<UserProfileUpdateResponse>(`${userEndpoint}/profile`, profilePayload);
        return data;
    } catch (error) {
        console.log("Error while updating user profile : ", error);
        throw error;
    }
}

export const getOrderListService = async () => {
    try {
        const { data } = await axiosClient
            .get<any>(`${ordersEndpoint}`);
        return data;
    } catch (error) {
        console.log("Error while fetching order : ", error);
        throw error;
    }
};

export const cancelOrderService = async (orderNumber: number) => {
    try {
        const { data } = await axiosClient
            .post<any>(`${userEndpoint}/order/cancel/${orderNumber}`);
        return data;
    } catch (error) {
        console.log("Error while fetching order : ", error);
        throw error;
    }
}

export const getNotificationService = async () => {
    try {
        const { data } = await axiosClient
            .get<any>(`${userEndpoint}/settings/notification`);
        return data;
    } catch (error) {
        console.log("Error while getting notification : ", error);
        throw error;
    }
};

export const postNotificationService = async (payload) => {
    try {
        const { data } = await axiosClient
            .post<any>(`${userEndpoint}/settings/notification`, payload);
        return data;
    } catch (error) {
        console.log("Error in post notification : ", error);
        throw error;
    }
}

export const getOZivaCashService = async (perPage: number, pageNumber: number) => {
    try {
        const { data } = await axiosClient.get(`${walletRedeemEndpoint}/users/transactions?per_page=${perPage}&page=${pageNumber}`);
        return data;
    } catch (error) {
        console.log("Error while getting oziva cash : ", error);
        throw error;
    }
}

export const userAuthCheckService = async (payload) => {
    try {
        const { data } = await axiosClient.post(`${carbonChatbotEndpoint}chatwoot/auth-check/`, payload)
        return data;
    } catch (error) {
        console.log("Error while auth check : ", error);
        throw error;
    }
}
