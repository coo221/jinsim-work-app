
const CACHE='jinsim-live-phone-541c73c6a660f433';
const FILES=["index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","assets/index-BqeKdtEP.js","assets/index-D7fdxE-A.css"].map(name=>new URL(name,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('jinsim-live-phone-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data==='ACTIVATE_PHONE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
 if(request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 const clean=url.origin+url.pathname;
 if(request.mode==='navigate')event.respondWith(caches.open(CACHE).then(cache=>cache.match(FILES[0])).then(response=>response||fetch(request)));
 else if(FILES.includes(clean))event.respondWith(caches.open(CACHE).then(cache=>cache.match(clean)).then(response=>response||fetch(request)));
});