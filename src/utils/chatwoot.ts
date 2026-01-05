import AsyncStorage from '@react-native-async-storage/async-storage';

import { WOOT_PREFIX, POST_MESSAGE_EVENTS } from './constants/chatwoot';

export const isJsonString = string => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};

export const createWootPostMessage = object => {
  const stringfyObject = `'${WOOT_PREFIX}${JSON.stringify(object)}'`;
  const script = `window.postMessage(${stringfyObject});`;
  return script;
};

export const getMessage = data => data.replace(WOOT_PREFIX, '');

export const generateScripts = ({ user, locale, customAttributes }) => {
  let script = '';
  if (user) {
    const userObject = {
      event: POST_MESSAGE_EVENTS.SET_USER,
      identifier: user.identifier,
      user,
    };
    script += createWootPostMessage(userObject);
  }
  if (locale) {
    const localeObject = { event: POST_MESSAGE_EVENTS.SET_LOCALE, locale };
    script += createWootPostMessage(localeObject);
  }
  if (customAttributes) {
    const attributeObject = {
      event: POST_MESSAGE_EVENTS.SET_CUSTOM_ATTRIBUTES,
      customAttributes,
    };
    script += createWootPostMessage(attributeObject);
  }
  script += `document.querySelector("body").addEventListener('click', function(e) {
    // if(e.target.href == 'https')
    // e.preventDefault();
    }, false);`;
  return script;
};
// export const blockedUrlList = ['https://www.oziva.in'];
// export const isUrlBlocked = () => blockedUrlList.contains();

export const storeHelper = {
  getCookie: async () => {
    const cookie = await AsyncStorage.getItem('cwCookie');
    return cookie;
  },
  storeCookie: async value => {
    await AsyncStorage.setItem('cwCookie', value);
  },
};
