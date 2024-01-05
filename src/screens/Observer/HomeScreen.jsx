import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import ComplaintsScreen from './ComplaintsScreen';
import {useEffect} from 'react';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const complaints = [
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
];

const HomeScreen = () => {
  /*  useEffect(() => {
    const backAction = () => {
      Alert.alert('Uygulamadan çıkmak istediğinize emin misiniz?', '', [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            navigation.navigate('Login'); // Uygulamadan çıkış yap
            await removeToken();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }); */
  return (
    <>
      <View style={{alignItems: 'center', margin: 10}}>
        <Text style={{color: '#000000', fontSize: 20}}>Complaints</Text>
      </View>
      <ComplaintsScreen></ComplaintsScreen>
    </>
  );
};

export default HomeScreen;
