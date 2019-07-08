webpackHotUpdate("main",{

/***/ "./src/app/main/main.ts":
/*!******************************!*\
  !*** ./src/app/main/main.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Radioactive = __webpack_require__(/*! ../../radioactive/radioactive */ "./src/radioactive/radioactive.ts");
__webpack_require__(/*! ./main.scss */ "./src/app/main/main.scss");
class Main extends Radioactive.Element {
    constructor() {
        super(...arguments);
        this.templateUrl = `/src/app/main/main.template.html`;
        this.templateData = {
            test: 'yeah'
        };
    }
}
exports.default = Main;
customElements.define('r-main', Main);


/***/ })

})
//# sourceMappingURL=main.bundle.map