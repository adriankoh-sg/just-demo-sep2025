import Gradient from "@/src/assets/icons/Gradient";
import Logo from "@/src/assets/icons/Logo";
import { Box } from "@/src/components/ui/box";
import { Text } from "@/src/components/ui/text";
import React from "react";
import { ScrollView } from "react-native";

import { Button, ButtonText } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "./login/loginScreen";

const FeatureCard = ({ iconSvg: IconSvg, name, desc }: any) => {
  return (
    <Box
      className="flex-column md:flex-1 m-2 p-4 rounded-lg bg-background-0/40"
      key={name}
    >
      <Box className="items-center flex flex-row">
        <Icon as={IconSvg} />
        <Text className="font-medium ml-2 text-xl">{name}</Text>
      </Box>
      <Text className="mt-2">{desc}</Text>
    </Box>
  );
};

export default function Home() {

  return (
    <SafeAreaView className="flex-1">
      <LoginScreen />
    </SafeAreaView>
  );
}
