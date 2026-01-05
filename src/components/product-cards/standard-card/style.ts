import { Dimensions, StyleSheet } from 'react-native';
import { width } from 'utils/constants';
const gap = 8
const itemPerRow = 2
const totalGapSize = (itemPerRow - 1) * gap
const windowWidth = Dimensions.get('window').width
const childWidth = (windowWidth - totalGapSize) / itemPerRow

export const StandardCardsStyle = StyleSheet.create({
    flexGap8: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: -(gap / 2),
        marginHorizontal: -(gap / 2)
    },
    StandardProductCard: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: width / 2 - 16,
        alignSelf: 'flex-start',
        flexGrow: 0,
        borderRadius: 2,
        flexDirection: 'column',
        textAlign: 'center',
        marginVertical: (gap / 2),
        marginHorizontal: (gap / 2),
        zIndex: 2,
      },
      StandardProductCardActive: {
        borderColor: '#6BBD58',
        backgroundColor: '#F0FAF0',
      },
      titleProduct: {
        marginBottom: 8,
        overflow: 'hidden',
        height: 48,
      }
});
