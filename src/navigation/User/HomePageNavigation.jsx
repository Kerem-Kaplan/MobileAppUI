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

const Stack = createStackNavigator();
const HomePageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Page"
        component={HomeScreen}
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
    </Stack.Navigator>
  );
};

export default HomePageNavigation;
