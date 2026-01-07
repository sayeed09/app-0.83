/* eslint-disable no-useless-escape */
import { Dimensions, Platform } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import EasyReturnsSvg from 'assets/images/icons/standard-icons/easy-returns';
import FreeShippingSvg from 'assets/images/icons/standard-icons/free-shipping';
import SecurePaymentsSvg from 'assets/images/icons/standard-icons/secure-payments';

import { BANNER_ONE } from './images';
import { convertToRupees } from './currency-utils';

export const APP_VERSION = `${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`;
const environments = {
  development: 'dev',
  production: 'prod',
  preprod: 'preprod'
};
const configEnv = Config.ENVIRONMENT && Config.ENVIRONMENT.trim();
const currentEnv =
  configEnv == 'Development'
    ? 'development' : configEnv == 'Preprod' ? 'preprod' : 'production';

const env = environments[currentEnv];
const appAPI = env == 'dev' ? `api.dev` : env == 'preprod' ? `api-preprod.prod` : `api-app.prod`;
const policyPath = env === 'dev' ? 'dev-oziva' : 'oziva';
export const cookieTokenid = '__auth_token__';
export const cookieUserIdid = '__userId__';
export const ozivaPrimeProductId = env == 'dev' ? 6568121663532 : 6567722811451;
export const codOrderLimit = 500000;
export const codOrderLowerLimit = 29900;
export const numberOfRows = 2;

export const carouselFeed = [
  {
    id: 1,
    url: BANNER_ONE,
  },
];

export const options = [
  {
    id: '1',
    title: 'One-time purchase',
    priceV2: {},
    compareAtPriceV2: {},
    checked: true,
  },
  {
    id: '2',
    title: 'Subscribe & Save',
    discount: '15-33% off',
    checked: false,
  },
];

export const checkboxOptions = {
  Category: [
    {
      name: 'Weight',
      id: '1',
      checked: false,
      label: 'FILTER_Categories',
    },
    {
      name: 'Skin',
      id: '2',
      checked: false,
      label: 'FILTER_Categories',
    },
    {
      name: 'Hair',
      id: '3',
      checked: false,
      label: 'FILTER_Categories',
    },
    {
      name: 'PCOS',
      id: '4',
      checked: false,
      label: 'FILTER_Categories',
    },
    {
      name: 'Vitamins & Minerals',
      id: '5',
      checked: false,
      label: 'FILTER_Categories',
    },
    {
      name: 'Merchandise',
      id: '6',
      checked: false,
      label: 'FILTER_Categories',
    },
  ],
  Concern: [
    {
      name: 'Hair Fall',
      id: '1',
      checked: false,
      label: 'FILTER_Concern',
    },
    {
      name: 'Detox',
      id: '2',
      checked: false,
      label: 'FILTER_Concern',
    },
    {
      name: 'Endurance',
      id: '3',
      checked: false,
      label: 'FILTER_Concern',
    },
    {
      name: 'Energy Levels',
      id: '4',
      checked: false,
      label: 'FILTER_Concern',
    },
    {
      name: 'Acne',
      id: '5',
      checked: false,
      label: 'FILTER_Concern',
    },
    {
      name: 'Immunity',
      id: '6',
      checked: false,
      label: 'FILTER_Concern',
    },
  ],
  Gender: [
    {
      name: 'Men',
      id: '1',
      checked: false,
      label: 'FILTER_Gender',
    },
    {
      name: 'Women',
      id: '2',
      checked: false,
      label: 'FILTER_Gender',
    },
  ],
  Routines: [
    {
      name: 'Lean & Fit',
      id: '1',
      checked: false,
      label: 'FILTER_Routines',
    },
    {
      name: '#BeautyAndarSe Special',
      id: '2',
      checked: false,
      label: 'FILTER_Routines',
    },
    {
      name: 'PCOS Care',
      id: '3',
      checked: false,
      label: 'FILTER_Routines',
    },
    {
      name: 'Daily Vegan Friendly Fitness',
      id: '4',
      checked: false,
      label: 'FILTER_Routines',
    },
    {
      name: 'Anti-Hairfall & Better Hair Care',
      id: '5',
      checked: false,
      label: 'FILTER_Routines',
    },
    {
      name: 'Glow Up & Better Skin',
      id: '6',
      checked: false,
      label: 'FILTER_Routines',
    },
  ],
};

export const { width, height } = Dimensions.get('window');

export const COUPON_CODE_ERROR =
  'Coupon code is invalid. Please check the spelling or expire date of coupon.';

