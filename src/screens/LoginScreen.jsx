import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import SignupScreen from './User/SignupScreen';
import HomeScreen from './User/HomeScreen';
import MyTabs from '../navigation/User/UserMainPageBottomNavigation';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const onPressLogin = async () => {
    navigation.navigate('UserMain');
    /*  const url = 'http://192.168.1.10:3000/login';

    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      console.log('response', response);
      const data = response.data;
      setMessage(data.message);
    } catch (error) {
      console.error('Giriş hatası:', error.response.data.errors);
      setErrors(error.response.data.errors);
      console.log('errors', errors);
      setMessage('Giriş sırasında hata oluştu');
    } */
  };
  const onPressForgotPassword = () => {
    // Do something about forgot password operation
    navigation.navigate('Forgot Password');
  };
  const onPressSignUp = () => {
    // Do something about signup operation
    navigation.navigate('Signup');
  };

  validateEmail = email => {
    // Basit bir e-posta doğrulama işlemi
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image
        source={require('../assets/appIcon.png')}
        style={styles.imageStyle}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity onPress={onPressLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
      <View style={styles.containerSignup}>
        <TouchableOpacity onPress={onPressSignUp}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Text>{message}</Text>
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
  imageStyle: {
    width: imageWidth,
    height: imageWidth,
    margin: '5%',
    borderRadius: imageWidth / 4,
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
  forgotText: {
    color: '#ffffff',
    fontSize: 17,
    margin: 20,
  },
  loginText: {
    color: '#000000',
  },
  signupText: {
    color: '#ffffff',
    fontSize: 17,
    margin: 20,
  },
  containerSignup: {
    flexDirection: 'row',
  },
  loginButton: {
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
export default LoginScreen;
