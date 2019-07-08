webpackHotUpdate("main",{

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
document.addEventListener('DOMContentLoaded', () => __awaiter(this, void 0, void 0, function* () {
    document.body.innerHTML = `<r-main></r-main>`;
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        yield Promise.resolve().then(() => __webpack_require__(/*! ../app/main/main */ "./src/app/main/main.ts"));
    }), 5000);
}));


/***/ })

})
//# sourceMappingURL=main.bundle.map