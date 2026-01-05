import { useEffect } from "react";
import { useSearchDispatch } from "context/search";
import { searchInterface, setSearchParams } from "actions/search";
import { useAuthDispatch } from "context/auth";
import { setShipRocketEnabled } from "actions/auth";
import { fallbackForSearchParams } from "utils/constants";
import { setAppConfig, setValueComms } from "actions/shop";
import { useShopDispatch } from "context/shop";
import { getAppConfigValues } from "services/home";
import { Platform } from "react-native";
import { AppUpdateConfig } from "models/shop";

export const useAppConfig = () => {
    const searchDispatch = useSearchDispatch();
    const authDispatch = useAuthDispatch();
    const shopDispatch = useShopDispatch();

    useEffect(() => {
        const initConfig = async () => {
            try {
                const { appUpdateConfig, searchConfiguration, product_config, shiprocketLogin } = await getAppConfigValues();
                const config: AppUpdateConfig = appUpdateConfig[Platform.OS];
                searchDispatch(setSearchParams(searchConfiguration));
                shopDispatch(setValueComms(product_config.value_comms));
                shopDispatch(setAppConfig(config));
                authDispatch(setShipRocketEnabled(shiprocketLogin));
            } catch (err) {
                // Use fallback values in case of error
                // force show shiprocket login in case remote config fails
                const parsedSearchParams = JSON.parse(JSON.stringify(fallbackForSearchParams))
                let searchPayload: searchInterface = {
                    "x-store-id": parsedSearchParams["x-store-id"],
                    "x-api-key": parsedSearchParams["x-api-key"],
                    sort: parsedSearchParams["sort"]
                }
                searchDispatch(setSearchParams(searchPayload)); 
                console.log("Failed to initialize App config", err);
            }
        };

        initConfig();
    }, [authDispatch, searchDispatch, shopDispatch]);
};