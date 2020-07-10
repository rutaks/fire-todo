import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlubmOFh5PnTRc1AomIu-DyDjEGRiIU94",
  authDomain: "firetodo-6c270.firebaseapp.com",
  databaseURL: "https://firetodo-6c270.firebaseio.com",
  projectId: "firetodo-6c270",
  storageBucket: "firetodo-6c270.appspot.com",
  messagingSenderId: "347940034165",
  appId: "1:347940034165:web:bf4ed140057798d4128a3c",
  measurementId: "G-7VPNSK017B",
};

export default class Firebase {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => callback(error));
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }

  userId() {
    return firebase.auth().currentUser.uid;
  }
  detach() {
    this.unsubscribe();
  }
}
