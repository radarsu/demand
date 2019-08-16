const hmr = new EventSource(`/hmr`);

hmr.onmessage = (e) => {
    console.log(`onmessage`, e);
};

hmr.addEventListener('test', (e) => {
    console.log(`test`, e);
}, false);