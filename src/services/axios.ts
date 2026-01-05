import Axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { PLATFORM_HEADERS } from "utils/constants";
import { getWhiteListHeaders } from "utils/common";
import { getUser, setUser } from "services/auth";
import { getRenewableAccessToken } from "./login";
import { User } from "models/user";
import { IExpiredAccessToken } from "models/auth";

let cancelTokenSource = Axios.CancelToken.source();

// global lock
(globalThis as any).__refreshPromise = (globalThis as any).__refreshPromise || null;
let refreshTokenPromise: Promise<string> | null = (globalThis as any).__refreshPromise;

const getAccessToken = async () => {
  const user = await getUser();
  return user?.authToken;
};

const axiosClient = Axios.create({
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "X-Channel": PLATFORM_HEADERS.channel,
    "App-Version": PLATFORM_HEADERS.appVersion,
    ...getWhiteListHeaders(),
  },
});

const cancelAllRequests = () => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Cancelled all requests");
  }
  cancelTokenSource = Axios.CancelToken.source();
};

let interceptorsAttached = false;

export const useAxiosInterceptor = () => {
  if (interceptorsAttached) return;
  interceptorsAttached = true;

  axiosClient.interceptors.request.use(
    async (request) => {
      const connection = await NetInfo.fetch();
      if (connection.isInternetReachable || connection.isConnected) {
        cancelTokenSource = Axios.CancelToken.source();
        request.cancelToken = cancelTokenSource.token;

        const token = await getAccessToken();
        if (token) request.headers.Authorization = `Bearer ${token}`;
        // request.timeout = setTimeoutBasedOnNetworkType(connection.type);
        return request;
      }
      cancelAllRequests();
      return Promise.reject({ message: "No internet connection", isOffline: true });
    },
    (error) => Promise.reject(error)
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      const config = error?.config;

      // Handle 401
      if (status === 401 && !config._retry) {
        config._retry = true;

        if (!refreshTokenPromise) {
          refreshTokenPromise = (async () => {
            try {
              const token = await getRefreshToken();
              (globalThis as any).__refreshPromise = null;
              refreshTokenPromise = null;
              return token;
            } catch (err) {
              (globalThis as any).__refreshPromise = null;
              refreshTokenPromise = null;
              throw err;
            }
          })();
          (globalThis as any).__refreshPromise = refreshTokenPromise;
        }

        try {
          const newToken = await refreshTokenPromise;
          config.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(config);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // Retry 500/503 GETs
      if (config?.method === "get" && (status === 500 || status === 503)) {
        const retryCount = (config.retryCount || 0) + 1;
        config.retryCount = retryCount;
        if (retryCount <= 3) {
          return new Promise((resolve) => {
            setTimeout(() => resolve(axiosClient(config)), 500);
          });
        }
      }

      return Promise.reject(error);
    }
  );
};

const getRefreshToken = async (): Promise<string> => {
  const authorizationToken = await getAccessToken();
  if (!authorizationToken) throw new Error("No access token found");

  const expiredAccessTokenObj: IExpiredAccessToken = { expired: authorizationToken };
  const response = await getRenewableAccessToken(expiredAccessTokenObj);

  if (!response?.accesToken) throw response;

  const currentUser = await getUser();
  const updatedUser: User = {
    authToken: response.accesToken,
    phone: currentUser?.phone,
    refreshToken: currentUser?.refreshToken,
  };
  await setUser(updatedUser);

  return response.accesToken;
};

export { axiosClient };