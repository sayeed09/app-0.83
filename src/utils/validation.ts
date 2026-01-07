import * as Yup from 'yup';

const pincodeRegex = /^[1-9][0-9]{5}$/;

const inputFieldRegex = (value) => !/\p{RI}\p{RI}|\p{Emoji}/u.test(value);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const getValidationSchema = (isEmailRequired) => {
    return Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .required("First Name is Required")
            .min(3, 'Please enter at least 3 characters'),
        lastName: Yup.string()
            .trim()
            .required("Last Name is Required")
            .min(3, 'Please enter at least 3 characters'),
        mobile: Yup.string()
            .trim()
            .required("Phome Number is Required")
            .matches(/^[0-9]+$/, 'Please enter only digits')
            .min(10, 'Please enter exactly 10 digits')
            .max(10, 'Please enter exactly 10 digits'),
        address1: Yup.string()
            .trim()
            .max(255, 'Address too long')
            .required("Address is Required"),
        address2: Yup.string().trim().max(255, 'Address too long'),
        pincode: Yup.string()
            .required("Pincode is Required")
            .matches(pincodeRegex, 'Pincode is not valid')
            .min(6, 'Pincode is not valid')
            .max(6, 'Pincode is not valid'),
        city: Yup.string().trim().required("City is Required"),
        state: Yup.string().trim().required("State is Required"),
        country: Yup.string().required("Country is Required"),
        email: isEmailRequired
            ? Yup.string()
                .matches(emailRegex, "Please enter a valid email")
                .required("Email is Required")
                .trim()
            : Yup.string()
                .matches(emailRegex, "Please enter a valid email")
                .trim()
        , addressType: Yup.string().optional(),
        acceptsMarketing: Yup.boolean().optional(),
        saveAddress: Yup.boolean().optional(),
        isBillingAddDifferent: Yup.boolean(),
        billingPhone: Yup.string().when("isBillingAddDifferent", {
            is: true,
            then: (schema) =>
                schema
                    .trim()
                    .matches(/^[0-9]+$/, 'Please enter only digits')
                    .min(10, 'Please enter exactly 10 digits')
                    .max(10, 'Please enter exactly 10 digits')
                    .required('Please enter exactly 10 digits'),
            otherwise: (schema) => schema.notRequired(),
        }),
        billingFirstName: Yup.string().when("isBillingAddDifferent", {
            is: true,
            then: (schema) =>
                schema
                    .trim()
                    .required("First Name is Required")
                    .min(1, "At least one character")
                    .max(50, "Too long"),
        }),
        billingLastName: Yup.string().when("isBillingAddDifferent", {
            is: true,
            then: (schema) =>
                schema
                    .trim()
                    .required("Last Name is Required")
                    .test("no-emoji", "Please enter alphabets/numbers", inputFieldRegex)
                    .min(1, "At least one character")
                    .max(50, "Too long"),
        }),

        billingPincode: Yup.string().when("isBillingAddDifferent", {
            is: true,
            then: (schema) =>
                schema
                    .trim()
                    .required("Pincode is Required")
                    .matches(pincodeRegex, "Pincode is not valid")
                    .min(6, "Pincode should be 6 digits")
                    .max(6, "Pincode should not exceed 6 digits"),
        }),

        billingAddress1: Yup.string().when("isBillingAddDifferent", {
            is: true,
            then: (schema) =>
                schema
                    .trim()
                    .required("Address is required")
                    .max(255, "Address too long")
                    .min(5, "Please enter valid address"),
        }),

        billingAddress2: Yup.string()
            .max(255, "Address too long")
            .test("no-emoji", "Please enter alphabets/numbers", inputFieldRegex),

        billingStates: Yup.string().when("isBillingAddDifferent", {
            is: true,
            then: (schema) =>
                schema
                    .required("Please Select State")
                    .notOneOf(["select state"], "Please Select State"),
        }),

        billingCity: Yup.string().when("isBillingAddDifferent", {
            is: true,
            then: (schema) =>
                schema
                    .trim()
                    .required("City is Required")
                    .test("no-emoji", "Please enter alphabets/numbers", inputFieldRegex)
                    .min(2, "At least two characters")
                    .max(50, "Too long"),
        }),

        billingCountry: Yup.string()
            .trim()
            .test("no-emoji", "Please enter alphabets/numbers", inputFieldRegex)
            .when("isBillingAddDifferent", {
                is: true,
                then: (schema) => schema.trim().required("Country is Required"),
            }),
        emailRequired: Yup.boolean()
    })
}
