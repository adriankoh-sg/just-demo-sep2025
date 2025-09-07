import HeaderBackButton from '@/src/components/HeaderBackButton';
import { Stack } from "expo-router";

const LoginLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="loginScreen"
        options={{
          title: "Login",
          headerLeft: () => <HeaderBackButton />,
        }}
      />
    </Stack>
  );
};

export default LoginLayout;