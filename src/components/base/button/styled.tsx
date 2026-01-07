import styled from '@emotion/native';

// import { TouchableNativeFeedback } from 'react-native';
import { Whitespace } from '@components/styles/view';

export const StyledButton = styled.TouchableNativeFeedback({});

export const StyledActionButton = styled.TouchableOpacity({});

export const StyledStrikeThrough = styled.View({});

export const ButtonContainer = styled.View({
  paddingHorizontal: Whitespace.LARGE,
  borderRadius: Whitespace.TINY,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
});
