import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from '../pages/list/index';
import User from '../pages/user/index';
import CustomTabBar from '../components/customTabBar/index';
import { ListProvider } from '../context/listContext';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <ListProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={pros => <CustomTabBar {...pros} />}>
        <Tab.Screen name="List" component={List} />

        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </ListProvider>
  );
}