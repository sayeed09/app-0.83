import React from 'react'
import ChatWootWidget from 'components/chatwoot';
import { ChatWootUser } from 'models/prime';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface IProps {
    isModalVisible: boolean;
    websiteToken: string;
    baseUrl: string;
    user: ChatWootUser;
    locale: string;
    customAttributes?: Record<string, unknown>;
    closeModal: React.Dispatch<boolean>;
    isConsult?: boolean;
    navigation: any;
    chatlineAccess?: boolean;
    screenName?: string;
}

const ChatlineStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    innerContainer: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingVertical: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginHorizontal: 16,
    },
    svg: {
        width: 200,
        height: 200,
    },
    primaryText: {
        marginTop: 16,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    secondaryText: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginTop: 16
    },
    shopNowButton: {
        fontSize: 14,
        marginTop: 32,
        borderColor: '#6BBD58',
        borderWidth: 1,
        width: 300,
        textAlign: 'center',
        padding: 10,
        color: '#FFF',
        backgroundColor: '#6BBD58',
        borderRadius: 2,
        fontWeight: 'bold',
    }
})

const ChatlineAccessRestriction = (props: IProps) => {
    return (
        <>
            {props.chatlineAccess ? <ChatWootWidget
                locale="en"
                websiteToken={props.websiteToken}
                baseUrl={props.baseUrl}
                closeModal={props.closeModal}
                isModalVisible={props.isModalVisible}
                user={props.user}
                customAttributes={props.customAttributes}
                isConsult={props.isConsult}
                navigation={props.navigation}
                screenName={props.screenName}
            /> : <View style={ChatlineStyle.container}>
                <View style={ChatlineStyle.innerContainer}>
                    <SvgUri style={ChatlineStyle.svg} uri={'https://cdn.shopify.com/s/files/1/2393/2199/files/no_chat_access.svg?v=1743758048'} width={70} height={65}/>
                    <Text style={ChatlineStyle.primaryText}>Unlock 1 Month of Free Chat Access!🚀</Text>
                    <Text style={ChatlineStyle.secondaryText}>Purchase now and enjoy seamless conversations for free for a month!</Text>
                    <Pressable onPress={() => props.navigation.navigate('Concerns')}>
                        <Text style={ChatlineStyle.shopNowButton}>SHOP NOW</Text>
                    </Pressable>
                </View>

            </View>}
        </>
    )
}

export default ChatlineAccessRestriction;