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
        name="AddRequestDetailScreen"
        navigationKey="AddRequestDetailScreen"
        component={AddRequestDetailScreen}
        options={{
          headerTitle: 'Add Request Demands',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
      <Stack.Screen
        name="AddSubjectOfRequest"
        navigationKey="AddSubjectOfRequest"
        component={AddSubjectOfRequestScreen}
        options={{
          headerTitle: 'Add Subject Of Request',
          headerStyle: {
            backgroundColor: '#c4c4c4',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AddRequestScreenNavigation;
