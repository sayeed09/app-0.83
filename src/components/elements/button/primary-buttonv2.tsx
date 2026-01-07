import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

interface ButtonWithIconProps {
    title: string;
    onPress: () => void;
    iconUri?: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ title, onPress, iconUri }) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                {iconUri && (
                    <Image source={{ uri: iconUri }} style={styles.icon} />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    container: {
        borderRadius: 4,
        backgroundColor: '#FF6F00',
        borderWidth: 1,
        borderColor: '#FF6F00',
        paddingVertical: 9,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: '#FFF',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 20,
        letterSpacing: 0.012,
        textTransform: 'uppercase',
        marginRight: 6,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});

export default ButtonWithIcon;