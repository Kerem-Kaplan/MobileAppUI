import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Validator from '../utils/validator';
import axios from 'axios';
import {checkUserRole} from '../services/checkUserRole';
import {saveToken} from '../helpers/tokens';
import {useNavigation} from '@react-navigation/native';
import {serverUrl} from '../constants/serverUrl';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const url = serverUrl + '/get-app-icon';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [appIcon, setAppIcon] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const navigation = useNavigation();

  const getAppIcon = async () => {
    await axios
      .get(url)
      .then(response => {
        console.log(response.data.appIcon);
        setAppIcon(response.data.appIcon);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAppIcon();
  }, []);

  const onPressLogin = async () => {
    if (isValidEmail && isValidPassword) {
      const url = serverUrl + '/login';

      //navigation.navigate('UserMain');
      try {
        await axios
          .post(url, {
            email,
            password,
          })
          .then(async result => {
            console.log('response', result.data.token);
            const data = result.data;
            const userRole = await checkUserRole(data.token);
            saveToken(data.token);
            console.log('userRole', userRole);
            if (userRole === 'user') {
              setLoading(false);
              navigation.navigate('UserMain');
            }
            if (userRole === 'observer') {
              setLoading(false);
              navigation.navigate('ObserverMain');
            }
            setMessage(data.message);
            //setEmail('');
            //setPassword('');
          });
      } catch (error) {
        if (error.response.status === 401) {
          //console.error('Giriş hatası:', error.response.data);
          setLoading(false);
          alert(error.response.data.message);
        }
        if (error.response.status === 500) {
          setLoading(false);
          alert(error.response.data.message);
        }
      }
    } else {
      setLoading(false);
      alert('Please check informations');
    }
  };
  const onPressForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const onPressSignUp = () => {
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
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          size="large"
          color="#000000"
        />
      ) : (
        <>
          <Text style={{color: '#000000', margin: 50, fontSize: 25}}>
            Welcome Complaint App
          </Text>
          <Image
            source={{uri: `data:image/jpeg;base64,${appIcon}`}}
            style={styles.imageStyle}
          />
          <View
            style={[styles.inputView, !isValidEmail && styles.invalidInput]}>
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
          <View
            style={[styles.inputView, !isValidPassword && styles.invalidInput]}>
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
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageStyle: {
    width: imageWidth,
    height: imageWidth,
    margin: '5%',
    borderRadius: imageWidth / 4,
  },
  title: {
    fontWeight: '800',
    fontSize: 50,
    color: '#000000',
    marginBottom: 10,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#a8f098',
    borderRadius: 10,
    borderWidth: 1,
    height: height / 14,
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
    fontSize: 20,
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#56e236',
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  loginText: {
    color: '#000000',
  },
  signupText: {
    color: '#000000',
    fontSize: 20,
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#56e236',
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
    marginTop: 20,
    marginBottom: 10,
  },
  invalidInput: {
    borderColor: '#ff0000',
  },
});
export default LoginScreen;
