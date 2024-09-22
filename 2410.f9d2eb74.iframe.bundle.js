"use strict";(self.webpackChunkrioniz_keycloakify=self.webpackChunkrioniz_keycloakify||[]).push([[2410],{"./dist/login/pages/LoginUsername.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>LoginUsername});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),__webpack_require__("./node_modules/core-js/modules/es.array.is-array.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.array.from.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./node_modules/react/index.js"),_tools_clsx__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("./dist/tools/clsx.js"),_login_lib_kcClsx__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__("./dist/login/lib/kcClsx.js");function _slicedToArray(r,e){return function _arrayWithHoles(r){if(Array.isArray(r))return r}(r)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(r,e)||function _unsupportedIterableToArray(r,a){if(r){if("string"==typeof r)return _arrayLikeToArray(r,a);var t={}.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,a):void 0}}(r,e)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function LoginUsername(props){var _a,kcContext=props.kcContext,i18n=props.i18n,doUseDefaultCss=props.doUseDefaultCss,Template=props.Template,classes=props.classes,kcClsx=(0,_login_lib_kcClsx__WEBPACK_IMPORTED_MODULE_16__.$)({doUseDefaultCss,classes}).kcClsx,social=kcContext.social,realm=kcContext.realm,url=kcContext.url,usernameHidden=kcContext.usernameHidden,login=kcContext.login,registrationDisabled=kcContext.registrationDisabled,messagesPerField=kcContext.messagesPerField,msg=i18n.msg,msgStr=i18n.msgStr,_useState2=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_14__.useState)(!1),2),isLoginButtonDisabled=_useState2[0],setIsLoginButtonDisabled=_useState2[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Template,Object.assign({kcContext,i18n,doUseDefaultCss,classes,displayMessage:!messagesPerField.existsError("username"),displayInfo:realm.password&&realm.registrationAllowed&&!registrationDisabled,infoNode:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",Object.assign({id:"kc-registration"},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span",{children:[msg("noAccount"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("a",Object.assign({tabIndex:6,href:url.registrationUrl},{children:msg("doRegister")}))]})})),headerNode:msg("doLogIn"),socialProvidersNode:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment,{children:realm.password&&void 0!==(null==social?void 0:social.providers)&&0!==social.providers.length&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div",Object.assign({id:"kc-social-providers",className:kcClsx("kcFormSocialAccountSectionClass")},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("hr",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h2",{children:msg("identity-provider-login-label")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("ul",Object.assign({className:kcClsx("kcFormSocialAccountListClass",social.providers.length>3&&"kcFormSocialAccountListGridClass")},{children:social.providers.map((function(){for(var _len=arguments.length,_ref=new Array(_len),_key=0;_key<_len;_key++)_ref[_key]=arguments[_key];var p=_ref[0],providers=_ref[2];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("li",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("a",Object.assign({id:"social-"+p.alias,className:kcClsx("kcFormSocialAccountListButtonClass",providers.length>3&&"kcFormSocialAccountGridItem"),type:"button",href:p.loginUrl},{children:[p.iconClasses&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("i",{className:(0,_tools_clsx__WEBPACK_IMPORTED_MODULE_15__.W)(kcClsx("kcCommonLogoIdP"),p.iconClasses),"aria-hidden":"true"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span",Object.assign({className:(0,_tools_clsx__WEBPACK_IMPORTED_MODULE_15__.W)(kcClsx("kcFormSocialAccountNameClass"),p.iconClasses&&"kc-social-icon-text")},{children:p.displayName}))]}))},p.alias)}))}))]}))})},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",Object.assign({id:"kc-form"},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",Object.assign({id:"kc-form-wrapper"},{children:realm.password&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("form",Object.assign({id:"kc-form-login",onSubmit:function onSubmit(){return setIsLoginButtonDisabled(!0),!0},action:url.loginAction,method:"post"},{children:[!usernameHidden&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div",Object.assign({className:kcClsx("kcFormGroupClass")},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("label",Object.assign({htmlFor:"username",className:kcClsx("kcLabelClass")},{children:realm.loginWithEmailAllowed?realm.registrationEmailAsUsername?msg("email"):msg("usernameOrEmail"):msg("username")})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input",{tabIndex:2,id:"username",className:kcClsx("kcInputClass"),name:"username",defaultValue:null!==(_a=login.username)&&void 0!==_a?_a:"",type:"text",autoFocus:!0,autoComplete:"off","aria-invalid":messagesPerField.existsError("username")}),messagesPerField.existsError("username")&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span",Object.assign({id:"input-error",className:kcClsx("kcInputErrorMessageClass"),"aria-live":"polite"},{children:messagesPerField.getFirstError("username")}))]})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",Object.assign({className:kcClsx("kcFormGroupClass","kcFormSettingClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",Object.assign({id:"kc-form-options"},{children:realm.rememberMe&&!usernameHidden&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",Object.assign({className:"checkbox"},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("label",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input",{tabIndex:3,id:"rememberMe",name:"rememberMe",type:"checkbox",defaultChecked:!!login.rememberMe})," ",msg("rememberMe")]})}))}))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div",Object.assign({id:"kc-form-buttons",className:kcClsx("kcFormGroupClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input",{tabIndex:4,disabled:isLoginButtonDisabled,className:kcClsx("kcButtonClass","kcButtonPrimaryClass","kcButtonBlockClass","kcButtonLargeClass"),name:"login",id:"kc-login",type:"submit",value:msgStr("doLogIn")})}))]}))}))}))}))}}}]);