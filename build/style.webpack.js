/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scss/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scss/main.js":
/*!**********************!*\
  !*** ./scss/main.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./scss/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\n\n//# sourceURL=webpack:///./scss/main.js?");

/***/ }),

/***/ "./scss/style.scss":
/*!*************************!*\
  !*** ./scss/style.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):\\nError: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (72)\\nFor more information on which environments are supported please see:\\nhttps://github.com/sass/node-sass/releases/tag/v4.9.3\\n    at module.exports (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\node-sass\\\\lib\\\\binding.js:13:13)\\n    at Object.<anonymous> (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\node-sass\\\\lib\\\\index.js:14:35)\\n    at Module._compile (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:178:30)\\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:770:10)\\n    at Module.load (internal/modules/cjs/loader.js:628:32)\\n    at Function.Module._load (internal/modules/cjs/loader.js:555:12)\\n    at Module.require (internal/modules/cjs/loader.js:666:19)\\n    at require (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:159:20)\\n    at Object.<anonymous> (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\sass-loader\\\\lib\\\\loader.js:3:14)\\n    at Module._compile (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:178:30)\\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:770:10)\\n    at Module.load (internal/modules/cjs/loader.js:628:32)\\n    at Function.Module._load (internal/modules/cjs/loader.js:555:12)\\n    at Module.require (internal/modules/cjs/loader.js:666:19)\\n    at require (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:159:20)\\n    at loadLoader (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js:13:17)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:169:2)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:165:10)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:173:18\\n    at loadLoader (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js:36:3)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:169:2)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:165:10)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:173:18\\n    at loadLoader (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js:36:3)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:169:2)\\n    at runLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:362:2)\\n    at NormalModule.doBuild (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:265:3)\\n    at NormalModule.build (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:412:15)\\n    at Compilation.buildModule (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\Compilation.js:616:10)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\Compilation.js:994:12\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:405:6\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:155:13\\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\tapable\\\\lib\\\\HookCodeFactory.js:24:12), <anonymous>:6:1)\\n    at AsyncSeriesWaterfallHook.lazyCompileHook [as _callAsync] (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\tapable\\\\lib\\\\Hook.js:35:21)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:138:29\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:342:9\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:286:20\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:364:11\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:170:18\\n    at loadLoader (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js:27:11)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:169:2)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:165:10)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:173:18\\n    at loadLoader (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js:36:3)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:169:2)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:165:10)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:173:18\\n    at loadLoader (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js:36:3)\\n    at iteratePitchingLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:169:2)\\n    at runLoaders (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:362:2)\\n    at NormalModule.doBuild (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:265:3)\\n    at NormalModule.build (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:412:15)\\n    at Compilation.buildModule (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\Compilation.js:616:10)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\Compilation.js:994:12\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:405:6\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:155:13\\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\tapable\\\\lib\\\\HookCodeFactory.js:24:12), <anonymous>:6:1)\\n    at AsyncSeriesWaterfallHook.lazyCompileHook [as _callAsync] (X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\tapable\\\\lib\\\\Hook.js:35:21)\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:138:29\\n    at X:\\\\xampp\\\\htdocs\\\\github\\\\closed-on-mondays\\\\wp-content\\\\themes\\\\gallery\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js:342:9\\n    at processTicksAndRejections (internal/process/task_queues.js:82:9)\");\n\n//# sourceURL=webpack:///./scss/style.scss?");

/***/ })

/******/ });