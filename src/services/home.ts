import { axiosClient } from 'services/axios';
import { ozivaRestConfigEndpoint } from 'utils/constants';


export const filterBannerImagesHomeService = async () => {
  try {
    const { data } = await axiosClient.get(`${ozivaRestConfigEndpoint}/home`);
    return data;
  } catch (error) {
    console.log("Error in banner image : ", error);
    throw error;
  }
}

export const getAppConfigValues = async() => {
  try {
    const { data } = await axiosClient.get(`${ozivaRestConfigEndpoint}`);
    return data;
  } catch (error) {
    console.log("Error fetching App config: ", error);
    throw error;
  }
}