import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// async는 항상 promise를 반환하니, .then이나 await을 통해서 실제값을 얻어야하고, 얻은 값들을 return 해주어야 user정보는 null 정보로 상태를 초기화 해 줄 수 있다.
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth);
}
// Header에서 선언할 수 있지만, 이런 모든 firebase로직은 파일 안에서만 관리하고, 함수로추출
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    }
  });
}
