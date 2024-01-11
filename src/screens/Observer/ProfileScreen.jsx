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
import {AirbnbRating} from 'react-native-ratings';
import {calculateObserverAverageVotes} from '../../utils/calculateObserverAverageVotes';

const urlProfile = serverUrl + '/observer/profile';
const urlGetProfilePhoto = serverUrl + '/observer/get-profile-photo';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const profilePhoto = useSelector(
    state => state.observerProfilePhoto.observerProfilePhotoUri,
  );

  const [profile, setProfile] = useState([]);
  const [publicInfo, setPublicInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageVote, setAverageVote] = useState(0);
  const [totalVote, setTotalVote] = useState(0);

  const getProfile = async () => {
    const token = await getToken();

    await axios
      .get(urlProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(result => {
        console.log(result.data.votes);
        console.log('result', result.data.observer[0]);
        const averageVote = calculateObserverAverageVotes(result.data.votes);

        if (isNaN(averageVote.averageVote)) {
          setAverageVote(0);
          setTotalVote(0);
        } else {
          setAverageVote(averageVote.averageVote);
          setTotalVote(averageVote.totalVote);
        }
        console.log('averageVote', averageVote);
        setProfile(result.data.observer[0]);
        setPublicInfo(result.data.publicInfo[0]);
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(urlGetProfilePhoto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(result => {
        //console.log('Resuşlt photo', result);
        const uri = `data:image/jpeg;base64,${result.data.photoData}`;
        dispatch(setObserverProfilePhoto(uri));
        setLoading(false);
        //console.log('Resultttttt', result.data.photoData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /* const getProfilePhoto = async () => {
    console.log('Getting');
    try {
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  }; */

  useEffect(() => {
    getProfile();
    //getProfilePhoto();
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
              margin: 20,
              flexDirection: 'column',
              borderBottomWidth: 3,
            }}>
            <Image source={{uri: profilePhoto}} style={styles.profilePic} />

            <Text style={styles.name}>{profile.name}</Text>
            <View style={[styles.vote]}>
              <AirbnbRating
                count={5}
                defaultRating={averageVote}
                reviews={[]}
                size={25}
                isDisabled={true}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                  }}>
                  average : {averageVote} | {totalVote} votes
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.nationality}>
              <Text style={{fontWeight: 'bold'}}>Phone Number :</Text>
              {publicInfo.phoneNumber}
            </Text>
            <Text style={styles.email}>
              <Text style={{fontWeight: 'bold'}}>Email :</Text>
              {publicInfo.emailForContact}
            </Text>
            <Text style={styles.address}>
              <Text style={{fontWeight: 'bold'}}>Address :</Text>
              {publicInfo.address}
            </Text>

            {/* Profil içeriği */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <Text style={styles.buttonText}>Edit Profile</Text>
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

  nationality: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  vote: {
    width: '60%',
  },
  email: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  address: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
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
