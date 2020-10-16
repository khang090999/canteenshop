importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');
let config = {
    apiKey: "AIzaSyDzqPx-eug7y8DwqWWxGg--t5e3Lp1JfRQ",
    authDomain: "cshop-86866.firebaseapp.com",
    databaseURL: "https://cshop-86866.firebaseio.com",
    projectId: "cshop-86866",
    storageBucket: "cshop-86866.appspot.com",
    messagingSenderId: "754505452158",
    appId: "1:754505452158:web:e0b1e5028bdfc1120f262f",
    measurementId: "G-D5VLSWKYW0"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
   const title = payload.notification.title;
   const options = {
      body: payload.notification.body,
      icon: payload.notification.icon
   }
   return self.registration.showNotification(title, options);
})

self.addEventListener("notificationclick", function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
         })
        .then(windowClients => {
            let matchingClient = null;
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url == feClickAction) {
                    matchingClient = windowClient;
                    break;
                }
            }
            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return clients.openWindow(feClickAction);
            }
        });
        event.waitUntil(
            promiseChain
            );
 });