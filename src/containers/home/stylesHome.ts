import { StyleSheet } from 'react-native';
import { width } from 'utils/constants';

export const homeStyles = StyleSheet.create({
  viewAllBTN: {
    position: 'absolute',
    right: 16,
  },
  subHeading: {
    fontSize: 12,
    lineHeight: 16,
    color: '#424242',
  },
  viewAllBTNText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#F04E23',
  },
  CleanProdSection: {
    width: '100%',
    flexDirection: 'row',
  },
  CleanProdCards: {
    backgroundColor: '#F0FAF0',
    borderRadius: 4,
    overflow: 'hidden',
    width: 160,
    flex: 1,
    marginRight: 16,
  },
  CleanProdSectionText: {
    padding: 12,
    textAlign: 'center',
    width: '100%',
    borderColor: '#6BBD58',
    borderTopWidth: 1,
  },
  HarTarahSeBetterSection: {
    width: '100%',
    flexDirection: 'row',
  },
  HarTarahSeBetterSectionCards: {
    flex: 1,
    padding: 10,
  },
  hthj: {
    padding: 12,
    textAlign: 'center',
    width: '100%',
    borderColor: '#6BBD58',
    borderTopWidth: 1,
  },
  HarTarahSeBetterSectionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#006E5A',
  },
  HTSBMiddleCard: {
    marginTop: -32,
  },
});
