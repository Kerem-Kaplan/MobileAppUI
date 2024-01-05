import {createStackNavigator} from '@react-navigation/stack';
import SendComplaintScreen from '../../screens/User/SendComplaintScreen';
import HomeScreen from '../../screens/User/HomeScreen';
import SendRequestScreen from '../../screens/User/SendRequestScreen';
import SendSuggestionScreen from '../../screens/User/SendSuggestionScreen';

const Stack = createStackNavigator();
const HomePageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{
          headerLeft: null,
          headerTitle: 'Home Page',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="SendComplaint"
        component={SendComplaintScreen}
        options={{
          headerLeft: null,
          headerTitle: 'Send Complaint',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="SendRequest"
        component={SendRequestScreen}
        options={{
          headerLeft: null,
          headerTitle: 'Send Request',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="SendSuggestion"
        component={SendSuggestionScreen}
        options={{
          headerLeft: null,
          headerTitle: 'Send Suggestion',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomePageNavigation;
