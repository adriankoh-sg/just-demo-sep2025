import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function Layout() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Protected guard={!isAuthenticated}>
        <Tabs.Screen
          name="login"
          options={{
            headerTitle: 'Login',
            tabBarLabel: 'Login',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-in-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs.Protected>
      <Tabs.Protected guard={isAuthenticated}>
        <Tabs.Screen
          name="logout"
          options={{
            headerTitle: 'Logout',
            tabBarLabel: 'Logout',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs.Protected>

    </Tabs>
  );
}