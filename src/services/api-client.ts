import CONFIG from 'react-native-config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { RequestData, ServerResponse } from '@models/common/api-client';
import { clearUserData, getWhiteListHeaders } from '@utils/common';

import { getUser } from './auth';
import { APP_VERSION, PLATFORM_HEADERS } from 'utils/constants';

const API_URL = CONFIG.NEXT_PUBLIC_API_URL;

/**
 * Handle Network Requests.
 * @param {string} endpoint - Api path.
 * @param {object} [config={}] - Config object.
 * @param {string} config.method - Method.
 * @param {object} config.data - Body for POST calls.
 * @param {string} config.token - Token for authenticated calls.
 * @param {object} config.headers - Additional headers
 */

const client = async <T, U>(
  endpoint: string,
  {
    data,
    token,
    headers,
    method,
    transform = true,
    ...rest
  }: RequestData<U> = {},
): Promise<ServerResponse<T>> => {
  const user = await getUser();
  const config: AxiosRequestConfig = {
    url: endpoint.startsWith('https://') ? endpoint : `${API_URL}/${endpoint}`,
    method: method || (data ? 'POST' : 'GET'),
    data: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ?? user?.authToken,
      'X-Channel': PLATFORM_HEADERS.channel,
      'App-Version': PLATFORM_HEADERS.appVersion,
      'Content-Type': data ? 'application/json' : undefined,
      ...getWhiteListHeaders(),
      ...headers,
    },
    transformResponse: [].concat(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      axios.defaults.transformResponse,
      (resp: ServerResponse<T>) => {
        if (transform) {
          if (resp?.items?.length) {
            const size = resp.items.length;
            return size > 1 ? resp.items : resp.items[0];
          }
        }
        return resp;
      },
    ),
    ...rest,
  };
  console.log('Used config', config);
  try {
    const response: AxiosResponse<ServerResponse<T>> = await axios(config);
    const { data: resData } = response;

    return resData;
  } catch (err) {
    if (err?.response?.status === 401) {
      clearUserData();
      // window.location.assign(window.location.href);
      err.response.data.message = 'Please re-authenticate.';
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
};

export { client };
