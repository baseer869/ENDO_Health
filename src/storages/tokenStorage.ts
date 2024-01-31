import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'token';

const tokenStorage = {
  async get() {
    try {
      const rawToken = await AsyncStorage.getItem(key);
      const savedToken = JSON.parse(rawToken ?? '');

      return savedToken;
    } catch (e) {
      throw new Error('Eror');
    }
  },
  async set(data: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      throw new Error('Error');
    }
  },
};

export default tokenStorage;
