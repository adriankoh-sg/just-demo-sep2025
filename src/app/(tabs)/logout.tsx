import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/src/components/ui/alert-dialog";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Heading } from "@/src/components/ui/heading";
import { CloseIcon, Icon } from "@/src/components/ui/icon";
import { Spinner } from "@/src/components/ui/spinner";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { useAuthStore } from "@/src/store/authStore";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
const ShowDialog = ({
  showAlertDialog,
  handleClose,
}: {
  showAlertDialog: boolean;
  handleClose: (value: "cancel" | "confirm") => void;
}) => {
  return (
    <AlertDialog
      isOpen={showAlertDialog}
      onClose={() => handleClose("cancel")}
      size={"md"}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent className="gap-2">
        <AlertDialogHeader>
          <Heading>Logout</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} size="lg" />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>
            Logout of your account? You will need to login again to access your
            account.
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="gap-3">
          <Button
            variant="outline"
            action="secondary"
            onPress={() => handleClose("cancel")}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button action="negative" onPress={() => handleClose("confirm")}>
            <ButtonText>Confirm</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Logout = () => {
  const { logout, isLoading, isError, error } = useAuthStore((state) => state);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const router = useRouter();

  const handleClose = (value: "cancel" | "confirm") => {
    if (value === "confirm") {
      logout()
        .then(() => {
          console.log("Logout successful.");
          router.replace("/");
        })
        .catch((error) => {
          console.error("Sign-out error:", error);
        });
    }
    setShowAlertDialog(false);
  };

  return (
    <VStack style={styles.container}>
      <Button onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Logout</ButtonText>
      </Button>
      {
        isError && <Text className="text-red-500 pt-4">{error}</Text>
      }
      {isLoading && <Spinner className="py-4" size="large" color="grey" />}
      <ShowDialog showAlertDialog={showAlertDialog} handleClose={handleClose} />
    </VStack>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Logout;
