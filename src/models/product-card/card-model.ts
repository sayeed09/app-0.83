export interface ProductCardModel {
  productId: string;
  variantId: string;
  title: string;
  price: string;
  compareAtPrice: string;
  benefits?: string[];
  handle?: string;
  image: string;
  options?: string[];
  averageRating?: string;
  numberOfReviews?: string;
  subscriptionInterval?: string;
  quantity?: number;
  benefitsNew?: {
    for: string,
    with: string
  }
  option1?: string;
  option2?: string;
}
