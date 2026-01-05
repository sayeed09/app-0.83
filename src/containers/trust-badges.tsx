import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { trustedByMillions } from "utils/constants";


const TrustBadges = () => {
    return (
        <View style={styles.iconsContainer}>
            {trustedByMillions.map((item, index) => (
                <View
                    key={index}
                    style={styles.iconCol}
                >
                    <Image source={{ uri: item.icon }} style={styles.iconImage} />
                    <Text style={styles.iconTitle}>
                        {item.title[0]} {"\n"} {item.title[1]}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    iconCol: {
        alignItems: "center",
        marginVertical: 4,
        width: "40%",
    },
    iconImage: {
        width: 44,
        height: 44,
        marginBottom: 8,
        resizeMode: "contain",
    },
    iconTitle: {
        fontSize: 12,
        textAlign: "center",
    },
});

export default React.memo(TrustBadges);
