import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SendComplaintScreen from '../../screens/User/SendComplaintScreen';
import MenuScreen from '../../screens/User/MenuScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../../screens/User/HomeScreen';
import SendRequestScreen from '../../screens/User/SendRequestScreen';
import SendSuggestionScreen from '../../screens/User/SendSuggestionScreen';
import PastComplaintScreen from '../../screens/User/PastComplaintScreen';
import PastRequestScreen from '../../screens/User/PastRequestScreen';
import PastSuggestionScreen from '../../screens/User/PastSuggestionScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const MenuPageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu Page"
        component={MenuScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            height: 0,
          },
        }}
      />
      <Stack.Screen name="Send Complaint" component={SendComplaintScreen} />
      <Stack.Screen name="Send Request" component={SendRequestScreen} />
      <Stack.Screen name="Send Suggestion" component={SendSuggestionScreen} />
      <Stack.Screen name="Past Complaints" component={PastComplaintScreen} />
      <Stack.Screen name="Past Requests" component={PastRequestScreen} />
      <Stack.Screen name="Past Suggestions" component={PastSuggestionScreen} />
    </Stack.Navigator>
  );
};

export default MenuPageNavigation;
