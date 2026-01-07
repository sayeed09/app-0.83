import { JudgeMeQuestionRequestPayload, JudgeMeReviewRequestPayload } from 'models/judme';
import { axiosClient } from 'services/axios';
import { configEndpoint, judgeMeReviewsEndpoint, judgeMeReviewsSansV1 } from 'utils/constants';

export const judgemeCreateQuestionService = async (payload: JudgeMeQuestionRequestPayload) => {
  try {
    const { data } = await axiosClient.post(`${judgeMeReviewsSansV1}/questions`);
    return data;
  } catch (error) {
    console.log("Error while creaeting question on judge me : ", error);
    throw error;
  }
}

export const fetchJudgemeReviewsService = async (judgemePayload) => {
  try {
    const { data } = await axiosClient.get(`${judgeMeReviewsEndpoint}/widgets/product_review?external_id=${judgemePayload.external_id}&api_token=${judgemePayload.api_token}&shop_domain=${judgemePayload.shop_domain}`);
    return data;
  } catch (error) {
    console.log("Error while fetching judge me review : ", error);
    throw error;
  }
}

export const createJudgemeReviewService = async (payload: JudgeMeReviewRequestPayload) => {
  try {
    const { data } = await axiosClient.post(`${judgeMeReviewsEndpoint}/reviews`, payload)
    return data;
  } catch (error) {
    console.log("Error while creating reviews on the judgeme : ", error);
    throw error;
  }
}


export const reportReviewService = async (payload: any) => {
  try {
    const { data } = await axiosClient.post(`${configEndpoint}/config/report/review`, payload)
    return data;
  } catch (error) {
    console.log("Error while creating reviews on the judgeme : ", error);
    throw error;
  }
}
