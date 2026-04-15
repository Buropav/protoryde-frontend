import { Tabs } from 'expo-router';
import { Colors } from '../src/constants/colors'; 
import { Text, StyleSheet, Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,     // #00D4AA (Teal)
        tabBarInactiveTintColor: Colors.textMuted, // rgba(255, 255, 255, 0.45)
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
    backgroundColor: Colors.background, // #0A1628 (Deep Navy)
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight, // rgba(255, 255, 255, 0.08)
    elevation: 0,
    height: Platform.OS === 'ios' ? 84 : 64, // 64dp constraint (adjusted for iOS safe area)
    paddingBottom: Platform.OS === 'ios' ? 24 : 8, 
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 11, // 11sp spec
    fontWeight: 'bold',
  },
  tabIcon: {
    fontSize: 24, // 24x24dp spec
    marginBottom: -4,
  },
});