import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

interface HeaderBackButtonProps {
  goBack?: () => void;
}

const HeaderBackButton = ({ goBack }: HeaderBackButtonProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={goBack || navigation.goBack} style={{ paddingHorizontal: 16 }}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;