import { Tabs } from 'expo-router';
import { colors } from '../../src/constants/colors';
import { Text, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home-screen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="claims-list-screen"
        options={{
          title: 'Claims',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>📋</Text>,
        }}
      />
      <Tabs.Screen
        name="coverage-screen"
        options={{
          title: 'Coverage',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>🛡️</Text>,
        }}
      />
      <Tabs.Screen
        name="profile-screen"
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
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    paddingBottom: 20,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: -4,
  },
});