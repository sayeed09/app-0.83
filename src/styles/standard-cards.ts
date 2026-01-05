import { StyleSheet } from 'react-native';

export const StandardCardStyle = StyleSheet.create({
    StandardProductCard: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: 176,
        borderRadius: 2,
        flexDirection: 'column',
      },
      StandardProductCardActive: {
        borderColor: '#6BBD58',
        backgroundColor: '#F0FAF0',
      },
      titleProduct: {
        height: 38,
        overflow: 'hidden',
      }
});