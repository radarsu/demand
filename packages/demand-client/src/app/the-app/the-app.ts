import * as lit from 'lit-element';

class TheApp extends lit.LitElement {
    test = 'asdf';
}

customElements.define('the-app', TheApp);
export default TheApp;
