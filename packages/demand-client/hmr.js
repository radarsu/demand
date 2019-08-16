const hmr = new EventSource(`/hmr`);
hmr.onmessage = (e) => {
    alert(e.data);
};
//# sourceMappingURL=hmr.js.map