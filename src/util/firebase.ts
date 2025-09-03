import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
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

    if (result.user) {
      const response = await sendEmailVerification(result.user);
    }
    console.log({ result });
    return result;
  } catch (error) {
    throw error;
  }
};