export const TEST_TOKEN =
  'Digest 8424a3f9df20c0e6f9edaf90c80666ce396a3a5a2ab2b08eddd44d81891c233c.eyJwaG9uZSI6Ijk5OTk5OTk5OTkiLCJoYXNoIjoiODQyNGEzZjlkZjIwYzBlNmY5ZWRhZjkwYzgwNjY2Y2UzOTZhM2E1YTJhYjJiMDhlZGRkNDRkODE4OTFjMjMzYyJ9';

export const ozivaRestConfigEndpoint = `https://config.${env}.oziva.in/config/app`;

export const customerReviewsCustom = `https://config.${env}.oziva.in/config/product-review`;
export const judgeMeReviewsEndpoint = `https://judge.me/api/v1`;
export const judgeMeReviewsSansV1 = `https://judge.me/api`;
export const checkoutEndpoint = `https://${appAPI}.oziva.in`;
export const configEndpoint = `https://config.${env}.oziva.in`;
export const deliveryDurationEndpoint = `https://${appAPI}.oziva.in/checkout/delivery-speed`;
export const upsellEndpoint = `https://store-api.${env}.oziva.in`;

export const ozivaTvEndpoint = `https://tv.${env}.oziva.in/ozivatv/v1/video`;
export const loginOtpEndpoint = `https://${appAPI}.oziva.in/nitro`;
export const viewOffersEndpoint = `https://tok8lryy55.execute-api.ap-south-1.amazonaws.com`;
export const searchResultsEndpoint = `https://api.wizzy.ai/v1/products/search`;

export const judgeMeAPIToken = `zpw7jJDr0WepgN7iYZnZpJLw8Y4`; // public token for now. change to env once private token is shared
export const ozivaShopifyDomain = `oziva.myshopify.com`;
export const userEndpoint = `https://${appAPI}.oziva.in/nitro/user`;
export const userProfilePath = `https://${appAPI}.oziva.in/nitro/user/profile`;
export const ordersEndpoint = `https://${appAPI}.oziva.in/nitro/user/order/list`;
export const notificationSettingsPath = `https://${appAPI}.oziva.in/nitro/user/settings/notification`;
export const userAddressesPath = `https://${appAPI}.oziva.in/nitro/user/address`;
export const offersUrl = `https://tok8lryy55.execute-api.ap-south-1.amazonaws.com/prod/discount/codes`;
export const walletRedeemEndpoint = `https://wallet-redeem.${env}.oziva.in`;
export const walletTransactionsEndpoint = `https://wallet-redeem.${env}.oziva.in/users/trahttps://dev-oziva.myshopify.comnsactions`;

export const carbonChatbotEndpoint = `https://carbon.${env}.oziva.in/chatbot/`;
export const subscriptionEndpoint = `https://${appAPI}.oziva.in/subscription`;

export const subscriptionPaymentInitiateEndpoint =
  env == 'dev'
    ? `https://dh6v97ke5i.execute-api.ap-south-1.amazonaws.com/${env}`
    : `https://81r9kdn9mb.execute-api.ap-south-1.amazonaws.com/${env}`;

export const codDisabledCodes = ['PREPAID', 'PREPAID15'];

export const RUPEE_SYMBOL = `\u20B9`;
export const RAZORPAY_LIVE_KEY =
  env == 'dev' ? 'rzp_test_m3bGSBGDkT5IGE' : 'rzp_live_qaFUwm4d5Z66hx';
export const RAZORPAY_API_URL = 'https://api.razorpay.com/v1/methods';

// Chatwoot Keys
export const chatWootWebsiteToken =
  env == 'dev' ? 'tgnzuh4ABSAPTpCFBwkBSq1h' : 'fhPxASh4qSvP16hBEZTtLXph';

export const chatWootBaseURL = `https://chatwoot.${env}.oziva.in`;
export const SEARCH_API_TOKEN =
  env != 'dev' ? 'okjhffdgshghfsdffgsdfeca' : 'okjhffdgshghfsdffgsdfeca';

export const PLATFORM_HEADERS = {
  channel: Platform.OS !== 'android' ? 'ios-app' : 'android-app',
  appVersion: `${APP_VERSION}`,
};

export const policyURL = `https://${policyPath}.myshopify.com/api/2022-04/graphql`;
export const policyToken = env === 'dev' ? '396634c1ce60f5ea2593342adb2991bd' : '2edc93cb80d2e079172d67f0f61a9812';

