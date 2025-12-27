import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase app (safe if already initialized)
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();
const COUNTERS_DOC_REF = doc(db, "counters", "data");

// Log basic runtime info to help debugging
try {
  const apps = getApps();
  console.log("Firebase apps:", apps.length);
  if (apps.length) {
    // app options may contain projectId
    // eslint-disable-next-line no-console
    console.log("Firebase projectId:", apps[0]?.options?.projectId || firebaseConfig.projectId);
  }
  // document path
  // eslint-disable-next-line no-console
  console.log("Firestore doc path:", COUNTERS_DOC_REF.path);
} catch (e) {
  console.warn("Could not log Firebase runtime info", e);
}

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
    // verify by reading back immediately
    try {
      const snap = await getDoc(COUNTERS_DOC_REF);
      console.log("Post-save document exists:", snap.exists());
      console.log("Post-save doc data:", snap.exists() ? snap.data() : null);
    } catch (err) {
      console.error("Error verifying saved document:", err);
    }
    console.log("Saved counters to Firestore successfully.");
    return true;
  } catch (e) {
    console.error("Error saving counters to Firestore:", e);
    return false;
  }
}

export { db };
