import { Tabs } from 'expo-router';
import { Colors } from '../../src/constants/colors'; 
import { Text, StyleSheet, Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>🔔</Text>,
        }}
      />
      <Tabs.Screen
        name="claims"
        options={{
          title: 'Claims',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>📄</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>👤</Text>,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background, 
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight, 
    elevation: 0,
    height: Platform.OS === 'ios' ? 84 : 64, 
    paddingBottom: Platform.OS === 'ios' ? 24 : 8, 
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 11, 
    fontWeight: 'bold',
  },
  tabIcon: {
    fontSize: 24, 
    marginBottom: -4,
  },
});