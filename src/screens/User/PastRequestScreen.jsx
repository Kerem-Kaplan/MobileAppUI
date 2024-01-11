import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import {serverUrl} from '../../constants/serverUrl';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const url = serverUrl + '/user/past-requests';

const PastRequestScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.elastic(1.5), // Elastik animasyon efekti
      useNativeDriver: true,
    }).start();
  };

  const [requests, setRequest] = useState([]);

  const [loading, setLoading] = useState(true);
  const [resultLength, setResultLength] = useState(0);

  const [message, setMessage] = useState('');

  const getRequest = async () => {
    const token = await getToken();
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(result => {
        //console.log('result.data.requestContent', result.data.length);
        setRequest(result.data);
        setResultLength(result.data.length);
        console.log('complaint', requests.length);
        //console.log('length', resultLength);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setMessage(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getRequest();
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
      ) : requests.length === 0 ? (
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
            data={requests}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  borderWidth: 1,
                  borderRadius: 25,
                  margin: 3,
                  backgroundColor: '#d5e2d9',
                }}>
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
                    <Text style={{fontWeight: 'bold'}}>Date Sent :</Text>
                    {item.createdAt.replace(/[TZ]/g, ' ')}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Observer Name :</Text>
                    {item.observerName}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Subject :</Text>{' '}
                    {item.requestContent.subject}
                  </Text>
                  {Object.keys(item.requestContent.demands).map(key => (
                    <Text
                      key={key}
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>{key}:</Text>
                      {item.requestContent.demands[key]}
                    </Text>
                  ))}
                </View>
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
                      source={{uri: `data:image/jpeg;base64,${item.file}`}}
                      style={{
                        width: imageWidth / 1.2,
                        height: imageWidth / 1.2,
                        margin: '5%',
                        borderRadius: imageWidth / 20,
                      }}></Image>
                  </View>
                )}
              </View>
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
  },
});

export default PastRequestScreen;