export const reviewSortKeys = [
  {
    id: 1,
    title: 'Most Recent',
    sort_by: 'created_at',
    sort_dir: 'desc',
    checked: true,
  },
  { id: 2, title: 'Highest Rating', sort_by: 'rating', sort_dir: 'desc' },
  { id: 3, title: 'Lowest Rating', sort_by: 'rating', sort_dir: 'asc' },
  { id: 4, title: 'Only Pictures', sort_by: 'with_pictures' },
  { id: 5, title: 'Pictures First', sort_by: 'pictures_first' },
  { id: 6, title: 'Videos First', sort_by: 'videos_first' },
  { id: 7, title: 'Most Helpful', sort_by: 'most_helpful' },
];

export const COLLECTION_BY_HANDLE = (
  option,
  index,
) => `product${index}: collectionByHandle(handle: \"${option.id}\") {
                  products(first: 50) {
                      edges {
                          node {
                          id
                        }
                    }
                }                    
            }`;

export const DEFAULT_FILTER_QUERY = `product0: collectionByHandle(handle: "frontpage") {
                  products(first: 50) {
                      edges {
                          node {
                          id
                        }
                    }
                }                    
            }`;

export const level1Details = [
  {
    title: "Women's Health",
    id: 'whe',
  },
  { title: "Men's Health", id: 'mhe' },
  { title: 'Hair & Skin', id: 'has' },
  { title: 'General Wellness', id: 'gwel' },
];

export const detailsArray = {
  whe: [
    {
      title: 'Everyday Fitness',
      id: 'general-fitness',
    },
    {
      title: 'Weight Loss',
      id: 'weight-loss-1',
    },
    {
      title: 'PCOS',
      id: 'pcos-pcod',
    },
    {
      title: 'Bone Health',
      id: 'bone-health',
    },
    {
      title: 'Menopause',
      id: 'menopause',
    },
    {
      title: 'Vaginal Health',
      id: 'vaginal-health',
    },
  ],
  mhe: [
    {
      title: 'Lean Muscles',
      id: 'lean-muscles',
    },
    {
      title: 'Weight Loss',
      id: 'weight-loss-products-for-men',
    },
  ],
  has: [
    {
      title: 'Hairfall & Frizz',
      id: 'hairfall',
    },
    {
      title: 'Dandruff',
      id: 'dandruff',
    },
    {
      title: 'Glow',
      id: 'glow',
    },
    {
      title: 'Acne',
      id: 'acne',
    },
    {
      title: 'Aging',
      id: 'aging',
    },
    {
      title: 'Pigmentation',
      id: 'pigmentation',
    },
  ],
  gwel: [
    {
      title: 'Vitamins & Minerals',
      id: 'vitamins-minerals',
    },
    {
      title: 'Immunity',
      id: 'immunity',
    },
    {
      title: 'Stress & Anxiety',
      id: 'stress-anxiety',
    },
    {
      title: 'Sleep Aid',
      id: 'sleep-aid',
    },
    {
      title: 'Greens',
      id: 'greens',
    },
    {
      title: 'Diabetes',
      id: 'diabetes',
    },
  ],
};
export const details = [
  {
    category: "Women's Health",
    items: [
      {
        title: 'Evveryday Fitness',
        key: 'general-fitness',
      },
      {
        title: 'Weight Loss',
        key: 'general-fitness',
      },
      {
        title: 'PCOS',
        key: 'pcos-pcod',
      },
      {
        title: 'Bone Health',
        key: 'bone-health',
      },
      {
        title: 'Menopause',
        key: 'menopause',
      },
      {
        title: 'Vaginal Health',
        key: 'vaginal-health',
      },
    ],
  },
  {
    category: "Men's Health",
    items: [
      {
        title: 'Lean Muscles',
        key: 'lean-muscles',
      },
      {
        title: 'Weight Loss',
        key: 'weight-loss-products-for-men',
      },
    ],
  },
  {
    category: 'Hair & Skin',
    items: [
      {
        title: 'Hairfall & Frizz',
        key: 'hairfall',
      },
      {
        title: 'Dandruff',
        key: 'dandruff',
      },
      {
        title: 'Glow',
        key: 'glow',
      },
      {
        title: 'Acne',
        key: 'acne',
      },
      {
        title: 'Aging',
        key: 'aging',
      },
      {
        title: 'Pigmentation',
        key: 'pigmentation',
      },
    ],
  },
  {
    category: 'General Wellness',
    items: [
      {
        title: 'Vitamins & Minerals',
        key: 'vitamins-minerals',
      },
      {
        title: 'Immunity',
        key: 'immunity',
      },
      {
        title: 'Stress & Anxiety',
        key: 'stress-anxiety',
      },
      {
        title: 'Sleep Aid',
        key: 'sleep-aid',
      },
      {
        title: 'Greens',
        key: 'greens',
      },
      {
        title: 'Diabetes',
        key: 'diabetes',
      },
    ],
  },
];

