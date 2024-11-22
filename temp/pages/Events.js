/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/page/Events.jsx":
/*!*****************************!*\
  !*** ./src/page/Events.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _partials_BodyPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../partials/BodyPage */ \"./src/partials/BodyPage.jsx\");\n/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Container */ \"react-bootstrap/Container\");\n/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Card */ \"react-bootstrap/Card\");\n/* harmony import */ var react_bootstrap_Card__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Card__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap/Button */ \"react-bootstrap/Button\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar EventsPage = function EventsPage(_ref) {\n  var calendarUrl = _ref.calendarUrl,\n    _ref$title = _ref.title,\n    title = _ref$title === void 0 ? \"Upcoming Events\" : _ref$title,\n    _ref$description = _ref.description,\n    description = _ref$description === void 0 ? \"Stay updated on the latest events hosted by the Trans Advocacy and Complaint Collective\" : _ref$description;\n  // Default Google Calendar URL (can be replaced via props)\n  var googleCalendarUrl = calendarUrl || \"https://calendar.google.com/calendar/embed?src=b8e2d2038d4a52e7fc437bb22ee4ac01ac38343f9bda27b51978b3f6d221d485%40group.calendar.google.com&ctz=Europe%2FLondon\";\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_partials_BodyPage__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    title: title,\n    description: description\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_2___default()), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_bootstrap_Card__WEBPACK_IMPORTED_MODULE_3___default()), {\n    className: \"mb-4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_bootstrap_Card__WEBPACK_IMPORTED_MODULE_3___default().Body), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_bootstrap_Card__WEBPACK_IMPORTED_MODULE_3___default().Title), null, \"View Our Events Calendar\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_bootstrap_Card__WEBPACK_IMPORTED_MODULE_3___default().Text), null, \"The Trans Advocacy and Complaint Collective hosts a variety of events designed to engage our members and supporters. These events cover topics like transgender rights and more. Check out the calendar below to find upcoming events and join us in making a difference.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"embed-responsive embed-responsive-16by9\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"iframe\", {\n    src: googleCalendarUrl,\n    style: {\n      border: 0,\n      width: '100%',\n      height: '600px'\n    },\n    title: \"Google Calendar\",\n    loading: \"lazy\",\n    allowFullScreen: true,\n    className: \"rounded\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", {\n    className: \"mt-3 text-muted\"\n  }, \"If the calendar fails to load, you can access it directly \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: googleCalendarUrl,\n    target: \"_blank\",\n    rel: \"noopener noreferrer\"\n  }, \"here\"), \".\")))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventsPage);\n\n//# sourceURL=webpack://website/./src/page/Events.jsx?");

/***/ }),

/***/ "./src/partials/BodyPage.jsx":
/*!***********************************!*\
  !*** ./src/partials/BodyPage.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header */ \"./src/partials/Header.jsx\");\n/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Footer */ \"./src/partials/Footer.jsx\");\n\n\n\nvar BodyPage = function BodyPage(_ref) {\n  var children = _ref.children,\n    _ref$title = _ref.title,\n    title = _ref$title === void 0 ? \"Trans Advocacy and Complaint Collective\" : _ref$title,\n    _ref$description = _ref.description,\n    description = _ref$description === void 0 ? \"\" : _ref$description,\n    _ref$header = _ref.header,\n    header = _ref$header === void 0 ? null : _ref$header;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"html\", {\n    lang: \"en\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"head\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"meta\", {\n    charSet: \"UTF-8\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"meta\", {\n    name: \"description\",\n    content: description\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"link\", {\n    href: \"https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;900&display=swap\",\n    rel: \"stylesheet\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"link\", {\n    href: \"/styles/bootstrap.min.css\",\n    rel: \"stylesheet\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"link\", {\n    href: \"/styles/style.css\",\n    rel: \"stylesheet\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"script\", {\n    src: \"/js/bootstrap/bootstrap.bundle.min.js\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"link\", {\n    rel: \"icon\",\n    href: \"/media/tacc_icon.png\",\n    sizes: \"32x32\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"link\", {\n    rel: \"icon\",\n    href: \"/media/tacc_icon.png\",\n    sizes: \"192x192\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"link\", {\n    rel: \"apple-touch-icon\",\n    href: \"/media/tacc_icon.png\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"meta\", {\n    name: \"msapplication-TileImage\",\n    content: \"/media/tacc_icon.png\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"meta\", {\n    name: \"viewport\",\n    content: \"width=device-width, initial-scale=1\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"meta\", {\n    name: \"theme-color\",\n    content: \"#121212\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"body\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: \"root\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"content\"\n  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Footer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BodyPage);\n\n//# sourceURL=webpack://website/./src/partials/BodyPage.jsx?");

