import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '@models/user';

const localStorageTokenKey = '__auth_token__';
const localStorageUserIdKey = '__userId__';
const localStorageUserKey = '__user__';

const getUser = async (): Promise<User | null> => {
  const user = await AsyncStorage.getItem(localStorageUserKey);
  return user ? JSON.parse(user) : null;
};

export const getUserPhone = async (): Promise<string> => {
  const user = await AsyncStorage.getItem(localStorageUserKey);
  const parsedUser: User | null = user ? JSON.parse(user) : null;

  return parsedUser ? parsedUser.phone : '';
};

export const setUser = async (user: User) => {
  await AsyncStorage.setItem(localStorageUserKey, JSON.stringify(user));
};

const getUserId = async (): Promise<number | null> => {
  const userId = await AsyncStorage.getItem(localStorageUserIdKey);
  return Number(userId);
};

const logout = async (): Promise<void> => {
  await AsyncStorage.clear();
};

export { localStorageTokenKey, getUserId, getUser, logout, localStorageUserKey };
