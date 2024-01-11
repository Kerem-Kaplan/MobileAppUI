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

const url = serverUrl + '/observer/get-complaints';

const ComplaintsScreen = () => {
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
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
        //alert(error.response.data.message);
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
          <View>
            <FlatList
              data={complaints}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
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
                      <Text style={{fontWeight: 'bold'}}>USER SURNAME :</Text>
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
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>SUBJECT :</Text>
                      {item.complaintContent.subject}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>VOTE :</Text>
                      {item.vote}
                    </Text>
                    {Object.keys(item.complaintContent.demands).map(key => (
                      <Text
                        key={key}
                        style={{
                          color: 'black',
                          marginTop: 10,
                        }}>
                        <Text key={key} style={{fontWeight: 'bold'}}>
                          {key.toUpperCase()}:
                        </Text>
                        {item.complaintContent.demands[key]}
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
                </View>
              )}
            />
          </View>
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
    margin: 2,
  },
  flatListViewContent: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    backgroundColor: '#ededed',
  },
  flatListViewContentItems: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: 'black',
    margin: 5,
  },
});

export default ComplaintsScreen;
