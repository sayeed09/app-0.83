import { Order } from 'models/orders';

export type AppStackDefinition = {
  HelpDesk: undefined;
  Home: any;
  ProductDetails: {
    queryString: string;
    productTitle: string;
    variantId?: string;
  };
  CartScreen: undefined;
  AskAQuestion: any;
  WriteAReview: undefined;
  ShopOffersScreen: undefined;
  Addresses: { isView?: boolean, screenName: string };
  AddAddressScreen: { navigateTo: string; isSubscription: boolean, screenName: string };
  AddressOrderSummaryScreen: undefined;
  OrderConfirmationScreen: undefined;
  PaymentMethodScreen: undefined;
  Support: undefined;
  ProfileScreen: undefined;
  Contact: undefined;
  EditProfile: undefined;
  OZivaCash: undefined;
  OZivaPrime: undefined;
  Orders: undefined;
  Offers: undefined;
  NotificationSettings: undefined;
  Subscriptions: undefined;
  SubscriptionDetails: { id: string };
  OrderDetails: { order: Order };
  Search: undefined;
  SearchResults: { searchQuery: string };
  Privacy: undefined;
  Purpose: undefined;
  ProductAdvice: undefined;
  Terms: undefined;
  Refund: undefined;
  ToDo: undefined;
  Chat: { uri: string };
  CLPCertificate: undefined;
  ProductImages: undefined;
  BannerDeepLinksView: { uri: string; title: string };
  OZivaTV: undefined;
  BeBettrEdit: undefined;
  BeBettrPost: undefined;
  Notifications: undefined;
  AllFeed: undefined;
  SubscriptionCartScreen: undefined;
  SubscriptionAddressOrderSummary: undefined;
  SubscriptionOrderConfirmation: { orderId: string; nextOrder: string };
  Collection: undefined;
  OZivaBlog: undefined;
  Consult: undefined
};

export type AppTabsDefinition = {
  Home: undefined;
  Concerns: {
    collectionHandle: string;
  };
  Categories: {
    collectionHandle: string;
  };
  Consult: undefined;
};
