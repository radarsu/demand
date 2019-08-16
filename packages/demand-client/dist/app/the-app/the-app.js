import * as lit from "../../web_modules/lit-element.js";

class TheApp extends lit.LitElement {
  render() {
    return lit.html`
      <link rel="stylesheet" href="./the-app.css">
    <h1>The App ${this.test}</h1>`;
  }

  constructor() {
    super(...arguments);
    this.test = 'asdf';
  }

}

customElements.define('the-app', TheApp);
export default TheApp;