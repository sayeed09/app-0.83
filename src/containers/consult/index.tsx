import { BaseView } from 'components/base/view';
import React, { useEffect, useState } from 'react';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import { commonStyles } from 'styles/common';
import { Platform, Text, View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import { useModalsDispatch, useModalsState } from 'context/modals';
import LoginModal from 'components/login/fullscreen/login-modal';
import PrimeBenefits from './prime-benefits';
import { ConsultStyles } from '../../styles/consult';
import PrimeAddToCartButton from 'containers/profile/prime-add-to-cart-button';
import { useAuthState } from 'context/auth';
import { setChatWootModal, setLoginModal } from 'actions/modals';
import { chatWootBaseURL, chatWootWebsiteToken } from 'utils/constants';
import { ChatWootUser } from 'models/prime';
import { ICustomAttributes } from 'models/chatwoot';
import Loader from '@components/elements/loader/loader';
import { UserProfileResponseModel } from 'models/auth';
import { getUserProfileDataService, userAuthCheckService } from 'services/user';
import useLogin from 'hooks/login';
import ChatlineAccessRestriction from 'components/chatwoot/chatline-access-restriction';
import { getUser } from 'services/auth';

const Consult = ({ navigation }) => {

  const { user: authUser, isAuthenticated } = useAuthState();
  const modalsDispatch = useModalsDispatch();
  const { chatWootModalVisibility } = useModalsState();
  const { handleLogout } = useLogin();
  const [userData, setUserData] = useState<UserProfileResponseModel>();

  useEffect(() => {
    checkUserAuthenticated();
  }, [])
  const checkUserAuthenticated = async () => {
    const user = await getUser();

    if (!user) {
      modalsDispatch(setLoginModal(true));
      return;
    }
  }
  const [primeUserDetails, setPrimeUserDetails] = useState<ChatWootUser>({
    avatar_url: '',
    email: '',
    identifier: '',
    identityHash: '',
    phone: '',
  });

  const [userCustomAttributes, setUserCustomAttributes] =
    useState<ICustomAttributes>({
      identifier_hash: '',
      user_phone_no: '',
      initiated_from: '',
      chatting_from: '',
    });

  const fetchProfile = () => {
    getUserProfileDataService()
      .then((data: UserProfileResponseModel) => {
        userAuthCheck();
        if (data && data.chatlineAccess) {
          modalsDispatch(setChatWootModal(true));
        }
        setUserDetails(data);
        setUserData(data);
      })
      .catch((error) => {
        if (error?.response?.status === 401)
          handleLogout();
      });
  }

  const userAuthCheck = () => {
    const payload = {
      phone: authUser?.phone,
      productID: null,
      orderID: null,
      hash: authUser?.authToken,
    };
    userAuthCheckService(payload).then(response => {
    }).catch(err => {
      console.log("Error : ", err);
    })
  }

  const setUserDetails = (data) => {
    const customAttributes: ICustomAttributes = {
      identifier_hash: data?.identityHash ?? '',
      user_phone_no: authUser?.phone ?? '',
      initiated_from: `profile_screen_${Platform.OS}_app`,
      chatting_from: `user_profile_${Platform.OS}_app`,
    };

    setUserCustomAttributes(customAttributes);
    setPrimeUserDetails({
      avatar_url: '',
      identifier: authUser?.phone ?? '',
      phone: authUser?.phone ?? '',
      identifier_hash: data?.identityHash ?? '',
    });
  };

  useEffect(() => {
    if (authUser?.phone) {
      fetchProfile();
    }
  }, [authUser]);

  const { loginModalVisbility } = useModalsState();


  if (loginModalVisbility) {
    return <LoginModal />
  } else if (!userData && !loginModalVisbility) {
    return <Loader />
  }
  return (
    <>
      <ChatlineAccessRestriction
        locale="en"
        websiteToken={chatWootWebsiteToken}
        baseUrl={chatWootBaseURL}
        closeModal={() => {
          modalsDispatch(setChatWootModal(false));
        }}
        isModalVisible={chatWootModalVisibility}
        user={primeUserDetails}
        customAttributes={userCustomAttributes}
        isConsult={true}
        navigation={navigation}
        chatlineAccess={userData?.chatlineAccess}
      />
    </>
  );
};

export default Consult;
