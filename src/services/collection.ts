import {
  CollectionByHandleResponse,
  CollectionByTypeResponseModel,
} from 'models/collection';
import { checkoutEndpoint } from 'utils/constants';
import { axiosClient } from './axios';

const getByCollectionGroup = async (
  group: string,
): Promise<CollectionByTypeResponseModel> => {
  const { data } = await axiosClient
    .get(`${checkoutEndpoint}/catalog/collection/group/${group}`)
    .then(response => {
      return response;
    });
  return data;
};

const getByCollectionByHandle = async (
  handle: string,
  sortBy: string,
  sortOrder: string,
  page: number,
  limit: number,
): Promise<CollectionByHandleResponse> => {
  const { data } = await axiosClient
    .get(
      `${checkoutEndpoint}/catalog/collection/${handle}?sortOrder=${sortOrder}&page=${page}&limit=${limit}${
        sortBy ? `?sortBy=${sortBy}` : ''
      }`,
    )
    .then(response => {
      return response;
    });
  return data;
};
export const CollectionService = {
  getByCollectionGroup,
  getByCollectionByHandle,
};
