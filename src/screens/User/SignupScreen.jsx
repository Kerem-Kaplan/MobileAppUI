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
  Button,
  Modal,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const {width} = Dimensions.get('window');
const imageWidth = width / 2;

const SignupScreen = ({navigation}) => {
  const onPressSignup = () => {
    alert('Sign Up');
  };
  const onPressBack = () => {
    navigation.navigate('Login');
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

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(new Date());
  const [selectedNationality, setSelectedNationality] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const genders = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];
  const countryList = [
    {label: 'Türkiye', value: 'Türkiye'},
    {label: 'USA', value: 'USA'},
    {label: 'Canada', value: 'Canada'},
    {label: 'Afghanistan', value: 'Afghanistan'},
    {label: 'Albania', value: 'Albania'},
    {label: 'Argentina', value: 'Argentina'},
    {label: 'Azerbaijan', value: 'United Kingdom'},
    {label: 'Iraq', value: 'Iraq'},
    {label: 'Germany', value: 'Germany'},
    {label: 'Turkmenistan', value: 'Turkmenistan'},
    {label: 'Syrian Arab Republic', value: 'Syrian Arab Republic'},
    {label: 'Iran', value: 'Iran'},
    {label: 'Russian Federation', value: 'Russian Federation'},
    {label: 'Uzbekistan', value: 'Uzbekistan'},
    {label: 'Egypt', value: 'Egypt'},
    {label: 'Other', value: 'Other'},
    // Diğer ülkeleri buraya ekleyebilirsiniz
  ];
  const dateOfBirths = [
    {key: 1, value: '1900'},
    {key: 2, value: '1901'},
    {key: 3, value: '1902'},
    {key: 4, value: '1903'},
    {key: 5, value: '1904'},
    {key: 6, value: '1905'},
    {key: 7, value: '1906'},
    {key: 8, value: '1907'},
    {key: 9, value: '1908'},
    {key: 10, value: '1909'},
  ];
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
          <RNPickerSelect
            placeholder={{label: 'Select a Gender', value: null}}
            items={genders}
            onValueChange={handleGenderChange}
            value={selectedGender}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '80%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Button
              color={'green'}
              onPress={showDatepicker}
              title="Select birth date"
              placeholder={{label: 'Select a Date', value: null}}
            />
            <View style={{justifyContent: 'center', paddingLeft: 30}}>
              <Text style={{fontSize: 20, color: '#000000'}}>
                {selectedDateOfBirth.getDay().toString()}-
                {selectedDateOfBirth.getMonth().toString()}-
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
            />
          )}
        </View>

        <View style={styles.selectDropdown}>
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
    backgroundColor: 'green',
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
});

export default SignupScreen;
