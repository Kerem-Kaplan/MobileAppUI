import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async token => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('Token başarıyla kaydedildi.');
  } catch (error) {
    console.log('Token saklanırken hata oluştu: ', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.log('Token alınırken hata oluştu: ', error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Token başarıyla silindi.');
  } catch (error) {
    console.log('Token silinirken hata oluştu: ', error);
  }
};

export {saveToken, getToken, removeToken};
