/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/autoload/browserdetect.js":
/*!*******************************************!*\
  !*** ./scripts/autoload/browserdetect.js ***!
  \*******************************************/
/***/ (function() {

/*eslint-disable*/
/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors

v0.5.0 2011-08-24
andrew relkin

modified, now detects:
any version of Firefox
more versions of Windows (Win8, Win7, Vista, XP, Win2k)
more versions of IE under unique conditions
more detailed support for Opera
if "no-js" in HTML class: removes and replaces with "js" (<html class="no-js">)

identifies
	browsers: Firefox; IE; Opera; Safari; Chrome, Konqueror, Iron
	browser versions: (most importantly: ie6, ie7, ie8, ie9)
	rendering engines: Webkit; Mozilla; Gecko
	platforms/OSes: Mac; Win: Win7, Vista, XP, Win2k; FreeBSD; Linux/x11 
	devices: Ipod; Ipad; Iphone; WebTV; Blackberry; Android; J2me; mobile(generic)
	enabled technology: JS

v0.6.3 2014-03-06
@silasrm <silasrm@gmail.com>
    - Added support to IE11 
        @see http://msdn.microsoft.com/en-us/library/ie/hh869301(v=vs.85).aspx
        @see http://msdn.microsoft.com/en-us/library/ie/bg182625(v=vs.85).aspx
*/

showLog = true;
function log(m) {
  if (window.console && showLog) {
    console.log(m);
  }
}

function css_browser_selector(u) {
  var uaInfo = {},
    screens = [320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560],
    allScreens = screens.length,
    ua = u.toLowerCase(),
    is = function (t) {
      return RegExp(t, "i").test(ua);
    },
    version = function (p, n) {
      n = n.replace(".", "_");
      var i = n.indexOf("_"),
        ver = "";
      while (i > 0) {
        ver += " " + p + n.substring(0, i);
        i = n.indexOf("_", i + 1);
      }
      ver += " " + p + n;
      return ver;
    },
    g = "gecko",
    w = "webkit",
    c = "chrome",
    f = "firefox",
    s = "safari",
    o = "opera",
    m = "mobile",
    a = "android",
    bb = "blackberry",
    lang = "lang_",
    dv = "device_",
    html = document.documentElement,
    b = [
      // browser
      (!/opera|webtv/i.test(ua) && /msie\s(\d+)/.test(ua)) ||
      /trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.test(ua)
        ? "ie ie" +
          (/trident\/4\.0/.test(ua)
            ? "8"
            : RegExp.$1 == "11.0"
            ? "11"
            : RegExp.$1)
        : is("firefox/")
        ? g +
          " " +
          f +
          (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
            ? " " + f + RegExp.$2 + " " + f + RegExp.$2 + "_" + RegExp.$4
            : "")
        : is("gecko/")
        ? g
        : is("opera")
        ? o +
          (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
            ? " " + o + RegExp.$2 + " " + o + RegExp.$2 + "_" + RegExp.$4
            : /opera(\s|\/)(\d+)\.(\d+)/.test(ua)
            ? " " + o + RegExp.$2 + " " + o + RegExp.$2 + "_" + RegExp.$3
            : "")
        : is("konqueror")
        ? "konqueror"
        : is("blackberry")
        ? bb +
          (/Version\/(\d+)(\.(\d+)+)/i.test(ua)
            ? " " +
              bb +
              RegExp.$1 +
              " " +
              bb +
              RegExp.$1 +
              RegExp.$2.replace(".", "_")
            : /Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua)
            ? " " +
              bb +
              RegExp.$2 +
              (RegExp.$3 ? " " + bb + RegExp.$2 + RegExp.$3 : "")
            : "")
        : // blackberry

        is("android")
        ? a +
          (/Version\/(\d+)(\.(\d+))+/i.test(ua)
            ? " " +
              a +
              RegExp.$1 +
              " " +
              a +
              RegExp.$1 +
              RegExp.$2.replace(".", "_")
            : "") +
          (/Android (.+); (.+) Build/i.test(ua)
            ? " " + dv + RegExp.$2.replace(/ /g, "_").replace(/-/g, "_")
            : "")
        : //android

        is("chrome")
        ? w +
          " " +
          c +
          (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
            ? " " +
              c +
              RegExp.$2 +
              (RegExp.$4 > 0 ? " " + c + RegExp.$2 + "_" + RegExp.$4 : "")
            : "")
        : is("iron")
        ? w + " iron"
        : is("applewebkit/")
        ? w +
          " " +
          s +
          (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
            ? " " +
              s +
              RegExp.$2 +
              " " +
              s +
              RegExp.$2 +
              RegExp.$3.replace(".", "_")
            : / Safari\/(\d+)/i.test(ua)
            ? RegExp.$1 == "419" ||
              RegExp.$1 == "417" ||
              RegExp.$1 == "416" ||
              RegExp.$1 == "412"
              ? " " + s + "2_0"
              : RegExp.$1 == "312"
              ? " " + s + "1_3"
              : RegExp.$1 == "125"
              ? " " + s + "1_2"
              : RegExp.$1 == "85"
              ? " " + s + "1_0"
              : ""
            : "")
        : //applewebkit

        is("mozilla/")
        ? g
        : "",

      // mobile
      is(
        "android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk"
      )
        ? m
        : "",

      // os/platform
      is("j2me")
        ? "j2me"
        : is("ipad|ipod|iphone")
        ? (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua)
            ? "ios" + version("ios", RegExp.$2)
            : "") +
          " " +
          (/(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : "")
        : //'iphone'
        //:is('ipod')?'ipod'
        //:is('ipad')?'ipad'
        is("playbook")
        ? "playbook"
        : is("kindle|silk")
        ? "kindle"
        : is("playbook")
        ? "playbook"
        : is("mac")
        ? "mac" +
          (/mac os x ((\d+)[.|_](\d+))/.test(ua)
            ? " mac" + RegExp.$2 + " mac" + RegExp.$1.replace(".", "_")
            : "")
        : is("win")
        ? "win" +
          (is("windows nt 6.2")
            ? " win8"
            : is("windows nt 6.1")
            ? " win7"
            : is("windows nt 6.0")
            ? " vista"
            : is("windows nt 5.2") || is("windows nt 5.1")
            ? " win_xp"
            : is("windows nt 5.0")
            ? " win_2k"
            : is("windows nt 4.0") || is("WinNT4.0")
            ? " win_nt"
            : "")
        : is("freebsd")
        ? "freebsd"
        : is("x11|linux")
        ? "linux"
        : "",

      // user agent language
      /[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua)
        ? (lang + RegExp.$2).replace("-", "_") +
          (RegExp.$3 != "" ? (" " + lang + RegExp.$1).replace("-", "_") : "")
        : "",

      // beta: test if running iPad app
      is("ipad|iphone|ipod") && !is("safari") ? "ipad_app" : "" ]; // b

  console.debug(ua);

  function screenSize() {
    var w = window.outerWidth || html.clientWidth;
    var h = window.outerHeight || html.clientHeight;
    uaInfo.orientation = w < h ? "portrait" : "landscape";
    // remove previous min-width, max-width, client-width, client-height, and orientation
    html.className = html.className
      .replace(/ ?orientation_\w+/g, "")
      .replace(/ [min|max|cl]+[w|h]_\d+/g, "");
    for (var i = allScreens - 1; i >= 0; i--) {
      if (w >= screens[i]) {
        uaInfo.maxw = screens[i];
        break;
      }
    }
    widthClasses = "";
    for (var info in uaInfo) {
      widthClasses += " " + info + "_" + uaInfo[info];
    }
    html.className = html.className + widthClasses;
    return widthClasses;
  } // screenSize

  window.onresize = screenSize;
  screenSize();

  function retina() {
    var r = window.devicePixelRatio > 1;
    if (r) {
      html.className += " retina";
    } else {
      html.className += " non-retina";
    }
  }
  retina();

  var cssbs = b.join(" ") + " js ";
  html.className = (cssbs + html.className.replace(/\b(no[-|_]?)?js\b/g, ""))
    .replace(/^ /, "")
    .replace(/ +/g, " ");

  return cssbs;
}

css_browser_selector(navigator.userAgent);


/***/ }),

