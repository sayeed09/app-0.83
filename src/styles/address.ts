import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        backgroundColor: '#F5F5F5',
    },
    addAddressButton: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: '#6BBD58',
        borderRadius: 2,
        height: 42,
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: '#FFF'
    },
    addAddressButtonText: {
        color: '#6BBD58',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        textAlign: 'center',
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    footerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    addressContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 4,
        marginBottom: 8,
    },
    defaultAddressText: {
        color: '#000',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 20,
        paddingBottom: 12,
    },
    radioContainer: {
        marginTop: 4,
        marginRight: 5,
        backgroundColor: '#fff',
    },
    addressCardWrapper: {
        marginTop: 4,
    },
    inputGroup: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 8,
    },
    input: {
        flex: 1,
    },
    baseInput: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.16)',
        fontSize: 14,
        letterSpacing: 0.014,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 16,
        borderRadius: 6,
        height: 45,
        color: '#000'
    },
    inputFocused: {
        borderColor: '#6BBD58',
    },
    textFocused: {
        color: '#6BBD58',
    },
    baseErrorInput: {
        borderColor: '#cd201f',
    },
    inputLabel: {
        opacity: 0.6,
        fontSize: 14,
        color: '#525155',
        fontWeight: 'bold',
        letterSpacing: 0.23,
        lineHeight: 16,
        marginBottom: 5,
    },
    disabledInput: {
        backgroundColor: '#ccc',
    },
    placeHolderText: {
        color: '#7E7E7E',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.048,
    },
    addressSectiontitles: {
        padding: 8,
    },
    checkBoxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingHorizontal: 0,
    },
    primaryBtn: {
        borderRadius: 2,
        backgroundColor: '#937DFD',
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.24,
        lineHeight: 24,
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden',
        borderColor: '#937DFD',
        borderWidth: 1,
    },
    radioGroup: {
        gap: 18,
    },
    radioOption: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    radioLabel: {
        fontSize: 12,
    },
    formGroup: {
        marginTop: 10,
        gap: 8,
    },
    sectionTitle: {
        color: "#000",
        fontSize: 14,
        fontWeight: "400",
        paddingBottom: 12,
    },
    billingFormContainer: {
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 4,
    }
});
