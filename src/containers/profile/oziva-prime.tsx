import React, { useEffect, useState } from 'react';
import { useAuthState } from 'context/auth';

import { loginSuccessful, setLoginModal } from '@actions/modals';
import PrimaryButton from '@components/elements/button/primary-Button';
import {
  primaryOrange,
} from '@components/styles/colors';
import { useModalsDispatch } from '@context/modals';
import { trackMoEngageAppEvent } from '@utils/common';
import { useNotificationState } from 'context/notifications';
import PrimeActive from './prime-active';
import PrimeNever from './prime-never';
import PrimeExpired from './prime-expired';
import PrimeFreeTrial from './prime-free-trial';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { chatWootBaseURL, chatWootWebsiteToken, TermsAndConditions } from 'utils/constants';
import { commonStyles } from 'styles/common';
import { PrimeStyles } from 'styles/prime';
import Loader from 'components/elements/loader/loader';
import { UserProfileResponseModel } from 'models/auth';
import { ICustomAttributes } from 'models/chatwoot';
import { getUserProfileDataService, userAuthCheckService } from 'services/user';
import useLogin from 'hooks/login';
import ChatlineAccessRestriction from 'components/chatwoot/chatline-access-restriction';

const OZivaPrime = ({ navigation }) => {

  const { user: authUser } = useAuthState();
  const modalsDispatch = useModalsDispatch();
  const { handleLogout } = useLogin();
  const [userProfileData, setUserProfileData] = useState<UserProfileResponseModel>();
  
  const [triggerChatwoot, setTriggerChatwoot] = useState(false);
  const [primeStatus, setPrimeStatus] = useState('');
  const [userCustomAttributes, setUserCustomAttributes] =
    useState<ICustomAttributes>({
      identifier_hash: '',
      user_phone_no: '',
      initiated_from: '',
      chatting_from: '',
    });

  const getUserProfile = () => {
    getUserProfileDataService()
      .then((response: UserProfileResponseModel) => {
        setUserProfileData(response);
        setPrimeStatus(response?.prime.current_status);
        userAuthCheck();
      })
      .catch((error) => {
        console.log("Error : ", error);
        if(error?.response?.status === 401){
          handleLogout();
          navigation.navigate('ProfileScreen');
        }
      });
  }
  const { trackingTransparency } = useNotificationState();

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

  useEffect(() => {
    getUserProfile();
  }, []);
  

  const renderPrimeComponentAsPerStatus = (status: string) => {
    switch (status) {
      case 'prime':
        return <PrimeActive primeData={userProfileData} />;
      case 'never_prime':
        return <PrimeNever navigation={navigation} />;
      case 'free_trial':
        return <PrimeFreeTrial navigation={navigation} primeData={userProfileData} />;
      case 'expired':
        return <PrimeExpired navigation={navigation} primeData={userProfileData} />;
      default:
        null;
    }
  }

  const frequentlyAskedQuestions = [
    {
      title: "What is OZiva Prime?",
      description: "OZiva Prime offers premium benefits such as discounts, cashback, and consultation to its members. By introducing OZiva Prime, we want to encourage our customers to move ahead in their journey of #aBetterYou."
    },
    {
      title: "What are the benefits of OZiva Prime?",
      description: "OZiva Prime members will get an additional 30% off (up to 15% discount using OZiva Cash, and 15% OZiva Cash cashback) on every order and exclusive access to connect with certified Nutritionists for dietary recommendations to meet your fitness goals."
    },
    {
      title: "How do I avail OZiva Prime?",
      description: "OZiva Prime is exclusively available on our website www.oziva.in. You can purchase the Prime membership from the Prime and Cart pages."
    },
    {
      title: "Can I transfer my OZiva Prime membership?",
      description: "No, OZiva Prime membership is non-transferable and unique to each individual."
    },
    {
      title: "What is the validity of my membership?",
      description: "OZiva Prime membership will expire 6 months from the date of purchase."
    },
    {
      title: "How do I cancel OZiva Prime?",
      description: "An already purchased membership can not be canceled."
    },
    {
      title: "How do I renew OZiva Prime?",
      description: "You can buy a new OZiva Prime membership from the website after your existing membership expires"
    },
    {
      title: "How will I connect to Nutritionists as a Prime member?",
      description: "You can connect to OZiva Nutritionists from the website’s Prime page or after you place your order."
    },
    {
      title: "Can my OZiva Prime membership be terminated?",
      description: "Yes, your OZiva Prime membership can be terminated without notice if you have been involved in any act of fraud/suspicious payments to avail offers. The membership can also be revoked if you are found to be involved in any misuse of the membership. In the event of automatic termination, all existing accrued benefits associated with OZiva Prime will be forfeited. You can contact the customer support team if you think your membership was canceled by mistake."
    }
  ];

  if (!userProfileData) {
    return <Loader />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>
      <ScrollView>
        <View style={{ justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
          <View style={[commonStyles.mh16]}>
            {renderPrimeComponentAsPerStatus(primeStatus)}
            <View style={{ marginVertical: 16, marginBottom: 50 }}>

              <List.Accordion title="FAQs" titleStyle={{ color: '#000' }} style={[PrimeStyles.additionDetails]}>
                {
                  frequentlyAskedQuestions.map(faq => {
                    return (
                      <List.Item
                        title={faq.title}
                        description={faq.description}
                        titleNumberOfLines={4}
                        descriptionNumberOfLines={10}
                      />
                    )
                  })
                }
              </List.Accordion>
              <List.Accordion
                title="Terms & Conditions"
                style={[PrimeStyles.additionDetails]}
                titleStyle={{ color: '#000' }}
              >

                {TermsAndConditions.map((termsAndConditions) => {
                  return (
                    <>
                      <List.Item
                        title={''}
                        description={termsAndConditions.item}
                        descriptionNumberOfLines={10}
                        style={{ marginVertical: -14 }}
                      />
                    </>
                  )
                })}

              </List.Accordion>
            </View>
          </View>
        </View>
      </ScrollView>
      {primeStatus === 'prime' || primeStatus === 'free_trial' ?
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <PrimaryButton
            style={{
              width: 380,
              marginBottom: 10,
            }}
            accentColor={primaryOrange}
            title="CONSULT"
            onAction={() => {
              trackMoEngageAppEvent({
                event: `profile_prime_chat_with_expert_app`,
                values: [],
                trackingTransparency,
              });
              setTriggerChatwoot(true);
            }}
          />
        </View>
        : null}
      
      {triggerChatwoot ? (
        <ChatlineAccessRestriction
          locale="en"
          websiteToken={chatWootWebsiteToken}
          baseUrl={chatWootBaseURL}
          closeModal={() => setTriggerChatwoot(false)}
          isModalVisible={triggerChatwoot}
          user={{
            avatar_url: '',
            email: userProfileData.userDetails.email,
            identifier_hash: userProfileData.identityHash,
          }}
          customAttributes={userCustomAttributes}
          isConsult={false}
          chatlineAccess={userProfileData?.chatlineAccess}
        />
      ) : null}
    </SafeAreaView>
  );
};
export default OZivaPrime;
