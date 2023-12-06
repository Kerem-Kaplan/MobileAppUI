import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faTableList, faUser} from '@fortawesome/free-solid-svg-icons';
import {useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';
import MenuPageNavigation from './MenuPageNavigation';
import ProfilePageNavigation from './ProfilePageNavigation';
import HomePageNavigation from './HomePageNavigation';
const Tab = createBottomTabNavigator();

const UserMainPageBottomNavigation = ({navigation}) => {
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
        name="UserHome"
        navigationKey="Home"
        component={HomePageNavigation}
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
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
          tabBarActiveBackgroundColor: '#17c428',
        }}
      />
      <Tab.Screen
        name="UserMenu"
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
            <FontAwesomeIcon icon={faTableList} color={color} size={size} />
          ),
          tabBarActiveBackgroundColor: '#17c428',
          tabBarBadgeStyle: {
            color: '#00ff66',
          },
        }}
      />
      <Tab.Screen
        name="UserProfile"
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
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
          tabBarActiveBackgroundColor: '#17c428',
        }}
      />
    </Tab.Navigator>
  );
};

export default UserMainPageBottomNavigation;
