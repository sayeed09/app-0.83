
import Categories from 'containers/categories';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';


export default function CategoriesScreen() {
  const navigation = useNavigation();
  const route = useRouter();

  return (
    <>
      <Categories navigation={navigation} route={route} />
    </>
  );
}
