(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[50],{1651:function(e,t,r){"use strict";r.r(t);var n=r(2),a=r(49),c=r(13),i=r(759),o=r(86),s=r(478),l=r(0),d=(r(341),r(342),r(807),r(284)),u=r(129),f=r(885),j=r(29),b=(r(981),r(28),r(142)),x=(r(286),r(179)),h=r.p+"static/media/vedio.c15bc5c5.mp4",m=r(27),p=r(868),v=(r(181),r(869)),O=r(123),g=(r(50),r(1));t.default=function(){var e=Object(l.useState)(""),t=Object(c.a)(e,2),r=t[0],k=t[1],y=Object(l.useState)(""),S=Object(c.a)(y,2),w=S[0],I=S[1],C=Object(l.useState)(!1),P=Object(c.a)(C,2),N=P[0],M=P[1],D=Object(l.useState)(),z=Object(c.a)(D,2),R=z[0],T=z[1],F=Object(l.useState)(),A=Object(c.a)(F,2),L=A[0],W=A[1],B=Object(l.useState)(),J=Object(c.a)(B,2),E=J[0],H=J[1];Object(j.b)(),Object(j.c)((function(e){return e.auth.user}));Object(l.useEffect)((function(){var e=null;return E>0&&(e=setInterval((function(){H((function(e){return e-1}))}),1e3)),function(){return clearInterval(e)}}),[E]);var Z=Object(m.m)(),_=Object(l.useState)(),U=Object(c.a)(_,2),X=(U[0],U[1],function(){var e=Object(a.a)(Object(n.a)().mark((function e(){var t,a,c,i,o;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("serialNo",r),M(!0),""==r&&(M(!1),b.b.error("Please enter valid serial Id"),console.log("Invalid serial Id!")),t=new O.a.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/ZXH0joDgntCcC0smUwnYIZc8x2CdsaM8"),a=new O.a.Contract(v.address,p.abi,t),console.log("factoryAddr",a),e.next=8,a.serials(r);case 8:c=e.sent,I(c),console.log("res",w),i=c[0].toLowerCase(),W(i),o=parseInt(c[1]._hex),console.log("res?._tokenId?",c),"0"==(o=o.toString())&&""!=r&&(b.b.error("Incorrect serial Id!"),console.log("Incorrect serial Id!")),T(o),console.log("address",i),console.log("tokenId",o);case 22:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return 0==E&&void 0!=R&&"0"!=R&&Z("/tracking/"+r,{state:{tokenId:R,address:L}}),Object(g.jsxs)(i.a,{position:"relative",sx:{height:"100vh",overflow:"hidden"},children:[Object(g.jsx)("video",{src:h,loop:!0,autoPlay:"true"}),Object(g.jsx)(o.a,{item:!0,md:12,xs:12,position:"absolute",sx:{width:"100%"},children:Object(g.jsxs)(o.a,{"container-fluid":!0,children:[Object(g.jsx)(o.a,{sx:{textAlign:"center",marginTop:"30px"},children:Object(g.jsx)("img",{className:"mainLogo",src:x.a,alt:"logo"})}),Object(g.jsxs)(o.a,{sx:{marginTop:{xs:"100px",md:"200px"},marginLeft:{xs:"20px",md:"0px"},marginRight:{xs:"20px",md:"none"}},children:[Object(g.jsxs)(u.a,{variant:"h1",sx:{fontFamily:"Public Sans !important",fontStyle:"normal !important",fontWeight:"700",textAlign:"center",fontSize:{xs:"12px",sm:"30px",md:"30px",lg:"30px"},lineHeight:{xs:"1",sm:"1",md:"33px",lg:"33px"},color:"white"},children:["Track your NFT history"," "]}),Object(g.jsxs)(s.a,{className:"trackBox",children:[Object(g.jsx)("input",{className:"trackInput",placeholder:"Serial Id",onChange:function(e){k(e.target.value)}}),1==N&&"0"!=R?Object(g.jsx)(d.a,{sx:{alignSelf:"center !important"},className:"createTrack",size:"small",variant:"outlined",onClick:function(){H(3),X()},children:Object(g.jsx)(f.a,{sx:{width:"30px !important",height:"30px  !important",color:"#ffff"}})}):Object(g.jsx)(d.a,{sx:{alignSelf:"center !important"},className:"createTrack",size:"small",variant:"contained",color:"secondary",onClick:function(){H(6),X()},children:"Track"})]}),Object(g.jsx)(o.a,{container:!0,justifyContent:"center",children:Object(g.jsx)(u.a,{variant:"h4",mt:-1,mb:1,sx:{fontFamily:"Public Sans !important",fontStyle:"normal !important",fontWeight:"600",textAlign:"center",fontSize:{xs:"12px",sm:"15px",md:"15px",lg:"15px"},color:"#2fc1ff"},children:1==N&&"0"!=R?"Please wait for tracking...":""})}),Object(g.jsx)(s.a,{children:Object(g.jsxs)(u.a,{variant:"h4",sx:{fontFamily:"Public Sans !important",fontStyle:"normal !important",fontWeight:"400",textAlign:"center",fontSize:{xs:"12px",sm:"15px",md:"15px",lg:"15px"},color:"white"},children:["By initiating authentication, you declare that you accept our"," ",Object(g.jsx)("a",{href:"",style:{color:"#ffff"},children:"Legal Notice"})," ","and"," ",Object(g.jsx)("a",{href:"",style:{color:"#ffff"},children:"Privacy Policy."})]})})]})]})})]})}},807:function(e,t,r){},885:function(e,t,r){"use strict";var n=r(116),a=r(11),c=r(3),i=r(0),o=r(16),s=r(231),l=r(143),d=r(18),u=r(21),f=r(12),j=r(232),b=r(177);function x(e){return Object(b.a)("MuiCircularProgress",e)}Object(j.a)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var h,m,p,v,O,g,k,y,S=r(1),w=["className","color","disableShrink","size","style","thickness","value","variant"],I=44,C=Object(l.d)(O||(O=h||(h=Object(n.a)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),P=Object(l.d)(g||(g=m||(m=Object(n.a)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),N=Object(f.a)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,t[r.variant],t["color".concat(Object(d.a)(r.color))]]}})((function(e){var t=e.ownerState,r=e.theme;return Object(c.a)({display:"inline-block"},"determinate"===t.variant&&{transition:r.transitions.create("transform")},"inherit"!==t.color&&{color:(r.vars||r).palette[t.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&Object(l.b)(k||(k=p||(p=Object(n.a)(["\n      animation: "," 1.4s linear infinite;\n    "]))),C)})),M=Object(f.a)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,t){return t.svg}})({display:"block"}),D=Object(f.a)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,t){var r=e.ownerState;return[t.circle,t["circle".concat(Object(d.a)(r.variant))],r.disableShrink&&t.circleDisableShrink]}})((function(e){var t=e.ownerState,r=e.theme;return Object(c.a)({stroke:"currentColor"},"determinate"===t.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var t=e.ownerState;return"indeterminate"===t.variant&&!t.disableShrink&&Object(l.b)(y||(y=v||(v=Object(n.a)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),P)})),z=i.forwardRef((function(e,t){var r=Object(u.a)({props:e,name:"MuiCircularProgress"}),n=r.className,i=r.color,l=void 0===i?"primary":i,f=r.disableShrink,j=void 0!==f&&f,b=r.size,h=void 0===b?40:b,m=r.style,p=r.thickness,v=void 0===p?3.6:p,O=r.value,g=void 0===O?0:O,k=r.variant,y=void 0===k?"indeterminate":k,C=Object(a.a)(r,w),P=Object(c.a)({},r,{color:l,disableShrink:j,size:h,thickness:v,value:g,variant:y}),z=function(e){var t=e.classes,r=e.variant,n=e.color,a=e.disableShrink,c={root:["root",r,"color".concat(Object(d.a)(n))],svg:["svg"],circle:["circle","circle".concat(Object(d.a)(r)),a&&"circleDisableShrink"]};return Object(s.a)(c,x,t)}(P),R={},T={},F={};if("determinate"===y){var A=2*Math.PI*((I-v)/2);R.strokeDasharray=A.toFixed(3),F["aria-valuenow"]=Math.round(g),R.strokeDashoffset="".concat(((100-g)/100*A).toFixed(3),"px"),T.transform="rotate(-90deg)"}return Object(S.jsx)(N,Object(c.a)({className:Object(o.a)(z.root,n),style:Object(c.a)({width:h,height:h},T,m),ownerState:P,ref:t,role:"progressbar"},F,C,{children:Object(S.jsx)(M,{className:z.svg,ownerState:P,viewBox:"".concat(22," ").concat(22," ").concat(I," ").concat(I),children:Object(S.jsx)(D,{className:z.circle,style:R,ownerState:P,cx:I,cy:I,r:(I-v)/2,fill:"none",strokeWidth:v})})}))}));t.a=z},981:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r(13),a=r(8),c=r(0),i=r(885),o=r(129),s=r(478),l=r(1);function d(e){return Object(l.jsxs)(s.a,{sx:{position:"relative",display:"inline-flex"},children:[Object(l.jsx)(i.a,Object(a.a)({variant:"determinate"},e)),Object(l.jsx)(s.a,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:Object(l.jsx)(o.a,{variant:"caption",component:"div",color:"text.secondary",children:"".concat(Math.round(e.value),"%")})})]})}function u(){var e=c.useState(10),t=Object(n.a)(e,2),r=t[0],a=t[1];return c.useEffect((function(){var e=setInterval((function(){a((function(e){return e>=100?0:e+5}))}),1500);return function(){clearInterval(e)}}),[]),Object(l.jsx)(d,{value:r})}}}]);
//# sourceMappingURL=50.d6a43b2a.chunk.js.map