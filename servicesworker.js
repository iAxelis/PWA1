const CACHE_NAME = "pwa1-shell-v3";
const CACHE_PREFIX = "pwa1-";
const APP_ROOT = new URL("./", self.registration.scope);
const APP_SHELL = [
	"./",
	"./index.html",
	"./cafe.html",
	"./manifest.json",
	"./CSS/style.css",
	"./Javascript/app.js",
	"./Images/1.jpg",
	"./Images/2.jpg",
	"./Images/3.jpg",
	"./Images/4.jpg",
	"./Images/5.jpg",
	"./Images/6.jpg",
	"./Images/7.jpg",
	"./Images/8.jpg",
	"./Images/9.jpg",
	"./Images/10.jpg",
	"./Images/icons/icon-72x72.png",
	"./Images/icons/icon-96x96.png",
	"./Images/icons/icon-128x128.png",
	"./Images/icons/icon-144x144.png",
	"./Images/icons/icon-152x152.png",
	"./Images/icons/icon-192x192.png",
	"./Images/icons/icon-384x384.png",
	"./Images/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			const appShellUrls = APP_SHELL.map((path) => new URL(path, APP_ROOT).href);
			await cache.addAll(appShellUrls);
			await self.skipWaiting();
		})()
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				const oldAppCaches = cacheNames.filter(
					(cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME
				);
				return Promise.all(oldAppCaches.map((cacheName) => caches.delete(cacheName)));
			})
			.then(() => self.clients.claim())
	);
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	const requestUrl = new URL(event.request.url);
	if (requestUrl.origin !== APP_ROOT.origin || !requestUrl.href.startsWith(APP_ROOT.href)) return;

	event.respondWith(
		(async () => {
			let response;
			try {
				response = await fetch(event.request);
			} catch (error) {
				const cachedResponse = await caches.match(event.request);
				if (cachedResponse) return cachedResponse;

				if (event.request.mode === "navigate") {
					const offlinePage = await caches.match(new URL("index.html", APP_ROOT).href);
					if (offlinePage) return offlinePage;
				}

				throw error;
			}

			if (response.ok && response.type === "basic") {
				const cache = await caches.open(CACHE_NAME);
				await cache.put(event.request, response.clone());
			}

			return response;
		})()
	);
});
