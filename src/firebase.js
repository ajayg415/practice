import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfig";

import { getDatabase, ref, set, push, get } from "firebase/database";

const db = getFirestore();

/**
 * Fetch counters object from Firestore.
 * Returns an object mapping name -> number, or {} on error.
 */
export async function fetchCountersFromFirestore() {
  const db = getDatabase(app);
  const dbRef = ref(db, "/counters");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const dbdata = Object.values(snapshot.val());
    return dbdata.at(-1);
  } else {
    console.log("db does not exist");
  }
}

/**
 * Save counters object to Firestore.
 * Accepts a plain object mapping name->number.
 */
export async function saveCountersToFirestore(counters) {
  const db = getDatabase(app);
  const newDocRef = push(ref(db, "/counters"));
  set(newDocRef, counters)
    .then(() => {
      console.log("data saved successfully");
    })
    .catch((error) => {
      console.log("error: ", error.message);
    });
}

export { db };
