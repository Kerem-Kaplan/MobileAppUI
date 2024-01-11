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
import {useNavigation} from '@react-navigation/native';
import {serverUrl} from '../../constants/serverUrl';
import axios from 'axios';
import {getToken} from '../../helpers/tokens';

const urlAdd = serverUrl + '/observer/add-request-demand';

const urlGet = serverUrl + '/observer/get-request-demand';
const AddRequestDetailScreen = () => {
  const [demand, setDemand] = useState('');
  const [demands, setDemands] = useState({});
  const [firstDemands, setFirstDemands] = useState({});
  const [loading, setLoading] = useState(true);

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
    navigation.navigate('AddSubjectOfRequest');
  };

  const onPressAddSave = async () => {
    if (firstDemands !== demands) {
      const token = await getToken();
      console.log(token);
      await axios
        .post(
          urlAdd,
          {optionalDemands: demands},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(result => {
          console.log(result.data);
          alert(result.data.message);
          setFirstDemands(demands);
        })
        .catch(error => {
          console.log(error.response);
          alert(error.response);
        });
    } else {
      alert('Please Change Something!');
    }
  };

  const getRequestDemand = async () => {
    const token = await getToken();
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

        setLoading(false);
      })
      .catch(error => {
        setDemands(error.response.data.optionalDemands);
        console.log(error);
        alert(error.response.data.message);
        setLoading(false);
      });
  };
  const onPressBackButton = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getRequestDemand();
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
                margin: 10,
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
            <Text style={styles.editText}>ADD SUBJECT OF REQUESTS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressAddSave} style={styles.saveButton}>
            <Text style={styles.editText}>SAVE</Text>
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
    color: '#000000',
    backgroundColor: '#ffffff',
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
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  saveButton: {
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
    backgroundColor: '#b8adad',
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
