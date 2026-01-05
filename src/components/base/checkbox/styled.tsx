import styled from '@emotion/native';
import { darkGreen, gray76, primaryOrange } from 'components/styles/colors';

interface Props {
  checked: boolean;
  size?: number;
  color?: string;
}

export const CheckBoxWrap = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15,
});

export const CheckBoxAction = styled.View((props: Props) => ({
  width: props.size ? props.size : 20,
  height: props.size ? props.size : 20,
  borderColor: props.checked ? darkGreen : gray76,
  borderWidth: 2,
  marginLeft: 0,
  marginRight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.checked ? darkGreen : 'transparent',
}));

export const RadioAction = styled.View((props: Props) => ({
  width: 20,
  height: 20,
  borderColor: props.checked
    ? props.color
      ? props.color
      : '#006E5A'
    : '#006E5A',
  borderWidth: 2,
  marginLeft: 0,
  marginRight: 0,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.checked ? 'transparent' : 'transparent',
}));

export const CheckBoxCheck = styled.View((props: Props) => ({
  width: 8,
  height: 14,
  borderColor: props.checked ? 'white' : 'transparent',
  borderRightWidth: 2,
  borderBottomWidth: 2,
  alignSelf: 'center',
  marginTop: -3,
  transform: [{ rotate: '45deg' }],
}));

export const RadioCheck = styled.View((props: Props) => ({
  width: 10,
  height: 10,
  backgroundColor: props.checked
    ? props.color
      ? props.color
      : '#006E5A'
    : 'transparent',
  alignSelf: 'center',
  borderRadius: 16,
}));

export const RadioActionExtended = styled.View((props: Props) => {
  const { color, size } = props;
  return {
    width: size || 20,
    height: size || 20,
    borderColor: props.checked ? color : '#7B88A866',
    borderWidth: 2,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: props.checked ? 'transparent' : 'transparent',
  };
});

export const RadioCheckExtended = styled.View((props: Props) => {
  const { color, size } = props;
  return {
    width: size || 10,
    height: size || 10,
    backgroundColor: props.checked ? color : 'transparent',
    alignSelf: 'center',
    borderRadius: 16,
  };
});
