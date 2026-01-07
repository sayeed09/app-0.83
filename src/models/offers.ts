export interface PrerequisiteSubtotalRange {
  greater_than_or_equal_to: string;
}

export interface PrerequisiteQuantityRange {
  greater_than_or_equal_to: string;
}

export interface PrerequisiteShippingPriceRange {
  less_than_or_equal_to: string;
}

export interface PrerequisiteToEntitlementQuantityRatio {
  prerequisite_quantity: number;
  entitled_quantity: number;
}

export interface PriceRule {
  id: string;
  value: string;
  title: string;
  error?: any;
  value_type: string;
  customer_selection: string;
  target_type: string;
  target_selection: string;
  allocation_method: string;
  allocation_limit: number;
  once_per_customer: boolean;
  usage_limit: number;
  starts_at: Date;
  ends_at?: any;
  created_date: Date;
  updated_date: Date;
  entitled_product_ids: any[];
  entitled_variant_ids: any[];
  entitled_collection_ids: any[];
  entitled_country_ids: any[];
  prerequisite_product_ids: any[];
  prerequisite_variant_ids: any[];
  prerequisite_collection_ids: any[];
  prerequisite_saved_search_ids: any[];
  prerequisite_customer_ids: any[];
  prerequisite_subtotal_range: PrerequisiteSubtotalRange;
  prerequisite_quantity_range: PrerequisiteQuantityRange;
  prerequisite_shipping_price_range: PrerequisiteShippingPriceRange;
  prerequisite_to_entitlement_quantity_ratio: PrerequisiteToEntitlementQuantityRatio;
  admin_graphql_api_id: string;
  error_code: number;
}

export interface FreebieDetail {
  created_at: Date;
  id: string;
  product_id: string;
  title: string;
  price: number;
  sku: string;
  compare_at_price: number;
  taxable: boolean;
  grams: number;
  weight: number;
  weight_unit: string;
  updated_at: Date;
  image_id: number;
  image_src: string;
}

export interface RootProductDetail {
  created_at: Date;
  id: string;
  product_id: string;
  title: string;
  price: number;
  sku: string;
  compare_at_price: number;
  taxable: boolean;
  grams: number;
  weight: number;
  weight_unit: string;
  updated_at: Date;
  image_id: any;
  image_src: string;
}

export interface Offer {
  createdDate: Date;
  updatedDate: Date;
  id: string;
  code: string;
  description: string;
  type: string;
  visibility: string[];
  freebies: string[];
  discounts: any[];
  deal: string;
  error?: any;
  root_products: string[];
  excluded_products: any[];
  price_rule: PriceRule;
  freebie_details: FreebieDetail[];
  root_product_details: RootProductDetail[];
  excluded_product_details: any[];
  discount_product_details: any[];
  deal_type: string;
  valid_on: string;
  validOn: string;
  landing_page: string;
  error_code: number;
}

export interface OffersListResponse {
  data: Offer[];
  message: string;
}
