import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBe49uQv4k4RV0M2yR6fVVRR6hQoxWtNaQ',
    authDomain: 'tamy-chat.firebaseapp.com',
    projectId: 'tamy-chat',
    storageBucket: 'tamy-chat.appspot.com',
    messagingSenderId: '554340887247',
    appId: '1:554340887247:web:0d75713d0f8f4c5a5465ba',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
