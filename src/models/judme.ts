export interface JudgeMeQuestionRequestPayload {
    url: string;
    shop_domain: string;
    platform: string;
    name: string;
    email: string;
    question_content: string;
    id: number;
    product_title: string;
}

export interface JudgeMeReviewRequestPayload {
    url: string;
    shop_domain: string;
    platform: string;
    name: string;
    email: string;
    rating: number;
    title: string;
    body: string;
    id: number;
}