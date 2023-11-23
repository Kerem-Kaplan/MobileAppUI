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
  ScrollView,
  SafeAreaView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const {width} = Dimensions.get('window');
const imageWidth = width / 2;

const SignupScreen = () => {
  const onPressSignup = () => {
    alert('Sign Up');
  };
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [identityNumberOrPassportNumber, setIdentityNumberOrPassportNumber] =
    useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const genders = ['Male', 'Female'];
  const countries = ['Country-A', 'Country-B', 'Country-C'];
  const dateOfBirths = ['1900', '1901'];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput style={styles.title}>Sign UP</TextInput>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={setName}
            value={name}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Surname"
            placeholderTextColor="#003f5c"
            onChangeText={setSurname}
            value={surname}
          />
        </View>
        <View style={styles.selectDropdown}>
          <SelectDropdown
            buttonStyle={{borderRadius: 10, width: width / 2}}
            data={genders}
            defaultButtonText="Select Gender"
          />
        </View>
        <View style={styles.selectDropdown}>
          <SelectDropdown
            buttonStyle={{borderRadius: 10, width: width / 2}}
            data={dateOfBirths}
            defaultButtonText="Select Date"
          />
        </View>
        <View style={styles.selectDropdown}>
          <SelectDropdown
            buttonStyle={{borderRadius: 10, width: width / 2}}
            data={countries}
            defaultButtonText="Select Country"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="İdentity Number or Passport Number"
            placeholderTextColor="#003f5c"
            onChangeText={setIdentityNumberOrPassportNumber}
            value={identityNumberOrPassportNumber}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
        </View>
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
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity onPress={onPressSignup} style={styles.signupButton}>
          <Text style={styles.signupText}>SIGN UP </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#92ed7e',
    marginBottom: 40,
  },
  inputView: {
    width: '85%',
    backgroundColor: '#a8f098',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  selectDropdown: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  signupText: {
    color: '#000000',
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#56e236',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
});

export default SignupScreen;
