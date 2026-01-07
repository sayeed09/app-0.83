import { Section, GoogleReviews } from "./productv2";

export interface ProductCatalogResponse {
  data: IProductResponse;
  error: Error;
}

export interface Error { }
export interface IProducts {
  title: string;
}

export interface IProductResponse {
  id: string;
  title: string;
  description: string;
  vendor: string;
  handle: string;
  status: string;
  variants: IVariant[];
  options: IOption[];
  images: IImage[];
  seo: IProductSEO[];
  benefits: string[];
  howItWorks: IHowItWorks;
  consumerStudy: IConsumerStudy;
  whatMakesItGood: IWhatMakesItGood;
  scientificallyTested: IScientificallyTested;
  recommendedByExperts: IRecommendedByExperts;
  lovedByThousand: ILovedByThousand;
  faq: IFrequentlyAskedQuestion[];
  howToUse: IHowToUse;
  sellingFastAndTimerNudge: boolean;
  verifiedResults: IVerifiedResult;
  clinicalStudies: IClinicalStudy;
  templateName: string;
  sections?: Section[];
  googleReviews?: GoogleReviews;
  newBenefitChips?: INewBenefit;
}

export interface IProductSEO {
  footerTitle: string;
  footerDescription: string;
}

export interface IImage {
  id: string;
  position: number;
  alt: null | string;
  src: string;
  variantIds: number[];
}

export interface IOption {
  name: string;
  position: number;
  values: string[];
}

export interface IVariant {
  id: string;
  title: string;
  price: number;
  position: number;
  compareAtPrice: number;
  option1: string;
  option2: null | string;
  option3: null | string;
  imageId: string;
  inventoryQuantity: number;
  requireShipping: boolean;
  maxQtyAllowed: null;
  visibileOnPdp: boolean;
  isColdUserSuitable: boolean;
  attractor: string;
  consumptionSpanType: string | null;
  consumptionSpan: number;
  subHeader: string;
  placeholderProduct?: string | null;
}

export interface IBaseAdditionalDetail {
  title: string;
}

export interface IConsumerStudyDatum {
  header: string;
  description: string;
  position: number;
}

export interface IConsumerStudy extends IBaseAdditionalDetail {
  subtext: string;
  data: IConsumerStudyDatum[];
}

export interface IHowItWorksDatum {
  image: string;
  description: string;
  position: number;
}

export interface IHowItWorks extends IBaseAdditionalDetail {
  data: IHowItWorksDatum[];
}

export interface IWhatMakesItGoodDatum extends IBaseAdditionalDetail {
  image: string;
  description: string;
  position: number;
}
export interface IWhatMakesItGood extends IBaseAdditionalDetail {
  data: IWhatMakesItGoodDatum[];
}

export interface IRecommendedByExperts extends IBaseAdditionalDetail {
  image: string;
  description: string;
}

export interface ICertificate extends IBaseAdditionalDetail {
  thumbnail: string;
  certificate: string;
  description: string;
  position: number;
}

export interface IHighlight extends IBaseAdditionalDetail {
  image: string;
  position: number;
}

export interface IScientificallyTested extends IBaseAdditionalDetail {
  certificates: ICertificate[];
  highlights: IHighlight[];
}

export interface IFrequentlyAskedQuestion {
  question: string;
  answer: string;
  position: number;
}
export interface IReview {
  image: string;
  reviewerName: string;
  review: string;
  rating: number;
  position: number;
}
export interface ILovedByThousand extends IBaseAdditionalDetail {
  data: IReview[];
}

export interface IHowToUse {
  caption: string;
  data: string[];
}
export interface ManufaturedBy {
  id: number;
  name: string;
  address: string;
}

export interface SoldBy {
  name: string;
  address: string;
}

export interface InventoryDetails {
  expiry_date: string;
  manufatured_by: ManufaturedBy;
  sold_by: SoldBy;
}

export interface IVariantAdditionalDetail {
  variant_id: string;
  title: string;
  position: number;
  inventory_details: InventoryDetails;
  quantity: number;
  formatted_quantity: string;
}

export interface IVariants {
  title: string;
  variants: IVariantAdditionalDetail[];
}

export interface VariantAdditionalResponse {
  data: IVariants;
}

export interface INewBenefit {
  for: string
  with: string
}

export interface IVerifiedResult {
  title: string;
  data: IVerifiedResultDatum[];
}

export interface IVerifiedResultDatum {
  image: string;
  deviceType: DeviceType;
}

enum DeviceType {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

export interface IClinicalStudyDatum {
  image: string;
  deviceType: DeviceType;
}

export interface IClinicalStudy {
  data: IClinicalStudyDatum[];
}