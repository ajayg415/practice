import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase app (safe if already initialized)
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();
const COUNTERS_DOC_REF = doc(db, "counters", "data");

/**
 * Fetch counters object from Firestore.
 * Returns an object mapping name -> number, or {} on error.
 */
export async function fetchCountersFromFirestore() {
  try {
    const snap = await getDoc(COUNTERS_DOC_REF);
    if (!snap.exists()) return {};
    const data = snap.data();
    console.log(`Fetched counters from Firestore: ${JSON.stringify(data)}`);
    // Assume the document stores the counters map directly
    return typeof data === "object" && data ? data : {};
  } catch (e) {
    console.error("Error fetching counters from Firestore:", e);
    // swallow errors and return empty
    return {};
  }
}

/**
 * Save counters object to Firestore.
 * Accepts a plain object mapping name->number.
 */
export async function saveCountersToFirestore(counters) {
  try {
    console.log(`Saving counters to Firestore: ${JSON.stringify(counters)}`);
    await setDoc(COUNTERS_DOC_REF, counters || {});
    console.log("Saved counters to Firestore successfully.");
    return true;
  } catch (e) {
    console.error("Error saving counters to Firestore:", e);
    return false;
  }
}

export { db };
