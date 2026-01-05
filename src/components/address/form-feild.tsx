import React, { useState } from "react";
import { TextInput, View, Text, Pressable, Keyboard, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "styles/address";
import { gray7E, grayb3 } from "components/styles/colors";
import ErrorText from "components/form/validation-error-text";
import OZModal from "components/modal";
import { BaseView } from "components/base/view";
import { width, states } from "utils/constants";

interface FormFieldProps {
    value: string;
    onChange?: (text: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    error?: string;
    touched?: boolean;
    keyboardType?: "default" | "numeric" | "email-address";
    editable?: boolean;
    selectState?: boolean; // if this field should show states modal
    setFieldValue?: (field: string, value: string) => void; // for state
    fieldName?: string; // for state,
    maxLength?: number | undefined;
}

const FormField: React.FC<FormFieldProps> = ({
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    touched,
    keyboardType = "default",
    editable = true,
    selectState = false,
    setFieldValue,
    fieldName,
    maxLength
}) => {
    const [focused, setFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleFocus = () => {
        setFocused(true);
        if (selectState) Keyboard.dismiss();
    };

    const handleBlur = () => setFocused(false);

    return (
        <View style={styles.input}>
            {selectState ? (
                <Pressable onPress={() => setModalVisible(true)}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            style={[
                                styles.baseInput,
                                focused ? styles.inputFocused : undefined,
                                error && touched ? styles.baseErrorInput : undefined,
                                value ? {} : styles.placeHolderText,
                                { flex: 1, paddingVertical: 15, textAlign: 'left' },
                            ]}
                        >
                            {value || placeholder}
                        </Text>

                        <Icon name="chevron-down" color="#006E5A" size={24} style={{position: 'absolute', right: 10}} onPress={() => setModalVisible(true)}/>
                    </View>

                    {modalVisible && (
                        <OZModal
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                            setModalVisible={setModalVisible}
                            title="State"
                            transparent
                            animationType="fade"
                        >
                            <ScrollView>
                                <View style={{ flex: 1, width, marginHorizontal: 20, paddingHorizontal: 16 }}>
                                    {states.map(state => (
                                        <Pressable
                                            key={state.id}
                                            onPress={() => {
                                                setFieldValue?.(fieldName || "", state.name);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <BaseView
                                                AlignLeft
                                                style={{
                                                    borderBottomColor: grayb3,
                                                    borderBottomWidth: 1,
                                                }}
                                            >
                                                <Text style={{ paddingVertical: 16, fontSize: 16, fontFamily: 'Roboto-Regular' }}>
                                                    {state.name}
                                                </Text>
                                            </BaseView>
                                        </Pressable>
                                    ))}
                                </View>
                            </ScrollView>
                        </OZModal>
                    )}
                </Pressable>
            ) : (
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    onFocus={handleFocus}
                    placeholderTextColor={'#7E7E7E'}
                    onBlur={() => {
                        handleBlur();
                        onBlur?.();
                    }}
                    placeholder={placeholder}
                    style={[
                        styles.baseInput,
                        focused ? styles.inputFocused : undefined,
                        error && touched ? styles.baseErrorInput : undefined,
                    ]}
                    keyboardType={keyboardType}
                    editable={editable}
                    maxLength={maxLength ? maxLength : undefined}
                />
            )}

            {error && touched && <ErrorText>*{error}</ErrorText>}
        </View>
    );
};

export default FormField;
