!function(e){function t(n){if(a[n])return a[n].exports;var o=a[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o=a(1),u=n(o);!function(){window.toongine=u.default}(),window.document.write('<script src="https://cdn.jsdelivr.net/eruda/1.2.2/eruda.min.js" type="text/javascript" async></script>')},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){return!!e.handlerName||(e.callback({msg:"鍙傛暟涓嶅悎娉晘",code:-1}),!1)}function u(e){o(e)&&(window.AEJSBridge?window.AEJSBridge.dispatch(e):fe.push(e))}function r(e){o(e)&&(window.AEJSBridge?window.AEJSBridge.addEventListener(e):pe.push(e))}function d(e){o(e)&&window.AEJSBridge&&window.AEJSBridge.removeEventListener(e)}Object.defineProperty(t,"__esModule",{value:!0});var l=a(2),i=n(l),s=a(4),c=n(s),f=a(5),p=n(f),_=a(6),m=n(_),v=a(7),g=n(v),y=a(8),h=n(y),M=a(9),b=n(M),w=a(10),N=n(w),P=a(11),E=n(P),j=a(12),L=n(j),K=a(13),O=n(K),S=a(14),C=n(S),k=a(15),A=n(k),B=a(16),J=n(B),I=a(17),D=n(I),T=a(18),R=n(T),U=a(19),F=n(U),G=a(20),x=n(G),W=a(21),H=n(W),q=a(23),Q=n(q),V=a(24),z=n(V),$=a(25),X=n($),Y=a(26),Z=n(Y),ee=a(27),te=n(ee),ae=a(28),ne=n(ae),oe=a(29),ue=n(oe),re=a(30),de=n(re),le=a(31),ie=n(le),se=a(32),ce=n(se),fe=[],pe=[];if(!window.AEJSBridge){var _e=function e(){for(var t=0;t<fe.length;t++){var a=fe.shift();window.AEJSBridge.dispatch({handlerName:a.handlerName,params:a.params,callback:a.callback})}for(var n=0;n<pe.length;n++){var o=pe.shift();window.AEJSBridge.addEventListener({handlerName:o.params&&o.params.eventId&&"string"==typeof o.params.eventId?o.handlerName+("_"+o.params.eventId):o.handlerName,params:o.params,callback:o.callback})}document.removeEventListener("AEJSBridgeReady",e)};document.addEventListener("AEJSBridgeReady",_e)}t.default={dispatch:u,addEventListener:r,removeEventListener:d,device:i.default,location:c.default,media:p.default,page:m.default,app:g.default,frame:h.default,file:b.default,open:N.default,card:E.default,chat:L.default,groupChat:O.default,recommend:C.default,toonflash:A.default,trends:J.default,group:D.default,discovery:R.default,notify:F.default,contact:x.default,devTools:H.default,pay:Q.default,toon:z.default,oauth:X.default,topic:Z.default,net:te.default,minJianglWallet:ne.default,municipalWallet:ue.default,openAppWithAuthLevel:de.default,user:ie.default,storage:ce.default}},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"device",actionKeys:["makePhoneCall","getClipboardData","setClipboardData","getNetworkType","scanCode","genQrCode","rotateScreen","addCalendarEvent","deleteCalendarEvent","editCalendarEvent","getCalendarEvent","startVibrate","openGps","getSystemInfo"]})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={generate:function(e){var t=e.moduleName,a=e.actionKeys,n=e.eventKeys;if(t){var o={};return a&&a.forEach(function(e){o[e]=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};toongine.dispatch({handlerName:"action_"+t+"_"+e,params:a.params,callback:a.callback})}}),n&&n.forEach(function(e){o[e]=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};toongine.addEventListener({handlerName:a.params&&a.params.eventId&&"string"==typeof a.params.eventId?"event_"+t+"_"+e+"_"+a.params.eventId:"event_"+t+"_"+e,callback:a.callback})}}),o}}}},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"location",actionKeys:["getLocation","openLocation","chooseLocation"],eventKeys:["onLocationChange"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"media",actionKeys:["chooseImage","previewImage","audioPlay","videoPlay","audioRecord","chooseVideo"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"page",actionKeys:["setShareInfo","openShare","hideLoading","hideToast","showActionSheet","showLoading","showModal","showToast","navigateBack","navigateTo","redirectTo","hideNavigationBarLoading","setNavigationBarTitle","showNavigationBarLoading","disableLoadMore","disableRefresh","dismissLoadMore","enableLoadMore","enableRefresh","dismissRefresh"],eventKeys:["onLoadMoreListener","onRefreshListener"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"app",actionKeys:["shutdown"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"frame",actionKeys:["open","openFrame","displayFrame"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"file",actionKeys:["openDocument","getFileInfo","deleteFile","getFileList"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"open",actionKeys:["getCode","getEnv","getSystemInfo","getToken","getAppParams"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"card",actionKeys:["chooseCard","openQrCode"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"chat",actionKeys:["openChat","createSingleChat"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"groupChat",actionKeys:["create","joinGroupChat","openGroupChat"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"recommend",actionKeys:["openHome","recommendFriend"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"toonflash",actionKeys:["openHome","showUserMainView","doorgrandSet"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"trends",actionKeys:["openDetail","openEditor"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"group",actionKeys:["setGroup","create","openQrCode","discovery"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"discovery",actionKeys:["openAround","openGroup"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"notify",actionKeys:["openHome","openCatalog"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"contact",actionKeys:["openFriends","openColleagues","openCard","openContact"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(22),u=n(o);t.default={setEnableDebug:function(e){return e.params.enable?(document.getElementById("eruda")||eruda.init(),eruda._$el.show(),void e.callback({code:0,msg:"寮€鍚皟璇曞伐鍏锋垚鍔焴"})):(eruda._$el.hide(),void e.callback({code:0,msg:"鍏抽棴璋冭瘯宸ュ叿鎴愬姛~"}))},enableDebugMode:function(e){u.default.init(e)}}},function(e,t){"use strict";function a(e){l=e,d()}function n(e){setTimeout(function(){e.callback&&e.callback(r(e.handlerName),function(e){console.log("res",e)})},2e3)}function o(e){}function u(e){e&&e.callback&&e.callback(r(e.handlerName,e.params))}function r(e,t){return{data:l[e]?l[e]:"handlerName 涓嶅瓨鍦紒锛侊紒",msg:"ok !!!",code:0}}function d(){if(!window.AEJSBridge){var e=window.AEJSBridge={init:a,addEventListener:n,removeEventListener:o,dispatch:u},t=document,r=t.createEvent("Events");r.initEvent("AEJSBridgeReady"),r.bridge=e,t.dispatchEvent(r)}}Object.defineProperty(t,"__esModule",{value:!0});var l={};t.default={init:a}},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"pay",actionKeys:["openCashPay","openLuckyMoney","openGathering","stopGathering","openRecharge","checkoutPayCash"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"toon",actionKeys:["goHome"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"oauth",actionKeys:["personal","organizational"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"topic",actionKeys:["openArticle"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"net",actionKeys:["request","initDownload","pauseDownload","cancelDownload","resumeDownload","initUpload","resumeUpload","cancelUpload"],eventKeys:["onNetworkStatusChange","onDownloadProgressListener","onDownloadCompleteListener","onUploadProgressListener","onUploadCompleteListener"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"minJianglWallet",actionKeys:["qrcode","tradeList"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"municipalWallet",actionKeys:["authorized","qrcode","tradeList","recharge"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"openAppWithAuthLevel",actionKeys:["openApp"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"user",actionKeys:["getUserInfo","getUserToken"]})},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(3),u=n(o);t.default=u.default.generate({moduleName:"storage",actionKeys:["getStorageSpace","getAvailableSpace","getTotalSpace","setStorage","clearStorage","getStorage"]})}]);
