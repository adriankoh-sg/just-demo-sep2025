import { Button, ButtonText } from "@/src/components/ui/button";
import { FormControl } from "@/src/components/ui/form-control";
import { Heading } from "@/src/components/ui/heading";
import { HStack } from "@/src/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from '@/src/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from "@/src/components/ui/input";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { Link } from "expo-router";
import { useState } from "react";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <VStack className="flex-1 justify-center mx-6 my-6 bg-white">
      <FormControl className="p-4 border border-outline-200 rounded-lg w-full">
        <VStack className="gap-4">
          <Heading className="text-typography-900" size={"2xl"}>Login</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input>
              <InputField type={showPassword ? 'text' : 'password'} />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <Button className="ml-auto w-full">
            <ButtonText>Login</ButtonText>
          </Button>
        </VStack>
      </FormControl>
      <VStack className="items-center pt-4">
        <Text>Need an account? <Link href="/signUp/signUpScreen" className="text-indicator-info" push>Sign Up</Link> here.</Text>
      </VStack>
    </VStack>
  );
}

export default LoginScreen;