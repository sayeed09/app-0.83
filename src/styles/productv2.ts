import { StyleSheet } from 'react-native';
import { width } from 'utils/constants';

export const RecommendedByExpertStyle = StyleSheet.create({
    container: {
        backgroundColor: '#B0DDA7',
        paddingVertical: 16
    },
    viewContainer: {
        backgroundColor: '#fff',
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        flexGrow: 1,
        borderRadius: 4,
        marginHorizontal: 16
    },
    description: {
        color: '#424242',
        fontSize: 14,
        flexWrap: 'wrap',
        display: 'flex',
        flexGrow: 1,
        lineHeight: 20
    },
    txtContainer: {
        flexShrink: 1,
        gap: 8
    },
    expertName: {
        fontWeight: '500'
    }
});


export const GoogleReviewsStyle = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 16,
        marginTop: 32,
    },
    ratingTxt: {
        fontSize: 41,
        fontWeight: '400',
        fontFamily: 'Manrope-Regular'
    },
    ratingContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        paddingHorizontal: 16
    },
    totalreviewContainer: {
        paddingLeft: 70,
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    reviewRatingContainer: {
        display: 'flex',

    },
    reviewTxt: {
        color: '#474390'
    },
    reviewItem: {
        // marginRight: 8
        width: width
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginBottom: 16
    },
    reviewer: {
        fontSize: 14,
        fontFamily: 'Manrope-Regular',
        display: 'flex',
        flexWrap: 'wrap',
        width: width * 0.6
    },
    reviewDesc: {
        fontSize: 14,
        marginTop: 8,
        lineHeight: 20
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#BDBDBD',
        marginVertical: 16,
        marginHorizontal: 16
    },
    reviewItemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        width: width - 32
    },
    reviewListContainer: {
        paddingHorizontal: 16,
        // marginHorizontal: 16,
    }
})

export const IconDescriptionStyle = StyleSheet.create({
    container: {
        marginTop: 32
    },
    section: {
        // marginTop: 16,
    },
    item: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomColor: '#c8e6c8',
        borderBottomWidth: 1,
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        fontSize: 14,
        marginTop: 16,
        lineHeight: 20,
        letterSpacing: 0.014
    },
    icon: {
        borderRadius: 4
    },
    arrowicon: {
        marginLeft: 'auto',
    },
    title: {
        fontSize: 14,
        color: '#424242',
        fontWeight: '500',
        paddingLeft: 8
    },
    active: {
        backgroundColor: '#F5F5F5',
    }
});

export const ArticlesStyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 32,
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
        paddingBottom: 0
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#006E5A',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionTitle: {
        fontFamily: 'Manrope-ExtraBold',
        fontSize: 18,
        fontWeight: '800',
        flexShrink: 1,
        marginLeft: 16
    },
    arrowIcon: {
        display: 'flex',
        marginTop: 'auto',
        alignSelf: 'flex-end',
        marginBottom: 8,
        width: 24,
        height: 24
    },
    count: {
        color: '#006E5A',
        fontFamily: 'Manrope-Regular',
        fontWeight: '300',
        fontSize: 70,
    },
    listArticleItem: {
        borderRadius: 2,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        padding: 8
    },
    listArticleTitle: {
        fontSize: 12,
        lineHeight: 20,
        flex: 0.9
    },
    listArticleContainer: {
        padding: 8,
        gap: 8,
        display: 'flex',
        height: '70%',
        marginBottom: 30
    },
    listArticleModalHeader: {
        backgroundColor: '#F0FAF0'
    },
    countSec: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: 90,
        minHeight: 83
    },
    backArrow: {
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
        fontSize: 14,
        fontWeight: '500',
        alignItems: 'center'
    },
    listingItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listingItemIcon: {
        width: 24,
        height: 24,
        display: 'flex',
        alignSelf: 'center'
    }
});

export const ImageComparionStyle = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        marginTop: 32,
        paddingVertical: 16,
        minHeight: 462
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    item: {
        marginHorizontal: 16,
        borderRadius: 4
    },
    itemImage: {
        width: 250,
        height: 318,
        borderRadius: 4
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 32
    }
});

export const BannerStyle = StyleSheet.create({
    container: {
        marginTop: 32
    }
});
export const ClinicalStudyStyle = StyleSheet.create({
    banner: {
        margin: 'auto',
        borderRadius: 4,
        // marginBottom: 16
    }
});

export const FooterStyle = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4
    },
    btn: {
        display: 'flex',
        backgroundColor: '#FF6F00',
        flex: 1,
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        minHeight: 48,
        alignContent: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    mrpText: {
        color: '#E0E0E0',
        fontSize: 10,
        fontWeight: "400"
    },
    sellingText: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: "700"
    },
    saveText: {
        color: '#E0E0E0',
        fontSize: 12,
        fontWeight: "400"
    },
    buyNow: {
        marginLeft: 'auto',
        color: '#FFF',
        fontSize: 14,
        fontWeight: "700"
    },
    divider: {
        backgroundColor: '#FFF',
        width: 1,
        height: '70%',
        marginHorizontal: 4
    },
    thumbnailContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    ratingsText: {
        fontSize: 10,
        fontWeight: "400",
        color: '#7E7E7E'
    },
    star: {
        width: 12
    },
    sellingNudgeContainer: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#F9D2C7',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.14,
        shadowRadius: 4,
        elevation: 4, // For Android
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    sellingNudgeText: {
        color: '#FF6F00',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '500',
    }

});

export const TitleReviewStyle = StyleSheet.create({
    txt: {
        fontSize: 18,
        fontFamily: 'Manrope-Bold',
        padding: 16,
        lineHeight: 25
    },
    withContainer: {
        display: 'flex',
        gap: 4
    },
    item: {
        display: 'flex',
        flexDirection: "row"
    },
    reviewSec: {
        alignSelf: 'flex-end',
        marginLeft: 'auto',
    },
    reviewContainer: {

        borderColor: '#E0E0E0',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    withRatingsContainer: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16

    },
    forTxt: {
        fontSize: 14,
        color: '#006E5A',
        fontWeight: '500',
        marginRight: 4
    },
    descTxt: {
        color: '#424242',
        fontWeight: '400'

    },
    reviewstxt: {
        color: '#424242',
        fontSize: 12
    },
    horizontalLine: {
        width: 2,
        height: 16,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 4
    }
});


export const ProductInfoAndFAQtyle = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    tabsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16,
        flex: 1,
        paddingHorizontal: 16,
    },
    tab: {
        flex: 1,
        textAlign: 'center',
        width: (width - 32) / 2,
        paddingHorizontal: 8,
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: 16,
        alignItems: 'center',
        minHeight: 70
    },
    tab1: {
        borderRightWidth: 1,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    tab2: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    tabTxt: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
    },
    active: {
        backgroundColor: '#B0DDA7'
    },
    tabItems: {
        paddingHorizontal: 16
    }
});


export const ProductSliderThumbnailStyle = StyleSheet.create({
    container: {
        display: 'flex',
        paddingTop: 16,
        width: width * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
        flexDirection: 'row',
        gap: 8
    },
    list: {
        marginHorizontal: 'auto'
    },
    item: {
        width: 50,
        height: 50,
        marginRight: 8
    },
    active: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#6BBD58'
    },
    mainSliderButtonDisabled: {
        opacity: 0.3
    }
});


export const ProductOptionItemStyle = StyleSheet.create({
    consumptionText: {
        lineHeight: 16,
        padding: 4,
        backgroundColor: 'rgba(254, 204, 14, 0.5)',
        borderRadius: 2,
        marginBottom: 4,
        marginHorizontal: 4,
        textAlign: 'center',
        fontWeight: '500'
    },
    subHeader: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: 12,
        minHeight: 40
    },
    saveText: {
        display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 'auto',
        alignItems: 'center',
        marginHorizontal: 'auto'
    }

});