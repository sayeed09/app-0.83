import axios from 'axios';
import { chatWootBaseURL } from 'utils/constants';

export const initiateWidgetOpen = async (
  websiteToken: string,
  cwConversation: string,
  requestModel,
): Promise<any | undefined> => {
  const { data } = await axios

    .post(
      `${chatWootBaseURL}/api/v1/widget/events?website_token=${websiteToken}&cw_conversation=${cwConversation}=&locale=en`,
      requestModel,
      {
        headers: {
          'content-type': 'application/json',
          'X-Auth-Token': cwConversation,
        },
      },
    )
    .then(response => {
      return response;
    });
  return data;
};
