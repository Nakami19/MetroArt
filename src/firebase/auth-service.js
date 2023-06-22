import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
  FacebookAuthProvider ,
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "./config";
import { createUser } from "./users-service.js";

export const signInWithGoogle = async ({ onSuccess, onFail }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { isNewUser } = getAdditionalUserInfo(result);

    if (isNewUser) {
      const { uid, email, displayName } = result.user;
      await createUser({
        uid,
        email,
        name: displayName,
        usertype:"",
        "reservas":[],
    });
    }

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    const errorCode = error?.code;
    const errorMessage = error?.message;
    const email = error?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    if (onFail) {
      onFail();
    }

    console.error("FAILED SIGN IN WITH GOOGLE", {
      errorCode,
      errorMessage,
      email,
      credential,
    });
  }
};

export const signInWithFacebook = async ({ onSuccess, onFail }) => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const { isNewUser } = getAdditionalUserInfo(result);

    if (isNewUser) {
      const { uid, email, displayName } = result.user;
      await createUser({
        uid,
        email,
        name: displayName,
        usertype:"",
        "reservas":[],
    });
    }

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    const errorCode = error?.code;
    const errorMessage = error?.message;
    const email = error?.email;
    const credential = FacebookAuthProvider.credentialFromError(error);

    if (onFail) {
      onFail();
    }

    console.error("FAILED SIGN IN WITH FACEBOOK", {
      errorCode,
      errorMessage,
      email,
      credential,
    });
  }
};


// HANDLE REGISTER WITH EMAIL AND PASSWORD
export const registerWithEmailAndPassword = async ({
  userData,
  onSuccess,
  onFail,
}) => {
  try {
    const { email, password, ...restData } = userData;
    const firebaseResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await createUser({
      ...restData,
      email,
      uid: firebaseResult.user.uid,
      "reservas":[],
    });

    // SUCCESS CALLBACK
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error("REGISTER FAILED", { error });
    if (onFail) {
      onFail();
    }
  }
};

// HANDLE LOGIN WITH EMAIL AND PASSWORD
export const loginWithEmailAndPassword = async ({
  userData,
  onSuccess,
  onFail,
}) => {
  try {
    const { email, password } = userData;
    await signInWithEmailAndPassword(auth, email, password);

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error("LOGIN FAILED", { error });

    if (onFail) {
      onFail();
    }
  }
};

// HANDLE USER SIGN OUT
export const logout = async (callback) => {
  try {
    await signOut(auth);

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error("SIGN OUT FAILED", { error });
  }
};
