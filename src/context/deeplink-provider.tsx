import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { navigationRef } from 'routes/stack';
import ForceUpdate from 'components/force-update';
import { useAppConfig } from 'hooks/use-app-config';

export const screens = {
  ProfileScreen: 'profile',
  ProductDetails: 'product-details',
  Orders: 'orders',
  Collection: 'collections',
  Concerns: 'concerns',
  Categories: 'categories',
};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
type Props = {
  children: React.ReactNode;
  navigationRefReady: boolean;
};
const DeepLinkProvider: React.FunctionComponent<Props> = ({
  children,
  navigationRefReady,
}) => {
  const [navigateLink, setNavigateLink] = useState('');
  useAppConfig();

  const getScreenName = url => {
    let resultScreen: string | undefined = '';
    const currentScreen = Object.values(screens).filter(
      item => url.indexOf(item) > -1,
    );
    if (currentScreen && currentScreen.length > 0) {
      resultScreen = getKeyByValue(screens, currentScreen[0]);
    }
    return resultScreen || null;
  };
  const getCurrentParams = url => {
    let params = {};
    try {
      if (url.indexOf('product-details') > -1) {
        const splitUrl = url.split('/');
        params = {
          queryString: splitUrl[3],
          productTitle: splitUrl[4].split('?')[0].split('_').join(' '),
        };
      }
      if (url.indexOf('collections') > -1) {
        const splitUrl = url.split('/collections/');
        params = {
          handle: splitUrl[1],
        };
      }
      if (url.indexOf('concerns') > -1) {
        const splitUrl = url.split('/');
        params = {
          collectionHandle: splitUrl[3],
          subCollectionHandle: splitUrl[4]
        };
      }
      if (url.indexOf('categories') > -1) {
        const splitUrl = url.split('/');
        params = {
          collectionHandle: splitUrl[3]
        };
      }
      return params;
    }
    catch (err) {
      return params;
    }

  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeepLink = event => {
    const url = typeof event === "string" ? event : event?.url;
    if (url) setNavigateLink(url);
  };

  useEffect(() => {
    if (navigationRefReady && navigateLink != '' && navigationRef) {
      const screenName = getScreenName(navigateLink);
      const params = getCurrentParams(navigateLink);;
      if (screenName) {
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: screenName, params }],
        });
      }
      setNavigateLink('');
    }
  }, [navigationRefReady, navigateLink]);

  return (
    <>
      {children}
      <ForceUpdate/>
    </>
  );
};
export default DeepLinkProvider;
