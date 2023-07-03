// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDye4giKVD2dm9EsDfbtRw6JKVxqwKDgks",
  authDomain: "delivery-fb-1.firebaseapp.com",
  projectId: "delivery-fb-1",
  storageBucket: "delivery-fb-1.appspot.com",
  messagingSenderId: "623609424978",
  appId: "1:623609424978:web:7f979adbd2e5a83503038b",
  measurementId: "G-5VJXTBPLZR",
  databaseURL: "https://delivery-fb-1-default-rtdb.europe-west1.firebasedatabase.app/"
};

export function initialize_fb() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
}

export async function getShops_fb() {

  const dbRef = ref(getDatabase());
  const table = await get(child(dbRef, 'shops'));

  return table.exists() ? toArray(table.val()) : [];

}

const toArray = (obj) => {
  return Object.values(obj);
}

export function addShop_fb({ id, name }) {
  const db = getDatabase();
  set(ref(db, 'shops/' + id), {
    name: name,
    id,
  })
    .then(() => {
      // Data saved successfully!
      console.log('success');
    })
    .catch((error) => {
      // The write failed...
    });
};

export function addGood_fb({ id, name, shopId }) {
  const db = getDatabase();
  set(ref(db, 'goods/' + shopId + '/' + id), {
    name,
    id,
  })
    .then(() => {
      // Data saved successfully!
      console.log('success');
    })
    .catch((error) => {
      // The write failed...
    });
};

export async function getGoods_fb(id) {
  const dbRef = ref(getDatabase());
  const table = await get(child(dbRef, `goods/${id}`));

  return table.exists() ? toArray(table.val()) : [];
}

export const createOrder_fb = async ({id, order}) => {
  const db = getDatabase();
  set(ref(db, 'orders/' + id), order)
    .then(() => {
      // Data saved successfully!
      console.log('order success');
    })
    .catch((error) => {
      // The write failed...
      console.log('order fail ', error);
    });
};
