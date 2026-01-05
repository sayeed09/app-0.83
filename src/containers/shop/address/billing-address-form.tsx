import { RadioAction, RadioCheck } from "components/base/checkbox/styled";
import { BaseView } from "components/base/view";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useAddress } from "hooks/use-address";
import FormField from "components/address/form-feild";
import { styles } from "styles/address";
import { CheckoutFormValues } from "models/shop/address";
import { resetBillingAddress } from "utils/checkout";

interface Props {
    navigation: any;
}

const BillingAddressForm = ({ navigation }: Props) => {
    const { setFieldValue, handleChange, handleBlur, values, errors, touched, setValues } =
        useFormikContext<CheckoutFormValues>();
    const { handlePincodeChange, city, state } = useAddress(navigation);

    useEffect(() => {
        handlePincodeChange(values.billingPincode);
    }, [values.billingPincode]);

    useEffect(() => {
        if (city && state) {
            setFieldValue("billingCity", city);
            setFieldValue("billingStates", state);
        }
    }, [city, state]);

    useEffect(() => {
        if (!values.isBillingAddDifferent) {
            setValues(resetBillingAddress(values))
        }
    }, [values.isBillingAddDifferent]);


    return (<View style={styles.billingFormContainer}>
        <Text style={styles.sectionTitle}>
            Billing Address
        </Text>

        <View style={styles.radioGroup}>
            {[
                { label: "Same as shipping address", value: false },
                { label: "Use different billing address", value: true },
            ].map(option => (
                <Pressable key={option.label} onPress={() => setFieldValue("isBillingAddDifferent", option.value, false)}>
                    <View style={styles.radioOption}>
                        <BaseView>
                            <RadioAction checked={values.isBillingAddDifferent === option.value}>
                                <RadioCheck checked={values.isBillingAddDifferent === option.value} />
                            </RadioAction>
                        </BaseView>
                        <Text style={styles.radioLabel}>{option.label}</Text>
                    </View>
                </Pressable>
            ))}
        </View>

        {
            values.isBillingAddDifferent && (
                <View style={styles.formGroup}>
                    <FormField
                        placeholder="First Name"
                        value={values.billingFirstName as string}
                        onChange={handleChange('billingFirstName')}
                        onBlur={() => handleBlur('billingFirstName')}
                        error={errors.billingFirstName}
                        touched={touched.billingFirstName}
                    />
                    <FormField
                        placeholder="Last Name"
                        value={values.billingLastName as string}
                        onChange={handleChange('billingLastName')}
                        onBlur={() => handleBlur('billingLastName')}
                        error={errors.billingLastName}
                        touched={touched.billingLastName}
                    />
                    <FormField
                        placeholder="Pincode"
                        value={values.billingPincode as string}
                        onChange={handleChange('billingPincode')}
                        onBlur={() => handleBlur('billingPincode')}
                        error={errors.billingPincode}
                        touched={touched.billingPincode}
                        maxLength={6}

                    />
                    <FormField
                        placeholder="Address (House No, Building, Street, Area)*"
                        value={values.billingAddress1 as string}
                        onChange={handleChange('billingAddress1')}
                        onBlur={() => handleBlur('billingAddress1')}
                        error={errors.billingAddress1}
                        touched={touched.billingAddress1}
                    />
                    <FormField
                        placeholder="Landmark (Optional)"
                        value={values.billingAddress2 as string}
                        onChange={handleChange('billingAddress2')}
                        onBlur={() => handleBlur('billingAddress2')}
                        error={errors.billingAddress2}
                        touched={touched.billingAddress2}
                    />
                    <FormField
                        value={values.billingStates as string}
                        placeholder="Select State"
                        selectState
                        setFieldValue={setFieldValue}
                        fieldName="billingStates"
                        error={errors.billingStates}
                        touched={touched.billingStates}
                    />
                    <FormField
                        placeholder="City"
                        value={values.billingCity as string}
                        onChange={handleChange('billingCity')}
                        onBlur={() => handleBlur('billingCity')}
                        error={errors.billingCity}
                        touched={touched.billingCity}
                    />
                    <FormField
                        placeholder="Country"
                        value={values.billingCountry as string}
                        onChange={handleChange('billingCountry')}
                        onBlur={() => handleBlur('billingCountry')}
                        error={errors.billingCountry}
                        touched={touched.billingCountry}
                    />
                    <FormField
                        placeholder="Phone"
                        value={values.billingPhone as string}
                        onChange={handleChange('billingPhone')}
                        onBlur={() => handleBlur('billingPhone')}
                        error={errors.billingPhone}
                        touched={touched.billingPhone}
                    />
                </View>
            )
        }
    </View >
    );
};

export default BillingAddressForm;
