import { ISearchPayload } from 'models/search';
import { axiosClient } from 'services/axios';
import { searchResultsEndpoint } from 'utils/constants';

export const fetchSearchResultService = async (payload: ISearchPayload, headers) => {
  try {
    const { data } = await axiosClient({
      method: 'POST',
      url: `${searchResultsEndpoint}`,
      data: payload,
      headers: headers
    })
    return data;
  } catch (error) {
    console.log("Error while fetching result : ", error);
    throw error;
  }
}
