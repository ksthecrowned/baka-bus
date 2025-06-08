import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDPocj21OF0KIZZNNSV4XVL3g3SD-tVnHM",
  authDomain: "paradis-immobilier.firebaseapp.com",
  projectId: "paradis-immobilier",
  storageBucket: "paradis-immobilier.firebasestorage.app",
  messagingSenderId: "579406427147",
  appId: "1:579406427147:web:7b229b2d8920ccb2c6c30e",
  measurementId: "G-NRKCHD4M1D",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

export const storage = getStorage(app);

export const messaging = async () => {
  if (await isSupported()) {
    return getMessaging(app);
  }
  return null;
};
