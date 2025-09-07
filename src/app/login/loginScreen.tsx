import { Button, ButtonText } from "@/src/components/ui/button";
import { FormControl } from "@/src/components/ui/form-control";
import { Heading } from "@/src/components/ui/heading";
import { HStack } from "@/src/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from '@/src/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from "@/src/components/ui/input";
import { Spinner } from "@/src/components/ui/spinner";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { useAuthStore } from "@/src/store/authStore";
import { Link, router } from "expo-router";
import { useState } from "react";

const LoginScreen = () => {
  const { login, isLoading, isError, error } = useAuthStore(state => state)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleLogin = async () => {
    try {
      await login({ email, password });
      router.replace('/'); // Navigate to home screen on successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <VStack className="flex-1 justify-center p-6 bg-white">
      <FormControl className="p-4 border border-outline-200 rounded-lg w-full">
        <VStack className="gap-4">
          <Heading className="text-typography-900" size={"2xl"}>Login</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input>
              <InputField type="text" value={email} onChangeText={setEmail} />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input>
              <InputField type={showPassword ? 'text' : 'password'} value={password} onChangeText={setPassword} />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <Button className="ml-auto w-full" onPress={handleLogin}>
            <ButtonText>Login</ButtonText>
          </Button>
        </VStack>
      </FormControl>
      <VStack className="items-center pt-4">
        <Text>Need an account? <Link href="/signUp/signUpScreen" className="text-indicator-info" push>Sign Up</Link> here.</Text>
      </VStack>
      <VStack className="items-center pt-4">
        {isError && <Text className="text-red-500">{error}</Text>}
      </VStack>
      <VStack className="items-center pt-4">
        {isLoading && <Spinner className="py-4" size="large" color="grey" />}
      </VStack>
    </VStack>
  );
}

export default LoginScreen;