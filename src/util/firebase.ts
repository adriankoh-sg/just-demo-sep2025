import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/database";

const reference = firebase
  .app()
  .database(
    "https://chttth-demo-default-rtdb.asia-southeast1.firebasedatabase.app/"
  );

export const createNewUser = async (
  email: string,
  password: string,
  displayName: string,
  chineseName: string,
  deShu: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    if (result.user) {
      const response = await sendEmailVerification(result.user);
      await reference
        .ref(`/users/${result.user.uid}`)
        .set(
          {
            displayName,
            email,
            uid: result.user.uid,
            chineseName,
            deShu,
          },
          (onComplete) => console.log("Data set complete:", onComplete)
        ) // Optional completion callback
        .catch((error) => {
          console.error("Error saving user data to database:", error);
          throw error;
        });
      console.log("Email verification sent:", response);
    }
    console.log({ result });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (uid: string) => {
  try {
    const snapshot = await reference.ref(`/users/${uid}`).once("value");

    return snapshot.val();
  } catch (error) {
    throw error;
  }
};
