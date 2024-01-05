import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {serverUrl} from '../../constants/serverUrl';
import {useEffect, useState} from 'react';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

/* const allComplaints = [
  {
    username: 'John',
    userSurname: 'Doe',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'john@gmail.com',
    userPhoneNumber: '01111111111',
    vote: 3,
    complaintContent: {
      content1: 'Content1',
      content2: 'Content2',
    },
  },
  {
    username: 'Alvin',
    userSurname: 'Patrick',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'alvin@gmail.com',
    userPhoneNumber: '02222222222',
    vote: 2,
    complaintContent: {
      content1: 'Content3',
      content2: 'Content4',
    },
  },
  {
    username: 'Fernando',
    userSurname: 'Muslera',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'fernando@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
    complaintContent: {
      content1: 'Content5',
      content2: 'Content6',
    },
  },
  {
    username: 'Erlink 1',
    userSurname: 'Haaland',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'erlink1@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
    complaintContent: {
      content1: 'Content7',
      content2: 'Content8',
    },
  },
  {
    username: 'Erlink',
    userSurname: 'Haaland',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'erlink@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
    complaintContent: {
      content1: 'Content9',
      content2: 'Content10',
    },
  },
]; */

const url = serverUrl + '/observer/get-complaints';

const ComplaintsScreen = () => {
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);
  const [resultLength, setResultLength] = useState(0);
  const [error, setError] = useState('');

  const getComplaints = async () => {
    await getToken()
      .then(async token => {
        await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(result => {
            console.log('result.data.complaintContent', result.data);
            setComplaints(result.data);
            setResultLength(result.data.length);
            console.log('complaint', complaints.length);
            console.log('length', resultLength);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            if (error.response.status === 404) {
              setResultLength(0);
            }
            setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          size="large"
          color="#000000"
        />
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
