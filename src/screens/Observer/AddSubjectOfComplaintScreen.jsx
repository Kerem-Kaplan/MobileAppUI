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
import {useNavigation} from '@react-navigation/native';

const urlAdd = serverUrl + '/observer/add-subject-of-complaint';
const urlget = serverUrl + '/observer/get-subject-of-complaint';

const AddSubjectOfComplaintScreen = () => {
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [firstSubjects, setFirstSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const onPressAdd = () => {
    if (subject.length > 2) {
      const updateData = {label: subject, value: subject};
      const foundedItem = subjects.find(
        item => item.label === updateData.label,
      );
      console.log('foundedItem', foundedItem);
      if (foundedItem) {
        alert('You have that demand!');
      } else {
        setSubjects([...subjects, updateData]);
        setSubject('');
      }
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

  const getSubjectOfComplaint = async () => {
    const token = await getToken();
    await axios
      .get(urlget, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(result => {
        console.log(result.data.subjectOfComplaint);
        setSubjects(result.data.subjectOfComplaint);
        setFirstSubjects(result.data.subjectOfComplaint);
        setLoading(false);
      })
      .catch(error => {
        console.log('error.response.data', error.response.data);
        setSubjects(error.response.data.subjectOfComplaint);
        alert(error.response.data.message);
        setLoading(false);
      });
  };

  const onPressSave = async () => {
    if (firstSubjects !== subjects) {
      const token = await getToken();

      await axios
        .post(
          urlAdd,
          {subjectOfComplaint: subjects},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(result => {
          console.log('result', result.data);
          console.log('firstSubjects', firstSubjects);
          setFirstSubjects(subjects);
          alert(result.data.message);
        })

        .catch(error => {
          console.log('error.response', error);
          //alert(error.response.data.message);
        });
    } else {
      alert('Please Change Something!');
    }
  };
  const onPressBackButton = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getSubjectOfComplaint();
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
          <View style={{flexDirection: 'row', margin: 10, width: '85%'}}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Add Demands"
                placeholderTextColor="#ffffff"
                onChangeText={setSubject}
                value={subject}
              />
            </View>
            <TouchableOpacity onPress={onPressAdd} style={styles.addButton}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>

          {subjects.map(object => (
            <View
              key={object.label}
              style={{
                flexDirection: 'row',
                margin: 15,
                width: '80%',
                borderBottomWidth: 0.5,
              }}>
              <View style={{width: '80%'}}>
                <Text
                  style={{color: '#000000', fontSize: 18}}
                  key={object.label}>
                  {object.label.toString()}
                </Text>
              </View>
              <View style={{width: '20%'}}>
                <TouchableOpacity
                  onPress={() => onPressDeleteIcon(object.label)}
                  style={{
                    marginLeft: 50,
                    justifyContent: 'center',
                  }}
                  key={object.label + 'Button'}>
                  <FontAwesomeIcon icon={faTrash} size={20} color="#ff4d4d" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity onPress={onPressSave} style={styles.saveButton}>
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressBackButton}
            style={styles.backButton}>
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
    backgroundColor: '#ffffff',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '85%',
    backgroundColor: '#b8adad',
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

  addText: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20,
  },
  backText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    width: '10%',
    backgroundColor: '#b8adad',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  saveButton: {
    width: '80%',
    backgroundColor: '#b8adad',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  backButton: {
    width: '80%',
    backgroundColor: '#ff0000',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
});

export default AddSubjectOfComplaintScreen;
