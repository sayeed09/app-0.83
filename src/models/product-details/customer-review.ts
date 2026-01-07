export interface ICustomerReview {
    title: string;
    body: string,
    rating: number,
    productId: string,
    reviewer: {
        name: string
    },
    verified: string,
    createdAt: string,
    pictures: IReviewPictures[]
}

export interface ICustomerReviewResponse {
    data: {
        reviews: ICustomerReview[]
    },
    error: {}
}

interface IReviewPictures {
    urls: {
        huge: string;
        small: string;
        compact: string;
        original: string;
    },
    hidden: boolean;
}