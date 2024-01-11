import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../../screens/Observer/MenuScreen';
import ComplaintsScreen from '../../screens/Observer/ComplaintsScreen';
import RequestsScreen from '../../screens/Observer/RequestsScreen';
import SuggestionsScreen from '../../screens/Observer/SuggestionsScreen';
import AddComplaintScreenNavigation from './AddComplaintScreenNavigation';
import AddRequestScreenNavigation from './AddRequestScreenNavigation';
import AddSuggestionScreenNavigation from './AddSuggestionScreenNavigation';

const Stack = createStackNavigator();
const MenuPageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuPage"
        component={MenuScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            height: 0,
          },
        }}
      />
      <Stack.Screen
        name="AddComplaintDetail"
        component={AddComplaintScreenNavigation}
        options={{
          headerLeft: null,
          headerTitle: 'Add Complaint Detail',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="AddRequestDetail"
        component={AddRequestScreenNavigation}
        options={{
          headerLeft: null,
          headerTitle: 'Add Request Detail',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="AddSuggestionDetail"
        component={AddSuggestionScreenNavigation}
        options={{
          headerLeft: null,
          headerTitle: 'Edit Profile',
          headerStyle: {
            height: 0,
            backgroundColor: '#c8f9cd',
          },
        }}
      />
      <Stack.Screen
        name="Complaints"
        component={ComplaintsScreen}
        options={{
          headerTitle: 'Complaints',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
      <Stack.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          headerTitle: 'Requests',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
      <Stack.Screen
        name="Suggestions"
        component={SuggestionsScreen}
        options={{
          headerTitle: 'Suggestions',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MenuPageNavigation;
