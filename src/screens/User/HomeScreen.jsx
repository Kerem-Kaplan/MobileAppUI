import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {serverUrl} from '../../constants/serverUrl';
import {AirbnbRating} from 'react-native-ratings';
import {calculateAverageVotes} from '../../utils/calculateAverageVotes';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const url = serverUrl + '/user/homepage';

const HomeScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
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
            },
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [navigation]),
  );

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
    const token = await getToken();
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async result => {
        setSelectedCategory(result.data.categories[0]._id);
        //console.log(response.data);
        console.log('response.data.categories', result.data.categories);
        console.log('response.data.observers', result.data.observers);
        console.log('response.data.publicInfo', result.data.publicInfo);
        console.log('response.data.observerVote', result.data.observerVote);
        //console.log('response.data.profilePhotos', response.data.profilePhotos);
        //console.log(response.data);
        setObservers(result.data.observers);
        setCategories(result.data.categories);
        setPublicInfo(result.data.publicInfo);
        setProfilePhotos(result.data.profilePhotos);

        const averageVote = await calculateAverageVotes(
          result.data.observerVote,
          result.data.observers,
        );

        console.log('averageVoteeeeeeeeeeeeeee', averageVote);
        setAverageVote(averageVote);

        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });

    ///console.log(observers[4].phoneNumber);
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
                                  average :
                                  {isNaN(vote.averageVote)
                                    ? 0
                                    : vote.averageVote}{' '}
                                  | {vote.voteLength} votes
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
                        navigation.navigate('SendComplaint', {
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
                        navigation.navigate('SendRequest', {
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
                        navigation.navigate('SendSuggestion', {
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
