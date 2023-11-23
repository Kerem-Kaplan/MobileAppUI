import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';

const EditProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = () => {
    // Burada formun gönderileceği yer
    // Örneğin, bir API'ye POST isteği göndermek gibi

    // Örnek olarak, form bilgilerini ekrana yazdıralım
    Alert.alert(
      'Gönderilen Bilgiler',
      `Kullanıcı adı: ${username}, Şifre: ${password}`,
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={text => setUsername(text)}
        style={{borderWidth: 1, padding: 10, margin: 10, width: 200}}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={{borderWidth: 1, padding: 10, margin: 10, width: 200}}
      />
      <TouchableOpacity
        onPress={handleFormSubmit}
        style={{backgroundColor: 'blue', padding: 10}}>
        <Text style={{color: 'white'}}>Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
