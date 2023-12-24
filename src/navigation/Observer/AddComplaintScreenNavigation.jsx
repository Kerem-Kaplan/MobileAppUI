import {createStackNavigator} from '@react-navigation/stack';
import AddComplaintDetailScreen from '../../screens/Observer/AddComplaintDetailScreen';
import AddSubjectOfComplaintScreen from '../../screens/Observer/AddSubjectOfComplaintScreen';

const Stack = createStackNavigator();

const AddComplaintScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Complaint Detail Screen"
        component={AddComplaintDetailScreen}
      />
      <Stack.Screen
        name="Add Subject Of Complaint"
        component={AddSubjectOfComplaintScreen}
      />
    </Stack.Navigator>
  );
};

export default AddComplaintScreenNavigation;
