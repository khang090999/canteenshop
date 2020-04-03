importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');
let config = {
   messagingSenderId: "754505452158"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.onMessage(payload => {
    console.log('Message received. ', payload);
    const options = {
        body: payload.notification.body,
        icon: payload.notification.icon
     }
    return self.registration.showNotification(title, options);
 })
messaging.setBackgroundMessageHandler(payload => {
   const title = payload.notification.title;
   alert('asdf')
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
                if (windowClient.url === feClickAction) {
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
        event.waitUntil(promiseChain);
 });