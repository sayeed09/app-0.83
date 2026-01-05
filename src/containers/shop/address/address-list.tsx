import React from 'react';
import { Pressable, Text } from 'react-native';
import { useCheckoutState, useCheckoutDispatch } from 'context/checkout';
import { updateAddress } from 'actions/checkout';
import AddressCard from 'components/address/address-card';
import { RadioAction, RadioCheck } from 'components/base/checkbox/styled';
import { BaseView } from 'components/base/view';
import { UserAddress } from 'models/shop/address';
import { styles } from 'styles/address';
import { useAddress } from 'hooks/use-address';

interface Props {
    navigation: any;
    setEditAddressId: React.Dispatch<React.SetStateAction<number | undefined>>;
    errorMessage: string;
}

const AddressList = ({ navigation, setEditAddressId, errorMessage }: Props) => {
    const { userAddressList, address } = useCheckoutState();
    const checkoutDispatch = useCheckoutDispatch();
    const { addressList, handleDeleteAddress } = useAddress(navigation);
    const selectedAddress = address || userAddressList?.[0] || null;

    const handleEdit = (addressId: number) => {
        setEditAddressId(addressId);
    };

    const renderAddress = (item) => (
        <Pressable onPress={() => handleSelectAddress(item)} style={styles.addressContainer}>
            {item.defaultAddress && <Text style={styles.defaultAddressText}>DEFAULT ADDRESS</Text>}
            <BaseView row AlignLeft>
                <BaseView style={styles.radioContainer}>
                    <RadioAction checked={selectedAddress?.id === item?.id}>
                        <RadioCheck checked={selectedAddress?.id === item?.id} />
                    </RadioAction>
                </BaseView>
                <AddressCard
                    address={item}
                    navigation={navigation}
                    handleDelete={() => handleDeleteAddress(item.id)}
                    handleEdit={() => handleEdit(item.id)}
                />

            </BaseView>
            {errorMessage && selectedAddress?.id === item?.id && <Text style={{ color: '#cd201f', marginVertical: 16 }}>{errorMessage}</Text>}

        </Pressable>
    );

    const handleSelectAddress = (address: UserAddress) => {
        checkoutDispatch(updateAddress(address));
    };
    if (addressList && addressList.length > 0) {
        return (
            addressList.map((item: UserAddress) => <React.Fragment key={item.id}>{renderAddress(item)}</React.Fragment>)
        );
    } else {
        return null;
    }

};

export default AddressList;
