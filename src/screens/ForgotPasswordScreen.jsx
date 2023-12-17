import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Validator from '../utils/validator';
import axios from 'axios';

const url = 'http://192.168.1.10:3000/user/forgot-password';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = email => {
    console.log(email);
    if (Validator.validateGmail(email)) {
      console.log('Geçerli');
      setIsValidEmail(true);
    } else {
      console.log('Geçersiz');
      setIsValidEmail(false);
    }
  };
  const onPressForgotPassword = async () => {
    if (isValidEmail) {
      const response = await axios.post(url, {email});
      const data = response.data;
      console.log(response.data);

      alert(data.message);
      setEmail('');
    } else {
      alert('Try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Screen</Text>
      <View style={[styles.inputView, !isValidEmail && styles.invalidInput]}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#000000"
          onChangeText={text => {
            setEmail(text);
            validateEmail(text);
          }}
          value={email}
        />
      </View>
      <TouchableOpacity
        onPress={onPressForgotPassword}
        style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>FORGOT PASSWORD </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#000000',
    marginBottom: 20,
  },
  inputView: {
    width: '85%',
    backgroundColor: '#d1d1d1',
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000000',
  },
  forgotPasswordText: {
    color: '#ffffff',
  },
  forgotPasswordButton: {
    width: '85%',
    backgroundColor: '#616161',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  invalidInput: {
    borderColor: '#ff0000',
  },
});

export default ForgotPasswordScreen;
