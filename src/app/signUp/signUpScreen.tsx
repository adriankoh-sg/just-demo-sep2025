import { Button, ButtonText } from "@/src/components/ui/button";
import { FormControl } from "@/src/components/ui/form-control";
import { Heading } from "@/src/components/ui/heading";
import { HStack } from "@/src/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from '@/src/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from "@/src/components/ui/input";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { useState } from "react";

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <VStack className="flex-1 justify-start px-6 py-6 bg-white">
      <FormControl className="p-4 border border-outline-200 rounded-lg w-full">
        <VStack className="gap-4">
          <VStack space="xs">
            <Text className="text-typography-500">Email 邮箱</Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password 密码</Text>
            <Input>
              <InputField type={showPassword ? 'text' : 'password'} />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Name 姓名</Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Chinese Name 中文名</Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">DeShu 德属</Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>
          <Button className="ml-auto w-full">
            <ButtonText>Create Account</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </VStack>
  );
}

export default SignUpScreen;