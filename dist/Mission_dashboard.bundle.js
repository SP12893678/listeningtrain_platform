(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{729:function(t,i,e){var a=e(750);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,e(98).default)("3c1947d6",a,!1,{})},749:function(t,i,e){"use strict";var a=e(729);e.n(a).a},750:function(t,i,e){(i=e(97)(!1)).push([t.i,"\n.jf-title {\r\n    font-size: 32px;\n}\r\n",""]),t.exports=i},760:function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-container",{attrs:{fluid:""}},[e("v-list-item",{attrs:{"two-line":""}},[e("v-list-item-content",[e("v-list-item-title",{staticClass:"jf-title pa-2"},[t._v("\n                任務系統\n            ")])],1),t._v(" "),e("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"任務搜尋","single-line":"","hide-details":""}}),t._v(" "),e("v-list-item-action",{staticClass:"ml-4 mb-0"},[e("v-btn",{attrs:{text:""},on:{click:t.goToEditPage}},[e("v-icon",{attrs:{left:""}},[t._v("mdi-book-plus-multiple")]),t._v("新增\n            ")],1)],1),t._v(" "),e("v-list-item-action",{staticClass:"mb-0"},[e("v-btn",{attrs:{color:"blue",text:""},on:{click:function(i){return i.preventDefault(),t.goToEditPage(i)}}},[e("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v("編輯\n            ")],1)],1),t._v(" "),e("v-list-item-action",{staticClass:"ml-0 mb-0"},[e("v-btn",{attrs:{color:"red",text:""}},[e("v-icon",{attrs:{left:""}},[t._v("mdi-delete")]),t._v("刪除\n            ")],1)],1)],1),t._v(" "),e("v-divider"),t._v(" "),e("v-list-item",{staticClass:"mt-4",attrs:{"two-line":""}},[e("v-list-item-content",[e("v-skeleton-loader",{attrs:{loading:t.mission_data_table.loading,type:"table"}},[e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.mission_data_table.header,items:t.missions,loading:t.mission_data_table.loading,search:t.mission_data_table.search,"item-key":"id","loading-text":"","show-select":"","multi-sort":""},scopedSlots:t._u([{key:"item.mode",fn:function(i){var e=i.item;return[t._v("\n                        "+t._s(e.required.mode.name)+"\n                    ")]}},{key:"item.detail",fn:function(i){var a=i.item;return[e("v-btn",{attrs:{icon:""},on:{click:function(i){return t.showMissionDetailDialog(a)}}},[e("v-icon",[t._v("mdi-magnify-plus-outline")])],1)]}}]),model:{value:t.mission_data_table.selected,callback:function(i){t.$set(t.mission_data_table,"selected",i)},expression:"mission_data_table.selected"}})],1)],1)],1),t._v(" "),e("v-dialog",{model:{value:t.detail_dialog.dialog,callback:function(i){t.$set(t.detail_dialog,"dialog",i)},expression:"detail_dialog.dialog"}},[e("v-card",[e("v-card-title",[t._v("任務詳細資訊")])],1)],1)],1)};a._withStripped=!0;var s=e(6),n=e.n(s),o=e(13),l=e.n(o),r=e(16),d={data:function(){return{mission_data_table:{header:[{text:"名稱",align:"start",value:"title"},{text:"敘述",value:"description"},{text:"類型",value:"type"},{text:"模式",value:"mode"},{text:"詳細資訊",value:"detail"}],selected:[],search:"",loading:!0},missions:[],mission:{},detail_dialog:{dialog:!1}}},mounted:function(){var t=this;return l()(n.a.mark((function i(){return n.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,t.getMissionData();case 2:setTimeout((function(){t.mission_data_table.loading=!1}),1e3);case 3:case"end":return i.stop()}}),i)})))()},methods:{getMissionData:function(){var t=this;return Object(r.i)({type:"get",amount:"all"}).then((function(i){t.missions=i.data,console.log(t.missions),t.missions.forEach((function(t){return t.required=JSON.parse(t.required)}))})).catch((function(t){console.error(t)}))},goToEditPage:function(){var t={mission:{id:this.mission_data_table.selected.map((function(t){return t.id}))}};this.$router.push({name:"mission-edit",params:{passdata:t}})},showMissionDetailDialog:function(t){var i=this.missions.indexOf(t);this.mission=this.missions[i],this.detail_dialog.dialog=!0}}},c=(e(749),e(79)),u=Object(c.a)(d,a,[],!1,null,null,null);u.options.__file="src/components/manage/Mission-dashboard.vue";i.default=u.exports}}]);