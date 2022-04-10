(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[0],{17:function(e,t,c){"use strict";var n=c(5),r=c.n(n),a=c(9),s=c(13),i=c(1);t.a=function(){var e=function(){var e=Object(i.useState)("waiting"),t=Object(s.a)(e,2),c=t[0],n=t[1];return{request:Object(i.useCallback)(function(){var e=Object(a.a)(r.a.mark((function e(t){var c,a,s,i,o,u=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=u.length>1&&void 0!==u[1]?u[1]:"GET",a=u.length>2&&void 0!==u[2]?u[2]:null,s=u.length>3&&void 0!==u[3]?u[3]:{"Content-Type":"application/json"},n("loading"),e.prev=4,e.next=7,fetch(t,{method:c,body:a,headers:s});case 7:if((i=e.sent).ok){e.next=10;break}throw new Error("Could not fetch ".concat(t,", status: ").concat(i.status));case 10:return e.next=12,i.json();case 12:return o=e.sent,e.abrupt("return",o);case 16:throw e.prev=16,e.t0=e.catch(4),n("error"),e.t0;case 20:case"end":return e.stop()}}),e,null,[[4,16]])})));return function(t){return e.apply(this,arguments)}}(),[]),clearError:Object(i.useCallback)((function(){n("loading")}),[]),process:c,setProcess:n}}(),t=e.request,c=e.clearError,n=e.process,o=e.setProcess,u="https://gateway.marvel.com:443/v1/public/",l="3106c8797b65de80e88f4006de48c257",j=function(){var e=Object(a.a)(r.a.mark((function e(){var c,n,a=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=a.length>0&&void 0!==a[0]?a[0]:210,e.next=3,t("".concat(u,"characters?limit=9&offset=").concat(c,"&apikey=").concat(l));case 3:return n=e.sent,e.abrupt("return",n.data.results.map((function(e){return f(e)})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=Object(a.a)(r.a.mark((function e(c){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("".concat(u,"characters?name=").concat(c,"&apikey=").concat(l));case 2:return n=e.sent,e.abrupt("return",n.data.results.map(f));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(a.a)(r.a.mark((function e(c){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("".concat(u,"characters/").concat(c,"?apikey=").concat(l));case 2:return n=e.sent,e.abrupt("return",f(n.data.results[0]));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(a.a)(r.a.mark((function e(){var c,n,a=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=a.length>0&&void 0!==a[0]?a[0]:0,e.next=3,t("".concat(u,"comics?limit=8&offset=").concat(c,"&apikey=").concat(l));case 3:return n=e.sent,e.abrupt("return",n.data.results.map((function(e){return m(e)})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(a.a)(r.a.mark((function e(c){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("".concat(u,"comics/").concat(c,"?apikey=").concat(l));case 2:return n=e.sent,e.abrupt("return",m(n.data.results[0]));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(e){return{id:e.id,name:e.name,description:e.description?e.description:"There is no description for this character",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,homepage:e.urls[0].url,wiki:e.urls[1].url,comics:e.comics.items}},m=function(e){return{id:e.id,title:e.title,description:e.description?e.description:"There is no description for this comics",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,language:e.textObjects.language||"en-us",price:e.prices.price?"".concat(e.prices.price,"$"):"not available"}};return{getAllCharacters:j,getOneCharacter:h,getComic:d,getAllComics:b,getCharacterByName:p,process:n,clearError:c,setProcess:o}}},18:function(e,t,c){"use strict";var n=c.p+"static/media/error.42292aa1.gif",r=c(0);t.a=function(){return Object(r.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:n,alt:"\u041e\u0448\u0438\u0431\u043a\u0430..."})}},22:function(e,t,c){"use strict";c(43);var n=c(0),r=function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),Object(n.jsxs)("div",{className:"skeleton",children:[Object(n.jsxs)("div",{className:"pulse skeleton__header",children:[Object(n.jsx)("div",{className:"pulse skeleton__circle"}),Object(n.jsx)("div",{className:"pulse skeleton__mini"})]}),Object(n.jsx)("div",{className:"pulse skeleton__block"}),Object(n.jsx)("div",{className:"pulse skeleton__block"}),Object(n.jsx)("div",{className:"pulse skeleton__block"})]})]})},a=c(23),s=c(18);t.a=function(e,t,c){switch(e){case"waiting":return Object(n.jsx)(r,{});case"loading":return Object(n.jsx)(a.a,{});case"confirmed":return Object(n.jsx)(t,{data:c});case"error":return Object(n.jsx)(s.a,{});default:throw new Error("Unexpected process state")}}},23:function(e,t,c){"use strict";var n=c.p+"static/media/Spinner-2.0c299348.gif",r=(c(44),c(0));t.a=function(){return Object(r.jsx)("img",{className:"spinner",src:n,alt:"Spinner Loaded"})}},33:function(e,t,c){},43:function(e,t,c){},44:function(e,t,c){},45:function(e,t,c){},46:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),a=c(24),s=c.n(a),i=c(10),o=c(3),u=(c(33),c(0)),l=function(){return Object(u.jsxs)("header",{className:"app__header",children:[Object(u.jsx)("h1",{className:"app__title",children:Object(u.jsxs)(i.b,{to:"/",children:[Object(u.jsx)("span",{children:"Marvel"})," \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043f\u043e\u0440\u0442\u0430\u043b"]})}),Object(u.jsx)("nav",{className:"app__menu",children:Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:Object(u.jsx)(i.c,{exact:!0,activeStyle:{color:"#9f0013"},to:"/",children:"\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0438"})}),"/",Object(u.jsx)("li",{children:Object(u.jsx)(i.c,{activeStyle:{color:"#9f0013"},to:"/comics",children:"\u041a\u043e\u043c\u0438\u043a\u0441\u044b"})})]})})]})},j=c(13),p=c(17),h=c(21),b=c(22),d=function(e){var t=e.data;return Object(u.jsxs)("div",{children:[Object(u.jsxs)(h.a,{children:[Object(u.jsx)("meta",{name:"description",content:"".concat(t.name)}),Object(u.jsxs)("title",{children:["Marvel - ",t.name]})]}),"Page characters:",Object(u.jsxs)("p",{children:["Name: ",t.name]}),Object(u.jsx)("img",{src:t.thumbnail,alt:""})]})},f=function(e){var t=Object(n.useState)(null),c=Object(j.a)(t,2),r=c[0],a=c[1],s=Object(o.f)().id,i=Object(p.a)(),l=i.getOneCharacter,h=i.process,f=i.setProcess;Object(n.useEffect)((function(){m()}),[]);var m=function(){l(s).then((function(e){a(e)})).then((function(){f("confirmed")})).catch((function(e){console.log(e)}))};return Object(u.jsx)(u.Fragment,{children:Object(b.a)(h,d,r)})},m=Object(n.lazy)((function(){return c.e(7).then(c.bind(null,221))})),x=Object(n.lazy)((function(){return Promise.all([c.e(2),c.e(4)]).then(c.bind(null,223))})),O=Object(n.lazy)((function(){return c.e(5).then(c.bind(null,225))})),v=Object(n.lazy)((function(){return c.e(6).then(c.bind(null,222))})),g=function(){return Object(u.jsx)(i.a,{children:Object(u.jsxs)("div",{className:"app",children:[Object(u.jsx)(l,{}),Object(u.jsx)("main",{children:Object(u.jsx)(n.Suspense,{fallback:Object(u.jsx)("span",{children:"Loading..."}),children:Object(u.jsxs)(o.c,{children:[Object(u.jsx)(o.a,{exact:!0,path:"/",children:Object(u.jsx)(x,{})}),Object(u.jsx)(o.a,{exact:!0,path:"/comics",children:Object(u.jsx)(O,{})}),Object(u.jsx)(o.a,{exact:!0,path:"/comics/:comicId",children:Object(u.jsx)(v,{})}),Object(u.jsx)(o.a,{exact:!0,path:"/characters/:id",children:Object(u.jsx)(f,{})}),Object(u.jsx)(o.a,{path:"*",children:Object(u.jsx)(m,{})})]})})})]})})};c(45);s.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(g,{})}),document.getElementById("root"))}},[[46,1,3]]]);
//# sourceMappingURL=main.40482754.chunk.js.map