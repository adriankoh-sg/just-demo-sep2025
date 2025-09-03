import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";

export const createNewUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    console.log({ result });
    return result;
  } catch (error) {
    const err = error as Error;
    if (err.code === "auth/email-already-in-use") {
      console.log("That email address is already in use!");
    }

    if (err.code === "auth/invalid-email") {
      console.log("That email address is invalid!");
    }

    console.error(err);
  }
};
