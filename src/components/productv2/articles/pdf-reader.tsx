import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Pdf from 'react-native-pdf';


const PDFReader = ({ source }: { source: string }) => {
    return <Pdf
        source={{ uri: source }}
        style={styles.pdf}
        trustAllCerts={false}

    />
};
const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .8,
    }
});
export default PDFReader;