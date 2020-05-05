(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["table"],{"28cd":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-document"}),e._v(" issues查看\n            ")]),a("el-breadcrumb-item",[e._v("IssuesTables")])],1),a("div",{staticClass:"crumbs"})],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.delAllSelection}},[e._v("批量删除")]),a("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"过滤类型"},model:{value:e.para1,callback:function(t){e.para1=t},expression:"para1"}},[a("el-option",{key:"1",attrs:{label:"issue列表名",value:"tablesName"}}),a("el-option",{key:"2",attrs:{label:"开发商",value:"builder"}}),a("el-option",{key:"3",attrs:{label:"列表号",value:"tablesId"}})],1),a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"输入参数"},model:{value:e.para2,callback:function(t){e.para2=t},expression:"para2"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("搜索")])],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:"","header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"tablesId",label:"列表号",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"tablesName",label:"issue列表名"}}),a("el-table-column",{attrs:{prop:"builder",label:"开发商"}}),a("el-table-column",{attrs:{prop:"date",label:"创建日期"}}),a("el-table-column",{attrs:{label:"操作",width:"380",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-folder-opened"},on:{click:function(a){return e.getTable(t.row)}}},[e._v("选择列表")]),a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.query.pageIndex,"page-size":e.query.pageSize,total:e.totalElements,pagerCount:5},on:{"current-change":e.handlePageChange}})],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"issue列表名"}},[a("el-input",{model:{value:e.form.builder,callback:function(t){e.$set(e.form,"builder",t)},expression:"form.builder"}})],1),a("el-form-item",{attrs:{label:"开发商"}},[a("el-input",{model:{value:e.form.tablesName,callback:function(t){e.$set(e.form,"tablesName",t)},expression:"form.tablesName"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1)],1)},i=[],l=(a("7f7f"),a("365c")),r=a("7ed4"),n={name:"IssuesTables",data:function(){return{query:{querypara:"",pageIndex:1,pageSize:5},para1:"tablesId",para2:"",tableData:[],totalElements:0,multipleSelection:[],delList:[],editVisible:!1,form:{},idx:-1,userProperty:{}}},created:function(){this.getData(),this.userProperty=JSON.parse(window.sessionStorage.getItem("userProperty"))},methods:{getData:function(){var e=this;Object(l["c"])(this.query).then((function(t){var a=t.tables;e.tableData=a.content,e.totalElements=a.totalElements||50}))},handlePageChange:function(e){this.$set(this.query,"pageIndex",e),this.getData()},handleSearch:function(){this.$set(this.query,"pageIndex",1);var e=this.para1.concat(" "+this.para2);this.$set(this.query,"querypara",e),this.getData()},getTable:function(e){window.sessionStorage.setItem("tablesId",e.tablesId),r["a"].$emit("tableIdChange",e.tablesId),this.$router.push("/issues")},handleDelete:function(e,t){var a=this;"type1"===this.userProperty.authority?this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){Object(l["a"])({tablesId:t.tablesId}),a.$message.success("删除成功"),a.tableData.splice(e,1)})).catch((function(){})):this.$message.error("删除失败,您没有权限删除")},handleSelectionChange:function(e){this.multipleSelection=e},delAllSelection:function(){if("type1"===this.userProperty.authority){var e=this.multipleSelection.length,t="";this.delList=this.delList.concat(this.multipleSelection);for(var a=0;a<e;a++)t+=this.multipleSelection[a].name+" ";this.$message.error("删除了".concat(t)),this.multipleSelection=[]}else this.$message.error("删除失败,您没有权限删除")},handleEdit:function(e,t){"type1"===this.userProperty.authority?(this.idx=e,this.form=t,this.editVisible=!0,this.$message.success("修改成功")):this.$message.error("修改失败,您没有权限修改")},saveEdit:function(){this.editVisible=!1,this.$message.success("修改第 ".concat(this.idx+1," 行成功")),console.log(this.form),Object(l["b"])(this.form),this.idx=-1,this.form={}}}},o=n,c=(a("dd62"),a("2877")),u=Object(c["a"])(o,s,i,!1,null,"40da9f9d",null);t["default"]=u.exports},"2c24":function(e,t,a){},3224:function(e,t,a){"use strict";var s=a("6904"),i=a.n(s);i.a},"365c":function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return c})),a.d(t,"g",(function(){return u})),a.d(t,"e",(function(){return d})),a.d(t,"f",(function(){return p})),a.d(t,"d",(function(){return h})),a.d(t,"h",(function(){return b})),a.d(t,"i",(function(){return m}));var s=a("bc3a"),i=a.n(s),l=i.a.create({baseURL:"http://localhost:8090/api",timeout:5e3});l.interceptors.request.use((function(e){return e.headers.Authorization=window.sessionStorage.getItem("token"),e}),(function(e){return console.log(e),Promise.reject()})),l.interceptors.response.use((function(e){if(200===e.status)return e.data;Promise.reject()}),(function(e){return console.log(e),Promise.reject()}));var r=l,n=function(e){return r({url:"/getdata/gettables",method:"get",params:e})},o=function(e){return console.log("请求删除"),r({url:"/savedata/deletetables",method:"get",params:e})},c=function(e){return r({url:"/savedata/savetables",method:"post",params:e,headers:{"Content-Type":"application/json"}})},u=function(e){return r({url:"/getdata/tableToIssues",method:"post",headers:{"Content-Type":"application/json; charset=utf-8"},data:e,transformRequest:[function(e){var t=e,a=e.querypara;return a=JSON.stringify(a),t.querypara=a,JSON.stringify(t)}]})},d=function(e){return r({url:"/getdata/Issues",method:"get",params:e})},p=function(e){return r({url:"/getdata/Tags",method:"get",params:e})},h=function(e){return r({url:"/getdata/DesAndUname",method:"post",data:e,headers:{"Content-Type":"application/json; charset=utf-8"},transformRequest:[function(e){return JSON.stringify(e)}]})},b=function(e){return r({url:"/getdata/tableTag",method:"post",data:e,headers:{"Content-Type":"application/json; charset=utf-8"},transformRequest:[function(e){return JSON.stringify(e)}]})},m=function(e){return r({url:"/savedata/saveNewDes",method:"post",data:e,headers:{"Content-Type":"application/json; charset=utf-8"},transformRequest:[function(e){return JSON.stringify(e)}]})}},"57d2":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-document"}),e._v(" issues查看\n            ")]),a("el-breadcrumb-item",[e._v(" selectIssues")])],1),a("div",{staticClass:"crumbs"})],1),a("div",{staticClass:"container"},[a("div",{staticClass:"bigSearchInput"},[a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入搜索的issue的名字"},model:{value:e.TitleTemple,callback:function(t){e.TitleTemple=t},expression:"TitleTemple"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("搜索")])],1),a("div",{staticClass:"handle-box"},[a("div",{staticStyle:{"margin-bottom":"20px"}},[a("span",{staticStyle:{"padding-right":"10px","padding-left":"10px"}},[e._v("类型")]),a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.Type,callback:function(t){e.Type=t},expression:"Type"}},e._l(e.TypeOpt,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})})),1),a("span",{staticStyle:{"padding-right":"10px","padding-left":"10px"}},[e._v("优先级")]),a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.Priority,callback:function(t){e.Priority=t},expression:"Priority"}},e._l(e.PriorityOpt,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})})),1),a("span",{staticStyle:{"padding-right":"10px","padding-left":"10px"}},[e._v("状态")]),a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.Status,callback:function(t){e.Status=t},expression:"Status"}},e._l(e.StatusOpt,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})})),1),a("el-switch",{staticStyle:{float:"right","padding-left":"250px"},attrs:{"active-text":"未打上标签数据","inactive-text":"当前条件全部数据"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1),a("el-button",{staticClass:"handle-del mr10",staticStyle:{"margin-left":"20px"},attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.delAllSelection}},[e._v("批量删除")])],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:"","header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"dataId",label:"标号",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"title",label:"issue标题"}}),a("el-table-column",{attrs:{prop:"type",label:"类型",width:"110"}}),a("el-table-column",{attrs:{prop:"priority",label:"优先级",width:"100"}}),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"100"}}),a("el-table-column",{attrs:{prop:"created",label:"发布时间",width:"100"}}),a("el-table-column",{attrs:{prop:"updated",label:"跟新时间",width:"100"}}),a("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-folder-opened"},on:{click:function(a){return e.getIssue(t.row)}}},[e._v("查看issue")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.query.pageIndex,"page-size":e.query.pageSize,total:e.totalElements,"pager-counter":7},on:{"current-change":e.handlePageChange}})],1)],1)])},i=[],l=(a("7f7f"),a("365c")),r=a("7ed4"),n={name:"selectIssues",data:function(){return{query:{querypara:{tablesId:0,Type:"",Priority:"",Status:"",title:""},pageIndex:1,pageSize:8},tableData:[],totalElements:0,multipleSelection:[],delList:[],editVisible:!1,form:{},idx:-1,filter:!0,Type:"",TypeOpt:[{value:1,label:"Improvement"},{value:2,label:"Bug"},{value:3,label:"Task"},{value:4,label:"Sub-task"}],Priority:"",PriorityOpt:[{value:1,label:"Minor"},{value:2,label:"Major"},{value:3,label:"Trivial"},{value:4,label:"Critical"}],Status:"",StatusOpt:[{value:1,label:"Resolved"},{value:2,label:"Patch Available"},{value:3,label:"Closed"}],TitleTemple:""}},created:function(){var e=window.sessionStorage.getItem("tablesId");this.query.querypara.tablesId=parseInt(e),this.getData()},mounted:function(){var e=this;r["a"].$on("tableIdChange",(function(t){e.query.querypara.tablesId=t,window.sessionStorage.setItem("tablesId",t),e.getData()}))},methods:{getData:function(){var e=this;Object(l["g"])(this.query).then((function(t){var a=t.issueData;e.tableData=a.content,e.totalElements=a.totalElements||50,e.query.querypara=JSON.parse(e.query.querypara)}))},handlePageChange:function(e){this.$set(this.query,"pageIndex",e),this.getData()},handleSearch:function(){this.$set(this.query,"pageIndex",1),this.$set(this.query.querypara,"title",this.TitleTemple),this.query.querypara.Type=this.Type,this.query.querypara.Priority=this.Priority,this.query.querypara.Status=this.Status,this.query.querypara.title=this.title,this.getData()},getIssue:function(e){window.sessionStorage.setItem("dataId",e.dataId),this.$router.push("/data")},handleDelete:function(e,t){var a=this;this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){DeleteData({tablesId:t.tablesId}),a.$message.success("删除成功"),a.tableData.splice(e,1)})).catch((function(){}))},handleSelectionChange:function(e){this.multipleSelection=e},delAllSelection:function(){var e=this.multipleSelection.length,t="";this.delList=this.delList.concat(this.multipleSelection);for(var a=0;a<e;a++)t+=this.multipleSelection[a].name+" ";this.$message.error("删除了".concat(t)),this.multipleSelection=[]}}},o=n,c=(a("7da1"),a("2877")),u=Object(c["a"])(o,s,i,!1,null,"68195afe",null);t["default"]=u.exports},6904:function(e,t,a){},"78ac":function(e,t,a){},"7da1":function(e,t,a){"use strict";var s=a("2c24"),i=a.n(s);i.a},"7ed4":function(e,t,a){"use strict";var s=a("2b0e"),i=new s["default"];t["a"]=i},ac26:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-calendar"}),e._v(" issues查看\n            ")]),a("el-breadcrumb-item",[e._v("查看issue")])],1)],1),a("div",{staticClass:"container"},[a("el-row",[a("el-col",{attrs:{span:4}},[a("el-card",{staticStyle:{width:"250px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("issue属性")])]),a("div",[a("div",[a("span",[e._v("Issue id: ")]),a("span",[e._v(e._s(e.issue.dataId))])]),a("div",[a("span",[e._v("Issue 类型: ")]),a("span",[e._v(e._s(e.issue.type))])]),a("div",[a("span",[e._v("Issue 优先级: ")]),a("span",[e._v(e._s(e.issue.priority))])])])])],1),a("el-col",{attrs:{span:4}},[a("el-card",{staticClass:"box-card",staticStyle:{width:"250px","margin-bottom":"10px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("reporter")])]),a("div",[a("div",[a("span",[e._v("reporter name: ")]),a("span",[e._v(e._s(e.issue.reporter))])]),a("div",[a("span",[e._v("created date: ")]),a("span",[e._v(e._s(e.issue.created))])])])])],1),a("el-col",{attrs:{span:4}},[a("el-card",{staticClass:"box-card",staticStyle:{width:"250px","margin-bottom":"20px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("assignee")])]),a("div",[a("div",[a("span",[e._v("assignee name:")]),a("span",[e._v(e._s(e.issue.assignee))])]),a("div",[a("span",[e._v("updated date:  ")]),a("span",[e._v(e._s(e.issue.updated))])]),a("div",[a("span",[e._v("status:  ")]),a("span",[e._v(e._s(e.issue.status))])]),a("div",[a("span",[e._v("resolution:  ")]),a("span",[e._v(e._s(e.issue.resolution))])])])])],1),a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"20px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("div",[a("span",[e._v("标题")]),a("el-divider",{attrs:{direction:"vertical"}}),a("span",[e._v(e._s(e.issue.title))])],1)]),a("div",[a("div",[a("span",[e._v("简述")]),a("el-divider",{attrs:{direction:"vertical"}}),a("span",[e._v(e._s(e.issue.body))])],1)])])],1)],1),a("el-divider"),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:6}},[a("el-card",{staticStyle:{height:"600px"}})],1),a("el-col",{attrs:{span:18}},[a("el-card",[a("div",[e._v("评论区")]),a("el-divider"),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:2}},[a("el-avatar",{staticStyle:{display:"inline-box"},attrs:{size:50,src:e.pic_path,fit:e.fit_pattern}},[e._v(e._s(e.userName))])],1),a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入评论内容",maxlength:"100","show-word-limit":""},model:{value:e.addDescription,callback:function(t){e.addDescription=t},expression:"addDescription"}})],1)],1),a("div",{staticStyle:{height:"15px","padding-top":"10px"}},[a("div",{staticStyle:{float:"right"}},[a("el-button",{staticStyle:{"padding-top":"10px"},attrs:{type:"primary"},on:{click:e.submitDes}},[e._v("提交评论")])],1)]),a("el-divider"),e._l(this.desList,(function(t,s){return a("div",{key:s,staticStyle:{"padding-bottom":"10px"}},[a("el-card",{staticStyle:{"border-radius":"4px","box-shadow":"0 2px 12px 0 rgba(0, 0, 0, 0.1)"}},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:2}},[a("el-avatar",{staticStyle:{display:"inline-box"},attrs:{size:50,src:e.pic_path,fit:e.fit_pattern}},[e._v(e._s(t[1]))])],1),a("el-col",{attrs:{span:18}},[a("div",{staticClass:"author-name"},[e._v(e._s(t[1]))]),a("div",{staticClass:"author-date"},[e._v(e._s(t[0].date))])]),a("el-col",{attrs:{span:4}},[a("div",[a("span",[e._v("支持")]),a("i",{staticClass:"el-icon-caret-top"})])])],1),a("el-divider"),e._v("\n                            "+e._s(t[0].description)+" \n                        ")],1)],1)})),a("el-pagination",{attrs:{"page-size":e.query_des.pageSize,"current-page":e.query_des.pageIndex,pagerCount:5,total:e.totalElements,layout:"prev, pager, next"},on:{"current-change":e.handlePageChange}})],2)],1)],1)],1)])},i=[],l=a("365c"),r={data:function(){return{TypeValue:"",TypeOptions:[],issue:{},addDescription:"",query_issue:{},authority:"",query_tag:{},TagListArray:[],userName:"",fit_pattern:"fill",pic_path:"../../assets/img/login-bg.png",tagTmeple:{},desList:[],totalElements:50,color_pattern:{1:{color:"red",level:"致命缺陷"},2:{color:"orange",level:"严重缺陷"},3:{color:"yellow",level:"一般缺陷"},4:{color:"blue",level:"值得关注的缺陷"},5:{color:"green",level:"可以忽略的缺陷"}},TagOfIssue:{level:"",description:"",name:""},query_des:{querypara:"",pageIndex:1,pageSize:8},submit_des:{description:"",dataId:0,userId:0}}},created:function(){this.query_issue={},this.query_issue.dataId=parseInt(window.sessionStorage.getItem("dataId")),this.getIssue(),this.authority=window.sessionStorage.getItem("authority"),this.query_des.querypara=this.query_issue.dataId,this.getDes(),this.userName=JSON.parse(window.sessionStorage.getItem("userProperty")).username,this.GetTagOfIssue()},methods:{getIssue:function(){var e=this;Object(l["e"])(this.query_issue).then((function(t){console.log(t);var a=t.issue;console.log(a),e.issue=a}))},getDes:function(){var e=this;Object(l["d"])(this.query_des).then((function(t){var a=t.userNameAndDes;e.desList=a.content,e.totalElements=a.totalElements||50}))},getTag:function(){var e=Object(l["f"])(this.query_tag),t=e.TagList,a=0;for(a=0;a<t.length;a++)if(temple=t[a],temple.tagId===this.issue.tagId)break},submitDes:function(){var e=this;this.submit_des.description=this.addDescription,this.submit_des.dataId=this.issue.dataId,this.submit_des.userId=window.sessionStorage.getItem("userId"),Object(l["i"])(this.submit_des).then((function(t){e.$message.success("提交评论成功！"),e.addDescription="",e.query_des.querypara=e.issue.dataId,e.getDes(e.issue.tagId)}))},GetTagOfIssue:function(){this.issue.tagId},submitTag:function(){},handlePageChange:function(e){this.$set(this.query_des,"pageIndex",e),this.getDes()}},mounted:function(){}},n=r,o=(a("3224"),a("2877")),c=Object(o["a"])(n,s,i,!1,null,"12b1ed65",null);t["default"]=c.exports},dd62:function(e,t,a){"use strict";var s=a("78ac"),i=a.n(s);i.a}}]);