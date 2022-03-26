import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAjBb1lTBkXINk7fRDKa7xmkyitL1I4ua8",
  authDomain: "daily-tasks-21205.firebaseapp.com",
  projectId: "daily-tasks-21205",
  storageBucket: "daily-tasks-21205.appspot.com",
  messagingSenderId: "280513881552",
  appId: "1:280513881552:web:89b38b70dd0f63feac05d5",
  measurementId: "G-3M3TF5H4B1",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebase);

if (Platform.OS === "web") {
  enableIndexedDbPersistence(firestore).catch((err: any) => {
    console.error(err);
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
}
