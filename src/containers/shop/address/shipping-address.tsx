import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Keyboard } from "react-native";
import { useFormikContext } from "formik";
import OZCheckbox from "components/base/checkbox/oz-checkbox";
import { BaseView } from "components/base/view";
import { commonStyles } from "styles/common";
import { styles } from "styles/address";
import { addressTypes, CheckoutFormValues } from "models/shop/address";
import { useAddress } from "hooks/use-address";
import FormField from "components/address/form-feild";
import PolicyModal from "../cart/cart-list/policy-modal";

const ShippingAddressForm = ({ navigation }: { navigation: any }) => {

    const [type, setType] = useState("");

    const { handlePincodeChange, city, state, error, setError, setCity, setState } = useAddress(navigation);
    const { setFieldValue, handleChange, handleBlur, values, errors, touched, setFieldTouched
    } = useFormikContext<CheckoutFormValues>();

    useEffect(() => {
        if (values.pincode.length != 6 && error) {
            setError('')
        }
    }, [error])
    useEffect(() => {
        if (values.pincode.length === 6) {
            handlePincodeChange(values.pincode);
        } else {
            setError('');
            setCity('');
            setState('');
        }

    }, [values.pincode])

    useEffect(() => {
        if (values.pincode.length === 6) {
            setFieldValue("city", city, true);
            setFieldTouched("city", false)
            setFieldTouched("state", false)
            setFieldValue("state", state, true);
        } else if (city && state) {
            setFieldValue("city", '', true);
            setFieldValue("state", '', true);
        }

    }, [city, state]);

    return (
        <ScrollView style={{ backgroundColor: '#fff', padding: 8 }}>
            <Text style={commonStyles.h3Tag}>Contact Information</Text>
            <View style={styles.inputGroup} >
                <FormField
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    onBlur={() => handleBlur('firstName')}
                    error={errors.firstName}
                    touched={touched.firstName}
                />
                <FormField
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    onBlur={() => handleBlur('lastName')}
                    error={errors.lastName}
                    touched={touched.lastName}
                />

            </View>
            <View style={styles.inputGroup} >

                <FormField
                    placeholder="Phone"
                    value={values.mobile}
                    onChange={text => setFieldValue('mobile', text.trim().replace(/^0+/, ''))}
                    onBlur={() => handleBlur('mobile')}
                    error={errors.mobile}
                    touched={touched.mobile}
                    keyboardType="numeric"
                    editable={!values.mobile}
                />
                <FormField
                    placeholder="Email"
                    value={values.email}
                    onChange={text => setFieldValue('email', text)}
                    onBlur={() => handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                    keyboardType="email-address"

                />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <OZCheckbox
                        title="Notify me for orders, updates & marketing offers"
                        checked={values.acceptsMarketing as boolean}
                        setCheckbox={() => setFieldValue("acceptsMarketing", !values.acceptsMarketing)}
                        titleFontSize={12}
                    />
                    <Pressable onPress={() => setType('privacyPolicy')}>
                        <Text style={{ color: '#6bbd58', fontSize: 11, lineHeight: 21 }}> (Privacy Policy)</Text>
                    </Pressable>
                </View>
            </View>

            <Text style={[commonStyles.h3Tag, { marginTop: 16 }]}>Shipping Address</Text>
            {error && <Text style={{ color: '#cd201f', marginBottom: 16 }}>{error}</Text>}
            <View style={styles.inputGroup} >
                <FormField
                    placeholder="Pincode"
                    value={values.pincode}
                    onChange={handleChange('pincode')}
                    onBlur={() => handleBlur('pincode')}
                    error={errors.pincode}
                    touched={touched.pincode}
                    keyboardType="numeric"
                    maxLength={6}
                />
                <FormField
                    placeholder="City"
                    value={values.city}
                    onChange={handleChange('city')}
                    onBlur={() => handleBlur('city')}
                    error={errors.city}
                    touched={touched.city}
                />
            </View>
            <View style={styles.inputGroup} >
                <FormField
                    value={values.state}
                    placeholder="Select State"
                    selectState={true}
                    setFieldValue={setFieldValue}
                    fieldName="state"
                    error={errors.state}
                    touched={touched.state}
                />
                <FormField
                    placeholder="Country"
                    value={values.country}
                    editable={false}
                    error={errors.country}
                    touched={touched.country}
                />
            </View>
            <View style={styles.inputGroup} >
                <FormField
                    placeholder="Address (House No, Building, Street, Area)*"
                    value={values.address1}
                    onChange={handleChange('address1')}
                    onBlur={() => handleBlur('address1')}
                    error={errors.address1}
                    touched={touched.address1}
                />
            </View>
            <View style={styles.inputGroup} >
                <FormField
                    placeholder="Landmark (Optional)"
                    value={values.address2 as string}
                    onChange={handleChange('address2')}
                    onBlur={() => handleBlur('address2')}
                    error={errors.address2}
                    touched={touched.address2}
                />

            </View>




            <OZCheckbox
                title="Save as Default"
                checked={values.saveAddress as boolean}
                setCheckbox={() => setFieldValue("saveAddress", !values.saveAddress)}
            />

            <Text style={[commonStyles.h3Tag, { marginTop: 16 }]}>Select Tag</Text>
            <BaseView row AlignLeft style={{ gap: 16 }}>
                {addressTypes.map(addressType => (
                    <Pressable
                        key={addressType.id}
                        onPress={() => setFieldValue("addressType", addressType.type)}
                    >
                        <View style={{
                            borderRadius: 4,
                            backgroundColor: values.addressType === addressType.type ? '#006E5A' : '#fff',
                            paddingVertical: 5, paddingHorizontal: 8,
                            borderWidth: 1,
                            borderColor: '#E0E0E0'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: values.addressType === addressType.type ? '#fff' : '#000'
                            }}>
                                {addressType?.type}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </BaseView>
            <PolicyModal
                type={type}
                visible={!!type}
                onClose={() => setType("")}
            />
        </ScrollView>

    );
};

export default ShippingAddressForm;
