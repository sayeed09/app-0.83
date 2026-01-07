export interface CollectionByTypeResponseModel {
  data: CollectionByTypeModel;
}

export interface CollectionByTypeModel {
  collections: Collection[];
}

export interface Collection {
  name: string;
  handle: string;
  imgSrc: string;
}

export interface CollectionByHandleResponse {
  data: CollectionByHandleData;
  error: Error;
}

export interface CollectionByHandleData {
  id: string;
  title: string;
  handle: string;
  products: Product[];
  subCollections: Collection[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  image: string;
  benefits: string[];
  compareAtPrice: number;
  price: number;
  variantId: string;
}

export interface Error {}
