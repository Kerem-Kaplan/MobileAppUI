import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import {getToken, removeToken} from '../../helpers/tokens';
import {useNavigation} from '@react-navigation/native';
import {serverUrl} from '../../constants/serverUrl';
import {AirbnbRating} from 'react-native-ratings';
import {calculateAverageVotes} from '../../utils/calculateAverageVotes';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const categories = [
  {id: 1, name: 'Ulaşım'},
  {id: 2, name: 'Gıda'},
  {id: 3, name: 'Giyim'},
  {id: 4, name: 'Kategori-4'},
  {id: 5, name: 'Kategori-5'},
];

const businesses = [
  {
    id: 1,
    observerName: 'İşletme 1',
    email: 'isletme1@gmail.com',
    phoneNumber: '01111111',
    address: 'Address İşletme 1',
    voteAverage: 1.5,
    categoryId: 1,
  },
  {
    id: 2,
    observerName: 'İşletme 2',
    email: 'isletme2@gmail.com',
    phoneNumber: '02222222',
    address: 'Address İşletme 2',
    voteAverage: 3.9,
    categoryId: 1,
  },
  {
    id: 3,
    observerName: 'İşletme 3',
    email: 'isletme3@gmail.com',
    phoneNumber: '03333333',
    address: 'Address İşletme 3',
    voteAverage: 2.3,
    categoryId: 2,
  },
  {
    id: 4,
    observerName: 'İşletme 4',
    email: 'isletme4@gmail.com',
    phoneNumber: '04444444',
    address: 'Address İşletme 4',
    voteAverage: 4.1,
    categoryId: 2,
  },
  {
    id: 5,
    observerName: 'İşletme 5',
    email: 'isletme5@gmail.com',
    phoneNumber: '05555555',
    address: 'Address İşletme 5',
    voteAverage: 3.5,
    categoryId: 3,
  },
  {
    id: 6,
    observerName: 'İşletme 6',
    email: 'isletme6@gmail.com',
    phoneNumber: '06666666',
    address: 'Address İşletme 6',
    voteAverage: 4.7,
    categoryId: 3,
  },
];

