import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const CustomBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 16 }}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
};

const SignUpLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="signUpScreen"
        options={{
          title: "Sign Up",
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack>
  );
};

export default SignUpLayout;