import Element from 'demand-element/dist/index';

console.log(`THE APP LOADED`);

class TheApp extends Element {
    /* demand:inject */

}

customElements.define('the-app', TheApp);
export default TheApp;