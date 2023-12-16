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
import Validator from '../utils/validator';
import axios from 'axios';
import {checkUserRole} from '../services/checkUserRole';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const onPressLogin = async () => {
    if (isValidEmail && isValidPassword) {
      const url = 'http://192.168.177.116:3000/login';
      navigation.navigate('ObserverMain');
      /* try {
        const response = await axios.post(url, {
          email,
          password,
        });
        console.log('response', response.data.token);
        const data = response.data;
        const userRole = await checkUserRole(response.data.token);
        console.log('userRole', userRole);
        if (userRole === 'user') {
          navigation.navigate('UserMain');
        }
        if (userRole === 'observer') {
          navigation.navigate('ObserverMain');
        }
        setMessage(data.message);
        //navigation.navigate('UserMain');
      } catch (error) {
        if (error.response.status === 401) {
          //console.error('Giriş hatası:', error.response.data);
          alert(error.response.data.message);
        }
        if (error.response.status === 500) {
          alert(error.response.data.message);
        }
      } */
    } else {
      alert('Please check informations');
    }
  };
  const onPressForgotPassword = () => {
    // Do something about forgot password operation
    navigation.navigate('ForgotPassword');
  };
  const onPressSignUp = () => {
    // Do something about signup operation
    navigation.navigate('Signup');
  };

  const validatePassword = password => {
    console.log(password);
    if (Validator.validatePassword(password)) {
      setIsValidPassword(true);
      console.log('Geçerli');
    } else {
      setIsValidPassword(false);
      console.log('Geçersiz');
    }
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image
        source={require('../assets/appIcon.png')}
        style={styles.imageStyle}
      />
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
      <View style={[styles.inputView, !isValidPassword && styles.invalidInput]}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#000000"
          onChangeText={text => {
            setPassword(text);
            validatePassword(text);
          }}
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
    backgroundColor: '#ffffff',
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
    color: '#000000',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#a8f098',
    borderRadius: 10,
    borderWidth: 1,
    height: '7%',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000000',
  },
  forgotText: {
    color: '#000000',
    fontSize: 17,
    margin: 20,
  },
  loginText: {
    color: '#000000',
  },
  signupText: {
    color: '#000000',
    fontSize: 17,
    margin: 20,
  },
  containerSignup: {
    flexDirection: 'row',
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#56e236',
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
export default LoginScreen;
