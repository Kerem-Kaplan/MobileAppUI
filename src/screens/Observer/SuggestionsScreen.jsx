import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import {serverUrl} from '../../constants/serverUrl';
import {useEffect, useRef, useState} from 'react';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const url = serverUrl + '/observer/get-suggestions';

const SuggestionsScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.elastic(1.5), // Elastik animasyon efekti
      useNativeDriver: true,
    }).start();
  };

  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState('');

  const getSuggestions = async () => {
    await getToken()
      .then(async token => {
        await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(result => {
            //console.log('result.data.requestContent', result.data);
            setSuggestions(result.data);
            //console.log('complaint', complaints.length);
            setLoading(false);
          })
          .catch(error => {
            console.log(error.response.data);
            setMessage(error.response.data.message);
            //alert(error.response.data.message);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSuggestions();
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          size="large"
          color="#000000"
        />
      ) : suggestions.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ededed',
              transform: [{scale: scaleValue}],
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 24, color: '#000000'}}>{message}</Text>
          </Animated.View>
        </View>
      ) : (
        <View style={styles.flatListView}>
          <FlatList
            data={suggestions}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <>
                <View style={styles.flatListViewContent}>
                  <View style={styles.flatListViewContentItems}>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>DATE SENT :</Text>
                      {item.createdAt.replace(/[TZ]/g, ' ')}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>USER NAME :</Text>
                      {item.userName}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>USER SURNAME :</Text>{' '}
                      {item.userSurname}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>USER GENDER :</Text>
                      {item.userGender}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        USER NATIONALITY :
                      </Text>
                      {item.userNationality}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>USER EMAIL :</Text>
                      {item.userEmail}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        USER PHONE NUMBER :
                      </Text>
                      {item.userPhoneNumber}
                    </Text>
                    {Object.keys(item.suggestionContent.demands).map(key => (
                      <Text
                        key={key}
                        style={{
                          color: 'black',
                          marginTop: 10,
                        }}>
                        <Text key={key} style={{fontWeight: 'bold'}}>
                          {key.toUpperCase()}:
                        </Text>
                        {item.suggestionContent.demands[key]}
                      </Text>
                    ))}
                    {item.file === ' ' ? (
                      <View style={{marginBottom: 10}}></View>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 2,
                        }}>
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${item.file}`,
                          }}
                          style={{
                            width: imageWidth / 1.2,
                            height: imageWidth / 1.2,
                            margin: '5%',
                            borderRadius: imageWidth / 20,
                          }}></Image>
                      </View>
                    )}
                  </View>
                </View>
              </>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListView: {
    backgroundColor: '#ffffff',
    height: '100%',
    flexDirection: 'column',
    padding: 5,
  },
  flatListViewContent: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 25,
    margin: 3,
    backgroundColor: '#ededed',
  },
  flatListViewContentItems: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: 'black',
    margin: 5,
  },
});

export default SuggestionsScreen;
