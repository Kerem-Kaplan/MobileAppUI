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
  Button,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import {countryList} from '../../constants/countryList';
import {genders} from '../../constants/genders';
import validator from '../../utils/validator';
import Validator from '../../utils/validator';

const {width} = Dimensions.get('window');
const imageWidth = width / 2;

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [identityNumberOrPassportNumber, setIdentityNumberOrPassportNumber] =
    useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(new Date());
  const [selectedNationality, setSelectedNationality] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidIdentity, setIsValidIdentity] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const onPressSignup = () => {
    if (
      isValidEmail &&
      isValidIdentity &&
      isValidPassword &&
      isValidPhoneNumber &&
      selectedDateOfBirth !== null &&
      selectedGender !== null &&
      selectedNationality !== null
    ) {
      alert('Sign Up');
    } else {
      alert('Try again');
    }
  };
  const onPressBack = () => {
    navigation.navigate('Login');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDateOfBirth;
    setShowDatePicker(false);
    setSelectedDateOfBirth(currentDate);
    console.log(currentDate.getFullYear());
    // Burada seçilen tarih ile istediğiniz işlemi yapabilirsiniz
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleCountryChange = value => {
    setSelectedNationality(value);
    console.log(value);
    // Seçilen ülkeyle ilgili işlemleri burada yapabilirsiniz
  };

  const handleGenderChange = value => {
    setSelectedGender(value);
    console.log(value);
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

  const validatePhoneNumber = phoneNumber => {
    console.log(phoneNumber);
    if (Validator.validatePhoneNumber(phoneNumber)) {
      setIsValidPhoneNumber(true);
      console.log('Geçerli');
    } else {
      setIsValidPhoneNumber(false);
      console.log('Geçersiz');
    }
  };

  const validateIdentity = identityNumber => {
    console.log(identityNumber);
    if (Validator.validatePhoneNumber(identityNumber)) {
      setIsValidIdentity(true);
      console.log('Geçerli');
    } else {
      setIsValidIdentity(false);
      console.log('Geçersiz');
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput style={styles.title}>Sign UP</TextInput>
        <View style={styles.selectDateOfBirth}>
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={{fontSize: 17, paddingLeft: 15}}>Select a Date</Text>
          </TouchableOpacity>
          <View style={{justifyContent: 'center', paddingLeft: 30}}>
            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
                borderWidth: 1,
                padding: 1,
              }}>
              {selectedDateOfBirth.getDate().toString()}-
              {(selectedDateOfBirth.getMonth() + 1).toString()}-
              {selectedDateOfBirth.getFullYear().toString()}
            </Text>
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDateOfBirth}
            mode="date"
            display="spinner"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}
        <View style={styles.selectGender}>
          <RNPickerSelect
            placeholder={{label: 'Select a Gender', value: null}}
            items={genders}
            onValueChange={handleGenderChange}
            value={selectedGender}
          />
        </View>
        <View style={styles.selectCountry}>
          <RNPickerSelect
            placeholder={{label: 'Select a country', value: null}}
            items={countryList}
            onValueChange={handleCountryChange}
            value={selectedNationality}
          />
        </View>
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

        <View
          style={[styles.inputView, !isValidIdentity && styles.invalidInput]}>
          <TextInput
            maxLength={11}
            keyboardType="number-pad"
            style={styles.inputText}
            placeholder="İdentity Number or Passport Number"
            placeholderTextColor="#003f5c"
            onChangeText={text => {
              setIdentityNumberOrPassportNumber(text);
              validateIdentity(text);
            }}
            value={identityNumberOrPassportNumber}
          />
        </View>
        <View
          style={[
            styles.inputView,
            !isValidPhoneNumber && styles.invalidInput,
          ]}>
          <TextInput
            maxLength={11}
            keyboardType="number-pad"
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
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
            placeholderTextColor="#003f5c"
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
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => {
              setPassword(text);
              validatePassword(text);
            }}
            value={password}
          />
        </View>
        <TouchableOpacity onPress={onPressSignup} style={styles.signupButton}>
          <Text style={styles.signupText}>SIGN UP </Text>
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
  },
  scrollView: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#92ed7e',
    marginBottom: 40,
  },
  inputEmail: {
    width: '85%',
    backgroundColor: '#a8f098',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  inputView: {
    width: '85%',
    backgroundColor: '#a8f098',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  selectGender: {
    backgroundColor: 'green',
    width: '80%',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
  },
  selectCountry: {
    backgroundColor: 'green',
    width: '80%',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
  },
  selectDateOfBirth: {
    backgroundColor: 'green',
    width: '80%',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'flex-start',
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
  },

  signupText: {
    color: '#000000',
  },
  backText: {
    color: '#ffffff',
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#56e236',
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

export default SignupScreen;
