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
        <View>
          <View style={{alignItems: 'center', margin: 10}}>
            <Text style={{color: '#000000', fontSize: 20}}>Complaints</Text>
          </View>
          <View style={styles.flatListView}>
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
                      <Text style={{fontWeight: 'bold'}}>User Name :</Text>
                      {item.userName}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>User Surname :</Text>
                      {item.userSurname}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>User Gender :</Text>
                      {item.userGender}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        User Nationality :
                      </Text>
                      {item.userNationality}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>User Email :</Text>
                      {item.userEmail}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        User Phone Number :
                      </Text>
                      {item.userPhoneNumber}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Subject :</Text>
                      {item.complaintContent.subject}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Vote :</Text>
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
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
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

export default ComplaintsScreen;
