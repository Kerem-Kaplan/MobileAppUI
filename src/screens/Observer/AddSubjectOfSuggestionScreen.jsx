import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {getToken} from '../../helpers/tokens';
import {serverUrl} from '../../constants/serverUrl';
import axios from 'axios';

const urlAdd = serverUrl + '/observer/add-subject-of-suggestion';
const urlget = serverUrl + '/observer/get-subject-of-suggestion';

const AddSubjectOfSuggestionScreen = () => {
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);

  const [resultLength, setResultLength] = useState(0);

  const [loading, setLoading] = useState(true);

  const onPressAdd = () => {
    if (subject.length > 2) {
      const updateData = {label: subject, value: subject};
      setSubjects([...subjects, updateData]);
      setSubject('');
    } else {
      alert('Low character');
    }
    console.log('demands', subjects);
  };

  const onPressDeleteIcon = key => {
    const updateData = subjects.filter(obj => obj.label !== key);
    console.log(updateData);
    setSubjects(updateData);
    console.log('demands', subjects);
  };

  const getSubjectOfSuggestion = async () => {
    await getToken()
      .then(async token => {
        await axios
          .get(urlget, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(result => {
            console.log(result.data);
            console.log(result.data.subjectOfSuggestion);
            setSubjects(result.data.subjectOfSuggestion);
            console.log(typeof subjects);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const onPressSave = async () => {
    console.log(typeof subjects);
    await getToken()
      .then(async token => {
        const result = await axios
          .post(
            urlAdd,
            {subjectOfSuggestion: subjects},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(result => {
            console.log(result.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getSubjectOfSuggestion();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          size="large"
          color="#000000"
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Add subject of Suggestion</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Demands"
              placeholderTextColor="#000000"
              onChangeText={setSubject}
              value={subject}
            />
          </View>

          {subjects.map(object => (
            <View key={object.label} style={{flexDirection: 'row', margin: 10}}>
              <Text style={{color: '#000000', fontSize: 15}} key={object.label}>
                {object.label.toString()}:{object.label.toString()}
              </Text>
              <TouchableOpacity
                onPress={() => onPressDeleteIcon(object.label)}
                style={{
                  marginLeft: 50,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
                key={object.label + 'Button'}>
                <FontAwesomeIcon icon={faTrash} size={15} color="#ff0000" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity onPress={onPressAdd} style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressSave} style={styles.signupButton}>
            <Text style={styles.editText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>BACK </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
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
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#addaff',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  backButton: {
    width: '80%',
    backgroundColor: '#ff0000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  invalidInput: {
    borderColor: '#ff0000',
  },
});

export default AddSubjectOfSuggestionScreen;
