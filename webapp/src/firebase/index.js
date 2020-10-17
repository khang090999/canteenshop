import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/messaging'



let config ={
    apiKey: "AIzaSyDzqPx-eug7y8DwqWWxGg--t5e3Lp1JfRQ",
    authDomain: "cshop-86866.firebaseapp.com",
    databaseURL: "https://cshop-86866.firebaseio.com",
    projectId: "cshop-86866",
    storageBucket: "cshop-86866.appspot.com",
    messagingSenderId: "754505452158",
    appId: "1:754505452158:web:e0b1e5028bdfc1120f262f",
    measurementId: "G-D5VLSWKYW0"
}
firebase.initializeApp(config)

const storage= firebase.storage();


export function initializePush() {
    const messaging = firebase.messaging();
    messaging
       .requestPermission()
       .then(() => {
          return messaging.getToken();
        })
       .then(token => {
          //you probably want to send your new found FCM token to the
          //application server so that they can send any push
          //notification to you.
        })
       .catch(error => {
          if (error.code === "messaging/permission-blocked") {
             console.log("Please Unblock Notification Request Manually");
          } else {
             console.log("Error Occurred", error);
          }
         });
         messaging.onMessage(payload => {
            console.log('Message received. ', payload);
            const options = {
                body: payload.notification.body,
                icon: payload.notification.icon
             }
            
          })
 }


export{
    storage, firebase as default
}

