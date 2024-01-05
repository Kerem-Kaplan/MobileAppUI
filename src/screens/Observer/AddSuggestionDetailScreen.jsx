import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {serverUrl} from '../../constants/serverUrl';
import {getToken} from '../../helpers/tokens';
import axios from 'axios';

const urlAdd = serverUrl + '/observer/add-suggestion-demand';
const urlGet = serverUrl + '/observer/get-suggestion-demand';

const AddSuggestionDetailScreen = () => {
  const [demand, setDemand] = useState('');
  const [demands, setDemands] = useState({});
  const [firstDemands, setFirstDemands] = useState({});

  const navigation = useNavigation();

  const onPressAdd = () => {
    if (demand.length > 2) {
      console.log(demand);
      const keyExists = demands.hasOwnProperty(demand);
      console.log('keyExists', keyExists);
      if (keyExists === true) {
        alert('You have that demand!');
      } else {
        const updateData = {...demands, [demand]: ''};
        setDemands(updateData);
        setDemand('');
      }
    } else {
      alert('Low character');
    }
    console.log('demands', demands);
  };

  const onPressDeleteIcon = key => {
    const updateData = {...demands};
    delete updateData[key];
    setDemands(updateData);
    console.log('demands', demands);
  };

  const onPressAddSubjectButton = () => {
    navigation.navigate('AddSubjectOfSuggestion');
  };

  const onPressAddSave = async () => {
    if (firstDemands !== demands) {
      await getToken().then(async token => {
        console.log(token);
        const result = await axios.post(
          urlAdd,
          {optionalDemands: demands},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(result);
      });
    } else {
      alert('Please Change Something!');
    }
  };

  const getSuggestionDemand = async () => {
    await getToken().then(async token => {
      await axios
        .get(urlGet, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(result => {
          console.log(result.data.optionalDemands);
          setDemands(result.data.optionalDemands);
          setFirstDemands(result.data.optionalDemands);
        })
        .catch(error => {
          console.log(error);
          //setDemands({});
          alert(error.response.data.message);
        });
    });
  };

  useEffect(() => {
    getSuggestionDemand();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{flexDirection: 'row', margin: 10, width: '85%'}}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Demands"
              placeholderTextColor="#000000"
              onChangeText={setDemand}
              value={demand}
            />
          </View>
          <TouchableOpacity onPress={onPressAdd} style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>

        {Object.entries(demands).map(([key, value]) => (
          <View
            key={key + 'View'}
            style={{
              flexDirection: 'row',
              margin: 15,
              width: '80%',
              borderBottomWidth: 0.5,
            }}>
            <View style={{width: '80%'}}>
              <Text
                style={{color: '#000000', fontSize: 18}}
                key={key + 'value'}>
                {key.toString()}
              </Text>
            </View>
            <View style={{width: '20%'}}>
              <TouchableOpacity
                onPress={() => onPressDeleteIcon(key)}
                style={{
                  marginLeft: 50,
                  justifyContent: 'center',
                }}
                key={key + 'Delete'}>
                <FontAwesomeIcon icon={faTrash} size={20} color="#ff0000" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={onPressAddSubjectButton}
          style={styles.addSubjectButton}>
          <Text style={styles.editText}>ADD SUBJECT OF SUGGESTION</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressAddSave} style={styles.signupButton}>
          <Text style={styles.editText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>BACK </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#7d7d7d',
    marginBottom: 20,
  },

  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#7d7d7d',
  },
  scrollView: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '85%',
    backgroundColor: '#d6edff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    color: '#000000',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  username: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 17,
  },
  nationality: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  id: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  email: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  phoneNumber: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  dateOfBirth: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 17,
  },
  bio: {
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    color: '#000000',
    margin: 5,
  },
  button: {
    backgroundColor: '#c1c7c2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  editText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 20,
  },
  backText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    width: '10%',
    backgroundColor: '#addaff',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#addaff',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  addSubjectButton: {
    width: '80%',
    backgroundColor: '#00ff00',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  backButton: {
    width: '80%',
    backgroundColor: '#ff0000',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  invalidInput: {
    borderColor: '#ff0000',
  },
});

export default AddSuggestionDetailScreen;
