"use strict";(self.webpackChunkrionizkeycloakify=self.webpackChunkrionizkeycloakify||[]).push([[2502],{"./dist/login/pages/LoginResetPassword.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>LoginResetPassword});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_login_lib_kcClsx__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./dist/login/lib/kcClsx.js");function LoginResetPassword(props){var _a,kcContext=props.kcContext,i18n=props.i18n,doUseDefaultCss=props.doUseDefaultCss,Template=props.Template,classes=props.classes,kcClsx=(0,_login_lib_kcClsx__WEBPACK_IMPORTED_MODULE_2__.$)({doUseDefaultCss,classes}).kcClsx,url=kcContext.url,realm=kcContext.realm,auth=kcContext.auth,messagesPerField=kcContext.messagesPerField,msg=i18n.msg,msgStr=i18n.msgStr;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Template,Object.assign({kcContext,i18n,doUseDefaultCss,classes,displayInfo:!0,displayMessage:!messagesPerField.existsError("username"),infoNode:realm.duplicateEmailsAllowed?msg("emailInstructionUsername"):msg("emailInstruction"),headerNode:msg("emailForgotTitle")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("form",Object.assign({id:"kc-reset-password-form",className:kcClsx("kcFormClass"),action:url.loginAction,method:"post"},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",Object.assign({className:kcClsx("kcFormGroupClass")},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",Object.assign({className:kcClsx("kcLabelWrapperClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label",Object.assign({htmlFor:"username",className:kcClsx("kcLabelClass")},{children:realm.loginWithEmailAllowed?realm.registrationEmailAsUsername?msg("email"):msg("usernameOrEmail"):msg("username")}))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",Object.assign({className:kcClsx("kcInputWrapperClass")},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input",{type:"text",id:"username",name:"username",className:kcClsx("kcInputClass"),autoFocus:!0,defaultValue:null!==(_a=auth.attemptedUsername)&&void 0!==_a?_a:"","aria-invalid":messagesPerField.existsError("username")}),messagesPerField.existsError("username")&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"input-error-username",className:kcClsx("kcInputErrorMessageClass"),"aria-live":"polite",dangerouslySetInnerHTML:{__html:messagesPerField.get("username")}})]}))]})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",Object.assign({className:kcClsx("kcFormGroupClass","kcFormSettingClass")},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",Object.assign({id:"kc-form-options",className:kcClsx("kcFormOptionsClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",Object.assign({className:kcClsx("kcFormOptionsWrapperClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a",Object.assign({href:url.loginUrl},{children:msg("backToLogin")}))})}))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",Object.assign({id:"kc-form-buttons",className:kcClsx("kcFormButtonsClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input",{className:kcClsx("kcButtonClass","kcButtonPrimaryClass","kcButtonBlockClass","kcButtonLargeClass"),type:"submit",value:msgStr("doSubmit")})}))]}))]}))}))}}}]);