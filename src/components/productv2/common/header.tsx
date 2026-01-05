import React from "react";
import { width } from "utils/constants";
import RenderHtml from 'react-native-render-html';

const tagsStyles = {
    p: {
        fontSize: 22,
        fontWeight: '200' as 'ultralight',
        margin: 0,
        lineHeight: 24,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        fontFamily: 'Manrope-Light'
    },
    strong: {
        fontWeight: 'bold' as 'bold',
        fontSize: 22,
        fontFamily: 'Manrope-ExtraBold',
    }
};

const Header = ({ sectionHeader }: { sectionHeader: string }) => (
    sectionHeader ? <RenderHtml source={{ html: sectionHeader }} contentWidth={width - 16} tagsStyles={tagsStyles} /> : null
);
export default Header;