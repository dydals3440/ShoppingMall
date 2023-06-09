import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';

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
const db = getDatabase();
const dbRef = ref(db);

// async는 항상 promise를 반환하니, .then이나 await을 통해서 실제값을 얻어야하고, 얻은 값들을 return 해주어야 user정보는 null 정보로 상태를 초기화 해 줄 수 있다.
// user정보는 auth에 담겨져있음.
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth);
  console.log(auth);
}
// if/else구문을 쓰지말고 삼항연산자로 처리하는 것이 더 좋아보임
// const updated User = user ? await adminUser(user) : null 그 후 callback(updatedUser)
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // 사용자가 있는 경우에 adminUser를 호출
      const updatedUser = user && (await adminUser(user));
      callback(updatedUser);
    } else {
      const updatedUser = !user && null;
      callback(updatedUser);
    }
  });
}

// read DB (admin 판별)
async function adminUser(user) {
  return get(child(dbRef, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log('admins', admins);
        const isAdmin = admins.includes(user.uid);
        console.log('isAdmin', isAdmin);
        return { ...user, isAdmin };
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// firebase에서 데이터를 읽을때 get 사용시 set
export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  return set(ref(db, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    // 옵션은 , 로 구분하여 배열로 변경
    options: product.options.split(','),
  });
}

// firebase에서 get을 통해 만든 db에 접근
export async function getProducts() {
  return get(ref(db, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      // snapshot이 없다면
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

// Carts
// 주어진 사용자의 id에 해당하는 쇼핑카트를 보여줄 것
export async function getCart(userId) {
  return get(ref(db, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      console.log('items', items);
      return Object.values(items);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function addOrUpdateToCart(userId, product) {
  // 해당하는 경로에 product를 추가해주는 것!
  return set(ref(db, `carts/${userId}/${product.id}`), product);
}
// 삭제시에는 제품정보 모든 것이 필요가 없음, 필요한 ProductId만 받아오자!
// firebase에서는 remove() 호출
export async function removeFromCart(userId, productId) {
  return remove(ref(db, `carts/${userId}/${productId}`));
}
