import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

export default function Layout() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        useAuthStore.setState({ isAuthenticated: true });
      } else {
        // User is signed out
        useAuthStore.setState({ isAuthenticated: false });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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
          name={'members'}
          options={{
            headerTitle: 'Members',
            tabBarLabel: 'Members',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
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