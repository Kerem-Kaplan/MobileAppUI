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
import {serverUrl} from '../constants/serverUrl';
import {useNavigation} from '@react-navigation/native';

const url = serverUrl + '/user/forgot-password';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigation = useNavigation();

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
      await axios
        .post(url, {email})
        .then(result => {
          const data = result.data;
          console.log(result.data);

          alert(data.message);
          setEmail('');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('Try again');
    }
  };

  const onPressBackButton = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Enter Email</Text>
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
        style={styles.sendButton}>
        <Text style={styles.sendText}>SEND </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressBackButton} style={styles.backButton}>
        <Text style={styles.backText}>BACK </Text>
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
    fontSize: 20,
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
  backButton: {
    width: '85%',
    backgroundColor: '#ff0000',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  backText: {
    color: '#ffffff',
  },
  inputText: {
    height: 50,
    color: '#000000',
  },
  sendText: {
    color: '#ffffff',
  },
  sendButton: {
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
