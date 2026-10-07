import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Mic2, Image as ImageIcon, Ticket, Menu } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import SingersScreen from '../screens/SingersScreen';
import GalleryScreen from '../screens/GalleryScreen';
import TicketsScreen from '../screens/TicketsScreen';
import MoreScreen from '../screens/MoreScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bottomBar,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Singers" 
        component={SingersScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Mic2 color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Gallery" 
        component={GalleryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <ImageIcon color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Tickets" 
        component={TicketsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ticket color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Menu color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}