/***/ }),

/***/ "./src/partials/Footer.jsx":
/*!*********************************!*\
  !*** ./src/partials/Footer.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa6 */ \"react-icons/fa6\");\n/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar Footer = function Footer() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"footer\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Row, {\n    className: \"align-items-center justify-content-center justify-content-md-between\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Col, {\n    md: 4,\n    className: \"text-center text-md-start mb-3 mb-md-0\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", {\n    className: \"m-0 footer\"\n  }, \"\\xA9 \", new Date().getFullYear(), \" Trans Advocacy and Complaint Collective\")))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);\n\n//# sourceURL=webpack://website/./src/partials/Footer.jsx?");

/***/ }),

/***/ "./src/partials/Header.jsx":
/*!*********************************!*\
  !*** ./src/partials/Header.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa6 */ \"react-icons/fa6\");\n/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar Header = function Header() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Navbar, {\n    expand: \"md\",\n    className: \"navbar-expand-md\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Navbar.Brand, {\n    href: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"logo\",\n    src: \"/media/tacc.png\",\n    alt: \"Trans Advocacy and Complaint Collective Logo\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"navbar-toggler\",\n    type: \"button\",\n    \"data-bs-toggle\": \"collapse\",\n    \"data-bs-target\": \"#navbar-menu\",\n    \"aria-controls\": \"navbar-menu\",\n    \"aria-expanded\": \"false\",\n    \"aria-label\": \"Toggle navigation\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"navbar-toggler-icon\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"collapse navbar-collapse\",\n    id: \"navbar-menu\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav, {\n    className: \"me-auto\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n    href: \"/\"\n  }, \"Home\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n    href: \"/articles/page/0.html\"\n  }, \"Articles\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n    href: \"/Events.html\"\n  }, \"Events\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n    href: \"/about.html\"\n  }, \"About\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n    href: \"/get-involved.html\"\n  }, \"Get Involved\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"social-links d-flex justify-content-center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"https://discord.gg/KMxjhabAxN\",\n    \"aria-label\": \"Discord\",\n    className: \"social\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaDiscord, {\n    size: 30,\n    style: {\n      color: \"#1976d\",\n      paddingBottom: '4px'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"https://bsky.app/profile/tacc-uk.bsky.social\",\n    className: \"mx-2\",\n    \"aria-label\": \"Bluesky\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaBluesky, {\n    size: 24,\n    style: {\n      color: \"#1976d\"\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"https://www.threads.net/@tacc40566\",\n    \"aria-label\": \"Threads\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaThreads, {\n    size: 24,\n    style: {\n      color: \"#1976d\"\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"https://www.facebook.com/profile.php?id=61567774272432\",\n    className: \"mx-2\",\n    \"aria-label\": \"Facebook\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaFacebook, {\n    size: 24,\n    style: {\n      color: \"#1976d\"\n    }\n  })))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n\n//# sourceURL=webpack://website/./src/partials/Header.jsx?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "react-bootstrap/Button":
/*!*****************************************!*\
  !*** external "react-bootstrap/Button" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Button");

/***/ }),

/***/ "react-bootstrap/Card":
/*!***************************************!*\
  !*** external "react-bootstrap/Card" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Card");

/***/ }),

/***/ "react-bootstrap/Container":
/*!********************************************!*\
  !*** external "react-bootstrap/Container" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Container");

/***/ }),

/***/ "react-icons/fa6":
/*!**********************************!*\
  !*** external "react-icons/fa6" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-icons/fa6");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/page/Events.jsx");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;