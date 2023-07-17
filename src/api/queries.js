// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
// import { storage } from "firebaseConfig";
import { getStorage, ref as stRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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

export function addGood_fb({ id, name, price, shopId, description, image }) {
  const db = getDatabase();
  set(ref(db, 'goods/' + shopId + '/' + id), {
    name,
    id,
    price,
    description,
  })
    .then(() => {
      // Data saved successfully!
      console.log('success');
      uploadImage({ file: image, path: `/images/goods/${id}` });
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

export const createOrder_fb = async ({ id, order }) => {
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


const uploadImage = ({ file, path }) => {
  if (!file) {
    return;
  };

  const storage = getStorage();

  const storageRef = stRef(storage, `${path}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.error(error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );

  // progress can be paused and resumed. It also exposes progress updates.
  // Receives the storage reference and the file to upload.
  // const uploadTask = uploadBytesResumable(storageRef, file);

  // uploadTask.on(
  //   "state_changed",
  //   // (snapshot) => {
  //   //   const percent = Math.round(
  //   //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //   //   );

  //   //   // update progress
  //   //   // setPercent(percent);
  //   //   console.log('percent ', percent);
  //   // },
  //   (err) => console.log(err),
  //   () => {
  //     // download url
  //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //       console.log(url);
  //     });
  //   }
  // );
};