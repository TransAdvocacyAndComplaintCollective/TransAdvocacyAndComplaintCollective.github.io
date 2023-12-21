"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _app = require("firebase/app");
var _auth = require("firebase/auth");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var firebaseConfig = {
  apiKey: "AIzaSyDL2CHHhPUg9K6_tV_5Z2bUl4wWcB3-sic",
  authDomain: "ptate-df901.firebaseapp.com",
  projectId: "ptate-df901",
  storageBucket: "ptate-df901.appspot.com",
  messagingSenderId: "795297920122",
  appId: "1:795297920122:web:9cfd9b972dc92213dd77c3",
  measurementId: "G-9MPXZR194T"
};
var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
function UserStatus() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    userLoggedIn = _useState2[0],
    setUserLoggedIn = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isAdmin = _useState4[0],
    setIsAdmin = _useState4[1];
  (0, _react.useEffect)(function () {
    var unsubscribe = (0, _auth.onAuthStateChanged)(auth, function (user) {
      if (user && !user.isAnonymous) {
        setUserLoggedIn(true);
        // Determine if the user is an admin based on your logic
        // Example: check if the user has a specific role or privilege
        var isAdminUser = user.roles && user.roles.includes('admin');
        setIsAdmin(isAdminUser);
      } else {
        setUserLoggedIn(false);
        setIsAdmin(false);
      }
    });
    return function () {
      return unsubscribe();
    };
  }, []);
  if (userLoggedIn) {
    if (isAdmin) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "dropdown text-end"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: "/media/person.svg",
        alt: "mdo",
        className: "bg-light rounded-circle",
        width: "32",
        height: "32"
      }), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "dropdown-menu text-small dropdown-menu-end",
        "aria-labelledby": "dropdownUser1"
      }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        className: "dropdown-item",
        href: "/profile.html"
      }, "Profile")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("button", {
        className: "dropdown-item",
        onClick: function onClick() {
          return auth.signOut();
        }
      }, "Sign out")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        className: "dropdown-item",
        href: "/admin.html"
      }, "Admin Panel"))));
    } else {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "dropdown text-end"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: "/media/person.svg",
        alt: "mdo",
        className: "bg-light rounded-circle",
        width: "32",
        height: "32"
      }), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "dropdown-menu text-small dropdown-menu-end",
        "aria-labelledby": "dropdownUser1"
      }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        className: "dropdown-item",
        href: "/profile.html"
      }, "Profile")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("button", {
        className: "dropdown-item",
        onClick: function onClick() {
          return auth.signOut();
        }
      }, "Sign out"))));
    }
  } else {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "dropdown text-end"
    }, /*#__PURE__*/_react["default"].createElement("a", {
      href: "/login.html",
      className: "btn btn-primary"
    }, "Login"), /*#__PURE__*/_react["default"].createElement("a", {
      href: "/register.html",
      className: "btn btn-primary"
    }, "Register"));
  }
}
var _default = exports["default"] = UserStatus;