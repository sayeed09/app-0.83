import { IClinicalStudy, IClinicalStudyDatum } from "models/product-details/product";
import React from "react";
import { Image } from "react-native";
import { ClinicalStudyStyle } from "styles/productv2";
import { width } from "utils/constants";


const ClinicalStudy = ({ clinicalStudies }: { clinicalStudies: IClinicalStudyDatum[] }) => {
    const mobileBanner = clinicalStudies?.filter((item) => item.deviceType == "MOBILE");
    if (mobileBanner?.length > 0) {
        return <>
            <Image style={ClinicalStudyStyle.banner} source={{ uri: mobileBanner[0].image }} width={280} height={48} />

        </>
    } else return null;

}
export default ClinicalStudy;