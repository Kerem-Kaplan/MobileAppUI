import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {serverUrl} from '../../constants/serverUrl';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {setObserverProfilePhoto} from '../../redux/slice/observerProfilePhotoSlice';
import {useDispatch, useSelector} from 'react-redux';

const urlProfile = serverUrl + '/observer/profile';
const urlGetProfilePhoto = serverUrl + '/observer/get-profile-photo';

const ProfileScreen = () => {
  const [profile, setProfile] = useState([]);
  const [publicInfo, setPublicInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const profilePhoto = useSelector(
    state => state.observerProfilePhoto.observerProfilePhotoUri,
  );

  const navigation = useNavigation();

  const getProfile = async () => {
    try {
      await getToken().then(async token => {
        const result = await axios.get(urlProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('result', result.data.user[0]);
        setProfile(result.data.user[0]);
        setPublicInfo(result.data.publicInfo[0]);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
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

            <Text style={styles.name}>{profile.name}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.nationality}>
              <Text style={{fontWeight: 'bold'}}>Phone Number :</Text>
              {publicInfo.phoneNumber}
            </Text>
            <Text style={styles.id}>
              <Text style={{fontWeight: 'bold'}}>Email :</Text>
              {publicInfo.emailForContact}
            </Text>
            <Text style={styles.email}>
              <Text style={{fontWeight: 'bold'}}>Address :</Text>
              {publicInfo.address}
            </Text>

            {/* Profil içeriği */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <Text style={styles.buttonText}>Profili Düzenle</Text>
            </TouchableOpacity>
            {/* Diğer profil içeriği */}
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
  header: {
    alignItems: 'center',
    padding: 20,
    color: '#000000',
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#93a994',
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
});

export default ProfileScreen;
