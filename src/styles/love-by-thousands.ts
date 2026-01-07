import { StyleSheet } from 'react-native';

export const LoveByTHousandsStyle = StyleSheet.create({
    tbtSection: {
        backgroundColor: '#B0DDA7',
    },
    lbtList: {
        flexDirection:'row',
        marginHorizontal: -3,
    },
    lbtBOXes: {
        position: 'relative',
        width: 230,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 8,
        margin: 4,
        borderRadius: 2,
    },
    lbtText: {
        minHeight: 125,
        marginBottom: 32,
        flexDirection: 'row',
        color: '#424242',
        paddingBottom: 30,
    },
    LBTFooter: {
        position: 'absolute',
        bottom: 16,
        left: 8,
    }
});