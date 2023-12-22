import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Validator from '../../utils/validator';
import {useNavigation} from '@react-navigation/native';

const EditProfileScreen = () => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState('');

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const navigation = useNavigation();

  const validateEmail = email => {
    console.log(email);
    if (Validator.validateGmail(email)) {
      console.log('Geçerli', isValidEmail);
      setIsValidEmail(true);
    } else {
      console.log('Geçersiz', isValidEmail);
      setIsValidEmail(false);
    }
  };

  const validatePhoneNumber = phoneNumber => {
    console.log(phoneNumber);
    if (Validator.validatePhoneNumber(phoneNumber)) {
      setIsValidPhoneNumber(true);
      console.log('Geçerli ', isValidPhoneNumber);
    } else {
      setIsValidPhoneNumber(false);
      console.log('Geçersiz ', isValidPhoneNumber);
    }
  };

  const validateAddress = address => {
    console.log(address);
    if (Validator.validateAddress(address)) {
      setIsValidAddress(true);
      console.log('Geçerli ', isValidAddress);
    } else {
      setIsValidAddress(false);
      console.log('Geçersiz ', isValidAddress);
    }
  };

  const onPressSave = () => {
    if (isValidEmail && isValidAddress && isValidPhoneNumber) {
      alert('Succesfully');
    } else {
      alert('Try again');
    }
  };

  const onPressBack = () => {
    navigation.navigate('ProfilePage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Edit Profile</Text>
        <View
          style={{
            alignItems: 'center',
            margin: 5,
            flex: 0.5,
            flexDirection: 'column',
            justifyContent: 'center',
            borderBottomWidth: 2,
            width: '90%',
          }}>
          <Image
            source={require('../../assets/appIcon.png')}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.inputView,
            !isValidPhoneNumber && styles.invalidInput,
          ]}>
          <TextInput
            maxLength={11}
            style={styles.inputText}
            placeholder="Phone Number"
            keyboardType="number-pad"
            placeholderTextColor="#ffffff"
            onChangeText={text => {
              setPhoneNumber(text);
              validatePhoneNumber(text);
            }}
            value={phoneNumber}
          />
        </View>
        <View style={[styles.inputView, !isValidEmail && styles.invalidInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#ffffff"
            onChangeText={text => {
              setEmail(text);
              validateEmail(text);
            }}
            value={email}
          />
        </View>
        <View
          style={[styles.inputView, !isValidAddress && styles.invalidInput]}>
          <TextInput
            style={styles.inputText}
            multiline={true}
            numberOfLines={3}
            placeholder="Address"
            placeholderTextColor="#ffffff"
            onChangeText={text => {
              setAddress(text);
              validateAddress(text);
            }}
            value={address}
          />
        </View>
        <TouchableOpacity onPress={onPressSave} style={styles.signupButton}>
          <Text style={styles.editText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <Text style={styles.backText}>BACK </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#7d7d7d',
    marginBottom: 20,
  },

  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#7d7d7d',
  },
  scrollView: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '85%',
    backgroundColor: '#7d7d7d',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    color: '#ffffff',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  username: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 17,
  },
  nationality: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  id: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  email: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  phoneNumber: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  dateOfBirth: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 17,
  },
  bio: {
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    color: '#000000',
    margin: 5,
  },
  button: {
    backgroundColor: '#c1c7c2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  editText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#525252',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  backButton: {
    width: '80%',
    backgroundColor: '#ff0000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  invalidInput: {
    borderColor: '#ff0000',
  },
});
export default EditProfileScreen;
