import { useState, useEffect } from 'react';
import { useCheckoutDispatch } from 'context/checkout';
import { setUserAddressList, updateAddress } from 'actions/checkout';
import { deleteUserAddressService, fetchCityStateFromPincode, getAllAddressService } from 'services/address';
import useLogin from './login';
import { UNSERVICEABLE_PINCODE } from 'utils/constants';
import { UserAddress } from 'models/shop/address';

export const useAddress = (navigation) => {

    const [addressList, setAddressList] = useState([]);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');

    const checkoutDispatch = useCheckoutDispatch();
    const { handleLogout } = useLogin();

    useEffect(() => {
        fetchAddresses();
    }, [navigation, checkoutDispatch]);

    const fetchAddresses = async () => {
        try {
            const addressList = await getAllAddressService();
            addressList.sort((x, y) => (x.defaultAddress === y.defaultAddress ? 0 : x.defaultAddress ? -1 : 1));
            checkoutDispatch(setUserAddressList(addressList));
            setAddressList(addressList);
            checkoutDispatch(updateAddress(addressList[0]));
        } catch (error: any) {
            console.error("Error : ", error);
            if (error?.response?.status === 401) {
                handleLogout();
                navigation.navigate('CartScreen');
            }
        }
    };


    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteUserAddressService(addressId);
            fetchAddresses(); // Re-fetch addresses after delete
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };
    const handlePincodeChange = async (pincode, isBilling = false) => {
        if (pincode.length === 6) {
            try {
                setError("");
                const response = await fetchCityStateFromPincode(pincode);
                setCity(response.data[0]?.Districtname);
                setState(response.data[0]?.statename);

            } catch (e: any) {
                if (
                    e?.response?.data?.error?.code ===
                    "UNSERVICEABLEPINCODE" &&
                    !isBilling
                ) {
                    setError(UNSERVICEABLE_PINCODE);
                } else {
                    setError("");
                }

            }
        } else {
            setError("");
        }
    };

    const SortByDefaultAddres = (x: UserAddress, y: UserAddress) => {
        return x.defaultAddress === y.defaultAddress ? 0 : x.defaultAddress ? -1 : 1;
    };

    const getAddresses = async (screenName: string) => {
        try {
            const addressList = await getAllAddressService();
            setUserAddressList(addressList);
            const sortedAddressList = addressList.sort(SortByDefaultAddres);
            checkoutDispatch(setUserAddressList(sortedAddressList))
        } catch (error: any) {
            console.log("Error : ", error);
            if (error?.response?.status === 401) {
                handleLogout();
                navigation.navigate(screenName === 'CartScreen' ? 'CartScreen' : 'ProfileScreen'); //To handle ProfileScreen and Checkout Screen navigation
            }
        }
    }

    return {
        addressList,
        handleDeleteAddress,
        city,
        state,
        error,
        handlePincodeChange,
        setError,
        getAddresses,
        setCity,
        setState
    };
};
