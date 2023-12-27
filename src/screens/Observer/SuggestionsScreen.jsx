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

/* const complaints = [

  
  {
    id: 1,
    username: 'John',
    userSurname: 'Doe',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'john@gmail.com',
    userPhoneNumber: '01111111111',
    vote: 3,
  },
  {
    id: 2,
    username: 'Alvin',
    userSurname: 'Patrick',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'alvin@gmail.com',
    userPhoneNumber: '02222222222',
    vote: 2,
  },
  {
    id: 3,
    username: 'Fernando',
    userSurname: 'Muslera',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'fernando@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
  },
  {
    id: 4,
    username: 'Erlink',
    userSurname: 'Haaland',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'erlink@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
  },
  {
    id: 5,
    username: 'Erlink',
    userSurname: 'Haaland',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'erlink@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
  },
]; */

const url = serverUrl + '/observer/get-suggestions';

const SuggestionsScreen = () => {
  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [resultLength, setResultLength] = useState(0);
  const [error, setError] = useState('');

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
            console.log('result.data.requestContent', result.data);
            setSuggestions(result.data);
            setResultLength(result.data.length);
            //console.log('complaint', complaints.length);
            console.log('length', resultLength);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);

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
            <Text style={{color: '#000000', fontSize: 20}}>Suggestions</Text>
          </View>
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
                        <Text style={{fontWeight: 'bold'}}>User Name :</Text>
                        {item.userName}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          marginTop: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>User Surname :</Text>{' '}
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
                        <Text style={{fontWeight: 'bold'}}>User Phone :</Text>
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
                    </View>
                  </View>
                </>
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
