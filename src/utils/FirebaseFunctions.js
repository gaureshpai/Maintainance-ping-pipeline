import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "./Firebase";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  setDoc,
  doc,
  where,
  arrayUnion,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Statuses, userTypes } from "./enums";

export const handleRegistration = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: formData.name });
    await setDoc(doc(db, "users", user.uid), {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      type: userTypes.citizen,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const isOfficial = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);
  const userData =  userDocSnapshot.data();
  const userType = userData.type;
  if (userType === userTypes.official) {
    return true;
  } else {
    return false;
  }
};

export const handleLogin = async (formData) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    const isOfficialUser = await isOfficial(user.uid);
    return { ...user, official: isOfficialUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createComplaint = async (formData, media) => {
  const timestamp = Date.now();
  const fileName = `complaints/${timestamp}.${media.name.split(".")[1]}`;
  const fileRef = ref(storage, fileName);
  try {
    await uploadBytes(fileRef, media);
    const fileLink = await getDownloadURL(fileRef);
    const updatedFormData = { ...formData, timestamp, mediaPath: fileLink };
    await addDoc(collection(db, "complaints"), updatedFormData);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchComplaintsByUser = (uid, handleComplaintsUpdate) => {
  const complaintsRef = collection(db, "complaints");
  const q = query(complaintsRef, where("reportedBy", "==", uid));

  return onSnapshot(q, async (querySnapshot) => {
    const complaints = [];

    for (const complaintDoc of querySnapshot.docs) {
      const complaintData = complaintDoc.data();
      const complaintId = complaintDoc.id;

      const commentsRef = collection(db, "complaints", complaintId, "comments");
      const commentsQuerySnapshot = await getDocs(commentsRef);
      const comments = commentsQuerySnapshot.docs.map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }));

      const complaintWithComments = {
        id: complaintId,
        ...complaintData,
        comments: comments,
      };

      complaints.push(complaintWithComments);
    }

    handleComplaintsUpdate(complaints);
  });
};

export const findComplaintAuthor = async (uid) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("reportedBy", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.data();
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

export const fetchComplaints = (handleComplaintsUpdate) => {
  const complaintsCollection = collection(db, "complaints");

  return onSnapshot(complaintsCollection, async (complaintsSnapshot) => {
    const updatedComplaints = [];

    for (const complaintDoc of complaintsSnapshot.docs) {
      const complaintData = complaintDoc.data();
      const complaintId = complaintDoc.id;
      const reportedByUserId = complaintData.reportedBy;

      const userDoc = await getDoc(doc(db, "users", reportedByUserId));
      const userData = userDoc.data();

      const complaintWithAuthor = {
        id: complaintId,
        author: userData.name,
        ...complaintData,
        comments: [],
      };

      const commentsCollection = collection(
        db,
        "complaints",
        complaintId,
        "comments"
      );
      const commentsUnsubscribe = onSnapshot(
        commentsCollection,
        (commentsSnapshot) => {
          const comments = commentsSnapshot.docs.map((commentDoc) => {
            const commentData = commentDoc.data();
            const commentId = commentDoc.id;

            return {
              id: commentId,
              author: commentData.author,
              comment: commentData.comment,
              timestamp: commentData.timestamp,
            };
          });

          complaintWithAuthor.comments = comments;
          handleComplaintsUpdate([...updatedComplaints]);
        }
      );

      updatedComplaints.push(complaintWithAuthor);
      complaintWithAuthor.commentsUnsubscribe = commentsUnsubscribe;
    }

    handleComplaintsUpdate([...updatedComplaints]);
  });
};

export const addComment = async (complaintID, comment) => {
  try {
    const user = auth.currentUser;
    const commentsCollection = collection(
      db,
      "complaints",
      complaintID,
      "comments"
    );
    const newComment = {
      author: user.uid,
      comment: comment,
      timestamp: Date.now(),
    };

    await addDoc(commentsCollection, newComment);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchUserById = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.data();
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

export const markAsSolved = async (complaintID) => {
  try {
    const complaint = doc(db, "complaints", complaintID);

    await updateDoc(complaint, { status: Statuses.solved });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const markAsRejected = async (complaintID) => {
  try {
    const complaint = doc(db, "complaints", complaintID);

    await updateDoc(complaint, { status: Statuses.rejected });
  } catch (error) {
    throw new Error(error.message);
  }
};