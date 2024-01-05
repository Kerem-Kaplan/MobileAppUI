import {createStackNavigator} from '@react-navigation/stack';
import AddComplaintDetailScreen from '../../screens/Observer/AddComplaintDetailScreen';
import AddSubjectOfComplaintScreen from '../../screens/Observer/AddSubjectOfComplaintScreen';

const Stack = createStackNavigator();

const AddComplaintScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddComplaintDetailScreen"
        component={AddComplaintDetailScreen}
        options={{
          headerTitle: 'Add Complaint Demands',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
      <Stack.Screen
        name="AddSubjectOfComplaint"
        component={AddSubjectOfComplaintScreen}
        options={{
          headerTitle: 'Add Subject Of Complaint',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AddComplaintScreenNavigation;
