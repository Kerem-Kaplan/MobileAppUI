import {createStackNavigator} from '@react-navigation/stack';
import AddComplaintDetailScreen from '../../screens/Observer/AddComplaintDetailScreen';
import AddSubjectOfComplaintScreen from '../../screens/Observer/AddSubjectOfComplaintScreen';
import AddRequestDetailScreen from '../../screens/Observer/AddRequestDetailScreen';
import AddSubjectOfRequestScreen from '../../screens/Observer/AddSubjectOfRequestScreen';
import AddSuggestionDetailScreen from '../../screens/Observer/AddSuggestionDetailScreen';
import AddSubjectOfSuggestionScreen from '../../screens/Observer/AddSubjectOfSuggestionScreen';

const Stack = createStackNavigator();

const AddSuggestionScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddSuggestionDetailScreen"
        navigationKey="AddRequestDetailScreen"
        component={AddSuggestionDetailScreen}
        options={{
          headerTitle: 'Add Suggestion Demands',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
      <Stack.Screen
        name="AddSubjectOfSuggestion"
        component={AddSubjectOfSuggestionScreen}
        options={{
          headerTitle: 'Add Subject Of Suggestion',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AddSuggestionScreenNavigation;
