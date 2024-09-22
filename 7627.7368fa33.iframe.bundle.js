"use strict";(self.webpackChunkrioniz_keycloakify=self.webpackChunkrioniz_keycloakify||[]).push([[7627],{"./dist/account/pages/Sessions.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>Sessions});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.array.map.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_account_lib_kcClsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./dist/account/lib/kcClsx.js");function Sessions(props){var kcContext=props.kcContext,i18n=props.i18n,doUseDefaultCss=props.doUseDefaultCss,Template=props.Template,classes=props.classes,kcClsx=(0,_account_lib_kcClsx__WEBPACK_IMPORTED_MODULE_3__.$)({doUseDefaultCss,classes}).kcClsx,url=kcContext.url,stateChecker=kcContext.stateChecker,sessions=kcContext.sessions,msg=i18n.msg;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(Template,Object.assign({},{kcContext,i18n,doUseDefaultCss,classes},{active:"sessions"},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",Object.assign({className:kcClsx("kcContentWrapperClass")},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",Object.assign({className:"col-md-10"},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2",{children:msg("sessionsHtmlTitle")})}))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("table",Object.assign({className:"table table-striped table-bordered"},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("thead",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th",{children:msg("ip")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th",{children:msg("started")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th",{children:msg("lastAccess")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th",{children:msg("expires")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th",{children:msg("clients")})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("tbody",Object.assign({role:"rowgroup"},{children:sessions.sessions.map((function(session,index){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td",{children:session.ipAddress}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td",{children:null==session?void 0:session.started}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td",{children:null==session?void 0:session.lastAccess}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td",{children:null==session?void 0:session.expires}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td",{children:session.clients.map((function(client,clientIndex){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[client,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br",{})]},clientIndex)}))})]},index)}))}))]})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form",Object.assign({action:url.sessionsUrl,method:"post"},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input",{type:"hidden",id:"stateChecker",name:"stateChecker",value:stateChecker}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button",Object.assign({id:"logout-all-sessions",type:"submit",className:kcClsx("kcButtonDefaultClass","kcButtonClass")},{children:msg("doLogOutAllSessions")}))]}))]}))}}}]);