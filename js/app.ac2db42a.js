(function(e){function t(t){for(var s,r,o=t[0],c=t[1],d=t[2],u=0,p=[];u<o.length;u++)r=o[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);l&&l(t);while(p.length)p.shift()();return a.push.apply(a,d||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],s=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(s=!1)}s&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var s={},i={app:0},a=[];function r(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=s,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"9d14":function(e,t,n){"use strict";var s=n("eaaa"),i=n.n(s);i.a},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app",class:e.rootClasses,attrs:{id:"app"}},[n("h1",{staticClass:"title"},[e._v("Snake Game")]),n("div",{staticClass:"cells"},[n("div",{staticClass:"rows"},e._l(e.cells,(function(t,s){return n("div",{staticClass:"row"},e._l(t,(function(t,i){return n("div",{staticClass:"cell",class:e.getCellClasses([i,s]),attrs:{"data-xPos":i,"data-yPos":s}})})),0)})),0),e.isGameOver?n("div",{staticClass:"game-over-bg"},[n("button",{staticClass:"button is-warning"},[n("span",{on:{click:e.restartGame}},[e._v("Restart")])])]):e._e(),n("div",{staticClass:"controls"},[n("div",{staticClass:"speed-controls"},[n("button",{staticClass:"button is-success",on:{click:e.speedUp}},[e._v("Speed Up")]),n("div",{staticClass:"speed"},[e._v(e._s(e.speed))]),n("button",{staticClass:"button is-info",on:{click:e.speedDown}},[e._v("Speed Down")])]),n("div",{staticClass:"points is-size-2 has-text-weight-bold"},[e._v("Points: "+e._s(e.points))])])]),e.isGameOver?e._e():n("div",{staticClass:"buttons is-centered"},[n("button",{staticClass:"button is-large",on:{click:e.clickStartGame}},[e.isGameStarted?n("span",[e._v("Restart")]):n("span",[e._v("Start")])]),e.isGameStarted?n("button",{staticClass:"button is-info is-light",on:{click:e.pauseGame}},[e.isGamePaused?n("span",[e._v("Continue")]):n("span",[e._v("Pause")])]):e._e()])])},a=[],r=(n("99af"),n("caad"),n("2909")),o=n("ade3");n("92c6"),n("cb29"),n("7db0"),n("d81d");function c(e,t){return e[0]===t[0]&&e[1]===t[1]}function d(e,t){return void 0!==e.find((function(e){return c(e,t)}))}function l(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],s=e-.5+Math.random()*(t-e+1),i=e-.5+Math.random()*(t-e+1),a=[Math.round(s),Math.round(i)];return n.length&&d(n,a)?l(e,t,n):a}function u(e){var t=new Array(e).fill(0).map((function(){return new Array(e).fill(0)}));return{direction:"down",snakeCoordinates:[[0,3],[0,2],[0,1],[0,0]],appleCoordinate:l(0,e-1),speed:5,cells:t,isGameOver:!1,isGamePaused:!1,isGameStarted:!1,keyboardEventHandler:null,interval:null,points:0}}var p=15,h=s["a"].extend({name:"App",data:function(){return u(p)},computed:{rootClasses:function(){return Object(o["a"])({},"direction-".concat(this.direction),!0)}},watch:{speed:function(e){this.interval&&(clearInterval(this.interval),this.interval=setInterval(this.move,1e3/e))}},methods:{getCellClasses:function(e){return{leading:c(e,this.snakeCoordinates[0]),contained:d(this.snakeCoordinates,e),apple:c(e,this.appleCoordinate)}},speedUp:function(){this.speed<60&&this.speed++},speedDown:function(){this.speed>1&&this.speed--},addPoints:function(){this.points+=100*this.speed},move:function(){if(!this.isGamePaused){var e=null;switch(this.direction){case"up":e=[this.snakeCoordinates[0][0],this.snakeCoordinates[0][1]-1];break;case"down":e=[this.snakeCoordinates[0][0],this.snakeCoordinates[0][1]+1];break;case"left":e=[this.snakeCoordinates[0][0]-1,this.snakeCoordinates[0][1]];break;case"right":e=[this.snakeCoordinates[0][0]+1,this.snakeCoordinates[0][1]];break}if(e){var t=p-1;if(e[0]>t||e[1]>t||e[0]<0||e[1]<0)return this.finishGame();if(d(this.snakeCoordinates,e))return this.finishGame();this.snakeCoordinates.unshift(e),c(e,this.appleCoordinate)?(this.spawnNewApple(),this.addPoints()):this.snakeCoordinates.pop()}}},spawnNewApple:function(){this.appleCoordinate=l(0,p-1,[].concat(Object(r["a"])(this.snakeCoordinates),[this.appleCoordinate]))},finishGame:function(){this.isGamePaused=!1,this.isGameStarted=!1,this.isGameOver=!0,this.interval&&clearInterval(this.interval),this.interval=null,this.keyboardEventHandler&&(window.removeEventListener("keyup",this.keyboardEventHandler,!1),this.keyboardEventHandler=null)},startGame:function(){this.isGameOver=!1,this.isGamePaused=!1,this.isGameStarted=!0,this.interval=setInterval(this.move,1e3/this.speed),this.handleKeyboardEvent()},restartGame:function(){var e=this;this.finishGame(),this.$nextTick((function(){Object.assign(e.$data,u(p))}))},pauseGame:function(){this.isGamePaused=!this.isGamePaused},handleKeyboardEvent:function(){var e=this;this.keyboardEventHandler=function(t){if(!e.isGamePaused)switch(t.code){case"ArrowLeft":["up","down"].includes(e.direction)&&(e.direction="left");break;case"ArrowRight":["up","down"].includes(e.direction)&&(e.direction="right");break;case"ArrowUp":["left","right"].includes(e.direction)&&(e.direction="up");break;case"ArrowDown":["left","right"].includes(e.direction)&&(e.direction="down");break;case"Space":e.pauseGame();break}},this.$nextTick((function(){e.keyboardEventHandler&&window.addEventListener("keyup",e.keyboardEventHandler,!1)}))},clickStartGame:function(){this.isGameStarted?this.restartGame():this.startGame()}},destroyed:function(){this.finishGame()}}),f=h,v=(n("9d14"),n("2877")),b=Object(v["a"])(f,i,a,!1,null,null,null),m=b.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(m)}}).$mount("#app")},eaaa:function(e,t,n){}});
//# sourceMappingURL=app.ac2db42a.js.map