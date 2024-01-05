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
import RNPickerSelect from 'react-native-picker-select';
import {serverUrl} from '../../constants/serverUrl';
import {AirbnbRating} from 'react-native-ratings';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';
import {getUserEmail} from '../../services/getUserEmail';
import {launchImageLibrary} from 'react-native-image-picker';

const urlGetRequestDemands = serverUrl + '/user/get-request-demands';
const urlSendRequest = serverUrl + '/user/send-request';
const urlGetUserInfo = serverUrl + '/user/profile';
const urlGetObserverPhoto = serverUrl + '/user/get-observer-photo';

const SendRequestScreen = () => {
  const [subject, setSubject] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  const [observerSubject, setObserverSubject] = useState([]);
  const [imageUri, setImageUri] = useState('');
  const [loading, setLoading] = useState(true);
  const [observerPhoto, setObserverPhoto] = useState('');

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
    await getToken().then(async token => {
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
          requestContent: {demands, subject},
        };

        formData.append('data', JSON.stringify(data));
        await axios
          .post(urlSendRequest, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log('error', error);
          });
      });
    });
  };
  const onPressBack = () => {
    navigation.navigate('HomePage');
  };

  const handleSubjectChange = subject => {
    setSubject(subject);
    console.log(subject);
  };

  /*  const subjects = [
    {label: 'Subject1', value: 'Subject1'},
    {label: 'Subject2', value: 'Subject2'},
  ]; */

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

  const getObserverImage = async () => {
    try {
      await getToken()
        .then(async token => {
          await axios
            .post(
              urlGetObserverPhoto,
              {observer: observerEmail},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(result => {
              console.log(result.data.observerPhoto);
              setObserverPhoto(result.data.observerPhoto);
            });
        })
        .catch(error => {
          console.log('errorrrrr', error);
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  const getRequestDemands = async () => {
    const observerEmail = route.params?.observerEmail;
    console.log('observerEmail', observerEmail);
    await getToken().then(async token => {
      console.log(token);
      await axios
        .post(
          urlGetRequestDemands,
          {observerEmail: observerEmail},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(result => {
          console.log(result.data);
          console.log(result.data.data[0]);

          //setObserverSubject(response.data.data[0].subjectOfComplaint);
          /* setObserverSubject([
          
        ]); */
          setObserverSubject(result.data.data[0].subjectOfRequest);
          setDemands(result.data.data[0].optionalDemands);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });

      //console.log(observerSubject);
    });
  };

  useEffect(() => {
    getUserInfo();
    getRequestDemands();
    requestCameraPermission();
    getObserverImage();
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
              source={{uri: `data:image/jpeg;base64,${observerPhoto}`}}
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
          {imageUri === '' ? (
            <Text style={{color: '#000000'}}>Not Selected a File</Text>
          ) : (
            <Image source={{uri: imageUri}} style={styles.selectedFile} />
          )}
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
    color: '#9fbca7',
    marginBottom: 40,
  },

  inputView: {
    width: '85%',
    backgroundColor: '#9fbca7',
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
    width: '80%',
    backgroundColor: '#5a8165',
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
  selectedFile: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#93a994',
  },
});
export default SendRequestScreen;
