import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {serverUrl} from '../../constants/serverUrl';
import {AirbnbRating} from 'react-native-ratings';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';
import {getUserEmail} from '../../services/getUserEmail';

const urlGetSuggestionDemands = serverUrl + '/user/get-suggestion-demands';
const urlSendSuggestion = serverUrl + '/user/send-suggestion';
const urlGetUserInfo = serverUrl + '/user/profile';

const SendSuggestionScreen = () => {
  const [subject, setSubject] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  const [observerSubject, setObserverSubject] = useState([]);
  const [imageUri, setImageUri] = useState('');
  const [loading, setLoading] = useState(true);

  const [demands, setDemands] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const observerEmail = route.params?.observerEmail;
  const observerName = route.params?.observerName;
  console.log(observerEmail);

  //databaseden ilgili gözlemcinin istekleri alınacak

  const handleChange = (key, value) => {
    console.log('Key:', key, 'Index:', value);
    setDemands({...demands, [key]: value});
    console.log('Answerss', demands);
  };

  const onPressSend = async () => {
    setLoading(true);
    await getToken()
      .then(async token => {
        setLoading(true);
        await getUserEmail(token).then(async email => {
          console.log(token);
          const today = new Date();
          const day = String(today.getDate()).padStart(2, '0'); // Gün
          const month = String(today.getMonth() + 1).padStart(2, '0'); // Ay (0'dan başladığı için +1 eklenir)
          const year = today.getFullYear(); // Yıl
          const hours = String(today.getHours()).padStart(2, '0'); // Saat
          const minutes = String(today.getMinutes()).padStart(2, '0'); // Dakika
          const seconds = String(today.getSeconds()).padStart(2, '0');

          const formData = new FormData();
          if (imageUri !== '') {
            formData.append('photo', {
              name:
                email +
                '_' +
                observerEmail +
                '_' +
                day +
                month +
                year +
                '_' +
                hours +
                minutes +
                seconds +
                '_suggestion.jpg',
              uri: imageUri,
              type: 'image/jpg',
            });
          }

          const data = {
            userName: userInfo.name,
            userSurname: userInfo.surname,
            userGender: userInfo.gender,
            userNationality: userInfo.nationality,
            userPhoneNumber: userInfo.phoneNumber,
            observerEmail: observerEmail,
            observerName: observerName,
            suggestionContent: {demands, subject},
          };

          formData.append('data', JSON.stringify(data));
          await axios
            .post(urlSendSuggestion, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              console.log(response);
              setLoading(false);
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onPressBack = () => {
    navigation.navigate('Home Page');
  };

  const handleSubjectChange = subject => {
    setSubject(subject);
    console.log(subject);
  };

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

  const getSuggestionDemands = async () => {
    console.log('observerEmail', observerEmail);
    await getToken().then(async token => {
      console.log(token);
      await axios
        .post(
          urlGetSuggestionDemands,
          {observerEmail: observerEmail},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(result => {
          console.log(result.data.data[0]);

          //setObserverSubject(response.data.data[0].subjectOfComplaint);
          /* setObserverSubject([
        
      ]); */
          setObserverSubject(result.data.data[0].subjectOfSuggestion);
          setDemands(result.data.data[0].optionalDemands);
          setLoading(false);
          //console.log(observerSubject);
        })
        .catch(error => {
          setLoading(false);
        });
    });
  };

  const getUserInfo = async () => {
    try {
      await getToken()
        .then(async token => {
          await axios
            .get(urlGetUserInfo, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(result => {
              console.log(result.data[0]);
              setUserInfo(result.data[0]);
            });
        })
        .catch(error => {
          console.log('errorrrrr', error);
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getSuggestionDemands();
    requestCameraPermission();
  }, []);
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
              margin: 5,
              width: '85%',
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../assets/appIcon.png')}
              style={styles.profilePic}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderColor: 'black',
                margin: 5,
              }}>
              <Text style={styles.observerName}>{observerName}</Text>
            </View>
          </View>
          <View style={[styles.inputView]}>
            <RNPickerSelect
              placeholder={{
                color: '#9fbca7',
                label: 'Select a Subject',
                value: null,
              }}
              style={{placeholder: {color: '#000000', margin: -15}}}
              items={observerSubject}
              onValueChange={handleSubjectChange}
              value={subject}
            />
          </View>

          {Object.keys(demands).map(key => (
            <View key={key} style={styles.inputView}>
              <TextInput
                style={{height: 40, color: '#000000'}}
                key={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                placeholderTextColor={'#000000'}
                value={demands[key]}
                onChangeText={value => handleChange(key, value)}
              />
            </View>
          ))}
          <View style={[styles.inputView]}>
            <TouchableOpacity onPress={selectImageHandler}>
              <Text style={{color: '#000000', fontSize: 15}}>
                Select File Photo or Video
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPressSend} style={styles.sendButton}>
            <Text style={styles.sendText}>SEND </Text>
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
    backgroundColor: '#ffffff',
  },
  scrollView: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#addaff',
    marginBottom: 20,
  },

  inputView: {
    width: '85%',
    backgroundColor: '#addaff',
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

  sendText: {
    color: '#ffffff',
  },
  backText: {
    color: '#ffffff',
  },
  sendButton: {
    width: '85%',
    backgroundColor: '#007ee6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  backButton: {
    width: '85%',
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
  profilePic: {
    width: 180,
    height: 180,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#93a994',
  },
  observerName: {
    fontSize: 25,
    fontWeight: '300',
    marginBottom: 5,
    color: '#000000',
  },
});

export default SendSuggestionScreen;
