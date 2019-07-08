(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/app/main/main.scss":
/*!********************************!*\
  !*** ./src/app/main/main.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1562580122891
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"hmr":true,"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

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


/***/ }),

/***/ "./src/bootstrap/index.ts":
/*!********************************!*\
  !*** ./src/bootstrap/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../scss/index.scss */ "./src/scss/index.scss");
const _ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
console.log(_);
document.addEventListener('DOMContentLoaded', () => __awaiter(this, void 0, void 0, function* () {
    document.body.innerHTML = `<r-main></r-main>`;
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        yield Promise.resolve().then(() => __webpack_require__(/*! ../app/main/main */ "./src/app/main/main.ts"));
    }), 5000);
}));


/***/ }),

/***/ "./src/radioactive/radioactive.ts":
/*!****************************************!*\
  !*** ./src/radioactive/radioactive.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_html_1 = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/lit-html.js");
function evalInContext(js) {
    return eval(js);
}
const cache = {};
class Element extends HTMLElement {
    constructor() {
        super(...arguments);
        this.templateData = {};
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            const className = this.constructor.name.toLowerCase();
            if (!cache[className]) {
                const res = yield fetch(this.templateUrl);
                cache[className] = yield res.text();
            }
            this.template = (data) => {
                data.__html = lit_html_1.html;
                const js = `this.__html\`${cache[className]}\``;
                const templateResult = evalInContext.call(data, js);
                return templateResult;
            };
            this.render();
        });
    }
    render() {
        lit_html_1.render(this.template(this.templateData), this);
    }
}
exports.Element = Element;


/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1562580123941
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"hmr":true,"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},[["./src/bootstrap/index.ts","runtime","vendors~main"]]]);
//# sourceMappingURL=main.bundle.map