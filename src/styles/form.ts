import { StyleSheet } from 'react-native';
import { grayd9 } from 'components/styles/colors';

export const formStyles = StyleSheet.create({
  inputLabelDefault: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  inputFieldDefault: {
    color: '#000',
    borderColor: grayd9,
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textArea: {
    textAlignVertical: 'top',
  },
});
