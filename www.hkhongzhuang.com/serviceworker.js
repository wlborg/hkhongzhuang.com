'use strict';
const version = 'v20190930';
const __DEVELOPMENT__ = false;
const __DEBUG__ = false;
const offlineResources = ['/', '/offline.html', '/offline.svg'];
//  ignoreFetch 里面是忽略抓取的内容，主要是匹配URL和文件类型
//  注意正则匹配
const ignoreFetch = [
    /https?:\/\/file.kuaishang.cn\//,
    /https?:\/\/pv.kuaishang.cn\//,
    /https?:\/\/hztk5.kuaishang.cn\//,
    /https?:\/\/zz.bdstatic.com\//,
    /https?:\/\/hm.baidu.com\//,
    /https?:\/\/sp0.baidu.com\//,
    /https?:\/\/ers.baidu.com\//,
    /https?:\/\/lxbjs.baidu.com\//,
    /https?:\/\/tag.baidu.com\//,
    /.php$/,
    /pma/,
    /houtai/,
];
function onInstall(event) { log('install event in progress.');
event.waitUntil(updateStaticCache()); }
function updateStaticCache() { return caches.open(cacheKey('offline')).then((cache) => { return cache.addAll(offlineResources); }).then(() => { log('installation complete!'); }); }
function onFetch(event) { const request = event.request; if (shouldAlwaysFetch(request)) { event.respondWith(networkedOrOffline(request)); return; } if (shouldFetchAndCache(request)) { event.respondWith(networkedOrCached(request)); return; } event.respondWith(cachedOrNetworked(request)); }
function networkedOrCached(request) { return networkedAndCache(request).catch(() => { return cachedOrOffline(request) }); }
function networkedAndCache(request) { return fetch(request).then((response) => { var copy = response.clone();
caches.open(cacheKey('resources')).then((cache) => { cache.put(request, copy); });
log("(network: cache write)", request.method, request.url,request.mode); return response; }); }
function cachedOrNetworked(request) { return caches.match(request).then((response) => { log(response ? '(cached)' : '(network: cache miss)', request.method, request.url,request.mode); return response || networkedAndCache(request).catch(() => { return offlineResponse(request) }); }); }
function networkedOrOffline(request) { return fetch(request).then((response) => { log('(network)', request.method, request.url,request.mode); return response; }).catch(() => { return offlineResponse(request); }); }
function cachedOrOffline(request) { return caches.match(request).then((response) => { return response || offlineResponse(request); }); }
function offlineResponse(request) { log('(offline)', request.method, request.url,request.mode); if (request.url.match(/.(jpg|png|gif|svg|jpeg)(?.*)?$/)) { return caches.match('/offline.svg'); } else { return caches.match('/offline.html'); } }
function onActivate(event) { log('activate event in progress.');
event.waitUntil(removeOldCache()); }
function removeOldCache() { return caches.keys().then((keys) => { return Promise.all(keys.filter((key) => { return !key.startsWith(version); }).map((key) => { return caches.delete(key); })); }).then(() => { log('removeOldCache completed.'); }); }
function cacheKey() { return [version, ...arguments].join(':'); }
function log() { if (!developmentMode()) { console.log("SW:", ...arguments); } }
function shouldAlwaysFetch(request) { return __DEVELOPMENT__ || request.method !== 'GET' || ignoreFetch.some(regex => request.url.match(regex)); }
function shouldFetchAndCache(request) { return ~request.headers.get('Accept').indexOf('text/html'); }
function developmentMode() { return __DEVELOPMENT__ || __DEBUG__; } log("Hello from ServiceWorker land!", version);
self.addEventListener('install', onInstall);
self.addEventListener('fetch', onFetch);
self.addEventListener("activate", onActivate);
