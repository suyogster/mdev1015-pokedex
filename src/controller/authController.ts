import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import IUser from '../types/IUser';

export const signUp = async (user: IUser, password: string): Promise<void> => {
  try {
    const { email } = user; // Assuming email is part of IUser
    const userCredential: FirebaseAuthTypes.UserCredential =
      await auth().createUserWithEmailAndPassword(email, password);
    console.log('Successfully registered new user!');

    // Check if user creation was successful and we have a user object
    if (userCredential.user) {
      console.log('Creating user document in Firestore...');
      // Use the UID as the document ID in the 'users' collection
      await firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .set({ user });
      console.log('User document created successfully!');
    }
  } catch (error) {
    const typedError = error as FirebaseAuthTypes.NativeFirebaseAuthError; // Cast the error to the correct type
    switch (typedError.code) {
      case 'auth/email-already-in-use':
        console.log('That email address is already in use!');
        break;
      case 'auth/invalid-email':
        console.log('That email address is invalid!');
        break;
      default:
        console.error('Registration error::>>', typedError);
    }
  }
};

// Define the return type. Here, it's Promise<void> as the function doesn't return a value but might throw an error.
export const signIn = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const userCredential: FirebaseAuthTypes.UserCredential =
      await auth().signInWithEmailAndPassword(email, password);
    const user: FirebaseAuthTypes.User | null = userCredential.user;
    console.log('Logged In as ::>>', user);
    return user.uid;
  } catch (error) {
    const typedError = error as FirebaseAuthTypes.NativeFirebaseAuthError; // Cast the error to the correct type
    console.error('Login error::>>', typedError);
    throw new Error(typedError.code);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await auth().signOut();
    console.log('User signed out successfully');
  } catch (error) {
    const typedError = error as FirebaseAuthTypes.NativeFirebaseAuthError; // Correct type casting
    console.error('Sign out error::>>', typedError);
    throw new Error(typedError.code);
  }
};