export const states = [
  {
    id: 'AN',
    name: 'Andaman and Nicobar Islands',
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
  },
  {
    id: 'AR',
    name: 'Arunachal Pradesh',
  },
  {
    id: 'AS',
    name: 'Assam',
  },
  {
    id: 'BR',
    name: 'Bihar',
  },
  {
    id: 'CG',
    name: 'Chandigarh',
  },
  {
    id: 'CH',
    name: 'Chhattisgarh',
  },
  {
    id: 'DH',
    name: 'Dadra and Nagar Haveli',
  },
  {
    id: 'DD',
    name: 'Daman and Diu',
  },
  {
    id: 'DL',
    name: 'Delhi',
  },
  {
    id: 'GA',
    name: 'Goa',
  },
  {
    id: 'GJ',
    name: 'Gujarat',
  },
  {
    id: 'HR',
    name: 'Haryana',
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
  },
  {
    id: 'JK',
    name: 'Jammu and Kashmir',
  },
  {
    id: 'JH',
    name: 'Jharkhand',
  },
  {
    id: 'KA',
    name: 'Karnataka',
  },
  {
    id: 'KL',
    name: 'Kerala',
  },
  {
    id: 'LD',
    name: 'Lakshadweep',
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
  },
  {
    id: 'MH',
    name: 'Maharashtra',
  },
  {
    id: 'MN',
    name: 'Manipur',
  },
  {
    id: 'ML',
    name: 'Meghalaya',
  },
  {
    id: 'MZ',
    name: 'Mizoram',
  },
  {
    id: 'NL',
    name: 'Nagaland',
  },
  {
    id: 'OR',
    name: 'Odisha',
  },
  {
    id: 'PY',
    name: 'Puducherry',
  },
  {
    id: 'PB',
    name: 'Punjab',
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
  },
  {
    id: 'SK',
    name: 'Sikkim',
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
  },
  {
    id: 'TS',
    name: 'Telangana',
  },
  {
    id: 'TR',
    name: 'Tripura',
  },
  {
    id: 'UK',
    name: 'Uttar Pradesh',
  },
  {
    id: 'UP',
    name: 'Uttarakhand',
  },
  {
    id: 'WB',
    name: 'West Bengal',
  },
];

export const TermsAndConditions = [
  {
    id: 1,
    item: 'This 3-month OZiva Prime membership offer ("Offer"), is provided to you by Zywie ventures Private limited having brand name “OZiva” on the website https://www.oziva.in and the corresponding mobile site and mobile application (collectively, "OZiva"), in respect of OZiva Prime membership made available by OZiva.',
  },
  {
    id: 2,
    item: 'These terms and conditions (" Prime") shall be read in conjunction with the General website terms and conditions and the applicable Privacy Notice, to which you agree by availing OZiva Prime Membership. In the event of any conflict between such terms and these OZiva Prime Membership Terms, these Prime Terms will prevail, for the purposes of this Offer',
  },
  {
    id: 3,
    item: "Customers can purchase an OZiva Prime membership from the official website's Prime Page or Cart Page",
  },
  {
    id: 4,
    item: 'OZiva Prime benefits will be available to its members only.',
  },
  {
    id: 5,
    item: 'OZiva Prime membership is the perfect start to move ahead in your journey of #aBetterYou. One can avail the benefits such as additional discounts and cashback will be made through a member’s OZiva Cash Wallet and access to connect with our certified Nutritionists will be exclusively available to our Prime members from the OZiva website.',
  },
  {
    id: 6,
    item: 'OZiva Cash reward points can be redeemed during any purchase on the OZiva app. 1 unit of OZiva cash is equivalent to a ₹1. At the moment, OZiva Cash is available only in India. OZiva cash will be expired if not redeemed within 6 months from the date of earnings.',
  },
  {
    id: 7,
    item: 'OZiva reserves the sole right, at any time, without prior notice and without assigning any reason whatsoever, to add/alter/modify/change any or all of these Offer Terms or to replace the Offer of the Prime membership.',
  },
  {
    id: 8,
    item: 'OZiva reserves the right to disqualify any customer from availing the OZiva Prime membership, if any fraudulent activity is identified as being carried out for the purpose of availing this Offer/ membership.',
  },
  { id: 9, item: 'OZiva Prime membership is non-transferrable.' },
  {
    id: 10,
    item: 'OZiva Prime membership expires in 3 months from the date of purchase.',
  },
];

