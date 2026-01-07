import { Dimensions, StyleSheet } from 'react-native';
import { width } from 'utils/constants';
const gap = 8
const itemPerRow = 2.5
const totalGapSize = (itemPerRow - 1) * gap
const windowWidth = Dimensions.get('window').width
const childWidth = (windowWidth - totalGapSize) / itemPerRow

export const HorizontalCardT1Style = StyleSheet.create({
    flexGap8: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: -(gap / 2),
        marginHorizontal: -(gap / 2)
    },
    StandardProductCard: {
        flexDirection: 'row',
        textAlign: 'center',
        marginVertical: (gap / 2),
      },
      StandardProductCardActive: {
        borderColor: '#6BBD58',
        backgroundColor: '#F0FAF0',
      },
      titleProduct: {
        marginBottom: 8,
        overflow: 'hidden',
      },
      DeleteIcon:{
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 2,
      },
    PrimeProductCard: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#E0E0E0',
      marginBottom: 4,
      marginHorizontal: 4,
      marginTop: 8
    }
});