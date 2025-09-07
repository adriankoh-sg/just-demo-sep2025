import { Divider } from '@/src/components/ui/divider';
import { VStack } from '@/src/components/ui/vstack';
import { useAuthStore } from '@/src/store/authStore';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const Home: React.FC = () => {
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    console.log('Home screen: ', { user })
  }, [user])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to Just Education</Text>
        <Text style={styles.subtitle}>Your learning journey starts here!</Text>
        <Divider className="my-4" />
        {
          user && (
            <VStack className="items-center pt-4">
              <VStack className="mb-4 bg-slate-200 rounded-lg w-full p-6">
                <Text className="text-typography-500">Display Name: {user.displayName}</Text>
                <Text className="text-typography-500">Email: {user.email}</Text>
                <Text className="text-typography-500">UID: {user.uid}</Text>
              </VStack>
            </VStack>
          )
        }
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});

export default Home;