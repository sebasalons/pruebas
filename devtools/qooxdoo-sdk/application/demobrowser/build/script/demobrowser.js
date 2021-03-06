(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"demobrowser.Application","qx.theme":"demobrowser.Theme","qx.version":"1.3"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.contrib":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"demobrowser":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"1.3"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["__out__:demobrowser.js"]],
  urisBefore : [],
  packageHashes : {"0":"c19c09ce2d63"},
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function()
  {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")
    {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  loadScript(list.shift(), function() {
    if (isWebkit) {
      // force asynchronous load
      // Safari fails with an "maximum recursion depth exceeded" error if it is
      // called sync.      
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.packageHashes[l.parts[l.boot][0]];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.uris[l.parts[l.boot]]), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['c19c09ce2d63']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}},"resources":{"demobrowser/backend/remote_table.php":"demobrowser","demobrowser/css/sourceview.css":"demobrowser","demobrowser/css/style.css":"demobrowser","demobrowser/demo/background/gradient-pressed.png":[250,18,"png","demobrowser"],"demobrowser/demo/background/gradient.png":[250,34,"png","demobrowser"],"demobrowser/demo/background/gradients.svg":"demobrowser","demobrowser/demo/flash/FlashVersion.swf":"demobrowser","demobrowser/demo/flash/TestFlash.mxml":"demobrowser","demobrowser/demo/flash/TestFlash.swf":"demobrowser","demobrowser/demo/flash/build.xml":"demobrowser","demobrowser/demo/flash/fo_tester.fla":"demobrowser","demobrowser/demo/flash/fo_tester.swf":"demobrowser","demobrowser/demo/html/ModalWindow.html":"demobrowser","demobrowser/demo/icons/feed-reader.png":[48,48,"png","demobrowser"],"demobrowser/demo/icons/format-indent-less.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-indent-more.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-center.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-fill.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-left.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-right.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format.png":[96,16,"png","demobrowser"],"demobrowser/demo/icons/graphics-viewer-document.png":[48,48,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-fill-color.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-list-ordered.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-list-unordered.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-text-color.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/insert-horizontal-rule.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/insert-table.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/insert-text.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/qooxdoo_logo.png":[136,41,"png","demobrowser"],"demobrowser/demo/icons/imicons/christian_schmidt.png":[52,64,"png","demobrowser"],"demobrowser/demo/icons/imicons/fabian_jakobs.png":[70,70,"png","demobrowser"],"demobrowser/demo/icons/imicons/jonathan_weiss.png":[218,218,"png","demobrowser"],"demobrowser/demo/icons/imicons/martin_wittemann.png":[52,52,"png","demobrowser"],"demobrowser/demo/icons/imicons/readme.txt":"demobrowser","demobrowser/demo/icons/imicons/status_away.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/status_busy.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/status_offline.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/status_online.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/user_add.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/user_delete.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/multimedia-player-disabled.png":[128,128,"png","demobrowser"],"demobrowser/demo/icons/multimedia-player.png":[128,128,"png","demobrowser"],"demobrowser/demo/mobile/qooxdoo-logo.png":[200,59,"png","demobrowser"],"demobrowser/demo/test/alphaPNG.png":[20,20,"png","demobrowser"],"demobrowser/demo/test/combined/icons22.png":[22,176,"png","demobrowser"],"demobrowser/demo/test/combined/thumbs.png":[218,65,"png","demobrowser"],"demobrowser/demo/test/demobrowser_thumb.png":[113,65,"png","demobrowser","demobrowser/demo/test/combined/thumbs.png",-105,0],"demobrowser/demo/test/feedreader_thumb.png":[105,65,"png","demobrowser","demobrowser/demo/test/combined/thumbs.png",0,0],"demobrowser/demo/test/logo.gif":[136,41,"gif","demobrowser"],"demobrowser/demo/theme/tag-hor-c.png":[6,12,"png","demobrowser"],"demobrowser/demo/theme/tag-hor-l.png":[6,12,"png","demobrowser"],"demobrowser/demo/theme/tag-hor-r.png":[6,12,"png","demobrowser"],"demobrowser/demo/theme/tag-hor.png":[18,12,"png","demobrowser"],"demobrowser/demo/theme/tag-vert-b.png":[12,6,"png","demobrowser"],"demobrowser/demo/theme/tag-vert-c.png":[12,6,"png","demobrowser"],"demobrowser/demo/theme/tag-vert-t.png":[12,6,"png","demobrowser"],"demobrowser/demo/theme/tag-vert.png":[12,18,"png","demobrowser"],"demobrowser/demo/ui/FsmMiceMaze.flw":"demobrowser","demobrowser/demo/ui/FsmMiceMaze.png":[962,600,"png","demobrowser"],"demobrowser/demo/ui/mouse-east.gif":[50,50,"gif","demobrowser"],"demobrowser/demo/ui/mouse-north.gif":[50,50,"gif","demobrowser"],"demobrowser/demo/ui/mouse-south.gif":[50,50,"gif","demobrowser"],"demobrowser/demo/ui/mouse-west.gif":[50,50,"gif","demobrowser"],"demobrowser/welcome/feedreader.png":[250,185,"png","demobrowser"],"demobrowser/welcome/playground.png":[250,185,"png","demobrowser"],"demobrowser/welcome/portal.png":[250,185,"png","demobrowser"],"demobrowser/welcome/showcase.png":[250,185,"png","demobrowser"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox-undetermined-disabled.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/group-item.png":[110,20,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-find.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/actions/application-exit.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-clear.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-redo.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-next.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-previous.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-start.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-stop.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-web-browser.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-spreadsheet.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-color-chooser.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-log-viewer.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/executable.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-44],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-22],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"],"qx/static/blank.html":"qx"},"translations":{"C":{}}};
(function(){var m="toString",k=".",j="default",h="Object",g='"',f="Array",e="()",d="String",c="Function",b=".prototype",L="function",K="Boolean",J="Error",I="constructor",H="warn",G="hasOwnProperty",F="string",E="toLocaleString",D="RegExp",C='\", "',t="info",u="BROKEN_IE",r="isPrototypeOf",s="Date",p="",q="qx.Bootstrap",n="]",o="Class",v="error",w="[Class ",y="valueOf",x="Number",A="count",z="debug",B="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return w+this.classname+n;
},createNamespace:function(name,M){var O=name.split(k);
var parent=window;
var N=O[0];

for(var i=0,P=O.length-1;i<P;i++,N=O[i]){if(!parent[N]){parent=parent[N]={};
}else{parent=parent[N];
}}parent[N]=M;
return N;
},setDisplayName:function(Q,R,name){Q.displayName=R+k+name+e;
},setDisplayNames:function(S,T){for(var name in S){var U=S[name];

if(U instanceof Function){U.displayName=T+k+name+e;
}}},define:function(name,V){if(!V){var V={statics:{}};
}var bb;
var Y=null;
qx.Bootstrap.setDisplayNames(V.statics,name);

if(V.members||V.extend){qx.Bootstrap.setDisplayNames(V.members,name+b);
bb=V.construct||new Function;

if(V.extend){this.extendClass(bb,bb,V.extend,name,ba);
}var W=V.statics||{};
for(var i=0,bc=qx.Bootstrap.getKeys(W),l=bc.length;i<l;i++){var bd=bc[i];
bb[bd]=W[bd];
}Y=bb.prototype;
var X=V.members||{};
for(var i=0,bc=qx.Bootstrap.getKeys(X),l=bc.length;i<l;i++){var bd=bc[i];
Y[bd]=X[bd];
}}else{bb=V.statics||{};
}var ba=this.createNamespace(name,bb);
bb.name=bb.classname=name;
bb.basename=ba;
bb.$$type=o;
if(!bb.hasOwnProperty(m)){bb.toString=this.genericToString;
}if(V.defer){V.defer(bb,Y);
}qx.Bootstrap.$$registry[name]=V.statics;
return bb;
}};
qx.Bootstrap.define(q,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(be,bf,bg,name,bh){var bk=bg.prototype;
var bj=new Function;
bj.prototype=bk;
var bi=new bj;
be.prototype=bi;
bi.name=bi.classname=name;
bi.basename=bh;
bf.base=be.superclass=bg;
bf.self=be.constructor=bi.constructor=be;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(bl){return bl.__count__;
},"default":function(bm){var length=0;

for(var bn in bm){length++;
}return length;
}})[(({}).__count__==0)?A:j],objectMergeWith:function(bo,bp,bq){if(bq===undefined){bq=true;
}
for(var br in bp){if(bq||bo[br]===undefined){bo[br]=bp[br];
}}return bo;
},__a:[r,G,E,m,y,I],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bs){var bt=[];
var bv=Object.prototype.hasOwnProperty;

for(var bw in bs){if(bv.call(bs,bw)){bt.push(bw);
}}var bu=qx.Bootstrap.__a;

for(var i=0,a=bu,l=a.length;i<l;i++){if(bv.call(bs,a[i])){bt.push(a[i]);
}}return bt;
},"default":function(bx){var by=[];
var bz=Object.prototype.hasOwnProperty;

for(var bA in bx){if(bz.call(bx,bA)){by.push(bA);
}}return by;
}})[typeof (Object.keys)==
L?B:
(function(){for(var bB in {toString:1}){return bB;
}})()!==m?u:j],getKeysAsString:function(bC){var bD=qx.Bootstrap.getKeys(bC);

if(bD.length==0){return p;
}return g+bD.join(C)+g;
},__b:{"[object String]":d,"[object Array]":f,"[object Object]":h,"[object RegExp]":D,"[object Number]":x,"[object Boolean]":K,"[object Date]":s,"[object Function]":c,"[object Error]":J},bind:function(bE,self,bF){var bG=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var bH=Array.prototype.slice.call(arguments,0,arguments.length);
return bE.apply(self,bG.concat(bH));
};
},firstUp:function(bI){return bI.charAt(0).toUpperCase()+bI.substr(1);
},firstLow:function(bJ){return bJ.charAt(0).toLowerCase()+bJ.substr(1);
},getClass:function(bK){var bL=Object.prototype.toString.call(bK);
return (qx.Bootstrap.__b[bL]||bL.slice(8,-1));
},isString:function(bM){return (bM!==null&&(typeof bM===F||qx.Bootstrap.getClass(bM)==d||bM instanceof String||(!!bM&&!!bM.$$isString)));
},isArray:function(bN){return (bN!==null&&(bN instanceof Array||(bN&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(bN.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bN)==f||(!!bN&&!!bN.$$isArray)));
},isObject:function(bO){return (bO!==undefined&&bO!==null&&qx.Bootstrap.getClass(bO)==h);
},isFunction:function(bP){return qx.Bootstrap.getClass(bP)==c;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bQ,name){while(bQ){if(bQ.$$properties&&bQ.$$properties[name]){return bQ.$$properties[name];
}bQ=bQ.superclass;
}return null;
},hasProperty:function(bR,name){return !!qx.Bootstrap.getPropertyDefinition(bR,name);
},getEventType:function(bS,name){var bS=bS.constructor;

while(bS.superclass){if(bS.$$events&&bS.$$events[name]!==undefined){return bS.$$events[name];
}bS=bS.superclass;
}return null;
},supportsEvent:function(bT,name){return !!qx.Bootstrap.getEventType(bT,name);
},getByInterface:function(bU,bV){var bW,i,l;

while(bU){if(bU.$$implements){bW=bU.$$flatImplements;

for(i=0,l=bW.length;i<l;i++){if(bW[i]===bV){return bU;
}}}bU=bU.superclass;
}return null;
},hasInterface:function(bX,bY){return !!qx.Bootstrap.getByInterface(bX,bY);
},getMixins:function(ca){var cb=[];

while(ca){if(ca.$$includes){cb.push.apply(cb,ca.$$flatIncludes);
}ca=ca.superclass;
}return cb;
},$$logs:[],debug:function(cc,cd){qx.Bootstrap.$$logs.push([z,arguments]);
},info:function(ce,cf){qx.Bootstrap.$$logs.push([t,arguments]);
},warn:function(cg,ch){qx.Bootstrap.$$logs.push([H,arguments]);
},error:function(ci,cj){qx.Bootstrap.$$logs.push([v,arguments]);
},trace:function(ck){}}});
})();
(function(){var h="qx.allowUrlSettings",g="&",f="qx.core.Setting",e="qx.allowUrlVariants",d="qx.propertyDebugLevel",c="qxsetting",b=":",a=".";
qx.Bootstrap.define(f,{statics:{__c:{},define:function(j,k){if(k===undefined){throw new Error('Default value of setting "'+j+'" must be defined!');
}
if(!this.__c[j]){this.__c[j]={};
}else if(this.__c[j].defaultValue!==undefined){throw new Error('Setting "'+j+'" is already defined!');
}this.__c[j].defaultValue=k;
},get:function(l){var m=this.__c[l];

if(m===undefined){throw new Error('Setting "'+l+'" is not defined.');
}
if(m.value!==undefined){return m.value;
}return m.defaultValue;
},set:function(n,o){if((n.split(a)).length<2){throw new Error('Malformed settings key "'+n+'". Must be following the schema "namespace.key".');
}
if(!this.__c[n]){this.__c[n]={};
}this.__c[n].value=o;
},__d:function(){if(window.qxsettings){for(var p in window.qxsettings){this.set(p,window.qxsettings[p]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(q){}this.__e();
}},__e:function(){if(this.get(h)!=true){return;
}var s=document.location.search.slice(1).split(g);

for(var i=0;i<s.length;i++){var r=s[i].split(b);

if(r.length!=3||r[0]!=c){continue;
}this.set(r[1],decodeURIComponent(r[2]));
}}},defer:function(t){t.define(h,false);
t.define(e,false);
t.define(d,0);
t.__d();
}});
})();
(function(){var s="gecko",r="1.9.0.0",q=".",p="[object Opera]",o="function",n="[^\\.0-9]",m="525.26",l="",k="mshtml",j="AppleWebKit/",d="unknown",i="9.6.0",g="4.0",c="Gecko",b="opera",f="webkit",e="0.0.0",h="8.0",a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__f:function(){var t=d;
var x=e;
var w=window.navigator.userAgent;
var z=false;
var v=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==p){t=b;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(w)){x=RegExp.$1+q+RegExp.$2;

if(RegExp.$3!=l){x+=q+RegExp.$3;
}}else{v=true;
x=i;
}}else if(window.navigator.userAgent.indexOf(j)!=-1){t=f;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(w)){x=RegExp.$1;
var y=RegExp(n).exec(x);

if(y){x=x.slice(0,y.index);
}}else{v=true;
x=m;
}}else if(window.controllers&&window.navigator.product===c){t=s;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(w)){x=RegExp.$1;
}else{v=true;
x=r;
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(w)){t=k;
x=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(x<8&&/Trident\/([^\);]+)(\)|;)/.test(w)){if(RegExp.$1===g){x=h;
}}this.MSHTML=true;
}else{var u=window.qxFail;

if(u&&typeof u===o){var t=u();

if(t.NAME&&t.FULLVERSION){t=t.NAME;
this[t.toUpperCase()]=true;
x=t.FULLVERSION;
}}else{z=true;
v=true;
x=r;
t=s;
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+w+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=z;
this.UNKNOWN_VERSION=v;
this.NAME=t;
this.FULLVERSION=x;
this.VERSION=parseFloat(x);
}},defer:function(A){A.__f();
}});
})();
(function(){var k="on",j="off",h="qx.debug",g="default",f="|",e="object",d="qxvariant",c="qx.client",b="qx.aspects",a=":",y="mshtml",x="qx.mobile.emulatetouch",w="qx.dynlocale",u=".",t="qx.core.Variant",s="gecko",r="opera",q="&",p="qx.mobile.nativescroll",o="$",m="qx.allowUrlVariants",n="webkit";
qx.Bootstrap.define(t,{statics:{__g:{},__h:{},compilerIsSet:function(){return true;
},define:function(z,A,B){if(qx.core.Variant.compilerIsSet(h,k)){if(!this.__k(A)){throw new Error('Allowed values of variant "'+z+'" must be defined!');
}
if(B===undefined){throw new Error('Default value of variant "'+z+'" must be defined!');
}}
if(!this.__g[z]){this.__g[z]={};
}else if(qx.core.Variant.compilerIsSet(h,k)){if(this.__g[z].defaultValue!==undefined){throw new Error('Variant "'+z+'" is already defined!');
}}this.__g[z].allowedValues=A;
this.__g[z].defaultValue=B;
},get:function(C){var D=this.__g[C];

if(qx.core.Variant.compilerIsSet(h,k)){if(D===undefined){throw new Error('Variant "'+C+'" is not defined.');
}}
if(D.value!==undefined){return D.value;
}return D.defaultValue;
},__i:function(){if(window.qxvariants){for(var E in qxvariants){if(qx.core.Variant.compilerIsSet(h,k)){if((E.split(u)).length<2){throw new Error('Malformed settings key "'+E+'". Must be following the schema "namespace.key".');
}}
if(!this.__g[E]){this.__g[E]={};
}this.__g[E].value=qxvariants[E];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(F){}this.__j(this.__g);
}},__j:function(){if(qx.core.Setting.get(m)!=true){return;
}var G=document.location.search.slice(1).split(q);

for(var i=0;i<G.length;i++){var H=G[i].split(a);

if(H.length!=3||H[0]!=d){continue;
}var I=H[1];

if(!this.__g[I]){this.__g[I]={};
}this.__g[I].value=decodeURIComponent(H[2]);
}},select:function(J,K){if(qx.core.Variant.compilerIsSet(h,k)){if(!this.__l(this.__g[J])){throw new Error("Variant \""+J+"\" is not defined");
}
if(!this.__l(K)){throw new Error("the second parameter must be a map!");
}}
for(var L in K){if(this.isSet(J,L)){return K[L];
}}
if(K[g]!==undefined){return K[g];
}
if(qx.core.Variant.compilerIsSet(h,k)){throw new Error('No match for variant "'+J+'" in variants ['+qx.Bootstrap.getKeysAsString(K)+'] found, and no default ("default") given');
}},isSet:function(M,N){var O=M+o+N;

if(this.__h[O]!==undefined){return this.__h[O];
}var Q=false;
if(N.indexOf(f)<0){Q=this.get(M)===N;
}else{var P=N.split(f);

for(var i=0,l=P.length;i<l;i++){if(this.get(M)===P[i]){Q=true;
break;
}}}this.__h[O]=Q;
return Q;
},__k:function(v){return typeof v===e&&v!==null&&v instanceof Array;
},__l:function(v){return typeof v===e&&v!==null&&!(v instanceof Array);
},__m:function(R,S){for(var i=0,l=R.length;i<l;i++){if(R[i]==S){return true;
}}return false;
}},defer:function(T){T.define(c,[s,y,r,n],qx.bom.client.Engine.NAME);
T.define(h,[k,j],k);
T.define(b,[k,j],j);
T.define(w,[k,j],k);
T.define(x,[k,j],j);
T.define(p,[k,j],j);
T.__i();
}});
})();
(function(){var r="object",q="qx.debug",p="function",o="Mixin",n="qx.Mixin",m=".prototype",k="constructor",j="[Mixin ",h="]",g="members",d="destruct",f="events",e="on",c="properties",b="statics";
qx.Bootstrap.define(n,{statics:{define:function(name,s){if(s){if(s.include&&!(s.include instanceof Array)){s.include=[s.include];
}if(qx.core.Variant.isSet(q,e)){this.__o(name,s);
}var u=s.statics?s.statics:{};
qx.Bootstrap.setDisplayNames(u,name);

for(var t in u){if(u[t] instanceof Function){u[t].$$mixin=u;
}}if(s.construct){u.$$constructor=s.construct;
qx.Bootstrap.setDisplayName(s.construct,name,k);
}
if(s.include){u.$$includes=s.include;
}
if(s.properties){u.$$properties=s.properties;
}
if(s.members){u.$$members=s.members;
qx.Bootstrap.setDisplayNames(s.members,name+m);
}
for(var t in u.$$members){if(u.$$members[t] instanceof Function){u.$$members[t].$$mixin=u;
}}
if(s.events){u.$$events=s.events;
}
if(s.destruct){u.$$destructor=s.destruct;
qx.Bootstrap.setDisplayName(s.destruct,name,d);
}}else{var u={};
}u.$$type=o;
u.name=name;
u.toString=this.genericToString;
u.basename=qx.Bootstrap.createNamespace(name,u);
this.$$registry[name]=u;
return u;
},checkCompatibility:function(v){var y=this.flatten(v);
var z=y.length;

if(z<2){return true;
}var C={};
var B={};
var A={};
var x;

for(var i=0;i<z;i++){x=y[i];

for(var w in x.events){if(A[w]){throw new Error('Conflict between mixin "'+x.name+'" and "'+A[w]+'" in member "'+w+'"!');
}A[w]=x.name;
}
for(var w in x.properties){if(C[w]){throw new Error('Conflict between mixin "'+x.name+'" and "'+C[w]+'" in property "'+w+'"!');
}C[w]=x.name;
}
for(var w in x.members){if(B[w]){throw new Error('Conflict between mixin "'+x.name+'" and "'+B[w]+'" in member "'+w+'"!');
}B[w]=x.name;
}}return true;
},isCompatible:function(D,E){var F=qx.Bootstrap.getMixins(E);
F.push(D);
return qx.Mixin.checkCompatibility(F);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(G){if(!G){return [];
}var H=G.concat();

for(var i=0,l=G.length;i<l;i++){if(G[i].$$includes){H.push.apply(H,this.flatten(G[i].$$includes));
}}return H;
},genericToString:function(){return j+this.name+h;
},$$registry:{},__n:qx.core.Variant.select(q,{"on":{"include":r,"statics":r,"members":r,"properties":r,"events":r,"destruct":p,"construct":p},"default":null}),__o:qx.core.Variant.select(q,{"on":function(name,I){var L=this.__n;

for(var K in I){if(!L[K]){throw new Error('The configuration key "'+K+'" in mixin "'+name+'" is not allowed!');
}
if(I[K]==null){throw new Error('Invalid key "'+K+'" in mixin "'+name+'"! The value is undefined/null!');
}
if(L[K]!==null&&typeof I[K]!==L[K]){throw new Error('Invalid type of key "'+K+'" in mixin "'+name+'"! The type of the key must be "'+L[K]+'"!');
}}var J=[b,g,c,f];

for(var i=0,l=J.length;i<l;i++){var K=J[i];

if(I[K]!==undefined&&(I[K] instanceof Array||I[K] instanceof RegExp||I[K] instanceof Date||I[K].classname!==undefined)){throw new Error('Invalid key "'+K+'" in mixin "'+name+'"! The value needs to be a map!');
}}if(I.include){for(var i=0,a=I.include,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is undefined/null!");
}
if(a[i].$$type!==o){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is not a mixin!");
}}this.checkCompatibility(I.include);
}},"default":function(){}})}});
})();
(function(){var u="qx.debug",t="object",s="Interface",r="on",q="string",p="function",o="Boolean",n="qx.Interface",m="events",k="toggle",d="properties",j="]",g="members",c="number",b="boolean",f="is",e="[Interface ",h="statics";
qx.Bootstrap.define(n,{statics:{define:function(name,v){if(v){if(v.extend&&!(v.extend instanceof Array)){v.extend=[v.extend];
}if(qx.core.Variant.isSet(u,r)){this.__v(name,v);
}var w=v.statics?v.statics:{};
if(v.extend){w.$$extends=v.extend;
}
if(v.properties){w.$$properties=v.properties;
}
if(v.members){w.$$members=v.members;
}
if(v.events){w.$$events=v.events;
}}else{var w={};
}w.$$type=s;
w.name=name;
w.toString=this.genericToString;
w.basename=qx.Bootstrap.createNamespace(name,w);
qx.Interface.$$registry[name]=w;
return w;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(x){if(!x){return [];
}var y=x.concat();

for(var i=0,l=x.length;i<l;i++){if(x[i].$$extends){y.push.apply(y,this.flatten(x[i].$$extends));
}}return y;
},__p:function(z,A,B,C){var G=B.$$members;

if(G){for(var F in G){if(qx.Bootstrap.isFunction(G[F])){var E=this.__q(A,F);
var D=E||qx.Bootstrap.isFunction(z[F]);

if(!D){throw new Error('Implementation of method "'+F+'" is missing in class "'+A.classname+'" required by interface "'+B.name+'"');
}var H=C===true&&!E&&!qx.Bootstrap.hasInterface(A,B);

if(H){z[F]=this.__t(B,z[F],F,G[F]);
}}else{if(typeof z[F]===undefined){if(typeof z[F]!==p){throw new Error('Implementation of member "'+F+'" is missing in class "'+A.classname+'" required by interface "'+B.name+'"');
}}}}}},__q:function(I,J){var N=J.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!N){return false;
}var K=qx.Bootstrap.firstLow(N[2]);
var L=qx.Bootstrap.getPropertyDefinition(I,K);

if(!L){return false;
}var M=N[0]==f||N[0]==k;

if(M){return qx.Bootstrap.getPropertyDefinition(I,K).check==o;
}return true;
},__r:function(O,P){if(P.$$properties){for(var Q in P.$$properties){if(!qx.Bootstrap.getPropertyDefinition(O,Q)){throw new Error('The property "'+Q+'" is not supported by Class "'+O.classname+'"!');
}}}},__s:function(R,S){if(S.$$events){for(var T in S.$$events){if(!qx.Bootstrap.supportsEvent(R,T)){throw new Error('The event "'+T+'" is not supported by Class "'+R.classname+'"!');
}}}},assertObject:function(U,V){var X=U.constructor;
this.__p(U,X,V,false);
this.__r(X,V);
this.__s(X,V);
var W=V.$$extends;

if(W){for(var i=0,l=W.length;i<l;i++){this.assertObject(U,W[i]);
}}},assert:function(Y,ba,bb){this.__p(Y.prototype,Y,ba,bb);
this.__r(Y,ba);
this.__s(Y,ba);
var bc=ba.$$extends;

if(bc){for(var i=0,l=bc.length;i<l;i++){this.assert(Y,bc[i],bb);
}}},genericToString:function(){return e+this.name+j;
},$$registry:{},__t:qx.core.Variant.select(u,{"on":function(bd,be,bf,bg){function bh(){bg.apply(this,arguments);
return be.apply(this,arguments);
}be.wrapper=bh;
return bh;
},"default":function(){}}),__u:qx.core.Variant.select(u,{"on":{"extend":t,"statics":t,"members":t,"properties":t,"events":t},"default":null}),__v:qx.core.Variant.select(u,{"on":function(name,bi){if(qx.core.Variant.isSet(u,r)){var bl=this.__u;

for(var bk in bi){if(bl[bk]===undefined){throw new Error('The configuration key "'+bk+'" in class "'+name+'" is not allowed!');
}
if(bi[bk]==null){throw new Error("Invalid key '"+bk+"' in interface '"+name+"'! The value is undefined/null!");
}
if(bl[bk]!==null&&typeof bi[bk]!==bl[bk]){throw new Error('Invalid type of key "'+bk+'" in interface "'+name+'"! The type of the key must be "'+bl[bk]+'"!');
}}var bj=[h,g,d,m];

for(var i=0,l=bj.length;i<l;i++){var bk=bj[i];

if(bi[bk]!==undefined&&(bi[bk] instanceof Array||bi[bk] instanceof RegExp||bi[bk] instanceof Date||bi[bk].classname!==undefined)){throw new Error('Invalid key "'+bk+'" in interface "'+name+'"! The value needs to be a map!');
}}if(bi.extend){for(var i=0,a=bi.extend,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is undefined/null!");
}
if(a[i].$$type!==s){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is not an interface!");
}}}if(bi.statics){for(var bk in bi.statics){if(bk.toUpperCase()!==bk){throw new Error('Invalid key "'+bk+'" in interface "'+name+'"! Static constants must be all uppercase.');
}
switch(typeof bi.statics[bk]){case b:case q:case c:break;
default:throw new Error('Invalid key "'+bk+'" in interface "'+name+'"! Static constants must be all of a primitive type.');
}}}}},"default":function(){}})}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__w:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__w;
var k;

for(var i=0;i<l.length;i++){k=l[i];

if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);
}}
if(m.length===0&&h.length===0){return f;
}var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);
}var n=f.apply(this,arguments);

for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);
}return n;
};

if(g!==a){j.self=f.self;
j.base=f.base;
}f.wrapper=j;
j.original=f;
return j;
},addAdvice:function(o,p,q,name){this.__w.push({fcn:o,pos:p===c?-1:1,type:q,name:name});
}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==a)?g:f],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;
}else if(j<0){j=Math.max(0,this.length+j);
}
for(var i=j;i<this.length;i++){if(this[i]===h){return i;
}}return -1;
}}[Array.prototype.indexOf?f:g],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;
}else if(m<0){m=Math.max(0,this.length+m);
}
for(var i=m;i>=0;i--){if(this[i]===k){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?f:g],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;

for(var i=0;i<l;i++){var p=this[i];

if(p!==undefined){n.call(o||window,p,i,this);
}}}}[Array.prototype.forEach?f:g],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];
var l=this.length;

for(var i=0;i<l;i++){var t=this[i];

if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);
}}}return s;
}}[Array.prototype.filter?f:g],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];
var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){w[i]=u.call(v||window,x,i,this);
}}return w;
}}[Array.prototype.map?f:g],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){if(y.call(z||window,A,i,this)){return true;
}}}return false;
}}[Array.prototype.some?f:g],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;
}}}return true;
}}[Array.prototype.every?f:g],stringQuote:{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
}}[String.prototype.quote?f:g]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var n=';',m='return this.',k="boolean",j="string",h='!==undefined)',g='else if(this.',f='if(this.',e='else ',d=' of an instance of ',c=' is not (yet) ready!");',bk="init",bj='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bi='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bh=" of class ",bg='qx.core.Assert.assertInstance(value, Date, msg) || true',bf='value !== null && value.nodeType !== undefined',be='var inherit=prop.$$inherit;',bd='value !== null && value.nodeType === 9 && value.documentElement',bc='return init;',bb='value !== null && value.$$type === "Mixin"',u='qx.core.Assert.assertMap(value, msg) || true',v='var init=this.',s='return value;',t='qx.core.Assert.assertNumber(value, msg) || true',q='qx.core.Assert.assertPositiveInteger(value, msg) || true',r="': ",o="Error in property ",p="qx.debug",y='if(init==qx.core.Property.$$inherit)init=null;',z='qx.core.Assert.assertInteger(value, msg) || true',H="rv:1.8.1",F='value !== null && value.$$type === "Interface"',P="set",K='value !== null && value.$$type === "Theme"',W='qx.core.Assert.assertInstance(value, RegExp, msg) || true',U='value !== null && value.type !== undefined',B='value !== null && value.document',ba=" in method ",Y='qx.core.Assert.assertInstance(value, Error, msg) || true',X='throw new Error("Property ',A='qx.core.Assert.assertBoolean(value, msg) || true',D='return null;',E='qx.core.Assert.assertObject(value, msg) || true',G="setRuntime",I='value !== null && value.nodeType === 1 && value.attributes',L=" with incoming value '",R="setThemed",V='qx.core.Assert.assertString(value, msg) || true',w="inherit",x='value !== null && value.$$type === "Class"',C='qx.core.Assert.assertFunction(value, msg) || true',O='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',N='qx.core.Assert.assertArray(value, msg) || true',M='qx.core.Assert.assertPositiveNumber(value, msg) || true',T="on",S="object",J="MSIE 6.0",Q='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',b="qx.core.Property";
qx.Bootstrap.define(b,{statics:{__x:{"Boolean":A,"String":V,"Number":t,"Integer":z,"PositiveNumber":M,"PositiveInteger":q,"Error":Y,"RegExp":W,"Object":E,"Array":N,"Map":u,"Function":C,"Date":bg,"Node":bf,"Element":I,"Document":bd,"Window":B,"Event":U,"Class":x,"Mixin":bb,"Interface":F,"Theme":K,"Color":bj,"Decorator":O,"Font":bi},__y:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:w,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:j,dereference:k,inheritable:k,nullable:k,themeable:k,refine:k,init:null,apply:j,event:j,check:null,transform:j,deferredInit:k,validate:null},$$allowedGroupKeys:{name:j,group:S,mode:j,themeable:k},$$inheritable:{},__z:function(bl){var bm=this.__A(bl);

if(!bm.length){var bn=qx.lang.Function.empty;
}else{bn=this.__B(bm);
}bl.prototype.$$refreshInheritables=bn;
},__A:function(bo){var bq=[];

while(bo){var bp=bo.$$properties;

if(bp){for(var name in this.$$inheritable){if(bp[name]&&bp[name].inheritable){bq.push(name);
}}}bo=bo.superclass;
}return bq;
},__B:function(br){var bv=this.$$store.inherit;
var bu=this.$$store.init;
var bt=this.$$method.refresh;
var bs=["var parent = this.getLayoutParent();","if (!parent) return;"];

for(var i=0,l=br.length;i<l;i++){var name=br[i];
bs.push("var value = parent.",bv[name],";","if (value===undefined) value = parent.",bu[name],";","this.",bt[name],"(value);");
}return new Function(bs.join(""));
},attachRefreshInheritables:function(bw){bw.prototype.$$refreshInheritables=function(){qx.core.Property.__z(bw);
return this.$$refreshInheritables();
};
},attachMethods:function(bx,name,by){by.group?this.__C(bx,by,name):this.__D(bx,by,name);
},__C:function(bz,bA,name){var bH=qx.Bootstrap.firstUp(name);
var bG=bz.prototype;
var bI=bA.themeable===true;

if(qx.core.Variant.isSet("qx.debug","on")){if(qx.core.Setting.get("qx.propertyDebugLevel")>1){qx.Bootstrap.debug("Generating property group: "+name);
}}var bJ=[];
var bD=[];

if(bI){var bB=[];
var bF=[];
}var bE="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
bJ.push(bE);

if(bI){bB.push(bE);
}
if(bA.mode=="shorthand"){var bC="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
bJ.push(bC);

if(bI){bB.push(bC);
}}
for(var i=0,a=bA.group,l=a.length;i<l;i++){if(qx.core.Variant.isSet("qx.debug","on")){if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error("Cannot create property group '"+name+"' including non-existing property '"+a[i]+"'!");
}}bJ.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
bD.push("this.",this.$$method.reset[a[i]],"();");

if(bI){if(qx.core.Variant.isSet("qx.debug","on")){if(!this.$$method.setThemed[a[i]]){throw new Error("Cannot add the non themable property '"+a[i]+"' to the themable property group '"+name+"'");
}}bB.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
bF.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+bH;
bG[this.$$method.set[name]]=new Function(bJ.join(""));
this.$$method.reset[name]="reset"+bH;
bG[this.$$method.reset[name]]=new Function(bD.join(""));

if(bI){this.$$method.setThemed[name]="setThemed"+bH;
bG[this.$$method.setThemed[name]]=new Function(bB.join(""));
this.$$method.resetThemed[name]="resetThemed"+bH;
bG[this.$$method.resetThemed[name]]=new Function(bF.join(""));
}},__D:function(bK,bL,name){var bN=qx.Bootstrap.firstUp(name);
var bP=bK.prototype;

if(qx.core.Variant.isSet("qx.debug","on")){if(qx.core.Setting.get("qx.propertyDebugLevel")>1){qx.Bootstrap.debug("Generating property wrappers: "+name);
}}if(bL.dereference===undefined&&typeof bL.check==="string"){bL.dereference=this.__E(bL.check);
}var bO=this.$$method;
var bM=this.$$store;
bM.runtime[name]="$$runtime_"+name;
bM.user[name]="$$user_"+name;
bM.theme[name]="$$theme_"+name;
bM.init[name]="$$init_"+name;
bM.inherit[name]="$$inherit_"+name;
bM.useinit[name]="$$useinit_"+name;
bO.get[name]="get"+bN;
bP[bO.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,bK,name,"get");
};
bO.set[name]="set"+bN;
bP[bO.set[name]]=function(bQ){return qx.core.Property.executeOptimizedSetter(this,bK,name,"set",arguments);
};
bO.reset[name]="reset"+bN;
bP[bO.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bK,name,"reset");
};

if(bL.inheritable||bL.apply||bL.event||bL.deferredInit){bO.init[name]="init"+bN;
bP[bO.init[name]]=function(bR){return qx.core.Property.executeOptimizedSetter(this,bK,name,"init",arguments);
};
}
if(bL.inheritable){bO.refresh[name]="refresh"+bN;
bP[bO.refresh[name]]=function(bS){return qx.core.Property.executeOptimizedSetter(this,bK,name,"refresh",arguments);
};
}bO.setRuntime[name]="setRuntime"+bN;
bP[bO.setRuntime[name]]=function(bT){return qx.core.Property.executeOptimizedSetter(this,bK,name,"setRuntime",arguments);
};
bO.resetRuntime[name]="resetRuntime"+bN;
bP[bO.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bK,name,"resetRuntime");
};

if(bL.themeable){bO.setThemed[name]="setThemed"+bN;
bP[bO.setThemed[name]]=function(bU){return qx.core.Property.executeOptimizedSetter(this,bK,name,"setThemed",arguments);
};
bO.resetThemed[name]="resetThemed"+bN;
bP[bO.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bK,name,"resetThemed");
};
}
if(bL.check==="Boolean"){bP["toggle"+bN]=new Function("return this."+bO.set[name]+"(!this."+bO.get[name]+"())");
bP["is"+bN]=new Function("return this."+bO.get[name]+"()");
}},__E:function(bV){return !!this.__y[bV];
},__F:function(bW){return this.__y[bW]||qx.Bootstrap.classIsDefined(bW)||(qx.Interface&&qx.Interface.isDefined(bW));
},__G:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(bX,bY,ca,cb,cc){var cd=bX.constructor.classname;
var ce=o+ca+bh+cd+ba+this.$$method[cb][ca]+L+cc+r;
throw new Error(ce+(this.__G[bY]||"Unknown reason: "+bY));
},__H:function(cf,cg,name,ch,ci,cj){var ck=this.$$method[ch][name];
if(qx.core.Variant.isSet("qx.debug","on")){if(qx.core.Setting.get("qx.propertyDebugLevel")>1){qx.Bootstrap.debug("Code["+this.$$method[ch][name]+"]: "+ci.join(""));
}try{cg[ck]=new Function("value",ci.join(""));
}catch(cl){throw new Error("Malformed generated code to unwrap method: "+this.$$method[ch][name]+"\n"+ci.join(""));
}}else{cg[ck]=new Function("value",ci.join(""));
}if(qx.core.Variant.isSet("qx.aspects","on")){cg[ck]=qx.core.Aspect.wrap(cf.classname+"."+ck,cg[ck],"property");
}qx.Bootstrap.setDisplayName(cg[ck],cf.classname+".prototype",ck);
if(cj===undefined){return cf[ck]();
}else if(qx.core.Variant.isSet("qx.debug","on")){return cf[ck].apply(cf,cj);
}else{return cf[ck](cj[0]);
}},executeOptimizedGetter:function(cm,cn,name,co){var cq=cn.$$properties[name];
var cs=cn.prototype;
var cp=[];
var cr=this.$$store;
cp.push(f,cr.runtime[name],h);
cp.push(m,cr.runtime[name],n);

if(cq.inheritable){cp.push(g,cr.inherit[name],h);
cp.push(m,cr.inherit[name],n);
cp.push(e);
}cp.push(f,cr.user[name],h);
cp.push(m,cr.user[name],n);

if(cq.themeable){cp.push(g,cr.theme[name],h);
cp.push(m,cr.theme[name],n);
}
if(cq.deferredInit&&cq.init===undefined){cp.push(g,cr.init[name],h);
cp.push(m,cr.init[name],n);
}cp.push(e);

if(cq.init!==undefined){if(cq.inheritable){cp.push(v,cr.init[name],n);

if(cq.nullable){cp.push(y);
}else if(cq.init!==undefined){cp.push(m,cr.init[name],n);
}else{cp.push(Q,name,d,cn.classname,c);
}cp.push(bc);
}else{cp.push(m,cr.init[name],n);
}}else if(cq.inheritable||cq.nullable){cp.push(D);
}else{cp.push(X,name,d,cn.classname,c);
}return this.__H(cm,cs,name,co,cp);
},executeOptimizedSetter:function(ct,cu,name,cv,cw){var cB=cu.$$properties[name];
var cA=cu.prototype;
var cy=[];
var cx=cv===P||cv===R||cv===G||(cv===bk&&cB.init===undefined);
var cz=cB.apply||cB.event||cB.inheritable;
var cC=this.__I(cv,name);
this.__J(cy,cB,name,cv,cx);

if(cx){this.__K(cy,cu,cB,name);
}
if(cz){this.__L(cy,cx,cC,cv);
}
if(cB.inheritable){cy.push(be);
}
if(qx.core.Variant.isSet(p,T)){if(cx){this.__M(cy,cB,cu,name,cv);
}}
if(!cz){this.__N(cy,name,cv,cx);
}else{this.__O(cy,cB,name,cv,cx);
}
if(cB.inheritable){this.__P(cy,cB,name,cv);
}else if(cz){this.__Q(cy,cB,name,cv);
}
if(cz){this.__R(cy,cB,name);
if(cB.inheritable&&cA._getChildren){this.__S(cy,name);
}}if(cx){cy.push(s);
}return this.__H(ct,cA,name,cv,cy,cw);
},__I:function(cD,name){if(cD==="setRuntime"||cD==="resetRuntime"){var cE=this.$$store.runtime[name];
}else if(cD==="setThemed"||cD==="resetThemed"){cE=this.$$store.theme[name];
}else if(cD==="init"){cE=this.$$store.init[name];
}else{cE=this.$$store.user[name];
}return cE;
},__J:function(cF,cG,name,cH,cI){if(qx.core.Variant.isSet("qx.debug","on")){cF.push('var prop=qx.core.Property;');

if(cH==="init"){cF.push('if(this.$$initialized)prop.error(this,0,"',name,'","',cH,'",value);');
}
if(cH==="refresh"){}else if(cI){cF.push('if(arguments.length!==1)prop.error(this,1,"',name,'","',cH,'",value);');
cF.push('if(value===undefined)prop.error(this,2,"',name,'","',cH,'",value);');
}else{cF.push('if(arguments.length!==0)prop.error(this,3,"',name,'","',cH,'",value);');
}}else{if(!cG.nullable||cG.check||cG.inheritable){cF.push('var prop=qx.core.Property;');
}if(cH==="set"){cF.push('if(value===undefined)prop.error(this,2,"',name,'","',cH,'",value);');
}}},__K:function(cJ,cK,cL,name){if(cL.transform){cJ.push('value=this.',cL.transform,'(value);');
}if(cL.validate){if(typeof cL.validate==="string"){cJ.push('this.',cL.validate,'(value);');
}else if(cL.validate instanceof Function){cJ.push(cK.classname,'.$$properties.',name);
cJ.push('.validate.call(this, value);');
}}},__L:function(cM,cN,cO,cP){var cQ=(cP==="reset"||cP==="resetThemed"||cP==="resetRuntime");

if(cN){cM.push('if(this.',cO,'===value)return value;');
}else if(cQ){cM.push('if(this.',cO,'===undefined)return;');
}},__M:qx.core.Variant.select("qx.debug",{"on":function(cR,cS,cT,name,cU){if(!cS.nullable){cR.push('if(value===null)prop.error(this,4,"',name,'","',cU,'",value);');
}if(cS.check!==undefined){cR.push('var msg = "Invalid incoming value for property \''+name+'\' of class \''+cT.classname+'\'";');
if(cS.nullable){cR.push('if(value!==null)');
}if(cS.inheritable){cR.push('if(value!==inherit)');
}cR.push('if(');

if(this.__x[cS.check]!==undefined){cR.push('!(',this.__x[cS.check],')');
}else if(qx.Class.isDefined(cS.check)){cR.push('qx.core.Assert.assertInstance(value, qx.Class.getByName("',cS.check,'"), msg)');
}else if(qx.Interface&&qx.Interface.isDefined(cS.check)){cR.push('qx.core.Assert.assertInterface(value, qx.Interface.getByName("',cS.check,'"), msg)');
}else if(typeof cS.check==="function"){cR.push('!',cT.classname,'.$$properties.',name);
cR.push('.check.call(this, value)');
}else if(typeof cS.check==="string"){cR.push('!(',cS.check,')');
}else if(cS.check instanceof Array){cR.push('qx.core.Assert.assertInArray(value, ',cT.classname,'.$$properties.',name,'.check, msg)');
}else{throw new Error("Could not add check to property "+name+" of class "+cT.classname);
}cR.push(')prop.error(this,5,"',name,'","',cU,'",value);');
}},"off":undefined}),__N:function(cV,name,cW,cX){if(cW==="setRuntime"){cV.push('this.',this.$$store.runtime[name],'=value;');
}else if(cW==="resetRuntime"){cV.push('if(this.',this.$$store.runtime[name],'!==undefined)');
cV.push('delete this.',this.$$store.runtime[name],';');
}else if(cW==="set"){cV.push('this.',this.$$store.user[name],'=value;');
}else if(cW==="reset"){cV.push('if(this.',this.$$store.user[name],'!==undefined)');
cV.push('delete this.',this.$$store.user[name],';');
}else if(cW==="setThemed"){cV.push('this.',this.$$store.theme[name],'=value;');
}else if(cW==="resetThemed"){cV.push('if(this.',this.$$store.theme[name],'!==undefined)');
cV.push('delete this.',this.$$store.theme[name],';');
}else if(cW==="init"&&cX){cV.push('this.',this.$$store.init[name],'=value;');
}},__O:function(cY,da,name,db,dc){if(da.inheritable){cY.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{cY.push('var computed, old;');
}cY.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(db==="setRuntime"){cY.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(db==="resetRuntime"){cY.push('delete this.',this.$$store.runtime[name],';');
cY.push('if(this.',this.$$store.user[name],'!==undefined)');
cY.push('computed=this.',this.$$store.user[name],';');
cY.push('else if(this.',this.$$store.theme[name],'!==undefined)');
cY.push('computed=this.',this.$$store.theme[name],';');
cY.push('else if(this.',this.$$store.init[name],'!==undefined){');
cY.push('computed=this.',this.$$store.init[name],';');
cY.push('this.',this.$$store.useinit[name],'=true;');
cY.push('}');
}else{cY.push('old=computed=this.',this.$$store.runtime[name],';');
if(db==="set"){cY.push('this.',this.$$store.user[name],'=value;');
}else if(db==="reset"){cY.push('delete this.',this.$$store.user[name],';');
}else if(db==="setThemed"){cY.push('this.',this.$$store.theme[name],'=value;');
}else if(db==="resetThemed"){cY.push('delete this.',this.$$store.theme[name],';');
}else if(db==="init"&&dc){cY.push('this.',this.$$store.init[name],'=value;');
}}cY.push('}');
cY.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(db==="set"){if(!da.inheritable){cY.push('old=this.',this.$$store.user[name],';');
}cY.push('computed=this.',this.$$store.user[name],'=value;');
}else if(db==="reset"){if(!da.inheritable){cY.push('old=this.',this.$$store.user[name],';');
}cY.push('delete this.',this.$$store.user[name],';');
cY.push('if(this.',this.$$store.runtime[name],'!==undefined)');
cY.push('computed=this.',this.$$store.runtime[name],';');
cY.push('if(this.',this.$$store.theme[name],'!==undefined)');
cY.push('computed=this.',this.$$store.theme[name],';');
cY.push('else if(this.',this.$$store.init[name],'!==undefined){');
cY.push('computed=this.',this.$$store.init[name],';');
cY.push('this.',this.$$store.useinit[name],'=true;');
cY.push('}');
}else{if(db==="setRuntime"){cY.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(da.inheritable){cY.push('computed=this.',this.$$store.user[name],';');
}else{cY.push('old=computed=this.',this.$$store.user[name],';');
}if(db==="setThemed"){cY.push('this.',this.$$store.theme[name],'=value;');
}else if(db==="resetThemed"){cY.push('delete this.',this.$$store.theme[name],';');
}else if(db==="init"&&dc){cY.push('this.',this.$$store.init[name],'=value;');
}}cY.push('}');
if(da.themeable){cY.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!da.inheritable){cY.push('old=this.',this.$$store.theme[name],';');
}
if(db==="setRuntime"){cY.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(db==="set"){cY.push('computed=this.',this.$$store.user[name],'=value;');
}else if(db==="setThemed"){cY.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(db==="resetThemed"){cY.push('delete this.',this.$$store.theme[name],';');
cY.push('if(this.',this.$$store.init[name],'!==undefined){');
cY.push('computed=this.',this.$$store.init[name],';');
cY.push('this.',this.$$store.useinit[name],'=true;');
cY.push('}');
}else if(db==="init"){if(dc){cY.push('this.',this.$$store.init[name],'=value;');
}cY.push('computed=this.',this.$$store.theme[name],';');
}else if(db==="refresh"){cY.push('computed=this.',this.$$store.theme[name],';');
}cY.push('}');
}cY.push('else if(this.',this.$$store.useinit[name],'){');

if(!da.inheritable){cY.push('old=this.',this.$$store.init[name],';');
}
if(db==="init"){if(dc){cY.push('computed=this.',this.$$store.init[name],'=value;');
}else{cY.push('computed=this.',this.$$store.init[name],';');
}}else if(db==="set"||db==="setRuntime"||db==="setThemed"||db==="refresh"){cY.push('delete this.',this.$$store.useinit[name],';');

if(db==="setRuntime"){cY.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(db==="set"){cY.push('computed=this.',this.$$store.user[name],'=value;');
}else if(db==="setThemed"){cY.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(db==="refresh"){cY.push('computed=this.',this.$$store.init[name],';');
}}cY.push('}');
if(db==="set"||db==="setRuntime"||db==="setThemed"||db==="init"){cY.push('else{');

if(db==="setRuntime"){cY.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(db==="set"){cY.push('computed=this.',this.$$store.user[name],'=value;');
}else if(db==="setThemed"){cY.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(db==="init"){if(dc){cY.push('computed=this.',this.$$store.init[name],'=value;');
}else{cY.push('computed=this.',this.$$store.init[name],';');
}cY.push('this.',this.$$store.useinit[name],'=true;');
}cY.push('}');
}},__P:function(dd,de,name,df){dd.push('if(computed===undefined||computed===inherit){');

if(df==="refresh"){dd.push('computed=value;');
}else{dd.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}dd.push('if((computed===undefined||computed===inherit)&&');
dd.push('this.',this.$$store.init[name],'!==undefined&&');
dd.push('this.',this.$$store.init[name],'!==inherit){');
dd.push('computed=this.',this.$$store.init[name],';');
dd.push('this.',this.$$store.useinit[name],'=true;');
dd.push('}else{');
dd.push('delete this.',this.$$store.useinit[name],';}');
dd.push('}');
dd.push('if(old===computed)return value;');
dd.push('if(computed===inherit){');
dd.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
dd.push('}');
dd.push('else if(computed===undefined)');
dd.push('delete this.',this.$$store.inherit[name],';');
dd.push('else this.',this.$$store.inherit[name],'=computed;');
dd.push('var backup=computed;');
if(de.init!==undefined&&df!=="init"){dd.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{dd.push('if(old===undefined)old=null;');
}dd.push('if(computed===undefined||computed==inherit)computed=null;');
},__Q:function(dg,dh,name,di){if(di!=="set"&&di!=="setRuntime"&&di!=="setThemed"){dg.push('if(computed===undefined)computed=null;');
}dg.push('if(old===computed)return value;');
if(dh.init!==undefined&&di!=="init"){dg.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{dg.push('if(old===undefined)old=null;');
}},__R:function(dj,dk,name){if(dk.apply){dj.push('this.',dk.apply,'(computed, old, "',name,'");');
}if(dk.event){dj.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",dk.event,"')){","reg.fireEvent(this, '",dk.event,"', qx.event.type.Data, [computed, old]",")}");
}},__S:function(dl,name){dl.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
dl.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
dl.push('}');
}},defer:function(dm){var dp=navigator.userAgent.indexOf(J)!=-1;
var dn=navigator.userAgent.indexOf(H)!=-1;
if(dp||dn){dm.__E=dm.__F;
}}});
})();
(function(){var x="on",w="qx.debug",v="qx.aspects",u=".",t="abstract",s="_",r="static",q="[Class ",p="]",o="$$init_",f="member",n="constructor",j="singleton",d=".prototype",c="string",h="extend",g="refine",k="qx.Class",b="init",m='Assumed static class because no "extend" key was found. ',e="qx.event.type.Data";
qx.Bootstrap.define(k,{statics:{define:function(name,y){if(!y){var y={};
}if(y.include&&!(y.include instanceof Array)){y.include=[y.include];
}if(y.implement&&!(y.implement instanceof Array)){y.implement=[y.implement];
}var z=false;

if(!y.hasOwnProperty(h)&&!y.type){y.type=r;
z=true;
}if(qx.core.Variant.isSet(w,x)){try{this.__V(name,y);
}catch(C){if(z){C.message=m+C.message;
}throw C;
}}var A=this.__X(name,y.type,y.extend,y.statics,y.construct,y.destruct,y.include);
if(y.extend){if(y.properties){this.__ba(A,y.properties,true);
}if(y.members){this.__bc(A,y.members,true,true,false);
}if(y.events){this.__Y(A,y.events,true);
}if(y.include){for(var i=0,l=y.include.length;i<l;i++){this.__bg(A,y.include[i],false);
}}}if(y.settings){for(var B in y.settings){qx.core.Setting.define(B,y.settings[B]);
}}if(y.variants){for(var B in y.variants){qx.core.Variant.define(B,y.variants[B].allowedValues,y.variants[B].defaultValue);
}}if(y.implement){for(var i=0,l=y.implement.length;i<l;i++){this.__be(A,y.implement[i]);
}}
if(qx.core.Variant.isSet(w,x)){this.__W(A);
}if(y.defer){y.defer.self=A;
y.defer(A,A.prototype,{add:function(name,D){var E={};
E[name]=D;
qx.Class.__ba(A,E,true);
}});
}return A;
},undefine:function(name){delete this.$$registry[name];
var F=name.split(u);
var H=[window];

for(var i=0;i<F.length;i++){H.push(H[i][F[i]]);
}for(var i=H.length-1;i>=1;i--){var G=H[i];
var parent=H[i-1];

if(qx.Bootstrap.isFunction(G)||qx.Bootstrap.objectGetLength(G)===0){delete parent[F[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(I,J){if(qx.core.Variant.isSet(w,x)){if(!J){throw new Error("The mixin to include into class '"+I.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(J,I);
}qx.Class.__bg(I,J,false);
},patch:function(K,L){if(qx.core.Variant.isSet(w,x)){if(!L){throw new Error("The mixin to patch class '"+K.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(L,K);
}qx.Class.__bg(K,L,true);
},isSubClassOf:function(M,N){if(!M){return false;
}
if(M==N){return true;
}
if(M.prototype instanceof N){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(O){var P=[];

while(O){if(O.$$properties){P.push.apply(P,qx.Bootstrap.getKeys(O.$$properties));
}O=O.superclass;
}return P;
},getByProperty:function(Q,name){while(Q){if(Q.$$properties&&Q.$$properties[name]){return Q;
}Q=Q.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(R,S){return R.$$includes&&R.$$includes.indexOf(S)!==-1;
},getByMixin:function(T,U){var V,i,l;

while(T){if(T.$$includes){V=T.$$flatIncludes;

for(i=0,l=V.length;i<l;i++){if(V[i]===U){return T;
}}}T=T.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(W,X){return !!this.getByMixin(W,X);
},hasOwnInterface:function(Y,ba){return Y.$$implements&&Y.$$implements.indexOf(ba)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(bb){var bc=[];

while(bb){if(bb.$$implements){bc.push.apply(bc,bb.$$flatImplements);
}bb=bb.superclass;
}return bc;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(bd,be){var bf=bd.constructor;

if(this.hasInterface(bf,be)){return true;
}
try{qx.Interface.assertObject(bd,be);
return true;
}catch(bg){}
try{qx.Interface.assert(bf,be,false);
return true;
}catch(bh){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return q+this.classname+p;
},$$registry:qx.Bootstrap.$$registry,__T:qx.core.Variant.select("qx.debug",{"on":{"type":"string","extend":"function","implement":"object","include":"object","construct":"function","statics":"object","properties":"object","members":"object","settings":"object","variants":"object","events":"object","defer":"function","destruct":"function"},"default":null}),__U:qx.core.Variant.select("qx.debug",{"on":{"type":"string","statics":"object","settings":"object","variants":"object","defer":"function"},"default":null}),__V:qx.core.Variant.select("qx.debug",{"on":function(name,bi){if(bi.type&&!(bi.type==="static"||bi.type==="abstract"||bi.type==="singleton")){throw new Error('Invalid type "'+bi.type+'" definition for class "'+name+'"!');
}if(bi.type&&bi.type!=="static"&&!bi.extend){throw new Error('Invalid config in class "'+name+'"! Every non-static class has to extend at least the "qx.core.Object" class.');
}var bl=bi.type==="static"?this.__U:this.__T;

for(var bk in bi){if(!bl[bk]){throw new Error('The configuration key "'+bk+'" in class "'+name+'" is not allowed!');
}
if(bi[bk]==null){throw new Error('Invalid key "'+bk+'" in class "'+name+'"! The value is undefined/null!');
}
if(typeof bi[bk]!==bl[bk]){throw new Error('Invalid type of key "'+bk+'" in class "'+name+'"! The type of the key must be "'+bl[bk]+'"!');
}}var bj=["statics","properties","members","settings","variants","events"];

for(var i=0,l=bj.length;i<l;i++){var bk=bj[i];

if(bi[bk]!==undefined&&(bi[bk].$$hash!==undefined||!qx.Bootstrap.isObject(bi[bk]))){throw new Error('Invalid key "'+bk+'" in class "'+name+'"! The value needs to be a map!');
}}if(bi.include){if(bi.include instanceof Array){for(var i=0,a=bi.include,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Mixin"){throw new Error('The include definition in class "'+name+'" contains an invalid mixin at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid include definition in class "'+name+'"! Only mixins and arrays of mixins are allowed!');
}}if(bi.implement){if(bi.implement instanceof Array){for(var i=0,a=bi.implement,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Interface"){throw new Error('The implement definition in class "'+name+'" contains an invalid interface at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid implement definition in class "'+name+'"! Only interfaces and arrays of interfaces are allowed!');
}}if(bi.include){try{qx.Mixin.checkCompatibility(bi.include);
}catch(bm){throw new Error('Error in include definition of class "'+name+'"! '+bm.message);
}}if(bi.settings){for(var bk in bi.settings){if(bk.substr(0,bk.indexOf("."))!=name.substr(0,name.indexOf("."))){throw new Error('Forbidden setting "'+bk+'" found in "'+name+'". It is forbidden to define a default setting for an external namespace!');
}}}if(bi.variants){for(var bk in bi.variants){if(bk.substr(0,bk.indexOf("."))!=name.substr(0,name.indexOf("."))){throw new Error('Forbidden variant "'+bk+'" found in "'+name+'". It is forbidden to define a variant for an external namespace!');
}}}},"default":function(){}}),__W:qx.core.Variant.select("qx.debug",{"on":function(bn){var bp=bn.superclass;

while(bp){if(bp.$$classtype!=="abstract"){break;
}var bo=bp.$$implements;

if(bo){for(var i=0;i<bo.length;i++){qx.Interface.assert(bn,bo[i],true);
}}bp=bp.superclass;
}},"default":function(){}}),__X:function(name,bq,br,bs,bt,bu,bv){var by;

if(!br&&qx.core.Variant.isSet("qx.aspects","off")){by=bs||{};
qx.Bootstrap.setDisplayNames(by,name);
}else{var by={};

if(br){if(!bt){bt=this.__bh();
}
if(this.__bj(br,bv)){by=this.__bk(bt,name,bq);
}else{by=bt;
}if(bq==="singleton"){by.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(bt,name,"constructor");
}if(bs){qx.Bootstrap.setDisplayNames(bs,name);
var bz;

for(var i=0,a=qx.Bootstrap.getKeys(bs),l=a.length;i<l;i++){bz=a[i];
var bw=bs[bz];

if(qx.core.Variant.isSet("qx.aspects","on")){if(bw instanceof Function){bw=qx.core.Aspect.wrap(name+"."+bz,bw,"static");
}by[bz]=bw;
}else{by[bz]=bw;
}}}}var bx=qx.Bootstrap.createNamespace(name,by);
by.name=by.classname=name;
by.basename=bx;
by.$$type="Class";

if(bq){by.$$classtype=bq;
}if(!by.hasOwnProperty("toString")){by.toString=this.genericToString;
}
if(br){qx.Bootstrap.extendClass(by,bt,br,name,bx);
if(bu){if(qx.core.Variant.isSet("qx.aspects","on")){bu=qx.core.Aspect.wrap(name,bu,"destructor");
}by.$$destructor=bu;
qx.Bootstrap.setDisplayName(bu,name,"destruct");
}}this.$$registry[name]=by;
return by;
},__Y:function(bA,bB,bC){if(qx.core.Variant.isSet("qx.debug","on")){if(typeof bB!=="object"||bB instanceof Array){throw new Error(bA.classname+": the events must be defined as map!");
}
for(var bD in bB){if(typeof bB[bD]!=="string"){throw new Error(bA.classname+"/"+bD+": the event value needs to be a string with the class name of the event object which will be fired.");
}}if(bA.$$events&&bC!==true){for(var bD in bB){if(bA.$$events[bD]!==undefined&&bA.$$events[bD]!==bB[bD]){throw new Error(bA.classname+"/"+bD+": the event value/type cannot be changed from "+bA.$$events[bD]+" to "+bB[bD]);
}}}}
if(bA.$$events){for(var bD in bB){bA.$$events[bD]=bB[bD];
}}else{bA.$$events=bB;
}},__ba:function(bE,bF,bG){var bH;

if(bG===undefined){bG=false;
}var bI=bE.prototype;

for(var name in bF){bH=bF[name];
if(qx.core.Variant.isSet(w,x)){this.__bb(bE,name,bH,bG);
}bH.name=name;
if(!bH.refine){if(bE.$$properties===undefined){bE.$$properties={};
}bE.$$properties[name]=bH;
}if(bH.init!==undefined){bE.prototype[o+name]=bH.init;
}if(bH.event!==undefined){var event={};
event[bH.event]=e;
this.__Y(bE,event,bG);
}if(bH.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!bI.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(bE);
}}
if(!bH.refine){qx.core.Property.attachMethods(bE,name,bH);
}}},__bb:qx.core.Variant.select(w,{"on":function(bJ,name,bK,bL){var bN=this.hasProperty(bJ,name);

if(bN){var bM=this.getPropertyDefinition(bJ,name);

if(bK.refine&&bM.init===undefined){throw new Error("Could not refine a init value if there was previously no init value defined. Property '"+name+"' of class '"+bJ.classname+"'.");
}}
if(!bN&&bK.refine){throw new Error("Could not refine non-existent property: '"+name+"' of class: '"+bJ.classname+"'!");
}
if(bN&&!bL){throw new Error("Class "+bJ.classname+" already has a property: "+name+"!");
}
if(bN&&bL){if(!bK.refine){throw new Error('Could not refine property "'+name+'" without a "refine" flag in the property definition! This class: '+bJ.classname+', original class: '+this.getByProperty(bJ,name).classname+'.');
}
for(var bO in bK){if(bO!==b&&bO!==g){throw new Error("Class "+bJ.classname+" could not refine property: "+name+"! Key: "+bO+" could not be refined!");
}}}var bP=bK.group?qx.core.Property.$$allowedGroupKeys:qx.core.Property.$$allowedKeys;

for(var bO in bK){if(bP[bO]===undefined){throw new Error('The configuration key "'+bO+'" of property "'+name+'" in class "'+bJ.classname+'" is not allowed!');
}
if(bK[bO]===undefined){throw new Error('Invalid key "'+bO+'" of property "'+name+'" in class "'+bJ.classname+'"! The value is undefined: '+bK[bO]);
}
if(bP[bO]!==null&&typeof bK[bO]!==bP[bO]){throw new Error('Invalid type of key "'+bO+'" of property "'+name+'" in class "'+bJ.classname+'"! The type of the key must be "'+bP[bO]+'"!');
}}
if(bK.transform!=null){if(!(typeof bK.transform==c)){throw new Error('Invalid transform definition of property "'+name+'" in class "'+bJ.classname+'"! Needs to be a String.');
}}
if(bK.check!=null){if(!qx.Bootstrap.isString(bK.check)&&!qx.Bootstrap.isArray(bK.check)&&!qx.Bootstrap.isFunction(bK.check)){throw new Error('Invalid check definition of property "'+name+'" in class "'+bJ.classname+'"! Needs to be a String, Array or Function.');
}}},"default":null}),__bc:function(bQ,bR,bS,bT,bU){var bV=bQ.prototype;
var bX,bW;
qx.Bootstrap.setDisplayNames(bR,bQ.classname+d);

for(var i=0,a=qx.Bootstrap.getKeys(bR),l=a.length;i<l;i++){bX=a[i];
bW=bR[bX];

if(qx.core.Variant.isSet(w,x)){if(bV[bX]!==undefined&&bX.charAt(0)==s&&bX.charAt(1)==s){throw new Error('Overwriting private member "'+bX+'" of Class "'+bQ.classname+'" is not allowed!');
}
if(bS!==true&&bV.hasOwnProperty(bX)){throw new Error('Overwriting member "'+bX+'" of Class "'+bQ.classname+'" is not allowed!');
}}if(bT!==false&&bW instanceof Function&&bW.$$type==null){if(bU==true){bW=this.__bd(bW,bV[bX]);
}else{if(bV[bX]){bW.base=bV[bX];
}bW.self=bQ;
}
if(qx.core.Variant.isSet(v,x)){bW=qx.core.Aspect.wrap(bQ.classname+u+bX,bW,f);
}}bV[bX]=bW;
}},__bd:function(bY,ca){if(ca){return function(){var cc=bY.base;
bY.base=ca;
var cb=bY.apply(this,arguments);
bY.base=cc;
return cb;
};
}else{return bY;
}},__be:function(cd,ce){if(qx.core.Variant.isSet(w,x)){if(!cd||!ce){throw new Error("Incomplete parameters!");
}if(this.hasOwnInterface(cd,ce)){throw new Error('Interface "'+ce.name+'" is already used by Class "'+cd.classname+'!');
}if(cd.$$classtype!==t){qx.Interface.assert(cd,ce,true);
}}var cf=qx.Interface.flatten([ce]);

if(cd.$$implements){cd.$$implements.push(ce);
cd.$$flatImplements.push.apply(cd.$$flatImplements,cf);
}else{cd.$$implements=[ce];
cd.$$flatImplements=cf;
}},__bf:function(cg){var name=cg.classname;
var ch=this.__bk(cg,name,cg.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(cg),l=a.length;i<l;i++){ci=a[i];
ch[ci]=cg[ci];
}ch.prototype=cg.prototype;
var ck=cg.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(ck),l=a.length;i<l;i++){ci=a[i];
var cl=ck[ci];
if(cl&&cl.self==cg){cl.self=ch;
}}for(var ci in this.$$registry){var cj=this.$$registry[ci];

if(!cj){continue;
}
if(cj.base==cg){cj.base=ch;
}
if(cj.superclass==cg){cj.superclass=ch;
}
if(cj.$$original){if(cj.$$original.base==cg){cj.$$original.base=ch;
}
if(cj.$$original.superclass==cg){cj.$$original.superclass=ch;
}}}qx.Bootstrap.createNamespace(name,ch);
this.$$registry[name]=ch;
return ch;
},__bg:function(cm,cn,co){if(qx.core.Variant.isSet(w,x)){if(!cm||!cn){throw new Error("Incomplete parameters!");
}}
if(this.hasMixin(cm,cn)){return;
}var cr=cm.$$original;

if(cn.$$constructor&&!cr){cm=this.__bf(cm);
}var cq=qx.Mixin.flatten([cn]);
var cp;

for(var i=0,l=cq.length;i<l;i++){cp=cq[i];
if(cp.$$events){this.__Y(cm,cp.$$events,co);
}if(cp.$$properties){this.__ba(cm,cp.$$properties,co);
}if(cp.$$members){this.__bc(cm,cp.$$members,co,co,co);
}}if(cm.$$includes){cm.$$includes.push(cn);
cm.$$flatIncludes.push.apply(cm.$$flatIncludes,cq);
}else{cm.$$includes=[cn];
cm.$$flatIncludes=cq;
}},__bh:function(){function cs(){cs.base.apply(this,arguments);
}return cs;
},__bi:function(){return function(){};
},__bj:function(ct,cu){if(qx.core.Variant.isSet(w,x)){return true;
}if(ct&&ct.$$includes){var cv=ct.$$flatIncludes;

for(var i=0,l=cv.length;i<l;i++){if(cv[i].$$constructor){return true;
}}}if(cu){var cw=qx.Mixin.flatten(cu);

for(var i=0,l=cw.length;i<l;i++){if(cw[i].$$constructor){return true;
}}}return false;
},__bk:function(cx,name,cy){var cA=function(){var cD=cA;

if(qx.core.Variant.isSet(w,x)){if(!(this instanceof cD)){throw new Error("Please initialize '"+name+"' objects using the new keyword!");
}if(cy===t){if(this.classname===name){throw new Error("The class ',"+name+"' is abstract! It is not possible to instantiate it.");
}}else if(cy===j){if(!cD.$$allowconstruct){throw new Error("The class '"+name+"' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.");
}}}var cC=cD.$$original.apply(this,arguments);
if(cD.$$includes){var cB=cD.$$flatIncludes;

for(var i=0,l=cB.length;i<l;i++){if(cB[i].$$constructor){cB[i].$$constructor.apply(this,arguments);
}}}
if(qx.core.Variant.isSet(w,x)){if(this.classname===name){this.$$initialized=true;
}}return cC;
};

if(qx.core.Variant.isSet(v,x)){var cz=qx.core.Aspect.wrap(name,cA,n);
cA.$$original=cx;
cA.constructor=cz;
cA=cz;
}cA.$$original=cx;
cx.wrapper=cA;
return cA;
}},defer:function(){if(qx.core.Variant.isSet(v,x)){for(var cE in qx.Bootstrap.$$registry){var cF=qx.Bootstrap.$$registry[cE];

for(var cG in cF){if(cF[cG] instanceof Function){cF[cG]=qx.core.Aspect.wrap(cE+u+cG,cF[cG],r);
}}}}}});
})();
(function(){var k="",j="g",h="0",g='\\$1',f="%",e='-',d="qx.lang.String",c=' ',b='\n',a="undefined";
qx.Class.define(d,{statics:{camelCase:function(l){return l.replace(/\-([a-z])/g,function(m,n){return n.toUpperCase();
});
},hyphenate:function(o){return o.replace(/[A-Z]/g,function(p){return (e+p.charAt(0).toLowerCase());
});
},capitalize:function(q){return q.replace(/\b[a-z]/g,function(r){return r.toUpperCase();
});
},clean:function(s){return this.trim(s.replace(/\s+/g,c));
},trimLeft:function(t){return t.replace(/^\s+/,k);
},trimRight:function(u){return u.replace(/\s+$/,k);
},trim:function(v){return v.replace(/^\s+|\s+$/g,k);
},startsWith:function(w,x){return w.indexOf(x)===0;
},endsWith:function(y,z){return y.substring(y.length-z.length,y.length)===z;
},repeat:function(A,B){return A.length>0?new Array(B+1).join(A):k;
},pad:function(C,length,D){var E=length-C.length;

if(E>0){if(typeof D===a){D=h;
}return this.repeat(D,E)+C;
}else{return C;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(F,G){return F.indexOf(G)!=-1;
},format:function(H,I){var J=H;

for(var i=0;i<I.length;i++){J=J.replace(new RegExp(f+(i+1),j),I[i]+k);
}return J;
},escapeRegexpChars:function(K){return K.replace(/([.*+?^${}()|[\]\/\\])/g,g);
},toArray:function(L){return L.split(/\B|\b/g);
},stripTags:function(M){return M.replace(/<\/?[^>]+>/gi,k);
},stripScripts:function(N,O){var Q=k;
var P=N.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){Q+=arguments[1]+b;
return k;
});

if(O===true){qx.lang.Function.globalEval(Q);
}return P;
}}});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);
},members:{__bl:0,__bm:0,__bn:false,__bo:0,__bp:null,__bq:null,setMaxEntries:function(c){this.__bq=c;
this.clear();
},getMaxEntries:function(){return this.__bq;
},addEntry:function(d){this.__bp[this.__bl]=d;
this.__bl=this.__br(this.__bl,1);
var e=this.getMaxEntries();

if(this.__bm<e){this.__bm++;
}if(this.__bn&&(this.__bo<e)){this.__bo++;
}},mark:function(){this.__bn=true;
this.__bo=0;
},clearMark:function(){this.__bn=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(f,g){if(f>this.__bm){f=this.__bm;
}if(g&&this.__bn&&(f>this.__bo)){f=this.__bo;
}
if(f>0){var i=this.__br(this.__bl,-1);
var h=this.__br(i,-f+1);
var j;

if(h<=i){j=this.__bp.slice(h,i+1);
}else{j=this.__bp.slice(h,this.__bm).concat(this.__bp.slice(0,i+1));
}}else{j=[];
}return j;
},clear:function(){this.__bp=new Array(this.getMaxEntries());
this.__bm=0;
this.__bo=0;
this.__bl=0;
},__br:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);
},members:{setMaxMessages:function(c){this.setMaxEntries(c);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(d){this.addEntry(d);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(e,f){return this.getEntries(e,f);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var j=":",h="qx.client",g="anonymous",f="...",e="qx.dev.StackTrace",d="",c="\n",b="/source/class/",a=".";
qx.Class.define(e,{statics:{getStackTrace:qx.core.Variant.select(h,{"gecko":function(){try{throw new Error();
}catch(x){var r=this.getStackTraceFromError(x);
qx.lang.Array.removeAt(r,0);
var p=this.getStackTraceFromCaller(arguments);
var n=p.length>r.length?p:r;

for(var i=0;i<Math.min(p.length,r.length);i++){var o=p[i];

if(o.indexOf(g)>=0){continue;
}var v=o.split(j);

if(v.length!=2){continue;
}var t=v[0];
var m=v[1];
var l=r[i];
var w=l.split(j);
var s=w[0];
var k=w[1];

if(qx.Class.getByName(s)){var q=s;
}else{q=t;
}var u=q+j;

if(m){u+=m+j;
}u+=k;
n[i]=u;
}return n;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var y;

try{y.bar();
}catch(A){var z=this.getStackTraceFromError(A);
qx.lang.Array.removeAt(z,0);
return z;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(h,{"opera":function(B){return [];
},"default":function(C){var H=[];
var G=qx.lang.Function.getCaller(C);
var D={};

while(G){var E=qx.lang.Function.getName(G);
H.push(E);

try{G=G.caller;
}catch(I){break;
}
if(!G){break;
}var F=qx.core.ObjectRegistry.toHashCode(G);

if(D[F]){H.push(f);
break;
}D[F]=G;
}return H;
}}),getStackTraceFromError:qx.core.Variant.select(h,{"gecko":function(J){if(!J.stack){return [];
}var P=/@(.+):(\d+)$/gm;
var K;
var L=[];

while((K=P.exec(J.stack))!=null){var M=K[1];
var O=K[2];
var N=this.__bs(M);
L.push(N+j+O);
}return L;
},"webkit":function(Q){if(Q.sourceURL&&Q.line){return [this.__bs(Q.sourceURL)+j+Q.line];
}else{return [];
}},"opera":function(R){if(R.message.indexOf("Backtrace:")<0){return [];
}var T=[];
var U=qx.lang.String.trim(R.message.split("Backtrace:")[1]);
var V=U.split(c);

for(var i=0;i<V.length;i++){var S=V[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(S&&S.length>=2){var X=S[1];
var W=this.__bs(S[2]);
T.push(W+j+X);
}}return T;
},"default":function(){return [];
}}),__bs:function(Y){var bc=b;
var ba=Y.indexOf(bc);
var bb=(ba==-1)?Y:Y.substring(ba+bc.length).replace(/\//g,a).replace(/\.js$/,d);
return bb;
}}});
})();
(function(){var n="qx.debug",m="on",k="The second parameter must be an array.",j="mshtml",h="The first parameter must be an array.",g="Parameter must be an array.",f="qx.client",e="[object Array]",d="qx.lang.Array",c="qx",a="number",b="string";
qx.Class.define(d,{statics:{toArray:function(o,p){return this.cast(o,Array,p);
},cast:function(q,r,s){if(q.constructor===r){return q;
}
if(qx.Class.hasInterface(q,qx.data.IListData)){var q=q.toArray();
}var t=new r;
if(qx.core.Variant.isSet(f,j)){if(q.item){for(var i=s||0,l=q.length;i<l;i++){t.push(q[i]);
}return t;
}}if(Object.prototype.toString.call(q)===e&&s==null){t.push.apply(t,q);
}else{t.push.apply(t,Array.prototype.slice.call(q,s||0));
}return t;
},fromArguments:function(u,v){return Array.prototype.slice.call(u,v||0);
},fromCollection:function(w){if(qx.core.Variant.isSet(f,j)){if(w.item){var x=[];

for(var i=0,l=w.length;i<l;i++){x[i]=w[i];
}return x;
}}return Array.prototype.slice.call(w,0);
},fromShortHand:function(y){var A=y.length;
var z=qx.lang.Array.clone(y);
switch(A){case 1:z[1]=z[2]=z[3]=z[0];
break;
case 2:z[2]=z[0];
case 3:z[3]=z[1];
}return z;
},clone:function(B){return B.concat();
},insertAt:function(C,D,i){C.splice(i,0,D);
return C;
},insertBefore:function(E,F,G){var i=E.indexOf(G);

if(i==-1){E.push(F);
}else{E.splice(i,0,F);
}return E;
},insertAfter:function(H,I,J){var i=H.indexOf(J);

if(i==-1||i==(H.length-1)){H.push(I);
}else{H.splice(i+1,0,I);
}return H;
},removeAt:function(K,i){return K.splice(i,1)[0];
},removeAll:function(L){L.length=0;
return this;
},append:function(M,N){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(M,h);
qx.core.Assert&&qx.core.Assert.assertArray(N,k);
}Array.prototype.push.apply(M,N);
return M;
},exclude:function(O,P){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(O,h);
qx.core.Assert&&qx.core.Assert.assertArray(P,k);
}
for(var i=0,R=P.length,Q;i<R;i++){Q=O.indexOf(P[i]);

if(Q!=-1){O.splice(Q,1);
}}return O;
},remove:function(S,T){var i=S.indexOf(T);

if(i!=-1){S.splice(i,1);
return T;
}},contains:function(U,V){return U.indexOf(V)!==-1;
},equals:function(W,X){var length=W.length;

if(length!==X.length){return false;
}
for(var i=0;i<length;i++){if(W[i]!==X[i]){return false;
}}return true;
},sum:function(Y){var ba=0;

for(var i=0,l=Y.length;i<l;i++){ba+=Y[i];
}return ba;
},max:function(bb){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(bb,g);
}var i,bd=bb.length,bc=bb[0];

for(i=1;i<bd;i++){if(bb[i]>bc){bc=bb[i];
}}return bc===undefined?null:bc;
},min:function(be){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(be,g);
}var i,bg=be.length,bf=be[0];

for(i=1;i<bg;i++){if(be[i]<bf){bf=be[i];
}}return bf===undefined?null:bf;
},unique:function(bh){var br=[],bj={},bm={},bo={};
var bn,bi=0;
var bs=c+qx.lang.Date.now();
var bk=false,bq=false,bt=false;
for(var i=0,bp=bh.length;i<bp;i++){bn=bh[i];
if(bn===null){if(!bk){bk=true;
br.push(bn);
}}else if(bn===undefined){}else if(bn===false){if(!bq){bq=true;
br.push(bn);
}}else if(bn===true){if(!bt){bt=true;
br.push(bn);
}}else if(typeof bn===b){if(!bj[bn]){bj[bn]=1;
br.push(bn);
}}else if(typeof bn===a){if(!bm[bn]){bm[bn]=1;
br.push(bn);
}}else{bl=bn[bs];

if(bl==null){bl=bn[bs]=bi++;
}
if(!bo[bl]){bo[bl]=bn;
br.push(bn);
}}}for(var bl in bo){try{delete bo[bl][bs];
}catch(bu){try{bo[bl][bs]=null;
}catch(bv){throw new Error("Cannot clean-up map entry doneObjects["+bl+"]["+bs+"]");
}}}return br;
}}});
})();
(function(){var k="()",j="qx.debug",i=".",h=".prototype.",g="on",f="Invalid parameter 'func'.",e='anonymous()',d="Trying to call a bound function with a disposed object as context: ",c=" :: ",b="qx.lang.Function",a=".constructor()";
qx.Class.define(b,{statics:{getCaller:function(l){return l.caller?l.caller.callee:l.callee.caller;
},getName:function(m){if(m.displayName){return m.displayName;
}
if(m.$$original||m.wrapper||m.classname){return m.classname+a;
}
if(m.$$mixin){for(var o in m.$$mixin.$$members){if(m.$$mixin.$$members[o]==m){return m.$$mixin.name+h+o+k;
}}for(var o in m.$$mixin){if(m.$$mixin[o]==m){return m.$$mixin.name+i+o+k;
}}}
if(m.self){var p=m.self.constructor;

if(p){for(var o in p.prototype){if(p.prototype[o]==m){return p.classname+h+o+k;
}}for(var o in p){if(p[o]==m){return p.classname+i+o+k;
}}}}var n=m.toString().match(/function\s*(\w*)\s*\(.*/);

if(n&&n.length>=1&&n[1]){return n[1]+k;
}return e;
},globalEval:function(q){if(window.execScript){return window.execScript(q);
}else{return eval.call(window,q);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(r,s){if(qx.core.Variant.isSet(j,g)){qx.core.Assert&&qx.core.Assert.assertFunction(r,f);
}if(!s){return r;
}if(!(s.self||s.args||s.delay!=null||s.periodical!=null||s.attempt)){return r;
}return function(event){if(qx.core.Variant.isSet(j,g)){if(s.self instanceof qx.core.Object){qx.core.Assert&&qx.core.Assert.assertFalse(s.self.isDisposed(),d+s.self.toString()+c+qx.lang.Function.getName(r));
}}var u=qx.lang.Array.fromArguments(arguments);
if(s.args){u=s.args.concat(u);
}
if(s.delay||s.periodical){var t=qx.event.GlobalError.observeMethod(function(){return r.apply(s.self||this,u);
});

if(s.delay){return window.setTimeout(t,s.delay);
}
if(s.periodical){return window.setInterval(t,s.periodical);
}}else if(s.attempt){var v=false;

try{v=r.apply(s.self||this,u);
}catch(w){}return v;
}else{return r.apply(s.self||this,u);
}};
},bind:function(x,self,y){return this.create(x,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(z,A){return this.create(z,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(B,self,C){if(arguments.length<3){return function(event){return B.call(self||this,event||window.event);
};
}else{var D=qx.lang.Array.fromArguments(arguments,2);
return function(event){var E=[event||window.event];
E.push.apply(E,D);
B.apply(self||this,E);
};
}},attempt:function(F,self,G){return this.create(F,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(H,I,self,J){return this.create(H,{delay:I,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(K,L,self,M){return this.create(K,{periodical:L,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var k="qx.debug",j="on",h="unknown",g="node",f="error",e="...(+",d="array",c=")",b="info",a="instance",J="string",I="null",H="class",G="number",F="stringify",E="]",D="date",C="function",B="boolean",A="debug",s="map",t="undefined",q="qx.log.Logger",r="[",o="#",p="warn",m="document",n="{...(",u="text[",v="[...(",x="\n",w=")}",z=")]",y="object";
qx.Class.define(q,{statics:{__bt:A,setLevel:function(K){this.__bt=K;
},getLevel:function(){return this.__bt;
},setTreshold:function(L){this.__bw.setMaxMessages(L);
},getTreshold:function(){return this.__bw.getMaxMessages();
},__bu:{},__bv:0,register:function(M){if(M.$$id){return;
}var O=this.__bv++;
this.__bu[O]=M;
M.$$id=O;
var N=this.__bx;
var P=this.__bw.getAllLogEvents();

for(var i=0,l=P.length;i<l;i++){if(N[P[i].level]>=N[this.__bt]){M.process(P[i]);
}}},unregister:function(Q){var R=Q.$$id;

if(R==null){return;
}delete this.__bu[R];
delete Q.$$id;
},debug:function(S,T){qx.log.Logger.__by(A,arguments);
},info:function(U,V){qx.log.Logger.__by(b,arguments);
},warn:function(W,X){qx.log.Logger.__by(p,arguments);
},error:function(Y,ba){qx.log.Logger.__by(f,arguments);
},trace:function(bb){qx.log.Logger.__by(b,[bb,qx.dev.StackTrace.getStackTrace().join(x)]);
},deprecatedMethodWarning:function(bc,bd){if(qx.core.Variant.isSet(k,j)){var be=qx.lang.Function.getName(bc);
this.warn("The method '"+be+"' is deprecated: "+(bd||"Please consult the API documentation of this method for alternatives."));
this.trace();
}},deprecatedClassWarning:function(bf,bg){if(qx.core.Variant.isSet(k,j)){var bh=bf.classname||h;
this.warn("The class '"+bh+"' is deprecated: "+(bg||"Please consult the API documentation of this class for alternatives."));
this.trace();
}},deprecatedEventWarning:function(bi,event,bj){if(qx.core.Variant.isSet(k,j)){var bk=bi.self?bi.self.classname:h;
this.warn("The event '"+(event||"unknown")+"' from class '"+bk+"' is deprecated: "+(bj||"Please consult the API documentation of this class for alternatives."));
this.trace();
}},deprecatedMixinWarning:function(bl,bm){if(qx.core.Variant.isSet(k,j)){var bn=bl?bl.name:h;
this.warn("The mixin '"+bn+"' is deprecated: "+(bm||"Please consult the API documentation of this class for alternatives."));
this.trace();
}},deprecatedConstantWarning:function(bo,bp,bq){if(qx.core.Variant.isSet(k,j)){if(bo.__defineGetter__){var self=this;
var br=bo[bp];
bo.__defineGetter__(bp,function(){self.warn("The constant '"+bp+"' is deprecated: "+(bq||"Please consult the API documentation for alternatives."));
self.trace();
return br;
});
}}},deprecateMethodOverriding:function(bs,bt,bu,bv){if(qx.core.Variant.isSet(k,j)){var bw=bs.constructor;

while(bw.classname!==bt.classname){if(bw.prototype.hasOwnProperty(bu)){this.warn("The method '"+qx.lang.Function.getName(bs[bu])+"' overrides a deprecated method: "+(bv||"Please consult the API documentation for alternatives."));
this.trace();
break;
}bw=bw.superclass;
}}},clear:function(){this.__bw.clearHistory();
},__bw:new qx.log.appender.RingBuffer(50),__bx:{debug:0,info:1,warn:2,error:3},__by:function(bx,by){var bD=this.__bx;

if(bD[bx]<bD[this.__bt]){return;
}var bA=by.length<2?null:by[0];
var bC=bA?1:0;
var bz=[];

for(var i=bC,l=by.length;i<l;i++){bz.push(this.__bA(by[i],true));
}var bE=new Date;
var bF={time:bE,offset:bE-qx.Bootstrap.LOADSTART,level:bx,items:bz,win:window};
if(bA){if(bA.$$hash!==undefined){bF.object=bA.$$hash;
}else if(bA.$$type){bF.clazz=bA;
}}this.__bw.process(bF);
var bG=this.__bu;

for(var bB in bG){bG[bB].process(bF);
}},__bz:function(bH){if(bH===undefined){return t;
}else if(bH===null){return I;
}
if(bH.$$type){return H;
}var bI=typeof bH;

if(bI===C||bI==J||bI===G||bI===B){return bI;
}else if(bI===y){if(bH.nodeType){return g;
}else if(bH.classname){return a;
}else if(bH instanceof Array){return d;
}else if(bH instanceof Error){return f;
}else if(bH instanceof Date){return D;
}else{return s;
}}
if(bH.toString){return F;
}return h;
},__bA:function(bJ,bK){var bR=this.__bz(bJ);
var bN=h;
var bM=[];

switch(bR){case I:case t:bN=bR;
break;
case J:case G:case B:case D:bN=bJ;
break;
case g:if(bJ.nodeType===9){bN=m;
}else if(bJ.nodeType===3){bN=u+bJ.nodeValue+E;
}else if(bJ.nodeType===1){bN=bJ.nodeName.toLowerCase();

if(bJ.id){bN+=o+bJ.id;
}}else{bN=g;
}break;
case C:bN=qx.lang.Function.getName(bJ)||bR;
break;
case a:bN=bJ.basename+r+bJ.$$hash+E;
break;
case H:case F:bN=bJ.toString();
break;
case f:bM=qx.dev.StackTrace.getStackTraceFromError(bJ);
bN=bJ.toString();
break;
case d:if(bK){bN=[];

for(var i=0,l=bJ.length;i<l;i++){if(bN.length>20){bN.push(e+(l-i)+c);
break;
}bN.push(this.__bA(bJ[i],false));
}}else{bN=v+bJ.length+z;
}break;
case s:if(bK){var bL;
var bQ=[];

for(var bP in bJ){bQ.push(bP);
}bQ.sort();
bN=[];

for(var i=0,l=bQ.length;i<l;i++){if(bN.length>20){bN.push(e+(l-i)+c);
break;
}bP=bQ[i];
bL=this.__bA(bJ[bP],false);
bL.key=bP;
bN.push(bL);
}}else{var bO=0;

for(var bP in bJ){bO++;
}bN=n+bO+w;
}break;
}return {type:bR,text:bN,trace:bM};
}},defer:function(bS){var bT=qx.Bootstrap.$$logs;

for(var i=0;i<bT.length;i++){bS.__by(bT[i][0],bT[i][1]);
}qx.Bootstrap.debug=bS.debug;
qx.Bootstrap.info=bS.info;
qx.Bootstrap.warn=bS.warn;
qx.Bootstrap.error=bS.error;
qx.Bootstrap.trace=bS.trace;
}});
})();
(function(){var g="on",f="qx.debug",e="$$hash",d="",c="qx.core.ObjectRegistry";
qx.Class.define(c,{statics:{inShutDown:false,__bB:{},__bC:0,__bD:[],register:function(h){var m=this.__bB;

if(!m){return;
}var k=h.$$hash;

if(k==null){var j=this.__bD;

if(j.length>0){k=j.pop();
}else{k=(this.__bC++)+d;
}h.$$hash=k;
}
if(qx.core.Variant.isSet(f,g)){if(!h.dispose){throw new Error("Invalid object: "+h);
}}m[k]=h;
},unregister:function(n){var o=n.$$hash;

if(o==null){return;
}var p=this.__bB;

if(p&&p[o]){delete p[o];
this.__bD.push(o);
}try{delete n.$$hash;
}catch(q){if(n.removeAttribute){n.removeAttribute(e);
}}},toHashCode:function(r){if(qx.core.Variant.isSet(f,g)){if(r==null){throw new Error("Invalid object: "+r);
}}var t=r.$$hash;

if(t!=null){return t;
}var s=this.__bD;

if(s.length>0){t=s.pop();
}else{t=(this.__bC++)+d;
}return r.$$hash=t;
},clearHashCode:function(u){if(qx.core.Variant.isSet(f,g)){if(u==null){throw new Error("Invalid object: "+u);
}}var v=u.$$hash;

if(v!=null){this.__bD.push(v);
try{delete u.$$hash;
}catch(w){if(u.removeAttribute){u.removeAttribute(e);
}}}},fromHashCode:function(x){return this.__bB[x]||null;
},shutdown:function(){this.inShutDown=true;
var z=this.__bB;
var B=[];

for(var A in z){B.push(A);
}B.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);
});
var y,i=0,l=B.length;

while(true){try{for(;i<l;i++){A=B[i];
y=z[A];

if(y&&y.dispose){y.dispose();
}}}catch(C){qx.Bootstrap.error(this,"Could not dispose object "+y.toString()+": "+C);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__bB;
},getRegistry:function(){return this.__bB;
}}});
})();
(function(){var j="on",i="qx.client",h="gecko",g="function",f="HTMLEvents",d="mousedown",c="qx.bom.Event",b="return;",a="mouseover";
qx.Class.define(c,{statics:{addNativeListener:function(k,l,m,n){if(k.addEventListener){k.addEventListener(l,m,!!n);
}else if(k.attachEvent){k.attachEvent(j+l,m);
}},removeNativeListener:function(o,p,q,r){if(o.removeEventListener){o.removeEventListener(p,q,!!r);
}else if(o.detachEvent){try{o.detachEvent(j+p,q);
}catch(e){if(e.number!==-2146828218){throw e;
}}}},getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if(qx.core.Variant.isSet(i,h)){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}}return e.relatedTarget;
}else if(e.fromElement!==undefined&&e.type===a){return e.fromElement;
}else if(e.toElement!==undefined){return e.toElement;
}else{return null;
}},preventDefault:function(e){if(e.preventDefault){if(qx.core.Variant.isSet(i,h)&&qx.bom.client.Engine.VERSION>=1.9&&e.type==d&&e.button==2){return;
}e.preventDefault();
if(qx.core.Variant.isSet(i,h)&&qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(s){}}}else{try{e.keyCode=0;
}catch(t){}e.returnValue=false;
}},stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}else{e.cancelBubble=true;
}},fire:function(u,v){if(document.createEvent){var w=document.createEvent(f);
w.initEvent(v,true,true);
return !u.dispatchEvent(w);
}else{var w=document.createEventObject();
return u.fireEvent(j+v,w);
}},supportsEvent:qx.core.Variant.select(i,{"webkit":function(x,y){return x.hasOwnProperty(j+y);
},"default":function(z,A){var B=j+A;
var C=(B in z);

if(!C){C=typeof z[B]==g;

if(!C&&z.setAttribute){z.setAttribute(B,b);
C=typeof z[B]==g;
z.removeAttribute(B);
}}return C;
}})}});
})();
(function(){var k="qx.debug",j="on",h="|bubble",g="|capture",f="|",e="': ",d="'",c="",b="_",a="Invalid Target.",L="Invalid event type.",K="Invalid event target.",J=" from the target '",I="Invalid callback function",H="unload",G="Failed to remove event listener for id '",F="Invalid context for callback.",E="Invalid capture flag.",D="Failed to add event listener for type '",C="__bJ",s="UNKNOWN_",t="capture",q="qx.event.Manager",r="' on target '",o="Could not dispatch event '",p="DOM_",m="QX_",n=" to the target '",u="Failed to remove event listener for type '",v="Invalid capture falg.",x="c",w="Invalid id type.",z="DOCUMENT_",y="WIN_",B="Invalid event object.",A="__bI";
qx.Class.define(q,{extend:Object,construct:function(M,N){this.__bE=M;
this.__bF=qx.core.ObjectRegistry.toHashCode(M);
this.__bG=N;
if(M.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(M,H,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(M,H,arguments.callee);
self.dispose();
}));
}this.__bH={};
this.__bI={};
this.__bJ={};
this.__bK={};
},statics:{__bL:0,getNextUniqueId:function(){return (this.__bL++)+c;
}},members:{__bG:null,__bH:null,__bJ:null,__bM:null,__bI:null,__bK:null,__bE:null,__bF:null,getWindow:function(){return this.__bE;
},getWindowId:function(){return this.__bF;
},getHandler:function(O){var P=this.__bI[O.classname];

if(P){return P;
}return this.__bI[O.classname]=new O(this);
},getDispatcher:function(Q){var R=this.__bJ[Q.classname];

if(R){return R;
}return this.__bJ[Q.classname]=new Q(this,this.__bG);
},getListeners:function(S,T,U){var V=S.$$hash||qx.core.ObjectRegistry.toHashCode(S);
var X=this.__bH[V];

if(!X){return null;
}var Y=T+(U?g:h);
var W=X[Y];
return W?W.concat():null;
},serializeListeners:function(ba){var bh=ba.$$hash||qx.core.ObjectRegistry.toHashCode(ba);
var bj=this.__bH[bh];
var bf=[];

if(bj){var bd,bi,bb,be,bg;

for(var bc in bj){bd=bc.indexOf(f);
bi=bc.substring(0,bd);
bb=bc.charAt(bd+1)==x;
be=bj[bc];

for(var i=0,l=be.length;i<l;i++){bg=be[i];
bf.push({self:bg.context,handler:bg.handler,type:bi,capture:bb});
}}}return bf;
},toggleAttachedEvents:function(bk,bl){var bq=bk.$$hash||qx.core.ObjectRegistry.toHashCode(bk);
var bs=this.__bH[bq];

if(bs){var bn,br,bm,bo;

for(var bp in bs){bn=bp.indexOf(f);
br=bp.substring(0,bn);
bm=bp.charCodeAt(bn+1)===99;
bo=bs[bp];

if(bl){this.__bN(bk,br,bm);
}else{this.__bO(bk,br,bm);
}}}},hasListener:function(bt,bu,bv){if(qx.core.Variant.isSet(k,j)){if(bt==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+bt);
}}var bw=bt.$$hash||qx.core.ObjectRegistry.toHashCode(bt);
var by=this.__bH[bw];

if(!by){return false;
}var bz=bu+(bv?g:h);
var bx=by[bz];
return bx&&bx.length>0;
},importListeners:function(bA,bB){if(qx.core.Variant.isSet(k,j)){if(bA==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+bA);
}}var bH=bA.$$hash||qx.core.ObjectRegistry.toHashCode(bA);
var bI=this.__bH[bH]={};
var bE=qx.event.Manager;

for(var bC in bB){var bF=bB[bC];
var bG=bF.type+(bF.capture?g:h);
var bD=bI[bG];

if(!bD){bD=bI[bG]=[];
this.__bN(bA,bF.type,bF.capture);
}bD.push({handler:bF.listener,context:bF.self,unique:bF.unique||(bE.__bL++)+c});
}},addListener:function(bJ,bK,bL,self,bM){if(qx.core.Variant.isSet(k,j)){var bQ=D+bK+d+n+bJ.classname+e;
qx.core.Assert.assertObject(bJ,bQ+a);
qx.core.Assert.assertString(bK,bQ+L);
qx.core.Assert.assertFunction(bL,bQ+I);

if(bM!==undefined){qx.core.Assert.assertBoolean(bM,E);
}}var bR=bJ.$$hash||qx.core.ObjectRegistry.toHashCode(bJ);
var bT=this.__bH[bR];

if(!bT){bT=this.__bH[bR]={};
}var bP=bK+(bM?g:h);
var bO=bT[bP];

if(!bO){bO=bT[bP]=[];
}if(bO.length===0){this.__bN(bJ,bK,bM);
}var bS=(qx.event.Manager.__bL++)+c;
var bN={handler:bL,context:self,unique:bS};
bO.push(bN);
return bP+f+bS;
},findHandler:function(bU,bV){var ci=false,ca=false,cj=false,bW=false;
var cg;

if(bU.nodeType===1){ci=true;
cg=p+bU.tagName.toLowerCase()+b+bV;
}else if(bU.nodeType===9){bW=true;
cg=z+bV;
}else if(bU==this.__bE){ca=true;
cg=y+bV;
}else if(bU.classname){cj=true;
cg=m+bU.classname+b+bV;
}else{cg=s+bU+b+bV;
}var cc=this.__bK;

if(cc[cg]){return cc[cg];
}var cf=this.__bG.getHandlers();
var cb=qx.event.IEventHandler;
var cd,ce,bY,bX;

for(var i=0,l=cf.length;i<l;i++){cd=cf[i];
bY=cd.SUPPORTED_TYPES;

if(bY&&!bY[bV]){continue;
}bX=cd.TARGET_CHECK;

if(bX){var ch=false;

if(ci&&((bX&cb.TARGET_DOMNODE)!=0)){ch=true;
}else if(ca&&((bX&cb.TARGET_WINDOW)!=0)){ch=true;
}else if(cj&&((bX&cb.TARGET_OBJECT)!=0)){ch=true;
}else if(bW&&((bX&cb.TARGET_DOCUMENT)!=0)){ch=true;
}
if(!ch){continue;
}}ce=this.getHandler(cf[i]);

if(cd.IGNORE_CAN_HANDLE||ce.canHandleEvent(bU,bV)){cc[cg]=ce;
return ce;
}}return null;
},__bN:function(ck,cl,cm){var cn=this.findHandler(ck,cl);

if(cn){cn.registerEvent(ck,cl,cm);
return;
}
if(qx.core.Variant.isSet(k,j)){qx.log.Logger.warn(this,"There is no event handler for the event '"+cl+"' on target '"+ck+"'!");
}},removeListener:function(co,cp,cq,self,cr){if(qx.core.Variant.isSet(k,j)){var cv=u+cp+d+J+co.classname+e;
qx.core.Assert.assertObject(co,cv+a);
qx.core.Assert.assertString(cp,cv+L);
qx.core.Assert.assertFunction(cq,cv+I);

if(self!==undefined){qx.core.Assert.assertObject(self,F);
}
if(cr!==undefined){qx.core.Assert.assertBoolean(cr,v);
}}var cw=co.$$hash||qx.core.ObjectRegistry.toHashCode(co);
var cx=this.__bH[cw];

if(!cx){return false;
}var cs=cp+(cr?g:h);
var ct=cx[cs];

if(!ct){return false;
}var cu;

for(var i=0,l=ct.length;i<l;i++){cu=ct[i];

if(cu.handler===cq&&cu.context===self){qx.lang.Array.removeAt(ct,i);

if(ct.length==0){this.__bO(co,cp,cr);
}return true;
}}return false;
},removeListenerById:function(cy,cz){if(qx.core.Variant.isSet(k,j)){var cF=G+cz+d+J+cy.classname+e;
qx.core.Assert.assertObject(cy,cF+a);
qx.core.Assert.assertString(cz,cF+w);
}var cD=cz.split(f);
var cI=cD[0];
var cA=cD[1].charCodeAt(0)==99;
var cH=cD[2];
var cG=cy.$$hash||qx.core.ObjectRegistry.toHashCode(cy);
var cJ=this.__bH[cG];

if(!cJ){return false;
}var cE=cI+(cA?g:h);
var cC=cJ[cE];

if(!cC){return false;
}var cB;

for(var i=0,l=cC.length;i<l;i++){cB=cC[i];

if(cB.unique===cH){qx.lang.Array.removeAt(cC,i);

if(cC.length==0){this.__bO(cy,cI,cA);
}return true;
}}return false;
},removeAllListeners:function(cK){var cO=cK.$$hash||qx.core.ObjectRegistry.toHashCode(cK);
var cQ=this.__bH[cO];

if(!cQ){return false;
}var cM,cP,cL;

for(var cN in cQ){if(cQ[cN].length>0){cM=cN.split(f);
cP=cM[0];
cL=cM[1]===t;
this.__bO(cK,cP,cL);
}}delete this.__bH[cO];
return true;
},deleteAllListeners:function(cR){delete this.__bH[cR];
},__bO:function(cS,cT,cU){var cV=this.findHandler(cS,cT);

if(cV){cV.unregisterEvent(cS,cT,cU);
return;
}
if(qx.core.Variant.isSet(k,j)){qx.log.Logger.warn(this,"There is no event handler for the event '"+cT+"' on target '"+cS+"'!");
}},dispatchEvent:function(cW,event){if(qx.core.Variant.isSet(k,j)){var dc=o+event+r+cW.classname+e;
qx.core.Assert.assertNotUndefined(cW,dc+K);
qx.core.Assert.assertNotNull(cW,dc+K);
qx.core.Assert.assertInstance(event,qx.event.type.Event,dc+B);
}var dd=event.getType();

if(!event.getBubbles()&&!this.hasListener(cW,dd)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(cW);
}var db=this.__bG.getDispatchers();
var da;
var cY=false;

for(var i=0,l=db.length;i<l;i++){da=this.getDispatcher(db[i]);
if(da.canDispatchEvent(cW,event,dd)){da.dispatchEvent(cW,event,dd);
cY=true;
break;
}}
if(!cY){if(qx.core.Variant.isSet(k,j)){qx.log.Logger.error(this,"No dispatcher can handle event of type "+dd+" on "+cW);
}return true;
}var cX=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cX;
},dispose:function(){this.__bG.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,A);
qx.util.DisposeUtil.disposeMap(this,C);
this.__bH=this.__bE=this.__bM=null;
this.__bG=this.__bK=null;
}}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(e){return e.nodeType===
this.DOCUMENT?e:
e.ownerDocument||e.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(f){if(f.nodeType==null){return f;
}if(f.nodeType!==this.DOCUMENT){f=f.ownerDocument;
}return f.parentWindow;
},"default":function(g){if(g.nodeType==null){return g;
}if(g.nodeType!==this.DOCUMENT){g=g.ownerDocument;
}return g.defaultView;
}}),getDocumentElement:function(h){return this.getDocument(h).documentElement;
},getBodyElement:function(j){return this.getDocument(j).body;
},isNode:function(k){return !!(k&&k.nodeType!=null);
},isElement:function(l){return !!(l&&l.nodeType===this.ELEMENT);
},isDocument:function(m){return !!(m&&m.nodeType===this.DOCUMENT);
},isText:function(n){return !!(n&&n.nodeType===this.TEXT);
},isWindow:function(o){return !!(o&&o.history&&o.location&&o.document);
},isNodeName:function(p,q){if(!q||!p||!p.nodeName){return false;
}return q.toLowerCase()==qx.dom.Node.getName(p);
},getName:function(r){if(!r||!r.nodeName){return null;
}return r.nodeName.toLowerCase();
},getText:function(s){if(!s||!s.nodeType){return null;
}
switch(s.nodeType){case 1:var i,a=[],t=s.childNodes,length=t.length;

for(i=0;i<length;i++){a[i]=this.getText(t[i]);
}return a.join(b);
case 2:return s.nodeValue;
break;
case 3:return s.nodeValue;
break;
}return null;
},isBlockNode:function(u){if(!qx.dom.Node.isElement(u)){return false;
}u=qx.dom.Node.getName(u);
return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(u);
}}});
})();
(function(){var l="qx.debug",k="on",j="Invalid event target.",i="Invalid event dispatcher!",h="': ",g="Invalid event handler.",f="' on target '",e="Could not fire event '",d="undefined",c="qx.event.Registration";
qx.Class.define(c,{statics:{__bP:{},getManager:function(m){if(m==null){if(qx.core.Variant.isSet(l,k)){qx.log.Logger.error("qx.event.Registration.getManager(null) was called!");
qx.log.Logger.trace(this);
}m=window;
}else if(m.nodeType){m=qx.dom.Node.getWindow(m);
}else if(!qx.dom.Node.isWindow(m)){m=window;
}var o=m.$$hash||qx.core.ObjectRegistry.toHashCode(m);
var n=this.__bP[o];

if(!n){n=new qx.event.Manager(m,this);
this.__bP[o]=n;
}return n;
},removeManager:function(p){var q=p.getWindowId();
delete this.__bP[q];
},addListener:function(r,s,t,self,u){return this.getManager(r).addListener(r,s,t,self,u);
},removeListener:function(v,w,x,self,y){return this.getManager(v).removeListener(v,w,x,self,y);
},removeListenerById:function(z,A){return this.getManager(z).removeListenerById(z,A);
},removeAllListeners:function(B){return this.getManager(B).removeAllListeners(B);
},deleteAllListeners:function(C){var D=C.$$hash;

if(D){this.getManager(C).deleteAllListeners(D);
}},hasListener:function(E,F,G){return this.getManager(E).hasListener(E,F,G);
},serializeListeners:function(H){return this.getManager(H).serializeListeners(H);
},createEvent:function(I,J,K){if(qx.core.Variant.isSet(l,k)){if(arguments.length>1&&J===undefined){throw new Error("Create event of type "+I+" with undefined class. Please use null to explicit fallback to default event type!");
}}if(J==null){J=qx.event.type.Event;
}var L=qx.event.Pool.getInstance().getObject(J);
K?L.init.apply(L,K):L.init();
if(I){L.setType(I);
}return L;
},dispatchEvent:function(M,event){return this.getManager(M).dispatchEvent(M,event);
},fireEvent:function(N,O,P,Q){if(qx.core.Variant.isSet(l,k)){if(arguments.length>2&&P===undefined&&Q!==undefined){throw new Error("Create event of type "+O+" with undefined class. Please use null to explicit fallback to default event type!");
}var R=e+O+f+(N?N.classname:d)+h;
qx.core.Assert.assertNotUndefined(N,R+j);
qx.core.Assert.assertNotNull(N,R+j);
}var S=this.createEvent(O,P||null,Q);
return this.getManager(N).dispatchEvent(N,S);
},fireNonBubblingEvent:function(T,U,V,W){if(qx.core.Variant.isSet(l,k)){if(arguments.length>2&&V===undefined&&W!==undefined){throw new Error("Create event of type "+U+" with undefined class. Please use null to explicit fallback to default event type!");
}}var X=this.getManager(T);

if(!X.hasListener(T,U,false)){return true;
}var Y=this.createEvent(U,V||null,W);
return X.dispatchEvent(T,Y);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bQ:[],addHandler:function(ba){if(qx.core.Variant.isSet(l,k)){qx.core.Assert.assertInterface(ba,qx.event.IEventHandler,g);
}this.__bQ.push(ba);
this.__bQ.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bQ;
},__bR:[],addDispatcher:function(bb,bc){if(qx.core.Variant.isSet(l,k)){qx.core.Assert.assertInterface(bb,qx.event.IEventDispatcher,i);
}this.__bR.push(bb);
this.__bR.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bR;
}}});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;
},isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));
},isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));
},isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));
},isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));
}}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__bS=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__bS:null,message:null,getComment:function(){return this.__bS;
},toString:function(){return this.__bS+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__bT=qx.dev.StackTrace.getStackTrace();
},members:{__bT:null,getStackTrace:function(){return this.__bT;
}}});
})();
(function(){var p="",o="!",n="'!",m="'",k="Expected '",j="' (rgb(",h=",",g=")), but found value '",f="Event (",d="Expected value to be the CSS color '",bw="' but found ",bv="The value '",bu=" != ",bt="qx.core.Object",bs="Expected value to be an array but found ",br=") was fired.",bq="Expected value to be an integer >= 0 but found ",bp="' to be not equal with '",bo="' to '",bn="qx.ui.core.Widget",w="Called assertTrue with '",x="Expected value to be a map but found ",u="The function did not raise an exception!",v="Expected value to be undefined but found ",s="Expected value to be a DOM element but found  '",t="Expected value to be a regular expression but found ",q="' to implement the interface '",r="Expected value to be null but found ",E="Invalid argument 'type'",F="Called assert with 'false'",R="Assertion error! ",N="Expected value to be a string but found ",ba="null",U="' but found '",bj="' must must be a key of the map '",bf="The String '",J="Expected value not to be undefined but found ",bm="qx.util.ColorUtil",bl=": ",bk="The raised exception does not have the expected type! ",I=") not fired.",L="qx.core.Assert",M="Expected value to be typeof object but found ",P="' (identical) but found '",S="' must have any of the values defined in the array '",V="Expected value to be a number but found ",bc="Called assertFalse with '",bh="]",y="Expected value to be a qooxdoo object but found ",z="' arguments.",K="Expected value not to be null but found ",Y="Array[",X="' does not match the regular expression '",W="' to be not identical with '",be="' arguments but found '",bd="', which cannot be converted to a CSS color!",T="Expected object '",bb="qx.core.AssertionError",a="Expected value to be a boolean but found ",bg="))!",A="Expected value to be a qooxdoo widget but found ",B="Expected value '%1' to be in the range '%2'..'%3'!",O="Expected value to be typeof '",b="Expected value to be typeof function but found ",c="Expected value to be an integer but found ",H="Called fail().",C="The parameter 're' must be a string or a regular expression.",D="Expected value to be a number >= 0 but found ",G="Expected value to be instanceof '",Q="Wrong number of arguments given. Expected '",bi="object";
qx.Class.define(L,{statics:{__bU:true,__bV:function(bx,by){var bz=p;

for(var i=1,l=arguments.length;i<l;i++){bz=bz+this.__bW(arguments[i]);
}var bB=R+bx+bl+bz;

if(this.__bU){qx.Bootstrap.error(bB);
}
if(qx.Class.isDefined(bb)){var bA=new qx.core.AssertionError(bx,bz);

if(this.__bU){qx.Bootstrap.error("Stack trace: \n"+bA.getStackTrace());
}throw bA;
}else{throw new Error(bB);
}},__bW:function(bC){var bD;

if(bC===null){bD=ba;
}else if(qx.lang.Type.isArray(bC)&&bC.length>10){bD=Y+bC.length+bh;
}else if((bC instanceof Object)&&(bC.toString==null)){bD=qx.lang.Json.stringify(bC,null,2);
}else{try{bD=bC.toString();
}catch(e){bD=p;
}}return bD;
},assert:function(bE,bF){bE==true||this.__bV(bF||p,F);
},fail:function(bG){this.__bV(bG||p,H);
},assertTrue:function(bH,bI){(bH===true)||this.__bV(bI||p,w,bH,m);
},assertFalse:function(bJ,bK){(bJ===false)||this.__bV(bK||p,bc,bJ,m);
},assertEquals:function(bL,bM,bN){bL==bM||this.__bV(bN||p,k,bL,U,bM,n);
},assertNotEquals:function(bO,bP,bQ){bO!=bP||this.__bV(bQ||p,k,bO,bp,bP,n);
},assertIdentical:function(bR,bS,bT){bR===bS||this.__bV(bT||p,k,bR,P,bS,n);
},assertNotIdentical:function(bU,bV,bW){bU!==bV||this.__bV(bW||p,k,bU,W,bV,n);
},assertNotUndefined:function(bX,bY){bX!==undefined||this.__bV(bY||p,J,bX,o);
},assertUndefined:function(ca,cb){ca===undefined||this.__bV(cb||p,v,ca,o);
},assertNotNull:function(cc,cd){cc!==null||this.__bV(cd||p,K,cc,o);
},assertNull:function(ce,cf){ce===null||this.__bV(cf||p,r,ce,o);
},assertJsonEquals:function(cg,ch,ci){this.assertEquals(qx.lang.Json.stringify(cg),qx.lang.Json.stringify(ch),ci);
},assertMatch:function(cj,ck,cl){this.assertString(cj);
this.assert(qx.lang.Type.isRegExp(ck)||qx.lang.Type.isString(ck),C);
cj.search(ck)>=0||this.__bV(cl||p,bf,cj,X,ck.toString(),n);
},assertArgumentsCount:function(cm,cn,co,cp){var cq=cm.length;
(cq>=cn&&cq<=co)||this.__bV(cp||p,Q,cn,bo,co,be,arguments.length,z);
},assertEventFired:function(cr,event,cs,ct,cu){var cw=false;
var cv=function(e){if(ct){ct.call(cr,e);
}cw=true;
};
var cx;

try{cx=cr.addListener(event,cv,cr);
cs.call();
}catch(cy){throw cy;
}finally{try{cr.removeListenerById(cx);
}catch(cz){}}cw===true||this.__bV(cu||p,f,event,I);
},assertEventNotFired:function(cA,event,cB,cC){var cE=false;
var cD=function(e){cE=true;
};
var cF=cA.addListener(event,cD,cA);
cB.call();
cE===false||this.__bV(cC||p,f,event,br);
cA.removeListenerById(cF);
},assertException:function(cG,cH,cI,cJ){var cH=cH||Error;
var cK;

try{this.__bU=false;
cG();
}catch(cL){cK=cL;
}finally{this.__bU=true;
}
if(cK==null){this.__bV(cJ||p,u);
}cK instanceof cH||this.__bV(cJ||p,bk,cH,bu,cK);

if(cI){this.assertMatch(cK.toString(),cI,cJ);
}},assertInArray:function(cM,cN,cO){cN.indexOf(cM)!==-1||this.__bV(cO||p,bv,cM,S,cN,m);
},assertArrayEquals:function(cP,cQ,cR){this.assertArray(cP,cR);
this.assertArray(cQ,cR);
this.assertEquals(cP.length,cQ.length,cR);

for(var i=0;i<cP.length;i++){this.assertIdentical(cP[i],cQ[i],cR);
}},assertKeyInMap:function(cS,cT,cU){cT[cS]!==undefined||this.__bV(cU||p,bv,cS,bj,cT,m);
},assertFunction:function(cV,cW){qx.lang.Type.isFunction(cV)||this.__bV(cW||p,b,cV,o);
},assertString:function(cX,cY){qx.lang.Type.isString(cX)||this.__bV(cY||p,N,cX,o);
},assertBoolean:function(da,db){qx.lang.Type.isBoolean(da)||this.__bV(db||p,a,da,o);
},assertNumber:function(dc,dd){(qx.lang.Type.isNumber(dc)&&isFinite(dc))||this.__bV(dd||p,V,dc,o);
},assertPositiveNumber:function(de,df){(qx.lang.Type.isNumber(de)&&isFinite(de)&&de>=0)||this.__bV(df||p,D,de,o);
},assertInteger:function(dg,dh){(qx.lang.Type.isNumber(dg)&&isFinite(dg)&&dg%1===0)||this.__bV(dh||p,c,dg,o);
},assertPositiveInteger:function(di,dj){var dk=(qx.lang.Type.isNumber(di)&&isFinite(di)&&di%1===0&&di>=0);
dk||this.__bV(dj||p,bq,di,o);
},assertInRange:function(dl,dm,dn,dp){(dl>=dm&&dl<=dn)||this.__bV(dp||p,qx.lang.String.format(B,[dl,dm,dn]));
},assertObject:function(dq,dr){var ds=dq!==null&&(qx.lang.Type.isObject(dq)||typeof dq===bi);
ds||this.__bV(dr||p,M,(dq),o);
},assertArray:function(dt,du){qx.lang.Type.isArray(dt)||this.__bV(du||p,bs,dt,o);
},assertMap:function(dv,dw){qx.lang.Type.isObject(dv)||this.__bV(dw||p,x,dv,o);
},assertRegExp:function(dx,dy){qx.lang.Type.isRegExp(dx)||this.__bV(dy||p,t,dx,o);
},assertType:function(dz,dA,dB){this.assertString(dA,E);
typeof (dz)===dA||this.__bV(dB||p,O,dA,bw,dz,o);
},assertInstance:function(dC,dD,dE){var dF=dD.classname||dD+p;
dC instanceof dD||this.__bV(dE||p,G,dF,bw,dC,o);
},assertInterface:function(dG,dH,dI){qx.Class.implementsInterface(dG,dH)||this.__bV(dI||p,T,dG,q,dH,n);
},assertCssColor:function(dJ,dK,dL){var dM=qx.Class.getByName(bm);

if(!dM){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");
}var dO=dM.stringToRgb(dJ);

try{var dN=dM.stringToRgb(dK);
}catch(dQ){this.__bV(dL||p,d,dJ,j,dO.join(h),g,dK,bd);
}var dP=dO[0]==dN[0]&&dO[1]==dN[1]&&dO[2]==dN[2];
dP||this.__bV(dL||p,d,dO,j,dO.join(h),g,dK,j,dN.join(h),bg);
},assertElement:function(dR,dS){!!(dR&&dR.nodeType===1)||this.__bV(dS||p,s,dR,n);
},assertQxObject:function(dT,dU){this.__bX(dT,bt)||this.__bV(dU||p,y,dT,o);
},assertQxWidget:function(dV,dW){this.__bX(dV,bn)||this.__bV(dW||p,A,dV,o);
},__bX:function(dX,dY){if(!dX){return false;
}var ea=dX.constructor;

while(ea){if(ea.classname===dY){return true;
}ea=ea.superclass;
}return false;
}}});
})();
(function(){var p='',o='"',m=':',l=']',h='null',g=': ',f='object',e='function',d=',',b='\n',ba='\\u',Y=',\n',X='0000',W='string',V="Cannot stringify a recursive object.",U='0',T='-',S='}',R='String',Q='Boolean',x='\\\\',y='\\f',u='\\t',w='{\n',s='[]',t="qx.lang.JsonImpl",q='Z',r='\\n',z='Object',A='{}',H='@',F='.',K='(',J='Array',M='T',L='\\r',C='{',P='JSON.parse',O=' ',N='[',B='Number',D=')',E='[\n',G='\\"',I='\\b';
qx.Class.define(t,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);
this.parse=qx.lang.Function.bind(this.parse,this);
},members:{__bY:null,__ca:null,__cb:null,__cc:null,stringify:function(bb,bc,bd){this.__bY=p;
this.__ca=p;
this.__cc=[];

if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));

for(var i=0;i<bd;i+=1){this.__ca+=O;
}}else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);
}this.__ca=bd;
}if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__cb=bc;
}else{this.__cb=null;
}return this.__cd(p,{'':bb});
},__cd:function(be,bf){var bi=this.__bY,bg,bj=bf[be];
if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);
}else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);
}if(typeof this.__cb===e){bj=this.__cb.call(bf,be,bj);
}
if(bj===null){return h;
}
if(bj===undefined){return undefined;
}switch(qx.lang.Type.getClass(bj)){case R:return this.__ce(bj);
case B:return isFinite(bj)?String(bj):h;
case Q:return String(bj);
case J:this.__bY+=this.__ca;
bg=[];

if(this.__cc.indexOf(bj)!==-1){throw new TypeError(V);
}this.__cc.push(bj);
var length=bj.length;

for(var i=0;i<length;i+=1){bg[i]=this.__cd(i,bj)||h;
}this.__cc.pop();
if(bg.length===0){var bh=s;
}else if(this.__bY){bh=E+this.__bY+bg.join(Y+this.__bY)+b+bi+l;
}else{bh=N+bg.join(d)+l;
}this.__bY=bi;
return bh;
case z:this.__bY+=this.__ca;
bg=[];

if(this.__cc.indexOf(bj)!==-1){throw new TypeError(V);
}this.__cc.push(bj);
if(this.__cb&&typeof this.__cb===f){var length=this.__cb.length;

for(var i=0;i<length;i+=1){var k=this.__cb[i];

if(typeof k===W){var v=this.__cd(k,bj);

if(v){bg.push(this.__ce(k)+(this.__bY?g:m)+v);
}}}}else{for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__cd(k,bj);

if(v){bg.push(this.__ce(k)+(this.__bY?g:m)+v);
}}}}this.__cc.pop();
if(bg.length===0){var bh=A;
}else if(this.__bY){bh=w+this.__bY+bg.join(Y+this.__bY)+b+bi+S;
}else{bh=C+bg.join(d)+S;
}this.__bY=bi;
return bh;
}},dateToJSON:function(bk){var bl=function(n){return n<10?U+n:n;
};
var bm=function(n){var bn=bl(n);
return n<100?U+bn:bn;
};
return isFinite(bk.valueOf())?bk.getUTCFullYear()+T+bl(bk.getUTCMonth()+1)+T+bl(bk.getUTCDate())+M+bl(bk.getUTCHours())+m+bl(bk.getUTCMinutes())+m+bl(bk.getUTCSeconds())+F+bm(bk.getUTCMilliseconds())+q:null;
},__ce:function(bo){var bp={'\b':I,'\t':u,'\n':r,'\f':y,'\r':L,'"':G,'\\':x};
var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bq.lastIndex=0;

if(bq.test(bo)){return o+
bo.replace(bq,function(a){var c=bp[a];
return typeof c===W?c:ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
})+o;
}else{return o+bo+o;
}},parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bt.lastIndex=0;
if(bt.test(br)){br=br.replace(bt,function(a){return ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
});
}if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,H).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l).replace(/(?:^|:|,)(?:\s*\[)+/g,p))){var j=eval(K+br+D);
return typeof bs===e?this.__cf({'':j},p,bs):j;
}throw new SyntaxError(P);
},__cf:function(bu,bv,bw){var bx=bu[bv];

if(bx&&typeof bx===f){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__cf(bx,k,bw);

if(v!==undefined){bx[k]=v;
}else{delete bx[k];
}}}}return bw.call(bu,bv,bx);
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){},setItem:function(e,f){},splice:function(g,h,i){},contains:function(j){},getLength:function(){},toArray:function(){}}});
})();
(function(){var d="on",c="qx.debug",b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(e,f){if(qx.core.Variant.isSet(c,d)){qx.core.Assert.assertNotUndefined(e);
}this.__cg=b+(e&&e.message?e.message:e);
Error.call(this,this.__cg);
this.__ch=f;
this.__ci=e;
},members:{__ci:null,__ch:null,__cg:null,toString:function(){return this.__cg;
},getArguments:function(){return this.__ch;
},getSourceException:function(){return this.__ci;
}},destruct:function(){this.__ci=null;
this.__ch=null;
this.__cg=null;
}});
})();
(function(){var c="qx.globalErrorHandling",b="on",a="qx.event.GlobalError";
qx.Bootstrap.define(a,{statics:{setErrorHandler:function(d,f){this.__cj=d||null;
this.__ck=f||window;

if(qx.core.Setting.get(c)===b){if(d&&window.onerror){var g=qx.Bootstrap.bind(this.__cm,this);

if(this.__cl==null){this.__cl=window.onerror;
}var self=this;
window.onerror=function(e){self.__cl(e);
g(e);
};
}
if(d&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__cm,this);
}if(this.__cj==null){if(this.__cl!=null){window.onerror=this.__cl;
this.__cl=null;
}else{window.onerror=null;
}}}},__cm:function(h,i,j){if(this.__cj){this.handleError(new qx.core.WindowError(h,i,j));
return true;
}},observeMethod:function(k){if(qx.core.Setting.get(c)===b){var self=this;
return function(){if(!self.__cj){return k.apply(this,arguments);
}
try{return k.apply(this,arguments);
}catch(l){self.handleError(new qx.core.GlobalError(l,arguments));
}};
}else{return k;
}},handleError:function(m){if(this.__cj){this.__cj.call(this.__ck,m);
}}},defer:function(n){qx.core.Setting.define(c,b);
n.setErrorHandler(null,null);
}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var a="qx.core.MAssert";
qx.Mixin.define(a,{members:{assert:function(b,c){qx.core.Assert.assert(b,c);
},fail:function(d){qx.core.Assert.fail(d);
},assertTrue:function(e,f){qx.core.Assert.assertTrue(e,f);
},assertFalse:function(g,h){qx.core.Assert.assertFalse(g,h);
},assertEquals:function(i,j,k){qx.core.Assert.assertEquals(i,j,k);
},assertNotEquals:function(l,m,n){qx.core.Assert.assertNotEquals(l,m,n);
},assertIdentical:function(o,p,q){qx.core.Assert.assertIdentical(o,p,q);
},assertNotIdentical:function(r,s,t){qx.core.Assert.assertNotIdentical(r,s,t);
},assertNotUndefined:function(u,v){qx.core.Assert.assertNotUndefined(u,v);
},assertUndefined:function(w,x){qx.core.Assert.assertUndefined(w,x);
},assertNotNull:function(y,z){qx.core.Assert.assertNotNull(y,z);
},assertNull:function(A,B){qx.core.Assert.assertNull(A,B);
},assertJsonEquals:function(C,D,E){qx.core.Assert.assertJsonEquals(C,D,E);
},assertMatch:function(F,G,H){qx.core.Assert.assertMatch(F,G,H);
},assertArgumentsCount:function(I,J,K,L){qx.core.Assert.assertArgumentsCount(I,J,K,L);
},assertEventFired:function(M,event,N,O,P){qx.core.Assert.assertEventFired(M,event,N,O,P);
},assertEventNotFired:function(Q,event,R,S){qx.core.Assert.assertEventNotFired(Q,event,R,S);
},assertException:function(T,U,V,W){qx.core.Assert.assertException(T,U,V,W);
},assertInArray:function(X,Y,ba){qx.core.Assert.assertInArray(X,Y,ba);
},assertArrayEquals:function(bb,bc,bd){qx.core.Assert.assertArrayEquals(bb,bc,bd);
},assertKeyInMap:function(be,bf,bg){qx.core.Assert.assertKeyInMap(be,bf,bg);
},assertFunction:function(bh,bi){qx.core.Assert.assertFunction(bh,bi);
},assertString:function(bj,bk){qx.core.Assert.assertString(bj,bk);
},assertBoolean:function(bl,bm){qx.core.Assert.assertBoolean(bl,bm);
},assertNumber:function(bn,bo){qx.core.Assert.assertNumber(bn,bo);
},assertPositiveNumber:function(bp,bq){qx.core.Assert.assertPositiveNumber(bp,bq);
},assertInteger:function(br,bs){qx.core.Assert.assertInteger(br,bs);
},assertPositiveInteger:function(bt,bu){qx.core.Assert.assertPositiveInteger(bt,bu);
},assertInRange:function(bv,bw,bx,by){qx.core.Assert.assertInRange(bv,bw,bx,by);
},assertObject:function(bz,bA){qx.core.Assert.assertObject(bz,bA);
},assertArray:function(bB,bC){qx.core.Assert.assertArray(bB,bC);
},assertMap:function(bD,bE){qx.core.Assert.assertMap(bD,bE);
},assertRegExp:function(bF,bG){qx.core.Assert.assertRegExp(bF,bG);
},assertType:function(bH,bI,bJ){qx.core.Assert.assertType(bH,bI,bJ);
},assertInstance:function(bK,bL,bM){qx.core.Assert.assertInstance(bK,bL,bM);
},assertInterface:function(bN,bO,bP){qx.core.Assert.assertInterface(bN,bO,bP);
},assertCssColor:function(bQ,bR,bS){qx.core.Assert.assertCssColor(bQ,bR,bS);
},assertElement:function(bT,bU){qx.core.Assert.assertElement(bT,bU);
},assertQxObject:function(bV,bW){qx.core.Assert.assertQxObject(bV,bW);
},assertQxWidget:function(bX,bY){qx.core.Assert.assertQxWidget(bX,bY);
}}});
})();
(function(){var u="qx.debug",t="on",s="qx.disposerDebugLevel",r="set",q="MSIE 6.0",p="rv:1.8.1",o="get",n="reset",m="info",k="qx.core.Object",c="error",j="warn",g="]",b="debug",a="[",f="$$user_",d="object",h="Object";
qx.Class.define(k,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:h},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+a+this.$$hash+g;
},base:function(v,w){if(qx.core.Variant.isSet(u,t)){if(!qx.Bootstrap.isFunction(v.callee.base)){throw new Error("Cannot call super class. Method is not derived: "+v.callee.displayName);
}}
if(arguments.length===1){return v.callee.base.call(this);
}else{return v.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(x){return x.callee.self;
},clone:function(){var z=this.constructor;
var y=new z;
var B=qx.Class.getProperties(z);
var A=qx.core.Property.$$store.user;
var C=qx.core.Property.$$method.set;
var name;
for(var i=0,l=B.length;i<l;i++){name=B[i];

if(this.hasOwnProperty(A[name])){y[C[name]](this[A[name]]);
}}return y;
},set:function(D,E){var G=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(D)){if(!this[G[D]]){if(this[r+qx.Bootstrap.firstUp(D)]!=undefined){this[r+qx.Bootstrap.firstUp(D)](E);
return this;
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+D));
return this;
}}return this[G[D]](E);
}else{for(var F in D){if(!this[G[F]]){if(this[r+qx.Bootstrap.firstUp(F)]!=undefined){this[r+qx.Bootstrap.firstUp(F)](D[F]);
continue;
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+F));
return this;
}}this[G[F]](D[F]);
}return this;
}},get:function(H){var I=qx.core.Property.$$method.get;

if(!this[I[H]]){if(this[o+qx.Bootstrap.firstUp(H)]!=undefined){return this[o+qx.Bootstrap.firstUp(H)]();
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+H));
return this;
}}return this[I[H]]();
},reset:function(J){var K=qx.core.Property.$$method.reset;

if(!this[K[J]]){if(this[n+qx.Bootstrap.firstUp(J)]!=undefined){this[n+qx.Bootstrap.firstUp(J)]();
return;
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+J));
return;
}}this[K[J]]();
},__cn:qx.event.Registration,addListener:function(L,M,self,N){if(!this.$$disposed){return this.__cn.addListener(this,L,M,self,N);
}return null;
},addListenerOnce:function(O,P,self,Q){var R=function(e){this.removeListener(O,R,this,Q);
P.call(self||this,e);
};
return this.addListener(O,R,this,Q);
},removeListener:function(S,T,self,U){if(!this.$$disposed){return this.__cn.removeListener(this,S,T,self,U);
}return false;
},removeListenerById:function(V){if(!this.$$disposed){return this.__cn.removeListenerById(this,V);
}return false;
},hasListener:function(W,X){return this.__cn.hasListener(this,W,X);
},dispatchEvent:function(Y){if(!this.$$disposed){return this.__cn.dispatchEvent(this,Y);
}return true;
},fireEvent:function(ba,bb,bc){if(!this.$$disposed){return this.__cn.fireEvent(this,ba,bb,bc);
}return true;
},fireNonBubblingEvent:function(bd,be,bf){if(!this.$$disposed){return this.__cn.fireNonBubblingEvent(this,bd,be,bf);
}return true;
},fireDataEvent:function(bg,bh,bi,bj){if(!this.$$disposed){if(bi===undefined){bi=null;
}return this.__cn.fireNonBubblingEvent(this,bg,qx.event.type.Data,[bh,bi,!!bj]);
}return true;
},__co:null,setUserData:function(bk,bl){if(!this.__co){this.__co={};
}this.__co[bk]=bl;
},getUserData:function(bm){if(!this.__co){return null;
}var bn=this.__co[bm];
return bn===undefined?null:bn;
},__cp:qx.log.Logger,debug:function(bo){this.__cq(b,arguments);
},info:function(bp){this.__cq(m,arguments);
},warn:function(bq){this.__cq(j,arguments);
},error:function(br){this.__cq(c,arguments);
},trace:function(){this.__cp.trace(this);
},__cq:function(bs,bt){var bu=qx.lang.Array.fromArguments(bt);
bu.unshift(this);
this.__cp[bs].apply(this.__cp,bu);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
if(qx.core.Variant.isSet(u,t)){if(qx.core.Setting.get(s)>2){qx.Bootstrap.debug(this,"Disposing "+this.classname+"["+this.toHashCode()+"]");
}}var bx=this.constructor;
var bv;

while(bx.superclass){if(bx.$$destructor){bx.$$destructor.call(this);
}if(bx.$$includes){bv=bx.$$flatIncludes;

for(var i=0,l=bv.length;i<l;i++){if(bv[i].$$destructor){bv[i].$$destructor.call(this);
}}}bx=bx.superclass;
}if(this.__cr){this.__cr();
}if(qx.core.Variant.isSet(u,t)){if(qx.core.Setting.get(s)>0){var by,bw;

for(by in this){bw=this[by];
if(bw!==null&&typeof bw===d&&!(qx.Bootstrap.isString(bw))){if(this.constructor.prototype[by]!=null){continue;
}var bA=navigator.userAgent.indexOf(p)!=-1;
var bz=navigator.userAgent.indexOf(q)!=-1;
if(bA||bz){if(bw instanceof qx.core.Object||qx.core.Setting.get(s)>1){qx.Bootstrap.warn(this,"Missing destruct definition for '"+by+"' in "+this.classname+"["+this.toHashCode()+"]: "+bw);
delete this[by];
}}else{if(qx.core.Setting.get(s)>1){qx.Bootstrap.warn(this,"Missing destruct definition for '"+by+"' in "+this.classname+"["+this.toHashCode()+"]: "+bw);
delete this[by];
}}}}}}},__cr:null,__cs:function(){var bB=qx.Class.getProperties(this.constructor);

for(var i=0,l=bB.length;i<l;i++){delete this[f+bB[i]];
}},_disposeObjects:function(bC){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(bD){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(bE){qx.util.DisposeUtil.disposeArray(this,bE);
},_disposeMap:function(bF){qx.util.DisposeUtil.disposeMap(this,bF);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bG,bH){if(qx.core.Variant.isSet(u,t)){qx.Class.include(bG,qx.core.MAssert);
}var bJ=navigator.userAgent.indexOf(q)!=-1;
var bI=navigator.userAgent.indexOf(p)!=-1;
if(bJ||bI){bH.__cr=bH.__cs;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__co=null;
var bM=this.constructor;
var bQ;
var bR=qx.core.Property.$$store;
var bO=bR.user;
var bP=bR.theme;
var bK=bR.inherit;
var bN=bR.useinit;
var bL=bR.init;

while(bM){bQ=bM.$$properties;

if(bQ){for(var name in bQ){if(bQ[name].dereference){this[bO[name]]=this[bP[name]]=this[bK[name]]=this[bN[name]]=this[bL[name]]=undefined;
}}}bM=bM.superclass;
}}});
})();
(function(){var a="qx.lang.Json";
qx.Class.define(a,{statics:{JSON:(qx.lang.Type.getClass(window.JSON)=="JSON"&&JSON.parse('{"x":1}').x===1)?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;
b.parse=b.JSON.parse;
}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var m="ready",l="qx.client",k="mshtml",j="load",i="unload",h="qx.event.handler.Application",g="complete",f="qx.application",d="gecko|opera|webkit",c="left",a="DOMContentLoaded",b="shutdown";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(n){qx.core.Object.call(this);
this._window=n.getWindow();
this.__ct=false;
this.__cu=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var o=qx.event.handler.Application.$$instance;

if(o){o.__cx();
}}},members:{canHandleEvent:function(p,q){},registerEvent:function(r,s,t){},unregisterEvent:function(u,v,w){},__cv:null,__ct:null,__cu:null,__cw:null,__cx:function(){if(!this.__cv&&this.__ct&&qx.$$loader.scriptLoaded){try{var x=qx.core.Setting.get(f);

if(!qx.Class.getByName(x)){return;
}}catch(e){}if(qx.core.Variant.isSet(l,k)){if(qx.event.Registration.hasListener(this._window,m)){this.__cv=true;
qx.event.Registration.fireEvent(this._window,m);
}}else{this.__cv=true;
qx.event.Registration.fireEvent(this._window,m);
}}},isApplicationReady:function(){return this.__cv;
},_initObserver:function(){if(qx.$$domReady||document.readyState==g||document.readyState==m){this.__ct=true;
this.__cx();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(l,d)){qx.bom.Event.addNativeListener(this._window,a,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(l,k)){var self=this;
var y=function(){try{document.documentElement.doScroll(c);

if(document.body){self._onNativeLoadWrapped();
}}catch(z){window.setTimeout(y,100);
}};
y();
}qx.bom.Event.addNativeListener(this._window,j,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,i,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,j,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,i,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__ct=true;
this.__cx();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cw){this.__cw=true;

try{qx.event.Registration.fireEvent(this._window,b);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(A){qx.event.Registration.addHandler(A);
}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var c="on",b="qx.debug",a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(d){this._manager=d;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(e,event,f){return !event.getBubbles();
},dispatchEvent:function(g,event,h){if(qx.core.Variant.isSet(b,c)){if(g instanceof qx.core.Object){var m=qx.Class.getEventType(g.constructor,h);
var j=qx.Class.getByName(m);

if(!j){this.error("The event type '"+h+"' declared in the class '"+g.constructor+" is not an available class': "+m);
}else if(!(event instanceof j)){this.error("Expected event type to be instanceof '"+m+"' but found '"+event.classname+"'");
}}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
var n=this._manager.getListeners(g,h,false);

if(n){for(var i=0,l=n.length;i<l;i++){var k=n[i].context||g;
n[i].handler.call(k,event);
}}}},defer:function(o){qx.event.Registration.addDispatcher(o);
}});
})();
(function(){var a="qx.event.handler.Window";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);
this._manager=b;
this._window=b.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,d){},registerEvent:function(f,g,h){},unregisterEvent:function(i,j,k){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var m=qx.event.handler.Window.SUPPORTED_TYPES;

for(var l in m){qx.bom.Event.addNativeListener(this._window,l,this._onNativeWrapper);
}},_stopWindowObserver:function(){var o=qx.event.handler.Window.SUPPORTED_TYPES;

for(var n in o){qx.bom.Event.removeNativeListener(this._window,n,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var q=this._window;

try{var t=q.document;
}catch(e){return ;
}var r=t.documentElement;
var p=qx.bom.Event.getTarget(e);

if(p==null||p===q||p===t||p===r){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,q]);
qx.event.Registration.dispatchEvent(q,event);
var s=event.getReturnValue();

if(s!=null){e.returnValue=s;
return s;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(u){qx.event.Registration.addHandler(u);
}});
})();
(function(){var f="ready",d="qx.application",c="beforeunload",b="qx.core.Init",a="shutdown";
qx.Class.define(b,{statics:{getApplication:function(){return this.__cy||null;
},ready:function(){if(this.__cy){return;
}
if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var h=qx.core.Setting.get(d);
var i=qx.Class.getByName(h);

if(i){this.__cy=new i;
var g=new Date;
this.__cy.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-g)+"ms");
var g=new Date;
this.__cy.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-g)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+h);
}},__cz:function(e){var j=this.__cy;

if(j){e.setReturnValue(j.close());
}},__cA:function(){var k=this.__cy;

if(k){k.terminate();
}}},defer:function(l){qx.event.Registration.addListener(window,f,l.ready,l);
qx.event.Registration.addListener(window,a,l.__cA,l);
qx.event.Registration.addListener(window,c,l.__cz,l);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var a="qx.locale.MTranslation";
qx.Mixin.define(a,{members:{tr:function(b,c){var d=qx.locale.Manager;

if(d){return d.tr.apply(d,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(e,f,g,h){var i=qx.locale.Manager;

if(i){return i.trn.apply(i,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(j,k,l){var m=qx.locale.Manager;

if(m){return m.trc.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__cB:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__cB;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__cB=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(c){},terminate:function(){}},destruct:function(){this.__cB=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var g="demobrowser.Application",f="viewer",e="qx.debug",d="demobrowser/css/sourceview.css",c="script/demodata.json",b="on",a="demobrowser/css/style.css";
qx.Class.define(g,{extend:qx.application.Standalone,construct:function(){qx.application.Standalone.call(this);
qx.bom.Stylesheet.includeFile(a);
qx.bom.Stylesheet.includeFile(d);
},members:{main:function(){qx.application.Standalone.prototype.main.call(this);
if(qx.core.Variant.isSet(e,b)){qx.log.appender.Native;
qx.log.appender.Console;
}this.viewer=new demobrowser.DemoBrowser;
this.getRoot().add(this.viewer,{edge:0});
},finalize:function(){qx.application.Standalone.prototype.finalize.call(this);
this.viewer.dataLoader(c);
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var g="qx.debug",f="on",e="Cannot stop propagation on a non bubbling event: ",d="Invalid argument value 'cancelable'.",c="Cannot prevent default action on a non cancelable event: ",b="Invalid argument value 'canBubble'.",a="qx.event.type.Event";
qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(h,i){if(qx.core.Variant.isSet(g,f)){if(h!==undefined){qx.core.Assert.assertBoolean(h,b);
}
if(i!==undefined){qx.core.Assert.assertBoolean(i,d);
}}this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!h;
this._cancelable=!!i;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(j){if(j){var k=j;
}else{var k=qx.event.Pool.getInstance().getObject(this.constructor);
}k._type=this._type;
k._target=this._target;
k._currentTarget=this._currentTarget;
k._relatedTarget=this._relatedTarget;
k._originalTarget=this._originalTarget;
k._stopPropagation=this._stopPropagation;
k._bubbles=this._bubbles;
k._preventDefault=this._preventDefault;
k._cancelable=this._cancelable;
return k;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){if(qx.core.Variant.isSet(g,f)){this.assertTrue(this._bubbles,e+this.getType());
}this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){if(qx.core.Variant.isSet(g,f)){this.assertTrue(this._cancelable,c+this.getType());
}this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(l){this._type=l;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(m){this._eventPhase=m;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(n){this._target=n;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(o){this._currentTarget=o;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(p){this._relatedTarget=p;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(q){this._originalTarget=q;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(r){this._bubbles=r;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(s){this._cancelable=s;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cD:null,__cE:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);
this.__cD=b;
this.__cE=c;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__cD=this.__cD;
f.__cE=this.__cE;
return f;
},getData:function(){return this.__cD;
},getOldData:function(){return this.__cE;
}},destruct:function(){this.__cD=this.__cE=null;
}});
})();
(function(){var m="get",l="",k="[",h=".",g="last",f="change",d="]",c="Number",b="String",a="set",I="deepBinding",H="item",G="reset",F="qx.debug",E="' (",D="on",C="Boolean",B=") to the object '",A="Integer",z=" of object ",t="qx.event.type.Data",u="qx.data.SingleValueBinding",r="Binding property ",s="Can not remove the bindings for null object!",p="Binding from '",q="PositiveNumber",n=" not possible: No event available. ",o="PositiveInteger",v="Binding does not exist!",w=" is not an data (qx.event.type.Data) event on ",y=").",x="Date";
qx.Class.define(u,{statics:{DEBUG_ON:false,__cF:{},bind:function(J,K,L,M,N){var X=this.__cH(J,K,L,M,N);
var S=K.split(h);
var P=this.__cN(S);
var W=[];
var T=[];
var U=[];
var Q=[];
var R=J;
for(var i=0;i<S.length;i++){if(P[i]!==l){Q.push(f);
}else{Q.push(this.__cI(R,S[i]));
}W[i]=R;
if(i==S.length-1){if(P[i]!==l){var bb=P[i]===g?R.length-1:P[i];
var O=R.getItem(bb);
this.__cM(O,L,M,N,J);
U[i]=this.__cO(R,Q[i],L,M,N,P[i]);
}else{if(S[i]!=null&&R[m+qx.lang.String.firstUp(S[i])]!=null){var O=R[m+qx.lang.String.firstUp(S[i])]();
this.__cM(O,L,M,N,J);
}U[i]=this.__cO(R,Q[i],L,M,N);
}}else{var Y={index:i,propertyNames:S,sources:W,listenerIds:U,arrayIndexValues:P,targetObject:L,targetPropertyChain:M,options:N,listeners:T};
var V=qx.lang.Function.bind(this.__cG,this,Y);
T.push(V);
U[i]=R.addListener(Q[i],V);
}if(R[m+qx.lang.String.firstUp(S[i])]==null){R=null;
}else if(P[i]!==l){R=R[m+qx.lang.String.firstUp(S[i])](P[i]);
}else{R=R[m+qx.lang.String.firstUp(S[i])]();
}
if(!R){break;
}}var ba={type:I,listenerIds:U,sources:W,targetListenerIds:X.listenerIds,targets:X.targets};
this.__cP(ba,J,K,L,M);
return ba;
},__cG:function(bc){if(bc.options&&bc.options.onUpdate){bc.options.onUpdate(bc.sources[bc.index],bc.targetObject);
}for(var j=bc.index+1;j<bc.propertyNames.length;j++){var bg=bc.sources[j];
bc.sources[j]=null;

if(!bg){continue;
}bg.removeListenerById(bc.listenerIds[j]);
}var bg=bc.sources[bc.index];
for(var j=bc.index+1;j<bc.propertyNames.length;j++){if(bc.arrayIndexValues[j-1]!==l){bg=bg[m+qx.lang.String.firstUp(bc.propertyNames[j-1])](bc.arrayIndexValues[j-1]);
}else{bg=bg[m+qx.lang.String.firstUp(bc.propertyNames[j-1])]();
}bc.sources[j]=bg;
if(!bg){this.__cJ(bc.targetObject,bc.targetPropertyChain);
break;
}if(j==bc.propertyNames.length-1){if(qx.Class.implementsInterface(bg,qx.data.IListData)){var bh=bc.arrayIndexValues[j]===g?bg.length-1:bc.arrayIndexValues[j];
var be=bg.getItem(bh);
this.__cM(be,bc.targetObject,bc.targetPropertyChain,bc.options,bc.sources[bc.index]);
bc.listenerIds[j]=this.__cO(bg,f,bc.targetObject,bc.targetPropertyChain,bc.options,bc.arrayIndexValues[j]);
}else{if(bc.propertyNames[j]!=null&&bg[m+qx.lang.String.firstUp(bc.propertyNames[j])]!=null){var be=bg[m+qx.lang.String.firstUp(bc.propertyNames[j])]();
this.__cM(be,bc.targetObject,bc.targetPropertyChain,bc.options,bc.sources[bc.index]);
}var bf=this.__cI(bg,bc.propertyNames[j]);
bc.listenerIds[j]=this.__cO(bg,bf,bc.targetObject,bc.targetPropertyChain,bc.options);
}}else{if(bc.listeners[j]==null){var bd=qx.lang.Function.bind(this.__cG,this,bc);
bc.listeners.push(bd);
}if(qx.Class.implementsInterface(bg,qx.data.IListData)){var bf=f;
}else{var bf=this.__cI(bg,bc.propertyNames[j]);
}bc.listenerIds[j]=bg.addListener(bf,bc.listeners[j]);
}}},__cH:function(bi,bj,bk,bl,bm){var bq=bl.split(h);
var bo=this.__cN(bq);
var bv=[];
var bu=[];
var bs=[];
var br=[];
var bp=bk;
for(var i=0;i<bq.length-1;i++){if(bo[i]!==l){br.push(f);
}else{try{br.push(this.__cI(bp,bq[i]));
}catch(e){break;
}}bv[i]=bp;
var bt=function(){for(var j=i+1;j<bq.length-1;j++){var by=bv[j];
bv[j]=null;

if(!by){continue;
}by.removeListenerById(bs[j]);
}var by=bv[i];
for(var j=i+1;j<bq.length-1;j++){var bw=qx.lang.String.firstUp(bq[j-1]);
if(bo[j-1]!==l){var bz=bo[j-1]===g?by.getLength()-1:bo[j-1];
by=by[m+bw](bz);
}else{by=by[m+bw]();
}bv[j]=by;
if(bu[j]==null){bu.push(bt);
}if(qx.Class.implementsInterface(by,qx.data.IListData)){var bx=f;
}else{try{var bx=qx.data.SingleValueBinding.__cI(by,bq[j]);
}catch(e){break;
}}bs[j]=by.addListener(bx,bu[j]);
}qx.data.SingleValueBinding.updateTarget(bi,bj,bk,bl,bm);
};
bu.push(bt);
bs[i]=bp.addListener(br[i],bt);
var bn=qx.lang.String.firstUp(bq[i]);
if(bp[m+bn]==null){bp=null;
}else if(bo[i]!==l){bp=bp[m+bn](bo[i]);
}else{bp=bp[m+bn]();
}
if(!bp){break;
}}return {listenerIds:bs,targets:bv};
},updateTarget:function(bA,bB,bC,bD,bE){var bI=this.__cL(bA,bB);

if(bI!=null){var bK=bB.substring(bB.lastIndexOf(h)+1,bB.length);
if(bK.charAt(bK.length-1)==d){var bF=bK.substring(bK.lastIndexOf(k)+1,bK.length-1);
var bH=bK.substring(0,bK.lastIndexOf(k));
var bJ=bI[m+qx.lang.String.firstUp(bH)]();

if(bF==g){bF=bJ.length-1;
}
if(bJ!=null){var bG=bJ.getItem(bF);
}}else{var bG=bI[m+qx.lang.String.firstUp(bK)]();
}}bG=qx.data.SingleValueBinding.__cQ(bG,bC,bD,bE);
this.__cK(bC,bD,bG);
},__cI:function(bL,bM){var bN=this.__cR(bL,bM);
if(bN==null){if(qx.Class.supportsEvent(bL.constructor,bM)){bN=bM;
}else if(qx.Class.supportsEvent(bL.constructor,f+qx.lang.String.firstUp(bM))){bN=f+qx.lang.String.firstUp(bM);
}else{throw new qx.core.AssertionError(r+bM+z+bL+n);
}}return bN;
},__cJ:function(bO,bP){var bQ=this.__cL(bO,bP);

if(bQ!=null){var bR=bP.substring(bP.lastIndexOf(h)+1,bP.length);
if(bR.charAt(bR.length-1)==d){this.__cK(bO,bP,null);
return;
}if(bQ[G+qx.lang.String.firstUp(bR)]!=undefined){bQ[G+qx.lang.String.firstUp(bR)]();
}else{bQ[a+qx.lang.String.firstUp(bR)](null);
}}},__cK:function(bS,bT,bU){var bY=this.__cL(bS,bT);

if(bY!=null){var ca=bT.substring(bT.lastIndexOf(h)+1,bT.length);
if(ca.charAt(ca.length-1)==d){var bV=ca.substring(ca.lastIndexOf(k)+1,ca.length-1);
var bX=ca.substring(0,ca.lastIndexOf(k));
var bW=bY[m+qx.lang.String.firstUp(bX)]();

if(bV==g){bV=bW.length-1;
}
if(bW!=null){bW.setItem(bV,bU);
}}else{bY[a+qx.lang.String.firstUp(ca)](bU);
}}},__cL:function(cb,cc){var cf=cc.split(h);
var cg=cb;
for(var i=0;i<cf.length-1;i++){try{var ce=cf[i];
if(ce.indexOf(d)==ce.length-1){var cd=ce.substring(ce.indexOf(k)+1,ce.length-1);
ce=ce.substring(0,ce.indexOf(k));
}cg=cg[m+qx.lang.String.firstUp(ce)]();

if(cd!=null){if(cd==g){cd=cg.length-1;
}cg=cg.getItem(cd);
cd=null;
}}catch(ch){return null;
}}return cg;
},__cM:function(ci,cj,ck,cl,cm){ci=this.__cQ(ci,cj,ck,cl);
if(ci===undefined){this.__cJ(cj,ck);
}if(ci!==undefined){try{this.__cK(cj,ck,ci);
if(cl&&cl.onUpdate){cl.onUpdate(cm,cj,ci);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cl&&cl.onSetFail){cl.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+ci+" on "+cj+". Error message: "+e);
}}}},__cN:function(cn){var co=[];
for(var i=0;i<cn.length;i++){var name=cn[i];
if(qx.lang.String.endsWith(name,d)){var cp=name.substring(name.indexOf(k)+1,name.indexOf(d));
if(name.indexOf(d)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cp!==g){if(cp==l||isNaN(parseInt(cp,10))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(k)!=0){cn[i]=name.substring(0,name.indexOf(k));
co[i]=l;
co[i+1]=cp;
cn.splice(i+1,0,H);
i++;
}else{co[i]=cp;
cn.splice(i,1,H);
}}else{co[i]=l;
}}return co;
},__cO:function(cq,cr,cs,ct,cu,cv){if(qx.core.Variant.isSet(F,D)){var cw=qx.Class.getEventType(cq.constructor,cr);
qx.core.Assert.assertEquals(t,cw,cr+w+cq+h);
}var cy=function(cz,e){if(cz!==l){if(cz===g){cz=cq.length-1;
}var cC=cq.getItem(cz);
if(cC===undefined){qx.data.SingleValueBinding.__cJ(cs,ct);
}var cA=e.getData().start;
var cB=e.getData().end;

if(cz<cA||cz>cB){return;
}}else{var cC=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+cq+" by "+cr+" to "+cs+" ("+ct+")");
qx.log.Logger.debug("Data before conversion: "+cC);
}cC=qx.data.SingleValueBinding.__cQ(cC,cs,ct,cu);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+cC);
}try{if(cC!==undefined){qx.data.SingleValueBinding.__cK(cs,ct,cC);
}else{qx.data.SingleValueBinding.__cJ(cs,ct);
}if(cu&&cu.onUpdate){cu.onUpdate(cq,cs,cC);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cu&&cu.onSetFail){cu.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cC+" on "+cs+". Error message: "+e);
}}};
if(!cv){cv=l;
}cy=qx.lang.Function.bind(cy,cq,cv);
var cx=cq.addListener(cr,cy);
return cx;
},__cP:function(cD,cE,cF,cG,cH){if(this.__cF[cE.toHashCode()]===undefined){this.__cF[cE.toHashCode()]=[];
}this.__cF[cE.toHashCode()].push([cD,cE,cF,cG,cH]);
},__cQ:function(cI,cJ,cK,cL){if(cL&&cL.converter){var cN;

if(cJ.getModel){cN=cJ.getModel();
}return cL.converter(cI,cN);
}else{var cP=this.__cL(cJ,cK);
var cQ=cK.substring(cK.lastIndexOf(h)+1,cK.length);
if(cP==null){return cI;
}var cO=qx.Class.getPropertyDefinition(cP.constructor,cQ);
var cM=cO==null?l:cO.check;
return this.__cS(cI,cM);
}},__cR:function(cR,cS){var cT=qx.Class.getPropertyDefinition(cR.constructor,cS);

if(cT==null){return null;
}return cT.event;
},__cS:function(cU,cV){var cW=qx.lang.Type.getClass(cU);
if((cW==c||cW==b)&&(cV==A||cV==o)){cU=parseInt(cU,10);
}if((cW==C||cW==c||cW==x)&&cV==b){cU=cU+l;
}if((cW==c||cW==b)&&(cV==c||cV==q)){cU=parseFloat(cU);
}return cU;
},removeBindingFromObject:function(cX,cY){if(cY.type==I){for(var i=0;i<cY.sources.length;i++){if(cY.sources[i]){cY.sources[i].removeListenerById(cY.listenerIds[i]);
}}for(var i=0;i<cY.targets.length;i++){if(cY.targets[i]){cY.targets[i].removeListenerById(cY.targetListenerIds[i]);
}}}else{cX.removeListenerById(cY);
}var da=this.__cF[cX.toHashCode()];
if(da!=undefined){for(var i=0;i<da.length;i++){if(da[i][0]==cY){qx.lang.Array.remove(da,da[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(db){if(qx.core.Variant.isSet(F,D)){qx.core.Assert.assertNotNull(db,s);
}var dc=this.__cF[db.toHashCode()];

if(dc!=undefined){for(var i=dc.length-1;i>=0;i--){this.removeBindingFromObject(db,dc[i][0]);
}}},getAllBindingsForObject:function(dd){if(this.__cF[dd.toHashCode()]===undefined){this.__cF[dd.toHashCode()]=[];
}return this.__cF[dd.toHashCode()];
},removeAllBindings:function(){for(var df in this.__cF){var de=qx.core.ObjectRegistry.fromHashCode(df);
if(de==null){delete this.__cF[df];
continue;
}this.removeAllBindingsForObject(de);
}this.__cF={};
},getAllBindings:function(){return this.__cF;
},showBindingInLog:function(dg,dh){var dj;
for(var i=0;i<this.__cF[dg.toHashCode()].length;i++){if(this.__cF[dg.toHashCode()][i][0]==dh){dj=this.__cF[dg.toHashCode()][i];
break;
}}
if(dj===undefined){var di=v;
}else{var di=p+dj[1]+E+dj[2]+B+dj[3]+E+dj[4]+y;
}qx.log.Logger.debug(di);
},showAllBindingsInLog:function(){for(var dl in this.__cF){var dk=qx.core.ObjectRegistry.fromHashCode(dl);

for(var i=0;i<this.__cF[dl].length;i++){this.showBindingInLog(dk,this.__cF[dl][i][0]);
}}}}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__cT=c;
this.__cU=d||b;
this.__cV=e===undefined?-1:e;
},members:{__cT:null,__cU:null,__cV:null,toString:function(){return this.__cT;
},getUri:function(){return this.__cU;
},getLineNumber:function(){return this.__cV;
}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);
this.__cW={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__cW:null,getObject:function(d){if(this.$$disposed){return new d;
}
if(!d){throw new Error("Class needs to be defined!");
}var e=null;
var f=this.__cW[d.classname];

if(f){e=f.pop();
}
if(e){e.$$pooled=false;
}else{e=new d;
}return e;
},poolObject:function(g){if(!this.__cW){return;
}var h=g.classname;
var j=this.__cW[h];

if(g.$$pooled){throw new Error("Object is already pooled: "+g);
}
if(!j){this.__cW[h]=j=[];
}if(j.length>this.getSize()){if(g.destroy){g.destroy();
}else{g.dispose();
}return;
}g.$$pooled=true;
j.push(g);
}},destruct:function(){var n=this.__cW;
var k,m,i,l;

for(k in n){m=n[k];

for(i=0,l=m.length;i<l;i++){m[i].dispose();
}}delete this.__cW;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeObjects:function(b,c,d){var name;

for(var i=0,l=c.length;i<l;i++){name=c[i];

if(b[name]==null||!b.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(b[name].dispose){if(!d&&b[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{b[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}b[name]=null;
}},disposeArray:function(e,f){var h=e[f];

if(!h){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{var g;

for(var i=h.length-1;i>=0;i--){g=h[i];

if(g){g.dispose();
}}}catch(j){throw new Error("The array field: "+f+" of object: "+e+" has non disposable entries: "+j);
}h.length=0;
e[f]=null;
},disposeMap:function(k,m){var o=k[m];

if(!o){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{var n;

for(var p in o){n=o[p];

if(o.hasOwnProperty(p)&&n){n.dispose();
}}}catch(q){throw new Error("The map field: "+m+" of object: "+k+" has non disposable entries: "+q);
}k[m]=null;
},disposeTriggeredBy:function(r,s){var t=s.dispose;
s.dispose=function(){t.call(s);
r.dispose();
};
}}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);
},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__cX:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__cY:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));
};
},__da:function(){var L=qx.lang.Generics.__cX;

for(var P in L){var N=window[P];
var M=L[P];

for(var i=0,l=M.length;i<l;i++){var O=M[i];

if(!N[O]){N[O]=qx.lang.Generics.__cY(N,O);
}}}}},defer:function(Q){Q.__da();
}});
})();
(function(){var a="qx.event.type.Native";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d,e,f){qx.event.type.Event.prototype.init.call(this,e,f);
this._target=c||qx.bom.Event.getTarget(b);
this._relatedTarget=d||qx.bom.Event.getRelatedTarget(b);

if(b.timeStamp){this._timeStamp=b.timeStamp;
}this._native=b;
this._returnValue=null;
return this;
},clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);
var i={};
h._native=this._cloneNativeEvent(this._native,i);
h._returnValue=this._returnValue;
return h;
},_cloneNativeEvent:function(j,k){k.preventDefault=qx.lang.Function.empty;
return k;
},preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(l){this._returnValue=l;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var n="iPod",m="Win32",l="",k="Win64",j="Linux",i="BSD",h="Macintosh",g="iPhone",f="Windows",e="qx.bom.client.Platform",b="iPad",d="X11",c="MacIntel",a="MacPPC";
qx.Class.define(e,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__db:function(){var o=navigator.platform;
if(o==null||o===l){o=navigator.userAgent;
}
if(o.indexOf(f)!=-1||o.indexOf(m)!=-1||o.indexOf(k)!=-1){this.WIN=true;
this.NAME="win";
}else if(o.indexOf(h)!=-1||o.indexOf(a)!=-1||o.indexOf(c)!=-1||o.indexOf(n)!=-1||o.indexOf(g)!=-1||o.indexOf(b)!=-1){this.MAC=true;
this.NAME="mac";
}else if(o.indexOf(d)!=-1||o.indexOf(j)!=-1||o.indexOf(i)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(p){p.__db();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",I=")",H="winxp",G="freebsd",F="sunos",E="SV1",D="|",C="nintendods",B="winnt4",A="wince",z="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="iPad",v="symbian",u="win7",x="g",w="qx.bom.client.System",y=" Mobile/";
qx.Bootstrap.define(w,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WIN7:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,IPAD:false,UNKNOWN_SYSTEM:false,__dc:{"Windows NT 6.1":u,"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":H,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":B,"Win 9x 4.90":z,"Windows CE":A,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":G,"NetBSD":m,"OpenBSD":k,"SunOS":F,"Symbian System":v,"Nitro":C,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__dd:function(){var L=navigator.userAgent;
var K=[];

for(var J in this.__dc){K.push(J);
}var M=new RegExp(l+K.join(D).replace(/\./g,r)+I,x);

if(!M.test(L)){this.UNKNOWN_SYSTEM=true;

if(!qx.bom.client.Platform.UNKNOWN_PLATFORM){if(qx.bom.client.Platform.UNIX){this.NAME="linux";
this.LINUX=true;
}else if(qx.bom.client.Platform.MAC){this.NAME="osx5";
this.OSX=true;
}else{this.NAME="winxp";
this.WINXP=true;
}}else{this.NAME="winxp";
this.WINXP=true;
}return;
}
if(qx.bom.client.Engine.WEBKIT&&RegExp(y).test(navigator.userAgent)){if(RegExp(t).test(navigator.userAgent)){this.IPAD=true;
this.NAME="ipad";
}else{this.IPHONE=true;
this.NAME="iphone";
}}else{this.NAME=this.__dc[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(L.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&L.indexOf(E)!==-1){this.SP2=true;
}}}}},defer:function(N){N.__dd();
}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(g,h){var k=null;
var n=null;
var q=null;
var r=null;
var m=null;

if(g){k=g.meta.color||null;
n=g.meta.decoration||null;
q=g.meta.font||null;
r=g.meta.icon||null;
m=g.meta.appearance||null;
}var o=qx.theme.manager.Color.getInstance();
var p=qx.theme.manager.Decoration.getInstance();
var i=qx.theme.manager.Font.getInstance();
var l=qx.theme.manager.Icon.getInstance();
var j=qx.theme.manager.Appearance.getInstance();
o.setTheme(k);
p.setTheme(n);
i.setTheme(q);
l.setTheme(r);
j.setTheme(m);
},initialize:function(){var t=qx.core.Setting;
var s,u;
s=t.get(e);

if(s){u=qx.Theme.getByName(s);

if(!u){throw new Error("The theme to use is not available: "+s);
}this.setTheme(u);
}}},settings:{"qx.theme":c}});
})();
(function(){var b="qx.util.ValueManager",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(c){return this._dynamic[c];
},isDynamic:function(d){return !!this._dynamic[d];
},resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];
}return e;
},_setDynamic:function(f){this._dynamic=f;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(g){var h={};

if(g){var i=g.colors;
var j=qx.util.ColorUtil;
var k;

for(var l in i){k=i[l];

if(typeof k===b){if(!j.isCssString(k)){throw new Error("Could not parse color: "+k);
}}else if(k instanceof Array){k=j.rgbToRgbString(k);
}else{throw new Error("Could not parse color: "+k);
}h[l]=k;
}}this._setDynamic(h);
},resolve:function(m){var p=this._dynamic;
var n=p[m];

if(n){return n;
}var o=this.getTheme();

if(o!==null&&o.colors[m]){return p[m]=o.colors[m];
}return m;
},isDynamic:function(q){var s=this._dynamic;

if(q&&(s[q]!==undefined)){return true;
}var r=this.getTheme();

if(r!==null&&q&&(r.colors[q]!==undefined)){s[q]=r.colors[q];
return true;
}return false;
}}});
})();
(function(){var h=",",e="rgb(",d=")",c="qx.theme.manager.Color",a="qx.util.ColorUtil";
qx.Class.define(a,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(j){return this.NAMED[j]!==undefined;
},isSystemColor:function(k){return this.SYSTEM[k]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(c);
},isThemedColor:function(l){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(l);
},stringToRgb:function(m){if(this.supportsThemes()&&this.isThemedColor(m)){var m=qx.theme.manager.Color.getInstance().resolveDynamic(m);
}
if(this.isNamedColor(m)){return this.NAMED[m];
}else if(this.isSystemColor(m)){throw new Error("Could not convert system colors to RGB: "+m);
}else if(this.isRgbString(m)){return this.__de();
}else if(this.isHex3String(m)){return this.__dg();
}else if(this.isHex6String(m)){return this.__dh();
}throw new Error("Could not parse color: "+m);
},cssStringToRgb:function(n){if(this.isNamedColor(n)){return this.NAMED[n];
}else if(this.isSystemColor(n)){throw new Error("Could not convert system colors to RGB: "+n);
}else if(this.isRgbString(n)){return this.__de();
}else if(this.isRgbaString(n)){return this.__df();
}else if(this.isHex3String(n)){return this.__dg();
}else if(this.isHex6String(n)){return this.__dh();
}throw new Error("Could not parse color: "+n);
},stringToRgbString:function(o){return this.rgbToRgbString(this.stringToRgb(o));
},rgbToRgbString:function(s){return e+s[0]+h+s[1]+h+s[2]+d;
},rgbToHexString:function(u){return (qx.lang.String.pad(u[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(u[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(u[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(v){return this.isThemedColor(v)||this.isNamedColor(v)||this.isHex3String(v)||this.isHex6String(v)||this.isRgbString(v);
},isCssString:function(w){return this.isSystemColor(w)||this.isNamedColor(w)||this.isHex3String(w)||this.isHex6String(w)||this.isRgbString(w);
},isHex3String:function(x){return this.REGEXP.hex3.test(x);
},isHex6String:function(y){return this.REGEXP.hex6.test(y);
},isRgbString:function(z){return this.REGEXP.rgb.test(z);
},isRgbaString:function(A){return this.REGEXP.rgba.test(A);
},__de:function(){var D=parseInt(RegExp.$1,10);
var C=parseInt(RegExp.$2,10);
var B=parseInt(RegExp.$3,10);
return [D,C,B];
},__df:function(){var G=parseInt(RegExp.$1,10);
var F=parseInt(RegExp.$2,10);
var E=parseInt(RegExp.$3,10);
return [G,F,E];
},__dg:function(){var J=parseInt(RegExp.$1,16)*17;
var I=parseInt(RegExp.$2,16)*17;
var H=parseInt(RegExp.$3,16)*17;
return [J,I,H];
},__dh:function(){var M=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var L=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var K=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [M,L,K];
},hex3StringToRgb:function(N){if(this.isHex3String(N)){return this.__dg(N);
}throw new Error("Invalid hex3 value: "+N);
},hex6StringToRgb:function(O){if(this.isHex6String(O)){return this.__dh(O);
}throw new Error("Invalid hex6 value: "+O);
},hexStringToRgb:function(P){if(this.isHex3String(P)){return this.__dg(P);
}
if(this.isHex6String(P)){return this.__dh(P);
}throw new Error("Invalid hex value: "+P);
},rgbToHsb:function(Q){var S,T,V;
var bc=Q[0];
var Y=Q[1];
var R=Q[2];
var bb=(bc>Y)?bc:Y;

if(R>bb){bb=R;
}var U=(bc<Y)?bc:Y;

if(R<U){U=R;
}V=bb/255.0;

if(bb!=0){T=(bb-U)/bb;
}else{T=0;
}
if(T==0){S=0;
}else{var X=(bb-bc)/(bb-U);
var ba=(bb-Y)/(bb-U);
var W=(bb-R)/(bb-U);

if(bc==bb){S=W-ba;
}else if(Y==bb){S=2.0+X-W;
}else{S=4.0+ba-X;
}S=S/6.0;

if(S<0){S=S+1.0;
}}return [Math.round(S*360),Math.round(T*100),Math.round(V*100)];
},hsbToRgb:function(bd){var i,f,p,q,t;
var be=bd[0]/360;
var bf=bd[1]/100;
var bg=bd[2]/100;

if(be>=1.0){be%=1.0;
}
if(bf>1.0){bf=1.0;
}
if(bg>1.0){bg=1.0;
}var bh=Math.floor(255*bg);
var bi={};

if(bf==0.0){bi.red=bi.green=bi.blue=bh;
}else{be*=6.0;
i=Math.floor(be);
f=be-i;
p=Math.floor(bh*(1.0-bf));
q=Math.floor(bh*(1.0-(bf*f)));
t=Math.floor(bh*(1.0-(bf*(1.0-f))));

switch(i){case 0:bi.red=bh;
bi.green=t;
bi.blue=p;
break;
case 1:bi.red=q;
bi.green=bh;
bi.blue=p;
break;
case 2:bi.red=p;
bi.green=bh;
bi.blue=t;
break;
case 3:bi.red=p;
bi.green=q;
bi.blue=bh;
break;
case 4:bi.red=t;
bi.green=p;
bi.blue=bh;
break;
case 5:bi.red=bh;
bi.green=p;
bi.blue=q;
break;
}}return [bi.red,bi.green,bi.blue];
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var h="object",g="_applyTheme",f="__di",e="qx.theme.manager.Decoration",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:g,event:c}},members:{__di:null,resolve:function(i){if(!i){return null;
}
if(typeof i===h){return i;
}var l=this.getTheme();

if(!l){return null;
}var l=this.getTheme();

if(!l){return null;
}var m=this.__di;

if(!m){m=this.__di={};
}var j=m[i];

if(j){return j;
}var k=l.decorations[i];

if(!k){return null;
}var n=k.decorator;

if(n==null){throw new Error("Missing definition of which decorator to use in entry: "+i+"!");
}return m[i]=(new n).set(k.style);
},isValidPropertyValue:function(o){if(typeof o===b){return this.isDynamic(o);
}else if(typeof o===h){var p=o.constructor;
return qx.Class.hasInterface(p,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(q){if(!q){return false;
}var r=this.getTheme();

if(!r){return false;
}return !!r.decorations[q];
},_applyTheme:function(s,t){var v=qx.util.AliasManager.getInstance();

if(t){for(var u in t.aliases){v.remove(u);
}}
if(s){for(var u in s.aliases){v.add(u,s.aliases[u]);
}}
if(!s){this.__di={};
}}},destruct:function(){this._disposeMap(f);
}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(b,c,d){},tint:function(e,f){},getInsets:function(){}}});
})();
(function(){var j="/",i="0",h="qx/static",g="http://",f="https://",e="file://",d="qx.util.AliasManager",c="singleton",b=".",a="static";
qx.Class.define(d,{type:c,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);
this.__dj={};
this.add(a,h);
},members:{__dj:null,_preprocess:function(k){var n=this._getDynamic();

if(n[k]===false){return k;
}else if(n[k]===undefined){if(k.charAt(0)===j||k.charAt(0)===b||k.indexOf(g)===0||k.indexOf(f)===i||k.indexOf(e)===0){n[k]=false;
return k;
}
if(this.__dj[k]){return this.__dj[k];
}var m=k.substring(0,k.indexOf(j));
var l=this.__dj[m];

if(l!==undefined){n[k]=l+k.substring(m.length);
}}return k;
},add:function(o,p){this.__dj[o]=p;
var r=this._getDynamic();
for(var q in r){if(q.substring(0,q.indexOf(j))===o){r[q]=p+q.substring(o.length);
}}},remove:function(s){delete this.__dj[s];
},resolve:function(t){var u=this._getDynamic();

if(t!=null){t=this._preprocess(t);
}return u[t]||t;
}},destruct:function(){this.__dj=null;
}});
})();
(function(){var e="qx.theme.manager.Font",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{resolveDynamic:function(f){var g=this._dynamic;
return f instanceof qx.bom.Font?f:g[f];
},resolve:function(h){var k=this._dynamic;
var i=k[h];

if(i){return i;
}var j=this.getTheme();

if(j!==null&&j.fonts[h]){return k[h]=(new qx.bom.Font).set(j.fonts[h]);
}return h;
},isDynamic:function(l){var n=this._dynamic;

if(l&&(l instanceof qx.bom.Font||n[l]!==undefined)){return true;
}var m=this.getTheme();

if(m!==null&&l&&m.fonts[l]){n[l]=(new qx.bom.Font).set(m.fonts[l]);
return true;
}return false;
},__dk:function(o,p){if(o[p].include){var q=o[o[p].include];
o[p].include=null;
delete o[p].include;
o[p]=qx.lang.Object.mergeWith(o[p],q,false);
this.__dk(o,p);
}},_applyTheme:function(r){var s=this._getDynamic();

for(var v in s){if(s[v].themed){s[v].dispose();
delete s[v];
}}
if(r){var t=r.fonts;
var u=qx.bom.Font;

for(var v in t){if(t[v].include&&t[t[v].include]){this.__dk(t,v);
}s[v]=(new u).set(t[v]);
s[v].themed=true;
}}this._setDynamic(s);
}}});
})();
(function(){var k="",j="underline",h="Boolean",g="px",f='"',e="italic",d="normal",c="bold",b="_applyItalic",a="_applyBold",x="Integer",w="_applyFamily",v="_applyLineHeight",u="Array",t="overline",s="line-through",r="qx.bom.Font",q="Number",p="_applyDecoration",o=" ",m="_applySize",n=",";
qx.Class.define(r,{extend:qx.core.Object,construct:function(y,z){qx.core.Object.call(this);

if(y!==undefined){this.setSize(y);
}
if(z!==undefined){this.setFamily(z);
}},statics:{fromString:function(A){var E=new qx.bom.Font();
var C=A.split(/\s+/);
var name=[];
var D;

for(var i=0;i<C.length;i++){switch(D=C[i]){case c:E.setBold(true);
break;
case e:E.setItalic(true);
break;
case j:E.setDecoration(j);
break;
default:var B=parseInt(D,10);

if(B==D||qx.lang.String.contains(D,g)){E.setSize(B);
}else{name.push(D);
}break;
}}
if(name.length>0){E.setFamily(name);
}return E;
},fromConfig:function(F){var G=new qx.bom.Font;
G.set(F);
return G;
},__dl:{fontFamily:k,fontSize:k,fontWeight:k,fontStyle:k,textDecoration:k,lineHeight:1.2},getDefaultStyles:function(){return this.__dl;
}},properties:{size:{check:x,nullable:true,apply:m},lineHeight:{check:q,nullable:true,apply:v},family:{check:u,nullable:true,apply:w},bold:{check:h,nullable:true,apply:a},italic:{check:h,nullable:true,apply:b},decoration:{check:[j,s,t],nullable:true,apply:p}},members:{__dm:null,__dn:null,__do:null,__dp:null,__dq:null,__dr:null,_applySize:function(H,I){this.__dm=H===null?null:H+g;
},_applyLineHeight:function(J,K){this.__dr=J===null?null:J;
},_applyFamily:function(L,M){var N=k;

for(var i=0,l=L.length;i<l;i++){if(L[i].indexOf(o)>0){N+=f+L[i]+f;
}else{N+=L[i];
}
if(i!==l-1){N+=n;
}}this.__dn=N;
},_applyBold:function(O,P){this.__do=O===null?null:O?c:d;
},_applyItalic:function(Q,R){this.__dp=Q===null?null:Q?e:d;
},_applyDecoration:function(S,T){this.__dq=S===null?null:S;
},getStyles:function(){return {fontFamily:this.__dn,fontSize:this.__dm,fontWeight:this.__do,fontStyle:this.__dp,textDecoration:this.__dq,lineHeight:this.__dr};
}}});
})();
(function(){var g="qx.bom.client.Feature",f="CSS1Compat",d="label",c="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",b="input",a="pointerEvents";
qx.Bootstrap.define(g,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:!!window.CanvasRenderingContext2D,VML:false,XPATH:!!document.evaluate,AIR:navigator.userAgent.indexOf("adobeair")!==-1,GEARS:!!(window.google&&window.google.gears),SSL:window.location.protocol==="https:",ECMA_OBJECT_COUNT:(({}).__count__==0),CSS_POINTER_EVENTS:false,XUL:false,CSS_TEXT_OVERFLOW:("textOverflow" in document.documentElement.style||"OTextOverflow" in document.documentElement.style),HTML5_CLASSLIST:!!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)==="DOMTokenList"),TOUCH:("ontouchstart" in window),PLACEHOLDER:false,__ds:function(){this.QUIRKS_MODE=this.__dt();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.VML=qx.bom.client.Engine.MSHTML;

try{document.createElementNS(c,d);
this.XUL=true;
}catch(e){this.XUL=false;
}var i=document.createElement(b);
this.PLACEHOLDER="placeholder" in i;
if(a in document.documentElement.style){if(qx.bom.client.Engine.OPERA){this.CSS_POINTER_EVENTS=false;
}else{this.CSS_POINTER_EVENTS=true;
}}},__dt:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==f;
}}},defer:function(h){h.__ds();
}});
})();
(function(){var m="qx.debug",k="on",j="Invalid argument 'map'",h="Invalid argument 'minLength'",g="Invalid argument 'source'",f="Invalid argument 'target'",e="function",d="Invalid argument 'array'",c="qx.lang.Object",b="undefined",a="object";
qx.Class.define(c,{statics:{empty:function(n){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(n,j);
}
for(var o in n){if(n.hasOwnProperty(o)){delete n[o];
}}},isEmpty:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(p){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(p,j);
}return p.__count__===0;
}:
function(q){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(q,j);
}
for(var r in q){return false;
}return true;
},hasMinLength:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(s,t){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(s,j);
qx.core.Assert&&qx.core.Assert.assertInteger(t,h);
}return s.__count__>=t;
}:
function(u,v){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(u,j);
qx.core.Assert&&qx.core.Assert.assertInteger(v,h);
}
if(v<=0){return true;
}var length=0;

for(var w in u){if((++length)>=v){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(x){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(x,j);
}var z=[];
var y=this.getKeys(x);

for(var i=0,l=y.length;i<l;i++){z.push(x[y[i]]);
}return z;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(A,B){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(A,f);
qx.core.Assert&&qx.core.Assert.assertMap(B,g);
}return qx.lang.Object.mergeWith(A,B,false);
},merge:function(C,D){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(C,f);
}var E=arguments.length;

for(var i=1;i<E;i++){qx.lang.Object.mergeWith(C,arguments[i]);
}return C;
},clone:function(F){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(F,g);
}var G={};

for(var H in F){G[H]=F[H];
}return G;
},invert:function(I){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(I,j);
}var J={};

for(var K in I){J[I[K].toString()]=K;
}return J;
},getKeyFromValue:function(L,M){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(L,j);
}
for(var N in L){if(L.hasOwnProperty(N)&&L[N]===M){return N;
}}return null;
},contains:function(O,P){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(O,j);
}return this.getKeyFromValue(O,P)!==null;
},select:function(Q,R){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(R,j);
}return R[Q];
},fromArray:function(S){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertArray(S,d);
}var T={};

for(var i=0,l=S.length;i<l;i++){if(qx.core.Variant.isSet(m,k)){switch(typeof S[i]){case a:case e:case b:throw new Error("Could not convert complex objects like "+S[i]+" at array index "+i+" to map syntax");
}}T[S[i].toString()]=true;
}return T;
}}});
})();
(function(){var e="qx.theme.manager.Icon",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{_applyTheme:function(f,g){var i=qx.util.AliasManager.getInstance();

if(g){for(var h in g.aliases){i.remove(h);
}}
if(f){for(var h in f.aliases){i.add(h,f.aliases[h]);
}}}}});
})();
(function(){var h="string",g="_applyTheme",f="qx.theme.manager.Appearance",e=":",d="Theme",c="changeTheme",b="/",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__du={};
this.__dv={};
},properties:{theme:{check:d,nullable:true,event:c,apply:g}},members:{__dw:{},__du:null,__dv:null,_applyTheme:function(j,k){this.__dv={};
this.__du={};
},__dx:function(l,m,n){var s=m.appearances;
var v=s[l];

if(!v){var w=b;
var p=[];
var u=l.split(w);
var t;

while(!v&&u.length>0){p.unshift(u.pop());
var q=u.join(w);
v=s[q];

if(v){t=v.alias||v;

if(typeof t===h){var r=t+w+p.join(w);
return this.__dx(r,m,n);
}}}for(var i=0;i<p.length-1;i++){p.shift();
var q=p.join(w);
var o=this.__dx(q,m);

if(o){return o;
}}if(n!=null){return this.__dx(n,m);
}return null;
}else if(typeof v===h){return this.__dx(v,m,n);
}else if(v.include&&!v.style){return this.__dx(v.include,m,n);
}return l;
},styleFrom:function(x,y,z,A){if(!z){z=this.getTheme();
}var G=this.__dv;
var B=G[x];

if(!B){B=G[x]=this.__dx(x,z,A);
}var L=z.appearances[B];

if(!L){this.warn("Missing appearance: "+x);
return null;
}if(!L.style){return null;
}var M=B;

if(y){var N=L.$$bits;

if(!N){N=L.$$bits={};
L.$$length=0;
}var E=0;

for(var H in y){if(!y[H]){continue;
}
if(N[H]==null){N[H]=1<<L.$$length++;
}E+=N[H];
}if(E>0){M+=e+E;
}}var F=this.__du;

if(F[M]!==undefined){return F[M];
}if(!y){y=this.__dw;
}var J;
if(L.include||L.base){var D=L.style(y);
var C;

if(L.include){C=this.styleFrom(L.include,y,z,A);
}J={};
if(L.base){var I=this.styleFrom(B,y,L.base,A);

if(L.include){for(var K in I){if(!C.hasOwnProperty(K)&&!D.hasOwnProperty(K)){J[K]=I[K];
}}}else{for(var K in I){if(!D.hasOwnProperty(K)){J[K]=I[K];
}}}}if(L.include){for(var K in C){if(!D.hasOwnProperty(K)){J[K]=C[K];
}}}for(var K in D){J[K]=D[K];
}}else{J=L.style(y);
}return F[M]=J||null;
}},destruct:function(){this.__du=this.__dv=null;
}});
})();
(function(){var u="object",t="qx.debug",s="Theme",r="widgets",q="undefined",p="fonts",o="string",n="colors",m="decorations",k="on",d="meta",j="appearances",g="borders",c="icons",b="other",f="qx.Theme",e="]",h="[Theme ";
qx.Bootstrap.define(f,{statics:{define:function(name,v){if(!v){var v={};
}v.include=this.__dy(v.include);
v.patch=this.__dy(v.patch);
if(qx.core.Variant.isSet(t,k)){this.__dF(name,v);
}var w={$$type:s,name:name,title:v.title,toString:this.genericToString};
if(v.extend){w.supertheme=v.extend;
}w.basename=qx.Bootstrap.createNamespace(name,w);
this.__dB(w,v);
this.__dz(w,v);
this.$$registry[name]=w;
for(var i=0,a=v.include,l=a.length;i<l;i++){this.include(w,a[i]);
}
for(var i=0,a=v.patch,l=a.length;i<l;i++){this.patch(w,a[i]);
}},__dy:function(x){if(!x){return [];
}
if(qx.Bootstrap.isArray(x)){return x;
}else{return [x];
}},__dz:function(y,z){var A=z.aliases||{};

if(z.extend&&z.extend.aliases){qx.Bootstrap.objectMergeWith(A,z.extend.aliases,false);
}y.aliases=A;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},genericToString:function(){return h+this.name+e;
},__dA:function(B){for(var i=0,C=this.__dC,l=C.length;i<l;i++){if(B[C[i]]){return C[i];
}}},__dB:function(D,E){var H=this.__dA(E);
if(E.extend&&!H){H=E.extend.type;
}D.type=H||b;
if(!H){return;
}var J=function(){};
if(E.extend){J.prototype=new E.extend.$$clazz;
}var I=J.prototype;
var G=E[H];
for(var F in G){I[F]=G[F];
if(I[F].base){if(qx.core.Variant.isSet(t,k)){if(!E.extend){throw new Error("Found base flag in entry '"+F+"' of theme '"+E.name+"'. Base flags are not allowed for themes without a valid super theme!");
}}I[F].base=E.extend;
}}D.$$clazz=J;
D[H]=new J;
},$$registry:{},__dC:[n,g,m,p,c,r,j,d],__dD:qx.core.Variant.select(t,{"on":{"title":o,"aliases":u,"type":o,"extend":u,"colors":u,"borders":u,"decorations":u,"fonts":u,"icons":u,"widgets":u,"appearances":u,"meta":u,"include":u,"patch":u},"default":null}),__dE:qx.core.Variant.select(t,{"on":{"color":u,"border":u,"decoration":u,"font":u,"icon":u,"appearance":u,"widget":u},"default":null}),__dF:qx.core.Variant.select(t,{"on":function(name,K){var P=this.__dD;

for(var O in K){if(P[O]===undefined){throw new Error('The configuration key "'+O+'" in theme "'+name+'" is not allowed!');
}
if(K[O]==null){throw new Error('Invalid key "'+O+'" in theme "'+name+'"! The value is undefined/null!');
}
if(P[O]!==null&&typeof K[O]!==P[O]){throw new Error('Invalid type of key "'+O+'" in theme "'+name+'"! The type of the key must be "'+P[O]+'"!');
}}var N=[n,g,m,p,c,r,j,d];

for(var i=0,l=N.length;i<l;i++){var O=N[i];

if(K[O]!==undefined&&(K[O] instanceof Array||K[O] instanceof RegExp||K[O] instanceof Date||K[O].classname!==undefined)){throw new Error('Invalid key "'+O+'" in theme "'+name+'"! The value needs to be a map!');
}}var L=0;

for(var i=0,l=N.length;i<l;i++){var O=N[i];

if(K[O]){L++;
}
if(L>1){throw new Error("You can only define one theme category per file! Invalid theme: "+name);
}}if(!K.extend&&L===0){throw new Error("You must define at least one entry in your theme configuration :"+name);
}if(K.meta){var M;

for(var O in K.meta){M=K.meta[O];

if(this.__dE[O]===undefined){throw new Error('The key "'+O+'" is not allowed inside a meta theme block.');
}
if(typeof M!==this.__dE[O]){throw new Error('The type of the key "'+O+'" inside the meta block is wrong.');
}
if(!(typeof M===u&&M!==null&&M.$$type===s)){throw new Error('The content of a meta theme must reference to other themes. The value for "'+O+'" in theme "'+name+'" is invalid: '+M);
}}}if(K.extend&&K.extend.$$type!==s){throw new Error('Invalid extend in theme "'+name+'": '+K.extend);
}if(K.include){for(var i=0,l=K.include.length;i<l;i++){if(typeof (K.include[i])==q||K.include[i].$$type!==s){throw new Error('Invalid include in theme "'+name+'": '+K.include[i]);
}}}if(K.patch){for(var i=0,l=K.patch.length;i<l;i++){if(typeof (K.patch[i])==q||K.patch[i].$$type!==s){throw new Error('Invalid patch in theme "'+name+'": '+K.patch[i]);
}}}},"default":function(){}}),patch:function(Q,R){var T=this.__dA(R);

if(T!==this.__dA(Q)){throw new Error("The mixins '"+Q.name+"' are not compatible '"+R.name+"'!");
}var S=R[T];
var U=Q.$$clazz.prototype;

for(var V in S){U[V]=S[V];
}},include:function(W,X){var ba=X.type;

if(ba!==W.type){throw new Error("The mixins '"+W.name+"' are not compatible '"+X.name+"'!");
}var Y=X[ba];
var bb=W.$$clazz.prototype;

for(var bc in Y){if(bb[bc]!==undefined){continue;
}bb[bc]=Y[bc];
}}}});
})();
(function(){var p="Boolean",o="focusout",n="interval",m="mouseover",l="mouseout",k="mousemove",j="widget",i="__dJ",h="qx.ui.tooltip.ToolTip",g="__dG",c="_applyCurrent",f="qx.ui.tooltip.Manager",d="__dH",b="tooltip-error",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
qx.event.Registration.addListener(document.body,m,this.__dQ,this,true);
this.__dG=new qx.event.Timer();
this.__dG.addListener(n,this.__dN,this);
this.__dH=new qx.event.Timer();
this.__dH.addListener(n,this.__dO,this);
this.__dI={left:0,top:0};
},properties:{current:{check:h,nullable:true,apply:c},showInvalidToolTips:{check:p,init:true},showToolTips:{check:p,init:true}},members:{__dI:null,__dH:null,__dG:null,__dJ:null,__dK:null,__dL:function(){if(!this.__dJ){this.__dJ=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dJ;
},__dM:function(){if(!this.__dK){this.__dK=new qx.ui.tooltip.ToolTip().set({appearance:b});
this.__dK.syncAppearance();
}return this.__dK;
},_applyCurrent:function(q,r){if(r&&qx.ui.core.Widget.contains(r,q)){return;
}if(r){if(!r.isDisposed()){r.exclude();
}this.__dG.stop();
this.__dH.stop();
}var t=qx.event.Registration;
var s=document.body;
if(q){this.__dG.startWith(q.getShowTimeout());
t.addListener(s,l,this.__dR,this,true);
t.addListener(s,o,this.__dS,this,true);
t.addListener(s,k,this.__dP,this,true);
}else{t.removeListener(s,l,this.__dR,this,true);
t.removeListener(s,o,this.__dS,this,true);
t.removeListener(s,k,this.__dP,this,true);
}},__dN:function(e){var u=this.getCurrent();

if(u&&!u.isDisposed()){this.__dH.startWith(u.getHideTimeout());

if(u.getPlaceMethod()==j){u.placeToWidget(u.getOpener());
}else{u.placeToPoint(this.__dI);
}u.show();
}this.__dG.stop();
},__dO:function(e){var v=this.getCurrent();

if(v&&!v.isDisposed()){v.exclude();
}this.__dH.stop();
this.resetCurrent();
},__dP:function(e){var w=this.__dI;
w.left=e.getDocumentLeft();
w.top=e.getDocumentTop();
},__dQ:function(e){var z=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!z){return;
}var A,B,y,x;
while(z!=null){A=z.getToolTip();
B=z.getToolTipText()||null;
y=z.getToolTipIcon()||null;

if(qx.Class.hasInterface(z.constructor,qx.ui.form.IForm)&&!z.isValid()){x=z.getInvalidMessage();
}
if(A||B||y||x){break;
}z=z.getLayoutParent();
}if(!z||
!z.getEnabled()||
z.isBlockToolTip()||
(!x&&!this.getShowToolTips())||(x&&!this.getShowInvalidToolTips())){return;
}
if(x){A=this.__dM().set({label:x});
}
if(!A){A=this.__dL().set({label:B,icon:y});
}this.setCurrent(A);
A.setOpener(z);
},__dR:function(e){var C=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!C){return;
}var D=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!D){return;
}var E=this.getCurrent();
if(E&&(D==E||qx.ui.core.Widget.contains(E,D))){return;
}if(D&&C&&qx.ui.core.Widget.contains(C,D)){return;
}if(E&&!D){this.setCurrent(null);
}else{this.resetCurrent();
}},__dS:function(e){var F=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!F){return;
}var G=this.getCurrent();
if(G&&G==F.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,m,this.__dQ,this,true);
this._disposeObjects(g,d,i);
this.__dI=null;
}});
})();
(function(){var h="interval",g="qx.event.Timer",f="_applyInterval",d="_applyEnabled",c="Boolean",b="qx.event.type.Event",a="Integer";
qx.Class.define(g,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);
this.setEnabled(false);

if(i!=null){this.setInterval(i);
}var self=this;
this.__dT=function(){self._oninterval.call(self);
};
},events:{"interval":b},statics:{once:function(j,k,l){var m=new qx.event.Timer(l);
m.__dU=j;
m.addListener(h,function(e){m.stop();
j.call(k,e);
m.dispose();
k=null;
},k);
m.start();
return m;
}},properties:{enabled:{init:true,check:c,apply:d},interval:{check:a,init:1000,apply:f}},members:{__dV:null,__dT:null,_applyInterval:function(n,o){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(p,q){if(q){window.clearInterval(this.__dV);
this.__dV=null;
}else if(p){this.__dV=window.setInterval(this.__dT,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(r){this.setInterval(r);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(s){this.stop();
this.startWith(s);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(h);
}})},destruct:function(){if(this.__dV){window.clearInterval(this.__dV);
}this.__dV=this.__dT=null;
}});
})();
(function(){var j="Integer",i="interval",h="keep-align",g="disappear",f="best-fit",e="mouse",d="bottom-left",c="direct",b="Boolean",a="bottom-right",x="widget",w="qx.ui.core.MPlacement",v="left-top",u="offsetRight",t="shorthand",s="offsetLeft",r="top-left",q="appear",p="offsetBottom",o="top-right",m="offsetTop",n="right-bottom",k="right-top",l="left-bottom";
qx.Mixin.define(w,{statics:{__dW:null,setVisibleElement:function(y){this.__dW=y;
},getVisibleElement:function(){return this.__dW;
}},properties:{position:{check:[r,o,d,a,v,l,k,n],init:d,themeable:true},placeMethod:{check:[x,e],init:e,themeable:true},domMove:{check:b,init:false},placementModeX:{check:[c,h,f],init:h,themeable:true},placementModeY:{check:[c,h,f],init:h,themeable:true},offsetLeft:{check:j,init:0,themeable:true},offsetTop:{check:j,init:0,themeable:true},offsetRight:{check:j,init:0,themeable:true},offsetBottom:{check:j,init:0,themeable:true},offset:{group:[m,u,p,s],mode:t,themeable:true}},members:{__dX:null,__dY:null,__ea:null,getLayoutLocation:function(z){var C,B,D,top;
B=z.getBounds();
D=B.left;
top=B.top;
var E=B;
z=z.getLayoutParent();

while(z&&!z.isRootWidget()){B=z.getBounds();
D+=B.left;
top+=B.top;
C=z.getInsets();
D+=C.left;
top+=C.top;
z=z.getLayoutParent();
}if(z.isRootWidget()){var A=z.getContainerLocation();

if(A){D+=A.left;
top+=A.top;
}}return {left:D,top:top,right:D+E.width,bottom:top+E.height};
},moveTo:function(F,top){var H=qx.ui.core.MPlacement.getVisibleElement();
if(H){var J=this.getBounds();
var G=H.getContentLocation();
if(J&&G){var K=top+J.height;
var I=F+J.width;
if((I>G.left&&F<G.right)&&(K>G.top&&top<G.bottom)){F=Math.max(G.left-J.width,0);
}}}
if(this.getDomMove()){this.setDomPosition(F,top);
}else{this.setLayoutProperties({left:F,top:top});
}},placeToWidget:function(L,M){if(M){this.__eb();
this.__dX=qx.lang.Function.bind(this.placeToWidget,this,L,false);
qx.event.Idle.getInstance().addListener(i,this.__dX);
this.__ea=function(){this.__eb();
};
this.addListener(g,this.__ea,this);
}var N=L.getContainerLocation()||this.getLayoutLocation(L);
this.__ed(N);
},__eb:function(){if(this.__dX){qx.event.Idle.getInstance().removeListener(i,this.__dX);
this.__dX=null;
}
if(this.__ea){this.removeListener(g,this.__ea,this);
this.__ea=null;
}},placeToMouse:function(event){var P=event.getDocumentLeft();
var top=event.getDocumentTop();
var O={left:P,top:top,right:P,bottom:top};
this.__ed(O);
},placeToElement:function(Q,R){var location=qx.bom.element.Location.get(Q);
var S={left:location.left,top:location.top,right:location.left+Q.offsetWidth,bottom:location.top+Q.offsetHeight};
if(R){this.__dX=qx.lang.Function.bind(this.placeToElement,this,Q,false);
qx.event.Idle.getInstance().addListener(i,this.__dX);
this.addListener(g,function(){if(this.__dX){qx.event.Idle.getInstance().removeListener(i,this.__dX);
this.__dX=null;
}},this);
}this.__ed(S);
},placeToPoint:function(T){var U={left:T.left,top:T.top,right:T.left,bottom:T.top};
this.__ed(U);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__ec:function(V){var W=null;

if(this._computePlacementSize){var W=this._computePlacementSize();
}else if(this.isVisible()){var W=this.getBounds();
}
if(W==null){this.addListenerOnce(q,function(){this.__ec(V);
},this);
}else{V.call(this,W);
}},__ed:function(X){this.__ec(function(Y){var ba=qx.util.placement.Placement.compute(Y,this.getLayoutParent().getBounds(),X,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(ba.left,ba.top);
});
}},destruct:function(){this.__eb();
}});
})();
(function(){var a="qx.ui.core.MChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(b){return this._indexOf(b);
},add:function(c,d){this._add(c,d);
},addAt:function(e,f,g){this._addAt(e,f,g);
},addBefore:function(h,i,j){this._addBefore(h,i,j);
},addAfter:function(k,l,m){this._addAfter(k,l,m);
},remove:function(n){this._remove(n);
},removeAt:function(o){return this._removeAt(o);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(p){p.getChildren=p._getChildren;
p.hasChildren=p._hasChildren;
p.indexOf=p._indexOf;
p.add=p._add;
p.addAt=p._addAt;
p.addBefore=p._addBefore;
p.addAfter=p._addAfter;
p.remove=p._remove;
p.removeAt=p._removeAt;
p.removeAll=p._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(c){c.getLayout=c._getLayout;
c.setLayout=c._setLayout;
}}});
})();
(function(){var j="Integer",i="_applyDimension",h="Boolean",g="_applyStretching",f="_applyMargin",e="shorthand",d="_applyAlign",c="qx.debug",b="on",a="allowShrinkY",F="Wrong 'width' argument. ",E="Something went wrong with the layout of ",D="bottom",C="Wrong 'left' argument. ",B="baseline",A="marginBottom",z="qx.ui.core.LayoutItem",y="center",x="marginTop",w="!",q="allowGrowX",r="middle",o="marginLeft",p="allowShrinkX",m="top",n="right",k="marginRight",l="abstract",s="Wrong 'top' argument. ",t="Wrong 'height' argument. ",v="allowGrowY",u="left";
qx.Class.define(z,{type:l,extend:qx.core.Object,properties:{minWidth:{check:j,nullable:true,apply:i,init:null,themeable:true},width:{check:j,nullable:true,apply:i,init:null,themeable:true},maxWidth:{check:j,nullable:true,apply:i,init:null,themeable:true},minHeight:{check:j,nullable:true,apply:i,init:null,themeable:true},height:{check:j,nullable:true,apply:i,init:null,themeable:true},maxHeight:{check:j,nullable:true,apply:i,init:null,themeable:true},allowGrowX:{check:h,apply:g,init:true,themeable:true},allowShrinkX:{check:h,apply:g,init:true,themeable:true},allowGrowY:{check:h,apply:g,init:true,themeable:true},allowShrinkY:{check:h,apply:g,init:true,themeable:true},allowStretchX:{group:[q,p],mode:e,themeable:true},allowStretchY:{group:[v,a],mode:e,themeable:true},marginTop:{check:j,init:0,apply:f,themeable:true},marginRight:{check:j,init:0,apply:f,themeable:true},marginBottom:{check:j,init:0,apply:f,themeable:true},marginLeft:{check:j,init:0,apply:f,themeable:true},margin:{group:[x,k,A,o],mode:e,themeable:true},alignX:{check:[u,y,n],nullable:true,apply:d,themeable:true},alignY:{check:[m,r,D,B],nullable:true,apply:d,themeable:true}},members:{__ee:null,__ef:null,__eg:null,__eh:null,__ei:null,__ej:null,__ek:null,getBounds:function(){return this.__ej||this.__ef||null;
},clearSeparators:function(){},renderSeparator:function(G,H){},renderLayout:function(I,top,J,K){if(qx.core.Variant.isSet(c,b)){var L=E+this.toString()+w;
this.assertInteger(I,C+L);
this.assertInteger(top,s+L);
this.assertInteger(J,F+L);
this.assertInteger(K,t+L);
}var M=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var M=this._getHeightForWidth(J);
}
if(M!=null&&M!==this.__ee){this.__ee=M;
qx.ui.core.queue.Layout.add(this);
return null;
}var O=this.__ef;

if(!O){O=this.__ef={};
}var N={};

if(I!==O.left||top!==O.top){N.position=true;
O.left=I;
O.top=top;
}
if(J!==O.width||K!==O.height){N.size=true;
O.width=J;
O.height=K;
}if(this.__eg){N.local=true;
delete this.__eg;
}
if(this.__ei){N.margin=true;
delete this.__ei;
}return N;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__eg;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__eg=true;
this.__eh=null;
},getSizeHint:function(P){var Q=this.__eh;

if(Q){return Q;
}
if(P===false){return null;
}Q=this.__eh=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__ee&&this.getHeight()==null){Q.height=this.__ee;
}if(Q.minWidth>Q.width){Q.width=Q.minWidth;
}
if(Q.maxWidth<Q.width){Q.width=Q.maxWidth;
}
if(!this.getAllowGrowX()){Q.maxWidth=Q.width;
}
if(!this.getAllowShrinkX()){Q.minWidth=Q.width;
}if(Q.minHeight>Q.height){Q.height=Q.minHeight;
}
if(Q.maxHeight<Q.height){Q.height=Q.maxHeight;
}
if(!this.getAllowGrowY()){Q.maxHeight=Q.height;
}
if(!this.getAllowShrinkY()){Q.minHeight=Q.height;
}return Q;
},_computeSizeHint:function(){var V=this.getMinWidth()||0;
var S=this.getMinHeight()||0;
var W=this.getWidth()||V;
var U=this.getHeight()||S;
var R=this.getMaxWidth()||Infinity;
var T=this.getMaxHeight()||Infinity;
return {minWidth:V,width:W,maxWidth:R,minHeight:S,height:U,maxHeight:T};
},_hasHeightForWidth:function(){var X=this._getLayout();

if(X){return X.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(Y){var ba=this._getLayout();

if(ba&&ba.hasHeightForWidth()){return ba.getHeightForWidth(Y);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__ei=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__ej;
},setUserBounds:function(bb,top,bc,bd){this.__ej={left:bb,top:top,width:bc,height:bd};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__ej;
qx.ui.core.queue.Layout.add(this);
},__el:{},setLayoutProperties:function(be){if(be==null){return;
}var bf=this.__ek;

if(!bf){bf=this.__ek={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(be);
}for(var bg in be){if(be[bg]==null){delete bf[bg];
}else{bf[bg]=be[bg];
}}},getLayoutProperties:function(){return this.__ek||this.__el;
},clearLayoutProperties:function(){delete this.__ek;
},updateLayoutProperties:function(bh){var bi=this._getLayout();

if(bi){if(qx.core.Variant.isSet(c,b)){if(bh){for(var bj in bh){if(bh[bj]!==null){bi.verifyLayoutProperty(this,bj,bh[bj]);
}}}}bi.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();
},getLayoutParent:function(){return this.$$parent||null;
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}this.$$parent=parent||null;
qx.ui.core.queue.Visibility.add(this);
},isRootWidget:function(){return false;
},_getRoot:function(){var parent=this;

while(parent){if(parent.isRootWidget()){return parent;
}parent=parent.$$parent;
}return null;
},clone:function(){var bk=qx.core.Object.prototype.clone.call(this);
var bl=this.__ek;

if(bl){bk.__ek=qx.lang.Object.clone(bl);
}return bk;
}},destruct:function(){this.$$parent=this.$$subparent=this.__ek=this.__ef=this.__ej=this.__eh=null;
}});
})();
(function(){var k="qx.debug",j="qx.ui.core.DecoratorFactory",i="qxType",h="",g="decorator",f="$$nopool$$",e="qx.ui.core.DecoratorFactory[",d="] ",c="on",b="keys: ",a=", elements: ";
qx.Class.define(j,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__em={};
},statics:{MAX_SIZE:15,__en:f},members:{__em:null,getDecoratorElement:function(l){var q=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(l)){var o=l;
var n=qx.theme.manager.Decoration.getInstance().resolve(l);
}else{var o=q.__en;
n=l;
}var p=this.__em;

if(p[o]&&p[o].length>0){var m=p[o].pop();
}else{var m=this._createDecoratorElement(n,o);
}m.$$pooled=false;
return m;
},poolDecorator:function(r){if(!r||r.$$pooled||r.isDisposed()){return;
}var u=qx.ui.core.DecoratorFactory;
var s=r.getId();

if(s==u.__en){r.dispose();
return;
}var t=this.__em;

if(!t[s]){t[s]=[];
}
if(t[s].length>u.MAX_SIZE){r.dispose();
}else{r.$$pooled=true;
t[s].push(r);
}},_createDecoratorElement:function(v,w){var x=new qx.html.Decorator(v,w);

if(qx.core.Variant.isSet(k,c)){x.setAttribute(i,g);
}return x;
},toString:qx.core.Variant.select(k,{"on":function(){var y=0;
var z=0;

for(var A in this.__em){y+=1;
z+=this.__em[A].length;
}return [e,this.$$hash,d,b,y,a,z].join(h);
},"off":function(){return qx.core.Object.prototype.toString.call(this);
}})},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var C=this.__em;

for(var B in C){qx.util.DisposeUtil.disposeArray(C,B);
}}this.__em=null;
}});
})();
(function(){var cr="on",cq="px",cp="qx.debug",co="Boolean",cn="qx.event.type.Drag",cm="qx.event.type.Mouse",cl="visible",ck="qx.event.type.Focus",cj="Integer",ci="qx.event.type.Touch",bx="excluded",bw="qx.event.type.Data",bv="_applyPadding",bu="qx.event.type.Event",bt="hidden",bs="contextmenu",br="String",bq="tabIndex",bp="focused",bo="changeVisibility",cy="mshtml",cz="hovered",cw="qx.event.type.KeySequence",cx="qx.client",cu="absolute",cv="backgroundColor",cs="drag",ct="div",cA="object",cB="disabled",bV="move",bU="dragstart",bX="qx.dynlocale",bW="dragchange",ca="dragend",bY="resize",cc="Decorator",cb="zIndex",bT="opacity",bS="default",c="Color",d="qxType",f="changeToolTipText",g="beforeContextmenuOpen",h="_applyNativeContextMenu",j="content",k="__ez",m="_applyBackgroundColor",n="_applyFocusable",o="changeShadow",cF="__es",cE="qx.event.type.KeyInput",cD="createChildControl",cC="Invalid left decorator inset detected: ",cJ="Font",cI="_applyShadow",cH="Invalid layout data: ",cG="Could not add widget to itself: ",cL="_applyEnabled",cK="_applySelectable",N="Number",O="_applyKeepActive",L="_applyVisibility",M="The 'after' widget is not a child of this widget!",R="repeat",S="qxDraggable",P="syncAppearance",Q="paddingLeft",J="_applyDroppable",K="Wrong 'left' argument. ",w="__ex",v="protector",y="#",x="qx.event.type.MouseWheel",s="_applyCursor",r="_applyDraggable",u="changeTextColor",t="$$widget",q="changeContextMenu",p="paddingTop",X="changeSelectable",Y="hideFocus",ba="Invalid top decorator inset detected: ",bb="none",T="outline",U="The 'before' widget is not a child of this widget!",V="_applyAppearance",W=" returned an invalid size hint!",bc="_applyOpacity",bd="url(",G=")",F="qx.ui.core.Widget",E="minHeight is larger than maxHeight!",D="_applyFont",C="cursor",B="qxDroppable",A="changeZIndex",z="changeEnabled",I="changeFont",H="_applyDecorator",be="_applyZIndex",bf="_applyTextColor",bg="qx.ui.menu.Menu",bh="Invalid right decorator inset detected: ",bi="Invalid widget to add: ",bj="__eo",bk="_applyToolTipText",bl="The layout of the widget",bm="true",bn="widget",bB="Wrong 'top' argument. ",bA="changeDecorator",bz="changeBackgroundColor",by="_applyTabIndex",bF="Invalid bottom decorator inset detected: ",bE="changeAppearance",bD="__eB",bC="shorthand",bH="/",bG="__eu",bO="__ep",bP="",bM="_applyContextMenu",bN="container",bK="paddingBottom",bL="changeNativeContextMenu",bI="qx.ui.tooltip.ToolTip",bJ="qxKeepActive",bQ="_applyKeepFocus",bR="paddingRight",ce="minWidth is larger than maxWidth!",cd="changeLocale",cg="qxKeepFocus",cf="__et",ch="qx/static/blank.gif";
qx.Class.define(F,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);
this.__eo=this._createContainerElement();
this.__ep=this.__eA();
this.__eo.add(this.__ep);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:bu,disappear:bu,createChildControl:bw,resize:bw,move:bw,syncAppearance:bw,mousemove:cm,mouseover:cm,mouseout:cm,mousedown:cm,mouseup:cm,click:cm,dblclick:cm,contextmenu:cm,beforeContextmenuOpen:bw,mousewheel:x,touchstart:ci,touchend:ci,touchmove:ci,touchcancel:ci,tap:ci,swipe:ci,keyup:cw,keydown:cw,keypress:cw,keyinput:cE,focus:ck,blur:ck,focusin:ck,focusout:ck,activate:ck,deactivate:ck,capture:bu,losecapture:bu,drop:cn,dragleave:cn,dragover:cn,drag:cn,dragstart:cn,dragend:cn,dragchange:cn,droprequest:cn},properties:{paddingTop:{check:cj,init:0,apply:bv,themeable:true},paddingRight:{check:cj,init:0,apply:bv,themeable:true},paddingBottom:{check:cj,init:0,apply:bv,themeable:true},paddingLeft:{check:cj,init:0,apply:bv,themeable:true},padding:{group:[p,bR,bK,Q],mode:bC,themeable:true},zIndex:{nullable:true,init:null,apply:be,event:A,check:cj,themeable:true},decorator:{nullable:true,init:null,apply:H,event:bA,check:cc,themeable:true},shadow:{nullable:true,init:null,apply:cI,event:o,check:cc,themeable:true},backgroundColor:{nullable:true,check:c,apply:m,event:bz,themeable:true},textColor:{nullable:true,check:c,apply:bf,event:u,themeable:true,inheritable:true},font:{nullable:true,apply:D,check:cJ,event:I,themeable:true,inheritable:true,dereference:true},opacity:{check:N,apply:bc,themeable:true,nullable:true,init:null},cursor:{check:br,apply:s,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:bI,nullable:true},toolTipText:{check:br,nullable:true,event:f,apply:bk},toolTipIcon:{check:br,nullable:true,event:f},blockToolTip:{check:co,init:false},visibility:{check:[cl,bt,bx],init:cl,apply:L,event:bo},enabled:{init:true,check:co,inheritable:true,apply:cL,event:z},anonymous:{init:false,check:co},tabIndex:{check:cj,nullable:true,apply:by},focusable:{check:co,init:false,apply:n},keepFocus:{check:co,init:false,apply:bQ},keepActive:{check:co,init:false,apply:O},draggable:{check:co,init:false,apply:r},droppable:{check:co,init:false,apply:J},selectable:{check:co,init:false,event:X,apply:cK},contextMenu:{check:bg,apply:bM,nullable:true,event:q},nativeContextMenu:{check:co,init:false,themeable:true,event:bL,apply:h},appearance:{check:br,init:bn,apply:V,event:bE}},statics:{DEBUG:false,getWidgetByElement:function(cM,cN){while(cM){var cO=cM.$$widget;
if(cO!=null){var cP=qx.core.ObjectRegistry.fromHashCode(cO);
if(!cN||!cP.getAnonymous()){return cP;
}}try{cM=cM.parentNode;
}catch(e){return null;
}}return null;
},contains:function(parent,cQ){while(cQ){if(parent==cQ){return true;
}cQ=cQ.getLayoutParent();
}return false;
},__eq:new qx.ui.core.DecoratorFactory(),__er:new qx.ui.core.DecoratorFactory()},members:{__eo:null,__ep:null,__es:null,__et:null,__eu:null,__ev:null,__ew:null,__ex:null,_getLayout:function(){return this.__ex;
},_setLayout:function(cR){if(qx.core.Variant.isSet(cp,cr)){if(cR){this.assertInstance(cR,qx.ui.layout.Abstract);
}}
if(this.__ex){this.__ex.connectToWidget(null);
}
if(cR){cR.connectToWidget(this);
}this.__ex=cR;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var cS=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(cS);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(cS);
}this.$$refreshInheritables();
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__ey:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var cT=qx.theme.manager.Decoration.getInstance();
var cV=cT.resolve(a).getInsets();
var cU=cT.resolve(b).getInsets();

if(cV.top!=cU.top||cV.right!=cU.right||cV.bottom!=cU.bottom||cV.left!=cU.left){return true;
}return false;
},renderLayout:function(cW,top,cX,cY){var di=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,cW,top,cX,cY);
if(!di){return null;
}var db=this.getContainerElement();
var content=this.getContentElement();
var df=di.size||this._updateInsets;
var dj=cq;
var dg={};
if(di.position){dg.left=cW+dj;
dg.top=top+dj;
}if(di.size){dg.width=cX+dj;
dg.height=cY+dj;
}
if(di.position||di.size){db.setStyles(dg);
}
if(df||di.local||di.margin){var da=this.getInsets();
var innerWidth=cX-da.left-da.right;
var innerHeight=cY-da.top-da.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var dd={};

if(this._updateInsets){dd.left=da.left+dj;
dd.top=da.top+dj;
}
if(df){dd.width=innerWidth+dj;
dd.height=innerHeight+dj;
}
if(df||this._updateInsets){content.setStyles(dd);
}
if(di.size){var dh=this.__eu;

if(dh){dh.setStyles({width:cX+cq,height:cY+cq});
}}
if(di.size||this._updateInsets){if(this.__es){this.__es.resize(cX,cY);
}}
if(di.size){if(this.__et){var da=this.__et.getInsets();
var de=cX+da.left+da.right;
var dc=cY+da.top+da.bottom;
this.__et.resize(de,dc);
}}
if(df||di.local||di.margin){if(this.__ex&&this.hasLayoutChildren()){this.__ex.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(di.position&&this.hasListener(bV)){this.fireDataEvent(bV,this.getBounds());
}
if(di.size&&this.hasListener(bY)){this.fireDataEvent(bY,this.getBounds());
}delete this._updateInsets;
return di;
},__ez:null,clearSeparators:function(){var dl=this.__ez;

if(!dl){return;
}var dm=qx.ui.core.Widget.__eq;
var content=this.getContentElement();
var dk;

for(var i=0,l=dl.length;i<l;i++){dk=dl[i];
dm.poolDecorator(dk);
content.remove(dk);
}dl.length=0;
},renderSeparator:function(dn,dp){var dq=qx.ui.core.Widget.__eq.getDecoratorElement(dn);
this.getContentElement().add(dq);
dq.resize(dp.width,dp.height);
dq.setStyles({left:dp.left+cq,top:dp.top+cq});
if(!this.__ez){this.__ez=[dq];
}else{this.__ez.push(dq);
}},_computeSizeHint:function(){var dx=this.getWidth();
var dw=this.getMinWidth();
var ds=this.getMaxWidth();
var dv=this.getHeight();
var dt=this.getMinHeight();
var du=this.getMaxHeight();

if(qx.core.Variant.isSet(cp,cr)){if(dw!==null&&ds!==null){this.assert(dw<=ds,ce);
}
if(dt!==null&&du!==null){this.assert(dt<=du,E);
}}var dy=this._getContentHint();
var dr=this.getInsets();
var dA=dr.left+dr.right;
var dz=dr.top+dr.bottom;

if(dx==null){dx=dy.width+dA;
}
if(dv==null){dv=dy.height+dz;
}
if(dw==null){dw=dA;

if(dy.minWidth!=null){dw+=dy.minWidth;
}}
if(dt==null){dt=dz;

if(dy.minHeight!=null){dt+=dy.minHeight;
}}
if(ds==null){if(dy.maxWidth==null){ds=Infinity;
}else{ds=dy.maxWidth+dA;
}}
if(du==null){if(dy.maxHeight==null){du=Infinity;
}else{du=dy.maxHeight+dz;
}}return {width:dx,minWidth:dw,maxWidth:ds,height:dv,minHeight:dt,maxHeight:du};
},invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);

if(this.__ex){this.__ex.invalidateLayoutCache();
}},_getContentHint:function(){var dC=this.__ex;

if(dC){if(this.hasLayoutChildren()){var dD=dC.getSizeHint();

if(qx.core.Variant.isSet(cp,cr)){var dB=bl+this.toString()+W;
this.assertInteger(dD.width,K+dB);
this.assertInteger(dD.height,bB+dB);
}return dD;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(dE){var dI=this.getInsets();
var dL=dI.left+dI.right;
var dK=dI.top+dI.bottom;
var dJ=dE-dL;
var dG=this._getLayout();

if(dG&&dG.hasHeightForWidth()){var dF=dG.getHeightForWidth(dE);
}else{dF=this._getContentHeightForWidth(dJ);
}var dH=dF+dK;
return dH;
},_getContentHeightForWidth:function(dM){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var dO=this.getPaddingRight();
var dQ=this.getPaddingBottom();
var dP=this.getPaddingLeft();

if(this.__es){var dN=this.__es.getInsets();

if(qx.core.Variant.isSet(cp,cr)){this.assertNumber(dN.top,ba+dN.top);
this.assertNumber(dN.right,bh+dN.right);
this.assertNumber(dN.bottom,bF+dN.bottom);
this.assertNumber(dN.left,cC+dN.left);
}top+=dN.top;
dO+=dN.right;
dQ+=dN.bottom;
dP+=dN.left;
}return {"top":top,"right":dO,"bottom":dQ,"left":dP};
},getInnerSize:function(){var dS=this.getBounds();

if(!dS){return null;
}var dR=this.getInsets();
return {width:dS.width-dR.left-dR.right,height:dS.height-dR.top-dR.bottom};
},show:function(){this.setVisibility(cl);
},hide:function(){this.setVisibility(bt);
},exclude:function(){this.setVisibility(bx);
},isVisible:function(){return this.getVisibility()===cl;
},isHidden:function(){return this.getVisibility()!==cl;
},isExcluded:function(){return this.getVisibility()===bx;
},isSeeable:function(){var dU=this.getContainerElement().getDomElement();

if(dU){return dU.offsetWidth>0;
}var dT=this;

do{if(!dT.isVisible()){return false;
}
if(dT.isRootWidget()){return true;
}dT=dT.getLayoutParent();
}while(dT);
return false;
},_createContainerElement:function(){var dW={"$$widget":this.toHashCode()};

if(qx.core.Variant.isSet(cp,cr)){dW.qxType=bN;
dW.qxClass=this.classname;
}var dV={zIndex:0,position:cu};
return new qx.html.Element(ct,dV,dW);
},__eA:function(){var dX=this._createContentElement();

if(qx.core.Variant.isSet(cp,cr)){dX.setAttribute(d,j);
}dX.setStyles({"position":cu,"zIndex":10});
return dX;
},_createContentElement:function(){return new qx.html.Element(ct,{overflowX:bt,overflowY:bt});
},getContainerElement:function(){return this.__eo;
},getContentElement:function(){return this.__ep;
},getDecoratorElement:function(){return this.__es||null;
},getShadowElement:function(){return this.__et||null;
},__eB:null,getLayoutChildren:function(){var ea=this.__eB;

if(!ea){return this.__eC;
}var eb;

for(var i=0,l=ea.length;i<l;i++){var dY=ea[i];

if(dY.hasUserBounds()||dY.isExcluded()){if(eb==null){eb=ea.concat();
}qx.lang.Array.remove(eb,dY);
}}return eb||ea;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var ec=this.__ex;

if(ec){ec.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var ed=this.__eB;

if(!ed){return false;
}var ee;

for(var i=0,l=ed.length;i<l;i++){ee=ed[i];

if(!ee.hasUserBounds()&&!ee.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__eC:[],_getChildren:function(){return this.__eB||this.__eC;
},_indexOf:function(ef){var eg=this.__eB;

if(!eg){return -1;
}return eg.indexOf(ef);
},_hasChildren:function(){var eh=this.__eB;
return eh!=null&&(!!eh[0]);
},addChildrenToQueue:function(ei){var ej=this.__eB;

if(!ej){return;
}var ek;

for(var i=0,l=ej.length;i<l;i++){ek=ej[i];
ei[ek.$$hash]=ek;
ek.addChildrenToQueue(ei);
}},_add:function(em,en){if(em.getLayoutParent()==this){qx.lang.Array.remove(this.__eB,em);
}
if(this.__eB){this.__eB.push(em);
}else{this.__eB=[em];
}this.__eD(em,en);
},_addAt:function(eo,ep,eq){if(!this.__eB){this.__eB=[];
}if(eo.getLayoutParent()==this){qx.lang.Array.remove(this.__eB,eo);
}var er=this.__eB[ep];

if(er===eo){eo.setLayoutProperties(eq);
}
if(er){qx.lang.Array.insertBefore(this.__eB,eo,er);
}else{this.__eB.push(eo);
}this.__eD(eo,eq);
},_addBefore:function(es,et,eu){if(qx.core.Variant.isSet(cp,cr)){this.assertInArray(et,this._getChildren(),U);
}
if(es==et){return;
}
if(!this.__eB){this.__eB=[];
}if(es.getLayoutParent()==this){qx.lang.Array.remove(this.__eB,es);
}qx.lang.Array.insertBefore(this.__eB,es,et);
this.__eD(es,eu);
},_addAfter:function(ev,ew,ex){if(qx.core.Variant.isSet(cp,cr)){this.assertInArray(ew,this._getChildren(),M);
}
if(ev==ew){return;
}
if(!this.__eB){this.__eB=[];
}if(ev.getLayoutParent()==this){qx.lang.Array.remove(this.__eB,ev);
}qx.lang.Array.insertAfter(this.__eB,ev,ew);
this.__eD(ev,ex);
},_remove:function(ey){if(!this.__eB){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__eB,ey);
this.__eE(ey);
},_removeAt:function(ez){if(!this.__eB){throw new Error("This widget has no children!");
}var eA=this.__eB[ez];
qx.lang.Array.removeAt(this.__eB,ez);
this.__eE(eA);
return eA;
},_removeAll:function(){if(!this.__eB){return;
}var eB=this.__eB.concat();
this.__eB.length=0;

for(var i=eB.length-1;i>=0;i--){this.__eE(eB[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__eD:function(eC,eD){if(qx.core.Variant.isSet(cp,cr)){this.assertInstance(eC,qx.ui.core.LayoutItem,bi+eC);
this.assertNotIdentical(eC,this,cG+eC);

if(eD!=null){this.assertType(eD,cA,cH+eD);
}}var parent=eC.getLayoutParent();

if(parent&&parent!=this){parent._remove(eC);
}eC.setLayoutParent(this);
if(eD){eC.setLayoutProperties(eD);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(eC);
}},__eE:function(eE){if(qx.core.Variant.isSet(cp,cr)){this.assertNotUndefined(eE);
}
if(eE.getLayoutParent()!==this){throw new Error("Remove Error: "+eE+" is not a child of this widget!");
}eE.setLayoutParent(null);
if(this.__ex){this.__ex.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(eE);
}},capture:function(eF){this.getContainerElement().capture(eF);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(eG,eH,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__eu){return;
}var eI=this.__eu=new qx.html.Element;

if(qx.core.Variant.isSet(cp,cr)){eI.setAttribute(d,v);
}eI.setStyles({position:cu,top:0,left:0,zIndex:7});
var eJ=this.getBounds();

if(eJ){this.__eu.setStyles({width:eJ.width+cq,height:eJ.height+cq});
}if(qx.core.Variant.isSet(cx,cy)){eI.setStyles({backgroundImage:bd+qx.util.ResourceManager.getInstance().toUri(ch)+G,backgroundRepeat:R});
}this.getContainerElement().add(eI);
},_applyDecorator:function(eK,eL){if(qx.core.Variant.isSet(cp,cr)){if(eK&&typeof eK===cA){if(qx.ui.core.Widget.DEBUG){this.warn("Decorator instances may increase memory usage and "+"processing time. Often it is better to lay them out to a "+"theme file. Hash code of decorator object: "+eK);
}}}var eO=qx.ui.core.Widget.__eq;
var eM=this.getContainerElement();
if(!this.__eu&&!qx.bom.client.Feature.CSS_POINTER_EVENTS){this._createProtectorElement();
}if(eL){eM.remove(this.__es);
eO.poolDecorator(this.__es);
}if(eK){var eN=this.__es=eO.getDecoratorElement(eK);
eN.setStyle(cb,5);
eM.add(eN);
}else{delete this.__es;
}this._applyBackgroundColor(this.getBackgroundColor());
if(this.__ey(eL,eK)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(eK){var eP=this.getBounds();

if(eP){eN.resize(eP.width,eP.height);
this.__eu&&
this.__eu.setStyles({width:eP.width+cq,height:eP.height+cq});
}}},_applyShadow:function(eQ,eR){var eY=qx.ui.core.Widget.__er;
var eT=this.getContainerElement();
if(eR){eT.remove(this.__et);
eY.poolDecorator(this.__et);
}if(eQ){var eV=this.__et=eY.getDecoratorElement(eQ);
eT.add(eV);
var eX=eV.getInsets();
eV.setStyles({left:(-eX.left)+cq,top:(-eX.top)+cq});
var eW=this.getBounds();

if(eW){var eU=eW.width+eX.left+eX.right;
var eS=eW.height+eX.top+eX.bottom;
eV.resize(eU,eS);
}eV.tint(null);
}else{delete this.__et;
}},_applyToolTipText:function(fa,fb){if(qx.core.Variant.isSet(bX,cr)){if(this.__ew){return;
}var fc=qx.locale.Manager.getInstance();
this.__ew=fc.addListener(cd,function(){var fd=this.getToolTipText();

if(fd&&fd.translate){this.setToolTipText(fd.translate());
}},this);
}},_applyTextColor:function(fe,ff){},_applyZIndex:function(fg,fh){this.getContainerElement().setStyle(cb,fg==null?0:fg);
},_applyVisibility:function(fi,fj){var fk=this.getContainerElement();

if(fi===cl){fk.show();
}else{fk.hide();
}var parent=this.$$parent;

if(parent&&(fj==null||fi==null||fj===bx||fi===bx)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(fl,fm){this.getContainerElement().setStyle(bT,fl==1?null:fl);
if(qx.core.Variant.isSet(cx,cy)&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var fn=(fl==1||fl==null)?null:0.99;
this.getContentElement().setStyle(bT,fn);
}}},_applyCursor:function(fo,fp){if(fo==null&&!this.isSelectable()){fo=bS;
}this.getContainerElement().setStyle(C,fo,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(fq,fr){var fs=this.getBackgroundColor();
var fu=this.getContainerElement();

if(this.__es){this.__es.tint(fs);
fu.setStyle(cv,null);
}else{var ft=qx.theme.manager.Color.getInstance().resolve(fs);
fu.setStyle(cv,ft);
}},_applyFont:function(fv,fw){},__eF:null,$$stateChanges:null,_forwardStates:null,hasState:function(fx){var fy=this.__eF;
return !!fy&&!!fy[fx];
},addState:function(fz){var fA=this.__eF;

if(!fA){fA=this.__eF={};
}
if(fA[fz]){return;
}this.__eF[fz]=true;
if(fz===cz){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fD=this.__eI;

if(forward&&forward[fz]&&fD){var fB;

for(var fC in fD){fB=fD[fC];

if(fB instanceof qx.ui.core.Widget){fD[fC].addState(fz);
}}}},removeState:function(fE){var fF=this.__eF;

if(!fF||!fF[fE]){return;
}delete this.__eF[fE];
if(fE===cz){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fI=this.__eI;

if(forward&&forward[fE]&&fI){for(var fH in fI){var fG=fI[fH];

if(fG instanceof qx.ui.core.Widget){fG.removeState(fE);
}}}},replaceState:function(fJ,fK){var fL=this.__eF;

if(!fL){fL=this.__eF={};
}
if(!fL[fK]){fL[fK]=true;
}
if(fL[fJ]){delete fL[fJ];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fO=this.__eI;

if(forward&&forward[fK]&&fO){for(var fN in fO){var fM=fO[fN];

if(fM instanceof qx.ui.core.Widget){fM.replaceState(fJ,fK);
}}}},__eG:null,__eH:null,syncAppearance:function(){var fT=this.__eF;
var fS=this.__eG;
var fU=qx.theme.manager.Appearance.getInstance();
var fQ=qx.core.Property.$$method.setThemed;
var fY=qx.core.Property.$$method.resetThemed;
if(this.__eH){delete this.__eH;
if(fS){var fP=fU.styleFrom(fS,fT,null,this.getAppearance());
if(fP){fS=null;
}}}if(!fS){var fR=this;
var fX=[];

do{fX.push(fR.$$subcontrol||fR.getAppearance());
}while(fR=fR.$$subparent);
fS=fX.reverse().join(bH).replace(/#[0-9]+/g,bP);
this.__eG=fS;
}var fV=fU.styleFrom(fS,fT,null,this.getAppearance());

if(fV){if(fP){for(var fW in fP){if(fV[fW]===undefined){this[fY[fW]]();
}}}if(qx.core.Variant.isSet(cp,cr)){for(var fW in fV){if(!this[fQ[fW]]){throw new Error(this.classname+' has no themeable property "'+fW+'" while styling '+fS);
}}}for(var fW in fV){fV[fW]===undefined?this[fY[fW]]():this[fQ[fW]](fV[fW]);
}}else if(fP){for(var fW in fP){this[fY[fW]]();
}}this.fireDataEvent(P,this.__eF);
},_applyAppearance:function(ga,gb){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__ev){qx.ui.core.queue.Appearance.add(this);
this.__ev=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__eH=true;
qx.ui.core.queue.Appearance.add(this);
var ge=this.__eI;

if(ge){var gc;

for(var gd in ge){gc=ge[gd];

if(gc instanceof qx.ui.core.Widget){gc.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var gf=this;

while(gf.getAnonymous()){gf=gf.getLayoutParent();

if(!gf){return null;
}}return gf;
},getFocusTarget:function(){var gg=this;

if(!gg.getEnabled()){return null;
}
while(gg.getAnonymous()||!gg.getFocusable()){gg=gg.getLayoutParent();

if(!gg||!gg.getEnabled()){return null;
}}return gg;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();
},_applyFocusable:function(gh,gi){var gj=this.getFocusElement();
if(gh){var gk=this.getTabIndex();

if(gk==null){gk=1;
}gj.setAttribute(bq,gk);
if(qx.core.Variant.isSet(cx,cy)){gj.setAttribute(Y,bm);
}else{gj.setStyle(T,bb);
}}else{if(gj.isNativelyFocusable()){gj.setAttribute(bq,-1);
}else if(gi){gj.setAttribute(bq,null);
}}},_applyKeepFocus:function(gl){var gm=this.getFocusElement();
gm.setAttribute(cg,gl?cr:null);
},_applyKeepActive:function(gn){var go=this.getContainerElement();
go.setAttribute(bJ,gn?cr:null);
},_applyTabIndex:function(gp){if(gp==null){gp=1;
}else if(gp<1||gp>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&gp!=null){this.getFocusElement().setAttribute(bq,gp);
}},_applySelectable:function(gq,gr){if(gr!==null){this._applyCursor(this.getCursor());
}this.getContentElement().setSelectable(gq);
},_applyEnabled:function(gs,gt){if(gs===false){this.addState(cB);
this.removeState(cz);
if(this.isFocusable()){this.removeState(bp);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(cB);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(gu,gv,name){},_applyContextMenu:function(gw,gx){if(gx){gx.removeState(bs);

if(gx.getOpener()==this){gx.resetOpener();
}
if(!gw){this.removeListener(bs,this._onContextMenuOpen);
gx.removeListener(bo,this._onBeforeContextMenuOpen,this);
}}
if(gw){gw.setOpener(this);
gw.addState(bs);

if(!gx){this.addListener(bs,this._onContextMenuOpen);
gw.addListener(bo,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==cl&&this.hasListener(g)){this.fireDataEvent(g,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(gy,gz){if(!this.isEnabled()&&gy===true){gy=false;
}qx.ui.core.DragDropCursor.getInstance();
if(gy){this.addListener(bU,this._onDragStart);
this.addListener(cs,this._onDrag);
this.addListener(ca,this._onDragEnd);
this.addListener(bW,this._onDragChange);
}else{this.removeListener(bU,this._onDragStart);
this.removeListener(cs,this._onDrag);
this.removeListener(ca,this._onDragEnd);
this.removeListener(bW,this._onDragChange);
}this.getContainerElement().setAttribute(S,gy?cr:null);
},_applyDroppable:function(gA,gB){if(!this.isEnabled()&&gA===true){gA=false;
}this.getContainerElement().setAttribute(B,gA?cr:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(bS);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var gC=qx.ui.core.DragDropCursor.getInstance();
var gD=e.getCurrentAction();
gD?gC.setAction(gD):gC.resetAction();
},visualizeFocus:function(){this.addState(bp);
},visualizeBlur:function(){this.removeState(bp);
},scrollChildIntoView:function(gE,gF,gG,gH){this.scrollChildIntoViewX(gE,gF,gH);
this.scrollChildIntoViewY(gE,gG,gH);
},scrollChildIntoViewX:function(gI,gJ,gK){this.getContentElement().scrollChildIntoViewX(gI.getContainerElement(),gJ,gK);
},scrollChildIntoViewY:function(gL,gM,gN){this.getContentElement().scrollChildIntoViewY(gL.getContainerElement(),gM,gN);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(gO){if(!this.__eI){return false;
}return !!this.__eI[gO];
},__eI:null,_getCreatedChildControls:function(){return this.__eI;
},getChildControl:function(gP,gQ){if(!this.__eI){if(gQ){return null;
}this.__eI={};
}var gR=this.__eI[gP];

if(gR){return gR;
}
if(gQ===true){return null;
}return this._createChildControl(gP);
},_showChildControl:function(gS){var gT=this.getChildControl(gS);
gT.show();
return gT;
},_excludeChildControl:function(gU){var gV=this.getChildControl(gU,true);

if(gV){gV.exclude();
}},_isChildControlVisible:function(gW){var gX=this.getChildControl(gW,true);

if(gX){return gX.isVisible();
}return false;
},_createChildControl:function(gY){if(!this.__eI){this.__eI={};
}else if(this.__eI[gY]){throw new Error("Child control '"+gY+"' already created!");
}var hd=gY.indexOf(y);

if(hd==-1){var ha=this._createChildControlImpl(gY);
}else{var ha=this._createChildControlImpl(gY.substring(0,hd),gY.substring(hd+1,gY.length));
}
if(!ha){throw new Error("Unsupported control: "+gY);
}ha.$$subcontrol=gY;
ha.$$subparent=this;
var hb=this.__eF;
var forward=this._forwardStates;

if(hb&&forward&&ha instanceof qx.ui.core.Widget){for(var hc in hb){if(forward[hc]){ha.addState(hc);
}}}this.fireDataEvent(cD,ha);
return this.__eI[gY]=ha;
},_createChildControlImpl:function(he,hf){return null;
},_disposeChildControls:function(){var hj=this.__eI;

if(!hj){return;
}var hh=qx.ui.core.Widget;

for(var hi in hj){var hg=hj[hi];

if(!hh.contains(this,hg)){hg.destroy();
}else{hg.dispose();
}}delete this.__eI;
},_findTopControl:function(){var hk=this;

while(hk){if(!hk.$$subparent){return hk;
}hk=hk.$$subparent;
}return null;
},getContainerLocation:function(hl){var hm=this.getContainerElement().getDomElement();
return hm?qx.bom.element.Location.get(hm,hl):null;
},getContentLocation:function(hn){var ho=this.getContentElement().getDomElement();
return ho?qx.bom.element.Location.get(ho,hn):null;
},setDomLeft:function(hp){var hq=this.getContainerElement().getDomElement();

if(hq){hq.style.left=hp+cq;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(hr){var hs=this.getContainerElement().getDomElement();

if(hs){hs.style.top=hr+cq;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(ht,top){var hu=this.getContainerElement().getDomElement();

if(hu){hu.style.left=ht+cq;
hu.style.top=top+cq;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var hv=qx.ui.core.LayoutItem.prototype.clone.call(this);

if(this.getChildren){var hw=this.getChildren();

for(var i=0,l=hw.length;i<l;i++){hv.add(hw[i].clone());
}}return hv;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(bX,cr)){if(this.__ew){qx.locale.Manager.getInstance().removeListenerById(this.__ew);
}}this.getContainerElement().setAttribute(t,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var hy=qx.ui.core.Widget;
var hx=this.getContainerElement();

if(this.__es){hx.remove(this.__es);
hy.__eq.poolDecorator(this.__es);
}
if(this.__et){hx.remove(this.__et);
hy.__er.poolDecorator(this.__et);
}this.clearSeparators();
this.__es=this.__et=this.__ez=null;
}else{this._disposeArray(k);
this._disposeObjects(cF,cf);
}this._disposeArray(bD);
this.__eF=this.__eI=null;
this._disposeObjects(w,bj,bO,bG);
}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.container.Composite",b="addChildWidget",a="removeChildWidget";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(e){qx.ui.core.Widget.call(this);

if(e!=null){this._setLayout(e);
}},events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(f){this.fireNonBubblingEvent(b,qx.event.type.Data,[f]);
},_afterRemoveChild:function(g){this.fireNonBubblingEvent(a,qx.event.type.Data,[g]);
}},defer:function(h,i){qx.ui.core.MChildrenHandling.remap(i);
qx.ui.core.MLayoutHandling.remap(i);
}});
})();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){qx.ui.container.Composite.call(this,f);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{_applyVisibility:function(g,h){qx.ui.container.Composite.prototype._applyVisibility.call(this,g,h);
var i=qx.ui.popup.Manager.getInstance();
g===d?i.add(this):i.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var l="atom",k="Integer",j="String",i="_applyRich",h="qx.ui.tooltip.ToolTip",g="_applyIcon",f="tooltip",d="qx.ui.core.Widget",c="mouseover",b="Boolean",a="_applyLabel";
qx.Class.define(h,{extend:qx.ui.popup.Popup,construct:function(m,n){qx.ui.popup.Popup.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(l);
if(m!=null){this.setLabel(m);
}
if(n!=null){this.setIcon(n);
}this.addListener(c,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:f},showTimeout:{check:k,init:700,themeable:true},hideTimeout:{check:k,init:4000,themeable:true},label:{check:j,nullable:true,apply:a},icon:{check:j,nullable:true,apply:g,themeable:true},rich:{check:b,init:false,apply:i},opener:{check:d,nullable:true}},members:{_createChildControlImpl:function(o,p){var q;

switch(o){case l:q=new qx.ui.basic.Atom;
this._add(q);
break;
}return q||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,o);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(r,s){var t=this.getChildControl(l);
r==null?t.resetIcon():t.setIcon(r);
},_applyLabel:function(u,v){var w=this.getChildControl(l);
u==null?w.resetLabel():w.setLabel(u);
},_applyRich:function(x,y){var z=this.getChildControl(l);
z.setRich(x);
}}});
})();
(function(){var f="interval",e="Number",d="_applyTimeoutInterval",c="qx.event.type.Event",b="qx.event.Idle",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){qx.core.Object.call(this);
var g=new qx.event.Timer(this.getTimeoutInterval());
g.addListener(f,this._onInterval,this);
g.start();
this.__eJ=g;
},events:{"interval":c},properties:{timeoutInterval:{check:e,init:100,apply:d}},members:{__eJ:null,_applyTimeoutInterval:function(h){this.__eJ.setInterval(h);
},_onInterval:function(){this.fireEvent(f);
}},destruct:function(){if(this.__eJ){this.__eJ.stop();
}this.__eJ=null;
}});
})();
(function(){var j="borderTopWidth",i="borderLeftWidth",h="marginTop",g="marginLeft",f="scroll",e="qx.client",d="border-box",c="borderBottomWidth",b="borderRightWidth",a="auto",y="padding",x="qx.bom.element.Location",w="paddingLeft",v="static",u="marginBottom",t="visible",s="BODY",r="paddingBottom",q="paddingTop",p="marginRight",n="position",o="margin",l="overflow",m="paddingRight",k="border";
qx.Class.define(x,{statics:{__eK:function(z,A){return qx.bom.element.Style.get(z,A,qx.bom.element.Style.COMPUTED_MODE,false);
},__eL:function(B,C){return parseInt(qx.bom.element.Style.get(B,C,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__eM:function(D){var G=0,top=0;
if(D.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var F=qx.dom.Node.getWindow(D);
G-=qx.bom.Viewport.getScrollLeft(F);
top-=qx.bom.Viewport.getScrollTop(F);
}else{var E=qx.dom.Node.getDocument(D).body;
D=D.parentNode;
while(D&&D!=E){G+=D.scrollLeft;
top+=D.scrollTop;
D=D.parentNode;
}}return {left:G,top:top};
},__eN:qx.core.Variant.select(e,{"mshtml":function(H){var J=qx.dom.Node.getDocument(H);
var I=J.body;
var K=0;
var top=0;
K-=I.clientLeft+J.documentElement.clientLeft;
top-=I.clientTop+J.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){K+=this.__eL(I,i);
top+=this.__eL(I,j);
}return {left:K,top:top};
},"webkit":function(L){var N=qx.dom.Node.getDocument(L);
var M=N.body;
var O=M.offsetLeft;
var top=M.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){O+=this.__eL(M,i);
top+=this.__eL(M,j);
}return {left:O,top:top};
},"gecko":function(P){var Q=qx.dom.Node.getDocument(P).body;
var R=Q.offsetLeft;
var top=Q.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){R+=this.__eL(Q,g);
top+=this.__eL(Q,h);
}if(qx.bom.element.BoxSizing.get(Q)!==d){R+=this.__eL(Q,i);
top+=this.__eL(Q,j);
}return {left:R,top:top};
},"default":function(S){var T=qx.dom.Node.getDocument(S).body;
var U=T.offsetLeft;
var top=T.offsetTop;
return {left:U,top:top};
}}),__eO:qx.core.Variant.select(e,{"mshtml|webkit":function(V){var X=qx.dom.Node.getDocument(V);
if(V.getBoundingClientRect){var Y=V.getBoundingClientRect();
var ba=Y.left;
var top=Y.top;
}else{var ba=V.offsetLeft;
var top=V.offsetTop;
V=V.offsetParent;
var W=X.body;
while(V&&V!=W){ba+=V.offsetLeft;
top+=V.offsetTop;
ba+=this.__eL(V,i);
top+=this.__eL(V,j);
V=V.offsetParent;
}}return {left:ba,top:top};
},"gecko":function(bb){if(bb.getBoundingClientRect){var be=bb.getBoundingClientRect();
var bf=Math.round(be.left);
var top=Math.round(be.top);
}else{var bf=0;
var top=0;
var bc=qx.dom.Node.getDocument(bb).body;
var bd=qx.bom.element.BoxSizing;

if(bd.get(bb)!==d){bf-=this.__eL(bb,i);
top-=this.__eL(bb,j);
}
while(bb&&bb!==bc){bf+=bb.offsetLeft;
top+=bb.offsetTop;
if(bd.get(bb)!==d){bf+=this.__eL(bb,i);
top+=this.__eL(bb,j);
}if(bb.parentNode&&this.__eK(bb.parentNode,l)!=t){bf+=this.__eL(bb.parentNode,i);
top+=this.__eL(bb.parentNode,j);
}bb=bb.offsetParent;
}}return {left:bf,top:top};
},"default":function(bg){var bi=0;
var top=0;
var bh=qx.dom.Node.getDocument(bg).body;
while(bg&&bg!==bh){bi+=bg.offsetLeft;
top+=bg.offsetTop;
bg=bg.offsetParent;
}return {left:bi,top:top};
}}),get:function(bj,bk){if(bj.tagName==s){var location=this.__eP(bj);
var br=location.left;
var top=location.top;
}else{var bl=this.__eN(bj);
var bq=this.__eO(bj);
var scroll=this.__eM(bj);
var br=bq.left+bl.left-scroll.left;
var top=bq.top+bl.top-scroll.top;
}var bm=br+bj.offsetWidth;
var bn=top+bj.offsetHeight;

if(bk){if(bk==y||bk==f){var bo=qx.bom.element.Overflow.getX(bj);

if(bo==f||bo==a){bm+=bj.scrollWidth-bj.offsetWidth+this.__eL(bj,i)+this.__eL(bj,b);
}var bp=qx.bom.element.Overflow.getY(bj);

if(bp==f||bp==a){bn+=bj.scrollHeight-bj.offsetHeight+this.__eL(bj,j)+this.__eL(bj,c);
}}
switch(bk){case y:br+=this.__eL(bj,w);
top+=this.__eL(bj,q);
bm-=this.__eL(bj,m);
bn-=this.__eL(bj,r);
case f:br-=bj.scrollLeft;
top-=bj.scrollTop;
bm-=bj.scrollLeft;
bn-=bj.scrollTop;
case k:br+=this.__eL(bj,i);
top+=this.__eL(bj,j);
bm-=this.__eL(bj,b);
bn-=this.__eL(bj,c);
break;
case o:br-=this.__eL(bj,g);
top-=this.__eL(bj,h);
bm+=this.__eL(bj,p);
bn+=this.__eL(bj,u);
break;
}}return {left:br,top:top,right:bm,bottom:bn};
},__eP:qx.core.Variant.select(e,{"default":function(bs){var top=bs.offsetTop+this.__eL(bs,h);
var bt=bs.offsetLeft+this.__eL(bs,g);
return {left:bt,top:top};
},"mshtml":function(bu){var top=bu.offsetTop;
var bv=bu.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__eL(bu,h);
bv+=this.__eL(bu,g);
}return {left:bv,top:top};
},"gecko":function(bw){var top=bw.offsetTop+this.__eL(bw,h)+this.__eL(bw,i);
var bx=bw.offsetLeft+this.__eL(bw,g)+this.__eL(bw,j);
return {left:bx,top:top};
}}),getLeft:function(by,bz){return this.get(by,bz).left;
},getTop:function(bA,bB){return this.get(bA,bB).top;
},getRight:function(bC,bD){return this.get(bC,bD).right;
},getBottom:function(bE,bF){return this.get(bE,bF).bottom;
},getRelative:function(bG,bH,bI,bJ){var bL=this.get(bG,bI);
var bK=this.get(bH,bJ);
return {left:bL.left-bK.left,top:bL.top-bK.top,right:bL.right-bK.right,bottom:bL.bottom-bK.bottom};
},getPosition:function(bM){return this.getRelative(bM,this.getOffsetParent(bM));
},getOffsetParent:function(bN){var bP=bN.offsetParent||document.body;
var bO=qx.bom.element.Style;

while(bP&&(!/^body|html$/i.test(bP.tagName)&&bO.get(bP,n)===v)){bP=bP.offsetParent;
}return bP;
}}});
})();
(function(){var k="",j="qx.client",i="hidden",h="-moz-scrollbars-none",g="overflow",f=";",e="overflowY",d=":",b="overflowX",a="overflow:",y="none",x="scroll",w="borderLeftStyle",v="borderRightStyle",u="div",r="borderRightWidth",q="overflow-y",p="borderLeftWidth",o="-moz-scrollbars-vertical",n="100px",l="qx.bom.element.Overflow",m="overflow-x";
qx.Class.define(l,{statics:{__eQ:null,getScrollbarWidth:function(){if(this.__eQ!==null){return this.__eQ;
}var z=qx.bom.element.Style;
var B=function(F,G){return parseInt(z.get(F,G),10)||0;
};
var C=function(H){return (z.get(H,v)==y?0:B(H,r));
};
var A=function(I){return (z.get(I,w)==y?0:B(I,p));
};
var E=qx.core.Variant.select(j,{"mshtml":function(J){if(z.get(J,e)==i||J.clientWidth==0){return C(J);
}return Math.max(0,J.offsetWidth-J.clientLeft-J.clientWidth);
},"default":function(K){if(K.clientWidth==0){var L=z.get(K,g);
var M=(L==x||L==o?16:0);
return Math.max(0,C(K)+M);
}return Math.max(0,(K.offsetWidth-K.clientWidth-A(K)));
}});
var D=function(N){return E(N)-C(N);
};
var t=document.createElement(u);
var s=t.style;
s.height=s.width=n;
s.overflow=x;
document.body.appendChild(t);
var c=D(t);
this.__eQ=c?c:16;
document.body.removeChild(t);
return this.__eQ;
},_compile:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(O,P){if(P==i){P=h;
}return a+P+f;
}:
function(Q,R){return Q+d+R+f;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(S,T){return a+T+f;
}:
function(U,V){return U+d+V+f;
},"default":function(W,X){return W+d+X+f;
}}),compileX:function(Y){return this._compile(m,Y);
},compileY:function(ba){return this._compile(q,ba);
},getX:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bb,bc){var bd=qx.bom.element.Style.get(bb,g,bc,false);

if(bd===h){bd=i;
}return bd;
}:
function(be,bf){return qx.bom.element.Style.get(be,b,bf,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bg,bh){return qx.bom.element.Style.get(bg,g,bh,false);
}:
function(bi,bj){return qx.bom.element.Style.get(bi,b,bj,false);
},"default":function(bk,bl){return qx.bom.element.Style.get(bk,b,bl,false);
}}),setX:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bm,bn){if(bn==i){bn=h;
}bm.style.overflow=bn;
}:
function(bo,bp){bo.style.overflowX=bp;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bq,br){bq.style.overflow=br;
}:
function(bs,bt){bs.style.overflowX=bt;
},"default":function(bu,bv){bu.style.overflowX=bv;
}}),resetX:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bw){bw.style.overflow=k;
}:
function(bx){bx.style.overflowX=k;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(by,bz){by.style.overflow=k;
}:
function(bA,bB){bA.style.overflowX=k;
},"default":function(bC){bC.style.overflowX=k;
}}),getY:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bD,bE){var bF=qx.bom.element.Style.get(bD,g,bE,false);

if(bF===h){bF=i;
}return bF;
}:
function(bG,bH){return qx.bom.element.Style.get(bG,e,bH,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bI,bJ){return qx.bom.element.Style.get(bI,g,bJ,false);
}:
function(bK,bL){return qx.bom.element.Style.get(bK,e,bL,false);
},"default":function(bM,bN){return qx.bom.element.Style.get(bM,e,bN,false);
}}),setY:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bO,bP){if(bP===i){bP=h;
}bO.style.overflow=bP;
}:
function(bQ,bR){bQ.style.overflowY=bR;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bS,bT){bS.style.overflow=bT;
}:
function(bU,bV){bU.style.overflowY=bV;
},"default":function(bW,bX){bW.style.overflowY=bX;
}}),resetY:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bY){bY.style.overflow=k;
}:
function(ca){ca.style.overflowY=k;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(cb,cc){cb.style.overflow=k;
}:
function(cd,ce){cd.style.overflowY=k;
},"default":function(cf){cf.style.overflowY=k;
}})}});
})();
(function(){var o="auto",n="px",m=",",l="clip:auto;",k="rect(",j=");",i="",h=")",g="qx.bom.element.Clip",f="string",c="clip:rect(",e=" ",d="clip",b="rect(auto,auto,auto,auto)",a="rect(auto, auto, auto, auto)";
qx.Class.define(g,{statics:{compile:function(p){if(!p){return l;
}var u=p.left;
var top=p.top;
var t=p.width;
var s=p.height;
var q,r;

if(u==null){q=(t==null?o:t+n);
u=o;
}else{q=(t==null?o:u+t+n);
u=u+n;
}
if(top==null){r=(s==null?o:s+n);
top=o;
}else{r=(s==null?o:top+s+n);
top=top+n;
}return c+top+m+q+m+r+m+u+j;
},get:function(v,w){var y=qx.bom.element.Style.get(v,d,w,false);
var E,top,C,B;
var x,z;

if(typeof y===f&&y!==o&&y!==i){y=qx.lang.String.trim(y);
if(/\((.*)\)/.test(y)){var D=RegExp.$1;
if(/,/.test(D)){var A=D.split(m);
}else{var A=D.split(e);
}top=qx.lang.String.trim(A[0]);
x=qx.lang.String.trim(A[1]);
z=qx.lang.String.trim(A[2]);
E=qx.lang.String.trim(A[3]);
if(E===o){E=null;
}
if(top===o){top=null;
}
if(x===o){x=null;
}
if(z===o){z=null;
}if(top!=null){top=parseInt(top,10);
}
if(x!=null){x=parseInt(x,10);
}
if(z!=null){z=parseInt(z,10);
}
if(E!=null){E=parseInt(E,10);
}if(x!=null&&E!=null){C=x-E;
}else if(x!=null){C=x;
}
if(z!=null&&top!=null){B=z-top;
}else if(z!=null){B=z;
}}else{throw new Error("Could not parse clip string: "+y);
}}return {left:E||null,top:top||null,width:C||null,height:B||null};
},set:function(F,G){if(!G){F.style.clip=b;
return;
}var L=G.left;
var top=G.top;
var K=G.width;
var J=G.height;
var H,I;

if(L==null){H=(K==null?o:K+n);
L=o;
}else{H=(K==null?o:L+K+n);
L=L+n;
}
if(top==null){I=(J==null?o:J+n);
top=o;
}else{I=(J==null?o:top+J+n);
top=top+n;
}F.style.clip=k+top+m+H+m+I+m+L+h;
},reset:function(M){M.style.clip=a;
}}});
})();
(function(){var m="",l="qx.client",k=";",j="opacity:",i="opacity",h="filter",g="MozOpacity",f=");",e=")",d="zoom:1;filter:alpha(opacity=",a="qx.bom.element.Opacity",c="alpha(opacity=",b="-moz-opacity:";
qx.Class.define(a,{statics:{SUPPORT_CSS3_OPACITY:false,compile:qx.core.Variant.select(l,{"mshtml":function(n){if(n>=1){n=1;
}
if(n<0.00001){n=0;
}
if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){return j+n+k;
}else{return d+(n*100)+f;
}},"gecko":function(o){if(o>=1){o=0.999999;
}
if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){return b+o+k;
}else{return j+o+k;
}},"default":function(p){if(p>=1){return m;
}return j+p+k;
}}),set:qx.core.Variant.select(l,{"mshtml":function(q,r){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){if(r>=1){r=m;
}q.style.opacity=r;
}else{var s=qx.bom.element.Style.get(q,h,qx.bom.element.Style.COMPUTED_MODE,false);

if(r>=1){r=1;
}
if(r<0.00001){r=0;
}if(!q.currentStyle||!q.currentStyle.hasLayout){q.style.zoom=1;
}q.style.filter=s.replace(/alpha\([^\)]*\)/gi,m)+c+r*100+e;
}},"gecko":function(t,u){if(u>=1){u=0.999999;
}
if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){t.style.MozOpacity=u;
}else{t.style.opacity=u;
}},"default":function(v,w){if(w>=1){w=m;
}v.style.opacity=w;
}}),reset:qx.core.Variant.select(l,{"mshtml":function(x){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){x.style.opacity=m;
}else{var y=qx.bom.element.Style.get(x,h,qx.bom.element.Style.COMPUTED_MODE,false);
x.style.filter=y.replace(/alpha\([^\)]*\)/gi,m);
}},"gecko":function(z){if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){z.style.MozOpacity=m;
}else{z.style.opacity=m;
}},"default":function(A){A.style.opacity=m;
}}),get:qx.core.Variant.select(l,{"mshtml":function(B,C){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){var D=qx.bom.element.Style.get(B,i,C,false);

if(D!=null){return parseFloat(D);
}return 1.0;
}else{var E=qx.bom.element.Style.get(B,h,C,false);

if(E){var D=E.match(/alpha\(opacity=(.*)\)/);

if(D&&D[1]){return parseFloat(D[1])/100;
}}return 1.0;
}},"gecko":function(F,G){var H=qx.bom.element.Style.get(F,!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY?g:i,G,false);

if(H==0.999999){H=1.0;
}
if(H!=null){return parseFloat(H);
}return 1.0;
},"default":function(I,J){var K=qx.bom.element.Style.get(I,i,J,false);

if(K!=null){return parseFloat(K);
}return 1.0;
}})},defer:function(L){L.SUPPORT_CSS3_OPACITY=(typeof document.documentElement.style.opacity=="string");
}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__eR:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(l){return f+(this.__eR[l]||l)+d;
},get:function(m,n){return qx.bom.element.Style.get(m,b,n,false);
},set:function(o,p){o.style.cursor=this.__eR[p]||p;
},reset:function(q){q.style.cursor=g;
}}});
})();
(function(){var s="qx.client",r="",q="qx.debug",p="boxSizing",o="on",n="box-sizing",m=":",k="border-box",j="qx.bom.element.BoxSizing",h="KhtmlBoxSizing",c="-moz-box-sizing",g="WebkitBoxSizing",f=";",b="-khtml-box-sizing",a="content-box",e="-webkit-box-sizing",d="MozBoxSizing";
qx.Class.define(j,{statics:{__eS:qx.core.Variant.select(s,{"mshtml":null,"webkit":[p,h,g],"gecko":[d],"opera":[p]}),__eT:qx.core.Variant.select(s,{"mshtml":null,"webkit":[n,b,e],"gecko":[c],"opera":[n]}),__eU:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__eV:function(t){var u=this.__eU;
return u.tags[t.tagName.toLowerCase()]||u.types[t.type];
},compile:qx.core.Variant.select(s,{"mshtml":function(v){if(qx.core.Variant.isSet(q,o)){qx.log.Logger.warn(this,"This client do not support the dynamic modification of the box-sizing property.");
qx.log.Logger.trace();
}},"default":function(w){var y=this.__eT;
var x=r;

if(y){for(var i=0,l=y.length;i<l;i++){x+=y[i]+m+w+f;
}}return x;
}}),get:qx.core.Variant.select(s,{"mshtml":function(z){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(z))){if(!this.__eV(z)){return a;
}}return k;
},"default":function(A){var C=this.__eS;
var B;

if(C){for(var i=0,l=C.length;i<l;i++){B=qx.bom.element.Style.get(A,C[i],null,false);

if(B!=null&&B!==r){return B;
}}}return r;
}}),set:qx.core.Variant.select(s,{"mshtml":function(D,E){if(qx.core.Variant.isSet(q,o)){qx.log.Logger.warn(this,"This client do not support the dynamic modification of the box-sizing property.");
}},"default":function(F,G){var H=this.__eS;

if(H){for(var i=0,l=H.length;i<l;i++){F.style[H[i]]=G;
}}}}),reset:function(I){this.set(I,r);
}}});
})();
(function(){var m="",k="qx.client",h="userSelect",g="qx.debug",f="on",e="Invalid argument 'smart'",d="style",c="Invalid argument 'element'",b="MozUserModify",a="px",L="float",K="borderImage",J="styleFloat",I="appearance",H="pixelHeight",G='Ms',F=":",E="cssFloat",D="pixelTop",C="Invalid argument 'name'",t="pixelLeft",u='O',r="Invalid argument 'styles'",s="qx.bom.element.Style",p='Khtml',q='string',n="pixelRight",o='Moz',v="pixelWidth",w="pixelBottom",y=";",x="textOverflow",A="userModify",z='Webkit',B="WebkitUserModify";
qx.Class.define(s,{statics:{__eW:function(){var M=[I,h,x,K];
var Q={};
var N=document.documentElement.style;
var R=[o,z,p,u,G];

for(var i=0,l=M.length;i<l;i++){var S=M[i];
var O=S;

if(N[S]){Q[O]=S;
continue;
}S=qx.lang.String.firstUp(S);

for(var j=0,T=R.length;j<T;j++){var P=R[j]+S;

if(typeof N[P]==q){Q[O]=P;
break;
}}}this.__eX=Q;
this.__eX[A]=qx.core.Variant.select(k,{"gecko":b,"webkit":B,"default":h});
this.__eY={};

for(var O in Q){this.__eY[O]=this.__fd(Q[O]);
}this.__eX[L]=qx.core.Variant.select(k,{"mshtml":J,"default":E});
},__fa:{width:v,height:H,left:t,right:n,top:D,bottom:w},__fb:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(U){var W=[];
var Y=this.__fb;
var X=this.__eY;
var name,V;

for(name in U){V=U[name];

if(V==null){continue;
}name=X[name]||name;
if(Y[name]){W.push(Y[name].compile(V));
}else{W.push(this.__fd(name),F,V,y);
}}return W.join(m);
},__fc:{},__fd:function(ba){var bb=this.__fc;
var bc=bb[ba];

if(!bc){bc=bb[ba]=qx.lang.String.hyphenate(ba);
}return bc;
},setCss:qx.core.Variant.select(k,{"mshtml":function(bd,be){bd.style.cssText=be;
},"default":function(bf,bg){bf.setAttribute(d,bg);
}}),getCss:qx.core.Variant.select(k,{"mshtml":function(bh){return bh.style.cssText.toLowerCase();
},"default":function(bi){return bi.getAttribute(d);
}}),isPropertySupported:function(bj){return (this.__fb[bj]||this.__eX[bj]||bj in document.documentElement.style);
},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(bk,name,bl,bm){if(qx.core.Variant.isSet(g,f)){qx.core.Assert.assertElement(bk,c);
qx.core.Assert.assertString(name,C);

if(bm!==undefined){qx.core.Assert.assertBoolean(bm,e);
}}name=this.__eX[name]||name;
if(bm!==false&&this.__fb[name]){return this.__fb[name].set(bk,bl);
}else{bk.style[name]=bl!==null?bl:m;
}},setStyles:function(bn,bo,bp){if(qx.core.Variant.isSet(g,f)){qx.core.Assert.assertElement(bn,c);
qx.core.Assert.assertMap(bo,r);

if(bp!==undefined){qx.core.Assert.assertBoolean(bp,e);
}}var bs=this.__eX;
var bu=this.__fb;
var bq=bn.style;

for(var bt in bo){var br=bo[bt];
var name=bs[bt]||bt;

if(br===undefined){if(bp!==false&&bu[name]){bu[name].reset(bn);
}else{bq[name]=m;
}}else{if(bp!==false&&bu[name]){bu[name].set(bn,br);
}else{bq[name]=br!==null?br:m;
}}}},reset:function(bv,name,bw){name=this.__eX[name]||name;
if(bw!==false&&this.__fb[name]){return this.__fb[name].reset(bv);
}else{bv.style[name]=m;
}},get:qx.core.Variant.select(k,{"mshtml":function(bx,name,by,bz){name=this.__eX[name]||name;
if(bz!==false&&this.__fb[name]){return this.__fb[name].get(bx,by);
}if(!bx.currentStyle){return bx.style[name]||m;
}switch(by){case this.LOCAL_MODE:return bx.style[name]||m;
case this.CASCADED_MODE:return bx.currentStyle[name]||m;
default:var bD=bx.currentStyle[name]||m;
if(/^-?[\.\d]+(px)?$/i.test(bD)){return bD;
}var bC=this.__fa[name];

if(bC){var bA=bx.style[name];
bx.style[name]=bD||0;
var bB=bx.style[bC]+a;
bx.style[name]=bA;
return bB;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(bD)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return bD;
}},"default":function(bE,name,bF,bG){name=this.__eX[name]||name;
if(bG!==false&&this.__fb[name]){return this.__fb[name].get(bE,bF);
}switch(bF){case this.LOCAL_MODE:return bE.style[name]||m;
case this.CASCADED_MODE:if(bE.currentStyle){return bE.currentStyle[name]||m;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var bH=qx.dom.Node.getDocument(bE);
var bI=bH.defaultView.getComputedStyle(bE,null);
return bI?bI[name]:m;
}}})},defer:function(bJ){bJ.__eW();
}});
})();
(function(){var f="CSS1Compat",e="position:absolute;width:0;height:0;width:1",d="qx.bom.Document",c="1px",b="qx.client",a="div";
qx.Class.define(d,{statics:{isQuirksMode:qx.core.Variant.select(b,{"mshtml":function(g){if(qx.bom.client.Engine.VERSION>=8){return (g||window).document.documentMode===5;
}else{return (g||window).document.compatMode!==f;
}},"webkit":function(h){if(document.compatMode===undefined){var i=(h||window).document.createElement(a);
i.style.cssText=e;
return i.style.width===c?true:false;
}else{return (h||window).document.compatMode!==f;
}},"default":function(j){return (j||window).document.compatMode!==f;
}}),isStandardMode:function(k){return !this.isQuirksMode(k);
},getWidth:function(l){var m=(l||window).document;
var n=qx.bom.Viewport.getWidth(l);
var scroll=this.isStandardMode(l)?m.documentElement.scrollWidth:m.body.scrollWidth;
return Math.max(scroll,n);
},getHeight:function(o){var p=(o||window).document;
var q=qx.bom.Viewport.getHeight(o);
var scroll=this.isStandardMode(o)?p.documentElement.scrollHeight:p.body.scrollHeight;
return Math.max(scroll,q);
}}});
})();
(function(){var b="qx.client",a="qx.bom.Viewport";
qx.Class.define(a,{statics:{getWidth:qx.core.Variant.select(b,{"opera":function(c){if(qx.bom.client.Engine.VERSION<9.5){return (c||window).document.body.clientWidth;
}else{var d=(c||window).document;
return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;
}},"webkit":function(e){if(qx.bom.client.Engine.VERSION<523.15){return (e||window).innerWidth;
}else{var f=(e||window).document;
return qx.bom.Document.isStandardMode(e)?f.documentElement.clientWidth:f.body.clientWidth;
}},"default":function(g){var h=(g||window).document;
return qx.bom.Document.isStandardMode(g)?h.documentElement.clientWidth:h.body.clientWidth;
}}),getHeight:qx.core.Variant.select(b,{"opera":function(i){if(qx.bom.client.Engine.VERSION<9.5){return (i||window).document.body.clientHeight;
}else{var j=(i||window).document;
return qx.bom.Document.isStandardMode(i)?j.documentElement.clientHeight:j.body.clientHeight;
}},"webkit":function(k){if(qx.bom.client.Engine.VERSION<523.15){return (k||window).innerHeight;
}else{var l=(k||window).document;
return qx.bom.Document.isStandardMode(k)?l.documentElement.clientHeight:l.body.clientHeight;
}},"default":function(m){var n=(m||window).document;
return qx.bom.Document.isStandardMode(m)?n.documentElement.clientHeight:n.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(b,{"mshtml":function(o){var p=(o||window).document;
return p.documentElement.scrollLeft||p.body.scrollLeft;
},"default":function(q){return (q||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(b,{"mshtml":function(r){var s=(r||window).document;
return s.documentElement.scrollTop||s.body.scrollTop;
},"default":function(t){return (t||window).pageYOffset;
}}),getOrientation:function(u){var v=(u||window).orientation;

if(v==null){v=this.getWidth(u)>this.getHeight(u)?90:0;
}return v;
},isLandscape:function(w){return Math.abs(this.getOrientation(w))==90;
},isPortrait:function(x){var y=this.getOrientation(x);
return (y==0||y==180);
}}});
})();
(function(){var j="top",i="right",h="bottom",g="left",f="edge-start",e="align-start",d="align-end",c="edge-end",b="qx.util.placement.AbstractAxis",a="-",G="best-fit",F="size",E="target.bottom",D="offsets",C="size.width",B="offsets.bottom",A="qx.util.placement.Placement",z="qx.debug",y="keep-align",x="target.right",q="direct",r="offsets.right",o="target",p="offsets.left",m="area",n="target.top",k='__fe',l="area.height",s="target.left",t="area.width",v="on",u="size.height",w="offsets.top";
qx.Class.define(A,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__fe=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:b},axisY:{check:b},edge:{check:[j,i,h,g],init:j},align:{check:[j,i,h,g],init:i}},statics:{__ff:null,compute:function(H,I,J,K,L,M,N){this.__ff=this.__ff||new qx.util.placement.Placement();
var Q=L.split(a);
var P=Q[0];
var O=Q[1];
this.__ff.set({axisX:this.__fj(M),axisY:this.__fj(N),edge:P,align:O});
return this.__ff.compute(H,I,J,K);
},__fg:null,__fh:null,__fi:null,__fj:function(R){switch(R){case q:this.__fg=this.__fg||new qx.util.placement.DirectAxis();
return this.__fg;
case y:this.__fh=this.__fh||new qx.util.placement.KeepAlignAxis();
return this.__fh;
case G:this.__fi=this.__fi||new qx.util.placement.BestFitAxis();
return this.__fi;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__fe:null,compute:function(S,T,U,V){if(qx.core.Variant.isSet(z,v)){this.assertObject(S,F);
this.assertNumber(S.width,C);
this.assertNumber(S.height,u);
this.assertObject(T,m);
this.assertNumber(T.width,t);
this.assertNumber(T.height,l);
this.assertObject(U,o);
this.assertNumber(U.top,n);
this.assertNumber(U.right,x);
this.assertNumber(U.bottom,E);
this.assertNumber(U.left,s);
this.assertObject(V,D);
this.assertNumber(V.top,w);
this.assertNumber(V.right,r);
this.assertNumber(V.bottom,B);
this.assertNumber(V.left,p);
}var W=this.getAxisX()||this.__fe;
var Y=W.computeStart(S.width,{start:U.left,end:U.right},{start:V.left,end:V.right},T.width,this.__fk());
var X=this.getAxisY()||this.__fe;
var top=X.computeStart(S.height,{start:U.top,end:U.bottom},{start:V.top,end:V.bottom},T.height,this.__fl());
return {left:Y,top:top};
},__fk:function(){var bb=this.getEdge();
var ba=this.getAlign();

if(bb==g){return f;
}else if(bb==i){return c;
}else if(ba==g){return e;
}else if(ba==i){return d;
}},__fl:function(){var bd=this.getEdge();
var bc=this.getAlign();

if(bd==j){return f;
}else if(bd==h){return c;
}else if(bc==j){return e;
}else if(bc==h){return d;
}}},destruct:function(){this._disposeObjects(k);
}});
})();
(function(){var e="edge-start",d="align-start",c="align-end",b="edge-end",a="qx.util.placement.AbstractAxis";
qx.Class.define(a,{extend:qx.core.Object,members:{computeStart:function(f,g,h,i,j){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(k,l,m,n){switch(n){case e:return l.start-m.end-k;
case b:return l.end+m.start;
case d:return l.start+m.start;
case c:return l.end-m.end-k;
}},_isInRange:function(o,p,q){return o>=0&&o+p<=q;
}}});
})();
(function(){var a="qx.util.placement.DirectAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);
}}});
})();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";
qx.Class.define(c,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);
var j,k;

if(this._isInRange(i,d,g)){return i;
}
if(h==b||h==a){j=e.start-f.end;
k=e.end+f.start;
}else{j=e.end-f.end;
k=e.start+f.start;
}
if(j>g-k){i=j-d;
}else{i=k;
}return i;
}}});
})();
(function(){var a="qx.util.placement.BestFitAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){var g=this._moveToEdgeAndAlign(b,c,d,f);

if(this._isInRange(g,b,e)){return g;
}
if(g<0){g=Math.min(0,e-b);
}
if(g+b>e){g=Math.max(0,e-b);
}return g;
}}});
})();
(function(){var b="qx.ui.core.queue.Layout",a="layout";
qx.Class.define(b,{statics:{__fm:{},remove:function(c){delete this.__fm[c.$$hash];
},add:function(d){this.__fm[d.$$hash]=d;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var e=this.__fp();
for(var i=e.length-1;i>=0;i--){var f=e[i];
if(f.hasValidLayout()){continue;
}if(f.isRootWidget()&&!f.hasUserBounds()){var h=f.getSizeHint();
f.renderLayout(0,0,h.width,h.height);
}else{var g=f.getBounds();
f.renderLayout(g.left,g.top,g.width,g.height);
}}},getNestingLevel:function(j){var k=this.__fo;
var m=0;
var parent=j;
while(true){if(k[parent.$$hash]!=null){m+=k[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
m+=1;
}var l=m;

while(j&&j!==parent){k[j.$$hash]=l--;
j=j.$$parent;
}return m;
},__fn:function(){var s=qx.ui.core.queue.Visibility;
this.__fo={};
var r=[];
var q=this.__fm;
var n,p;

for(var o in q){n=q[o];

if(s.isVisible(n)){p=this.getNestingLevel(n);
if(!r[p]){r[p]={};
}r[p][o]=n;
delete q[o];
}}return r;
},__fp:function(){var w=[];
var y=this.__fn();

for(var v=y.length-1;v>=0;v--){if(!y[v]){continue;
}
for(var u in y[v]){var t=y[v][u];
if(v==0||t.isRootWidget()||t.hasUserBounds()){w.push(t);
t.invalidateLayoutCache();
continue;
}var A=t.getSizeHint(false);

if(A){t.invalidateLayoutCache();
var x=t.getSizeHint();
var z=(!t.getBounds()||A.minWidth!==x.minWidth||A.width!==x.width||A.maxWidth!==x.maxWidth||A.minHeight!==x.minHeight||A.height!==x.height||A.maxHeight!==x.maxHeight);
}else{z=true;
}
if(z){var parent=t.getLayoutParent();

if(!y[v-1]){y[v-1]={};
}y[v-1][parent.$$hash]=parent;
}else{w.push(t);
}}}return w;
}}});
})();
(function(){var b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__fq={};
this.__fr=qx.lang.Function.bind(this.__fv,this);
this.__fs=false;
},members:{__ft:null,__fu:null,__fq:null,__fs:null,__fr:null,schedule:function(c){if(this.__ft==null){this.__ft=window.setTimeout(this.__fr,0);
}var d=c.toHashCode();
if(this.__fu&&this.__fu[d]){return;
}this.__fq[d]=c;
this.__fs=true;
},cancel:function(e){var f=e.toHashCode();
if(this.__fu&&this.__fu[f]){this.__fu[f]=null;
return;
}delete this.__fq[f];
if(qx.lang.Object.isEmpty(this.__fq)&&this.__ft!=null){window.clearTimeout(this.__ft);
this.__ft=null;
}},__fv:qx.event.GlobalError.observeMethod(function(){this.__ft=null;
while(this.__fs){this.__fu=qx.lang.Object.clone(this.__fq);
this.__fq={};
this.__fs=false;

for(var h in this.__fu){var g=this.__fu[h];

if(g){this.__fu[h]=null;
g.call();
}}}this.__fu=null;
})},destruct:function(){if(this.__ft!=null){window.clearTimeout(this.__ft);
}this.__fr=this.__fq=null;
}});
})();
(function(){var a="qx.util.DeferredCall";
qx.Class.define(a,{extend:qx.core.Object,construct:function(b,c){qx.core.Object.call(this);
this.__fw=b;
this.__fx=c||null;
this.__fy=qx.util.DeferredCallManager.getInstance();
},members:{__fw:null,__fx:null,__fy:null,cancel:function(){this.__fy.cancel(this);
},schedule:function(){this.__fy.schedule(this);
},call:function(){this.__fx?this.__fw.apply(this.__fx):this.__fw();
}},destruct:function(d,e){this.cancel();
this.__fx=this.__fw=this.__fy=null;
}});
})();
(function(){var m="on",k="element",j="qx.debug",h="qx.client",g="qxSelectable",f="off",d="text",c="': ",b="Invalid context for callback.",a="div",R="'",Q="Invalid event type.",P="Invalid callback function",O="",N="mshtml",M="none",L="scroll",K="|bubble|",J="qx.html.Element",I="|capture|",t="__fV",u="Invalid capture flag.",r="activate",s="Failed to add event listener for type '",p="blur",q="deactivate",n="capture",o="userSelect",v=" from the target '",w="-moz-none",B="visible",A="releaseCapture",D="tabIndex",C="focus",F="MozUserSelect",E=" to the target '",z="Failed to remove event listener for type '",H="Invalid capture falg.",G="hidden";
qx.Class.define(J,{extend:qx.core.Object,construct:function(S,T,U){qx.core.Object.call(this);
this.__fz=S||a;
this.__fA=T||null;
this.__fB=U||null;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__fC:{},_scheduleFlush:function(V){qx.html.Element.__gh.schedule();
},flush:function(){var bh;

if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){qx.log.Logger.debug(this,"Flushing elements...");
}}var Y=this.__fD();
var X=Y.getFocus();

if(X&&this.__fH(X)){Y.blur(X);
}var bo=Y.getActive();

if(bo&&this.__fH(bo)){qx.bom.Element.deactivate(bo);
}var bc=this.__fF();

if(bc&&this.__fH(bc)){qx.bom.Element.releaseCapture(bc);
}var bi=[];
var bj=this._modified;

for(var bg in bj){bh=bj[bg];
if(bh.__ga()){if(bh.__fI&&qx.dom.Hierarchy.isRendered(bh.__fI)){bi.push(bh);
}else{if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){bh.debug("Flush invisible element");
}}bh.__fY();
}delete bj[bg];
}}
for(var i=0,l=bi.length;i<l;i++){bh=bi[i];

if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){bh.debug("Flush rendered element");
}}bh.__fY();
}var be=this._visibility;

for(var bg in be){bh=be[bg];
var bk=bh.__fI;

if(!bk){delete be[bg];
continue;
}
if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){qx.log.Logger.debug(this,"Switching visibility to: "+bh.__fL);
}}if(!bh.$$disposed){bk.style.display=bh.__fL?O:M;
if(qx.core.Variant.isSet(h,N)){if(!(document.documentMode>=8)){bk.style.visibility=bh.__fL?B:G;
}}}delete be[bg];
}var scroll=this._scroll;

for(var bg in scroll){bh=scroll[bg];
var bp=bh.__fI;

if(bp&&bp.offsetWidth){var bb=true;
if(bh.__fO!=null){bh.__fI.scrollLeft=bh.__fO;
delete bh.__fO;
}if(bh.__fP!=null){bh.__fI.scrollTop=bh.__fP;
delete bh.__fP;
}var bl=bh.__fM;

if(bl!=null){var bf=bl.element.getDomElement();

if(bf&&bf.offsetWidth){qx.bom.element.Scroll.intoViewX(bf,bp,bl.align);
delete bh.__fM;
}else{bb=false;
}}var bm=bh.__fN;

if(bm!=null){var bf=bm.element.getDomElement();

if(bf&&bf.offsetWidth){qx.bom.element.Scroll.intoViewY(bf,bp,bm.align);
delete bh.__fN;
}else{bb=false;
}}if(bb){delete scroll[bg];
}}}var ba={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bn=this._actions[i];
var bk=bn.element.__fI;

if(!bk||!ba[bn.type]&&!bn.element.__ga()){continue;
}var bd=bn.args;
bd.unshift(bk);
qx.bom.Element[bn.type].apply(qx.bom.Element,bd);
}this._actions=[];
for(var bg in this.__fC){var W=this.__fC[bg];
var bp=W.element.__fI;

if(bp){qx.bom.Selection.set(bp,W.start,W.end);
delete this.__fC[bg];
}}qx.event.handler.Appear.refresh();
},__fD:function(){if(!this.__fE){var bq=qx.event.Registration.getManager(window);
this.__fE=bq.getHandler(qx.event.handler.Focus);
}return this.__fE;
},__fF:function(){if(!this.__fG){var br=qx.event.Registration.getManager(window);
this.__fG=br.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__fG.getCaptureElement();
},__fH:function(bs){var bt=qx.core.ObjectRegistry.fromHashCode(bs.$$element);
return bt&&!bt.__ga();
}},members:{__fz:null,__fI:null,__fJ:false,__fK:true,__fL:true,__fM:null,__fN:null,__fO:null,__fP:null,__fQ:null,__fR:null,__fS:null,__fA:null,__fB:null,__fT:null,__fU:null,__fV:null,__fW:null,__fX:null,_scheduleChildrenUpdate:function(){if(this.__fW){return;
}this.__fW=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
},_createDomElement:function(){return qx.bom.Element.create(this.__fz);
},__fY:function(){if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){this.debug("Flush: "+this.getAttribute("id"));
}}var length;
var bu=this.__fV;

if(bu){length=bu.length;
var bv;

for(var i=0;i<length;i++){bv=bu[i];

if(bv.__fL&&bv.__fK&&!bv.__fI){bv.__fY();
}}}
if(!this.__fI){this.__fI=this._createDomElement();
this.__fI.$$element=this.$$hash;
this._copyData(false);

if(bu&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fW){this._syncChildren();
}}delete this.__fW;
},_insertChildren:function(){var bw=this.__fV;
var length=bw.length;
var by;

if(length>2){var bx=document.createDocumentFragment();

for(var i=0;i<length;i++){by=bw[i];

if(by.__fI&&by.__fK){bx.appendChild(by.__fI);
}}this.__fI.appendChild(bx);
}else{var bx=this.__fI;

for(var i=0;i<length;i++){by=bw[i];

if(by.__fI&&by.__fK){bx.appendChild(by.__fI);
}}}},_syncChildren:function(){var bI=qx.core.ObjectRegistry;
var bz=this.__fV;
var bG=bz.length;
var bA;
var bE;
var bC=this.__fI;
var bF=bC.childNodes;
var bB=0;
var bD;

if(qx.core.Variant.isSet(j,m)){var bH=0;
}for(var i=bF.length-1;i>=0;i--){bD=bF[i];
bE=bI.fromHashCode(bD.$$element);

if(!bE||!bE.__fK||bE.__fX!==this){bC.removeChild(bD);

if(qx.core.Variant.isSet(j,m)){bH++;
}}}for(var i=0;i<bG;i++){bA=bz[i];
if(bA.__fK){bE=bA.__fI;
bD=bF[bB];

if(!bE){continue;
}if(bE!=bD){if(bD){bC.insertBefore(bE,bD);
}else{bC.appendChild(bE);
}
if(qx.core.Variant.isSet(j,m)){bH++;
}}bB++;
}}if(qx.core.Variant.isSet(j,m)){if(qx.html.Element.DEBUG){this.debug("Synced DOM with "+bH+" operations");
}}},_copyData:function(bJ){var bN=this.__fI;
var bM=this.__fB;

if(bM){var bK=qx.bom.element.Attribute;

for(var bO in bM){bK.set(bN,bO,bM[bO]);
}}var bM=this.__fA;

if(bM){var bL=qx.bom.element.Style;

if(bJ){bL.setStyles(bN,bM);
}else{bL.setCss(bN,bL.compile(bM));
}}var bM=this.__fT;

if(bM){for(var bO in bM){this._applyProperty(bO,bM[bO]);
}}var bM=this.__fU;

if(bM){qx.event.Registration.getManager(bN).importListeners(bN,bM);
delete this.__fU;
}},_syncData:function(){var bT=this.__fI;
var bS=qx.bom.element.Attribute;
var bQ=qx.bom.element.Style;
var bR=this.__fR;

if(bR){var bW=this.__fB;

if(bW){var bU;

for(var bV in bR){bU=bW[bV];

if(bU!==undefined){bS.set(bT,bV,bU);
}else{bS.reset(bT,bV);
}}}this.__fR=null;
}var bR=this.__fQ;

if(bR){var bW=this.__fA;

if(bW){var bP={};

for(var bV in bR){bP[bV]=bW[bV];
}bQ.setStyles(bT,bP);
}this.__fQ=null;
}var bR=this.__fS;

if(bR){var bW=this.__fT;

if(bW){var bU;

for(var bV in bR){this._applyProperty(bV,bW[bV]);
}}this.__fS=null;
}},__ga:function(){var bX=this;
while(bX){if(bX.__fJ){return true;
}
if(!bX.__fK||!bX.__fL){return false;
}bX=bX.__fX;
}return false;
},__gb:function(bY){if(bY.__fX===this){throw new Error("Child is already in: "+bY);
}
if(bY.__fJ){throw new Error("Root elements could not be inserted into other ones.");
}if(bY.__fX){bY.__fX.remove(bY);
}bY.__fX=this;
if(!this.__fV){this.__fV=[];
}if(this.__fI){this._scheduleChildrenUpdate();
}},__gc:function(ca){if(ca.__fX!==this){throw new Error("Has no child: "+ca);
}if(this.__fI){this._scheduleChildrenUpdate();
}delete ca.__fX;
},__gd:function(cb){if(cb.__fX!==this){throw new Error("Has no child: "+cb);
}if(this.__fI){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fV||null;
},getChild:function(cc){var cd=this.__fV;
return cd&&cd[cc]||null;
},hasChildren:function(){var ce=this.__fV;
return ce&&ce[0]!==undefined;
},indexOf:function(cf){var cg=this.__fV;
return cg?cg.indexOf(cf):-1;
},hasChild:function(ch){var ci=this.__fV;
return ci&&ci.indexOf(ch)!==-1;
},add:function(cj){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__gb(arguments[i]);
}this.__fV.push.apply(this.__fV,arguments);
}else{this.__gb(cj);
this.__fV.push(cj);
}return this;
},addAt:function(ck,cl){this.__gb(ck);
qx.lang.Array.insertAt(this.__fV,ck,cl);
return this;
},remove:function(cm){var cn=this.__fV;

if(!cn){return;
}
if(arguments[1]){var co;

for(var i=0,l=arguments.length;i<l;i++){co=arguments[i];
this.__gc(co);
qx.lang.Array.remove(cn,co);
}}else{this.__gc(cm);
qx.lang.Array.remove(cn,cm);
}return this;
},removeAt:function(cp){var cq=this.__fV;

if(!cq){throw new Error("Has no children!");
}var cr=cq[cp];

if(!cr){throw new Error("Has no child at this position!");
}this.__gc(cr);
qx.lang.Array.removeAt(this.__fV,cp);
return this;
},removeAll:function(){var cs=this.__fV;

if(cs){for(var i=0,l=cs.length;i<l;i++){this.__gc(cs[i]);
}cs.length=0;
}return this;
},getParent:function(){return this.__fX||null;
},insertInto:function(parent,ct){parent.__gb(this);

if(ct==null){parent.__fV.push(this);
}else{qx.lang.Array.insertAt(this.__fV,this,ct);
}return this;
},insertBefore:function(cu){var parent=cu.__fX;
parent.__gb(this);
qx.lang.Array.insertBefore(parent.__fV,this,cu);
return this;
},insertAfter:function(cv){var parent=cv.__fX;
parent.__gb(this);
qx.lang.Array.insertAfter(parent.__fV,this,cv);
return this;
},moveTo:function(cw){var parent=this.__fX;
parent.__gd(this);
var cx=parent.__fV.indexOf(this);

if(cx===cw){throw new Error("Could not move to same index!");
}else if(cx<cw){cw--;
}qx.lang.Array.removeAt(parent.__fV,cx);
qx.lang.Array.insertAt(parent.__fV,this,cw);
return this;
},moveBefore:function(cy){var parent=this.__fX;
return this.moveTo(parent.__fV.indexOf(cy));
},moveAfter:function(cz){var parent=this.__fX;
return this.moveTo(parent.__fV.indexOf(cz)+1);
},free:function(){var parent=this.__fX;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__fV){return;
}parent.__gc(this);
qx.lang.Array.remove(parent.__fV,this);
return this;
},getDomElement:function(){return this.__fI||null;
},getNodeName:function(){return this.__fz;
},setNodeName:function(name){this.__fz=name;
},setRoot:function(cA){this.__fJ=cA;
},useMarkup:function(cB){if(this.__fI){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(h,N)){var cC=document.createElement(a);
}else{var cC=qx.bom.Element.getHelperElement();
}cC.innerHTML=cB;
this.useElement(cC.firstChild);
return this.__fI;
},useElement:function(cD){if(this.__fI){throw new Error("Could not overwrite existing element!");
}this.__fI=cD;
this.__fI.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var cF=this.getAttribute(D);

if(cF>=1){return true;
}var cE=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(cF>=0&&cE[this.__fz]){return true;
}return false;
},setSelectable:qx.core.Variant.select(h,{"webkit":function(cG){this.setAttribute(g,cG?m:f);
this.setStyle(o,cG?d:M);
},"gecko":function(cH){this.setAttribute(g,cH?m:f);
this.setStyle(F,cH?d:w);
},"default":function(cI){this.setAttribute(g,cI?m:f);
}}),isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__fz];
},include:function(){if(this.__fK){return;
}delete this.__fK;

if(this.__fX){this.__fX._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__fK){return;
}this.__fK=false;

if(this.__fX){this.__fX._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__fK===true;
},show:function(){if(this.__fL){return;
}
if(this.__fI){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}if(this.__fX){this.__fX._scheduleChildrenUpdate();
}delete this.__fL;
},hide:function(){if(!this.__fL){return;
}
if(this.__fI){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}this.__fL=false;
},isVisible:function(){return this.__fL===true;
},scrollChildIntoViewX:function(cJ,cK,cL){var cM=this.__fI;
var cN=cJ.getDomElement();

if(cL!==false&&cM&&cM.offsetWidth&&cN&&cN.offsetWidth){qx.bom.element.Scroll.intoViewX(cN,cM,cK);
}else{this.__fM={element:cJ,align:cK};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__fO;
},scrollChildIntoViewY:function(cO,cP,cQ){var cR=this.__fI;
var cS=cO.getDomElement();

if(cQ!==false&&cR&&cR.offsetWidth&&cS&&cS.offsetWidth){qx.bom.element.Scroll.intoViewY(cS,cR,cP);
}else{this.__fN={element:cO,align:cP};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__fP;
},scrollToX:function(x,cT){var cU=this.__fI;

if(cT!==true&&cU&&cU.offsetWidth){cU.scrollLeft=x;
}else{this.__fO=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__fM;
},getScrollX:function(){var cV=this.__fI;

if(cV){return cV.scrollLeft;
}return this.__fO||0;
},scrollToY:function(y,cW){var cX=this.__fI;

if(cW!==true&&cX&&cX.offsetWidth){cX.scrollTop=y;
}else{this.__fP=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__fN;
},getScrollY:function(){var cY=this.__fI;

if(cY){return cY.scrollTop;
}return this.__fP||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(L,this.__gf,this);
},enableScrolling:function(){this.removeListener(L,this.__gf,this);
},__ge:null,__gf:function(e){if(!this.__ge){this.__ge=true;
this.__fI.scrollTop=0;
this.__fI.scrollLeft=0;
delete this.__ge;
}},getTextSelection:function(){var da=this.__fI;

if(da){return qx.bom.Selection.get(da);
}return null;
},getTextSelectionLength:function(){var dc=this.__fI;

if(dc){return qx.bom.Selection.getLength(dc);
}return null;
},getTextSelectionStart:function(){var dd=this.__fI;

if(dd){return qx.bom.Selection.getStart(dd);
}return null;
},getTextSelectionEnd:function(){var de=this.__fI;

if(de){return qx.bom.Selection.getEnd(de);
}return null;
},setTextSelection:function(df,dg){var dh=this.__fI;

if(dh){qx.bom.Selection.set(dh,df,dg);
return;
}qx.html.Element.__fC[this.toHashCode()]={element:this,start:df,end:dg};
qx.html.Element._scheduleFlush(k);
},clearTextSelection:function(){var di=this.__fI;

if(di){qx.bom.Selection.clear(di);
}delete qx.html.Element.__fC[this.toHashCode()];
},__gg:function(dj,dk){var dl=qx.html.Element._actions;
dl.push({type:dj,element:this,args:dk||[]});
qx.html.Element._scheduleFlush(k);
},focus:function(){this.__gg(C);
},blur:function(){this.__gg(p);
},activate:function(){this.__gg(r);
},deactivate:function(){this.__gg(q);
},capture:function(dm){this.__gg(n,[dm!==false]);
},releaseCapture:function(){this.__gg(A);
},setStyle:function(dn,dp,dq){if(!this.__fA){this.__fA={};
}
if(this.__fA[dn]==dp){return;
}
if(dp==null){delete this.__fA[dn];
}else{this.__fA[dn]=dp;
}if(this.__fI){if(dq){qx.bom.element.Style.set(this.__fI,dn,dp);
return this;
}if(!this.__fQ){this.__fQ={};
}this.__fQ[dn]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}return this;
},setStyles:function(dr,ds){var dt=qx.bom.element.Style;

if(!this.__fA){this.__fA={};
}
if(this.__fI){if(!this.__fQ){this.__fQ={};
}
for(var dv in dr){var du=dr[dv];

if(this.__fA[dv]==du){continue;
}
if(du==null){delete this.__fA[dv];
}else{this.__fA[dv]=du;
}if(ds){dt.set(this.__fI,dv,du);
continue;
}this.__fQ[dv]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}else{for(var dv in dr){var du=dr[dv];

if(this.__fA[dv]==du){continue;
}
if(du==null){delete this.__fA[dv];
}else{this.__fA[dv]=du;
}}}return this;
},removeStyle:function(dw,dx){this.setStyle(dw,null,dx);
},getStyle:function(dy){return this.__fA?this.__fA[dy]:null;
},getAllStyles:function(){return this.__fA||null;
},setAttribute:function(dz,dA,dB){if(!this.__fB){this.__fB={};
}
if(this.__fB[dz]==dA){return;
}
if(dA==null){delete this.__fB[dz];
}else{this.__fB[dz]=dA;
}if(this.__fI){if(dB){qx.bom.element.Attribute.set(this.__fI,dz,dA);
return this;
}if(!this.__fR){this.__fR={};
}this.__fR[dz]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}return this;
},setAttributes:function(dC,dD){for(var dE in dC){this.setAttribute(dE,dC[dE],dD);
}return this;
},removeAttribute:function(dF,dG){this.setAttribute(dF,null,dG);
},getAttribute:function(dH){return this.__fB?this.__fB[dH]:null;
},_applyProperty:function(name,dI){},_setProperty:function(dJ,dK,dL){if(!this.__fT){this.__fT={};
}
if(this.__fT[dJ]==dK){return;
}
if(dK==null){delete this.__fT[dJ];
}else{this.__fT[dJ]=dK;
}if(this.__fI){if(dL){this._applyProperty(dJ,dK);
return this;
}if(!this.__fS){this.__fS={};
}this.__fS[dJ]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}return this;
},_removeProperty:function(dM,dN){this._setProperty(dM,null,dN);
},_getProperty:function(dO){var dP=this.__fT;

if(!dP){return null;
}var dQ=dP[dO];
return dQ==null?null:dQ;
},addListener:function(dR,dS,self,dT){if(this.$$disposed){return null;
}
if(qx.core.Variant.isSet(j,m)){var dU=s+dR+R+E+this+c;
this.assertString(dR,dU+Q);
this.assertFunction(dS,dU+P);

if(self!==undefined){this.assertObject(self,b);
}
if(dT!==undefined){this.assertBoolean(dT,H);
}}
if(this.__fI){return qx.event.Registration.addListener(this.__fI,dR,dS,self,dT);
}
if(!this.__fU){this.__fU={};
}
if(dT==null){dT=false;
}var dV=qx.event.Manager.getNextUniqueId();
var dW=dR+(dT?I:K)+dV;
this.__fU[dW]={type:dR,listener:dS,self:self,capture:dT,unique:dV};
return dW;
},removeListener:function(dX,dY,self,ea){if(this.$$disposed){return null;
}
if(qx.core.Variant.isSet(j,m)){var eb=z+dX+R+v+this+c;
this.assertString(dX,eb+Q);
this.assertFunction(dY,eb+P);

if(self!==undefined){this.assertObject(self,b);
}
if(ea!==undefined){this.assertBoolean(ea,u);
}}
if(this.__fI){qx.event.Registration.removeListener(this.__fI,dX,dY,self,ea);
}else{var ed=this.__fU;
var ec;

if(ea==null){ea=false;
}
for(var ee in ed){ec=ed[ee];
if(ec.listener===dY&&ec.self===self&&ec.capture===ea&&ec.type===dX){delete ed[ee];
break;
}}}return this;
},removeListenerById:function(ef){if(this.$$disposed){return null;
}
if(this.__fI){qx.event.Registration.removeListenerById(this.__fI,ef);
}else{delete this.__fU[ef];
}return this;
},hasListener:function(eg,eh){if(this.$$disposed){return false;
}
if(this.__fI){return qx.event.Registration.hasListener(this.__fI,eg,eh);
}var ej=this.__fU;
var ei;

if(eh==null){eh=false;
}
for(var ek in ej){ei=ej[ek];
if(ei.capture===eh&&ei.type===eg){return true;
}}return false;
}},defer:function(em){em.__gh=new qx.util.DeferredCall(em.flush,em);
},destruct:function(){var en=this.__fI;

if(en){qx.event.Registration.getManager(en).removeAllListeners(en);
en.$$element=O;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fX;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(t);
this.__fB=this.__fA=this.__fU=this.__fT=this.__fR=this.__fQ=this.__fS=this.__fI=this.__fX=this.__fM=this.__fN=null;
}});
})();
(function(){var a="qx.event.handler.UserAction";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);
this.__gi=b;
this.__gj=b.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__gi:null,__gj:null,canHandleEvent:function(c,d){},registerEvent:function(e,f,g){},unregisterEvent:function(h,i,j){}},destruct:function(){this.__gi=this.__gj=null;
},defer:function(k){qx.event.Registration.addHandler(k);
}});
})();
(function(){var g="qx.debug",f="useraction",d="touchend",c='ie',b="on",a="qx.ui.core.queue.Manager";
qx.Class.define(a,{statics:{__gk:false,__gl:{},__gm:0,MAX_RETRIES:10,scheduleFlush:function(h){var self=qx.ui.core.queue.Manager;
self.__gl[h]=true;

if(!self.__gk){self.__gr.schedule();
self.__gk=true;
}},flush:function(){if(qx.ui.core.queue.Manager.PAUSE){return;
}var self=qx.ui.core.queue.Manager;
if(self.__gn){return;
}self.__gn=true;
self.__gr.cancel();
var i=self.__gl;
self.__go(function(){while(i.visibility||i.widget||i.appearance||i.layout||i.element){if(i.widget){delete i.widget;
qx.ui.core.queue.Widget.flush();
}
if(i.visibility){delete i.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(i.appearance){delete i.appearance;
qx.ui.core.queue.Appearance.flush();
}if(i.widget||i.visibility||i.appearance){continue;
}
if(i.layout){delete i.layout;
qx.ui.core.queue.Layout.flush();
}if(i.widget||i.visibility||i.appearance||i.layout){continue;
}
if(i.element){delete i.element;
qx.html.Element.flush();
}}},function(){self.__gk=false;
});
self.__go(function(){if(i.dispose){delete i.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__gn=false;
});
self.__gm=0;
},__go:qx.core.Variant.select(g,{"on":function(j,k){j();
k();
},"off":function(l,m){var self=qx.ui.core.queue.Manager;

try{l();
}catch(e){if(qx.core.Variant.isSet(g,b)){qx.log.Logger.error("Error while layout flush: "+e+"\n"+"Stack trace: \n"+qx.dev.StackTrace.getStackTraceFromError(e));
}self.__gk=false;
self.__gn=false;
self.__gm+=1;
if(qx.bom.client.Browser.NAME==c&&qx.bom.client.Browser.VERSION<=7){m();
}
if(self.__gm<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__gm-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{m();
}}}),__gp:function(e){var n=qx.ui.core.queue.Manager;
if(e.getData()==d){n.PAUSE=true;

if(n.__gq){window.clearTimeout(n.__gq);
}n.__gq=window.setTimeout(function(){n.PAUSE=false;
n.__gq=null;
n.flush();
},500);
}else{n.flush();
}}},defer:function(o){o.__gr=new qx.util.DeferredCall(o.flush);
qx.html.Element._scheduleFlush=o.scheduleFlush;
qx.event.Registration.addListener(window,f,qx.bom.client.Feature.TOUCH?o.__gp:o.flush);
}});
})();
(function(){var b="-",a="qx.event.handler.Element";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(c){qx.core.Object.call(this);
this._manager=c;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(d,e){},registerEvent:function(f,g,h){var k=qx.core.ObjectRegistry.toHashCode(f);
var i=k+b+g;
var j=qx.lang.Function.listener(this._onNative,this,i);
qx.bom.Event.addNativeListener(f,g,j);
this._registeredEvents[i]={element:f,type:g,listener:j};
},unregisterEvent:function(l,m,n){var q=this._registeredEvents;

if(!q){return;
}var r=qx.core.ObjectRegistry.toHashCode(l);
var o=r+b+m;
var p=this._registeredEvents[o];

if(p){qx.bom.Event.removeNativeListener(l,m,p.listener);
}delete this._registeredEvents[o];
},_onNative:qx.event.GlobalError.observeMethod(function(s,t){var v=this._registeredEvents;

if(!v){return;
}var u=v[t];
qx.event.Registration.fireNonBubblingEvent(u.element,u.type,qx.event.type.Native,[s]);
})},destruct:function(){var w;
var x=this._registeredEvents;

for(var y in x){w=x[y];
qx.bom.Event.removeNativeListener(w.element,w.type,w.listener);
}this._manager=this._registeredEvents=null;
},defer:function(z){qx.event.Registration.addHandler(z);
}});
})();
(function(){var e="orientationchange",d="resize",c="landscape",b="portrait",a="qx.event.handler.Orientation";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);
this.__gs=f;
this.__gt=f.getWindow();
this._initObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__gs:null,__gt:null,__gu:null,__gv:null,__gw:null,canHandleEvent:function(g,h){},registerEvent:function(i,j,k){},unregisterEvent:function(l,m,n){},_initObserver:function(){this.__gw=qx.lang.Function.listener(this._onNative,this);
this.__gu=qx.bom.Event.supportsEvent(this.__gt,e)?e:d;
var Event=qx.bom.Event;
Event.addNativeListener(this.__gt,this.__gu,this.__gw);
},_stopObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gt,this.__gu,this.__gw);
},_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;
var p=q.getOrientation();

if(this.__gv!=p){this.__gv=p;
var r=q.isLandscape()?c:b;
qx.event.Registration.fireEvent(this.__gt,e,qx.event.type.Orientation,[p,r]);
}})},destruct:function(){this._stopObserver();
this.__gs=this.__gt=null;
},defer:function(s){qx.event.Registration.addHandler(s);
}});
})();
(function(){var t="qx.mobile.emulatetouch",s="touchend",r="touchstart",q="touchmove",p="mousemove",o="touchcancel",n="mouseup",m="mousedown",l="qx.client",k="mshtml",d="qx.event.handler.Touch",j="useraction",h="swipe",c="qx.mobile.nativescroll",b="webkit",g="off",f="tap",i="x",a="y";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);
this.__gx=u;
this.__gy=u.getWindow();
this.__gz=this.__gy.document;
this._initTouchObserver();
this._initMouseObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"},SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},TAP_MAX_DISTANCE:10,SWIPE_MIN_DISTANCE:11,SWIPE_MIN_VELOCITY:0},members:{__gA:null,__gB:null,__gx:null,__gy:null,__gz:null,__gC:null,__gD:null,__gE:null,__gF:null,__gG:false,__gH:null,canHandleEvent:function(v,w){},registerEvent:function(x,y,z){},unregisterEvent:function(A,B,C){},__gI:function(D){var E=qx.bom.Event.getTarget(D);
if(qx.core.Variant.isSet(l,b)){if(E&&E.nodeType==3){E=E.parentNode;
}}return E;
},__gJ:function(F,G,H,I){if(!H){H=this.__gI(F);
}var G=G||F.type;

if(H&&H.nodeType){qx.event.Registration.fireEvent(H,G,I||qx.event.type.Touch,[F,H,null,true,true]);
}qx.event.Registration.fireEvent(this.__gy,j,qx.event.type.Data,[G]);
},__gK:function(J,K,L){if(!L){L=this.__gI(J);
}var K=K||J.type;

if(K==r){this.__gL(J,L);
}else if(K==q){this.__gM(J,L);
}else if(K==s){this.__gN(J,L);
}},__gL:function(M,N){var O=M.changedTouches[0];
this.__gC=O.screenX;
this.__gD=O.screenY;
this.__gE=new Date().getTime();
this.__gF=M.changedTouches.length===1;
},__gM:function(P,Q){if(this.__gF&&P.changedTouches.length>1){this.__gF=false;
}},__gN:function(R,S){if(this.__gF){var T=R.changedTouches[0];
var V={x:T.screenX-this.__gC,y:T.screenY-this.__gD};
var W=qx.event.handler.Touch;

if(this.__gH==S&&Math.abs(V.x)<=W.TAP_MAX_DISTANCE&&Math.abs(V.y)<=W.TAP_MAX_DISTANCE){this.__gJ(R,f,S,qx.event.type.Tap);
}else{var U=this.__gO(R,S,V);

if(U){R.swipe=U;
this.__gJ(R,h,S,qx.event.type.Swipe);
}}}},__gO:function(X,Y,ba){var be=qx.event.handler.Touch;
var bf=new Date().getTime()-this.__gE;
var bh=(Math.abs(ba.x)>=Math.abs(ba.y))?i:a;
var bb=ba[bh];
var bc=be.SWIPE_DIRECTION[bh][bb<0?0:1];
var bg=(bf!==0)?bb/bf:0;
var bd=null;

if(Math.abs(bg)>=be.SWIPE_MIN_VELOCITY&&Math.abs(bb)>=be.SWIPE_MIN_DISTANCE){bd={startTime:this.__gE,duration:bf,axis:bh,direction:bc,distance:bb,velocity:bg};
}return bd;
},__gP:qx.core.Variant.select(t,{"on":function(bi){var bj=bi.type;
var bl=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;

if(bl[bj]){bj=bl[bj];
if(bj==r&&this.__gQ(bi)){this.__gG=true;
}else if(bj==s){this.__gG=false;
}var bm=this.__gR(bi);
var bk=(bj==s?[]:[bm]);
bi.touches=bk;
bi.targetTouches=bk;
bi.changedTouches=[bm];
}return bj;
},"default":qx.lang.Function.empty}),__gQ:qx.core.Variant.select(t,{"on":function(bn){if(qx.core.Variant.isSet(l,k)){var bo=1;
}else{var bo=0;
}return bn.button==bo;
},"default":qx.lang.Function.empty}),__gR:qx.core.Variant.select(t,{"on":function(bp){var bq=this.__gI(bp);
return {clientX:bp.clientX,clientY:bp.clientY,screenX:bp.screenX,screenY:bp.screenY,pageX:bp.pageX,pageY:bp.pageY,identifier:1,target:bq};
},"default":qx.lang.Function.empty}),_initTouchObserver:function(){this.__gA=qx.lang.Function.listener(this._onTouchEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gz,r,this.__gA);
Event.addNativeListener(this.__gz,q,this.__gA);
Event.addNativeListener(this.__gz,s,this.__gA);
Event.addNativeListener(this.__gz,o,this.__gA);
},_initMouseObserver:qx.core.Variant.select(t,{"on":function(){if(!qx.bom.client.Feature.TOUCH){this.__gB=qx.lang.Function.listener(this._onMouseEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gz,m,this.__gB);
Event.addNativeListener(this.__gz,p,this.__gB);
Event.addNativeListener(this.__gz,n,this.__gB);
}},"default":qx.lang.Function.empty}),_stopTouchObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gz,r,this.__gA);
Event.removeNativeListener(this.__gz,q,this.__gA);
Event.removeNativeListener(this.__gz,s,this.__gA);
Event.removeNativeListener(this.__gz,o,this.__gA);
},_stopMouseObserver:qx.core.Variant.select(t,{"on":function(){if(!qx.bom.client.Feature.TOUCH){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gz,m,this.__gB);
Event.removeNativeListener(this.__gz,p,this.__gB);
Event.removeNativeListener(this.__gz,n,this.__gB);
}},"default":qx.lang.Function.empty}),_onTouchEvent:qx.event.GlobalError.observeMethod(function(br){this._commonTouchEventHandler(br);
}),_onMouseEvent:qx.core.Variant.select(t,{"on":qx.event.GlobalError.observeMethod(function(bs){if(!qx.bom.client.Feature.TOUCH){if(bs.type==p&&!this.__gG){return;
}var bt=this.__gP(bs);
this._commonTouchEventHandler(bs,bt);
}}),"default":qx.lang.Function.empty}),_commonTouchEventHandler:function(bu,bv){var bv=bv||bu.type;

if(bv==r){this.__gH=this.__gI(bu);
}this.__gJ(bu,bv);
this.__gK(bu,bv);
}},destruct:function(){this._stopTouchObserver();
this._stopMouseObserver();
this.__gx=this.__gy=this.__gz=this.__gH=null;
},defer:function(bw){qx.event.Registration.addHandler(bw);
if(qx.bom.client.Feature.TOUCH){if(qx.core.Variant.isSet(c,g)){document.addEventListener(q,function(e){e.preventDefault();
});
}qx.event.Registration.getManager(document).getHandler(bw);
}}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var p="mouseup",o="click",n="qx.client",m="mousedown",l="contextmenu",k="mousewheel",j="dblclick",h="mouseover",g="mouseout",f="mousemove",c="on",e="useraction",d="DOMMouseScroll",b="gecko|webkit",a="qx.event.handler.Mouse";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);
this.__gS=q;
this.__gT=q.getWindow();
this.__gU=this.__gT.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__gV:null,__gW:null,__gX:null,__gY:null,__ha:null,__gS:null,__gT:null,__gU:null,canHandleEvent:function(r,s){},registerEvent:qx.bom.client.System.IPHONE?
function(t,u,v){t[c+u]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(w,x,y){w[c+x]=undefined;
}:qx.lang.Function.returnNull,__hb:function(z,A,B){if(!B){B=qx.bom.Event.getTarget(z);
}if(B&&B.nodeType){qx.event.Registration.fireEvent(B,A||z.type,A==k?qx.event.type.MouseWheel:qx.event.type.Mouse,[z,B,null,true,true]);
}qx.event.Registration.fireEvent(this.__gT,e,qx.event.type.Data,[A||z.type]);
},__hc:function(){var D=[this.__gT,this.__gU,this.__gU.body];
var E=this.__gT;
var C=d;

for(var i=0;i<D.length;i++){if(qx.bom.Event.supportsEvent(D[i],k)){C=k;
E=D[i];
break;
}}return {type:C,target:E};
},_initButtonObserver:function(){this.__gV=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gU,m,this.__gV);
Event.addNativeListener(this.__gU,p,this.__gV);
Event.addNativeListener(this.__gU,o,this.__gV);
Event.addNativeListener(this.__gU,j,this.__gV);
Event.addNativeListener(this.__gU,l,this.__gV);
},_initMoveObserver:function(){this.__gW=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__gU,f,this.__gW);
Event.addNativeListener(this.__gU,h,this.__gW);
Event.addNativeListener(this.__gU,g,this.__gW);
},_initWheelObserver:function(){this.__gX=qx.lang.Function.listener(this._onWheelEvent,this);
var F=this.__hc();
qx.bom.Event.addNativeListener(F.target,F.type,this.__gX);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gU,m,this.__gV);
Event.removeNativeListener(this.__gU,p,this.__gV);
Event.removeNativeListener(this.__gU,o,this.__gV);
Event.removeNativeListener(this.__gU,j,this.__gV);
Event.removeNativeListener(this.__gU,l,this.__gV);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__gU,f,this.__gW);
Event.removeNativeListener(this.__gU,h,this.__gW);
Event.removeNativeListener(this.__gU,g,this.__gW);
},_stopWheelObserver:function(){var G=this.__hc();
qx.bom.Event.removeNativeListener(G.target,G.type,this.__gX);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(H){this.__hb(H);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(I){var J=I.type;
var K=qx.bom.Event.getTarget(I);
if(qx.core.Variant.isSet(n,b)){if(K&&K.nodeType==3){K=K.parentNode;
}}
if(this.__hd){this.__hd(I,J,K);
}
if(this.__hf){this.__hf(I,J,K);
}this.__hb(I,J,K);

if(this.__he){this.__he(I,J,K);
}
if(this.__hg){this.__hg(I,J,K);
}this.__gY=J;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(L){this.__hb(L,k);
}),__hd:qx.core.Variant.select(n,{"webkit":function(M,N,O){if(qx.bom.client.Engine.VERSION<530){if(N==l){this.__hb(M,p,O);
}}},"default":null}),__he:qx.core.Variant.select(n,{"opera":function(P,Q,R){if(Q==p&&P.button==2){this.__hb(P,l,R);
}},"default":null}),__hf:qx.core.Variant.select(n,{"mshtml":function(S,T,U){if(S.target!==undefined){return;
}
if(T==p&&this.__gY==o){this.__hb(S,m,U);
}else if(T==j){this.__hb(S,o,U);
}},"default":null}),__hg:qx.core.Variant.select(n,{"mshtml":null,"default":function(V,W,X){switch(W){case m:this.__ha=X;
break;
case p:if(X!==this.__ha){var Y=qx.dom.Hierarchy.getCommonParent(X,this.__ha);
this.__hb(V,o,Y);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__gS=this.__gT=this.__gU=this.__ha=null;
},defer:function(ba){qx.event.Registration.addHandler(ba);
}});
})();
(function(){var m="keydown",l="qx.client",k="keypress",j="NumLock",i="keyup",h="Enter",g="0",f="9",e="-",d="PageUp",bu="+",bt="PrintScreen",bs="gecko",br="A",bq="Z",bp="Left",bo="F5",bn="Down",bm="Up",bl="F11",t="F6",u="useraction",r="F3",s="keyinput",p="Insert",q="F8",n="End",o="/",B="Delete",C="*",O="cmd",K="F1",W="F4",R="Home",bh="F2",bc="F12",G="PageDown",bk="F7",bj="Win",bi="F9",F="F10",I="Right",J="text",M="Escape",P="webkit",S="5",Y="3",be="Meta",v="7",w="CapsLock",H="input",V="Control",U="Space",T="Tab",bb="Shift",ba="Pause",Q="Unidentified",X="qx.event.handler.Keyboard",a="mshtml|webkit",bd="6",x="off",y="Apps",L="4",b="Alt",c="mshtml",E="2",z="Scroll",A="1",D="8",N="autoComplete",bg=",",bf="Backspace";
qx.Class.define(X,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bv){qx.core.Object.call(this);
this.__hh=bv;
this.__hi=bv.getWindow();
if(qx.core.Variant.isSet(l,bs)){this.__hj=this.__hi;
}else{this.__hj=this.__hi.document.documentElement;
}this.__hk={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(bw){if(this._identifierToKeyCodeMap[bw]){return true;
}
if(bw.length!=1){return false;
}
if(bw>=g&&bw<=f){return true;
}
if(bw>=br&&bw<=bq){return true;
}
switch(bw){case bu:case e:case C:case o:return true;
default:return false;
}}},members:{__hl:null,__hh:null,__hi:null,__hj:null,__hk:null,__hm:null,__hn:null,__ho:null,canHandleEvent:function(bx,by){},registerEvent:function(bz,bA,bB){},unregisterEvent:function(bC,bD,bE){},_fireInputEvent:function(bF,bG){var bH=this.__hp();
if(bH&&bH.offsetWidth!=0){var event=qx.event.Registration.createEvent(s,qx.event.type.KeyInput,[bF,bH,bG]);
this.__hh.dispatchEvent(bH,event);
}if(this.__hi){qx.event.Registration.fireEvent(this.__hi,u,qx.event.type.Data,[s]);
}},_fireSequenceEvent:function(bI,bJ,bK){var bL=this.__hp();
var bM=bI.keyCode;
var event=qx.event.Registration.createEvent(bJ,qx.event.type.KeySequence,[bI,bL,bK]);
this.__hh.dispatchEvent(bL,event);
if(qx.core.Variant.isSet(l,a)){if(bJ==m&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(bM)&&!this._emulateKeyPress[bM]){this._fireSequenceEvent(bI,k,bK);
}}}if(this.__hi){qx.event.Registration.fireEvent(this.__hi,u,qx.event.type.Data,[bJ]);
}},__hp:function(){var bN=this.__hh.getHandler(qx.event.handler.Focus);
var bO=bN.getActive();
if(!bO||bO.offsetWidth==0){bO=bN.getFocus();
}if(!bO||bO.offsetWidth==0){bO=this.__hh.getWindow().document.body;
}return bO;
},_initKeyObserver:function(){this.__hl=qx.lang.Function.listener(this.__hq,this);
this.__ho=qx.lang.Function.listener(this.__hs,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__hj,i,this.__hl);
Event.addNativeListener(this.__hj,m,this.__hl);
Event.addNativeListener(this.__hj,k,this.__ho);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__hj,i,this.__hl);
Event.removeNativeListener(this.__hj,m,this.__hl);
Event.removeNativeListener(this.__hj,k,this.__ho);

for(var bQ in (this.__hn||{})){var bP=this.__hn[bQ];
Event.removeNativeListener(bP.target,k,bP.callback);
}delete (this.__hn);
},__hq:qx.event.GlobalError.observeMethod(qx.core.Variant.select(l,{"mshtml":function(bR){bR=window.event||bR;
var bU=bR.keyCode;
var bS=0;
var bT=bR.type;
if(!(this.__hk[bU]==m&&bT==m)){this._idealKeyHandler(bU,bS,bT,bR);
}if(bT==m){if(this._isNonPrintableKeyCode(bU)||this._emulateKeyPress[bU]){this._idealKeyHandler(bU,bS,k,bR);
}}this.__hk[bU]=bT;
},"gecko":function(bV){var ca=this._keyCodeFix[bV.keyCode]||bV.keyCode;
var bX=0;
var bY=bV.type;
if(qx.bom.client.Platform.WIN){var bW=ca?this._keyCodeToIdentifier(ca):this._charCodeToIdentifier(bX);

if(!(this.__hk[bW]==m&&bY==m)){this._idealKeyHandler(ca,bX,bY,bV);
}this.__hk[bW]=bY;
}else{this._idealKeyHandler(ca,bX,bY,bV);
}this.__hr(bV.target,bY,ca);
},"webkit":function(cb){var ce=0;
var cc=0;
var cd=cb.type;
if(qx.bom.client.Engine.VERSION<525.13){if(cd==i||cd==m){ce=this._charCode2KeyCode[cb.charCode]||cb.keyCode;
}else{if(this._charCode2KeyCode[cb.charCode]){ce=this._charCode2KeyCode[cb.charCode];
}else{cc=cb.charCode;
}}this._idealKeyHandler(ce,cc,cd,cb);
}else{ce=cb.keyCode;
this._idealKeyHandler(ce,cc,cd,cb);
if(cd==m){if(this._isNonPrintableKeyCode(ce)||this._emulateKeyPress[ce]){this._idealKeyHandler(ce,cc,k,cb);
}}this.__hk[ce]=cd;
}},"opera":function(cf){this.__hm=cf.keyCode;
this._idealKeyHandler(cf.keyCode,0,cf.type,cf);
}})),__hr:qx.core.Variant.select(l,{"gecko":function(cg,ch,ci){if(ch===m&&(ci==33||ci==34||ci==38||ci==40)&&cg.type==J&&cg.tagName.toLowerCase()===H&&cg.getAttribute(N)!==x){if(!this.__hn){this.__hn={};
}var ck=qx.core.ObjectRegistry.toHashCode(cg);

if(this.__hn[ck]){return;
}var self=this;
this.__hn[ck]={target:cg,callback:function(cl){qx.bom.Event.stopPropagation(cl);
self.__hs(cl);
}};
var cj=qx.event.GlobalError.observeMethod(this.__hn[ck].callback);
qx.bom.Event.addNativeListener(cg,k,cj);
}},"default":null}),__hs:qx.event.GlobalError.observeMethod(qx.core.Variant.select(l,{"mshtml":function(cm){cm=window.event||cm;

if(this._charCode2KeyCode[cm.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cm.keyCode],0,cm.type,cm);
}else{this._idealKeyHandler(0,cm.keyCode,cm.type,cm);
}},"gecko":function(cn){var cq=this._keyCodeFix[cn.keyCode]||cn.keyCode;
var co=cn.charCode;
var cp=cn.type;
this._idealKeyHandler(cq,co,cp,cn);
},"webkit":function(cr){if(qx.bom.client.Engine.VERSION<525.13){var cu=0;
var cs=0;
var ct=cr.type;

if(ct==i||ct==m){cu=this._charCode2KeyCode[cr.charCode]||cr.keyCode;
}else{if(this._charCode2KeyCode[cr.charCode]){cu=this._charCode2KeyCode[cr.charCode];
}else{cs=cr.charCode;
}}this._idealKeyHandler(cu,cs,ct,cr);
}else{if(this._charCode2KeyCode[cr.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cr.keyCode],0,cr.type,cr);
}else{this._idealKeyHandler(0,cr.keyCode,cr.type,cr);
}}},"opera":function(cv){var cx=cv.keyCode;
var cw=cv.type;
if(cx!=this.__hm){this._idealKeyHandler(0,this.__hm,cw,cv);
}else{if(this._keyCodeToIdentifierMap[cv.keyCode]){this._idealKeyHandler(cv.keyCode,0,cv.type,cv);
}else{this._idealKeyHandler(0,cv.keyCode,cv.type,cv);
}}}})),_idealKeyHandler:function(cy,cz,cA,cB){var cC;
if(cy||(!cy&&!cz)){cC=this._keyCodeToIdentifier(cy);
this._fireSequenceEvent(cB,cA,cC);
}else{cC=this._charCodeToIdentifier(cz);
this._fireSequenceEvent(cB,k,cC);
this._fireInputEvent(cB,cz);
}},_specialCharCodeMap:{8:bf,9:T,13:h,27:M,32:U},_emulateKeyPress:qx.core.Variant.select(l,{"mshtml":{8:true,9:true},"webkit":{8:true,9:true,27:true},"default":{}}),_keyCodeToIdentifierMap:{16:bb,17:V,18:b,20:w,224:be,37:bp,38:bm,39:I,40:bn,33:d,34:G,35:n,36:R,45:p,46:B,112:K,113:bh,114:r,115:W,116:bo,117:t,118:bk,119:q,120:bi,121:F,122:bl,123:bc,144:j,44:bt,145:z,19:ba,91:qx.bom.client.Platform.MAC?O:bj,92:bj,93:qx.bom.client.Platform.MAC?O:y},_numpadToCharCode:{96:g.charCodeAt(0),97:A.charCodeAt(0),98:E.charCodeAt(0),99:Y.charCodeAt(0),100:L.charCodeAt(0),101:S.charCodeAt(0),102:bd.charCodeAt(0),103:v.charCodeAt(0),104:D.charCodeAt(0),105:f.charCodeAt(0),106:C.charCodeAt(0),107:bu.charCodeAt(0),109:e.charCodeAt(0),110:bg.charCodeAt(0),111:o.charCodeAt(0)},_charCodeA:br.charCodeAt(0),_charCodeZ:bq.charCodeAt(0),_charCode0:g.charCodeAt(0),_charCode9:f.charCodeAt(0),_isNonPrintableKeyCode:function(cD){return this._keyCodeToIdentifierMap[cD]?true:false;
},_isIdentifiableKeyCode:function(cE){if(cE>=this._charCodeA&&cE<=this._charCodeZ){return true;
}if(cE>=this._charCode0&&cE<=this._charCode9){return true;
}if(this._specialCharCodeMap[cE]){return true;
}if(this._numpadToCharCode[cE]){return true;
}if(this._isNonPrintableKeyCode(cE)){return true;
}return false;
},_keyCodeToIdentifier:function(cF){if(this._isIdentifiableKeyCode(cF)){var cG=this._numpadToCharCode[cF];

if(cG){return String.fromCharCode(cG);
}return (this._keyCodeToIdentifierMap[cF]||this._specialCharCodeMap[cF]||String.fromCharCode(cF));
}else{return Q;
}},_charCodeToIdentifier:function(cH){return this._specialCharCodeMap[cH]||String.fromCharCode(cH).toUpperCase();
},_identifierToKeyCode:function(cI){return qx.event.handler.Keyboard._identifierToKeyCodeMap[cI]||cI.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__hm=this.__hh=this.__hi=this.__hj=this.__hk=null;
},defer:function(cJ,cK){qx.event.Registration.addHandler(cJ);
if(!cJ._identifierToKeyCodeMap){cJ._identifierToKeyCodeMap={};

for(var cL in cK._keyCodeToIdentifierMap){cJ._identifierToKeyCodeMap[cK._keyCodeToIdentifierMap[cL]]=parseInt(cL,10);
}
for(var cL in cK._specialCharCodeMap){cJ._identifierToKeyCodeMap[cK._specialCharCodeMap[cL]]=parseInt(cL,10);
}}
if(qx.core.Variant.isSet(l,c)){cK._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(l,bs)){cK._keyCodeFix={12:cK._identifierToKeyCode(j)};
}else if(qx.core.Variant.isSet(l,P)){if(qx.bom.client.Engine.VERSION<525.13){cK._charCode2KeyCode={63289:cK._identifierToKeyCode(j),63276:cK._identifierToKeyCode(d),63277:cK._identifierToKeyCode(G),63275:cK._identifierToKeyCode(n),63273:cK._identifierToKeyCode(R),63234:cK._identifierToKeyCode(bp),63232:cK._identifierToKeyCode(bm),63235:cK._identifierToKeyCode(I),63233:cK._identifierToKeyCode(bn),63272:cK._identifierToKeyCode(B),63302:cK._identifierToKeyCode(p),63236:cK._identifierToKeyCode(K),63237:cK._identifierToKeyCode(bh),63238:cK._identifierToKeyCode(r),63239:cK._identifierToKeyCode(W),63240:cK._identifierToKeyCode(bo),63241:cK._identifierToKeyCode(t),63242:cK._identifierToKeyCode(bk),63243:cK._identifierToKeyCode(q),63244:cK._identifierToKeyCode(bi),63245:cK._identifierToKeyCode(F),63246:cK._identifierToKeyCode(bl),63247:cK._identifierToKeyCode(bc),63248:cK._identifierToKeyCode(bt),3:cK._identifierToKeyCode(h),12:cK._identifierToKeyCode(j),13:cK._identifierToKeyCode(h)};
}else{cK._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var k="alias",j="copy",i="blur",h="mouseout",g="keydown",f="Ctrl",d="Shift",c="mousemove",b="move",a="mouseover",A="Alt",z="keyup",y="mouseup",x="dragend",w="on",v="mousedown",u="qxDraggable",t="drag",s="drop",r="qxDroppable",p="qx.event.handler.DragDrop",q="droprequest",n="dragstart",o="dragchange",l="dragleave",m="dragover";
qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(B){qx.core.Object.call(this);
this.__ht=B;
this.__hu=B.getWindow().document.documentElement;
this.__ht.addListener(this.__hu,v,this._onMouseDown,this);
this.__hG();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__ht:null,__hu:null,__hv:null,__hw:null,__hx:null,__hy:null,__hz:null,__hA:null,__hB:null,__hC:null,__hD:false,__hE:0,__hF:0,canHandleEvent:function(C,D){},registerEvent:function(E,F,G){},unregisterEvent:function(H,I,J){},addType:function(K){this.__hx[K]=true;
},addAction:function(L){this.__hy[L]=true;
},supportsType:function(M){return !!this.__hx[M];
},supportsAction:function(N){return !!this.__hy[N];
},getData:function(O){if(!this.__hN||!this.__hv){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__hx[O]){throw new Error("Unsupported data type: "+O+"!");
}
if(!this.__hA[O]){this.__hB=O;
this.__hI(q,this.__hw,this.__hv,false);
}
if(!this.__hA[O]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__hA[O]||null;
},getCurrentAction:function(){return this.__hC;
},addData:function(P,Q){this.__hA[P]=Q;
},getCurrentType:function(){return this.__hB;
},isSessionActive:function(){return this.__hD;
},__hG:function(){this.__hx={};
this.__hy={};
this.__hz={};
this.__hA={};
},__hH:function(){if(this.__hw==null){return;
}var T=this.__hy;
var R=this.__hz;
var S=null;

if(this.__hN){if(R.Shift&&R.Ctrl&&T.alias){S=k;
}else if(R.Shift&&R.Alt&&T.copy){S=j;
}else if(R.Shift&&T.move){S=b;
}else if(R.Alt&&T.alias){S=k;
}else if(R.Ctrl&&T.copy){S=j;
}else if(T.move){S=b;
}else if(T.copy){S=j;
}else if(T.alias){S=k;
}}
if(S!=this.__hC){this.__hC=S;
this.__hI(o,this.__hw,this.__hv,false);
}},__hI:function(U,V,W,X,Y){var bb=qx.event.Registration;
var ba=bb.createEvent(U,qx.event.type.Drag,[X,Y]);

if(V!==W){ba.setRelatedTarget(W);
}return bb.dispatchEvent(V,ba);
},__hJ:function(bc){while(bc&&bc.nodeType==1){if(bc.getAttribute(u)==w){return bc;
}bc=bc.parentNode;
}return null;
},__hK:function(bd){while(bd&&bd.nodeType==1){if(bd.getAttribute(r)==w){return bd;
}bd=bd.parentNode;
}return null;
},__hL:function(){this.__hw=null;
this.__ht.removeListener(this.__hu,c,this._onMouseMove,this,true);
this.__ht.removeListener(this.__hu,y,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,i,this._onWindowBlur,this);
this.__hG();
},__hM:function(){if(this.__hD){this.__ht.removeListener(this.__hu,a,this._onMouseOver,this,true);
this.__ht.removeListener(this.__hu,h,this._onMouseOut,this,true);
this.__ht.removeListener(this.__hu,g,this._onKeyDown,this,true);
this.__ht.removeListener(this.__hu,z,this._onKeyUp,this,true);
this.__hI(x,this.__hw,this.__hv,false);
this.__hD=false;
}this.__hN=false;
this.__hv=null;
this.__hL();
},__hN:false,_onWindowBlur:function(e){this.__hM();
},_onKeyDown:function(e){var be=e.getKeyIdentifier();

switch(be){case A:case f:case d:if(!this.__hz[be]){this.__hz[be]=true;
this.__hH();
}}},_onKeyUp:function(e){var bf=e.getKeyIdentifier();

switch(bf){case A:case f:case d:if(this.__hz[bf]){this.__hz[bf]=false;
this.__hH();
}}},_onMouseDown:function(e){if(this.__hD){return;
}var bg=this.__hJ(e.getTarget());

if(bg){this.__hE=e.getDocumentLeft();
this.__hF=e.getDocumentTop();
this.__hw=bg;
this.__ht.addListener(this.__hu,c,this._onMouseMove,this,true);
this.__ht.addListener(this.__hu,y,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,i,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__hN){this.__hI(s,this.__hv,this.__hw,false,e);
}if(this.__hD){e.stopPropagation();
}this.__hM();
},_onMouseMove:function(e){if(this.__hD){if(!this.__hI(t,this.__hw,this.__hv,true,e)){this.__hM();
}}else{if(Math.abs(e.getDocumentLeft()-this.__hE)>3||Math.abs(e.getDocumentTop()-this.__hF)>3){if(this.__hI(n,this.__hw,this.__hv,true,e)){this.__hD=true;
this.__ht.addListener(this.__hu,a,this._onMouseOver,this,true);
this.__ht.addListener(this.__hu,h,this._onMouseOut,this,true);
this.__ht.addListener(this.__hu,g,this._onKeyDown,this,true);
this.__ht.addListener(this.__hu,z,this._onKeyUp,this,true);
var bh=this.__hz;
bh.Ctrl=e.isCtrlPressed();
bh.Shift=e.isShiftPressed();
bh.Alt=e.isAltPressed();
this.__hH();
}else{this.__hI(x,this.__hw,this.__hv,false);
this.__hL();
}}}},_onMouseOver:function(e){var bi=e.getTarget();
var bj=this.__hK(bi);

if(bj&&bj!=this.__hv){this.__hN=this.__hI(m,bj,this.__hw,true,e);
this.__hv=bj;
this.__hH();
}},_onMouseOut:function(e){var bl=this.__hK(e.getTarget());
var bk=this.__hK(e.getRelatedTarget());

if(bl&&bl!==bk&&bl==this.__hv){this.__hI(l,this.__hv,bk,false,e);
this.__hv=null;
this.__hN=false;
qx.event.Timer.once(this.__hH,this,0);
}}},destruct:function(){this.__hw=this.__hv=this.__ht=this.__hu=this.__hx=this.__hy=this.__hz=this.__hA=null;
},defer:function(bm){qx.event.Registration.addHandler(bm);
}});
})();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);
this.__hO=d;
this.__hP={};
qx.event.handler.Appear.__hQ[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__hQ:{},refresh:function(){var e=this.__hQ;

for(var f in e){e[f].refresh();
}}},members:{__hO:null,__hP:null,canHandleEvent:function(g,h){},registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;
var m=this.__hP;

if(m&&!m[l]){m[l]=i;
i.$$displayed=i.offsetWidth>0;
}},unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;
var r=this.__hP;

if(!r){return;
}
if(r[q]){delete r[q];
}},refresh:function(){var v=this.__hP;
var w;

for(var u in v){w=v[u];
var s=w.offsetWidth>0;

if((!!w.$$displayed)!==s){w.$$displayed=s;
var t=qx.event.Registration.createEvent(s?a:b);
this.__hO.dispatchEvent(w,t);
}}}},destruct:function(){this.__hO=this.__hP=null;
delete qx.event.handler.Appear.__hQ[this.$$hash];
},defer:function(x){qx.event.Registration.addHandler(x);
}});
})();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(c){this._manager=c;
},members:{_getParent:function(d){throw new Error("Missing implementation");
},canDispatchEvent:function(e,event,f){return event.getBubbles();
},dispatchEvent:function(g,event,h){var parent=g;
var s=this._manager;
var p,w;
var n;
var r,u;
var t;
var v=[];
p=s.getListeners(g,h,true);
w=s.getListeners(g,h,false);

if(p){v.push(p);
}
if(w){v.push(w);
}var parent=this._getParent(g);
var l=[];
var k=[];
var m=[];
var q=[];
while(parent!=null){p=s.getListeners(parent,h,true);

if(p){m.push(p);
q.push(parent);
}w=s.getListeners(parent,h,false);

if(w){l.push(w);
k.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=m.length-1;i>=0;i--){t=q[i];
event.setCurrentTarget(t);
n=m[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(g);

for(var i=0,x=v.length;i<x;i++){n=v[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||g;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,x=l.length;i<x;i++){t=k[i];
event.setCurrentTarget(t);
n=l[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;
},canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();
}},defer:function(e){qx.event.Registration.addDispatcher(e);
}});
})();
(function(){var q="mshtml",p="",o="qx.client",n=" ",m=">",k="<",h="='",g="none",f="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",d="qx.bom.Element",a="' ",c="div",b="></";
qx.Class.define(d,{statics:{__hR:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},__hS:{},__hT:{},allowCreationWithMarkup:function(r){if(!r){r=window;
}var s=r.location.href;

if(qx.bom.Element.__hT[s]==undefined){try{r.document.createElement(f);
qx.bom.Element.__hT[s]=true;
}catch(e){qx.bom.Element.__hT[s]=false;
}}return qx.bom.Element.__hT[s];
},getHelperElement:function(t){if(!t){t=window;
}var v=t.location.href;

if(!qx.bom.Element.__hS[v]){var u=qx.bom.Element.__hS[v]=t.document.createElement(c);
if(qx.bom.client.Engine.WEBKIT){u.style.display=g;
t.document.body.appendChild(u);
}}return qx.bom.Element.__hS[v];
},create:function(name,w,x){if(!x){x=window;
}
if(!name){throw new Error("The tag name is missing!");
}var z=this.__hR;
var y=p;

for(var B in w){if(z[B]){y+=B+h+w[B]+a;
}}var C;
if(y!=p){if(qx.bom.Element.allowCreationWithMarkup(x)){C=x.document.createElement(k+name+n+y+m);
}else{var A=qx.bom.Element.getHelperElement(x);
A.innerHTML=k+name+n+y+b+name+m;
C=A.firstChild;
}}else{C=x.document.createElement(name);
}
for(var B in w){if(!z[B]){qx.bom.element.Attribute.set(C,B,w[B]);
}}return C;
},empty:function(D){return D.innerHTML=p;
},addListener:function(E,F,G,self,H){return qx.event.Registration.addListener(E,F,G,self,H);
},removeListener:function(I,J,K,self,L){return qx.event.Registration.removeListener(I,J,K,self,L);
},removeListenerById:function(M,N){return qx.event.Registration.removeListenerById(M,N);
},hasListener:function(O,P,Q){return qx.event.Registration.hasListener(O,P,Q);
},focus:function(R){qx.event.Registration.getManager(R).getHandler(qx.event.handler.Focus).focus(R);
},blur:function(S){qx.event.Registration.getManager(S).getHandler(qx.event.handler.Focus).blur(S);
},activate:function(T){qx.event.Registration.getManager(T).getHandler(qx.event.handler.Focus).activate(T);
},deactivate:function(U){qx.event.Registration.getManager(U).getHandler(qx.event.handler.Focus).deactivate(U);
},capture:function(V,W){qx.event.Registration.getManager(V).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(V,W);
},releaseCapture:function(X){qx.event.Registration.getManager(X).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(X);
},matchesSelector:function(Y,ba){if(ba){return qx.bom.Selector.query(ba,Y.parentNode).length>0;
}else{return false;
}},clone:function(bb,bc){var bf;

if(bc||(qx.core.Variant.isSet(o,q)&&!qx.xml.Document.isXmlDocument(bb))){var bj=qx.event.Registration.getManager(bb);
var bd=qx.dom.Hierarchy.getDescendants(bb);
bd.push(bb);
}if(qx.core.Variant.isSet(o,q)){for(var i=0,l=bd.length;i<l;i++){bj.toggleAttachedEvents(bd[i],false);
}}var bf=bb.cloneNode(true);
if(qx.core.Variant.isSet(o,q)){for(var i=0,l=bd.length;i<l;i++){bj.toggleAttachedEvents(bd[i],true);
}}if(bc===true){var bm=qx.dom.Hierarchy.getDescendants(bf);
bm.push(bf);
var be,bh,bl,bg;

for(var i=0,bk=bd.length;i<bk;i++){bl=bd[i];
be=bj.serializeListeners(bl);

if(be.length>0){bh=bm[i];

for(var j=0,bi=be.length;j<bi;j++){bg=be[j];
bj.addListener(bh,bg.type,bg.handler,bg.self,bg.capture);
}}}}return bf;
}}});
})();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";
qx.Class.define(b,{extend:qx.event.type.Event,members:{__hU:null,__hV:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);
this.__hU=d;
this.__hV=e;
return this;
},clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);
g.__hU=this.__hU;
g.__hV=this.__hV;
return g;
},getOrientation:function(){return this.__hU;
},isLandscape:function(){return this.__hV==c;
},isPortrait:function(){return this.__hV==a;
}}});
})();
(function(){var a="qx.event.type.Dom";
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Native.prototype._cloneNativeEvent.call(this,b,c);
c.shiftKey=b.shiftKey;
c.ctrlKey=b.ctrlKey;
c.altKey=b.altKey;
c.metaKey=b.metaKey;
return c;
},getModifiers:function(){var e=0;
var d=this._native;

if(d.shiftKey){e|=qx.event.type.Dom.SHIFT_MASK;
}
if(d.ctrlKey){e|=qx.event.type.Dom.CTRL_MASK;
}
if(d.altKey){e|=qx.event.type.Dom.ALT_MASK;
}
if(d.metaKey){e|=qx.event.type.Dom.META_MASK;
}return e;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var c="touchcancel",b="qx.event.type.Touch",a="touchend";
qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,d,e);
e.pageX=d.pageX;
e.pageY=d.pageY;
e.layerX=d.layerX;
e.layerY=d.layerY;
e.scale=d.scale;
e.rotation=d.rotation;
e.srcElement=d.srcElement;
e.targetTouches=[];

for(var i=0;i<d.targetTouches.length;i++){e.targetTouches[i]=d.targetTouches[i];
}e.changedTouches=[];

for(var i=0;i<d.changedTouches.length;i++){e.changedTouches[i]=d.changedTouches[i];
}e.touches=[];

for(var i=0;i<d.touches.length;i++){e.touches[i]=d.touches[i];
}return e;
},stop:function(){this.stopPropagation();
},getAllTouches:function(){return this._native.touches;
},getTargetTouches:function(){return this._native.targetTouches;
},getChangedTargetTouches:function(){return this._native.changedTouches;
},isMultiTouch:function(){return this.__hX().length>1;
},getScale:function(){return this._native.scale;
},getRotation:function(){return this._native.rotation;
},getDocumentLeft:function(f){return this.__hW(f).pageX;
},getDocumentTop:function(g){return this.__hW(g).pageY;
},getScreenLeft:function(h){return this.__hW(h).screenX;
},getScreenTop:function(j){return this.__hW(j).screenY;
},getViewportLeft:function(k){return this.__hW(k).clientX;
},getViewportTop:function(l){return this.__hW(l).clientY;
},getIdentifier:function(m){return this.__hW(m).identifier;
},__hW:function(n){n=n==null?0:n;
return this.__hX()[n];
},__hX:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());
return o;
},_isTouchEnd:function(){return (this.getType()==a||this.getType()==c);
}}});
})();
(function(){var a="qx.event.type.Tap";
qx.Class.define(a,{extend:qx.event.type.Touch,members:{_isTouchEnd:function(){return true;
}}});
})();
(function(){var a="qx.event.type.Swipe";
qx.Class.define(a,{extend:qx.event.type.Touch,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Touch.prototype._cloneNativeEvent.call(this,b,c);
c.swipe=b.swipe;
return c;
},_isTouchEnd:function(){return true;
},getStartTime:function(){return this._native.swipe.startTime;
},getDuration:function(){return this._native.swipe.duration;
},getAxis:function(){return this._native.swipe.axis;
},getDirection:function(){return this._native.swipe.direction;
},getVelocity:function(){return this._native.swipe.velocity;
},getDistance:function(){return this._native.swipe.distance;
}}});
})();
(function(){var h="left",g="right",f="middle",e="none",d="click",c="contextmenu",b="qx.event.type.Mouse",a="qx.client";
qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(i,j){var j=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,i,j);
j.button=i.button;
j.clientX=i.clientX;
j.clientY=i.clientY;
j.pageX=i.pageX;
j.pageY=i.pageY;
j.screenX=i.screenX;
j.screenY=i.screenY;
j.wheelDelta=i.wheelDelta;
j.detail=i.detail;
j.srcElement=i.srcElement;
j.target=i.target;
return j;
},__hY:{0:h,2:g,1:f},__ia:{1:h,2:g,4:f},stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case c:return g;
case d:if(this.__ib){return this.__ib();
}default:if(this._native.target!==undefined){return this.__hY[this._native.button]||e;
}else{return this.__ia[this._native.button]||e;
}}},__ib:qx.core.Variant.select(a,{"mshtml":function(){return h;
},"default":null}),isLeftPressed:function(){return this.getButton()===h;
},isMiddlePressed:function(){return this.getButton()===f;
},isRightPressed:function(){return this.getButton()===g;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:function(){if(this._native.pageX!==undefined){return this._native.pageX;
}else{var k=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(k);
}},getDocumentTop:function(){if(this._native.pageY!==undefined){return this._native.pageY;
}else{var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(l);
}},getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
}}});
})();
(function(){var c="qx.client",b="chrome",a="qx.event.type.MouseWheel";
qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();
this.preventDefault();
},getWheelDelta:qx.core.Variant.select(c,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(qx.bom.client.Browser.NAME==b){if(qx.bom.client.Platform.MAC){return -(this._native.wheelDelta/1200);
}else{return -(this._native.wheelDelta/120);
}}else{if(qx.bom.client.Platform.WIN){var d=120;
if(qx.bom.client.Engine.VERSION==533.16){d=1200;
}}else{d=40;
if(qx.bom.client.Engine.VERSION==533.16||qx.bom.client.Engine.VERSION==533.17||qx.bom.client.Engine.VERSION==533.18){d=1200;
}}return -(this._native.wheelDelta/d);
}}})}});
})();
(function(){var j="qx.client",i="ie",h="msie",g="android",f="operamini",e="mobile chrome",d=")(/| )([0-9]+\.[0-9])",c="iemobile",b="opera mobi",a="Mobile Safari",x="operamobile",w="mobile safari",v="IEMobile|Maxthon|MSIE",u="qx.bom.client.Browser",t="opera mini",s="(",r="opera",q="mshtml",p="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",m="webkit",n="5.0",k="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Firefox",l="Mobile/";
qx.Bootstrap.define(u,{statics:{UNKNOWN:true,NAME:"unknown",TITLE:"unknown 0.0",VERSION:0.0,FULLVERSION:"0.0.0",__ic:function(y){var z=navigator.userAgent;
var B=new RegExp(s+y+d);
var C=z.match(B);

if(!C){return;
}var name=C[1].toLowerCase();
var A=C[3];
if(z.match(/Version(\/| )([0-9]+\.[0-9])/)){A=RegExp.$2;
}
if(qx.core.Variant.isSet(j,m)){if(name===g){name=e;
}else if(z.indexOf(a)!==-1||z.indexOf(l)!==-1){name=w;
}}else if(qx.core.Variant.isSet(j,q)){if(name===h){name=i;
if(qx.bom.client.System.WINCE&&name===i){name=c;
A=n;
}}}else if(qx.core.Variant.isSet(j,r)){if(name===b){name=x;
}else if(name===t){name=f;
}}this.NAME=name;
this.FULLVERSION=A;
this.VERSION=parseFloat(A,10);
this.TITLE=name+" "+this.VERSION;
this.UNKNOWN=false;
}},defer:qx.core.Variant.select(j,{"webkit":function(D){D.__ic(o);
},"gecko":function(E){E.__ic(k);
},"mshtml":function(F){F.__ic(v);
},"opera":function(G){G.__ic(p);
}})});
})();
(function(){var f="qx.client",e="qx.dom.Hierarchy",d="previousSibling",c="*",b="nextSibling",a="parentNode";
qx.Class.define(e,{statics:{getNodeIndex:function(g){var h=0;

while(g&&(g=g.previousSibling)){h++;
}return h;
},getElementIndex:function(i){var j=0;
var k=qx.dom.Node.ELEMENT;

while(i&&(i=i.previousSibling)){if(i.nodeType==k){j++;
}}return j;
},getNextElementSibling:function(l){while(l&&(l=l.nextSibling)&&!qx.dom.Node.isElement(l)){continue;
}return l||null;
},getPreviousElementSibling:function(m){while(m&&(m=m.previousSibling)&&!qx.dom.Node.isElement(m)){continue;
}return m||null;
},contains:qx.core.Variant.select(f,{"webkit|mshtml|opera":function(n,o){if(qx.dom.Node.isDocument(n)){var p=qx.dom.Node.getDocument(o);
return n&&p==n;
}else if(qx.dom.Node.isDocument(o)){return false;
}else{return n.contains(o);
}},"gecko":function(q,r){return !!(q.compareDocumentPosition(r)&16);
},"default":function(s,t){while(t){if(s==t){return true;
}t=t.parentNode;
}return false;
}}),isRendered:qx.core.Variant.select(f,{"mshtml":function(u){if(!u.parentNode||!u.offsetParent){return false;
}var v=u.ownerDocument||u.document;
return v.body.contains(u);
},"gecko":function(w){var x=w.ownerDocument||w.document;
return !!(x.compareDocumentPosition(w)&16);
},"default":function(y){if(!y.parentNode||!y.offsetParent){return false;
}var z=y.ownerDocument||y.document;
return z.body.contains(y);
}}),isDescendantOf:function(A,B){return this.contains(B,A);
},getCommonParent:qx.core.Variant.select(f,{"mshtml|opera":function(C,D){if(C===D){return C;
}
while(C&&qx.dom.Node.isElement(C)){if(C.contains(D)){return C;
}C=C.parentNode;
}return null;
},"default":function(E,F){if(E===F){return E;
}var G={};
var J=qx.core.ObjectRegistry;
var I,H;

while(E||F){if(E){I=J.toHashCode(E);

if(G[I]){return G[I];
}G[I]=E;
E=E.parentNode;
}
if(F){H=J.toHashCode(F);

if(G[H]){return G[H];
}G[H]=F;
F=F.parentNode;
}}return null;
}}),getAncestors:function(K){return this._recursivelyCollect(K,a);
},getChildElements:function(L){L=L.firstChild;

if(!L){return [];
}var M=this.getNextSiblings(L);

if(L.nodeType===1){M.unshift(L);
}return M;
},getDescendants:function(N){return qx.lang.Array.fromCollection(N.getElementsByTagName(c));
},getFirstDescendant:function(O){O=O.firstChild;

while(O&&O.nodeType!=1){O=O.nextSibling;
}return O;
},getLastDescendant:function(P){P=P.lastChild;

while(P&&P.nodeType!=1){P=P.previousSibling;
}return P;
},getPreviousSiblings:function(Q){return this._recursivelyCollect(Q,d);
},getNextSiblings:function(R){return this._recursivelyCollect(R,b);
},_recursivelyCollect:function(S,T){var U=[];

while(S=S[T]){if(S.nodeType==1){U.push(S);
}}return U;
},getSiblings:function(V){return this.getPreviousSiblings(V).reverse().concat(this.getNextSiblings(V));
},isEmpty:function(W){W=W.firstChild;

while(W){if(W.nodeType===qx.dom.Node.ELEMENT||W.nodeType===qx.dom.Node.TEXT){return false;
}W=W.nextSibling;
}return true;
},cleanWhitespace:function(X){var Y=X.firstChild;

while(Y){var ba=Y.nextSibling;

if(Y.nodeType==3&&!/\S/.test(Y.nodeValue)){X.removeChild(Y);
}Y=ba;
}}}});
})();
(function(){var a="qx.event.type.KeyInput";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);
this._charCode=d;
return this;
},clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);
f._charCode=this._charCode;
return f;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var a="qx.event.type.KeySequence";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);
this._keyCode=b.keyCode;
this._identifier=d;
return this;
},clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);
f._keyCode=this._keyCode;
f._identifier=this._identifier;
return f;
},getKeyIdentifier:function(){return this._identifier;
},getKeyCode:function(){return this._keyCode;
}}});
})();
(function(){var j="qx.client",i="mousedown",h="mouseup",g="blur",f="focus",e="on",d="selectstart",c="DOMFocusOut",b="focusin",a="focusout",z="DOMFocusIn",y="draggesture",x="qx.event.handler.Focus",w="_applyFocus",v="deactivate",u="textarea",t="_applyActive",s='character',r="input",q="qxSelectable",o="tabIndex",p="off",m="activate",n="mshtml",k="qxKeepFocus",l="qxKeepActive";
qx.Class.define(x,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(A){qx.core.Object.call(this);
this._manager=A;
this._window=A.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:t,nullable:true},focus:{apply:w,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__id:null,__ie:null,__if:null,__ig:null,__ih:null,__ii:null,__ij:null,__ik:null,__il:null,__im:null,canHandleEvent:function(B,C){},registerEvent:function(D,E,F){},unregisterEvent:function(G,H,I){},focus:function(J){if(qx.core.Variant.isSet(j,n)){window.setTimeout(function(){try{J.focus();
var K=qx.bom.Selection.get(J);

if(K.length==0){var L=J.createTextRange();
L.moveStart(s,J.value.length);
L.collapse();
L.select();
}}catch(M){}},0);
}else{try{J.focus();
}catch(N){}}this.setFocus(J);
this.setActive(J);
},activate:function(O){this.setActive(O);
},blur:function(P){try{P.blur();
}catch(Q){}
if(this.getActive()===P){this.resetActive();
}
if(this.getFocus()===P){this.resetFocus();
}},deactivate:function(R){if(this.getActive()===R){this.resetActive();
}},tryActivate:function(S){var T=this.__iB(S);

if(T){this.setActive(T);
}},__in:function(U,V,W,X){var ba=qx.event.Registration;
var Y=ba.createEvent(W,qx.event.type.Focus,[U,V,X]);
ba.dispatchEvent(U,Y);
},_windowFocused:true,__io:function(){if(this._windowFocused){this._windowFocused=false;
this.__in(this._window,null,g,false);
}},__ip:function(){if(!this._windowFocused){this._windowFocused=true;
this.__in(this._window,null,f,false);
}},_initObserver:qx.core.Variant.select(j,{"gecko":function(){this.__id=qx.lang.Function.listener(this.__iv,this);
this.__ie=qx.lang.Function.listener(this.__iw,this);
this.__if=qx.lang.Function.listener(this.__iu,this);
this.__ig=qx.lang.Function.listener(this.__it,this);
this.__ih=qx.lang.Function.listener(this.__iq,this);
qx.bom.Event.addNativeListener(this._document,i,this.__id,true);
qx.bom.Event.addNativeListener(this._document,h,this.__ie,true);
qx.bom.Event.addNativeListener(this._window,f,this.__if,true);
qx.bom.Event.addNativeListener(this._window,g,this.__ig,true);
qx.bom.Event.addNativeListener(this._window,y,this.__ih,true);
},"mshtml":function(){this.__id=qx.lang.Function.listener(this.__iv,this);
this.__ie=qx.lang.Function.listener(this.__iw,this);
this.__ij=qx.lang.Function.listener(this.__ir,this);
this.__ik=qx.lang.Function.listener(this.__is,this);
this.__ii=qx.lang.Function.listener(this.__iy,this);
qx.bom.Event.addNativeListener(this._document,i,this.__id);
qx.bom.Event.addNativeListener(this._document,h,this.__ie);
qx.bom.Event.addNativeListener(this._document,b,this.__ij);
qx.bom.Event.addNativeListener(this._document,a,this.__ik);
qx.bom.Event.addNativeListener(this._document,d,this.__ii);
},"webkit":function(){this.__id=qx.lang.Function.listener(this.__iv,this);
this.__ie=qx.lang.Function.listener(this.__iw,this);
this.__ik=qx.lang.Function.listener(this.__is,this);
this.__if=qx.lang.Function.listener(this.__iu,this);
this.__ig=qx.lang.Function.listener(this.__it,this);
this.__ii=qx.lang.Function.listener(this.__iy,this);
qx.bom.Event.addNativeListener(this._document,i,this.__id,true);
qx.bom.Event.addNativeListener(this._document,h,this.__ie,true);
qx.bom.Event.addNativeListener(this._document,d,this.__ii,false);
qx.bom.Event.addNativeListener(this._window,c,this.__ik,true);
qx.bom.Event.addNativeListener(this._window,f,this.__if,true);
qx.bom.Event.addNativeListener(this._window,g,this.__ig,true);
},"opera":function(){this.__id=qx.lang.Function.listener(this.__iv,this);
this.__ie=qx.lang.Function.listener(this.__iw,this);
this.__ij=qx.lang.Function.listener(this.__ir,this);
this.__ik=qx.lang.Function.listener(this.__is,this);
qx.bom.Event.addNativeListener(this._document,i,this.__id,true);
qx.bom.Event.addNativeListener(this._document,h,this.__ie,true);
qx.bom.Event.addNativeListener(this._window,z,this.__ij,true);
qx.bom.Event.addNativeListener(this._window,c,this.__ik,true);
}}),_stopObserver:qx.core.Variant.select(j,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__id,true);
qx.bom.Event.removeNativeListener(this._document,h,this.__ie,true);
qx.bom.Event.removeNativeListener(this._window,f,this.__if,true);
qx.bom.Event.removeNativeListener(this._window,g,this.__ig,true);
qx.bom.Event.removeNativeListener(this._window,y,this.__ih,true);
},"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__id);
qx.bom.Event.removeNativeListener(this._document,h,this.__ie);
qx.bom.Event.removeNativeListener(this._document,b,this.__ij);
qx.bom.Event.removeNativeListener(this._document,a,this.__ik);
qx.bom.Event.removeNativeListener(this._document,d,this.__ii);
},"webkit":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__id,true);
qx.bom.Event.removeNativeListener(this._document,h,this.__ie,true);
qx.bom.Event.removeNativeListener(this._document,d,this.__ii,false);
qx.bom.Event.removeNativeListener(this._window,c,this.__ik,true);
qx.bom.Event.removeNativeListener(this._window,f,this.__if,true);
qx.bom.Event.removeNativeListener(this._window,g,this.__ig,true);
},"opera":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__id,true);
qx.bom.Event.removeNativeListener(this._document,h,this.__ie,true);
qx.bom.Event.removeNativeListener(this._window,z,this.__ij,true);
qx.bom.Event.removeNativeListener(this._window,c,this.__ik,true);
}}),__iq:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(bb){var bc=qx.bom.Event.getTarget(bb);

if(!this.__iC(bc)){qx.bom.Event.preventDefault(bb);
}},"default":null})),__ir:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(bd){this.__ip();
var bf=qx.bom.Event.getTarget(bd);
var be=this.__iA(bf);

if(be){this.setFocus(be);
}this.tryActivate(bf);
},"opera":function(bg){var bh=qx.bom.Event.getTarget(bg);

if(bh==this._document||bh==this._window){this.__ip();

if(this.__il){this.setFocus(this.__il);
delete this.__il;
}
if(this.__im){this.setActive(this.__im);
delete this.__im;
}}else{this.setFocus(bh);
this.tryActivate(bh);
if(!this.__iC(bh)){bh.selectionStart=0;
bh.selectionEnd=0;
}}},"default":null})),__is:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(bi){if(!bi.toElement){this.__io();
this.resetFocus();
this.resetActive();
}},"webkit":function(bj){var bk=qx.bom.Event.getTarget(bj);

if(bk===this.getFocus()){this.resetFocus();
}
if(bk===this.getActive()){this.resetActive();
}},"opera":function(bl){var bm=qx.bom.Event.getTarget(bl);

if(bm==this._document){this.__io();
this.__il=this.getFocus();
this.__im=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(bm===this.getFocus()){this.resetFocus();
}
if(bm===this.getActive()){this.resetActive();
}}},"default":null})),__it:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(bn){var bo=qx.bom.Event.getTarget(bn);

if(bo===this._window||bo===this._document){this.__io();
this.resetActive();
this.resetFocus();
}},"webkit":function(bp){var bq=qx.bom.Event.getTarget(bp);

if(bq===this._window||bq===this._document){this.__io();
this.__il=this.getFocus();
this.__im=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__iu:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(br){var bs=qx.bom.Event.getTarget(br);

if(bs===this._window||bs===this._document){this.__ip();
bs=this._body;
}this.setFocus(bs);
this.tryActivate(bs);
},"webkit":function(bt){var bu=qx.bom.Event.getTarget(bt);

if(bu===this._window||bu===this._document){this.__ip();

if(this.__il){this.setFocus(this.__il);
delete this.__il;
}
if(this.__im){this.setActive(this.__im);
delete this.__im;
}}else{this.setFocus(bu);
this.tryActivate(bu);
}},"default":null})),__iv:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(bv){var bx=qx.bom.Event.getTarget(bv);
var bw=this.__iA(bx);

if(!bw){qx.bom.Event.preventDefault(bv);
}else if(bw===this._body){this.setFocus(bw);
}},"mshtml":function(by){var bA=qx.bom.Event.getTarget(by);
var bz=this.__iA(bA);

if(bz){if(!this.__iC(bA)){bA.unselectable=e;
try{document.selection.empty();
}catch(bB){}try{bz.focus();
}catch(bC){}}}else{qx.bom.Event.preventDefault(by);
if(!this.__iC(bA)){bA.unselectable=e;
}}},"webkit":function(bD){var bF=qx.bom.Event.getTarget(bD);
var bE=this.__iA(bF);

if(bE){this.setFocus(bE);
}else{qx.bom.Event.preventDefault(bD);
}},"opera":function(bG){var bJ=qx.bom.Event.getTarget(bG);
var bH=this.__iA(bJ);

if(!this.__iC(bJ)){qx.bom.Event.preventDefault(bG);
if(bH){var bI=this.getFocus();

if(bI&&bI.selectionEnd){bI.selectionStart=0;
bI.selectionEnd=0;
bI.blur();
}if(bH){this.setFocus(bH);
}}}else if(bH){this.setFocus(bH);
}},"default":null})),__iw:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(bK){var bL=qx.bom.Event.getTarget(bK);

if(bL.unselectable){bL.unselectable=p;
}this.tryActivate(this.__ix(bL));
},"gecko":function(bM){var bN=qx.bom.Event.getTarget(bM);

while(bN&&bN.offsetWidth===undefined){bN=bN.parentNode;
}
if(bN){this.tryActivate(bN);
}},"webkit|opera":function(bO){var bP=qx.bom.Event.getTarget(bO);
this.tryActivate(this.__ix(bP));
},"default":null})),__ix:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml|webkit":function(bQ){var bR=this.getFocus();

if(bR&&bQ!=bR&&(bR.nodeName.toLowerCase()===r||bR.nodeName.toLowerCase()===u)){bQ=bR;
}return bQ;
},"default":function(bS){return bS;
}})),__iy:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml|webkit":function(bT){var bU=qx.bom.Event.getTarget(bT);

if(!this.__iC(bU)){qx.bom.Event.preventDefault(bT);
}},"default":null})),__iz:function(bV){var bW=qx.bom.element.Attribute.get(bV,o);

if(bW>=1){return true;
}var bX=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bW>=0&&bX[bV.tagName]){return true;
}return false;
},__iA:function(bY){while(bY&&bY.nodeType===1){if(bY.getAttribute(k)==e){return null;
}
if(this.__iz(bY)){return bY;
}bY=bY.parentNode;
}return this._body;
},__iB:function(ca){var cb=ca;

while(ca&&ca.nodeType===1){if(ca.getAttribute(l)==e){return null;
}ca=ca.parentNode;
}return cb;
},__iC:function(cc){while(cc&&cc.nodeType===1){var cd=cc.getAttribute(q);

if(cd!=null){return cd===e;
}cc=cc.parentNode;
}return true;
},_applyActive:function(ce,cf){if(cf){this.__in(cf,ce,v,true);
}
if(ce){this.__in(ce,cf,m,true);
}},_applyFocus:function(cg,ch){if(ch){this.__in(ch,cg,a,true);
}
if(cg){this.__in(cg,ch,b,true);
}if(ch){this.__in(ch,cg,g,false);
}
if(cg){this.__in(cg,ch,f,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__iD=null;
},defer:function(ci){qx.event.Registration.addHandler(ci);
var cj=ci.FOCUSABLE_ELEMENTS;

for(var ck in cj){cj[ck.toUpperCase()]=1;
}}});
})();
(function(){var k="qx.client",j="character",i="EndToEnd",h="input",g="textarea",f="StartToStart",e='character',d="qx.bom.Selection",c="button",b="#text",a="body";
qx.Class.define(d,{statics:{getSelectionObject:qx.core.Variant.select(k,{"mshtml":function(l){return l.selection;
},"default":function(m){return qx.dom.Node.getWindow(m).getSelection();
}}),get:qx.core.Variant.select(k,{"mshtml":function(n){var o=qx.bom.Range.get(qx.dom.Node.getDocument(n));
return o.text;
},"default":function(p){if(this.__iE(p)){return p.value.substring(p.selectionStart,p.selectionEnd);
}else{return this.getSelectionObject(qx.dom.Node.getDocument(p)).toString();
}}}),getLength:qx.core.Variant.select(k,{"mshtml":function(q){var s=this.get(q);
var r=qx.util.StringSplit.split(s,/\r\n/);
return s.length-(r.length-1);
},"opera":function(t){var y,w,u;

if(this.__iE(t)){var x=t.selectionStart;
var v=t.selectionEnd;
y=t.value.substring(x,v);
w=v-x;
}else{y=qx.bom.Selection.get(t);
w=y.length;
}u=qx.util.StringSplit.split(y,/\r\n/);
return w-(u.length-1);
},"default":function(z){if(this.__iE(z)){return z.selectionEnd-z.selectionStart;
}else{return this.get(z).length;
}}}),getStart:qx.core.Variant.select(k,{"mshtml":function(A){if(this.__iE(A)){var F=qx.bom.Range.get();
if(!A.contains(F.parentElement())){return -1;
}var G=qx.bom.Range.get(A);
var E=A.value.length;
G.moveToBookmark(F.getBookmark());
G.moveEnd(e,E);
return E-G.text.length;
}else{var G=qx.bom.Range.get(A);
var C=G.parentElement();
var H=qx.bom.Range.get();
H.moveToElementText(C);
var B=qx.bom.Range.get(qx.dom.Node.getBodyElement(A));
B.setEndPoint(f,G);
B.setEndPoint(i,H);
if(H.compareEndPoints(f,B)==0){return 0;
}var D;
var I=0;

while(true){D=B.moveStart(j,-1);
if(H.compareEndPoints(f,B)==0){break;
}if(D==0){break;
}else{I++;
}}return ++I;
}},"gecko|webkit":function(J){if(this.__iE(J)){return J.selectionStart;
}else{var L=qx.dom.Node.getDocument(J);
var K=this.getSelectionObject(L);
if(K.anchorOffset<K.focusOffset){return K.anchorOffset;
}else{return K.focusOffset;
}}},"default":function(M){if(this.__iE(M)){return M.selectionStart;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(M)).anchorOffset;
}}}),getEnd:qx.core.Variant.select(k,{"mshtml":function(N){if(this.__iE(N)){var S=qx.bom.Range.get();
if(!N.contains(S.parentElement())){return -1;
}var T=qx.bom.Range.get(N);
var R=N.value.length;
T.moveToBookmark(S.getBookmark());
T.moveStart(e,-R);
return T.text.length;
}else{var T=qx.bom.Range.get(N);
var P=T.parentElement();
var U=qx.bom.Range.get();
U.moveToElementText(P);
var R=U.text.length;
var O=qx.bom.Range.get(qx.dom.Node.getBodyElement(N));
O.setEndPoint(i,T);
O.setEndPoint(f,U);
if(U.compareEndPoints(i,O)==0){return R-1;
}var Q;
var V=0;

while(true){Q=O.moveEnd(j,1);
if(U.compareEndPoints(i,O)==0){break;
}if(Q==0){break;
}else{V++;
}}return R-(++V);
}},"gecko|webkit":function(W){if(this.__iE(W)){return W.selectionEnd;
}else{var Y=qx.dom.Node.getDocument(W);
var X=this.getSelectionObject(Y);
if(X.focusOffset>X.anchorOffset){return X.focusOffset;
}else{return X.anchorOffset;
}}},"default":function(ba){if(this.__iE(ba)){return ba.selectionEnd;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(ba)).focusOffset;
}}}),__iE:function(bb){return qx.dom.Node.isElement(bb)&&(bb.nodeName.toLowerCase()==h||bb.nodeName.toLowerCase()==g);
},set:qx.core.Variant.select(k,{"mshtml":function(bc,bd,be){var bf;
if(qx.dom.Node.isDocument(bc)){bc=bc.body;
}
if(qx.dom.Node.isElement(bc)||qx.dom.Node.isText(bc)){switch(bc.nodeName.toLowerCase()){case h:case g:case c:if(be===undefined){be=bc.value.length;
}
if(bd>=0&&bd<=bc.value.length&&be>=0&&be<=bc.value.length){bf=qx.bom.Range.get(bc);
bf.collapse(true);
bf.moveStart(j,bd);
bf.moveEnd(j,be-bd);
bf.select();
return true;
}break;
case b:if(be===undefined){be=bc.nodeValue.length;
}
if(bd>=0&&bd<=bc.nodeValue.length&&be>=0&&be<=bc.nodeValue.length){bf=qx.bom.Range.get(qx.dom.Node.getBodyElement(bc));
bf.moveToElementText(bc.parentNode);
bf.collapse(true);
bf.moveStart(j,bd);
bf.moveEnd(j,be-bd);
bf.select();
return true;
}break;
default:if(be===undefined){be=bc.childNodes.length-1;
}if(bc.childNodes[bd]&&bc.childNodes[be]){bf=qx.bom.Range.get(qx.dom.Node.getBodyElement(bc));
bf.moveToElementText(bc.childNodes[bd]);
bf.collapse(true);
var bg=qx.bom.Range.get(qx.dom.Node.getBodyElement(bc));
bg.moveToElementText(bc.childNodes[be]);
bf.setEndPoint(i,bg);
bf.select();
return true;
}}}return false;
},"default":function(bh,bi,bj){var bn=bh.nodeName.toLowerCase();

if(qx.dom.Node.isElement(bh)&&(bn==h||bn==g)){if(bj===undefined){bj=bh.value.length;
}if(bi>=0&&bi<=bh.value.length&&bj>=0&&bj<=bh.value.length){bh.focus();
bh.select();
bh.setSelectionRange(bi,bj);
return true;
}}else{var bl=false;
var bm=qx.dom.Node.getWindow(bh).getSelection();
var bk=qx.bom.Range.get(bh);
if(qx.dom.Node.isText(bh)){if(bj===undefined){bj=bh.length;
}
if(bi>=0&&bi<bh.length&&bj>=0&&bj<=bh.length){bl=true;
}}else if(qx.dom.Node.isElement(bh)){if(bj===undefined){bj=bh.childNodes.length-1;
}
if(bi>=0&&bh.childNodes[bi]&&bj>=0&&bh.childNodes[bj]){bl=true;
}}else if(qx.dom.Node.isDocument(bh)){bh=bh.body;

if(bj===undefined){bj=bh.childNodes.length-1;
}
if(bi>=0&&bh.childNodes[bi]&&bj>=0&&bh.childNodes[bj]){bl=true;
}}
if(bl){if(!bm.isCollapsed){bm.collapseToStart();
}bk.setStart(bh,bi);
if(qx.dom.Node.isText(bh)){bk.setEnd(bh,bj);
}else{bk.setEndAfter(bh.childNodes[bj]);
}if(bm.rangeCount>0){bm.removeAllRanges();
}bm.addRange(bk);
return true;
}}return false;
}}),setAll:function(bo){return qx.bom.Selection.set(bo,0);
},clear:qx.core.Variant.select(k,{"mshtml":function(bp){var bq=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bp));
var br=qx.bom.Range.get(bp);
var parent=br.parentElement();
var bs=qx.bom.Range.get(qx.dom.Node.getDocument(bp));
if(parent==bs.parentElement()&&parent==bp){bq.empty();
}},"default":function(bt){var bv=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bt));
var bx=bt.nodeName.toLowerCase();
if(qx.dom.Node.isElement(bt)&&(bx==h||bx==g)){bt.setSelectionRange(0,0);
qx.bom.Element.blur(bt);
}else if(qx.dom.Node.isDocument(bt)||bx==a){bv.collapse(bt.body?bt.body:bt,0);
}else{var bw=qx.bom.Range.get(bt);

if(!bw.collapsed){var by;
var bu=bw.commonAncestorContainer;
if(qx.dom.Node.isElement(bt)&&qx.dom.Node.isText(bu)){by=bu.parentNode;
}else{by=bu;
}
if(by==bt){bv.collapse(bt,0);
}}}}})}});
})();
(function(){var l="button",k="qx.bom.Range",j="text",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="qx.client",b="body";
qx.Class.define(k,{statics:{get:qx.core.Variant.select(a,{"mshtml":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case d:switch(m.type){case j:case i:case c:case l:case f:case h:case g:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}break;
case e:case b:case l:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}}else{if(m==null){m=window;
}return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}},"default":function(n){var o=qx.dom.Node.getDocument(n);
var p=qx.bom.Selection.getSelectionObject(o);

if(p.rangeCount>0){return p.getRangeAt(0);
}else{return o.createRange();
}}})}});
})();
(function(){var j="",h="m",g="g",f="^",e="qx.util.StringSplit",d="i",c="$(?!\\s)",b="[object RegExp]",a="y";
qx.Class.define(e,{statics:{split:function(k,l,m){if(Object.prototype.toString.call(l)!==b){return String.prototype.split.call(k,l,m);
}var t=[],n=0,r=(l.ignoreCase?d:j)+(l.multiline?h:j)+(l.sticky?a:j),l=RegExp(l.source,r+g),q,u,o,p,s=/()??/.exec(j)[1]===undefined;
k=k+j;

if(!s){q=RegExp(f+l.source+c,r);
}if(m===undefined||+m<0){m=Infinity;
}else{m=Math.floor(+m);

if(!m){return [];
}}
while(u=l.exec(k)){o=u.index+u[0].length;

if(o>n){t.push(k.slice(n,u.index));
if(!s&&u.length>1){u[0].replace(q,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undefined){u[i]=undefined;
}}});
}
if(u.length>1&&u.index<k.length){Array.prototype.push.apply(t,u.slice(1));
}p=u[0].length;
n=o;

if(t.length>=m){break;
}}
if(l.lastIndex===u.index){l.lastIndex++;
}}
if(n===k.length){if(p||!l.test(j)){t.push(j);
}}else{t.push(k.slice(n));
}return t.length>m?t.slice(0,m):t;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var j="",i="undefined",h="qx.client",g="readOnly",f="accessKey",e="qx.bom.element.Attribute",d="rowSpan",c="vAlign",b="className",a="textContent",y="'",x="htmlFor",w="longDesc",v="cellSpacing",u="frameBorder",t="='",s="useMap",r="innerText",q="innerHTML",p="tabIndex",n="dateTime",o="maxLength",l="mshtml",m="cellPadding",k="colSpan";
qx.Class.define(e,{statics:{__iF:{names:{"class":b,"for":x,html:q,text:qx.core.Variant.isSet(h,l)?r:a,colspan:k,rowspan:d,valign:c,datetime:n,accesskey:f,tabindex:p,maxlength:o,readonly:g,longdesc:w,cellpadding:m,cellspacing:v,frameborder:u,usemap:s},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:j,className:j,innerHTML:j,innerText:j,textContent:j,htmlFor:j,tabIndex:0,maxLength:qx.core.Variant.select(h,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(z){var A=[];
var C=this.__iF.runtime;

for(var B in z){if(!C[B]){A.push(B,t,z[B],y);
}}return A.join(j);
},get:qx.core.Variant.select(h,{"mshtml":function(D,name){var F=this.__iF;
var E;
name=F.names[name]||name;
if(F.original[name]){E=D.getAttribute(name,2);
}else if(F.property[name]){E=D[name];

if(typeof F.propertyDefault[name]!==i&&E==F.propertyDefault[name]){if(typeof F.bools[name]===i){return null;
}else{return E;
}}}else{E=D.getAttribute(name);
}if(F.bools[name]){return !!E;
}return E;
},"default":function(G,name){var I=this.__iF;
var H;
name=I.names[name]||name;
if(I.property[name]){H=G[name];

if(typeof I.propertyDefault[name]!==i&&H==I.propertyDefault[name]){if(typeof I.bools[name]===i){return null;
}else{return H;
}}}else{H=G.getAttribute(name);
}if(I.bools[name]){return !!H;
}return H;
}}),set:function(J,name,K){if(typeof K===i){return;
}var L=this.__iF;
name=L.names[name]||name;
if(L.bools[name]){K=!!K;
}if(L.property[name]&&(!(J[name]===undefined)||L.qxProperties[name])){if(K==null){if(L.removeableProperties[name]){J.removeAttribute(name);
return;
}else if(typeof L.propertyDefault[name]!==i){K=L.propertyDefault[name];
}}J[name]=K;
}else{if(K===true){J.setAttribute(name,name);
}else if(K===false||K===null){J.removeAttribute(name);
}else{J.setAttribute(name,K);
}}},reset:function(M,name){this.set(M,name,null);
}}});
})();
(function(){var a="qx.event.type.Drag";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c){qx.event.type.Event.prototype.init.call(this,true,b);

if(c){this._native=c.getNativeEvent()||null;
this._originalTarget=c.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e._native=this._native;
return e;
},getDocumentLeft:function(){if(this._native==null){return 0;
}
if(this._native.pageX!==undefined){return this._native.pageX;
}else{var f=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(f);
}},getDocumentTop:function(){if(this._native==null){return 0;
}
if(this._native.pageY!==undefined){return this._native.pageY;
}else{var g=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(g);
}},getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(h){this.getManager().addType(h);
},addAction:function(i){this.getManager().addAction(i);
},supportsType:function(j){return this.getManager().supportsType(j);
},supportsAction:function(k){return this.getManager().supportsAction(k);
},addData:function(l,m){this.getManager().addData(l,m);
},getData:function(n){return this.getManager().getData(n);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var h="losecapture",g="qx.client",f="blur",e="focus",d="click",c="qx.event.dispatch.MouseCapture",b="capture",a="scroll";
qx.Class.define(c,{extend:qx.event.dispatch.AbstractBubbling,construct:function(i,j){qx.event.dispatch.AbstractBubbling.call(this,i);
this.__iG=i.getWindow();
this.__iH=j;
i.addListener(this.__iG,f,this.releaseCapture,this);
i.addListener(this.__iG,e,this.releaseCapture,this);
i.addListener(this.__iG,a,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__iH:null,__iI:null,__iJ:true,__iG:null,_getParent:function(k){return k.parentNode;
},canDispatchEvent:function(l,event,m){return (this.__iI&&this.__iK[m]);
},dispatchEvent:function(n,event,o){if(o==d){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__iJ||!qx.dom.Hierarchy.contains(this.__iI,n)){n=this.__iI;
}qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,n,event,o);
},__iK:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(p,q){var q=q!==false;

if(this.__iI===p&&this.__iJ==q){return;
}
if(this.__iI){this.releaseCapture();
}this.nativeSetCapture(p,q);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(p,h,function(){qx.bom.Event.removeNativeListener(p,h,arguments.callee);
self.releaseCapture();
});
}this.__iJ=q;
this.__iI=p;
this.__iH.fireEvent(p,b,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__iI;
},releaseCapture:function(){var r=this.__iI;

if(!r){return;
}this.__iI=null;
this.__iH.fireEvent(r,h,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(r);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(g,{"mshtml":function(s,t){qx.event.Timer.once(function(){s.setCapture(t!==false);
},this,0);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(g,{"mshtml":function(u){qx.event.Timer.once(function(){u.releaseCapture();
},this,0);
},"default":qx.lang.Function.empty})},destruct:function(){this.__iI=this.__iG=this.__iH=null;
},defer:function(v){qx.event.Registration.addDispatcher(v);
}});
})();
(function(){var c="qx.bom.Selector";
qx.Class.define(c,{statics:{query:null,matches:null}});
(function(){var o=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,v=0,r=Object.prototype.toString,p=false,x=true;
[0,0].sort(function(){x=false;
return 0;
});
var g=function(z,A,B,C){B=B||[];
A=A||document;
var L=A;

if(A.nodeType!==1&&A.nodeType!==9){return [];
}
if(!z||typeof z!=="string"){return B;
}var m,F,D,H,J,G,M,i,N=true,E=g.isXML(A),I=[],K=z;
do{o.exec("");
m=o.exec(K);

if(m){K=m[3];
I.push(m[1]);

if(m[2]){H=m[3];
break;
}}}while(m);

if(I.length>1&&q.exec(z)){if(I.length===2&&k.relative[I[0]]){F=h(I[0]+I[1],A);
}else{F=k.relative[I[0]]?[A]:g(I.shift(),A);

while(I.length){z=I.shift();

if(k.relative[z]){z+=I.shift();
}F=h(z,F);
}}}else{if(!C&&I.length>1&&A.nodeType===9&&!E&&k.match.ID.test(I[0])&&!k.match.ID.test(I[I.length-1])){J=g.find(I.shift(),A,E);
A=J.expr?g.filter(J.expr,J.set)[0]:J.set[0];
}
if(A){J=C?
{expr:I.pop(),set:f(C)}:g.find(I.pop(),I.length===1&&(I[0]==="~"||I[0]==="+")&&A.parentNode?A.parentNode:A,E);
F=J.expr?g.filter(J.expr,J.set):J.set;

if(I.length>0){D=f(F);
}else{N=false;
}
while(I.length){G=I.pop();
M=G;

if(!k.relative[G]){G="";
}else{M=I.pop();
}
if(M==null){M=A;
}k.relative[G](D,M,E);
}}else{D=I=[];
}}
if(!D){D=F;
}
if(!D){g.error(G||z);
}
if(r.call(D)==="[object Array]"){if(!N){B.push.apply(B,D);
}else if(A&&A.nodeType===1){for(i=0;D[i]!=null;i++){if(D[i]&&(D[i]===true||D[i].nodeType===1&&g.contains(A,D[i]))){B.push(F[i]);
}}}else{for(i=0;D[i]!=null;i++){if(D[i]&&D[i].nodeType===1){B.push(F[i]);
}}}}else{f(D,B);
}
if(H){g(H,L,B,C);
g.uniqueSort(B);
}return B;
};
g.uniqueSort=function(O){if(s){p=x;
O.sort(s);

if(p){for(var i=1;i<O.length;i++){if(O[i]===O[i-1]){O.splice(i--,1);
}}}}return O;
};
g.matches=function(P,Q){return g(P,null,null,Q);
};
g.matchesSelector=function(R,S){return g(S,null,null,[R]).length>0;
};
g.find=function(T,U,V){var W;

if(!T){return [];
}
for(var i=0,l=k.order.length;i<l;i++){var Y,X=k.order[i];

if((Y=k.leftMatch[X].exec(T))){var ba=Y[1];
Y.splice(1,1);

if(ba.substr(ba.length-1)!=="\\"){Y[1]=(Y[1]||"").replace(/\\/g,"");
W=k.find[X](Y,U,V);

if(W!=null){T=T.replace(k.match[X],"");
break;
}}}}
if(!W){W=U.getElementsByTagName("*");
}return {set:W,expr:T};
};
g.filter=function(bb,bc,bd,be){var br,bq,bf=bb,bk=[],bg=bc,bh=bc&&bc[0]&&g.isXML(bc[0]);

while(bb&&bc.length){for(var bo in k.filter){if((br=k.leftMatch[bo].exec(bb))!=null&&br[2]){var bn,bj,bi=k.filter[bo],bs=br[1];
bq=false;
br.splice(1,1);

if(bs.substr(bs.length-1)==="\\"){continue;
}
if(bg===bk){bk=[];
}
if(k.preFilter[bo]){br=k.preFilter[bo](br,bg,bd,bk,be,bh);

if(!br){bq=bn=true;
}else if(br===true){continue;
}}
if(br){for(var i=0;(bj=bg[i])!=null;i++){if(bj){bn=bi(bj,br,i,bg);
var bm=be^!!bn;

if(bd&&bn!=null){if(bm){bq=true;
}else{bg[i]=false;
}}else if(bm){bk.push(bj);
bq=true;
}}}}
if(bn!==undefined){if(!bd){bg=bk;
}bb=bb.replace(k.match[bo],"");

if(!bq){return [];
}break;
}}}if(bb===bf){if(bq==null){g.error(bb);
}else{break;
}}bf=bb;
}return bg;
};
g.error=function(bt){throw "Syntax error, unrecognized expression: "+bt;
};
var k=g.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(bu){return bu.getAttribute("href");
}},relative:{"+":function(bv,bw){var bx=typeof bw==="string",bz=bx&&!/\W/.test(bw),bA=bx&&!bz;

if(bz){bw=bw.toLowerCase();
}
for(var i=0,l=bv.length,by;i<l;i++){if((by=bv[i])){while((by=by.previousSibling)&&by.nodeType!==1){}bv[i]=bA||by&&by.nodeName.toLowerCase()===bw?by||false:by===bw;
}}
if(bA){g.filter(bw,bv,true);
}},">":function(bB,bC){var bE,bD=typeof bC==="string",i=0,l=bB.length;

if(bD&&!/\W/.test(bC)){bC=bC.toLowerCase();

for(;i<l;i++){bE=bB[i];

if(bE){var parent=bE.parentNode;
bB[i]=parent.nodeName.toLowerCase()===bC?parent:false;
}}}else{for(;i<l;i++){bE=bB[i];

if(bE){bB[i]=bD?bE.parentNode:bE.parentNode===bC;
}}
if(bD){g.filter(bC,bB,true);
}}},"":function(bF,bG,bH){var bK,bI=v++,bJ=w;

if(typeof bG==="string"&&!/\W/.test(bG)){bG=bG.toLowerCase();
bK=bG;
bJ=y;
}bJ("parentNode",bG,bI,bF,bK,bH);
},"~":function(bL,bM,bN){var bQ,bO=v++,bP=w;

if(typeof bM==="string"&&!/\W/.test(bM)){bM=bM.toLowerCase();
bQ=bM;
bP=y;
}bP("previousSibling",bM,bO,bL,bQ,bN);
}},find:{ID:function(bR,bS,bT){if(typeof bS.getElementById!=="undefined"&&!bT){var m=bS.getElementById(bR[1]);
return m&&m.parentNode?[m]:[];
}},NAME:function(bU,bV){if(typeof bV.getElementsByName!=="undefined"){var bX=[],bW=bV.getElementsByName(bU[1]);

for(var i=0,l=bW.length;i<l;i++){if(bW[i].getAttribute("name")===bU[1]){bX.push(bW[i]);
}}return bX.length===0?null:bX;
}},TAG:function(bY,ca){return ca.getElementsByTagName(bY[1]);
}},preFilter:{CLASS:function(cb,cc,cd,ce,cf,cg){cb=" "+cb[1].replace(/\\/g,"")+" ";

if(cg){return cb;
}
for(var i=0,ch;(ch=cc[i])!=null;i++){if(ch){if(cf^(ch.className&&(" "+ch.className+" ").replace(/[\t\n]/g," ").indexOf(cb)>=0)){if(!cd){ce.push(ch);
}}else if(cd){cc[i]=false;
}}}return false;
},ID:function(ci){return ci[1].replace(/\\/g,"");
},TAG:function(cj,ck){return cj[1].toLowerCase();
},CHILD:function(cl){if(cl[1]==="nth"){var cm=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(cl[2]==="even"&&"2n"||cl[2]==="odd"&&"2n+1"||!/\D/.test(cl[2])&&"0n+"+cl[2]||cl[2]);
cl[2]=(cm[1]+(cm[2]||1))-0;
cl[3]=cm[3]-0;
}cl[0]=v++;
return cl;
},ATTR:function(cn,co,cp,cq,cr,cs){var name=cn[1].replace(/\\/g,"");

if(!cs&&k.attrMap[name]){cn[1]=k.attrMap[name];
}
if(cn[2]==="~="){cn[4]=" "+cn[4]+" ";
}return cn;
},PSEUDO:function(ct,cu,cv,cw,cx){if(ct[1]==="not"){if((o.exec(ct[3])||"").length>1||/^\w/.test(ct[3])){ct[3]=g(ct[3],null,null,cu);
}else{var cy=g.filter(ct[3],cu,cv,true^cx);

if(!cv){cw.push.apply(cw,cy);
}return false;
}}else if(k.match.POS.test(ct[0])||k.match.CHILD.test(ct[0])){return true;
}return ct;
},POS:function(cz){cz.unshift(true);
return cz;
}},filters:{enabled:function(cA){return cA.disabled===false&&cA.type!=="hidden";
},disabled:function(cB){return cB.disabled===true;
},checked:function(cC){return cC.checked===true;
},selected:function(cD){cD.parentNode.selectedIndex;
return cD.selected===true;
},parent:function(cE){return !!cE.firstChild;
},empty:function(cF){return !cF.firstChild;
},has:function(cG,i,cH){return !!g(cH[3],cG).length;
},header:function(cI){return (/h\d/i).test(cI.nodeName);
},text:function(cJ){return "text"===cJ.type;
},radio:function(cK){return "radio"===cK.type;
},checkbox:function(cL){return "checkbox"===cL.type;
},file:function(cM){return "file"===cM.type;
},password:function(cN){return "password"===cN.type;
},submit:function(cO){return "submit"===cO.type;
},image:function(cP){return "image"===cP.type;
},reset:function(cQ){return "reset"===cQ.type;
},button:function(cR){return "button"===cR.type||cR.nodeName.toLowerCase()==="button";
},input:function(cS){return (/input|select|textarea|button/i).test(cS.nodeName);
}},setFilters:{first:function(cT,i){return i===0;
},last:function(cU,i,cV,cW){return i===cW.length-1;
},even:function(cX,i){return i%2===0;
},odd:function(cY,i){return i%2===1;
},lt:function(da,i,db){return i<db[3]-0;
},gt:function(dc,i,dd){return i>dd[3]-0;
},nth:function(de,i,df){return df[3]-0===i;
},eq:function(dg,i,dh){return dh[3]-0===i;
}},filter:{PSEUDO:function(di,dj,i,dk){var name=dj[1],dl=k.filters[name];

if(dl){return dl(di,i,dj,dk);
}else if(name==="contains"){return (di.textContent||di.innerText||g.getText([di])||"").indexOf(dj[3])>=0;
}else if(name==="not"){var dm=dj[3];

for(var j=0,l=dm.length;j<l;j++){if(dm[j]===di){return false;
}}return true;
}else{g.error("Syntax error, unrecognized expression: "+name);
}},CHILD:function(dn,dp){var dv=dp[1],dq=dn;

switch(dv){case "only":case "first":while((dq=dq.previousSibling)){if(dq.nodeType===1){return false;
}}
if(dv==="first"){return true;
}dq=dn;
case "last":while((dq=dq.nextSibling)){if(dq.nodeType===1){return false;
}}return true;
case "nth":var dw=dp[2],ds=dp[3];

if(dw===1&&ds===0){return true;
}var du=dp[0],parent=dn.parentNode;

if(parent&&(parent.sizcache!==du||!dn.nodeIndex)){var dr=0;

for(dq=parent.firstChild;dq;dq=dq.nextSibling){if(dq.nodeType===1){dq.nodeIndex=++dr;
}}parent.sizcache=du;
}var dt=dn.nodeIndex-ds;

if(dw===0){return dt===0;
}else{return (dt%dw===0&&dt/dw>=0);
}}},ID:function(dx,dy){return dx.nodeType===1&&dx.getAttribute("id")===dy;
},TAG:function(dz,dA){return (dA==="*"&&dz.nodeType===1)||dz.nodeName.toLowerCase()===dA;
},CLASS:function(dB,dC){return (" "+(dB.className||dB.getAttribute("class"))+" ").indexOf(dC)>-1;
},ATTR:function(dD,dE){var name=dE[1],dI=k.attrHandle[name]?k.attrHandle[name](dD):dD[name]!=null?dD[name]:dD.getAttribute(name),dH=dI+"",dG=dE[2],dF=dE[4];
return dI==null?dG==="!=":dG==="="?dH===dF:dG==="*="?dH.indexOf(dF)>=0:dG==="~="?(" "+dH+" ").indexOf(dF)>=0:!dF?dH&&dI!==false:dG==="!="?dH!==dF:dG==="^="?dH.indexOf(dF)===0:dG==="$="?dH.substr(dH.length-dF.length)===dF:dG==="|="?dH===dF||dH.substr(0,dF.length+1)===dF+"-":false;
},POS:function(dJ,dK,i,dL){var name=dK[2],dM=k.setFilters[name];

if(dM){return dM(dJ,i,dK,dL);
}}}};
var q=k.match.POS,d=function(dN,dO){return "\\"+(dO-0+1);
};

for(var u in k.match){k.match[u]=new RegExp(k.match[u].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
k.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+k.match[u].source.replace(/\\(\d+)/g,d));
}var f=function(dP,dQ){dP=Array.prototype.slice.call(dP,0);

if(dQ){dQ.push.apply(dQ,dP);
return dQ;
}return dP;
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;
}catch(e){f=function(dR,dS){var i=0,dT=dS||[];

if(r.call(dR)==="[object Array]"){Array.prototype.push.apply(dT,dR);
}else{if(typeof dR.length==="number"){for(var l=dR.length;i<l;i++){dT.push(dR[i]);
}}else{for(;dR[i];i++){dT.push(dR[i]);
}}}return dT;
};
}var s,n;

if(document.documentElement.compareDocumentPosition){s=function(a,b){if(a===b){p=true;
return 0;
}
if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;
}return a.compareDocumentPosition(b)&4?-1:1;
};
}else{s=function(a,b){var dY,dW,ea=[],eb=[],dV=a.parentNode,dX=b.parentNode,dU=dV;
if(a===b){p=true;
return 0;
}else if(dV===dX){return n(a,b);
}else if(!dV){return -1;
}else if(!dX){return 1;
}while(dU){ea.unshift(dU);
dU=dU.parentNode;
}dU=dX;

while(dU){eb.unshift(dU);
dU=dU.parentNode;
}dY=ea.length;
dW=eb.length;
for(var i=0;i<dY&&i<dW;i++){if(ea[i]!==eb[i]){return n(ea[i],eb[i]);
}}return i===dY?n(a,eb[i],-1):n(ea[i],b,1);
};
n=function(a,b,ec){if(a===b){return ec;
}var ed=a.nextSibling;

while(ed){if(ed===b){return -1;
}ed=ed.nextSibling;
}return 1;
};
}g.getText=function(ee){var eg="",ef;

for(var i=0;ee[i];i++){ef=ee[i];
if(ef.nodeType===3||ef.nodeType===4){eg+=ef.nodeValue;
}else if(ef.nodeType!==8){eg+=g.getText(ef.childNodes);
}}return eg;
};
(function(){var ej=document.createElement("div"),ei="script"+(new Date()).getTime(),eh=document.documentElement;
ej.innerHTML="<a name='"+ei+"'/>";
eh.insertBefore(ej,eh.firstChild);
if(document.getElementById(ei)){k.find.ID=function(ek,el,em){if(typeof el.getElementById!=="undefined"&&!em){var m=el.getElementById(ek[1]);
return m?m.id===ek[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===ek[1]?[m]:undefined:[];
}};
k.filter.ID=function(en,eo){var ep=typeof en.getAttributeNode!=="undefined"&&en.getAttributeNode("id");
return en.nodeType===1&&ep&&ep.nodeValue===eo;
};
}eh.removeChild(ej);
eh=ej=null;
})();
(function(){var eq=document.createElement("div");
eq.appendChild(document.createComment(""));
if(eq.getElementsByTagName("*").length>0){k.find.TAG=function(er,es){var eu=es.getElementsByTagName(er[1]);
if(er[1]==="*"){var et=[];

for(var i=0;eu[i];i++){if(eu[i].nodeType===1){et.push(eu[i]);
}}eu=et;
}return eu;
};
}eq.innerHTML="<a href='#'></a>";

if(eq.firstChild&&typeof eq.firstChild.getAttribute!=="undefined"&&eq.firstChild.getAttribute("href")!=="#"){k.attrHandle.href=function(ev){return ev.getAttribute("href",2);
};
}eq=null;
})();

if(document.querySelectorAll){(function(){var ex=g,ew=document.createElement("div"),ey="__sizzle__";
ew.innerHTML="<p class='TEST'></p>";
if(ew.querySelectorAll&&ew.querySelectorAll(".TEST").length===0){return;
}g=function(eA,eB,eC,eD){eB=eB||document;
eA=eA.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!eD&&!g.isXML(eB)){if(eB.nodeType===9){try{return f(eB.querySelectorAll(eA),eC);
}catch(eG){}}else if(eB.nodeType===1&&eB.nodeName.toLowerCase()!=="object"){var eE=eB.getAttribute("id"),eF=eE||ey;

if(!eE){eB.setAttribute("id",eF);
}
try{return f(eB.querySelectorAll("#"+eF+" "+eA),eC);
}catch(eH){}finally{if(!eE){eB.removeAttribute("id");
}}}}return ex(eA,eB,eC,eD);
};

for(var ez in ex){g[ez]=ex[ez];
}ew=null;
})();
}(function(){var eK=document.documentElement,eI=eK.matchesSelector||eK.mozMatchesSelector||eK.webkitMatchesSelector||eK.msMatchesSelector,eJ=false;

try{eI.call(document.documentElement,"[test!='']:sizzle");
}catch(eL){eJ=true;
}
if(eI){g.matchesSelector=function(eM,eN){eN=eN.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");

if(!g.isXML(eM)){try{if(eJ||!k.match.PSEUDO.test(eN)&&!/!=/.test(eN)){return eI.call(eM,eN);
}}catch(e){}}return g(eN,null,null,[eM]).length>0;
};
}})();
(function(){var eO=document.createElement("div");
eO.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!eO.getElementsByClassName||eO.getElementsByClassName("e").length===0){return;
}eO.lastChild.className="e";

if(eO.getElementsByClassName("e").length===1){return;
}k.order.splice(1,0,"CLASS");
k.find.CLASS=function(eP,eQ,eR){if(typeof eQ.getElementsByClassName!=="undefined"&&!eR){return eQ.getElementsByClassName(eP[1]);
}};
eO=null;
})();
function y(eS,eT,eU,eV,eW,eX){for(var i=0,l=eV.length;i<l;i++){var fa=eV[i];

if(fa){var eY=false;
fa=fa[eS];

while(fa){if(fa.sizcache===eU){eY=eV[fa.sizset];
break;
}
if(fa.nodeType===1&&!eX){fa.sizcache=eU;
fa.sizset=i;
}
if(fa.nodeName.toLowerCase()===eT){eY=fa;
break;
}fa=fa[eS];
}eV[i]=eY;
}}}function w(fb,fc,fd,fe,ff,fg){for(var i=0,l=fe.length;i<l;i++){var fi=fe[i];

if(fi){var fh=false;
fi=fi[fb];

while(fi){if(fi.sizcache===fd){fh=fe[fi.sizset];
break;
}
if(fi.nodeType===1){if(!fg){fi.sizcache=fd;
fi.sizset=i;
}
if(typeof fc!=="string"){if(fi===fc){fh=true;
break;
}}else if(g.filter(fc,[fi]).length>0){fh=fi;
break;
}}fi=fi[fb];
}fe[i]=fh;
}}}
if(document.documentElement.contains){g.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);
};
}else if(document.documentElement.compareDocumentPosition){g.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16);
};
}else{g.contains=function(){return false;
};
}g.isXML=function(fj){var fk=(fj?fj.ownerDocument||fj:0).documentElement;
return fk?fk.nodeName!=="HTML":false;
};
var h=function(fl,fm){var fq,fo=[],fn="",fp=fm.nodeType?[fm]:fm;
while((fq=k.match.PSEUDO.exec(fl))){fn+=fq[0];
fl=fl.replace(k.match.PSEUDO,"");
}fl=k.relative[fl]?fl+"*":fl;

for(var i=0,l=fp.length;i<l;i++){g(fl,fp[i],fo);
}return g.filter(fn,fo);
};
var t=qx.bom.Selector;
t.query=function(fr,fs){return g(fr,fs);
};
t.matches=function(ft,fu){return g(ft,null,null,fu);
};
})();
})();
(function(){var r="qx.client",q="",p="mshtml",o="'",n="SelectionLanguage",m="qx.xml.Document",k=" />",j="MSXML2.DOMDocument.3.0",h='<\?xml version="1.0" encoding="utf-8"?>\n<',g="MSXML2.XMLHTTP.3.0",c="MSXML2.XMLHTTP.6.0",f=" xmlns='",e="text/xml",b="XPath",a="MSXML2.DOMDocument.6.0",d="HTML";
qx.Class.define(m,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(s){if(s.nodeType===9){return s.documentElement.nodeName!==d;
}else if(s.ownerDocument){return this.isXmlDocument(s.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(r,{"mshtml":function(t,u){var v=new ActiveXObject(this.DOMDOC);
v.setProperty(n,b);

if(u){var w=h;
w+=u;

if(t){w+=f+t+o;
}w+=k;
v.loadXML(w);
}return v;
},"default":function(x,y){return document.implementation.createDocument(x||q,y||q,null);
}}),fromString:qx.core.Variant.select(r,{"mshtml":function(z){var A=qx.xml.Document.create();
A.loadXML(z);
return A;
},"default":function(B){var C=new DOMParser();
return C.parseFromString(B,e);
}})},defer:function(D){if(qx.core.Variant.isSet(r,p)){var E=[a,j];
var F=[c,g];

for(var i=0,l=E.length;i<l;i++){try{new ActiveXObject(E[i]);
new ActiveXObject(F[i]);
}catch(G){continue;
}D.DOMDOC=E[i];
D.XMLHTTP=F[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(l,stop,m){var parent=l.parentNode;
var r=qx.dom.Node.getDocument(l);
var n=r.body;
var z,x,u;
var B,s,C;
var v,D,G;
var E,p,y,o;
var t,F,w;
var q=m===g;
var A=m===c;
stop=stop?stop.parentNode:r;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===n||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===n){x=parent.scrollLeft;
u=x+qx.bom.Viewport.getWidth();
B=qx.bom.Viewport.getWidth();
s=parent.clientWidth;
C=parent.scrollWidth;
v=0;
D=0;
G=0;
}else{z=qx.bom.element.Location.get(parent);
x=z.left;
u=z.right;
B=parent.offsetWidth;
s=parent.clientWidth;
C=parent.scrollWidth;
v=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
D=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
G=B-s-v-D;
}E=qx.bom.element.Location.get(l);
p=E.left;
y=E.right;
o=l.offsetWidth;
t=p-x-v;
F=y-u+D;
w=0;
if(q){w=t;
}else if(A){w=F+G;
}else if(t<0||o>s){w=t;
}else if(F>0){w=F+G;
}parent.scrollLeft+=w;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===n){break;
}parent=parent.parentNode;
}},intoViewY:function(H,stop,I){var parent=H.parentNode;
var O=qx.dom.Node.getDocument(H);
var J=O.body;
var W,K,S;
var Y,V,Q;
var M,N,L;
var bb,bc,X,R;
var U,P,bd;
var ba=I===d;
var T=I===e;
stop=stop?stop.parentNode:O;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===J||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===J){K=parent.scrollTop;
S=K+qx.bom.Viewport.getHeight();
Y=qx.bom.Viewport.getHeight();
V=parent.clientHeight;
Q=parent.scrollHeight;
M=0;
N=0;
L=0;
}else{W=qx.bom.element.Location.get(parent);
K=W.top;
S=W.bottom;
Y=parent.offsetHeight;
V=parent.clientHeight;
Q=parent.scrollHeight;
M=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
N=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
L=Y-V-M-N;
}bb=qx.bom.element.Location.get(H);
bc=bb.top;
X=bb.bottom;
R=H.offsetHeight;
U=bc-K-M;
P=X-S+N;
bd=0;
if(ba){bd=U;
}else if(T){bd=P+L;
}else if(U<0||R>V){bd=U;
}else if(P>0){bd=P+L;
}parent.scrollTop+=bd;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===J){break;
}parent=parent.parentNode;
}},intoView:function(be,stop,bf,bg){this.intoViewX(be,stop,bf);
this.intoViewY(be,stop,bg);
}}});
})();
(function(){var b="qx.ui.core.queue.Widget",a="widget";
qx.Class.define(b,{statics:{__iL:{},remove:function(c){delete this.__iL[c.$$hash];
},add:function(d){var e=this.__iL;

if(e[d.$$hash]){return;
}e[d.$$hash]=d;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var f=this.__iL;
var h;

for(var g in f){h=f[g];
delete f[g];
h.syncWidget();
}for(var g in f){return;
}this.__iL={};
}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__iM:{},__iN:{},remove:function(c){var d=c.$$hash;
delete this.__iN[d];
delete this.__iM[d];
},isVisible:function(e){return this.__iN[e.$$hash]||false;
},__iO:function(f){var h=this.__iN;
var g=f.$$hash;
var i;
if(f.isExcluded()){i=false;
}else{var parent=f.$$parent;

if(parent){i=this.__iO(parent);
}else{i=f.isRootWidget();
}}return h[g]=i;
},add:function(j){var k=this.__iM;

if(k[j.$$hash]){return;
}k[j.$$hash]=j;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var l=this.__iM;
var p=this.__iN;
for(var m in l){if(p[m]!=null){l[m].addChildrenToQueue(l);
}}var o={};

for(var m in l){o[m]=p[m];
p[m]=null;
}for(var m in l){var n=l[m];
delete l[m];
if(p[m]==null){this.__iO(n);
}if(p[m]&&p[m]!=o[m]){n.checkAppearanceNeeds();
}}this.__iM={};
}}});
})();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";
qx.Class.define(a,{statics:{__iP:{},remove:function(c){delete this.__iP[c.$$hash];
},add:function(d){var e=this.__iP;

if(e[d.$$hash]){return;
}e[d.$$hash]=d;
qx.ui.core.queue.Manager.scheduleFlush(b);
},has:function(f){return !!this.__iP[f.$$hash];
},flush:function(){var j=qx.ui.core.queue.Visibility;
var g=this.__iP;
var i;

for(var h in g){i=g[h];
delete g[h];
if(j.isVisible(i)){i.syncAppearance();
}else{i.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__iQ:{},add:function(c){var d=this.__iQ;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__iQ;

for(var g in e){var f=e[g];
delete e[g];
f.dispose();
}for(var g in e){return;
}this.__iQ={};
}}});
})();
(function(){var c="none",b="qx.html.Decorator",a="absolute";
qx.Class.define(b,{extend:qx.html.Element,construct:function(d,e){var f={position:a,top:0,left:0};

if(qx.bom.client.Feature.CSS_POINTER_EVENTS){f.pointerEvents=c;
}qx.html.Element.call(this,null,f);
this.__iR=d;
this.__iS=e||d.toHashCode();
this.useMarkup(d.getMarkup());
},members:{__iS:null,__iR:null,getId:function(){return this.__iS;
},getDecorator:function(){return this.__iR;
},resize:function(g,h){this.__iR.resize(this.getDomElement(),g,h);
},tint:function(i){this.__iR.tint(this.getDomElement(),i);
},getInsets:function(){return this.__iR.getInsets();
}},destruct:function(){this.__iR=null;
}});
})();
(function(){var f="blur",e="focus",d="input",c="load",b="qx.ui.core.EventHandler",a="activate";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this.__iT=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,swipe:1},IGNORE_CAN_HANDLE:false},members:{__iT:null,__iU:{focusin:1,focusout:1,focus:1,blur:1},__iV:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(g,h){return g instanceof qx.ui.core.Widget;
},_dispatchEvent:function(j){var p=j.getTarget();
var o=qx.ui.core.Widget.getWidgetByElement(p);
var q=false;

while(o&&o.isAnonymous()){var q=true;
o=o.getLayoutParent();
}if(o&&q&&j.getType()==a){o.getContainerElement().activate();
}if(this.__iU[j.getType()]){o=o&&o.getFocusTarget();
if(!o){return;
}}if(j.getRelatedTarget){var x=j.getRelatedTarget();
var w=qx.ui.core.Widget.getWidgetByElement(x);

while(w&&w.isAnonymous()){w=w.getLayoutParent();
}
if(w){if(this.__iU[j.getType()]){w=w.getFocusTarget();
}if(w===o){return;
}}}var s=j.getCurrentTarget();
var u=qx.ui.core.Widget.getWidgetByElement(s);

if(!u||u.isAnonymous()){return;
}if(this.__iU[j.getType()]){u=u.getFocusTarget();
}var v=j.getType();

if(!u||!(u.isEnabled()||this.__iV[v])){return;
}var k=j.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var r=this.__iT.getListeners(u,v,k);

if(!r||r.length===0){return;
}var m=qx.event.Pool.getInstance().getObject(j.constructor);
j.clone(m);
m.setTarget(o);
m.setRelatedTarget(w||null);
m.setCurrentTarget(u);
var y=j.getOriginalTarget();

if(y){var n=qx.ui.core.Widget.getWidgetByElement(y);

while(n&&n.isAnonymous()){n=n.getLayoutParent();
}m.setOriginalTarget(n);
}else{m.setOriginalTarget(p);
}for(var i=0,l=r.length;i<l;i++){var t=r[i].context||u;
r[i].handler.call(t,m);
}if(m.getPropagationStopped()){j.stopPropagation();
}
if(m.getDefaultPrevented()){j.preventDefault();
}qx.event.Pool.getInstance().poolObject(m);
},registerEvent:function(z,A,B){var C;

if(A===e||A===f){C=z.getFocusElement();
}else if(A===c||A===d){C=z.getContentElement();
}else{C=z.getContainerElement();
}
if(C){C.addListener(A,this._dispatchEvent,this,B);
}},unregisterEvent:function(D,E,F){var G;

if(E===e||E===f){G=D.getFocusElement();
}else if(E===c||E===d){G=D.getContentElement();
}else{G=D.getContainerElement();
}
if(G){G.removeListener(E,this._dispatchEvent,this,F);
}}},destruct:function(){this.__iT=null;
},defer:function(H){qx.event.Registration.addHandler(H);
}});
})();
(function(){var c="abstract",b="qx.debug",a="qx.ui.layout.Abstract";
qx.Class.define(a,{type:c,extend:qx.core.Object,members:{__iW:null,_invalidChildrenCache:null,__iX:null,invalidateLayoutCache:function(){this.__iW=null;
},renderLayout:function(d,e){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__iW){return this.__iW;
}return this.__iW=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(f){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:qx.core.Variant.select(b,{"on":function(g,name,h){},"off":null}),_clearSeparators:function(){var i=this.__iX;

if(i instanceof qx.ui.core.LayoutItem){i.clearSeparators();
}},_renderSeparator:function(j,k){this.__iX.renderSeparator(j,k);
},connectToWidget:function(l){if(l&&this.__iX){throw new Error("It is not possible to manually set the connected widget.");
}this.__iX=l;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__iX;
},_applyLayoutChange:function(){if(this.__iX){this.__iX.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__iX.getLayoutChildren();
}},destruct:function(){this.__iX=this.__iW=null;
}});
})();
(function(){var i="",h="/",g="mshtml",f="qx.client",e="//",d="?",c="string",b="qx.util.ResourceManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__iY:qx.$$resources||{},__ja:{}},members:{has:function(j){return !!this.self(arguments).__iY[j];
},getData:function(k){return this.self(arguments).__iY[k]||null;
},getImageWidth:function(l){var m=this.self(arguments).__iY[l];
return m?m[0]:null;
},getImageHeight:function(n){var o=this.self(arguments).__iY[n];
return o?o[1]:null;
},getImageFormat:function(p){var q=this.self(arguments).__iY[p];
return q?q[2]:null;
},isClippedImage:function(r){var s=this.self(arguments).__iY[r];
return s&&s.length>4;
},toUri:function(t){if(t==null){return t;
}var u=this.self(arguments).__iY[t];

if(!u){return t;
}
if(typeof u===c){var w=u;
}else{var w=u[3];
if(!w){return t;
}}var v=i;

if(qx.core.Variant.isSet(f,g)&&qx.bom.client.Feature.SSL){v=this.self(arguments).__ja[w];
}return v+qx.$$libraries[w].resourceUri+h+t;
}},defer:function(x){if(qx.core.Variant.isSet(f,g)){if(qx.bom.client.Feature.SSL){for(var B in qx.$$libraries){var z;

if(qx.$$libraries[B].resourceUri){z=qx.$$libraries[B].resourceUri;
}else{x.__ja[B]=i;
continue;
}if(z.match(/^\/\//)!=null){x.__ja[B]=window.location.protocol;
}else if(z.match(/^\//)!=null){x.__ja[B]=window.location.protocol+e+window.location.host;
}else if(z.match(/^\.\//)!=null){var y=document.URL;
x.__ja[B]=y.substring(0,y.lastIndexOf(h)+1);
}else if(z.match(/^http/)!=null){x.__ja[B]=i;
}else{var C=window.location.href.indexOf(d);
var A;

if(C==-1){A=window.location.href;
}else{A=window.location.href.substring(0,C);
}x.__ja[B]=A.substring(0,A.lastIndexOf(h)+1);
}}}}}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Class.define(c,{statics:{LOCALE:"",VARIANT:"",__jb:function(){var d=(navigator.userLanguage||navigator.language).toLowerCase();
var f=a;
var e=d.indexOf(b);

if(e!=-1){f=d.substr(e+1);
d=d.substr(0,e);
}this.LOCALE=d;
this.VARIANT=f;
}},defer:function(g){g.__jb();
}});
})();
(function(){var v="",u='indexOf',t='slice',s='concat',r='toLocaleLowerCase',q="qx.type.BaseString",p='match',o="qx.debug",n='search',m='replace',d='toLowerCase',k='charCodeAt',g='split',c='substring',b='lastIndexOf',f="on",e='substr',h='toLocaleUpperCase',a='toUpperCase',j='charAt';
qx.Class.define(q,{extend:Object,construct:function(w){var w=w||v;
this.__jc=w;
this.length=w.length;
},members:{$$isString:true,length:0,__jc:null,toString:function(){return this.__jc;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(x,y){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(z,A){if(qx.core.Variant.isSet(o,f)){qx.Class.include(z,qx.core.MAssert);
}var B=[j,k,s,u,b,p,m,n,t,g,e,c,d,a,r,h];
A.valueOf=A.toString;

if(new z(v).valueOf()==null){delete A.valueOf;
}
for(var i=0,l=B.length;i<l;i++){A[B[i]]=String.prototype[B[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){qx.type.BaseString.call(this,b);
this.__jd=c;
this.__je=d;
},members:{__jd:null,__je:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__jd,this.__je);
}}});
})();
(function(){var l="_",k="",j="on",h="_applyLocale",g="changeLocale",f="C",e="qx.dynlocale",d="qx.locale.Manager",c="String",b="singleton",a="qx.debug";
qx.Class.define(d,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__jf=qx.$$translations||{};
this.__jg=qx.$$locales||{};
var o=qx.bom.client.Locale;
var m=o.LOCALE;
var n=o.VARIANT;

if(n!==k){m+=l+n;
}this.__jh=m;
this.setLocale(m||this.__ji);
},statics:{tr:function(p,q){var r=qx.lang.Array.fromArguments(arguments);
r.splice(0,1);
return qx.locale.Manager.getInstance().translate(p,r);
},trn:function(s,t,u,v){var w=qx.lang.Array.fromArguments(arguments);
w.splice(0,3);
if(u!=1){return qx.locale.Manager.getInstance().translate(t,w);
}else{return qx.locale.Manager.getInstance().translate(s,w);
}},trc:function(x,y,z){var A=qx.lang.Array.fromArguments(arguments);
A.splice(0,2);
return qx.locale.Manager.getInstance().translate(y,A);
},marktr:function(B){return B;
}},properties:{locale:{check:c,nullable:true,apply:h,event:g}},members:{__ji:f,__jj:null,__jk:null,__jf:null,__jg:null,__jh:null,getLanguage:function(){return this.__jk;
},getTerritory:function(){return this.getLocale().split(l)[1]||k;
},getAvailableLocales:function(){var D=[];

for(var C in this.__jg){if(C!=this.__ji){D.push(C);
}}return D;
},__jl:function(E){var G;
var F=E.indexOf(l);

if(F==-1){G=E;
}else{G=E.substring(0,F);
}return G;
},_applyLocale:function(H,I){if(qx.core.Variant.isSet(a,j)){if(!(H in this.__jg||H==this.__jh)){qx.log.Logger.warn("Locale: "+H+" not available.");
}}this.__jj=H;
this.__jk=this.__jl(H);
},addTranslation:function(J,K){var L=this.__jf;

if(L[J]){for(var M in K){L[J][M]=K[M];
}}else{L[J]=K;
}},addLocale:function(N,O){var P=this.__jg;

if(P[N]){for(var Q in O){P[N][Q]=O[Q];
}}else{P[N]=O;
}},translate:function(R,S,T){var U=this.__jf;
return this.__jm(U,R,S,T);
},localize:function(V,W,X){var Y=this.__jg;
return this.__jm(Y,V,W,X);
},__jm:function(ba,bb,bc,bd){var be;

if(!ba){return bb;
}
if(bd){var bg=this.__jl(bd);
}else{bd=this.__jj;
bg=this.__jk;
}if(!be&&ba[bd]){be=ba[bd][bb];
}if(!be&&ba[bg]){be=ba[bg][bb];
}if(!be&&ba[this.__ji]){be=ba[this.__ji][bb];
}
if(!be){be=bb;
}
if(bc.length>0){var bf=[];

for(var i=0;i<bc.length;i++){var bh=bc[i];

if(bh&&bh.translate){bf[i]=bh.translate();
}else{bf[i]=bh;
}}be=qx.lang.String.format(be,bf);
}
if(qx.core.Variant.isSet(e,j)){be=new qx.locale.LocalizedString(be,bb,bc);
}return be;
}},destruct:function(){this.__jf=this.__jg=null;
}});
})();
(function(){var k="px",j="qx.client",i="div",h="img",g="",f="no-repeat",d="qx.debug",c="scale-x",b="mshtml",a="on",I="repeat",H="scale",G="scale-y",F="qx/icon",E=".png",D="crop",C="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",B='<div style="',A="repeat-y",z='<img src="',r="qx.bom.element.Decoration",s="', sizingMethod='",p="png",q="')",n='"></div>',o='"/>',l='" style="',m="none",t="webkit",u=" ",w="repeat-x",v="DXImageTransform.Microsoft.AlphaImageLoader",y="qx/static/blank.gif",x="absolute";
qx.Class.define(r,{statics:{DEBUG:false,__jn:{},__jo:qx.core.Variant.isSet(j,b)&&qx.bom.client.Engine.VERSION<9,__jp:qx.core.Variant.select(j,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__jq:{"scale-x":h,"scale-y":h,"scale":h,"repeat":i,"no-repeat":i,"repeat-x":i,"repeat-y":i},update:function(J,K,L,M){var O=this.getTagName(L,K);

if(O!=J.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var P=this.getAttributes(K,L,M);

if(O===h){J.src=P.src||qx.util.ResourceManager.getInstance().toUri(y);
}if(J.style.backgroundPosition!=g&&P.style.backgroundPosition===undefined){P.style.backgroundPosition=null;
}if(J.style.clip!=g&&P.style.clip===undefined){P.style.clip=null;
}var N=qx.bom.element.Style;
N.setStyles(J,P.style);
if(this.__jo){try{J.filters[v].apply();
}catch(e){}}},create:function(Q,R,S){var T=this.getTagName(R,Q);
var V=this.getAttributes(Q,R,S);
var U=qx.bom.element.Style.compile(V.style);

if(T===h){return z+V.src+l+U+o;
}else{return B+U+n;
}},getTagName:function(W,X){if(qx.core.Variant.isSet(j,b)){if(X&&this.__jo&&this.__jp[W]&&qx.lang.String.endsWith(X,E)){return i;
}}return this.__jq[W];
},getAttributes:function(Y,ba,bb){if(!bb){bb={};
}
if(!bb.position){bb.position=x;
}
if(qx.core.Variant.isSet(j,b)){bb.fontSize=0;
bb.lineHeight=0;
}else if(qx.core.Variant.isSet(j,t)){bb.WebkitUserDrag=m;
}var bd=qx.util.ResourceManager.getInstance().getImageFormat(Y)||qx.io.ImageLoader.getFormat(Y);

if(qx.core.Variant.isSet(d,a)){if(Y!=null&&bd==null){qx.log.Logger.warn("ImageLoader: Not recognized format of external image '"+Y+"'!");
}}var bc;
if(this.__jo&&this.__jp[ba]&&bd===p){bc=this.__jt(bb,ba,Y);
}else{if(ba===H){bc=this.__ju(bb,ba,Y);
}else if(ba===c||ba===G){bc=this.__jv(bb,ba,Y);
}else{bc=this.__jy(bb,ba,Y);
}}return bc;
},__jr:function(be,bf,bh){if(be.width==null&&bf!=null){be.width=bf+k;
}
if(be.height==null&&bh!=null){be.height=bh+k;
}return be;
},__js:function(bi){var bj=qx.util.ResourceManager.getInstance().getImageWidth(bi)||qx.io.ImageLoader.getWidth(bi);
var bk=qx.util.ResourceManager.getInstance().getImageHeight(bi)||qx.io.ImageLoader.getHeight(bi);
return {width:bj,height:bk};
},__jt:function(bl,bm,bn){var bq=this.__js(bn);
bl=this.__jr(bl,bq.width,bq.height);
var bp=bm==f?D:H;
var bo=C+qx.util.ResourceManager.getInstance().toUri(bn)+s+bp+q;
bl.filter=bo;
bl.backgroundImage=bl.backgroundRepeat=g;
return {style:bl};
},__ju:function(br,bs,bt){var bu=qx.util.ResourceManager.getInstance().toUri(bt);
var bv=this.__js(bt);
br=this.__jr(br,bv.width,bv.height);
return {src:bu,style:br};
},__jv:function(bw,bx,by){var bC=qx.util.ResourceManager.getInstance();
var bB=bC.isClippedImage(by);
var bD=this.__js(by);

if(bB){var bA=bC.getData(by);
var bz=bC.toUri(bA[4]);

if(bx===c){bw=this.__jw(bw,bA,bD.height);
}else{bw=this.__jx(bw,bA,bD.width);
}return {src:bz,style:bw};
}else{if(qx.core.Variant.isSet(d,a)){this.__jA(by);
}
if(bx==c){bw.height=bD.height==null?null:bD.height+k;
}else if(bx==G){bw.width=bD.width==null?null:bD.width+k;
}var bz=bC.toUri(by);
return {src:bz,style:bw};
}},__jw:function(bE,bF,bG){var bH=qx.util.ResourceManager.getInstance().getImageHeight(bF[4]);
bE.clip={top:-bF[6],height:bG};
bE.height=bH+k;
if(bE.top!=null){bE.top=(parseInt(bE.top,10)+bF[6])+k;
}else if(bE.bottom!=null){bE.bottom=(parseInt(bE.bottom,10)+bG-bH-bF[6])+k;
}return bE;
},__jx:function(bI,bJ,bK){var bL=qx.util.ResourceManager.getInstance().getImageWidth(bJ[4]);
bI.clip={left:-bJ[5],width:bK};
bI.width=bL+k;
if(bI.left!=null){bI.left=(parseInt(bI.left,10)+bJ[5])+k;
}else if(bI.right!=null){bI.right=(parseInt(bI.right,10)+bK-bL-bJ[5])+k;
}return bI;
},__jy:function(bM,bN,bO){var bT=qx.util.ResourceManager.getInstance().isClippedImage(bO);
var bS=this.__js(bO);
if(bT&&bN!==I){var bR=qx.util.ResourceManager.getInstance().getData(bO);
var bQ=qx.bom.element.Background.getStyles(bR[4],bN,bR[5],bR[6]);

for(var bP in bQ){bM[bP]=bQ[bP];
}
if(bS.width!=null&&bM.width==null&&(bN==A||bN===f)){bM.width=bS.width+k;
}
if(bS.height!=null&&bM.height==null&&(bN==w||bN===f)){bM.height=bS.height+k;
}return {style:bM};
}else{if(qx.core.Variant.isSet(d,a)){if(bN!==I){this.__jA(bO);
}}bM=this.__jr(bM,bS.width,bS.height);
bM=this.__jz(bM,bO,bN);
return {style:bM};
}},__jz:function(bU,bV,bW){var top=null;
var cb=null;

if(bU.backgroundPosition){var bX=bU.backgroundPosition.split(u);
cb=parseInt(bX[0],10);

if(isNaN(cb)){cb=bX[0];
}top=parseInt(bX[1],10);

if(isNaN(top)){top=bX[1];
}}var ca=qx.bom.element.Background.getStyles(bV,bW,cb,top);

for(var bY in ca){bU[bY]=ca[bY];
}if(bU.filter){bU.filter=g;
}return bU;
},__jA:function(cc){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(cc)&&cc.indexOf(F)==-1){if(!this.__jn[cc]){qx.log.Logger.debug("Potential clipped image candidate: "+cc);
this.__jn[cc]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(j,{"mshtml":function(){return qx.bom.element.Decoration.__jo;
},"default":function(){return false;
}})}});
})();
(function(){var c="qx.client",b="load",a="qx.io.ImageLoader";
qx.Bootstrap.define(a,{statics:{__jB:{},__jC:{width:null,height:null},__jD:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__jB[d];
return !!(e&&e.loaded);
},isFailed:function(f){var g=this.__jB[f];
return !!(g&&g.failed);
},isLoading:function(h){var j=this.__jB[h];
return !!(j&&j.loading);
},getFormat:function(k){var m=this.__jB[k];
return m?m.format:null;
},getSize:function(n){var o=this.__jB[n];
return o?
{width:o.width,height:o.height}:this.__jC;
},getWidth:function(p){var q=this.__jB[p];
return q?q.width:null;
},getHeight:function(r){var s=this.__jB[r];
return s?s.height:null;
},load:function(t,u,v){var w=this.__jB[t];

if(!w){w=this.__jB[t]={};
}if(u&&!v){v=window;
}if(w.loaded||w.loading||w.failed){if(u){if(w.loading){w.callbacks.push(u,v);
}else{u.call(v,t,w);
}}}else{w.loading=true;
w.callbacks=[];

if(u){w.callbacks.push(u,v);
}var y=new Image();
var x=qx.lang.Function.listener(this.__jE,this,y,t);
y.onload=x;
y.onerror=x;
y.src=t;
w.element=y;
}},abort:function(z){var A=this.__jB[z];

if(A&&!A.loaded){A.aborted=true;
var C=A.callbacks;
var B=A.element;
B.onload=B.onerror=null;
delete A.callbacks;
delete A.element;
delete A.loading;

for(var i=0,l=C.length;i<l;i+=2){C[i].call(C[i+1],z,A);
}}this.__jB[z]=null;
},__jE:qx.event.GlobalError.observeMethod(function(event,D,E){var F=this.__jB[E];
if(event.type===b){F.loaded=true;
F.width=this.__jF(D);
F.height=this.__jG(D);
var G=this.__jD.exec(E);

if(G!=null){F.format=G[1];
}}else{F.failed=true;
}D.onload=D.onerror=null;
var H=F.callbacks;
delete F.loading;
delete F.callbacks;
delete F.element;
for(var i=0,l=H.length;i<l;i+=2){H[i].call(H[i+1],E,F);
}}),__jF:qx.core.Variant.select(c,{"gecko":function(I){return I.naturalWidth;
},"default":function(J){return J.width;
}}),__jG:qx.core.Variant.select(c,{"gecko":function(K){return K.naturalHeight;
},"default":function(L){return L.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__jH:[i,null,h,b,null,j,e,null,j],__jI:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__jJ:function(n,top){var o=qx.bom.client.Engine;

if(o.GECKO&&o.VERSION<1.9&&n==top&&typeof n==m){top+=0.01;
}
if(n){var p=(typeof n==m)?n+k:n;
}else{p=l;
}
if(top){var q=(typeof top==m)?top+k:top;
}else{q=l;
}return p+d+q;
},compile:function(r,s,t,top){var u=this.__jJ(t,top);
var v=qx.util.ResourceManager.getInstance().toUri(r);
var w=this.__jH;
w[1]=v;
w[4]=u;
w[7]=s;
return w.join(g);
},getStyles:function(x,y,z,top){if(!x){return this.__jI;
}var A=this.__jJ(z,top);
var B=qx.util.ResourceManager.getInstance().toUri(x);
var C={backgroundPosition:A,backgroundImage:c+B+f};

if(y!=null){C.backgroundRepeat=y;
}return C;
},set:function(D,E,F,G,top){var H=this.getStyles(E,F,G,top);

for(var I in H){D.style[I]=H[I];
}}}});
})();
(function(){var j="source",i="scale",h="no-repeat",g="qx.client",f="mshtml",e="webkit",d="backgroundImage",c="div",b="qx.html.Image",a="qx/static/blank.gif";
qx.Class.define(b,{extend:qx.html.Element,members:{tagNameHint:null,_applyProperty:function(name,k){qx.html.Element.prototype._applyProperty.call(this,name,k);

if(name===j){var o=this.getDomElement();
var l=this.getAllStyles();

if(this.getNodeName()==c&&this.getStyle(d)){l.backgroundPosition=null;
l.backgroundRepeat=null;
}var m=this._getProperty(j);
var n=this._getProperty(i);
var p=n?i:h;
if(m!=null){qx.bom.element.Decoration.update(o,m,p,l);
}}},_createDomElement:function(){var r=this._getProperty(i);
var s=r?i:h;

if(qx.core.Variant.isSet(g,f)){var q=this._getProperty(j);

if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(s,q));
}}else{this.setNodeName(qx.bom.element.Decoration.getTagName(s));
}return qx.html.Element.prototype._createDomElement.call(this);
},_copyData:function(t){return qx.html.Element.prototype._copyData.call(this,true);
},setSource:function(u){this._setProperty(j,u);
return this;
},getSource:function(){return this._getProperty(j);
},resetSource:function(){if(qx.core.Variant.isSet(g,e)){this._setProperty(j,qx.util.ResourceManager.getInstance().toUri(a));
}else{this._removeProperty(j,true);
}return this;
},setScale:function(v){this._setProperty(i,v);
return this;
},getScale:function(){return this._getProperty(i);
}}});
})();
(function(){var j="nonScaled",i="scaled",h="alphaScaled",g=".png",f="qx.client",e="div",d="replacement",c="qx.event.type.Event",b="hidden",a="Boolean",B="px",A="http",z="scale",y="changeSource",x="qx.ui.basic.Image",w="qx.debug",v="loaded",u="-disabled.$1",t="loadingFailed",s="__jK",q="String",r="_applySource",o="img",p="image",m="mshtml",n="_applyScale",k="no-repeat",l="on";
qx.Class.define(x,{extend:qx.ui.core.Widget,construct:function(C){this.__jK={};
qx.ui.core.Widget.call(this);

if(C){this.setSource(C);
}},properties:{source:{check:q,init:null,nullable:true,event:y,apply:r,themeable:true},scale:{check:a,init:false,themeable:true,apply:n},appearance:{refine:true,init:p},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:c,loaded:c},members:{__jL:null,__jM:null,__jN:null,__jK:null,getContentElement:function(){return this.__jR();
},_createContentElement:function(){return this.__jR();
},_getContentHint:function(){return {width:this.__jL||0,height:this.__jM||0};
},_applyEnabled:function(D,E){qx.ui.core.Widget.prototype._applyEnabled.call(this,D,E);

if(this.getSource()){this._styleSource();
}},_applySource:function(F){this._styleSource();
},_applyScale:function(G){this._styleSource();
},__jO:function(H){this.__jN=H;
},__jP:function(){if(this.__jN==null){var J=this.getSource();
var I=false;

if(J!=null){I=qx.lang.String.endsWith(J,g);
}
if(this.getScale()&&I&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__jN=h;
}else if(this.getScale()){this.__jN=i;
}else{this.__jN=j;
}}return this.__jN;
},__jQ:function(K){var L;
var M;

if(K==h){L=true;
M=e;
}else if(K==j){L=false;
M=e;
}else{L=true;
M=o;
}var N=new qx.html.Image(M);
N.setScale(L);
N.setStyles({"overflowX":b,"overflowY":b});
return N;
},__jR:function(){var O=this.__jP();

if(this.__jK[O]==null){this.__jK[O]=this.__jQ(O);
}return this.__jK[O];
},_styleSource:function(){var P=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!P){this.getContentElement().resetSource();
return;
}this.__jS(P);

if(qx.core.Variant.isSet(f,m)){var Q=this.getScale()?z:k;
this.getContentElement().tagNameHint=qx.bom.element.Decoration.getTagName(Q,P);
}if(qx.util.ResourceManager.getInstance().has(P)){this.__jU(this.getContentElement(),P);
}else if(qx.io.ImageLoader.isLoaded(P)){this.__jV(this.getContentElement(),P);
}else{this.__jW(this.getContentElement(),P);
}},__jS:qx.core.Variant.select(f,{"mshtml":function(R){var T=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var S=qx.lang.String.endsWith(R,g);

if(T&&S){if(this.getScale()&&this.__jP()!=h){this.__jO(h);
}else if(!this.getScale()&&this.__jP()!=j){this.__jO(j);
}}else{if(this.getScale()&&this.__jP()!=i){this.__jO(i);
}else if(!this.getScale()&&this.__jP()!=j){this.__jO(j);
}}this.__jT(this.__jR());
},"default":function(U){if(this.getScale()&&this.__jP()!=i){this.__jO(i);
}else if(!this.getScale()&&this.__jP(j)){this.__jO(j);
}this.__jT(this.__jR());
}}),__jT:function(V){var Y=this.getContainerElement();
var ba=Y.getChild(0);

if(ba!=V){if(ba!=null){var bc=B;
var W={};
var X=this.getInnerSize();

if(X!=null){W.width=X.width+bc;
W.height=X.height+bc;
}var bb=this.getInsets();
W.left=bb.left+bc;
W.top=bb.top+bc;
W.zIndex=10;
V.setStyles(W,true);
V.setSelectable(this.getSelectable());
}Y.removeAt(0);
Y.addAt(V,0);
}},__jU:function(bd,be){var bg=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var bf=be.replace(/\.([a-z]+)$/,u);

if(bg.has(bf)){be=bf;
this.addState(d);
}else{this.removeState(d);
}}if(bd.getSource()===be){return;
}bd.setSource(be);
this.__ka(bg.getImageWidth(be),bg.getImageHeight(be));
},__jV:function(bh,bi){var bk=qx.io.ImageLoader;
bh.setSource(bi);
var bj=bk.getWidth(bi);
var bl=bk.getHeight(bi);
this.__ka(bj,bl);
},__jW:function(bm,bn){var bo=qx.io.ImageLoader;

if(qx.core.Variant.isSet(w,l)){if(!qx.lang.String.startsWith(bn.toLowerCase(),A)){var self=this.self(arguments);

if(!self.__jX){self.__jX={};
}
if(!self.__jX[bn]){this.debug("try to load an unmanaged relative image: "+bn);
self.__jX[bn]=true;
}}}if(!bo.isFailed(bn)){bo.load(bn,this.__jY,this);
}else{if(bm!=null){bm.resetSource();
}}},__jY:function(bp,bq){if(this.$$disposed===true){return;
}if(bp!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(bq.failed){this.warn("Image could not be loaded: "+bp);
this.fireEvent(t);
}else{this.fireEvent(v);
}this._styleSource();
},__ka:function(br,bs){if(br!==this.__jL||bs!==this.__jM){this.__jL=br;
this.__jM=bs;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(s);
}});
})();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){qx.ui.basic.Image.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var h=this.getApplicationRoot();
h.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(i,j){if(j){this.removeState(j);
}
if(i){this.addState(i);
}}}});
})();
(function(){var h="mousedown",g="qx.debug",f="on",d="blur",c="qx.ui.popup.Manager",b="__kb",a="singleton";
qx.Class.define(c,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__kb=[];
qx.event.Registration.addListener(document.documentElement,h,this.__kd,this,true);
qx.bom.Element.addListener(window,d,this.hideAll,this);
},members:{__kb:null,add:function(j){if(qx.core.Variant.isSet(g,f)){if(!(j instanceof qx.ui.popup.Popup)){throw new Error("Object is no popup: "+j);
}}this.__kb.push(j);
this.__kc();
},remove:function(k){if(qx.core.Variant.isSet(g,f)){if(!(k instanceof qx.ui.popup.Popup)){throw new Error("Object is no popup: "+k);
}}
if(this.__kb){qx.lang.Array.remove(this.__kb,k);
this.__kc();
}},hideAll:function(){if(this.__kb){for(var i=0;i<this.__kb.length;i++){this.__kb[i].exclude();
}}},__kc:function(){var l=1e7;

for(var i=0;i<this.__kb.length;i++){this.__kb[i].setZIndex(l++);
}},__kd:function(e){var n=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var o=this.__kb;

for(var i=0;i<o.length;i++){var m=o[i];

if(!m.getAutoHide()||n==m||qx.ui.core.Widget.contains(m,n)){continue;
}m.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,h,this.__kd,this,true);
this._disposeArray(b);
}});
})();
(function(){var d="' is not supported by the Grow layout!",c="qx.ui.layout.Grow",b="qx.debug",a="The property '";
qx.Class.define(c,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(b,{"on":function(e,name,f){this.assert(false,a+name+d);
},"off":null}),renderLayout:function(g,h){var n=this._getLayoutChildren();
var m,o,k,j;
for(var i=0,l=n.length;i<l;i++){m=n[i];
o=m.getSizeHint();
k=g;

if(k<o.minWidth){k=o.minWidth;
}else if(k>o.maxWidth){k=o.maxWidth;
}j=h;

if(j<o.minHeight){j=o.minHeight;
}else if(j>o.maxHeight){j=o.maxHeight;
}m.renderLayout(0,0,k,j);
}},_computeSizeHint:function(){var v=this._getLayoutChildren();
var t,x;
var w=0,u=0;
var s=0,q=0;
var p=Infinity,r=Infinity;
for(var i=0,l=v.length;i<l;i++){t=v[i];
x=t.getSizeHint();
w=Math.max(w,x.width);
u=Math.max(u,x.height);
s=Math.max(s,x.minWidth);
q=Math.max(q,x.minHeight);
p=Math.min(p,x.maxWidth);
r=Math.min(r,x.maxHeight);
}return {width:w,height:u,minWidth:s,minHeight:q,maxWidth:p,maxHeight:r};
}}});
})();
(function(){var j="label",i="icon",h="Boolean",g="both",f="String",e="left",d="changeGap",c="changeShow",b="bottom",a="_applyCenter",A="changeIcon",z="qx.ui.basic.Atom",y="changeLabel",x="Integer",w="_applyIconPosition",v="qx.debug",u="bottom-left",t="top-left",s="top",r="right",p="_applyRich",q="_applyIcon",n="_applyShow",o="on",l="_applyLabel",m="_applyGap",k="atom";
qx.Class.define(z,{extend:qx.ui.core.Widget,construct:function(B,C){if(qx.core.Variant.isSet(v,o)){this.assertArgumentsCount(arguments,0,2);
}qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(B!=null){this.setLabel(B);
}
if(C!=null){this.setIcon(C);
}},properties:{appearance:{refine:true,init:k},label:{apply:l,nullable:true,check:f,event:y},rich:{check:h,init:false,apply:p},icon:{check:f,apply:q,nullable:true,themeable:true,event:A},gap:{check:x,nullable:false,event:d,apply:m,themeable:true,init:4},show:{init:g,check:[g,j,i],themeable:true,inheritable:true,apply:n,event:c},iconPosition:{init:e,check:[s,r,b,e,t,u],themeable:true,apply:w},center:{init:false,check:h,themeable:true,apply:a}},members:{_createChildControlImpl:function(D,E){var F;

switch(D){case j:F=new qx.ui.basic.Label(this.getLabel());
F.setAnonymous(true);
F.setRich(this.getRich());
this._add(F);

if(this.getLabel()==null||this.getShow()===i){F.exclude();
}break;
case i:F=new qx.ui.basic.Image(this.getIcon());
F.setAnonymous(true);
this._addAt(F,0);

if(this.getIcon()==null||this.getShow()===j){F.exclude();
}break;
}return F||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,D);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===i){this._excludeChildControl(j);
}else{this._showChildControl(j);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===j){this._excludeChildControl(i);
}else{this._showChildControl(i);
}},_applyLabel:function(G,H){var I=this.getChildControl(j,true);

if(I){I.setValue(G);
}this._handleLabel();
},_applyRich:function(J,K){var L=this.getChildControl(j,true);

if(L){L.setRich(J);
}},_applyIcon:function(M,N){var O=this.getChildControl(i,true);

if(O){O.setSource(M);
}this._handleIcon();
},_applyGap:function(P,Q){this._getLayout().setGap(P);
},_applyShow:function(R,S){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(T,U){this._getLayout().setIconPosition(T);
},_applyCenter:function(V,W){this._getLayout().setCenter(V);
}}});
})();
(function(){var p="bottom",o="top",n="_applyLayoutChange",m="top-left",l="bottom-left",k="left",j="right",h="middle",g="' is not supported by the Atom layout!",f="qx.debug",c="center",e="qx.ui.layout.Atom",d="Integer",b="The property '",a="Boolean";
qx.Class.define(e,{extend:qx.ui.layout.Abstract,properties:{gap:{check:d,init:4,apply:n},iconPosition:{check:[k,o,j,p,m,l],init:k,apply:n},center:{check:a,init:false,apply:n}},members:{verifyLayoutProperty:qx.core.Variant.select(f,{"on":function(q,name,r){this.assert(false,b+name+g);
},"off":null}),renderLayout:function(s,t){var C=qx.ui.layout.Util;
var v=this.getIconPosition();
var y=this._getLayoutChildren();
var length=y.length;
var N,top,D,w;
var I,B;
var G=this.getGap();
var L=this.getCenter();
if(v===p||v===j){var E=length-1;
var z=-1;
var x=-1;
}else{var E=0;
var z=length;
var x=1;
}if(v==o||v==p){if(L){var H=0;

for(var i=E;i!=z;i+=x){w=y[i].getSizeHint().height;

if(w>0){H+=w;

if(i!=E){H+=G;
}}}top=Math.round((t-H)/2);
}else{top=0;
}
for(var i=E;i!=z;i+=x){I=y[i];
B=I.getSizeHint();
D=Math.min(B.maxWidth,Math.max(s,B.minWidth));
w=B.height;
N=C.computeHorizontalAlignOffset(c,D,s);
I.renderLayout(N,top,D,w);
if(w>0){top+=w+G;
}}}else{var A=s;
var u=null;
var K=0;

for(var i=E;i!=z;i+=x){I=y[i];
D=I.getSizeHint().width;

if(D>0){if(!u&&I instanceof qx.ui.basic.Label){u=I;
}else{A-=D;
}K++;
}}
if(K>1){var J=(K-1)*G;
A-=J;
}
if(u){var B=u.getSizeHint();
var F=Math.max(B.minWidth,Math.min(A,B.maxWidth));
A-=F;
}
if(L&&A>0){N=Math.round(A/2);
}else{N=0;
}
for(var i=E;i!=z;i+=x){I=y[i];
B=I.getSizeHint();
w=Math.min(B.maxHeight,Math.max(t,B.minHeight));

if(I===u){D=F;
}else{D=B.width;
}var M=h;

if(v==m){M=o;
}else if(v==l){M=p;
}top=C.computeVerticalAlignOffset(M,B.height,t);
I.renderLayout(N,top,D,w);
if(D>0){N+=D+G;
}}}},_computeSizeHint:function(){var Y=this._getLayoutChildren();
var length=Y.length;
var Q,W;
if(length===1){var Q=Y[0].getSizeHint();
W={width:Q.width,height:Q.height,minWidth:Q.minWidth,minHeight:Q.minHeight};
}else{var U=0,V=0;
var R=0,T=0;
var S=this.getIconPosition();
var X=this.getGap();

if(S===o||S===p){var O=0;

for(var i=0;i<length;i++){Q=Y[i].getSizeHint();
V=Math.max(V,Q.width);
U=Math.max(U,Q.minWidth);
if(Q.height>0){T+=Q.height;
R+=Q.minHeight;
O++;
}}
if(O>1){var P=(O-1)*X;
T+=P;
R+=P;
}}else{var O=0;

for(var i=0;i<length;i++){Q=Y[i].getSizeHint();
T=Math.max(T,Q.height);
R=Math.max(R,Q.minHeight);
if(Q.width>0){V+=Q.width;
U+=Q.minWidth;
O++;
}}
if(O>1){var P=(O-1)*X;
V+=P;
U+=P;
}}W={minWidth:U,width:V,minHeight:R,height:T};
}return W;
}}});
})();
(function(){var g="middle",f="qx.ui.layout.Util",e="left",d="center",c="top",b="bottom",a="right";
qx.Class.define(f,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(h,j,k){var n,r,m,s;
var o=j>k;
var t=Math.abs(j-k);
var u,p;
var q={};

for(r in h){n=h[r];
q[r]={potential:o?n.max-n.value:n.value-n.min,flex:o?n.flex:1/n.flex,offset:0};
}while(t!=0){s=Infinity;
m=0;

for(r in q){n=q[r];

if(n.potential>0){m+=n.flex;
s=Math.min(s,n.potential/n.flex);
}}if(m==0){break;
}s=Math.min(t,s*m)/m;
u=0;

for(r in q){n=q[r];

if(n.potential>0){p=Math.min(t,n.potential,Math.ceil(s*n.flex));
u+=p-s*n.flex;

if(u>=1){u-=1;
p-=1;
}n.potential-=p;

if(o){n.offset+=p;
}else{n.offset-=p;
}t-=p;
}}}return q;
},computeHorizontalAlignOffset:function(v,w,x,y,z){if(y==null){y=0;
}
if(z==null){z=0;
}var A=0;

switch(v){case e:A=y;
break;
case a:A=x-w-z;
break;
case d:A=Math.round((x-w)/2);
if(A<y){A=y;
}else if(A<z){A=Math.max(y,x-w-z);
}break;
}return A;
},computeVerticalAlignOffset:function(B,C,D,E,F){if(E==null){E=0;
}
if(F==null){F=0;
}var G=0;

switch(B){case c:G=E;
break;
case b:G=D-C-F;
break;
case g:G=Math.round((D-C)/2);
if(G<E){G=E;
}else if(G<F){G=Math.max(E,D-C-F);
}break;
}return G;
},collapseMargins:function(H){var I=0,K=0;

for(var i=0,l=arguments.length;i<l;i++){var J=arguments[i];

if(J<0){K=Math.min(K,J);
}else if(J>0){I=Math.max(I,J);
}}return I+K;
},computeHorizontalGaps:function(L,M,N){if(M==null){M=0;
}var O=0;

if(N){O+=L[0].getMarginLeft();

for(var i=1,l=L.length;i<l;i+=1){O+=this.collapseMargins(M,L[i-1].getMarginRight(),L[i].getMarginLeft());
}O+=L[l-1].getMarginRight();
}else{for(var i=1,l=L.length;i<l;i+=1){O+=L[i].getMarginLeft()+L[i].getMarginRight();
}O+=(M*(l-1));
}return O;
},computeVerticalGaps:function(P,Q,R){if(Q==null){Q=0;
}var S=0;

if(R){S+=P[0].getMarginTop();

for(var i=1,l=P.length;i<l;i+=1){S+=this.collapseMargins(Q,P[i-1].getMarginBottom(),P[i].getMarginTop());
}S+=P[l-1].getMarginBottom();
}else{for(var i=1,l=P.length;i<l;i+=1){S+=P[i].getMarginTop()+P[i].getMarginBottom();
}S+=(Q*(l-1));
}return S;
},computeHorizontalSeparatorGaps:function(T,U,V){var Y=qx.theme.manager.Decoration.getInstance().resolve(V);
var X=Y.getInsets();
var W=X.left+X.right;
var ba=0;

for(var i=0,l=T.length;i<l;i++){var bb=T[i];
ba+=bb.getMarginLeft()+bb.getMarginRight();
}ba+=(U+W+U)*(l-1);
return ba;
},computeVerticalSeparatorGaps:function(bc,bd,be){var bh=qx.theme.manager.Decoration.getInstance().resolve(be);
var bg=bh.getInsets();
var bf=bg.top+bg.bottom;
var bi=0;

for(var i=0,l=bc.length;i<l;i++){var bj=bc[i];
bi+=bj.getMarginTop()+bj.getMarginBottom();
}bi+=(bd+bf+bd)*(l-1);
return bi;
},arrangeIdeals:function(bk,bl,bm,bn,bo,bp){if(bl<bk||bo<bn){if(bl<bk&&bo<bn){bl=bk;
bo=bn;
}else if(bl<bk){bo-=(bk-bl);
bl=bk;
if(bo<bn){bo=bn;
}}else if(bo<bn){bl-=(bn-bo);
bo=bn;
if(bl<bk){bl=bk;
}}}
if(bl>bm||bo>bp){if(bl>bm&&bo>bp){bl=bm;
bo=bp;
}else if(bl>bm){bo+=(bl-bm);
bl=bm;
if(bo>bp){bo=bp;
}}else if(bo>bp){bl+=(bo-bp);
bo=bp;
if(bl>bm){bl=bm;
}}}return {begin:bl,end:bo};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var k="on",j="qx.dynlocale",i="Boolean",h="color",g="changeLocale",f="qx.debug",d="enabled",c="_applyTextAlign",b="qx.ui.core.Widget",a="nowrap",D="changeTextAlign",C="_applyWrap",B="changeValue",A="changeContent",z="qx.ui.basic.Label",y="A",x="whiteSpace",w="_applyValue",v="center",u="_applyBuddy",r="String",s="textAlign",p="right",q="changeRich",n="normal",o="_applyRich",l="click",m="label",t="left";
qx.Class.define(z,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(E){qx.ui.core.Widget.call(this);

if(E!=null){this.setValue(E);
}
if(qx.core.Variant.isSet(j,k)){qx.locale.Manager.getInstance().addListener(g,this._onChangeLocale,this);
}},properties:{rich:{check:i,init:false,event:q,apply:o},wrap:{check:i,init:true,apply:C},value:{check:r,apply:w,event:B,nullable:true},buddy:{check:b,apply:u,nullable:true,init:null,dereference:true},textAlign:{check:[t,v,p],nullable:true,themeable:true,apply:c,event:D},appearance:{refine:true,init:m},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__ke:null,__kf:null,__kg:null,__kh:null,_getContentHint:function(){if(this.__kf){this.__ki=this.__kj();
delete this.__kf;
}return {width:this.__ki.width,height:this.__ki.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(F){if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){if(F&&!this.isRich()){if(qx.core.Variant.isSet(f,k)){this.warn("Only rich labels are selectable in browsers with Gecko engine!");
}return;
}}qx.ui.core.Widget.prototype._applySelectable.call(this,F);
},_getContentHeightForWidth:function(G){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__kj(G).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(H,I){this.getContentElement().setStyle(s,H);
},_applyTextColor:function(J,K){if(J){this.getContentElement().setStyle(h,qx.theme.manager.Color.getInstance().resolve(J));
}else{this.getContentElement().removeStyle(h);
}},__ki:{width:0,height:0},_applyFont:function(L,M){var N;

if(L){this.__ke=qx.theme.manager.Font.getInstance().resolve(L);
N=this.__ke.getStyles();
}else{this.__ke=null;
N=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(N);
this.__kf=true;
qx.ui.core.queue.Layout.add(this);
},__kj:function(O){var S=qx.bom.Label;
var Q=this.getFont();
var P=Q?this.__ke.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||y;
var R=this.getRich();
return R?S.getHtmlSize(content,P,O):S.getTextSize(content,P);
},_applyBuddy:function(T,U){if(U!=null){U.removeBinding(this.__kg);
this.__kg=null;
this.removeListenerById(this.__kh);
this.__kh=null;
}
if(T!=null){this.__kg=T.bind(d,this,d);
this.__kh=this.addListener(l,function(){if(T.isFocusable()){T.focus.apply(T);
}},this);
}},_applyRich:function(V){this.getContentElement().setRich(V);
this.__kf=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(W,X){if(W&&!this.isRich()){if(qx.core.Variant.isSet(f,k)){this.warn("Only rich labels support wrap.");
}}
if(this.isRich()){var Y=W?n:a;
this.getContentElement().setStyle(x,Y);
}},_onChangeLocale:qx.core.Variant.select(j,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(ba,bb){this.getContentElement().setValue(ba);
this.__kf=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(A,ba,bb);
}},destruct:function(){if(qx.core.Variant.isSet(j,k)){qx.locale.Manager.getInstance().removeListener(g,this._onChangeLocale,this);
}if(this.__kg!=null){var bc=this.getBuddy();

if(bc!=null&&!bc.isDisposed()){bc.removeBinding(this.__kg);
}}this.__ke=this.__kg=null;
}});
})();
(function(){var b="value",a="qx.html.Label";
qx.Class.define(a,{extend:qx.html.Element,members:{__kk:null,_applyProperty:function(name,c){qx.html.Element.prototype._applyProperty.call(this,name,c);

if(name==b){var d=this.getDomElement();
qx.bom.Label.setValue(d,c);
}},_createDomElement:function(){var f=this.__kk;
var e=qx.bom.Label.create(this._content,f);
return e;
},_copyData:function(g){return qx.html.Element.prototype._copyData.call(this,true);
},setRich:function(h){var i=this.getDomElement();

if(i){throw new Error("The label mode cannot be modified after initial creation");
}h=!!h;

if(this.__kk==h){return;
}this.__kk=h;
return this;
},setValue:function(j){this._setProperty(b,j);
return this;
},getValue:function(){return this._getProperty(b);
}}});
})();
(function(){var j="div",i="inherit",h="text",g="qx.client",f="value",e="",d="hidden",c="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",b="nowrap",a="auto",z="0",y="ellipsis",x="normal",w="label",v="px",u="crop",t="gecko",s="end",r="100%",q="visible",o="qx.bom.Label",p="opera",m="mshtml",n="block",k="-1000px",l="absolute";
qx.Class.define(o,{statics:{__kl:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__km:function(){var A=this.__ko(false);
document.body.insertBefore(A,document.body.firstChild);
return this._textElement=A;
},__kn:function(){var B=this.__ko(true);
document.body.insertBefore(B,document.body.firstChild);
return this._htmlElement=B;
},__ko:function(C){var D=qx.bom.Element.create(j);
var E=D.style;
E.width=E.height=a;
E.left=E.top=k;
E.visibility=d;
E.position=l;
E.overflow=q;

if(C){E.whiteSpace=x;
}else{E.whiteSpace=b;

if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){var F=document.createElementNS(c,w);
var E=F.style;
E.padding=z;

for(var G in this.__kl){E[G]=i;
}D.appendChild(F);
}}return D;
},__kp:function(H){var I={};

if(H){I.whiteSpace=x;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){I.display=n;
}else{I.overflow=d;
I.whiteSpace=b;
I.textOverflow=y;
if(qx.core.Variant.isSet(g,p)){I.OTextOverflow=y;
}}return I;
},create:function(content,J,K){if(!K){K=window;
}
if(J){var L=K.document.createElement(j);
L.useHtml=true;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){var L=K.document.createElement(j);
var N=K.document.createElementNS(c,w);
var M=N.style;
M.cursor=i;
M.color=i;
M.overflow=d;
M.maxWidth=r;
M.padding=z;
for(var O in this.__kl){N.style[O]=i;
}N.setAttribute(u,s);
L.appendChild(N);
}else{var L=K.document.createElement(j);
qx.bom.element.Style.setStyles(L,this.__kp(J));
}
if(content){this.setValue(L,content);
}return L;
},setValue:function(P,Q){Q=Q||e;

if(P.useHtml){P.innerHTML=Q;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){P.firstChild.setAttribute(f,Q);
}else{qx.bom.element.Attribute.set(P,h,Q);
}},getValue:function(R){if(R.useHtml){return R.innerHTML;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){return R.firstChild.getAttribute(f)||e;
}else{return qx.bom.element.Attribute.get(R,h);
}},getHtmlSize:function(content,S,T){var U=this._htmlElement||this.__kn();
U.style.width=T!==undefined?T+v:a;
U.innerHTML=content;
return this.__kq(U,S);
},getTextSize:function(V,W){var X=this._textElement||this.__km();

if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){X.firstChild.setAttribute(f,V);
}else{qx.bom.element.Attribute.set(X,h,V);
}return this.__kq(X,W);
},__kq:function(Y,ba){var bb=this.__kl;

if(!ba){ba={};
}
for(var bc in bb){Y.style[bc]=ba[bc]||e;
}var bd=qx.bom.element.Dimension.getSize(Y);

if(qx.core.Variant.isSet(g,t)){if(!qx.bom.client.Platform.WIN){bd.width++;
}}if(qx.core.Variant.isSet(g,m)&&qx.bom.client.Engine.VERSION>=9){bd.width++;
}return bd;
}}});
})();
(function(){var i="0px",h="qx.client",g="mshtml",f="qx.bom.element.Dimension",e="paddingRight",d="paddingLeft",c="opera",b="paddingTop",a="paddingBottom";
qx.Class.define(f,{statics:{getWidth:qx.core.Variant.select(h,{"gecko":function(j){if(j.getBoundingClientRect){var k=j.getBoundingClientRect();
return Math.round(k.right)-Math.round(k.left);
}else{return j.offsetWidth;
}},"default":function(l){return l.offsetWidth;
}}),getHeight:qx.core.Variant.select(h,{"gecko":function(m){if(m.getBoundingClientRect){var n=m.getBoundingClientRect();
return Math.round(n.bottom)-Math.round(n.top);
}else{return m.offsetHeight;
}},"default":function(o){return o.offsetHeight;
}}),getSize:function(p){return {width:this.getWidth(p),height:this.getHeight(p)};
},__kr:{visible:true,hidden:true},getContentWidth:function(q){var s=qx.bom.element.Style;
var t=qx.bom.element.Overflow.getX(q);
var u=parseInt(s.get(q,d)||i,10);
var x=parseInt(s.get(q,e)||i,10);

if(this.__kr[t]){var w=q.clientWidth;

if(qx.core.Variant.isSet(h,c)){w=w-u-x;
}else{if(qx.dom.Node.isBlockNode(q)){w=w-u-x;
}}return w;
}else{if(q.clientWidth>=q.scrollWidth){return Math.max(q.clientWidth,q.scrollWidth)-u-x;
}else{var v=q.scrollWidth-u;
var r=qx.bom.client.Engine;

if(r.NAME===g&&r.VERSION==6){v-=x;
}return v;
}}},getContentHeight:function(y){var A=qx.bom.element.Style;
var C=qx.bom.element.Overflow.getY(y);
var D=parseInt(A.get(y,b)||i,10);
var B=parseInt(A.get(y,a)||i,10);

if(this.__kr[C]){return y.clientHeight-D-B;
}else{if(y.clientHeight>=y.scrollHeight){return Math.max(y.clientHeight,y.scrollHeight)-D-B;
}else{var E=y.scrollHeight-D;
var z=qx.bom.client.Engine;

if(z.NAME===g&&z.VERSION==6){E-=B;
}return E;
}}},getContentSize:function(F){return {width:this.getContentWidth(F),height:this.getContentHeight(F)};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IForm";
qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(c){return arguments.length==1;
},getEnabled:function(){},setRequired:function(d){return arguments.length==1;
},getRequired:function(){},setValid:function(e){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(f){return arguments.length==1;
},getInvalidMessage:function(){},setRequiredInvalidMessage:function(g){return arguments.length==1;
},getRequiredInvalidMessage:function(){}}});
})();
(function(){var i="qx.ui.window.Window",h="changeModal",g="changeVisibility",f="changeActive",d="_applyActiveWindow",c="__ks",b="__kt",a="qx.ui.window.MDesktop";
qx.Mixin.define(a,{properties:{activeWindow:{check:i,apply:d,init:null,nullable:true}},members:{__ks:null,__kt:null,getWindowManager:function(){if(!this.__kt){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__kt;
},supportsMaximize:function(){return true;
},setWindowManager:function(j){if(this.__kt){this.__kt.setDesktop(null);
}j.setDesktop(this);
this.__kt=j;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(k,l){this.getWindowManager().changeActiveWindow(k,l);
this.getWindowManager().updateStack();
},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(m){if(qx.Class.isDefined(i)&&m instanceof qx.ui.window.Window){this._addWindow(m);
}},_addWindow:function(n){if(!qx.lang.Array.contains(this.getWindows(),n)){this.getWindows().push(n);
n.addListener(f,this._onChangeActive,this);
n.addListener(h,this._onChangeModal,this);
n.addListener(g,this._onChangeVisibility,this);
}
if(n.getActive()){this.setActiveWindow(n);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(o){if(qx.Class.isDefined(i)&&o instanceof qx.ui.window.Window){this._removeWindow(o);
}},_removeWindow:function(p){qx.lang.Array.remove(this.getWindows(),p);
p.removeListener(f,this._onChangeActive,this);
p.removeListener(h,this._onChangeModal,this);
p.removeListener(g,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__ks){this.__ks=[];
}return this.__ks;
}},destruct:function(){this._disposeArray(c);
this._disposeObjects(b);
}});
})();
(function(){var f="_applyBlockerColor",e="Number",d="__ku",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="Color";
qx.Mixin.define(c,{construct:function(){this.__ku=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:a,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:e,init:1,apply:b,themeable:true}},members:{__ku:null,_applyBlockerColor:function(g,h){this.__ku.setColor(g);
},_applyBlockerOpacity:function(i,j){this.__ku.setOpacity(i);
},block:function(){this.__ku.block();
},isBlocked:function(){return this.__ku.isBlocked();
},unblock:function(){this.__ku.unblock();
},forceUnblock:function(){this.__ku.forceUnblock();
},blockContent:function(k){this.__ku.blockContent(k);
},isContentBlocked:function(){return this.__ku.isContentBlocked();
},unblockContent:function(){this.__ku.unblockContent();
},forceUnblockContent:function(){this.__ku.forceUnblockContent();
},getBlocker:function(){return this.__ku;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var p="contextmenu",o="help",n="qx.client",m="changeGlobalCursor",l="abstract",k="Boolean",j="root",i="",h=" !important",g="_applyGlobalCursor",c="_applyNativeHelp",f=";",d="qx.ui.root.Abstract",b="String",a="*";
qx.Class.define(d,{type:l,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:j},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:b,nullable:true,themeable:true,apply:g,event:m},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:k,init:false,apply:c}},members:{__kv:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(n,{"mshtml":function(q,r){},"default":function(s,t){var u=qx.bom.Stylesheet;
var v=this.__kv;

if(!v){this.__kv=v=u.createElement();
}u.removeAllRules(v);

if(s){u.addRule(v,a,qx.bom.element.Cursor.compile(s).replace(f,i)+h);
}}}),_applyNativeContextMenu:function(w,x){if(w){this.removeListener(p,this._onNativeContextMenu,this,true);
}else{this.addListener(p,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(n,{"mshtml":function(y,z){if(z===false){qx.bom.Event.removeNativeListener(document,o,qx.lang.Function.returnFalse);
}
if(y===false){qx.bom.Event.addNativeListener(document,o,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__kv=null;
},defer:function(A,B){qx.ui.core.MChildrenHandling.remap(B);
}});
})();
(function(){var n="resize",m="position",l="0px",k="webkit",j="paddingLeft",i="$$widget",h="qx.ui.root.Application",g="hidden",f="qx.client",d="div",a="paddingTop",c="100%",b="absolute";
qx.Class.define(h,{extend:qx.ui.root.Abstract,construct:function(o){this.__kw=qx.dom.Node.getWindow(o);
this.__kx=o;
qx.ui.root.Abstract.call(this);
qx.event.Registration.addListener(this.__kw,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__kw:null,__kx:null,_createContainerElement:function(){var p=this.__kx;
if(qx.core.Variant.isSet(f,k)){if(!p.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var t=p.documentElement.style;
var q=p.body.style;
t.overflow=q.overflow=g;
t.padding=t.margin=q.padding=q.margin=l;
t.width=t.height=q.width=q.height=c;
var s=p.createElement(d);
p.body.appendChild(s);
var r=new qx.html.Root(s);
r.setStyle(m,b);
r.setAttribute(i,this.toHashCode());
return r;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var u=qx.bom.Viewport.getWidth(this.__kw);
var v=qx.bom.Viewport.getHeight(this.__kw);
return {minWidth:u,width:u,maxWidth:u,minHeight:v,height:v,maxHeight:v};
},_applyPadding:function(w,x,name){if(w&&(name==a||name==j)){throw new Error("The root widget does not support 'left', or 'top' paddings!");
}qx.ui.root.Abstract.prototype._applyPadding.call(this,w,x,name);
},_applyDecorator:function(y,z){qx.ui.root.Abstract.prototype._applyDecorator.call(this,y,z);

if(!y){return;
}var A=this.getDecoratorElement().getInsets();

if(A.left||A.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");
}}},destruct:function(){this.__kw=this.__kx=null;
}});
})();
(function(){var l="zIndex",k="px",j="keydown",h="deactivate",g="resize",f="keyup",d="keypress",c="backgroundColor",b="_applyOpacity",a="Boolean",x="opacity",w="interval",v="Tab",u="Color",t="qx.ui.root.Page",s="__kD",r="__kF",q="__kB",p="Number",o="qx.ui.core.Blocker",m="qx.ui.root.Application",n="_applyColor";
qx.Class.define(o,{extend:qx.core.Object,construct:function(y){qx.core.Object.call(this);
this._widget=y;
this._isPageRoot=(qx.Class.isDefined(t)&&y instanceof qx.ui.root.Page);

if(this._isPageRoot){y.addListener(g,this.__kG,this);
}
if(qx.Class.isDefined(m)&&y instanceof qx.ui.root.Application){this.setKeepBlockerActive(true);
}this.__ky=[];
this.__kz=[];
this.__kA=[];
},properties:{color:{check:u,init:null,nullable:true,apply:n,themeable:true},opacity:{check:p,init:1,apply:b,themeable:true},keepBlockerActive:{check:a,init:false}},members:{__kB:null,__kC:0,__kD:null,__kA:null,__ky:null,__kz:null,__kE:null,__kF:null,_isPageRoot:false,_widget:null,__kG:function(e){var z=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:z.width,height:z.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:z.width,height:z.height});
}},_applyColor:function(A,B){var C=qx.theme.manager.Color.getInstance().resolve(A);
this.__kH(c,C);
},_applyOpacity:function(D,E){this.__kH(x,D);
},__kH:function(F,G){var H=[];
this.__kB&&H.push(this.__kB);
this.__kD&&H.push(this.__kD);

for(var i=0;i<H.length;i++){H[i].setStyle(F,G);
}},_backupActiveWidget:function(){var I=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__ky.push(I.getActive());
this.__kz.push(I.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var L=this.__ky.length;

if(L>0){var K=this.__ky[L-1];

if(K){qx.bom.Element.activate(K);
}this.__ky.pop();
}var J=this.__kz.length;

if(J>0){var K=this.__kz[J-1];

if(K){qx.bom.Element.focus(this.__kz[J-1]);
}this.__kz.pop();
}},__kI:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},getBlockerElement:function(){if(!this.__kB){this.__kB=this.__kI();
this.__kB.setStyle(l,15);
this._widget.getContainerElement().add(this.__kB);
this.__kB.exclude();
}return this.__kB;
},block:function(){this.__kC++;

if(this.__kC<2){this._backupActiveWidget();
var M=this.getBlockerElement();
M.include();
M.activate();
M.addListener(h,this.__kN,this);
M.addListener(d,this.__kM,this);
M.addListener(j,this.__kM,this);
M.addListener(f,this.__kM,this);
}},isBlocked:function(){return this.__kC>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__kC--;

if(this.__kC<1){this.__kJ();
this.__kC=0;
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__kC=0;
this.__kJ();
},__kJ:function(){this._restoreActiveWidget();
var N=this.getBlockerElement();
N.removeListener(h,this.__kN,this);
N.removeListener(d,this.__kM,this);
N.removeListener(j,this.__kM,this);
N.removeListener(f,this.__kM,this);
N.exclude();
},getContentBlockerElement:function(){if(!this.__kD){this.__kD=this.__kI();
this._widget.getContentElement().add(this.__kD);
this.__kD.exclude();
}return this.__kD;
},blockContent:function(O){var P=this.getContentBlockerElement();
P.setStyle(l,O);
this.__kA.push(O);

if(this.__kA.length<2){P.include();

if(this._isPageRoot){if(!this.__kF){this.__kF=new qx.event.Timer(300);
this.__kF.addListener(w,this.__kL,this);
}this.__kF.start();
this.__kL();
}}},isContentBlocked:function(){return this.__kA.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__kA.pop();
var Q=this.__kA[this.__kA.length-1];
var R=this.getContentBlockerElement();
R.setStyle(l,Q);

if(this.__kA.length<1){this.__kK();
this.__kA=[];
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__kA=[];
var S=this.getContentBlockerElement();
S.setStyle(l,null);
this.__kK();
},__kK:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__kF.stop();
}},__kL:function(){var T=this._widget.getContainerElement().getDomElement();
var U=qx.dom.Node.getDocument(T);
this.getContentBlockerElement().setStyles({height:U.documentElement.scrollHeight+k,width:U.documentElement.scrollWidth+k});
},__kM:function(e){if(e.getKeyIdentifier()==v){e.stop();
}},__kN:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();
}}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(g,this.__kG,this);
}this._disposeObjects(s,q,r);
this.__kE=this.__ky=this.__kz=this._widget=this.__kA=null;
}});
})();
(function(){var k="cursor",j="100%",i="repeat",h="mousedown",g="url(",f=")",d="mouseout",c="qx.client",b="div",a="dblclick",w="mousewheel",v="qx.html.Blocker",u="mousemove",t="mouseover",s="appear",r="click",q="mshtml",p="mouseup",o="contextmenu",n="disappear",l="qx/static/blank.gif",m="absolute";
qx.Class.define(v,{extend:qx.html.Element,construct:function(x,y){var x=x?qx.theme.manager.Color.getInstance().resolve(x):null;
var z={position:m,width:j,height:j,opacity:y||0,backgroundColor:x};
if(qx.core.Variant.isSet(c,q)){z.backgroundImage=g+qx.util.ResourceManager.getInstance().toUri(l)+f;
z.backgroundRepeat=i;
}qx.html.Element.call(this,b,z);
this.addListener(h,this._stopPropagation,this);
this.addListener(p,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(a,this._stopPropagation,this);
this.addListener(u,this._stopPropagation,this);
this.addListener(t,this._stopPropagation,this);
this.addListener(d,this._stopPropagation,this);
this.addListener(w,this._stopPropagation,this);
this.addListener(o,this._stopPropagation,this);
this.addListener(s,this.__kO,this);
this.addListener(n,this.__kO,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__kO:function(){var A=this.getStyle(k);
this.setStyle(k,null,true);
this.setStyle(k,A,true);
}}});
})();
(function(){var k="keypress",j="focusout",h="activate",g="Tab",f="singleton",d="deactivate",c="__kP",b="focusin",a="qx.ui.core.FocusHandler";
qx.Class.define(a,{extend:qx.core.Object,type:f,construct:function(){qx.core.Object.call(this);
this.__kP={};
},members:{__kP:null,__kQ:null,__kR:null,__kS:null,connectTo:function(m){m.addListener(k,this.__kT,this);
m.addListener(b,this._onFocusIn,this,true);
m.addListener(j,this._onFocusOut,this,true);
m.addListener(h,this._onActivate,this,true);
m.addListener(d,this._onDeactivate,this,true);
},addRoot:function(n){this.__kP[n.$$hash]=n;
},removeRoot:function(o){delete this.__kP[o.$$hash];
},getActiveWidget:function(){return this.__kQ;
},isActive:function(p){return this.__kQ==p;
},getFocusedWidget:function(){return this.__kR;
},isFocused:function(q){return this.__kR==q;
},isFocusRoot:function(r){return !!this.__kP[r.$$hash];
},_onActivate:function(e){var t=e.getTarget();
this.__kQ=t;
var s=this.__kU(t);

if(s!=this.__kS){this.__kS=s;
}},_onDeactivate:function(e){var u=e.getTarget();

if(this.__kQ==u){this.__kQ=null;
}},_onFocusIn:function(e){var v=e.getTarget();

if(v!=this.__kR){this.__kR=v;
v.visualizeFocus();
}},_onFocusOut:function(e){var w=e.getTarget();

if(w==this.__kR){this.__kR=null;
w.visualizeBlur();
}},__kT:function(e){if(e.getKeyIdentifier()!=g){return;
}
if(!this.__kS){return;
}e.stopPropagation();
e.preventDefault();
var x=this.__kR;

if(!e.isShiftPressed()){var y=x?this.__kY(x):this.__kW();
}else{var y=x?this.__la(x):this.__kX();
}if(y){y.tabFocus();
}},__kU:function(z){var A=this.__kP;

while(z){if(A[z.$$hash]){return z;
}z=z.getLayoutParent();
}return null;
},__kV:function(B,C){if(B===C){return 0;
}var E=B.getTabIndex()||0;
var D=C.getTabIndex()||0;

if(E!=D){return E-D;
}var J=B.getContainerElement().getDomElement();
var I=C.getContainerElement().getDomElement();
var H=qx.bom.element.Location;
var G=H.get(J);
var F=H.get(I);
if(G.top!=F.top){return G.top-F.top;
}if(G.left!=F.left){return G.left-F.left;
}var K=B.getZIndex();
var L=C.getZIndex();

if(K!=L){return K-L;
}return 0;
},__kW:function(){return this.__ld(this.__kS,null);
},__kX:function(){return this.__le(this.__kS,null);
},__kY:function(M){var N=this.__kS;

if(N==M){return this.__kW();
}
while(M&&M.getAnonymous()){M=M.getLayoutParent();
}
if(M==null){return [];
}var O=[];
this.__lb(N,M,O);
O.sort(this.__kV);
var P=O.length;
return P>0?O[0]:this.__kW();
},__la:function(Q){var R=this.__kS;

if(R==Q){return this.__kX();
}
while(Q&&Q.getAnonymous()){Q=Q.getLayoutParent();
}
if(Q==null){return [];
}var S=[];
this.__lc(R,Q,S);
S.sort(this.__kV);
var T=S.length;
return T>0?S[T-1]:this.__kX();
},__lb:function(parent,U,V){var W=parent.getLayoutChildren();
var X;

for(var i=0,l=W.length;i<l;i++){X=W[i];
if(!(X instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(X)&&X.isEnabled()&&X.isVisible()){if(X.isTabable()&&this.__kV(U,X)<0){V.push(X);
}this.__lb(X,U,V);
}}},__lc:function(parent,Y,ba){var bb=parent.getLayoutChildren();
var bc;

for(var i=0,l=bb.length;i<l;i++){bc=bb[i];
if(!(bc instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(bc)&&bc.isEnabled()&&bc.isVisible()){if(bc.isTabable()&&this.__kV(Y,bc)>0){ba.push(bc);
}this.__lc(bc,Y,ba);
}}},__ld:function(parent,bd){var be=parent.getLayoutChildren();
var bf;

for(var i=0,l=be.length;i<l;i++){bf=be[i];
if(!(bf instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(bf)&&bf.isEnabled()&&bf.isVisible()){if(bf.isTabable()){if(bd==null||this.__kV(bf,bd)<0){bd=bf;
}}bd=this.__ld(bf,bd);
}}return bd;
},__le:function(parent,bg){var bh=parent.getLayoutChildren();
var bi;

for(var i=0,l=bh.length;i<l;i++){bi=bh[i];
if(!(bi instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(bi)&&bi.isEnabled()&&bi.isVisible()){if(bi.isTabable()){if(bg==null||this.__kV(bi,bg)>0){bg=bi;
}}bg=this.__le(bi,bg);
}}return bg;
}},destruct:function(){this._disposeMap(c);
this.__kR=this.__kQ=this.__kS=null;
}});
})();
(function(){var l="qx.client",k="head",j="text/css",h="stylesheet",g="}",f='@import "',e="{",d='";',c="qx.bom.Stylesheet",b="link",a="style";
qx.Class.define(c,{statics:{includeFile:function(m,n){if(!n){n=document;
}var o=n.createElement(b);
o.type=j;
o.rel=h;
o.href=qx.util.ResourceManager.getInstance().toUri(m);
var p=n.getElementsByTagName(k)[0];
p.appendChild(o);
},createElement:qx.core.Variant.select(l,{"mshtml":function(q){var r=document.createStyleSheet();

if(q){r.cssText=q;
}return r;
},"default":function(s){var t=document.createElement(a);
t.type=j;

if(s){t.appendChild(document.createTextNode(s));
}document.getElementsByTagName(k)[0].appendChild(t);
return t.sheet;
}}),addRule:qx.core.Variant.select(l,{"mshtml":function(u,v,w){u.addRule(v,w);
},"default":function(x,y,z){x.insertRule(y+e+z+g,x.cssRules.length);
}}),removeRule:qx.core.Variant.select(l,{"mshtml":function(A,B){var C=A.rules;
var D=C.length;

for(var i=D-1;i>=0;--i){if(C[i].selectorText==B){A.removeRule(i);
}}},"default":function(E,F){var G=E.cssRules;
var H=G.length;

for(var i=H-1;i>=0;--i){if(G[i].selectorText==F){E.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(l,{"mshtml":function(I){var J=I.rules;
var K=J.length;

for(var i=K-1;i>=0;i--){I.removeRule(i);
}},"default":function(L){var M=L.cssRules;
var N=M.length;

for(var i=N-1;i>=0;i--){L.deleteRule(i);
}}}),addImport:qx.core.Variant.select(l,{"mshtml":function(O,P){O.addImport(P);
},"default":function(Q,R){Q.insertRule(f+R+d,Q.cssRules.length);
}}),removeImport:qx.core.Variant.select(l,{"mshtml":function(S,T){var U=S.imports;
var V=U.length;

for(var i=V-1;i>=0;i--){if(U[i].href==T){S.removeImport(i);
}}},"default":function(W,X){var Y=W.cssRules;
var ba=Y.length;

for(var i=ba-1;i>=0;i--){if(Y[i].href==X){W.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(l,{"mshtml":function(bb){var bc=bb.imports;
var bd=bc.length;

for(var i=bd-1;i>=0;i--){bb.removeImport(i);
}},"default":function(be){var bf=be.cssRules;
var bg=bf.length;

for(var i=bg-1;i>=0;i--){if(bf[i].type==bf[i].IMPORT_RULE){be.deleteRule(i);
}}}})}});
})();
(function(){var k="number",j="': ",h="width",g="qx.ui.layout.Canvas",f="qx.debug",e="height",d="Bad format of layout property '",c="' is not supported by the Canvas layout!",b=". The value must be either an integer or an percent string.",a="The property '";
qx.Class.define(g,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(f,{"on":function(m,name,n){var o={top:1,left:1,bottom:1,right:1,width:1,height:1,edge:1};
this.assert(o[name]==1,a+name+c);

if(name==h||name==e){this.assertMatch(n,qx.ui.layout.Util.PERCENT_VALUE);
}else{if(typeof n===k){this.assertInteger(n);
}else if(qx.lang.Type.isString(n)){this.assertMatch(n,qx.ui.layout.Util.PERCENT_VALUE);
}else{this.fail(d+name+j+n+b);
}}},"off":null}),renderLayout:function(p,q){var B=this._getLayoutChildren();
var t,A,y;
var D,top,r,s,v,u;
var z,x,C,w;

for(var i=0,l=B.length;i<l;i++){t=B[i];
A=t.getSizeHint();
y=t.getLayoutProperties();
z=t.getMarginTop();
x=t.getMarginRight();
C=t.getMarginBottom();
w=t.getMarginLeft();
D=y.left!=null?y.left:y.edge;

if(qx.lang.Type.isString(D)){D=Math.round(parseFloat(D)*p/100);
}r=y.right!=null?y.right:y.edge;

if(qx.lang.Type.isString(r)){r=Math.round(parseFloat(r)*p/100);
}top=y.top!=null?y.top:y.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*q/100);
}s=y.bottom!=null?y.bottom:y.edge;

if(qx.lang.Type.isString(s)){s=Math.round(parseFloat(s)*q/100);
}if(D!=null&&r!=null){v=p-D-r-w-x;
if(v<A.minWidth){v=A.minWidth;
}else if(v>A.maxWidth){v=A.maxWidth;
}D+=w;
}else{v=y.width;

if(v==null){v=A.width;
}else{v=Math.round(parseFloat(v)*p/100);
if(v<A.minWidth){v=A.minWidth;
}else if(v>A.maxWidth){v=A.maxWidth;
}}
if(r!=null){D=p-v-r-x-w;
}else if(D==null){D=w;
}else{D+=w;
}}if(top!=null&&s!=null){u=q-top-s-z-C;
if(u<A.minHeight){u=A.minHeight;
}else if(u>A.maxHeight){u=A.maxHeight;
}top+=z;
}else{u=y.height;

if(u==null){u=A.height;
}else{u=Math.round(parseFloat(u)*q/100);
if(u<A.minHeight){u=A.minHeight;
}else if(u>A.maxHeight){u=A.maxHeight;
}}
if(s!=null){top=q-u-s-C-z;
}else if(top==null){top=z;
}else{top+=z;
}}t.renderLayout(D,top,v,u);
}},_computeSizeHint:function(){var T=0,S=0;
var Q=0,O=0;
var M,L;
var K,I;
var E=this._getLayoutChildren();
var H,R,G;
var U,top,F,J;

for(var i=0,l=E.length;i<l;i++){H=E[i];
R=H.getLayoutProperties();
G=H.getSizeHint();
var P=H.getMarginLeft()+H.getMarginRight();
var N=H.getMarginTop()+H.getMarginBottom();
M=G.width+P;
L=G.minWidth+P;
U=R.left!=null?R.left:R.edge;

if(U&&typeof U===k){M+=U;
L+=U;
}F=R.right!=null?R.right:R.edge;

if(F&&typeof F===k){M+=F;
L+=F;
}T=Math.max(T,M);
S=Math.max(S,L);
K=G.height+N;
I=G.minHeight+N;
top=R.top!=null?R.top:R.edge;

if(top&&typeof top===k){K+=top;
I+=top;
}J=R.bottom!=null?R.bottom:R.edge;

if(J&&typeof J===k){K+=J;
I+=J;
}Q=Math.max(Q,K);
O=Math.max(O,I);
}return {width:T,minWidth:S,height:Q,minHeight:O};
}}});
})();
(function(){var a="qx.html.Root";
qx.Class.define(a,{extend:qx.html.Element,construct:function(b){qx.html.Element.call(this);

if(b!=null){this.useElement(b);
}},members:{useElement:function(c){qx.html.Element.prototype.useElement.call(this,c);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var l="'>",k="[",h=", ",g="</span>",f="<span class='type-",e="</span> ",d="}",c="",b="]",a="\n",K="{",J="map",I="function",H="<span class='object'>",G="]:",F="&gt;",E="<span class='object' title='Object instance with hash code: ",D="string",C="level-",B="0",s="&lt;",t="<span class='offset'>",q=":",r="qx.log.appender.Util",o="&amp;",p="&#39;",m="DIV",n="<span>",u="&quot;",v="<span class='type-key'>",x="</span>:<span class='type-",w="</span>: ",z=" ",y="]</span>: ",A="?";
qx.Class.define(r,{statics:{toHtml:function(L){var V=[];
var S,U,N,P;
V.push(t,this.formatOffset(L.offset,6),e);

if(L.object){var M=L.win.qx.core.ObjectRegistry.fromHashCode(L.object);

if(M){V.push(E+M.$$hash+l,M.classname,k,M.$$hash,y);
}}else if(L.clazz){V.push(H+L.clazz.classname,w);
}var O=L.items;

for(var i=0,T=O.length;i<T;i++){S=O[i];
U=S.text;

if(U instanceof Array){var P=[];

for(var j=0,R=U.length;j<R;j++){N=U[j];

if(typeof N===D){P.push(n+this.escapeHTML(N)+g);
}else if(N.key){P.push(v+N.key+x+N.type+l+this.escapeHTML(N.text)+g);
}else{P.push(f+N.type+l+this.escapeHTML(N.text)+g);
}}V.push(f+S.type+l);

if(S.type===J){V.push(K,P.join(h),d);
}else{V.push(k,P.join(h),b);
}V.push(g);
}else{V.push(f+S.type+l+this.escapeHTML(U)+e);
}}var Q=document.createElement(m);
Q.innerHTML=V.join(c);
Q.className=C+L.level;
return Q;
},formatOffset:function(W,length){var ba=W.toString();
var X=(length||6)-ba.length;
var Y=c;

for(var i=0;i<X;i++){Y+=B;
}return Y+ba;
},FORMAT_STACK:null,escapeHTML:function(bb){return String(bb).replace(/[<>&"']/g,this.__mf);
},__mf:function(bc){var bd={"<":s,">":F,"&":o,"'":p,'"':u};
return bd[bc]||A;
},toText:function(be){return this.toTextArray(be).join(z);
},toTextArray:function(bf){var bn=[];
bn.push(this.formatOffset(bf.offset,6));

if(bf.object){var bg=bf.win.qx.core.ObjectRegistry.fromHashCode(bf.object);

if(bg){bn.push(bg.classname+k+bg.$$hash+G);
}}else if(bf.clazz){bn.push(bf.clazz.classname+q);
}var bh=bf.items;
var bk,bm;

for(var i=0,bl=bh.length;i<bl;i++){bk=bh[i];
bm=bk.text;

if(bk.trace&&bk.trace.length>0){if(typeof (this.FORMAT_STACK)==I){bm+=a+this.FORMAT_STACK(bk.trace);
}else{bm+=a+bk.trace;
}}
if(bm instanceof Array){var bi=[];

for(var j=0,bj=bm.length;j<bj;j++){bi.push(bm[j].text);
}
if(bk.type===J){bn.push(K,bi.join(h),d);
}else{bn.push(k,bi.join(h),b);
}}else{bn.push(bm);
}}return bn;
}}});
})();
(function(){var d="debug",c="log",b="qx.log.appender.Native",a="qx.client";
qx.Class.define(b,{statics:{process:qx.core.Variant.select(a,{"gecko":function(e){if(window.console&&console.firebug){console[e.level].call(console,qx.log.appender.Util.toText(e));
}},"mshtml":function(f){if(window.console){var h=f.level;

if(h==d){h=c;
}var g=qx.log.appender.Util.toText(f);
console[h](g);
}},"webkit":function(i){if(window.console){var k=i.level;

if(k==d){k=c;
}var j=qx.log.appender.Util.toText(i);
console[k](j);
}},"opera":function(l){}})},defer:function(m){qx.log.Logger.register(m);
}});
})();
(function(){var k="",j='</div>',i="Up",h="none",g="keypress",f='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',d="Enter",c="px",b='.qxconsole .messages .user-result{background:white}',a='.qxconsole .messages .level-error{background:#FFE2D5}',V="div",U="user-command",T='<div class="command">',S='.qxconsole .command input:focus{outline:none;}',R='.qxconsole .messages .type-key{color:#565656;font-style:italic}',Q='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',P='.qxconsole .messages div{padding:0px 4px;}',O='.qxconsole .messages .level-debug{background:white}',N='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',M="DIV",r='.qxconsole .messages .level-user{background:#E3EFE9}',s='<div class="qxconsole">',p="D",q='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',n='.qxconsole .messages .type-string{color:black;font-weight:normal;}',o='.qxconsole .control a{text-decoration:none;color:black;}',l='<div class="messages">',m='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',t='<input type="text"/>',u="clear",B='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',z='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',F='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',D='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',I='.qxconsole .messages .user-command{color:blue}',H="F7",w="qx.log.appender.Console",L='.qxconsole .messages .level-info{background:#DEEDFA}',K="block",J='.qxconsole .messages .level-warn{background:#FFF7D5}',v='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',x='.qxconsole .messages .user-error{background:#FFE2D5}',y='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',A='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',C=">>> ",E="Down",G='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}';
qx.Class.define(w,{statics:{init:function(){var W=[F,y,o,f,P,I,b,x,O,L,J,a,r,n,G,m,z,q,R,N,Q,v,D,B,S];
qx.bom.Stylesheet.createElement(W.join(k));
var Y=[s,A,l,j,T,t,j,j];
var ba=document.createElement(M);
ba.innerHTML=Y.join(k);
var X=ba.firstChild;
document.body.appendChild(ba.firstChild);
this.__lV=X;
this.__lW=X.childNodes[1];
this.__lX=X.childNodes[2].firstChild;
this.__md();
qx.log.Logger.register(this);
qx.core.ObjectRegistry.register(this);
},dispose:function(){qx.event.Registration.removeListener(document.documentElement,g,this.__me,this);
qx.log.Logger.unregister(this);
},clear:function(){this.__lW.innerHTML=k;
},process:function(bb){this.__lW.appendChild(qx.log.appender.Util.toHtml(bb));
this.__lY();
},__lY:function(){this.__lW.scrollTop=this.__lW.scrollHeight;
},__ma:true,toggle:function(){if(!this.__lV){this.init();
}else if(this.__lV.style.display==h){this.show();
}else{this.__lV.style.display=h;
}},show:function(){if(!this.__lV){this.init();
}else{this.__lV.style.display=K;
this.__lW.scrollTop=this.__lW.scrollHeight;
}},__mb:[],execute:function(){var be=this.__lX.value;

if(be==k){return;
}
if(be==u){return this.clear();
}var bc=document.createElement(V);
bc.innerHTML=qx.log.appender.Util.escapeHTML(C+be);
bc.className=U;
this.__mb.push(be);
this.__mc=this.__mb.length;
this.__lW.appendChild(bc);
this.__lY();

try{var bd=window.eval(be);
}catch(bf){qx.log.Logger.error(bf);
}
if(bd!==undefined){qx.log.Logger.debug(bd);
}},__md:function(e){this.__lW.style.height=(this.__lV.clientHeight-this.__lV.firstChild.offsetHeight-this.__lV.lastChild.offsetHeight)+c;
},__me:function(e){var bh=e.getKeyIdentifier();
if((bh==H)||(bh==p&&e.isCtrlPressed())){this.toggle();
e.preventDefault();
}if(!this.__lV){return;
}if(!qx.dom.Hierarchy.contains(this.__lV,e.getTarget())){return;
}if(bh==d&&this.__lX.value!=k){this.execute();
this.__lX.value=k;
}if(bh==i||bh==E){this.__mc+=bh==i?-1:1;
this.__mc=Math.min(Math.max(0,this.__mc),this.__mb.length);
var bg=this.__mb[this.__mc];
this.__lX.value=bg||k;
this.__lX.select();
}}},defer:function(bi){qx.event.Registration.addListener(document.documentElement,g,bi.__me,bi);
}});
})();
(function(){var dk="execute",dj="/",di="excluded",dh="visible",dg="",df="current",de="value",dd="auto",dc=" ",db="tags",cd="category",cc="modelLink",cb="changeSelection",ca="completed",bY="failed",bX="white",bW="html",bV="~",bU="qooxdoo ",bT="all",ds=".",dt="interval",dq='\n',dr="monospace",dn="div",dp="right",dl="qx.version",dm="id",du="node",dv=".src.js",cJ="_blank",cI=" Demo Browser ",cL=".html",cK="noPlayground",cN="<script",cM="qx.theme.Modern",cP="horizontal",cO="javascript",cH="_",cG='</span>',o="main",p="qx_srcview",q="js",v="\n",x="outputviews.sourcepage.html.page",y="widget",z="_demoView",A="outputviews.sourcepage.js.page",B="log",C="separator-vertical",dJ="request",dI="src",dH="icon/22/actions/edit-clear.png",dG="Demos",dN='</div>',dM="^.*",dL="filled",dK="Clear log",dP="changeValue",dO="__uP",bp="dblclick",bq="icon/22/actions/media-playback-start.png",bn="<div class='script'>The sample JS source will be displayed here.</div>",bo="demobrowser.DemoBrowser",bt="HTML Code",bu="load",br='</span>=<span class="string">',bs="Run previous demo",bl="_history",bm="__uV",U='_cmdNamespacePollution',T="_leftComposite",W="icon/22/apps/utilities-color-chooser.png",V="_status",Q="Ctrl+N",P="Previous",S='.html',R="Run",O='<span class="html-tag-name">',N="__uQ",bz="<div class='script'>The sample source will be displayed here.</div>",bA="_searchTextField",bB="Open demo in the playground",bC="tree1",bv="f1",bw="Debug",bx="Display log file",by="script/demobrowser.demo",bD="icon/22/actions/media-playback-stop.png",bE="</div></pre>",bg="icon/22/apps/utilities-log-viewer.png",bf="Ctrl+O",be="Log File",bd="Stop playback after current demo",bc="qx.theme.Classic",bb='"',ba='<div class="script">',Y="logappender",bk="_runbutton",bj="Choose theme",bF="icon/22/apps/internet-web-browser.png",bG="#",bH="f2",bI="<pre class='script'>",bJ="_stopbutton",bK="JS Code",bL="icon/22/mimetypes/executable.png",bM="ig",bN="middle",bO="Stop",ck='"}',cj="animation",ci="icon/22/actions/edit-redo.png",ch='_cmdDisposeSample',co="toolbar",cn="icon/22/apps/office-spreadsheet.png",cm="mshtml",cl="To Playground",cr="/demo/",cq="demo/welcome.html",cC='_cmdSampleInOwnWindow',cD=".*",cA="background-splitpane",cB='demo/',cy="</pre>",cz="Debugging options",cv="Ctrl+P",cx="Filter...",cE="__uW",cF="app-header",cT="/playground/",cS="<pre ><div class='script'>",cV="Dispose Demo",cU='{"code": ',cX="__uO",cW="Classic Theme",da="Global Namespace Pollution",cY="viewGroup",cR="icon/16/actions/edit-find.png",cQ="treeview.flat",dC="Own Window",dD="Display HTML source",dE='_cmdObjectSummary',dF='/',dy='&gt;',dz='_cmdNextSample',dA="Run next demo",dB='_cmdPrevSample',dw=" Start",dx="\"",n="background-medium",l="Ctrl+Left",k="demo-tree",h="Display JavaScript source",g='_cmdRunSample',f="Next",d="qx.client",c="F5",b="http://demo.qooxdoo.org/",a="Modern Theme",F="Open demo in new window",G="__uU",D="string",E="_infosplit",J="runbutton",K="8px",H="Ctrl+Right",I="_navPart",L="?qx.theme=",M="textfield",cs="_tree",cp="Ctrl+D",cu="mainsplit",ct="icon/22/actions/go-previous.png",cf="Object Summary",ce="Demo Browser",X="icon/22/actions/application-exit.png",cg="?",bi=' <span class="keyword">',bh="Run the selected demo(s)",bP="left",bQ="icon/22/actions/go-next.png",bR="Theme",bS="_iframe";
qx.Class.define(bo,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
var dT=new qx.ui.layout.VBox;
dT.setSeparator(C);
this.setLayout(dT);
this.add(this._createHeader());
this.widgets={};
this.tests={};
this.__uN=cM;
this.__va();
this.__uO=this.__vh();
this.add(this.__uO);
var dX=new qx.ui.splitpane.Pane(cP);
this.mainsplit=dX;
var dU=new qx.ui.splitpane.Pane(cP);
dU.setDecorator(null);
this._infosplit=dU;
this.add(dX,{flex:1});
var ea=this._leftComposite=new qx.ui.container.Composite();
ea.setLayout(new qx.ui.layout.VBox(3));
ea.setBackgroundColor(cA);
dX.add(ea,0);
{};
var dS=new qx.ui.container.Composite();
dS.setLayout(new qx.ui.layout.HBox(3));
dS.setAppearance(M);
ea.add(dS);
var eb=new qx.ui.basic.Image(cR);
dS.add(eb);
this._searchTextField=new qx.ui.form.TextField();
this._searchTextField.setLiveUpdate(true);
this._searchTextField.setAppearance(y);
this._searchTextField.setPlaceholder(cx);
var dY=new qx.event.Timer(500);
dY.addListener(dt,function(ec){this.filter(this._searchTextField.getValue());
dY.stop();
},this);
this._searchTextField.addListener(dP,function(ed){dY.restart();
},this);
dS.add(this._searchTextField,{flex:1});
this._status=new qx.ui.basic.Label(dg);
this._status.setAppearance(y);
this._status.setWidth(80);
this._status.setTextAlign(dp);
dS.add(this._status);
dX.add(dU,1);
this._tree=this.__vm();
ea.add(this._tree,{flex:1});
this._demoView=this.__vi();
{dU.add(this._demoView,2);
};
var dQ=this.__vk();
var dR=this.__vl();
var dV=this.__vj();
var dW=new qx.ui.container.Stack;
dW.setDecorator(o);
dW.add(dQ);
dW.add(dR);
dW.add(dV);
this.viewGroup.addListener(cb,function(e){var ee=e.getData()[0];
var ef=ee!=null?ee.getUserData(de):dg;

switch(ef){case bW:this.setSelection([dQ]);
dW.show();
break;
case q:this.setSelection([dR]);
dW.show();
break;
case B:this.setSelection([dV]);
dW.show();
break;
default:this.resetSelection();
dW.exclude();
}},dW);
dU.add(dW,1);
dW.resetSelection();
dW.exclude();
this._history=qx.bom.History.getInstance();
this._history.addListener(dJ,function(e){var eg=e.getData().replace(bV,dj);

if(this._currentSample!=eg){this.setCurrentSample(eg);
}},this);
this.__uP=[this.__uU,this.__uV,this.__uW];
{this.__uP.push(this.__uS);
};
this.__uQ=new qx.event.Timer(250);
this.__uQ.addListener(dt,this.__vo,this);
this.__uQ.start();
},properties:{playDemos:{check:[bT,cd,df],init:df}},members:{_iframe:null,__uN:null,__uQ:null,__uR:null,_tree:null,_status:null,_searchTextField:null,__uS:null,__uT:null,__uP:null,_versionFilter:null,__uU:null,__uV:null,__uW:null,__uX:null,__uO:null,_leftComposite:null,_infosplit:null,_demoView:null,__uY:null,defaultUrl:cq,playgroundUrl:b+qx.core.Setting.get(dl)+cT,__va:function(){this._cmdObjectSummary=new qx.ui.core.Command(bf);
this._cmdObjectSummary.addListener(dk,this.__vb,this);
this._cmdRunSample=new qx.ui.core.Command(c);
this._cmdRunSample.addListener(dk,this.runSample,this);
this._cmdPrevSample=new qx.ui.core.Command(l);
this._cmdPrevSample.addListener(dk,this.playPrev,this);
this._cmdNextSample=new qx.ui.core.Command(H);
this._cmdNextSample.addListener(dk,this.playNext,this);
this._cmdSampleInOwnWindow=new qx.ui.core.Command(Q);
this._cmdSampleInOwnWindow.addListener(dk,this.__vc,this);
this._cmdDisposeSample=new qx.ui.core.Command(cp);
this._cmdDisposeSample.addListener(dk,this.__vf,this);
this._cmdNamespacePollution=new qx.ui.core.Command(cv);
this._cmdNamespacePollution.addListener(dk,this.__vg,this);
},__vb:function(){var eh=this._iframe.getWindow();

if(eh&&eh.qx){alert(eh.qx.dev.ObjectSummary.getInfo());
}else{alert("Unable to access namespace. Maybe no demo loaded.");
}},__vc:function(){var ei=this._iframe.getSource();
window.open(ei,cJ);
},__vd:function(ej){var ek=!!ej;
var el=this._tree.getSelection()[0].getUserData(db);

if(el){ek=ek&&!qx.lang.Array.contains(el,cK);
}this.__uS.setEnabled(ek);
this.__uT=ej;
},__ve:function(){if(this.__uT){var eo=this.__uT;
var en=cU+bb+encodeURIComponent(eo)+ck;
var em=this.playgroundUrl+bG+encodeURIComponent(en);
window.open(em,cJ);
}else{alert(this.tr("Could not open the Playground."));
}},__vf:function(e){var ep=this._iframe.getWindow();

if(ep&&ep.qx){ep.qx.core.ObjectRegistry.shutdown();
alert("Done!");
}else{alert("Unable to access application.");
}},__vg:function(e){var eq=this._iframe.getWindow();

if(eq&&eq.qx){alert(eq.qx.dev.Pollution.getInfo());
}else{alert("Unable to access application.");
}},__vh:function(){var eu=new qx.ui.toolbar.ToolBar();
this._navPart=new qx.ui.toolbar.Part();
eu.add(this._navPart);
this._runbutton=new qx.ui.toolbar.Button(this.tr(R),bq);
this._runbutton.addListener(dk,this.runSample,this);
this._runbutton.setToolTipText(bh);
this._navPart.add(this._runbutton);
this._stopbutton=new qx.ui.toolbar.Button(this.tr(bO),bD);
this._stopbutton.addListener(dk,this.stopSample,this);
this._stopbutton.setToolTipText(bd);
this._navPart.add(this._stopbutton);
this._stopbutton.setVisibility(di);
this._runbutton.setMinWidth(60);
this._stopbutton.setMinWidth(60);
var eJ=new qx.ui.toolbar.Button(this.tr(P),ct);
eJ.addListener(dk,this.playPrev,this);
eJ.setToolTipText(bs);
this._navPart.add(eJ);
var eM=new qx.ui.toolbar.Button(this.tr(f),bQ);
eM.addListener(dk,this.playNext,this);
eM.setToolTipText(dA);
this._navPart.add(eM);
var eF=new qx.ui.toolbar.Button(this.tr(dC),ci);
eF.addListener(dk,this.__vc,this);
eF.setToolTipText(F);
this.__uU=eF;
this._navPart.add(eF);
{var et=new qx.ui.toolbar.Button(this.tr(cl),X);
et.addListener(dk,this.__ve,this);
et.setToolTipText(bB);
et.setEnabled(false);
if(qx.core.Variant.isSet(d,cm)){et.exclude();
}this.__uS=et;
this._navPart.add(et);
};
var ew=new qx.ui.toolbar.Part;
this.__uW=ew;
eu.add(ew);
{var eI=new qx.ui.menu.Menu;
this.__uX=eI;
var eD=new qx.ui.menu.RadioButton(a);
var eB=new qx.ui.menu.RadioButton(cW);
eD.setUserData(de,cM);
eD.setValue(true);
eB.setUserData(de,bc);
var eK=new qx.ui.form.RadioGroup(eD,eB);
eK.addListener(cb,this.__vt,this);
eI.add(eD);
eI.add(eB);
var er=new qx.ui.toolbar.MenuButton(this.tr(bR),W,eI);
er.setToolTipText(bj);
ew.add(er);
};
var ez=new qx.ui.menu.Menu;
{var eA=new qx.ui.menu.Button(this.tr(cf));
eA.setCommand(this._cmdObjectSummary);
ez.add(eA);
var eL=new qx.ui.menu.Button(this.tr(da));
eL.setCommand(this._cmdNamespacePollution);
ez.add(eL);
};
var eG=new qx.ui.menu.Button(this.tr(cV));
eG.setCommand(this._cmdDisposeSample);
ez.add(eG);
var eH=new qx.ui.toolbar.MenuButton(this.tr(bw),cn,ez);
eH.setToolTipText(cz);
ew.add(eH);
var es=new qx.ui.toolbar.Part;
this.__uV=es;
eu.addSpacer();
eu.add(es);
{var eN=new qx.ui.toolbar.RadioButton(bt,bF);
eN.setToolTipText(dD);
var eE=new qx.ui.toolbar.RadioButton(bK,bL);
eE.setToolTipText(h);
eN.setUserData(de,bW);
eE.setUserData(de,q);
es.add(eN);
es.add(eE);
};
var eC=new qx.ui.toolbar.RadioButton(be,bg);
eC.setToolTipText(bx);
eC.setUserData(de,B);
es.add(eC);
var ey=this.viewGroup=new qx.ui.form.RadioGroup;
ey.setAllowEmptySelection(true);
ey.add(eC);
{ey.add(eN,eE);
};
return eu;
},__vi:function(){var eO=new qx.ui.embed.Iframe().set({nativeContextMenu:true});
eO.addListener(bu,this.__vn,this);
this._iframe=eO;
return eO;
},__vj:function(){var eR=new qx.ui.layout.VBox(0,bN,o);
eR.setAlignX(dp);
var eT=new qx.ui.container.Composite(eR);
var eP=new qx.ui.decoration.Background().set({backgroundColor:n});
eT.setDecorator(eP);
var eS=new qx.ui.form.Button(this.tr(dK),dH);
eS.setAllowGrowX(false);
eS.setMargin(5);
eS.addListener(dk,function(){this.logappender.clear();
},this);
eT.add(eS,{flex:0});
this.f2=new qx.ui.embed.Html();
this.f2.setOverflow(dd,dd);
this.f2.setFont(dr);
this.f2.setBackgroundColor(bX);
this.logappender=new qx.log.appender.Element();
qx.log.Logger.unregister(this.logappender);
var eQ=document.createElement(dn);
this.logelem=document.createElement(dn);
this.logelem.style.padding=K;
this.logappender.setElement(this.logelem);
eQ.appendChild(this.logelem);
this.f2.getContentElement().useElement(eQ);
eT.add(this.f2,{flex:1});
return eT;
},__vk:function(){var eU=new qx.ui.embed.Html(bz);
eU.setOverflow(dd,dd);
eU.setFont(dr);
eU.setBackgroundColor(bX);
this.widgets[x]=eU;
eU.getContentElement().setAttribute(dm,p);
return eU;
},__vl:function(){var eV=new qx.ui.embed.Html(bn);
eV.setOverflow(dd,dd);
eV.setFont(dr);
eV.setBackgroundColor(bX);
this.widgets[A]=eV;
eV.getContentElement().setAttribute(dm,p);
return eV;
},__vm:function(){var eX=new qx.ui.tree.Tree();
var eW=new qx.ui.tree.TreeFolder(dG);
eX.setAppearance(k);
eX.setRoot(eW);
eX.setSelection([eW]);
this.tree=this.widgets[cQ]=eX;
eX.addListener(cb,this.treeGetSelection,this);
eX.addListener(bp,function(e){qx.event.Timer.once(this.runSample,this,50);
},this);
return eX;
},treeGetSelection:function(e){var eY=this.tree.getSelection()[0];
var fa=eY.getUserData(cc);
this.tests.selected=this.tests.handler.getFullName(fa);
},leftReloadTree:function(e){this._sampleToTreeNodeMap={};
var fb=this._sampleToTreeNodeMap;
var fh=null;
var fk=null;
var fj;
{fj=/\?autorun=true/.test(location.href);
};
var fg=this._history.getState();
var fe=fg.match(/([^~]+)~/);

if(fe){fh=fe[1];
}else{var fc=fg.match(/([^~][\w]*)/);

if(fc){fh=fc[1];

if(fj){this.setPlayDemos(cd);
}}else{fh=cj;

if(fj){this.setPlayDemos(bT);
}}}function fi(fl,fm){var fq=fm.getChildren();
var t;

for(var i=0;i<fq.length;i++){var fn=fq[i];

if(fn.hasChildren()){t=new qx.ui.tree.TreeFolder(fd.polish(fn.label));
t.setUserData(dL,false);
t.setUserData(du,fn);
fi(t,t.getUserData(du));

if(fn.label==fh){fk=t;
t.setOpen(true);
}}else{t=new qx.ui.tree.TreeFile(fd.polish(fn.label));
var fp=fn.pwd().slice(1).join(dj)+dj+fn.label;

if(fn.tags){var j,m,fo;
t.setUserData(db,fn.tags);
{};
}fb[fp]=t;
}fl.add(t);
t.setUserData(cc,fn);
fn.widgetLinkFull=t;
}}var ff=this.tests.handler.ttree;
var fd=this;
this.tree.setUserData(cc,ff);
this.tree.getRoot().setOpen(true);
fi(this.tree.getRoot(),ff);
{};

if(fk!=null){this.tree.setSelection([fk]);
}},runSample:function(e){if(e&&(e.getType()===dk||e.getType()===dt)){if(this.tests.selected===dg){this.setPlayDemos(bT);
}else if(this.tests.selected.indexOf(bW)>0){if(this.__uY){this.__uY.stop();
}this.setPlayDemos(df);
}else{this.setPlayDemos(cd);
}}this._runbutton.setVisibility(di);
this._stopbutton.setVisibility(dh);

if(this.tests.selected!=dg){var fr=this.tests.selected.replace(ds,dj);
this.setCurrentSample(fr);
}else{this.playNext();
}},stopSample:function(e){this.setPlayDemos(df);
this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
},setCurrentSample:function(fs){if(!fs){return;
}
if(!this._sampleToTreeNodeMap){return;
}var ft;
var fv=this._sampleToTreeNodeMap[fs];

if(fv){fv.getTree().setSelection([fv]);
ft=cB+fs;
{ft+=L+this.__uN;
};
var fu=fv.getUserData(db);

if(fu){this.__uS.setEnabled(!qx.lang.Array.contains(fu,cK));
}}else{ft=this.defaultUrl;
}
if(this._iframe.getSource()==ft){this._iframe.reload();
}else{this.__uR=false;
this._iframe.setSource(ft);
}if(ft==this.defaultUrl){this.disableMenuButtons();
}else{this.enableMenuButtons();
}this._currentSample=fs;
this._currentSampleUrl=ft;
},__vn:function(){var fz=this._iframe.getWindow();
var fF=this._iframe.getSource();

if(fF!=null&&fF!=this.defaultUrl){var fy;

try{fy=fz.location.href;
}catch(fH){fy=window.location.href;
var fG=fy.lastIndexOf(dj);

if(fG!=-1){fy=fy.substring(0,fG+1);
}fy+=fF;
}var fD=fy.indexOf(cr)+6;
var fA=fy.indexOf(cg);
fA=fA==-1?fy.length:fA;
var fB=fy.substring(fD,fA).split(dj);
var fE=String.fromCharCode(187);

if(fB.length==2){var fw=fB[0];
fw=fw.charAt(0).toUpperCase()+fw.substring(1);
var fC=fB[1].replace(cL,dg).replace(cH,dc);
fC=fC.charAt(0).toUpperCase()+fC.substring(1);
var fx=bU+fE+cI+fE+dc+fw+dc+fE+dc+fC;
}else{var fx=bU+fE+cI+fE+dw;
}document.title=fx;
}if(this.getPlayDemos()!=df){if(!fC){this.playNext();
}else{var self=this;
this.__uY=qx.event.Timer.once(this.playNext,self,5000);
}}else{this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
}},__vo:function(e){var fI=this._iframe.getWindow();

try{if(fI&&fI.qx&&fI.qx.log&&fI.qx.log.appender){if(!this.__uR){this.__uR=true;
this.debug("Demo loaded: "+this._currentSample);
this.logappender.$$id=null;
this.logappender.clear();

try{fI.qx.log.Logger.register(this.logappender);
}catch(e){return ;
}this._history.addToHistory(this._currentSample.replace(dj,bV),document.title);
if(this._currentSampleUrl!=this.defaultUrl){this.__vp(this._currentSampleUrl);
}}}else{this.__uR=false;
}}catch(fJ){this.__uR=false;
}},filter:function(fK){var fS=new RegExp(dM+fK+cD,bM);
var fQ=this._tree.getRoot().getItems(true,true);
var fR=0;
var fL=0;

for(var i=0;i<fQ.length;i++){var fT=fQ[i];
var parent=fT.getParent();
var fP=fT.getUserData(db);
var fM=false;

if(fP!=null){for(var j=0;j<fP.length;j++){fM=!!fP[j].match(fS);

if(fM){break;
}}}
if(fT.getChildren().length==0){fL++;
}
if((fM||(fT.getLabel().search(fS)!=-1)||(parent.getLabel().search(fS)!=-1))){if(fT.getChildren().length==0){fR++;
}fT.show();
fT.getParent().setOpen(true);
fT.getParent().show();
}else{fT.exclude();
}}if(fK==dg){var fO=this._tree.getRoot().getItems(false,true);
var fN=this._tree.getSelection();
for(var i=0;i<fO.length;i++){if(fO[i]==fN[0]||fO[i]==fN[0].getParent()){continue;
}fO[i].setOpen(false);
}}this._status.setValue(fR+dj+fL);
},__vp:function(fU){if(typeof (fU)!=D){return;
}var fV=new qx.io.remote.Request(fU);
fV.setTimeout(180000);
fV.setProhibitCaching(false);
fV.addListener(ca,function(fW){var content=fW.getContent();
if(content){{var ga=content.indexOf(cN,content.indexOf(cN)+7);
var gg=content.indexOf(dI,ga);
var fY=content.indexOf(dx,gg+5);
var gb=content.substring(gg+5,fY);
var ge=gb.substring(4,gb.length-3)+dv;
var u=by;
var gd=fU.split(dF);
var gc=gd[1];
var gf=gd[2];
gf=gf.substr(0,gf.indexOf(S));
u+=ds+gc+ds+gf+dv;
ge=u;
var fX=new qx.io.remote.Request(ge);
fX.setTimeout(180000);
fX.setProhibitCaching(false);
fX.addListener(ca,function(gh){var gi=gh.getContent();
this.__vd(gi);

if(gi){this.widgets[A].setHtml(this.__vq(gi,cO));
}},this);
fX.addListener(bY,function(gj){this.error("Couldn't load file: "+fU);
},this);
fX.send();
this.widgets[x].setHtml(this.__vq(content));
};
}},this);
fV.addListener(bY,function(gk){this.error("Couldn't load file: "+fU);
},this);
fV.send();
},dataLoader:function(gl){var gm=new qx.io.remote.Request(gl);
gm.setTimeout(180000);
gm.setProhibitCaching(false);
gm.addListener(ca,function(gn){var content=gn.getContent();
var go=eval(content);
qx.event.Timer.once(function(){this.tests.handler=new demobrowser.TreeDataHandler(go);
this.leftReloadTree();
var gp=this._history.getState();

if(gp){this.setCurrentSample(gp.replace(bV,dj));
}else{this.setCurrentSample(this.defaultUrl);
}},this,0);
},this);
gm.addListener(bY,function(gq){this.error("Couldn't load file: "+gl);
},this);
gm.send();
},playPrev:function(e){this.setPlayDemos(df);
var gu=this.tree.getSelection()[0];

if(gu){var gr=this.tree.getPreviousNodeOf(gu,false);

if(!gr||gr==this.tree.getRoot()){return;
}
while(gr.isVisible&&!gr.isVisible()){gr=this.tree.getPreviousNodeOf(gr,false);
}
if(gr.getParent()==this.tree.getRoot()){var gt=this.tree.getPreviousNodeOf(gr,false);

while(gt.isVisible&&!gt.isVisible()){gt=this.tree.getPreviousNodeOf(gt,false);
}
if(gt.getParent()==this.tree.getRoot()){gt.setOpen(true);
var gs=this.tree.getPreviousNodeOf(gr,false);

while(gs.isVisible&&!gs.isVisible()){gs=this.tree.getPreviousNodeOf(gs,false);
}
if(gt!==gs){gr=gs;
}}else{gr=gt;
}}
if(!gr||gr===gu){this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
return;
}else{this.tree.setSelection([gr]);
this.runSample();
}}},playNext:function(e){var gx=this.tree.getSelection()[0];

if(gx){var gv=this.tree.getNextNodeOf(gx);

if(!gv){this.setPlayDemos(df);
this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
return;
}
if(gv.getParent()==this.tree.getRoot()){if(this.getPlayDemos()==cd){if(gv!=gx&&gv!=gx.getParent()){this.setPlayDemos(df);
this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
return;
}}gv.setOpen(true);
gv=this.tree.getNextNodeOf(gv);
}
if(!gv){this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
return;
}
while(!gv.isVisible()){var gw=this.tree.getNextNodeOf(gv);

if(!gw){this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
return;
}
if(gw.getParent()==this.tree.getRoot()){gv.setOpen(true);
var gw=this.tree.getNextNodeOf(gw);
}gv=gw;
}
if(gv){this.tree.setSelection([gv]);
this.runSample();
}else{this._stopbutton.setVisibility(di);
this._runbutton.setVisibility(dh);
}}},__vq:function(gy,gz){var gA=new qx.util.StringBuilder(bI);
var gC=[];
var gD=new qx.util.StringBuilder();
var gE=/^\s*<script\b[^>]*?(?!\bsrc\s*=)[^>]*?>\s*$/i;
var gB=/^\s*<\/script>\s*$/i;
gy=gy.replace(/\r\n/g,v).replace(/\r/g,v);
var gC=gy.split(dq);
if(gz==cO){return cS+qx.dev.Tokenizer.javaScriptToHtml(gy)+bE;
}
for(var i=0;i<gC.length;i++){if(gE.exec(gC[i])){gA.add(this.__vr(qx.bom.String.escape(gD.get()+gC[i])));
gD.clear();
}else if(gB.exec(gC[i])){var gF=qx.dev.Tokenizer.javaScriptToHtml(gD.get());
gA.add(ba,gF,dN);
gD.clear();
gD.add(gC[i],dq);
}else{gD.add(gC[i],dq);
}}gA.add(this.__vr(qx.bom.String.escape(gD.get())),cy);
return gA.get();
},disableMenuButtons:function(){var gG=this.__uP;

for(var i=0;i<gG.length;i++){gG[i].setEnabled(false);
}},enableMenuButtons:function(){var gH=this.__uP;

for(var i=0;i<gH.length;i++){gH[i].setEnabled(true);
}},__vr:function(gI){var gK=gI;
function gJ(gL){var s=new qx.util.StringBuilder(arguments[1],O,arguments[2],cG);
var gM;
var gN=false;
if(arguments.length-2>3){for(var i=3;i<arguments.length-2;i++){gM=arguments[i];

if(gM==dj){gN=true;
break;
}else{var m=/\s*([^=]+?)\s*=\s*((?!&quot;)\S+|&quot;.*?&quot;)\s*/g;
var r;

while((r=m.exec(gM))!=null){s.add(bi,r[1],br,r[2].replace(/\s*$/,dg),cG);
}}}s.add((gN?dj:dg));
}s.add(dy);
return s.get();
}gK=gK.replace(/(&lt;\/?)([a-zA-Z]+)(.*?)(\/?)&gt;/g,gJ);
return gK;
},polish:function(gO){return gO.replace(cL,dg).replace(cH,dc);
},__vs:function(){var w=this._iframe.getWindow();
var gP;

if(w.qx&&w.qx.log&&w.qx.log.Logger){gP=w.qx.log.Logger;
gP.register(this.logappender);
gP.clear();
gP.unregister(this.logappender);
}},__vt:function(e){this.__uN=e.getData()[0].getUserData(de);
this.runSample();
},_createHeader:function(){var gS=new qx.ui.layout.HBox();
var gQ=new qx.ui.container.Composite(gS);
gQ.setAppearance(cF);
var gT=new qx.ui.basic.Label(ce);
var gR=new qx.ui.basic.Label(bU+qx.core.Setting.get(dl));
gQ.add(gT);
gQ.add(new qx.ui.core.Spacer,{flex:1});
gQ.add(gR);
return gQ;
}},destruct:function(){this.widgets=this.tests=this._sampleToTreeNodeMap=this.tree=this.logelem=null;
this._disposeObjects(cu,bC,bP,J,co,bv,bH,bl,Y,dE,g,dB,dz,cC,ch,U,I,bk,bJ,G,cE,bm,cY,cX,E,bA,V,cs,bS,z,dO,N,T,z);
}});
})();
(function(){var s="_applyLayoutChange",r="top",q="left",p="height",o="middle",n="Decorator",m="center",k="_applyReversed",j="qx.debug",h="bottom",c="' is not supported by the VBox layout!",g="qx.ui.layout.VBox",f="flex",b="Integer",a="The property '",e="right",d="Boolean";
qx.Class.define(g,{extend:qx.ui.layout.Abstract,construct:function(t,u,v){qx.ui.layout.Abstract.call(this);

if(t){this.setSpacing(t);
}
if(u){this.setAlignY(u);
}
if(v){this.setSeparator(v);
}},properties:{alignY:{check:[r,o,h],init:r,apply:s},alignX:{check:[q,m,e],init:q,apply:s},spacing:{check:b,init:0,apply:s},separator:{check:n,nullable:true,apply:s},reversed:{check:d,init:false,apply:k}},members:{__lQ:null,__lR:null,__lS:null,__lT:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__lU:function(){var B=this._getLayoutChildren();
var length=B.length;
var x=false;
var w=this.__lQ&&this.__lQ.length!=length&&this.__lR&&this.__lQ;
var z;
var y=w?this.__lQ:new Array(length);
var A=w?this.__lR:new Array(length);
if(this.getReversed()){B=B.concat().reverse();
}for(var i=0;i<length;i++){z=B[i].getLayoutProperties();

if(z.height!=null){y[i]=parseFloat(z.height)/100;
}
if(z.flex!=null){A[i]=z.flex;
x=true;
}else{A[i]=0;
}}if(!w){this.__lQ=y;
this.__lR=A;
}this.__lS=x;
this.__lT=B;
delete this._invalidChildrenCache;
},verifyLayoutProperty:qx.core.Variant.select(j,{"on":function(C,name,D){this.assert(name===f||name===p,a+name+c);

if(name==p){this.assertMatch(D,qx.ui.layout.Util.PERCENT_VALUE);
}else{this.assertNumber(D);
this.assert(D>=0);
}},"off":null}),renderLayout:function(E,F){if(this._invalidChildrenCache){this.__lU();
}var M=this.__lT;
var length=M.length;
var W=qx.ui.layout.Util;
var V=this.getSpacing();
var ba=this.getSeparator();

if(ba){var J=W.computeVerticalSeparatorGaps(M,V,ba);
}else{var J=W.computeVerticalGaps(M,V,true);
}var i,H,I,Q;
var R=[];
var X=J;

for(i=0;i<length;i+=1){Q=this.__lQ[i];
I=Q!=null?Math.floor((F-J)*Q):M[i].getSizeHint().height;
R.push(I);
X+=I;
}if(this.__lS&&X!=F){var O={};
var U,Y;

for(i=0;i<length;i+=1){U=this.__lR[i];

if(U>0){N=M[i].getSizeHint();
O[i]={min:N.minHeight,value:R[i],max:N.maxHeight,flex:U};
}}var K=W.computeFlexOffsets(O,F,X);

for(i in K){Y=K[i].offset;
R[i]+=Y;
X+=Y;
}}var top=M[0].getMarginTop();
if(X<F&&this.getAlignY()!=r){top=F-X;

if(this.getAlignY()===o){top=Math.round(top/2);
}}var N,bc,S,I,P,T,L;
this._clearSeparators();
if(ba){var bb=qx.theme.manager.Decoration.getInstance().resolve(ba).getInsets();
var G=bb.top+bb.bottom;
}for(i=0;i<length;i+=1){H=M[i];
I=R[i];
N=H.getSizeHint();
T=H.getMarginLeft();
L=H.getMarginRight();
S=Math.max(N.minWidth,Math.min(E-T-L,N.maxWidth));
bc=W.computeHorizontalAlignOffset(H.getAlignX()||this.getAlignX(),S,E,T,L);
if(i>0){if(ba){top+=P+V;
this._renderSeparator(ba,{top:top,left:0,height:G,width:E});
top+=G+V+H.getMarginTop();
}else{top+=W.collapseMargins(V,P,H.getMarginTop());
}}H.renderLayout(bc,top,S,I);
top+=I;
P=H.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__lU();
}var bj=qx.ui.layout.Util;
var br=this.__lT;
var bf=0,bi=0,bh=0;
var bd=0,bk=0;
var bo,be,bq;
for(var i=0,l=br.length;i<l;i+=1){bo=br[i];
be=bo.getSizeHint();
bi+=be.height;
var bn=this.__lR[i];
var bg=this.__lQ[i];

if(bn){bf+=be.minHeight;
}else if(bg){bh=Math.max(bh,Math.round(be.minHeight/bg));
}else{bf+=be.height;
}bq=bo.getMarginLeft()+bo.getMarginRight();
if((be.width+bq)>bk){bk=be.width+bq;
}if((be.minWidth+bq)>bd){bd=be.minWidth+bq;
}}bf+=bh;
var bm=this.getSpacing();
var bp=this.getSeparator();

if(bp){var bl=bj.computeVerticalSeparatorGaps(br,bm,bp);
}else{var bl=bj.computeVerticalGaps(br,bm,true);
}return {minHeight:bf+bl,height:bi+bl,minWidth:bd,width:bk};
}},destruct:function(){this.__lQ=this.__lR=this.__lT=null;
}});
})();
(function(){var k="slider",j="splitter",i="horizontal",h="px",g="vertical",f="knob",d="mousedown",c="mouseout",b="Integer",a="height",D="mousemove",C="move",B="maxHeight",A="resize",z="width",w="_applyOrientation",v="_applyOffset",u="splitpane",t="qx.ui.splitpane.Pane",s="top",q="minHeight",r="mouseup",o="minWidth",p="appear",m="losecapture",n="left",l="maxWidth";
qx.Class.define(t,{extend:qx.ui.core.Widget,construct:function(E){qx.ui.core.Widget.call(this);
this.__mg=[];
if(E){this.setOrientation(E);
}else{this.initOrientation();
}this.__mo.addListener(d,this._onMouseDown,this);
this.__mo.addListener(r,this._onMouseUp,this);
this.__mo.addListener(D,this._onMouseMove,this);
this.__mo.addListener(c,this._onMouseOut,this);
this.__mo.addListener(m,this._onMouseUp,this);
},properties:{appearance:{refine:true,init:u},offset:{check:b,init:6,apply:v},orientation:{init:i,check:[i,g],apply:w}},members:{__mh:null,__mi:false,__mj:null,__mk:null,__ml:null,__mm:null,__mn:null,__mg:null,__mo:null,_createChildControlImpl:function(F,G){var H;

switch(F){case k:H=new qx.ui.splitpane.Slider(this);
H.exclude();
this._add(H,{type:F});
break;
case j:H=new qx.ui.splitpane.Splitter(this);
this._add(H,{type:F});
H.addListener(C,this.__mp,this);
break;
}return H||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,F);
},__mp:function(e){this.__mr(e.getData());
},__mq:function(I){this.__mo=new qx.ui.splitpane.Blocker(I);
this.getContentElement().add(this.__mo);
var J=this.getChildControl(j);
var K=J.getWidth();

if(!K){J.addListenerOnce(p,function(){this.__mr();
},this);
}J.addListener(A,function(e){var L=e.getData();

if(L.height==0||L.width==0){this.__mo.hide();
}else{this.__mo.show();
}},this);
},getBlocker:function(){return this.__mo;
},_applyOrientation:function(M,N){var O=this.getChildControl(k);
var R=this.getChildControl(j);
this.__ml=M===i;

if(!this.__mo){this.__mq(M);
}this.__mo.setOrientation(M);
var Q=this._getLayout();

if(Q){Q.dispose();
}var P=M===g?new qx.ui.splitpane.VLayout:new qx.ui.splitpane.HLayout;
this._setLayout(P);
R.removeState(N);
R.addState(M);
R.getChildControl(f).removeState(N);
R.getChildControl(f).addState(M);
O.removeState(N);
O.addState(M);
qx.ui.core.queue.Manager.flush();
this.__mr();
},_applyOffset:function(S,T){this.__mr();
},__mr:function(U){var V=this.getChildControl(j);
var ba=this.getOffset();
var bb=V.getBounds();
var Y=V.getContainerElement().getDomElement();
if(!Y){return;
}if(this.__ml){var X=null;

if(U){X=U.width;
}else if(bb){X=bb.width;
}var bc=U&&U.left;

if(X){if(!bc){bc=qx.bom.element.Location.getPosition(Y).left;
}this.__mo.setWidth(ba,X);
this.__mo.setLeft(ba,bc);
}}else{var W=null;

if(U){W=U.height;
}else if(bb){W=bb.height;
}var top=U&&U.top;

if(W){if(!top){top=qx.bom.element.Location.getPosition(Y).top;
}this.__mo.setHeight(ba,W);
this.__mo.setTop(ba,top);
}}},add:function(bd,be){if(be==null){this._add(bd);
}else{this._add(bd,{flex:be});
}this.__mg.push(bd);
},remove:function(bf){this._remove(bf);
qx.lang.Array.remove(this.__mg,bf);
},getChildren:function(){return this.__mg;
},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}var bg=this.getChildControl(j);
var bi=bg.getContainerLocation();
var bh=this.getContentLocation();
this.__mh=this.__ml?e.getDocumentLeft()-bi.left+bh.left:e.getDocumentTop()-bi.top+bh.top;
var bk=this.getChildControl(k);
var bj=bg.getBounds();
bk.setUserBounds(bj.left,bj.top,bj.width,bj.height);
bk.setZIndex(bg.getZIndex()+1);
bk.show();
this.__mi=true;
this.__mo.capture();
e.stop();
},_onMouseMove:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
if(this.__mi){this.__ms();
var bl=this.getChildControl(k);
var bm=this.__mm;

if(this.__ml){bl.setDomLeft(bm);
this.__mo.setStyle(n,(bm-this.getOffset())+h);
}else{bl.setDomTop(bm);
this.__mo.setStyle(s,(bm-this.getOffset())+h);
}e.stop();
}},_onMouseOut:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
},_onMouseUp:function(e){if(!this.__mi){return;
}this._finalizeSizes();
var bn=this.getChildControl(k);
bn.exclude();
this.__mi=false;
this.releaseCapture();
e.stop();
},_finalizeSizes:function(){var br=this.__mm;
var bo=this.__mn;

if(br==null){return;
}var bt=this._getChildren();
var bs=bt[2];
var bp=bt[3];
var bq=bs.getLayoutProperties().flex;
var bu=bp.getLayoutProperties().flex;
if((bq!=0)&&(bu!=0)){bs.setLayoutProperties({flex:br});
bp.setLayoutProperties({flex:bo});
}else{if(this.__ml){bs.setWidth(br);
bp.setWidth(bo);
}else{bs.setHeight(br);
bp.setHeight(bo);
}}},__ms:function(){if(this.__ml){var bx=o,bE=z,by=l,bC=this.__mj;
}else{var bx=q,bE=a,by=B,bC=this.__mk;
}var bD=this._getChildren();
var bv=bD[2].getSizeHint();
var bA=bD[3].getSizeHint();
var bB=bD[2].getBounds()[bE]+bD[3].getBounds()[bE];
var bz=bC-this.__mh;
var bw=bB-bz;
if(bz<bv[bx]){bw-=bv[bx]-bz;
bz=bv[bx];
}else if(bw<bA[bx]){bz-=bA[bx]-bw;
bw=bA[bx];
}if(bz>bv[by]){bw+=bz-bv[by];
bz=bv[by];
}else if(bw>bA[by]){bz+=bw-bA[by];
bw=bA[by];
}this.__mm=bz;
this.__mn=bw;
},_isActiveDragSession:function(){return this.__mi;
},_setLastMousePosition:function(x,y){this.__mj=x;
this.__mk=y;
}},destruct:function(){this.__mg=null;
}});
})();
(function(){var a="qx.ui.splitpane.Slider";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var e="center",d="knob",c="middle",b="qx.ui.splitpane.Splitter",a="vertical";
qx.Class.define(b,{extend:qx.ui.core.Widget,construct:function(f){qx.ui.core.Widget.call(this);
if(f.getOrientation()==a){this._setLayout(new qx.ui.layout.HBox(0,e));
this._getLayout().setAlignY(c);
}else{this._setLayout(new qx.ui.layout.VBox(0,c));
this._getLayout().setAlignX(e);
}this._createChildControl(d);
},properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_createChildControlImpl:function(g,h){var i;

switch(g){case d:i=new qx.ui.basic.Image;
this._add(i);
break;
}return i||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var s="_applyLayoutChange",r="left",q="width",p="center",o="top",n="Decorator",m="middle",k="_applyReversed",j="qx.debug",h="bottom",c="' is not supported by the HBox layout!",g="Boolean",f="flex",b="right",a="Integer",e="The property '",d="qx.ui.layout.HBox";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,construct:function(t,u,v){qx.ui.layout.Abstract.call(this);

if(t){this.setSpacing(t);
}
if(u){this.setAlignX(u);
}
if(v){this.setSeparator(v);
}},properties:{alignX:{check:[r,p,b],init:r,apply:s},alignY:{check:[o,m,h],init:o,apply:s},spacing:{check:a,init:0,apply:s},separator:{check:n,nullable:true,apply:s},reversed:{check:g,init:false,apply:k}},members:{__mt:null,__mu:null,__mv:null,__mw:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__mx:function(){var B=this._getLayoutChildren();
var length=B.length;
var y=false;
var w=this.__mt&&this.__mt.length!=length&&this.__mu&&this.__mt;
var z;
var x=w?this.__mt:new Array(length);
var A=w?this.__mu:new Array(length);
if(this.getReversed()){B=B.concat().reverse();
}for(var i=0;i<length;i++){z=B[i].getLayoutProperties();

if(z.width!=null){x[i]=parseFloat(z.width)/100;
}
if(z.flex!=null){A[i]=z.flex;
y=true;
}else{A[i]=0;
}}if(!w){this.__mt=x;
this.__mu=A;
}this.__mv=y;
this.__mw=B;
delete this._invalidChildrenCache;
},verifyLayoutProperty:qx.core.Variant.select(j,{"on":function(C,name,D){this.assert(name===f||name===q,e+name+c);

if(name==q){this.assertMatch(D,qx.ui.layout.Util.PERCENT_VALUE);
}else{this.assertNumber(D);
this.assert(D>=0);
}},"off":null}),renderLayout:function(E,F){if(this._invalidChildrenCache){this.__mx();
}var L=this.__mw;
var length=L.length;
var U=qx.ui.layout.Util;
var T=this.getSpacing();
var X=this.getSeparator();

if(X){var I=U.computeHorizontalSeparatorGaps(L,T,X);
}else{var I=U.computeHorizontalGaps(L,T,true);
}var i,G,R,Q;
var W=[];
var M=I;

for(i=0;i<length;i+=1){Q=this.__mt[i];
R=Q!=null?Math.floor((E-I)*Q):L[i].getSizeHint().width;
W.push(R);
M+=R;
}if(this.__mv&&M!=E){var O={};
var S,V;

for(i=0;i<length;i+=1){S=this.__mu[i];

if(S>0){N=L[i].getSizeHint();
O[i]={min:N.minWidth,value:W[i],max:N.maxWidth,flex:S};
}}var J=U.computeFlexOffsets(O,E,M);

for(i in J){V=J[i].offset;
W[i]+=V;
M+=V;
}}var bc=L[0].getMarginLeft();
if(M<E&&this.getAlignX()!=r){bc=E-M;

if(this.getAlignX()===p){bc=Math.round(bc/2);
}}var N,top,H,R,K,ba,P;
var T=this.getSpacing();
this._clearSeparators();
if(X){var Y=qx.theme.manager.Decoration.getInstance().resolve(X).getInsets();
var bb=Y.left+Y.right;
}for(i=0;i<length;i+=1){G=L[i];
R=W[i];
N=G.getSizeHint();
ba=G.getMarginTop();
P=G.getMarginBottom();
H=Math.max(N.minHeight,Math.min(F-ba-P,N.maxHeight));
top=U.computeVerticalAlignOffset(G.getAlignY()||this.getAlignY(),H,F,ba,P);
if(i>0){if(X){bc+=K+T;
this._renderSeparator(X,{left:bc,top:0,width:bb,height:F});
bc+=bb+T+G.getMarginLeft();
}else{bc+=U.collapseMargins(T,K,G.getMarginLeft());
}}G.renderLayout(bc,top,R,H);
bc+=R;
K=G.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__mx();
}var bj=qx.ui.layout.Util;
var br=this.__mw;
var bd=0,bk=0,bh=0;
var bg=0,bi=0;
var bo,be,bq;
for(var i=0,l=br.length;i<l;i+=1){bo=br[i];
be=bo.getSizeHint();
bk+=be.width;
var bn=this.__mu[i];
var bf=this.__mt[i];

if(bn){bd+=be.minWidth;
}else if(bf){bh=Math.max(bh,Math.round(be.minWidth/bf));
}else{bd+=be.width;
}bq=bo.getMarginTop()+bo.getMarginBottom();
if((be.height+bq)>bi){bi=be.height+bq;
}if((be.minHeight+bq)>bg){bg=be.minHeight+bq;
}}bd+=bh;
var bm=this.getSpacing();
var bp=this.getSeparator();

if(bp){var bl=bj.computeHorizontalSeparatorGaps(br,bm,bp);
}else{var bl=bj.computeHorizontalGaps(br,bm,true);
}return {minWidth:bd+bl,width:bk+bl,minHeight:bg,height:bi};
}},destruct:function(){this.__mt=this.__mu=this.__mw=null;
}});
})();
(function(){var o="px",n="horizontal",m="top",l="height",k="width",j="left",i="100%",h="cursor",g="vertical",f="_applyOrientation",c="qx.ui.splitpane.Blocker",e="col-resize",d="row-resize",b="div",a="absolute";
qx.Class.define(c,{extend:qx.html.Element,construct:function(p){var q={position:a,zIndex:11};
qx.html.Element.call(this,b,q);
if(p){this.setOrientation(p);
}else{this.initOrientation();
}},properties:{orientation:{init:n,check:[n,g],apply:f}},members:{_applyOrientation:function(r,s){if(r==n){this.setStyle(l,i);
this.setStyle(h,e);
this.setStyle(m,null);
}else{this.setStyle(k,i);
this.setStyle(j,null);
this.setStyle(h,d);
}},setWidth:function(t,u){var v=u+2*t;
this.setStyle(k,v+o);
},setHeight:function(w,x){var y=x+2*w;
this.setStyle(l,y+o);
},setLeft:function(z,A){var B=A-z;
this.setStyle(j,B+o);
},setTop:function(C,D){var top=D-C;
this.setStyle(m,top+o);
}}});
})();
(function(){var h="slider",g="type",f="flex",e="splitter",d="qx.ui.splitpane.VLayout",c="qx.debug",b="' is not supported by the split layout!",a="The property '";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(c,{"on":function(j,name,k){this.assert(name===g||name===f,a+name+b);

if(name==f){this.assertNumber(k);
}
if(name==g){this.assertString(k);
}},"off":null}),renderLayout:function(l,m){var C=this._getLayoutChildren();
var length=C.length;
var y,B;
var o,n,w,p;

for(var i=0;i<length;i++){y=C[i];
B=y.getLayoutProperties().type;

if(B===e){n=y;
}else if(B===h){w=y;
}else if(!o){o=y;
}else{p=y;
}}
if(o&&p){var E=o.getLayoutProperties().flex;
var r=p.getLayoutProperties().flex;

if(E==null){E=1;
}
if(r==null){r=1;
}var D=o.getSizeHint();
var u=n.getSizeHint();
var v=p.getSizeHint();
var q=D.height;
var z=u.height;
var A=v.height;

if(E>0&&r>0){var s=E+r;
var t=m-z;
var q=Math.round((t/s)*E);
var A=t-q;
var x=qx.ui.layout.Util.arrangeIdeals(D.minHeight,q,D.maxHeight,v.minHeight,A,v.maxHeight);
q=x.begin;
A=x.end;
}else if(E>0){q=m-z-A;

if(q<D.minHeight){q=D.minHeight;
}
if(q>D.maxHeight){q=D.maxHeight;
}}else if(r>0){A=m-q-z;

if(A<v.minHeight){A=v.minHeight;
}
if(A>v.maxHeight){A=v.maxHeight;
}}o.renderLayout(0,0,l,q);
n.renderLayout(0,q,l,z);
p.renderLayout(0,q+z,l,A);
}else{n.renderLayout(0,0,0,0);
if(o){o.renderLayout(0,0,l,m);
}else if(p){p.renderLayout(0,0,l,m);
}}},_computeSizeHint:function(){var O=this._getLayoutChildren();
var length=O.length;
var H,G,N;
var I=0,K=0,J=0;
var L=0,M=0,F=0;

for(var i=0;i<length;i++){H=O[i];
N=H.getLayoutProperties();
if(N.type===h){continue;
}G=H.getSizeHint();
I+=G.minHeight;
K+=G.height;
J+=G.maxHeight;

if(G.minWidth>L){L=G.minWidth;
}
if(G.width>M){M=G.width;
}
if(G.maxWidth>F){F=G.maxWidth;
}}return {minHeight:I,height:K,maxHeight:J,minWidth:L,width:M,maxWidth:F};
}}});
})();
(function(){var h="slider",g="type",f="flex",e="splitter",d="qx.ui.splitpane.HLayout",c="' is not supported by the split layout!",b="The property '",a="qx.debug";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(a,{"on":function(j,name,k){this.assert(name===g||name===f,b+name+c);

if(name==f){this.assertNumber(k);
}
if(name==g){this.assertString(k);
}},"off":null}),renderLayout:function(l,m){var C=this._getLayoutChildren();
var length=C.length;
var z,B;
var o,n,w,p;

for(var i=0;i<length;i++){z=C[i];
B=z.getLayoutProperties().type;

if(B===e){n=z;
}else if(B===h){w=z;
}else if(!o){o=z;
}else{p=z;
}}
if(o&&p){var E=o.getLayoutProperties().flex;
var q=p.getLayoutProperties().flex;

if(E==null){E=1;
}
if(q==null){q=1;
}var D=o.getSizeHint();
var t=n.getSizeHint();
var v=p.getSizeHint();
var A=D.width;
var y=t.width;
var x=v.width;

if(E>0&&q>0){var r=E+q;
var s=l-y;
var A=Math.round((s/r)*E);
var x=s-A;
var u=qx.ui.layout.Util.arrangeIdeals(D.minWidth,A,D.maxWidth,v.minWidth,x,v.maxWidth);
A=u.begin;
x=u.end;
}else if(E>0){A=l-y-x;

if(A<D.minWidth){A=D.minWidth;
}
if(A>D.maxWidth){A=D.maxWidth;
}}else if(q>0){x=l-A-y;

if(x<v.minWidth){x=v.minWidth;
}
if(x>v.maxWidth){x=v.maxWidth;
}}o.renderLayout(0,0,A,m);
n.renderLayout(A,0,y,m);
p.renderLayout(A+y,0,x,m);
}else{n.renderLayout(0,0,0,0);
if(o){o.renderLayout(0,0,l,m);
}else if(p){p.renderLayout(0,0,l,m);
}}},_computeSizeHint:function(){var O=this._getLayoutChildren();
var length=O.length;
var H,G,N;
var L=0,M=0,F=0;
var I=0,K=0,J=0;

for(var i=0;i<length;i++){H=O[i];
N=H.getLayoutProperties();
if(N.type===h){continue;
}G=H.getSizeHint();
L+=G.minWidth;
M+=G.width;
F+=G.maxWidth;

if(G.minHeight>I){I=G.minHeight;
}
if(G.height>K){K=G.height;
}
if(G.maxHeight>J){J=G.maxHeight;
}}return {minWidth:L,width:M,maxWidth:F,minHeight:I,height:K,maxHeight:J};
}}});
})();
(function(){var m="qx.dynlocale",l="Boolean",k="changeLocale",j="changeInvalidMessage",i="on",h="String",g="invalid",f="",d="qx.ui.form.MForm",c="_applyValid",a="changeRequired",b="changeValid";
qx.Mixin.define(d,{construct:function(){if(qx.core.Variant.isSet(m,i)){qx.locale.Manager.getInstance().addListener(k,this.__nf,this);
}},properties:{valid:{check:l,init:true,apply:c,event:b},required:{check:l,init:false,event:a},invalidMessage:{check:h,init:f,event:j},requiredInvalidMessage:{check:h,nullable:true,event:j}},members:{_applyValid:function(n,o){n?this.removeState(g):this.addState(g);
},__nf:qx.core.Variant.select(m,{"on":function(e){var p=this.getInvalidMessage();

if(p&&p.translate){this.setInvalidMessage(p.translate());
}var q=this.getRequiredInvalidMessage();

if(q&&q.translate){this.setRequiredInvalidMessage(q.translate());
}},"off":null})},destruct:function(){if(qx.core.Variant.isSet(m,i)){qx.locale.Manager.getInstance().removeListener(k,this.__nf,this);
}}});
})();
(function(){var k="showingPlaceholder",j="",i="none",h="qx.dynlocale",g="Boolean",f="qx.client",d="color",c="qx.event.type.Data",b="readonly",a="placeholder",bc="input",bb="focusin",ba="visibility",Y="focusout",X="changeLocale",W="hidden",V="on",U="absolute",T="readOnly",S="text",r="_applyTextAlign",s="px",p="RegExp",q=")",n="syncAppearance",o="changeValue",l="A",m="change",v="textAlign",w="focused",E="center",C="visible",K="disabled",G="url(",O="off",M="String",y="resize",R="qx.ui.form.AbstractField",Q="transparent",P="spellcheck",x="false",A="right",B="PositiveInteger",D="mshtml",F="abstract",H="block",L="webkit",N="_applyReadOnly",t="_applyPlaceholder",u="left",z="qx/static/blank.gif",J="text-placeholder",I="changeReadOnly";
qx.Class.define(R,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm,qx.ui.form.IForm],include:[qx.ui.form.MForm],type:F,construct:function(bd){qx.ui.core.Widget.call(this);
this.__ng=!qx.bom.client.Feature.PLACEHOLDER;

if(bd!=null){this.setValue(bd);
}this.getContentElement().addListener(m,this._onChangeContent,this);
if(this.__ng){this.addListener(n,this._syncPlaceholder,this);
}if(qx.core.Variant.isSet(h,V)){qx.locale.Manager.getInstance().addListener(X,this._onChangeLocale,this);
}},events:{"input":c,"changeValue":c},properties:{textAlign:{check:[u,E,A],nullable:true,themeable:true,apply:r},readOnly:{check:g,apply:N,event:I,init:false},selectable:{refine:true,init:true},focusable:{refine:true,init:true},maxLength:{check:B,init:Infinity},liveUpdate:{check:g,init:false},placeholder:{check:M,nullable:true,apply:t},filter:{check:p,nullable:true,init:null}},members:{__nh:true,__ni:null,__nj:null,__nk:null,__ng:true,getFocusElement:function(){var be=this.getContentElement();

if(be){return be;
}},_createInputElement:function(){return new qx.html.Input(S);
},renderLayout:function(bf,top,bg,bh){var bi=this._updateInsets;
var bm=qx.ui.core.Widget.prototype.renderLayout.call(this,bf,top,bg,bh);
if(!bm){return;
}var bk=bm.size||bi;
var bn=s;

if(bk||bm.local||bm.margin){var bj=this.getInsets();
var innerWidth=bg-bj.left-bj.right;
var innerHeight=bh-bj.top-bj.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var bl=this.getContentElement();
if(bi&&this.__ng){this.__nn().setStyles({"left":bj.left+bn,"top":bj.top+bn});
}
if(bk){if(this.__ng){this.__nn().setStyles({"width":innerWidth+bn,"height":innerHeight+bn});
}bl.setStyles({"width":innerWidth+bn,"height":innerHeight+bn});
this._renderContentElement(innerHeight,bl);
}},_renderContentElement:function(innerHeight,bo){},_createContentElement:function(){var bp=this._createInputElement();
bp.setStyles({"border":i,"padding":0,"margin":0,"display":H,"background":Q,"outline":i,"appearance":i,"position":U,"autoComplete":O});
bp.setSelectable(this.getSelectable());
bp.setEnabled(this.getEnabled());
bp.addListener(bc,this._onHtmlInput,this);
bp.setAttribute(P,x);
if(qx.core.Variant.isSet(f,L)){bp.setStyle(y,i);
}if(qx.core.Variant.isSet(f,D)){bp.setStyles({backgroundImage:G+qx.util.ResourceManager.getInstance().toUri(z)+q});
}return bp;
},_applyEnabled:function(bq,br){qx.ui.core.Widget.prototype._applyEnabled.call(this,bq,br);
this.getContentElement().setEnabled(bq);

if(this.__ng){if(bq){this._showPlaceholder();
}else{this._removePlaceholder();
}}else{var bs=this.getContentElement();
bs.setAttribute(a,bq?this.getPlaceholder():j);
}},__nl:{width:16,height:16},_getContentHint:function(){return {width:this.__nl.width*10,height:this.__nl.height||16};
},_applyFont:function(bt,bu){var bv;

if(bt){var bw=qx.theme.manager.Font.getInstance().resolve(bt);
bv=bw.getStyles();
}else{bv=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(bv);
if(this.__ng){this.__nn().setStyles(bv);
}if(bt){this.__nl=qx.bom.Label.getTextSize(l,bv);
}else{delete this.__nl;
}qx.ui.core.queue.Layout.add(this);
},_applyTextColor:function(bx,by){if(bx){this.getContentElement().setStyle(d,qx.theme.manager.Color.getInstance().resolve(bx));
}else{this.getContentElement().removeStyle(d);
}},tabFocus:function(){qx.ui.core.Widget.prototype.tabFocus.call(this);
this.selectAllText();
},_getTextSize:function(){return this.__nl;
},_onHtmlInput:function(e){var bC=e.getData();
var bB=true;
this.__nh=false;
if(this.getFilter()!=null){var bD=j;
var bz=bC.search(this.getFilter());
var bA=bC;

while(bz>=0){bD=bD+(bA.charAt(bz));
bA=bA.substring(bz+1,bA.length);
bz=bA.search(this.getFilter());
}
if(bD!=bC){bB=false;
bC=bD;
this.getContentElement().setValue(bC);
}}if(bC.length>this.getMaxLength()){var bB=false;
this.getContentElement().setValue(bC.substr(0,this.getMaxLength()));
}if(bB){this.fireDataEvent(bc,bC,this.__nk);
this.__nk=bC;
if(this.getLiveUpdate()){this.__nm(bC);
}}},__nm:function(bE){var bF=this.__nj;
this.__nj=bE;

if(bF!=bE){this.fireNonBubblingEvent(o,qx.event.type.Data,[bE,bF]);
}},setValue:function(bG){if(bG===null){if(this.__nh){return bG;
}bG=j;
this.__nh=true;
}else{this.__nh=false;
if(this.__ng){this._removePlaceholder();
}}
if(qx.lang.Type.isString(bG)){var bI=this.getContentElement();

if(bG.length>this.getMaxLength()){bG=bG.substr(0,this.getMaxLength());
}
if(bI.getValue()!=bG){var bJ=bI.getValue();
bI.setValue(bG);
var bH=this.__nh?null:bG;
this.__nj=bJ;
this.__nm(bH);
}if(this.__ng){this._showPlaceholder();
}return bG;
}throw new Error("Invalid value type: "+bG);
},getValue:function(){var bK=this.getContentElement().getValue();
return this.__nh?null:bK;
},resetValue:function(){this.setValue(null);
},_onChangeContent:function(e){this.__nh=e.getData()===null;
this.__nm(e.getData());
},getTextSelection:function(){return this.getContentElement().getTextSelection();
},getTextSelectionLength:function(){return this.getContentElement().getTextSelectionLength();
},getTextSelectionStart:function(){return this.getContentElement().getTextSelectionStart();
},getTextSelectionEnd:function(){return this.getContentElement().getTextSelectionEnd();
},setTextSelection:function(bL,bM){this.getContentElement().setTextSelection(bL,bM);
},clearTextSelection:function(){this.getContentElement().clearTextSelection();
},selectAllText:function(){this.setTextSelection(0);
},_showPlaceholder:function(){var bO=this.getValue()||j;
var bN=this.getPlaceholder();

if(bN!=null&&bO==j&&!this.hasState(w)&&!this.hasState(K)){if(this.hasState(k)){this._syncPlaceholder();
}else{this.addState(k);
}}},_removePlaceholder:function(){if(this.hasState(k)){this.__nn().setStyle(ba,W);
this.removeState(k);
}},_syncPlaceholder:function(){if(this.hasState(k)){this.__nn().setStyle(ba,C);
}},__nn:function(){if(this.__ni==null){this.__ni=new qx.html.Label();
var bP=qx.theme.manager.Color.getInstance();
this.__ni.setStyles({"visibility":W,"zIndex":6,"position":U,"color":bP.resolve(J)});
this.getContainerElement().add(this.__ni);
}return this.__ni;
},_onChangeLocale:qx.core.Variant.select(h,{"on":function(e){var content=this.getPlaceholder();

if(content&&content.translate){this.setPlaceholder(content.translate());
}},"off":null}),_applyPlaceholder:function(bQ,bR){if(this.__ng){this.__nn().setValue(bQ);

if(bQ!=null){this.addListener(bb,this._removePlaceholder,this);
this.addListener(Y,this._showPlaceholder,this);
this._showPlaceholder();
}else{this.removeListener(bb,this._removePlaceholder,this);
this.removeListener(Y,this._showPlaceholder,this);
this._removePlaceholder();
}}else{if(this.getEnabled()){this.getContentElement().setAttribute(a,bQ);
}}},_applyTextAlign:function(bS,bT){this.getContentElement().setStyle(v,bS);
},_applyReadOnly:function(bU,bV){var bW=this.getContentElement();
bW.setAttribute(T,bU);

if(bU){this.addState(b);
this.setFocusable(false);
}else{this.removeState(b);
this.setFocusable(true);
}}},destruct:function(){this.__ni=null;

if(qx.core.Variant.isSet(h,V)){qx.locale.Manager.getInstance().removeListener(X,this._onChangeLocale,this);
}}});
})();
(function(){var b="qx.ui.form.TextField",a="textfield";
qx.Class.define(b,{extend:qx.ui.form.AbstractField,properties:{appearance:{refine:true,init:a},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_renderContentElement:function(innerHeight,c){}}});
})();
(function(){var k="wrap",j="value",i="textarea",h="none",g="qx.client",f="",e="input",d="qx.html.Input",c="select",b="disabled",a="read-only";
qx.Class.define(d,{extend:qx.html.Element,construct:function(l,m,n){if(l===c||l===i){var o=l;
}else{o=e;
}qx.html.Element.call(this,o,m,n);
this.__no=l;
},members:{__no:null,__np:null,__nq:null,_createDomElement:function(){return qx.bom.Input.create(this.__no);
},_applyProperty:function(name,p){qx.html.Element.prototype._applyProperty.call(this,name,p);
var q=this.getDomElement();

if(name===j){qx.bom.Input.setValue(q,p);
}else if(name===k){qx.bom.Input.setWrap(q,p);
}},setEnabled:qx.core.Variant.select(g,{"webkit":function(r){this.__nq=r;

if(!r){this.setStyles({"userModify":a,"userSelect":h});
}else{this.setStyles({"userModify":null,"userSelect":this.__np?null:h});
}},"default":function(s){this.setAttribute(b,s===false);
}}),setSelectable:qx.core.Variant.select(g,{"webkit":function(t){this.__np=t;
qx.html.Element.prototype.setSelectable.call(this,this.__nq&&t);
},"default":function(u){qx.html.Element.prototype.setSelectable.call(this,u);
}}),setValue:function(v){var w=this.getDomElement();

if(w){if(w.value!=v){qx.bom.Input.setValue(w,v);
}}else{this._setProperty(j,v);
}return this;
},getValue:function(){var x=this.getDomElement();

if(x){return qx.bom.Input.getValue(x);
}return this._getProperty(j)||f;
},setWrap:function(y){if(this.__no===i){this._setProperty(k,y);
}else{throw new Error("Text wrapping is only support by textareas!");
}return this;
},getWrap:function(){if(this.__no===i){return this._getProperty(k);
}else{throw new Error("Text wrapping is only support by textareas!");
}}}});
})();
(function(){var w="change",v="input",u="qx.client",t="text",s="password",r="checkbox",q="radio",p="textarea",n="keypress",m="opera",d="propertychange",k="blur",h="keydown",c="keyup",b="select-multiple",g="checked",f="value",j="select",a="qx.event.handler.Input";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);
this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);
this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);
this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);
if(qx.core.Variant.isSet(u,m)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);
this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);
this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);
}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__nr:false,__ns:null,__nt:null,canHandleEvent:function(x,y){var z=x.tagName.toLowerCase();

if(y===v&&(z===v||z===p)){return true;
}
if(y===w&&(z===v||z===p||z===j)){return true;
}return false;
},registerEvent:qx.core.Variant.select(u,{"mshtml":function(A,B,C){if(!A.__nu){var D=A.tagName.toLowerCase();
var E=A.type;

if(E===t||E===s||D===p||E===r||E===q){qx.bom.Event.addNativeListener(A,d,this._onPropertyWrapper);
}
if(E!==r&&E!==q){qx.bom.Event.addNativeListener(A,w,this._onChangeValueWrapper);
}
if(E===t||E===s){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,A);
qx.bom.Event.addNativeListener(A,n,this._onKeyPressWrapped);
}A.__nu=true;
}},"default":function(F,G,H){if(G===v){this.__nv(F);
}else if(G===w){if(F.type===q||F.type===r){qx.bom.Event.addNativeListener(F,w,this._onChangeCheckedWrapper);
}else{qx.bom.Event.addNativeListener(F,w,this._onChangeValueWrapper);
}if(qx.core.Variant.isSet(u,m)){if(F.type===t||F.type===s){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,F);
qx.bom.Event.addNativeListener(F,n,this._onKeyPressWrapped);
}}}}}),__nv:qx.core.Variant.select(u,{"mshtml":null,"webkit":function(I){var J=I.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&J==p){qx.bom.Event.addNativeListener(I,n,this._onInputWrapper);
}qx.bom.Event.addNativeListener(I,v,this._onInputWrapper);
},"opera":function(K){qx.bom.Event.addNativeListener(K,c,this._onKeyUpWrapper);
qx.bom.Event.addNativeListener(K,h,this._onKeyDownWrapper);
qx.bom.Event.addNativeListener(K,k,this._onBlurWrapper);
qx.bom.Event.addNativeListener(K,v,this._onInputWrapper);
},"default":function(L){qx.bom.Event.addNativeListener(L,v,this._onInputWrapper);
}}),unregisterEvent:qx.core.Variant.select(u,{"mshtml":function(M,N){if(M.__nu){var O=M.tagName.toLowerCase();
var P=M.type;

if(P===t||P===s||O===p||P===r||P===q){qx.bom.Event.removeNativeListener(M,d,this._onPropertyWrapper);
}
if(P!==r&&P!==q){qx.bom.Event.removeNativeListener(M,w,this._onChangeValueWrapper);
}
if(P===t||P===s){qx.bom.Event.removeNativeListener(M,n,this._onKeyPressWrapped);
}
try{delete M.__nu;
}catch(Q){M.__nu=null;
}}},"default":function(R,S){if(S===v){this.__nv(R);
}else if(S===w){if(R.type===q||R.type===r){qx.bom.Event.removeNativeListener(R,w,this._onChangeCheckedWrapper);
}else{qx.bom.Event.removeNativeListener(R,w,this._onChangeValueWrapper);
}}
if(qx.core.Variant.isSet(u,m)){if(R.type===t||R.type===s){qx.bom.Event.removeNativeListener(R,n,this._onKeyPressWrapped);
}}}}),__nw:qx.core.Variant.select(u,{"mshtml":null,"webkit":function(T){var U=T.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&U==p){qx.bom.Event.removeNativeListener(T,n,this._onInputWrapper);
}qx.bom.Event.removeNativeListener(T,v,this._onInputWrapper);
},"opera":function(V){qx.bom.Event.removeNativeListener(V,c,this._onKeyUpWrapper);
qx.bom.Event.removeNativeListener(V,h,this._onKeyDownWrapper);
qx.bom.Event.removeNativeListener(V,k,this._onBlurWrapper);
qx.bom.Event.removeNativeListener(V,v,this._onInputWrapper);
},"default":function(W){qx.bom.Event.removeNativeListener(W,v,this._onInputWrapper);
}}),_onKeyPress:qx.core.Variant.select(u,{"mshtml|opera":function(e,X){if(e.keyCode===13){if(X.value!==this.__nt){this.__nt=X.value;
qx.event.Registration.fireEvent(X,w,qx.event.type.Data,[X.value]);
}}},"default":null}),_onKeyDown:qx.core.Variant.select(u,{"opera":function(e){if(e.keyCode===13){this.__nr=true;
}},"default":null}),_onKeyUp:qx.core.Variant.select(u,{"opera":function(e){if(e.keyCode===13){this.__nr=false;
}},"default":null}),_onBlur:qx.core.Variant.select(u,{"opera":function(e){if(this.__ns){window.clearTimeout(this.__ns);
}},"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var Y=qx.bom.Event.getTarget(e);
if(!this.__nr){if(qx.core.Variant.isSet(u,m)){this.__ns=window.setTimeout(function(){qx.event.Registration.fireEvent(Y,v,qx.event.type.Data,[Y.value]);
},0);
}else{qx.event.Registration.fireEvent(Y,v,qx.event.type.Data,[Y.value]);
}}}),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var bb=qx.bom.Event.getTarget(e);
var ba=bb.value;

if(bb.type===b){var ba=[];

for(var i=0,o=bb.options,l=o.length;i<l;i++){if(o[i].selected){ba.push(o[i].value);
}}}qx.event.Registration.fireEvent(bb,w,qx.event.type.Data,[ba]);
}),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);

if(bc.type===q){if(bc.checked){qx.event.Registration.fireEvent(bc,w,qx.event.type.Data,[bc.value]);
}}else{qx.event.Registration.fireEvent(bc,w,qx.event.type.Data,[bc.checked]);
}}),_onProperty:qx.core.Variant.select(u,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var bd=qx.bom.Event.getTarget(e);
var be=e.propertyName;

if(be===f&&(bd.type===t||bd.type===s||bd.tagName.toLowerCase()===p)){if(!bd.$$inValueSet){qx.event.Registration.fireEvent(bd,v,qx.event.type.Data,[bd.value]);
}}else if(be===g){if(bd.type===r){qx.event.Registration.fireEvent(bd,w,qx.event.type.Data,[bd.checked]);
}else if(bd.checked){qx.event.Registration.fireEvent(bd,w,qx.event.type.Data,[bd.value]);
}}}),"default":function(){}})},defer:function(bf){qx.event.Registration.addHandler(bf);
}});
})();
(function(){var k="",j="select",h="qx.client",g="textarea",f="soft",e="off",d="text",c="Unsupported input type.",b="nowrap",a="radio",y="auto",x="qx.debug",w="input",v="option",u="value",t="number",s="qx.bom.Input",r="normal",q="mshtml",p="wrap",n="checkbox",o="select-one",m="on";
qx.Class.define(s,{statics:{__nx:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(z,A,B){if(qx.core.Variant.isSet(x,m)){qx.core.Assert.assertKeyInMap(z,this.__nx,c);
}var A=A?qx.lang.Object.clone(A):{};
var C;

if(z===g||z===j){C=z;
}else{C=w;
A.type=z;
}return qx.bom.Element.create(C,A,B);
},setValue:function(D,E){var J=D.nodeName.toLowerCase();
var G=D.type;
var Array=qx.lang.Array;
var K=qx.lang.Type;

if(typeof E===t){E+=k;
}
if((G===n||G===a)){if(K.isArray(E)){D.checked=Array.contains(E,D.value);
}else{D.checked=D.value==E;
}}else if(J===j){var F=K.isArray(E);
var L=D.options;
var H,I;

for(var i=0,l=L.length;i<l;i++){H=L[i];
I=H.getAttribute(u);

if(I==null){I=H.text;
}H.selected=F?Array.contains(E,I):E==I;
}
if(F&&E.length==0){D.selectedIndex=-1;
}}else if((G===d||G===g)&&qx.core.Variant.isSet(h,q)){D.$$inValueSet=true;
D.value=E;
D.$$inValueSet=null;
}else{D.value=E;
}},getValue:function(M){var S=M.nodeName.toLowerCase();

if(S===v){return (M.attributes.value||{}).specified?M.value:M.text;
}
if(S===j){var N=M.selectedIndex;
if(N<0){return null;
}var T=[];
var V=M.options;
var U=M.type==o;
var R=qx.bom.Input;
var Q;
for(var i=U?N:0,P=U?N+1:V.length;i<P;i++){var O=V[i];

if(O.selected){Q=R.getValue(O);
if(U){return Q;
}T.push(Q);
}}return T;
}else{return (M.value||k).replace(/\r/g,k);
}},setWrap:qx.core.Variant.select(h,{"mshtml":function(W,X){W.wrap=X?f:e;
},"gecko|webkit":function(Y,ba){var bc=ba?f:e;
var bb=ba?k:y;
Y.setAttribute(p,bc);
Y.style.overflow=bb;
},"default":function(bd,be){bd.style.whiteSpace=be?r:b;
}})}});
})();
(function(){var b="qx.ui.core.ISingleSelection",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeSelection":a},members:{getSelection:function(){return true;
},setSelection:function(c){return arguments.length==1;
},resetSelection:function(){return true;
},isSelected:function(d){return arguments.length==1;
},isSelectionEmpty:function(){return true;
},getSelectables:function(e){return arguments.length==1;
}}});
})();
(function(){var f="qx.ui.core.MSingleSelectionHandling",d="__nC",c="changeSelection",b="changeSelected",a="qx.event.type.Data";
qx.Mixin.define(f,{events:{"changeSelection":a},members:{__nC:null,getSelection:function(){var g=this.__nD().getSelected();

if(g){return [g];
}else{return [];
}},setSelection:function(h){switch(h.length){case 0:this.resetSelection();
break;
case 1:this.__nD().setSelected(h[0]);
break;
default:throw new Error("Could only select one item, but the selection "+" array contains "+h.length+" items!");
}},resetSelection:function(){this.__nD().resetSelected();
},isSelected:function(i){return this.__nD().isSelected(i);
},isSelectionEmpty:function(){return this.__nD().isSelectionEmpty();
},getSelectables:function(j){return this.__nD().getSelectables(j);
},_onChangeSelected:function(e){var l=e.getData();
var k=e.getOldData();
l==null?l=[]:l=[l];
k==null?k=[]:k=[k];
this.fireDataEvent(c,l,k);
},__nD:function(){if(this.__nC==null){var m=this;
this.__nC=new qx.ui.core.SingleSelectionManager({getItems:function(){return m._getItems();
},isItemSelectable:function(n){if(m._isItemSelectable){return m._isItemSelectable(n);
}else{return n.isVisible();
}}});
this.__nC.addListener(b,this._onChangeSelected,this);
}this.__nC.setAllowEmptySelection(this._isAllowEmptySelection());
return this.__nC;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var d="_applyDynamic",c="changeSelection",b="Boolean",a="qx.ui.container.Stack";
qx.Class.define(a,{extend:qx.ui.core.Widget,implement:qx.ui.core.ISingleSelection,include:qx.ui.core.MSingleSelectionHandling,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Grow);
this.addListener(c,this.__ux,this);
},properties:{dynamic:{check:b,init:false,apply:d}},members:{_applyDynamic:function(f){var h=this._getChildren();
var g=this.getSelection()[0];
var j;

for(var i=0,l=h.length;i<l;i++){j=h[i];

if(j!=g){if(f){h[i].exclude();
}else{h[i].hide();
}}}},_getItems:function(){return this.getChildren();
},_isAllowEmptySelection:function(){return true;
},_isItemSelectable:function(k){return true;
},__ux:function(e){var m=e.getOldData()[0];
var n=e.getData()[0];

if(m){if(this.isDynamic()){m.exclude();
}else{m.hide();
}}
if(n){n.show();
}},add:function(o){this._add(o);
var p=this.getSelection()[0];

if(!p){this.setSelection([o]);
}else if(p!==o){if(this.isDynamic()){o.exclude();
}else{o.hide();
}}},remove:function(q){this._remove(q);

if(this.getSelection()[0]===q){var r=this._getChildren()[0];

if(r){this.setSelection([r]);
}else{this.resetSelection();
}}},indexOf:function(s){return this._indexOf(s);
},getChildren:function(){return this._getChildren();
},previous:function(){var v=this.getSelection()[0];
var t=this._indexOf(v)-1;
var w=this._getChildren();

if(t<0){t=w.length-1;
}var u=w[t];
this.setSelection([u]);
},next:function(){var y=this.getSelection()[0];
var x=this._indexOf(y)+1;
var z=this._getChildren();
var A=z[x]||z[0];
this.setSelection([A]);
}}});
})();
(function(){var k="Boolean",j="qx.ui.core.SingleSelectionManager",h="qx.debug",g="Invalid selectionProvider!",f="__nJ",e="__nK",d="changeSelected",c="on",b="__nL",a="qx.event.type.Data";
qx.Class.define(j,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);

if(qx.core.Variant.isSet(h,c)){qx.core.Assert.assertInterface(l,qx.ui.core.ISingleSelectionProvider,g);
}this.__nJ=l;
},events:{"changeSelected":a},properties:{allowEmptySelection:{check:k,init:true,apply:b}},members:{__nK:null,__nJ:null,getSelected:function(){return this.__nK;
},setSelected:function(m){if(!this.__nN(m)){throw new Error("Could not select "+m+", because it is not a child element!");
}this.__nM(m);
},resetSelected:function(){this.__nM(null);
},isSelected:function(n){if(!this.__nN(n)){throw new Error("Could not check if "+n+" is selected,"+" because it is not a child element!");
}return this.__nK===n;
},isSelectionEmpty:function(){return this.__nK==null;
},getSelectables:function(o){var p=this.__nJ.getItems();
var q=[];

for(var i=0;i<p.length;i++){if(this.__nJ.isItemSelectable(p[i])){q.push(p[i]);
}}if(!o){for(var i=q.length-1;i>=0;i--){if(!q[i].getEnabled()){q.splice(i,1);
}}}return q;
},__nL:function(r,s){if(!r){this.__nM(this.__nK);
}},__nM:function(t){var w=this.__nK;
var v=t;

if(v!=null&&w===v){return;
}
if(!this.isAllowEmptySelection()&&v==null){var u=this.getSelectables(true)[0];

if(u){v=u;
}}this.__nK=v;
this.fireDataEvent(d,v,w);
},__nN:function(x){var y=this.__nJ.getItems();

for(var i=0;i<y.length;i++){if(y[i]===x){return true;
}}return false;
}},destruct:function(){if(this.__nJ.toHashCode){this._disposeObjects(f);
}else{this.__nJ=null;
}this._disposeObjects(e);
}});
})();
(function(){var a="qx.ui.core.ISingleSelectionProvider";
qx.Interface.define(a,{members:{getItems:function(){},isItemSelectable:function(b){}}});
})();
(function(){var m="",l='#',k="String",j="request",i="mshtml",h="changeTitle",g="abstract",f="_applyState",e="qx.client",d="changeState",a="qx.bom.History",c="_applyTitle",b="qx.event.type.Data";
qx.Class.define(a,{extend:qx.core.Object,type:g,construct:function(){qx.core.Object.call(this);
this._baseUrl=window.location.href.split(l)[0]+l;
this.__lB={};
this._setInitialState();
},events:{"request":b},statics:{SUPPORTS_HASH_CHANGE_EVENT:(qx.bom.client.Engine.MSHTML&&document.documentMode>=8)||(!qx.bom.client.Engine.MSHTML&&document.documentMode&&"onhashchange" in window),getInstance:function(){if(!this.$$instance){if(this.SUPPORTS_HASH_CHANGE_EVENT){this.$$instance=new qx.bom.NativeHistory();
}else if(qx.core.Variant.isSet(e,i)){this.$$instance=new qx.bom.IframeHistory();
}else{this.$$instance=new qx.bom.NativeHistory();
}}return this.$$instance;
}},properties:{title:{check:k,event:h,nullable:true,apply:c},state:{check:k,event:d,nullable:true,apply:f}},members:{__lB:null,_applyState:function(n,o){this._writeState(n);
},_setInitialState:function(){this.setState(this._readState());
},_encode:function(p){if(qx.lang.Type.isString(p)){return encodeURIComponent(p);
}return m;
},_decode:function(q){if(qx.lang.Type.isString(q)){return decodeURIComponent(q);
}return m;
},_applyTitle:function(r){if(r!=null){document.title=r||m;
}},addToHistory:function(s,t){if(!qx.lang.Type.isString(s)){s=s+m;
}
if(qx.lang.Type.isString(t)){this.setTitle(t);
this.__lB[s]=t;
}
if(this.getState()!==s){this._writeState(s);
}},navigateBack:function(){qx.event.Timer.once(function(){history.back();
},0);
},navigateForward:function(){qx.event.Timer.once(function(){history.forward();
},0);
},_onHistoryLoad:function(u){this.setState(u);
this.fireDataEvent(j,u);

if(this.__lB[u]!=null){this.setTitle(this.__lB[u]);
}},_readState:function(){throw new Error("Abstract method call");
},_writeState:function(){throw new Error("Abstract method call");
},_setHash:function(v){var w=this._baseUrl+(v||m);
var x=window.location;

if(w!=x.href){x.href=w;
}},_getHash:function(){var y=/#(.*)$/.exec(window.location.href);
return y&&y[1]?y[1]:m;
}},destruct:function(){this.__lB=null;
}});
})();
(function(){var d="hashchange",c="interval",b="qx.bom.NativeHistory",a="qx.client";
qx.Class.define(b,{extend:qx.bom.History,construct:function(){qx.bom.History.call(this);
this.__lD();
},members:{__lC:null,__lD:function(){if(qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT){this.__lC=qx.lang.Function.bind(this.__lF,this);
qx.bom.Event.addNativeListener(window,d,this.__lC);
}else{qx.event.Idle.getInstance().addListener(c,this.__lF,this);
}},__lE:function(){if(qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT){qx.bom.Event.removeNativeListener(window,d,this.__lC);
}else{qx.event.Idle.getInstance().removeListener(c,this.__lF,this);
}},__lF:function(){var e=this._readState();

if(qx.lang.Type.isString(e)&&e!=this.getState()){this._onHistoryLoad(e);
}},_readState:function(){return this._decode(this._getHash());
},_writeState:qx.core.Variant.select(a,{"opera":function(f){qx.event.Timer.once(function(){this._setHash(this._encode(f));
},this,0);
},"default":function(g){this._setHash(this._encode(g));
}})},destruct:function(){this.__lE();
}});
})();
(function(){var n="interval",m="-1000px",l="mshtml",k="",j="qx.bom.IframeHistory",i="qx/static/blank.html",h="state",g='<html><body><div id="state">',f='</div></body></html>',d="hidden",a="qx.client",c="undefined",b="absolute";
if(qx.core.Variant.isSet(a,l)){qx.Class.define(j,{extend:qx.bom.History,construct:function(){qx.bom.History.call(this);
this.__lJ();
},members:{__lG:null,__lH:false,__lI:null,_setInitialState:function(){qx.bom.History.prototype._setInitialState.call(this);
this.__lI=this._getHash();
},_setHash:function(o){qx.bom.History.prototype._setHash.call(this,o);
this.__lI=this._encode(o);
},_readState:function(){if(!this.__lH){return this._decode(this._getHash());
}var p=this.__lG.contentWindow.document;
var q=p.getElementById(h);
return q?this._decode(q.innerText):k;
},_writeState:function(r){var r=this._encode(r);
this._setHash(r);
this.__lI=r;

try{var s=this.__lG.contentWindow.document;
s.open();
s.write(g+r+f);
s.close();
}catch(t){}},__lJ:function(){this.__lN(function(){qx.event.Idle.getInstance().addListener(n,this.__lK,this);
});
},__lK:function(e){var v=null;
var u=this._getHash();

if(!this.__lM(u)){v=this.__lL(u);
}else{v=this._readState();
}
if(qx.lang.Type.isString(v)&&v!=this.getState()){this._onHistoryLoad(v);
}},__lL:function(w){w=this._decode(w);
this._writeState(w);
return w;
},__lM:function(x){return qx.lang.Type.isString(x)&&x==this.__lI;
},__lN:function(y){this.__lG=this.__lO();
document.body.appendChild(this.__lG);
this.__lP(function(){this._writeState(this.getState());

if(y){y.call(this);
}},this);
},__lO:function(){var z=qx.bom.Iframe.create({src:qx.util.ResourceManager.getInstance().toUri(i)});
z.style.visibility=d;
z.style.position=b;
z.style.left=m;
z.style.top=m;
return z;
},__lP:function(A,B,C){if(typeof C===c){C=0;
}
if(!this.__lG.contentWindow||!this.__lG.contentWindow.document){if(C>20){throw new Error("can't initialize iframe");
}qx.event.Timer.once(function(){this.__lP(A,B,++C);
},this,10);
return;
}this.__lH=true;
A.call(B||window);
}},destruct:function(){this.__lG=null;
qx.event.Idle.getInstance().addListener(n,this.__lK,this);
}});
}})();
(function(){var c="qx.event.handler.Iframe",b="load",a="iframe";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:qx.event.GlobalError.observeMethod(function(d){qx.event.Registration.fireEvent(d,b);
})},members:{canHandleEvent:function(e,f){return e.tagName.toLowerCase()===a;
},registerEvent:function(g,h,i){},unregisterEvent:function(j,k,l){}},defer:function(m){qx.event.Registration.addHandler(m);
}});
})();
(function(){var e="qx.client",d="webkit",c="body",b="iframe",a="qx.bom.Iframe";
qx.Class.define(a,{statics:{DEFAULT_ATTRIBUTES:{onload:"qx.event.handler.Iframe.onevent(this)",frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:true},create:function(f,g){var f=f?qx.lang.Object.clone(f):{};
var h=qx.bom.Iframe.DEFAULT_ATTRIBUTES;

for(var i in h){if(f[i]==null){f[i]=h[i];
}}return qx.bom.Element.create(b,f,g);
},getWindow:qx.core.Variant.select(e,{"mshtml|gecko":function(j){try{return j.contentWindow;
}catch(k){return null;
}},"default":function(l){try{var m=this.getDocument(l);
return m?m.defaultView:null;
}catch(n){return null;
}}}),getDocument:qx.core.Variant.select(e,{"mshtml":function(o){try{var p=this.getWindow(o);
return p?p.document:null;
}catch(q){return null;
}},"default":function(r){try{return r.contentDocument;
}catch(s){return null;
}}}),getBody:function(t){try{var u=this.getDocument(t);
return u?u.getElementsByTagName(c)[0]:null;
}catch(v){return null;
}},setSource:function(w,x){try{if(this.getWindow(w)&&qx.dom.Hierarchy.isRendered(w)){try{if(qx.core.Variant.isSet(e,d)&&qx.bom.client.Platform.MAC){var y=this.getContentWindow();

if(y){y.stop();
}}this.getWindow(w).location.replace(x);
}catch(z){w.src=x;
}}else{w.src=x;
}}catch(A){qx.log.Logger.warn("Iframe source could not be set!");
}},queryCurrentUrl:function(B){var C=this.getDocument(B);

try{if(C&&C.location){return C.location.href;
}}catch(D){}return null;
}}});
})();
(function(){var o="String",n="execute",m="qx.ui.menu.Menu",l="_shortcut",k="changeEnabled",j="changeToolTipText",i="Boolean",h="qx.ui.core.Command",g="changeLabel",f="changeMenu",c="changeIcon",e="changeValue",d="_applyShortcut",b="_applyEnabled",a="qx.event.type.Data";
qx.Class.define(h,{extend:qx.core.Object,construct:function(p){qx.core.Object.call(this);
this._shortcut=new qx.bom.Shortcut(p);
this._shortcut.addListener(n,this.execute,this);
},events:{"execute":a},properties:{enabled:{init:true,check:i,event:k,apply:b},shortcut:{check:o,apply:d,nullable:true},label:{check:o,nullable:true,event:g},icon:{check:o,nullable:true,event:c},toolTipText:{check:o,nullable:true,event:j},value:{nullable:true,event:e},menu:{check:m,nullable:true,event:f}},members:{_shortcut:null,_applyEnabled:function(q){this._shortcut.setEnabled(q);
},_applyShortcut:function(r){this._shortcut.setShortcut(r);
},execute:function(s){this.fireDataEvent(n,s);
},toString:function(){return this._shortcut.toString();
}},destruct:function(){this._disposeObjects(l);
}});
})();
(function(){var m="Unidentified",l="Boolean",k="+",j="short",h="keydown",g="",f="Control",d="keypress",c="-",b="PageUp",S="Escape",R="qx.event.type.Data",Q="_applyShortcut",P="PrintScreen",O="NumLock",N="5",M="8",L="execute",K="Meta",J="0",t="2",u="Shift",r="You can only specify one non modifier key!",s="3",p="/",q="Delete",n="String",o="changeEnabled",v="*",w="qx.bom.Shortcut",B="6",A="4",D="1",C="Alt",F="Not a valid key name for a shortcut: ",E="PageDown",y="Whitespaces are not allowed within shortcuts",I="_applyEnabled",H="7",G="a",x="z",z="9";
qx.Class.define(w,{extend:qx.core.Object,construct:function(T){qx.core.Object.call(this);
this.__vu={};
this.__vv=null;

if(T!=null){this.setShortcut(T);
}this.initEnabled();
},events:{"execute":R},properties:{enabled:{init:true,check:l,event:o,apply:I},shortcut:{check:n,apply:Q,nullable:true},autoRepeat:{check:l,init:false}},members:{__vu:g,__vv:g,execute:function(U){this.fireDataEvent(L,U);
},__vw:function(event){if(this.getEnabled()&&this.__vy(event)){if(!this.isAutoRepeat()){this.execute(event.getTarget());
}event.stop();
}},__vx:function(event){if(this.getEnabled()&&this.__vy(event)){if(this.isAutoRepeat()){this.execute(event.getTarget());
}event.stop();
}},_applyEnabled:function(V,W){if(V){qx.event.Registration.addListener(document.documentElement,h,this.__vw,this);
qx.event.Registration.addListener(document.documentElement,d,this.__vx,this);
}else{qx.event.Registration.removeListener(document.documentElement,h,this.__vw,this);
qx.event.Registration.removeListener(document.documentElement,d,this.__vx,this);
}},_applyShortcut:function(X,Y){if(X){if(X.search(/[\s]+/)!=-1){var bc=y;
this.error(bc);
throw new Error(bc);
}this.__vu={"Control":false,"Shift":false,"Meta":false,"Alt":false};
this.__vv=null;
var ba;
var a=[];

while(X.length>0&&ba!=-1){ba=X.search(/[-+]+/);
a.push((X.length==1||ba==-1)?X:X.substring(0,ba));
X=X.substring(ba+1);
}var bb=a.length;

for(var i=0;i<bb;i++){var bd=this.__vA(a[i]);

switch(bd){case f:case u:case K:case C:this.__vu[bd]=true;
break;
case m:var bc=F+a[i];
this.error(bc);
throw bc;
default:if(this.__vv){var bc=r;
this.error(bc);
throw bc;
}this.__vv=bd;
}}}return true;
},__vy:function(e){var be=this.__vv;

if(!be){return ;
}if((!this.__vu.Shift&&e.isShiftPressed())||(this.__vu.Shift&&!e.isShiftPressed())||(!this.__vu.Control&&e.isCtrlPressed())||(this.__vu.Control&&!e.isCtrlPressed())||(!this.__vu.Meta&&e.isMetaPressed())||(this.__vu.Meta&&!e.isMetaPressed())||(!this.__vu.Alt&&e.isAltPressed())||(this.__vu.Alt&&!e.isAltPressed())){return false;
}
if(be==e.getKeyIdentifier()){return true;
}return false;
},__vz:{esc:S,ctrl:f,print:P,del:q,pageup:b,pagedown:E,numlock:O,numpad_0:J,numpad_1:D,numpad_2:t,numpad_3:s,numpad_4:A,numpad_5:N,numpad_6:B,numpad_7:H,numpad_8:M,numpad_9:z,numpad_divide:p,numpad_multiply:v,numpad_minus:c,numpad_plus:k},__vA:function(bf){var bg=qx.event.handler.Keyboard;
var bh=m;

if(bg.isValidKeyIdentifier(bf)){return bf;
}
if(bf.length==1&&bf>=G&&bf<=x){return bf.toUpperCase();
}bf=bf.toLowerCase();
var bh=this.__vz[bf]||qx.lang.String.firstUp(bf);

if(bg.isValidKeyIdentifier(bh)){return bh;
}else{return m;
}},toString:function(){var bk=this.__vv;
var bj=[];

for(var bi in this.__vu){if(this.__vu[bi]){bj.push(qx.locale.Key.getKeyName(j,bi));
}}
if(bk){bj.push(qx.locale.Key.getKeyName(j,bk));
}return bj.join(k);
}},destruct:function(){this.setEnabled(false);
this.__vu=this.__vv=null;
}});
})();
(function(){var bA="Control",bz="Left",by="Meta",bx="Pause",bw="End",bv="Down",bu="Ctrl",bt="Home",bs="Apps",br="Win",bg="Right",bf="Backspace",be="Space",bd="Up",bc="Shift",bb="Enter",ba="Scroll",Y="Alt",X="Escape",W="key_full_Meta",bH="PrintScreen",bI="NumLock",bF="key_short_Alt",bG="key_short_Control_Mac",bD="key_short_Insert",bE="Del",bB="key_full_Enter",bC="key_full_Control",bJ="qx.locale.Key",bK="Tabulator",bk="key_full_Space",bj="key_short_Meta",bm="key_short_PageUp",bl="key_short_Pause",bo="key_full_Down",bn="key_short_Apps",bq="key_short_Win",bp="key_full_Right",bi="key_short_Up",bh="key_full_PageDown",a="key_full_Alt",b="PgDn",c="Esc",d="key_full_Insert",e="key_short_Space",f="key_short_Backspace",g="key_short_Home",h="full",i="key_short_Down",j="PgUp",bO="_Mac",bN="key_short_CapsLock",bM="PageUp",bL="key_full_Up",bS="key_full_Home",bR="key_full_Backspace",bQ="PageDown",bP="CapsLock",bU="Ins",bT="key_short_PrintScreen",G="Tab",H="key_full_Apps",E="key_short_Tab",F="key_short_End",K="_",L="Caps",I="key_short_NumLock",J="Num",C="key_full_Scroll",D="key_short_Left",r="key_short_Scroll",q="on",t="key_full_Control_Mac",s="key_",n="key_full_Pause",m="key_short_Right",p="key_full_PrintScreen",o="key_full_Win",l="short",k="key_short_Shift",Q="key_short_PageDown",R="key_short_Enter",S="key_short_Control",T="qx.debug",M="Insert",N="key_short_Escape",O="key_full_Tab",P="Print",U="Delete",V="key_full_CapsLock",B="key_full_Escape",A="key_short_Delete",z="key_full_PageUp",y="key_full_Shift",x="key_full_NumLock",w="key_full_Delete",v="key_full_End",u="key_full_Left";
qx.Class.define(bJ,{statics:{getKeyName:function(bV,bW,bX){if(qx.core.Variant.isSet(T,q)){qx.core.Assert.assertInArray(bV,[l,h]);
}var ca=s+bV+K+bW;
if(qx.bom.client.Platform.MAC&&bW==bA){ca+=bO;
}var bY=qx.locale.Manager.getInstance().translate(ca,[],bX);

if(bY==ca){return qx.locale.Key._keyNames[ca]||bW;
}else{return bY;
}}},defer:function(cb){var cd={};
var cc=qx.locale.Manager;
cd[cc.marktr(f)]=bf;
cd[cc.marktr(E)]=G;
cd[cc.marktr(e)]=be;
cd[cc.marktr(R)]=bb;
cd[cc.marktr(k)]=bc;
cd[cc.marktr(S)]=bu;
cd[cc.marktr(bG)]=bu;
cd[cc.marktr(bF)]=Y;
cd[cc.marktr(bN)]=L;
cd[cc.marktr(bj)]=by;
cd[cc.marktr(N)]=c;
cd[cc.marktr(D)]=bz;
cd[cc.marktr(bi)]=bd;
cd[cc.marktr(m)]=bg;
cd[cc.marktr(i)]=bv;
cd[cc.marktr(bm)]=j;
cd[cc.marktr(Q)]=b;
cd[cc.marktr(F)]=bw;
cd[cc.marktr(g)]=bt;
cd[cc.marktr(bD)]=bU;
cd[cc.marktr(A)]=bE;
cd[cc.marktr(I)]=J;
cd[cc.marktr(bT)]=P;
cd[cc.marktr(r)]=ba;
cd[cc.marktr(bl)]=bx;
cd[cc.marktr(bq)]=br;
cd[cc.marktr(bn)]=bs;
cd[cc.marktr(bR)]=bf;
cd[cc.marktr(O)]=bK;
cd[cc.marktr(bk)]=be;
cd[cc.marktr(bB)]=bb;
cd[cc.marktr(y)]=bc;
cd[cc.marktr(bC)]=bA;
cd[cc.marktr(t)]=bA;
cd[cc.marktr(a)]=Y;
cd[cc.marktr(V)]=bP;
cd[cc.marktr(W)]=by;
cd[cc.marktr(B)]=X;
cd[cc.marktr(u)]=bz;
cd[cc.marktr(bL)]=bd;
cd[cc.marktr(bp)]=bg;
cd[cc.marktr(bo)]=bv;
cd[cc.marktr(z)]=bM;
cd[cc.marktr(bh)]=bQ;
cd[cc.marktr(v)]=bw;
cd[cc.marktr(bS)]=bt;
cd[cc.marktr(d)]=M;
cd[cc.marktr(w)]=U;
cd[cc.marktr(x)]=bI;
cd[cc.marktr(p)]=bH;
cd[cc.marktr(C)]=ba;
cd[cc.marktr(n)]=bx;
cd[cc.marktr(o)]=br;
cd[cc.marktr(H)]=bs;
cb._keyNames=cd;
}});
})();
(function(){var w="visible",v="excluded",u="resize",t="qx.event.type.Data",s="both",r="qx.ui.menu.Menu",q="_applySpacing",p="showItem",o="Boolean",n="icon",d="label",m="qx.ui.core.Widget",h="_applyOverflowIndicator",c="_applyOverflowHandling",b="changeShow",g="Integer",f="qx.ui.toolbar.ToolBar",j="hideItem",a="toolbar",k="changeOpenMenu";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:qx.ui.core.MChildrenHandling,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox());
this.__mA=[];
this.__mB=[];
},properties:{appearance:{refine:true,init:a},openMenu:{check:r,event:k,nullable:true},show:{init:s,check:[s,d,n],inheritable:true,event:b},spacing:{nullable:true,check:g,themeable:true,apply:q},overflowIndicator:{check:m,nullable:true,apply:h},overflowHandling:{init:false,check:o,apply:c}},events:{"hideItem":t,"showItem":t},members:{__mA:null,__mB:null,_computeSizeHint:function(){var z=qx.ui.core.Widget.prototype._computeSizeHint.call(this);

if(true&&this.getOverflowHandling()){var x=0;
var y=this.getOverflowIndicator();

if(y){x=y.getSizeHint().width+this.getSpacing();
}z.minWidth=x;
}return z;
},_onResize:function(e){this._recalculateOverflow(e.getData().width);
},_recalculateOverflow:function(A){if(!this.getOverflowHandling()){return;
}var C=this.getSizeHint().width;
var B=this.getOverflowIndicator();
var F=0;

if(B){F=B.getSizeHint().width;
}if(A<C){do{var G=this._getNextToHide();
if(!G){return;
}var H=G.getMarginLeft()+G.getMarginRight();
var E=G.getSizeHint().width+H;
this.__mD(G);
C-=E;
if(B&&B.getVisibility()!=w){B.setVisibility(w);
C+=F;
}}while(C>A);
}else{do{var I=this.__mA[0];
if(I){var H=I.getMarginLeft()+I.getMarginRight();
var D=I.getSizeHint().width+H;
if(A>C+D+this.getSpacing()||(this.__mA.length==1&&A>C+D-F+this.getSpacing())){this.__mC(I);
A+=D;
if(B&&this.__mA.length==0){B.setVisibility(v);
}}else{return;
}}}while(A>=C&&this.__mA.length>0);
}},__mC:function(J){J.setVisibility(w);
this.__mA.shift();
this.fireDataEvent(p,J);
},__mD:function(K){if(!K){return;
}this.__mA.unshift(K);
K.setVisibility(v);
this.fireDataEvent(j,K);
},_getNextToHide:function(){for(var i=this.__mB.length-1;i>=0;i--){var L=this.__mB[i];
if(L&&L.getVisibility&&L.getVisibility()==w){return L;
}}var M=this._getChildren();

for(var i=M.length-1;i>=0;i--){var N=M[i];
if(N==this.getOverflowIndicator()){continue;
}if(N.getVisibility&&N.getVisibility()==w){return N;
}}},setRemovePriority:function(O,P,Q){if(!Q&&this.__mB[P]!=undefined){throw new Error("Priority already in use!");
}this.__mB[P]=O;
},_applyOverflowHandling:function(R,S){this.invalidateLayoutCache();
var parent=this.getLayoutParent();

if(parent){parent.invalidateLayoutCache();
}var U=this.getBounds();

if(U&&U.width){this._recalculateOverflow(U.width);
}if(R){this.addListener(u,this._onResize,this);
}else{this.removeListener(u,this._onResize,this);
var T=this.getOverflowIndicator();

if(T){T.setVisibility(v);
}for(var i=0;i<this.__mA.length;i++){this.__mA[i].setVisibility(w);
}this.__mA=[];
}},_applyOverflowIndicator:function(V,W){if(W){this._remove(W);
}
if(V){if(this._indexOf(V)==-1){throw new Error("Widget must be child of the toolbar.");
}V.setVisibility(v);
}},__mE:false,_setAllowMenuOpenHover:function(X){this.__mE=X;
},_isAllowMenuOpenHover:function(){return this.__mE;
},_applySpacing:function(Y,ba){var bb=this._getLayout();
Y==null?bb.resetSpacing():bb.setSpacing(Y);
},addSpacer:function(){var bc=new qx.ui.core.Spacer;
this._add(bc,{flex:1});
return bc;
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var be=this.getChildren();
var bd=[];
var bf;

for(var i=0,l=be.length;i<l;i++){bf=be[i];

if(bf instanceof qx.ui.menubar.Button){bd.push(bf);
}else if(bf instanceof qx.ui.toolbar.Part){bd.push.apply(bd,bf.getMenuButtons());
}}return bd;
}},destruct:function(){if(this.hasListener(u)){this.removeListener(u,this._onResize,this);
}}});
})();
(function(){var a="qx.ui.core.Spacer";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(b,c){qx.ui.core.LayoutItem.call(this);
this.setWidth(b!=null?b:0);
this.setHeight(c!=null?c:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(d){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var b="toolbar-separator",a="qx.ui.toolbar.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true},width:{refine:true,init:0},height:{refine:true,init:0}}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var n="execute",m="toolTipText",l="icon",k="label",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="_applyCommand",d="enabled",c="menu",a="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:f,event:a,nullable:true}},members:{__mF:null,__mG:false,__mH:null,_bindableProperties:[d,k,l,m,h,c],execute:function(){var o=this.getCommand();

if(o){if(this.__mG){this.__mG=false;
}else{this.__mG=true;
o.execute(this);
}}this.fireEvent(n);
},__mI:function(e){if(this.__mG){this.__mG=false;
return;
}this.__mG=true;
this.execute();
},_applyCommand:function(p,q){if(q!=null){q.removeListenerById(this.__mH);
}
if(p!=null){this.__mH=p.addListener(n,this.__mI,this);
}var t=this.__mF;

if(t==null){this.__mF=t={};
}
for(var i=0;i<this._bindableProperties.length;i++){var s=this._bindableProperties[i];
if(q!=null&&t[s]!=null){q.removeBinding(t[s]);
t[s]=null;
}if(p!=null&&qx.Class.hasProperty(this.constructor,s)){var r=p.get(s);

if(r==null){var u=this.get(s);
}t[s]=p.bind(s,this,s);
if(u){this.set(s,u);
}}}}},destruct:function(){this.__mF=null;
}});
})();
(function(){var o="pressed",n="abandoned",m="hovered",l="Enter",k="Space",j="dblclick",i="qx.ui.form.Button",h="mouseup",g="mousedown",f="mouseover",b="mouseout",d="keydown",c="button",a="keyup";
qx.Class.define(i,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(p,q,r){qx.ui.basic.Atom.call(this,p,q);

if(r!=null){this.setCommand(r);
}this.addListener(f,this._onMouseOver);
this.addListener(b,this._onMouseOut);
this.addListener(g,this._onMouseDown);
this.addListener(h,this._onMouseUp);
this.addListener(d,this._onKeyDown);
this.addListener(a,this._onKeyUp);
this.addListener(j,this._onStopEvent);
},properties:{appearance:{refine:true,init:c},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(n)){return;
}this.addState(o);
},release:function(){if(this.hasState(o)){this.removeState(o);
}},reset:function(){this.removeState(o);
this.removeState(n);
this.removeState(m);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(n)){this.removeState(n);
this.addState(o);
}this.addState(m);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(m);

if(this.hasState(o)){this.removeState(o);
this.addState(n);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(n);
this.addState(o);
},_onMouseUp:function(e){this.releaseCapture();
var s=this.hasState(o);
var t=this.hasState(n);

if(s){this.removeState(o);
}
if(t){this.removeState(n);
}else{this.addState(m);

if(s){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case l:case k:this.removeState(n);
this.addState(o);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case l:case k:if(this.hasState(o)){this.removeState(n);
this.removeState(o);
this.execute();
e.stopPropagation();
}}}}});
})();
(function(){var l="pressed",k="hovered",j="changeVisibility",i="qx.ui.menu.Menu",h="submenu",g="Enter",f="contextmenu",d="changeMenu",c="qx.ui.form.MenuButton",b="abandoned",a="_applyMenu";
qx.Class.define(c,{extend:qx.ui.form.Button,construct:function(m,n,o){qx.ui.form.Button.call(this,m,n);
if(o!=null){this.setMenu(o);
}},properties:{menu:{check:i,nullable:true,apply:a,event:d}},members:{_applyMenu:function(p,q){if(q){q.removeListener(j,this._onMenuChange,this);
q.resetOpener();
}
if(p){p.addListener(j,this._onMenuChange,this);
p.setOpener(this);
p.removeState(h);
p.removeState(f);
}},open:function(r){var s=this.getMenu();

if(s){qx.ui.menu.Manager.getInstance().hideAll();
s.setOpener(this);
s.open();
if(r){var t=s.getSelectables()[0];

if(t){s.setSelectedButton(t);
}}}},_onMenuChange:function(e){var u=this.getMenu();

if(u.isVisible()){this.addState(l);
}else{this.removeState(l);
}},_onMouseDown:function(e){qx.ui.form.Button.prototype._onMouseDown.call(this,e);
var v=this.getMenu();

if(v){if(!v.isVisible()){this.open();
}else{v.exclude();
}e.stopPropagation();
}},_onMouseUp:function(e){qx.ui.form.Button.prototype._onMouseUp.call(this,e);
e.stopPropagation();
},_onMouseOver:function(e){this.addState(k);
},_onMouseOut:function(e){this.removeState(k);
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case g:this.removeState(b);
this.addState(l);
var w=this.getMenu();

if(w){if(!w.isVisible()){this.open();
}else{w.exclude();
}}e.stopPropagation();
}},_onKeyUp:function(e){}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}}});
})();
(function(){var h="pressed",g="hovered",f="inherit",d="qx.ui.menubar.Button",c="keydown",b="menubar-button",a="keyup";
qx.Class.define(d,{extend:qx.ui.form.MenuButton,construct:function(i,j,k){qx.ui.form.MenuButton.call(this,i,j,k);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:b},show:{refine:true,init:f},focusable:{refine:true,init:false}},members:{getMenuBar:function(){var parent=this;

while(parent){if(parent instanceof qx.ui.toolbar.ToolBar){return parent;
}parent=parent.getLayoutParent();
}return null;
},open:function(l){qx.ui.form.MenuButton.prototype.open.call(this,l);
var menubar=this.getMenuBar();
menubar._setAllowMenuOpenHover(true);
},_onMenuChange:function(e){var m=this.getMenu();
var menubar=this.getMenuBar();

if(m.isVisible()){this.addState(h);
if(menubar){menubar.setOpenMenu(m);
}}else{this.removeState(h);
if(menubar&&menubar.getOpenMenu()==m){menubar.resetOpenMenu();
menubar._setAllowMenuOpenHover(false);
}}},_onMouseUp:function(e){qx.ui.form.MenuButton.prototype._onMouseUp.call(this,e);
var n=this.getMenu();

if(n&&n.isVisible()&&!this.hasState(h)){this.addState(h);
}},_onMouseOver:function(e){this.addState(g);
if(this.getMenu()){var menubar=this.getMenuBar();

if(menubar._isAllowMenuOpenHover()){qx.ui.menu.Manager.getInstance().hideAll();
menubar._setAllowMenuOpenHover(true);
if(this.isEnabled()){this.open();
}}}}}});
})();
(function(){var v="keypress",u="qx.debug",t="interval",s="keydown",r="on",q="mousedown",p="keyup",o="blur",n="Enter",m="__mL",d="__mK",l="__mJ",h="Up",c="Escape",b="qx.ui.menu.Manager",g="Left",f="Down",j="Right",a="singleton",k="Space";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__mJ=[];
var w=document.body;
var x=qx.event.Registration;
x.addListener(window.document.documentElement,q,this._onMouseDown,this,true);
x.addListener(w,s,this._onKeyUpDown,this,true);
x.addListener(w,p,this._onKeyUpDown,this,true);
x.addListener(w,v,this._onKeyPress,this,true);
if(!qx.bom.client.Feature.TOUCH){qx.bom.Element.addListener(window,o,this.hideAll,this);
}this.__mK=new qx.event.Timer;
this.__mK.addListener(t,this._onOpenInterval,this);
this.__mL=new qx.event.Timer;
this.__mL.addListener(t,this._onCloseInterval,this);
},members:{__mM:null,__mN:null,__mK:null,__mL:null,__mJ:null,_getChild:function(y,z,A,B){var C=y.getChildren();
var length=C.length;
var D;

for(var i=z;i<length&&i>=0;i+=A){D=C[i];

if(D.isEnabled()&&!D.isAnonymous()){return D;
}}
if(B){i=i==length?0:length-1;

for(;i!=z;i+=A){D=C[i];

if(D.isEnabled()&&!D.isAnonymous()){return D;
}}}return null;
},_isInMenu:function(E){while(E){if(E instanceof qx.ui.menu.Menu){return true;
}E=E.getLayoutParent();
}return false;
},_getMenuButton:function(F){while(F){if(F instanceof qx.ui.menu.AbstractButton){return F;
}F=F.getLayoutParent();
}return null;
},add:function(G){if(qx.core.Variant.isSet(u,r)){if(!(G instanceof qx.ui.menu.Menu)){throw new Error("Object is no menu: "+G);
}}var H=this.__mJ;
H.push(G);
G.setZIndex(1e6+H.length);
},remove:function(I){if(qx.core.Variant.isSet(u,r)){if(!(I instanceof qx.ui.menu.Menu)){throw new Error("Object is no menu: "+I);
}}var J=this.__mJ;

if(J){qx.lang.Array.remove(J,I);
}},hideAll:function(){var K=this.__mJ;

if(K){for(var i=K.length-1;i>=0;i--){K[i].exclude();
}}},getActiveMenu:function(){var L=this.__mJ;
return L.length>0?L[L.length-1]:null;
},scheduleOpen:function(M){this.cancelClose(M);
if(M.isVisible()){if(this.__mM){this.cancelOpen(this.__mM);
}}else if(this.__mM!=M){this.__mM=M;
this.__mK.restartWith(M.getOpenInterval());
}},scheduleClose:function(N){this.cancelOpen(N);
if(!N.isVisible()){if(this.__mN){this.cancelClose(this.__mN);
}}else if(this.__mN!=N){this.__mN=N;
this.__mL.restartWith(N.getCloseInterval());
}},cancelOpen:function(O){if(this.__mM==O){this.__mK.stop();
this.__mM=null;
}},cancelClose:function(P){if(this.__mN==P){this.__mL.stop();
this.__mN=null;
}},_onOpenInterval:function(e){this.__mK.stop();
this.__mM.open();
this.__mM=null;
},_onCloseInterval:function(e){this.__mL.stop();
this.__mN.exclude();
this.__mN=null;
},_onMouseDown:function(e){var Q=e.getTarget();
Q=qx.ui.core.Widget.getWidgetByElement(Q,true);
if(Q==null){this.hideAll();
return;
}if(Q.getMenu&&Q.getMenu()&&Q.getMenu().isVisible()){return;
}if(this.__mJ.length>0&&!this._isInMenu(Q)){this.hideAll();
}},__mO:{"Enter":1,"Space":1},__mP:{"Escape":1,"Up":1,"Down":1,"Left":1,"Right":1},_onKeyUpDown:function(e){var R=this.getActiveMenu();

if(!R){return;
}var S=e.getKeyIdentifier();

if(this.__mP[S]||(this.__mO[S]&&R.getSelectedButton())){e.stopPropagation();
}},_onKeyPress:function(e){var T=this.getActiveMenu();

if(!T){return;
}var U=e.getKeyIdentifier();
var W=this.__mP[U];
var V=this.__mO[U];

if(W){switch(U){case h:this._onKeyPressUp(T);
break;
case f:this._onKeyPressDown(T);
break;
case g:this._onKeyPressLeft(T);
break;
case j:this._onKeyPressRight(T);
break;
case c:this.hideAll();
break;
}e.stopPropagation();
e.preventDefault();
}else if(V){var X=T.getSelectedButton();

if(X){switch(U){case n:this._onKeyPressEnter(T,X,e);
break;
case k:this._onKeyPressSpace(T,X,e);
break;
}e.stopPropagation();
e.preventDefault();
}}},_onKeyPressUp:function(Y){var ba=Y.getSelectedButton();
var bb=Y.getChildren();
var bd=ba?Y.indexOf(ba)-1:bb.length-1;
var bc=this._getChild(Y,bd,-1,true);
if(bc){Y.setSelectedButton(bc);
}else{Y.resetSelectedButton();
}},_onKeyPressDown:function(be){var bf=be.getSelectedButton();
var bh=bf?be.indexOf(bf)+1:0;
var bg=this._getChild(be,bh,1,true);
if(bg){be.setSelectedButton(bg);
}else{be.resetSelectedButton();
}},_onKeyPressLeft:function(bi){var bn=bi.getOpener();

if(!bn){return;
}if(bn instanceof qx.ui.menu.AbstractButton){var bk=bn.getLayoutParent();
bk.resetOpenedButton();
bk.setSelectedButton(bn);
}else if(bn instanceof qx.ui.menubar.Button){var bm=bn.getMenuBar().getMenuButtons();
var bj=bm.indexOf(bn);
if(bj===-1){return;
}var bo=null;
var length=bm.length;

for(var i=1;i<=length;i++){var bl=bm[(bj-i+length)%length];

if(bl.isEnabled()){bo=bl;
break;
}}
if(bo&&bo!=bn){bo.open(true);
}}},_onKeyPressRight:function(bp){var br=bp.getSelectedButton();
if(br){var bq=br.getMenu();

if(bq){bp.setOpenedButton(br);
var bx=this._getChild(bq,0,1);

if(bx){bq.setSelectedButton(bx);
}return;
}}else if(!bp.getOpenedButton()){var bx=this._getChild(bp,0,1);

if(bx){bp.setSelectedButton(bx);

if(bx.getMenu()){bp.setOpenedButton(bx);
}return;
}}var bv=bp.getOpener();
if(bv instanceof qx.ui.menu.Button&&br){while(bv){bv=bv.getLayoutParent();

if(bv instanceof qx.ui.menu.Menu){bv=bv.getOpener();

if(bv instanceof qx.ui.menubar.Button){break;
}}else{break;
}}
if(!bv){return;
}}if(bv instanceof qx.ui.menubar.Button){var bu=bv.getMenuBar().getMenuButtons();
var bs=bu.indexOf(bv);
if(bs===-1){return;
}var bw=null;
var length=bu.length;

for(var i=1;i<=length;i++){var bt=bu[(bs+i)%length];

if(bt.isEnabled()){bw=bt;
break;
}}
if(bw&&bw!=bv){bw.open(true);
}}},_onKeyPressEnter:function(by,bz,e){if(bz.hasListener(v)){var bA=e.clone();
bA.setBubbles(false);
bA.setTarget(bz);
bz.dispatchEvent(bA);
}this.hideAll();
},_onKeyPressSpace:function(bB,bC,e){if(bC.hasListener(v)){var bD=e.clone();
bD.setBubbles(false);
bD.setTarget(bC);
bC.dispatchEvent(bD);
}}},destruct:function(){var bF=qx.event.Registration;
var bE=document.body;
bF.removeListener(window.document.documentElement,q,this._onMouseDown,this,true);
bF.removeListener(bE,s,this._onKeyUpDown,this,true);
bF.removeListener(bE,p,this._onKeyUpDown,this,true);
bF.removeListener(bE,v,this._onKeyPress,this,true);
this._disposeObjects(d,m);
this._disposeArray(l);
}});
})();
(function(){var l="indexOf",k="addAfter",j="add",i="addBefore",h="_",g="addAt",f="hasChildren",e="removeAt",d="removeAll",c="getChildren",a="remove",b="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(b,{members:{__mQ:function(m,n,o,p){var q=this.getChildrenContainer();

if(q===this){m=h+m;
}return (q[m])(n,o,p);
},getChildren:function(){return this.__mQ(c);
},hasChildren:function(){return this.__mQ(f);
},add:function(r,s){return this.__mQ(j,r,s);
},remove:function(t){return this.__mQ(a,t);
},removeAll:function(){return this.__mQ(d);
},indexOf:function(u){return this.__mQ(l,u);
},addAt:function(v,w,x){this.__mQ(g,v,w,x);
},addBefore:function(y,z,A){this.__mQ(i,y,z,A);
},addAfter:function(B,C,D){this.__mQ(k,B,C,D);
},removeAt:function(E){this.__mQ(e,E);
}}});
})();
(function(){var l="slidebar",k="Integer",j="resize",h="qx.ui.core.Widget",g="selected",f="visible",d="Boolean",c="mouseout",b="excluded",a="menu",A="_applySelectedButton",z="_applyOpenInterval",y="_applySpacingY",x="_blocker",w="_applyCloseInterval",v="_applyBlockerColor",u="_applyIconColumnWidth",t="mouseover",s="qx.ui.menu.Menu",r="Color",p="Number",q="_applyOpenedButton",n="_applySpacingX",o="_applyBlockerOpacity",m="_applyArrowColumnWidth";
qx.Class.define(s,{extend:qx.ui.core.Widget,include:[qx.ui.core.MPlacement,qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.Layout);
var B=this.getApplicationRoot();
B.add(this);
this.addListener(t,this._onMouseOver);
this.addListener(c,this._onMouseOut);
this.addListener(j,this._onResize,this);
B.addListener(j,this._onResize,this);
this._blocker=new qx.ui.core.Blocker(B);
this.initVisibility();
this.initKeepFocus();
this.initKeepActive();
},properties:{appearance:{refine:true,init:a},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},visibility:{refine:true,init:b},keepFocus:{refine:true,init:true},keepActive:{refine:true,init:true},spacingX:{check:k,apply:n,init:0,themeable:true},spacingY:{check:k,apply:y,init:0,themeable:true},iconColumnWidth:{check:k,init:0,themeable:true,apply:u},arrowColumnWidth:{check:k,init:0,themeable:true,apply:m},blockerColor:{check:r,init:null,nullable:true,apply:v,themeable:true},blockerOpacity:{check:p,init:1,apply:o,themeable:true},selectedButton:{check:h,nullable:true,apply:A},openedButton:{check:h,nullable:true,apply:q},opener:{check:h,nullable:true},openInterval:{check:k,themeable:true,init:250,apply:z},closeInterval:{check:k,themeable:true,init:250,apply:w},blockBackground:{check:d,themeable:true,init:false}},members:{__mR:null,__mS:null,_blocker:null,open:function(){if(this.getOpener()!=null){this.placeToWidget(this.getOpener());
this.__mU();
this.show();
this._placementTarget=this.getOpener();
}else{this.warn("The menu instance needs a configured 'opener' widget!");
}},openAtMouse:function(e){this.placeToMouse(e);
this.__mU();
this.show();
this._placementTarget={left:e.getDocumentLeft(),top:e.getDocumentTop()};
},openAtPoint:function(C){this.placeToPoint(C);
this.__mU();
this.show();
this._placementTarget=C;
},addSeparator:function(){this.add(new qx.ui.menu.Separator);
},getColumnSizes:function(){return this._getMenuLayout().getColumnSizes();
},getSelectables:function(){var D=[];
var E=this.getChildren();

for(var i=0;i<E.length;i++){if(E[i].isEnabled()){D.push(E[i]);
}}return D;
},_applyIconColumnWidth:function(F,G){this._getMenuLayout().setIconColumnWidth(F);
},_applyArrowColumnWidth:function(H,I){this._getMenuLayout().setArrowColumnWidth(H);
},_applySpacingX:function(J,K){this._getMenuLayout().setColumnSpacing(J);
},_applySpacingY:function(L,M){this._getMenuLayout().setSpacing(L);
},_applyVisibility:function(N,O){qx.ui.core.Widget.prototype._applyVisibility.call(this,N,O);
var P=qx.ui.menu.Manager.getInstance();

if(N===f){P.add(this);
var Q=this.getParentMenu();

if(Q){Q.setOpenedButton(this.getOpener());
}}else if(O===f){P.remove(this);
var Q=this.getParentMenu();

if(Q&&Q.getOpenedButton()==this.getOpener()){Q.resetOpenedButton();
}this.resetOpenedButton();
this.resetSelectedButton();
}this.__mT();
},__mT:function(){if(this.isVisible()){if(this.getBlockBackground()){var R=this.getZIndex();
this._blocker.blockContent(R-1);
}}else{if(this._blocker.isContentBlocked()){this._blocker.unblockContent();
}}},getParentMenu:function(){var S=this.getOpener();

if(!S||!(S instanceof qx.ui.menu.AbstractButton)){return null;
}
while(S&&!(S instanceof qx.ui.menu.Menu)){S=S.getLayoutParent();
}return S;
},_applySelectedButton:function(T,U){if(U){U.removeState(g);
}
if(T){T.addState(g);
}},_applyOpenedButton:function(V,W){if(W){W.getMenu().exclude();
}
if(V){V.getMenu().open();
}},_applyBlockerColor:function(X,Y){this._blocker.setColor(X);
},_applyBlockerOpacity:function(ba,bb){this._blocker.setOpacity(ba);
},getChildrenContainer:function(){return this.getChildControl(l,true)||this;
},_createChildControlImpl:function(bc,bd){var be;

switch(bc){case l:var be=new qx.ui.menu.MenuSlideBar();
var bg=this._getLayout();
this._setLayout(new qx.ui.layout.Grow());
var bf=be.getLayout();
be.setLayout(bg);
bf.dispose();
var bh=qx.lang.Array.clone(this.getChildren());

for(var i=0;i<bh.length;i++){be.add(bh[i]);
}this.removeListener(j,this._onResize,this);
be.getChildrenContainer().addListener(j,this._onResize,this);
this._add(be);
break;
}return be||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bc);
},_getMenuLayout:function(){if(this.hasChildControl(l)){return this.getChildControl(l).getChildrenContainer().getLayout();
}else{return this._getLayout();
}},_getMenuBounds:function(){if(this.hasChildControl(l)){return this.getChildControl(l).getChildrenContainer().getBounds();
}else{return this.getBounds();
}},_computePlacementSize:function(){return this._getMenuBounds();
},__mU:function(){var bj=this._getMenuBounds();

if(!bj){this.addListenerOnce(j,this.__mU,this);
return;
}var bi=this.getLayoutParent().getBounds().height;
var top=this.getLayoutProperties().top;
var bk=this.getLayoutProperties().left;
if(top<0){this._assertSlideBar(function(){this.setHeight(bj.height+top);
this.moveTo(bk,0);
});
}else if(top+bj.height>bi){this._assertSlideBar(function(){this.setHeight(bi-top);
});
}else{this.setHeight(null);
}},_assertSlideBar:function(bl){if(this.hasChildControl(l)){return bl.call(this);
}this.__mS=bl;
qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.getChildControl(l);

if(this.__mS){this.__mS.call(this);
delete this.__mS;
}},_onResize:function(){if(this.isVisible()){var bm=this._placementTarget;

if(!bm){return;
}else if(bm instanceof qx.ui.core.Widget){this.placeToWidget(bm);
}else if(bm.top!==undefined){this.placeToPoint(bm);
}else{throw new Error("Unknown target: "+bm);
}this.__mU();
}},_onMouseOver:function(e){var bo=qx.ui.menu.Manager.getInstance();
bo.cancelClose(this);
var bp=e.getTarget();

if(bp.isEnabled()&&bp instanceof qx.ui.menu.AbstractButton){this.setSelectedButton(bp);
var bn=bp.getMenu&&bp.getMenu();

if(bn){bn.setOpener(bp);
bo.scheduleOpen(bn);
this.__mR=bn;
}else{var bq=this.getOpenedButton();

if(bq){bo.scheduleClose(bq.getMenu());
}
if(this.__mR){bo.cancelOpen(this.__mR);
this.__mR=null;
}}}else if(!this.getOpenedButton()){this.resetSelectedButton();
}},_onMouseOut:function(e){var br=qx.ui.menu.Manager.getInstance();
if(!qx.ui.core.Widget.contains(this,e.getRelatedTarget())){var bs=this.getOpenedButton();
bs?this.setSelectedButton(bs):this.resetSelectedButton();
if(bs){br.cancelClose(bs.getMenu());
}if(this.__mR){br.cancelOpen(this.__mR);
}}}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.ui.menu.Manager.getInstance().remove(this);
}this.getApplicationRoot().removeListener(j,this._onResize,this);
this._placementTarget=null;
this._disposeObjects(x);
}});
})();
(function(){var c="Integer",b="_applyLayoutChange",a="qx.ui.menu.Layout";
qx.Class.define(a,{extend:qx.ui.layout.VBox,properties:{columnSpacing:{check:c,init:0,apply:b},spanColumn:{check:c,init:1,nullable:true,apply:b},iconColumnWidth:{check:c,init:0,themeable:true,apply:b},arrowColumnWidth:{check:c,init:0,themeable:true,apply:b}},members:{__mV:null,_computeSizeHint:function(){var q=this._getLayoutChildren();
var o,g,j;
var e=this.getSpanColumn();
var h=this.__mV=[0,0,0,0];
var m=this.getColumnSpacing();
var k=0;
var f=0;
for(var i=0,l=q.length;i<l;i++){o=q[i];

if(o.isAnonymous()){continue;
}g=o.getChildrenSizes();

for(var n=0;n<g.length;n++){if(e!=null&&n==e&&g[e+1]==0){k=Math.max(k,g[n]);
}else{h[n]=Math.max(h[n],g[n]);
}}var d=q[i].getInsets();
f=Math.max(f,d.left+d.right);
}if(e!=null&&h[e]+m+h[e+1]<k){h[e]=k-h[e+1]-m;
}if(k==0){j=m*2;
}else{j=m*3;
}if(h[0]==0){h[0]=this.getIconColumnWidth();
}if(h[3]==0){h[3]=this.getArrowColumnWidth();
}var p=qx.ui.layout.VBox.prototype._computeSizeHint.call(this).height;
return {minHeight:p,height:p,width:qx.lang.Array.sum(h)+f+j};
},getColumnSizes:function(){return this.__mV||null;
}},destruct:function(){this.__mV=null;
}});
})();
(function(){var b="menu-separator",a="qx.ui.menu.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true}}});
})();
(function(){var t="icon",s="label",r="arrow",q="shortcut",p="changeLocale",o="qx.dynlocale",n="submenu",m="on",l="String",k="qx.ui.menu.Menu",d="qx.ui.menu.AbstractButton",j="keypress",h="",c="_applyIcon",b="mouseup",g="abstract",f="_applyLabel",i="_applyMenu",a="changeCommand";
qx.Class.define(d,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],type:g,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.ButtonLayout);
this.addListener(b,this._onMouseUp);
this.addListener(j,this._onKeyPress);
this.addListener(a,this._onChangeCommand,this);
},properties:{blockToolTip:{refine:true,init:true},label:{check:l,apply:f,nullable:true},menu:{check:k,apply:i,nullable:true,dereference:true},icon:{check:l,apply:c,themeable:true,nullable:true}},members:{_createChildControlImpl:function(u,v){var w;

switch(u){case t:w=new qx.ui.basic.Image;
w.setAnonymous(true);
this._add(w,{column:0});
break;
case s:w=new qx.ui.basic.Label;
w.setAnonymous(true);
this._add(w,{column:1});
break;
case q:w=new qx.ui.basic.Label;
w.setAnonymous(true);
this._add(w,{column:2});
break;
case r:w=new qx.ui.basic.Image;
w.setAnonymous(true);
this._add(w,{column:3});
break;
}return w||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,u);
},_forwardStates:{selected:1},getChildrenSizes:function(){var x=0,y=0,z=0,D=0;

if(this._isChildControlVisible(t)){var E=this.getChildControl(t);
x=E.getMarginLeft()+E.getSizeHint().width+E.getMarginRight();
}
if(this._isChildControlVisible(s)){var B=this.getChildControl(s);
y=B.getMarginLeft()+B.getSizeHint().width+B.getMarginRight();
}
if(this._isChildControlVisible(q)){var A=this.getChildControl(q);
z=A.getMarginLeft()+A.getSizeHint().width+A.getMarginRight();
}
if(this._isChildControlVisible(r)){var C=this.getChildControl(r);
D=C.getMarginLeft()+C.getSizeHint().width+C.getMarginRight();
}return [x,y,z,D];
},_onMouseUp:function(e){},_onKeyPress:function(e){},_onChangeCommand:function(e){var H=e.getData();

if(qx.core.Variant.isSet(o,m)){var F=e.getOldData();

if(!F){qx.locale.Manager.getInstance().addListener(p,this._onChangeLocale,this);
}
if(!H){qx.locale.Manager.getInstance().removeListener(p,this._onChangeLocale,this);
}}var G=H!=null?H.toString():h;
this.getChildControl(q).setValue(G);
},_onChangeLocale:qx.core.Variant.select(o,{"on":function(e){var I=this.getCommand();

if(I!=null){this.getChildControl(q).setValue(I.toString());
}},"off":null}),_applyIcon:function(J,K){if(J){this._showChildControl(t).setSource(J);
}else{this._excludeChildControl(t);
}},_applyLabel:function(L,M){if(L){this._showChildControl(s).setValue(L);
}else{this._excludeChildControl(s);
}},_applyMenu:function(N,O){if(O){O.resetOpener();
O.removeState(n);
}
if(N){this._showChildControl(r);
N.setOpener(this);
N.addState(n);
}else{this._excludeChildControl(r);
}}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}
if(qx.core.Variant.isSet(o,m)){qx.locale.Manager.getInstance().removeListener(p,this._onChangeLocale,this);
}}});
})();
(function(){var g="qx.ui.menu.ButtonLayout",f="qx.debug",e="column",d="left",c="middle",b="' is not supported by the MenuButton layout!",a="The property '";
qx.Class.define(g,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(f,{"on":function(h,name,j){this.assert(name==e,a+name+b);
},"off":null}),renderLayout:function(k,m){var w=this._getLayoutChildren();
var v;
var o;
var p=[];

for(var i=0,l=w.length;i<l;i++){v=w[i];
o=v.getLayoutProperties().column;
p[o]=v;
}var u=this.__mW(w[0]);
var x=u.getColumnSizes();
var r=u.getSpacingX();
var q=qx.lang.Array.sum(x)+r*(x.length-1);

if(q<k){x[1]+=k-q;
}var y=0,top=0;
var s=qx.ui.layout.Util;

for(var i=0,l=x.length;i<l;i++){v=p[i];

if(v){var n=v.getSizeHint();
var top=s.computeVerticalAlignOffset(v.getAlignY()||c,n.height,m,0,0);
var t=s.computeHorizontalAlignOffset(v.getAlignX()||d,n.width,x[i],v.getMarginLeft(),v.getMarginRight());
v.renderLayout(y+t,top,n.width,n.height);
}y+=x[i]+r;
}},__mW:function(z){while(!(z instanceof qx.ui.menu.Menu)){z=z.getLayoutParent();
}return z;
},_computeSizeHint:function(){var C=this._getLayoutChildren();
var B=0;
var D=0;

for(var i=0,l=C.length;i<l;i++){var A=C[i].getSizeHint();
D+=A.width;
B=Math.max(B,A.height);
}return {width:D,height:B};
}}});
})();
(function(){var a="qx.ui.core.MRemoteLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this.getChildrenContainer().setLayout(b);
},getLayout:function(){return this.getChildrenContainer().getLayout();
}}});
})();
(function(){var q="horizontal",p="scrollpane",o="vertical",n="button-backward",m="button-forward",l="content",k="execute",j="qx.ui.container.SlideBar",i="scrollY",h="removeChildWidget",c="scrollX",g="_applyOrientation",f="mousewheel",b="Integer",a="slidebar",d="update";
qx.Class.define(j,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling],construct:function(r){qx.ui.core.Widget.call(this);
var s=this.getChildControl(p);
this._add(s,{flex:1});

if(r!=null){this.setOrientation(r);
}else{this.initOrientation();
}this.addListener(f,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:a},orientation:{check:[q,o],init:q,apply:g},scrollStep:{check:b,init:15,themeable:true}},members:{getChildrenContainer:function(){return this.getChildControl(l);
},_createChildControlImpl:function(t,u){var v;

switch(t){case m:v=new qx.ui.form.RepeatButton;
v.addListener(k,this._onExecuteForward,this);
v.setFocusable(false);
this._addAt(v,2);
break;
case n:v=new qx.ui.form.RepeatButton;
v.addListener(k,this._onExecuteBackward,this);
v.setFocusable(false);
this._addAt(v,0);
break;
case l:v=new qx.ui.container.Composite();
if(qx.bom.client.Engine.GECKO){v.addListener(h,this._onRemoveChild,this);
}this.getChildControl(p).add(v);
break;
case p:v=new qx.ui.core.scroll.ScrollPane();
v.addListener(d,this._onResize,this);
v.addListener(c,this._onScroll,this);
v.addListener(i,this._onScroll,this);
break;
}return v||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,t);
},_forwardStates:{barLeft:true,barTop:true,barRight:true,barBottom:true},scrollBy:function(w){var x=this.getChildControl(p);

if(this.getOrientation()===q){x.scrollByX(w);
}else{x.scrollByY(w);
}},scrollTo:function(y){var z=this.getChildControl(p);

if(this.getOrientation()===q){z.scrollToX(y);
}else{z.scrollToY(y);
}},_applyOrientation:function(A,B){var E=[this.getLayout(),this._getLayout()];
var D=this.getChildControl(m);
var C=this.getChildControl(n);
if(B==o){D.removeState(o);
C.removeState(o);
D.addState(q);
C.addState(q);
}else if(B==q){D.removeState(q);
C.removeState(q);
D.addState(o);
C.addState(o);
}
if(A==q){this._setLayout(new qx.ui.layout.HBox());
this.setLayout(new qx.ui.layout.HBox());
}else{this._setLayout(new qx.ui.layout.VBox());
this.setLayout(new qx.ui.layout.VBox());
}
if(E[0]){E[0].dispose();
}
if(E[1]){E[1].dispose();
}},_onMouseWheel:function(e){this.scrollBy(e.getWheelDelta()*this.getScrollStep());
e.stop();
},_onScroll:function(){this._updateArrowsEnabled();
},_onResize:function(e){var content=this.getChildControl(p).getChildren()[0];

if(!content){return;
}var F=this.getInnerSize();
var H=content.getBounds();
var G=(this.getOrientation()===q)?H.width>F.width:H.height>F.height;

if(G){this._showArrows();
this._updateArrowsEnabled();
}else{this._hideArrows();
}},_onExecuteBackward:function(){this.scrollBy(-this.getScrollStep());
},_onExecuteForward:function(){this.scrollBy(this.getScrollStep());
},_onRemoveChild:function(){qx.event.Timer.once(function(){this.scrollBy(this.getChildControl(p).getScrollX());
},this,50);
},_updateArrowsEnabled:function(){var J=this.getChildControl(p);

if(this.getOrientation()===q){var I=J.getScrollX();
var K=J.getScrollMaxX();
}else{var I=J.getScrollY();
var K=J.getScrollMaxY();
}this.getChildControl(n).setEnabled(I>0);
this.getChildControl(m).setEnabled(I<K);
},_showArrows:function(){this._showChildControl(m);
this._showChildControl(n);
},_hideArrows:function(){this._excludeChildControl(m);
this._excludeChildControl(n);
this.scrollTo(0);
}}});
})();
(function(){var f="execute",e="button-backward",d="vertical",c="button-forward",b="menu-slidebar",a="qx.ui.menu.MenuSlideBar";
qx.Class.define(a,{extend:qx.ui.container.SlideBar,construct:function(){qx.ui.container.SlideBar.call(this,d);
},properties:{appearance:{refine:true,init:b}},members:{_createChildControlImpl:function(g,h){var i;

switch(g){case c:i=new qx.ui.form.HoverButton();
i.addListener(f,this._onExecuteForward,this);
this._addAt(i,2);
break;
case e:i=new qx.ui.form.HoverButton();
i.addListener(f,this._onExecuteBackward,this);
this._addAt(i,0);
break;
}return i||qx.ui.container.SlideBar.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var n="pressed",m="abandoned",l="Integer",k="hovered",j="qx.event.type.Event",i="Enter",h="Space",g="press",f="qx.ui.form.RepeatButton",d="release",a="interval",c="execute",b="__mX";
qx.Class.define(f,{extend:qx.ui.form.Button,construct:function(o,p){qx.ui.form.Button.call(this,o,p);
this.__mX=new qx.event.AcceleratingTimer();
this.__mX.addListener(a,this._onInterval,this);
},events:{"execute":j,"press":j,"release":j},properties:{interval:{check:l,init:100},firstInterval:{check:l,init:500},minTimer:{check:l,init:20},timerDecrease:{check:l,init:2}},members:{__mY:null,__mX:null,press:function(){if(this.isEnabled()){if(!this.hasState(n)){this.__na();
}this.removeState(m);
this.addState(n);
}},release:function(q){if(!this.isEnabled()){return;
}if(this.hasState(n)){if(!this.__mY){this.execute();
}}this.removeState(n);
this.removeState(m);
this.__nb();
},_applyEnabled:function(r,s){qx.ui.form.Button.prototype._applyEnabled.call(this,r,s);

if(!r){this.removeState(n);
this.removeState(m);
this.__nb();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(m)){this.removeState(m);
this.addState(n);
this.__mX.start();
}this.addState(k);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(k);

if(this.hasState(n)){this.removeState(n);
this.addState(m);
this.__mX.stop();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__na();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(m)){this.addState(k);

if(this.hasState(n)&&!this.__mY){this.execute();
}}this.__nb();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case i:case h:if(this.hasState(n)){if(!this.__mY){this.execute();
}this.removeState(n);
this.removeState(m);
e.stopPropagation();
this.__nb();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case i:case h:this.removeState(m);
this.addState(n);
e.stopPropagation();
this.__na();
}},_onInterval:function(e){this.__mY=true;
this.fireEvent(c);
},__na:function(){this.fireEvent(g);
this.__mY=false;
this.__mX.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.removeState(m);
this.addState(n);
},__nb:function(){this.fireEvent(d);
this.__mX.stop();
this.removeState(m);
this.removeState(n);
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var e="Integer",d="interval",c="qx.event.type.Event",b="qx.event.AcceleratingTimer",a="__nc";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__nc=new qx.event.Timer(this.getInterval());
this.__nc.addListener(d,this._onInterval,this);
},events:{"interval":c},properties:{interval:{check:e,init:100},firstInterval:{check:e,init:500},minimum:{check:e,init:20},decrease:{check:e,init:2}},members:{__nc:null,__nd:null,start:function(){this.__nc.setInterval(this.getFirstInterval());
this.__nc.start();
},stop:function(){this.__nc.stop();
this.__nd=null;
},_onInterval:function(){this.__nc.stop();

if(this.__nd==null){this.__nd=this.getInterval();
}this.__nd=Math.max(this.getMinimum(),this.__nd-this.getDecrease());
this.__nc.setInterval(this.__nd);
this.__nc.start();
this.fireEvent(d);
}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var m="resize",l="scrollY",k="update",j="scrollX",i="_applyScrollX",h="_applyScrollY",g="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",f="appear",d="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",c="qx.event.type.Event",a="qx.ui.core.scroll.ScrollPane",b="scroll";
qx.Class.define(a,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(m,this._onUpdate);
var n=this.getContentElement();
n.addListener(b,this._onScroll,this);
n.addListener(f,this._onAppear,this);
},events:{update:c},properties:{scrollX:{check:g,apply:i,event:j,init:0},scrollY:{check:d,apply:h,event:l,init:0}},members:{add:function(o){var p=this._getChildren()[0];

if(p){this._remove(p);
p.removeListener(m,this._onUpdate,this);
}
if(o){this._add(o);
o.addListener(m,this._onUpdate,this);
}},remove:function(q){if(q){this._remove(q);
q.removeListener(m,this._onUpdate,this);
}},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(k);
},_onScroll:function(e){var r=this.getContentElement();
this.setScrollX(r.getScrollX());
this.setScrollY(r.getScrollY());
},_onAppear:function(e){var v=this.getContentElement();
var s=this.getScrollX();
var t=v.getScrollX();

if(s!=t){v.scrollToX(s);
}var w=this.getScrollY();
var u=v.getScrollY();

if(w!=u){v.scrollToY(w);
}},getItemTop:function(z){var top=0;

do{top+=z.getBounds().top;
z=z.getLayoutParent();
}while(z&&z!==this);
return top;
},getItemBottom:function(A){return this.getItemTop(A)+A.getBounds().height;
},getItemLeft:function(B){var C=0;
var parent;

do{C+=B.getBounds().left;
parent=B.getLayoutParent();

if(parent){C+=parent.getInsets().left;
}B=parent;
}while(B&&B!==this);
return C;
},getItemRight:function(D){return this.getItemLeft(D)+D.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var F=this.getInnerSize();
var E=this.getScrollSize();

if(F&&E){return Math.max(0,E.width-F.width);
}return 0;
},getScrollMaxY:function(){var H=this.getInnerSize();
var G=this.getScrollSize();

if(H&&G){return Math.max(0,G.height-H.height);
}return 0;
},scrollToX:function(I){var J=this.getScrollMaxX();

if(I<0){I=0;
}else if(I>J){I=J;
}this.setScrollX(I);
},scrollToY:function(K){var L=this.getScrollMaxY();

if(K<0){K=0;
}else if(K>L){K=L;
}this.setScrollY(K);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(M){this.getContentElement().scrollToX(M);
},_applyScrollY:function(N){this.getContentElement().scrollToY(N);
}}});
})();
(function(){var i="Integer",h="hovered",g="hover-button",f="interval",d="mouseover",c="mouseout",b="qx.ui.form.HoverButton",a="__ne";
qx.Class.define(b,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(j,k){qx.ui.basic.Atom.call(this,j,k);
this.addListener(d,this._onMouseOver,this);
this.addListener(c,this._onMouseOut,this);
this.__ne=new qx.event.AcceleratingTimer();
this.__ne.addListener(f,this._onInterval,this);
},properties:{appearance:{refine:true,init:g},interval:{check:i,init:80},firstInterval:{check:i,init:200},minTimer:{check:i,init:20},timerDecrease:{check:i,init:2}},members:{__ne:null,_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.__ne.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.addState(h);
},_onMouseOut:function(e){this.__ne.stop();
this.removeState(h);

if(!this.isEnabled()||e.getTarget()!==this){return;
}},_onInterval:function(){if(this.isEnabled()){this.execute();
}else{this.__ne.stop();
}}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var b="qx.ui.menu.Button",a="menu-button";
qx.Class.define(b,{extend:qx.ui.menu.AbstractButton,construct:function(c,d,f,g){qx.ui.menu.AbstractButton.call(this);
if(c!=null){this.setLabel(c);
}
if(d!=null){this.setIcon(d);
}
if(f!=null){this.setCommand(f);
}
if(g!=null){this.setMenu(g);
}},properties:{appearance:{refine:true,init:a}},members:{_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
if(this.getMenu()){return;
}}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var m="container",k="handle",j="both",h="Integer",g="middle",f="qx.ui.toolbar.Part",e="icon",d="label",c="changeShow",b="_applySpacing",a="toolbar/part";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox);
this._createChildControl(k);
},properties:{appearance:{refine:true,init:a},show:{init:j,check:[j,d,e],inheritable:true,event:c},spacing:{nullable:true,check:h,themeable:true,apply:b}},members:{_createChildControlImpl:function(n,o){var p;

switch(n){case k:p=new qx.ui.basic.Image();
p.setAlignY(g);
this._add(p);
break;
case m:p=new qx.ui.toolbar.PartContainer;
this._add(p);
break;
}return p||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,n);
},getChildrenContainer:function(){return this.getChildControl(m);
},_applySpacing:function(q,r){var s=this.getChildControl(m).getLayout();
q==null?s.resetSpacing():s.setSpacing(q);
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var u=this.getChildren();
var t=[];
var v;

for(var i=0,l=u.length;i<l;i++){v=u[i];

if(v instanceof qx.ui.menubar.Button){t.push(v);
}}return t;
}}});
})();
(function(){var f="both",e="toolbar/part/container",d="icon",c="changeShow",b="qx.ui.toolbar.PartContainer",a="label";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
this._setLayout(new qx.ui.layout.HBox);
},properties:{appearance:{refine:true,init:e},show:{init:f,check:[f,a,d],inheritable:true,event:c}}});
})();
(function(){var e="inherit",d="toolbar-button",c="keydown",b="qx.ui.toolbar.Button",a="keyup";
qx.Class.define(b,{extend:qx.ui.form.Button,construct:function(f,g,h){qx.ui.form.Button.call(this,f,g,h);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var b="changeModel",a="qx.ui.form.MModelProperty";
qx.Mixin.define(a,{properties:{model:{nullable:true,event:b,dereference:true}}});
})();
(function(){var b="qx.ui.form.IBooleanForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var b="qx.ui.form.IModel",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeModel":a},members:{setModel:function(c){},getModel:function(){},resetModel:function(){}}});
})();
(function(){var b="qx.ui.form.IRadioItem",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){},getValue:function(){},setGroup:function(d){this.assertInstance(d,qx.ui.form.RadioGroup);
},getGroup:function(){}}});
})();
(function(){var j="checked",i="qx.ui.form.RadioGroup",h="Boolean",g="menu-radiobutton",f="_applyValue",d="qx.ui.menu.RadioButton",c="changeValue",b="_applyGroup",a="execute";
qx.Class.define(d,{extend:qx.ui.menu.AbstractButton,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(k,l){qx.ui.menu.AbstractButton.call(this);
if(k!=null){this.setLabel(k);
}
if(l!=null){this.setMenu(l);
}this.addListener(a,this._onExecute,this);
},properties:{appearance:{refine:true,init:g},value:{check:h,nullable:true,event:c,apply:f,init:false},group:{check:i,nullable:true,apply:b}},members:{_applyValue:function(m,n){m?this.addState(j):this.removeState(j);
},_applyGroup:function(o,p){if(p){p.remove(this);
}
if(o){o.add(this);
}},_onExecute:function(e){this.setValue(true);
},_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var h="Please use an array as parameter.",g="qx.ui.form.MModelSelection",f="change",e="__ny",d="qx.debug",c="changeSelection",b="on",a="qx.event.type.Data";
qx.Mixin.define(g,{construct:function(){this.__ny=new qx.data.Array();
this.__ny.addListener(f,this.__nB,this);
this.addListener(c,this.__nA,this);
},events:{changeModelSelection:a},members:{__ny:null,__nz:false,__nA:function(){if(this.__nz){return;
}var m=this.getSelection();
var k=[];

for(var i=0;i<m.length;i++){var n=m[i];
var l=n.getModel?n.getModel():null;

if(l!==null){k.push(l);
}}if(k.length===m.length){this.setModelSelection(k);
}},__nB:function(){this.__nz=true;
var p=this.getSelectables(true);
var r=[];
var q=this.__ny.toArray();

for(var i=0;i<q.length;i++){var t=q[i];

for(var j=0;j<p.length;j++){var u=p[j];
var o=u.getModel?u.getModel():null;

if(t===o){r.push(u);
break;
}}}this.setSelection(r);
this.__nz=false;
var s=this.getSelection();

if(!qx.lang.Array.equals(s,r)){this.__nA();
}},getModelSelection:function(){return this.__ny;
},setModelSelection:function(v){if(!v){this.__ny.removeAll();
return;
}
if(qx.core.Variant.isSet(d,b)){this.assertArray(v,h);
}v.unshift(this.__ny.getLength());
v.unshift(0);
var w=this.__ny.splice.apply(this.__ny,v);
w.dispose();
}},destruct:function(){this._disposeObjects(e);
}});
})();
(function(){var a="qx.ui.form.IModelSelection";
qx.Interface.define(a,{members:{setModelSelection:function(b){},getModelSelection:function(){}}});
})();
(function(){var r="Boolean",q="changeInvalidMessage",p="changeValue",o="String",n="_applyAllowEmptySelection",m="_applyInvalidMessage",k="qx.ui.form.RadioGroup",j="_applyValid",h="",g="changeRequired",c="changeValid",f="changeEnabled",d="__nE",b="changeSelection",a="_applyEnabled";
qx.Class.define(k,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(s){qx.core.Object.call(this);
this.__nE=[];
this.addListener(b,this.__nF,this);

if(s!=null){this.add.apply(this,arguments);
}},properties:{enabled:{check:r,apply:a,event:f,init:true},wrap:{check:r,init:true},allowEmptySelection:{check:r,init:false,apply:n},valid:{check:r,init:true,apply:j,event:c},required:{check:r,init:false,event:g},invalidMessage:{check:o,init:h,event:q,apply:m},requiredInvalidMessage:{check:o,nullable:true,event:q}},members:{__nE:null,getItems:function(){return this.__nE;
},add:function(t){var u=this.__nE;
var v;

for(var i=0,l=arguments.length;i<l;i++){v=arguments[i];

if(qx.lang.Array.contains(u,v)){continue;
}v.addListener(p,this._onItemChangeChecked,this);
u.push(v);
v.setGroup(this);
if(v.getValue()){this.setSelection([v]);
}}if(!this.isAllowEmptySelection()&&u.length>0&&!this.getSelection()[0]){this.setSelection([u[0]]);
}},remove:function(w){var x=this.__nE;

if(qx.lang.Array.contains(x,w)){qx.lang.Array.remove(x,w);
if(w.getGroup()===this){w.resetGroup();
}w.removeListener(p,this._onItemChangeChecked,this);
if(w.getValue()){this.resetSelection();
}}},getChildren:function(){return this.__nE;
},_onItemChangeChecked:function(e){var y=e.getTarget();

if(y.getValue()){this.setSelection([y]);
}else if(this.getSelection()[0]==y){this.resetSelection();
}},_applyInvalidMessage:function(z,A){for(var i=0;i<this.__nE.length;i++){this.__nE[i].setInvalidMessage(z);
}},_applyValid:function(B,C){for(var i=0;i<this.__nE.length;i++){this.__nE[i].setValid(B);
}},_applyEnabled:function(D,E){var F=this.__nE;

if(D==null){for(var i=0,l=F.length;i<l;i++){F[i].resetEnabled();
}}else{for(var i=0,l=F.length;i<l;i++){F[i].setEnabled(D);
}}},_applyAllowEmptySelection:function(G,H){if(!G&&this.isSelectionEmpty()){this.resetSelection();
}},selectNext:function(){var I=this.getSelection()[0];
var K=this.__nE;
var J=K.indexOf(I);

if(J==-1){return;
}var i=0;
var length=K.length;
if(this.getWrap()){J=(J+1)%length;
}else{J=Math.min(J+1,length-1);
}
while(i<length&&!K[J].getEnabled()){J=(J+1)%length;
i++;
}this.setSelection([K[J]]);
},selectPrevious:function(){var L=this.getSelection()[0];
var N=this.__nE;
var M=N.indexOf(L);

if(M==-1){return;
}var i=0;
var length=N.length;
if(this.getWrap()){M=(M-1+length)%length;
}else{M=Math.max(M-1,0);
}
while(i<length&&!N[M].getEnabled()){M=(M-1+length)%length;
i++;
}this.setSelection([N[M]]);
},_getItems:function(){return this.getItems();
},_isAllowEmptySelection:function(){return this.isAllowEmptySelection();
},__nF:function(e){var P=e.getData()[0];
var O=e.getOldData()[0];

if(O){O.setValue(false);
}
if(P){P.setValue(true);
}}},destruct:function(){this._disposeArray(d);
}});
})();
(function(){var h="[",g="]",f=".",d="idBubble",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(i,j,name){this.fireDataEvent(c,{value:i,name:name,old:j});
this._registerEventChaining(i,j,name);
},_registerEventChaining:function(k,l,name){if((k instanceof qx.core.Object)&&qx.Class.hasMixin(k.constructor,qx.data.marshal.MEventBubbling)){var m=qx.lang.Function.bind(this.__nG,this,name);
var n=k.addListener(c,m,this);
k.setUserData(d,n);
}if(l!=null&&l.getUserData&&l.getUserData(d)!=null){l.removeListenerById(l.getUserData(d));
}},__nG:function(name,e){var v=e.getData();
var r=v.value;
var p=v.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(v.name.indexOf){var u=v.name.indexOf(f)!=-1?v.name.indexOf(f):v.name.length;
var s=v.name.indexOf(h)!=-1?v.name.indexOf(h):v.name.length;

if(u<s){var o=v.name.substring(0,u);
var t=v.name.substring(u+1,v.name.length);

if(t[0]!=h){t=f+t;
}var q=name+h+o+g+t;
}else if(s<u){var o=v.name.substring(0,s);
var t=v.name.substring(s,v.name.length);
var q=name+h+o+g+t;
}else{var q=name+h+v.name+g;
}}else{var q=name+h+v.name+g;
}}else{var q=name+f+v.name;
}this.fireDataEvent(c,{value:r,name:q,old:p});
}}});
})();
(function(){var o="change",n="add",m="remove",l="order",k="qx.event.type.Data",j="The parameter must be an array.",h="",g="qx.data.Array",f="?",e="changeBubble",b="number",d="on",c="changeLength",a="qx.debug";
qx.Class.define(g,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(p){qx.core.Object.call(this);
if(p==undefined){this.__nH=[];
}else if(arguments.length>1){this.__nH=[];

for(var i=0;i<arguments.length;i++){this.__nH.push(arguments[i]);
}}else if(typeof p==b){this.__nH=new Array(p);
}else if(p instanceof Array){this.__nH=qx.lang.Array.clone(p);
}else{this.__nH=[];
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__nH.length;i++){this._applyEventPropagation(this.__nH[i],null,i);
}this.__nI();
},events:{"change":k,"changeLength":k},members:{__nH:null,concat:function(q){if(q){var r=this.__nH.concat(q);
}else{var r=this.__nH.concat();
}return new qx.data.Array(r);
},join:function(s){return this.__nH.join(s);
},pop:function(){var t=this.__nH.pop();
this.__nI();
this._applyEventPropagation(null,t,this.length-1);
this.fireDataEvent(o,{start:this.length-1,end:this.length-1,type:m,items:[t]},null);
return t;
},push:function(u){for(var i=0;i<arguments.length;i++){this.__nH.push(arguments[i]);
this.__nI();
this._applyEventPropagation(arguments[i],null,this.length-1);
this.fireDataEvent(o,{start:this.length-1,end:this.length-1,type:n,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){this.__nH.reverse();
this.fireDataEvent(o,{start:0,end:this.length-1,type:l,items:null},null);
},shift:function(){var v=this.__nH.shift();
this.__nI();
this._applyEventPropagation(null,v,this.length-1);
this.fireDataEvent(o,{start:0,end:this.length-1,type:m,items:[v]},null);
return v;
},slice:function(w,x){return new qx.data.Array(this.__nH.slice(w,x));
},splice:function(y,z,A){var G=this.__nH.length;
var D=this.__nH.splice.apply(this.__nH,arguments);
if(this.__nH.length!=G){this.__nI();
}var E=z>0;
var B=arguments.length>2;
var C=null;

if(E||B){if(this.__nH.length>G){var F=n;
}else if(this.__nH.length<G){var F=m;
C=D;
}else{var F=l;
}this.fireDataEvent(o,{start:y,end:this.length-1,type:F,items:C},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,y+i);
}this.fireDataEvent(e,{value:this,name:f,old:D});
for(var i=0;i<D.length;i++){this._applyEventPropagation(null,D[i],i);
}return (new qx.data.Array(D));
},sort:function(H){this.__nH.sort.apply(this.__nH,arguments);
this.fireDataEvent(o,{start:0,end:this.length-1,type:l,items:null},null);
},unshift:function(I){for(var i=arguments.length-1;i>=0;i--){this.__nH.unshift(arguments[i]);
this.__nI();
this._applyEventPropagation(arguments[i],null,0);
this.fireDataEvent(o,{start:0,end:this.length-1,type:n,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__nH;
},getItem:function(J){return this.__nH[J];
},setItem:function(K,L){var M=this.__nH[K];
if(M===L){return;
}this.__nH[K]=L;
this._applyEventPropagation(L,M,K);
if(this.length!=this.__nH.length){this.__nI();
}this.fireDataEvent(o,{start:K,end:K,type:n,items:[L]},null);
},getLength:function(){return this.length;
},indexOf:function(N){return this.__nH.indexOf(N);
},toString:function(){if(this.__nH!=null){return this.__nH.toString();
}return h;
},contains:function(O){return this.__nH.indexOf(O)!==-1;
},copy:function(){return this.concat();
},insertAt:function(P,Q){this.splice(P,0,Q);
},insertBefore:function(R,S){var T=this.indexOf(R);

if(T==-1){this.push(S);
}else{this.splice(T,0,S);
}},insertAfter:function(U,V){var W=this.indexOf(U);

if(W==-1||W==(this.length-1)){this.push(V);
}else{this.splice(W+1,0,V);
}},removeAt:function(X){return this.splice(X,1).getItem(0);
},removeAll:function(){for(var i=0;i<this.__nH.length;i++){this._applyEventPropagation(null,this.__nH[i],i);
}var ba=this.getLength();
var Y=this.__nH.concat();
this.__nH.length=0;
this.__nI();
this.fireDataEvent(o,{start:0,end:ba-1,type:m,items:Y},null);
},append:function(bb){if(bb instanceof qx.data.Array){bb=bb.toArray();
}if(qx.core.Variant.isSet(a,d)){qx.core.Assert.assertArray(bb,j);
}for(var i=0;i<bb.length;i++){this._applyEventPropagation(bb[i],null,this.__nH.length+i);
}Array.prototype.push.apply(this.__nH,bb);
var bc=this.length;
this.__nI();
this.fireDataEvent(o,{start:bc,end:this.length-1,type:n,items:bb},null);
},remove:function(bd){var be=this.indexOf(bd);

if(be!=-1){this.splice(be,1);
return bd;
}},equals:function(bf){if(this.length!==bf.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==bf.getItem(i)){return false;
}}return true;
},sum:function(){var bg=0;

for(var i=0;i<this.length;i++){bg+=this.getItem(i);
}return bg;
},max:function(){var bh=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>bh){bh=this.getItem(i);
}}return bh===undefined?null:bh;
},min:function(){var bi=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<bi){bi=this.getItem(i);
}}return bi===undefined?null:bi;
},forEach:function(bj,bk){for(var i=0;i<this.__nH.length;i++){bj.call(bk,this.__nH[i]);
}},__nI:function(){var bl=this.length;
this.length=this.__nH.length;
this.fireDataEvent(c,this.length,bl);
}},destruct:function(){for(var i=0;i<this.__nH.length;i++){this._applyEventPropagation(null,this.__nH[i],i);
}this.__nH=null;
}});
})();
(function(){var e="arrow",d="qx.ui.toolbar.MenuButton",c="Boolean",b="_applyShowArrow",a="toolbar-menubutton";
qx.Class.define(d,{extend:qx.ui.menubar.Button,properties:{appearance:{refine:true,init:a},showArrow:{check:c,init:false,themeable:true,apply:b}},members:{_createChildControlImpl:function(f,g){var h;

switch(f){case e:h=new qx.ui.basic.Image();
h.setAnonymous(true);
this._addAt(h,10);
break;
}return h||qx.ui.menubar.Button.prototype._createChildControlImpl.call(this,f);
},_applyShowArrow:function(i,j){if(i){this._showChildControl(e);
}else{this._excludeChildControl(e);
}}}});
})();
(function(){var k="pressed",j="abandoned",i="hovered",h="Boolean",g="Space",f="undetermined",d="Enter",c="checked",b="mousedown",a="_applyTriState",w="mouseout",v="changeValue",u="keydown",t="_applyGroup",s="button",r="execute",q="qx.ui.form.RadioGroup",p="_applyValue",o="qx.ui.form.ToggleButton",n="mouseover",l="keyup",m="mouseup";
qx.Class.define(o,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IBooleanForm,qx.ui.form.IExecutable,qx.ui.form.IRadioItem],construct:function(x,y){qx.ui.basic.Atom.call(this,x,y);
this.addListener(n,this._onMouseOver);
this.addListener(w,this._onMouseOut);
this.addListener(b,this._onMouseDown);
this.addListener(m,this._onMouseUp);
this.addListener(u,this._onKeyDown);
this.addListener(l,this._onKeyUp);
this.addListener(r,this._onExecute,this);
},properties:{appearance:{refine:true,init:s},focusable:{refine:true,init:true},value:{check:h,nullable:true,event:v,apply:p,init:false},group:{check:q,nullable:true,apply:t},triState:{check:h,apply:a,nullable:true,init:null}},members:{_applyGroup:function(z,A){if(A){A.remove(this);
}
if(z){z.add(this);
}},_applyValue:function(B,C){B?this.addState(c):this.removeState(c);

if(this.isTriState()){if(B===null){this.addState(f);
}else if(C===null){this.removeState(f);
}}},_applyTriState:function(D,E){this._applyValue(this.getValue());
},_onExecute:function(e){this.toggleValue();
},_onMouseOver:function(e){if(e.getTarget()!==this){return;
}this.addState(i);

if(this.hasState(j)){this.removeState(j);
this.addState(k);
}},_onMouseOut:function(e){if(e.getTarget()!==this){return;
}this.removeState(i);

if(this.hasState(k)){if(!this.getValue()){this.removeState(k);
}this.addState(j);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.removeState(j);
this.addState(k);
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(this.hasState(j)){this.removeState(j);
}else if(this.hasState(k)){this.execute();
}this.removeState(k);
e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case d:case g:this.removeState(j);
this.addState(k);
e.stopPropagation();
}},_onKeyUp:function(e){if(!this.hasState(k)){return;
}
switch(e.getKeyIdentifier()){case d:case g:this.removeState(j);
this.execute();
this.removeState(k);
e.stopPropagation();
}}}});
})();
(function(){var e="inherit",d="toolbar-button",c="qx.ui.toolbar.CheckBox",b="keydown",a="keyup";
qx.Class.define(c,{extend:qx.ui.form.ToggleButton,construct:function(f,g){qx.ui.form.ToggleButton.call(this,f,g);
this.removeListener(b,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var a="qx.ui.toolbar.RadioButton";
qx.Class.define(a,{extend:qx.ui.toolbar.CheckBox,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel,qx.ui.form.IRadioItem],members:{_applyValue:function(b,c){qx.ui.toolbar.CheckBox.prototype._applyValue.call(this,b,c);

if(b){var d=this.getGroup();

if(d){d.setSelection([this]);
}}},_onExecute:function(e){var f=this.getGroup();

if(f&&f.getAllowEmptySelection()||!f){this.toggleValue();
}else{this.setValue(true);
}}}});
})();
(function(){var g="String",f="qx.ui.embed.AbstractIframe",e="name",d="",c="_applySource",b="qx.event.type.Event",a="_applyFrameName";
qx.Class.define(f,{extend:qx.ui.core.Widget,construct:function(h){qx.ui.core.Widget.call(this);

if(h){this.setSource(h);
}},events:{"load":b},properties:{source:{check:g,apply:c,nullable:true},frameName:{check:g,init:d,apply:a}},members:{_getIframeElement:function(){throw new Error("Abstract method call");
},_applySource:function(i,j){this._getIframeElement().setSource(i);
},_applyFrameName:function(k,l){this._getIframeElement().setAttribute(e,k);
},getWindow:function(){return this._getIframeElement().getWindow();
},getDocument:function(){return this._getIframeElement().getDocument();
},getBody:function(){return this._getIframeElement().getBody();
},getName:function(){return this._getIframeElement().getName();
},reload:function(){this._getIframeElement().reload();
}}});
})();
(function(){var k="qx.client",j="mousedown",i="load",h="help",g="mouseup",f="losecapture",d="contextmenu",c="none",b="display",a="no",G="Boolean",F="px",E="url(",D=")",C="gecko",B="repeat",A="div",z="auto",y="_applyScrollbar",x="DOMNodeInserted",r="_applyNativeHelp",s="yes",p="scrolling",q="/",n="__nY",o="appear",l="mshtml",m="block",t="qx.ui.embed.Iframe",u="iframe",w="qx/static/blank.gif",v="absolute";
qx.Class.define(t,{extend:qx.ui.embed.AbstractIframe,construct:function(H){if(H!=null){this.__nX=H;
}qx.ui.embed.AbstractIframe.call(this,H);
qx.event.Registration.addListener(document.body,j,this.block,this,true);
qx.event.Registration.addListener(document.body,g,this.release,this,true);
qx.event.Registration.addListener(document.body,f,this.release,this,true);
this.__nY=this._createBlockerElement();
this.getContainerElement().add(this.__nY);

if(qx.core.Variant.isSet(k,C)){this.addListenerOnce(o,function(e){var I=this.getContainerElement().getDomElement();
qx.bom.Event.addNativeListener(I,x,this._onDOMNodeInserted);
});
this._onDOMNodeInserted=qx.lang.Function.listener(this._syncSourceAfterDOMMove,this);
}},properties:{appearance:{refine:true,init:u},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:G,init:false,apply:r},scrollbar:{check:[z,a,s],nullable:true,themeable:true,apply:y}},members:{__nX:null,__nY:null,renderLayout:function(J,top,K,L){qx.ui.embed.AbstractIframe.prototype.renderLayout.call(this,J,top,K,L);
var N=F;
var M=this.getInsets();
this.__nY.setStyles({"left":M.left+N,"top":M.top+N,"width":(K-M.left-M.right)+N,"height":(L-M.top-M.bottom)+N});
},_createContentElement:function(){var O=new qx.html.Iframe(this.__nX);
O.addListener(i,this._onIframeLoad,this);
return O;
},_getIframeElement:function(){return this.getContentElement();
},_createBlockerElement:function(){var P=new qx.html.Element(A);
P.setStyles({"zIndex":20,"position":v,"display":c});
if(qx.core.Variant.isSet(k,l)){P.setStyles({backgroundImage:E+qx.util.ResourceManager.getInstance().toUri(w)+D,backgroundRepeat:B});
}return P;
},_onIframeLoad:function(e){this._applyNativeContextMenu(this.getNativeContextMenu(),null);
this._applyNativeHelp(this.getNativeHelp(),null);
this.fireNonBubblingEvent(i);
},block:function(){this.__nY.setStyle(b,m);
},release:function(){this.__nY.setStyle(b,c);
},_applyNativeContextMenu:function(Q,R){if(Q!==false&&R!==false){return;
}var S=this.getDocument();

if(!S){return;
}
try{var T=S.documentElement;
}catch(e){return ;
}
if(R===false){qx.event.Registration.removeListener(T,d,this._onNativeContextMenu,this,true);
}
if(Q===false){qx.event.Registration.addListener(T,d,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(k,{"mshtml":function(U,V){var document=this.getDocument();

if(!document){return;
}
try{if(V===false){qx.bom.Event.removeNativeListener(document,h,qx.lang.Function.returnFalse);
}
if(U===false){qx.bom.Event.addNativeListener(document,h,qx.lang.Function.returnFalse);
}}catch(e){}},"default":function(){}}),_syncSourceAfterDOMMove:function(){var X=this.getContentElement().getDomElement();
var W=X.src;
if(W.charAt(W.length-1)==q){W=W.substring(0,W.length-1);
}
if(W!=this.getSource()){qx.bom.Iframe.getWindow(X).stop();
X.src=this.getSource();
}},_applyScrollbar:function(Y){this.getContentElement().setAttribute(p,Y);
}},destruct:function(){this._disposeObjects(n);
qx.event.Registration.removeListener(document.body,j,this.block,this,true);
qx.event.Registration.removeListener(document.body,g,this.release,this,true);
qx.event.Registration.removeListener(document.body,f,this.release,this,true);
}});
})();
(function(){var e="source",d="name",c="qx.html.Iframe",b="qx.event.type.Event",a="iframe";
qx.Class.define(c,{extend:qx.html.Element,construct:function(f,g,h){qx.html.Element.call(this,a,g,h);
this._setProperty(e,f);
},events:{"load":b},members:{_applyProperty:function(name,i){qx.html.Element.prototype._applyProperty.call(this,name,i);

if(name==e){var j=this.getDomElement();
qx.bom.Iframe.setSource(j,i);
}},_createDomElement:function(){return qx.bom.Iframe.create(this._content);
},getWindow:function(){var k=this.getDomElement();

if(k){return qx.bom.Iframe.getWindow(k);
}else{return null;
}},getDocument:function(){var l=this.getDomElement();

if(l){return qx.bom.Iframe.getDocument(l);
}else{return null;
}},getBody:function(){var m=this.getDomElement();

if(m){return qx.bom.Iframe.getBody(m);
}else{return null;
}},setSource:function(n){this._setProperty(e,n);
return this;
},getSource:function(){return this._getProperty(e);
},setName:function(name){this.setAttribute(d,name);
return this;
},getName:function(){return this.getAttribute(d);
},reload:function(){var p=this.getDomElement();

if(p){var o=this.getSource();
this.setSource(null);
this.setSource(o);
}}}});
})();
(function(){var k="Number",j="_applyInsets",i="abstract",h="insetRight",g="insetTop",f="qx.debug",e="insetBottom",d="qx.ui.decoration.Abstract",c="shorthand",b="on",a="insetLeft";
qx.Class.define(d,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:i,properties:{insetLeft:{check:k,nullable:true,apply:j},insetRight:{check:k,nullable:true,apply:j},insetBottom:{check:k,nullable:true,apply:j},insetTop:{check:k,nullable:true,apply:j},insets:{group:[g,h,e,a],mode:c}},members:{__my:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__my=null;
},getInsets:function(){if(this.__my){return this.__my;
}var l=this._getDefaultInsets();
return this.__my={left:this.getInsetLeft()==null?l.left:this.getInsetLeft(),right:this.getInsetRight()==null?l.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?l.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?l.top:this.getInsetTop()};
},_applyInsets:function(){if(qx.core.Variant.isSet(f,b)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}this.__my=null;
}},destruct:function(){this.__my=null;
}});
})();
(function(){var s="_applyBackground",r="repeat",q="mshtml",p="on",o="backgroundPositionX",n="",m="backgroundPositionY",l="qx.debug",k="no-repeat",j="scale",d=" ",i="repeat-x",g="qx.client",c="repeat-y",b="hidden",f="qx.ui.decoration.MBackgroundImage",e="String",h='"></div>',a='<div style="';
qx.Mixin.define(f,{properties:{backgroundImage:{check:e,nullable:true,apply:s},backgroundRepeat:{check:[r,i,c,k,j],init:r,apply:s},backgroundPositionX:{nullable:true,apply:s},backgroundPositionY:{nullable:true,apply:s},backgroundPosition:{group:[m,o]}},members:{_generateBackgroundMarkup:function(t){var x=n;
var w=this.getBackgroundImage();
var v=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var y=this.getBackgroundPositionX();

if(y==null){y=0;
}t.backgroundPosition=y+d+top;
if(w){var u=qx.util.AliasManager.getInstance().resolve(w);
x=qx.bom.element.Decoration.create(u,v,t);
}else{if(t){if(qx.core.Variant.isSet(g,q)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){t.overflow=b;
}}x=a+qx.bom.element.Style.compile(t)+h;
}}return x;
},_applyBackground:function(){if(qx.core.Variant.isSet(l,p)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}}});
})();
(function(){var h="px",g="qx.ui.decoration.Background",f="",e="qx.debug",d="_applyStyle",c="on",b="Color",a="absolute";
qx.Class.define(g,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(i){qx.ui.decoration.Abstract.call(this);

if(i!=null){this.setBackgroundColor(i);
}},properties:{backgroundColor:{check:b,nullable:true,apply:d}},members:{__mz:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__mz;
},getMarkup:function(){if(this.__mz){return this.__mz;
}var j={position:a,top:0,left:0};
var k=this._generateBackgroundMarkup(j);
return this.__mz=k;
},resize:function(l,m,n){var o=this.getInsets();
l.style.width=(m-o.left-o.right)+h;
l.style.height=(n-o.top-o.bottom)+h;
l.style.left=-o.left+h;
l.style.top=-o.top+h;
},tint:function(p,q){var r=qx.theme.manager.Color.getInstance();

if(q==null){q=this.getBackgroundColor();
}p.style.backgroundColor=r.resolve(q)||f;
},_applyStyle:function(){if(qx.core.Variant.isSet(e,c)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}},destruct:function(){this.__mz=null;
}});
})();
(function(){var i="auto",h="overflowX",g="visible",f="hidden",e="scroll",d="overflowY",c="_applyOverflowX",b="_applyOverflowY",a="qx.ui.core.MNativeOverflow";
qx.Mixin.define(a,{properties:{overflowX:{check:[f,g,e,i],nullable:true,apply:c},overflowY:{check:[f,g,e,i],nullable:true,apply:b},overflow:{group:[h,d]}},members:{_applyOverflowX:function(j){this.getContentElement().setStyle(h,j);
},_applyOverflowY:function(k){this.getContentElement().setStyle(d,k);
}}});
})();
(function(){var o="none",n="text",m="",l="userSelect",k="color",j="String",i="0px",h="webkit",g="changeHtml",f="_applyCssClass",c="class",e="qx.ui.embed.Html",d="_applyHtml",b="qx.client",a="html";
qx.Class.define(e,{extend:qx.ui.core.Widget,include:[qx.ui.core.MNativeOverflow],construct:function(p){qx.ui.core.Widget.call(this);

if(p!=null){this.setHtml(p);
}},properties:{html:{check:j,apply:d,event:g,nullable:true},cssClass:{check:j,init:m,apply:f},selectable:{refine:true,init:true},focusable:{refine:true,init:true}},members:{getFocusElement:function(){return this.getContentElement();
},_applyHtml:function(q,r){var s=this.getContentElement();
s.setAttribute(a,q||m);
s.setStyles({"padding":i,"border":o});
},_applyCssClass:function(t,u){this.getContentElement().setAttribute(c,t);
},_applySelectable:function(v){qx.ui.core.Widget.prototype._applySelectable.call(this,v);
if(qx.core.Variant.isSet(b,h)){this.getContainerElement().setStyle(l,v?n:o);
this.getContentElement().setStyle(l,v?n:o);
}},_applyFont:function(w,x){var y=w?qx.theme.manager.Font.getInstance().resolve(w).getStyles():qx.bom.Font.getDefaultStyles();
this.getContentElement().setStyles(y);
},_applyTextColor:function(z,A){if(z){this.getContentElement().setStyle(k,qx.theme.manager.Color.getInstance().resolve(z));
}else{this.getContentElement().removeStyle(k);
}}}});
})();
(function(){var q="",p='.qxappender .type-array{color:#CC3E8A;font-weight:bold;}',o='.qxappender .type-instance{color:#565656;font-weight:bold}',n="qx.log.appender.Element",m='.qxappender .level-info{background:#DEEDFA}',l='.qxappender .type-stringify{color:#565656;font-weight:bold}',k='.qxappender .type-number{color:#155791;font-weight:normal;}',j="qxappender",i='.qxappender .type-map{color:#CC3E8A;font-weight:bold;}',h='.qxappender .type-class{color:#5F3E8A;font-weight:bold}',c='.qxappender .type-boolean{color:#15BC91;font-weight:normal;}',g='.qxappender .level-error{background:#FFE2D5}',f='.qxappender .level-debug{background:white}',b='.qxappender .type-key{color:#565656;font-style:italic}',a='.qxappender .level-user{background:#E3EFE9}',e='.qxappender .level-warn{background:#FFF7D5}',d='.qxappender .type-string{color:black;font-weight:normal;}';
qx.Class.define(n,{extend:qx.core.Object,construct:function(r){qx.core.Object.call(this);
var s=[f,m,e,g,a,d,k,c,p,i,b,h,o,l];
qx.bom.Stylesheet.createElement(s.join(q));
qx.log.Logger.register(this);
},members:{__oa:null,setElement:function(t){this.clear();
if(t){qx.bom.element.Class.add(t,j);
}this.__oa=t;
},clear:function(){var u=this.__oa;
if(u){u.innerHTML=q;
}},process:function(v){var w=this.__oa;

if(!w){return;
}w.appendChild(qx.log.appender.Util.toHtml(v));
w.scrollTop=w.scrollHeight;
}},destruct:function(){this.__oa=null;
}});
})();
(function(){var m="default",k="native",j="",h=" ",g="\\b",f="(\\s|$)",e="(^|\\s)",d="g",c="qx.bom.element.Class",b="$2",a="\\b|\\b";
qx.Class.define(c,{statics:{__ob:/\s+/g,__oc:/^\s+|\s+$/g,add:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(n,name){n.classList.add(name);
return name;
},"default":function(o,name){if(!this.has(o,name)){o.className+=(o.className?h:j)+name;
}return name;
}}),addClasses:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(p,q){for(var i=0;i<q.length;i++){p.classList.add(q[i]);
}return p.className;
},"default":function(r,s){var t={};
var v;
var u=r.className;

if(u){v=u.split(this.__ob);

for(var i=0,l=v.length;i<l;i++){t[v[i]]=true;
}
for(var i=0,l=s.length;i<l;i++){if(!t[s[i]]){v.push(s[i]);
}}}else{v=s;
}return r.className=v.join(h);
}}),get:function(w){return w.className;
},has:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(x,name){return x.classList.contains(name);
},"default":function(y,name){var z=new RegExp(e+name+f);
return z.test(y.className);
}}),remove:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(A,name){A.classList.remove(name);
return name;
},"default":function(B,name){var C=new RegExp(e+name+f);
B.className=B.className.replace(C,b);
return name;
}}),removeClasses:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(D,E){for(var i=0;i<E.length;i++){D.classList.remove(E[i]);
}return D.className;
},"default":function(F,G){var H=new RegExp(g+G.join(a)+g,d);
return F.className=F.className.replace(H,j).replace(this.__oc,j).replace(this.__ob,h);
}}),replace:function(I,J,K){this.remove(I,J);
return this.add(I,K);
},toggle:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(L,name,M){if(M===undefined){L.classList.toggle(name);
}else{M?this.add(L,name):this.remove(L,name);
}return name;
},"default":function(N,name,O){if(O==null){O=!this.has(N,name);
}O?this.add(N,name):this.remove(N,name);
return name;
}})}});
})();
(function(){var b="qx.nativeScrollBars",a="qx.ui.core.scroll.MScrollBarFactory";
qx.core.Setting.define(b,false);
qx.Mixin.define(a,{members:{_createScrollBar:function(c){if(qx.core.Setting.get(b)){return new qx.ui.core.scroll.NativeScrollBar(c);
}else{return new qx.ui.core.scroll.ScrollBar(c);
}}}});
})();
(function(){var k="scrollbar-y",j="scrollbar-x",i="pane",h="auto",g="corner",f="scrollbar-",d="on",c="_computeScrollbars",b="getDocument",a="changeVisibility",D="off",C="x",B="scroll",A="touchmove",z="scrollY",y="Left",x="mousewheel",w="scrollbarX",v="scrollarea",u="y",r="vertical",s="scrollX",p="touchstart",q="horizontal",n="qx.ui.core.scroll.AbstractScrollArea",o="abstract",l="update",m="scrollbarY",t="Top";
qx.Class.define(n,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,type:o,construct:function(){qx.ui.core.Widget.call(this);
var E=new qx.ui.layout.Grid();
E.setColumnFlex(0,1);
E.setRowFlex(0,1);
this._setLayout(E);
this.addListener(x,this._onMouseWheel,this);
if(qx.bom.client.Feature.TOUCH){this.addListener(A,this._onTouchMove,this);
this.addListener(p,function(){this.__od={"x":0,"y":0};
},this);
this.__od={};
this.__oe={};
}},properties:{appearance:{refine:true,init:v},width:{refine:true,init:100},height:{refine:true,init:200},scrollbarX:{check:[h,d,D],init:h,themeable:true,apply:c},scrollbarY:{check:[h,d,D],init:h,themeable:true,apply:c},scrollbar:{group:[w,m]}},members:{__od:null,__oe:null,_createChildControlImpl:function(F,G){var H;

switch(F){case i:H=new qx.ui.core.scroll.ScrollPane();
H.addListener(l,this._computeScrollbars,this);
H.addListener(s,this._onScrollPaneX,this);
H.addListener(z,this._onScrollPaneY,this);
this._add(H,{row:0,column:0});
break;
case j:H=this._createScrollBar(q);
H.setMinWidth(0);
H.exclude();
H.addListener(B,this._onScrollBarX,this);
H.addListener(a,this._onChangeScrollbarXVisibility,this);
this._add(H,{row:1,column:0});
break;
case k:H=this._createScrollBar(r);
H.setMinHeight(0);
H.exclude();
H.addListener(B,this._onScrollBarY,this);
H.addListener(a,this._onChangeScrollbarYVisibility,this);
this._add(H,{row:0,column:1});
break;
case g:H=new qx.ui.core.Widget();
H.setWidth(0);
H.setHeight(0);
H.exclude();
this._add(H,{row:1,column:1});
break;
}return H||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,F);
},getPaneSize:function(){return this.getChildControl(i).getInnerSize();
},getItemTop:function(I){return this.getChildControl(i).getItemTop(I);
},getItemBottom:function(J){return this.getChildControl(i).getItemBottom(J);
},getItemLeft:function(K){return this.getChildControl(i).getItemLeft(K);
},getItemRight:function(L){return this.getChildControl(i).getItemRight(L);
},scrollToX:function(M){qx.ui.core.queue.Manager.flush();
this.getChildControl(j).scrollTo(M);
},scrollByX:function(N){qx.ui.core.queue.Manager.flush();
this.getChildControl(j).scrollBy(N);
},getScrollX:function(){var O=this.getChildControl(j,true);
return O?O.getPosition():0;
},scrollToY:function(P){qx.ui.core.queue.Manager.flush();
this.getChildControl(k).scrollTo(P);
},scrollByY:function(Q){qx.ui.core.queue.Manager.flush();
this.getChildControl(k).scrollBy(Q);
},getScrollY:function(){var R=this.getChildControl(k,true);
return R?R.getPosition():0;
},_onScrollBarX:function(e){this.getChildControl(i).scrollToX(e.getData());
},_onScrollBarY:function(e){this.getChildControl(i).scrollToY(e.getData());
},_onScrollPaneX:function(e){this.scrollToX(e.getData());
},_onScrollPaneY:function(e){this.scrollToY(e.getData());
},_onMouseWheel:function(e){var T=this._isChildControlVisible(j);
var U=this._isChildControlVisible(k);
var S=(U)?this.getChildControl(k,true):(T?this.getChildControl(j,true):null);

if(S){S.scrollBySteps(e.getWheelDelta());
e.stop();
}},_onTouchMove:function(e){this._onTouchMoveDirectional(C,e);
this._onTouchMoveDirectional(u,e);
e.stop();
},_onTouchMoveDirectional:function(V,e){var W=(V==C?y:t);
var Y=this.getChildControl(f+V,true);
var ba=this._isChildControlVisible(f+V);

if(ba&&Y){if(this.__od[V]==0){var X=0;
}else{var X=-(e[b+W]()-this.__od[V]);
}this.__od[V]=e[b+W]();
Y.scrollBy(X);
if(this.__oe[V]){clearTimeout(this.__oe[V]);
this.__oe[V]=null;
}this.__oe[V]=setTimeout(qx.lang.Function.bind(function(bb){this.__of(bb,V);
},this,X),100);
}},__of:function(bc,bd){this.__oe[bd]=null;
var bf=this._isChildControlVisible(f+bd);

if(bc==0||!bf){return;
}if(bc>0){bc=Math.max(0,bc-3);
}else{bc=Math.min(0,bc+3);
}this.__oe[bd]=setTimeout(qx.lang.Function.bind(function(bg,bh){this.__of(bg,bh);
},this,bc,bd),20);
var be=this.getChildControl(f+bd,true);
be.scrollBy(bc);
},_onChangeScrollbarXVisibility:function(e){var bi=this._isChildControlVisible(j);
var bj=this._isChildControlVisible(k);

if(!bi){this.scrollToX(0);
}bi&&bj?this._showChildControl(g):this._excludeChildControl(g);
},_onChangeScrollbarYVisibility:function(e){var bk=this._isChildControlVisible(j);
var bl=this._isChildControlVisible(k);

if(!bl){this.scrollToY(0);
}bk&&bl?this._showChildControl(g):this._excludeChildControl(g);
},_computeScrollbars:function(){var bs=this.getChildControl(i);
var content=bs.getChildren()[0];

if(!content){this._excludeChildControl(j);
this._excludeChildControl(k);
return;
}var bm=this.getInnerSize();
var br=bs.getInnerSize();
var bp=bs.getScrollSize();
if(!br||!bp){return;
}var bt=this.getScrollbarX();
var bu=this.getScrollbarY();

if(bt===h&&bu===h){var bq=bp.width>bm.width;
var bv=bp.height>bm.height;
if((bq||bv)&&!(bq&&bv)){if(bq){bv=bp.height>br.height;
}else if(bv){bq=bp.width>br.width;
}}}else{var bq=bt===d;
var bv=bu===d;
if(bp.width>(bq?br.width:bm.width)&&bt===h){bq=true;
}
if(bp.height>(bq?br.height:bm.height)&&bu===h){bv=true;
}}if(bq){var bo=this.getChildControl(j);
bo.show();
bo.setMaximum(Math.max(0,bp.width-br.width));
bo.setKnobFactor((bp.width===0)?0:br.width/bp.width);
}else{this._excludeChildControl(j);
}
if(bv){var bn=this.getChildControl(k);
bn.show();
bn.setMaximum(Math.max(0,bp.height-br.height));
bn.setKnobFactor((bp.height===0)?0:br.height/bp.height);
}else{this._excludeChildControl(k);
}}}});
})();
(function(){var p="Integer",o="_applyContentPadding",n="resetPaddingRight",m="setPaddingBottom",l="resetPaddingTop",k="qx.ui.core.MContentPadding",j="resetPaddingLeft",i="setPaddingTop",h="setPaddingRight",g="resetPaddingBottom",c="contentPaddingLeft",f="setPaddingLeft",e="contentPaddingTop",b="shorthand",a="contentPaddingRight",d="contentPaddingBottom";
qx.Mixin.define(k,{properties:{contentPaddingTop:{check:p,init:0,apply:o,themeable:true},contentPaddingRight:{check:p,init:0,apply:o,themeable:true},contentPaddingBottom:{check:p,init:0,apply:o,themeable:true},contentPaddingLeft:{check:p,init:0,apply:o,themeable:true},contentPadding:{group:[e,a,d,c],mode:b,themeable:true}},members:{__og:{contentPaddingTop:i,contentPaddingRight:h,contentPaddingBottom:m,contentPaddingLeft:f},__oh:{contentPaddingTop:l,contentPaddingRight:n,contentPaddingBottom:g,contentPaddingLeft:j},_applyContentPadding:function(q,r,name){var s=this._getContentPaddingTarget();

if(q==null){var t=this.__oh[name];
s[t]();
}else{var u=this.__og[name];
s[u](q);
}}}});
})();
(function(){var v="single",u="Boolean",t="one",s="changeSelection",r="mouseup",q="mousedown",p="losecapture",o="multi",n="_applyQuickSelection",m="__oi",d="mouseover",l="_applySelectionMode",h="_applyDragSelection",c="qx.ui.core.MMultiSelectionHandling",b="removeItem",g="keypress",f="qx.event.type.Data",j="addItem",a="additive",k="mousemove";
qx.Mixin.define(c,{construct:function(){var x=this.SELECTION_MANAGER;
var w=this.__oi=new x(this);
this.addListener(q,w.handleMouseDown,w);
this.addListener(r,w.handleMouseUp,w);
this.addListener(d,w.handleMouseOver,w);
this.addListener(k,w.handleMouseMove,w);
this.addListener(p,w.handleLoseCapture,w);
this.addListener(g,w.handleKeyPress,w);
this.addListener(j,w.handleAddItem,w);
this.addListener(b,w.handleRemoveItem,w);
w.addListener(s,this._onSelectionChange,this);
},events:{"changeSelection":f},properties:{selectionMode:{check:[v,o,a,t],init:v,apply:l},dragSelection:{check:u,init:false,apply:h},quickSelection:{check:u,init:false,apply:n}},members:{__oi:null,selectAll:function(){this.__oi.selectAll();
},isSelected:function(y){if(!qx.ui.core.Widget.contains(this,y)){throw new Error("Could not test if "+y+" is selected, because it is not a child element!");
}return this.__oi.isItemSelected(y);
},addToSelection:function(z){if(!qx.ui.core.Widget.contains(this,z)){throw new Error("Could not add + "+z+" to selection, because it is not a child element!");
}this.__oi.addItem(z);
},removeFromSelection:function(A){if(!qx.ui.core.Widget.contains(this,A)){throw new Error("Could not remove "+A+" from selection, because it is not a child element!");
}this.__oi.removeItem(A);
},selectRange:function(B,C){this.__oi.selectItemRange(B,C);
},resetSelection:function(){this.__oi.clearSelection();
},setSelection:function(D){for(var i=0;i<D.length;i++){if(!qx.ui.core.Widget.contains(this,D[i])){throw new Error("Could not select "+D[i]+", because it is not a child element!");
}}
if(D.length===0){this.resetSelection();
}else{var E=this.getSelection();

if(!qx.lang.Array.equals(E,D)){this.__oi.replaceSelection(D);
}}},getSelection:function(){return this.__oi.getSelection();
},getSortedSelection:function(){return this.__oi.getSortedSelection();
},isSelectionEmpty:function(){return this.__oi.isSelectionEmpty();
},getSelectionContext:function(){return this.__oi.getSelectionContext();
},_getManager:function(){return this.__oi;
},getSelectables:function(F){return this.__oi.getSelectables(F);
},invertSelection:function(){this.__oi.invertSelection();
},_getLeadItem:function(){var G=this.__oi.getMode();

if(G===v||G===t){return this.__oi.getSelectedItem();
}else{return this.__oi.getLeadItem();
}},_applySelectionMode:function(H,I){this.__oi.setMode(H);
},_applyDragSelection:function(J,K){this.__oi.setDrag(J);
},_applyQuickSelection:function(L,M){this.__oi.setQuick(L);
},_onSelectionChange:function(e){this.fireDataEvent(s,e.getData());
}},destruct:function(){this._disposeObjects(m);
}});
})();
(function(){var a="qx.ui.core.IMultiSelection";
qx.Interface.define(a,{extend:qx.ui.core.ISingleSelection,members:{selectAll:function(){return true;
},addToSelection:function(b){return arguments.length==1;
},removeFromSelection:function(c){return arguments.length==1;
}}});
})();
(function(){var o="one",n="single",m="selected",k="additive",j="multi",h="PageUp",g="under",f="Left",d="lead",c="Down",M="Up",L="Boolean",K="PageDown",J="anchor",I="End",H="Home",G="Right",F="right",E="click",D="above",v="left",w="Escape",t="A",u="Space",r="_applyMode",s="interval",p="changeSelection",q="qx.event.type.Data",x="quick",y="key",A="abstract",z="__om",C="drag",B="qx.ui.core.selection.Abstract";
qx.Class.define(B,{type:A,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__oj={};
},events:{"changeSelection":q},properties:{mode:{check:[n,j,k,o],init:n,apply:r},drag:{check:L,init:false},quick:{check:L,init:false}},members:{__ok:0,__ol:0,__om:null,__on:null,__oo:null,__op:null,__oq:null,__or:null,__os:null,__ot:null,__ou:null,__ov:null,__ow:null,__ox:null,__oy:null,__oz:null,__oA:null,__oj:null,__oB:null,__oC:null,_userInteraction:false,__oD:null,getSelectionContext:function(){return this.__oz;
},selectAll:function(){var N=this.getMode();

if(N==n||N==o){throw new Error("Can not select all items in selection mode: "+N);
}this._selectAllItems();
this._fireChange();
},selectItem:function(O){this._setSelectedItem(O);
var P=this.getMode();

if(P!==n&&P!==o){this._setLeadItem(O);
this._setAnchorItem(O);
}this._scrollItemIntoView(O);
this._fireChange();
},addItem:function(Q){var R=this.getMode();

if(R===n||R===o){this._setSelectedItem(Q);
}else{if(!this._getAnchorItem()){this._setAnchorItem(Q);
}this._setLeadItem(Q);
this._addToSelection(Q);
}this._scrollItemIntoView(Q);
this._fireChange();
},removeItem:function(S){this._removeFromSelection(S);

if(this.getMode()===o&&this.isSelectionEmpty()){var T=this._getFirstSelectable();

if(T){this.addItem(T);
}if(T==S){return;
}}
if(this.getLeadItem()==S){this._setLeadItem(null);
}
if(this._getAnchorItem()==S){this._setAnchorItem(null);
}this._fireChange();
},selectItemRange:function(U,V){var W=this.getMode();

if(W==n||W==o){throw new Error("Can not select multiple items in selection mode: "+W);
}this._selectItemRange(U,V);
this._setAnchorItem(U);
this._setLeadItem(V);
this._scrollItemIntoView(V);
this._fireChange();
},clearSelection:function(){if(this.getMode()==o){return;
}this._clearSelection();
this._setLeadItem(null);
this._setAnchorItem(null);
this._fireChange();
},replaceSelection:function(X){var Y=this.getMode();

if(Y==o||Y===n){if(X.length>1){throw new Error("Could not select more than one items in mode: "+Y+"!");
}
if(X.length==1){this.selectItem(X[0]);
}else{this.clearSelection();
}return;
}else{this._replaceMultiSelection(X);
}},getSelectedItem:function(){var ba=this.getMode();

if(ba===n||ba===o){return this._getSelectedItem()||null;
}throw new Error("The method getSelectedItem() is only supported in 'single' and 'one' selection mode!");
},getSelection:function(){return qx.lang.Object.getValues(this.__oj);
},getSortedSelection:function(){var bc=this.getSelectables();
var bb=qx.lang.Object.getValues(this.__oj);
bb.sort(function(a,b){return bc.indexOf(a)-bc.indexOf(b);
});
return bb;
},isItemSelected:function(bd){var be=this._selectableToHashCode(bd);
return this.__oj[be]!==undefined;
},isSelectionEmpty:function(){return qx.lang.Object.isEmpty(this.__oj);
},invertSelection:function(){var bg=this.getMode();

if(bg===n||bg===o){throw new Error("The method invertSelection() is only supported in 'multi' and 'additive' selection mode!");
}var bf=this.getSelectables();

for(var i=0;i<bf.length;i++){this._toggleInSelection(bf[i]);
}this._fireChange();
},_setLeadItem:function(bh){var bi=this.__oA;

if(bi!==null){this._styleSelectable(bi,d,false);
}
if(bh!==null){this._styleSelectable(bh,d,true);
}this.__oA=bh;
},getLeadItem:function(){return this.__oA!==null?this.__oA:null;
},_setAnchorItem:function(bj){var bk=this.__oB;

if(bk){this._styleSelectable(bk,J,false);
}
if(bj){this._styleSelectable(bj,J,true);
}this.__oB=bj;
},_getAnchorItem:function(){return this.__oB!==null?this.__oB:null;
},_isSelectable:function(bl){throw new Error("Abstract method call: _isSelectable()");
},_getSelectableFromMouseEvent:function(event){var bm=event.getTarget();
if(bm&&this._isSelectable(bm)){return bm;
}return null;
},_selectableToHashCode:function(bn){throw new Error("Abstract method call: _selectableToHashCode()");
},_styleSelectable:function(bo,bp,bq){throw new Error("Abstract method call: _styleSelectable()");
},_capture:function(){throw new Error("Abstract method call: _capture()");
},_releaseCapture:function(){throw new Error("Abstract method call: _releaseCapture()");
},_getLocation:function(){throw new Error("Abstract method call: _getLocation()");
},_getDimension:function(){throw new Error("Abstract method call: _getDimension()");
},_getSelectableLocationX:function(br){throw new Error("Abstract method call: _getSelectableLocationX()");
},_getSelectableLocationY:function(bs){throw new Error("Abstract method call: _getSelectableLocationY()");
},_getScroll:function(){throw new Error("Abstract method call: _getScroll()");
},_scrollBy:function(bt,bu){throw new Error("Abstract method call: _scrollBy()");
},_scrollItemIntoView:function(bv){throw new Error("Abstract method call: _scrollItemIntoView()");
},getSelectables:function(bw){throw new Error("Abstract method call: getSelectables()");
},_getSelectableRange:function(bx,by){throw new Error("Abstract method call: _getSelectableRange()");
},_getFirstSelectable:function(){throw new Error("Abstract method call: _getFirstSelectable()");
},_getLastSelectable:function(){throw new Error("Abstract method call: _getLastSelectable()");
},_getRelatedSelectable:function(bz,bA){throw new Error("Abstract method call: _getRelatedSelectable()");
},_getPage:function(bB,bC){throw new Error("Abstract method call: _getPage()");
},_applyMode:function(bD,bE){this._setLeadItem(null);
this._setAnchorItem(null);
this._clearSelection();
if(bD===o){var bF=this._getFirstSelectable();

if(bF){this._setSelectedItem(bF);
this._scrollItemIntoView(bF);
}}this._fireChange();
},handleMouseOver:function(event){if(this.__oD!=null&&this.__oD!=this._getScroll().top){this.__oD=null;
return;
}this._userInteraction=true;

if(!this.getQuick()){this._userInteraction=false;
return;
}var bH=this.getMode();

if(bH!==o&&bH!==n){this._userInteraction=false;
return;
}var bG=this._getSelectableFromMouseEvent(event);

if(bG===null){this._userInteraction=false;
return;
}this._setSelectedItem(bG);
this._fireChange(x);
this._userInteraction=false;
},handleMouseDown:function(event){this._userInteraction=true;
var bJ=this._getSelectableFromMouseEvent(event);

if(bJ===null){this._userInteraction=false;
return;
}var bL=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bI=event.isShiftPressed();
if(this.isItemSelected(bJ)&&!bI&&!bL&&!this.getDrag()){this.__oC=bJ;
this._userInteraction=false;
return;
}else{this.__oC=null;
}this._scrollItemIntoView(bJ);
switch(this.getMode()){case n:case o:this._setSelectedItem(bJ);
break;
case k:this._setLeadItem(bJ);
this._setAnchorItem(bJ);
this._toggleInSelection(bJ);
break;
case j:this._setLeadItem(bJ);
if(bI){var bK=this._getAnchorItem();

if(bK===null){bK=this._getFirstSelectable();
this._setAnchorItem(bK);
}this._selectItemRange(bK,bJ,bL);
}else if(bL){this._setAnchorItem(bJ);
this._toggleInSelection(bJ);
}else{this._setAnchorItem(bJ);
this._setSelectedItem(bJ);
}break;
}var bM=this.getMode();

if(this.getDrag()&&bM!==n&&bM!==o&&!bI&&!bL){this.__oq=this._getLocation();
this.__on=this._getScroll();
this.__or=event.getDocumentLeft()+this.__on.left;
this.__os=event.getDocumentTop()+this.__on.top;
this.__ot=true;
this._capture();
}this._fireChange(E);
this._userInteraction=false;
},handleMouseUp:function(event){this._userInteraction=true;
var bQ=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bN=event.isShiftPressed();

if(!bQ&&!bN&&this.__oC){var bO=this._getSelectableFromMouseEvent(event);

if(bO===null||!this.isItemSelected(bO)){this._userInteraction=false;
return;
}var bP=this.getMode();

if(bP===k){this._removeFromSelection(bO);
}else{this._setSelectedItem(bO);

if(this.getMode()===j){this._setLeadItem(bO);
this._setAnchorItem(bO);
}}this._userInteraction=false;
}this._cleanup();
},handleLoseCapture:function(event){this._cleanup();
},handleMouseMove:function(event){if(!this.__ot){return;
}this.__ou=event.getDocumentLeft();
this.__ov=event.getDocumentTop();
this._userInteraction=true;
var bS=this.__ou+this.__on.left;

if(bS>this.__or){this.__ow=1;
}else if(bS<this.__or){this.__ow=-1;
}else{this.__ow=0;
}var bR=this.__ov+this.__on.top;

if(bR>this.__os){this.__ox=1;
}else if(bR<this.__os){this.__ox=-1;
}else{this.__ox=0;
}var location=this.__oq;

if(this.__ou<location.left){this.__ok=this.__ou-location.left;
}else if(this.__ou>location.right){this.__ok=this.__ou-location.right;
}else{this.__ok=0;
}
if(this.__ov<location.top){this.__ol=this.__ov-location.top;
}else if(this.__ov>location.bottom){this.__ol=this.__ov-location.bottom;
}else{this.__ol=0;
}if(!this.__om){this.__om=new qx.event.Timer(100);
this.__om.addListener(s,this._onInterval,this);
}this.__om.start();
this._autoSelect();
event.stopPropagation();
this._userInteraction=false;
},handleAddItem:function(e){var bT=e.getData();

if(this.getMode()===o&&this.isSelectionEmpty()){this.addItem(bT);
}},handleRemoveItem:function(e){this.removeItem(e.getData());
},_cleanup:function(){if(!this.getDrag()&&this.__ot){return;
}if(this.__oy){this._fireChange(E);
}delete this.__ot;
delete this.__oo;
delete this.__op;
this._releaseCapture();
if(this.__om){this.__om.stop();
}},_onInterval:function(e){this._scrollBy(this.__ok,this.__ol);
this.__on=this._getScroll();
this._autoSelect();
},_autoSelect:function(){var cd=this._getDimension();
var bV=Math.max(0,Math.min(this.__ou-this.__oq.left,cd.width))+this.__on.left;
var bU=Math.max(0,Math.min(this.__ov-this.__oq.top,cd.height))+this.__on.top;
if(this.__oo===bV&&this.__op===bU){return;
}this.__oo=bV;
this.__op=bU;
var cf=this._getAnchorItem();
var bX=cf;
var cb=this.__ow;
var ce,bW;

while(cb!==0){ce=cb>0?this._getRelatedSelectable(bX,F):this._getRelatedSelectable(bX,v);
if(ce!==null){bW=this._getSelectableLocationX(ce);
if((cb>0&&bW.left<=bV)||(cb<0&&bW.right>=bV)){bX=ce;
continue;
}}break;
}var cc=this.__ox;
var ca,bY;

while(cc!==0){ca=cc>0?this._getRelatedSelectable(bX,g):this._getRelatedSelectable(bX,D);
if(ca!==null){bY=this._getSelectableLocationY(ca);
if((cc>0&&bY.top<=bU)||(cc<0&&bY.bottom>=bU)){bX=ca;
continue;
}}break;
}var cg=this.getMode();

if(cg===j){this._selectItemRange(cf,bX);
}else if(cg===k){if(this.isItemSelected(cf)){this._selectItemRange(cf,bX,true);
}else{this._deselectItemRange(cf,bX);
}this._setAnchorItem(bX);
}this._fireChange(C);
},__oE:{Home:1,Down:1,Right:1,PageDown:1,End:1,Up:1,Left:1,PageUp:1},handleKeyPress:function(event){this._userInteraction=true;
var cm,cl;
var co=event.getKeyIdentifier();
var cn=this.getMode();
var ci=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var cj=event.isShiftPressed();
var ck=false;

if(co===t&&ci){if(cn!==n&&cn!==o){this._selectAllItems();
ck=true;
}}else if(co===w){if(cn!==n&&cn!==o){this._clearSelection();
ck=true;
}}else if(co===u){var ch=this.getLeadItem();

if(ch&&!cj){if(ci||cn===k){this._toggleInSelection(ch);
}else{this._setSelectedItem(ch);
}ck=true;
}}else if(this.__oE[co]){ck=true;

if(cn===n||cn==o){cm=this._getSelectedItem();
}else{cm=this.getLeadItem();
}
if(cm!==null){switch(co){case H:cl=this._getFirstSelectable();
break;
case I:cl=this._getLastSelectable();
break;
case M:cl=this._getRelatedSelectable(cm,D);
break;
case c:cl=this._getRelatedSelectable(cm,g);
break;
case f:cl=this._getRelatedSelectable(cm,v);
break;
case G:cl=this._getRelatedSelectable(cm,F);
break;
case h:cl=this._getPage(cm,true);
break;
case K:cl=this._getPage(cm,false);
break;
}}else{switch(co){case H:case c:case G:case K:cl=this._getFirstSelectable();
break;
case I:case M:case f:case h:cl=this._getLastSelectable();
break;
}}if(cl!==null){switch(cn){case n:case o:this._setSelectedItem(cl);
break;
case k:this._setLeadItem(cl);
break;
case j:if(cj){var cp=this._getAnchorItem();

if(cp===null){this._setAnchorItem(cp=this._getFirstSelectable());
}this._setLeadItem(cl);
this._selectItemRange(cp,cl,ci);
}else{this._setAnchorItem(cl);
this._setLeadItem(cl);

if(!ci){this._setSelectedItem(cl);
}}break;
}this.__oD=this._getScroll().top;
this._scrollItemIntoView(cl);
}}
if(ck){event.stop();
this._fireChange(y);
}this._userInteraction=false;
},_selectAllItems:function(){var cq=this.getSelectables();

for(var i=0,l=cq.length;i<l;i++){this._addToSelection(cq[i]);
}},_clearSelection:function(){var cr=this.__oj;

for(var cs in cr){this._removeFromSelection(cr[cs]);
}this.__oj={};
},_selectItemRange:function(ct,cu,cv){var cy=this._getSelectableRange(ct,cu);
if(!cv){var cx=this.__oj;
var cz=this.__oF(cy);

for(var cw in cx){if(!cz[cw]){this._removeFromSelection(cx[cw]);
}}}for(var i=0,l=cy.length;i<l;i++){this._addToSelection(cy[i]);
}},_deselectItemRange:function(cA,cB){var cC=this._getSelectableRange(cA,cB);

for(var i=0,l=cC.length;i<l;i++){this._removeFromSelection(cC[i]);
}},__oF:function(cD){var cF={};
var cE;

for(var i=0,l=cD.length;i<l;i++){cE=cD[i];
cF[this._selectableToHashCode(cE)]=cE;
}return cF;
},_getSelectedItem:function(){for(var cG in this.__oj){return this.__oj[cG];
}return null;
},_setSelectedItem:function(cH){if(this._isSelectable(cH)){var cI=this.__oj;
var cJ=this._selectableToHashCode(cH);

if(!cI[cJ]||qx.lang.Object.hasMinLength(cI,2)){this._clearSelection();
this._addToSelection(cH);
}}},_addToSelection:function(cK){var cL=this._selectableToHashCode(cK);

if(!this.__oj[cL]&&this._isSelectable(cK)){this.__oj[cL]=cK;
this._styleSelectable(cK,m,true);
this.__oy=true;
}},_toggleInSelection:function(cM){var cN=this._selectableToHashCode(cM);

if(!this.__oj[cN]){this.__oj[cN]=cM;
this._styleSelectable(cM,m,true);
}else{delete this.__oj[cN];
this._styleSelectable(cM,m,false);
}this.__oy=true;
},_removeFromSelection:function(cO){var cP=this._selectableToHashCode(cO);

if(this.__oj[cP]!=null){delete this.__oj[cP];
this._styleSelectable(cO,m,false);
this.__oy=true;
}},_replaceMultiSelection:function(cQ){var cT=false;
var cW,cV;
var cR={};

for(var i=0,l=cQ.length;i<l;i++){cW=cQ[i];

if(this._isSelectable(cW)){cV=this._selectableToHashCode(cW);
cR[cV]=cW;
}}var cX=cQ[0];
var cS=cW;
var cU=this.__oj;

for(var cV in cU){if(cR[cV]){delete cR[cV];
}else{cW=cU[cV];
delete cU[cV];
this._styleSelectable(cW,m,false);
cT=true;
}}for(var cV in cR){cW=cU[cV]=cR[cV];
this._styleSelectable(cW,m,true);
cT=true;
}if(!cT){return false;
}this._scrollItemIntoView(cS);
this._setLeadItem(cX);
this._setAnchorItem(cX);
this.__oy=true;
this._fireChange();
},_fireChange:function(cY){if(this.__oy){this.__oz=cY||null;
this.fireDataEvent(p,this.getSelection());
delete this.__oy;
}}},destruct:function(){this._disposeObjects(z);
this.__oj=this.__oC=this.__oB=null;
this.__oA=null;
}});
})();
(function(){var f="vertical",e="under",d="above",c="qx.ui.core.selection.Widget",b="left",a="right";
qx.Class.define(c,{extend:qx.ui.core.selection.Abstract,construct:function(g){qx.ui.core.selection.Abstract.call(this);
this.__oG=g;
},members:{__oG:null,_isSelectable:function(h){return this._isItemSelectable(h)&&h.getLayoutParent()===this.__oG;
},_selectableToHashCode:function(j){return j.$$hash;
},_styleSelectable:function(k,m,n){n?k.addState(m):k.removeState(m);
},_capture:function(){this.__oG.capture();
},_releaseCapture:function(){this.__oG.releaseCapture();
},_isItemSelectable:function(o){if(this._userInteraction){return o.isVisible()&&o.isEnabled();
}else{return o.isVisible();
}},_getWidget:function(){return this.__oG;
},_getLocation:function(){var p=this.__oG.getContentElement().getDomElement();
return p?qx.bom.element.Location.get(p):null;
},_getDimension:function(){return this.__oG.getInnerSize();
},_getSelectableLocationX:function(q){var r=q.getBounds();

if(r){return {left:r.left,right:r.left+r.width};
}},_getSelectableLocationY:function(s){var t=s.getBounds();

if(t){return {top:t.top,bottom:t.top+t.height};
}},_getScroll:function(){return {left:0,top:0};
},_scrollBy:function(u,v){},_scrollItemIntoView:function(w){this.__oG.scrollChildIntoView(w);
},getSelectables:function(x){var y=false;

if(!x){y=this._userInteraction;
this._userInteraction=true;
}var B=this.__oG.getChildren();
var z=[];
var A;

for(var i=0,l=B.length;i<l;i++){A=B[i];

if(this._isItemSelectable(A)){z.push(A);
}}this._userInteraction=y;
return z;
},_getSelectableRange:function(C,D){if(C===D){return [C];
}var H=this.__oG.getChildren();
var E=[];
var G=false;
var F;

for(var i=0,l=H.length;i<l;i++){F=H[i];

if(F===C||F===D){if(G){E.push(F);
break;
}else{G=true;
}}
if(G&&this._isItemSelectable(F)){E.push(F);
}}return E;
},_getFirstSelectable:function(){var I=this.__oG.getChildren();

for(var i=0,l=I.length;i<l;i++){if(this._isItemSelectable(I[i])){return I[i];
}}return null;
},_getLastSelectable:function(){var J=this.__oG.getChildren();

for(var i=J.length-1;i>0;i--){if(this._isItemSelectable(J[i])){return J[i];
}}return null;
},_getRelatedSelectable:function(K,L){var O=this.__oG.getOrientation()===f;
var N=this.__oG.getChildren();
var M=N.indexOf(K);
var P;

if((O&&L===d)||(!O&&L===b)){for(var i=M-1;i>=0;i--){P=N[i];

if(this._isItemSelectable(P)){return P;
}}}else if((O&&L===e)||(!O&&L===a)){for(var i=M+1;i<N.length;i++){P=N[i];

if(this._isItemSelectable(P)){return P;
}}}return null;
},_getPage:function(Q,R){if(R){return this._getFirstSelectable();
}else{return this._getLastSelectable();
}}},destruct:function(){this.__oG=null;
}});
})();
(function(){var a="qx.ui.core.selection.ScrollArea";
qx.Class.define(a,{extend:qx.ui.core.selection.Widget,members:{_isSelectable:function(b){return this._isItemSelectable(b)&&b.getLayoutParent()===this._getWidget().getChildrenContainer();
},_getDimension:function(){return this._getWidget().getPaneSize();
},_getScroll:function(){var c=this._getWidget();
return {left:c.getScrollX(),top:c.getScrollY()};
},_scrollBy:function(d,e){var f=this._getWidget();
f.scrollByX(d);
f.scrollByY(e);
},_getPage:function(g,h){var m=this.getSelectables();
var length=m.length;
var p=m.indexOf(g);
if(p===-1){throw new Error("Invalid lead item: "+g);
}var j=this._getWidget();
var r=j.getScrollY();
var innerHeight=j.getInnerSize().height;
var top,l,q;

if(h){var o=r;
var i=p;
while(1){for(;i>=0;i--){top=j.getItemTop(m[i]);
if(top<o){q=i+1;
break;
}}if(q==null){var s=this._getFirstSelectable();
return s==g?null:s;
}if(q>=p){o-=innerHeight+r-j.getItemBottom(g);
q=null;
continue;
}return m[q];
}}else{var n=innerHeight+r;
var i=p;
while(1){for(;i<length;i++){l=j.getItemBottom(m[i]);
if(l>n){q=i-1;
break;
}}if(q==null){var k=this._getLastSelectable();
return k==g?null:k;
}if(q<=p){n+=j.getItemTop(g)-r;
q=null;
continue;
}return m[q];
}}}}});
})();
(function(){var e="right",d="above",c="left",b="under",a="qx.ui.tree.SelectionManager";
qx.Class.define(a,{extend:qx.ui.core.selection.ScrollArea,members:{_getSelectableLocationY:function(f){var g=f.getBounds();

if(g){var top=this._getWidget().getItemTop(f);
return {top:top,bottom:top+g.height};
}},_isSelectable:function(h){return this._isItemSelectable(h)&&h instanceof qx.ui.tree.AbstractTreeItem;
},_getSelectableFromMouseEvent:function(event){return this._getWidget().getTreeItem(event.getTarget());
},getSelectables:function(j){var m=false;

if(!j){m=this._userInteraction;
this._userInteraction=true;
}var l=this._getWidget();
var n=[];

if(l.getRoot()!=null){var k=l.getRoot().getItems(true,!!j,l.getHideRoot());

for(var i=0;i<k.length;i++){if(this._isSelectable(k[i])){n.push(k[i]);
}}}this._userInteraction=m;
return n;
},_getSelectableRange:function(o,p){if(o===p){return [o];
}var q=this.getSelectables();
var r=q.indexOf(o);
var s=q.indexOf(p);

if(r<0||s<0){return [];
}
if(r<s){return q.slice(r,s+1);
}else{return q.slice(s,r+1);
}},_getFirstSelectable:function(){return this.getSelectables()[0]||null;
},_getLastSelectable:function(){var t=this.getSelectables();

if(t.length>0){return t[t.length-1];
}else{return null;
}},_getRelatedSelectable:function(u,v){var w=this._getWidget();
var x=null;

switch(v){case d:x=w.getPreviousNodeOf(u,false);
break;
case b:x=w.getNextNodeOf(u,false);
break;
case c:case e:break;
}
if(!x){return null;
}
if(this._isSelectable(x)){return x;
}else{return this._getRelatedSelectable(x,v);
}}}});
})();
(function(){var l="dblclick",k="click",j="Boolean",h="excluded",g="visible",f="qx.event.type.Data",d="__oH",c="_applyOpenMode",b="Space",a="Left",z="Enter",y="changeOpenMode",x="_applyRootOpenClose",w="changeSelection",v="qx.ui.tree.Tree",u="tree",t="_applyHideRoot",s="changeRoot",r="_applyRoot",q="keypress",o="none",p="pane",m="Right",n="qx.ui.tree.AbstractTreeItem";
qx.Class.define(v,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IModelSelection,qx.ui.form.IForm],include:[qx.ui.core.MMultiSelectionHandling,qx.ui.core.MContentPadding,qx.ui.form.MModelSelection,qx.ui.form.MForm],construct:function(){qx.ui.core.scroll.AbstractScrollArea.call(this);
this.__oH=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({allowShrinkY:false,allowGrowX:true});
this.getChildControl(p).add(this.__oH);
this.initOpenMode();
this.initRootOpenClose();
this.addListener(w,this._onChangeSelection,this);
this.addListener(q,this._onKeyPress,this);
},events:{addItem:f,removeItem:f},properties:{openMode:{check:[k,l,o],init:l,apply:c,event:y,themeable:true},root:{check:n,init:null,nullable:true,event:s,apply:r},hideRoot:{check:j,init:false,apply:t},rootOpenClose:{check:j,init:false,apply:x},appearance:{refine:true,init:u},focusable:{refine:true,init:true}},members:{__oH:null,SELECTION_MANAGER:qx.ui.tree.SelectionManager,getChildrenContainer:function(){return this.__oH;
},_applyRoot:function(A,B){var C=this.getChildrenContainer();

if(B){C.remove(B);

if(B.hasChildren()){C.remove(B.getChildrenContainer());
}}
if(A){C.add(A);

if(A.hasChildren()){C.add(A.getChildrenContainer());
}A.setVisibility(this.getHideRoot()?h:g);
A.recursiveAddToWidgetQueue();
}},_applyHideRoot:function(D,E){var F=this.getRoot();

if(!F){return;
}F.setVisibility(D?h:g);
F.recursiveAddToWidgetQueue();
},_applyRootOpenClose:function(G,H){var I=this.getRoot();

if(!I){return;
}I.recursiveAddToWidgetQueue();
},_getContentPaddingTarget:function(){return this.__oH;
},getNextNodeOf:function(J,K){if((K!==false||J.isOpen())&&J.hasChildren()){return J.getChildren()[0];
}
while(J){var parent=J.getParent();

if(!parent){return null;
}var M=parent.getChildren();
var L=M.indexOf(J);

if(L>-1&&L<M.length-1){return M[L+1];
}J=parent;
}return null;
},getPreviousNodeOf:function(N,O){var parent=N.getParent();

if(!parent){return null;
}
if(this.getHideRoot()){if(parent==this.getRoot()){if(parent.getChildren()[0]==N){return null;
}}}else{if(N==this.getRoot()){return null;
}}var R=parent.getChildren();
var P=R.indexOf(N);

if(P>0){var Q=R[P-1];

while((O!==false||Q.isOpen())&&Q.hasChildren()){var S=Q.getChildren();
Q=S[S.length-1];
}return Q;
}else{return parent;
}},getNextSiblingOf:function(T){if(T==this.getRoot()){return null;
}var parent=T.getParent();
var U=parent.getChildren();
var V=U.indexOf(T);

if(V<U.length-1){return U[V+1];
}return null;
},getPreviousSiblingOf:function(W){if(W==this.getRoot()){return null;
}var parent=W.getParent();
var X=parent.getChildren();
var Y=X.indexOf(W);

if(Y>0){return X[Y-1];
}return null;
},getItems:function(ba,bb){if(this.getRoot()!=null){return this.getRoot().getItems(ba,bb,this.getHideRoot());
}else{return [];
}},getChildren:function(){if(this.getRoot()!=null){return [this.getRoot()];
}else{return [];
}},getTreeItem:function(bc){while(bc){if(bc==this){return null;
}
if(bc instanceof qx.ui.tree.AbstractTreeItem){return bc;
}bc=bc.getLayoutParent();
}return null;
},_applyOpenMode:function(bd,be){if(be==k){this.removeListener(k,this._onOpen,this);
}else if(be==l){this.removeListener(l,this._onOpen,this);
}
if(bd==k){this.addListener(k,this._onOpen,this);
}else if(bd==l){this.addListener(l,this._onOpen,this);
}},_onOpen:function(e){var bf=this.getTreeItem(e.getTarget());

if(!bf||!bf.isOpenable()){return;
}bf.setOpen(!bf.isOpen());
e.stopPropagation();
},_onChangeSelection:function(e){var bh=e.getData();
for(var i=0;i<bh.length;i++){var bg=bh[i];
while(bg.getParent()!=null){bg=bg.getParent();
bg.setOpen(true);
}}},_onKeyPress:function(e){var bi=this._getLeadItem();

if(bi!==null){switch(e.getKeyIdentifier()){case a:if(bi.isOpenable()&&bi.isOpen()){bi.setOpen(false);
}break;
case m:if(bi.isOpenable()&&!bi.isOpen()){bi.setOpen(true);
}break;
case z:case b:if(bi.isOpenable()){bi.toggleOpen();
}break;
}}}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var b="qx.ui.core.scroll.IScrollBar",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"scroll":a},properties:{orientation:{},maximum:{},position:{},knobFactor:{}},members:{scrollTo:function(c){this.assertNumber(c);
},scrollBy:function(d){this.assertNumber(d);
},scrollBySteps:function(e){this.assertNumber(e);
}}});
})();
(function(){var k="horizontal",j="px",i="scroll",h="vertical",g="-1px",f="qx.client",d="0",c="hidden",b="mousedown",a="qx.ui.core.scroll.NativeScrollBar",z="PositiveNumber",y="Integer",x="__oJ",w="mousemove",v="_applyMaximum",u="_applyOrientation",t="appear",s="opera",r="PositiveInteger",q="mshtml",o="mouseup",p="Number",m="_applyPosition",n="scrollbar",l="native";
qx.Class.define(a,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(A){qx.ui.core.Widget.call(this);
this.addState(l);
this.getContentElement().addListener(i,this._onScroll,this);
this.addListener(b,this._stopPropagation,this);
this.addListener(o,this._stopPropagation,this);
this.addListener(w,this._stopPropagation,this);

if(qx.core.Variant.isSet(f,s)){this.addListener(t,this._onAppear,this);
}this.getContentElement().add(this._getScrollPaneElement());
if(A!=null){this.setOrientation(A);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:n},orientation:{check:[k,h],init:k,apply:u},maximum:{check:r,apply:v,init:100},position:{check:p,init:0,apply:m,event:i},singleStep:{check:y,init:20},knobFactor:{check:z,nullable:true}},members:{__oI:null,__oJ:null,_getScrollPaneElement:function(){if(!this.__oJ){this.__oJ=new qx.html.Element();
}return this.__oJ;
},renderLayout:function(B,top,C,D){var E=qx.ui.core.Widget.prototype.renderLayout.call(this,B,top,C,D);
this._updateScrollBar();
return E;
},_getContentHint:function(){var F=qx.bom.element.Overflow.getScrollbarWidth();
return {width:this.__oI?100:F,maxWidth:this.__oI?null:F,minWidth:this.__oI?null:F,height:this.__oI?F:100,maxHeight:this.__oI?F:null,minHeight:this.__oI?F:null};
},_applyEnabled:function(G,H){qx.ui.core.Widget.prototype._applyEnabled.call(this,G,H);
this._updateScrollBar();
},_applyMaximum:function(I){this._updateScrollBar();
},_applyPosition:function(J){var content=this.getContentElement();

if(this.__oI){content.scrollToX(J);
}else{content.scrollToY(J);
}},_applyOrientation:function(K,L){var M=this.__oI=K===k;
this.set({allowGrowX:M,allowShrinkX:M,allowGrowY:!M,allowShrinkY:!M});

if(M){this.replaceState(h,k);
}else{this.replaceState(k,h);
}this.getContentElement().setStyles({overflowX:M?i:c,overflowY:M?c:i});
qx.ui.core.queue.Layout.add(this);
},_updateScrollBar:function(){var O=this.__oI;
var P=this.getBounds();

if(!P){return;
}
if(this.isEnabled()){var Q=O?P.width:P.height;
var N=this.getMaximum()+Q;
}else{N=0;
}if(qx.core.Variant.isSet(f,q)){var P=this.getBounds();
this.getContentElement().setStyles({left:O?d:g,top:O?g:d,width:(O?P.width:P.width+1)+j,height:(O?P.height+1:P.height)+j});
}this._getScrollPaneElement().setStyles({left:0,top:0,width:(O?N:1)+j,height:(O?1:N)+j});
this.scrollTo(this.getPosition());
},scrollTo:function(R){this.setPosition(Math.max(0,Math.min(this.getMaximum(),R)));
},scrollBy:function(S){this.scrollTo(this.getPosition()+S);
},scrollBySteps:function(T){var U=this.getSingleStep();
this.scrollBy(T*U);
},_onScroll:function(e){var W=this.getContentElement();
var V=this.__oI?W.getScrollX():W.getScrollY();
this.setPosition(V);
},_onAppear:function(e){this.scrollTo(this.getPosition());
},_stopPropagation:function(e){e.stopPropagation();
}},destruct:function(){this._disposeObjects(x);
}});
})();
(function(){var k="slider",j="horizontal",i="button-begin",h="vertical",g="button-end",f="Integer",d="execute",c="right",b="left",a="down",z="up",y="PositiveNumber",x="changeValue",w="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",v="_applyKnobFactor",u="knob",t="qx.ui.core.scroll.ScrollBar",s="resize",r="_applyOrientation",q="_applyPageStep",o="PositiveInteger",p="scroll",m="_applyPosition",n="scrollbar",l="_applyMaximum";
qx.Class.define(t,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(A){qx.ui.core.Widget.call(this);
this._createChildControl(i);
this._createChildControl(k).addListener(s,this._onResizeSlider,this);
this._createChildControl(g);
if(A!=null){this.setOrientation(A);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:n},orientation:{check:[j,h],init:j,apply:r},maximum:{check:o,apply:l,init:100},position:{check:w,init:0,apply:m,event:p},singleStep:{check:f,init:20},pageStep:{check:f,init:10,apply:q},knobFactor:{check:y,apply:v,nullable:true}},members:{__oK:2,_createChildControlImpl:function(B,C){var D;

switch(B){case k:D=new qx.ui.core.scroll.ScrollSlider();
D.setPageStep(100);
D.setFocusable(false);
D.addListener(x,this._onChangeSliderValue,this);
this._add(D,{flex:1});
break;
case i:D=new qx.ui.form.RepeatButton();
D.setFocusable(false);
D.addListener(d,this._onExecuteBegin,this);
this._add(D);
break;
case g:D=new qx.ui.form.RepeatButton();
D.setFocusable(false);
D.addListener(d,this._onExecuteEnd,this);
this._add(D);
break;
}return D||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,B);
},_applyMaximum:function(E){this.getChildControl(k).setMaximum(E);
},_applyPosition:function(F){this.getChildControl(k).setValue(F);
},_applyKnobFactor:function(G){this.getChildControl(k).setKnobFactor(G);
},_applyPageStep:function(H){this.getChildControl(k).setPageStep(H);
},_applyOrientation:function(I,J){var K=this._getLayout();

if(K){K.dispose();
}if(I===j){this._setLayout(new qx.ui.layout.HBox());
this.setAllowStretchX(true);
this.setAllowStretchY(false);
this.replaceState(h,j);
this.getChildControl(i).replaceState(z,b);
this.getChildControl(g).replaceState(a,c);
}else{this._setLayout(new qx.ui.layout.VBox());
this.setAllowStretchX(false);
this.setAllowStretchY(true);
this.replaceState(j,h);
this.getChildControl(i).replaceState(b,z);
this.getChildControl(g).replaceState(c,a);
}this.getChildControl(k).setOrientation(I);
},scrollTo:function(L){this.getChildControl(k).slideTo(L);
},scrollBy:function(M){this.getChildControl(k).slideBy(M);
},scrollBySteps:function(N){var O=this.getSingleStep();
this.getChildControl(k).slideBy(N*O);
},_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep());
},_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep());
},_onChangeSliderValue:function(e){this.setPosition(e.getData());
},_onResizeSlider:function(e){var P=this.getChildControl(k).getChildControl(u);
var S=P.getSizeHint();
var Q=false;
var R=this.getChildControl(k).getInnerSize();

if(this.getOrientation()==h){if(R.height<S.minHeight+this.__oK){Q=true;
}}else{if(R.width<S.minWidth+this.__oK){Q=true;
}}
if(Q){P.exclude();
}else{P.show();
}}}});
})();
(function(){var a="qx.ui.form.IRange";
qx.Interface.define(a,{members:{setMinimum:function(b){return arguments.length==1;
},getMinimum:function(){},setMaximum:function(c){return arguments.length==1;
},getMaximum:function(){},setSingleStep:function(d){return arguments.length==1;
},getSingleStep:function(){},setPageStep:function(e){return arguments.length==1;
},getPageStep:function(){}}});
})();
(function(){var b="qx.ui.form.INumberForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var k="knob",j="horizontal",i="vertical",h="Integer",g="hovered",f="left",d="top",c="mouseup",b="pressed",a="px",V="changeValue",U="interval",T="mousemove",S="resize",R="slider",Q="mousedown",P="PageUp",O="mouseout",N='qx.event.type.Data',M="Left",r="Down",s="Up",p="dblclick",q="qx.ui.form.Slider",n="PageDown",o="mousewheel",l="_applyValue",m="_applyKnobFactor",t="End",u="height",B="Right",z="width",F="_applyOrientation",D="Home",I="mouseover",H="floor",w="_applyMinimum",L="click",K="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",J="keypress",v="ceil",x="losecapture",y="contextmenu",A="_applyMaximum",C="Number",E="changeMaximum",G="changeMinimum";
qx.Class.define(q,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MForm],construct:function(W){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Canvas());
this.addListener(J,this._onKeyPress);
this.addListener(o,this._onMouseWheel);
this.addListener(Q,this._onMouseDown);
this.addListener(c,this._onMouseUp);
this.addListener(x,this._onMouseUp);
this.addListener(S,this._onUpdate);
this.addListener(y,this._onStopEvent);
this.addListener(L,this._onStopEvent);
this.addListener(p,this._onStopEvent);
if(W!=null){this.setOrientation(W);
}else{this.initOrientation();
}},events:{changeValue:N},properties:{appearance:{refine:true,init:R},focusable:{refine:true,init:true},orientation:{check:[j,i],init:j,apply:F},value:{check:K,init:0,apply:l,nullable:true},minimum:{check:h,init:0,apply:w,event:G},maximum:{check:h,init:100,apply:A,event:E},singleStep:{check:h,init:1},pageStep:{check:h,init:10},knobFactor:{check:C,apply:m,nullable:true}},members:{__oL:null,__oM:null,__oN:null,__oO:null,__oP:null,__oQ:null,__oR:null,__oS:null,__oT:null,__oU:null,__oV:null,__oW:null,_forwardStates:{invalid:true},_createChildControlImpl:function(X,Y){var ba;

switch(X){case k:ba=new qx.ui.core.Widget();
ba.addListener(S,this._onUpdate,this);
ba.addListener(I,this._onMouseOver);
ba.addListener(O,this._onMouseOut);
this._add(ba);
break;
}return ba||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,X);
},_onMouseOver:function(e){this.addState(g);
},_onMouseOut:function(e){this.removeState(g);
},_onMouseWheel:function(e){var bb=e.getWheelDelta()>0?1:-1;
this.slideBy(bb*this.getSingleStep());
e.stop();
},_onKeyPress:function(e){var bd=this.getOrientation()===j;
var bc=bd?M:s;
var forward=bd?B:r;

switch(e.getKeyIdentifier()){case forward:this.slideForward();
break;
case bc:this.slideBack();
break;
case n:this.slidePageForward();
break;
case P:this.slidePageBack();
break;
case D:this.slideToBegin();
break;
case t:this.slideToEnd();
break;
default:return;
}e.stop();
},_onMouseDown:function(e){if(this.__oO){return;
}var bg=this.__oY;
var be=this.getChildControl(k);
var bf=bg?f:d;
var bi=bg?e.getDocumentLeft():e.getDocumentTop();
var bj=this.__oL=qx.bom.element.Location.get(this.getContentElement().getDomElement())[bf];
var bh=this.__oM=qx.bom.element.Location.get(be.getContainerElement().getDomElement())[bf];

if(e.getTarget()===be){this.__oO=true;

if(!this.__oU){this.__oU=new qx.event.Timer(100);
this.__oU.addListener(U,this._fireValue,this);
}this.__oU.start();
this.__oP=bi+bj-bh;
be.addState(b);
}else{this.__oQ=true;
this.__oR=bi<=bh?-1:1;
this.__pa(e);
this._onInterval();
if(!this.__oT){this.__oT=new qx.event.Timer(100);
this.__oT.addListener(U,this._onInterval,this);
}this.__oT.start();
}this.addListener(T,this._onMouseMove);
this.capture();
e.stopPropagation();
},_onMouseUp:function(e){if(this.__oO){this.releaseCapture();
delete this.__oO;
this.__oU.stop();
this._fireValue();
delete this.__oP;
this.getChildControl(k).removeState(b);
if(e.getType()===c){var bl;
var bm;
var bk;

if(this.__oY){bl=e.getDocumentLeft()-(this._valueToPosition(this.getValue())+this.__oL);
bk=qx.bom.element.Location.get(this.getContentElement().getDomElement())[d];
bm=e.getDocumentTop()-(bk+this.getChildControl(k).getBounds().top);
}else{bl=e.getDocumentTop()-(this._valueToPosition(this.getValue())+this.__oL);
bk=qx.bom.element.Location.get(this.getContentElement().getDomElement())[f];
bm=e.getDocumentLeft()-(bk+this.getChildControl(k).getBounds().left);
}
if(bm<0||bm>this.__oN||bl<0||bl>this.__oN){this.getChildControl(k).removeState(g);
}}}else if(this.__oQ){this.__oT.stop();
this.releaseCapture();
delete this.__oQ;
delete this.__oR;
delete this.__oS;
}this.removeListener(T,this._onMouseMove);
if(e.getType()===c){e.stopPropagation();
}},_onMouseMove:function(e){if(this.__oO){var bo=this.__oY?e.getDocumentLeft():e.getDocumentTop();
var bn=bo-this.__oP;
this.slideTo(this._positionToValue(bn));
}else if(this.__oQ){this.__pa(e);
}e.stopPropagation();
},_onInterval:function(e){var bp=this.getValue()+(this.__oR*this.getPageStep());
if(bp<this.getMinimum()){bp=this.getMinimum();
}else if(bp>this.getMaximum()){bp=this.getMaximum();
}var bq=this.__oR==-1;

if((bq&&bp<=this.__oS)||(!bq&&bp>=this.__oS)){bp=this.__oS;
}this.slideTo(bp);
},_onUpdate:function(e){var bs=this.getInnerSize();
var bt=this.getChildControl(k).getBounds();
var br=this.__oY?z:u;
this._updateKnobSize();
this.__oX=bs[br]-bt[br];
this.__oN=bt[br];
this._updateKnobPosition();
},__oY:false,__oX:0,__pa:function(e){var bu=this.__oY;
var bB=bu?e.getDocumentLeft():e.getDocumentTop();
var bD=this.__oL;
var bv=this.__oM;
var bF=this.__oN;
var bC=bB-bD;

if(bB>=bv){bC-=bF;
}var bz=this._positionToValue(bC);
var bw=this.getMinimum();
var bx=this.getMaximum();

if(bz<bw){bz=bw;
}else if(bz>bx){bz=bx;
}else{var bA=this.getValue();
var by=this.getPageStep();
var bE=this.__oR<0?H:v;
bz=bA+(Math[bE]((bz-bA)/by)*by);
}if(this.__oS==null||(this.__oR==-1&&bz<=this.__oS)||(this.__oR==1&&bz>=this.__oS)){this.__oS=bz;
}},_positionToValue:function(bG){var bH=this.__oX;
if(bH==null||bH==0){return 0;
}var bJ=bG/bH;

if(bJ<0){bJ=0;
}else if(bJ>1){bJ=1;
}var bI=this.getMaximum()-this.getMinimum();
return this.getMinimum()+Math.round(bI*bJ);
},_valueToPosition:function(bK){var bL=this.__oX;

if(bL==null){return 0;
}var bM=this.getMaximum()-this.getMinimum();
if(bM==0){return 0;
}var bK=bK-this.getMinimum();
var bN=bK/bM;

if(bN<0){bN=0;
}else if(bN>1){bN=1;
}return Math.round(bL*bN);
},_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));
},_setKnobPosition:function(bO){var bP=this.getChildControl(k).getContainerElement();

if(this.__oY){bP.setStyle(f,bO+a,true);
}else{bP.setStyle(d,bO+a,true);
}},_updateKnobSize:function(){var bR=this.getKnobFactor();

if(bR==null){return;
}var bQ=this.getInnerSize();

if(bQ==null){return;
}if(this.__oY){this.getChildControl(k).setWidth(Math.round(bR*bQ.width));
}else{this.getChildControl(k).setHeight(Math.round(bR*bQ.height));
}},slideToBegin:function(){this.slideTo(this.getMinimum());
},slideToEnd:function(){this.slideTo(this.getMaximum());
},slideForward:function(){this.slideBy(this.getSingleStep());
},slideBack:function(){this.slideBy(-this.getSingleStep());
},slidePageForward:function(){this.slideBy(this.getPageStep());
},slidePageBack:function(){this.slideBy(-this.getPageStep());
},slideBy:function(bS){this.slideTo(this.getValue()+bS);
},slideTo:function(bT){if(bT<this.getMinimum()){bT=this.getMinimum();
}else if(bT>this.getMaximum()){bT=this.getMaximum();
}else{bT=this.getMinimum()+Math.round((bT-this.getMinimum())/this.getSingleStep())*this.getSingleStep();
}this.setValue(bT);
},_applyOrientation:function(bU,bV){var bW=this.getChildControl(k);
this.__oY=bU===j;
if(this.__oY){this.removeState(i);
bW.removeState(i);
this.addState(j);
bW.addState(j);
bW.setLayoutProperties({top:0,right:null,bottom:0});
}else{this.removeState(j);
bW.removeState(j);
this.addState(i);
bW.addState(i);
bW.setLayoutProperties({right:0,bottom:null,left:0});
}this._updateKnobPosition();
},_applyKnobFactor:function(bX,bY){if(bX!=null){this._updateKnobSize();
}else{if(this.__oY){this.getChildControl(k).resetWidth();
}else{this.getChildControl(k).resetHeight();
}}},_applyValue:function(ca,cb){if(ca!=null){this._updateKnobPosition();

if(this.__oO){this.__oW=[ca,cb];
}else{this.fireEvent(V,qx.event.type.Data,[ca,cb]);
}}else{this.resetValue();
}},_fireValue:function(){if(!this.__oW){return;
}var cc=this.__oW;
this.__oW=null;
this.fireEvent(V,qx.event.type.Data,cc);
},_applyMinimum:function(cd,ce){if(this.getValue()<cd){this.setValue(cd);
}this._updateKnobPosition();
},_applyMaximum:function(cf,cg){if(this.getValue()>cf){this.setValue(cf);
}this._updateKnobPosition();
}}});
})();
(function(){var d="horizontal",c="mousewheel",b="qx.ui.core.scroll.ScrollSlider",a="keypress";
qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(e){qx.ui.form.Slider.call(this,e);
this.removeListener(a,this._onKeyPress);
this.removeListener(c,this._onMouseWheel);
},members:{getSizeHint:function(f){var g=qx.ui.form.Slider.prototype.getSizeHint.call(this);
if(this.getOrientation()===d){g.width=0;
}else{g.height=0;
}return g;
}}});
})();
(function(){var n="top",m="left",h="qx.debug",g="bottom",f="hAlign",e="vAlign",d="Integer",c="_applyLayoutChange",b="center",a="middle",E="right",D="flex",C="on",B="height",A="' is not supported by the Grid layout!",z="Invalid parameter 'column'",w="The property '",v="Value must be positive",u="qx.ui.layout.Grid",t="maxHeight",r="width",s="minHeight",p="minWidth",q="maxWidth",o="Invalid parameter 'row'";
qx.Class.define(u,{extend:qx.ui.layout.Abstract,construct:function(F,G){qx.ui.layout.Abstract.call(this);
this.__pb=[];
this.__pc=[];

if(F){this.setSpacingX(F);
}
if(G){this.setSpacingY(G);
}},properties:{spacingX:{check:d,init:0,apply:c},spacingY:{check:d,init:0,apply:c}},members:{__pd:null,__pb:null,__pc:null,__pe:null,__pf:null,__pg:null,__ph:null,__pi:null,__pj:null,verifyLayoutProperty:qx.core.Variant.select(h,{"on":function(H,name,I){var J={"row":1,"column":1,"rowSpan":1,"colSpan":1};
this.assert(J[name]==1,w+name+A);
this.assertInteger(I);
this.assert(I>=0,v);
},"off":null}),__pk:function(){var P=[];
var O=[];
var Q=[];
var M=-1;
var L=-1;
var S=this._getLayoutChildren();

for(var i=0,l=S.length;i<l;i++){var N=S[i];
var R=N.getLayoutProperties();
var T=R.row;
var K=R.column;
R.colSpan=R.colSpan||1;
R.rowSpan=R.rowSpan||1;
if(T==null||K==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+N+"' must be defined!");
}
if(P[T]&&P[T][K]){throw new Error("Cannot add widget '"+N+"'!. "+"There is already a widget '"+P[T][K]+"' in this cell ("+T+", "+K+")");
}
for(var x=K;x<K+R.colSpan;x++){for(var y=T;y<T+R.rowSpan;y++){if(P[y]==undefined){P[y]=[];
}P[y][x]=N;
L=Math.max(L,x);
M=Math.max(M,y);
}}
if(R.rowSpan>1){Q.push(N);
}
if(R.colSpan>1){O.push(N);
}}for(var y=0;y<=M;y++){if(P[y]==undefined){P[y]=[];
}}this.__pd=P;
this.__pe=O;
this.__pf=Q;
this.__pg=M;
this.__ph=L;
this.__pi=null;
this.__pj=null;
delete this._invalidChildrenCache;
},_setRowData:function(U,V,W){var X=this.__pb[U];

if(!X){this.__pb[U]={};
this.__pb[U][V]=W;
}else{X[V]=W;
}},_setColumnData:function(Y,ba,bb){var bc=this.__pc[Y];

if(!bc){this.__pc[Y]={};
this.__pc[Y][ba]=bb;
}else{bc[ba]=bb;
}},setSpacing:function(bd){this.setSpacingY(bd);
this.setSpacingX(bd);
return this;
},setColumnAlign:function(be,bf,bg){if(qx.core.Variant.isSet(h,C)){this.assertInteger(be,z);
this.assertInArray(bf,[m,b,E]);
this.assertInArray(bg,[n,a,g]);
}this._setColumnData(be,f,bf);
this._setColumnData(be,e,bg);
this._applyLayoutChange();
return this;
},getColumnAlign:function(bh){var bi=this.__pc[bh]||{};
return {vAlign:bi.vAlign||n,hAlign:bi.hAlign||m};
},setRowAlign:function(bj,bk,bl){if(qx.core.Variant.isSet(h,C)){this.assertInteger(bj,o);
this.assertInArray(bk,[m,b,E]);
this.assertInArray(bl,[n,a,g]);
}this._setRowData(bj,f,bk);
this._setRowData(bj,e,bl);
this._applyLayoutChange();
return this;
},getRowAlign:function(bm){var bn=this.__pb[bm]||{};
return {vAlign:bn.vAlign||n,hAlign:bn.hAlign||m};
},getCellWidget:function(bo,bp){if(this._invalidChildrenCache){this.__pk();
}var bo=this.__pd[bo]||{};
return bo[bp]||null;
},getRowCount:function(){if(this._invalidChildrenCache){this.__pk();
}return this.__pg+1;
},getColumnCount:function(){if(this._invalidChildrenCache){this.__pk();
}return this.__ph+1;
},getCellAlign:function(bq,br){var bx=n;
var bv=m;
var bw=this.__pb[bq];
var bt=this.__pc[br];
var bs=this.__pd[bq][br];

if(bs){var bu={vAlign:bs.getAlignY(),hAlign:bs.getAlignX()};
}else{bu={};
}if(bu.vAlign){bx=bu.vAlign;
}else if(bw&&bw.vAlign){bx=bw.vAlign;
}else if(bt&&bt.vAlign){bx=bt.vAlign;
}if(bu.hAlign){bv=bu.hAlign;
}else if(bt&&bt.hAlign){bv=bt.hAlign;
}else if(bw&&bw.hAlign){bv=bw.hAlign;
}return {vAlign:bx,hAlign:bv};
},setColumnFlex:function(by,bz){this._setColumnData(by,D,bz);
this._applyLayoutChange();
return this;
},getColumnFlex:function(bA){var bB=this.__pc[bA]||{};
return bB.flex!==undefined?bB.flex:0;
},setRowFlex:function(bC,bD){this._setRowData(bC,D,bD);
this._applyLayoutChange();
return this;
},getRowFlex:function(bE){var bF=this.__pb[bE]||{};
var bG=bF.flex!==undefined?bF.flex:0;
return bG;
},setColumnMaxWidth:function(bH,bI){this._setColumnData(bH,q,bI);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(bJ){var bK=this.__pc[bJ]||{};
return bK.maxWidth!==undefined?bK.maxWidth:Infinity;
},setColumnWidth:function(bL,bM){this._setColumnData(bL,r,bM);
this._applyLayoutChange();
return this;
},getColumnWidth:function(bN){var bO=this.__pc[bN]||{};
return bO.width!==undefined?bO.width:null;
},setColumnMinWidth:function(bP,bQ){this._setColumnData(bP,p,bQ);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(bR){var bS=this.__pc[bR]||{};
return bS.minWidth||0;
},setRowMaxHeight:function(bT,bU){this._setRowData(bT,t,bU);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(bV){var bW=this.__pb[bV]||{};
return bW.maxHeight||Infinity;
},setRowHeight:function(bX,bY){this._setRowData(bX,B,bY);
this._applyLayoutChange();
return this;
},getRowHeight:function(ca){var cb=this.__pb[ca]||{};
return cb.height!==undefined?cb.height:null;
},setRowMinHeight:function(cc,cd){this._setRowData(cc,s,cd);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(ce){var cf=this.__pb[ce]||{};
return cf.minHeight||0;
},__pl:function(cg){var ck=cg.getSizeHint();
var cj=cg.getMarginLeft()+cg.getMarginRight();
var ci=cg.getMarginTop()+cg.getMarginBottom();
var ch={height:ck.height+ci,width:ck.width+cj,minHeight:ck.minHeight+ci,minWidth:ck.minWidth+cj,maxHeight:ck.maxHeight+ci,maxWidth:ck.maxWidth+cj};
return ch;
},_fixHeightsRowSpan:function(cl){var cy=this.getSpacingY();

for(var i=0,l=this.__pf.length;i<l;i++){var co=this.__pf[i];
var cq=this.__pl(co);
var cr=co.getLayoutProperties();
var cn=cr.row;
var cw=cy*(cr.rowSpan-1);
var cm=cw;
var ct={};

for(var j=0;j<cr.rowSpan;j++){var cA=cr.row+j;
var cp=cl[cA];
var cz=this.getRowFlex(cA);

if(cz>0){ct[cA]={min:cp.minHeight,value:cp.height,max:cp.maxHeight,flex:cz};
}cw+=cp.height;
cm+=cp.minHeight;
}if(cw<cq.height){if(!qx.lang.Object.isEmpty(ct)){var cx=qx.ui.layout.Util.computeFlexOffsets(ct,cq.height,cw);

for(var k=0;k<cr.rowSpan;k++){var cs=cx[cn+k]?cx[cn+k].offset:0;
cl[cn+k].height+=cs;
}}else{var cu=cy*(cr.rowSpan-1);
var cv=cq.height-cu;
var cp=Math.floor(cv/cr.rowSpan);

for(var k=0;k<cr.rowSpan;k++){cl[cn+k].height=cp;
}}}if(cm<cq.minHeight){var cx=qx.ui.layout.Util.computeFlexOffsets(ct,cq.minHeight,cm);

for(var j=0;j<cr.rowSpan;j++){var cs=cx[cn+j]?cx[cn+j].offset:0;
cl[cn+j].minHeight+=cs;
}}}},_fixWidthsColSpan:function(cB){var cF=this.getSpacingX();

for(var i=0,l=this.__pe.length;i<l;i++){var cC=this.__pe[i];
var cE=this.__pl(cC);
var cH=cC.getLayoutProperties();
var cD=cH.column;
var cN=cF*(cH.colSpan-1);
var cG=cN;
var cI={};
var cK;

for(var j=0;j<cH.colSpan;j++){var cO=cH.column+j;
var cM=cB[cO];
var cL=this.getColumnFlex(cO);
if(cL>0){cI[cO]={min:cM.minWidth,value:cM.width,max:cM.maxWidth,flex:cL};
}cN+=cM.width;
cG+=cM.minWidth;
}if(cN<cE.width){var cJ=qx.ui.layout.Util.computeFlexOffsets(cI,cE.width,cN);

for(var j=0;j<cH.colSpan;j++){cK=cJ[cD+j]?cJ[cD+j].offset:0;
cB[cD+j].width+=cK;
}}if(cG<cE.minWidth){var cJ=qx.ui.layout.Util.computeFlexOffsets(cI,cE.minWidth,cG);

for(var j=0;j<cH.colSpan;j++){cK=cJ[cD+j]?cJ[cD+j].offset:0;
cB[cD+j].minWidth+=cK;
}}}},_getRowHeights:function(){if(this.__pi!=null){return this.__pi;
}var cY=[];
var cR=this.__pg;
var cQ=this.__ph;

for(var da=0;da<=cR;da++){var cS=0;
var cU=0;
var cT=0;

for(var cX=0;cX<=cQ;cX++){var cP=this.__pd[da][cX];

if(!cP){continue;
}var cV=cP.getLayoutProperties().rowSpan||0;

if(cV>1){continue;
}var cW=this.__pl(cP);

if(this.getRowFlex(da)>0){cS=Math.max(cS,cW.minHeight);
}else{cS=Math.max(cS,cW.height);
}cU=Math.max(cU,cW.height);
}var cS=Math.max(cS,this.getRowMinHeight(da));
var cT=this.getRowMaxHeight(da);

if(this.getRowHeight(da)!==null){var cU=this.getRowHeight(da);
}else{var cU=Math.max(cS,Math.min(cU,cT));
}cY[da]={minHeight:cS,height:cU,maxHeight:cT};
}
if(this.__pf.length>0){this._fixHeightsRowSpan(cY);
}this.__pi=cY;
return cY;
},_getColWidths:function(){if(this.__pj!=null){return this.__pj;
}var df=[];
var dc=this.__ph;
var de=this.__pg;

for(var dk=0;dk<=dc;dk++){var di=0;
var dh=0;
var dd=Infinity;

for(var dl=0;dl<=de;dl++){var db=this.__pd[dl][dk];

if(!db){continue;
}var dg=db.getLayoutProperties().colSpan||0;

if(dg>1){continue;
}var dj=this.__pl(db);

if(this.getColumnFlex(dk)>0){dh=Math.max(dh,dj.minWidth);
}else{dh=Math.max(dh,dj.width);
}di=Math.max(di,dj.width);
}var dh=Math.max(dh,this.getColumnMinWidth(dk));
var dd=this.getColumnMaxWidth(dk);

if(this.getColumnWidth(dk)!==null){var di=this.getColumnWidth(dk);
}else{var di=Math.max(dh,Math.min(di,dd));
}df[dk]={minWidth:dh,width:di,maxWidth:dd};
}
if(this.__pe.length>0){this._fixWidthsColSpan(df);
}this.__pj=df;
return df;
},_getColumnFlexOffsets:function(dm){var dn=this.getSizeHint();
var ds=dm-dn.width;

if(ds==0){return {};
}var dq=this._getColWidths();
var dp={};

for(var i=0,l=dq.length;i<l;i++){var dt=dq[i];
var dr=this.getColumnFlex(i);

if((dr<=0)||(dt.width==dt.maxWidth&&ds>0)||(dt.width==dt.minWidth&&ds<0)){continue;
}dp[i]={min:dt.minWidth,value:dt.width,max:dt.maxWidth,flex:dr};
}return qx.ui.layout.Util.computeFlexOffsets(dp,dm,dn.width);
},_getRowFlexOffsets:function(du){var dv=this.getSizeHint();
var dy=du-dv.height;

if(dy==0){return {};
}var dz=this._getRowHeights();
var dw={};

for(var i=0,l=dz.length;i<l;i++){var dA=dz[i];
var dx=this.getRowFlex(i);

if((dx<=0)||(dA.height==dA.maxHeight&&dy>0)||(dA.height==dA.minHeight&&dy<0)){continue;
}dw[i]={min:dA.minHeight,value:dA.height,max:dA.maxHeight,flex:dx};
}return qx.ui.layout.Util.computeFlexOffsets(dw,du,dv.height);
},renderLayout:function(dB,dC){if(this._invalidChildrenCache){this.__pk();
}var dQ=qx.ui.layout.Util;
var dE=this.getSpacingX();
var dK=this.getSpacingY();
var dV=this._getColWidths();
var dU=this._getColumnFlexOffsets(dB);
var dF=[];
var dX=this.__ph;
var dD=this.__pg;
var dW;

for(var dY=0;dY<=dX;dY++){dW=dU[dY]?dU[dY].offset:0;
dF[dY]=dV[dY].width+dW;
}var dN=this._getRowHeights();
var dP=this._getRowFlexOffsets(dC);
var ef=[];

for(var dL=0;dL<=dD;dL++){dW=dP[dL]?dP[dL].offset:0;
ef[dL]=dN[dL].height+dW;
}var eg=0;

for(var dY=0;dY<=dX;dY++){var top=0;

for(var dL=0;dL<=dD;dL++){var dS=this.__pd[dL][dY];
if(!dS){top+=ef[dL]+dK;
continue;
}var dG=dS.getLayoutProperties();
if(dG.row!==dL||dG.column!==dY){top+=ef[dL]+dK;
continue;
}var ee=dE*(dG.colSpan-1);

for(var i=0;i<dG.colSpan;i++){ee+=dF[dY+i];
}var dT=dK*(dG.rowSpan-1);

for(var i=0;i<dG.rowSpan;i++){dT+=ef[dL+i];
}var dH=dS.getSizeHint();
var ec=dS.getMarginTop();
var dR=dS.getMarginLeft();
var dO=dS.getMarginBottom();
var dJ=dS.getMarginRight();
var dM=Math.max(dH.minWidth,Math.min(ee-dR-dJ,dH.maxWidth));
var ed=Math.max(dH.minHeight,Math.min(dT-ec-dO,dH.maxHeight));
var ea=this.getCellAlign(dL,dY);
var eb=eg+dQ.computeHorizontalAlignOffset(ea.hAlign,dM,ee,dR,dJ);
var dI=top+dQ.computeVerticalAlignOffset(ea.vAlign,ed,dT,ec,dO);
dS.renderLayout(eb,dI,dM,ed);
top+=ef[dL]+dK;
}eg+=dF[dY]+dE;
}},invalidateLayoutCache:function(){qx.ui.layout.Abstract.prototype.invalidateLayoutCache.call(this);
this.__pj=null;
this.__pi=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__pk();
}var el=this._getColWidths();
var en=0,eo=0;

for(var i=0,l=el.length;i<l;i++){var ep=el[i];

if(this.getColumnFlex(i)>0){en+=ep.minWidth;
}else{en+=ep.width;
}eo+=ep.width;
}var eq=this._getRowHeights();
var ej=0,em=0;

for(var i=0,l=eq.length;i<l;i++){var er=eq[i];

if(this.getRowFlex(i)>0){ej+=er.minHeight;
}else{ej+=er.height;
}em+=er.height;
}var ei=this.getSpacingX()*(el.length-1);
var eh=this.getSpacingY()*(eq.length-1);
var ek={minWidth:en+ei,width:eo+ei,minHeight:ej+eh,height:em+eh};
return ek;
}},destruct:function(){this.__pd=this.__pb=this.__pc=this.__pe=this.__pf=this.__pj=this.__pi=null;
}});
})();
(function(){var m="open",k="icon",j="auto",h="qx.debug",g="middle",f="String",d="label",c="on",b="changeOpen",a="excluded",K="visible",J="opened",I="always",H="qx.ui.tree.AbstractTreeItem",G="_applyIconOpened",F="Boolean",E="Invalid child index: ",D="Integer",C="_applyIndent",B="changeOpenSymbolMode",t="_applyOpenSymbolMode",u="__pm",r="resize",s="",p="removeItem",q="addItem",n="__pn",o="iconOpened",v="__pq",w="abstract",y="never",x="_applyIcon",A="_applyOpen",z="_applyLabel";
qx.Class.define(H,{extend:qx.ui.core.Widget,type:w,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel],construct:function(){qx.ui.core.Widget.call(this);
this.__pm=[];
this._setLayout(new qx.ui.layout.HBox());
this._addWidgets();
this.initOpen();
},properties:{open:{check:F,init:false,event:b,apply:A},openSymbolMode:{check:[I,y,j],init:j,event:B,apply:t},indent:{check:D,init:19,apply:C,themeable:true},parent:{check:H,nullable:true},icon:{check:f,apply:x,nullable:true,themeable:true},iconOpened:{check:f,apply:G,nullable:true,themeable:true},label:{check:f,apply:z,init:s}},members:{__pm:null,__pn:null,__po:null,__pp:null,__pq:null,__pr:null,_addWidgets:function(){throw new Error("Abstract method call.");
},_createChildControlImpl:function(L,M){var N;

switch(L){case d:N=new qx.ui.basic.Label().set({alignY:g,value:this.getLabel()});
break;
case k:N=new qx.ui.basic.Image().set({alignY:g,source:this.getIcon()});
break;
case m:N=new qx.ui.tree.FolderOpenButton().set({alignY:g});
N.addListener(b,this._onChangeOpen,this);
N.addListener(r,this._updateIndent,this);
break;
}return N||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,L);
},getTree:function(){var P=this;

while(P.getParent()){P=P.getParent();
}var O=P.getLayoutParent()?P.getLayoutParent().getLayoutParent():0;

if(O&&O instanceof qx.ui.core.scroll.ScrollPane){return O.getLayoutParent();
}return null;
},addWidget:function(Q,R){this._add(Q,R);
},addSpacer:function(){if(!this.__pq){this.__pq=new qx.ui.core.Spacer();
}else{this._remove(this.__pq);
}this._add(this.__pq);
},addOpenButton:function(){this._add(this.getChildControl(m));
},_onChangeOpen:function(e){if(this.isOpenable()){this.setOpen(e.getData());
}},addIcon:function(){var S=this.getChildControl(k);

if(this.__pp){this._remove(S);
}this._add(S);
this.__pp=true;
},addLabel:function(T){var U=this.getChildControl(d);

if(this.__po){this._remove(U);
}
if(T){this.setLabel(T);
}else{U.setValue(this.getLabel());
}this._add(U);
this.__po=true;
},addState:function(V){qx.ui.core.Widget.prototype.addState.call(this,V);
var X=this._getChildren();

for(var i=0,l=X.length;i<l;i++){var W=X[i];

if(W.addState){X[i].addState(V);
}}},removeState:function(Y){qx.ui.core.Widget.prototype.removeState.call(this,Y);
var bb=this._getChildren();

for(var i=0,l=bb.length;i<l;i++){var ba=bb[i];

if(ba.addState){bb[i].removeState(Y);
}}},_applyIcon:function(bc,bd){if(!this.__pt()){this.__pu(bc);
}else if(!this.isOpen()){this.__pu(bc);
}},_applyIconOpened:function(be,bf){if(this.isOpen()){if(this.__ps()&&this.__pt()){this.__pu(be);
}else if(!this.__ps()&&this.__pt()){this.__pu(be);
}}},_applyLabel:function(bg,bh){var bi=this.getChildControl(d,true);

if(bi){bi.setValue(bg);
}},_applyOpen:function(bj,bk){if(this.hasChildren()){this.getChildrenContainer().setVisibility(bj?K:a);
}var open=this.getChildControl(m,true);

if(open){open.setOpen(bj);
}var bl;
if(bj){bl=this.__pt()?this.getIconOpened():null;
}else{bl=this.getIcon();
}
if(bl){this.__pu(bl);
}bj?this.addState(J):this.removeState(J);
},__ps:function(){return qx.util.PropertyUtil.getUserValue(this,k);
},__pt:function(){return qx.util.PropertyUtil.getUserValue(this,o);
},__pu:function(bm){var bn=this.getChildControl(k,true);

if(bn){bn.setSource(bm);
}},isOpenable:function(){var bo=this.getOpenSymbolMode();
return (bo===I||bo===j&&this.hasChildren());
},_shouldShowOpenSymbol:function(){var open=this.getChildControl(m,true);

if(!open){return false;
}var bp=this.getTree();

if(!bp.getRootOpenClose()){if(bp.getHideRoot()){if(bp.getRoot()==this.getParent()){return false;
}}else{if(bp.getRoot()==this){return false;
}}}return this.isOpenable();
},_applyOpenSymbolMode:function(bq,br){this._updateIndent();
},_updateIndent:function(){if(!this.getTree()){return;
}var bt=0;
var open=this.getChildControl(m,true);

if(open){if(this._shouldShowOpenSymbol()){open.show();
var bs=open.getBounds();

if(bs){bt=bs.width;
}else{return;
}}else{open.exclude();
}}
if(this.__pq){this.__pq.setWidth((this.getLevel()+1)*this.getIndent()-bt);
}},_applyIndent:function(bu,bv){this._updateIndent();
},getLevel:function(){var bw=this.getTree();

if(!bw){return;
}var bx=this;
var by=-1;

while(bx){bx=bx.getParent();
by+=1;
}if(bw.getHideRoot()){by-=1;
}
if(!bw.getRootOpenClose()){by-=1;
}return by;
},syncWidget:function(){this._updateIndent();
},getChildrenContainer:function(){if(!this.__pn){this.__pn=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({visibility:this.isOpen()?K:a});
}return this.__pn;
},hasChildrenContainer:function(){return this.__pn;
},getParentChildrenContainer:function(){if(this.getParent()){return this.getParent().getChildrenContainer();
}else if(this.getLayoutParent()){return this.getLayoutParent();
}else{return null;
}},getChildren:function(){return this.__pm;
},hasChildren:function(){return this.__pm?this.__pm.length>0:false;
},getItems:function(bz,bA,bB){if(bB!==false){var bC=[];
}else{var bC=[this];
}var bF=this.hasChildren()&&(bA!==false||this.isOpen());

if(bF){var bE=this.getChildren();

if(bz===false){bC=bC.concat(bE);
}else{for(var i=0,bD=bE.length;i<bD;i++){bC=bC.concat(bE[i].getItems(bz,bA,false));
}}}return bC;
},recursiveAddToWidgetQueue:function(){var bG=this.getItems(true,true,false);

for(var i=0,l=bG.length;i<l;i++){qx.ui.core.queue.Widget.add(bG[i]);
}},__pv:function(){if(this.getParentChildrenContainer()){this.getParentChildrenContainer()._addAfter(this.getChildrenContainer(),this);
}},add:function(bH){var bI=this.getChildrenContainer();
var bL=this.getTree();

for(var i=0,l=arguments.length;i<l;i++){var bM=arguments[i];
var bK=bM.getParent();

if(bK){bK.remove(bM);
}bM.setParent(this);
var bJ=this.hasChildren();
bI.add(bM);

if(bM.hasChildren()){bI.add(bM.getChildrenContainer());
}this.__pm.push(bM);

if(!bJ){this.__pv();
}
if(bL){bM.recursiveAddToWidgetQueue();
bL.fireNonBubblingEvent(q,qx.event.type.Data,[bM]);
}}
if(bL){qx.ui.core.queue.Widget.add(this);
}},addAt:function(bN,bO){if(qx.core.Variant.isSet(h,c)){this.assert(bO<=this.__pm.length&&bO>=0,E+bO);
}
if(bO==this.__pm.length){this.add(bN);
return;
}var bS=bN.getParent();

if(bS){bS.remove(bN);
}var bQ=this.getChildrenContainer();
bN.setParent(this);
var bR=this.hasChildren();
var bP=this.__pm[bO];
bQ.addBefore(bN,bP);

if(bN.hasChildren()){bQ.addAfter(bN.getChildrenContainer(),bN);
}qx.lang.Array.insertAt(this.__pm,bN,bO);

if(!bR){this.__pv();
}
if(this.getTree()){bN.recursiveAddToWidgetQueue();
qx.ui.core.queue.Widget.add(this);
}},addBefore:function(bT,bU){if(qx.core.Variant.isSet(h,c)){this.assert(this.__pm.indexOf(bU)>=0);
}var bV=bT.getParent();

if(bV){bV.remove(bT);
}this.addAt(bT,this.__pm.indexOf(bU));
},addAfter:function(bW,bX){if(qx.core.Variant.isSet(h,c)){this.assert(this.__pm.indexOf(bX)>=0);
}var bY=bW.getParent();

if(bY){bY.remove(bW);
}this.addAt(bW,this.__pm.indexOf(bX)+1);
},addAtBegin:function(ca){this.addAt(ca,0);
},remove:function(cb){for(var i=0,l=arguments.length;i<l;i++){var cf=arguments[i];

if(this.__pm.indexOf(cf)==-1){this.warn("Cannot remove treeitem '"+cf+"'. It is not a child of this tree item.");
return;
}var cc=this.getChildrenContainer();

if(cf.hasChildrenContainer()){var ce=cf.getChildrenContainer();

if(cc.getChildren().indexOf(ce)>=0){cc.remove(ce);
}}qx.lang.Array.remove(this.__pm,cf);
cf.setParent(null);
cc.remove(cf);
}var cd=this.getTree();

if(cd){cd.fireNonBubblingEvent(p,qx.event.type.Data,[cf]);
}qx.ui.core.queue.Widget.add(this);
},removeAt:function(cg){var ch=this.__pm[cg];

if(ch){this.remove(ch);
}},removeAll:function(){for(var i=this.__pm.length-1;i>=0;i--){this.remove(this.__pm[i]);
}}},destruct:function(){this._disposeArray(u);
this._disposeObjects(v,n);
}});
})();
(function(){var i="opened",h="click",g="changeOpen",f="Boolean",d="qx.ui.tree.FolderOpenButton",c="_applyOpen",b="mouseup",a="mousedown";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MExecutable,construct:function(){qx.ui.basic.Image.call(this);
this.initOpen();
this.addListener(h,this._onClick);
this.addListener(a,this._stopPropagation,this);
this.addListener(b,this._stopPropagation,this);
},properties:{open:{check:f,init:false,event:g,apply:c}},members:{_applyOpen:function(j,k){j?this.addState(i):this.removeState(i);
this.execute();
},_stopPropagation:function(e){e.stopPropagation();
},_onClick:function(e){this.toggleOpen();
e.stopPropagation();
}}});
})();
(function(){var d="$$theme_",c="$$user_",b="$$init_",a="qx.util.PropertyUtil";
qx.Class.define(a,{statics:{getProperties:function(e){return e.$$properties;
},getAllProperties:function(f){var i={};
var j=f;
while(j!=qx.core.Object){var h=this.getProperties(j);

for(var g in h){i[g]=h[g];
}j=j.superclass;
}return i;
},getUserValue:function(k,l){return k[c+l];
},setUserValue:function(m,n,o){m[c+n]=o;
},deleteUserValue:function(p,q){delete (p[c+q]);
},getInitValue:function(r,s){return r[b+s];
},setInitValue:function(t,u,v){t[b+u]=v;
},deleteInitValue:function(w,x){delete (w[b+x]);
},getThemeValue:function(y,z){return y[d+z];
},setThemeValue:function(A,B,C){A[d+B]=C;
},deleteThemeValue:function(D,E){delete (D[d+E]);
},setThemed:function(F,G,H){var I=qx.core.Property.$$method.setThemed;
F[I[G]](H);
},resetThemed:function(J,K){var L=qx.core.Property.$$method.resetThemed;
J[L[K]]();
}}});
})();
(function(){var b="tree-folder",a="qx.ui.tree.TreeFolder";
qx.Class.define(a,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){qx.ui.tree.AbstractTreeItem.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:b}},members:{_addWidgets:function(){this.addSpacer();
this.addOpenButton();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var b="qx.ui.tree.TreeFile",a="tree-file";
qx.Class.define(b,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){qx.ui.tree.AbstractTreeItem.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:a}},members:{_addWidgets:function(){this.addSpacer();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var k="Boolean",j="qx.event.type.Event",i="queued",h="String",g="sending",f="receiving",d="aborted",c="failed",b="nocache",a="completed",S="qx.io.remote.Response",R="POST",Q="configured",P="timeout",O="GET",N="Pragma",M="no-url-params-on-post",L="PUT",K="no-cache",J="Cache-Control",r="Content-Type",s="text/plain",p="application/xml",q="application/json",n="text/html",o="qx.ioRemoteDebug",l="application/x-www-form-urlencoded",m="qx.io.remote.Exchange",t="Integer",u="X-Qooxdoo-Response-Type",B="HEAD",A="qx.io.remote.Request",D="qx.debug",C="_applyResponseType",F="_applyState",E="text/javascript",x="changeState",I="_applyProhibitCaching",H="",G="_applyMethod",w="DELETE",y="boolean",z="on";
qx.Class.define(A,{extend:qx.core.Object,construct:function(T,U,V){qx.core.Object.call(this);
this.__tY={};
this.__ua={};
this.__ub={};
this.__uc={};

if(T!==undefined){this.setUrl(T);
}
if(U!==undefined){this.setMethod(U);
}
if(V!==undefined){this.setResponseType(V);
}this.setProhibitCaching(true);
this.__ud=++qx.io.remote.Request.__ud;
},events:{"created":j,"configured":j,"sending":j,"receiving":j,"completed":S,"aborted":j,"failed":S,"timeout":S},statics:{__ud:0,methodAllowsRequestBody:function(W){return (W==R)||(W==L);
}},properties:{url:{check:h,init:H},method:{check:[O,R,L,B,w],apply:G,init:O},asynchronous:{check:k,init:true},data:{check:h,nullable:true},username:{check:h,nullable:true},password:{check:h,nullable:true},state:{check:[Q,i,g,f,a,d,P,c],init:Q,apply:F,event:x},responseType:{check:[s,E,q,p,n],init:s,apply:C},timeout:{check:t,nullable:true},prohibitCaching:{check:function(v){return typeof v==y||v===M;
},init:true,apply:I},crossDomain:{check:k,init:false},fileUpload:{check:k,init:false},transport:{check:m,nullable:true},useBasicHttpAuth:{check:k,init:false},parseJson:{check:k,init:true}},members:{__tY:null,__ua:null,__ub:null,__uc:null,__ud:null,send:function(){qx.io.remote.RequestQueue.getInstance().add(this);
},abort:function(){qx.io.remote.RequestQueue.getInstance().abort(this);
},reset:function(){switch(this.getState()){case g:case f:this.error("Aborting already sent request!");
case i:this.abort();
break;
}},isConfigured:function(){return this.getState()===Q;
},isQueued:function(){return this.getState()===i;
},isSending:function(){return this.getState()===g;
},isReceiving:function(){return this.getState()===f;
},isCompleted:function(){return this.getState()===a;
},isAborted:function(){return this.getState()===d;
},isTimeout:function(){return this.getState()===P;
},isFailed:function(){return this.getState()===c;
},__ue:qx.event.GlobalError.observeMethod(function(e){var X=e.clone();
X.setTarget(this);
this.dispatchEvent(X);
}),_onqueued:function(e){this.setState(i);
this.__ue(e);
},_onsending:function(e){this.setState(g);
this.__ue(e);
},_onreceiving:function(e){this.setState(f);
this.__ue(e);
},_oncompleted:function(e){this.setState(a);
this.__ue(e);
this.dispose();
},_onaborted:function(e){this.setState(d);
this.__ue(e);
this.dispose();
},_ontimeout:function(e){this.setState(P);
this.__ue(e);
this.dispose();
},_onfailed:function(e){this.setState(c);
this.__ue(e);
this.dispose();
},_applyState:function(Y,ba){if(qx.core.Variant.isSet(D,z)){if(qx.core.Setting.get(o)){this.debug("State: "+Y);
}}},_applyProhibitCaching:function(bb,bc){if(!bb){this.removeParameter(b);
this.removeRequestHeader(N);
this.removeRequestHeader(J);
return;
}if(bb!==M||this.getMethod()!=R){this.setParameter(b,new Date().valueOf());
}else{this.removeParameter(b);
}this.setRequestHeader(N,K);
this.setRequestHeader(J,K);
},_applyMethod:function(bd,be){if(qx.io.remote.Request.methodAllowsRequestBody(bd)){this.setRequestHeader(r,l);
}else{this.removeRequestHeader(r);
}var bf=this.getProhibitCaching();
this._applyProhibitCaching(bf,bf);
},_applyResponseType:function(bg,bh){this.setRequestHeader(u,bg);
},setRequestHeader:function(bi,bj){this.__tY[bi]=bj;
},removeRequestHeader:function(bk){delete this.__tY[bk];
},getRequestHeader:function(bl){return this.__tY[bl]||null;
},getRequestHeaders:function(){return this.__tY;
},setParameter:function(bm,bn,bo){if(bo){this.__ub[bm]=bn;
}else{this.__ua[bm]=bn;
}},removeParameter:function(bp,bq){if(bq){delete this.__ub[bp];
}else{delete this.__ua[bp];
}},getParameter:function(br,bs){if(bs){return this.__ub[br]||null;
}else{return this.__ua[br]||null;
}},getParameters:function(bt){return (bt?this.__ub:this.__ua);
},setFormField:function(bu,bv){this.__uc[bu]=bv;
},removeFormField:function(bw){delete this.__uc[bw];
},getFormField:function(bx){return this.__uc[bx]||null;
},getFormFields:function(){return this.__uc;
},getSequenceNumber:function(){return this.__ud;
}},destruct:function(){this.setTransport(null);
this.__tY=this.__ua=this.__ub=this.__uc=null;
}});
})();
(function(){var b=".",a="qx.bom.client.Transport";
qx.Class.define(a,{statics:{getMaxConcurrentRequestCount:function(){var h;
var c=qx.bom.client.Engine;
var g=c.FULLVERSION.split(b);
var e=0;
var d=0;
var f=0;
if(g[0]){e=g[0];
}if(g[1]){d=g[1];
}if(g[2]){f=g[2];
}if(window.maxConnectionsPerServer){h=window.maxConnectionsPerServer;
}else if(c.OPERA){h=8;
}else if(c.WEBKIT){h=4;
}else if(c.GECKO&&((e>1)||((e==1)&&(d>9))||((e==1)&&(d==9)&&(f>=1)))){h=6;
}else{h=2;
}return h;
}}});
})();
(function(){var l="qx.ioRemoteDebug",k="Integer",j="qx.debug",h="on",g="aborted",f="_onaborted",d="_on",c="Boolean",b="__ui",a="singleton",x="qx.io.remote.RequestQueue",w="interval",v="receiving",u="Request-Queue Progress: ",t="queued",s="/",r="_applyEnabled",q="sending",p="completed",o="failed",m="__ug",n="timeout";
qx.Class.define(x,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__uf=[];
this.__ug=[];
this.__uh=0;
this.__ui=new qx.event.Timer(500);
this.__ui.addListener(w,this._oninterval,this);
},properties:{enabled:{init:true,check:c,apply:r},maxTotalRequests:{check:k,nullable:true},maxConcurrentRequests:{check:k,init:qx.bom.client.Transport.getMaxConcurrentRequestCount()},defaultTimeout:{check:k,init:5000}},members:{__uf:null,__ug:null,__uh:null,__ui:null,getRequestQueue:function(){return this.__uf;
},getActiveQueue:function(){return this.__ug;
},_debug:function(){if(qx.core.Variant.isSet(j,h)){if(qx.core.Setting.get(l)){var y=this.__ug.length+s+(this.__uf.length+this.__ug.length);
this.debug("Progress: "+y);
window.status=u+y;
}}},_check:function(){this._debug();
if(this.__ug.length==0&&this.__uf.length==0){this.__ui.stop();
}if(!this.getEnabled()){return;
}if(this.__uf.length==0||(this.__uf[0].isAsynchronous()&&this.__ug.length>=this.getMaxConcurrentRequests())){return;
}if(this.getMaxTotalRequests()!=null&&this.__uh>=this.getMaxTotalRequests()){return;
}var z=this.__uf.shift();
var A=new qx.io.remote.Exchange(z);
this.__uh++;
this.__ug.push(A);
this._debug();
A.addListener(q,this._onsending,this);
A.addListener(v,this._onreceiving,this);
A.addListener(p,this._oncompleted,this);
A.addListener(g,this._oncompleted,this);
A.addListener(n,this._oncompleted,this);
A.addListener(o,this._oncompleted,this);
A._start=(new Date).valueOf();
A.send();
if(this.__uf.length>0){this._check();
}},_remove:function(B){qx.lang.Array.remove(this.__ug,B);
B.dispose();
this._check();
},__uj:0,_onsending:function(e){if(qx.core.Variant.isSet(j,h)){if(qx.core.Setting.get(l)){this.__uj++;
e.getTarget()._counted=true;
this.debug("ActiveCount: "+this.__uj);
}}e.getTarget().getRequest()._onsending(e);
},_onreceiving:function(e){e.getTarget().getRequest()._onreceiving(e);
},_oncompleted:function(e){if(qx.core.Variant.isSet(j,h)){if(qx.core.Setting.get(l)){if(e.getTarget()._counted){this.__uj--;
this.debug("ActiveCount: "+this.__uj);
}}}var D=e.getTarget().getRequest();
var C=d+e.getType();
try{if(D[C]){D[C](e);
}}catch(E){this.error("Request "+D+" handler "+C+" threw an error: ",E);
try{if(D[f]){var event=qx.event.Registration.createEvent(g,qx.event.type.Event);
D[f](event);
}}catch(F){}}finally{this._remove(e.getTarget());
}},_oninterval:function(e){var M=this.__ug;

if(M.length==0){this.__ui.stop();
return;
}var H=(new Date).valueOf();
var K;
var I;
var L=this.getDefaultTimeout();
var J;
var G;

for(var i=M.length-1;i>=0;i--){K=M[i];
I=K.getRequest();

if(I.isAsynchronous()){J=I.getTimeout();
if(J==0){continue;
}
if(J==null){J=L;
}G=H-K._start;

if(G>J){this.warn("Timeout: transport "+K.toHashCode());
this.warn(G+"ms > "+J+"ms");
K.timeout();
}}}},_applyEnabled:function(N,O){if(N){this._check();
}this.__ui.setEnabled(N);
},add:function(P){P.setState(t);

if(P.isAsynchronous()){this.__uf.push(P);
}else{this.__uf.unshift(P);
}this._check();

if(this.getEnabled()){this.__ui.start();
}},abort:function(Q){var R=Q.getTransport();

if(R){R.abort();
}else if(qx.lang.Array.contains(this.__uf,Q)){qx.lang.Array.remove(this.__uf,Q);
}}},destruct:function(){this._disposeArray(m);
this._disposeObjects(b);
this.__uf=null;
}});
})();
(function(){var p="qx.ioRemoteDebug",o="qx.debug",n="on",m="failed",k="sending",j="completed",h="receiving",g="aborted",f="timeout",d="qx.event.type.Event",bs="Connection dropped",br="qx.io.remote.Response",bq="=",bp="configured",bo="&",bn="Unknown status code. ",bm="qx.io.remote.transport.XmlHttp",bl="qx.io.remote.transport.Abstract",bk="Request-URL too large",bj="MSHTML-specific HTTP status code",w="Not available",x="Precondition failed",u="Server error",v="qx.io.remote.Exchange",s="Possibly due to a cross-domain request?",t="Bad gateway",q="Gone",r="See other",D="Partial content",E="Server timeout",O="qx.io.remote.transport.Script",L="HTTP version not supported",W="Unauthorized",R="Possibly due to application URL using 'file:' protocol?",bf="Multiple choices",bc="Payment required",H="Not implemented",bi="Proxy authentication required",bh="Length required",bg="_applyState",G="changeState",J="Not modified",K="Not acceptable",N="qx.io.remote.Request",P="Connection closed by server",S="Moved permanently",Y="_applyImplementation",be="",y="Method not allowed",z="Moved temporarily",I="Forbidden",V="Use proxy",U="Ok",T="Conflict",bb="Not found",ba="Request time-out",Q="Bad request",X="No content",a="file:",bd="qx.io.remote.transport.Iframe",A="Request entity too large",B="Unknown status code",M="Unsupported media type",b="Gateway time-out",c="created",F="Out of resources",C="undefined";
qx.Class.define(v,{extend:qx.core.Object,construct:function(bt){qx.core.Object.call(this);
this.setRequest(bt);
bt.setTransport(this);
},events:{"sending":d,"receiving":d,"completed":br,"aborted":d,"failed":br,"timeout":br},statics:{typesOrder:[bm,bd,O],typesReady:false,typesAvailable:{},typesSupported:{},registerType:function(bu,bv){qx.io.remote.Exchange.typesAvailable[bv]=bu;
},initTypes:function(){if(qx.io.remote.Exchange.typesReady){return;
}
for(var bx in qx.io.remote.Exchange.typesAvailable){var bw=qx.io.remote.Exchange.typesAvailable[bx];

if(bw.isSupported()){qx.io.remote.Exchange.typesSupported[bx]=bw;
}}qx.io.remote.Exchange.typesReady=true;

if(qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)){throw new Error("No supported transport types were found!");
}},canHandle:function(by,bz,bA){if(!qx.lang.Array.contains(by.handles.responseTypes,bA)){return false;
}
for(var bB in bz){if(!by.handles[bB]){return false;
}}return true;
},_nativeMap:{0:c,1:bp,2:k,3:h,4:j},wasSuccessful:function(bC,bD,bE){if(bE){switch(bC){case null:case 0:return true;
case -1:return bD<4;
default:return typeof bC===C;
}}else{switch(bC){case -1:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)&&bD>3){qx.log.Logger.debug(this,"Failed with statuscode: -1 at readyState "+bD);
}}return bD<4;
case 200:case 304:return true;
case 201:case 202:case 203:case 204:case 205:return true;
case 206:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)&&bD===4){qx.log.Logger.debug(this,"Failed with statuscode: 206 (Partial content while being complete!)");
}}return bD!==4;
case 300:case 301:case 302:case 303:case 305:case 400:case 401:case 402:case 403:case 404:case 405:case 406:case 407:case 408:case 409:case 410:case 411:case 412:case 413:case 414:case 415:case 500:case 501:case 502:case 503:case 504:case 505:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){qx.log.Logger.debug(this,"Failed with typical HTTP statuscode: "+bC);
}}return false;
case 12002:case 12007:case 12029:case 12030:case 12031:case 12152:case 13030:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){qx.log.Logger.debug(this,"Failed with MSHTML specific HTTP statuscode: "+bC);
}}return false;
default:if(bC>206&&bC<300){return true;
}qx.log.Logger.debug(this,"Unknown status code: "+bC+" ("+bD+")");
return false;
}}},statusCodeToString:function(bF){switch(bF){case -1:return w;
case 0:var bG=window.location.href;
if(qx.lang.String.startsWith(bG.toLowerCase(),a)){return (bn+R);
}else{return (bn+s);
}break;
case 200:return U;
case 304:return J;
case 206:return D;
case 204:return X;
case 300:return bf;
case 301:return S;
case 302:return z;
case 303:return r;
case 305:return V;
case 400:return Q;
case 401:return W;
case 402:return bc;
case 403:return I;
case 404:return bb;
case 405:return y;
case 406:return K;
case 407:return bi;
case 408:return ba;
case 409:return T;
case 410:return q;
case 411:return bh;
case 412:return x;
case 413:return A;
case 414:return bk;
case 415:return M;
case 500:return u;
case 501:return H;
case 502:return t;
case 503:return F;
case 504:return b;
case 505:return L;
case 12002:return E;
case 12029:return bs;
case 12030:return bs;
case 12031:return bs;
case 12152:return P;
case 13030:return bj;
default:return B;
}}},properties:{request:{check:N,nullable:true},implementation:{check:bl,nullable:true,apply:Y},state:{check:[bp,k,h,j,g,f,m],init:bp,event:G,apply:bg}},members:{send:function(){var bK=this.getRequest();

if(!bK){return this.error("Please attach a request object first");
}qx.io.remote.Exchange.initTypes();
var bI=qx.io.remote.Exchange.typesOrder;
var bH=qx.io.remote.Exchange.typesSupported;
var bM=bK.getResponseType();
var bN={};

if(bK.getAsynchronous()){bN.asynchronous=true;
}else{bN.synchronous=true;
}
if(bK.getCrossDomain()){bN.crossDomain=true;
}
if(bK.getFileUpload()){bN.fileUpload=true;
}for(var bL in bK.getFormFields()){bN.programaticFormFields=true;
break;
}var bO,bJ;

for(var i=0,l=bI.length;i<l;i++){bO=bH[bI[i]];

if(bO){if(!qx.io.remote.Exchange.canHandle(bO,bN,bM)){continue;
}
try{if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Using implementation: "+bO.classname);
}}bJ=new bO;
this.setImplementation(bJ);
bJ.setUseBasicHttpAuth(bK.getUseBasicHttpAuth());
bJ.send();
return true;
}catch(bP){this.error("Request handler throws error");
this.error(bP);
return;
}}}this.error("There is no transport implementation available to handle this request: "+bK);
},abort:function(){var bQ=this.getImplementation();

if(bQ){if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Abort: implementation "+bQ.toHashCode());
}}bQ.abort();
}else{if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Abort: forcing state to be aborted");
}}this.setState(g);
}},timeout:function(){var bT=this.getImplementation();

if(bT){var bS=be;

for(var bR in bT.getParameters()){bS+=bo+bR+bq+bT.getParameters()[bR];
}this.warn("Timeout: implementation "+bT.toHashCode()+", "+bT.getUrl()+" ["+bT.getMethod()+"], "+bS);
bT.timeout();
}else{this.warn("Timeout: forcing state to timeout");
this.setState(f);
}this.__uk();
},__uk:function(){var bU=this.getRequest();

if(bU){bU.setTimeout(0);
}},_onsending:function(e){this.setState(k);
},_onreceiving:function(e){this.setState(h);
},_oncompleted:function(e){this.setState(j);
},_onabort:function(e){this.setState(g);
},_onfailed:function(e){this.setState(m);
},_ontimeout:function(e){this.setState(f);
},_applyImplementation:function(bV,bW){if(bW){bW.removeListener(k,this._onsending,this);
bW.removeListener(h,this._onreceiving,this);
bW.removeListener(j,this._oncompleted,this);
bW.removeListener(g,this._onabort,this);
bW.removeListener(f,this._ontimeout,this);
bW.removeListener(m,this._onfailed,this);
}
if(bV){var bY=this.getRequest();
bV.setUrl(bY.getUrl());
bV.setMethod(bY.getMethod());
bV.setAsynchronous(bY.getAsynchronous());
bV.setUsername(bY.getUsername());
bV.setPassword(bY.getPassword());
bV.setParameters(bY.getParameters(false));
bV.setFormFields(bY.getFormFields());
bV.setRequestHeaders(bY.getRequestHeaders());
if(bV instanceof qx.io.remote.transport.XmlHttp){bV.setParseJson(bY.getParseJson());
}var cc=bY.getData();

if(cc===null){var cd=bY.getParameters(true);
var cb=[];

for(var bX in cd){var ca=cd[bX];

if(ca instanceof Array){for(var i=0;i<ca.length;i++){cb.push(encodeURIComponent(bX)+bq+encodeURIComponent(ca[i]));
}}else{cb.push(encodeURIComponent(bX)+bq+encodeURIComponent(ca));
}}
if(cb.length>0){bV.setData(cb.join(bo));
}}else{bV.setData(cc);
}bV.setResponseType(bY.getResponseType());
bV.addListener(k,this._onsending,this);
bV.addListener(h,this._onreceiving,this);
bV.addListener(j,this._oncompleted,this);
bV.addListener(g,this._onabort,this);
bV.addListener(f,this._ontimeout,this);
bV.addListener(m,this._onfailed,this);
}},_applyState:function(ce,cf){if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("State: "+cf+" => "+ce);
}}
switch(ce){case k:this.fireEvent(k);
break;
case h:this.fireEvent(h);
break;
case j:case g:case f:case m:var ch=this.getImplementation();

if(!ch){break;
}this.__uk();

if(this.hasListener(ce)){var ci=qx.event.Registration.createEvent(ce,qx.io.remote.Response);

if(ce==j){var cg=ch.getResponseContent();
ci.setContent(cg);
if(cg===null){if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Altered State: "+ce+" => failed");
}}ce=m;
}}else if(ce==m){ci.setContent(ch.getResponseContent());
}ci.setStatusCode(ch.getStatusCode());
ci.setResponseHeaders(ch.getResponseHeaders());
this.dispatchEvent(ci);
}this.setImplementation(null);
ch.dispose();
break;
}}},settings:{"qx.ioRemoteDebug":false,"qx.ioRemoteDebugData":false},destruct:function(){var cj=this.getImplementation();

if(cj){this.setImplementation(null);
cj.dispose();
}this.setRequest(null);
}});
})();
(function(){var t="qx.event.type.Event",s="String",r="qx.ioRemoteDebug",q="qx.debug",p="failed",o="timeout",n="on",m="created",l="aborted",k="sending",d="configured",j="receiving",g="completed",c="Object",b="Boolean",f="abstract",e="_applyState",h="GET",a="changeState",i="qx.io.remote.transport.Abstract";
qx.Class.define(i,{type:f,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.setRequestHeaders({});
this.setParameters({});
this.setFormFields({});
},events:{"created":t,"configured":t,"sending":t,"receiving":t,"completed":t,"aborted":t,"failed":t,"timeout":t},properties:{url:{check:s,nullable:true},method:{check:s,nullable:true,init:h},asynchronous:{check:b,nullable:true,init:true},data:{check:s,nullable:true},username:{check:s,nullable:true},password:{check:s,nullable:true},state:{check:[m,d,k,j,g,l,o,p],init:m,event:a,apply:e},requestHeaders:{check:c,nullable:true},parameters:{check:c,nullable:true},formFields:{check:c,nullable:true},responseType:{check:s,nullable:true},useBasicHttpAuth:{check:b,nullable:true}},members:{send:function(){throw new Error("send is abstract");
},abort:function(){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.warn("Aborting...");
}}this.setState(l);
},timeout:function(){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.warn("Timeout...");
}}this.setState(o);
},failed:function(){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.warn("Failed...");
}}this.setState(p);
},setRequestHeader:function(u,v){throw new Error("setRequestHeader is abstract");
},getResponseHeader:function(w){throw new Error("getResponseHeader is abstract");
},getResponseHeaders:function(){throw new Error("getResponseHeaders is abstract");
},getStatusCode:function(){throw new Error("getStatusCode is abstract");
},getStatusText:function(){throw new Error("getStatusText is abstract");
},getResponseText:function(){throw new Error("getResponseText is abstract");
},getResponseXml:function(){throw new Error("getResponseXml is abstract");
},getFetchedLength:function(){throw new Error("getFetchedLength is abstract");
},_applyState:function(x,y){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.debug("State: "+x);
}}
switch(x){case m:this.fireEvent(m);
break;
case d:this.fireEvent(d);
break;
case k:this.fireEvent(k);
break;
case j:this.fireEvent(j);
break;
case g:this.fireEvent(g);
break;
case l:this.fireEvent(l);
break;
case p:this.fireEvent(p);
break;
case o:this.fireEvent(o);
break;
}return true;
}},destruct:function(){this.setRequestHeaders(null);
this.setParameters(null);
this.setFormFields(null);
}});
})();
(function(){var l="qx.debug",k="on",j="qx.ioRemoteDebugData",h="=",g="",f="&",d="application/xml",c="application/json",b="text/html",a="qx.ioRemoteDebug",K="qx.client",J="textarea",I="_data_",H="load",G="text/plain",F="text/javascript",E="completed",D="readystatechange",C="?",B="qx.io.remote.transport.Iframe",s="none",t="display",q="gecko",r="frame_",o="aborted",p="pre",m="javascript:void(0)",n="sending",u="form",v="failed",x="mshtml",w="form_",z="opera",y="timeout",A="qx/static/blank.gif";
qx.Class.define(B,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var L=(new Date).valueOf();
var M=r+L;
var N=w+L;
var O;

if(qx.core.Variant.isSet(K,x)){O=m;
}this.__ul=qx.bom.Iframe.create({id:M,name:M,src:O});
qx.bom.element.Style.set(this.__ul,t,s);
this.__um=qx.bom.Element.create(u,{id:N,name:N,target:M});
qx.bom.element.Style.set(this.__um,t,s);
qx.dom.Element.insertEnd(this.__um,qx.dom.Node.getBodyElement(document));
this.__un=qx.bom.Element.create(J,{id:I,name:I});
qx.dom.Element.insertEnd(this.__un,this.__um);
qx.dom.Element.insertEnd(this.__ul,qx.dom.Node.getBodyElement(document));
qx.event.Registration.addListener(this.__ul,H,this._onload,this);
this.__uo=qx.lang.Function.listener(this._onreadystatechange,this);
qx.bom.Event.addNativeListener(this.__ul,D,this.__uo);
},statics:{handles:{synchronous:false,asynchronous:true,crossDomain:false,fileUpload:true,programaticFormFields:true,responseTypes:[G,F,c,d,b]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4}},members:{__un:null,__up:0,__um:null,__ul:null,__uo:null,send:function(){var Q=this.getMethod();
var S=this.getUrl();
var W=this.getParameters(false);
var V=[];

for(var R in W){var T=W[R];

if(T instanceof Array){for(var i=0;i<T.length;i++){V.push(encodeURIComponent(R)+h+encodeURIComponent(T[i]));
}}else{V.push(encodeURIComponent(R)+h+encodeURIComponent(T));
}}
if(V.length>0){S+=(S.indexOf(C)>=0?f:C)+V.join(f);
}if(this.getData()===null){var W=this.getParameters(true);
var V=[];

for(var R in W){var T=W[R];

if(T instanceof Array){for(var i=0;i<T.length;i++){V.push(encodeURIComponent(R)+h+encodeURIComponent(T[i]));
}}else{V.push(encodeURIComponent(R)+h+encodeURIComponent(T));
}}
if(V.length>0){this.setData(V.join(f));
}}var P=this.getFormFields();

for(var R in P){var U=document.createElement(J);
U.name=R;
U.appendChild(document.createTextNode(P[R]));
this.__um.appendChild(U);
}this.__um.action=S;
this.__um.method=Q;
this.__un.appendChild(document.createTextNode(this.getData()));
this.__um.submit();
this.setState(n);
},_onload:qx.event.GlobalError.observeMethod(function(e){if(qx.bom.client.Engine.NAME==z&&this.getIframeHtmlContent()==g){return;
}
if(this.__um.src){return;
}this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
}),_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__ul.readyState]);
}),_switchReadyState:function(X){switch(this.getState()){case E:case o:case v:case y:this.warn("Ignore Ready State Change");
return;
}while(this.__up<X){this.setState(qx.io.remote.Exchange._nativeMap[++this.__up]);
}},setRequestHeader:function(Y,ba){},getResponseHeader:function(bb){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return g;
},getIframeWindow:function(){return qx.bom.Iframe.getWindow(this.__ul);
},getIframeDocument:function(){return qx.bom.Iframe.getDocument(this.__ul);
},getIframeBody:function(){return qx.bom.Iframe.getBody(this.__ul);
},getIframeTextContent:function(){var bc=this.getIframeBody();

if(!bc){return null;
}
if(!bc.firstChild){return g;
}if(bc.firstChild.tagName&&bc.firstChild.tagName.toLowerCase()==p){return bc.firstChild.innerHTML;
}else{return bc.innerHTML;
}},getIframeHtmlContent:function(){var bd=this.getIframeBody();
return bd?bd.innerHTML:null;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==E){if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(a)){this.warn("Transfer not complete, ignoring content!");
}}return null;
}
if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(a)){this.debug("Returning content for responseType: "+this.getResponseType());
}}var be=this.getIframeTextContent();

switch(this.getResponseType()){case G:if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}return be;
break;
case b:be=this.getIframeHtmlContent();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}return be;
break;
case c:be=this.getIframeHtmlContent();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}
try{return be&&be.length>0?qx.util.Json.parse(be,false):null;
}catch(bf){return this.error("Could not execute json: ("+be+")",bf);
}case F:be=this.getIframeHtmlContent();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}
try{return be&&be.length>0?window.eval(be):null;
}catch(bg){return this.error("Could not execute javascript: ("+be+")",bg);
}case d:be=this.getIframeDocument();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}return be;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe,B);
},destruct:function(){if(this.__ul){qx.event.Registration.removeListener(this.__ul,H,this._onload,this);
qx.bom.Event.removeNativeListener(this.__ul,D,this.__uo);
if(qx.core.Variant.isSet(K,q)){this.__ul.src=qx.util.ResourceManager.getInstance().toUri(A);
}qx.dom.Element.remove(this.__ul);
}
if(this.__um){qx.dom.Element.remove(this.__um);
}this.__ul=this.__um=this.__un=null;
}});
})();
(function(){var a="qx.dom.Element";
qx.Class.define(a,{statics:{hasChild:function(parent,b){return b.parentNode===parent;
},hasChildren:function(c){return !!c.firstChild;
},hasChildElements:function(d){d=d.firstChild;

while(d){if(d.nodeType===1){return true;
}d=d.nextSibling;
}return false;
},getParentElement:function(e){return e.parentNode;
},isInDom:function(f,g){if(!g){g=window;
}var h=g.document.getElementsByTagName(f.nodeName);

for(var i=0,l=h.length;i<l;i++){if(h[i]===f){return true;
}}return false;
},insertAt:function(j,parent,k){var m=parent.childNodes[k];

if(m){parent.insertBefore(j,m);
}else{parent.appendChild(j);
}return true;
},insertBegin:function(n,parent){if(parent.firstChild){this.insertBefore(n,parent.firstChild);
}else{parent.appendChild(n);
}},insertEnd:function(o,parent){parent.appendChild(o);
},insertBefore:function(p,q){q.parentNode.insertBefore(p,q);
return true;
},insertAfter:function(r,s){var parent=s.parentNode;

if(s==parent.lastChild){parent.appendChild(r);
}else{return this.insertBefore(r,s.nextSibling);
}return true;
},remove:function(t){if(!t.parentNode){return false;
}t.parentNode.removeChild(t);
return true;
},removeChild:function(u,parent){if(u.parentNode!==parent){return false;
}parent.removeChild(u);
return true;
},removeChildAt:function(v,parent){var w=parent.childNodes[v];

if(!w){return false;
}parent.removeChild(w);
return true;
},replaceChild:function(x,y){if(!y.parentNode){return false;
}y.parentNode.replaceChild(x,y);
return true;
},replaceAt:function(z,A,parent){var B=parent.childNodes[A];

if(!B){return false;
}parent.replaceChild(z,B);
return true;
}}});
})();
(function(){var n=",",m="",k="string",j="null",h='"',g=':',f="qx.jsonDebugging",e='-',d='\\u00',c="__qe",N="new Date(Date.UTC(",M="__qc",L='\\\\',K="__qm",J='\\f',I='\\"',H='Z',G="))",F='T',E="}",u='(',v='.',s="{",t='\\r',q='\\t',r=":",o="__qf",p="__qd",w="]",x="[",z="__qn",y="qx.jsonEncodeUndefined",B='\\b',A="qx.util.Json",D=')',C='\\n';
qx.Class.define(A,{statics:{__qa:null,BEAUTIFYING_INDENT:"  ",BEAUTIFYING_LINE_END:"\n",CONVERT_DATES:null,__qb:{"function":M,"boolean":p,"number":c,"string":o,"object":K,"undefined":z},__qc:function(O,P){return String(O);
},__qd:function(Q,R){return String(Q);
},__qe:function(S,T){return isFinite(S)?String(S):j;
},__qf:function(U,V){var W;

if(/["\\\x00-\x1f]/.test(U)){W=U.replace(/([\x00-\x1f\\"])/g,qx.util.Json.__qh);
}else{W=U;
}return h+W+h;
},__qg:{'\b':B,'\t':q,'\n':C,'\f':J,'\r':t,'"':I,'\\':L},__qh:function(a,b){var X=qx.util.Json.__qg[b];

if(X){return X;
}X=b.charCodeAt();
return d+Math.floor(X/16).toString(16)+(X%16).toString(16);
},__qi:function(Y,ba){var bc=[],bf=true,be,bb;
var bd=qx.util.Json.__qp;
bc.push(x);

if(bd){qx.util.Json.__qj+=qx.util.Json.BEAUTIFYING_INDENT;
bc.push(qx.util.Json.__qj);
}
for(var i=0,l=Y.length;i<l;i++){bb=Y[i];
be=this.__qb[typeof bb];

if(be){bb=this[be](bb,i+m);

if(typeof bb==k){if(!bf){bc.push(n);

if(bd){bc.push(qx.util.Json.__qj);
}}bc.push(bb);
bf=false;
}}}
if(bd){qx.util.Json.__qj=qx.util.Json.__qj.substring(0,qx.util.Json.__qj.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bc.push(qx.util.Json.__qj);
}bc.push(w);
return bc.join(m);
},__qk:function(bg,bh){if(!qx.util.Json.CONVERT_DATES){if(bg.toJSON&&!qx.bom.client.Engine.OPERA){return bg.toJSON();
}var bi=qx.util.format.NumberFormat.getInstance();
bi.setMinimumIntegerDigits(2);
var bk=bg.getUTCFullYear()+e+bi.format(bg.getUTCMonth()+1)+e+bi.format(bg.getUTCDate())+F+bi.format(bg.getUTCHours())+g+bi.format(bg.getUTCMinutes())+g+bi.format(bg.getUTCSeconds())+v;
bi.setMinimumIntegerDigits(3);
return bk+bi.format(bg.getUTCMilliseconds())+H;
}else{var bj=bg.getUTCFullYear()+n+bg.getUTCMonth()+n+bg.getUTCDate()+n+bg.getUTCHours()+n+bg.getUTCMinutes()+n+bg.getUTCSeconds()+n+bg.getUTCMilliseconds();
return N+bj+G;
}},__ql:function(bl,bm){var bp=[],br=true,bo,bn;
var bq=qx.util.Json.__qp;
bp.push(s);

if(bq){qx.util.Json.__qj+=qx.util.Json.BEAUTIFYING_INDENT;
bp.push(qx.util.Json.__qj);
}
for(var bm in bl){bn=bl[bm];
bo=this.__qb[typeof bn];

if(bo){bn=this[bo](bn,bm);

if(typeof bn==k){if(!br){bp.push(n);

if(bq){bp.push(qx.util.Json.__qj);
}}bp.push(this.__qf(bm),r,bn);
br=false;
}}}
if(bq){qx.util.Json.__qj=qx.util.Json.__qj.substring(0,qx.util.Json.__qj.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bp.push(qx.util.Json.__qj);
}bp.push(E);
return bp.join(m);
},__qm:function(bs,bt){if(bs){if(qx.lang.Type.isFunction(bs.toJSON)&&bs.toJSON!==this.__qa){return this.__qo(bs.toJSON(bt),bt);
}else if(qx.lang.Type.isDate(bs)){return this.__qk(bs,bt);
}else if(qx.lang.Type.isArray(bs)){return this.__qi(bs,bt);
}else if(qx.lang.Type.isObject(bs)){return this.__ql(bs,bt);
}return m;
}return j;
},__qn:function(bu,bv){if(qx.core.Setting.get(y)){return j;
}},__qo:function(bw,bx){return this[this.__qb[typeof bw]](bw,bx);
},stringify:function(by,bz){this.__qp=bz;
this.__qj=this.BEAUTIFYING_LINE_END;
var bA=this.__qo(by,m);

if(typeof bA!=k){bA=null;
}if(qx.core.Setting.get(f)){qx.log.Logger.debug(this,"JSON request: "+bA);
}return bA;
},parse:function(bB,bC){if(bC===undefined){bC=true;
}
if(qx.core.Setting.get(f)){qx.log.Logger.debug(this,"JSON response: "+bB);
}
if(bC){if(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(bB.replace(/"(\\.|[^"\\])*"/g,m))){throw new Error("Could not parse JSON string!");
}}
try{var bD=(bB&&bB.length>0)?eval(u+bB+D):null;
return bD;
}catch(bE){throw new Error("Could not evaluate JSON string: "+bE.message);
}}},settings:{"qx.jsonEncodeUndefined":true,"qx.jsonDebugging":false},defer:function(bF){bF.__qa=Date.prototype.toJSON;
}});
})();
(function(){var a="qx.util.format.IFormat";
qx.Interface.define(a,{members:{format:function(b){},parse:function(c){}}});
})();
(function(){var t="",s="Number",r="-",q="0",p="String",o="changeNumberFormat",n='(',m="g",l="Boolean",k="$",d="NaN",j='([0-9]{1,3}(?:',g='{0,1}[0-9]{3}){0,})',c='\\d+){0,1}',b="qx.util.format.NumberFormat",f="Infinity",e="^",h=".",a="-Infinity",i='([-+]){0,1}';
qx.Class.define(b,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(u){qx.core.Object.call(this);
this.__qq=u;
},statics:{getIntegerInstance:function(){var v=qx.util.format.NumberFormat;

if(v._integerInstance==null){v._integerInstance=new v();
v._integerInstance.setMaximumFractionDigits(0);
}return v._integerInstance;
},getInstance:function(){if(!this._instance){this._instance=new this;
}return this._instance;
}},properties:{minimumIntegerDigits:{check:s,init:0},maximumIntegerDigits:{check:s,nullable:true},minimumFractionDigits:{check:s,init:0},maximumFractionDigits:{check:s,nullable:true},groupingUsed:{check:l,init:true},prefix:{check:p,init:t,event:o},postfix:{check:p,init:t,event:o}},members:{__qq:null,format:function(w){switch(w){case Infinity:return f;
case -Infinity:return a;
case NaN:return d;
}var A=(w<0);

if(A){w=-w;
}
if(this.getMaximumFractionDigits()!=null){var H=Math.pow(10,this.getMaximumFractionDigits());
w=Math.round(w*H)/H;
}var G=String(Math.floor(w)).length;
var x=t+w;
var D=x.substring(0,G);

while(D.length<this.getMinimumIntegerDigits()){D=q+D;
}
if(this.getMaximumIntegerDigits()!=null&&D.length>this.getMaximumIntegerDigits()){D=D.substring(D.length-this.getMaximumIntegerDigits());
}var C=x.substring(G+1);

while(C.length<this.getMinimumFractionDigits()){C+=q;
}
if(this.getMaximumFractionDigits()!=null&&C.length>this.getMaximumFractionDigits()){C=C.substring(0,this.getMaximumFractionDigits());
}if(this.getGroupingUsed()){var z=D;
D=t;
var F;

for(F=z.length;F>3;F-=3){D=t+qx.locale.Number.getGroupSeparator(this.__qq)+z.substring(F-3,F)+D;
}D=z.substring(0,F)+D;
}var B=this.getPrefix()?this.getPrefix():t;
var y=this.getPostfix()?this.getPostfix():t;
var E=B+(A?r:t)+D;

if(C.length>0){E+=t+qx.locale.Number.getDecimalSeparator(this.__qq)+C;
}E+=y;
return E;
},parse:function(I){var N=qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this.__qq)+t);
var L=qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this.__qq)+t);
var J=new RegExp(e+qx.lang.String.escapeRegexpChars(this.getPrefix())+i+j+N+g+n+L+c+qx.lang.String.escapeRegexpChars(this.getPostfix())+k);
var M=J.exec(I);

if(M==null){throw new Error("Number string '"+I+"' does not match the number format");
}var O=(M[1]==r);
var Q=M[2];
var P=M[3];
Q=Q.replace(new RegExp(N,m),t);
var K=(O?r:t)+Q;

if(P!=null&&P.length!=0){P=P.replace(new RegExp(L),t);
K+=h+P;
}return parseFloat(K);
}}});
})();
(function(){var d="cldr_number_decimal_separator",c="cldr_number_percent_format",b="qx.locale.Number",a="cldr_number_group_separator";
qx.Class.define(b,{statics:{getDecimalSeparator:function(e){return qx.locale.Manager.getInstance().localize(d,[],e);
},getGroupSeparator:function(f){return qx.locale.Manager.getInstance().localize(a,[],f);
},getPercentFormat:function(g){return qx.locale.Manager.getInstance().localize(c,[],g);
}}});
})();
(function(){var v="qx.debug",u="on",t="&",s="=",r="qx.ioRemoteDebug",q="application/json",p="completed",o="text/plain",n="qx.ioRemoteDebugData",m="text/javascript",e="?",l="qx.io.remote.transport.Script",h="",c="_ScriptTransport_data",b="failed",g="script",f="timeout",j="_ScriptTransport_",a="_ScriptTransport_id",k="aborted",d="utf-8";
qx.Class.define(l,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var w=++qx.io.remote.transport.Script.__uq;

if(w>=2000000000){qx.io.remote.transport.Script.__uq=w=1;
}this.__ur=null;
this.__uq=w;
},statics:{__uq:0,_instanceRegistry:{},ScriptTransport_PREFIX:j,ScriptTransport_ID_PARAM:a,ScriptTransport_DATA_PARAM:c,handles:{synchronous:false,asynchronous:true,crossDomain:true,fileUpload:false,programaticFormFields:false,responseTypes:[o,m,q]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4},_requestFinished:qx.event.GlobalError.observeMethod(function(x,content){var y=qx.io.remote.transport.Script._instanceRegistry[x];

if(y==null){if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(r)){this.warn("Request finished for an unknown instance (probably aborted or timed out before)");
}}}else{y._responseContent=content;
y._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
}})},members:{__us:0,__ur:null,__uq:null,send:function(){var B=this.getUrl();
B+=(B.indexOf(e)>=0?t:e)+qx.io.remote.transport.Script.ScriptTransport_ID_PARAM+s+this.__uq;
var E=this.getParameters();
var D=[];

for(var A in E){if(A.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX)==0){this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): "+qx.io.remote.transport.Script.ScriptTransport_PREFIX);
}var C=E[A];

if(C instanceof Array){for(var i=0;i<C.length;i++){D.push(encodeURIComponent(A)+s+encodeURIComponent(C[i]));
}}else{D.push(encodeURIComponent(A)+s+encodeURIComponent(C));
}}
if(D.length>0){B+=t+D.join(t);
}var z=this.getData();

if(z!=null){B+=t+qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM+s+encodeURIComponent(z);
}qx.io.remote.transport.Script._instanceRegistry[this.__uq]=this;
this.__ur=document.createElement(g);
this.__ur.charset=d;
this.__ur.src=B;

if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(n)){this.debug("Request: "+B);
}}document.body.appendChild(this.__ur);
},_switchReadyState:function(F){switch(this.getState()){case p:case k:case b:case f:this.warn("Ignore Ready State Change");
return;
}while(this.__us<F){this.setState(qx.io.remote.Exchange._nativeMap[++this.__us]);
}},setRequestHeader:function(G,H){},getResponseHeader:function(I){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return h;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==p){if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(r)){this.warn("Transfer not complete, ignoring content!");
}}return null;
}
if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(r)){this.debug("Returning content for responseType: "+this.getResponseType());
}}
switch(this.getResponseType()){case o:case q:case m:if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(n)){this.debug("Response: "+this._responseContent);
}}var J=this._responseContent;
return (J===0?0:(J||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script,l);
},destruct:function(){if(this.__ur){delete qx.io.remote.transport.Script._instanceRegistry[this.__uq];
document.body.removeChild(this.__ur);
}this.__ur=this._responseContent=null;
}});
})();
(function(){var m="qx.debug",k="on",j="qx.ioRemoteDebugData",h="failed",g="qx.ioRemoteDebug",f="completed",d="=",c="aborted",b="",a="sending",N="&",M="configured",L="timeout",K="application/xml",J="qx.io.remote.transport.XmlHttp",I="application/json",H="text/html",G="qx.client",F="receiving",E="text/plain",u="text/javascript",v="created",r="?",t="Boolean",p='Referer',q='Basic ',n="\n</pre>",o="string",w='Authorization',x="<pre>Could not execute json: \n",z="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",y=':',B="parseerror",A="file:",D="webkit",C="object";
qx.Class.define(J,{extend:qx.io.remote.transport.Abstract,statics:{handles:{synchronous:true,asynchronous:true,crossDomain:false,fileUpload:false,programaticFormFields:false,responseTypes:[E,u,I,K,H]},requestObjects:[],requestObjectCount:0,createRequestObject:qx.core.Variant.select(G,{"default":function(){return new XMLHttpRequest;
},"mshtml":function(){if(window.ActiveXObject&&qx.xml.Document.XMLHTTP){return new ActiveXObject(qx.xml.Document.XMLHTTP);
}
if(window.XMLHttpRequest){return new XMLHttpRequest;
}}}),isSupported:function(){return !!this.createRequestObject();
}},properties:{parseJson:{check:t,init:true}},members:{__ut:false,__uu:0,__uv:null,getRequest:function(){if(this.__uv===null){this.__uv=qx.io.remote.transport.XmlHttp.createRequestObject();
this.__uv.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
}return this.__uv;
},send:function(){this.__uu=0;
var S=this.getRequest();
var O=this.getMethod();
var V=this.getAsynchronous();
var U=this.getUrl();
var Q=(window.location.protocol===A&&!(/^http(s){0,1}\:/.test(U)));
this.__ut=Q;
var Y=this.getParameters(false);
var W=[];

for(var P in Y){var T=Y[P];

if(T instanceof Array){for(var i=0;i<T.length;i++){W.push(encodeURIComponent(P)+d+encodeURIComponent(T[i]));
}}else{W.push(encodeURIComponent(P)+d+encodeURIComponent(T));
}}
if(W.length>0){U+=(U.indexOf(r)>=0?N:r)+W.join(N);
}if(this.getData()===null){var Y=this.getParameters(true);
var W=[];

for(var P in Y){var T=Y[P];

if(T instanceof Array){for(var i=0;i<T.length;i++){W.push(encodeURIComponent(P)+d+encodeURIComponent(T[i]));
}}else{W.push(encodeURIComponent(P)+d+encodeURIComponent(T));
}}
if(W.length>0){this.setData(W.join(N));
}}var X=function(ba){var bf=z;
var bj=b;
var bd,bc,bb;
var bg,bh,bi,be;
var i=0;

do{bd=ba.charCodeAt(i++);
bc=ba.charCodeAt(i++);
bb=ba.charCodeAt(i++);
bg=bd>>2;
bh=((bd&3)<<4)|(bc>>4);
bi=((bc&15)<<2)|(bb>>6);
be=bb&63;

if(isNaN(bc)){bi=be=64;
}else if(isNaN(bb)){be=64;
}bj+=bf.charAt(bg)+bf.charAt(bh)+bf.charAt(bi)+bf.charAt(be);
}while(i<ba.length);
return bj;
};
try{if(this.getUsername()){if(this.getUseBasicHttpAuth()){S.open(O,U,V);
S.setRequestHeader(w,q+X(this.getUsername()+y+this.getPassword()));
}else{S.open(O,U,V,this.getUsername(),this.getPassword());
}}else{S.open(O,U,V);
}}catch(bk){this.error("Failed with exception: "+bk);
this.failed();
return;
}if(!qx.core.Variant.isSet(G,D)){S.setRequestHeader(p,window.location.href);
}var R=this.getRequestHeaders();

for(var P in R){S.setRequestHeader(P,R[P]);
}try{if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Request: "+this.getData());
}}S.send(this.getData());
}catch(bl){if(Q){this.failedLocally();
}else{this.error("Failed to send data: "+bl,"send");
this.failed();
}return;
}if(!V){this._onreadystatechange();
}},failedLocally:function(){if(this.getState()===h){return;
}this.warn("Could not load from file: "+this.getUrl());
this.failed();
},_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){switch(this.getState()){case f:case c:case h:case L:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.warn("Ignore Ready State Change");
}}return;
}var bm=this.getReadyState();

if(bm==4){if(!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(),bm,this.__ut)){if(this.getState()===M){this.setState(a);
}this.failed();
return;
}}while(this.__uu<bm){this.setState(qx.io.remote.Exchange._nativeMap[++this.__uu]);
}}),getReadyState:function(){var bn=null;

try{bn=this.getRequest().readyState;
}catch(bo){}return bn;
},setRequestHeader:function(bp,bq){this.getRequestHeaders()[bp]=bq;
},getResponseHeader:function(br){var bs=null;

try{bs=this.getRequest().getResponseHeader(br)||null;
}catch(bt){}return bs;
},getStringResponseHeaders:function(){var bv=null;

try{var bu=this.getRequest().getAllResponseHeaders();

if(bu){bv=bu;
}}catch(bw){}return bv;
},getResponseHeaders:function(){var bz=this.getStringResponseHeaders();
var bA={};

if(bz){var bx=bz.split(/[\r\n]+/g);

for(var i=0,l=bx.length;i<l;i++){var by=bx[i].match(/^([^:]+)\s*:\s*(.+)$/i);

if(by){bA[by[1]]=by[2];
}}}return bA;
},getStatusCode:function(){var bB=-1;

try{bB=this.getRequest().status;
}catch(bC){}return bB;
},getStatusText:function(){var bD=b;

try{bD=this.getRequest().statusText;
}catch(bE){}return bD;
},getResponseText:function(){var bF=null;

try{bF=this.getRequest().responseText;
}catch(bG){bF=null;
}return bF;
},getResponseXml:function(){var bJ=null;
var bH=this.getStatusCode();
var bI=this.getReadyState();

if(qx.io.remote.Exchange.wasSuccessful(bH,bI,this.__ut)){try{bJ=this.getRequest().responseXML;
}catch(bK){}}if(typeof bJ==C&&bJ!=null){if(!bJ.documentElement){var s=String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/,b);
bJ.loadXML(s);
}if(!bJ.documentElement){throw new Error("Missing Document Element!");
}
if(bJ.documentElement.tagName==B){throw new Error("XML-File is not well-formed!");
}}else{throw new Error("Response was not a valid xml document ["+this.getRequest().responseText+"]");
}return bJ;
},getFetchedLength:function(){var bL=this.getResponseText();
return typeof bL==o?bL.length:0;
},getResponseContent:function(){var bM=this.getState();

if(bM!==f&&bM!=h){if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.warn("Transfer not complete or failed, ignoring content!");
}}return null;
}
if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.debug("Returning content for responseType: "+this.getResponseType());
}}var bO=this.getResponseText();

if(bM==h){if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Failed: "+bO);
}}return bO;
}
switch(this.getResponseType()){case E:case H:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}return bO;
case I:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}
try{if(bO&&bO.length>0){var bN;

if(this.getParseJson()){bN=qx.util.Json.parse(bO,false);
bN=(bN===0?0:(bN||null));
}else{bN=bO;
}return bN;
}else{return null;
}}catch(bP){this.error("Could not execute json: ["+bO+"]",bP);
return x+bO+n;
}case u:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}
try{if(bO&&bO.length>0){var bN=window.eval(bO);
return (bN===0?0:(bN||null));
}else{return null;
}}catch(bQ){this.error("Could not execute javascript: ["+bO+"]",bQ);
return null;
}case K:bO=this.getResponseXml();

if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}return (bO===0?0:(bO||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}},_applyState:function(bR,bS){if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.debug("State: "+bR);
}}
switch(bR){case v:this.fireEvent(v);
break;
case M:this.fireEvent(M);
break;
case a:this.fireEvent(a);
break;
case F:this.fireEvent(F);
break;
case f:this.fireEvent(f);
break;
case h:this.fireEvent(h);
break;
case c:this.getRequest().abort();
this.fireEvent(c);
break;
case L:this.getRequest().abort();
this.fireEvent(L);
break;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp,J);
},destruct:function(){var bT=this.getRequest();

if(bT){bT.onreadystatechange=qx.lang.Function.empty;
switch(bT.readyState){case 1:case 2:case 3:bT.abort();
}}this.__uv=null;
}});
})();
(function(){var c="Integer",b="Object",a="qx.io.remote.Response";
qx.Class.define(a,{extend:qx.event.type.Event,properties:{state:{check:c,nullable:true},statusCode:{check:c,nullable:true},content:{nullable:true},responseHeaders:{check:b,nullable:true}},members:{clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e.setType(this.getType());
e.setState(this.getState());
e.setStatusCode(this.getStatusCode());
e.setContent(this.getContent());
e.setResponseHeaders(this.getResponseHeaders());
return e;
},getResponseHeader:function(f){var g=this.getResponseHeaders();

if(g){return g[f]||null;
}return null;
}}});
})();
(function(){var m="test",l="",k="All",h=".",g="^",f="demobrowser.TreeDataHandler",e="ttree",d="\\.[^\\.]+$",c="depth";
qx.Class.define(f,{extend:qx.core.Object,construct:function(n){qx.core.Object.call(this);
this.tmap=n;
this.ttree=this.__vB(n);
},members:{__vB:function(o){var q=o;
function p(u,v){var y=v.classname;
var w=y.split(h);
function x(parent,A){if(!A.length){return parent;
}else{var B=A[0];
var C=A.slice(1,A.length);
var D=null;
var E=null;
var F=parent.getChildren();

for(var i=0;i<F.length;i++){if(F[i].label==B){E=F[i];
break;
}}if(E==null){E=new demobrowser.Tree(B);
parent.add(E);
}D=x(E,C);
return D;
}}var z=x(u,w);

if(!z){throw new Error("No target to insert tests");
}r.readTree(v,z);
}function s(a,b){return (a.classname<b.classname)?-1:(a.classname>b.classname)?1:0;
}var t=new demobrowser.Tree(k);
var r=this;
q.sort(s);

for(var i=0;i<q.length;i++){p(t,q[i]);
}return t;
},readTree:function(G,H){var J=arguments[1]||new demobrowser.Tree(G.classname);
var H;
function I(a,b){return (a.name<b.name)?-1:(a.name>b.name)?1:0;
}
if(G.tests){G.tests.sort(I);

for(var j=0;j<G.tests.length;j++){H=new demobrowser.Tree(G.tests[j].name);
H.tags=G.tests[j].tags;
H.type=m;
H.desc=G.tests[j].desc;
H.manifest=G.tests[j].manifest;
J.add(H);
}}if(G.children&&G.children.length){for(var j=0;j<G.children.length;j++){var K=this.readTree(G.children[j]);
{};
J.add(K);
}}{};
return J;
},getRoot:function(){if(!this.Root){var M={classname:l,tests:[]};
var L=this.tmap;

for(var i=0;i<this.tmap.length;i++){if(M.classname.length>L[i].classname.length){M=L[i];
}}this.Root=M;
}return this.Root.classname;
},getChilds:function(N){var O=[];
var Q=this.tmap;
var P=g+N+d;
var R=new RegExp(P);

for(var i=0;i<Q.length;i++){if(Q[i].classname.match(R)){O.push(Q[i]);
}}return O;
},getTests:function(S){var T=this.tmap;

for(var i=0;i<T.length;i++){if(T[i].classname==S){return T[i].tests;
}}return [];
},getPath:function(U){if(!U){return l;
}var V=U.pwd();
V.shift();
if(this.isClass(U)){V=V.concat(U.label);
}return V;
},getChildren:function(W){if(W==k){var X=this.tmap;
var Y=[];

for(var i=0;i<X.length;i++){Y.push(X[i].classname);
}return Y;
}else if(this.isClass(W)){return this.getTests(W);
}else{return [];
}},isClass:function(ba){if(ba.type&&ba.type==m){return false;
}else{return true;
}},hasTests:function(bb){if(!this.isClass(bb)){return false;
}else{var bc=bb.getChildren();

for(var i=0;i<bc.length;i++){if(bc[i].type&&bc[i].type==m){return true;
}}return false;
}},classFromTest:function(bd){var be=l;
var bf=[];
classloop:
for(var i=0;i<this.tmap.length;i++){for(var j=0;j<this.tmap[i].tests.length;j++){if(this.tmap[i].tests[j]==bd){be=this.tmap[i].classname;
break classloop;
}}}return be;
},getFullName:function(bg){if(!bg){return l;
}var bh=this.getPath(bg);

if(bg.type&&bg.type==m){bh=bh.concat(bg.label);
}return bh.join(h);
},getPreviousNode:function(bi){var bj=bi.getPrevSibling();

if(bj){return bj;
}},getNextNode:function(bk){var bl=bk.getNextSibling();

if(bl){return bl;
}},testCount:function(bm){if(bm.type&&bm.type==m){return 1;
}else{var bn=0;
var bp=bm.getIterator(c);
var bo;

while(bo=bp()){if(bo.type&&bo.type==m){bn++;
}}return bn;
}}},destruct:function(){this.tmap=null;
this._disposeObjects(e);
}});
})();
(function(){var k="depth",j="tags",h="",g="widgetLinkFlat",e="widgetLinkFull",d="parent",c="manifest",b="children",a="demobrowser.Tree";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.label=arguments[0]||h;
this.children=[];
this.tags=null;
this.parent=null;
this.manifest=null;
this.readme=null;
},members:{pwd:function(){if(this.parent==null){return [];
}else{return this.parent.pwd().concat(this.parent.label);
}},hasChildren:function(){return this.children.length;
},getChildren:function(){return this.children;
},map:function(l,m){var n=k;
var o=this;
var p=this.getIterator(n);

while(o=p()){l.apply(o,m);
}},print:function(){this.map(function(){this.debug(this.label);
},[]);
},getIterator:function(q){var s=[this];
var r=q==k?1:0;
function f(){var t;

if(s.length){t=s.shift();
var u=t.getChildren();

if(u.length){if(r){s=u.concat(s);
}else{s=s.concat(u);
}}}else{t=null;
}return t;
}return f;
},getPrevSibling:function(){return this.getSibling(-1);
},getNextSibling:function(){return this.getSibling(1);
},getSibling:function(v){var w=this.parent.getChildren();
var x=this.self(arguments).indexOf(w,this);
var y=x+v;

if(w[y]){return w[y];
}},add:function(z){this.children.push(z);
z.parent=this;
}},statics:{indexOf:function(A,B){for(var i=0;i<A.length;i++){if(A[i]==B){return i;
}}}},destruct:function(){this._disposeObjects(e,g,d);
this._disposeArray(b);
this._disposeArray(j);
this._disposeMap(c);
}});
})();
(function(){var f="mshtml",e="pop.push.reverse.shift.sort.splice.unshift.join.slice",d="number",c="qx.type.BaseArray",b="qx.client",a=".";
qx.Class.define(c,{extend:Array,construct:function(g){},members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});
(function(){function k(l){if(qx.core.Variant.isSet(b,f)){j.prototype={length:0,$$isArray:true};
var o=e.split(a);

for(var length=o.length;length;){j.prototype[o[--length]]=Array.prototype[o[length]];
}}var p=Array.prototype.slice;
j.prototype.concat=function(){var r=this.slice(0);

for(var i=0,length=arguments.length;i<length;i++){var q;

if(arguments[i] instanceof j){q=p.call(arguments[i],0);
}else if(arguments[i] instanceof Array){q=arguments[i];
}else{q=[arguments[i]];
}r.push.apply(r,q);
}return r;
};
j.prototype.toString=function(){return p.call(this,0).toString();
};
j.prototype.toLocaleString=function(){return p.call(this,0).toLocaleString();
};
j.prototype.constructor=j;
j.prototype.indexOf=qx.lang.Core.arrayIndexOf;
j.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
j.prototype.forEach=qx.lang.Core.arrayForEach;
j.prototype.some=qx.lang.Core.arraySome;
j.prototype.every=qx.lang.Core.arrayEvery;
var m=qx.lang.Core.arrayFilter;
var n=qx.lang.Core.arrayMap;
j.prototype.filter=function(){var s=new this.constructor;
s.push.apply(s,m.apply(this,arguments));
return s;
};
j.prototype.map=function(){var t=new this.constructor;
t.push.apply(t,n.apply(this,arguments));
return t;
};
j.prototype.slice=function(){var u=new this.constructor;
u.push.apply(u,Array.prototype.slice.apply(this,arguments));
return u;
};
j.prototype.splice=function(){var v=new this.constructor;
v.push.apply(v,Array.prototype.splice.apply(this,arguments));
return v;
};
j.prototype.toArray=function(){return Array.prototype.slice.call(this,0);
};
j.prototype.valueOf=function(){return this.length;
};
return j;
}function j(length){if(arguments.length===1&&typeof length===d){this.length=-1<length&&length===length>>.5?length:this.push(length);
}else if(arguments.length){this.push.apply(this,arguments);
}}function h(){}h.prototype=[];
j.prototype=new h;
j.prototype.length=0;
qx.type.BaseArray=k(j);
})();
})();
(function(){var b="",a="qx.util.StringBuilder";
qx.Class.define(a,{extend:qx.type.BaseArray,members:{clear:function(){this.length=0;
},get:function(){return this.join(b);
},add:null,isEmpty:function(){return this.length===0;
},size:function(){return this.join(b).length;
}},defer:function(c,d){d.add=d.push;
d.toString=d.get;
d.valueOf=d.get;
}});
})();
(function(){var l="</span>",k="sym",j="nl",h="qxkey",g="ws",f=">",e="qqstr",d="<",c="qstr",b="linecomment",bg="ident",bf="keyword",be="regexp",bd="&",bc="|",bb="fullcomment",ba="atom",Y="\\r\\n|\\r|\\n",X="\\s*\\)*",W="\\s",s="^",t='["][^"]*["]',q="real",r="\\s*[,\\)]",o="<span class='string'>",p="[a-zA-Z_][a-zA-Z0-9_]*\\b",m="<span class='comment'>",n="[+-]?\\d+",w="\\s*\\(*\\s*",x="&nbsp;",F="qx.dev.Tokenizer",D="\\t",M="\\s*\\)*\\s*\\)",H="\\.(?:replace)\\s*\\(\\s*\\(*\\s*",S="\\)*\\.(?:test|exec)\\s*\\(\\s*",Q="<span class='regexp'>",z="int",V="'>",U="<span class='",T="(?:\\/(?!\\*)[^\\t\\n\\r\\f\\v\\/]+?\\/[mgi]*)",y=".",B="\\s*\\)*\\s*?,?",C="[\\(,]\\s*",E="<span class='ident'>",G="g",I="[+-]?\\d+(([.]\\d+)*([eE][+-]?\\d+))?",N="\\/\\*(?:.|[\\n\\r])*?\\*\\/",R="\n",u="$",v="['][^']*[']",A="tab",L="\\/\\/.*?[\\n\\r$]",K="<br>",J=" ",P="(?::|=|\\?)\\s*\\(*\\s*",O="\\.(?:match|search|split)\\s*\\(\\s*\\(*\\s*";
qx.Class.define(F,{extend:qx.core.Object,statics:{tokenizeJavaScript:function(bh){var bL={"break":1,"case":1,"catch":1,"continue":1,"default":1,"delete":1,"do":1,"else":1,"finally":1,"for":1,"function":1,"if":1,"in":1,"instanceof":1,"new":1,"return":1,"switch":1,"throw":1,"try":1,"typeof":1,"var":1,"while":1,"with":1};
var bB={"void":1,"null":1,"true":1,"false":1,"NaN":1,"Infinity":1,"this":1};
var bx={"statics":1,"members":1,"construct":1,"destruct":1,"events":1,"properties":1,"extend":1,"implement":1};
var bt=function(bM){return new RegExp(s+bM+u);
};
var bE=L;
var bu=N;
var bo=p;
var bw=n;
var br=I;
var bz=t;
var by=v;
var bm=D;
var bH=Y;
var bJ=W;
var bs=T;
var bv=[O+bs+M,H+bs+B,w+bs+S,P+bs+X,C+bs+r].join(bc);
var bF=bt(bE);
var bp=bt(bu);
var bC=bt(bo);
var bl=bt(bw);
var bI=bt(br);
var bk=bt(bz);
var bj=bt(by);
var bD=bt(bm);
var bq=bt(bH);
var bi=bt(bJ);
var bn=bt(bv);
var bA=new RegExp([bE,bu,bo,bw,br,bz,by,by,bm,bH,bJ,bv,y].join(bc),G);
var bG=[];
var a=bh.match(bA);

for(var i=0;i<a.length;i++){var bK=a[i];

if(bK.match(bF)){bG.push({type:b,value:bK});
}else if(bK.match(bp)){bG.push({type:bb,value:bK});
}else if(bK.match(bn)){bG.push({type:be,value:bK});
}else if(bK.match(bj)){bG.push({type:c,value:bK});
}else if(bK.match(bk)){bG.push({type:e,value:bK});
}else if(bL[bK]){bG.push({type:bf,value:bK});
}else if(bB[bK]){bG.push({type:ba,value:bK});
}else if(bx[bK]){bG.push({type:h,value:bK});
}else if(bK.match(bC)){bG.push({type:bg,value:bK});
}else if(bK.match(bI)){bG.push({type:q,value:bK});
}else if(bK.match(bl)){bG.push({type:z,value:bK});
}else if(bK.match(bq)){bG.push({type:j,value:bK});
}else if(bK.match(bt(bi))){bG.push({type:g,value:bK});
}else if(bK.match(bD)){bG.push({type:A,value:bK});
}else if(bK==f){bG.push({type:k,value:f});
}else if(bK==d){bG.push({type:k,value:d});
}else if(bK==bd){bG.push({type:k,value:bd});
}else{bG.push({type:k,value:bK});
}}return bG;
},javaScriptToHtml:function(bN){var bR=qx.dev.Tokenizer.tokenizeJavaScript(bN);
var bQ=new qx.util.StringBuilder();

for(var i=0;i<bR.length;i++){var bS=bR[i];
var bP=qx.bom.String.escape(bS.value);

switch(bS.type){case be:bQ.add(Q,bP,l);
break;
case bg:bQ.add(E,bP,l);
break;
case b:case bb:bQ.add(m,bP,l);
break;
case c:case e:bQ.add(o,bP,l);
break;
case bf:case ba:case h:bQ.add(U,bS.type,V,bP,l);
break;
case j:var bO=qx.bom.client.Engine.MSHTML?K:R;
bQ.add(bO);
break;
case g:var bT=qx.bom.client.Engine.MSHTML?x:J;
bQ.add(bT);
break;
default:bQ.add(bP);
}}return bQ.get();
}}});
})();
(function(){var g="",f="<br",e=" &nbsp;",d="<br>",c=" ",b="\n",a="qx.bom.String";
qx.Class.define(a,{statics:{TO_CHARCODE:{"quot":34,"amp":38,"lt":60,"gt":62,"nbsp":160,"iexcl":161,"cent":162,"pound":163,"curren":164,"yen":165,"brvbar":166,"sect":167,"uml":168,"copy":169,"ordf":170,"laquo":171,"not":172,"shy":173,"reg":174,"macr":175,"deg":176,"plusmn":177,"sup2":178,"sup3":179,"acute":180,"micro":181,"para":182,"middot":183,"cedil":184,"sup1":185,"ordm":186,"raquo":187,"frac14":188,"frac12":189,"frac34":190,"iquest":191,"Agrave":192,"Aacute":193,"Acirc":194,"Atilde":195,"Auml":196,"Aring":197,"AElig":198,"Ccedil":199,"Egrave":200,"Eacute":201,"Ecirc":202,"Euml":203,"Igrave":204,"Iacute":205,"Icirc":206,"Iuml":207,"ETH":208,"Ntilde":209,"Ograve":210,"Oacute":211,"Ocirc":212,"Otilde":213,"Ouml":214,"times":215,"Oslash":216,"Ugrave":217,"Uacute":218,"Ucirc":219,"Uuml":220,"Yacute":221,"THORN":222,"szlig":223,"agrave":224,"aacute":225,"acirc":226,"atilde":227,"auml":228,"aring":229,"aelig":230,"ccedil":231,"egrave":232,"eacute":233,"ecirc":234,"euml":235,"igrave":236,"iacute":237,"icirc":238,"iuml":239,"eth":240,"ntilde":241,"ograve":242,"oacute":243,"ocirc":244,"otilde":245,"ouml":246,"divide":247,"oslash":248,"ugrave":249,"uacute":250,"ucirc":251,"uuml":252,"yacute":253,"thorn":254,"yuml":255,"fnof":402,"Alpha":913,"Beta":914,"Gamma":915,"Delta":916,"Epsilon":917,"Zeta":918,"Eta":919,"Theta":920,"Iota":921,"Kappa":922,"Lambda":923,"Mu":924,"Nu":925,"Xi":926,"Omicron":927,"Pi":928,"Rho":929,"Sigma":931,"Tau":932,"Upsilon":933,"Phi":934,"Chi":935,"Psi":936,"Omega":937,"alpha":945,"beta":946,"gamma":947,"delta":948,"epsilon":949,"zeta":950,"eta":951,"theta":952,"iota":953,"kappa":954,"lambda":955,"mu":956,"nu":957,"xi":958,"omicron":959,"pi":960,"rho":961,"sigmaf":962,"sigma":963,"tau":964,"upsilon":965,"phi":966,"chi":967,"psi":968,"omega":969,"thetasym":977,"upsih":978,"piv":982,"bull":8226,"hellip":8230,"prime":8242,"Prime":8243,"oline":8254,"frasl":8260,"weierp":8472,"image":8465,"real":8476,"trade":8482,"alefsym":8501,"larr":8592,"uarr":8593,"rarr":8594,"darr":8595,"harr":8596,"crarr":8629,"lArr":8656,"uArr":8657,"rArr":8658,"dArr":8659,"hArr":8660,"forall":8704,"part":8706,"exist":8707,"empty":8709,"nabla":8711,"isin":8712,"notin":8713,"ni":8715,"prod":8719,"sum":8721,"minus":8722,"lowast":8727,"radic":8730,"prop":8733,"infin":8734,"ang":8736,"and":8743,"or":8744,"cap":8745,"cup":8746,"int":8747,"there4":8756,"sim":8764,"cong":8773,"asymp":8776,"ne":8800,"equiv":8801,"le":8804,"ge":8805,"sub":8834,"sup":8835,"sube":8838,"supe":8839,"oplus":8853,"otimes":8855,"perp":8869,"sdot":8901,"lceil":8968,"rceil":8969,"lfloor":8970,"rfloor":8971,"lang":9001,"rang":9002,"loz":9674,"spades":9824,"clubs":9827,"hearts":9829,"diams":9830,"OElig":338,"oelig":339,"Scaron":352,"scaron":353,"Yuml":376,"circ":710,"tilde":732,"ensp":8194,"emsp":8195,"thinsp":8201,"zwnj":8204,"zwj":8205,"lrm":8206,"rlm":8207,"ndash":8211,"mdash":8212,"lsquo":8216,"rsquo":8217,"sbquo":8218,"ldquo":8220,"rdquo":8221,"bdquo":8222,"dagger":8224,"Dagger":8225,"permil":8240,"lsaquo":8249,"rsaquo":8250,"euro":8364},escape:function(h){return qx.util.StringEscape.escape(h,qx.bom.String.FROM_CHARCODE);
},unescape:function(i){return qx.util.StringEscape.unescape(i,qx.bom.String.TO_CHARCODE);
},fromText:function(j){return qx.bom.String.escape(j).replace(/(  |\n)/g,function(k){var l={"  ":e,"\n":d};
return l[k]||k;
});
},toText:function(m){return qx.bom.String.unescape(m.replace(/\s+|<([^>])+>/gi,function(n){if(n.indexOf(f)===0){return b;
}else if(n.length>0&&n.replace(/^\s*/,g).replace(/\s*$/,g)==g){return c;
}else{return g;
}}));
}},defer:function(o){o.FROM_CHARCODE=qx.lang.Object.invert(o.TO_CHARCODE);
}});
})();
(function(){var g=";",f="&",e='X',d="",c='#',b="&#",a="qx.util.StringEscape";
qx.Class.define(a,{statics:{escape:function(h,j){var m,o=d;

for(var i=0,l=h.length;i<l;i++){var n=h.charAt(i);
var k=n.charCodeAt(0);

if(j[k]){m=f+j[k]+g;
}else{if(k>0x7F){m=b+k+g;
}else{m=n;
}}o+=m;
}return o;
},unescape:function(p,q){return p.replace(/&[#\w]+;/gi,function(r){var s=r;
var r=r.substring(1,r.length-1);
var t=q[r];

if(t){s=String.fromCharCode(t);
}else{if(r.charAt(0)==c){if(r.charAt(1).toUpperCase()==e){t=r.substring(2);
if(t.match(/^[0-9A-Fa-f]+$/gi)){s=String.fromCharCode(parseInt(t,16));
}}else{t=r.substring(1);
if(t.match(/^\d+$/gi)){s=String.fromCharCode(parseInt(t,10));
}}}}return s;
});
}}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var n="Liberation Sans",m="Arial",l="Lucida Grande",k="sans-serif",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",b="monospace",d="Lucida Console",c="qx.theme.modern.Font",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"bold":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k],bold:true},"small":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[d,e]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[g]:[g,a,f,b]}}});
})();
(function(){var j="_applyStyle",i="solid",h="Color",g="",f="double",e="px",d="px ",c="dotted",b="_applyWidth",a="dashed",G="Number",F=" ",E="qx.debug",D="shorthand",C="on",B="widthTop",A="styleRight",z="styleLeft",y="widthLeft",x="widthBottom",q="styleTop",r="colorBottom",o="styleBottom",p="widthRight",m="colorLeft",n="colorRight",k="colorTop",l="border-top",s="border-left",t="border-right",v="qx.ui.decoration.Single",u="border-bottom",w="absolute";
qx.Class.define(v,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(H,I,J){qx.ui.decoration.Abstract.call(this);
if(H!=null){this.setWidth(H);
}
if(I!=null){this.setStyle(I);
}
if(J!=null){this.setColor(J);
}},properties:{widthTop:{check:G,init:0,apply:b},widthRight:{check:G,init:0,apply:b},widthBottom:{check:G,init:0,apply:b},widthLeft:{check:G,init:0,apply:b},styleTop:{nullable:true,check:[i,c,a,f],init:i,apply:j},styleRight:{nullable:true,check:[i,c,a,f],init:i,apply:j},styleBottom:{nullable:true,check:[i,c,a,f],init:i,apply:j},styleLeft:{nullable:true,check:[i,c,a,f],init:i,apply:j},colorTop:{nullable:true,check:h,apply:j},colorRight:{nullable:true,check:h,apply:j},colorBottom:{nullable:true,check:h,apply:j},colorLeft:{nullable:true,check:h,apply:j},backgroundColor:{check:h,nullable:true,apply:j},left:{group:[y,z,m]},right:{group:[p,A,n]},top:{group:[B,q,k]},bottom:{group:[x,o,r]},width:{group:[B,p,x,y],mode:D},style:{group:[q,A,o,z],mode:D},color:{group:[k,n,r,m],mode:D}},members:{__px:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__px;
},getMarkup:function(K){if(this.__px){return this.__px;
}var L=qx.theme.manager.Color.getInstance();
var M={};
var O=this.getWidthTop();

if(O>0){M[l]=O+d+this.getStyleTop()+F+(L.resolve(this.getColorTop())||g);
}var O=this.getWidthRight();

if(O>0){M[t]=O+d+this.getStyleRight()+F+(L.resolve(this.getColorRight())||g);
}var O=this.getWidthBottom();

if(O>0){M[u]=O+d+this.getStyleBottom()+F+(L.resolve(this.getColorBottom())||g);
}var O=this.getWidthLeft();

if(O>0){M[s]=O+d+this.getStyleLeft()+F+(L.resolve(this.getColorLeft())||g);
}if(qx.core.Variant.isSet(E,C)){if(M.length===0){throw new Error("Invalid Single decorator (zero border width). Use qx.ui.decorator.Background instead!");
}}M.position=w;
M.top=0;
M.left=0;
var N=this._generateBackgroundMarkup(M);
return this.__px=N;
},resize:function(P,Q,R){var S=this.getInsets();
Q-=S.left+S.right;
R-=S.top+S.bottom;
if(Q<0){Q=0;
}
if(R<0){R=0;
}P.style.width=Q+e;
P.style.height=R+e;
P.style.left=(parseInt(P.style.left,10)+S.left-this.getWidthLeft())+e;
P.style.top=(parseInt(P.style.top,10)+S.top-this.getWidthTop())+e;
},tint:function(T,U){var V=qx.theme.manager.Color.getInstance();

if(U==null){U=this.getBackgroundColor();
}T.style.backgroundColor=V.resolve(U)||g;
},_applyWidth:function(){if(qx.core.Variant.isSet(E,C)){if(this.__px){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}this._resetInsets();
},_applyStyle:function(){if(qx.core.Variant.isSet(E,C)){if(this.__px){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}},destruct:function(){this.__px=null;
}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g="1px",f='<div style="',e='border:',d="1px solid ",c="",b=";",a="px",x='</div>',w="qx.ui.decoration.Beveled",v="qx.debug",u='<div style="position:absolute;top:1px;left:1px;',t='border-bottom:',s='border-right:',r='border-left:',q='border-top:',p="Number",o='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',n='<div style="overflow:hidden;font-size:0;line-height:0;">',k="on",l="absolute";
qx.Class.define(w,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(y,z,A){qx.ui.decoration.Abstract.call(this);
if(y!=null){this.setOuterColor(y);
}
if(z!=null){this.setInnerColor(z);
}
if(A!=null){this.setInnerOpacity(A);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:p,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__py:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__py;
},_applyStyle:function(){if(qx.core.Variant.isSet(v,k)){if(this.__py){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}},getMarkup:function(){if(this.__py){return this.__py;
}var B=qx.theme.manager.Color.getInstance();
var C=[];
var F=d+B.resolve(this.getOuterColor())+b;
var E=d+B.resolve(this.getInnerColor())+b;
C.push(n);
C.push(f);
C.push(e,F);
C.push(qx.bom.element.Opacity.compile(0.35));
C.push(i);
C.push(o);
C.push(r,F);
C.push(s,F);
C.push(qx.bom.element.Opacity.compile(1));
C.push(i);
C.push(f);
C.push(m);
C.push(q,F);
C.push(t,F);
C.push(qx.bom.element.Opacity.compile(1));
C.push(i);
var D={position:l,top:g,left:g,opacity:1};
C.push(this._generateBackgroundMarkup(D));
C.push(u);
C.push(e,E);
C.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
C.push(i);
C.push(x);
return this.__py=C.join(c);
},resize:function(G,H,I){if(H<4){H=4;
}
if(I<4){I=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=H-2;
var outerHeight=I-2;
var O=outerWidth;
var N=outerHeight;
var innerWidth=H-4;
var innerHeight=I-4;
}else{var outerWidth=H;
var outerHeight=I;
var O=H-2;
var N=I-2;
var innerWidth=O;
var innerHeight=N;
}var Q=a;
var M=G.childNodes[0].style;
M.width=outerWidth+Q;
M.height=outerHeight+Q;
var L=G.childNodes[1].style;
L.width=outerWidth+Q;
L.height=N+Q;
var K=G.childNodes[2].style;
K.width=O+Q;
K.height=outerHeight+Q;
var J=G.childNodes[3].style;
J.width=O+Q;
J.height=N+Q;
var P=G.childNodes[4].style;
P.width=innerWidth+Q;
P.height=innerHeight+Q;
},tint:function(R,S){var T=qx.theme.manager.Color.getInstance();

if(S==null){S=this.getBackgroundColor();
}R.childNodes[3].style.backgroundColor=T.resolve(S)||c;
}},destruct:function(){this.__py=null;
}});
})();
(function(){var q="qx.debug",p="_applyStyle",o="on",n="",m="Color",l="px",k="solid",j="dotted",i="double",h="dashed",c="_applyWidth",g="qx.ui.decoration.Uniform",f="px ",b=" ",a="scale",e="PositiveInteger",d="absolute";
qx.Class.define(g,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(r,s,t){qx.ui.decoration.Abstract.call(this);
if(r!=null){this.setWidth(r);
}
if(s!=null){this.setStyle(s);
}
if(t!=null){this.setColor(t);
}},properties:{width:{check:e,init:0,apply:c},style:{nullable:true,check:[k,j,h,i],init:k,apply:p},color:{nullable:true,check:m,apply:p},backgroundColor:{check:m,nullable:true,apply:p}},members:{__pz:null,_getDefaultInsets:function(){var u=this.getWidth();
return {top:u,right:u,bottom:u,left:u};
},_isInitialized:function(){return !!this.__pz;
},getMarkup:function(){if(this.__pz){return this.__pz;
}var v={position:d,top:0,left:0};
var w=this.getWidth();

if(qx.core.Variant.isSet(q,o)){if(w===0){throw new Error("Invalid Uniform decorator (zero border width). Use qx.ui.decorator.Background instead!");
}}var y=qx.theme.manager.Color.getInstance();
v.border=w+f+this.getStyle()+b+(y.resolve(this.getColor())||n);
var x=this._generateBackgroundMarkup(v);
return this.__pz=x;
},resize:function(z,A,B){var D=this.getBackgroundImage()&&this.getBackgroundRepeat()==a;

if(D||qx.bom.client.Feature.CONTENT_BOX){var C=this.getWidth()*2;
A-=C;
B-=C;
if(A<0){A=0;
}
if(B<0){B=0;
}}z.style.width=A+l;
z.style.height=B+l;
},tint:function(E,F){var G=qx.theme.manager.Color.getInstance();

if(F==null){F=this.getBackgroundColor();
}E.style.backgroundColor=G.resolve(F)||n;
},_applyWidth:function(){if(qx.core.Variant.isSet(q,o)){if(this.__pz){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}this._resetInsets();
},_applyStyle:function(){if(qx.core.Variant.isSet(q,o)){if(this.__pz){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}},destruct:function(){this.__pz=null;
}});
})();
(function(){var s="Number",r="_applyInsets",q="-l",p="Please verify the image '",o="' is present.",n="-t",m="insetRight",l="insetTop",k="qx.debug",j="The value of the property 'topSlice' is null! ",d="The value of the property 'leftSlice' is null! ",i="_applyBaseImage",g="insetBottom",c="set",b="shorthand",f="insetLeft",e="String",h="qx.ui.decoration.Grid",a="on";
qx.Class.define(h,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(t,u){qx.core.Object.call(this);

if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__pA=new qx.ui.decoration.css3.BorderImage();

if(t){this.__pB(t);
}}else{this.__pA=new qx.ui.decoration.GridDiv(t);
}
if(u!=null){this.__pA.setInsets(u);
}},properties:{baseImage:{check:e,nullable:true,apply:i},insetLeft:{check:s,nullable:true,apply:r},insetRight:{check:s,nullable:true,apply:r},insetBottom:{check:s,nullable:true,apply:r},insetTop:{check:s,nullable:true,apply:r},insets:{group:[l,m,g,f],mode:b}},members:{__pA:null,getMarkup:function(){return this.__pA.getMarkup();
},resize:function(v,w,x){this.__pA.resize(v,w,x);
},tint:function(y,z){},getInsets:function(){return this.__pA.getInsets();
},_applyInsets:function(A,B,name){var C=c+qx.lang.String.firstUp(name);
this.__pA[C](A);
},_applyBaseImage:function(D,E){if(this.__pA instanceof qx.ui.decoration.GridDiv){this.__pA.setBaseImage(D);
}else{this.__pB(D);
}},__pB:function(F){this.__pA.setBorderImage(F);
var L=qx.util.AliasManager.getInstance().resolve(F);
var M=/(.*)(\.[a-z]+)$/.exec(L);
var I=M[1];
var K=M[2];
var G=qx.util.ResourceManager.getInstance();
var N=G.getImageHeight(I+n+K);
var O=G.getImageWidth(I+q+K);

if(qx.core.Variant.isSet(k,a)){var H=j+p+I+n+K+o;
var J=d+p+I+q+K+o;
qx.core.Assert.assertNotNull(N,H);
qx.core.Assert.assertNotNull(O,J);
}this.__pA.setSlice([N,O]);
}},destruct:function(){this.__pA=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-input",bt="border-disabled",bs="decoration/table/header-cell.png",br="decoration/form/input.png",bq="#f8f8f8",bp="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bo="#b6b6b6",bn="background-pane",bm="repeat-y",bl="decoration/form/input-focused.png",bk="#33508D",t="decoration/selection.png",u="decoration/scrollbar/scrollbar-button-bg-vertical.png",r="decoration/tabview/tab-button-top-active.png",s="black",p="decoration/group-item.png",q="decoration/form/button-c.png",n="decoration/scrollbar/scrollbar-bg-vertical.png",o="decoration/form/button.png",B="decoration/form/button-checked.png",C="decoration/tabview/tab-button-left-inactive.png",O="decoration/groupbox/groupbox.png",K="#FAFAFA",W="decoration/pane/pane.png",R="dotted",bg="decoration/toolbar/toolbar-part.gif",bc="decoration/tabview/tab-button-top-inactive.png",G="decoration/menu/bar-background.png",bj="center",bi="decoration/tabview/tab-button-bottom-active.png",bh="decoration/form/button-hovered.png",F="decoration/form/tooltip-error-arrow.png",I="decoration/window/captionbar-inactive.png",J="qx/decoration/Modern",M="decoration/menu/background.png",P="decoration/window/statusbar.png",S="border-focused",Y="table-focus-indicator",be="#F2F2F2",v="decoration/form/button-checked-c.png",w="decoration/scrollbar/scrollbar-bg-horizontal.png",H="qx.theme.modern.Decoration",V="#f4f4f4",U="decoration/shadow/shadow-small.png",T="decoration/app-header.png",bb="decoration/tabview/tabview-pane.png",ba="decoration/form/tooltip-error.png",Q="decoration/form/button-focused.png",X="decoration/tabview/tab-button-bottom-inactive.png",a="decoration/form/button-disabled.png",bd="decoration/tabview/tab-button-right-active.png",x="decoration/form/button-pressed.png",y="no-repeat",L="decoration/window/captionbar-active.png",b="decoration/tabview/tab-button-left-active.png",c="background-splitpane",E="decoration/form/button-checked-focused.png",z="#C5C5C5",A="decoration/toolbar/toolbar-gradient.png",D="decoration/tabview/tab-button-right-inactive.png",N="#b8b8b8",bf="decoration/shadow/shadow.png";
qx.Theme.define(H,{aliases:{decoration:J},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:t,backgroundRepeat:l}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:t,backgroundRepeat:l,bottom:[2,m,bk]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,m,bk]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:W,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:O}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:s,style:R}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:F,backgroundPositionY:bj,backgroundRepeat:y,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:U,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:w,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:n,backgroundRepeat:bm}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:bt,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:bt,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:o,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:a,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:bh,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:x,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:B,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:E,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:S,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bt,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:A,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:q,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:v,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:N,colorRight:V,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bg,backgroundRepeat:bm}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:bb,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:r}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bc}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bi}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:X}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:b}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:C}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:D}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bn,width:3,color:c,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bn,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:L}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:I}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:P}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:Y,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthRight:1,colorRight:be,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:M,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:z,widthBottom:1,colorBottom:K}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:G,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:T,backgroundRepeat:l}},"progressbar":{decorator:qx.ui.decoration.Single,style:{width:1,color:d}},"group-item":{decorator:qx.ui.decoration.Background,style:{backgroundImage:p,backgroundRepeat:l}}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var dN="button-frame",dM="atom",dL="widget",dK="main",dJ="button",dI="bold",dH="text-selected",dG="image",dF="middle",dE="selected",co="background-light",cn="cell",cm="text-disabled",cl="groupbox",ck="decoration/arrows/down.png",cj="label",ci="border-invalid",ch="input",cg="white",cf="input-disabled",dU="menu-button",dV="input-focused-invalid",dS="toolbar-button",dT="spinner",dQ="input-focused",dR="popup",dO="tooltip",dP="list",dW="tree-item",dX="treevirtual-contract",dk="scrollbar",dj="datechooser/nav-button",dm="text-hovered",dl="center",dp="treevirtual-expand",dn="textfield",dr="decoration/arrows/right.png",dq="background-application",di="radiobutton",dh="invalid",k="combobox",l="right-top",m="checkbox",n="text-title",o="icon/16/places/folder-open.png",p="qx/static/blank.gif",q="scrollbar/button",r="right",s="combobox/button",t="icon/16/places/folder.png",em="text-label",el="decoration/tree/closed.png",ek="scrollbar-slider-horizontal",ej="checkbox-checked",eq="decoration/arrows/left.png",ep="button-focused",eo="text-light",en="menu-slidebar-button",es="checkbox-undetermined",er="text-input",bm="slidebar/button-forward",bn="background-splitpane",bk=".png",bl="decoration/tree/open.png",bq="default",br="decoration/arrows/down-small.png",bo="datechooser",bp="slidebar/button-backward",bi="selectbox",bj="treevirtual-folder",N="shadow-popup",M="icon/16/mimetypes/office-document.png",P="background-medium",O="icon/32/places/folder-open.png",J="icon/22/places/folder-open.png",I="table",L="decoration/arrows/up.png",K="decoration/form/",H="",G="-invalid",bx="button-checked",by="decoration/window/maximize-active-hovered.png",bz="radiobutton-hovered",bA="keyboard-focus",bt="group-item",bu="decoration/cursors/",bv="slidebar",bw="tooltip-error-arrow",bB="table-scroller-focus-indicator",bC="move-frame",bb="nodrop",ba="decoration/table/boolean-true.png",Y="table-header-cell",X="menu",W="app-header",V="row-layer",U="text-inactive",T="move",bf="radiobutton-checked-focused",be="decoration/window/restore-active-hovered.png",bD="shadow-window",bE="table-column-button",bF="right.png",bG="checkbox-undetermined-hovered",bH="tabview-page-button-bottom-inactive",bI="tooltip-error",bJ="window-statusbar",bK="button-hovered",bL="decoration/scrollbar/scrollbar-",bM="background-tip",cw="scrollbar-slider-horizontal-disabled",cv="table-scroller-header",cu="button-pressed",ct="table-pane",cA="decoration/window/close-active.png",cz="native",cy="checkbox-hovered",cx="button-invalid-shadow",cE="decoration/window/minimize-active-hovered.png",cD="menubar",dc="icon/16/actions/dialog-cancel.png",dd="tabview-page-button-top-inactive",da="tabview-page-button-left-inactive",db="menu-slidebar",cX="toolbar-button-checked",cY="decoration/tree/open-selected.png",cV="radiobutton-checked",cW="decoration/window/minimize-inactive.png",de="icon/16/apps/office-calendar.png",df="group",dv="tabview-page-button-right-inactive",du="decoration/window/minimize-active.png",dx="decoration/window/restore-inactive.png",dw="checkbox-checked-focused",dz="splitpane",dy="combobox/textfield",dB="button-preselected-focused",dA="decoration/window/close-active-hovered.png",dt="qx/icon/Tango/16/actions/window-close.png",ds="checkbox-pressed",ef="button-disabled",eg="selected-dragover",eh="border-separator",ei="decoration/window/maximize-inactive.png",eb="dragover",ec="scrollarea",ed="scrollbar-vertical",ee="decoration/menu/checkbox-invert.gif",dY="decoration/toolbar/toolbar-handle-knob.gif",ea="icon/22/mimetypes/office-document.png",j="button-preselected",i="button-checked-focused",h="up.png",g="best-fit",f="decoration/tree/closed-selected.png",e="qx.theme.modern.Appearance",d="text-active",c="toolbar-button-hovered",b="progressive-table-header",a="decoration/table/select-column-order.png",w="decoration/menu/radiobutton.gif",x="decoration/arrows/forward.png",u="decoration/table/descending.png",v="progressbar",A="window-captionbar-active",B="checkbox-checked-hovered",y="scrollbar-slider-vertical",z="toolbar",D="alias",E="decoration/window/restore-active.png",cI="decoration/table/boolean-false.png",cC="icon/32/mimetypes/office-document.png",cP="radiobutton-checked-disabled",cL="tabview-pane",cr="decoration/arrows/rewind.png",cp="checkbox-focused",R="top",cs="icon/16/actions/dialog-ok.png",bd="radiobutton-checked-hovered",bc="table-header-cell-hovered",bW="window",bX="text-gray",bY="decoration/menu/radiobutton-invert.gif",ca="text-placeholder",cb="slider",cc="keep-align",cd="down.png",ce="tabview-page-button-top-active",bT="icon/22/places/folder.png",bU="decoration/window/maximize-active.png",cq="checkbox-checked-pressed",cO="decoration/window/close-inactive.png",cN="tabview-page-button-left-active",cM="toolbar-part",cT="decoration/splitpane/knob-vertical.png",cS=".gif",cR="radiobutton-checked-pressed",cQ="table-statusbar",cK="radiobutton-pressed",cJ="window-captionbar-inactive",C="copy",bh="radiobutton-focused",bg="decoration/arrows/down-invert.png",cB="decoration/menu/checkbox.gif",bs="decoration/splitpane/knob-horizontal.png",cH="icon/32/places/folder.png",cG="toolbar-separator",cF="tabview-page-button-bottom-active",Q="decoration/arrows/up-small.png",cU="decoration/table/ascending.png",F="decoration/arrows/up-invert.png",S="small",bN="tabview-page-button-right-active",bO="-disabled",bP="scrollbar-horizontal",bQ="checkbox-undetermined-focused",bR="progressive-table-header-cell",bS="menu-separator",dg="pane",bV="decoration/arrows/right-invert.png",dD="left.png",dC="icon/16/actions/view-refresh.png";
qx.Theme.define(e,{appearances:{"widget":{},"root":{style:function(et){return {backgroundColor:dq,textColor:em,font:bq};
}},"label":{style:function(eu){return {textColor:eu.disabled?cm:undefined};
}},"move-frame":{style:function(ev){return {decorator:dK};
}},"resize-frame":bC,"dragdrop-cursor":{style:function(ew){var ex=bb;

if(ew.copy){ex=C;
}else if(ew.move){ex=T;
}else if(ew.alias){ex=D;
}return {source:bu+ex+cS,position:l,offset:[2,16,2,6]};
}},"image":{style:function(ey){return {opacity:!ey.replacement&&ey.disabled?0.3:1};
}},"atom":{},"atom/label":cj,"atom/icon":dG,"popup":{style:function(ez){return {decorator:dK,backgroundColor:co,shadow:N};
}},"button-frame":{alias:dM,style:function(eA){var eC,eB;

if(eA.checked&&eA.focused&&!eA.inner){eC=i;
eB=undefined;
}else if(eA.disabled){eC=ef;
eB=undefined;
}else if(eA.pressed){eC=cu;
eB=dm;
}else if(eA.checked){eC=bx;
eB=undefined;
}else if(eA.hovered){eC=bK;
eB=dm;
}else if(eA.preselected&&eA.focused&&!eA.inner){eC=dB;
eB=dm;
}else if(eA.preselected){eC=j;
eB=dm;
}else if(eA.focused&&!eA.inner){eC=ep;
eB=undefined;
}else{eC=dJ;
eB=undefined;
}return {decorator:eC,textColor:eB,shadow:eA.invalid&&!eA.disabled?cx:undefined};
}},"button-frame/image":{style:function(eD){return {opacity:!eD.replacement&&eD.disabled?0.5:1};
}},"button":{alias:dN,include:dN,style:function(eE){return {padding:[2,8],center:true};
}},"hover-button":{alias:dM,include:dM,style:function(eF){return {decorator:eF.hovered?dE:undefined,textColor:eF.hovered?dH:undefined};
}},"splitbutton":{},"splitbutton/button":dJ,"splitbutton/arrow":{alias:dJ,include:dJ,style:function(eG){return {icon:ck,padding:2,marginLeft:1};
}},"checkbox":{alias:dM,style:function(eH){var eJ;
if(eH.checked){if(eH.disabled){eJ=ej;
}else if(eH.focused){eJ=dw;
}else if(eH.pressed){eJ=cq;
}else if(eH.hovered){eJ=B;
}else{eJ=ej;
}}else if(eH.undetermined){if(eH.disabled){eJ=es;
}else if(eH.focused){eJ=bQ;
}else if(eH.hovered){eJ=bG;
}else{eJ=es;
}}else if(!eH.disabled){if(eH.focused){eJ=cp;
}else if(eH.pressed){eJ=ds;
}else if(eH.hovered){eJ=cy;
}}eJ=eJ||m;
var eI=eH.invalid&&!eH.disabled?G:H;
return {icon:K+eJ+eI+bk,gap:6};
}},"radiobutton":{alias:dM,style:function(eK){var eM;

if(eK.checked&&eK.focused){eM=bf;
}else if(eK.checked&&eK.disabled){eM=cP;
}else if(eK.checked&&eK.pressed){eM=cR;
}else if(eK.checked&&eK.hovered){eM=bd;
}else if(eK.checked){eM=cV;
}else if(eK.focused){eM=bh;
}else if(eK.pressed){eM=cK;
}else if(eK.hovered){eM=bz;
}else{eM=di;
}var eL=eK.invalid&&!eK.disabled?G:H;
return {icon:K+eM+eL+bk,gap:6};
}},"textfield":{style:function(eN){var eS;
var eQ=!!eN.focused;
var eR=!!eN.invalid;
var eO=!!eN.disabled;

if(eQ&&eR&&!eO){eS=dV;
}else if(eQ&&!eR&&!eO){eS=dQ;
}else if(eO){eS=cf;
}else if(!eQ&&eR&&!eO){eS=ci;
}else{eS=ch;
}var eP;

if(eN.disabled){eP=cm;
}else if(eN.showingPlaceholder){eP=ca;
}else{eP=er;
}return {decorator:eS,padding:[2,4,1],textColor:eP};
}},"textarea":{include:dn,style:function(eT){return {padding:4};
}},"spinner":{style:function(eU){var eY;
var eW=!!eU.focused;
var eX=!!eU.invalid;
var eV=!!eU.disabled;

if(eW&&eX&&!eV){eY=dV;
}else if(eW&&!eX&&!eV){eY=dQ;
}else if(eV){eY=cf;
}else if(!eW&&eX&&!eV){eY=ci;
}else{eY=ch;
}return {decorator:eY};
}},"spinner/textfield":{style:function(fa){return {marginRight:2,padding:[2,4,1],textColor:fa.disabled?cm:er};
}},"spinner/upbutton":{alias:dN,include:dN,style:function(fb){return {icon:Q,padding:fb.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:dN,include:dN,style:function(fc){return {icon:br,padding:fc.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":k,"datefield/button":{alias:s,include:s,style:function(fd){return {icon:de,padding:[0,3],decorator:undefined};
}},"datefield/textfield":dy,"datefield/list":{alias:bo,include:bo,style:function(fe){return {decorator:undefined};
}},"groupbox":{style:function(ff){return {legendPosition:R};
}},"groupbox/legend":{alias:dM,style:function(fg){return {padding:[1,0,1,4],textColor:fg.invalid?dh:n,font:dI};
}},"groupbox/frame":{style:function(fh){return {padding:12,decorator:df};
}},"check-groupbox":cl,"check-groupbox/legend":{alias:m,include:m,style:function(fi){return {padding:[1,0,1,4],textColor:fi.invalid?dh:n,font:dI};
}},"radio-groupbox":cl,"radio-groupbox/legend":{alias:di,include:di,style:function(fj){return {padding:[1,0,1,4],textColor:fj.invalid?dh:n,font:dI};
}},"scrollarea":{style:function(fk){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(fl){return {backgroundColor:dq};
}},"scrollarea/pane":dL,"scrollarea/scrollbar-x":dk,"scrollarea/scrollbar-y":dk,"scrollbar":{style:function(fm){if(fm[cz]){return {};
}return {width:fm.horizontal?undefined:16,height:fm.horizontal?16:undefined,decorator:fm.horizontal?bP:ed,padding:1};
}},"scrollbar/slider":{alias:cb,style:function(fn){return {padding:fn.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:dN,style:function(fo){var fp=fo.horizontal?ek:y;

if(fo.disabled){fp+=bO;
}return {decorator:fp,minHeight:fo.horizontal?undefined:9,minWidth:fo.horizontal?9:undefined};
}},"scrollbar/button":{alias:dN,include:dN,style:function(fq){var fr=bL;

if(fq.left){fr+=dD;
}else if(fq.right){fr+=bF;
}else if(fq.up){fr+=h;
}else{fr+=cd;
}
if(fq.left||fq.right){return {padding:[0,0,0,fq.left?3:4],icon:fr,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:fr,width:14,height:15};
}}},"scrollbar/button-begin":q,"scrollbar/button-end":q,"slider":{style:function(fs){var fw;
var fu=!!fs.focused;
var fv=!!fs.invalid;
var ft=!!fs.disabled;

if(fu&&fv&&!ft){fw=dV;
}else if(fu&&!fv&&!ft){fw=dQ;
}else if(ft){fw=cf;
}else if(!fu&&fv&&!ft){fw=ci;
}else{fw=ch;
}return {decorator:fw};
}},"slider/knob":{include:dN,style:function(fx){return {decorator:fx.disabled?cw:ek,shadow:undefined,height:14,width:14};
}},"list":{alias:ec,style:function(fy){var fC;
var fA=!!fy.focused;
var fB=!!fy.invalid;
var fz=!!fy.disabled;

if(fA&&fB&&!fz){fC=dV;
}else if(fA&&!fB&&!fz){fC=dQ;
}else if(fz){fC=cf;
}else if(!fA&&fB&&!fz){fC=ci;
}else{fC=ch;
}return {backgroundColor:co,decorator:fC};
}},"list/pane":dL,"listitem":{alias:dM,style:function(fD){var fE;

if(fD.dragover){fE=fD.selected?eg:eb;
}else{fE=fD.selected?dE:undefined;
}return {padding:fD.dragover?[4,4,2,4]:4,textColor:fD.selected?dH:undefined,decorator:fE};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:dN,include:dN,style:function(fF){return {padding:5,center:true,icon:fF.vertical?ck:dr};
}},"slidebar/button-backward":{alias:dN,include:dN,style:function(fG){return {padding:5,center:true,icon:fG.vertical?L:eq};
}},"tabview":{style:function(fH){return {contentPadding:16};
}},"tabview/bar":{alias:bv,style:function(fI){var fJ={marginBottom:fI.barTop?-1:0,marginTop:fI.barBottom?-4:0,marginLeft:fI.barRight?-3:0,marginRight:fI.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(fI.barTop||fI.barBottom){fJ.paddingLeft=5;
fJ.paddingRight=7;
}else{fJ.paddingTop=5;
fJ.paddingBottom=7;
}return fJ;
}},"tabview/bar/button-forward":{include:bm,alias:bm,style:function(fK){if(fK.barTop||fK.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:bp,alias:bp,style:function(fL){if(fL.barTop||fL.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(fM){return {decorator:cL,minHeight:100,marginBottom:fM.barBottom?-1:0,marginTop:fM.barTop?-1:0,marginLeft:fM.barLeft?-1:0,marginRight:fM.barRight?-1:0};
}},"tabview-page":dL,"tabview-page/button":{alias:dM,style:function(fN){var fT,fP=0;
var fS=0,fO=0,fQ=0,fR=0;

if(fN.checked){if(fN.barTop){fT=ce;
fP=[6,14];
fQ=fN.firstTab?0:-5;
fR=fN.lastTab?0:-5;
}else if(fN.barBottom){fT=cF;
fP=[6,14];
fQ=fN.firstTab?0:-5;
fR=fN.lastTab?0:-5;
}else if(fN.barRight){fT=bN;
fP=[6,13];
fS=fN.firstTab?0:-5;
fO=fN.lastTab?0:-5;
}else{fT=cN;
fP=[6,13];
fS=fN.firstTab?0:-5;
fO=fN.lastTab?0:-5;
}}else{if(fN.barTop){fT=dd;
fP=[4,10];
fS=4;
fQ=fN.firstTab?5:1;
fR=1;
}else if(fN.barBottom){fT=bH;
fP=[4,10];
fO=4;
fQ=fN.firstTab?5:1;
fR=1;
}else if(fN.barRight){fT=dv;
fP=[4,10];
fR=5;
fS=fN.firstTab?5:1;
fO=1;
fQ=1;
}else{fT=da;
fP=[4,10];
fQ=5;
fS=fN.firstTab?5:1;
fO=1;
fR=1;
}}return {zIndex:fN.checked?10:5,decorator:fT,padding:fP,marginTop:fS,marginBottom:fO,marginLeft:fQ,marginRight:fR,textColor:fN.checked?d:U};
}},"tabview-page/button/label":{alias:cj,style:function(fU){return {padding:[0,1,0,1],margin:fU.focused?0:1,decorator:fU.focused?bA:undefined};
}},"tabview-page/button/close-button":{alias:dM,style:function(fV){return {icon:dt};
}},"toolbar":{style:function(fW){return {decorator:z,spacing:2};
}},"toolbar/part":{style:function(fX){return {decorator:cM,spacing:2};
}},"toolbar/part/container":{style:function(fY){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(ga){return {source:dY,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:dM,style:function(gb){return {marginTop:2,marginBottom:2,padding:(gb.pressed||gb.checked||gb.hovered)&&!gb.disabled||(gb.disabled&&gb.checked)?3:5,decorator:gb.pressed||(gb.checked&&!gb.hovered)||(gb.checked&&gb.disabled)?cX:gb.hovered&&!gb.disabled?c:undefined};
}},"toolbar-menubutton":{alias:dS,include:dS,style:function(gc){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:dG,include:dG,style:function(gd){return {source:br};
}},"toolbar-splitbutton":{style:function(ge){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:dS,include:dS,style:function(gf){return {icon:ck,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:dS,include:dS,style:function(gg){if(gg.pressed||gg.checked||(gg.hovered&&!gg.disabled)){var gh=1;
}else{var gh=3;
}return {padding:gh,icon:ck,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(gi){return {decorator:cG,margin:7};
}},"tree":dP,"tree-item":{style:function(gj){return {padding:[2,6],textColor:gj.selected?dH:undefined,decorator:gj.selected?dE:undefined};
}},"tree-item/icon":{include:dG,style:function(gk){return {paddingRight:5};
}},"tree-item/label":cj,"tree-item/open":{include:dG,style:function(gl){var gm;

if(gl.selected&&gl.opened){gm=cY;
}else if(gl.selected&&!gl.opened){gm=f;
}else if(gl.opened){gm=bl;
}else{gm=el;
}return {padding:[0,5,0,2],source:gm};
}},"tree-folder":{include:dW,alias:dW,style:function(gn){var gp,go;

if(gn.small){gp=gn.opened?o:t;
go=o;
}else if(gn.large){gp=gn.opened?O:cH;
go=O;
}else{gp=gn.opened?J:bT;
go=J;
}return {icon:gp,iconOpened:go};
}},"tree-file":{include:dW,alias:dW,style:function(gq){return {icon:gq.small?M:gq.large?cC:ea};
}},"treevirtual":I,"treevirtual-folder":{style:function(gr){return {icon:gr.opened?o:t};
}},"treevirtual-file":{include:bj,alias:bj,style:function(gs){return {icon:M};
}},"treevirtual-line":{style:function(gt){return {icon:p};
}},"treevirtual-contract":{style:function(gu){return {icon:bl,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(gv){return {icon:el,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":dX,"treevirtual-only-expand":dp,"treevirtual-start-contract":dX,"treevirtual-start-expand":dp,"treevirtual-end-contract":dX,"treevirtual-end-expand":dp,"treevirtual-cross-contract":dX,"treevirtual-cross-expand":dp,"treevirtual-end":{style:function(gw){return {icon:p};
}},"treevirtual-cross":{style:function(gx){return {icon:p};
}},"tooltip":{include:dR,style:function(gy){return {backgroundColor:bM,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":dM,"tooltip-error":{include:dO,style:function(gz){return {textColor:dH,placeMethod:dL,offset:[0,0,0,14],marginTop:-2,position:l,showTimeout:100,hideTimeout:10000,decorator:bI,shadow:bw,font:dI};
}},"tooltip-error/atom":dM,"window":{style:function(gA){return {shadow:bD,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(gB){return {decorator:bW};
}},"window/captionbar":{style:function(gC){return {decorator:gC.active?A:cJ,textColor:gC.active?cg:bX,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(gD){return {margin:[5,0,3,6]};
}},"window/title":{style:function(gE){return {alignY:dF,font:dI,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:dM,style:function(gF){return {icon:gF.active?gF.hovered?cE:du:cW,margin:[4,8,2,0]};
}},"window/restore-button":{alias:dM,style:function(gG){return {icon:gG.active?gG.hovered?be:E:dx,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:dM,style:function(gH){return {icon:gH.active?gH.hovered?by:bU:ei,margin:[4,8,2,0]};
}},"window/close-button":{alias:dM,style:function(gI){return {icon:gI.active?gI.hovered?dA:cA:cO,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(gJ){return {padding:[2,6],decorator:bJ,minHeight:18};
}},"window/statusbar-text":{style:function(gK){return {font:S};
}},"iframe":{style:function(gL){return {decorator:dK};
}},"resizer":{style:function(gM){return {decorator:dg};
}},"splitpane":{style:function(gN){return {decorator:dz};
}},"splitpane/splitter":{style:function(gO){return {width:gO.horizontal?3:undefined,height:gO.vertical?3:undefined,backgroundColor:bn};
}},"splitpane/splitter/knob":{style:function(gP){return {source:gP.horizontal?bs:cT};
}},"splitpane/slider":{style:function(gQ){return {width:gQ.horizontal?3:undefined,height:gQ.vertical?3:undefined,backgroundColor:bn};
}},"selectbox":{alias:dN,include:dN,style:function(gR){return {padding:[2,8]};
}},"selectbox/atom":dM,"selectbox/popup":dR,"selectbox/list":{alias:dP},"selectbox/arrow":{include:dG,style:function(gS){return {source:ck,paddingLeft:5};
}},"datechooser":{style:function(gT){var gX;
var gV=!!gT.focused;
var gW=!!gT.invalid;
var gU=!!gT.disabled;

if(gV&&gW&&!gU){gX=dV;
}else if(gV&&!gW&&!gU){gX=dQ;
}else if(gU){gX=cf;
}else if(!gV&&gW&&!gU){gX=ci;
}else{gX=ch;
}return {padding:2,decorator:gX,backgroundColor:co};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:dN,alias:dN,style:function(gY){var ha={padding:[2,4],shadow:undefined};

if(gY.lastYear){ha.icon=cr;
ha.marginRight=1;
}else if(gY.lastMonth){ha.icon=eq;
}else if(gY.nextYear){ha.icon=x;
ha.marginLeft=1;
}else if(gY.nextMonth){ha.icon=dr;
}return ha;
}},"datechooser/last-year-button-tooltip":dO,"datechooser/last-month-button-tooltip":dO,"datechooser/next-year-button-tooltip":dO,"datechooser/next-month-button-tooltip":dO,"datechooser/last-year-button":dj,"datechooser/last-month-button":dj,"datechooser/next-month-button":dj,"datechooser/next-year-button":dj,"datechooser/month-year-label":{style:function(hb){return {font:dI,textAlign:dl,textColor:hb.disabled?cm:undefined};
}},"datechooser/date-pane":{style:function(hc){return {textColor:hc.disabled?cm:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(hd){return {textColor:hd.disabled?cm:hd.weekend?eo:undefined,textAlign:dl,paddingTop:2,backgroundColor:P};
}},"datechooser/week":{style:function(he){return {textAlign:dl,padding:[2,4],backgroundColor:P};
}},"datechooser/day":{style:function(hf){return {textAlign:dl,decorator:hf.disabled?undefined:hf.selected?dE:undefined,textColor:hf.disabled?cm:hf.selected?dH:hf.otherMonth?eo:undefined,font:hf.today?dI:undefined,padding:[2,4]};
}},"combobox":{style:function(hg){var hk;
var hi=!!hg.focused;
var hj=!!hg.invalid;
var hh=!!hg.disabled;

if(hi&&hj&&!hh){hk=dV;
}else if(hi&&!hj&&!hh){hk=dQ;
}else if(hh){hk=cf;
}else if(!hi&&hj&&!hh){hk=ci;
}else{hk=ch;
}return {decorator:hk};
}},"combobox/popup":dR,"combobox/list":{alias:dP},"combobox/button":{include:dN,alias:dN,style:function(hl){var hm={icon:ck,padding:2};

if(hl.selected){hm.decorator=ep;
}return hm;
}},"combobox/textfield":{include:dn,style:function(hn){return {decorator:undefined};
}},"menu":{style:function(ho){var hp={decorator:X,shadow:N,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:ho.submenu||ho.contextmenu?g:cc};

if(ho.submenu){hp.position=l;
hp.offset=[-2,-3];
}return hp;
}},"menu/slidebar":db,"menu-slidebar":dL,"menu-slidebar-button":{style:function(hq){return {decorator:hq.hovered?dE:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:en,style:function(hr){return {icon:hr.hovered?F:L};
}},"menu-slidebar/button-forward":{include:en,style:function(hs){return {icon:hs.hovered?bg:ck};
}},"menu-separator":{style:function(ht){return {height:0,decorator:bS,margin:[4,2]};
}},"menu-button":{alias:dM,style:function(hu){return {decorator:hu.selected?dE:undefined,textColor:hu.selected?dH:undefined,padding:[4,6]};
}},"menu-button/icon":{include:dG,style:function(hv){return {alignY:dF};
}},"menu-button/label":{include:cj,style:function(hw){return {alignY:dF,padding:1};
}},"menu-button/shortcut":{include:cj,style:function(hx){return {alignY:dF,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:dG,style:function(hy){return {source:hy.selected?bV:dr,alignY:dF};
}},"menu-checkbox":{alias:dU,include:dU,style:function(hz){return {icon:!hz.checked?undefined:hz.selected?ee:cB};
}},"menu-radiobutton":{alias:dU,include:dU,style:function(hA){return {icon:!hA.checked?undefined:hA.selected?bY:w};
}},"menubar":{style:function(hB){return {decorator:cD};
}},"menubar-button":{alias:dM,style:function(hC){return {decorator:(hC.pressed||hC.hovered)&&!hC.disabled?dE:undefined,textColor:hC.pressed||hC.hovered?dH:undefined,padding:[3,8]};
}},"colorselector":dL,"colorselector/control-bar":dL,"colorselector/control-pane":dL,"colorselector/visual-pane":cl,"colorselector/preset-grid":dL,"colorselector/colorbucket":{style:function(hD){return {decorator:dK,width:16,height:16};
}},"colorselector/preset-field-set":cl,"colorselector/input-field-set":cl,"colorselector/preview-field-set":cl,"colorselector/hex-field-composite":dL,"colorselector/hex-field":dn,"colorselector/rgb-spinner-composite":dL,"colorselector/rgb-spinner-red":dT,"colorselector/rgb-spinner-green":dT,"colorselector/rgb-spinner-blue":dT,"colorselector/hsb-spinner-composite":dL,"colorselector/hsb-spinner-hue":dT,"colorselector/hsb-spinner-saturation":dT,"colorselector/hsb-spinner-brightness":dT,"colorselector/preview-content-old":{style:function(hE){return {decorator:dK,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(hF){return {decorator:dK,backgroundColor:co,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(hG){return {decorator:dK,margin:5};
}},"colorselector/brightness-field":{style:function(hH){return {decorator:dK,margin:[5,7]};
}},"colorselector/hue-saturation-pane":dL,"colorselector/hue-saturation-handle":dL,"colorselector/brightness-pane":dL,"colorselector/brightness-handle":dL,"colorpopup":{alias:dR,include:dR,style:function(hI){return {padding:5,backgroundColor:dq};
}},"colorpopup/field":{style:function(hJ){return {decorator:dK,margin:2,width:14,height:14,backgroundColor:co};
}},"colorpopup/selector-button":dJ,"colorpopup/auto-button":dJ,"colorpopup/preview-pane":cl,"colorpopup/current-preview":{style:function(hK){return {height:20,padding:4,marginLeft:4,decorator:dK,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(hL){return {height:20,padding:4,marginRight:4,decorator:dK,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:dJ,include:dJ,style:function(hM){return {icon:cs};
}},"colorpopup/colorselector-cancelbutton":{alias:dJ,include:dJ,style:function(hN){return {icon:dc};
}},"table":{alias:dL,style:function(hO){return {decorator:I};
}},"table-header":{},"table/statusbar":{style:function(hP){return {decorator:cQ,padding:[0,2]};
}},"table/column-button":{alias:dN,style:function(hQ){return {decorator:bE,padding:3,icon:a};
}},"table-column-reset-button":{include:dU,alias:dU,style:function(){return {icon:dC};
}},"table-scroller":dL,"table-scroller/scrollbar-x":dk,"table-scroller/scrollbar-y":dk,"table-scroller/header":{style:function(hR){return {decorator:cv};
}},"table-scroller/pane":{style:function(hS){return {backgroundColor:ct};
}},"table-scroller/focus-indicator":{style:function(hT){return {decorator:bB};
}},"table-scroller/resize-line":{style:function(hU){return {backgroundColor:eh,width:2};
}},"table-header-cell":{alias:dM,style:function(hV){return {minWidth:13,minHeight:20,padding:hV.hovered?[3,4,2,4]:[3,4],decorator:hV.hovered?bc:Y,sortIcon:hV.sorted?(hV.sortedAscending?cU:u):undefined};
}},"table-header-cell/label":{style:function(hW){return {minWidth:0,alignY:dF,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(hX){return {alignY:dF,alignX:r};
}},"table-header-cell/icon":{style:function(hY){return {minWidth:0,alignY:dF,paddingRight:5};
}},"table-editor-textfield":{include:dn,style:function(ia){return {decorator:undefined,padding:[2,2],backgroundColor:co};
}},"table-editor-selectbox":{include:bi,alias:bi,style:function(ib){return {padding:[0,2],backgroundColor:co};
}},"table-editor-combobox":{include:k,alias:k,style:function(ic){return {decorator:undefined,backgroundColor:co};
}},"progressive-table-header":{alias:dL,style:function(id){return {decorator:b};
}},"progressive-table-header-cell":{alias:dM,style:function(ie){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:bR};
}},"app-header":{style:function(ig){return {font:dI,textColor:dH,padding:[8,12],decorator:W};
}},"virtual-list":dP,"virtual-list/row-layer":V,"row-layer":{style:function(ih){return {colorEven:cg,colorOdd:cg};
}},"group-item":{include:cj,alias:cj,style:function(ii){return {padding:4,decorator:bt,textColor:cg,font:dI};
}},"column-layer":dL,"cell":{style:function(ij){return {textColor:ij.selected?dH:em,padding:[3,6],font:bq};
}},"cell-string":cn,"cell-number":{include:cn,style:function(ik){return {textAlign:r};
}},"cell-image":cn,"cell-boolean":{include:cn,style:function(il){return {iconTrue:ba,iconFalse:cI};
}},"cell-atom":cn,"cell-date":cn,"cell-html":cn,"htmlarea":{"include":dL,style:function(im){return {backgroundColor:cg};
}},"progressbar":{style:function(io){return {decorator:v,padding:[1],backgroundColor:cg};
}},"progressbar/progress":{style:function(ip){return {decorator:dE};
}}}});
})();
(function(){var d="tree",c="main",b="Demo browser",a="demobrowser.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,title:b,appearances:{"demo-tree":{alias:d,include:d,style:function(){return {width:270,decorator:c};
}}}});
})();
(function(){var b="demobrowser.Theme",a="Demo browser";
qx.Theme.define(b,{title:a,meta:{color:qx.theme.modern.Color,decoration:qx.theme.modern.Decoration,font:qx.theme.modern.Font,icon:qx.theme.icon.Tango,appearance:demobrowser.Appearance}});
})();
(function(){var k="_applyStyle",j="stretch",h="Integer",g="px",f=" ",e="repeat",d="borderImage",c="foo.png",b="",a="round",R="shorthand",Q="Boolean",P="px ",O="Webkit",N="sliceBottom",M="div",L="O",K="solid",J=";'></div>",I="<div style='",s='transparent',t='url("foo.png") 4 4 4 4 fill stretch',q="qx.debug",r="sliceLeft",o="sliceRight",p="repeatX",m=" fill",n="Khtml",u="String",v="qx.ui.decoration.css3.BorderImage",A="border-box",z='") ',C='url("foo.png") 4 4 4 4 stretch',B="sliceTop",E="ms",D="4 fill",x='url("',H="hidden",G="Moz",F="on",w="repeatY",y="absolute";
qx.Class.define(v,{extend:qx.ui.decoration.Abstract,construct:function(S,T){qx.ui.decoration.Abstract.call(this);
if(S!=null){this.setBorderImage(S);
}
if(T!=null){this.setSlice(T);
}},statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:u,nullable:true,apply:k},sliceTop:{check:h,init:0,apply:k},sliceRight:{check:h,init:0,apply:k},sliceBottom:{check:h,init:0,apply:k},sliceLeft:{check:h,init:0,apply:k},slice:{group:[B,o,N,r],mode:R},repeatX:{check:[j,e,a],init:j,apply:k},repeatY:{check:[j,e,a],init:j,apply:k},repeat:{group:[p,w],mode:R},fill:{check:Q,init:true}},members:{__pC:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__pC;
},getMarkup:function(){if(this.__pC){return this.__pC;
}var U=this._resolveImageUrl(this.getBorderImage());
var V=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];
var W=[this.getRepeatX(),this.getRepeatY()].join(f);
var X=this.getFill()&&this.__pD()?m:b;
this.__pC=[I,qx.bom.element.Style.compile({"borderImage":x+U+z+V.join(f)+X+f+W,borderStyle:K,borderColor:s,position:y,lineHeight:0,fontSize:0,overflow:H,boxSizing:A,borderWidth:V.join(P)+g}),J].join(b);
return this.__pC;
},__pD:function(){var ba=this.__pF(d);

if(!ba){return null;
}var Y=document.createElement(M);

if(ba===d){Y.style[ba]=t;

if(Y.style.borderImageSource.indexOf(c)>=0&&Y.style.borderImageSlice.indexOf(D)>=0&&Y.style.borderImageRepeat.indexOf(j)>=0){return true;
}}else{Y.style[ba]=C;
if(Y.style[ba].indexOf(c)>=0){return false;
}}return null;
},__pE:[O,G,L,E,n],__pF:function(bb){var bc=document.documentElement.style;

if(bc[bb]!==undefined){return bb;
}
for(var i=0,l=this.__pE.length;i<l;i++){var bd=this.__pE[i]+qx.lang.String.firstUp(bb);

if(bc[bd]!==undefined){return bd;
}}return null;
},resize:function(be,bf,bg){be.style.width=bf+g;
be.style.height=bg+g;
},tint:function(bh,bi){},_applyStyle:function(){if(qx.core.Variant.isSet(q,F)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}},_resolveImageUrl:function(bj){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(bj));
}},destruct:function(){this.__pC=null;
}});
})();
(function(){var j="px",i="0px",h="-1px",g="no-repeat",f="scale-x",e="scale-y",d="-tr",c="-l",b='</div>',a="scale",z="qx.client",y="-br",x="-t",w="-tl",v="-r",u='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',t="qx.debug",s="_applyBaseImage",r="-b",q="String",o="",p="-bl",m="qx.ui.decoration.GridDiv",n="-c",k="mshtml",l="on";
qx.Class.define(m,{extend:qx.ui.decoration.Abstract,construct:function(A,B){qx.ui.decoration.Abstract.call(this);
if(A!=null){this.setBaseImage(A);
}
if(B!=null){this.setInsets(B);
}},properties:{baseImage:{check:q,nullable:true,apply:s}},members:{__pG:null,__pH:null,__pI:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__pG;
},getMarkup:function(){if(this.__pG){return this.__pG;
}var C=qx.bom.element.Decoration;
var D=this.__pH;
var E=this.__pI;
var F=[];
F.push(u);
F.push(C.create(D.tl,g,{top:0,left:0}));
F.push(C.create(D.t,f,{top:0,left:E.left+j}));
F.push(C.create(D.tr,g,{top:0,right:0}));
F.push(C.create(D.bl,g,{bottom:0,left:0}));
F.push(C.create(D.b,f,{bottom:0,left:E.left+j}));
F.push(C.create(D.br,g,{bottom:0,right:0}));
F.push(C.create(D.l,e,{top:E.top+j,left:0}));
F.push(C.create(D.c,a,{top:E.top+j,left:E.left+j}));
F.push(C.create(D.r,e,{top:E.top+j,right:0}));
F.push(b);
return this.__pG=F.join(o);
},resize:function(G,H,I){var J=this.__pI;
var innerWidth=H-J.left-J.right;
var innerHeight=I-J.top-J.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}G.style.width=H+j;
G.style.height=I+j;
G.childNodes[1].style.width=innerWidth+j;
G.childNodes[4].style.width=innerWidth+j;
G.childNodes[7].style.width=innerWidth+j;
G.childNodes[6].style.height=innerHeight+j;
G.childNodes[7].style.height=innerHeight+j;
G.childNodes[8].style.height=innerHeight+j;

if(qx.core.Variant.isSet(z,k)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(H%2==1){G.childNodes[2].style.marginRight=h;
G.childNodes[5].style.marginRight=h;
G.childNodes[8].style.marginRight=h;
}else{G.childNodes[2].style.marginRight=i;
G.childNodes[5].style.marginRight=i;
G.childNodes[8].style.marginRight=i;
}
if(I%2==1){G.childNodes[3].style.marginBottom=h;
G.childNodes[4].style.marginBottom=h;
G.childNodes[5].style.marginBottom=h;
}else{G.childNodes[3].style.marginBottom=i;
G.childNodes[4].style.marginBottom=i;
G.childNodes[5].style.marginBottom=i;
}}}},tint:function(K,L){},_applyBaseImage:function(M,N){if(qx.core.Variant.isSet(t,l)){if(this.__pG){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}
if(M){var R=this._resolveImageUrl(M);
var S=/(.*)(\.[a-z]+)$/.exec(R);
var Q=S[1];
var P=S[2];
var O=this.__pH={tl:Q+w+P,t:Q+x+P,tr:Q+d+P,bl:Q+p+P,b:Q+r+P,br:Q+y+P,l:Q+c+P,c:Q+n+P,r:Q+v+P};
this.__pI=this._computeEdgeSizes(O);
}},_resolveImageUrl:function(T){return qx.util.AliasManager.getInstance().resolve(T);
},_computeEdgeSizes:function(U){var V=qx.util.ResourceManager.getInstance();
return {top:V.getImageHeight(U.t),bottom:V.getImageHeight(U.b),left:V.getImageWidth(U.l),right:V.getImageWidth(U.r)};
}},destruct:function(){this.__pG=this.__pH=this.__pI=null;
}});
})();


qx.$$loader.init();

