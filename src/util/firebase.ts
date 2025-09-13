import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/database";
import { forEach } from "lodash";
import { User } from "../store/authStore";

const dbUrl = process.env.EXPO_PUBLIC_FIREBASE_DB_URL;
if (!dbUrl) {
  throw new Error("FIREBASE_DB_URL is not defined");
}
const reference = firebase.app().database(dbUrl);

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

export const getAllUsers = async () => {
  try {
    const snapshot = await reference.ref(`/users`).once("value");
    const users = snapshot.val();
    let userList: User[] = [];

    forEach(users, (value, key) => {
      userList.push(value);
    });

    return userList;
  } catch (error) {
    throw error;
  }
};
