(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{141:function(e,t,r){e.exports=r(290)},153:function(e,t,r){},172:function(e,t,r){},290:function(e,t,r){"use strict";r.r(t);var n=r(119),a=r(0),o=r.n(a),c=r(26),l=r.n(c),u=r(51),s=(r(153),r(74)),i=r.n(s),m=r(121),p=r(21),f=r(299),h=r(298),b=r(122),d=r.n(b),v=(r(172),Object(a.createContext)()),O=function(){return Object(a.useContext)(v)},g="https://flts-backend.herokuapp.com",E="",j=function(e){console.log("production");var t=Object(a.useState)(""),r=Object(p.a)(t,2),n=r[0],c=r[1],l=Object(a.useState)(""),u=Object(p.a)(l,2),s=u[0],b=u[1],v=Object(a.useState)(5),j=Object(p.a)(v,2),y=j[0],w=j[1],x=Object(a.useState)(""),k=Object(p.a)(x,2),S=k[0],C=k[1],N=Object(a.useState)(!1),P=Object(p.a)(N,2),R=P[0],L=P[1],D=Object(a.useRef)(null),U=O(),F=Object(p.a)(U,2),B=F[0].error,I=F[1];function J(e){I({type:"setError",error:e})}function W(){return(W=Object(m.a)(i.a.mark((function e(t){var r,n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.post("".concat(g,"/api/shorten/"),t);case 3:r=e.sent,n=r.data,a="".concat(E,"/").concat(n.slug),console.log("yay",n),console.log("new url: ",a),C(a),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),e.t0.response?(console.log(e.t0.response),J(e.t0.response.data)):console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}return o.a.createElement("div",{className:"App"},o.a.createElement("h1",{className:"jumbotron"},"Fix That Link, Shorter"),B&&o.a.createElement("h1",{className:"h1-error"},B),o.a.createElement("div",{className:"container"},S?o.a.createElement(o.a.Fragment,null,o.a.createElement(f.a,{as:"h1",color:"blue"},"NICE!"),o.a.createElement("form",null,o.a.createElement("textarea",{ref:D,value:S,readOnly:!0}),document.queryCommandSupported("copy")&&o.a.createElement(h.a,{onClick:function(e){D.current.select(),document.execCommand("copy"),e.target.focus(),L(!0)},disabled:R},R?"Copied!":"Copy to clipboard"))):o.a.createElement("div",{className:"main-form"},o.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),function(e){try{return new URL(e),!0}catch(t){return J("URL not valid"),!1}}(s)){J("");var t={slug:n,redirect:s,expiration:y};console.log(t),function(e){W.apply(this,arguments)}(t)}}},o.a.createElement("label",{className:"form-label",htmlFor:"url"},"URL to shorten"),o.a.createElement("input",{className:"URL not valid"===B?"form-error":"",type:"text",name:"url",onChange:function(e,t){return b(e.target.value)},label:"URL to shorten:",placeholder:"https://..."}),o.a.createElement("label",{className:"form-label",htmlFor:"slug"},"Custom /name"),o.a.createElement("input",{type:"text",name:"slug",onChange:function(e,t){return c(e.target.value)},label:"preferred slug",placeholder:"Leave blank for random generated text"}),o.a.createElement("select",{onChange:function(e,t){return w(e.target.value)},value:y},[{value:5,text:"5 mins"},{value:30,text:"30 mins"},{value:60,text:"1 hour"},{value:1440,text:"24 hours"}].map((function(e){var t=e.value,r=e.text;return o.a.createElement("option",{key:100*Math.random(),value:t},r)}))),o.a.createElement("button",{type:"submit"},"Shorten!")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var y=function(e){var t=e.slug,r=O(),n=Object(p.a)(r,2),o=(n[0].error,n[1]);return Object(a.useEffect)((function(){t&&fetch("".concat("https://flts-backend.herokuapp.com","/api/shorten/").concat(t)).then((function(e){return e.json()})).then((function(e){var t=e.redirect,r=e.message;r?(console.log(r),o({type:"setError",error:r}),Object(u.b)("/")):window.location.href=t})).catch((function(e){return console.error(e)}))})),null},w=function(e){return o.a.createElement("div",null,o.a.createElement("h1",null,"Redirect not found"))};function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}l.a.render(o.a.createElement((function(e){var t=e.reducer,r=e.initialState,n=e.children;return o.a.createElement(v.Provider,{value:Object(a.useReducer)(t,r)},n)}),{initialState:{error:""},reducer:function(e,t){switch(t.type){case"setError":return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(r,!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e,{error:t.error});default:return e}}},o.a.createElement(u.a,null,o.a.createElement(y,{path:"/:slug"}),o.a.createElement(w,{path:"notfound"}),o.a.createElement(j,{default:!0,path:"/"}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[141,1,2]]]);
//# sourceMappingURL=main.cec7facf.chunk.js.map