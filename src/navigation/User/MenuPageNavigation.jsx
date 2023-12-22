import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../../screens/User/MenuScreen';
import PastComplaintScreen from '../../screens/User/PastComplaintScreen';
import PastRequestScreen from '../../screens/User/PastRequestScreen';
import PastSuggestionScreen from '../../screens/User/PastSuggestionScreen';

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
      <Stack.Screen name="Past Complaints" component={PastComplaintScreen} />
      <Stack.Screen name="Past Requests" component={PastRequestScreen} />
      <Stack.Screen name="Past Suggestions" component={PastSuggestionScreen} />
    </Stack.Navigator>
  );
};

export default MenuPageNavigation;
