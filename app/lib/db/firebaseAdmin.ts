import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length)
  initializeApp({
    credential: applicationDefault(),
    projectId: "jilongs-gcp-playground",
  });

export const adminDb = getFirestore();
