jQuery.extend({lazyPicsSet:false,lazyPicsSelectors:[],lazyPics:function(_1){
var $=jQuery;
if(!_1){
return;
}
var _2={selector:"#postList img[data-src]",loadNum:10,stepNum:1,callback:""};
var _3=arguments;
var _4={};
var _5=$.browser.msie;
var _6=0;
var _7=-1;
var _8=[];
var _9,_a,_b,_c,_d;
var _e=function(){
var _f;
if(!_3[0].hasOwnProperty("length")){
_4=$.extend(_2,_3[0],true);
}else{
_4=_2;
_4.selector=_3[0];
_4.callback=_3[1];
}
_c=_4.selector;
_a=$(_c).filter("img[data-src]");
_b=_4.loadNum;
callback=_4.callback;
_d=_4.stepNum;
$.lazyPicsSet=true;
_f=_10().index;
_f=_f===-1?0:_f;
if(_a.size()===0){
return;
}
_11(_f,_b);
_7=_f;
if($.inArray(_c,$.lazyPicsSelectors)===-1){
$.lazyPicsSelectors.push(_c);
}else{
_12();
_13();
}
_14();
};
var _14=function(){
var r={};
var _15=-1;
var _16=0;
$(window).bind("scroll.lazyPics",function(){
_6=$(this).scrollTop();
if(_9){
clearTimeout(_9);
_9=null;
}
_9=setTimeout(function(){
if($(window).scrollTop()===_6){
r=_10();
_15=r.index;
_16=r.resultNum;
if(_15>-1){
_7=_15;
_11(_7,_b>=_16?_b:_16);
}else{
if(_7!=-1){
_11(_7,_d);
}
}
}
},300);
});
};
var _13=function(){
_a=$(_c).filter("img[data-src]");
};
var _10=function(){
var sel=typeof _c==="string"?_c:$(_c).filter("img[data-src]");
var _17=$.scrollAt(sel,-500);
var _18=_17.length;
var _19=_a.index($(_17[0]));
if(_17.length===0){
_19=-1;
}
return {index:_19,resultNum:_18};
};
var _11=function(_1a,_1b){
var len=_1b||_b;
var _1c=_a.splice(_1a,len);
if(_1c.length===0){
_7=-1;
return;
}
$(_1c).each(function(){
var _1d=$(this);
if(_5){
if(!_1d.attr("data-src")){
return;
}
_1d.attr("src",_1d.attr("data-src")).removeAttr("data-src");
if(callback){
callback.call(_1d);
}
return;
}
var _1e=new Image();
$(_1e).bind("load",(function(_1f){
return function(){
var _20=$(this);
_20.css("opacity",0);
if(callback){
callback.call(this);
}
_1f.replaceWith(_20);
setTimeout(function(){
_20.css("opacity",1);
},25);
};
})(_1d));
$(_1e).bind("error",(function(_21){
return function(){
var _22=$(this);
_22[0].src="http://a.xnimg.cn/smallsite/images/img-404.png";
_22[0].alt="图片未找到";
_22[0].title="图片未找到";
_21.replaceWith(_22);
};
})(_1d));
_1e.src=_1d.attr("data-src");
_1e.alt=_1d.attr("alt");
_1e.title=_1d.attr("title");
_1d.removeAttr("data-src");
});
};
var _12=function(){
$(window).unbind("scroll.lazyPics");
};
_e();
}});
$=jQuery;
SmallSite.feedPics={bindPicList:function(){
var _23=this;
$("#container").delegate(".sitemain article ul.photo-list img","click",function(e){
e.preventDefault();
_24($(this).parents("ul.photo-list"),".photo-list-open");
jQuery("body").triggerHandler("toogle-comment",[true,$(this)]);
});
$("#container").delegate(".sitemain article div.one-photo img","click",function(e){
e.preventDefault();
_24($(this).parents("div.one-photo"),".one-photo-open");
jQuery("body").triggerHandler("toogle-comment",[true,$(this)]);
});
$("#container").delegate(".sitemain article ul.photo-list-open","click",function(e){
e.preventDefault();
_25($(this),".photo-list");
jQuery("body").triggerHandler("toogle-comment",[false,$(this)]);
});
$("#container").delegate(".sitemain article div.one-photo-open","click",function(e){
e.preventDefault();
_25($(this),".one-photo");
jQuery("body").triggerHandler("toogle-comment",[false,$(this)]);
});
function _24(_26,cls){
var _27=_26.next(cls);
var _28=_26.find("a img");
var _29=_27.find("img[data-src]");
_29.each(function(i){
var _2a=$(this);
var src=_2a.attr("data-src");
var _2b=new Image();
_2b.onload=function(){
_2a.attr("src",this.src);
_2a.css("opacity",1);
delete _2b;
};
_2b.src=src;
if(_2b.complete){
_2a.attr("src",src);
_2a.css("opacity",1);
return;
}
_2a.css("opacity",0.8);
_2a[0].src=_28[i].src;
_2a[0].width=595;
_2a.removeAttr("data-src");
$(_2b).getSize(function(){
var _2c=this.width;
_2a[0].width=_2c;
delete _2b;
});
});
_26.hide();
_27.show();
};
function _25(_2d,cls){
var _2e=_2d.prev(cls);
var top=_2d.offset().top;
var _2f=$("#page div.sub-header");
var _30=_2f.height();
_2d.hide();
_2e.show();
$(window).scrollTop(top-150-_30);
};
},load:function(_31){
var _31=_31||$("#container .sitemain article ul.photo-list img[data-src]");
var _32=this;
var _33=function(){
_32.loadHandler(this,147);
};
$.lazyPics({selector:"#container .sitemain article ul.photo-list img[data-src]",loadNum:20,stepNum:4,callback:_33});
},loadHandler:function(img,_34){
var img=$(img);
var _35=this;
var _36=$.browser.msie;
this.size=_34?_34:109;
if(_36){
img[0].onload=function(){
_35.resizing($(this));
};
if(img[0].readyState==="complete"){
this.resizing(img);
}
return;
}else{
setTimeout(function(){
_35.resizing(img);
img.css("opacity",1);
},50);
}
img.bind("mouseover",function(){
var key=img.attr("src");
_35.lastX=null;
_35.lastY=null;
});
img.bind("mouseout",function(){
var key=img.attr("src");
_35.lastX=null;
_35.lastY=null;
});
img.bind("mousemove",function(e){
setTimeout(function(){
_35.movePic(img,e);
},100);
});
},resizing:function(img){
var _37=this.size;
var p=0;
var _38=img.width();
var _39=img.height();
if(_39<=_38&&_38>_37){
p=_39/_37;
img.width(Math.floor(_38/p));
img.height(_37);
img.css("marginLeft",-Math.floor((img.width()-_37)/2));
img.attr("data-ml",img.css("marginLeft"));
}else{
if(_39>_38&&_39>_37){
p=_38/_37;
img.height(Math.floor(_39/p));
img.width(_37);
img.css("marginTop",-Math.floor((img.height()-_37)/4));
img.attr("data-mt",img.css("marginTop"));
}
}
},movePic:function(img,e){
var x=e.pageX;
var y=e.pageY;
if(!this.lastX||!this.lastY){
this.lastX=x;
this.lastY=y;
return;
}
var oL=parseInt(img.attr("data-ml"));
var oT=parseInt(img.attr("data-mt"));
var top=y-this.lastY;
var _3a=x-this.lastX;
var _3b=parseInt(img.css("marginLeft"));
var _3c=parseInt(img.css("marginTop"));
var _3d,_3e;
if(_3a<0&&_3b<=0){
_3d=(_3b-_3a)>0?0:_3b-_3a;
}else{
if(_3a>0&&_3b>=(oL*2)){
_3d=(_3b-_3a)<(oL*2)?(oL*2):_3b-_3a;
}
}
img.css("marginLeft",_3d);
if(top<0&&_3c<=0){
_3e=(_3c-top)>0?0:_3c-top;
}else{
if(top>0&&_3c>=(oT*4)){
_3e=(_3c-top)<(oT*4)?(oT*4):_3c-top;
}
}
img.css("marginTop",_3e);
this.lastX=e.pageX;
this.lastY=e.pageY;
}};
$(function(){
SmallSite.feedPics.load();
SmallSite.feedPics.bindPicList();
});
jQuery.fn.extend({getSize:function(_3f){
var img=new Image();
var src=this[0].src;
var _40,_41,_42,_43;
var _44={};
img.src=src;
if(img.complete){
_44={"width":img.width,"height":img.height};
_3f.call(this);
return;
}
_40=img.width;
_41=img.height;
function get(){
_42=img.width;
_43=img.height;
if(_42!==_40||_43!==_41||img.complete){
_44={"width":_42,"height":_43};
_3f.call(img);
if(_45){
clearInterval(_45);
_45=null;
}
}
};
var _45=setInterval(get,100);
}});
$=jQuery;
SmallSite.app.Publisher=function(){
this.versions={text:"201111301642",photo:"201111301642",video:"201111301642",music:"201111301642",link:"201111301642"};
this.defaultSetting={text:{},photo:{},video:{},music:{},link:{}};
};
SmallSite.app.Publisher.prototype={curState:"none",nav:"#publisherNav",box:"#publisherBox",bar:"#page div.sub-header",eEditArticle:{id:null,top:0,eHeight:null},tips:{par:null,border:null},subHeadHtml:null,ContriBution:{},tagList:{},eEditFeed:null,savaTime:null,saveDrafta:null,tmplParams:{siteId:null,from:null,syncRenren:null,syncDouban:null,syncSina:null,syncWangyi:null},init:function(_46){
this.eNav=$(this.nav);
this.eBox=$(this.box);
$.extend(this.tmplParams,{toSiteUrl:CURSITE.url,from:"homeNew",syncRenren:CURSITE.syncRenren,syncDouban:CURSITE.syncDouban,syncSina:CURSITE.syncSina,syncWangyi:CURSITE.syncWangyi});
this.addEvents();
this.accNum();
},addEvents:function(){
var _47=this.eNav.find("li a");
var _48=this;
_47.each(function(){
$(this).bind("click",function(e){
if(!_48.conditionEstimateSite()){
return;
}
if(CURSITE.url==""){
$.messageDialog({width:330,height:60,message:"<p style='white-space:nowrap'>拥有小站才可以发表新内容，先创建自己的小站吧！</p><a style='display:block;width:115px;height:40px;margin:10px auto 0px auto;background:#00babc;color:#fff;font-size:18px;text-decoration:none;line-height:40px;text-align:center;' href='http://zhan.renren.com/zhan/create'>创建小站</a>"});
return;
}else{
var _49=$(this).parents("li")[0].className.match(/publisher-(\w+)/)[1];
e.preventDefault();
_48.eEditFeed=null;
_48.active(_49);
_48._statistics(_49);
}
});
});
$(this.box).delegate("a.close","click",function(e){
e.preventDefault();
_48.close(_48.curState,"eEdit");
});
$("#publisherBox").delegate(".select-submit","click",function(e){
e.preventDefault();
_48.syncTo(e.target);
});
},_statistics:function(_4a){
var _4b=$("#publishbar").size()>0?"template":"home",_4c="http://"+XZ.domain+"/statistics/publiserLog?from="+_4b+"&type="+_4a;
$.ajax({url:_4c,type:"GET",dataType:"json",success:function(r){
}});
},active:function(_4d,_4e){
var _4f=this.curState;
var _50=$(this.nav+" .publisher-"+_4d+" a");
var _51;
if($(".progressa").size()>0&&$(".progressa").css("display")=="block"){
$.messageDialog({message:"正在上传图片，暂时不能关闭发布器",width:300,time:1000});
return;
}
if(!this.eEditFeed){
$(window).scrollTop(0);
$("#publisherEditor-"+_4d).find("input[name=gid]").val("");
_51=$("#publisherEditor-"+_4d).find("input[name=rejectionId]");
if(_51.val()!==""){
_51.val("");
}
}
if(_4d===_4f&&this.eEditFeed==null){
return;
}
if(_4f!=="none"){
$(this.nav+" .publisher-"+_4f+" a").removeClass("act");
}
this.arrowPosition(_4d);
_50.addClass("act");
if(!this[_4d]&&!_4e){
this.syncLoad(_4d);
}else{
this.open(_4d);
}
if(this.eEditArticle.top!==0&&this.eEditFeed==null){
this.eEditArticle.top=0;
}
},syncLoad:function(_52){
var _53=this;
var _54=_52.replace(/link|video/g,"share");
jQuery.use("publisher-"+_54,function(){
_53.render(_52);
});
},render:function(_55){
var _56=$("#publisherEditor-"+_55);
var _57=tmpl(this[_55].template);
var _58=this;
if(this[_55].tmplParams){
$.extend(true,this.tmplParams,this[_55].tmplParams);
}
_56.html(_57(this.tmplParams));
this[_55].box=$("#publisherEditor-"+_55);
this[_55].init();
this[_55].inited=true;
this.open(_55);
},addTagTip:function(box){
var tag=box.find(".write-tag-feed");
var tip=box.find(".explain-tag");
var _59=box.find(".write-tag-list");
var _5a=tag.attr("status");
if(_59.length===0&&_5a=="first"&&this.accNum()==2){
tag.css("background-color","#ffcecf").attr("status","allow");
tip.css("color","#ff8285");
return true;
}else{
this._changeBgcolor(box);
return false;
}
},_changeBgcolor:function(_5b,_5c){
var box=(typeof (_5b)=="string")?this[_5b].box:_5b;
var tag=box.find(".write-tag-feed");
var tip=box.find(".explain-tag");
tag.css("background-color","#fff");
if(_5c=="reset"){
tip.css("color","#888");
tag.attr("status","first");
}
},renderSubjects:function(_5d){
var _5e=this;
var _5f=_5d.type;
var tag=_5d.tag;
var _60=$.queryString("tag")?decodeURI($.queryString("tag")).split(","):"";
var _61=_5d.edit;
var _62;
if(_60&&!this.publisherTagShow){
this.publisherTagShow=true;
}else{
_60="";
}
jQuery.use("tag",function(){
var _63={box:$("#publisherEditor-"+_5f+" .write-tag-box")};
var s={tags:_60,maxNum:5};
if(tag){
s.tags=tag;
_5e._changeBgcolor(_5f);
}
var _64=new SmallSite.app.Subject(jQuery.extend({},_63,s));
jQuery.extend(_63,{input:$("#publisherEditor-"+_5f+" .tag-input"),"subject":_64});
_5e.subjectBox=new SmallSite.app.SubjectBox(_63);
$(_64).bind("rulesErrTip",function(_65,obj){
$.messageDialog({message:"格式输入错误，必须是数字字母汉字"});
});
$(_64).bind("renderSuccess",function(_66,obj){
_5e.cancelSaveButton(_5f);
_5e._changeBgcolor(_5f);
});
$(_64).bind("delSuccess",function(_67,obj){
_5e.cancelSaveButton(_5f);
});
$(_5e.box).undelegate(".tag-selector li a","click").delegate(".tag-selector li a","click",function(){
$(_64).triggerHandler("render",[{"val":$(this).attr("data-tag")}]);
});
_5e.zhanSwitch(_5f,_61);
});
},zhanSwitch:function(_68,_69){
var b=this[_68].box;
var _6a=b.find(".tag-selector");
var _6b=b.parent().find(".post-basic a")[0];
var _6c=b.parent().parent().find("figure img");
var _6d=this;
var _6e,url,_6f;
_6f=function(_70){
if($("#publishbar").size()>0){
_6a.empty();
$.each(_70,function(i){
_6a.append("<li><a data-tag=\""+_70[i]+"\" href=\"javascript:;\">"+_70[i]+"</a></li>");
});
}
};
XZ.USER=XZ.USER||{};
XZ.USER.sites=XZ.USER.sites||{};
XZ.USER.sites[CURSITE.url]=XZ.USER.sites[CURSITE.url]||{};
if(_69){
url=_69;
XZ.USER.sites[url]=XZ.USER.sites[url]||{};
}else{
url=CURSITE.url;
XZ.USER.sites[CURSITE.url]=XZ.USER.sites[CURSITE.url]||{};
}
if(CURSITE.url&&XZ.USER.sites[url]["recommendTags"]==undefined){
jQuery.ajax({url:" http://zhan.renren.com/"+url+"/recommendTags",dataType:"json",type:"get",async:false,success:function(r){
if(r.code==0){
_6f(r.recommendTags);
XZ.USER.sites[url]["recommendTags"]=r.recommendTags;
}
}});
}else{
_6f(XZ.USER.sites[url]["recommendTags"]);
}
if($("#publishbar").size()===0){
jQuery.use("zhanswitch",function(){
var _71=new SmallSite.app.zhanSwitch({sites:sitelist,curtags:XZ.USER.sites[url]["recommendTags"],shareText:"发布到",cancelable:false,isGetTag:true,tagBox:b.find(".tag-selector"),zhanBox:b.find(".share-main"),siteurl:b.find(".toSiteUrl")});
jQuery(_71).bind("switchSuccess",function(_72,_73){
$(_6b).html(XZ.USER.sites[_73].name);
_6c.attr("src",XZ.USER.sites[_73].tinyHeadSource);
_6d.cancelSaveButton(_68);
});
});
}
},syncTo:function(_74){
var $li={};
var _75="";
var _76="";
var _77="";
var _78="";
var _79="http://zhan.renren.com/zhan/settinginfo";
if(_74.nodeName.toLowerCase()!=="a"){
return;
}
_78=jQuery(_74).parents("div.publisher-editor-box")[0].id.match(/publisherEditor-(\w+)/)[1];
$li=jQuery(_74).parent("li");
_77=_74.className;
_75=$li.attr("class").match(/publish\-to\-([^\s\-]+)/)[1];
_76=_77.match(/[^\s\-\.]+\-[^\d\s\.\-]+(\d?)/)[1];
if(_76==""){
_74.className=_77+"2";
_74.title=_74.title.replace("已","未");
jQuery("#publisher-fm-"+_78+" input[name=sync"+_75+"]").val("false");
}else{
if(CURSITE["sync"+_75]){
_74.className=_77.replace("2","");
_74.title=_74.title.replace("未","已");
jQuery("#publisher-fm-"+_78+" input[name=sync"+_75+"]").val("true");
}else{
window.open(_79+"?sync=true");
}
}
this.cancelSaveButton(_78);
},_resetParam:function(){
var _7a=$("#publisherBox .save_times");
if(this.savaTime){
clearInterval(this.savaTime);
this.savaTime=null;
}
if(this.saveDrafta){
this.saveDrafta=null;
}
if(_7a.html()!=""){
_7a.html("");
}
},open:function(_7b){
var _7c=this.curState;
var _7d=$(this.box);
var _7e=$("#publisherEditor-"+_7b);
var _7f=$("#publishbar").size();
var _80=$("#guestPublisher");
var _81=$("#publisherBox .save_times");
var _82=$.browser.msie&&$.browser.version==6;
_7d.show();
if(this[_7b]&&!this[_7b].inited){
this.render(_7b);
return;
}
if($("body.issue").size()>0){
if(_7b=="text"||_7b=="photo"){
this[_7b].box.find(".btn-finish").val("保存");
}
}
if(!this.conditionEstimate()){
this[_7b].box.find(".tent_timer").hide();
if(_7b=="text"||_7b=="photo"){
this[_7b].box.find(".tent_save").hide();
}
}
this.tipRemoves();
if(this.eEditFeed){
$(window).scrollTop(0);
this.terminalOpacity(this.eEditFeed);
this[_7b].edit();
}else{
}
if(this.shareDateStaus&&this.shareDateInfo){
var _83=this.shareDateInfo;
this[_7b].shareData(_83);
this.shareDateStaus=null;
this.shareDateInfo=null;
}
if(_7c==="none"){
_7d.show();
_7e.show();
_7d.css("margin-top",0);
}else{
if(_7b!==_7c){
this.change(_7b);
}
}
if(_7f>0&&!_82){
$(window).scrollTop(0);
$("body").addClass("pub-act");
}
if(_80.css("display")=="block"){
_7d.find(".select-submit").hide();
_7d.find("input[name=syncRenren]").val("false");
_7d.find("input[name=syncDouban]").val("false");
_7d.find("input[name=syncSina]").val("false");
_7d.find("input[name=syncWangyi]").val("false");
}
this.curState=_7b;
if(this.eEditFeed==null){
this.renderSubjects({"type":_7b});
}
this._resetParam();
if(this.conditionEstimate()){
if(_7b=="text"){
this.saveTent({"type":"text","eDom":this.box,"timer":true,"dataMore":"&isDraft=true"});
}
}
},recovery:function(_84){
var box=this[_84].box;
var _85=box.parent().find(".post-basic a")[0];
var _86=box.parent().parent().find("figure img");
var url=box.parent().parent().find("input[name=toSiteUrl]");
if(_85&&_85.innerHTML!=sitelist[0].name&&_86.attr("src")!=sitelist[0].tinyHeadSource){
$(_85).html(sitelist[0].name);
_86.attr("src",sitelist[0].tinyHeadSource);
url.val(sitelist[0].url);
this.renderSubjects({"type":_84});
}
},change:function(_87){
var _88=this.curState;
var _89=$("#publisherEditor-"+_87);
var _8a=$("#publisherEditor-"+_88);
_8a.hide();
_89.show();
},close:function(_8b,_8c){
var _8d=$(this.box);
var _8e=_8d.height()+20;
var _8f=this;
var _90=this.eEditArticle.id;
var top=this.eEditArticle.top;
var _91=($("#publisher-selector-box").length>0)?0:100;
var _92=$("#publishbar").size();
if(!_8b){
_8b=this.curState;
}
if(_8b==="none"){
return;
}
if(_8b=="photo"&&$(".progressa").size()>0&&$(".progressa").css("display")!="none"){
$.messageDialog({message:"正在上传图片，暂时不能关闭发布器",width:300,time:1000});
return;
}
if(this.conditionEstimate(_8b)){
if(!this.saveDrafta){
if(this[_8b].savaDialog()){
return;
}
}
}
if(this.eEditFeed){
this.terminalOpacityShow(this.eEditFeed);
}
this.reset(_8b);
if($.browser.msie&&$.browser.version==6){
$("#publisherBox").hide();
}
if(_91!==0){
_8d.css("margin-top",-_8e);
}else{
_8d.hide();
}
setTimeout(function(){
$(_8f.nav+" .publisher-"+_8f.curState+" a").removeClass("act");
$("#publisherEditor-"+_8f.curState).hide();
_8f.curState="none";
_8f[_8b].close();
},_91);
this.publisherStyle();
if(_92===0){
this.recovery(_8b);
}
},showEditDom:function(){
var _93=this;
var _94=this.eEditArticle.id;
var top=this.eEditArticle.top;
if(_94){
if($("#publishbar").size()>0){
$("body").find("#feed_"+_94).show();
}else{
$("body").find("article[data-feedid="+_94+"]").show();
}
if(top>0){
if(this.eEditArticle.eHeight){
$(window).scrollTop(top-$("#header").height()-$(".sub-header").height());
}else{
$(window).scrollTop(top-$("#header").height());
}
}else{
$(window).scrollTop(0);
}
_94=null;
top=0;
}
},publisherStyle:function(){
var _95=$("#publisher-selector-box").length;
var _96=$("#publishbar").css("position");
if(_95>0&&_96=="absolute"){
$("body").removeClass("pub-act");
$(window).scrollTop(0);
}
},reset:function(_97){
var _98=$("#publisher-selector-box").length;
var _99=$("#publishbar").css("position");
var _9a=$("#publisherBox .save_times");
var _9b=$("#publisherBox .tent_save");
var _9c=$("#publisherBox .tent_timer");
var _9d=this[_97].box.find(".select-submit");
var _9e=this[_97].box.find(".share-main");
var _9f=this[_97].box.find("input[name=draftId]");
var _a0;
this.tipRemoves();
if(_9d.css("display")=="none"){
_9d.show();
}
if(_9e.css("display")=="none"){
_9e.show();
}
if(this.subHeadHtml){
_a0=$(".sub-header").find(".publisher-nav");
if($(_a0).hasClass("publisher-nav")){
$(_a0).appendTo("body").css("display","none");
$("#sitemainold").css({"margin-top":""});
}
$(".sub-header").html(this.subHeadHtml).css("height","60px").attr("data-height",60);
this.subHeadHtml=null;
}
this[_97].reset();
this[_97].box.find(".write-tag-box").empty();
this.eEditArticle.top=this.eEditArticle.id=null;
this.publisherStyle();
this.eEditFeed=null;
this.shareDateStaus=null;
this._resetParam();
if(_9b.css("display")=="none"){
_9b.show();
}
if(_9c.css("display")=="none"){
_9c.show();
}
if(_9f.val!=""){
_9f.val("");
}
this._changeBgcolor(_97,"reset");
this.eEditFeed=null;
},finish:function(_a1,_a2,_a3,_a4){
var _a5=$("#publishbar").size()>0?$("#postList"):$("#feed-container");
var _a6=$(innerShiv(_a1))[0].firstChild;
var _a7=this.curState;
var _a8=$("#guestPublisher");
var _a9=$("#publishbar .tools");
var _aa=_a2?_a2:[];
var _ab=(_a3)?"<li class='addtags'>已同步到以下话题</li>":"<li class='addtags'>添加话题，让更多人发现你</li>";
var url=window.location.href;
var _ac=$.urlParam(url,"terminalEdit");
var _ad="";
var _ae;
CURSITE=CURSITE||{};
var _af=function(){
_ad="";
for(var i=0;i<_aa.length;i++){
_ad+="<li><a target='_blank' href='http://zhan.renren.com/tag?value="+_aa[i].tabValue+"&from=pubSuccess' class='tag_info'>#"+_aa[i].tabValue+"</a> <em>"+_aa[i].followCount+"人订阅</em><a target='_blank' href='http://zhan.renren.com/tag?value="+_aa[i].tabValue+"&from=pubSuccess' class='view_tag'>查看>></a></li>";
}
return _ad;
};
$(window).scrollTop(0);
if(_a8.size()>0){
_a9.hide();
jQuery.messageDialog({"width":400,"message":"<p style=\"font-size:16px;\">投稿成功，站长审核之后就会发布<br/>感谢您的投稿^_^</p>"});
_a8.hide();
contribution.hidePublisher();
}else{
jQuery.popDialog({message:"<div class=\"pub_success\">\t\t\t\t\t\t\t<div class=\"success_msg clearfix\">发布成功!</div>\t\t\t\t\t\t\t<ul class=\"tag_list clearfix\">\t\t\t\t\t\t\t\t"+_ab+_af()+"\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t</div>",width:300,time:5000});
}
if(_a6){
_a5.prepend($(_a6));
this[_a7].renderNewFeed($(_a6));
}
if(CURSITE.isTerm){
var _b0=window;
var _b1=_b0.location.href.replace(_b0.location.search,"");
window.location.href=_b1;
return;
}
if(this.eEditFeed){
this.eEditFeed.remove();
}
if($("#publishbar").size()>0){
jQuery.lazyPics("#postList img[data-src]");
}
if(_a4){
_a4(_a6);
}
$("#publisherBox").hide();
if(!this.saveDrafta){
this.saveDrafta=true;
}
this.close();
},arrowPosition:function(_b2){
var _b3;
switch(_b2){
case "text":
_b3="95px";
break;
case "photo":
_b3="200px";
break;
case "video":
_b3="300px";
break;
case "music":
_b3="400px";
break;
case "link":
_b3="500px";
break;
}
$(".arrow-area .arrow").css({"marginLeft":_b3});
},showPublisher:function(_b4){
$("#sitemainold").css({"marginTop":"0px"});
$(".sub-header").html(_b4).css({"height":"100px"}).attr("data-height",100);
_b4.show();
},edit:function(_b5,_b6,_b7){
var _b8=this;
var _b9=$(_b7).parents("article")[0];
var _ba=($(".sub-header").height()>5)?true:false;
var _bb=$("body").find(".publisher-nav");
var _bc=this.curState;
var _bd=null;
var url=window.location.href;
if(this.eEditFeed){
this.eEditFeed.show();
}
this.eEditFeed=$(_b9);
if(_bb.attr("types")=="contributions"||CURSITE.location=="home"){
this.ContriBution.status=true;
if(CURSITE.location!="home"){
this.subHeadHtml=$(".sub-header").html();
this.showPublisher(_bb);
}
}
switch(_b5){
case "BLOG":
_b5="text";
break;
case "STATUS":
_b5="text";
break;
case "PHOTO_MULTI":
_b5="photo";
break;
case "PHOTO":
_b5="photo";
break;
case "SHARE_VIDEO":
_b5="video";
break;
case "SHARE_AUDIO":
_b5="link";
break;
case "SHARE_LINK":
_b5="link";
break;
case "MUSIC":
_b5="music";
break;
}
if(_bc!=="none"&&_bc==_b5){
_bd="edit";
this[_b5].reset();
}
if(this.judgeEdit(_b6).data){
if(this.judgeEdit(_b6).type=="rejection"){
this.ContriBution.status=true;
}
this.eEditArticle.id=this.judgeEdit(_b6).data;
}else{
this.eEditArticle.id=($("#publishbar").size()>0)?$(_b9).attr("id").replace("feed_",""):$(_b9).attr("data-feedid");
}
if(!this.judgeEdit(_b6)){
this.eEditArticle.eHeight=_ba;
if($("body").find("#publisherEditor-"+_b5).css("display")!="none"){
this.eEditArticle.top=$(_b9).offset().top-$("body").find("#publisherBox").outerHeight();
}else{
this.eEditArticle.top=$(_b9).offset().top;
}
}
this.active(_b5,_bd);
},judgeEdit:function(_be){
var url=window.location.href;
var _bf=$.urlParam(url,"terminalEdit");
var _c0=$("#postList").find("article");
if(url.indexOf("rejectionid")!==-1&&url.indexOf("rejectiontype")!==-1){
return param={"data":jQuery.queryString("rejectionid"),"type":"rejection"};
}else{
if(url.indexOf("terminalEdit")!==-1){
for(var i=0;i<_c0.length;i++){
if($(_c0[i]).attr("id")=="feed_"+_be){
this.terminalEditId="feed_"+_be;
return false;
break;
}
}
return param={"data":jQuery.queryString("id"),"type":"terminalEdit"};
}else{
return true;
}
}
},isContribution:function(_c1){
var _c2=this.ContriBution;
var url=window.location.href;
if(_c2.status){
if(this.eEditFeed!=null){
var _c3=$(this.eEditFeed);
var _c4=$(this.eEditFeed).find(".post-site-user a");
var _c5=$(_c1).parent().parent().find("figure");
var _c6=(CURSITE.location=="home")?$(_c1).parent().parent().find(".post-basic"):$(_c1).parent().parent().find(".post-site-user");
_c2.siteURL=_c3.attr("uri");
_c5.find("img").attr("src",_c3.find("img").attr("src"));
_c6.find("a:first").html(_c4.html());
}
if(CURSITE.location=="home"){
_c2.thisType="";
}else{
if(url.indexOf("rejectionid")!==-1&&url.indexOf("rejectiontype")!==-1){
_c2.thisType="?type=rejection";
}else{
if($("body").hasClass("draft")){
_c2.thisType="?type=draft";
}else{
if($("body").hasClass("issue")){
_c2.thisType="?type=issue";
}else{
_c2.thisType="?type=contribution";
}
}
}
}
}else{
_c2.thisType="";
}
},tipRemoves:function(){
var _c7=$(".publisher_tips");
var _c8=$(".photo_pubtip");
if(_c8.size()>0){
_c8.remove();
}
if(_c7.size()>0){
_c7.remove();
this.tips.par.css({"border-color":this.tips.border});
}
},tipAdd:function(_c9,msg){
var _ca=_c9||null;
var _cb=msg||"";
var tip=document.createElement("div");
var _cc=$(".publisher_tips");
var _cd=$(".page-content");
this.tipRemoves();
this.tips=tip;
this.tips.par=_ca;
this.tips.border=$(_ca).css("border-color");
$(_ca).css({"border":"1px solid #e54f36"});
if($("#publishbar").size()>0){
$("body").append(tip);
$(tip).addClass("publisher_tips").css({"top":$(_ca).offset().top-$(tip).height()});
}else{
$(".page-content").append(tip);
$(tip).addClass("publisher_tips").css({"top":$(_ca).offset().top-$(tip).height()-_cd.offset().top});
}
$(tip).addClass("publisher_tips").css({"left":$(_ca).offset().left}).show();
$(tip).html(_cb);
$(window).scrollTop(0);
return;
},counter:function(ele,_ce,max,_cf){
var len=ele.value.length;
var _d0=max-len;
if(_cf=="photo"){
_ce=$(ele).parent().find(_ce);
}
if(len>max){
var num=$(ele).val().substr(0,max);
$(ele).val(num);
}else{
$(_ce).text(max-len);
}
},rejeckTionDisposal:function(_d1,_d2){
var _d3=window.location.href;
if(_d3.indexOf("rejectionid")!==-1&&_d3.indexOf("rejectiontype")!==-1){
contribution.showPublisher();
_d1.find("input[name=rejectionId]").val(_d2);
}else{
if($("body").hasClass("draft")){
_d1.find("input[name=draftId]").val(_d2);
}else{
if($("body").hasClass("issue")){
_d1.find("input[name=issueId]").val(_d2);
}else{
_d1.find("input[name=gid]").val(_d2);
}
}
}
},checkTime:function(i){
if(i<10){
i="0"+i;
}
return i;
},saveTent:function(_d4){
var _d5=$(_d4.eDom);
var _d6=_d5.find("input[name=draftId]");
var _d7=_d5.find("input[name=issueId]");
var _d8=_d4.timer||null;
var _d9=_d4.type||null;
var _da=60000*2;
var _db=con||"";
var _dc=this.eEditArticle.id||"";
var _dd=this;
var _de=_d4.statu||"";
var _df=_d4.dataMore||"";
var _e0=_d4.draftIssue;
var _e1=_d4.dateSiteUrl;
var _e2,_e3,_e4,_e5,_e6,_e7,_e8,_e9,_ea,con,_eb;
if(!_d9){
return;
}
switch(_d4.type){
case "text":
_d9="word";
break;
case "video":
_d9="share";
break;
case "link":
_d9="share";
break;
}
if(_dc){
_d6.val(_dc);
}
_e4=function(r,_ec){
_e3=new Date();
var _ed=_dd.checkTime(_e3.getHours());
var _ee=_dd.checkTime(_e3.getMinutes());
$("#publisherBox").find(".post-basic .save_times").html("内容已于"+_ed+":"+_ee+"成功保存至 <a href=\"http://zhan.renren.com/drafts\" target=\"_blank\">草稿箱</a>");
$("#publisherBox").find(".post-site-user .save_times").html("内容已于"+_ed+":"+_ee+"成功保存至 <a href=\"http://zhan.renren.com/drafts\" target=\"_blank\">草稿箱</a>");
_dd.saveDrafta=true;
if(!_d4.dateSiteUrl){
if(_d6.val()==""&&r.draftId){
_d6.val(r.draftId);
}
}
if(_ec=="thisTime"){
_ea=$(_d5).find(".tent_save");
$(_ea).attr("status","stop").addClass("saved");
_ea.find("img").attr("src","http://a.xnimg.cn/smallsite/images/tent_saved.png");
_dd.drafeMessage("<img src=\"http://a.xnimg.cn/smallsite/images/yes2.png\" />成功保存至草稿箱",1000);
}else{
if(_ec=="setTime"){
$.messageDialog({message:"<div class=\"draftsuccess\">已成功添加至定时发布队列，<a target=\"_blank\" href=\"http://zhan.renren.com/issues\">点击查看</a></div>",width:320,height:75,time:3000,noPadding:true});
}
}
if(_d4.close){
_dd.close(_d4.type);
$("#timerSave").data("settime_status",false);
}
};
_e6=function(_ef){
if(_d4.dateSiteUrl){
_eb=_d4.dateSiteUrl;
if(_d4.oldSiteUrlName){
_dd[_d4.type].box.find("input[name=\"toSiteUrl\"]").val(_d4.oldSiteUrlName);
}
}else{
_eb=_d5.find("input[name=toSiteUrl]").val();
}
_e5="http://zhan.renren.com/"+_eb+"/"+_d9+"/"+"create";
$.ajax({url:_e5,type:"POST",data:_e2+_df,dataType:"json",success:function(r){
if(r.code==0){
_e4(r,_ef);
}else{
if(r.code==-2){
_dd.drafeMessage(r.msg,3000);
_dd.saveDrafta=true;
clearInterval(_dd.savaTime);
_dd.close(_d4.type);
}else{
if(r.code==-3){
$("#timerSave").data("settime_status",false);
$("#pubtimer input[name=\"siteUrl\"]").attr("disabled","");
$("#pubtimer .error_report").html("不能早于当前时间");
}else{
alert(r.msg);
}
}
}
}});
};
_e8=function(_f0){
_e2=_d5.find("#publisher-fm-"+_d4.type).serialize();
if(_d9=="word"){
_e7=$.trim(_d5.find("textarea[name=subject]").val());
if(window.tinymce){
con=$(tinymce.editors[0].getContent());
thumb=$(con.find("img")[0]).attr("src");
if(thumb){
_d5.find("input[name=feedSrc]").val(thumb);
_e2=_d5.find("#publisher-fm-"+_d4.type).serialize();
}
}
if(_e7==""&&con.size()<=0||_e7=="标题"&&con.size()<=0){
if(_f0=="thisTime"){
_dd.drafeMessage("请输入内容再保存草稿！",1000);
}else{
if(_f0=="setTime"){
_dd.drafeMessage("请输入内容再保存定时发布！",1000);
}
}
return;
}else{
_e6(_f0);
}
}else{
_e6(_f0);
}
};
if(_d8){
this.savaTime=setInterval(function(){
_e8("auto");
},_da);
}else{
_e8(_de);
}
},clearDialog:function(){
$(".dialog").remove();
$("#maskLayer").hide();
},closePublisher:function(box,_f1){
var _f2=this;
var _f3=box||null;
var _f4=_f1||"";
var _f5;
$.popDialog({message:"<div class=\"draftdialog\">\t\t\t\t\t\t<div class=\"msgs\">您的数据尚未保存，是否要离开？</div>\t\t\t\t\t\t<div class=\"button_bottoms\">\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"quit\">放弃并离开</a>\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"saves\">保存并离开</a>\t\t\t\t\t\t</div>\t\t\t\t\t</div>",width:490,height:160,noPadding:true});
_f5=function(){
_f2.saveDrafta=true;
_f2.close(_f4,"eEdit");
};
$(".draftdialog").find(".saves").bind("click",function(){
_f2.saveTent({"type":_f4,"eDom":_f3,"statu":"close","statu":"thisTime","dataMore":"&isDraft=true"});
_f2.clearDialog();
_f5();
_f2.drafeMessage("<img src=\"http://a.xnimg.cn/smallsite/images/yes2.png\" />成功保存至草稿箱<a href=\"http://zhan.renren.com/drafts\" target=\"_blank\">点击查看>></a>",3000);
});
$(".draftdialog").find(".quit").bind("click",function(){
_f2.clearDialog();
_f5();
});
},conditionEstimate:function(_f6){
var _f7=$("#guestPublisher").size()||0;
var _f8=$("body.contributtion").size()||0;
var _f9=$("body.contributtion-mine").size()||0;
var _fa=(this.eEditFeed&&CURSITE.location=="home")?1:0;
if(this.eEditFeed&&$("#publishbar").size()>0){
_fa=1;
}
var _fb=0;
var _fc=$("body.issue").size()||0;
if(_f6){
if(_f6!="photo"&&_f6!="text"){
_fb=1;
}
}
var _fd=_f9+_f8+_f7+_fa+_fb+_fc;
if(_fd>0){
return false;
}else{
return true;
}
},conditionDrafts:function(r,_fe){
var _ff=this;
_ff.drafeMessage("r.msg",3000);
if($("body.draft").size()>0){
this.eBox.hide();
if(this.subHeadHtml){
var _100=$(".sub-header").find(".publisher-nav");
if($(_100).hasClass("publisher-nav")){
$(_100).appendTo("body").css("display","none");
$("#sitemainold").css({"marginTop":""});
}
$(".sub-header").html(this.subHeadHtml).css("height","60px").attr("data-height",60);
this.subHeadHtml=null;
}
}else{
this.close(_fe);
}
if(this.savaTime){
clearInterval(this.savaTime);
this.savaTime=null;
}
},conditionEstimateSite:function(){
var _101=$("body.issue").size()||0;
var pub=$("body.contributtion").size()||0;
var _102=$("body.draft").size()||0;
var _103=_101+pub+_102;
if(_103>0){
return false;
}else{
return true;
}
},cancelSaveButton:function(type){
var _104=this[type].box.find(".tent_save");
if(_104.hasClass("saved")){
_104.removeClass("saved").attr("status","allow");
_104.find("img").attr("src","http://a.xnimg.cn/smallsite/images/tent_save.png");
}
},drafeMessage:function(msg,time){
var _105=time||"";
$.messageDialog({message:"<div class=\"draftsuccess\">"+msg+"</div>",width:280,height:75,time:_105,noPadding:true});
},setTimeSave:function(_106){
var html="<div id=\"pubtimer\" class=\"pubtimer\">\t\t\t\t\t\t<form id=\"timerSave\">\t\t\t\t\t\t\t<input type=\"hidden\" name=\"issuetime\" value=\"true\" />\t\t\t\t\t\t\t<input type=\"hidden\" name=\"siteUrl\" value=\"\" />\t\t\t\t            <div class=\"tools clearfix\">\t\t\t\t            \t<div class=\"error_report\"></div>\t\t\t\t                <div class=\"toheight clearfix\">\t\t\t\t                    <div class=\"calendar bl fl\">\t\t\t\t                    \t<input type=\"text\" name=\"issueDay\" class=\"fl date\" value=\"\" />\t\t\t\t                    \t<i class=\"timeMarks\"></i>\t\t\t\t                    </div>\t\t\t\t                    <input type=\"text\" maxlength=\"2\" name=\"issueHour\" class=\"time_hour bl fl\" value=\"\" />\t\t\t\t                    <div class=\"time_emblem fl\">\t\t\t\t                    :\t\t\t\t                    </div>\t\t\t\t                    <input type=\"text\" maxlength=\"2\" name=\"issueMinute\" class=\"time_min bl fl\" value=\"\" />\t\t\t\t                </div>\t\t\t\t                <div class=\"text_area time fl\">\t\t\t\t                \t该内容将在 <span class=\"date\"></span>&nbsp;<span class=\"times_hour\"></span>:<span class=\"times_min\"></span>&nbsp;<span class=\"pub_to\">发布到</span>\t\t\t\t                </div>\t\t\t\t                <div class=\"selctArea\">\t\t\t\t\t                <div class=\"fl select\">\t\t\t\t\t                    内容\t\t\t\t\t                </div>\t\t\t\t\t                <ul class=\"site_lists\">\t\t\t\t\t                </ul>\t\t\t\t\t            </div>\t\t\t\t            </div>\t\t\t\t            <div class=\"button_area\">\t\t\t\t            \t<a class=\"cancel\" href=\"javascript:;\">取消</a>\t\t\t\t            \t<input type=\"submit\" class=\"timer_sub\" value=\"定时发布\">\t\t\t\t            </div>\t\t\t\t        </form>\t\t\t        </div>";
var _107=_106.siteId||"";
var _108=_106.siteName||"";
var _109=_106.type||"";
var _10a=_106.eDom||null;
var time=new Date();
var that=this;
var _10b,site,eDom,list,_10c,_10d;
if(_109&&_109!="music"){
if(!that[_109].checkForm()){
that.clearDialog();
return;
}
}
$.popDialog({message:html,width:550,height:215,noPadding:true});
setTimeout(function(){
$.use("date-select",function(){
Date.firstDayOfWeek=0;
eDom.find(".calendar .date").datePicker();
});
},300);
eDom=$("#pubtimer");
list=function(){
_10b="";
if(sitelist.length>1){
for(var i=0;i<sitelist.length;i++){
_10b+="<li siteUrl="+sitelist[i].url+" siteImg="+sitelist[i].tinyHeadSource+">"+sitelist[i].name+"</li>";
}
eDom.find(".select").bind("click",function(){
eDom.find(".site_lists").toggle();
});
}else{
_10b="<li siteUrl="+sitelist[0].url+"  siteImg="+sitelist[0].tinyHeadSource+">"+sitelist[0].name+"</li>";
eDom.find(".selctArea").css("background","none");
}
return _10b;
};
eDom.find("ul.site_lists").html(list());
eDom.find(".site_lists > li").bind("click",function(){
$("#pubtimer .select").html($(this).html());
eDom.find("input[name=siteUrl]").val($(this).attr("siteurl"));
eDom.find(".selctArea .select").data("siteTinyHead",$(this).attr("siteimg"));
$("ul.site_lists").hide();
});
eDom.find(".selctArea").bind("mouseleave",function(){
$("ul.site_lists").hide();
});
if(_109!=""){
var _10e=eDom.find("input[name=siteUrl]");
var _10f=eDom.find(".select");
var _110=time.getHours()<23?this.checkTime(time.getHours()+1):this.checkTime(time.getHours());
if($("#publishbar").size()>0){
_10e.val(CURSITE.url);
_10f.html(CURSITE.name);
}else{
_10e.val(_107);
_10f.html(_108);
}
eDom.find(".time_hour").val(_110);
eDom.find(".time_min").val(this.checkTime(time.getMinutes()));
eDom.find(".times_hour").html(_110);
eDom.find(".times_min").html(this.checkTime(time.getMinutes()));
eDom.find(".calendar .date").val(time.getFullYear()+"/"+this.checkTime(time.getMonth()+1)+"/"+this.checkTime(time.getDate()));
eDom.find(".text_area .date").html(time.getFullYear()+"/"+this.checkTime(time.getMonth()+1)+"/"+this.checkTime(time.getDate()));
}else{
var _111=$("body").find("article[feedid="+_106+"]");
var _112=_111.attr("uri");
var _113=_111.find(".post-site-user .name-card").html();
var _114=_111.find("figure.newsfeed-user img").attr("src");
eDom.find(".selctArea .select").data("siteTinyHead",_114);
$.ajax({url:"http://zhan.renren.com/"+_112+"/issue/"+_106+"/getIssueDate",type:"GET",dataType:"json",success:function(r){
if(r.code===-1){
eDom.find("input[name=siteUrl]").val(_112);
eDom.find(".select").html(_113);
eDom.find(".time_hour").val(r.issueHour);
eDom.find(".time_min").val(r.issueMinute);
eDom.find(".times_hour").html(r.issueHour);
eDom.find(".times_min").html(r.issueMinute);
eDom.find(".calendar .date").val(r.issueDay);
eDom.find(".text_area .date").html(r.issueDay);
}else{
if(r.code===-2){
that.drafeMessage(r.msg,3000);
_111.hide();
}
}
}});
}
_10c=function(_115,str){
if($(_115).hasClass("time_hour")){
eDom.find(".times_hour").html(str);
}else{
eDom.find(".times_min").html(str);
}
};
eDom.find(".time_hour,.time_min").bind("input",function(){
_10c(this,$(this).val());
}).bind("propertychange",function(){
_10c(this,$(this).val());
});
eDom.find("#timerSave").bind("submit",(function(e){
e.preventDefault();
var hour=eDom.find(".time_hour");
var min=eDom.find(".time_min");
var _116=hour.val()?parseInt(hour.val()):-1;
var _117=min.val()?parseInt(min.val()):-1;
var _118=eDom.find(".error_report");
var _119=eDom.find("input[name=siteUrl]");
var _11a=eDom.find(".select").html();
var _11b=eDom.find("input[name=issueDay]").val();
var _11c="";
var _11d,_11e;
var _11f=function(str){
if(str||str==0){
return str;
}else{
return -1;
}
};
if($(this).data("settime_status")){
return;
}
var _120=function(str){
_str=str.replace(/\//g,"");
var date=parseInt(_str);
var _121=parseInt(time.getFullYear()+that.checkTime(time.getMonth()+1)+that.checkTime(time.getDate()));
if(date==_121){
return true;
}
};
_118.html("");
if(_11f(_116)<0||_11f(_116)>24){
_118.html("请输入正确的时间");
hour.val("").focus();
return;
}
if(_11f(_117)<0||_11f(_117)>=60){
_118.html("请输入正确的时间");
min.val("").focus();
return;
}
if(_120(_11b)&&_11f(_116)<time.getHours()){
_118.html("不能早于当前时间");
hour.val("").focus();
return;
}
if(_120(_11b)&&_11f(_116)==time.getHours()&&_11f(_117)<=time.getMinutes()){
_118.html("不能早于当前时间");
min.val("").focus();
return;
}
if(_109!=""){
_11e=that[_109].box.find("input[name=toSiteUrl]");
_10d=_119.val();
_11d=_11e.val();
_11e.val(_10d);
_119.attr("disabled","disabled");
if($("body.draft").size()>0){
_11c=true;
}
data="&"+$("#timerSave").serialize();
that.saveTent({"type":_109,"eDom":_10a,"statu":"setTime","dataMore":data,"dateSiteUrl":_10d,"close":true,"draftIssue":_11c,"oldSiteUrlName":_11d});
}else{
data=$("#timerSave").serialize();
$.ajax({url:"http://zhan.renren.com/"+_112+"/issue/"+_106+"/updateIssueDate",type:"POST",data:data,dataType:"json",success:function(r){
if(r.code===0){
_111.find("a.issue_time").html(_11b+"&nbsp;"+_11f(_116)+":"+_11f(_117)+"&nbsp;发布");
_111.find(".post-site-user a.name-card").html(_11a);
_111.find("figure.newsfeed-user .name-card img").attr("src",eDom.find(".selctArea .select").data("siteTinyHead"));
_111.find("figure.newsfeed-user a.site").attr("data-uri","http://"+XZ.domain+"/"+_119.val());
that.clearDialog();
}else{
if(r.code===-2){
that.drafeMessage(r.msg,3000);
_111.hide();
}else{
if(r.code===-1){
$("#timerSave").data("settime_status",false);
$("#pubtimer input[name=\"siteUrl\"]").attr("disabled","");
$("#pubtimer .error_report").html("不能早于当前时间");
}else{
alert(r.msg||"操作失败，请稍后重试。");
}
}
}
}});
}
$(this).data("settime_status",true);
}));
eDom.find(".cancel").bind("click",function(){
that.clearDialog();
});
},shareDate:function(type,data){
this.active(type);
this.shareDateStaus=true;
this.shareDateInfo=data;
},accNum:function(){
var data=(XZ.hostId).toString();
var num=data.length;
return data.charAt(num-1);
},terminalEdit:function(_122,type){
var url=window.location.href;
var name=$.urlParam(url,"terminalEdit");
var dom=$("#feed_"+_122).find(".delete");
if(name){
if(this.judgeEdit(_122)){
this.edit(type,_122,$("body"));
}else{
this.edit(type,_122,dom);
}
}
},terminalOpacity:function(eDom){
CURSITE=CURSITE||{};
if($("#publishbar").size()>0&&CURSITE.isTerm){
eDom.addClass("opacity-30");
}else{
eDom.hide();
}
},terminalOpacityShow:function(eDom){
CURSITE=CURSITE||{};
if($("#publishbar").size()>0&&CURSITE.isTerm){
eDom.removeClass("opacity-30");
}else{
this.showEditDom();
}
},disabledButton:function(eDom,mode){
var dom=eDom;
var _123=dom.find("input.btn-finish");
if(mode=="disabled"){
_123.css("disabled","disabled");
}else{
if(mode=="restore"){
_123.css("disabled","");
}
}
}};
window.publisher=new SmallSite.app.Publisher();
SmallSite.Constant={url:{"feed":"http://zhan.renren.com/home/posts","like":"http://zhan.renren.com/likes/posts","contribution":"http://zhan.renren.com/contributions/posts","topic":"http://zhan.renren.com/tag","profile":"http://zhan.renren.com/profile"}};
SmallSite.Services={cash:false,data:{},init:function(type){
var t=type;
var tag="";
if(type){
var _124=document.location.href.split("?");
var gid="";
if(_124.length>1){
tag=decodeURI(_124[1].split("value=")[1]);
}
}
if(type=="profile"){
var uId=jQuery(jQuery("#feed-container article")[0]).attr("authorid");
if(uId==undefined){
uId=_124[0].split("/")[4];
}
}
switch(t){
case "feed":
this.proxyAction("feed");
break;
case "like":
this.proxyAction("like");
break;
case "topic":
if(jQuery.browser.safari==true){
tag=decodeURI(tag);
}
this.proxyAction(t,tag);
break;
case "profile":
this.proxyAction(t,uId);
break;
}
},showLoading:function(){
if(jQuery("#main-load-container").length==0){
jQuery("<div id=\"main-load-container\" class=\"main\">加载中...</div>").appendTo(".sitemain");
}
jQuery("#main-load-container").show();
},proxyAction:function(type,v,t){
var that=this;
var _125="";
var url="";
switch(type){
case "feed":
url=SmallSite.Constant.url[type];
break;
case "like":
url=SmallSite.Constant.url[type];
break;
case "topic":
url=SmallSite.Constant.url[type]+"?value="+encodeURI(v)+"&json=true&type="+(t?t:"");
break;
case "profile":
url=SmallSite.Constant.url[type]+"/"+v+"/posts";
break;
}
jQuery("#feed-container").data("hasMore",true).data("page",0).attr("uri",url).data("newFeedAction",true);
jQuery(document.body).data("tabtype",type);
return;
}};
function SmallsiteTag(_126){
this.settings=jQuery.extend({triggerEle:"",fatherDom:"",isIe:false},_126);
this._init();
};
SmallsiteTag.prototype={_init:function(){
if(this.settings.triggerEle===""&&this.settings.fatherDom===""){
return;
}
this.postUrl="http://zhan.renren.com/tag";
this.delegateEvent();
},delegateEvent:function(){
var that=this;
jQuery(this.settings.fatherDom).delegate(that.settings.triggerEle,"click",function(e){
var ele=e.target||e.srcElement;
var _127=jQuery(this).attr("data-title");
if(jQuery(ele).hasClass("tag-add")){
e.preventDefault();
that.addFollow(ele);
return;
}
that.changeHash(_127);
if(that.settings.isIe){
return;
}
if(!XZ.isLogin){
return;
}
if(jQuery(this).attr("href")==="/explore?from=tagPhoto"){
return;
}
if(jQuery("#wrapDiv").length!=0){
return;
}
e.preventDefault();
window.scrollTo(0,0);
if(typeof (publisher)!="undefined"){
publisher.close();
}
that.tagRequest(_127);
});
},changeHash:function(_128){
var _129="#!//tag/"+_128;
location.hash=_129;
},addFollow:function(_12a){
var _12b=jQuery(_12a).parent().attr("data-title");
SmallSite.app.common.toggleTagFollow(true,_12b,"from=sitetag",function(){
if(SmallSite.app&&SmallSite.app.tagAboutPop){
new SmallSite.app.tagAboutPop("tagfollow","订阅成功",_12b);
}
jQuery(_12a).hide();
});
},tagRequest:function(_12c){
var that=this;
jQuery.ajax({url:that.postUrl+"?value="+encodeURIComponent(_12c)+"&json=true&type=",dataType:"json",success:function(r){
var _12d=r.posts;
var _12e=r.tagTitle;
if(r.code==0){
var _12f=new SmallSite.app.scrollComponent({postHtml:r.posts});
jQuery(document).find("#tagStyle").remove();
that.replaceSubbar(_12e,r.tagResult,r.haveManager);
that.deleteAttentionBar(r.haveManager);
that.addTopSite(r.topsites);
if(r.haveManager){
that.tagManager(r.managerList);
}else{
jQuery("#manager-mod").children().remove();
}
that.relatedTag(r.relatedTag);
that.addAdmin(r.tagAdminDiv);
SmallSite.Services.proxyAction("topic",_12c);
jQuery(".collection").removeClass("collection-select");
jQuery(".submission ").removeClass("submission-select");
jQuery(".fans").removeClass("fans-select");
if(r.isTagFirst){
that.showTagGuide();
}
}else{
jQuery.messageDialog({message:"服务器繁忙，请稍后再试"});
}
},error:function(){
}});
},showTagGuide:function(){
jQuery.popDialog({width:604,height:477,message:"<img src=\"http://a.xnimg.cn/smallsite/images/home-new/tag-page/tag-guide1.png\"/>"});
},replaceSubbar:function(_130,_131,_132){
var _133=jQuery(document).find("head");
if(jQuery("#publisherNav").size()>0){
jQuery(".sub-header").children().replaceWith(_130);
}else{
jQuery(".sub-header").find(".title-box").replaceWith(_130);
}
if(_132){
if(_133.find("#tagStyle").size()>0){
_133.find("#tagStyle").replaceWith(_131);
}else{
_133.append(_131);
}
jQuery(".sub-header").css("height","180px");
jQuery("#page div.sub-header").attr("data-height",180);
jQuery(".sitemain").css("margin-top","60px");
jQuery(".siteside").css("margin","181px 0 0 260px");
}else{
jQuery(".sub-header").css("height","100px");
jQuery("#page div.sub-header").attr("data-height",100);
jQuery(".sitemain").css("margin-top","-20px");
jQuery(".siteside").css("margin","9px 0 0 260px");
}
},addAdmin:function(_134){
if(jQuery(".tag-admin").size()<=0){
jQuery(".siteside div:first").append(_134);
}
},relatedTag:function(rt){
if(jQuery(".tag-label-list").size()>0){
jQuery(".tag-label-list").replaceWith(rt);
}else{
jQuery(".site-tag").after(rt);
}
},deleteAttentionBar:function(_135){
var _136=jQuery(".site-attention");
var _137=jQuery(".attention");
if(_135){
_136.css("display","none");
_137.css("display","none");
}else{
_136.css("display","block");
_137.css("display","block");
_136.css("visibility","hidden");
_137.css("visibility","hidden");
}
},addTopSite:function(_138){
var _139=jQuery("#topsite-mod");
if(_139.length==0){
jQuery("#guess4like-mod").remove();
jQuery(".site-radar").remove();
jQuery(".feedback").remove();
jQuery(".activity-link").remove();
jQuery(".site-tag").after("<div id=\"topsite-mod\" class=\"site-like\">"+_138+"</div>");
}else{
_139.html(_138);
}
},tagManager:function(_13a){
var _13b=jQuery("#manager-mod");
if(_13b.length==0){
jQuery("#topsite-mod").after("<div class=\"site-like\" id=\"manager-mod\">"+_13a+"</div>");
}else{
_13b.html(_13a);
}
}};
var toggleSuggest={postUrl:"http://zhan.renren.com/tag",init:function(){
var This=this;
jQuery(".page-content").delegate(".tag-select a","click",function(e){
if(jQuery.browser.msie){
return;
}
if(jQuery("#wrapDiv").length!=0){
return;
}
e.preventDefault();
This.cssListener(this);
var _13c=jQuery(this).parents(".tag-header").find("#cur_tagName").val();
var type=jQuery(this).attr("data-uri");
This.ajaxListener(_13c,type);
});
},setSitemainHeight:function(){
jQuery(".sitemain").css("margin-top","-20px");
},cssListener:function(e){
var _13d=jQuery(e);
jQuery(".tag-select a").removeClass("select-show");
_13d.addClass("select-show");
},ajaxListener:function(_13e,type){
var This=this;
jQuery.ajax({url:This.postUrl+"?value="+encodeURIComponent(_13e)+"&json=true&type="+type+"",dataType:"json",success:function(r){
var _13f=r.posts;
if(r.code==0){
new SmallSite.app.scrollComponent({postHtml:_13f});
if(CURSITE.location!="home"){
This.setSitemainHeight();
}
if(r.haveManager){
jQuery(".sitemain").css("margin-top","60px");
}
SmallSite.Services.proxyAction("topic",_13e,type);
}else{
jQuery.messageDialog({message:"服务器繁忙，请稍后再试"});
}
},error:function(){
}});
}};
jQuery(function(){
var msie=jQuery.browser.msie;
new SmallsiteTag({fatherDom:".site-tag",triggerEle:"a",isIe:msie});
new SmallsiteTag({fatherDom:".container",triggerEle:".feed-topic a",isIe:msie});
new SmallsiteTag({fatherDom:".sub-header",triggerEle:".laber-word a",isIe:msie});
toggleSuggest.init();
});
jQuery(function(){
jQuery("body").delegate(".admin","click",function(e){
e.preventDefault();
new SmallSite.app.apply_T_M();
});
});
jQuery(function(){
var _140=jQuery(".site-tag").height();
jQuery(".site-tag").css({"height":_140});
jQuery(".site-tag li a").hover(function(){
jQuery(this).parent().attr("id","anima");
jQuery(this).parent().css("height","90px");
jQuery(this).find(".tag-tit").css({"top":"30px","color":"#fff"});
jQuery(this).find(".tag-add").css({"top":"42px"});
jQuery(this).parent().next().css("height","40px");
var _141=jQuery(this).parent().prev();
var _142=jQuery(this).parent().next();
if(_141.length==0){
_142.css("height","30px");
_142.next().css("height","30px");
}else{
if(_142.length==0){
_141.css("height","30px");
_141.prev().css("height","30px");
}else{
_141.css("height","30px");
_142.css("height","30px");
}
}
},function(){
jQuery(this).parent().attr("id","");
jQuery(this).parent().css("height","50px");
jQuery(this).find(".tag-tit").css({"top":"0px","color":""});
jQuery(this).find(".tag-add").css({"top":"16px"});
jQuery(".site-tag li").css("height","50px");
});
});
jQuery(function(){
var $=jQuery;
if(CURSITE.location=="tag"){
if(isTagFirst){
jQuery.popDialog({width:604,height:477,message:"<img src=\"http://a.xnimg.cn/smallsite/images/home-new/tag-page/tag-guide1.png\"/>"});
}
}
});
jQuery.fn.extend({droplist:function(_143){
var arg=jQuery.extend({list:".admin-site"},_143);
var _144=null;
var _145=null;
var _146=0,_147=0,rdId=0;
var _148=jQuery(this);
var list=jQuery(arg.list);
var _149=20;
var over=false;
_148.click(function(_14a){
_14a.preventDefault();
});
_148.live("mouseover",function(){
over=true;
var that=this;
setTimeout(function(){
if(over){
if(_145){
clearTimeout(_145);
}
if(_144){
clearTimeout(_144);
}
if(_146&&(new Date().getTime()-_146)<=500&&rdId==jQuery(that).attr("rdId")){
return;
}
var obj=jQuery(that);
rdId=Math.random()+"";
obj.attr("rdId",rdId);
list.unbind();
list.hover(function(){
if((new Date().getTime()-_147)<=500){
clearTimeout(_144);
}
},function(){
var That=this;
_146=new Date().getTime();
_145=setTimeout(function(){
list.hide();
jQuery(".sub-header").css({"overflow":"hidden"});
},0);
});
var _14b=jQuery(".nav-choose>a").outerWidth();
var _14c=list.width();
var _14d=list.outerWidth();
if(_14b>_14d){
}
jQuery(".sub-header").css({"overflow":"visible"});
list.show();
}
},500);
}).live("mouseout",function(){
over=false;
_147=new Date().getTime();
_144=setTimeout(function(){
list.hide();
jQuery(".sub-header").css({"overflow":"hidden"});
},500);
});
}});
SmallSite.app=SmallSite.app||{};
SmallSite.app.notify={init:function(){
this.container=jQuery(".site-notice");
this.msgList=this.container.find("ul");
this.btn=jQuery(".site-recommend-icon");
this.numBox=jQuery(".news-feed>a");
this.bindEvents();
},bindEvents:function(){
var that=this;
jQuery(document.body).bind("click",function(_14e){
var _14f=_14e.target;
if(jQuery(_14f).is(".site-recommend-icon")||jQuery(_14f).is(".news-feed>a")){
if(that.container.is(":visible")){
that.container.hide();
that.updateStatus();
}else{
if(that.container.find("li").length>0){
that.container.show();
that.updateStatus(true);
}else{
if(that.container.data("not-request")!=true){
if(that.container.data("loading")==true){
return;
}
that.msgList.html("加载中...");
that.getNotification();
}else{
that.container.show();
that.updateStatus(true);
}
}
}
}else{
if(!jQuery.contains(jQuery(".site-notice")[0]||jQuery("body")[0],_14f)){
if(that.container.is(":visible")){
that.container.hide();
that.updateStatus();
}
}
}
});
that.numBox.click(function(e){
e.preventDefault();
});
jQuery(".nav-choose,.site-user").mouseenter(function(){
that.container.hide();
});
},bindFeedEvent:function(){
var that=this;
that.container.find("ul li a.close-notice").click(function(){
var p=jQuery(this).parents("li");
if(p.attr("deling")==false||p.attr("deling")==undefined){
that.delAction(jQuery(this));
}
});
that.container.find("ul li a.goto-gid").click(function(){
var p=jQuery(this).parents("li");
if(p.attr("deling")==false||jQuery(this).attr("deling")==undefined){
that.delAction(jQuery(this));
}
});
},getNotification:function(){
var that=this;
that.container.data("loading",true);
jQuery.ajax({url:"http://zhan.renren.com/zhan/notify/fetch",dataType:"json",type:"get",success:function(r){
that.msgList.html(that.getHtml(r.data));
that.updateStatus(true);
that.bindFeedEvent();
if(r.data.length<=10){
that.container.data("not-request",true);
}
if(that.container.find("ul li").length<1){
jQuery("#no-notice").show();
that.msgList.hide();
}
that.container.show();
},complete:function(){
that.container.data("loading",false);
},error:function(){
that.container.data("loading",false);
}});
},updateStatus:function(show){
var num=parseInt(this.btn.attr("data-num"));
if(num>0){
if(num>100){
this.numBox.html("99+");
}else{
this.numBox.html(num);
}
}else{
this.numBox.hide();
}
},delAction:function(obj){
var that=this;
var p=jQuery(obj).parents("li");
if(p.data("requesting")==true){
return;
}
p.data("requesting",true);
jQuery.ajax({url:"http://zhan.renren.com/zhan/notify/delete",data:"nid="+obj.attr("data-nid"),dataType:"json",type:"post",success:function(r){
if(r.code==0){
p.remove();
var num=parseInt(that.btn.attr("data-num"));
that.btn.attr("data-num",(num-1>0?num-1:0));
if(that.container.find("ul li").length<1){
if((num-1)>0){
that.msgList.html("加载中...");
that.getNotification();
}else{
jQuery("#no-notice").show();
that.msgList.hide();
}
}
that.container.find("ul li:first").attr("class","first");
that.updateStatus(true);
}else{
jQuery.messageDialog({message:r.msg||"服务器繁忙，请稍后再试！"});
}
},complete:function(){
p.data("requesting",true);
},error:function(){
jQuery.messageDialog({message:"服务器繁忙，请稍后再试！"});
}});
},getHtml:function(data){
var html="";
var _150=data.length>=10?10:data.length;
for(var i=0;i<_150;i++){
html+=this.getOneHtml((i===0?true:false),data[i]);
}
return html;
},getOneHtml:function(_151,data){
return ["<li "+(_151?"class=\"first\"":"")+">","<div class=\"notice-box\">","<a  href=\"http://zhan.renren.com/profile/"+data.from_id+"\" target=\"_blank\" >"+data.from_name+"</a>在<a href=\""+data.minisite_url+"\" target=\"_blank\" data-nid=\""+data.nid+"\" class=\"goto-gid\">"+data.minisite_name+"</a>","<span>回复了你</span>","</div>","<a href=\"javascript:;\" data-nid=\""+data.nid+"\" class=\"close-notice\">关闭</a>","</li>"].join("");
}};
jQuery(function(){
SmallSite.app.notify.init();
});
SmallSite.feedAction=function(_152){
var _153={container:"feed-container",likeUrl:"",commentAddUrl:"",commentDelUrl:"",shareUrl:"",isSyncTotal:true,tooLong:"文字过多,最多140个字符！",requireTip:"请填写你要回复的内容",inputLimit:140,dataType:"html_new_home",order:true,pageLimit:10,tagReg:/^[A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d]{1,}$/,tagReg2:/^[A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d]{1,}[,，;；。.\s]{1}$/,tagTip:"添加话题"};
jQuery.extend(this,_153,_152);
this.init();
};
SmallSite.feedAction.prototype={init:function(){
this.data={};
this.initBlogInfo();
this.bindEvents();
},initBlogInfo:function(){
this.blogInfo={"douban":{"hiddenName":"syncDouban","jsConstant":"syncDouban","syncClass":"douban","unsyncClass":"douban-off","syncTip":"已同步到豆瓣说","unsyncTip":"未同步到豆瓣说","blogName":"豆瓣"},"sina":{"hiddenName":"syncSina","jsConstant":"syncSina","syncClass":"sina","unsyncClass":"sina-off","syncTip":"已同步到新浪微博","unsyncTip":"未同步到新浪微博","blogName":"新浪微博"},"wangyi":{"hiddenName":"syncWangyi","jsConstant":"syncWangyi","syncClass":"wangyi","unsyncClass":"wangyi-off","syncTip":"已同步到网易微博","unsyncTip":"未同步到网易微博","blogName":"网易微博"},"renren":{"hiddenName":"sync","jsConstant":"syncRenren","syncClass":"renren","unsyncClass":"renren-off","syncTip":"已同步到人人网","unsyncTip":"未同步到人人网","blogName":"人人网"}};
},bindEvents:function(){
var that=this;
jQuery("#"+that.container+" .feed-icmt").die("click").live("click",function(_154,_155){
_154.preventDefault();
if(!XZ.isLogin){
SmallSite.login.dialog();
return;
}
var feed=jQuery(this).parents("article");
var id=feed.attr("feedid");
var _156=feed.attr("replycount");
var _157=feed.find(".feed-reply>ul");
var _158=feed.find(".feed-reply");
var _159=feed.find(".post-holder");
var _15a=feed.find(".feed-share");
feed.find(".feed-act .feed-act-done").removeClass("feed-act-done");
_15a.remove();
if(_158.is(":visible")){
jQuery(this).removeClass("feed-act-done");
_158.hide();
}else{
jQuery(this).removeClass("feed-act-done").addClass("feed-act-done");
if(_158.data("inited")==true){
_158.show();
that.initEditor(_158,id);
}else{
var _15b=jQuery(this).offset().left-_159.offset().left+jQuery(this).width()/2;
_158.css("backgroundPosition",_15b+"px 0");
if(_156=="0"){
that.initComment(_158,id);
_158.show();
if(_155==true){
_158.find("textarea[name=content]").focus();
}
}else{
if(_158.data("loading")==false||_158.data("loading")==undefined){
that.initComment(_158,id);
_158.data("loading",true);
_158.find(".loading").show();
that.loadAction(_158,id);
}
}
}
}
});
jQuery("#"+that.container+" .feed-ilike").die("click").live("click",function(_15c){
_15c.preventDefault();
if(!XZ.isLogin){
SmallSite.login.dialog();
return;
}
var id=jQuery(this).parents("article").attr("feedid");
that.likeAction(id,this);
});
jQuery("#"+that.container+" .feed-ilike-done").die("click").live("click",function(_15d){
_15d.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.likeAction(id,this);
});
jQuery("#"+that.container+" .feed-ishare").die("click").live("click",function(_15e){
_15e.preventDefault();
if(!XZ.isLogin){
SmallSite.login.dialog();
return;
}
var feed=jQuery(this).parents("article");
var id=feed.attr("feedid");
var _15f=feed.find(".feed-share");
feed.find(".feed-act .feed-act-done").removeClass("feed-act-done");
if(_15f.is(":visible")){
jQuery(this).removeClass("feed-act-done");
}else{
jQuery(this).removeClass("feed-act-done").addClass("feed-act-done");
}
if(CURSITE.showBindBubble){
jQuery(".account-synca").show();
}else{
jQuery(".account-synca").remove();
}
that.initShare(feed.find(".post-holder"),id);
if(CURSITE.showBindBubble==true){
CURSITE.showBindBubble=false;
jQuery.ajax({url:"http://zhan.renren.com/guide/close/bindBubbleClosed",type:"post",success:function(_160){
}});
}
});
jQuery("#"+that.container+" .feed-rec").die("click").live("click",function(_161){
_161.preventDefault();
var feed=jQuery(this).parents("article");
var id=feed.attr("feedid");
SmallSite.recommendTagPop.init(feed,id);
});
jQuery("#"+that.container+" .feed-idel").die("click").live("click",function(_162){
_162.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.delAction(id,this);
});
jQuery("#"+that.container+" .feed-act .block").die("click").live("click",function(_163){
_163.preventDefault();
var _164=jQuery(this).parents("article");
var _165=_164.attr("authorid");
var _166=_164.attr("authorname");
var _167=_164.attr("feedid");
var uri=_164.attr("uri");
that.shieldAction(_165,uri,_166);
});
jQuery("#"+that.container+" .delete-contribution").die("click").live("click",function(_168){
_168.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.delContributionAction(id,this);
});
jQuery("#"+that.container+" .publish-contribution").die("click").live("click",function(_169){
_169.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.publishAction(id,this);
});
jQuery("#"+that.container+" .reject-contribution").die("click").live("click",function(_16a){
_16a.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.rejectContributionAction(id,this);
});
jQuery("#"+that.container+" .delete-draft").die("click").live("click",function(_16b){
_16b.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.delDraftAction(id,this);
});
jQuery("#"+that.container+" .publish-draft").die("click").live("click",function(_16c){
_16c.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.draftpublishAction(id,this);
});
jQuery("#"+that.container+" .delete-issue").die("click").live("click",function(_16d){
_16d.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.delIssuesAction(id,this);
});
jQuery("#"+that.container+" .publish-issue").die("click").live("click",function(_16e){
_16e.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.issuesPublishAction(id,this);
});
jQuery("#"+that.container+" .feed-iremove").die("click").live("click",function(_16f){
_16f.preventDefault();
var id=jQuery(this).parents("article").attr("feedid");
that.removeAction(id,this);
});
},initComment:function(box,id){
var p=box.parents("article");
box.find(".feed-share").hide();
if(box.data("inited")==true){
box.show();
}else{
this.renderComment(box,id);
box.data("inited",true);
}
this.data[id]={"total":p.attr("replycount"),"pageNum":Math.ceil(p.attr("replycount")/this.pageLimit),"curpage":0,"siteUrl":p.attr("uri")};
},renderComment:function(box,id){
box.html(this.getCommentHtml(box));
jQuery.use("zhanswitch",function(){
new SmallSite.app.zhanSwitch({sites:sitelist,zhanBox:box.find(".share-main"),siteUrl:box.find("input[name=toSiteUrl]"),submitBtn:box.find(".input-btn"),selected:false});
});
this.bindCommentEvents(box,id);
},getCommentHtml:function(box){
return ["<div class=\"feed-add-act clearfix\">","<form class=\"reply-form\" name=\"replyForm\">","<textarea class=\"input-reply\" name=\"content\"></textarea>","<input type=\"hidden\" name=\"toSiteUrl\" value=\"\">","<input type=\"hidden\" name=\"toId\" value=\"\">","<div class=\"share-btn-box clearfix\">","<input type=\"submit\" class=\"input-btn\" value=\"回复\">","<div class=\"share-select\">"+this.getBlog(box,1)+"</div>","<div class=\"share-main\"></div>","</div>","</form>","</div>","<ul class=\"reply-list clearfix\"></ul>","<div class=\"morereply\" style=\"display:none\"><a href=\"javascript:;\">显示较早之前的</a></div>"].join("");
},bindCommentEvents:function(box,id){
var p=box.parents("article");
var that=this;
box.find("form[name=replyForm]").unbind("submit").submit(function(_170){
_170.preventDefault();
if(jQuery(this).data("requesting")!=true){
jQuery(this).data("requesting",true);
if(!that.checkComment(box,id)){
jQuery(this).data("requesting",false);
return;
}else{
box.children("input[type=submit]").attr("disabled","disabled");
that.addCommentAction(box,id,jQuery(this).serialize());
}
}
}).quickSubmit();
box.find(".morereply").children("a").click(function(){
if(box.data("loading")==false||box.data("loading")==undefined){
box.data("loading",true);
that.loadAction(box,id);
}
});
box.find(">ul").click(function(_171){
var _172=_171.target;
var _173=jQuery(_172).attr("order");
var _174=XZ.hostId;
if(jQuery(_172).hasClass("reply-report")){
var text=jQuery(_172).parents("li").find(".comment-text").text();
}
_173=eval("("+_173+")");
if(_173&&_173.type=="reply"){
that.replyAction(box,id,_173);
}else{
if(_173&&_173.type=="del"){
that.delCommentAction(jQuery(_172),id,_173.id);
}else{
if(_173&&_173.type=="block"){
that.shieldAction(_173.toId,that.data[id].siteUrl,_173.name,_173.id,id);
}else{
if(_173&&_173.type=="report"){
that.reportAction(_173.toId,_173.id,id,_174,text);
}
}
}
}
});
box.find(">ul").delegate("li","mouseenter",function(_175){
jQuery(this).data("isEnter",true);
jQuery(this).find(".reply-list-btn, .reply-report, .delete, .shield, .to-share").show();
jQuery(this).find(".time-reply").hide();
}).delegate("li","mouseleave",function(_176){
jQuery(this).data("isEnter",false);
var _177=jQuery(this);
var card=jQuery(".smallsite-card");
if(!jQuery(_176.relatedTarget).is(".smallsite-card")){
jQuery(this).find(".reply-list-btn, .reply-report, .delete, .shield, .to-share").hide();
jQuery(this).find(".time-reply").show();
}else{
setTimeout(function(){
if(card.is(":visible")){
card.mouseleave(function(_178){
setTimeout(function(){
if(_177.data("isEnter")==true){
return;
}
_177.find(".reply-list-btn, .reply-report, .delete, .shield, .to-share").hide();
_177.find(".time-reply").show();
},500);
});
}
},50);
}
});
box.find(".share-select a").click(function(e){
e.preventDefault();
var type=jQuery(this).attr("data-sync-type");
var _179=jQuery(this).attr("data-status");
that.toogleBlogStatus(box.parent(),".feed-reply",_179,type,jQuery(this));
});
box.find("textarea[name=content]").limitLength(that.inputLimit);
},initShare:function(box,id){
XZ.USER=XZ.USER||{};
XZ.USER.sites=XZ.USER.sites||{};
XZ.USER.sites[CURSITE.url]=XZ.USER.sites[CURSITE.url]||{};
var that=this;
box.find(".feed-reply").hide();
var _17a=[];
if(box.find(".feed-share").is(":visible")){
box.find(".feed-share").remove();
return;
}
box.find(".feed-topic a").each(function(){
_17a.push(jQuery(this).text().substring(1));
});
box.append(this.getShareHtml(box,_17a,id));
var _17b=box.find(".feed-share");
var _17c=box.find(".feed-ishare").offset().left-box.offset().left+box.find(".feed-ishare").width()/2;
_17b.css("backgroundPosition",_17c+"px 0");
jQuery.use("tag",function(){
var _17d={box:box.find(".write-tag-box")};
var s={tags:_17a,maxNum:5};
var _17e=new SmallSite.app.Subject(jQuery.extend({},_17d,s));
jQuery.extend(_17d,{input:box.find("input[name=taginput]"),"subject":_17e});
new SmallSite.app.SubjectBox(_17d);
box.delegate(".tag-selector li a","click",function(){
jQuery(_17e).triggerHandler("render",[{"val":jQuery(this).attr("data-tag")}]);
});
});
jQuery.use("zhanswitch",function(){
var _17f=_17b.find(".input-btn");
var _180=".feed-share";
var _181=new SmallSite.app.zhanSwitch({sites:sitelist,curtags:XZ.USER.sites[CURSITE.url]["recommendTags"],zhanBox:_17b.find(".share-main"),siteUrl:_17b.find("input[name=toSiteUrl]"),isGetTag:true,tagBox:_17b.find(".tag-selector"),submitBtn:_17f,shareText:"发布到",selected:false});
jQuery(_181).bind("selected",function(_182){
_17f.removeClass("gray-button").removeAttr("disabled");
});
jQuery(_181).bind("unselected",function(_183){
var _184=_17b.find("input[name=toSiteUrl]");
if(!that.checkBlog(box,_180)&&_184.val()==""){
_17f.removeClass("gray-button").addClass("gray-button").attr("disabled","disabled");
}
});
});
if(CURSITE.url&&XZ.USER.sites[CURSITE.url]["recommendTags"]==undefined){
jQuery.ajax({url:"http://zhan.renren.com/"+CURSITE.url+"/recommendTags",dataType:"json",type:"get",async:false,success:function(r){
if(r.code==0){
XZ.USER.sites[CURSITE.url]["recommendTags"]=r.recommendTags;
}
}});
}
this.bindShareEvents(box);
},getShareHtml:function(box,tags,id){
var that=this;
var _185="<input type=\"submit\" value=\"分享\" class=\"input-btn\" >";
var p=box.parents("article");
function _186(){
for(var i in that.blogInfo){
if(p.attr("data-type")=="MUSIC"&&i=="renren"){
continue;
}
if(CURSITE[that.blogInfo[i]["jsConstant"]]==true){
return true;
}
}
return false;
};
if(!_186()){
_185="<input type=\"submit\" value=\"分享\" disabled class=\"input-btn gray-button\" >";
}
return ["<div class=\"feed-share clearfix\">","<div class=\"feed-add-act clearfix\">","<form name=\"shareForm\">","<textarea name=\"comment\" class=\"input-reply\"></textarea>","<input type=\"hidden\" name=\"toSiteUrl\" value=\"\">","<input type=\"hidden\" name=\"ugcId\" value=\""+id+"\"/>","<div class=\"tag-inputer clearfix\">","<ul class=\"tag-selector\">"+this.getTagHtml(tags)+"</ul>","<label class=\"write-tag-feed\">","<span class=\"write-tag-box\"></span>","<input name=\"taginput\" data-norepeat=\"norepeat\" maxlength=\"20\" placeholder=\"添加话题\" class=\"tag-input\">","</label>","</div>","<div class=\"share-btn-box clearfix\">",""+_185,"<div class=\"share-select\">"+this.getBlog(box,2)+"</div>","<div class=\"share-main\"></div>","</div>","</form>","</div>","</div>"].join("");
},getBlog:function(box,type){
var html=[];
var p=box.parents("article");
if(type===1){
for(var i in this.blogInfo){
if(p.attr("data-type")=="MUSIC"&&i=="renren"){
continue;
}
html.push("<a title=\""+this.blogInfo[i]["unsyncTip"]+"\" class=\""+this.blogInfo[i]["unsyncClass"]+"\" href=\"http://zhan.renren.com/zhan/settinginfo\" data-sync-type=\""+i+"\" data-status=\"false\">"+this.blogInfo[i]["blogName"]+"</a>"+"<input type=\"hidden\" name=\""+this.blogInfo[i]["hiddenName"]+"\" value=\"false\"/>");
}
}else{
if(type===2){
for(var i in this.blogInfo){
if(p.attr("data-type")=="MUSIC"&&i=="renren"){
continue;
}
if(CURSITE[this.blogInfo[i]["jsConstant"]]){
html.push("<a title=\""+this.blogInfo[i]["syncTip"]+"\" class=\""+this.blogInfo[i]["syncClass"]+"\" href=\"javascript:;\" data-sync-type=\""+i+"\" data-status=\""+CURSITE[this.blogInfo[i]["jsConstant"]]+"\">"+this.blogInfo[i]["blogName"]+"</a>"+"<input type=\"hidden\" name=\""+this.blogInfo[i]["hiddenName"]+"\" value=\""+CURSITE[this.blogInfo[i]["jsConstant"]]+"\"/>");
}else{
html.push("<a title=\""+this.blogInfo[i]["unsyncTip"]+"\" class=\""+this.blogInfo[i]["unsyncClass"]+"\" href=\"http://zhan.renren.com/zhan/settinginfo\" data-sync-type=\""+i+"\" data-status=\""+CURSITE[this.blogInfo[i]["jsConstant"]]+"\">"+this.blogInfo[i]["blogName"]+"</a>"+"<input type=\"hidden\" name=\""+this.blogInfo[i]["hiddenName"]+"\" value=\""+CURSITE[this.blogInfo[i]["jsConstant"]]+"\"/>");
}
}
}
}
return html.join("");
},getTagHtml:function(tags){
var html=[];
for(var i=0;i<tags.length;i++){
html.push("<li><a data-tag=\""+tags[i]+"\" href=\"javascript:;\">"+tags[i]+"</a></li>");
}
return html.join("");
},checkComment:function(box,id){
var val=jQuery.trim(box.find("textarea[name=content]").val());
if(val==""){
jQuery.messageDialog({message:this.requireTip});
return false;
}
if(val.length>140){
jQuery.messageDialog({message:this.tooLong});
return false;
}
return true;
},addCommentAction:function(box,_187,data,_188){
var that=this;
var orig=data;
if(_188){
orig+=_188;
}
jQuery.ajax({url:"http://zhan.renren.com/"+that.data[_187].siteUrl+"/"+_187+"/comment",type:"post",data:orig+"&type="+that.dataType,dataType:"json",success:function(r){
if(r.code==0){
box.find("input[type=submit]").removeAttr("disabled");
var html=jQuery(r.html);
box.find(".reply-list").prepend(html);
that.updateNumber(box.parents("article"),++that.data[_187].total);
that.initEditor(box,_187);
}else{
if(r.code==-100||r.code==-200){
that.safeCodeDialog(box,_187,data,1);
}else{
jQuery.messageDialog({message:r.msg||"出错了"});
}
}
},complete:function(){
box.find(".reply-form").data("requesting",false);
},error:function(){
}});
},safeCodeDialog:function(box,_189,data,type){
var that=this;
var _18a="http://icode.renren.com/getcode.do?t=minisite_comment";
var _18b=jQuery.popDialog({message:"<div id=\"safeCodeDialog\"><span style=\"font-size:16px;color:#000;\">请输入验证码</span><p style=\"margin-top:10px;margin-bottom:10px;\"><input type=\"text\" name=\"icode\" id=\"comment_icode\" style=\"float:left ;height:43px;width:170px;line-height:43px;border:1px solid #ccc;\"/><img  src=\""+_18a+"&rnd="+Math.random()+"\" style=\"height:45px;width:120px;margin-left:10px;\"/><a href=\"javascript:;\"  id=\"comment_changeCode\" style=\"color:#00b9bd;margin-left:10px;vertical-align:bottom ;\">换一张</a></p></div>",width:420,nofooter:false,callback:function(){
var val=jQuery.trim(_18c.val());
if(val==""){
_18c.css("borderColor","#ed4e34");
_18c.focus();
}else{
_18b.hide();
that.addCommentAction(box,_189,data,"&icode="+jQuery("#comment_icode").val());
}
}});
var _18c=jQuery("#comment_icode");
_18c.blur(function(){
if(jQuery.trim(_18c.val())!==""){
_18c.css("borderColor","#ccc");
}else{
_18c.css("borderColor","#ed4e34");
}
});
jQuery("#comment_changeCode").click(function(){
jQuery("#safeCodeDialog img").attr("src",_18a+"&rnd="+Math.random());
});
},delContributionAction:function(_18d,obj){
var that=this;
var feed=jQuery(obj).parents("article");
if(confirm("确定删除吗？")){
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/contribution/"+_18d+"/delete",dataType:"json",type:"post",success:function(_18e){
if(_18e.code==0){
feed.remove();
that.showContributionTip();
}else{
jQuery.messageDialog({message:_18e.msg||"服务器繁忙，请稍后再试！"});
}
}});
}
},publishAction:function(_18f,obj){
var that=this;
var feed=jQuery(obj).parents("article");
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/contribution/"+_18f+"/allow",dataType:"json",type:"post",success:function(_190){
if(_190.code==0){
jQuery.messageDialog({message:"发布成功"});
feed.remove();
that.showContributionTip();
}else{
jQuery.messageDialog({message:_190.msg||"服务器繁忙，请稍后再试！"});
}
}});
},delDraftAction:function(_191,obj){
var that=this;
var feed=jQuery(obj).parents("article");
if(confirm("确定删除吗？")){
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/draft/"+_191+"/delete",dataType:"json",type:"post",success:function(_192){
if(_192.code==0){
feed.remove();
that.showDraftTip();
}else{
jQuery.messageDialog({message:_192.msg||"服务器繁忙，请稍后再试！"});
}
}});
}
},draftpublishAction:function(_193,obj){
var that=this;
var feed=jQuery(obj).parents("article");
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/draft/"+_193+"/allow",dataType:"json",type:"post",success:function(_194){
if(_194.code==0){
jQuery.messageDialog({message:"发布成功"});
feed.remove();
that.showDraftTip();
}else{
jQuery.messageDialog({message:_194.msg||"服务器繁忙，请稍后再试！"});
}
}});
},delIssuesAction:function(_195,obj){
var that=this;
var feed=jQuery(obj).parents("article");
if(confirm("确定删除吗？")){
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/issue/"+_195+"/delete",dataType:"json",type:"post",success:function(_196){
if(_196.code==0){
feed.remove();
that.showIssueTip();
}else{
jQuery.messageDialog({message:_196.msg||"服务器繁忙，请稍后再试！"});
}
}});
}
},issuesPublishAction:function(_197,obj){
var that=this;
var feed=jQuery(obj).parents("article");
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/issue/"+_197+"/allow",dataType:"json",type:"post",success:function(_198){
if(_198.code==0){
jQuery.messageDialog({message:"发布成功"});
feed.remove();
that.showIssueTip();
}else{
jQuery.messageDialog({message:_198.msg||"服务器繁忙，请稍后再试！"});
}
}});
},rejectContributionAction:function(_199,obj){
var that=this;
var feed=jQuery(obj).parents("article");
var dia=jQuery.popDialog({width:514,message:["<div class=\"reject-layer\" id=\"rejectDialog\">","<div class=\"reject-h\">","<span class=\"title\">退稿给"+feed.attr("authorname")+"</span>","<p>退稿可被重新编辑并再次发送，写上退稿原因，有助于小站收到质量更高的投稿。</p>","</div>","<div class=\"reject-m\"><form id =\"rejectForm\">","<p class=\"r-tip\">退稿原因 :</p>","<textarea class=\"text\" name=\"reason\"></textarea>","<p class=\"op clearfix\"><a href=\"javascript:;\" class=\"save-btn\">退稿</a></p>","</div></form>","</div>"].join("")});
jQuery("#rejectForm .text").limitLength(500);
jQuery("#rejectForm .save-btn").click(function(e){
e.preventDefault();
var t=jQuery(this);
if(t.data("requesting")==true){
return;
}
t.data("requesting",true);
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/contribution/"+_199+"/reject",dataType:"json",data:jQuery("#rejectForm").serialize(),type:"post",success:function(_19a){
if(_19a.code==0){
jQuery.messageDialog({message:"退稿成功"});
feed.remove();
that.showContributionTip();
}else{
jQuery.messageDialog({message:_19a.msg||"服务器繁忙，请稍后再试！"});
}
},complete:function(){
t.data("requesting",false);
}});
});
},showContributionTip:function(){
if(jQuery("#dataContainer").find("article").length<1){
var html="<div class=\"no-sitemain\">小站没有未处理的投稿！</div>";
jQuery("#dataContainer").html(html);
}
},showDraftTip:function(){
if(jQuery("#dataContainer").find("article").length<1){
var html="<div class=\"no-sitemain\">小站没有未处理的草稿！</div>";
jQuery("#dataContainer").html(html);
}
},showIssueTip:function(){
if(jQuery("#dataContainer").find("article").length<1){
var html="<div class=\"no-sitemain\">小站没有未处理的定时发布！</div>";
jQuery("#dataContainer").html(html);
}
},shieldAction:function(_19b,url,name,_19c,_19d){
var _19e=!!_19c;
var req=_19e?"http://zhan.renren.com/"+url+"/block/add?id="+_19b+"&ugcId="+_19d+"&commentId="+_19c:"http://zhan.renren.com/"+url+"/block/add?id="+_19b;
var that=this;
var html=["<div class = \"shieldContent\">","<p  class = \"ptext\" >确定要屏蔽吗？</p>","<p  class = \"ptextWho\">小站不会再收到"+name+"的"+(_19e?"评论":"投稿")+"</p>","</div>","<div class =\"shieldButton\">","<div class = \"shieldConfirm\"><a id = \"shieldConfirm\" href=\"javascript:;\">屏蔽</a></div>","<div class = \"shieldCancle\"><a id = \"shieldCancle\" href=\"javascript:;\">取消</a></div>","</div>"].join("");
var _19f=jQuery.alertDialog({message:html,width:437});
_19f.getFooter().hide();
_19f.getHeader().hide();
jQuery("div.shieldConfirm").bind("click",function(){
var _1a0=jQuery(this).offset().left;
var _1a1=jQuery(this).offset().top-100;
jQuery.ajax({url:req,type:"post",dataType:"json",success:function(r){
if(r.code==0){
jQuery.messageDialog({message:"屏蔽成功"});
}else{
jQuery.messageDialog({message:r.msg||"出错了"});
}
},error:function(){
jQuery.messageDialog({message:r.msg||"出错了"});
}});
});
jQuery("div.shieldCancle").bind("click",function(){
_19f.hide();
});
},delCommentAction:function(cur,_1a2,_1a3){
var that=this;
var _1a4=cur.parents("article");
jQuery.ajax({url:"http://zhan.renren.com/"+that.data[_1a2].siteUrl+"/"+_1a2+"/comment/"+_1a3+"/delete",type:"post",dataType:"json",success:function(r){
if(r.code==0){
cur.parent().parent().remove();
that.updateNumber(_1a4,--that.data[_1a2].total);
}else{
jQuery.messageDialog({message:r.msg||"出错了"});
}
},error:function(){
}});
},loadAction:function(box,_1a5){
var that=this;
var _1a6=true;
if(this.data[_1a5].curpage>=(this.data[_1a5].pageNum-1)){
_1a6=false;
}
jQuery.ajax({url:"http://zhan.renren.com/"+that.data[_1a5].siteUrl+"/"+_1a5+"/comment/list",type:"get",data:"count="+that.pageLimit+"&page="+that.data[_1a5].curpage+"&type="+that.dataType+"&order="+that.order,dataType:"json",success:function(r){
box.data("loading",false);
that.data[_1a5].curpage++;
if(r.code==0){
box.find(".loading").hide();
box.find(".reply-list").append(r.html);
box.show();
box.parents("article").data("init",true);
if(_1a6){
box.find(".morereply").show();
}else{
box.find(".morereply").hide();
}
}else{
jQuery.messageDialog({message:r.msg||"出错了"});
}
},complete:function(){
box.data("loading",false);
},error:function(){
box.data("loading",false);
}});
},replyAction:function(box,id,_1a7){
this.initEditor(box,id,_1a7);
},reportAction:function(toId,_1a8,id,_1a9,text){
var that=this;
var data="feedId="+id+"&commentId="+_1a8+"&toId="+toId+"&hostId="+_1a9+"&text="+text;
jQuery.ajax({url:"http://zhan.renren.com/commentreport/report",type:"post",data:data,dataType:"json",success:function(r){
jQuery.messageDialog({message:"举报成功！"});
},error:function(){
}});
},delAction:function(_1aa,obj){
var feed=jQuery(obj).parents("article");
if(confirm("确定删除吗？")){
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/"+_1aa+"/delete",dataType:"json",type:"post",success:function(_1ab){
if(_1ab.code==0){
feed.remove();
}
}});
}
},removeAction:function(_1ac,obj){
var feed=jQuery(obj).parents("article");
var _1ad=jQuery("#cur_tagId").val();
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/"+_1ac+"/remove",dataType:"json",data:"tagId="+_1ad,type:"post",success:function(_1ae){
if(_1ae.code==0){
jQuery.popDialog({modal:false,message:"<div style=\"text-align:center\">踢出成功！<p>该内容将不出现在该话题下</p></div>",noclose:true,width:200,time:1500});
feed.remove();
}else{
jQuery.popDialog({message:_1ae.msg||"服务器繁忙,请稍候再试!",noclose:true,width:200,time:2000});
}
}});
},likeAction:function(id,src){
var _1af=jQuery(src).is(".feed-ilike");
var sync=true;
if(jQuery(src).data("disabled")!=true&&jQuery(src).data("disabled")!=undefined){
return;
}
jQuery(src).data("disabled",true);
if(_1af){
if(sync){
jQuery(src).html((parseInt(jQuery(src).attr("num"))+1)+"").attr("num",parseInt(jQuery(src).attr("num"))+1);
}
jQuery(src).removeClass("feed-ilike").addClass("feed-ilike-done");
}else{
if(sync){
var num=parseInt(jQuery(src).attr("num"))-1;
if(num<=0){
jQuery(src).html("").attr("num",parseInt(jQuery(src).attr("num"))-1);
}else{
jQuery(src).html(num+"").attr("num",parseInt(jQuery(src).attr("num"))-1);
}
}
jQuery(src).removeClass("feed-ilike-done").addClass("feed-ilike");
}
SmallSite.app.common.toggleLike(_1af,id,"from=homefeed",function(){
},function(){
},function(){
});
},shareAction:function(box,_1b0,data){
var that=this;
var form=box.find("form[name=shareForm]");
var feed=box.parents("article");
var _1b1=form.find(".input-btn");
_1b1.attr("disabled","disabled");
jQuery.ajax({url:"http://zhan.renren.com/"+feed.attr("uri")+"/"+_1b0+"/share",dataType:"json",type:"post",data:form.serialize(),success:function(r){
if(r.code==0){
box.find(".feed-share").remove();
var _1b2=box.find(".feed-ishare");
_1b2.html((parseInt(_1b2.attr("num"))+1)+"分享").attr("num",parseInt(_1b2.attr("num"))+1);
if(SmallSite.app&&SmallSite.app.shareAboutPop){
new SmallSite.app.shareAboutPop("sharetip");
}
_1b2.removeClass("feed-act-done");
}else{
alert(r.msg);
}
},complete:function(){
_1b1.removeAttr("disabled");
},error:function(){
_1b1.removeAttr("disabled");
}});
},bindShareEvents:function(box){
var that=this;
var form=box.find("form[name=shareForm]");
var feed=box.parents("article");
box.find(".feed-share .share-select a").click(function(e){
e.preventDefault();
var type=jQuery(this).attr("data-sync-type");
var _1b3=jQuery(this).attr("data-status");
that.toogleBlogStatus(box,".feed-share",_1b3,type,jQuery(this));
});
box.find("textarea[name=comment]").limitLength(140).focus();
form.submit(function(e){
e.preventDefault();
if(that.checkShare(box)){
that.shareAction(box,feed.attr("feedid"),form.serialize());
}
});
},toogleBlogStatus:function(box,_1b4,_1b5,type,obj){
if(!(CURSITE[this.blogInfo[type]["jsConstant"]])){
window.open("http://zhan.renren.com/zhan/settinginfo?sync=true");
}else{
var _1b6=(_1b5=="true"?this.blogInfo[type]["unsyncClass"]:this.blogInfo[type]["syncClass"]);
var _1b7=(_1b5=="true"?this.blogInfo[type]["unsyncTip"]:this.blogInfo[type]["syncTip"]);
var _1b8=box.find(_1b4+" input[name="+this.blogInfo[type]["hiddenName"]+"]");
var _1b9=box.find(_1b4+" input[name=toSiteUrl]");
if(_1b5=="true"){
box.find(_1b4+" input[name="+this.blogInfo[type]["hiddenName"]+"]").val(false);
obj.attr("data-status","false").attr("title",_1b7);
}else{
_1b8.val(true);
obj.attr("data-status","true").attr("title",_1b7);
}
if(_1b4==".feed-share"){
if(!this.checkBlog(box,_1b4)&&_1b9.val()==""){
box.find(_1b4+" .input-btn").removeClass("gray-button").addClass("gray-button").attr("disabled","disabled");
}else{
box.find(_1b4+" .input-btn").removeClass("gray-button").removeAttr("disabled");
}
}
obj.attr("class",_1b6);
}
},checkBlog:function(box,_1ba){
var box=box.parents("article");
for(var i in this.blogInfo){
if(box.attr("data-type")=="MUSIC"&&i=="renren"){
continue;
}
if(box.find(_1ba+" input[name="+this.blogInfo[i].hiddenName+"]").val()=="true"){
return true;
}
}
return false;
},checkShare:function(box){
var _1bb=box.find(".feed-share input[name=toSiteUrl]").val();
if(!this.checkBlog(box,".feed-share")&&_1bb==""){
jQuery.messageDialog({message:"请选择发布内容去哪"});
return false;
}
return true;
},initPager:function(id,_1bc){
this.data[feedId]={"total":_1bc,"pageNum":Math.ceil(_1bc/this.pageLimit),"curpage":0};
},initEditor:function(box,id,_1bd){
if(!_1bd){
box.find("form[name=replyForm]")[0].reset();
box.find("input[name=toId]").val(box.parents("article").attr("authorid"));
}else{
box.find("input[name=toId]").val(_1bd.toId);
box.find("textarea[name=content]").focus().val("回复"+_1bd.name+":");
}
},updateNumber:function(_1be,_1bf){
if(!this.isSyncTotal){
return;
}
_1be.find(".feed-icmt").html((_1bf!=0?_1bf:"")+"评论");
}};
SmallSite.recommendTipPop=function(){
this.mark=".feed-layer";
this.box_class="layer-show-box";
this.outOfMarkTime=0;
this.outOfBoxTimer=null;
this.init();
};
SmallSite.recommendTipPop.prototype={init:function(){
this.bindEvents();
},bindEvents:function(){
var that=this;
jQuery(this.mark).die("mouseover").live("mouseover",function(){
if(!XZ.isLogin){
return;
}
that.url="http://zhan.renren.com/editor/post/"+jQuery(this).attr("data-id")+"/editor";
that.clearTimer();
if(that.outOfBoxTime&&(new Date().getTime()-that.outOfBoxTime)<=500&&that.rdId==jQuery(this).attr("rdId")){
return;
}
var obj=jQuery(this);
that.rdId=Math.random()+"";
obj.attr("rdId",that.rdId);
if(obj.data("inited")==true){
var _1c0=obj.data("cachedata");
if(_1c0.code==-1){
return;
}
that.render(obj,obj.data("cachedata"));
}else{
if(obj.data("loading")!=true){
that.request(obj);
}
}
}).die("mouseout").live("mouseout",function(){
var This=this;
that.outOfMarkTime=new Date().getTime();
that.outOfBoxTimer=setTimeout(function(){
jQuery("#recommendPopTip").hide();
},500);
});
},getHtml:function(r){
var html="";
if(r.length>0){
for(var i=0;i<r.length;i++){
if(i>9){
break;
}
html+="<p>由"+(r[i].defaultName==""?"<a href=\"http://zhan.renren.com/profile/"+r[i].userId+"\" class=\"layer-link\">"+r[i].userName+"</a>":"管理员")+"推荐到话题<a href=\"http://zhan.renren.com/tag?value="+r[i].tagName+"\" class=\"layer-link\">"+r[i].tagName+"</a></p>";
}
}
return html;
},render:function(obj,ret){
var That=this;
jQuery("#recommendPopTip").remove();
var box=jQuery("<div id=\"recommendPopTip\" class=\""+this.box_class+"\" ><div class=\"pop-content\"><div class=\"arrow-b\" ></div><div class=\"layer-show\"></div></div></div>").appendTo(document.body);
var box=jQuery("#recommendPopTip");
box.find(".layer-show").html(this.getHtml(ret));
var left=obj.offset().left;
var top=obj.offset().top;
box.css({"left":left-(box.width()-obj.width()),"top":top-box.height()-5}).show();
box.unbind();
box.hover(function(){
if((new Date().getTime()-That.outOfMarkTime)<=500){
clearTimeout(That.outOfBoxTimer);
}
},function(){
var that=this;
That.outOfBoxTime=new Date().getTime();
That.outOfMarkTimer=setTimeout(function(){
jQuery(that).hide();
},500);
});
},request:function(obj){
var that=this;
var box=obj.siblings("."+that.box_class);
obj.data("loading",true);
jQuery.ajax({cache:false,url:that.url,dataType:"json",success:function(r){
obj.data("inited",true);
obj.data("cachedata",r);
if(r.code==-1){
return;
}
that.render(obj,r);
},complete:function(r){
obj.data("loading",false);
},error:function(){
}});
},clearTimer:function(){
if(this.outOfMarkTimer){
clearTimeout(this.outOfMarkTimer);
}
if(this.outOfBoxTimer){
clearTimeout(this.outOfBoxTimer);
}
}};
SmallSite.recommendTagPop={init:function(feed,_1c1){
if(feed.data("recommending")==true){
return;
}
this.tags=[];
var that=this;
that.tip="内容不错，被管理员推荐上照片墙啦！";
that.gid=_1c1;
that.feed=feed;
that.uri=feed.attr("uri");
that.toID=feed.attr("authorid");
that.tagId=jQuery("#cur_tagId").val();
that.tagName=jQuery("#cur_tagName").val();
feed.data("recommending",true);
jQuery.ajax({url:"http://zhan.renren.com/editor/recommend/"+_1c1+"/gettags",dataType:"json",type:"get",success:function(r){
if(r.code==0){
that.tags=r.tags;
that.isSuperAdmin=r.isSuperAdmin;
that.dia=jQuery.popDialog({width:490,noPadding:true,message:that.getHtml()});
var body=that.dia.getBody();
that.form=body.find("form");
that.submitBtn=that.form.find("a.layer-submit").data("disabled",false);
that.content=that.form.find("[name=content]");
that.bindEvents();
}else{
jQuery.messageDialog({message:r.msg||"服务器繁忙，请稍后再试！"});
}
},complete:function(){
feed.data("recommending",false);
},error:function(){
}});
},bindEvents:function(){
var that=this;
var body=that.dia.getBody();
var _1c2=body.find(".tags").find("span");
that.form.submit(function(_1c3){
_1c3.preventDefault();
that.recommend();
});
if(this.tags.length>1){
_1c2.click(function(){
_1c2.removeClass("selected");
jQuery(this).addClass("selected");
that.form[0]["tagID"].value=jQuery(this).attr("data-id");
that.form[0]["tagName"].value=jQuery(this).attr("data-name");
});
}
that.content.placeholder(that.tip).limitLength(500);
that.submitBtn.click(function(){
if(that.check()){
that.form.submit();
}
});
},getHtml:function(){
var tag=this.getTag();
return ["<div class=\"layer rec-tag-layer\"><form>","<div class=\"layer-content\">","<h3>推荐好东西到你管理的话题</h3>","<div class=\"to-tag\"><span class=\"to-title\">推荐到话题：</span><p class=\"tags clearfix\">"+this.getTagsHtml(tag)+"</p></div>","<textarea class=\"address\" name=\"content\"></textarea><input type=\"hidden\" name=\"tagName\" value=\""+(tag==null?(this.tags.length==1?this.tags[0].name:""):tag.name)+"\"/><input type=\"hidden\" name=\"tagID\" value=\""+(tag==null?(this.tags.length==1?this.tags[0].id:""):tag.id)+"\"/><input type=\"hidden\" name=\"toID\" value=\""+this.toID+"\"/><input type=\"hidden\" name=\"url\" value=\""+this.uri+"\"/><input type=\"hidden\" name=\"gid\" value=\""+this.gid+"\"/>","<div class=\"layer-btn clearfix\">","<span><a class=\"layer-submit\" href=\"javascript:;\">提交</a></span>","</div>","</form>","</div>"].join("");
},getTag:function(){
var tag=null;
for(var i=0;i<this.tags.length;i++){
if(this.tagId==this.tags[i].id){
tag={"name":this.tags[i].name,"id":this.tags[i].id};
break;
}
}
if(this.tagId!=undefined&&tag==null&&this.isSuperAdmin){
tag={"name":this.tagName,"id":this.tagId};
this.tags.push(tag);
}
return tag;
},getTagsHtml:function(tag){
var html="";
if(this.tags.length>1){
for(var i=0;i<this.tags.length;i++){
html+="<span data-name=\""+this.tags[i].name+"\" data-id=\""+this.tags[i].id+"\" "+(tag!=null&&tag.id==this.tags[i].id?"class=\"selected\"":"")+">"+this.tags[i].name+"</span>";
}
}else{
if(this.tags.length==1){
html+="<span data-id=\""+this.tags[0].id+"\" data-name=\""+this.tags[0].name+"\" class=\"selected\">"+this.tags[0].name+"</span>";
}
}
return html;
},showReccommendPopError:function(msg){
var dia=jQuery.alertDialog({width:330,noPadding:true,message:this.getReCommendedErrHtml(msg)});
this.changeDialog(dia);
var body=dia.getBody();
body.find(".copy-layer-close").click(function(){
dia.hide();
});
body.find(".copy-input").click(function(){
dia.hide();
});
},getReCommendedErrHtml:function(msg){
return ["<div class=\"copy-layer\">","<span class=\"copy-layer-close\"><img alt=\"\" src=\"http://a.xnimg.cn/smallsite/images/layer-close.png\">关闭</span>","<div class=\"copy-layer-content\">","<span>"+msg+"</span>","<input type=\"submit\" value=\"确定\" class=\"copy-input\">","</div>","</div>"].join("");
},check:function(){
var _1c4=this.content;
if(this.form[0]["tagID"].value==""){
alert("请选择推荐的话题");
return false;
}
if(_1c4.val()==""||_1c4.val()==this.tip){
_1c4.val("");
}
return true;
},recommend:function(){
var that=this;
if(that.submitBtn.data("disabled")==true){
return;
}
that.submitBtn.data("disabled",true);
jQuery.ajax({url:"http://zhan.renren.com/editor/suggest",dataType:"json",type:"post",data:that.form.serialize(),success:function(r){
if(r.code==0){
that.recommendSuccess();
}else{
jQuery.messageDialog({message:r.msg||"服务器繁忙，请稍后再试！"});
}
},complete:function(){
that.submitBtn.data("disabled",false);
},error:function(){
}});
},recommendSuccess:function(){
var html="<div class=\"feed-layer-box\"><a href=\"javascript:;\" data-id=\""+this.gid+"\"  class=\"feed-layer\"></a></div>";
var feed=this.feed;
jQuery(html).insertAfter(feed.find(".post-holder"));
jQuery.messageDialog({message:"推荐成功"});
}};
SmallSite.app=SmallSite.app||{};
SmallSite.app.guess4LikeSite=function(){
if(XZ.isLogin){
this.init();
}else{
jQuery("#guess4like-mod").css("height","255px");
}
};
SmallSite.app.guess4LikeSite.prototype={init:function(){
var that=this;
this.pageLimit=3;
this.distance=152;
this.time=10000;
this.num=90;
this.box=jQuery("#guess4like-mod");
this.sitesBox=this.box.find(".site-like-list");
if(this.box.length==0){
return;
}
this.bindEvents();
this.nextAction(function(r){
var html="";
var page=Math.floor(r.length/that.pageLimit);
var _1c5=page*that.pageLimit;
for(var i=0;i<_1c5;i++){
html+=that.getOneHtml(r[i]);
}
that.sitesBox.append(html);
that.setTimer();
},this.num);
},bindEvents:function(){
var This=this;
this.box.delegate(".site-like-btn a","click",function(_1c6){
_1c6.preventDefault();
if(jQuery(this).data("requesting")==true){
return;
}
jQuery(this).data("requesting",true);
var that=this;
SmallSite.app.common.toggleFollow(true,jQuery(this).attr("data-uri"),"from=guess4Like",function(){
jQuery(that).parent().hide();
jQuery.messageDialog({message:"关注成功"});
},function(){
jQuery(that).data("requesting",false);
});
});
this.box.mouseenter(function(){
This.stopTimer();
}).mouseleave(function(){
This.setTimer();
});
},setTimer:function(){
var that=this;
that.stopTimer();
that.stop=false;
this.timer=setTimeout(function(){
that.change();
},this.time);
},change:function(){
if(this.stop==true){
return;
}
var that=this,html=[];
var old=[];
var list=jQuery.makeArray(this.sitesBox.find(">dl")).reverse();
for(var i=0;i<this.pageLimit;i++){
old.push(jQuery(list[i]));
html.push("<dl>"+jQuery(list[i]).html()+"</dl>");
}
that.sitesBox.prepend(html.reverse().join(""));
that.sitesBox.css({"margin-top":"-"+that.distance+"px"}).animate({marginTop:0},1000,function(){
for(var i=0;i<old.length;i++){
old[i].remove();
}
});
that.setTimer();
},stopTimer:function(){
clearTimeout(this.timer);
this.stop=true;
},nextAction:function(cb,_1c7){
jQuery.ajax({url:"http://zhan.renren.com/zhan/suggest/get",type:"get",data:"count="+_1c7+"&lastids="+encodeURIComponent(this.getIds()),dataType:"json",success:function(r){
if(cb){
cb(r);
}
},complete:function(){
},error:function(){
}});
},getOneHtml:function(site){
var arr=["<dl>","<dt><a data-uri=\"http://zhan.renren.com/"+site.url+"\" class=\"name-card\" data-loc=\"guess4like\" href=\"http://zhan.renren.com/"+site.url+"?from=rmd\">"+site.name+"</a></dt>","<dd class=\"site-like-pic\"><a  data-uri=\"http://zhan.renren.com/"+site.url+"\" class=\"name-card\" data-loc=\"guess4like\" href=\"http://zhan.renren.com/"+"?from=rmd\"><img src=\""+site.tinyHeadSource+"\"   onload=\"SmallSite.autoResizeImg(this, 50, 50);\"/></a></dd>","<dd class=\"site-like-topic\">"+this.getTags(site)+"</dd>","<dd class=\"site-like-btn\"><a href=\"#\" data-uri=\""+site.url+"\">关注</a></dd>","</dl>"];
return arr.join("");
},getTags:function(site){
var html="";
if(site.suggestType=="byFriend"){
html+="<span>"+site.ownerName+"的小站</span>";
}else{
for(var i=0;i<site.tags.length;i++){
html+="<a  class= \"tag-card\" href=\"http://zhan.renren.com/tag?value="+site.tags[i].tagValue+"\" data-title=\""+site.tags[i].tagValue+"\">"+site.tags[i].cutValue+"</a>";
}
}
return html;
},getIds:function(){
var ids="";
this.box.find("form input").each(function(){
ids+=jQuery(this).val()+",";
});
if(ids.length>0){
ids=ids.substring(0,ids.length-1);
}
return ids;
},getThreeHtml:function(r){
var html="";
for(var i=0;i<r.length;i++){
html+=this.getOneHtml(r[i]);
}
return html;
}};
jQuery(function(){
var $=jQuery;
$("#home-guide1 a").click(function(e){
e.preventDefault();
$("#home-guide1").hide();
$("#home-guide2").show();
});
$("#home-guide2 a").click(function(e){
e.preventDefault();
$("#home-guide2").hide();
$("#home-guide3").show();
});
$("#home-guide3 a").click(function(e){
e.preventDefault();
$("#home-guide3").hide();
$("#home-guide4").show();
});
$("#home-guide4 a").click(function(e){
e.preventDefault();
$("#home-guide4").hide();
$("#home-guide5").show();
});
if(XZ.showRecommendGuide==true){
$("#home-guide5 a").attr("href","http://zhan.renren.com/reg/hotTag");
}else{
$("#home-guide5 a").attr("href",window.location.href);
}
});
SmallSite.app.siteBlockPop=function(_1c8){
jQuery.extend(this,{tagId:jQuery("#cur_tagId").val(),tagName:jQuery("#cur_tagName").val()},_1c8);
this.init();
};
SmallSite.app.siteBlockPop.prototype={init:function(){
var that=this;
this.request(function(){
that.dia=jQuery.popDialog({width:502,noPadding:true,message:["<div class=\"site-block\"><form name=\"blocksiteForm\" id=\"blocksiteForm\" onsubmit=\"return false;\">","<div class=\"site-block-content\">","<p>屏蔽后，该小站任何内容不再出现在 #"+that.tagName+" 话题下</p>","<p><span>屏蔽时间 :</span><select name=\"time\"><option value=\"7\" selected>7天</option><option value=\"30\">30天</option><option value=\"-1\">永久</option></select></p>","<p><span class=\"block-tip\">以下情况才能永久屏蔽：（1）广告（2）小站内容长期与话题不符</span></p>","<p><span>屏蔽理由(必填) :</span><span class=\"block-error\" style=\"display:none;\">请填写屏蔽理由!</span></p>","<p>","<textarea name=\"reason\" ></textarea>","<input type=\"hidden\" name=\"siteId\" value=\""+that.siteId+"\">","<input type=\"hidden\" name=\"tagId\" value=\""+that.tagId+"\">","<input type=\"hidden\" name=\"tagName\" value=\""+that.tagName+"\">","</p>","</div>","<div class=\"action\"><input type=\"submit\" class=\"block-btn\" value=\"屏蔽\" /><input type=\"button\" class=\"cancel-btn\" value=\"取消\" /></div>","</form></div>"].join("")});
that.form=jQuery("#blocksiteForm");
that.input=jQuery(that.form[0]["reason"]);
that.blockBtn=that.form.find(".block-btn");
that.blockTip=that.form.find(".block-tip");
that.blockErr=that.form.find(".block-error");
that.bindEvents();
});
},request:function(cb){
var that=this;
if(that.cbobj.data("req")==true){
return;
}
that.cbobj.data("req",true);
jQuery.ajax({url:"http://zhan.renren.com/"+this.uri+"/judge",data:"tagId="+this.tagId+"&siteId="+this.siteId,type:"post",dataType:"json",success:function(_1c9){
if(_1c9.code==0){
if(_1c9.isBlock){
jQuery.popDialog({message:"小站已屏蔽，刷新后该内容将不存在",noclose:true,width:200,time:2000});
}else{
cb();
}
}else{
jQuery.popDialog({message:_1c9.msg||"服务器繁忙,请稍候再试!",noclose:true,width:200,time:2000});
}
},complete:function(){
that.cbobj.data("req",false);
}});
},bindEvents:function(){
var that=this;
this.input.limitLength(500);
this.input.bind("input",function(){
that.changeStatus(jQuery.trim(jQuery(this).val()));
});
this.input.bind("focus",function(){
that.blockErr.hide();
});
this.input.bind("propertychange",function(){
that.changeStatus(jQuery.trim(jQuery(this).val()));
});
this.form.delegate(".block-btn-enable","click",function(){
var cur=jQuery(this);
if(!that.check()||cur.data("request")==true){
return;
}
that.block(cur);
});
this.form.delegate(".cancel-btn","click",function(){
that.dia.hide();
});
this.form.delegate("select","change",function(){
if(jQuery(this).val()==-1){
that.blockTip.show();
}else{
that.blockTip.hide();
}
});
},changeStatus:function(val){
if(val!=""){
this.blockBtn.removeClass("block-btn-enable").addClass("block-btn-enable");
}else{
this.blockBtn.removeClass("block-btn-enable");
}
},block:function(cur){
var that=this;
cur.data("request",true);
jQuery.ajax({url:"http://zhan.renren.com/"+this.uri+"/lock",data:this.form.serialize(),type:"post",dataType:"json",success:function(_1ca){
if(_1ca.code==0){
jQuery.popDialog({message:"<p style=\"text-align:center;\">屏蔽成功！</p>",noclose:true,width:150,time:2000});
if(that.cbobj){
that.cbobj.parents("article").remove();
}
}else{
jQuery.popDialog({message:_1ca.msg||"服务器繁忙,请稍候再试!",noclose:true,width:200,time:2000});
}
},complete:function(){
cur.data("request",false);
}});
},check:function(){
if(jQuery.trim(this.input.val())==""){
this.blockErr.show();
return false;
}
return true;
}};
jQuery(function(){
jQuery("body").delegate(".tag-header .tag-btn","click",function(e){
e.preventDefault();
var that=this;
if(jQuery(that).data("requesting")==true){
return;
}
jQuery(that).data("requesting",true);
SmallSite.app.common.toggleTagFollow(true,jQuery(that).attr("data-tag"),"from=hide",function(){
jQuery(that).removeClass();
jQuery(that).addClass("tag-btn-select").text("已订阅");
if(SmallSite.app&&SmallSite.app.tagAboutPop){
new SmallSite.app.tagAboutPop("tagfollow","订阅成功",jQuery(that).attr("data-tag"));
}
},function(){
jQuery(that).data("requesting",false);
});
});
jQuery("body").delegate(".tag-header .tag-btn-select","click",function(e){
e.preventDefault();
var that=this;
if(jQuery(that).data("requesting")==true){
return;
}
jQuery.confirmDialog({message:"确认取消订阅？",callback:function(){
var This=this;
jQuery(that).data("requesting",true);
SmallSite.app.common.toggleTagFollow(false,jQuery(that).attr("data-tag"),"from=hide",function(){
This.hide();
jQuery(that).removeClass();
jQuery(that).addClass("tag-btn").text("订阅");
},function(){
jQuery(that).data("requesting",false);
});
}});
});
jQuery("body").delegate(".tag-header .tag-btn-select","mouseover",function(e){
jQuery(this).text("取消订阅");
});
jQuery("body").delegate(".tag-header .tag-btn-select","mouseout",function(e){
jQuery(this).text("已订阅");
});
jQuery("body").delegate(".feed-site-follow","click",function(e){
e.preventDefault();
if(!XZ.isLogin){
SmallSite.login.dialog();
return;
}
var that=this;
var url=jQuery(that).attr("data-uri");
if(jQuery(that).data("requesting")==true){
return;
}
jQuery(that).data("requesting",true);
SmallSite.app.common.toggleFollow(true,url,"from=tag-feed-follow",function(){
jQuery.messageDialog({width:200,message:"<div class=\"dia-message-box\"><span>关注成功 ！</span></div>"});
jQuery(that).hide();
},function(){
jQuery(that).data("requesting",false);
});
});
jQuery("body").delegate(".feed-site-block","click",function(e){
e.preventDefault();
if(!XZ.isLogin){
SmallSite.login.dialog();
return;
}
new SmallSite.app.siteBlockPop({uri:jQuery(this).attr("data-uri"),siteId:jQuery(this).attr("data-id"),cbobj:jQuery(this)});
});
});
jQuery(function(){
new SmallSite.feedAction();
var href=document.location.href;
var type=CURSITE.location;
var t="";
switch(type){
case "home":
t="feed";
break;
case "likes":
t="like";
break;
case "tag":
t="topic";
break;
case "profile":
t="profile";
break;
}
SmallSite.Services.init(t);
});
jQuery(function(){
jQuery(".one-log .feed-open,.log-open .feed-close").die("click").live("click",function(e){
e.preventDefault();
var p=jQuery(this).parents(".feed-content"),log=p.find(".one-log"),_1cb=p.find(".log-open");
if(jQuery(this).is(".feed-open")){
log.hide();
_1cb.show();
jQuery("body").triggerHandler("toogle-comment",[true,jQuery(this)]);
}else{
_1cb.hide();
log.show();
jQuery("body").triggerHandler("toogle-comment",[false,jQuery(this)]);
jQuery("html, body").animate({scrollTop:jQuery(this).parents("article").offset().top-50},0);
}
return false;
});
jQuery(".one-log>a img").die("click").live("click",function(e){
e.preventDefault();
var p=jQuery(this).parents(".one-log");
p.find(".feed-open").trigger("click");
});
jQuery(".log-open img").die("click").live("click",function(e){
e.preventDefault();
var p=jQuery(this).parents(".log-open");
p.find(".feed-close").trigger("click");
});
});
jQuery(function(){
jQuery(".feed-video .video-player a").die("click").live("click",function(e){
e.preventDefault();
var obj=jQuery(this);
var p=jQuery(this).parents(".feed-content");
var _1cc=p.find(".video-player");
var _1cd=p.find(".video-player-open");
var _1ce=_1cd.find(".video-thumb");
jQuery.use("playmedia",function(){
var data=obj.attr("data").split(";");
var _1cf=data[0];
var url=data[1];
var _1d0=510;
var _1d1=parseInt(_1d0/_1cf);
_1ce.html(getVedioHTML(url,_1d0,_1d1,false,obj.attr("datavars")));
_1cc.hide();
_1cd.show();
jQuery("body").triggerHandler("toogle-comment",[true,obj]);
},this);
return false;
});
jQuery(".feed-video .feed-close").die("click").live("click",function(){
var p=jQuery(this).parents(".feed-content");
var _1d2=p.find(".video-player");
var _1d3=p.find(".video-player-open");
var _1d4=_1d3.find(".video-thumb");
_1d3.hide();
_1d2.show();
_1d4.html("");
jQuery("body").triggerHandler("toogle-comment",[false,jQuery(this)]);
return false;
});
});
jQuery(function(){
jQuery(".feed-music .music-playbox a").die("click").live("click",function(){
jQuery.use("playmedia",function(){
var obj=jQuery(this);
var data=obj.attr("data").split(";");
var type=data[0];
var url=data[1];
var _1d5=jQuery(this).parent().html(getAudioHTML(url,type));
obj.hide().parent().prepend(_1d5);
jQuery("body").triggerHandler("toogle-comment",[true,obj]);
},this);
return false;
});
});
jQuery(function(){
var _1d6=false;
var fun=function(type,uri,obj){
var _1d7=jQuery.browser.IE?document.body.offsetHeight:document.documentElement.offsetHeight;
var _1d8=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
var hght=jQuery(document).height();
var _1d9=jQuery(obj).height()+1;
var top=obj.pageYOffset||(document.compatMode=="CSS1Compat"?document.documentElement.scrollTop:document.body.scrollTop);
if((top>=(parseInt(hght)-_1d9))&&!_1d6){
_1d6=true;
jQuery(".loading-box").show();
var url=uri;
if(type!="topic"){
if(url.split("?").length>1){
url=uri+"&page="+(jQuery("#feed-container").data("page")+1);
}else{
url=uri+"?page="+(jQuery("#feed-container").data("page")+1);
}
}else{
if(url.split("?").length>1){
url=uri+"&page="+(jQuery("#feed-container").data("page")+1);
}else{
url=uri+"?page="+(jQuery("#feed-container").data("page")+1);
}
}
jQuery.ajax({url:url,dataType:"json",success:function(r){
jQuery(".loading-box").hide();
if(r.code==0){
if(r.count==0){
jQuery("#feed-container").data("hasMore",false);
}else{
if(jQuery(".no-sitemain").length>0){
jQuery(".no-sitemain").remove();
}
var _1da=jQuery(innerShiv(r.posts));
jQuery("#feed-container").append(_1da);
jQuery("#feed-container").data("page",jQuery("#feed-container").data("page")+1);
SmallSite.feedPics.load();
evalMusicFeed();
location.hash="!//more/"+innerShiv(r.posts).firstChild.getAttribute("data-feedid");
}
}else{
}
_1d6=false;
},error:function(){
jQuery(".loading-box").hide();
_1d6=false;
}});
}
evalMusicFeed=function(){
var _1db=jQuery(".feed-music");
_1db.each(function(i,v){
var _1dc=jQuery(this).attr("feedid");
var _1dd=jQuery("#flashContent"+_1dc).find("script").html();
eval(_1dd);
});
};
};
jQuery(window).scroll(function(e){
setTimeout(function(){
var _1de=jQuery(document.body).data("tabtype");
var obj=jQuery("#feed-container");
if(_1de=="feed"&&obj.data("hasMore")==true){
fun("feed",obj.attr("uri"),this);
}
if(_1de=="like"&&obj.data("hasMore")==true){
fun("like",obj.attr("uri"),this);
}
if(_1de=="topic"&&obj.data("hasMore")==true){
fun("topic",obj.attr("uri"),this);
}
if(_1de=="profile"&&obj.data("hasMore")==true){
fun("profile",obj.attr("uri"),this);
}
},200);
});
});
jQuery(function(){
jQuery("body").bind("toogle-comment",function(_1df,flag,obj){
var p=obj.parents("article");
if(flag^p.find(".feed-reply").is(":visible")){
if(XZ.isLogin){
p.find(".feed-icmt").trigger("click",[false]);
}
}
});
});
jQuery(function(){
jQuery(".like-btn-select,.like-btn").live("click",function(_1e0){
_1e0.preventDefault();
var obj=jQuery(this);
var _1e1=!(obj.is(".like-btn-select"));
if(obj.data("requesting")==true){
return;
}
obj.data("requesting",true);
SmallSite.app.common.toggleLike(_1e1,obj.attr("ugcid"),"from=radar",function(){
if(_1e1){
obj.attr("class","like-btn-select").attr("title","取消喜欢");
}else{
obj.attr("class","like-btn").attr("title","喜欢");
}
},function(){
obj.data("requesting",false);
},function(){
});
});
jQuery(".site-radar .add-btn").live("click",function(_1e2){
_1e2.preventDefault();
var obj=jQuery(this);
jQuery.use("share",function(){
SmallSite.app.share.dialog(obj.attr("ugcid"),obj.attr("ugcfrom"));
});
});
(function(){
var list=jQuery(".site-recommend .main-box");
var _1e3=null;
var _1e4=0,page=list.length;
function _1e5(){
_1e3=setTimeout(function(){
_1e6();
},10000);
};
function _1e6(){
if(_1e4==(page-1)){
_1e4=0;
}else{
_1e4++;
}
list.hide();
list.eq(_1e4).show();
clearTimeout(_1e3);
_1e5();
};
_1e5();
list.hover(function(){
clearTimeout(_1e3);
},function(){
_1e5();
});
})();
});
jQuery(function(){
var _1e7=jQuery(".siteside .feedback");
var _1e8={init:function(){
this.dia=jQuery.popDialog({width:555,noPadding:false,message:this.getHtml()});
this.bindEvents();
},feedBackAction:function(data){
var that=this;
_1e7.attr("disabled","disabled");
jQuery.ajax({url:"http://zhan.renren.com/feedback/add",type:"post",dataType:"json",data:data,success:function(){
_1e7.removeAttr("disabled");
jQuery.messageDialog({message:"提交成功，谢谢您的反馈！"});
},error:function(){
_1e7.removeAttr("disabled");
jQuery.messageDialog({message:"提交成功，谢谢您的反馈！"});
}});
},bindEvents:function(){
var that=this;
var body=that.dia.getBody();
var form=body.find("form[name=feedbackForm]");
form.submit(function(_1e9){
_1e9.preventDefault();
if(that.check()){
that.feedBackAction(form.serialize());
}
return false;
});
form.find("textarea[name=info]").limitLength(500);
},getHtml:function(){
var html="";
html=["<div style=\"font-size:14px;padding: 10px;\"><p style=\"margin:0 auto;text-align: center; font-weight: bold;\">给小站提意见</p><div style=\"\">小站的成长离不开您的关心，如果您在使用小站的过程中有任何疑问或者意见，请告诉我们，我们会及时向您反馈并根据您的建议来不断完善小站。</div>","<form name=\"feedbackForm\"><p style=\"margin-top:6px;\"><textarea style=\"height: 84px;width:485px;padding:5px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;border:1px solid #adcacc;\" name=\"info\"></textarea></p>","<p style=\"text-align:right;margin-top:10px;\"><input type=\"submit\" value=\"提交\" class=\"input-submit\" style=\"border:0;background-color:#00B9BD;padding:9px 20px;cursor: pointer;font-size:14px;color:#fff;\" /></p></form>","</div>"].join("");
return html;
},check:function(){
return true;
}};
_1e7.click(function(_1ea){
var ele=_1ea.target||_1ea.srcElement;
if(jQuery(ele).hasClass("collection")){
return;
}
_1ea.preventDefault();
_1e8.init();
return false;
});
});
jQuery(function(){
var _1eb=jQuery("#applyBtn");
var _1ec={init:function(){
this.dia=jQuery.alertDialog({title:"",width:667,noPadding:true,message:this.getHtml()});
this.dia.getFooter().hide();
this.bindEvents();
},applyAction:function(form){
var that=this;
var _1ed=form.find("input[type=submit]");
_1ed.attr("disabled","disabled");
jQuery.ajax({url:"http://zhan.renren.com/tag/manager/apply",type:"post",dataType:"json",data:form.serialize(),success:function(r){
if(r.code==0){
jQuery.messageDialog({message:"提交成功！谢谢您的申请"});
}else{
jQuery.messageDialog({message:"提交失败！请稍后再试"});
}
},complete:function(){
_1ed.removeAttr("disabled");
},error:function(){
that.dia.hide();
}});
},bindEvents:function(){
var that=this;
var body=that.dia.getBody();
var form=body.find("form[name=applyManagerForm]");
form.submit(function(_1ee){
_1ee.preventDefault();
if(that.check(form)){
that.applyAction(form);
}
return false;
});
form.find("textarea[name=info]").limitLength(500);
},getHtml:function(){
var html="";
html=["<div class=\"help-text\"><form class=\"tag-admin-box\" name=\"applyManagerForm\">","<label class=\"tag-admin-tit\"><strong>申请话题管理员</strong></label>","<label><strong>填写以下信息：</strong></label>","<label>1.申请的话题（一个人只能申请一个话题）</label>","<label>2.你拥有的小站</label>","<label>3.详细的申请理由和管理计划</label>","<label>4.你的个人站点/作品链接</label>","<label>5.你的直接联系方式（QQ/MSN）</label>","<textarea name=\"info\" class=\"tag-admin-text\"></textarea>","<input type=\"submit\" value=\"提 交\" class=\"tag-admin-btn\">","</form></div>"].join("");
return html;
},check:function(form){
if(form.find("textarea[name=info]").val()==""){
return false;
}
return true;
}};
_1eb.live("click",function(_1ef){
_1ef.preventDefault();
_1ec.init();
return false;
});
});
jQuery(function(){
var hash=location.hash;
if(hash.indexOf("contribute")!==-1){
publisher.active("photo");
}else{
if(hash.indexOf("pubblog")!==-1){
publisher.active("text");
}else{
if(hash.indexOf("pubphoto")!==-1){
publisher.active("photo");
}else{
if(hash.indexOf("pubvideo")!==-1){
publisher.active("video");
}else{
if(hash.indexOf("pubmusic")!==-1){
publisher.active("music");
}else{
if(hash.indexOf("publink")!==-1){
publisher.active("link");
}
}
}
}
}
}
});
jQuery(function(){
new SmallSite.recommendTipPop();
new SmallSite.app.guess4LikeSite();
jQuery("#sitemainold .banner").click(function(e){
if($(e.target).hasClass("banner-close")){
e.preventDefault();
}
var _1f0=jQuery(this).find("img").attr("src");
jQuery(this).remove();
jQuery.ajax({url:"http://zhan.renren.com/home/closeDeclaration",type:"post",data:"img_src="+encodeURIComponent(_1f0),success:function(){
}});
});
var gid=jQuery.queryString("gid");
if(gid!==null){
jQuery("body").triggerHandler("toogle-comment",[true,jQuery("article[feedid="+gid+"]").find(".post-holder")]);
}
});
jQuery(function(){
jQuery("#dataContainer").delegate(".site-del a","click",function(e){
e.preventDefault();
var This=this;
var url=jQuery(this).attr("data-uri");
SmallSite.app.common.toggleFollow(false,url,"",function(){
jQuery.messageDialog({message:"已经取消关注了"});
jQuery(This).parents(".attention-site").hide();
});
});
});
jQuery(function(){
jQuery("#dataContainer").delegate(".admin-attention .all a","click",function(e){
e.preventDefault();
var This=this;
var uid=jQuery(this).attr("data-uid");
var box=jQuery(this).parents(".admin-attention");
var ul=box.find("ul");
var lis=ul.find(">li");
if(lis.length>9){
ul.css({"height":""});
jQuery(this).parent().hide();
box.find(".close").show();
return;
}
jQuery.ajax({url:"http://zhan.renren.com/friends/sites?uid="+uid+"&count=171",type:"get",success:function(r){
ul.append(r);
jQuery(This).parent().hide();
box.find(".close").show();
},error:function(){
}});
});
jQuery("#dataContainer").delegate(".admin-attention .close a","click",function(e){
e.preventDefault();
jQuery(this).parent().hide();
jQuery(this).parents(".admin-attention").find(".all").show();
jQuery(this).parents(".admin-attention").find("ul").css({"height":"55px"});
});
});
jQuery(function(){
var $=jQuery;
$(".siteside").delegate("#topsite-mod .site-like-btn a","click",function(e){
e.preventDefault();
var that=this;
if($(this).data("requesting")==true){
return;
}
$(that).data("requesting",true);
SmallSite.app.common.toggleFollow(true,$(that).attr("data-uri"),"from=topsite",function(){
$.messageDialog({message:"关注成功"});
$(that).parent().hide();
},function(){
$(that).data("requesting",false);
});
});
});
jQuery(function(){
var $=jQuery;
var _1f1=$(".siteside");
var _1f2=$.browser.msie&&$.browser.version==="6.0";
if(_1f1.size()===0||_1f2||$("body").attr("id")!=="homeV2"){
return;
}
var _1f3=_1f1.find(".site-tag + *");
var _1f4=$(".sub-header");
var _1f5=$("#header").height();
var _1f6=_1f1.css("top");
var _1f7=_1f1.offset().top;
var _1f8=parseInt(_1f1.css("margin-top"));
var _1f9=_1f3.offset().top;
var _1fa=_1f5-15;
var _1fb=0;
var _1fc=function(){
if(_1f4.find(".tag-header").size()===0){
return false;
}else{
return true;
}
};
$(window).scroll(function(){
var sTop=$(this).scrollTop();
var _1fd=_1f1.attr("data-state");
var pos={};
if(_1fb===0&&_1fc()){
return;
}
if(sTop<_1fb&&_1fd==="fixed"){
pos=_1fe();
if(sTop+_1fa>pos.sideTop){
_1f1.css({position:"absolute",top:pos.sideTop+parseInt(_1f6)-_1fa});
_1f1.attr("data-state","absolute");
}
}else{
if(sTop<_1fb&&_1fd!=="fixed"){
pos=_1fe();
if(sTop+_1fa<=pos.sideTop){
_1f1.css({top:_1fa-9,position:"fixed"});
_1f1.attr("data-state","fixed");
}
}else{
if(sTop>_1fb&&_1fd!=="fixed"){
pos=_1fe();
if(sTop+_1fa>=pos.tagsTop){
_1f1.css({top:pos.sideTop-pos.tagsTop+_1fa-_1f8,position:"fixed"});
_1f1.attr("data-state","fixed");
}
}else{
if(sTop>_1fb&&_1fd==="fixed"){
pos=_1fe();
if(sTop+_1fa+11<pos.tagsTop){
_1f1.css({top:pos.sideTop+parseInt(_1f6)-_1fa-11,position:"absolute"});
_1f1.attr("data-state","absolute");
}
}
}
}
}
if(sTop===0){
_1f1.css({top:_1f6,position:"absolute"});
_1f1.attr("data-state","absolute");
}
_1fb=sTop;
});
function _1fe(){
return {sideTop:_1f1.offset().top,tagsTop:_1f3.offset().top};
};
});
jQuery(function(){
if(typeof CURSITE!="undefined"){
CURSITE.location=CURSITE.location||"";
}else{
CURSITE={location:""};
}
var data=siteStorage.getItem("smallsitesharData");
var _1ff=CURSITE.location;
var _200;
var show=function(info){
var type=info.type;
switch(type){
case "article":
type="text";
break;
case "siteUrl":
type="link";
break;
}
if(_1ff=="home"){
publisher.shareDate(type,info);
}
};
if(typeof smallsitesharData!="undefined"&&_1ff=="home"){
var _201=smallsitesharData.message;
show(_201);
if(data){
siteStorage.removeItem("smallsitesharData");
}
}
if(data&&_1ff=="home"){
_200=jQuery.parseJSON(data);
show(_200);
siteStorage.removeItem("smallsitesharData");
}
});
jQuery(function(){
if(XZ.isLogin===false){
}
var $=jQuery;
var _202=$("#page");
var eBar=$("#page div.sub-header");
var _203=eBar.height();
var _204=eBar.children(":first");
var _205=$("#page .page-content div.container");
var _206="show";
var _207=jQuery.browser.msie&&parseInt(jQuery.browser.version)===6;
$(window).scroll(function(){
if(eBar.hasClass("stop-resize")||_207){
return;
}
if($(this).scrollTop()>170&&_206==="show"){
_208("hide");
_206="hide";
}else{
if($(this).scrollTop()<=170&&_206==="hide"){
_203=eBar.attr("data-height")||_203;
_208("show");
_206="show";
}
}
});
var _208=function(type){
if(type==="show"){
eBar.css({"height":_203});
_204.css({"margin-top":"0px"});
_202.removeClass("min-bar");
}else{
if(type==="hide"){
eBar.css({"height":"5px"});
_204.css({"margin-top":"-100px"});
_202.addClass("min-bar");
}
}
};
});
(function(b){
var e,d,a=[],c=window;
b.fn.tinymce=function(j){
var p=this,g,k,h,m,i,l="",n="";
if(!p.length){
return p;
}
if(!j){
return tinyMCE.get(p[0].id);
}
p.css("visibility","hidden");
function o(){
var r=[],q=0;
if(f){
f();
f=null;
}
p.each(function(t,u){
var s,w=u.id,v=j.oninit;
if(!w){
u.id=w=tinymce.DOM.uniqueId();
}
s=new tinymce.Editor(w,j);
r.push(s);
s.onInit.add(function(){
var x,y=v;
p.css("visibility","");
if(v){
if(++q==r.length){
if(tinymce.is(y,"string")){
x=(y.indexOf(".")===-1)?null:tinymce.resolve(y.replace(/\.\w+$/,""));
y=tinymce.resolve(y);
}
y.apply(x||tinymce,r);
}
}
});
});
b.each(r,function(t,s){
s.render();
});
};
if(!c.tinymce&&!d&&(g=j.script_url)){
d=1;
h=g.substring(0,g.lastIndexOf("/"));
if(/_(src|dev)\.js/g.test(g)){
n="_src";
}
m=g.lastIndexOf("?");
if(m!=-1){
l=g.substring(m+1);
}
c.tinyMCEPreInit=c.tinyMCEPreInit||{base:h,suffix:n,query:l};
if(g.indexOf("gzip")!=-1){
i=j.language||"en";
g=g+(/\?/.test(g)?"&":"?")+"js=true&core=true&suffix="+escape(n)+"&themes="+escape(j.theme)+"&plugins="+escape(j.plugins)+"&languages="+i;
if(!c.tinyMCE_GZ){
tinyMCE_GZ={start:function(){
tinymce.suffix=n;
function q(r){
tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute(r));
};
q("langs/"+i+".js");
q("themes/"+j.theme+"/editor_template"+n+".js");
q("themes/"+j.theme+"/langs/"+i+".js");
b.each(j.plugins.split(","),function(s,r){
if(r){
q("plugins/"+r+"/editor_plugin"+n+".js");
q("plugins/"+r+"/langs/"+i+".js");
}
});
},end:function(){
}};
}
}
b.ajax({type:"GET",url:g,dataType:"script",cache:true,success:function(){
tinymce.dom.Event.domLoaded=1;
d=2;
if(j.script_loaded){
j.script_loaded();
}
o();
b.each(a,function(q,r){
r();
});
}});
}else{
if(d===1){
a.push(o);
}else{
o();
}
}
return p;
};
b.extend(b.expr[":"],{tinymce:function(g){
return g.id&&!!tinyMCE.get(g.id);
}});
function f(){
function i(l){
if(l==="remove"){
this.each(function(n,o){
var m=h(o);
if(m){
m.remove();
}
});
}
this.find("span.mceEditor,div.mceEditor").each(function(n,o){
var m=tinyMCE.get(o.id.replace(/_parent$/,""));
if(m){
m.remove();
}
});
};
function k(n){
var m=this,l;
if(n!==e){
i.call(m);
m.each(function(p,q){
var o;
if(o=tinyMCE.get(q.id)){
o.setContent(n);
}
});
}else{
if(m.length>0){
if(l=tinyMCE.get(m[0].id)){
return l.getContent();
}
}
}
};
function h(m){
var l=null;
(m)&&(m.id)&&(c.tinymce)&&(l=tinyMCE.get(m.id));
return l;
};
function g(l){
return !!((l)&&(l.length)&&(c.tinymce)&&(l.is(":tinymce")));
};
var j={};
b.each(["text","html","val"],function(n,l){
var o=j[l]=b.fn[l],m=(l==="text");
b.fn[l]=function(s){
var p=this;
if(!g(p)){
return o.apply(p,arguments);
}
if(s!==e){
k.call(p.filter(":tinymce"),s);
o.apply(p.not(":tinymce"),arguments);
return p;
}else{
var r="";
var q=arguments;
(m?p:p.eq(0)).each(function(u,v){
var t=h(v);
r+=t?(m?t.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g,""):t.getContent()):o.apply(b(v),q);
});
return r;
}
};
});
b.each(["append","prepend"],function(n,m){
var o=j[m]=b.fn[m],l=(m==="prepend");
b.fn[m]=function(q){
var p=this;
if(!g(p)){
return o.apply(p,arguments);
}
if(q!==e){
p.filter(":tinymce").each(function(s,t){
var r=h(t);
r&&r.setContent(l?q+r.getContent():r.getContent()+q);
});
o.apply(p.not(":tinymce"),arguments);
return p;
}
};
});
b.each(["remove","replaceWith","replaceAll","empty"],function(m,l){
var n=j[l]=b.fn[l];
b.fn[l]=function(){
i.call(this,l);
return n.apply(this,arguments);
};
});
j.attr=b.fn.attr;
b.fn.attr=function(n,q,o){
var m=this;
if((!n)||(n!=="value")||(!g(m))){
return j.attr.call(m,n,q,o);
}
if(q!==e){
k.call(m.filter(":tinymce"),q);
j.attr.call(m.not(":tinymce"),n,q,o);
return m;
}else{
var p=m[0],l=h(p);
return l?l.getContent():j.attr.call(b(p),n,q,o);
}
};
};
})(jQuery);
function music_openRRMCPop(_209){
id=_209["id"][1];
var _20a="toolbar=no,location=no,directories=no,menubar=no,resizable=yes,status=yes,scrollbars=no,width=620,height=565,left=200,top=0",_20b=window.open("http://a.xnimg.cn/xnapp/music/res/blank.htm","rrMCWin",_20a);
if(_20b){
_20b.focus();
}else{
alert("你的浏览器拦截了播放器窗口,请设置!");
return false;
}
var _20c={url:"http://music.renren.com/playlist/add?from=xiaozhan"};
music_postRequest(_20c.url,_209,"rrMCWin");
};
function music_postRequest(url,_20d,_20e){
try{
var _20f=document;
var f=_20f.createElement("form");
f.action=url;
f.method="post";
for(var item in _20d){
if(_20d[item] instanceof Array){
for(var iaa=0;iaa<_20d[item].length;iaa++){
creatHiddenInput(escape(item),escape(_20d[item][iaa]),f);
}
}else{
creatHiddenInput(escape(item),escape(_20d[item]),f);
}
}
if(_20e){
f.target=_20e;
}
creatHiddenInput("redirectType","new",f);
creatHiddenInput("_rtk",XZ.get_check,f);
f.submit();
}
catch(e){
}
};
function creatHiddenInput(name,_210,f){
var _211=document;
var obj=_211.createElement("input");
obj.type="hidden";
obj.name=name;
obj.value=_210;
f.appendChild(obj);
_211.body.appendChild(f);
};
function music_playSong(ids,tj){
music_openRRMCPop({type:"song",id:[ids]});
};
var swfobject=function(){
var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){
var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;
if(typeof t.plugins!=D&&typeof t.plugins[S]==r){
ab=t.plugins[S].description;
if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){
T=true;
X=false;
ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);
ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);
ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0;
}
}else{
if(typeof O.ActiveXObject!=D){
try{
var ad=new ActiveXObject(W);
if(ad){
ab=ad.GetVariable("$version");
if(ab){
X=true;
ab=ab.split(" ")[1].split(",");
ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)];
}
}
}
catch(Z){
}
}
}
return {w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac};
}(),k=function(){
if(!M.w3){
return;
}
if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){
f();
}
if(!J){
if(typeof j.addEventListener!=D){
j.addEventListener("DOMContentLoaded",f,false);
}
if(M.ie&&M.win){
j.attachEvent(x,function(){
if(j.readyState=="complete"){
j.detachEvent(x,arguments.callee);
f();
}
});
if(O==top){
(function(){
if(J){
return;
}
try{
j.documentElement.doScroll("left");
}
catch(X){
setTimeout(arguments.callee,0);
return;
}
f();
})();
}
}
if(M.wk){
(function(){
if(J){
return;
}
if(!/loaded|complete/.test(j.readyState)){
setTimeout(arguments.callee,0);
return;
}
f();
})();
}
s(f);
}
}();
function f(){
if(J){
return;
}
try{
var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));
Z.parentNode.removeChild(Z);
}
catch(aa){
return;
}
J=true;
var X=U.length;
for(var Y=0;Y<X;Y++){
U[Y]();
}
};
function K(X){
if(J){
X();
}else{
U[U.length]=X;
}
};
function s(Y){
if(typeof O.addEventListener!=D){
O.addEventListener("load",Y,false);
}else{
if(typeof j.addEventListener!=D){
j.addEventListener("load",Y,false);
}else{
if(typeof O.attachEvent!=D){
i(O,"onload",Y);
}else{
if(typeof O.onload=="function"){
var X=O.onload;
O.onload=function(){
X();
Y();
};
}else{
O.onload=Y;
}
}
}
}
};
function h(){
if(T){
V();
}else{
H();
}
};
function V(){
var X=j.getElementsByTagName("body")[0];
var aa=C(r);
aa.setAttribute("type",q);
var Z=X.appendChild(aa);
if(Z){
var Y=0;
(function(){
if(typeof Z.GetVariable!=D){
var ab=Z.GetVariable("$version");
if(ab){
ab=ab.split(" ")[1].split(",");
M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)];
}
}else{
if(Y<10){
Y++;
setTimeout(arguments.callee,10);
return;
}
}
X.removeChild(aa);
Z=null;
H();
})();
}else{
H();
}
};
function H(){
var ag=o.length;
if(ag>0){
for(var af=0;af<ag;af++){
var Y=o[af].id;
var ab=o[af].callbackFn;
var aa={success:false,id:Y};
if(M.pv[0]>0){
var ae=c(Y);
if(ae){
if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){
w(Y,true);
if(ab){
aa.success=true;
aa.ref=z(Y);
ab(aa);
}
}else{
if(o[af].expressInstall&&A()){
var ai={};
ai.data=o[af].expressInstall;
ai.width=ae.getAttribute("width")||"0";
ai.height=ae.getAttribute("height")||"0";
if(ae.getAttribute("class")){
ai.styleclass=ae.getAttribute("class");
}
if(ae.getAttribute("align")){
ai.align=ae.getAttribute("align");
}
var ah={};
var X=ae.getElementsByTagName("param");
var ac=X.length;
for(var ad=0;ad<ac;ad++){
if(X[ad].getAttribute("name").toLowerCase()!="movie"){
ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value");
}
}
P(ai,ah,Y,ab);
}else{
p(ae);
if(ab){
ab(aa);
}
}
}
}
}else{
w(Y,true);
if(ab){
var Z=z(Y);
if(Z&&typeof Z.SetVariable!=D){
aa.success=true;
aa.ref=Z;
}
ab(aa);
}
}
}
}
};
function z(aa){
var X=null;
var Y=c(aa);
if(Y&&Y.nodeName=="OBJECT"){
if(typeof Y.SetVariable!=D){
X=Y;
}else{
var Z=Y.getElementsByTagName(r)[0];
if(Z){
X=Z;
}
}
}
return X;
};
function A(){
return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312);
};
function P(aa,ab,X,Z){
a=true;
E=Z||null;
B={success:false,id:X};
var ae=c(X);
if(ae){
if(ae.nodeName=="OBJECT"){
l=g(ae);
Q=null;
}else{
l=ae;
Q=X;
}
aa.id=R;
if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){
aa.width="310";
}
if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){
aa.height="137";
}
j.title=j.title.slice(0,47)+" - Flash Player Installation";
var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;
if(typeof ab.flashvars!=D){
ab.flashvars+="&"+ac;
}else{
ab.flashvars=ac;
}
if(M.ie&&M.win&&ae.readyState!=4){
var Y=C("div");
X+="SWFObjectNew";
Y.setAttribute("id",X);
ae.parentNode.insertBefore(Y,ae);
ae.style.display="none";
(function(){
if(ae.readyState==4){
ae.parentNode.removeChild(ae);
}else{
setTimeout(arguments.callee,10);
}
})();
}
u(aa,ab,X);
}
};
function p(Y){
if(M.ie&&M.win&&Y.readyState!=4){
var X=C("div");
Y.parentNode.insertBefore(X,Y);
X.parentNode.replaceChild(g(Y),X);
Y.style.display="none";
(function(){
if(Y.readyState==4){
Y.parentNode.removeChild(Y);
}else{
setTimeout(arguments.callee,10);
}
})();
}else{
Y.parentNode.replaceChild(g(Y),Y);
}
};
function g(ab){
var aa=C("div");
if(M.win&&M.ie){
aa.innerHTML=ab.innerHTML;
}else{
var Y=ab.getElementsByTagName(r)[0];
if(Y){
var ad=Y.childNodes;
if(ad){
var X=ad.length;
for(var Z=0;Z<X;Z++){
if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){
aa.appendChild(ad[Z].cloneNode(true));
}
}
}
}
}
return aa;
};
function u(ai,ag,Y){
var X,aa=c(Y);
if(M.wk&&M.wk<312){
return X;
}
if(aa){
if(typeof ai.id==D){
ai.id=Y;
}
if(M.ie&&M.win){
var ah="";
for(var ae in ai){
if(ai[ae]!=Object.prototype[ae]){
if(ae.toLowerCase()=="data"){
ag.movie=ai[ae];
}else{
if(ae.toLowerCase()=="styleclass"){
ah+=" class=\""+ai[ae]+"\"";
}else{
if(ae.toLowerCase()!="classid"){
ah+=" "+ae+"=\""+ai[ae]+"\"";
}
}
}
}
}
var af="";
for(var ad in ag){
if(ag[ad]!=Object.prototype[ad]){
af+="<param name=\""+ad+"\" value=\""+ag[ad]+"\" />";
}
}
aa.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+ah+">"+af+"</object>";
N[N.length]=ai.id;
X=c(ai.id);
}else{
var Z=C(r);
Z.setAttribute("type",q);
for(var ac in ai){
if(ai[ac]!=Object.prototype[ac]){
if(ac.toLowerCase()=="styleclass"){
Z.setAttribute("class",ai[ac]);
}else{
if(ac.toLowerCase()!="classid"){
Z.setAttribute(ac,ai[ac]);
}
}
}
}
for(var ab in ag){
if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){
e(Z,ab,ag[ab]);
}
}
aa.parentNode.replaceChild(Z,aa);
X=Z;
}
}
return X;
};
function e(Z,X,Y){
var aa=C("param");
aa.setAttribute("name",X);
aa.setAttribute("value",Y);
Z.appendChild(aa);
};
function y(Y){
var X=c(Y);
if(X&&X.nodeName=="OBJECT"){
if(M.ie&&M.win){
X.style.display="none";
(function(){
if(X.readyState==4){
b(Y);
}else{
setTimeout(arguments.callee,10);
}
})();
}else{
X.parentNode.removeChild(X);
}
}
};
function b(Z){
var Y=c(Z);
if(Y){
for(var X in Y){
if(typeof Y[X]=="function"){
Y[X]=null;
}
}
Y.parentNode.removeChild(Y);
}
};
function c(Z){
var X=null;
try{
X=j.getElementById(Z);
}
catch(Y){
}
return X;
};
function C(X){
return j.createElement(X);
};
function i(Z,X,Y){
Z.attachEvent(X,Y);
I[I.length]=[Z,X,Y];
};
function F(Z){
var Y=M.pv,X=Z.split(".");
X[0]=parseInt(X[0],10);
X[1]=parseInt(X[1],10)||0;
X[2]=parseInt(X[2],10)||0;
return (Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false;
};
function v(ac,Y,ad,ab){
if(M.ie&&M.mac){
return;
}
var aa=j.getElementsByTagName("head")[0];
if(!aa){
return;
}
var X=(ad&&typeof ad=="string")?ad:"screen";
if(ab){
n=null;
G=null;
}
if(!n||G!=X){
var Z=C("style");
Z.setAttribute("type","text/css");
Z.setAttribute("media",X);
n=aa.appendChild(Z);
if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){
n=j.styleSheets[j.styleSheets.length-1];
}
G=X;
}
if(M.ie&&M.win){
if(n&&typeof n.addRule==r){
n.addRule(ac,Y);
}
}else{
if(n&&typeof j.createTextNode!=D){
n.appendChild(j.createTextNode(ac+" {"+Y+"}"));
}
}
};
function w(Z,X){
if(!m){
return;
}
var Y=X?"visible":"hidden";
if(J&&c(Z)){
c(Z).style.visibility=Y;
}else{
v("#"+Z,"visibility:"+Y);
}
};
function L(Y){
var Z=/[\\\"<>\.;]/;
var X=Z.exec(Y)!=null;
return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y;
};
var d=function(){
if(M.ie&&M.win){
window.attachEvent("onunload",function(){
var ac=I.length;
for(var ab=0;ab<ac;ab++){
I[ab][0].detachEvent(I[ab][1],I[ab][2]);
}
var Z=N.length;
for(var aa=0;aa<Z;aa++){
y(N[aa]);
}
for(var Y in M){
M[Y]=null;
}
M=null;
for(var X in swfobject){
swfobject[X]=null;
}
swfobject=null;
});
}
}();
return {registerObject:function(ab,X,aa,Z){
if(M.w3&&ab&&X){
var Y={};
Y.id=ab;
Y.swfVersion=X;
Y.expressInstall=aa;
Y.callbackFn=Z;
o[o.length]=Y;
w(ab,false);
}else{
if(Z){
Z({success:false,id:ab});
}
}
},getObjectById:function(X){
if(M.w3){
return z(X);
}
},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){
var X={success:false,id:ah};
if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){
w(ah,false);
K(function(){
ae+="";
ag+="";
var aj={};
if(af&&typeof af===r){
for(var al in af){
aj[al]=af[al];
}
}
aj.data=ab;
aj.width=ae;
aj.height=ag;
var am={};
if(ad&&typeof ad===r){
for(var ak in ad){
am[ak]=ad[ak];
}
}
if(Z&&typeof Z===r){
for(var ai in Z){
if(typeof am.flashvars!=D){
am.flashvars+="&"+ai+"="+Z[ai];
}else{
am.flashvars=ai+"="+Z[ai];
}
}
}
if(F(Y)){
var an=u(aj,am,ah);
if(aj.id==ah){
w(ah,true);
}
X.success=true;
X.ref=an;
}else{
if(aa&&A()){
aj.data=aa;
P(aj,am,ah,ac);
return;
}else{
w(ah,true);
}
}
if(ac){
ac(X);
}
});
}else{
if(ac){
ac(X);
}
}
},switchOffAutoHideShow:function(){
m=false;
},ua:M,getFlashPlayerVersion:function(){
return {major:M.pv[0],minor:M.pv[1],release:M.pv[2]};
},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){
if(M.w3){
return u(Z,Y,X);
}else{
return undefined;
}
},showExpressInstall:function(Z,aa,X,Y){
if(M.w3&&A()){
P(Z,aa,X,Y);
}
},removeSWF:function(X){
if(M.w3){
y(X);
}
},createCSS:function(aa,Z,Y,X){
if(M.w3){
v(aa,Z,Y,X);
}
},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){
var Z=j.location.search||j.location.hash;
if(Z){
if(/\?/.test(Z)){
Z=Z.split("?")[1];
}
if(aa==null){
return L(Z);
}
var Y=Z.split("&");
for(var X=0;X<Y.length;X++){
if(Y[X].substring(0,Y[X].indexOf("="))==aa){
return L(Y[X].substring((Y[X].indexOf("=")+1)));
}
}
}
return "";
},expressInstallCallback:function(){
if(a){
var X=c(R);
if(X&&l){
X.parentNode.replaceChild(l,X);
if(Q){
w(Q,true);
if(M.ie&&M.win){
l.style.display="block";
}
}
if(E){
E(B);
}
}
a=false;
}
}};
}();
function RecommendSite(){
};
RecommendSite.prototype={init:function(type){
this.type=type||0;
this.box={};
this.selectCount=0;
this.currentType="all";
switch(type){
case 0:
this.getHTML("zhanHome");
break;
case 1:
this.getHTML("renrenHome");
break;
case 2:
this.renderDialog();
break;
}
},getHTML:function(_212){
var url="http://zhan.renren.com/guide/recommend?from="+_212;
var that=this;
$.get(url,function(r){
that.renderDialog(r);
});
},renderDialog:function(html){
switch(this.type){
case 0:
jQuery.showMaskLayer();
var box=document.createElement("div");
box.id="siteGuide";
box.style.zIndex=2001;
box.style.position="absolute";
box.style.top=0;
box.style.left=0;
box.style.width="100%";
document.body.appendChild(box);
this.box=box;
this.box.innerHTML=html;
break;
case 1:
return;
var box=dom.wrap(document.createElement("div"));
var _213=dom.getElement("#site-menu-nav img[src*=http://a.xnimg.cn/imgpro/icons/zhan.png]");
var top=XN.Element.realTop(_213);
box.id="siteGuide";
box.style.zIndex=2001;
box.style.position="absolute";
box.style.top=0;
box.style.left=0;
box.style.width="100%";
document.body.appendChild(box);
this.box=box;
this.box.innerHTML=html;
dom.getElement("#siteDialogWrap").style.margin=(top-198)+"px 0 0 134px";
XN.DOM.disable();
break;
case 2:
this.box=$(".guide-box");
break;
}
this.refreshCount();
this.bindEvents();
},bindEvents:function(){
var eBox=this.box;
var _214=eBox.find(".dialog-close");
var _215=eBox.find(".guide-btn");
var _216=eBox.find(".guide-list li");
var _217=eBox.find(".check-all #all");
var _218=eBox.find(".guide-tags li");
var that=this;
if(_214){
_214.bind("click",function(e){
e.preventDefault();
that.close();
},false);
}
_215.bind("click",function(e){
e.preventDefault();
that.favHandler();
},false);
for(var i=0,len=_216.length;i<len;i++){
$(_216[i]).bind("click",function(i){
return function(e){
var _219=e.target;
if(_219.nodeName.toLowerCase()==="a"){
return;
}
$(this).toggleClass("select");
that.resetCheckAll();
that.refreshCount();
};
}(i),false);
}
_217.bind("change",function(e){
for(var i=0,len=_216.length;i<len;i++){
if(_216[i].getAttribute("data-type")!=that.currentType&&that.currentType!="all"){
continue;
}
if(this.checked){
jQuery(_216[i]).addClass("select");
}else{
jQuery(_216[i]).removeClass("select");
}
}
that.refreshCount();
},false);
_217.bind("click",function(e){
this.blur();
},false);
_218.bind("click",function(e){
var type=this.getAttribute("data-type");
var _21a=$(this).find("a");
e.preventDefault();
if(_21a.hasClass("select")){
return;
}
for(var i=0,len=_216.length;i<len;i++){
if(_216[i].getAttribute("data-type")===type||type==="all"){
$(_216[i]).show();
}else{
$(_216[i]).hide();
}
}
for(var i=0,len=_218.length;i<len;i++){
$(_218[i]).find("a").removeClass("select");
}
that.currentType=type;
that.reflowSiteBox();
that.resetCheckAll();
_21a.addClass("select");
},false);
},guideTip:function(){
var _21b=$(".header");
var eTip=$("<div></div>");
var _21c=jQuery("#main_nav>li:last");
eTip.addClass("search-tip");
eTip.innerHTML="探索发现 <a href=\"#\" class=\"closed\">关闭</a>";
if(_21c){
eTip[0].style.right=(_21c.width()-14)+"px";
}
_21b.append(eTip);
eTip.find("a.closed").bind("click",function(e){
e.preventDefault();
eTip.hide();
},false);
},reflowSiteBox:function(){
var type=this.currentType;
var _21d=this.box.find(".guide-list-box");
var _21e=type=="all"?".guide-list li":".guide-list li[data-type=\""+type+"\"]";
var _21f=_21d.find(_21e);
var _220=_21f.length;
var _221="兴趣广泛就会不断有新发现哦，全部关注成功了！";
var _222=_21d.find(".no-content-tip");
if(_220<=5){
if(!_21d.hasClass("less-guide-list")){
_21d.addClass("less-guide-list");
}
if(_220==0){
_221=type=="all"?_221:"你已经关注了所有该话题的优秀小站，试试看下其它类型的小站吧！";
_222.html(_221);
_222.show();
}else{
_222.hide();
}
}else{
_222.hide();
_21d.removeClass("less-guide-list");
}
},favHandler:function(){
var eBox=this.box;
var _223=eBox.find(".guide-list");
var _224=_223.find("li[class*=select]");
var _225=eBox.find(".success-tip");
var from=this.type===1?"renrenHome":"zhanHome";
var data="from="+from;
var that=this;
if(_224.length==0){
return;
}
for(var i=0,len=_224.length;i<len;i++){
data+="&site="+_224[i].getAttribute("data-key");
}
$.post("http://zhan.renren.com/guide/recommend/follow",data,function(res){
for(var i=0,len=_224.length;i<len;i++){
$(_224[i]).remove();
}
_225.show();
that.refreshCount();
that.reflowSiteBox();
setTimeout(function(){
_225.hide();
},5000);
if(_223.find("li").length==0){
setTimeout(function(){
that.close();
},3000);
}
});
},close:function(){
this.box.hide();
switch(this.type){
case 0:
jQuery.hideMaskLayer();
this.guideTip();
break;
case 1:
XN.DOM.enable();
break;
case 2:
break;
}
},refreshCount:function(){
var eBox=this.box;
var _226=eBox.find(".checked-tip strong");
var _227=eBox.find(".guide-list li[class*=select]");
this.selectCount=_227.length;
_226.html(this.selectCount);
},resetCheckAll:function(){
var eBox=this.box;
var type=this.currentType;
var _228=type=="all"?".guide-list li":".guide-list li[data-type=\""+type+"\"]";
var _229=eBox.find(_228);
var _22a=eBox.find(".check-all #all");
var _22b=0;
var _22c=_229.length;
if(_22c==0){
_22a.removeAttr("checked");
return;
}
for(var i=0,len=_229.length;i<len;i++){
if(!$(_229[i]).hasClass("select")){
break;
}else{
_22b++;
}
}
if(_22b<_22c){
_22a[0].checked=false;
}else{
_22a[0].checked=true;
}
}};
window.siteRecommend=new RecommendSite();
SmallSite.app.nameCard=function(){
this.card=document.createElement("div");
this.times=500;
jQuery(this.card).addClass("smallsite-card");
this.init();
};
SmallSite.app.nameCard.prototype={nameCards:{},init:function(){
this._showCard();
},clearCard:function(){
var eDom=jQuery("body").find(".smallsite-card");
eDom.removeClass("namecardshow");
eDom.empty().remove();
},_showNameCard:function(card,_22d,dom,e){
var card=jQuery(card);
vTop=_22d.top,vLeft=_22d.left;
height=115,winWidth=jQuery(window).width(),cardWidth=233,domWidth=jQuery(dom).width();
if(vLeft+cardWidth>winWidth){
vLeft=vLeft-cardWidth+domWidth;
card.addClass("right");
}else{
if(card.hasClass("right")){
card.removeClass("right");
}
}
card.addClass("namecardshow");
jQuery(card).css({top:vTop-height,left:vLeft});
this.readyTime=setTimeout(function(){
if(jQuery(".smallsite-card").length>0){
card.show();
}else{
if(jQuery(e.target).parents("#rogue-suggest").size()>0){
var _22e=jQuery("#rogue-suggest"),tops=vTop-_22e.offset().top;
jQuery(card).css({top:tops-height,left:vLeft});
jQuery("#rogue-suggest").append(card);
}else{
jQuery("body").append(card);
}
}
},this.times);
},_showCard:function(){
var _22f;
var _230;
var that=this;
var sc=jQuery("body").find(".smallsite-card");
var _231="ready";
var _232=this.clearCard;
_232();
jQuery(".name-card").die().live({mouseenter:function(e){
var vTop=jQuery(this).offset().top,_233=jQuery(this).offset().left,_234=jQuery(this).attr("data-uri"),_235=_234.replace("http://zhan.renren.com/",""),_230=that.jsonUrla=_235;
if(_22f!=undefined){
clearTimeout(_22f);
}
_232();
isTouch=setTimeout(function(){
if(_231=="ready"){
_231="doing";
_232();
if(that.nameCards[_235]==undefined){
_232();
jQuery.getJSON(_234+"/card",function(data){
if(data.code==0){
var _236="<a target=\"_blank\" href=\"http://zhan.renren.com/tag?value="+data.tags[0].value+"\">";
if(!data.isOwner){
var _237=(data.isFollowed==false)?"<a href=\"javascript:;\" class=\"card-btn nc-nofollow\">关注</a>":"<a href=\"javascript:;\" class=\"card-btna nc-nofollow\">取消关注</a>";
}else{
var _237="";
}
var _238="<div class='card'><div class='card-main'><a class='user-pic' href='http://zhan.renren.com/"+data.siteUri+"'><img src='"+data.head+"'alt='"+data.title+"' /></a><div class='user-content'><h3 class='card-tit'><a href='http://zhan.renren.com/"+data.siteUri+"'>"+data.title+"</a></h3><p>"+data.desc+"</p></div></div><div class='card-footer'><div class='card-tag'>"+_236+"#"+SmallSite.util.substr(data.tags[0].value,12,true)+"</a></div>"+_237+"<span class='card-num'>"+data.followerCount+"人</span></div></div><div class='card-arrow'><img src='http://a.xnimg.cn/smallsite/images/card-arrow.png' alt='' /></div>";
jQuery(that.card).html(_238);
that.nameCards[data.siteUri]=_238;
_231="ready";
data=null;
}else{
var _239="";
_231="ready";
that.nameCards[_235]=_239;
}
});
}else{
if(_22f!=undefined){
clearTimeout(_22f);
}
jQuery(that.card).empty();
jQuery(that.card).html(that.nameCards[_235]);
_231="ready";
}
}
},that.times);
var _23a={top:vTop,left:_233};
that._showNameCard(that.card,_23a,this,e);
},mouseleave:function(){
if(isTouch!=undefined){
clearTimeout(isTouch);
}
clearTimeout(that.readyTime);
_22f=setTimeout(function(){
_232();
},that.times);
}});
sc.die().live({mouseenter:function(){
clearTimeout(_22f);
},mouseleave:function(){
_22f=setTimeout(function(){
_232();
},that.times);
}});
jQuery(".nc-nofollow").live("click",function(){
var That=this;
var CF=function(fna,mod){
jQuery(this).removeClass("nc-nofollow").html("...");
jQuery.post("http://zhan.renren.com/"+that.jsonUrla+"/"+arguments[0]+"?from=namecard",function(data){
var data=JSON.parse(data);
if(data.code==0){
if(mod=="fl"){
jQuery(That).html("关注").removeClass("card-btna").addClass("card-btn");
}else{
jQuery(That).html("取消关注").removeClass("card-btn").addClass("card-btna");
if(SmallSite.app&&SmallSite.app.followAboutPop){
_22f=setTimeout(function(){
_232();
},0);
new SmallSite.app.followAboutPop("namecardAbout",that.jsonUrla);
}
}
that.nameCards[that.jsonUrla]=jQuery(".smallsite-card").html();
jQuery(That).addClass("nc-nofollow");
}else{
jQuery.messageDialog({message:data.msg});
}
data=null;
});
};
if(jQuery(this).hasClass("card-btna")){
CF("unfollow","fl");
}else{
CF("follow","nfl");
}
});
}};
jQuery(document).ready(function(){
if(XZ.isLogin){
gg=new SmallSite.app.nameCard();
}
});
var tagCard=function(){
this.card=document.createElement("div");
this.times=500;
jQuery(this.card).addClass("smallsite-card");
this.init();
};
tagCard.prototype={nameCards:{},init:function(){
this._showCard();
},clearCard:function(){
var eDom=jQuery("body").find(".smallsite-card");
eDom.empty().remove();
},_showCard:function(){
var _23b;
var _23c;
var _23d;
var that=this;
var sc=jQuery(".smallsite-card");
var _23e="ready";
var _23f=this.clearCard;
_23f();
jQuery(".tag-card").die().live({mouseenter:function(){
var vTop=jQuery(this).offset().top,_240=jQuery(this).offset().left,_241=jQuery(this).attr("data-title");
_23d=_241;
if(_23b!=undefined){
clearTimeout(_23b);
}
_23f();
isTouch=setTimeout(function(){
if(_23e=="ready"){
_23e="doing";
_23f();
if(that.nameCards[_241]==undefined){
_23f();
jQuery.getJSON("http://zhan.renren.com/tag/tagCard?tagValue="+encodeURIComponent(_241),function(data){
if(data.code==1){
if(!data.isOwner){
var _242=(data.isFollowed==false)?"<a href=\"javascript:;\" class=\"card-btn tag-nofollow\">订阅话题</a>":"<a href=\"javascript:;\" class=\"card-btna tag-nofollow\">取消订阅</a>";
}else{
var _242="";
}
var _243="<div class='card'><div class='card-main'><a class='user-pic' href='http://zhan.renren.com/tag?value="+data.tagValue+"'><img src='"+data.head+"'alt='"+data.title+"' /></a><div class='user-content'><h3 class='card-tit'><a href='http://zhan.renren.com/tag?value="+data.tagValue+"'>"+data.title+"</a></h3><p>"+data.desc+"</p></div></div><div class='card-footer'>"+_242+"<span class='card-num'>"+data.followerCount+"人</span></div></div><div class='card-arrow'><img src='http://a.xnimg.cn/smallsite/images/card-arrow.png' alt='' /></div>";
jQuery(that.card).html(_243);
that.nameCards[data.tagValue]=_243;
_23e="ready";
data=null;
}else{
var _244="";
_23e="ready";
that.nameCards[_241]=_244;
}
});
}else{
if(_23b!=undefined){
clearTimeout(_23b);
}
jQuery(that.card).empty();
jQuery(that.card).html(that.nameCards[_241]);
_23e="ready";
}
}
},that.times);
jQuery(that.card).css({top:vTop-115,left:_240});
_23c=setTimeout(function(){
if(jQuery(".smallsite-card").length>0){
jQuery(that.card).show();
}else{
jQuery("body").append(that.card);
}
},that.times);
},mouseleave:function(){
if(isTouch!=undefined){
clearTimeout(isTouch);
}
clearTimeout(_23c);
_23b=setTimeout(function(){
_23f();
},that.times);
}});
sc.die().live({mouseenter:function(){
clearTimeout(_23b);
},mouseleave:function(){
_23b=setTimeout(function(){
_23f();
},that.times);
}});
jQuery("body").delegate(".tag-nofollow","click",function(){
var That=this;
var CF=function(fna,mod){
jQuery(this).removeClass("tag-nofollow").html("...");
jQuery.post("http://zhan.renren.com/tag/"+encodeURIComponent(_23d)+"/"+arguments[0]+"?from=namecard",function(data){
var data=JSON.parse(data);
if(data.code==0){
if(mod=="fl"){
jQuery(That).html("订阅话题").removeClass("card-btna").addClass("card-btn");
}else{
jQuery(That).html("取消订阅").removeClass("card-btn").addClass("card-btna");
if(SmallSite.app&&SmallSite.app.tagAboutPop){
_23b=setTimeout(function(){
_23f();
},0);
new SmallSite.app.tagAboutPop("tagfollow","订阅成功",_23d);
}
}
that.nameCards[_23d]=jQuery(".smallsite-card").html();
jQuery(That).addClass("tag-nofollow");
}else{
jQuery.messageDialog({message:data.msg});
}
data=null;
});
};
if(jQuery(this).hasClass("card-btna")){
CF("unfollow","fl");
}else{
CF("follow","nfl");
}
});
}};
jQuery(function(){
if(XZ.isLogin){
new tagCard();
}
});
SmallSite.app=SmallSite.app||{};
SmallSite.app.help=function(){
this.init();
};
SmallSite.app.help.prototype={init:function(){
this.eBtn=jQuery(".help-enter .enter");
if(this.eBtn.size()==0){
if(jQuery("#home-guide1").size()==0){
this.createBtn();
}
}
this.bindEvent();
},bindEvent:function(){
var that=this;
this.fuckIE6();
},createBtn:function(){
if(this.eBtn.size()>0){
return;
}
this.eBtn=jQuery(["<div class=\"help-enter\">","<a href=\"http://zhan.renren.com/help\"  class=\"enter\" title=\"帮助\">帮助</a>","</div>"].join(""));
jQuery(document.body).append(this.eBtn);
},fuckIE6:function(){
var that=this;
if(jQuery.browser.msie&&jQuery.browser.version==6){
jQuery(window).scroll(function(){
that.eBtn.show();
if(jQuery.browser.msie&&jQuery.browser.version==6){
setTimeout(function(){
that.eBtn.css("top",jQuery(window).scrollTop()+screen.height-400);
},30);
}
});
}
}};
jQuery(function(){
new SmallSite.app.help();
});
jQuery(function(){
var $=jQuery;
var _245="告诉我你的梦想";
var _246=$("#tagSearchForm");
var _247=$("#tag-key");
var tag=_246.find("input[name=value]");
_247.attr("data-not-use-placeholder",true).placeholder(_245).limitLength(20);
_247.bind("keydown",function(e){
ev=e||window.event;
if(ev.keyCode==13){
if(_248&&_248()){
_246.submit();
}
}
});
function _248(){
var val=$.trim(_247.val());
if(val==""||val==_245){
jQuery.messageDialog({message:"您还没有告诉人人您的梦想"});
return false;
}
if(!/^[A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d]{1,}$/.test(val)){
jQuery.messageDialog({message:"您输入的格式不正确,必须是字母数字汉字！"});
return false;
}
if(SmallSite.util.getLength(val)>20){
tag.val(SmallSite.util.substr(val,20));
}else{
tag.val(val);
}
return true;
};
(function($){
SmallSite.app.searchBox=function(_249){
this.init(_249);
};
SmallSite.app.searchBox.prototype={defaultSetting:{resultDom:"#search_infoBox",activeDom:"#search_box",page:false,pageNum:10,results:{}},init:function(_24a){
$.extend(this.defaultSetting,_24a);
if($(this.defaultSetting.activeDom).size()==0){
return;
}
this._addSearchBox();
this._bindEvents();
},reflowPosition:function(dom){
var _24b=$(this.defaultSetting.activeDom);
var top=_24b.offset().top+_24b.outerHeight();
var left=_24b.offset().left;
dom.css({"position":"absolute","top":top,"left":left});
},_addSearchBox:function(){
var body=$("body");
var _24c=this.defaultSetting;
var _24d=$("<div id=\"searchInfoBox\" class=\"searchinfoboxa\"><ul></ul></div>");
$("#header").append(_24d);
if($.browser.msie&&$.browser.version==="6.0"){
var _24e=$("<iframe frameborder=\"0\" border=\"0\" marginWidth=\"0\" frameSpacing=\"0\" class=\"fuckIE6Select\"></iframe>");
$("#header").append(_24e);
this.reflowPosition(_24e);
}
this.reflowPosition(_24d);
},iframeControl:function(mode){
var dom=$(".fuckIE6Select")||"",_24f=$("#searchInfoBox")||"",_250;
if(!mode){
return;
}
if($.browser.msie&&$.browser.version==="6.0"){
if(mode=="show"){
_250=_24f.height();
dom.css("height",_250).show();
}else{
if(mode=="hide"){
dom.hide();
}
}
}
},_bindEvents:function(){
var that=this;
var _251=this.defaultSetting;
var _252=$(_251.activeDom);
var _253=$(_251.resultsBox);
_252.bind("propertychange",function(){
that.show($.trim(this.value));
}).bind("input",function(){
that.show($.trim(this.value));
}).bind("focus",function(){
});
_252.bind("keydown",function(_254){
var e=_254||window.event;
var rDom=$("#searchInfoBox");
var _255=e.charCode||e.keyCode;
var _256=rDom.find("li");
var _257=rDom.find(".active");
var _258=_257.size()>0?that.isArrayNum(_257,_256):-1;
if(rDom.css("display")=="none"){
return;
}
switch(_255){
case 38:
e.preventDefault();
if(_258>0){
_258--;
}
break;
case 40:
e.preventDefault();
if(_258<_256.length-1){
++_258;
}
break;
case 13:
e.preventDefault();
that.enterCode(e);
break;
default:
return;
break;
}
$("#tagSearchForm").bind("submit",function(e){
e.preventDefault();
});
_257.removeClass("active");
$(_256[_258]).addClass("active");
});
$(document).click(function(e){
var _259=e.target;
var _25a=$(that.defaultSetting.resultDom);
if(!($.contains(_25a[0],_259))){
that.hideResult();
}
});
$(window).bind("resize",function(){
var dom=$("#searchInfoBox")||"";
if($.browser.msie&&$.browser.version==="6.0"){
var _25b=$(".fuckIE6Select");
that.reflowPosition(_25b);
}
that.reflowPosition(dom);
});
},enterCode:function(e){
var rDom=$("#searchInfoBox");
var _25c=rDom.find(".active");
var link;
if(_25c){
link=_25c.find("a")[0];
setTimeout(function(){
link.click();
},0);
}
},hideResult:function(){
var _25d=$("#searchInfoBox");
var that=this;
_25d.removeClass("searchinfobox").addClass("searchinfoboxa");
that.iframeControl("hide");
this.closeResult=setTimeout(function(){
$(_25d).hide();
},500);
$("#tagSearchForm").unbind("submit");
},isArrayNum:function(_25e,_25f){
for(var i=_25f.length-1;i>=0;i--){
if(_25e[0]==_25f[i]){
return i;
}
}
},request:function(val){
var that=this;
var _260=this.defaultSetting;
var name=encodeURIComponent(val);
jQuery.ajax({url:"http://zhan.renren.com/search",type:"POST",dataType:"json",data:"value="+name,success:function(r){
if(r.code==0){
var html=that.getHtml(r,val);
_260.results[val]=html;
that.render(html,val);
}else{
if(r.code==-1){
alert(r.msg||"抱歉，服务器出错了~！");
}else{
if(r.code==-2){
that.hideResult();
}
}
}
},complete:function(){
},error:function(){
}});
},show:function(val){
var that=this;
var _261=this.defaultSetting;
var _262=$("#searchInfoBox");
if(this.timer){
clearTimeout(this.timer);
this.timer=null;
}
this.timer=setTimeout(function(){
if(val==""||val=="告诉我你的梦想"){
that.hideResult();
that.keyword=val;
return;
}
if(val!=that.keyword){
if(_261.results[val]){
that.render(_261.results[val]);
}else{
that.request(val);
}
}
that.keyword=val;
},200);
},getHtml:function(r,val){
var html="";
var site=r.site?r.site:{};
var tag=r.tag?r.tag:{};
for(var i=0;i<tag.length;i++){
var _263=this.placeText(tag[i][0],val);
html+="<li class=\"clearfix\">\t\t\t\t\t\t\t\t<a target=\"_blank\" href=\"http://zhan.renren.com/tag?value="+tag[i][0]+"\"></a>\t\t\t\t\t\t\t\t<div class=\"tagname\">"+_263+"</div>\t\t\t\t\t\t\t\t<span class=\"sub_num\">"+tag[i][1]+"人订阅</span>\t\t\t\t\t\t\t</li>";
}
for(var i=0;i<site.length;i++){
var _264=this.placeText(site[i].name,val);
html+="<li class=\"clearfix\">\t\t\t\t\t\t\t\t<a target=\"_blank\" href=\"http://zhan.renren.com/"+site[i].url+"\"></a>\t\t\t\t\t\t\t\t<div class=\"site_img\">\t\t\t\t\t\t\t\t\t<img src=\"http://hdn.xnimg.cn/photos/"+site[i].head+"\" onload=\"SmallSite.autoResizeImg(this,37);\" />\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<span class=\"site_infos\">\t\t\t\t\t\t\t\t\t<div class=\"clearfix site_name\">"+_264+"</div>\t\t\t\t\t\t\t\t\t<em class=\"atten\">"+site[i].attenNum+"人关注</em>\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t</li>";
}
return html;
},placeText:function(text,val){
if(text.indexOf(val)!=-1){
return text.replace(val,"<em class=\"keywords\">"+val+"</em>");
}
return text;
},render:function(html){
var _265=$("#searchInfoBox");
var that=this;
_265.show();
$(this.defaultSetting.resultDom).html(html);
if(this.closeResult){
clearTimeout(this.closeResult);
}
setTimeout(function(){
if(_265.hasClass("searchinfoboxa")){
_265.removeClass("searchinfoboxa").addClass("searchinfobox");
that.iframeControl("show");
}
},200);
},changePages:function(_266){
var that=this;
var html=$(this.defautSetting.changePage);
this.totalPage=Math.ceil(_266/10);
var next="<a id='nextpage' href='javascript:;'>下一页</a>";
var pre="<a id='prepage' href='javascript:;'>上一页</a>";
var sp="<em>|</em>";
if(_266<10){
html.html("");
}else{
if(this.curpage===0){
html.html(next);
}else{
if(this.curpage===this.totalPage-1){
html.html(pre);
}else{
html.html(pre+sp+next);
}
}
}
$("#nextpage").click(function(){
that.curpage=that.curpage+1;
that.show(that.song.names,"accurate");
});
$("#prepage").click(function(){
that.curpage=that.curpage-1;
that.show(that.song.names,"accurate");
});
}};
window.smallsiteSearchBoxFn=new SmallSite.app.searchBox({resultDom:"#searchInfoBox ul",activeDom:"input.search",page:false,pageNum:10});
})(jQuery);
});
SmallSite.app=SmallSite.app||{};
SmallSite.app.followAboutPop=function(from,_267,_268){
this.from=from;
this.siteUrl=_267;
this.count=2;
if(_268){
this.count=_268;
}
this.init();
};
SmallSite.app.followAboutPop.prototype={init:function(){
var that=this;
this.getSites(function(r){
that.render(r);
});
},bindEvents:function(){
var that=this;
var body=that.dia.getBody();
body.find(".followabout").mouseenter(function(){
if(that.timer){
clearTimeout(that.timer);
}
});
body.find(".site-btn a").bind("click",function(){
var _269=jQuery(this).attr("data-uri");
if(typeof _269==="undefined"){
_269=CURSITE.url;
}
that.followAction(jQuery(this),_269);
});
},render:function(r){
var that=this;
that.dia=jQuery.popDialog({width:572,noPadding:true,modal:false,message:that.getHtml(r)});
var body=that.dia.getBody();
this.siteBox=body.find(".site-list");
this.bindEvents();
},getHtml:function(data){
return ["<div class=\"followabout followsitepop\"><form>","<div class=\"layer-content\">","<div class=\"success-tip\"><span>关注成功</span></div>","<div class=\"about-sites\"><h4>猜你还喜欢这些小站：<a href=\"http://zhan.renren.com/suggest?from=followsite\"      class=\"more-sites\" target=\"_blank\">查看更多</a></h4><ul  class=\"site-list\">"+this.getListHtml(data)+"</ul></div>","</div></form>","</div>"].join("");
},getListHtml:function(r){
var html="";
var len=r.length;
if(len>this.count){
len=this.count;
}
for(var i=0;i<len;i++){
html+=this.getOneHtml(r[i],i==len-1);
}
return html;
},getOneHtml:function(site,_26a){
return ["<li "+(_26a?"class=\"last\"":"")+">","<div class=\"site-pic-box\"><a class=\"site-pic\" href=\"http://zhan.renren.com/"+site.url+"?from=followsite\" title=\""+site.name+"\" target=\"_blank\"><img alt=\""+site.name+"\" src=\""+site.tinyHeadSource+"\" onload=\"SmallSite.autoResizeImg(this, 100, 100);\"></a>","<p class=\"site-btn\"><a  data-uri=\""+site.url+"\" href=\"javascript:;\">关注</a></p></div><div class=\"info\"><h4 class=\"title\"><a href=\"http://zhan.renren.com/"+site.url+"?from=followsite\" title=\""+site.name+"\" target=\"_blank\">"+site.name+"</a></h4><p class=\"descrip\"><a href=\"http://zhan.renren.com/"+site.url+"?from=followsite\" target=\"_blank\">"+site.description+"</a></p></div>","</li>"].join("");
},followAction:function(obj,_26b){
if(obj.data("requesting")==true){
return;
}
obj.data("requesting",true);
jQuery.ajax({url:"http://zhan.renren.com/"+_26b+"/follow?"+"from="+this.from,type:"post",dataType:"json",success:function(_26c){
if(_26c.code==0){
obj.parent().html("已关注");
}else{
alert("服务器繁忙，请稍后再试！");
}
},complete:function(){
obj.data("requesting",false);
}});
},getSites:function(cb){
var _26d="";
if(this.siteUrl){
_26d="&siteUrl="+this.siteUrl;
}
jQuery.ajax({url:"http://zhan.renren.com/zhan/suggest/get?count="+this.count+_26d,type:"get",dataType:"json",success:function(_26e){
cb(_26e);
}});
}};
SmallSite.app.tagAboutPop=function(from,_26f,tag){
this.from=from;
this.successTip="订阅成功";
this.tag=tag;
if(_26f){
this.successTip=_26f;
}
this.init();
};
SmallSite.app.tagAboutPop.prototype={init:function(){
var that=this;
this.getSites(function(r){
that.render(r);
});
},bindEvents:function(){
var that=this;
var body=that.dia.getBody();
body.find(".layer-close").click(function(){
that.dia.hide();
});
body.find(".followabout").mouseenter(function(){
if(that.timer){
clearTimeout(that.timer);
}
});
body.find(".site-btn a").bind("click",function(){
var _270=jQuery(this).attr("data-uri");
if(typeof _270==="undefined"){
_270=CURSITE.url;
}
that.followAction(jQuery(this),_270);
});
},render:function(r){
var that=this;
that.dia=jQuery.popDialog({width:571,noPadding:true,modal:false,message:that.getHtml(r)});
var body=that.dia.getBody();
this.siteBox=body.find(".site-list");
this.bindEvents();
},getHtml:function(data){
return ["<div class=\"followabout\"><form>","<div class=\"layer-content\">","<div class=\"success-tip\"><span>"+this.successTip+"</span></div>","<div class=\"about-sites\"><h4>"+("<span class=\"tag-title\">关注 <a href=\"http://zhan.renren.com/tag?value="+this.tag+"\" target=\"_blank\">"+this.tag+"</a> 的顶尖小站</span>")+"<a href=\"http://zhan.renren.com/suggest?from=followabout\"      class=\"more-sites\" target=\"_blank\">查看更多</a></h4><ul  class=\"site-list\">"+this.getListHtml(data)+"</ul></div>","</div></form>","</div>"].join("");
},getListHtml:function(r){
var html="";
for(var i=0;i<r.length;i++){
html+=this.getOneHtml(r[i]);
}
return html;
},getOneHtml:function(site){
return ["<li>","<div class=\"site-pic-box\"><a class=\"site-pic\" href=\"http://zhan.renren.com/"+site.url+"?from=followabout\" title=\""+site.name+"\" target=\"_blank\"><img alt=\""+site.name+"\" src=\""+site.tinyHeadSource+"\"></a>","<p class=\"site-btn\"><a  data-uri=\""+site.url+"\" href=\"javascript:;\">关注</a></p></div><p class=\"title\"><a href=\"http://zhan.renren.com/"+site.url+"?from=followabout\" title=\""+site.name+"\" target=\"_blank\">"+site.name+"</a></p>","</li>"].join("");
},followAction:function(obj,_271){
if(obj.data("requesting")==true){
return;
}
obj.data("requesting",true);
jQuery.ajax({url:"http://zhan.renren.com/"+_271+"/follow?"+"from="+this.from,type:"post",dataType:"json",success:function(_272){
if(_272.code==0){
obj.parent().html("已关注");
}else{
alert("服务器繁忙，请稍后再试！");
}
},complete:function(){
obj.data("requesting",false);
}});
},getSites:function(cb){
jQuery.ajax({url:"http://zhan.renren.com/zhan/suggest/getByTag?count=5&tagValue="+encodeURIComponent(this.tag),type:"get",dataType:"json",success:function(_273){
if(_273.code==0){
if(_273.sites.length==0){
jQuery.messageDialog({width:200,message:"<div class=\"dia-message-box\"><span>订阅成功 ！</span></div>"});
return;
}else{
cb(_273.sites);
}
}
}});
}};
SmallSite.app.shareAboutPop=function(from){
this.from=from;
this.init();
};
SmallSite.app.shareAboutPop.prototype={init:function(){
var that=this;
this.getSites(function(r){
that.render(r);
});
},render:function(r){
var that=this;
that.dia=jQuery.messageDialog({width:266,noPadding:true,modal:false,message:that.getHtml(r),time:4000});
},getHtml:function(data){
return ["<div class=\"share-dialog-guide\">","<div class=\"layer-content\">","<div class=\"success-tip\"><span>分享成功！</span></div>","<div class=\"about-sites\"><h4>猜你也会喜欢<a href=\"http://zhan.renren.com/suggest?from=followabout\"      class=\"more-sites\" target=\"_blank\">查看更多</a></h4><ul  class=\"site-list\">"+this.getListHtml(data)+"</ul></div>","</div>","</div>"].join("");
},getListHtml:function(r){
var html="";
for(var i=0;i<r.length;i++){
html+=this.getOneHtml(r[i]);
}
return html;
},getOneHtml:function(site){
return ["<li>","<div class=\"site-pic-box\"><a class=\"site-pic\" href=\"http://zhan.renren.com/"+site.url+"?from=followabout\" title=\""+site.name+"\" target=\"_blank\"><img alt=\""+site.name+"\" src=\""+site.tinyHeadSource+"\"></a>","</li>"].join("");
},getSites:function(cb){
jQuery.ajax({url:"http://zhan.renren.com/zhan/suggest/get?count=4",type:"get",dataType:"json",success:function(_274){
cb(_274);
}});
}};
SmallSite.app=SmallSite.app||{};
SmallSite.app.feedPageScroll=function(){
this.init();
};
SmallSite.app.feedPageScroll.prototype={init:function(){
this.isIE6=jQuery.browser.msie&&jQuery.browser.version==6;
this.time=1000;
this.step=200;
this.wrap=jQuery(document.body);
this.pageBox=jQuery(".feed-scroll-page");
this.preBtn=jQuery(".feed-pre-btn");
this.nextBtn=jQuery(".feed-next-btn");
if(this.pageBox.size()==0){
this.createPageBox();
}
if(jQuery("#postList").length>0){
this.feedWrap="#postList";
this.isUseFeedScroll=true;
this.distance=40;
}else{
if(jQuery("#feed-container").length>0){
this.feedWrap="#feed-container";
this.isUseFeedScroll=true;
this.scrollFoldH=170;
this.headerMinus=20;
this.barHeight=70;
this.feedMarginTop=20;
this.minheaderH=5;
this.distance=this.barHeight+this.feedMarginTop+this.minheaderH-this.headerMinus;
if(!this.isIE6){
this.headerH=jQuery(".sub-header").height();
}
}else{
this.isUseFeedScroll=false;
}
}
if(this.isIE6){
this.distance=0;
}
if(this.isUseFeedScroll){
this.bindEvent();
}
},bindEvent:function(){
var that=this;
jQuery(window).scroll(function(){
if(that.isIE6){
setTimeout(function(){
that.fuckIE6();
},30);
}
that.toogle(that.getStatus());
});
this.preBtn.click(function(e){
e.preventDefault();
that.preAction();
});
this.nextBtn.click(function(e){
e.preventDefault();
that.nextAction();
});
if(this.isUseFeedScroll){
jQuery(document).keyup(function(e){
var _275=e.target.tagName.toLowerCase();
if(_275=="input"||_275=="textarea"){
e.stopPropagation();
return;
}
if(e.keyCode==75){
that.preAction();
}else{
if(e.keyCode==74){
that.nextAction();
}
}
});
}
},getStatus:function(){
var _276=0;
var _277=jQuery.scrollAt(this.feedWrap+">article",this.step);
if(_277[0]=="top"||jQuery(_277[0]).is(this.feedWrap+">article:first-child")){
_276=0;
}else{
if(_277[0]=="bottom"||jQuery(_277[0]).is(this.feedWrap+">article:last-child")){
_276=1;
if(this.feedWrap=="#postList"){
_276=10;
}
}else{
_276=2;
}
}
return _276;
},toogle:function(_278){
if(_278==0){
this.preBtn.css("visibility","hidden");
this.nextBtn.css("visibility","visible");
}else{
if(_278==1){
this.preBtn.css("visibility","visible");
this.nextBtn.css("visibility","visible");
}else{
if(_278==10){
this.preBtn.css("visibility","visible");
this.nextBtn.css("visibility","hidden");
}else{
this.preBtn.css("visibility","visible");
this.nextBtn.css("visibility","visible");
}
}
}
},createPageBox:function(){
if(this.pageBox.size()>0){
return;
}
this.pageBox=jQuery("<div class=\"feed-scroll-page show\">\t\t\t\t\t\t\t\t<a href=\"javascript:;\" style=\"visibility:hidden\" class=\"feed-pre-btn\" title=\"上一篇\" alt=\"上一篇\">上一篇</a>\t\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"feed-next-btn\" title=\"下一篇\" alt=\"下一篇\">下一篇</a>\t\t\t\t\t\t    </div>");
this.wrap.append(this.pageBox);
this.pageBox=jQuery(".feed-scroll-page");
this.preBtn=jQuery(".feed-pre-btn");
this.nextBtn=jQuery(".feed-next-btn");
},fuckIE6:function(){
this.pageBox.css("top",jQuery(window).scrollTop()+screen.height-662);
if(jQuery("#rogue-suggest").length!==0){
jQuery("#rogue-suggest").css("top",jQuery(window).scrollTop()+screen.height-662+81).show();
this.pageBox.css("top",jQuery(window).scrollTop()+screen.height-642);
}
},preAction:function(){
var _279=jQuery.scrollAt(this.feedWrap+">article",this.step);
var top=0;
if(_279.length==0){
return;
}
if(_279[0]=="top"){
this.toogle(1);
}else{
if(_279[0]=="bottom"){
jQuery("html, body").animate({scrollTop:jQuery(this.feedWrap+">article:last").offset().top-this.distance},this.time);
}else{
if(jQuery(_279[0]).is(this.feedWrap+">article:first-child")){
return;
}
var pre=jQuery(_279[0]).prevAll(":first");
if(pre.length>0){
top=pre.offset().top-this.distance;
}else{
top=0;
}
if(!this.isIE6&&this.feedWrap=="#feed-container"&&top<this.scrollFoldH){
top=top-this.headerH+this.minheaderH;
top=top-this.headerMinus;
}
jQuery("html, body").animate({scrollTop:top},this.time);
}
}
},nextAction:function(){
var _27a=jQuery.scrollAt(this.feedWrap+">article",this.step);
var feed=_27a[0];
if(_27a.length==0){
return;
}
if(feed=="bottom"){
this.toogle(0);
}else{
if(feed=="top"){
feed=jQuery(this.feedWrap+">article:first");
var top=feed.offset().top;
jQuery("html, body").animate({scrollTop:top-this.distance},this.time);
}else{
if(feed.nextAll(":first").length==0){
return;
}
var top=jQuery(_27a[0]).nextAll(":first").offset().top-this.distance;
if(!this.isIE6&&this.feedWrap=="#feed-container"&&top<this.scrollFoldH){
top=top-this.headerH+this.minheaderH;
}
jQuery("html, body").animate({scrollTop:top},this.time);
}
}
}};
jQuery(function(){
if(CURSITE.isTerm==false||typeof CURSITE.isTerm=="undefined"){
if(CURSITE.location!=="friends"){
var _27b=new SmallSite.app.feedPageScroll();
}
}
});
function LoadADScript(url,_27c,_27d){
this.dw=document.write;
this.url=url;
this.containerObj=(typeof _27c=="string"?document.getElementById(_27c):_27c);
this.callback=_27d||function(){
};
};
LoadADScript.prototype={startLoad:function(){
var _27e=document.createElement("script"),_27f=this;
if(_27e.readyState){
_27e.onreadystatechange=function(){
if(_27e.readyState=="loaded"||_27e.readyState=="complete"){
_27e.onreadystatechange=null;
_27f.finished();
}
};
}else{
_27e.onload=function(){
_27f.finished();
};
}
document.write=function(ad){
var html=_27f.containerObj.innerHTML;
_27f.containerObj.innerHTML=html+ad;
};
_27e.src=_27f.url;
_27e.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(_27e);
},finished:function(){
document.write=this.dw;
this.callback.apply();
}};
jQuery(function(){
var href=window.location.href;
var _280=null;
var _281=function(){
var url="http://ebp.renren.com/ebpn/show?t="+new Date().getTime()+"&r=http://static.jebe.renren.com/u/100000090001";
jQuery.getScript(url,function(){
function _282(){
jQuery(".ad-xiaozhan-hide").hide();
jQuery(".ad-xiaozhan").fadeIn();
};
function _283(){
jQuery(".ad-xiaozhan").hide();
jQuery(".ad-xiaozhan-hide").fadeIn();
};
var divs=new Array();
for(var i=0;i<jebe_json.list.length;i+=1){
if(jebe_json.list[i].ads.length>0){
var ad=jebe_json.list[i].ads[0].ad_param;
var _284=eval("("+jebe_json.list[i].ads[0].widget+")");
var div=document.createElement("div");
div.setAttribute("id","xiaozhanad");
var _285=jebe_json.list[i].ads[0].widget_id;
if(_285==275){
div.innerHTML="<a class=\"ad-xiaozhan-hide\"><img src=\"http://a.xnimg.cn/smallsite/images/zhan_tips.png\" /></a><div class=\"ad-xiaozhan ad-taobao\"><a style=\"display:none!important\" id=\"tanx-a-mm_26632128_2431797_14672348\"></a><script id=\"tanx-s-mm_26632128_2431797_14672348\" src=\"http://p.tanx.com/ex?i=mm_26632128_2431797_14672348\" charset=\"gbk\"></script></div>";
}else{
if(_285==295){
div.innerHTML="<a class=\"ad-xiaozhan-hide\"><img src=\"http://a.xnimg.cn/smallsite/images/zhan_tips.png\" /></a><div class=\"ad-xiaozhanyi ad-yichuanmei\"><iframe style=\"width:350px;height:320px;\"  src=\"http://jebe.xnimg.cn/u/yicm.html\" frameborder=\"0\"></iframe>";
}else{
div.innerHTML="<a class=\"ad-xiaozhan-hide\"><img src=\"http://a.xnimg.cn/smallsite/images/zhan_tips.png\" /></a>\t\t\t\t\t\t\t\t<div class=\"ad-xiaozhan\">\t\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t<p class=\"ad-title\"><a href=\""+ad.click_url+"\" target=\"_blank\">"+_284.title+"</a><a class=\"ad-close\" href=\"#nogo\"></a></p>\t\t\t\t\t\t\t\t<p><a target=\"_blank\" href=\""+ad.click_url+"\"><img src=\""+ad.media_uri+decodeURIComponent(_284.mediaUri)+"\" /></a></p></div>\t\t\t\t\t\t\t\t</div>";
}
}
divs.push(div);
}
}
if(divs.length>0){
jQuery("#xiaozhanad").remove();
jQuery("body").append(divs[0]);
_282();
_280=setTimeout(function(){
_283();
},5000);
jQuery(".ad-close").bind("click",function(){
clearTimeout(_280);
_283();
});
var _286=false;
jQuery(".ad-xiaozhan-hide").hover(function(){
_282();
jQuery(".ad-xiaozhan").hover(null,function(e){
_283();
});
},null);
}
});
};
_281();
if(!jQuery.browser.msie){
jQuery(".site-tag li").bind("click",function(){
clearTimeout(_280);
_280=setTimeout(function(){
_281();
},2000);
});
}
});

