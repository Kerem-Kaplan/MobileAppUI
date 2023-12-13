import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {AirbnbRating, Rating} from 'react-native-ratings';

const SendComplaintScreen = ({navigation}) => {
  const [vote, setVote] = useState(0);
  const [subject, setSubject] = useState('');

  //databaseden ilgili gözlemcinin istekleri alınacak
  const [demands, setDemands] = useState({
    demand1: '',
    demand2: '',
    demand3: '',
  });

  const handleChange = (key, value) => {
    console.log('Key:', key, 'Index:', value);
    setDemands({...demands, [key]: value});
    console.log('Answerss', demands);
  };

  const onPressSend = () => {
    alert(Object.values(demands).toString());
  };

  const onPressBack = () => {
    navigation.navigate('Menu Page');
  };

  const handleSubjectChange = subject => {
    setSubject(subject);
    console.log(subject);
  };

  const subjects = [
    {label: 'Subject1', value: 'Subject1'},
    {label: 'Subject2', value: 'Subject2'},
  ];

  const onStarRatingPress = rating => {
    setVote(rating); // Kullanıcının seçtiği yıldız sayısı
    console.log(rating);
    // Burada, seçilen yıldız sayısını işleyebilirsiniz (örneğin, bir API'ye göndermek)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Send Complaint</Text>
        <View
          style={{
            alignItems: 'center',
            margin: 5,
            width: '85%',
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('../../assets/appIcon.png')}
            style={styles.profilePic}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderColor: 'black',
              margin: 5,
            }}>
            <Text style={styles.observerName}>Observer A</Text>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            margin: 5,
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000000',
              width: '25%',
              fontSize: 15,
              justifyContent: 'center',
            }}>
            Vote:
          </Text>
          <View style={[styles.vote]}>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good']}
              defaultRating={3}
              size={25}
              onFinishRating={rating => onStarRatingPress(rating)}
            />
          </View>
        </View>

        <View style={[styles.selectSubject]}>
          <RNPickerSelect
            placeholder={{
              color: '#ffa8a8',
              label: 'Select a Subject',
              value: null,
            }}
            style={{placeholder: {color: '#000000', margin: -15}}}
            items={subjects}
            onValueChange={handleSubjectChange}
            value={subject}
          />
        </View>
        <View style={[styles.inputView]}>
          <TouchableOpacity>
            <Text style={{color: '#000000', fontSize: 15}}>
              Select File Photo or Video
            </Text>
          </TouchableOpacity>
        </View>

        {Object.keys(demands).map(key => (
          <View key={key} style={styles.inputView}>
            <TextInput
              style={{height: 40, color: '#000000'}}
              key={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              placeholderTextColor={'#000000'}
              value={demands[key]}
              onChangeText={value => handleChange(key, value)}
            />
          </View>
        ))}
        <TouchableOpacity onPress={onPressSend} style={styles.sendButton}>
          <Text style={styles.sendText}>SEND </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <Text style={styles.backText}>BACK </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ffa8a8',
    marginBottom: 15,
  },

  inputView: {
    width: '85%',
    backgroundColor: '#ffa8a8',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  selectSubject: {
    width: '85%',
    color: '#000000',
    backgroundColor: '#ffa8a8',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  vote: {
    width: '60%',
    borderRadius: 10,
    marginBottom: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },

  sendText: {
    color: '#000000',
  },
  backText: {
    color: '#ffffff',
  },
  sendButton: {
    width: '85%',
    backgroundColor: '#eabdbd',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  backButton: {
    width: '85%',
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
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#93a994',
  },
  observerName: {
    fontSize: 25,
    fontWeight: '300',
    marginBottom: 5,
    color: '#000000',
  },
});

export default SendComplaintScreen;
