import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../../screens/User/MenuScreen';
import PastComplaintScreen from '../../screens/User/PastComplaintScreen';
import PastRequestScreen from '../../screens/User/PastRequestScreen';
import PastSuggestionScreen from '../../screens/User/PastSuggestionScreen';

const Stack = createStackNavigator();
const MenuPageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuPage"
        component={MenuScreen}
        options={{
          headerLeft: null,
          headerTitle: 'Menu Page',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="PastComplaints"
        component={PastComplaintScreen}
        options={{
          headerTitle: 'Past Complaints',
          headerStyle: {
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="PastRequests"
        component={PastRequestScreen}
        options={{
          headerTitle: 'Past Requests',
          headerStyle: {
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="PastSuggestions"
        component={PastSuggestionScreen}
        options={{
          headerTitle: 'Past Suggestions',
          headerStyle: {
            backgroundColor: '#c8f9cd',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MenuPageNavigation;
