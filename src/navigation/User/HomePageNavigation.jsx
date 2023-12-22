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
