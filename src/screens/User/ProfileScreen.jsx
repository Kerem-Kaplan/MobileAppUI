import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {getToken} from '../../helpers/tokens';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfilePhoto} from '../../redux/slice/userProfilePhotoSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {serverUrl} from '../../constants/serverUrl';

const urlProfile = serverUrl + '/user/profile';
const urlGetProfilePhoto = serverUrl + '/user/get-profile-photo';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const profilePhoto = useSelector(
    state => state.userProfilePhoto.userProfilePhotoUri,
  );

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      await getToken().then(async token => {
        const result = await axios.get(urlProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(result.data[0]);
        console.log('Result', result.data[0]);
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const getProfilePhoto = async () => {
    console.log('Getting');
    try {
      await getToken().then(async token => {
        const result = await axios.get(urlGetProfilePhoto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log('Resuşlt photo', result);
        const uri = `data:image/jpeg;base64,${result.data.photoData}`;
        dispatch(setUserProfilePhoto(uri));
        setLoading(false);
        //console.log('Resultttttt', result.data.photoData);
      });
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
    }
  };
  console.log(useIsFocused());
  
  useEffect(() => {
    getProfile();
    getProfilePhoto();
  }, [useIsFocused()]);

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
              margin: 20,
              flexDirection: 'column',
              borderBottomWidth: 3,
            }}>
            <Image source={{uri: profilePhoto}} style={styles.profilePic} />
            <Text style={styles.name}>
              {profile.name + ' '}
              {profile.surname}
            </Text>
            <Text style={styles.username}>
              <Text style={{fontWeight: 'bold'}}>Gender : </Text>
              {profile.gender}
            </Text>
            <Text style={styles.dateOfBirth}>
              <Text style={{fontWeight: 'bold'}}>Date Of Birth : </Text>
              {profile.dateOfBirth.substring(0, 4)}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.nationality}>
              <Text style={{fontWeight: 'bold'}}>Nationality :</Text>{' '}
              {profile.nationality}
            </Text>
            <Text style={styles.email}>
              <Text style={{fontWeight: 'bold'}}>Email :</Text> {profile.email}
            </Text>
            <Text style={styles.phoneNumber}>
              <Text style={{fontWeight: 'bold'}}>Phone Number :</Text>{' '}
              {profile.phoneNumber}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <Text style={styles.buttonText}>Profili Düzenle</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
  },

  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#93a994',
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: 25,
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
    fontSize: 20,
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
    fontSize: 20,
  },
  phoneNumber: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 20,
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
    fontSize: 17,
  },
});

export default ProfileScreen;
