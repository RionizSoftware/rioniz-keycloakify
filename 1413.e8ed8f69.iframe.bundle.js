"use strict";(self.webpackChunkrioniz_keycloakify=self.webpackChunkrioniz_keycloakify||[]).push([[1413],{"./dist/login/pages/Register.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>Register});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.array.is-array.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.array.from.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/react/index.js"),_login_lib_kcClsx__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./dist/login/lib/kcClsx.js"),_tools_clsx__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("./dist/tools/clsx.js");function _slicedToArray(r,e){return function _arrayWithHoles(r){if(Array.isArray(r))return r}(r)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(r,e)||function _unsupportedIterableToArray(r,a){if(r){if("string"==typeof r)return _arrayLikeToArray(r,a);var t={}.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,a):void 0}}(r,e)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function Register(props){var kcContext=props.kcContext,i18n=props.i18n,doUseDefaultCss=props.doUseDefaultCss,Template=props.Template,classes=props.classes,UserProfileFormFields=props.UserProfileFormFields,doMakeUserConfirmPassword=props.doMakeUserConfirmPassword,kcClsx=(0,_login_lib_kcClsx__WEBPACK_IMPORTED_MODULE_14__.$)({doUseDefaultCss,classes}).kcClsx,messageHeader=kcContext.messageHeader,url=kcContext.url,messagesPerField=kcContext.messagesPerField,recaptchaRequired=kcContext.recaptchaRequired,recaptchaVisible=kcContext.recaptchaVisible,recaptchaSiteKey=kcContext.recaptchaSiteKey,recaptchaAction=kcContext.recaptchaAction,termsAcceptanceRequired=kcContext.termsAcceptanceRequired,msg=i18n.msg,msgStr=i18n.msgStr,advancedMsg=i18n.advancedMsg,_useState2=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_13__.useState)(!1),2),isFormSubmittable=_useState2[0],setIsFormSubmittable=_useState2[1],_useState4=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_13__.useState)(!1),2),areTermsAccepted=_useState4[0],setAreTermsAccepted=_useState4[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Template,Object.assign({kcContext,i18n,doUseDefaultCss,classes,headerNode:void 0!==messageHeader?advancedMsg(messageHeader):msg("registerTitle"),displayMessage:messagesPerField.exists("global"),displayRequiredFields:!0},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("form",Object.assign({id:"kc-register-form",className:kcClsx("kcFormClass"),action:url.registrationAction,method:"post"},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(UserProfileFormFields,{kcContext,i18n,kcClsx,onIsFormSubmittableValueChange:setIsFormSubmittable,doMakeUserConfirmPassword}),termsAcceptanceRequired&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(TermsAcceptance,{i18n,kcClsx,messagesPerField,areTermsAccepted,onAreTermsAcceptedValueChange:setAreTermsAccepted}),recaptchaRequired&&(recaptchaVisible||void 0===recaptchaAction)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({className:"form-group"},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({className:kcClsx("kcInputWrapperClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",{className:"g-recaptcha","data-size":"compact","data-sitekey":recaptchaSiteKey,"data-action":recaptchaAction})}))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",Object.assign({className:kcClsx("kcFormGroupClass")},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({id:"kc-form-options",className:kcClsx("kcFormOptionsClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({className:kcClsx("kcFormOptionsWrapperClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a",Object.assign({href:url.loginUrl},{children:msg("backToLogin")}))})}))})),recaptchaRequired&&!recaptchaVisible&&void 0!==recaptchaAction?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({id:"kc-form-buttons",className:kcClsx("kcFormButtonsClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("button",Object.assign({className:(0,_tools_clsx__WEBPACK_IMPORTED_MODULE_15__.W)(kcClsx("kcButtonClass","kcButtonPrimaryClass","kcButtonBlockClass","kcButtonLargeClass"),"g-recaptcha"),"data-sitekey":recaptchaSiteKey,"data-callback":function dataCallback(){document.getElementById("kc-register-form").submit()},"data-action":recaptchaAction,type:"submit"},{children:msg("doRegister")}))})):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({id:"kc-form-buttons",className:kcClsx("kcFormButtonsClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("input",{disabled:!isFormSubmittable||termsAcceptanceRequired&&!areTermsAccepted,className:kcClsx("kcButtonClass","kcButtonPrimaryClass","kcButtonBlockClass","kcButtonLargeClass"),type:"submit",value:msgStr("doRegister")})}))]}))]}))}))}function TermsAcceptance(props){var i18n=props.i18n,kcClsx=props.kcClsx,messagesPerField=props.messagesPerField,areTermsAccepted=props.areTermsAccepted,onAreTermsAcceptedValueChange=props.onAreTermsAcceptedValueChange,msg=i18n.msg;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({className:"form-group"},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",Object.assign({className:kcClsx("kcInputWrapperClass")},{children:[msg("termsTitle"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({id:"kc-registration-terms-text"},{children:msg("termsText")}))]}))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",Object.assign({className:"form-group"},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",Object.assign({className:kcClsx("kcLabelWrapperClass")},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("input",{type:"checkbox",id:"termsAccepted",name:"termsAccepted",className:kcClsx("kcCheckboxInputClass"),checked:areTermsAccepted,onChange:function onChange(e){return onAreTermsAcceptedValueChange(e.target.checked)},"aria-invalid":messagesPerField.existsError("termsAccepted")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("label",Object.assign({htmlFor:"termsAccepted",className:kcClsx("kcLabelClass")},{children:msg("acceptTerms")}))]})),messagesPerField.existsError("termsAccepted")&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",Object.assign({className:kcClsx("kcLabelWrapperClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span",{id:"input-error-terms-accepted",className:kcClsx("kcInputErrorMessageClass"),"aria-live":"polite",dangerouslySetInnerHTML:{__html:messagesPerField.get("termsAccepted")}})}))]}))]})}}}]);