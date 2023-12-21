import React, {useEffect, useState} from 'react';
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
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {countryList} from '../../constants/countryList';
import RNPickerSelect from 'react-native-picker-select';
import {genders} from '../../constants/genders';
import Validator from '../../utils/validator';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {getToken} from '../../helpers/tokens';
import {getUserEmail} from '../../services/getUserEmail';

const url = 'http://192.168.1.10:3000/user/upload-profile-photo';

const EditProfileScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [email, setEmail] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidGender, setIsValidGender] = useState(false);
  const [isValidNationality, setIsValidNationality] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [loading, setLoading] = useState(true);

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
      console.log('Geçerli ', isValidEmail);
    } else {
      setIsValidPhoneNumber(false);
      console.log('Geçersiz ', isValidPhoneNumber);
    }
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

  const handleCountryChange = value => {
    setNationality(value);
    console.log(value);
    // Seçilen ülkeyle ilgili işlemleri burada yapabilirsiniz
  };
  const handleGenderChange = value => {
    setGender(value);
    console.log(value);
    // Seçilen ülkeyle ilgili işlemleri burada yapabilirsiniz
  };

  const onPressSave = async () => {
    try {
      await getToken().then(async token => {
        await getUserEmail(token).then(async email => {
          const formData = new FormData();
          formData.append('photo', {
            name: email + '_profile.jpg',
            uri: imageUri,
            type: 'image/jpg',
          });
          const result = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
    console.log(formData._parts);
    if (
      isValidEmail &&
      isValidGender &&
      isValidNationality &&
      isValidPhoneNumber
    ) {
      alert('Succesfully');
    } else {
      alert('Try again');
    }
  };

  const onPressBack = () => {
    navigation.navigate('ProfilePage');
  };

  const getProfilePhoto = async () => {
    try {
      await getToken().then(async token => {
        const result = await axios.get(
          'http://192.168.1.10:3000/user/get-profile-photo',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLoading(false);
        const uri = `data:image/jpeg;base64,${result.data.photoData}`;
        setProfilePhoto(uri);
        //console.log('Resultttttt', result.data.photoData);
      });
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
    }
  };

  useEffect(() => {
    requestCameraPermission();
    getProfilePhoto();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permission to access camera',
          message: 'App needs access to your camera.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const selectImageHandler = () => {
    const options = {
      title: 'Select Photo',
      type: 'file',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.assets[0]);
        setImageUri(response.assets[0].uri);

        //setFormData(formData);
      }
    });
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
              source={{uri: imageUri === '' ? profilePhoto : imageUri}}
              style={styles.profilePic}
            />
            <TouchableOpacity
              onPress={selectImageHandler}
              style={styles.button}>
              <Text style={styles.buttonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.inputView,
              !isValidNationality && styles.invalidInput,
            ]}>
            <RNPickerSelect
              placeholder={{label: 'Select a country', value: null}}
              style={{placeholder: {color: '#ffffff'}}}
              items={countryList}
              onValueChange={text => {
                handleCountryChange(text);
                validateNationality(text);
              }}
              value={nationality}
            />
          </View>
          <View
            style={[styles.inputView, !isValidGender && styles.invalidInput]}>
            <RNPickerSelect
              placeholder={{label: 'Select a Gender', value: null}}
              style={{placeholder: {color: '#ffffff'}}}
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
          <View
            style={[styles.inputView, !isValidEmail && styles.invalidInput]}>
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

          <TouchableOpacity onPress={onPressSave} style={styles.signupButton}>
            <Text style={styles.editText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
            <Text style={styles.backText}>BACK </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#e0ffe6',
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
