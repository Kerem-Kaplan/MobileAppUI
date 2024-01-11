import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
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

const url = serverUrl + '/user/past-complaints';

const PastComplaintScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.elastic(1.5), // Elastik animasyon efekti
      useNativeDriver: true,
    }).start();
  };

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const getComplaints = async () => {
    const token = await getToken();

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(result => {
        //console.log('result.data.complaintContent', result.data);
        setComplaints(result.data);
        //console.log('complaint', complaints.length);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setMessage(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getComplaints();
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
      ) : complaints.length === 0 ? (
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
            data={complaints}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  borderWidth: 1,
                  borderRadius: 25,
                  margin: 3,
                  backgroundColor: '#ffcccc',
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
                    <Text style={{fontWeight: 'bold'}}>Vote :</Text> {item.vote}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Subject :</Text>{' '}
                    {item.complaintContent.subject}
                  </Text>
                  {Object.keys(item.complaintContent.demands).map(key => (
                    <Text
                      key={key}
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>{key}:</Text>
                      {item.complaintContent.demands[key]}
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

export default PastComplaintScreen;
