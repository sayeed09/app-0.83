import React, { useEffect, useState } from "react";
import AppModal from "components/app-modal";
import PolicyContentPopup from "components/login/fullscreen/privacy-content-popup";
import { PrivacyAndTerms } from "models/auth";
import { policyAndTermsService } from "services/login";

interface PolicyModalProps {
    type: string; // "privacyPolicy" | "refundPolicy" | "termsOfService"
    visible: boolean;
    onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ type, visible, onClose }) => {
    const [policyResponse, setPolicyResponse] = useState<PrivacyAndTerms>();

    const getPolicyData = async () => {
        try {
            const response = await policyAndTermsService(type);
            if (response?.data?.shop) {
                const data =
                    type === "refundPolicy"
                        ? response.data.shop.refundPolicy
                        : type === "privacyPolicy"
                            ? response.data.shop.privacyPolicy
                            : response.data.shop.termsOfService;

                setPolicyResponse(data);
            }
        } catch (error) {
            console.log("Failed to fetch policy:", error);
        }
    };

    useEffect(() => {
        if (visible && type) {
            setPolicyResponse(undefined); // reset previous content
            getPolicyData();
        }
    }, [type, visible]);

    return (
        <AppModal
            animateFrom="center"
            modalVisible={visible && !!type}
            component={() => (
                <PolicyContentPopup
                    setShowPopup={onClose}
                    policyResponse={policyResponse}
                />
            )}
            style={{ borderRadius: 10, margin: 32 }}
            onBackButtonPress={onClose}
        />
    );
};

export default PolicyModal;