/***/ "./scripts/routes/about.js":
/*!*********************************!*\
  !*** ./scripts/routes/about.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the about us page
  },
});


/***/ }),

/***/ "./scripts/routes/common.js":
/*!**********************************!*\
  !*** ./scripts/routes/common.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on all pages
  },
  finalize: function finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
});


/***/ }),

/***/ "./scripts/routes/home.js":
/*!********************************!*\
  !*** ./scripts/routes/home.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the home page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
});


/***/ }),

/***/ "./scripts/util/Router.js":
/*!********************************!*\
  !*** ./scripts/util/Router.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _camelCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camelCase */ "./scripts/util/camelCase.js");


/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
var Router = function Router(routes) {
  this.routes = routes;
};

/**
 * Fire Router events
 * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
 * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
 * @param {string} [arg] Any custom argument to be passed to the event.
 */
Router.prototype.fire = function fire (route, event, arg) {
    if ( event === void 0 ) event = 'init';

  document.dispatchEvent(new CustomEvent('routed', {
    bubbles: true,
    detail: {
      route: route,
      fn: event,
    },
  }));
    
  var fire = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function';
  if (fire) {
    this.routes[route][event](arg);
  }
};

/**
 * Automatically load and fire Router events
 *
 * Events are fired in the following order:
 ** common init
 ** page-specific init
 ** page-specific finalize
 ** common finalize
 */
Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(_camelCase__WEBPACK_IMPORTED_MODULE_0__["default"])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["default"] = (Router);


/***/ }),

/***/ "./scripts/util/camelCase.js":
/*!***********************************!*\
  !*** ./scripts/util/camelCase.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/**
 * the most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); };


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jQuery;

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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _autoload_browserdetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autoload/browserdetect.js */ "./scripts/autoload/browserdetect.js");
/* harmony import */ var _autoload_browserdetect_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_autoload_browserdetect_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/Router */ "./scripts/util/Router.js");
/* harmony import */ var _routes_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/common */ "./scripts/routes/common.js");
/* harmony import */ var _routes_home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/home */ "./scripts/routes/home.js");
/* harmony import */ var _routes_about__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/about */ "./scripts/routes/about.js");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");
// import external dependencies


// Import everything from autoload


// import local dependencies





/** Populate Router instance with DOM routes */
var routes = new _util_Router__WEBPACK_IMPORTED_MODULE_2__["default"]({
  // All pages
  common: _routes_common__WEBPACK_IMPORTED_MODULE_3__["default"],
  // Home page
  home: _routes_home__WEBPACK_IMPORTED_MODULE_4__["default"],
  // About Us page, note the change from about-us to aboutUs.
  aboutUs: _routes_about__WEBPACK_IMPORTED_MODULE_5__["default"],
});

// Load Events
jQuery(document).ready(function () { return routes.loadEvents(); });

}();
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=main.js.map