import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/User/ProfileScreen';
import EditProfileScreen from '../../screens/User/EditProfileScreen';

const Stack = createStackNavigator();
const ProfilePageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilePage"
        component={ProfileScreen}
        options={{
          headerLeft: null,
          headerTitle: 'Profile Page',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#c8f9cd',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfilePageNavigation;
