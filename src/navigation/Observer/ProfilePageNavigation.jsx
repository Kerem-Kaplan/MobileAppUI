import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/User/ProfileScreen';
import EditProfileScreen from '../../screens/User/EditProfileScreen';

const Stack = createStackNavigator();
const ProfilePageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu Page"
        component={ProfileScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            height: 0,
          },
        }}
      />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfilePageNavigation;
