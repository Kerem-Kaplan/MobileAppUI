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
import Validator from '../../utils/validator';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {setObserverProfilePhoto} from '../../redux/slice/observerProfilePhotoSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {serverUrl} from '../../constants/serverUrl';
import {getToken} from '../../helpers/tokens';
import {getUserEmail} from '../../services/getUserEmail';

const urlGetProfilePhoto = serverUrl + '/observer/get-profile-photo';
const urlUploadProfilePhoto = serverUrl + '/observer/upload-profile-photo';
const urlUpdateProfile = serverUrl + '/observer/update-profile';

const EditProfileScreen = () => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailForContact, setEmailForContact] = useState('');

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [uploadProfileData, setUploadProfileData] = useState({});

  const [loading, setLoading] = useState(true);

  const [imageUri, setImageUri] = useState('');

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const profilePhoto = useSelector(
    state => state.observerProfilePhoto.observerProfilePhotoUri,
  );

  const validateEmail = emailForContact => {
    console.log(emailForContact);
    if (Validator.validateEmailForContact(emailForContact)) {
      setIsValidEmail(true);
      console.log('Geçerli', emailForContact);

      const newObject = {
        ...uploadProfileData,
        emailForContact: emailForContact,
      };
      setUploadProfileData(newObject);
      console.log('Upload', uploadProfileData);
    } else {
      setIsValidEmail(false);
      console.log('Geçersiz', emailForContact);

      const {emailForContact, ...newObject} = uploadProfileData;
      setUploadProfileData(newObject);
      console.log('Upload', uploadProfileData);
    }
  };
  const validatePhoneNumber = phoneNumber => {
    console.log(phoneNumber);
    if (Validator.validatePhoneNumber(phoneNumber)) {
      setIsValidPhoneNumber(true);
      console.log('Geçerli ', phoneNumber);

      const newObject = {...uploadProfileData, phoneNumber: phoneNumber};
      setUploadProfileData(newObject);
      console.log('Upload', uploadProfileData);
    } else {
      setIsValidPhoneNumber(false);
      console.log('Geçersiz ', phoneNumber);

      const {phoneNumber, ...newObject} = uploadProfileData;
      setUploadProfileData(newObject);
      console.log('Upload', uploadProfileData);
    }
  };

  const validateAddress = address => {
    console.log(address);
    if (Validator.validateAddress(address)) {
      setIsValidAddress(true);
      console.log('Geçerli ', address);

      const newObject = {...uploadProfileData, address: address};
      setUploadProfileData(newObject);
      console.log('Upload', uploadProfileData);
    } else {
      setIsValidAddress(false);
      console.log('Geçersiz ', address);

      const {address, ...newObject} = uploadProfileData;
      setUploadProfileData(newObject);
      console.log('Upload', uploadProfileData);
    }
  };

  const onPressBack = () => {
    navigation.navigate('ProfilePage');
  };

  const getProfilePhoto = async () => {
    setLoading(true);
    try {
      await getToken().then(async token => {
        const result = await axios.get(urlGetProfilePhoto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const uri = `data:image/jpeg;base64,${result.data.photoData}`;
        dispatch(setObserverProfilePhoto(uri));
        setLoading(false);
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
  }, [useIsFocused()]);

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
    setLoading(true);
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
        setLoading(false);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setLoading(false);
      } else {
        console.log(response.assets[0]);
        setImageUri(response.assets[0].uri);
        setLoading(false);
      }
    });
  };

  const postProfilePhoto = async () => {
    try {
      await getToken().then(async token => {
        await getUserEmail(token).then(async email => {
          const formData = new FormData();
          formData.append('photo', {
            name: email + '_profile.jpg',
            uri: imageUri,
            type: 'image/jpg',
          });
          const result = await axios.post(urlUploadProfilePhoto, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
        });
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPressSave = async () => {
    setLoading(true);

    if (imageUri !== '') {
      await postProfilePhoto();
    } else {
      setLoading(false);
    }

    if (Object.entries(uploadProfileData).length !== 0) {
      console.log(uploadProfileData);
      try {
        await getToken().then(async token => {
          const result = await axios.post(urlUpdateProfile, uploadProfileData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Result', result.data);
          setLoading(false);
          alert(result.data.message);
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View
            style={{
              alignItems: 'center',
              margin: 15,
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
            style={[styles.inputView, !isValidEmail && styles.invalidInput]}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              onChangeText={text => {
                setEmailForContact(text);
                validateEmail(text);
              }}
              value={emailForContact}
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
          <TouchableOpacity onPress={onPressSave} style={styles.saveButton}>
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
  saveButton: {
    width: '85%',
    backgroundColor: '#525252',
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
export default EditProfileScreen;
