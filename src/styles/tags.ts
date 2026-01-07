import { StyleSheet } from 'react-native';

export const tagStyle = StyleSheet.create({
    tagsList: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      tags: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 2,
      },
      tagsActive:{
        backgroundColor: '#F0FAF0',
        borderColor: '#6BBD58',
      }
});