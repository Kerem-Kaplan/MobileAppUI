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
          headerTitle: 'Send Complaint',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
      <Stack.Screen
        name="SendRequest"
        component={SendRequestScreen}
        options={{
          headerTitle: 'Send Request',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
      <Stack.Screen
        name="SendSuggestion"
        component={SendSuggestionScreen}
        options={{
          headerTitle: 'Send Suggestion',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomePageNavigation;
