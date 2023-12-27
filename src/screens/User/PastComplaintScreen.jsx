import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {serverUrl} from '../../constants/serverUrl';
import {useEffect, useState} from 'react';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const url = serverUrl + '/user/past-complaints';

/* const complaints = [
  {
    observerName: 'İşletme 1',
    vote: 1,
    subject: 'Example Subject1',
    demands: {
      date: '9.12.2023',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  },
  {
    observerName: 'İşletme 3',
    vote: 1,
    subject: 'Example Subject1',
    demands: {
      date: '9.12.2023',
      place: 'Place',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  },
  {
    observerName: 'İşletme 2',
    vote: 1,
    subject: 'Example Subject1',
    demands: {
      date: '9.12.2023',
      time: 'Time 2',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  },
]; */

const PastComplaintScreen = () => {
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
            console.log('result.data.complaintContent', result.data.length);
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
      ) : resultLength === 0 ? (
        <Text style={{color: '#000000'}}>No Result</Text>
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
                  backgroundColor: '#ffa8a8',
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
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 2,
                  }}>
                  <Image
                    source={require('../../assets/appIcon.png')}
                    style={{
                      width: imageWidth / 1.2,
                      height: imageWidth / 1.2,
                      margin: '5%',
                      borderRadius: imageWidth / 20,
                    }}></Image>
                </View>
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

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
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
    height: '100%',
    flexDirection: 'column',
  },
  selectedCategory: {
    backgroundColor: '#93a994',
  },
});

export default PastComplaintScreen;
