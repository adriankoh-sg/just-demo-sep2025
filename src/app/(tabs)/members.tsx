import { Divider } from '@/src/components/ui/divider';
import { VStack } from '@/src/components/ui/vstack';
import { User } from '@/src/store/authStore';
import { getAllUsers } from '@/src/util/firebase';
import React, { use, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const Members: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUserData = async () => {
    try {
      const users = await getAllUsers();
      console.log('All users: ', { users });
      setUsers(users);
    } catch (error) {
      console.error('Error fetching all users: ', error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>List of members</Text>
        <Divider className="my-4" />
        {users && users.map((item, index) => (
          <VStack key={`${item.uid}`} className="items-center pt-4">
            <Text className="text-typography-500">{`${item.displayName} | ${item.chineseName} | ${item.deShu}`}</Text>
          </VStack>
        ))
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

export default Members;