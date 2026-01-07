import { base, darkGreen } from 'components/styles/colors';
import { StyleSheet } from 'react-native';

export const PrimeStyles = StyleSheet.create({
  primeMembership: {
    borderColor: darkGreen,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    marginHorizontal: 4,
    marginVertical: 15,
    backgroundColor: '#f0faf0'
  },
  badge: {
    backgroundColor: darkGreen,
    width: 75,
    textAlign: 'center',
    borderRadius: 25,
    paddingVertical: 4,
    color: base,
    fontWeight: '700',
  },
  primePrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    alignItems: "flex-end",
    marginTop: 16
  },
  primeActiveCashBox: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 8,
    borderRadius: 2,
    maxWidth: 180,
    borderColor: '#812C6D'
  },
  primeBenefits: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E0E0E0',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
  },
  buyPrimeBox: {
    borderWidth: 1,
    borderRadius: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#E0E0E0'
  },
  additionDetails: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E0E0E0',
    marginBottom: 4
  }
});
