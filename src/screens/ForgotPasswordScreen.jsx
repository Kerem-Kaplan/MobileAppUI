import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Validator from '../utils/validator';

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
  const onPressForgotPassword = () => {
    alert('Forgot Password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View style={[styles.inputView, !isValidEmail && styles.invalidInput]}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
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
    borderRadius: 10,
    borderWidth: 1,
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
  invalidInput: {
    borderColor: '#ff0000',
  },
});

export default ForgotPasswordScreen;
