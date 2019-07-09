module.exports = { contents: "\"use strict\";\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nrequire(\"../scss/index.scss\");\ndocument.addEventListener('DOMContentLoaded', () => __awaiter(this, void 0, void 0, function* () {\n    document.body.innerHTML = `<r-main></r-main>`;\n    yield $fsmp$(`../app/main/main`);\n}));\n",
dependencies: ["../scss/index.scss"],
sourceMap: {},
headerContent: undefined,
mtime: 1562580927584,
devLibsRequired : ["fuse-imports"],
ac : undefined,
_ : {}
}
