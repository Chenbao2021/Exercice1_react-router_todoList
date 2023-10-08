import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, getDocs,  } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4ZEeCpxsskxqhCdQTRzQeEb1lSWxbBiA",
  authDomain: "eventfeedback-59281.firebaseapp.com",
  projectId: "eventfeedback-59281",
  storageBucket: "eventfeedback-59281.appspot.com",
  messagingSenderId: "969161123447",
  appId: "1:969161123447:web:7daa7b4da7bb14f59e0872",
  measurementId: "G-DZ6GWVJ5R7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const getOnlineEvents = async () => {
  const qFirebase = query(collection(db, "feedbacks"));
  const querySnapshot = await getDocs(qFirebase);
  
  let onlineEvents = [] as eventProps[];
  querySnapshot.forEach((doc) => {
      onlineEvents.unshift(doc.data() as eventProps);
  })

  return onlineEvents;
}

let onlineEvents = await getOnlineEvents();
export default onlineEvents;