export const sortShopOptions = [
  {
    name: 'Popularity',
    key: 'BestSelling',
    id: '1',
    checked: true,
  },
  {
    name: 'New Arrivals',
    key: 'UpdatedAt',
    id: '2',
    checked: false,
  },
  {
    name: 'Price - Low to High',
    key: 'Price',
    id: '3',
    checked: false,
  },
];

export const SENTRY_DSN =
  'https://3c23afff8f474175afc7c34b3466712e@o566501.ingest.sentry.io/6138364';

export const ADJUST_EVENTS_TOKEN = {
  SCREEN_VIEWED: 'nmnm38',
  PRODUCT_VIEWED: 'a1vyeb',
  ADD_TO_CART: 'oatmzc',
  LOGIN: 'nxhroy',
  CHECKOUT: 'u6nobu',
  PURCHASE: 'xqlza5',
  PAYMENT: 'orcvw7',
  IOS_TEST: 'qjvzem',
};

export const ProductBadgesInfo = {
  SHIPPING: {
    title: 'Free Shipping',
    description:
      'We offer FREE Shipping on all prepaid orders and COD order above ₹799.',
    icon: FreeShippingSvg,
  },
  PAYMENT: {
    title: 'Secure Payments',
    description:
      'Complete your payments in a simple, easy and secure way on the OZiva website. We protect all data shared, no matter the method. 100% Secure | 100% Easy',
    icon: SecurePaymentsSvg,
  },
  RETURNS: {
    title: 'Easy Returns',
    description:
      'If we receive a cancellation notice and the order has not been processed / approved by us, we shall cancel the order and refund the entire amount to User within 14 working days.',
    icon: EasyReturnsSvg,
  },
};

export const DefaultCollectionByHandleQuery = {
  sortOrder: '',
  page: 1,
  limit: 6,
  upperLimit: 200,
  sortBy: 'DESC',
};

export const FOOTER_BADGES = [
  {
    title: `Hassle-free\nDelivery`,
    header: 'Refund Policy',
    type: 'refundPolicy',
    image:
      'https://cdn.shopify.com/s/files/1/2393/2199/files/hassle_free_delivery_icon_b4ca190d-6d3a-4027-80d8-7fbc07cc047d.png?v=1696319754',
  },
  {
    title: `Clean\nProduct`,
    header: 'Privacy Policy',
    type: 'privacyPolicy',
    image:
      'https://cdn.shopify.com/s/files/1/2393/2199/files/clean_lable_icon_005e3d0e-97ae-4632-9534-9e4851337b80.png?v=1696319754',
  },
  {
    title: `Payment\nSecurity`,
    header: 'Terms of service',
    type: 'termsOfService',
    image:
      'https://cdn.shopify.com/s/files/1/2393/2199/files/payment_security_icon_9b329dab-4ed1-4a16-a3ea-2ee035fd08c9.png?v=1696319754',
  },
];

export const OneMonthConsultationDetail: any = {
  image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_prod_image_895d3327-310f-4b9e-bd2e-f796e2fba780.png?v=1707882796',
  title: '1 Month Nutritionist Diet Consultation + Diet Plan',
  badgeTitle: "1 Month",
  compareAtPrice: 1499
}

export const ThreeMonthConsultationDetail: any = {
  image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_prod_image_895d3327-310f-4b9e-bd2e-f796e2fba780.png?v=1707882796',
  title: '3 Month Nutritionist Diet Consultation + Diet Plan',
  badgeTitle: "3 Month",
  compareAtPrice: 0
};

export const BenefitsText = [
  'Enjoy 91% discount on Prime membership.',
  'Get FREE diet plan and unlimited diet consultation from our nutritionist.',
  'Save 30% more on each order after purchasing prime.'
]

export const upiIntentApps = ['gpay', 'phonepe', 'paytmmp', 'any', 'google pay', 'paytm'];

export const searchDefaultCollection = {
  name: 'Bestseller',
  handle: 'best-sellers',
  imgSrc: '',
}

