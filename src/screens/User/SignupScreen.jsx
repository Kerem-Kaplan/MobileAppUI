import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import {countryList} from '../../constants/countryList';
import {genders} from '../../constants/genders';
import Validator from '../../utils/validator';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {serverUrl} from '../../constants/serverUrl';

const {width} = Dimensions.get('window');
const imageWidth = width / 2;

const url = serverUrl + '/user/sign-up';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [nationality, setNationality] = useState(null);
  const [identityNumberOrPassportNumber, setIdentityNumberOrPassportNumber] =
    useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(false);
  const [isValidGender, setIsValidGender] = useState(false);
  const [isValidNationality, setIsValidNationality] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidSurname, setIsValidSurname] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidIdentity, setIsValidIdentity] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const navigation = useNavigation();

  const onPressSignup = async () => {
    if (
      isValidEmail &&
      isValidIdentity &&
      isValidPassword &&
      isValidPhoneNumber &&
      isValidNationality &&
      isValidGender &&
      isValidNationality &&
      isValidName &&
      isValidSurname
    ) {
      try {
        const response = await axios.post(url, {
          name,
          surname,
          gender,
          dateOfBirth,
          nationality,
          identityNumberOrPassportNumber,
          email,
          password,
          phoneNumber,
        });

        console.log('Response Signup', response);
        const data = response.data;
        console.log('Message Signup:', data.message);
        alert(data.message);
        setDateOfBirth(new Date());
        setGender(null);
        setNationality(null);
        setName('');
        setSurname('');
        setIdentityNumberOrPassportNumber('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        navigation.navigate('Login');
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert('Please Check Information');
    }
  };
  const onPressBack = () => {
    navigation.navigate('Login');
  };

  const handleChangeDateOfBirth = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
    console.log('currentDate', currentDate);
    setIsValidDateOfBirth(true);

    // Burada seçilen tarih ile istediğiniz işlemi yapabilirsiniz
  };

  //console.log('dateOfBirth', dateOfBirth);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleCountryChange = value => {
    setNationality(value);
    console.log(value);
    // Seçilen ülkeyle ilgili işlemleri burada yapabilirsiniz
  };

  const handleGenderChange = value => {
    setGender(value);
    console.log(value);
  };

  const validateGender = gender => {
    console.log(gender);
    if (gender === null) {
      setIsValidGender(false);
      console.log('Gender is Empty ', gender);
    } else {
      setIsValidGender(true);
      console.log('Gender is ', gender);
    }
  };

  const validateNationality = nationality => {
    console.log(nationality);
    if (nationality === null) {
      setIsValidNationality(false);
      console.log('Nationality is Empty ', nationality);
    } else {
      setIsValidNationality(true);
      console.log('Nationality is ', nationality);
    }
  };

  const validateName = name => {
    console.log(name);
    if (Validator.validateName(name)) {
      console.log('Geçerli');
      setIsValidName(true);
    } else {
      console.log('Geçersiz');
      setIsValidName(false);
    }
  };

  const validateSurname = surname => {
    console.log(surname);
    if (Validator.validateSurname(surname)) {
      console.log('Geçerli');
      setIsValidSurname(true);
    } else {
      console.log('Geçersiz');
      setIsValidSurname(false);
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
        <View
          style={[
            styles.selectDateOfBirth,
            !isValidDateOfBirth && styles.invalidInput,
          ]}>
          <TouchableOpacity onPress={showDatepicker}>
            <Text
              style={{fontSize: 17, paddingLeft: 15, justifyContent: 'center'}}>
              Select a Date
            </Text>
          </TouchableOpacity>
          <View style={{justifyContent: 'center', paddingLeft: 50}}>
            <Text
              style={{
                fontSize: 22,
                color: '#ffffff',
                padding: 1,
              }}>
              {dateOfBirth.getDate()}-{dateOfBirth.getMonth() + 1}-
              {dateOfBirth.getFullYear()}
            </Text>
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth}
            mode="date"
            display="spinner"
            onChange={handleChangeDateOfBirth}
            maximumDate={new Date()}
          />
        )}
        <View
          style={[styles.selectGender, !isValidGender && styles.invalidInput]}>
          <RNPickerSelect
            placeholder={{label: 'Select a Gender', value: null}}
            items={genders}
            onValueChange={text => {
              handleGenderChange(text);
              validateGender(text);
            }}
            value={gender}
          />
        </View>
        <View
          style={[
            styles.selectCountry,
            !isValidNationality && styles.invalidInput,
          ]}>
          <RNPickerSelect
            placeholder={{label: 'Select a country', value: null}}
            items={countryList}
            onValueChange={text => {
              handleCountryChange(text);
              validateNationality(text);
            }}
            value={nationality}
          />
        </View>
        <View style={[styles.inputView, !isValidName && styles.invalidInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={text => {
              setName(text);
              validateName(text);
            }}
            value={name}
          />
        </View>
        <View
          style={[styles.inputView, !isValidSurname && styles.invalidInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Surname"
            placeholderTextColor="#003f5c"
            onChangeText={text => {
              setSurname(text);
              validateSurname(text);
            }}
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

  inputView: {
    width: '85%',
    backgroundColor: '#a8f098',
    borderWidth: 1,
    borderRadius: 10,
    height: '6%',
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
    width: '85%',
    borderRadius: 10,
    height: '6%',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
  },
  selectCountry: {
    backgroundColor: 'green',
    width: '85%',
    borderRadius: 10,
    height: '6%',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
  },
  selectDateOfBirth: {
    backgroundColor: 'green',
    width: '85%',
    borderRadius: 10,
    marginBottom: 20,
    height: '6%',
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
    width: '85%',
    backgroundColor: '#56e236',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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

  invalidInput: {
    borderColor: '#ff0000',
  },
});

export default SignupScreen;
