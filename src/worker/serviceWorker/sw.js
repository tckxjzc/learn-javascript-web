// importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//
// workbox.core.skipWaiting();
// workbox.core.clientsClaim();

let cacheName = 'cache-1.0.6';

this.addEventListener('fetch', function (e) {

    e.respondWith(
        caches.match(e.request).then(function (response) {
            console.log('--fetch--:%o', e.request);
            return response || fetch(e.request.clone()).then(function (response) {
                console.log(response);
                if (!response || response.status !== 200 || response.type !== "basic") {
                    if (!(response.type === 'opaque' && response.status === 0))//跨域资源
                        return response;
                }

                caches.open(cacheName).then(function (cache) {
                    return cache.put(e.request.clone(), response.clone());
                });
                return response.clone();
            })
        }));
});
//[2]
this.addEventListener('install', function (e) {//第一次下载后和更新sw.js会运行
    console.log('--install--');
    self.skipWaiting();//直接激活
});
//[3]
self.addEventListener('activate', function (e) {//第一次安装后运行，更新激活后运行
    e.waitUntil(clients.claim());
    console.log('--activate--');
    e.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (name) {
            console.log(name);//所有旧的页面关闭后/install后使用skipWaiting
            if (cacheName != name) {
                console.log(name);
                return caches.delete(name);
            }
            return null;
        }))
    }));
});
//[1]
console.log('--sw runing--');//同install
/**
 * 顺序[1][2][3]
 */