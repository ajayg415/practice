import app from "../..//src/firebaseConfig";

import { getDatabase, ref, set, push, get } from "firebase/database";

/**
 * Fetch counters object from Realtime DB.
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
