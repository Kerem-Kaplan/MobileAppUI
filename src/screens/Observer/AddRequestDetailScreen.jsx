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
import axios from 'axios';
import {getToken} from '../../helpers/tokens';

const urlAdd = serverUrl + '/observer/add-request-demand';

const urlGet = serverUrl + '/observer/get-request-demand';
const AddRequestDetailScreen = () => {
  const [demand, setDemand] = useState('');
  const [demands, setDemands] = useState({});

  const navigation = useNavigation();

  const onPressAdd = () => {
    if (demand.length > 2) {
      const updateData = {...demands, [demand]: ''};
      setDemands(updateData);
      setDemand('');
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
    navigation.navigate('Add Subject Of Request');
  };

  const onPressAddSave = async () => {
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
  };

  const getRequestDemand = async () => {
    await getToken().then(async token => {
      const result = await axios.get(urlGet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data.optionalDemands);
      setDemands(result.data.optionalDemands);
      console.log(typeof subjects);
    });
  };

  useEffect(() => {
    getRequestDemand();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Add Request Demands</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Add Demands"
            placeholderTextColor="#000000"
            onChangeText={setDemand}
            value={demand}
          />
        </View>

        {Object.entries(demands).map(([key, value]) => (
          <View key={key + 'View'} style={{flexDirection: 'row', margin: 10}}>
            <Text style={{color: '#000000', fontSize: 15}} key={key + 'value'}>
              {key.toString()}:{value.toString()}
            </Text>
            <TouchableOpacity
              onPress={() => onPressDeleteIcon(key)}
              style={{marginLeft: 50, borderWidth: 1, justifyContent: 'center'}}
              key={key + 'Delete'}>
              <FontAwesomeIcon icon={faTrash} size={15} color="#ff0000" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={onPressAdd} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressAddSubjectButton}
          style={styles.addSubjectButton}>
          <Text style={styles.editText}>ADD SUBJECT OF REQUESTS</Text>
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
    backgroundColor: '#c3d5c8',
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
    backgroundColor: '#9fbca7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#9fbca7',
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

export default AddRequestDetailScreen;
