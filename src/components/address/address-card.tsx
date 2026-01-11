import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
// import DeleteIconComponent from 'assets/images/icons/standard-icons/delete_icon';
import EditSvgComponent from 'assets/images/icons/standard-icons/edit-icon';

import { setCustomerDetails } from '@actions/checkout';
import { BaseView } from '@components/base/view';
import SecondaryButton from '@components/elements/button/secondary-button';
import ListItem from '@components/elements/lists/item';
import { gray7E } from '@components/styles/colors';
import { useCheckoutDispatch } from '@context/checkout';
import { UserAddress } from '@models/shop/address';
import DeleteIcon from 'assets/images/icons/delete';
import { router } from 'expo-router';
import { commonStyles } from 'styles/common';
import { CustomText } from '../../../AndroidFontFix';

interface Props {
  address: UserAddress;
  navigation?: any;
  addressOrderSummary?: boolean;
  isView?: boolean;
  showChangeAddres?: boolean;
  isSubscription?: boolean;
  errorMessage?: string;
  selectedAddressID?: any;
  setErrorMessage?: (value: string) => void;
  handleDelete?: (address: UserAddress) => void;
  handleEdit?: (address: UserAddress) => void;
}

const AddressCard = ({
  address,
  navigation,
  addressOrderSummary,
  isView,
  showChangeAddres,
  isSubscription,
  errorMessage,
  selectedAddressID,
  setErrorMessage,
  handleEdit,
  handleDelete
}: Props): React.ReactElement => {
  const checkoutDispatch = useCheckoutDispatch();

  useEffect(() => {
    checkoutDispatch(
      setCustomerDetails({
        name: `${address?.firstName} ${address?.lastName}`,
        email: address?.email,
        phone: address?.phone,
      }),
    );
  }, [
    checkoutDispatch,
    address?.firstName,
    address?.lastName,
    address?.email,
    address?.phone,
  ]);

  return (
    <View>
      <BaseView row style={{ alignItems: 'center', marginBottom: 8, position: 'relative' }}>
        <ListItem
          right={
            <View style={{ marginRight: isView ? 0 : 20 }}>
              {!addressOrderSummary && handleDelete && (
                <Pressable
                  onPress={() => {
                    handleDelete(address)
                  }}
                >
                  <DeleteIcon />
                </Pressable>
              )}
            </View>
          }
        >

          <BaseView row>
            <View style={{ marginRight: 5 }}>
              <CustomText style={{ fontWeight: 'bold' }}>
                {address?.first_name || address?.firstName}{' '}
                {address?.last_name || address?.lastName}
              </CustomText>
            </View>
            {address?.address_type || address?.addressType ? (
              <Text
                style={[commonStyles.fs12, {
                  backgroundColor: '#006E5A',
                  color: '#fff',
                  paddingVertical: 2,
                  paddingHorizontal: 7,
                  borderRadius: 4,
                  textTransform: 'capitalize'
                }]}
              >
                {address?.address_type || address?.addressType}
              </Text>
            ) : null}
          </BaseView>
        </ListItem>

      </BaseView>
      <View style={{ width: '85%' }}>
        <Text style={{ color: gray7E }}>
          {address?.address1}, {address?.address2}, {'\n'}
          {address?.city} - {address?.zip} {address?.country}
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text>
          <Text style={{ color: gray7E }}>Mobile: </Text>
          <CustomText style={{ fontWeight: 'bold' }}>
            +91- {address?.phone}
          </CustomText>
        </Text>
      </View>
      {address?.email ?
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text>
            <Text style={{ color: gray7E }}>Email id: </Text>
            <CustomText style={{ fontWeight: 'bold' }}>
              {address?.email}
            </CustomText>
          </Text>
        </View> : null}
      <View style={{ position: 'absolute', right: 20, bottom: 0 }}>
        {!addressOrderSummary && handleEdit && (
          <Pressable
            onPress={() => {
              handleEdit(address)
            }}
          >
            <EditSvgComponent />
          </Pressable>
        )}
      </View>
      {address && selectedAddressID === address.id && errorMessage ? (
        <Text
          style={{
            color: '#cd201f',
            paddingRight: 5,
            marginTop: 8,
            lineHeight: 20,
            letterSpacing: 0.1,
          }}
        >
          {errorMessage}
        </Text>
      ) : null}
      {showChangeAddres && (
        <SecondaryButton
          title="CHANGE OR ADD ADDRESS"
          onAction={() => {
            // navigation.navigate('Addresses', {
            //   isSubscription: isSubscription,
            //   screenName: 'CartScreen'
            // });
            router.push({
              pathname: '/Addresses',
              params: {
                isSubscription: isSubscription,
                screenName: 'CartScreen'
              },
            });
            setErrorMessage && setErrorMessage('');
          }}
          style={{
            borderColor: '#6BBD58',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}
          textColor="#6BBD58"
        />
      )}
    </View>
  );
};

export default AddressCard;
