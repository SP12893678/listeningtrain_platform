(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{723:function(t,e,i){var o=i(736);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,i(98).default)("1a758abd",o,!1,{})},735:function(t,e,i){"use strict";var o=i(723);i.n(o).a},736:function(t,e,i){(e=i(97)(!1)).push([t.i,"\n.jf-title[data-v-6d4f8196] {\r\n    font-size: 24px;\n}\n.app[data-v-6d4f8196] {\r\n    max-height: calc(100vh - 64px) !important;\n}\n.enviro[data-v-6d4f8196] {\r\n    width: 1000px;\r\n    height: 625px;\n}\n.objects-display[data-v-6d4f8196] {\r\n    width: calc(100% - 320px) !important;\r\n    position: absolute;\r\n    bottom: 0;\n}\r\n",""]),t.exports=e},751:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-main",{staticClass:"pr-0"},[i("canvas",{directives:[{name:"resize",rawName:"v-resize",value:t.onResizeCanvas,expression:"onResizeCanvas"}],staticClass:"enviro",attrs:{id:"enviro","data-v-step":"Enviroment-editpage-canvas"}}),t._v(" "),i("div",{staticClass:"objects-display"},[i("v-card-title",{staticClass:"jf-title"},[t._v("\n      物件列表\n    ")]),t._v(" "),i("v-divider"),t._v(" "),i("v-slide-group",{attrs:{mandatory:"","show-arrows":"","center-active":"","data-v-step":"Enviroment-editpage-object-list"},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},t._l(t.objects,(function(e,o){return i("v-slide-item",{key:e.id+o,scopedSlots:t._u([{key:"default",fn:function(n){var a=n.active;return[i("v-card",{staticClass:"ma-4",attrs:{color:a?"primary":"grey lighten-1",height:"100",width:"100"},on:{click:function(e){return t.clickObject(o)}}},[i("v-img",{attrs:{src:e.pic_src,"max-height":"100","min-height":"100","min-width":"100",contain:""}})],1)]}}],null,!0)})})),1)],1),t._v(" "),i("v-navigation-drawer",{attrs:{width:"320px",app:"",absolute:"",permanent:"",right:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[i("v-list-item",{attrs:{"two-line":""}},[i("v-list-item-content",[i("v-list-item-title",{staticClass:"font-weight-medium jf-title"},[t._v("\n            編輯區域\n          ")])],1),t._v(" "),i("v-spacer"),t._v(" "),i("v-btn",{attrs:{color:"red","data-v-step":"Enviroment-editpage-save",text:""},on:{click:t.saveEnvironment}},[i("v-icon",{attrs:{left:""}},[t._v("\n            mdi-content-save\n          ")]),t._v("儲存\n        ")],1)],1)]},proxy:!0}])},[t._v(" "),i("v-divider"),t._v(" "),i("v-list",{attrs:{shaped:""}},[i("v-list-group",{attrs:{"prepend-icon":"mdi-image-area",value:"true"},scopedSlots:t._u([{key:"activator",fn:function(){return[i("v-list-item-title",{attrs:{"data-v-step":"Enviroment-editpage-background"}},[t._v("\n            背景\n          ")])]},proxy:!0}])},[t._v(" "),i("v-divider"),t._v(" "),i("v-list-item",[i("v-list-item-content",[i("v-text-field",{attrs:{rules:t.rules.must,label:"情境名稱",outlined:"",clearable:"","hide-details":""},model:{value:t.enviro.name,callback:function(e){t.$set(t.enviro,"name",e)},expression:"enviro.name"}})],1)],1),t._v(" "),i("v-list-item",[i("v-list-item-content",[i("v-select",{attrs:{items:t.audio_type_arr,rules:t.rules.must,label:"情境類別",dense:"",outlined:"","hide-details":""},model:{value:t.enviro.category,callback:function(e){t.$set(t.enviro,"category",e)},expression:"enviro.category"}})],1)],1),t._v(" "),i("v-list-item",[i("v-list-item-content",[i("v-btn",{staticClass:"mb-4",attrs:{color:"secondary",block:""},on:{click:function(e){t.background_img_profile.dialog=!0}}},[t._v("\n              選擇情境背景\n            ")])],1)],1)],1),t._v(" "),i("v-list-group",{attrs:{"prepend-icon":"mdi-shape-plus"},scopedSlots:t._u([{key:"activator",fn:function(){return[i("v-list-item-title",{attrs:{"data-v-step":"Enviroment-editpage-object"}},[t._v("\n            物件\n          ")])]},proxy:!0}])},[t._v(" "),i("v-divider"),t._v(" "),i("v-list-item",[i("v-list-item-content",[i("v-row",[i("v-col",{staticClass:"pt-0 pb-0",attrs:{cols:"7"}},[i("v-btn",{staticClass:"mb-4",attrs:{block:"",outlined:""},on:{click:t.addnewObject}},[t._v("\n                  新增物件\n                ")])],1),t._v(" "),i("v-col",{staticClass:"pt-0 pb-0",attrs:{cols:"4"}},[i("v-btn",{attrs:{color:"error",outlined:""},on:{click:t.deleteObject}},[t._v("\n                  刪除物件\n                ")])],1)],1),t._v(" "),i("v-text-field",{attrs:{label:"物件名稱",rules:t.rules.must,dense:"",outlined:"",clearable:"","hide-details":""},model:{value:t.select_object.name,callback:function(e){t.$set(t.select_object,"name",e)},expression:"select_object.name"}}),t._v(" "),i("v-row",{staticClass:"mt-2"},[i("v-col",[i("v-text-field",{attrs:{label:"X軸位置",dense:"",outlined:"","hide-details":""},model:{value:t.select_object.position.x,callback:function(e){t.$set(t.select_object.position,"x",e)},expression:"select_object.position.x"}})],1),t._v(" "),i("v-col",[i("v-text-field",{attrs:{label:"Y軸位置",dense:"",outlined:"","hide-details":""},model:{value:t.select_object.position.y,callback:function(e){t.$set(t.select_object.position,"y",e)},expression:"select_object.position.y"}})],1)],1),t._v(" "),i("v-btn",{staticClass:"mt-2 mb-2",attrs:{color:"secondary",block:""},on:{click:function(e){t.object_img_profile.dialog=!0}}},[t._v("\n              選擇物件圖片\n            ")]),t._v(" "),i("v-slider",{staticClass:"mb-3 mt-3",attrs:{max:"20",min:"0.0001",step:"0.0001","prepend-icon":"mdi-aspect-ratio","hide-details":""},scopedSlots:t._u([{key:"append",fn:function(){return[i("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"60px"},attrs:{type:"number","single-line":"","hide-details":""},model:{value:t.select_object.scale,callback:function(e){t.$set(t.select_object,"scale",e)},expression:"select_object.scale"}})]},proxy:!0}]),model:{value:t.select_object.scale,callback:function(e){t.$set(t.select_object,"scale",e)},expression:"select_object.scale"}}),t._v(" "),i("v-slider",{attrs:{min:"0",max:"360","prepend-icon":"mdi-format-rotate-90","hide-details":""},scopedSlots:t._u([{key:"append",fn:function(){return[i("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"60px"},attrs:{type:"number","hide-details":"","single-line":""},model:{value:t.select_object.degree,callback:function(e){t.$set(t.select_object,"degree",e)},expression:"select_object.degree"}})]},proxy:!0}]),model:{value:t.select_object.degree,callback:function(e){t.$set(t.select_object,"degree",e)},expression:"select_object.degree"}}),t._v(" "),i("v-row",{staticClass:"mb-4 mt-4",attrs:{"no-gutters":""}},[i("v-col",{staticClass:"mr-2",attrs:{cols:"12",sm:"5"}},[i("v-select",{attrs:{items:t.audio_type_arr,rules:t.rules.must,label:"聲音類別",dense:"",outlined:"","hide-details":""},model:{value:t.audio_type,callback:function(e){t.audio_type=e},expression:"audio_type"}})],1),t._v(" "),i("v-col",{staticClass:"mr-0",attrs:{cols:"12",sm:"5"}},[i("v-select",{attrs:{"item-text":"name",items:t.audioName,rules:t.rules.must,label:"聲音名稱","return-object":"",dense:"",outlined:"","hide-detail":""},model:{value:t.select_object.audio,callback:function(e){t.$set(t.select_object,"audio",e)},expression:"select_object.audio"}})],1),t._v(" "),i("v-col",{attrs:{cols:"12",sm:"1"}},[i("v-btn",{attrs:{icon:""},on:{click:t.playAudio}},[i("v-icon",[t._v("mdi-volume-high")])],1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{"max-width":"1000","max-height":"600"},model:{value:t.object_img_profile.dialog,callback:function(e){t.$set(t.object_img_profile,"dialog",e)},expression:"object_img_profile.dialog"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"jf-title"},[t._v("物件圖像庫")]),t._v(" "),i("v-spacer"),t._v(" "),i("v-btn",{attrs:{icon:""},on:{click:t.changeObjectImg}},[i("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("\n            mdi-check\n          ")])],1)],1),t._v(" "),i("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""},model:{value:t.object_img_profile.tab,callback:function(e){t.$set(t.object_img_profile,"tab",e)},expression:"object_img_profile.tab"}},[i("v-tab",[t._v("雲端")]),t._v(" "),i("v-tab",[t._v("從電腦上傳")])],1),t._v(" "),i("v-tabs-items",{model:{value:t.object_img_profile.tab,callback:function(e){t.$set(t.object_img_profile,"tab",e)},expression:"object_img_profile.tab"}},[i("v-tab-item",[i("v-card",[i("v-container",{attrs:{fluid:""}},[i("v-item-group",{attrs:{mandatory:""},model:{value:t.object_img_profile.cloud_select,callback:function(e){t.$set(t.object_img_profile,"cloud_select",e)},expression:"object_img_profile.cloud_select"}},[i("v-row",t._l(t.object_img_profile.cloud_img,(function(e,o){return i("v-col",{key:o,attrs:{md:"auto"}},[i("v-item",{attrs:{value:e},scopedSlots:t._u([{key:"default",fn:function(o){var n=o.active,a=o.toggle;return[i("v-card",{attrs:{ripple:{class:"white--text"},"min-width":"100","min-height":"150","max-width":"200","max-height":"150"}},[i("v-img",{class:n?"border text-right pa-2":" text-right pa-2",attrs:{src:e,"max-height":"150","min-height":"150","min-width":"100",contain:""},on:{click:a}},[n?i("v-overlay",{attrs:{transition:"fade-transition",color:"rgba(100, 100, 255, 0.5)",absolute:""}}):t._e()],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)],1),t._v(" "),i("v-tab-item",[i("v-card",[i("v-file-input",{staticClass:"ma-2",attrs:{color:"deep-purple accent-4",label:"File input",placeholder:"Select your files","prepend-icon":"mdi-paperclip","show-size":1e3,multiple:"",counter:"",outlined:""},on:{change:function(e){return t.fileOnChange(e,"object")}},scopedSlots:t._u([{key:"selection",fn:function(e){var o=e.index,n=e.text;return[o<2?i("v-chip",{attrs:{color:"deep-purple accent-4",dark:"",label:"",small:""}},[t._v("\n                  "+t._s(n)+"\n                ")]):2===o?i("span",{staticClass:"overline grey--text text--darken-3 mx-2"},[t._v("+"+t._s(t.object_img_profile.file_input.length-2)+"\n                  File(s)")]):t._e()]}}]),model:{value:t.object_img_profile.file_input,callback:function(e){t.$set(t.object_img_profile,"file_input",e)},expression:"object_img_profile.file_input"}}),t._v(" "),i("v-container",{attrs:{fluid:""}},[i("v-item-group",{attrs:{mandatory:""},model:{value:t.object_img_profile.local_select,callback:function(e){t.$set(t.object_img_profile,"local_select",e)},expression:"object_img_profile.local_select"}},[i("v-row",t._l(t.object_img_profile.local_img,(function(e,o){return i("v-col",{key:o,attrs:{md:"auto"}},[i("v-item",{attrs:{value:e},scopedSlots:t._u([{key:"default",fn:function(o){var n=o.active,a=o.toggle;return[i("v-card",{attrs:{ripple:{class:"white--text"},"min-width":"100","min-height":"150","max-width":"200","max-height":"150"}},[i("v-img",{class:n?"border text-right pa-2":" text-right pa-2",attrs:{src:e.result,"max-height":"150","min-height":"150","min-width":"100",contain:""},on:{click:a}},[n?i("v-overlay",{attrs:{transition:"fade-transition",color:"rgba(100, 100, 255, 0.5)",absolute:""}}):t._e()],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{"max-width":"1000","max-height":"600"},model:{value:t.background_img_profile.dialog,callback:function(e){t.$set(t.background_img_profile,"dialog",e)},expression:"background_img_profile.dialog"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"jf-title"},[t._v("背景圖像庫")]),t._v(" "),i("v-spacer"),t._v(" "),i("v-btn",{attrs:{icon:""},on:{click:t.changeBackgroundImg}},[i("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("\n            mdi-check\n          ")])],1)],1),t._v(" "),i("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""},model:{value:t.background_img_profile.tab,callback:function(e){t.$set(t.background_img_profile,"tab",e)},expression:"background_img_profile.tab"}},[i("v-tab",[t._v("雲端")]),t._v(" "),i("v-tab",[t._v("從電腦上傳")])],1),t._v(" "),i("v-tabs-items",{model:{value:t.background_img_profile.tab,callback:function(e){t.$set(t.background_img_profile,"tab",e)},expression:"background_img_profile.tab"}},[i("v-tab-item",[i("v-card",[i("v-container",{attrs:{fluid:""}},[i("v-item-group",{attrs:{mandatory:""},model:{value:t.background_img_profile.cloud_select,callback:function(e){t.$set(t.background_img_profile,"cloud_select",e)},expression:"\n                  background_img_profile.cloud_select\n                "}},[i("v-row",t._l(t.background_img_profile.cloud_img,(function(e,o){return i("v-col",{key:o,attrs:{md:"auto"}},[i("v-item",{attrs:{value:e},scopedSlots:t._u([{key:"default",fn:function(o){var n=o.active,a=o.toggle;return[i("v-card",{attrs:{ripple:{class:"white--text"},"min-width":"100","min-height":"150","max-width":"200","max-height":"150"}},[i("v-img",{class:n?"border text-right pa-2":" text-right pa-2",attrs:{src:e,"max-height":"150","min-height":"150","min-width":"100",contain:""},on:{click:a}},[n?i("v-overlay",{attrs:{transition:"fade-transition",color:"rgba(100, 100, 255, 0.5)",absolute:""}}):t._e()],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)],1),t._v(" "),i("v-tab-item",[i("v-card",[i("v-file-input",{staticClass:"ma-2",attrs:{"show-size":1e3,color:"deep-purple accent-4",label:"File input",placeholder:"Select your files","prepend-icon":"mdi-paperclip",outlined:"",counter:"",multiple:""},on:{change:function(e){return t.fileOnChange(e,"background")}},scopedSlots:t._u([{key:"selection",fn:function(e){var o=e.index,n=e.text;return[o<2?i("v-chip",{attrs:{color:"deep-purple accent-4",dark:"",label:"",small:""}},[t._v("\n                  "+t._s(n)+"\n                ")]):2===o?i("span",{staticClass:"overline grey--text text--darken-3 mx-2"},[t._v("+"+t._s(t.background_img_profile.file_input.length-2)+"\n                  File(s)")]):t._e()]}}]),model:{value:t.background_img_profile.file_input,callback:function(e){t.$set(t.background_img_profile,"file_input",e)},expression:"background_img_profile.file_input"}}),t._v(" "),i("v-container",{attrs:{fluid:""}},[i("v-item-group",{attrs:{mandatory:""},model:{value:t.background_img_profile.local_select,callback:function(e){t.$set(t.background_img_profile,"local_select",e)},expression:"\n                  background_img_profile.local_select\n                "}},[i("v-row",t._l(t.background_img_profile.local_img,(function(e,o){return i("v-col",{key:o,attrs:{md:"auto"}},[i("v-item",{attrs:{value:e},scopedSlots:t._u([{key:"default",fn:function(o){var n=o.active,a=o.toggle;return[i("v-card",{attrs:{ripple:{class:"white--text"},"min-width":"100","min-height":"150","max-width":"200","max-height":"150"}},[i("v-img",{class:n?"border text-right pa-2":" text-right pa-2",attrs:{src:e.result,"max-height":"150","min-height":"150","min-width":"100",contain:""},on:{click:a}},[n?i("v-overlay",{attrs:{transition:"fade-transition",color:"rgba(100, 100, 255, 0.5)",absolute:""}}):t._e()],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{width:"600"},model:{value:t.alert.dialog,callback:function(e){t.$set(t.alert,"dialog",e)},expression:"alert.dialog"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"jf-title"},[t._v("尚未完成情境教材")]),t._v(" "),i("v-spacer"),t._v(" "),i("v-btn",{attrs:{icon:""},on:{click:function(e){t.alert.dialog=!1}}},[i("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("\n            mdi-close\n          ")])],1)],1),t._v(" "),i("v-card-text",[t._v("背景")]),t._v(" "),i("v-card-text",[i("v-card",{attrs:{width:"300"}},[i("v-row",{staticClass:"ma-0 pa-0",attrs:{outlined:"",tile:""}},[i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[t._v("\n                圖片\n              ")]),t._v(" "),i("v-row",{attrs:{justify:"center","align-self":"center"}},[i("v-icon",{attrs:{color:t.alert.enviro.background?"blue":"red"}},[t._v("\n                  "+t._s(t.alert.enviro.background?"mdi-check":"mdi-close")+"\n                ")])],1)],1),t._v(" "),i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[t._v("\n                名稱\n              ")]),t._v(" "),i("v-row",{attrs:{justify:"center","align-self":"center"}},[i("v-icon",{attrs:{color:t.alert.enviro.name?"blue":"red"}},[t._v("\n                  "+t._s(t.alert.enviro.name?"mdi-check":"mdi-close")+"\n                ")])],1)],1),t._v(" "),i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[t._v("\n                類別\n              ")]),t._v(" "),i("v-row",{attrs:{justify:"center","align-self":"center"}},[i("v-icon",{attrs:{color:t.alert.enviro.category?"blue":"red"}},[t._v("\n                  "+t._s(t.alert.enviro.category?"mdi-check":"mdi-close")+"\n                ")])],1)],1)],1)],1)],1),t._v(" "),i("v-card-text",[t._v("物件")]),t._v(" "),i("v-card-text",[i("v-card",{attrs:{width:"300"}},[i("v-row",{staticClass:"ma-0 pa-0",attrs:{outlined:"",tile:""}},[i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[t._v("\n                圖片\n              ")])],1),t._v(" "),i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[t._v("\n                名稱\n              ")])],1),t._v(" "),i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[t._v("\n                聲音\n              ")])],1)],1),t._v(" "),t._l(t.alert.objects,(function(e,o){return i("v-row",{key:o,staticClass:"ma-0 pa-0",attrs:{outlined:"",tile:""}},[i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[i("v-img",{attrs:{"aspect-ratio":"1",src:e.image,"max-height":"60","min-height":"60","min-width":"60",contain:""}})],1)],1),t._v(" "),i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[i("v-icon",{attrs:{color:e.name?"blue":"red"}},[t._v("\n                  "+t._s(e.name?"mdi-check":"mdi-close")+"\n                ")])],1)],1),t._v(" "),i("v-col",[i("v-row",{attrs:{justify:"center","align-self":"center"}},[i("v-icon",{attrs:{color:e.audio?"blue":"red"}},[t._v("\n                  "+t._s(e.audio?"mdi-check":"mdi-close")+"\n                ")])],1)],1)],1)}))],2)],1),t._v(" "),i("v-card-actions",[i("v-spacer"),t._v(" "),i("v-btn",{attrs:{text:"",block:""},on:{click:function(e){t.alert.dialog=!1}}},[i("v-icon",[t._v("mdi-check")]),t._v("確認\n        ")],1)],1)],1)],1),t._v(" "),i("v-dialog",{attrs:{"max-width":"600",persistent:""},model:{value:t.progress.dialog,callback:function(e){t.$set(t.progress,"dialog",e)},expression:"progress.dialog"}},[i("v-card",[i("v-card-title",[t._v(t._s(t.progress.text))]),t._v(" "),i("v-stepper",{attrs:{value:t.stepper.progress}},[i("v-stepper-header",[t._l(t.stepper.steps,(function(e,o){return[i("v-stepper-step",{key:o+"-step",attrs:{step:o,complete:t.stepper.progress>o}},[t._v("\n              "+t._s(e.text)+"\n            ")]),t._v(" "),o+1!==t.stepper.steps.length?i("v-divider",{key:o}):t._e()]}))],2)],1),t._v(" "),i("v-progress-linear",{attrs:{value:t.progress.value,"buffer-value":t.progress.value,color:"light-blue",stream:"",rounded:"",height:"6"}}),t._v(" "),i("v-card-actions",[i("v-btn",{attrs:{text:"",block:""},on:{click:function(e){t.progress.dialog=!1}}},[i("v-icon",[t._v("mdi-check")]),t._v("完成\n        ")],1)],1)],1)],1),t._v(" "),i("v-tour",{attrs:{name:this.$route.name,steps:t.steps}})],1)};o._withStripped=!0;var n=i(6),a=i.n(n),r=i(13),s=i.n(r),c=i(0),l=i(9),u=i.n(l),d=i(12),v=i.n(d),p=i(5),_=i.n(p),g=i(7),h=i.n(g),f=i(8),m=i.n(f),b=i(22),j=i(2);function k(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,o=_()(t);if(e){var n=_()(this).constructor;i=Reflect.construct(o,arguments,n)}else i=o.apply(this,arguments);return v()(this,i)}}c.Application;var x,y=c.Container,w=(c.loader,c.loader.resources),C=(c.utils.TextureCache,c.Sprite),E=function(t){u()(i,t);var e=k(i);function i(t,o,n,a){var r;return h()(this,i),(r=e.call(this,o,n,a)).editor=t,r.control(),r}return m()(i,[{key:"control",value:function(){var t=this;this.object_data.length<=0||this.object_data.forEach((function(e){e.sprite.click=function(){t.object_click(e)},t.object_drag(e)}))}},{key:"object_click",value:function(t){var e=this;e.object_data.forEach((function(t){t.sprite.filters=[new b.d(3,15772398)],t.sprite.mouseover=function(){this.filters=[new b.d(3,10092441)]},t.sprite.mouseout=function(){this.filters=[new b.d(3,15772398)]}})),t.sprite.mouseover=null,t.sprite.mouseout=null,t.sprite.filters=[new b.d(3,1157887)],e.editor.sprite=t.sprite,e.editor.select_object.id=t.id,e.editor.select_object.name=t.name,null!=t.audio?e.editor.audio_type=t.audio.category[0]:e.editor.audio_type=null,e.editor.select_object.audio=t.audio,e.editor.select_object.position.x=t.sprite.position.x,e.editor.select_object.position.y=t.sprite.position.y,e.editor.select_object.scale=t.sprite.scale.x,e.editor.select_object.degree=t.sprite.rotation*(180/Math.PI),e.editor.model=e.editor.objects.indexOf(t)}},{key:"object_drag",value:function(t){t.sprite.on("mousedown",this.onDragStart).on("mouseup",this.onDragEnd).on("mouseupoutside",this.onDragEnd).on("mousemove",this.onDragMove)}},{key:"onDragStart",value:function(t){this.data=t.data,this.alpha=.7,this.dragging=!0,this.offset_x=this.data.getLocalPosition(this.parent).x-this.position._x,this.offset_y=this.data.getLocalPosition(this.parent).y-this.position._y}},{key:"onDragEnd",value:function(){this.alpha=1,this.dragging=!1,this.data=null}},{key:"onDragMove",value:function(){if(this.dragging){var t=this.data.getLocalPosition(this.parent);this.position.x=t.x-this.offset_x,this.position.y=t.y-this.offset_y}}}]),i}(function(){function t(e,i,o){h()(this,t),this.app=e,this.enviro_data=i,this.object_data=o,this.enviro_container=new y,this.enviro_bg=new C,this.setup()}return m()(t,[{key:"setup",value:function(){this.drawText(),this.creat_Background(),this.creat_Objects()}},{key:"drawText",value:function(){var t=new j.Text("請使用右側編輯區功能匯入情境背景與物件"),e=new c.TextStyle({fontFamily:"jf-openhuninn",fontSize:36,fill:"#ffffff"});t.style=e,t.position.set((1e3-t.width)/2,(625-t.height)/2),this.enviro_container.addChild(t)}},{key:"creat_Background",value:function(){if(this.enviro_bg=new C,null!=this.enviro_data.background_src){var t=w[this.enviro_data.background_src].texture;this.enviro_bg.texture=t}var e=this.app.screen.width/this.enviro_bg.width;this.enviro_bg.scale.set(e,e),this.enviro_container.addChild(this.enviro_bg)}},{key:"creat_Objects",value:function(){var t=this;this.object_data.forEach((function(e){var i=w[e.pic_src].texture,o=t.creat_Object(e,i);t.enviro_container.addChild(o),e.sprite=o}))}},{key:"creat_Object",value:function(t,e){var i=new C(e),o=t.size/i.width;i.scale.set(o,o);var n=t.coordinate.split(",");return i.position.set(n[0],n[1]),i.filters=[new b.d(3,15772398)],i.interactive=!0,i.buttonMode=!0,i.mouseover=function(){i.filters=[new b.d(3,10092441)]},i.mouseout=function(){i.filters=[new b.d(3,15772398)]},i}},{key:"getBackground",value:function(){return this.enviro_bg}},{key:"getEnvironment",value:function(){return this.enviro_container}}]),t}()),O=i(16),S={props:["passdata"],data:function(){return{enviro:{},objects:[],select_object:{name:null,position:{x:null,y:null},imagefile:null,scale:null,degree:null,audio:{name:null,category:null,sound_src:null},id:null},sprite:null,audio:[],audio_type:null,audio_type_arr:[],object_img_profile:{cloud_img:[],local_img:[],file_input:[],cloud_select:[],local_select:[],tab:0,dialog:!1},background_img_profile:{cloud_img:[],local_img:[],file_input:[],cloud_select:[],local_select:[],tab:0,dialog:!1},enviro_container:null,environment:null,model:null,rules:{must:[function(t){return!!t||"必填!"}]},audio_player:new Audio,alert:{dialog:!1,enviro:{background:!1,name:!1,category:!1},objects:[]},progress:{dialog:!1,value:0,text:"儲存進度流程"},stepper:{steps:[{text:"上傳圖檔"},{text:"儲存物件"},{text:"儲存情境"}],progress:0},steps:[{target:'[data-v-step="Enviroment-editpage-canvas"]',header:{title:"情境畫面"},content:"情境畫面會是該情境於遊玩中的畫面，可於透過右側編輯區設定情境內容",params:{enableScrolling:!1}},{target:'[data-v-step="Enviroment-editpage-object-list"]',header:{title:"物件列表"},content:"顯示該情境所有物件的列表，可點選物件將同步至情境畫面和物件編輯區。",params:{enableScrolling:!1}},{target:'[data-v-step="Enviroment-editpage-background"]',header:{title:"情境教材背景編輯區"},content:"點選後將列出情境背景可編輯的各個項目，可於此對該情境進行相關設定。",params:{enableScrolling:!1}},{target:'[data-v-step="Enviroment-editpage-object"]',header:{title:"情境教材物件編輯區"},content:"點選後將列出情境物件可編輯的各個項目，可於此對該物件進行相關設定。",params:{enableScrolling:!1}},{target:'[data-v-step="Enviroment-editpage-save"]',header:{title:"情境教材編輯儲存按鈕"},content:"在編輯完該情境教材後，可點選此按鈕儲存。",params:{enableScrolling:!1}}]}},computed:{audioName:function(){var t=this;return"全部"==t.audio_type?t.audio:null!=t.audio_type?t.audio.filter((function(e){return e.category.indexOf(t.audio_type)>=0})):null}},watch:{select_object:{handler:function(t){var e=this.model;this.sprite.position.x=this.select_object.position.x,this.sprite.position.y=this.select_object.position.y,this.sprite.rotation=this.select_object.degree*(Math.PI/180),this.sprite.scale.set(this.select_object.scale,this.select_object.scale),this.objects[e].name=this.select_object.name,this.objects[e].audio=this.select_object.audio,this.objects[e].coordinate=Math.round(this.select_object.position.x)+","+Math.round(this.select_object.position.y),this.objects[e].degree=this.select_object.degree,this.objects[e].sound_src=this.select_object.audio.id,this.objects[e].scale=this.select_object.scale},deep:!0}},mounted:function(){var t=this;return s()(a.a.mark((function e(){var i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null==t.passdata.enviro&&t.$router.back(),t.getCloudBackgroundImages(),t.getCloudObjectImages(),i=-1==t.passdata.enviro.id?t.passdata.enviro.simple_id:t.passdata.enviro.id,e.next=6,t.requestDataAndLoad(i);case 6:t.enviro.id=t.passdata.enviro.id,-1==t.passdata.enviro.id&&t.objects.forEach((function(t){return t.id=-1})),t.getAudiotypes();case 9:case"end":return e.stop()}}),e)})))()},methods:{creatEnvrioment:function(){c.settings.RESOLUTION=window.devicePixelRatio||1;var t=c.Application,e=(c.Container,c.loader,c.loader.resources,c.utils.TextureCache,c.Sprite,new t({width:1e3,height:625,antialias:!0,transparent:!1,resolution:1,view:document.getElementById("enviro")}));this.environment=new E(this,e,this.enviro,this.objects),this.enviro_container=this.environment.getEnvironment(),this.enviro_container.position.set(0,0),e.stage.addChild(this.enviro_container),this.objects.length>=1&&this.environment.object_click(this.objects[0])},requestDataAndLoad:(x=s()(a.a.mark((function t(e){var i=this;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(-1==e){t.next=5;break}return t.next=3,this.get_enviro_data(e);case 3:return t.next=5,this.get_object_data(this.enviro.object.split(","));case 5:return t.next=7,this.getAudioData();case 7:this.audio.forEach((function(t){t.category=t.category.split(";")})),this.objects.forEach((function(t){i.audio.forEach((function(e){t.sound_src==e.id&&(t.audio=e)}))})),this.loadResourses();case 10:case"end":return t.stop()}}),t,this)}))),function(t){return x.apply(this,arguments)}),loadResourses:function(){var t=[];c.loader.resources["../static/images/enviro/object/object.png"]||t.push("../static/images/enviro/object/object.png"),null==this.enviro.background_src||c.loader.resources[this.enviro.background_src]||t.push(this.enviro.background_src),this.objects.forEach((function(e){c.loader.resources[e.pic_src]||t.push(e.pic_src)})),t.length<=0?this.creatEnvrioment():c.loader.add(t).load(this.creatEnvrioment)},get_enviro_data:function(t){var e=this;return Object(O.c)({type:"get",amount:"one",item:t}).then((function(t){e.enviro=t.data})).catch((function(t){console.error(t)}))},get_object_data:function(t){var e=this;return Object(O.j)({type:"get",amount:"part",items:t}).then((function(t){e.objects=t.data})).catch((function(t){console.error(t)}))},getAudioData:function(){var t=this;return Object(O.b)({type:"get",amount:"all"}).then((function(e){t.audio=e.data})).catch((function(t){console.error(t)}))},getAudiotypes:function(){var t=this;this.audio_type_arr.push("全部"),this.audio.forEach((function(e){e.category.forEach((function(e){t.audio_type_arr.indexOf(e)<0&&t.audio_type_arr.push(e)}))}))},getCloudObjectImages:function(){var t=this;return Object(O.a)({path:"images-enviro-object",extensions:["*.png"]}).then((function(e){t.object_img_profile.cloud_img=e.data})).catch((function(t){console.error(t)}))},getCloudBackgroundImages:function(){var t=this;return Object(O.a)({path:"images-enviro-background",extensions:["*.gif","*.jpg","*.png"]}).then((function(e){t.background_img_profile.cloud_img=e.data})).catch((function(t){console.error(t)}))},fileOnChange:function(t,e){var i=this;t.forEach((function(t){var o=new FileReader,n=i;o.onload=function(i){if(-1!=["image/jpeg","image/png"].indexOf(t.type)){var o={file:t,result:i.target.result};"background"==e?n.background_img_profile.local_img.push(o):n.object_img_profile.local_img.push(o)}},o.readAsDataURL(t)}))},changeObjectImg:function(){var t=this,e=0==this.object_img_profile.tab?null:this.object_img_profile.local_select.file,i=0==this.object_img_profile.tab?this.object_img_profile.cloud_select:this.object_img_profile.local_select.result;this.sprite.texture=c.Texture.from(i);var o=-1;this.objects.forEach((function(e,i){e.id==t.select_object.id&&(o=i)})),this.objects[o].pic_src=i,this.objects[o].file=e,this.object_img_profile.dialog=!1},changeBackgroundImg:function(){var t=0==this.background_img_profile.tab?null:this.background_img_profile.local_select.file,e=0==this.background_img_profile.tab?this.background_img_profile.cloud_select:this.background_img_profile.local_select.result,i=this,o=c.Texture.from(e);o.baseTexture.on("loaded",(function(){var t=1e3/o.width;i.environment.getBackground().scale.set(t,t),i.environment.getBackground().texture=o,i.background_img_profile.dialog=!1})),this.enviro.background_src=e,this.enviro.file=t},addnewObject:function(){var t=this,e={coordinate:"0,0",id:"-1",name:null,pic_src:"../static/images/enviro/object/object.png",size:"100",sound_src:null,audio:null,scale:1,angle:0},i=c.Texture.from("../static/images/enviro/object/object.png"),o=this.environment.creat_Object(e,i);e.sprite=o,e.sprite.click=function(){t.environment.object_click(e)},this.environment.object_drag(e),this.environment.getEnvironment().addChild(o),this.objects.push(e),this.clickObject(this.objects.length-1),console.log(this.objects[this.objects.length-1])},deleteObject:function(){if(!(this.objects.length<=0)){var t=this,e=this.objects.findIndex((function(e){return e.sprite==t.sprite}));this.objects[e].sprite.parent.removeChild(this.objects[e].sprite),this.objects.splice(e,1),this.objects.length>0&&this.clickObject(0)}},clickObject:function(t){this.model=t,this.environment.object_click(this.objects[t])},playAudio:function(){this.audio_player.pause=!0,this.audio_player.src=this.select_object.audio.sound_src,this.audio_player.currentTime=0,this.audio_player.play()},onResizeCanvas:function(){var t=window.innerWidth-320,e=window.innerHeight-264,i=Math.min(t/1e3,e/625);document.getElementsByClassName("enviro")[0].style.cssText="width: ".concat(1e3*i,"px; \n                                    height: ").concat(625*i,"px;")},checkEditComplete:function(){var t=this,e=!1,i=this.alert.enviro,o=i.background,n=i.name,a=i.category;o=!!this.enviro.background_src,n=!!this.enviro.name,a=!!this.enviro.category,Object.assign(this.alert.enviro,{background:o,name:n,category:a}),this.alert.objects=[],this.objects.forEach((function(e){var i={};i.name=!!e.name,i.image=e.pic_src,i.audio=!!e.audio,t.alert.objects.push(i)}));var r=this.alert.objects.filter((function(t){return!t.name||!t.audio}));return o&&n&&a&&0==r.length&&this.objects.length>0&&(e=!0),e},saveEnvironment:function(){var t=this;return s()(a.a.mark((function e(){var i,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.stepper.progress=-1,t.checkEditComplete()||!t.showUnFinishedDialog()){e.next=3;break}return e.abrupt("return");case 3:if(t.progress.dialog=!0,t.stepper.progress=0,i=[],o=[],!t.isNeedFileUpload(o,i)){e.next=10;break}return e.next=10,t.uploadFiles(o,i);case 10:new Promise((function(e,i){t.stepper.progress=1;var o=0;t.objects.forEach((function(i,n){var a=Object.assign({},i);delete a.sprite,delete a.file,Object(O.j)({type:"update",item:a}).then((function(n){n.data.result&&(i.id=n.data.id),++o>=t.objects.length&&e()}))}))})).then((function(){t.stepper.progress=2;var e=t.objects.map((function(t){return t.id}));t.enviro.object=e.join(","),Object(O.c)({type:"update",item:t.enviro}).then((function(e){t.stepper.progress=3,e.data.result&&(t.enviro.id=e.data.id)}))}));case 12:case"end":return e.stop()}}),e)})))()},showUnFinishedDialog:function(){return this.alert.title="未完成情境教材",this.alert.text="尚有物件未完成",this.alert.dialog=!0,!0},isNeedFileUpload:function(t,e){return null!=this.enviro.file&&null!=this.enviro.file&&(e.push({type:"background"}),t.push(this.enviro.file)),this.objects.forEach((function(i,o){null!=i.file&&null!=i.file&&(e.push({type:"object",index:o}),t.push(i.file))})),e.length>0},uploadFiles:function(t,e){var i=this;return s()(a.a.mark((function o(){var n,r;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return i.progress.text="正在上傳檔案",n=new FormData,t.forEach((function(t){return n.append("file[]",t)})),i,r={onUploadProgress:function(t){var e=t.loaded/t.total*100|0;i.progress.value=e}},o.next=7,Object(O.e)(n,{type:"upload",data:e},r.onUploadProgress).then((function(t){t.data.forEach((function(t){switch(t.type){case"background":i.enviro.background_src=t.filename;break;case"object":i.objects[t.index].pic_src=t.filename}}))}));case 7:case"end":return o.stop()}}),o)})))()}}},$=(i(735),i(79)),D=Object($.a)(S,o,[],!1,null,"6d4f8196",null);D.options.__file="src/components/manage/Enviroment-editpage.vue";e.default=D.exports}}]);