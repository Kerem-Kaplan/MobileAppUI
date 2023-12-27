import {createStackNavigator} from '@react-navigation/stack';
import AddComplaintDetailScreen from '../../screens/Observer/AddComplaintDetailScreen';
import AddSubjectOfComplaintScreen from '../../screens/Observer/AddSubjectOfComplaintScreen';
import AddRequestDetailScreen from '../../screens/Observer/AddRequestDetailScreen';
import AddSubjectOfRequestScreen from '../../screens/Observer/AddSubjectOfRequestScreen';

const Stack = createStackNavigator();

const AddRequestScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Request Detail Screen"
        navigationKey="AddRequestDetailScreen"
        component={AddRequestDetailScreen}
      />
      <Stack.Screen
        name="Add Subject Of Request"
        navigationKey="AddSubjectOfRequest"
        component={AddSubjectOfRequestScreen}
      />
    </Stack.Navigator>
  );
};

export default AddRequestScreenNavigation;
