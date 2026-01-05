import React, { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useAuthDispatch } from 'context/auth';
import { setOTPError } from 'actions/auth';
import { commonStyles } from 'styles/common';
import { screenView } from '../standard/login-modal';

interface IProps {
  setView: (view: screenView) => void;
}
const ResendOtpHelper = (props: IProps) => {
  const { setView } = props;
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <>
      <Pressable
        onPress={() => {
          if (minutes === 0 && seconds === 0) {
            setView(screenView.resendOtp);
            authDispatch(setOTPError(null));
          }
        }}
      >
        <Text
          style={[
            commonStyles.fs14,
            commonStyles.fw500,
            { color: minutes === 0 && seconds === 0 ? '#FF6F00' : '#BDBDBD' },
          ]}
        >
          Click here
        </Text>
      </Pressable>
      {minutes === 0 && seconds === 0 ? null : (
        <Text style={[commonStyles.fs14, commonStyles.fw500, commonStyles.ml4, { color: '#6BBD58'}]}>
          ({minutes}:{seconds < 10 ? `0${seconds}` : seconds})
        </Text>
      )}
    </>
  );
};
export default React.memo(ResendOtpHelper);
