/* eslint-disable @typescript-eslint/no-unused-expressions */
import styled from '@emotion/native';

import { width } from '@utils/constants';

const getFontFamily = fWeight => {
  switch (fWeight) {
    case 100:
      'ProximaNovaT-Thin';
      break;
    case 300:
      'ProximaNovaA-Light';
      break;
    case 400:
      'ProximaNova-Regular';
      break;
    case 500:
      'ProximaNova-Bold';
      break;
    case 600:
      'ProximaNova-Bold';
      break;
    case 700:
      'ProximaNova-Extrabld';
      break;
    case 800:
      'ProximaNova-Extrabld';
      break;
    default:
      'ProximaNova-Bold';
  }
};

export const ModalDetails = styled.View`
  padding: 0px 26px;
  padding-bottom: 35px;
  background-color: ${props => (props.white ? '#ffffff' : '#b5e8ff')};
`;

export const ModalHeader = styled.View`
  padding: 22px 26px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: ${props => (props.topLeftRadius ? '12px' : 0)};
  border-top-right-radius: ${props => (props.topRightRadius ? '12px' : 0)};
  background-color: ${props => (props.white ? '#ffffff' : '#b5e8ff')};
  border-bottom-width: ${props => (props.noBorederBottom ? '' : '1px')};
  border-bottom-color: #d9d9d9;
`;

export const ModalHeaderTitle = styled.Text`
  flex: 1;
  text-align: ${props => (props.center ? 'center' : 'left')};
  color: #172643;
  font-size: 16px;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  font-family: ${getFontFamily(600)};
  font-weight: 600;
  letter-spacing: ${props => (props.defaultLetterSpacing ? 0 : '1.5px')};
  line-height: 20px;
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
`;

export const DetailsContent = styled.View`
  padding: 30px 0px;
`;

export const ListWrapper = styled.View`
  // flex: 1;
  flex-direction: row;
  justify-content: space-around;
  border-bottom-color: rgba(151, 151, 151, 0.23);
  border-bottom-width: 1px;
  border-top-width: 1px;
  padding-vertical: 15px;
  align-items: center;
  background-color: ${props => (props?.checked ? '#fff' : '#F2F2F2')};
`;

export const ListText = styled.Text`
  color: ${props => (props.color ? props.color : '#2f6079')};
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '500')};
  letter-spacing: ${props => (props.spacing ? props.spacing : '0.24px')};
  line-height: 28px;
  text-align: ${props => (props.center ? 'center' : 'left')};
  text-transfom: ${props => (props.uppercase ? 'uppercase' : 'none')};
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  padding: ${props => (props.padding ? props.padding : '0px')};
  margin: ${props => (props.margin ? props.margin : '0px')};
  text-decoration-color: #fff;
  font-family: 'Roboto-Bold';
`;

export const RatingWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 5px;
`;

export const ViewWrapper = styled.View`
  // flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 10px;
`;

export const ProductPrice = styled.Text`
  color: ${props => (props.color ? props.color : '#000')};
  text-decoration-line: ${props =>
    props.textDecorationLine ? props.textDecorationLine : ''};
  marginbottom: 4px;
  font-size: ${props => (props.fontSize ? props.fontSize : '13px')};
  text-align: center;
`;

export const FiltersWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-vertical: 10px;
  elevation: 2px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  overflow: hidden;
  max-width: ${width / 2.5};
  margin-bottom: 10px;
`;

export const BoldText = styled.Text`
  font-size: 16px;
  line-height: 26px;
  color: #000000;
  font-weight: bold;
`;

export const MediumText = styled.Text`
  font-size: 16px;
  color: #000000;
  font-weight: 400;
`;

export const SmallText = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  color: ${props => (props.color ? props.color : '#000000')};
  font-weight: 400;
`;

export const ExtraSmallText = styled.Text`
  font-size: 12px;
  color: ${props => (props.color ? props.color : '#969696')};
  // font-weight: 400;
`;
