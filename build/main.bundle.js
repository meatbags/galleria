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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'babel-core'\n    at Function.Module._resolveFilename (module.js:485:15)\n    at Function.Module._load (module.js:437:25)\n    at Module.require (module.js:513:17)\n    at require (internal/module.js:11:18)\n    at Object.<anonymous> (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\babel-loader\\lib\\index.js:3:13)\n    at Module._compile (module.js:569:30)\n    at Object.Module._extensions..js (module.js:580:10)\n    at Module.load (module.js:503:32)\n    at tryModuleLoad (module.js:466:12)\n    at Function.Module._load (module.js:458:3)\n    at Module.require (module.js:513:17)\n    at require (internal/module.js:11:18)\n    at loadLoader (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\loader-runner\\lib\\loadLoader.js:13:17)\n    at iteratePitchingLoaders (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\loader-runner\\lib\\LoaderRunner.js:362:2)\n    at NormalModule.doBuild (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\NormalModule.js:182:3)\n    at NormalModule.build (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\NormalModule.js:275:15)\n    at Compilation.buildModule (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\Compilation.js:149:10)\n    at moduleFactory.create (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\Compilation.js:447:10)\n    at factory (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\NormalModuleFactory.js:241:5)\n    at applyPluginsAsyncWaterfall (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\NormalModuleFactory.js:94:13)\n    at E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\tapable\\lib\\Tapable.js:268:11\n    at NormalModuleFactory.params.normalModuleFactory.plugin (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\CompatibilityPlugin.js:52:5)\n    at NormalModuleFactory.applyPluginsAsyncWaterfall (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\tapable\\lib\\Tapable.js:272:13)\n    at resolver (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\NormalModuleFactory.js:69:10)\n    at process.nextTick (E:\\Programs\\XAMPP\\htdocs\\gallery\\wp-content\\themes\\gallery\\galleria\\galleria\\node_modules\\webpack\\lib\\NormalModuleFactory.js:194:7)\n    at _combinedTickCallback (internal/process/next_tick.js:95:7)\n    at process._tickCallback (internal/process/next_tick.js:161:9)");

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map