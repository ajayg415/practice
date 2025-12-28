import app from "./firebaseConfig";

import { getDatabase, ref, set, get } from "firebase/database";

const db = getDatabase(app);

/**
 * Fetch counters object from Realtime Database.
 * Returns an object mapping name -> number, or {} on error.
 */
export async function fetchCountersFromDatabase() {
  try {
    const dbRef = ref(db, "/counters");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log("Fetched counters from Realtime DB:", snapshot.val());
      return snapshot.val();
    } else {
      console.log("counters path does not exist in Realtime DB");
      return {};
    }
  } catch (e) {
    console.error("Error fetching counters from Realtime DB:", e);
    return {};
  }
}

/**
 * Save counters object to Realtime Database at a fixed path
 * (overwrites the data at `/counters`). This prevents creating
 * new child nodes (push) and keeps a single counters object.
 */
export async function saveCountersToDatabase(counters) {
  try {
    const dbRef = ref(db, "/counters");
    await set(dbRef, counters || {});
    console.log("Saved counters to Realtime DB successfully.");
    return true;
  } catch (e) {
    console.error("Error saving counters to Realtime DB:", e);
    return false;
  }
}

export { db };
