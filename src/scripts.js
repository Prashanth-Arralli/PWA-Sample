

let isSubscribed = false ;
// if ('serviceWorker' in navigator && 'PushManager' in window) {
//     console.log("Push is supported") ;
//     window.addEventListener('load', function() {
//       navigator.serviceWorker.register('../public/demo-service-worker.js').then(function(registration) {
//         // Registration was successful
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         swRegistration = registration ;
//       }, function(err) {
//         // registration failed :(
//         console.log('ServiceWorker registration failed: ', err);
//       }).catch(function(err) {
//         console.log(err)
//       });
//     });
//   } else {
//     console.log('service worker is not supported');
// }
const applicationServerPublicKey =  'BPek-Y4u42n2wb0ks4dvPIoIwB3QGXovHSIToH4FK0yhziBa9m5QIGAQ7rOcABUFjxQvtE0X-LJc1ucqYlUbDmE';
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

export default function initailizeSubscription( name) {
    // Set the initial subscription value
    if (isSubscribed) {
        unsubscribeUser();
    }else{
        subscribeUser(name) ;
    }

    window.swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);
  
      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }
    });
  }

  function subscribeUser(name) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    window.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed.');
  
      updateSubscriptionOnServer(name, subscription);
  
      isSubscribed = true;
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
    });
  }

  function updateSubscriptionOnServer(name, subscription) {
    // TODO: Send subscription to application server
    console.log("SUBSCRIPTION = ",subscription) ;
   // const subscriptionJson = document.querySelector('.js-subscription-json');
    var body = {} ;
    body.name = name;
    body.subscription = subscription ;
    ajaxPost('https://pwa-push-server.firebaseapp.com/register',body,function(response){
        console.log("Ajax Post response = ",response) ;
    }) ;
   // const subscriptionDetails = document.querySelector('.js-subscription-details');
  
    if (subscription) {
       //subscriptionJson.textContent = JSON.stringify(subscription);
       //subscriptionDetails.classList.remove('is-invisible');
    } else {
      //subscriptionDetails.classList.add('is-invisible');
    }
}

    function ajaxGet(url, callback){
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                callback(xmlhttp.responseText);
            }else{
                console.log("There some wrong with Ajax get") ;
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function ajaxPost(url, data, callback){
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                callback(xmlhttp.responseText);
            }else{
                console.log("There some wrong with Ajax post") ;
            }
        }
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(data));
    }

    export function unsubscribeUser() {
        console.log(window.swRegistration) ;
        unSubscriptionOnServer(window.swRegistration) ;
        window.swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          if (subscription) {
            return subscription.unsubscribe();
          }
        })
        .catch(function(error) {
          console.log('Error unsubscribing', error);
        })
        .then(function() {
          console.log('User is unsubscribed.');
          isSubscribed = false;
        });
      }

      function unSubscriptionOnServer(subscription) {
        // TODO: Send subscription to application server
        console.log("SUBSCRIPTION = ",subscription) ;
       // const subscriptionJson = document.querySelector('.js-subscription-json');
        var body = {} ;
        body.subscription = subscription ;
        ajaxPost('https://pwa-push-server.firebaseapp.com/unregister',body,function(response){
            console.log("Ajax Post response = ",response) ;
        }) ;
      
    }