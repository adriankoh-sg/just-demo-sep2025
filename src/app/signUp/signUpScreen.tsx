import { Button, ButtonText } from "@/src/components/ui/button";
import { Divider } from "@/src/components/ui/divider";
import { FormControl } from "@/src/components/ui/form-control";
import { Heading } from "@/src/components/ui/heading";
import { HStack } from "@/src/components/ui/hstack";
import { EyeIcon, EyeOffIcon, Icon } from "@/src/components/ui/icon";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "@/src/components/ui/input";
import { Spinner } from "@/src/components/ui/spinner";
import { Text } from "@/src/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/src/components/ui/toast';
import { VStack } from "@/src/components/ui/vstack";
import { createNewUser } from "@/src/util/firebase";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const ToastComponent = ({ toastId, message, variant }: { toastId: string; message: string; variant: "success" | "error" }) => {
  return (
    <Toast
      nativeID={toastId}
      className={`px-6 py-6 gap-4 shadow-soft-1 items-center flex-row ${variant === "success" ? "bg-green-300" : "bg-red-600"}`}
    >
      <Icon
        as={() => <Feather name="send" size={16} color={variant === "success" ? "black" : "white"} />}
        size="sm"
        className="fill-typography-100 stroke-none"
      />
      <Divider
        orientation="vertical"
        className="h-[30px] bg-outline-200"
      />
      <ToastTitle size="sm" className={variant === "success" ? "text-black" : "text-white"}>{message}</ToastTitle>
    </Toast>
  );
}

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [chineseName, setChineseName] = useState("");
  const [deShu, setDeShu] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleOnCreateAccount = async () => {
    setIsLoading(true);
    try {
      const result = await createNewUser(email, password, displayName);
      console.log('-- success --');
      toast.show({
        placement: 'top',
        render: () => <ToastComponent toastId="account-created" message="Account created! Please verify your email." variant="success" />,
      });
    } catch (error) {
      console.log({ error })
      const message = error.userInfo.message;

      toast.show({
        placement: 'top',
        render: () => <ToastComponent toastId="account-error" message={message} variant="error" />,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <InputField type="text" value={email} onChangeText={setEmail} />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password 密码</Text>
            <Input>
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={setPassword}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Display Name 姓名</Text>
            <Input>
              <InputField
                type="text"
                value={displayName}
                onChangeText={setDisplayName}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Chinese Name 中文名</Text>
            <Input>
              <InputField
                type="text"
                value={chineseName}
                onChangeText={setChineseName}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">DeShu 德属</Text>
            <Input>
              <InputField type="text" value={deShu} onChangeText={setDeShu} />
            </Input>
          </VStack>
          <Button className="ml-auto w-full" onPress={handleOnCreateAccount}>
            <ButtonText>Create Account</ButtonText>
          </Button>
        </VStack>
      </FormControl>
      {isLoading && <Spinner className="py-4" size="large" color="grey" />}
    </VStack>
  );
};

export default SignUpScreen;
