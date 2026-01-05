import styled from '@emotion/native';

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border-color: ${props => (props.outline ? 'transparent' : '#d9d9d9')};
  border-width: ${props => (props.outline ? '0px' : '1px')};
  border-radius: 6px;
  padding-horizontal: 4px;
  color: #000;
  auto-capitalize: characters;
`;
