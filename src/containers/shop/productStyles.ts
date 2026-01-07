import { Dimensions, StyleSheet } from 'react-native';
import { grayd9 } from 'components/styles/colors';

const { width } = Dimensions.get('window');

export const ProductStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingHorizontal: 20,
    borderBottomColor: grayd9,
    borderBottomWidth: 1,
    width: '100%',
  },
  routinesContainer: {
    flexDirection: 'column',
    backgroundColor: '#fef4c9',
    padding: 10,
  },
  item: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  routinesItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 15,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: '#ef4e24',
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 40,
    fontSize: 40,
    fontFamily: 'Roboto-Medium',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 20,
    fontSize: 11,
    backgroundColor: '#cd201f',
    color: '#fff',
    borderRadius: 26,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  iconButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2,
    padding: 15,
    marginVertical: -10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});