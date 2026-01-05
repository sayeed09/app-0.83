import OZModal from 'components/modal';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface IProps {
    setShowPopup: (showSuccessModal: boolean) => void;
    nonDefaultApps: any;
    launchPaymentProcess: (vpa: string, isApp: boolean, packageName: string) => void;
}

const upiPaymentStyles = StyleSheet.create({
    container: {
        marginVertical: 16,
        flex: 1,
        flexDirection: 'row',
        gap: 16,
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 24,
        flexWrap: 'wrap',
    },
    apps: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    appLogo: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});
export const OtherAvailableUPIApps = ({
    setShowPopup,
    nonDefaultApps,
    launchPaymentProcess
}: IProps) => {
    return (
        <>
            <OZModal
                visible={true}
                onRequestClose={() => setShowPopup(false)}
                setModalVisible={setShowPopup}
                title={'Other UPI apps available'}
                transparent
                animationType="fade"
                contentContainerStyles={{ height: 'auto' }}
            >
                <View style={upiPaymentStyles.container}>
                    {
                        nonDefaultApps.length > 0 && (
                            nonDefaultApps.map((app) => {
                                return (
                                    <Pressable onPress={() => launchPaymentProcess(app.appName, true, app.packageName)} key={app.appName}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={upiPaymentStyles.apps}>
                                                <Image
                                                    source={{ uri: app.appLogo }}
                                                    style={upiPaymentStyles.appLogo}
                                                />
                                            </View>
                                            <Text>{app.appName}</Text>
                                        </View>
                                    </Pressable>
                                )
                            })
                        )
                    }
                </View>
            </OZModal>
        </>
    );
}