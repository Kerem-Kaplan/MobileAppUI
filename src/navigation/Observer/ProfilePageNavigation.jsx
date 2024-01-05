import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/Observer/ProfileScreen';
import EditProfileScreen from '../../screens/Observer/EditProfileScreen';

const Stack = createStackNavigator();
const ProfilePageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            height: 0,
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
