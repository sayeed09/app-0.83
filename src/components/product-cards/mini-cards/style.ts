import { Dimensions, StyleSheet } from 'react-native';
const gap = 8
const itemPerRow = 2.5
const totalGapSize = (itemPerRow - 1) * gap
const windowWidth = Dimensions.get('window').width
const childWidth = (windowWidth - totalGapSize) / itemPerRow

export const MiniCardsStyle = StyleSheet.create({
    flexGap8: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: -(gap / 2),
        marginHorizontal: -(gap / 2)
    },
    StandardProductCard: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: 165,
        borderRadius: 2,
        flexDirection: 'column',
        textAlign: 'center',
        marginVertical: (gap / 2),
        marginHorizontal: (gap / 2)
      },
      StandardProductCardActive: {
        borderColor: '#6BBD58',
        backgroundColor: '#F0FAF0',
      },
      titleProduct: {
        height: 41,
        overflow: 'hidden',
        marginBottom: 8,
      }
});