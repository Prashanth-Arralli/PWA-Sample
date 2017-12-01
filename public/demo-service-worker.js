var filesToCache = [
  '../src/index.js',
  '../src/App.js',
  '../src/App.css',
  'icon.png',
  '../src/index.css',
  'index.html'
];

self.addEventListener('install', function(event) {
    var indexPage = new Request('index.html');
    event.waitUntil(
      fetch(indexPage).then(function(response) {

        return caches.open('pwa-react-cache').then(function(cache) {
          console.log('Cached index page during Install'+ response.url);
          return cache.put(filesToCache, response);
        }) ;
      })
    );
  });
  
  //If any fetch fails, it will look for the request in the cache and serve it from there first
  self.addEventListener('fetch', function(event) {
    var updateCache = function(request){
      return caches.open('pwa-react-cache').then(function (cache) {
        return fetch(request).then(function (response) {
          console.log('[PWA Builder] add page to offline'+response.url)
          return cache.put(request, response);
        });
      });
    };
  
    event.waitUntil(updateCache(event.request));
  
    event.respondWith(
      fetch(event.request).catch(function(error) {
        console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );
  
        //Check to see if you have it in the cache
        //Return response
        //If not in the cache, then return error page
        return caches.open('pwa-react-cache').then(function (cache) {
          return cache.match(event.request).then(function (matching) {
            var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
            return report
          });
        });
      })
    );
  }) ;

  self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'Push Codelab';
    const options = {
      body: event.data.text(),
      icon: 'icon.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });

  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://pwa-react-demo.firebaseapp.com/')
    );
  });