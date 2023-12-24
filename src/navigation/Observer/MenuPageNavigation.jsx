import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../../screens/Observer/MenuScreen';
import AddComplaintDetailScreen from '../../screens/Observer/AddComplaintDetailScreen';
import AddRequestDetailScreen from '../../screens/Observer/AddRequestDetail';
import AddSuggestionDetailScreen from '../../screens/Observer/AddSuggestionDetail';
import ComplaintsScreen from '../../screens/Observer/ComplaintsScreen';
import RequestsScreen from '../../screens/Observer/RequestsScreen';
import SuggestionsScreen from '../../screens/Observer/SuggestionsScreen';
import AddComplaintScreenNavigation from './AddComplaintScreenNavigation';

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
      <Stack.Screen
        name="Add Complaint Detail"
        component={AddComplaintScreenNavigation}
        options={{
          headerLeft: null,
          headerStyle: {
            height: 0,
          },
        }}
      />
      <Stack.Screen
        name="Add Request Detail"
        component={AddRequestDetailScreen}
      />
      <Stack.Screen
        name="Add Suggestion Detail"
        component={AddSuggestionDetailScreen}
      />
      <Stack.Screen name="Complaints" component={ComplaintsScreen} />
      <Stack.Screen name="Requests" component={RequestsScreen} />
      <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
    </Stack.Navigator>
  );
};

export default MenuPageNavigation;
