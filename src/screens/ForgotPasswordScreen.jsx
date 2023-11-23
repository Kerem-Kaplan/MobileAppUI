import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ForgotPasswordScreen = () => {
  const [password, setPassword] = useState('');

  const onPressForgotPassword = () => {
    alert('Forgot Password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity
        onPress={onPressForgotPassword}
        style={styles.forgotPasswordButton}>
        <Text style={styles.loginText}>FORGOT PASSWORD </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ffffff',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#a8f098',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgotPasswordButton: {
    width: '80%',
    backgroundColor: '#56e236',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});

export default ForgotPasswordScreen;
