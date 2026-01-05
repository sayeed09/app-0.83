import { StyleSheet } from 'react-native';

export const ConsumerStudiesStyle = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#000',
    position: 'absolute',
    top: -24,
    left: 8,
  },
  CSBOXList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    justifyContent: 'space-between',
    flex: 1,
  },
  CSBOXes: {
    position: 'relative',
    backgroundColor: '#F0FAF0',
    padding: 8,
    paddingVertical: 30,
    marginVertical: 4,
    color: '#7E7E7E',
    minHeight: 113,
    marginTop: 20,
    borderRadius: 2,
    width: '48.5%',
  },
});
