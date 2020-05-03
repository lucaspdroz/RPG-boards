import * as firebase from 'firebase';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyA7qtrsPsPxZlqtczw233aR0YaOT0SRSgg",
    authDomain: "rpg-garage.firebaseapp.com",
    databaseURL: "https://rpg-garage.firebaseio.com",
    projectId: "rpg-garage",
    storageBucket: "rpg-garage.appspot.com",
    messagingSenderId: "441193855800",
    appId: "1:441193855800:web:1de41c7e771c1866205fcd"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}