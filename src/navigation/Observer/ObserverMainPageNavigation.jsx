import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faTableList, faUser} from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../../screens/Observer/HomeScreen';
import MenuPageNavigation from './MenuPageNavigation';
import ProfilePageNavigation from './ProfilePageNavigation';
import {useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';

const Tab = createBottomTabNavigator();

const ObserverMainPageBottomNavigation = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Uygulamadan çıkmak istediğinize emin misiniz?', '', [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => navigation.navigate('Login'), // Uygulamadan çıkış yap
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#000000',
      }}>
      <Tab.Screen
        name="ObserverHome"
        navigationKey="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#17c428',
            borderBottomWidth: 2,
            borderBottomColor: '#000000',
            height: 0,
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faHome} color={'#17c428'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#c4c4c4',
        }}
      />
      <Tab.Screen
        name="ObserverMenu"
        component={MenuPageNavigation}
        options={{
          tabBarLabel: 'Menu',
          headerStyle: {
            backgroundColor: '#17c428',
            borderBottomWidth: 2,
            borderBottomColor: '#000000',
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faTableList} color={'#17c428'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#c4c4c4',
        }}
      />
      <Tab.Screen
        name="ObserverProfile"
        component={ProfilePageNavigation}
        options={{
          tabBarLabel: 'Profile',
          headerStyle: {
            backgroundColor: '#17c428',
            borderBottomWidth: 2,
            borderBottomColor: '#000000',
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faUser} color={'#17c428'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#c4c4c4',
        }}
      />
    </Tab.Navigator>
  );
};

export default ObserverMainPageBottomNavigation;
