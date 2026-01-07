

export interface ImageComparisonModel {
    image1: string;
    image2: string;
}

export interface Section {
    type: string
    header?: string
    sort?: number
    comparisons?: Comparison[]
    iconDescriptions?: IconDescription[]
    desktop?: string
    mobile?: string
    articleSection?: ArticleSection[]
    googleReview?: GoogleReviews
}

export interface Comparison {
    desktopImage1: string
    desktopImage2: string
    mobileImage1: string
    mobileImage2: string
}

export interface IconDescription {
    src: string
    description: string
    title: string
}
export interface ArticleSection {
    sectionTitle: string
    articles: Article[]
}

export interface Article {
    title: string
    src: string
}

export interface GoogleReviews {
    totalReviews: number
    ratings: number
    reviews: Review[]
    subTitle?: string;
}

export interface Review {
    reviewer: string
    image: string
    rating: number
    review: string
    heading?: string;

}