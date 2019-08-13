// Register your service worker:
navigator.serviceWorker.register('/sw.js');

// Then later, request a one-off sync:
navigator.serviceWorker.ready.then((swRegistration) => {
    return swRegistration.sync.register('myFirstSync');
});