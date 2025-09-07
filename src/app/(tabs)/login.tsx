import { Button, ButtonText } from '@/src/components/ui/button';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const LoginTab = () => {
  const router = useRouter();

  const handleLoginPress = () => {
    router.push('/login/loginScreen');
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleLoginPress}>
        <ButtonText>Go to Login Screen</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginTab;