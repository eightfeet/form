!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.TStart=e():t.TStart=e()}(window,function(){return r={},o.m=n=[function(t,e){t.exports=function(n){var s=[];return s.toString=function(){return this.map(function(t){var e=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){t=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),e=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(e).concat([t]).join("\n")}return[n].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+e+"}":e}).join("")},s.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(n[o]=!0)}for(r=0;r<t.length;r++){var i=t[r];"number"==typeof i[0]&&n[i[0]]||(e&&!i[2]?i[2]=e:e&&(i[2]="("+i[2]+") and ("+e+")"),s.push(i))}},s}},function(t,e,r){var n,o,i,u={},f=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=n.apply(this,arguments)),o}),s=(i={},function(t,e){if("function"==typeof t)return t();if(void 0===i[t]){var n=function(t,e){return(e||document).querySelector(t)}.call(this,t,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}i[t]=n}return i[t]}),a=null,c=0,p=[],l=r(5);function d(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=u[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(Q(r.parts[i],e))}else{for(var s=[],i=0;i<r.parts.length;i++)s.push(Q(r.parts[i],e));u[r.id]={id:r.id,refs:1,parts:s}}}}function h(t,e){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],s=e.base?i[0]+e.base:i[0],i={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(i):n.push(r[s]={id:s,parts:[i]})}return n}function v(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=p[p.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),p.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");t=s(t.insertAt.before,n);n.insertBefore(e,t)}}function b(t){null!==t.parentNode&&(t.parentNode.removeChild(t),0<=(t=p.indexOf(t))&&p.splice(t,1))}function m(t){var e,n=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0!==t.attrs.nonce||(e=function(){0;return r.nc}())&&(t.attrs.nonce=e),y(n,t.attrs),v(t,n),n}function y(e,n){Object.keys(n).forEach(function(t){e.setAttribute(t,n[t])})}function Q(e,t){var n,r,o,i,s;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}return o=t.singleton?(s=c++,n=a=a||m(t),r=g.bind(null,n,s,!1),g.bind(null,n,s,!0)):e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=t,s=document.createElement("link"),void 0===i.attrs.type&&(i.attrs.type="text/css"),i.attrs.rel="stylesheet",y(s,i.attrs),v(i,s),r=function(t,e,n){var r=n.css,o=n.sourceMap,n=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||n)&&(r=l(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");o=new Blob([r],{type:"text/css"}),r=t.href;t.href=URL.createObjectURL(o),r&&URL.revokeObjectURL(r)}.bind(null,n=s,t),function(){b(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),r=function(t,e){var n=e.css,e=e.media;e&&t.setAttribute("media",e);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),function(){b(n)}),r(e),function(t){t?t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap||r(e=t):o()}}t.exports=function(t,s){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(s=s||{}).attrs="object"==typeof s.attrs?s.attrs:{},s.singleton||"boolean"==typeof s.singleton||(s.singleton=f()),s.insertInto||(s.insertInto="head"),s.insertAt||(s.insertAt="bottom");var a=h(t,s);return d(a,s),function(t){for(var e=[],n=0;n<a.length;n++){var r=a[n];(o=u[r.id]).refs--,e.push(o)}t&&d(h(t,s),s);for(var o,n=0;n<e.length;n++)if(0===(o=e[n]).refs){for(var i=0;i<o.parts.length;i++)o.parts[i]();delete u[o.id]}}};var _,O=(_=[],function(t,e){return _[t]=e,_.filter(Boolean).join("\n")});function g(t,e,n,r){n=n?"":r.css;t.styleSheet?t.styleSheet.cssText=O(e,n):(r=document.createTextNode(n),(n=t.childNodes)[e]&&t.removeChild(n[e]),n.length?t.insertBefore(r,n[e]):t.appendChild(r))}},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};if(Object.defineProperty(e,"__esModule",{value:!0}),void 0===window.Promise)throw new Error("Promise pollyfill not found.");if(void 0===window.fetch)throw new Error("fetch pollyfill not found.");n(3);n=r(n(6));e.default=n.default},function(t,e,n){var r=n(4);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(1)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(0)(!1)).push([t.i,"",""])},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){e=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(e)?t:(e=0===e.indexOf("//")?e:0===e.indexOf("/")?n+e:r+e.replace(/^\.\//,""),"url("+JSON.stringify(e)+")")})}},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(7)),n=function(t){var e=this;this.initForm=function(){e.createForm()},this.createForm=function(){document.getElementById("root").innerHTML=o.default({})},this.submit=function(){},this.reset=function(){},this.initForm()};new n({}),e.default=n},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(8));e.default=function(t){return'<form id="myForm" class="'+o.default.form+'" name="myForm">\n    <div>\n        <div>                              <label for="username">Enter name:</label> <input type="text" id="username" name="username" value="11112222"></div>\n        <div>\n            <label for="useracc">Enter account number:</label>\n            <input type="text" id="useracc" name="useracc">\n        </div>\n        <div>\n            <label for="userfile">Upload file:</label>\n            <input type="file" id="userfile" name="userfile">\n        </div>\n    </div>\n    <input type="submit" value="Submit!">\n</form>'}},function(t,e,n){var r=n(9);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(1)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(e=t.exports=n(0)(!1)).push([t.i,'._2KvW9sd2t6nzNTQhEOQpae button,._2KvW9sd2t6nzNTQhEOQpae input,._2KvW9sd2t6nzNTQhEOQpae optgroup,._2KvW9sd2t6nzNTQhEOQpae select,._2KvW9sd2t6nzNTQhEOQpae textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}._2KvW9sd2t6nzNTQhEOQpae button,._2KvW9sd2t6nzNTQhEOQpae input{overflow:visible}._2KvW9sd2t6nzNTQhEOQpae button,._2KvW9sd2t6nzNTQhEOQpae select{text-transform:none}._2KvW9sd2t6nzNTQhEOQpae button,._2KvW9sd2t6nzNTQhEOQpae [type="button"],._2KvW9sd2t6nzNTQhEOQpae [type="reset"],._2KvW9sd2t6nzNTQhEOQpae [type="submit"]{-webkit-appearance:button}._2KvW9sd2t6nzNTQhEOQpae button::-moz-focus-inner,._2KvW9sd2t6nzNTQhEOQpae [type="button"]::-moz-focus-inner,._2KvW9sd2t6nzNTQhEOQpae [type="reset"]::-moz-focus-inner,._2KvW9sd2t6nzNTQhEOQpae [type="submit"]::-moz-focus-inner{border-style:none;padding:0}._2KvW9sd2t6nzNTQhEOQpae button:-moz-focusring,._2KvW9sd2t6nzNTQhEOQpae [type="button"]:-moz-focusring,._2KvW9sd2t6nzNTQhEOQpae [type="reset"]:-moz-focusring,._2KvW9sd2t6nzNTQhEOQpae [type="submit"]:-moz-focusring{outline:1px dotted ButtonText}._2KvW9sd2t6nzNTQhEOQpae fieldset{padding:0.35em 0.75em 0.625em}._2KvW9sd2t6nzNTQhEOQpae legend{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}._2KvW9sd2t6nzNTQhEOQpae progress{vertical-align:baseline}._2KvW9sd2t6nzNTQhEOQpae textarea{overflow:auto}._2KvW9sd2t6nzNTQhEOQpae [type="checkbox"],._2KvW9sd2t6nzNTQhEOQpae [type="radio"]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}._2KvW9sd2t6nzNTQhEOQpae [type="number"]::-webkit-inner-spin-button,._2KvW9sd2t6nzNTQhEOQpae [type="number"]::-webkit-outer-spin-button{height:auto}._2KvW9sd2t6nzNTQhEOQpae [type="search"]{-webkit-appearance:textfield;outline-offset:-2px}._2KvW9sd2t6nzNTQhEOQpae [type="search"]::-webkit-search-decoration{-webkit-appearance:none}._2KvW9sd2t6nzNTQhEOQpae ::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}._2KvW9sd2t6nzNTQhEOQpae :active,._2KvW9sd2t6nzNTQhEOQpae :focus{outline:none}\n',""]),e.locals={form:"_2KvW9sd2t6nzNTQhEOQpae"}}],o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=2).default;function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var n,r});