/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import ReactMoE, { MoEProperties } from 'react-native-moengage';

import { CartItem } from '@models/shop/cart';

import { ozivaPrimeProductId } from './constants';
// import Config from 'react-native-config';
import { ServerCartItem } from 'models/cart/fetchcart';

const clearUserData = (): void => {
  AsyncStorage.clear();
};

export const getPercentageValue = (mrp, discountPrice) => {
  const differenceAmount = mrp - discountPrice;
  const percentageValue = mrp ? (differenceAmount * 100) / mrp : 0;
  return `${Math.floor(percentageValue)}% off`;
};

export const formCartItemsForShipping = (
  items: CartItem[],
): ServerCartItem[] => {
  const serverCartItems = items.map(cartItem => ({
    id: Number(cartItem.id),
    quantity: cartItem?.quantity,
  }));

  return serverCartItems;
};

export { clearUserData };

export const trackMoEngageAppEvent = ({
  event,
  values,
  firebasePayload,
  skipGATrack,
}: {
  event: string;
  values: { eventAttribute: string; value: any }[];
  fbEvent?: string;
  firebasePayload?: any;
  trackingTransparency?: boolean;
  skipGATrack?: boolean;
}) => {
  //if (trackingTransparency) {
  const properties = new MoEProperties();
  const firebaseProperties = {};
  if (values && values.length) {
    values.map(res => {
      properties.addAttribute(res?.eventAttribute, res.value);
      firebaseProperties[res?.eventAttribute] = res.value;
      return properties;
    });
    // facebookEvents(event, values, fbEvent);
  }
  ReactMoE.trackEvent(event, properties);
  if (!skipGATrack) {
    if (firebasePayload) {
      // analytics().logAddToCart(firebasePayload);
    } else {
      analytics().logEvent(event, firebaseProperties);
    }
  }
  //}
};

export const getVariantIds = cart_data => {
  const ids = [];
  const names = [];
  const quantity = [];
  const price = [];
  const discount = [];
  if (cart_data && cart_data.length > 0) {
    for (let t = 0; t < cart_data.length; t++) {
      ids.push(cart_data[t]['id'] || cart_data[t]['productId']);
      names.push(cart_data[t]['title']);
      quantity.push(cart_data[t]['quantity']);
      price.push(cart_data[t]['price']);
      discount.push(
        cart_data[t]['total_discount'] || cart_data[t]['totalDiscount'],
      );
    }
  }
  return { ids, names, quantity, price, discount };
};

export const updateUserMoEngageProfile = userDetails => {
  if (userDetails?.email) ReactMoE.setUserEmailID(userDetails?.email);
  if (userDetails?.customerId)
    ReactMoE.setUserUniqueID(userDetails?.customerId);
  const phone = userDetails?.phone.includes('+91')
    ? userDetails?.phone.replace(/\D/g, '').slice(-10)
    : `${userDetails?.phone}`;
  if (phone) ReactMoE.setUserContactNumber(phone);
  const firstName = userDetails?.firstName || userDetails?.first_name;
  const lastName = userDetails?.lastName || userDetails?.last_name;

  if (firstName && lastName) ReactMoE.setUserName(`${firstName} ${lastName}`);
  if (firstName) ReactMoE.setUserFirstName(firstName);
  if (lastName) ReactMoE.setUserLastName(lastName);
  if (userDetails?.gender) ReactMoE.setUserGender(userDetails?.gender);
  if (userDetails?.dateOfBirth)
    ReactMoE.setUserBirthday(userDetails?.dateOfBirth);
};

export const isPrimeMembership = item => {
  return item.product_id === ozivaPrimeProductId.toString();
};

export const getRandomUserNumber = (variantId: any) => {
  let flag = true;
  let randomNumb = Number(String(variantId.slice(-3)));
  if (randomNumb < 200) {
    randomNumb = randomNumb + 200;
  }
  while (flag) {
    randomNumb = randomNumb + 20;
    const module = randomNumb % 50;
    if (module < 20 && module > 0) {
      randomNumb = randomNumb - module;
    }
    if (randomNumb % 50 === 0) {
      flag = false;
    }
  }
  return randomNumb;
};


export const getWhiteListHeaders = () => {
  // if (Config.AUTOMATION_REQUEST && Config.WHITE_LIST_STAGING) {
  //   return {
  //     'X-Request-Purpose': Config.WHITE_LIST_STAGING,
  //     'x-automation-request': Config.AUTOMATION_REQUEST
  //   }
  // } else {
  //   return null
  // }
  return {
    'X-Request-Purpose': 'f468303b-774c-4573-9b97-f1ba626c65b9',
    'x-automation-request': 'staging-60016899-c18c-49a9-ad65-bccb0e52e60d'
  }
}

function indexes(s, e, str, start = 0) {
  const i = str.indexOf(s, start);
  let j = str.indexOf(e, i);
  j = str.indexOf('>', j);
  return { i, j };
}

export const convertToJson = str => {
  const obj = {};
  const keys = str.split(' ');
  keys.forEach(kv => {
    const [k, v] = kv.split('=');
    const u = v.split("'")[1];
    obj[k] = parseFloat(u);
  });
  return obj;
};

export const extract = (key, s, e, h, retValue, start) => {
  const { i, j } = indexes(s, e, h, start);
  retValue[key] = convertToJson(h.substring(i, j));
  return j;
};

export const parseRatings = r => {
  const retValue = {};
  const h = r.widget;

  let i = extract(
    'total',
    'data-average-rating',
    'data-number-of-questions',
    h,
    retValue,
    0,
  );
  i = extract('rating-5', "data-rating='5'", 'data-percentage', h, retValue, i);
  i = extract('rating-4', "data-rating='4'", 'data-percentage', h, retValue, i);
  i = extract('rating-3', "data-rating='3'", 'data-percentage', h, retValue, i);
  i = extract('rating-2', "data-rating='2'", 'data-percentage', h, retValue, i);
  i = extract('rating-1', "data-rating='1'", 'data-percentage', h, retValue, i);

  return retValue;
};

export const compareAppVersions = (version1, version2) => {
  // comparing 1 with 2
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);

  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const p1 = v1Parts[i] || 0; // Treat missing parts as 0
    const p2 = v2Parts[i] || 0;

    if (p1 > p2) return true; // version1 is greater
    if (p1 < p2) return false; // version2 is greater
  }
  return false; // versions are equal
};