import React from 'react';
import { View } from 'react-native';
import { PrimaryButton } from 'components/base/buttons';
import { Text } from 'components/base/foundation';

import {
  ErrorFallbackProps,
  ErrorMessageError,
  ErrorMessageProps,
  ErrorMessageVariantProps,
} from '@models/common/error';
import LoginModal from 'components/login/standard/login-modal';

const getErrorMessage = (error: ErrorMessageError) => {
  if (typeof error === 'string') return error;
  return error.message;
};

const FullPageErrorFallback: React.FunctionComponent<ErrorFallbackProps> = ({
  error,
  onRetry,
  title,
  noMessage,
}) => {
  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '80%',
      }}
    >
      {!noMessage && (
        <>
          <Text mb={1}>
            Uh oh... There is a problem. Try refreshing the app.
          </Text>
          <Text mb={2}>{getErrorMessage(error)}</Text>
        </>
      )}
      {!!onRetry && (
        <PrimaryButton title={title || 'Retry'} onPress={onRetry} />
      )}
      {!!onRetry ? <LoginModal /> : null}
    </View>
  );
};

const errorMessageVariants: ErrorMessageVariantProps = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
};

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  error,
  variant = 'stacked',
  ...props
}) => (
  <View {...props}>
    <Text
      style={[
        { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
        errorMessageVariants[variant],
      ]}
    >
      {JSON.stringify(error)}
      {/* {parseErrorMessage(error)} */}
    </Text>
  </View>
);

export { FullPageErrorFallback, ErrorMessage };