const url = serverUrl + '/user/homepage';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Uygulamadan çıkmak istediğinize emin misiniz?', '', [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            navigation.navigate('Login');
            await removeToken();
          }, // Uygulamadan çıkış yap
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [selectedCategory, setSelectedCategory] = React.useState(1);

  const [observers, setObservers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publicInfo, setPublicInfo] = useState([]);
  const [averageVote, setAverageVote] = useState([]);
  const [profilePhotos, setProfilePhotos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getObservers();
  }, []);

  const getObservers = async () => {
    await getToken().then(async token => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedCategory(response.data.categories[0]._id);
      //console.log(response.data);
      console.log('response.data.categories', response.data.categories);
      console.log('response.data.observers', response.data.observers);
      console.log('response.data.publicInfo', response.data.publicInfo);
      console.log('response.data.observerVote', response.data.observerVote);
      //console.log('response.data.profilePhotos', response.data.profilePhotos);
      //console.log(response.data);
      setObservers(response.data.observers);
      setCategories(response.data.categories);
      setPublicInfo(response.data.publicInfo);
      setProfilePhotos(response.data.profilePhotos);

      const result = await calculateAverageVotes(
        response.data.observerVote,
        response.data.observers,
      );
      setAverageVote(result);
      console.log('result', result);
      //console.log('response', response.data.categories.categories);
      //const publicInfo = response.data.publicInfo;
      //setObservers([...observers, publicInfo]);

      //console.log(profilePhotos);

      setLoading(false);
      ///console.log(observers[4].phoneNumber);
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          size="large"
          color="#000000"
        />
      ) : (
        <>
          <View style={styles.categoryScrollView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.observerCategory}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category._id
                      ? styles.selectedCategory
                      : null,
                  ]}
                  onPress={() => setSelectedCategory(category._id)}>
                  <Text style={styles.categoryText}>
                    {category.observerCategory}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.flatListView}>
            <FlatList
              data={observers.filter(
                observers => observers.observerCategory === selectedCategory,
              )}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <View
                  key={item._id}
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 3,
                    backgroundColor: '#f7f7f7',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      margin: 5,
                      flex: 1,
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 2,
                        borderBottomWidth: 2,
                      }}>
                      {profilePhotos.map(photo => {
                        if (photo.observerEmail === item.email) {
                          const uri = `data:image/jpeg;base64,${photo.photoData}`;
                          return (
                            <Image
                              key={item.email}
                              source={{uri: uri}}
                              style={{
                                width: imageWidth / 1.2,
                                height: imageWidth / 1.2,
                                borderRadius: imageWidth / 5,
                              }}
                            />
                          );
                        }
                      })}

                      {averageVote.map(vote => {
                        if (vote.observer === item.email) {
                          return (
                            <View
                              key={vote.observer}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View style={[styles.vote]}>
                                <AirbnbRating
                                  count={5}
                                  reviews={[]}
                                  defaultRating={vote.averageVote}
                                  size={25}
                                  isDisabled={true}
                                />
                              </View>
                              <Text
                                key={vote.observer}
                                style={{color: '#000000'}}>
                                <Text key={vote.observer}>
                                  {vote.averageVote} | {vote.voteLength} votes
                                </Text>
                              </Text>
                            </View>
                          );
                        }
                      })}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        borderColor: 'black',
                        margin: 5,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          marginTop: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>
                          Observer Name :
                        </Text>
                        {item.name}
                      </Text>
                      {publicInfo.map(info => {
                        if (info.email === item.email) {
                          return (
                            <Text
                              key={info.emailForContact}
                              style={{
                                color: 'black',
                                marginTop: 10,
                              }}>
                              <Text style={{fontWeight: 'bold'}}>Email :</Text>{' '}
                              {info.emailForContact}
                            </Text>
                          );
                        }
                      })}

                      <Text
                        style={{
                          color: 'black',
                          marginTop: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>Phone Number :</Text>
                        {publicInfo.map(info => {
                          if (item.email === info.email) {
                            console.log(info.email);
                            return (
                              <Text key={info.phoneNumber}>
                                {info.phoneNumber}
                              </Text>
                            );
                          }
                        })}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          marginTop: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>Address :</Text>
                        {publicInfo.map(info => {
                          if (item.email === info.email) {
                            console.log(info.email);
                            return (
                              <Text key={info.address}>{info.address}</Text>
                            );
                          }
                        })}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      margin: 5,
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '30%',
                        backgroundColor: '#ffcccc',
                        borderWidth: 1,
                        borderRadius: 10,
                        height: height / 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        color: '#000000',
                      }}
                      onPress={() => {
                        navigation.navigate('Send Complaint', {
                          observerEmail: item.email,
                          observerName: item.name,
                        });
                      }}>
                      <Text style={{color: '#000000', fontWeight: '500'}}>
                        Send Complaint
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '30%',
                        backgroundColor: '#d5e2d9',
                        borderRadius: 10,
                        borderWidth: 1,
                        height: height / 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        color: '#000000',
                      }}
                      onPress={() => {
                        navigation.navigate('Send Request', {
                          observerEmail: item.email,
                          observerName: item.name,
                        });
                      }}>
                      <Text style={{color: '#000000', fontWeight: '500'}}>
                        Send Request
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '30%',
                        backgroundColor: '#d1eaff',
                        borderRadius: 10,
                        borderWidth: 1,
                        height: height / 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        color: '#000000',
                      }}
                      onPress={() => {
                        navigation.navigate('Send Suggestion', {
                          observerEmail: item.email,
                          observerName: item.name,
                        });
                      }}>
                      <Text style={{color: '#000000', fontWeight: '500'}}>
                        Send Suggestion
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryScrollView: {
    height: '8.5%',
    backgroundColor: '#e6e6e6',
    borderBottomWidth: 2,
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  vote: {
    width: '60%',
  },
  categoryItem: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: '#94e696',
  },
  categoryText: {
    color: '#000000',
    fontSize: imageWidth / 11,
  },
  flatListView: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    height: '91.5%',
  },
  selectedCategory: {
    backgroundColor: '#93a994',
  },
});
export default HomeScreen;
