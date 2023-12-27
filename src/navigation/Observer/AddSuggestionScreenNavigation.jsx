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
        name="Add Suggestion Detail Screen"
        navigationKey="AddRequestDetailScreen"
        component={AddSuggestionDetailScreen}
      />
      <Stack.Screen
        name="Add Subject Of Suggestion"
        component={AddSubjectOfSuggestionScreen}
      />
    </Stack.Navigator>
  );
};

export default AddSuggestionScreenNavigation;