export const fallbackForSearchParams = { "sort": "[{\"field\":\"relevance\",\"order\":\"asc\"},{\"field\":\"product_rank:float\",\"order\":\"asc\"}]", "x-api-key": "NUlnRUMrNXNzNEYrckpmR0dtZnRLYklIaU03WGl0NWxsQUplaGkwdHppWGs1eFQ0cXdicXY4ayt6K0x0RUNrQ2s0YmJQOHJ5UUNPUFRNT20xcFJMNVpVZmlNbkU5MCtFL05yblBDVGxPemM9", "x-store-id": "f852e93ef98811ef811e0a0c8095feae" }

export const socialIcons = [
  {
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Facebook_1.svg?v=1756113809',
    webUrl: 'https://www.facebook.com/OzivaLife',
    appUrl: 'fb://profile/ozivalife' // Facebook Page/Profile
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/instagram_1.svg?v=1756113810',
    webUrl: 'https://www.instagram.com/ozivanutrition/',
    appUrl: 'instagram://user?username=ozivanutrition'
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/twitter_1.svg?v=1756113810',
    webUrl: 'https://x.com/ozivanutrition',
    appUrl: 'twitter://user?screen_name=ozivanutrition'
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/youtube_1.svg?v=1756113809',
    webUrl: 'https://www.youtube.com/channel/UCO7-tvmIJbKi87Rl6w-1yAg',
    appUrl: 'vnd.youtube://channel/UCO7-tvmIJbKi87Rl6w-1yAg'
  }
];



export const UNSERVICEABLE_PINCODE = 'Sorry! We’re currently unable to deliver to your pincode, please try placing your order for a different address/pincode'
export const PHWProductId = '2037269397563';
export const PHMProductId = '2044494610491';


export const trustedByMillions: any[] = [
  {
    title: ["Potent Plant", "Extracts"],
    description: "These are made with powerful plant extracts.",
    icon: "https://cdn.shopify.com/s/files/1/2393/2199/files/Plant_Based_fc43f992-708e-4ceb-8351-09a6bd9d51c4.png?v=1731055107"
  },
  {
    title: ["No Side", "Effects"],
    description: "Formulated to avoid harmful side effects.",
    icon: "https://cdn.shopify.com/s/files/1/2393/2199/files/No_Side_Effects_07e53ea8-02a0-4ab5-9956-70d847b5178e.png?v=1731055107"
  },
  {
    title: ["Fast", "Delivery"],
    description: "Quick doorstep delivery guaranteed.",
    icon: "https://cdn.shopify.com/s/files/1/2393/2199/files/Free_Shipping_884d30f6-49aa-4ee3-9ed7-2635a021aa1f.png?v=1731055107"
  },
  {
    title: ["Secure", "Payments"],
    description: "Your payments are 100% safe and secure.",
    icon: "https://cdn.shopify.com/s/files/1/2393/2199/files/Secure_Payments_ca26cd42-afed-457a-91ee-a6304c3ea1d6.png?v=1731055464"
  }
];

export const consultationData: any[] = [
  {
    id: 1,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320011.png?v=1736420182',
    text: 'Nutritionist Diet Consultation'
  },
  {
    id: 2,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320016.png?v=1736420182',
    text: 'Custom Diet Plan'
  },
  {
    id: 3,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320017.png?v=1736420182',
    text: 'Expert Nutritionists Guidance'
  },
  {
    id: 4,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320019.png?v=1736420182',
    text: 'Lifestyle Tips for Best Results'
  },
  {
    id: 5,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320020.png?v=1736420182',
    text: 'Boost Results with OZiva Products'
  },
];

export const routeArray: any[] = [{ screenName: 'CartScreen', name: 'Cart', isActive: false }, { screenName: 'AddressOrderSummaryScreen', name: 'Address', isActive: false }, { screenName: 'PaymentMethodScreen', name: 'Payment', isActive: false }];
export const setTimeoutBasedOnNetworkType = (connectionType: string) => {
  let timeout = 20000;
  switch (connectionType) {
    case '4g':
      timeout = 25000;
      break;
    case '3g':
      timeout = 30000;
      break;
    default:
      timeout = 15000;
      break;
  }

  return timeout;
};

export const totalCashBack = (isPrime: boolean, cashback: number, orderTotal: number) => {
  if(isPrime){
    if(cashback) {
      return convertToRupees(cashback ?? 0) + Math.floor(convertToRupees(orderTotal ?? 0) * 0.15);
    }else{
      return Math.floor(convertToRupees(orderTotal ?? 0) * 0.15);
    }
  }else{
    return convertToRupees(cashback ?? 0) + Math.floor(convertToRupees(orderTotal ?? 0) * 0.15);
  }
}
