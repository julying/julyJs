/*
 * ★ 网站开发常用 方法.
 * Version  : 1.0
 * Author   : 王子墨
 * Website  : lab.julying.com/july.js/
 * Email    : i@julying.com
 * QQ       : 31697011
 *
 * created  : 2012/06/08 20:20
 * updated  : 2013/12/20 22:00
 *
 *
 * Demo:
 * <script type="text/javascript" src="july.js"></script>
 * <script type="text/javascript">
 * 		//定义 ，可以不填写
 * 	julyJs.config = {
 * 			errorUrl : 'http://julying.com/?404' // 上报 window.onerror 的网址，用于后台统计、告警
 * };
 *	//初始化调用
 *	julyJs.init();
 * </script>
**/

/**
 * ■■■ 函数简介 ■■■
 *julyJs.version :
 julyJs.noop : 空函数
 julyJs.isArray :
 julyJs.extend : 对象扩展
 julyJs.event :
 　　　　.disable : 事件禁止
 julyJs.math :
 　　　　.add : 加法运算
 　　　　.subtract : 减法运算
 　　　　.multiply : 乘法运算
 　　　　.divide : 除法运算
 　　　　.gcd : 最大公约数
 　　　　.lcm : 最小公倍数
 　　　　.randInt : 随机整数
 　　　　.randArray : 随机生成数组
 　　　　.randWord : 随机字符串
 　　　　.randColor : 随机颜色
 julyJs.array :
 　　　　.index : 返回当前值所在数组的位置
 　　　　.getKey : 返回对象所有的键值
 　　　　.random : 从数组中 随机取出 一个值
 　　　　.unique : 一维数组去重
 　　　　.max : 求数组中最大的项
 　　　　.min : 求数组中最小的项
 　　　　.remove : 移除数组中某值
 　　　　.empty : 清空数组
 　　　　.removeAt : 删除数组中 指定位置的值
 　　　　.shuffle : 打乱数组排序
 julyJs.image :
 　　　　.preLoad : 预加载图像
 julyJs.json :
 　　　　.parse : 格式化字符串，变为 json 对象
 julyJs.template : 模板
 julyJs.browser :
 　　　　.browsers :
 　　　　.addFav : 加入收藏夹
 　　　　.ie :
 　　　　.isWebkit :
 julyJs.cookie :
 　　　　.enable :
 　　　　.get : 读取 cookie
 　　　　.set : 写入 cookie
 　　　　.del : 删除 cookie
 julyJs.url :
 　　　　.getQuery :
 　　　　.getHash : 获取 hash值
 　　　　.parse : 解析URL
 julyJs.regExp :
 　　　　.isNum : 是否为数组
 　　　　.isEmail : 是否为 邮箱
 　　　　.isIdCard : 是否为 身份证
 　　　　.isMobile : 是否为 手机
 　　　　.isQQ : 是否为 QQ
 　　　　.isTel : 是否为 电话
 　　　　.isUrl : 是否为 URL
 　　　　.isColor : 是否为 16进制颜色
 　　　　.isAdult : 是否年龄是否成年
 　　　　.isFloat : 是否为 浮点数
 　　　　.isInt : 是否为 正整数
 　　　　.isChinese : 是否全为 汉字
 julyJs.string :
 　　　　.codeHtml : 转义 HTML 字符
 　　　　.repeat : 重复字符串
 　　　　.addPre : 补齐。如给数字前 加 0
 　　　　.trim : 去除两边空格
 　　　　.replace : 字符串替换
 　　　　.xss : XSS 转义
 　　　　.badWord : 敏感词过滤
 julyJs.encrypt :
 　　　　.md5 : md5 哈希算法
 　　　　.sha1 : sha1 哈希算法
 　　　　.time33 : time33 哈希算法
 julyJs.date :
 　　　　.isInArea : 判断时间区域
 　　　　.parse : 格式化时间
 　　　　.getWeek : 获取星期几
 　　　　.format :
 　　　　.countDown : 倒计时
 */

;'use strict';

//console
window.console = window.console || {
	log : function(){}
}

window.julyJs = {
	version : '1.0' //# julyJs 版本号
	, noop  : function() { //#空函数
		return function(){
			//空函数
		};
	}
	, isArray : Array.isArray || function( array ) {  //# 判断变量 是否为数组
		return '[object Array]' == Object.prototype.toString.call( array );
	}
	, config : {} //用户传入
};

//初始化函数
julyJs.init = function(){ //#noadd
	//合并 参数
	this.option = this.extend( this.option, this.config );
	//判断浏览器信息
	this.browser.coreInit();
	//bad js
	this.badJs();
};


//默认初始值 , 会和 用户 输入的 julyJs.config 合并
julyJs.option = {
	errorUrl 		: '' //当 js 发生错误，需要将错误上报， 如：http://julying.com/？badjs
	, isPostError 	: false //是否 上报当前发生的错误
};

julyJs.extend = function(){ //# 对象扩展
	var target = arguments[0] || {}
		, i = 1
		, length = arguments.length
		, options
	;
	if ( typeof target != "object" && typeof target != "function" )
		target = {};
	for ( ; i < length; i++ ){
		if ( (options = arguments[ i ]) != null ){
			for ( var name in options ) {
				var copy = options[ name ];
				if ( target === copy ){
					continue;
				}
				if ( copy !== undefined ){
					target[ name ] = copy;
				}
			}
		}
	}
	return target;
};

// 加载 js
julyJs.loadJs = function( src, opt ){ //# 加载js文件（支持跨域）
	var head = document.getElementsByTagName('head')[0] || document.documentElement
		, script = document.createElement('script')
		, opts    = {
			onload      : this.noop() // 加载成功 回调
			, onerror   : this.noop() //onerror
			, charset   : 'utf-8' // 编码
			, timeout   : 2e3 // 超时时间
		}
		, timer = null //超时

	;
	//不允许地址为空
	if( ! src ){
		return ;
	}
	opts = this.extend(opts, opt);

	script.type = 'text/javascript';
	script.src = src;
	script.charset = opts.charset;
	script.onload = function(){
		opts.onload();
		clearTimeout( timer );
	};
	script.onerror = opts.onerror;
	script.onreadystatechange = function(){
		var state = this.readyState;
		if (state === 'loaded' || state === 'complete') {
			script.onreadystatechange = null;
			//清空超时事件
			clearTimeout( timer );
			opts.onload();
		}
	};
	head.insertBefore(script, head.firstChild);
	//检测超时
	timer = setTimeout(function(){
		head.removeChild( script );
		//触发错误
		opts.onerror();
	}, opts.timeout );
};

//构造url参数
julyJs.param = function(opt, isCode, url ){ //# 构造url参数
	var array = []
		, joins = '' //连接符
		, value = '' //tmp
	;
	url = url || '';
	for(var o in opt){
		if( o ){
			if( isCode ){
				value = encodeURIComponent( opt[o] || '');
			}else{
				value = ( opt[o] || '');
			}
			array.push( o +'='+ value);
		}
	}
	if( url ){
		joins = url.indexOf('?') > -1 ? '&' : '?';
	}
	return url + joins + array.join("&");
}

//二维码
julyJs.qr = function(){

}

// 上报页面内的 js 错误
julyJs.badJs = function( postUrl ){
	//1、运行时错误，例如无效的对象引用或安全限制， 2、下载错误，如图片， 3、在IE9中，获取多媒体数据失败也会引发
	//window 对象都支持 onerror ， <css> 和 <iframe> 不支持onerror。
	//对于引用外部js文件中的错误，Webkit和Mozilla类浏览器会篡改原始的错误信息，导致最后onerror获取到的三个入参为： “Script error.”,”", 0
	var errorUrl = this.option.errorUrl;
	if( ! errorUrl ){
		return ;
	}
	//上报
	window.onerror = function(msg, url, line){
		var opt = {
				browser     : window.navigator.userAgent //julyJs.browser.core +'/'+ julyJs.browser.version
				, referer   : document.referrer
				, url       : url
				, msg       : msg
				, line      : line
			}
			, iframe = document.createElement('iframe')
		;
		iframe.src = julyJs.param( opt, true, errorUrl);
		iframe.onload = function(){
			document.body.removeChild( iframe );//移除自己
		};
		iframe.style.display = 'none';
		////julyJs.loadJs( errorUrl ); 此处不能 用 js 方式！万一请求源错误，或者 返回错误js代码，会导致死循环。
		document.body.appendChild(iframe);
		console.log('js error:', opt);
	}
}


//############ 一些事件 event
julyJs.event = { //# 事件
	//@type : 类型
	//@area : 范围
	disable : function( type, area ){ //#事件禁止
		area = area || document.body ;
		switch( type ){
			//选择文字
			case 'select' : {
				area.onselectstart = function(){
					return false;
				};
			} break;

			//选择文字
			case 'rightMouse' : {
				area.oncontextmenu = function(){
					return false;
				};
			} break;

			//拷贝
			case 'copy' : {
				area.oncopy = function(){
					return false;
				};
			} break;

			//粘贴
			case 'paste' : {
				area.onpaste = function(){
					return false;
				};
			} break;
		}
	}
	// 输入框 限定字数
	, textCount : function ( inputDom, numDom, maxNum ){ //#输入框 限定字数
		var text = inputDom.value || '' //输入框的值
			, len   = text.length  //输入文字的长度
			, overplus  = maxNum - len //剩余
			;
		if( overplus < 0 ){
			inputDom.value = text.slice(0, maxNum);
			overplus = 0;
		}
		numDom.innerHTML = overplus ;
	}
};

//############ math
julyJs.math = { //# 数学计算
	/**加法运算
	 * @说明：解决两个浮点数相加时会出现误差的问题
	 * @参数1: number n1
	 * @参数2: number n2
	 * @示例：add(n1,n2)
	 * @返回：string n1+n2
	 */
	add : function(n1, n2) { //# 加法运算
		var oT = this.preAddSubtract(n1, n2)
			, out = !(oT === oT) ? oT : ((oT.n1 + oT.n2) / Math.pow(10, Math.max(oT.d1, oT.d2))).toFixed(Math.max(oT.d1, oT.d2))
		;
		return parseFloat( out );
	}
	/**减法运算
	 * @说明：解决两个浮点数相减时会出现误差的问题
	 * @参数1: number n1
	 * @参数2: number n2
	 * @示例：subtract(n1,n2)
	 * @返回：string n1-n2
	 */
	, subtract : function(n1, n2) { //# 减法运算
		var oT = this.preAddSubtract(n1, n2)
			, out = !(oT === oT) ? oT : ((oT.n1 - oT.n2) / Math.pow(10, Math.max(oT.d1, oT.d2))).toFixed(Math.max(oT.d1, oT.d2))
		;
		return parseFloat( out );
	}
	/**乘法运算
	 * @说明：解决两个浮点数相乘时会出现误差的问题
	 * @参数1: number n1
	 * @参数2: number n2
	 * @示例：multiply(n1,n2)
	 * @返回：string n1*n2
	 */
	, multiply : function(n1, n2) { //# 乘法运算
		var oT = this.preHandle(n1, n2)
			, out = !(oT === oT) ? oT : (oT.n1 * oT.n2 / Math.pow(10, oT.d1 + oT.d2)).toFixed(oT.d1 + oT.d2) ;
		return parseFloat( out );
	}
	/**除法运算
	 * @说明：解决两个浮点数相除时会出现误差的问题
	 * @参数1: number n1
	 * @参数2: number n2
	 * @示例：divide(n1,n2)
	 * @返回：number n1/n2
	 */
	, divide : function(n1, n2) { //# 除法运算
		var oT = this.preHandle(n1, n2)
			, out = !(oT === oT) ? oT : (oT.n1 / oT.n2 / Math.pow(10, oT.d1 - oT.d2))
		;
		return parseFloat( out );
	}
	/**预处理加减运算 , 外界不调用
	 * @参数1: number n1
	 * @参数2: number n2
	 * @示例：preAddSubtract (n1,n2)
	 * @返回：object
	 */
	, preAddSubtract : function (n1, n2) {  //#noadd
		var oT = this.preHandle(n1, n2);
		return !(oT === oT) ? oT : (function() {
			//右补齐0
			if (oT.d1 - oT.d2 > 0) {
				oT.s2 = oT.s2 + (new Array(oT.d1 - oT.d2 + 1)).join('0');
			}
			else {
				oT.s1 = oT.s1 + (new Array(oT.d2 - oT.d1 + 1)).join('0');
			}
			return {
				s1 : oT.s1,
				s2 : oT.s2,
				n1 : parseInt(oT.s1, 10),
				n2 : parseInt(oT.s2, 10),
				d1 : oT.d1,
				d2 : oT.d2
			};
		})();
	}
	//////
	/**预处理四则运算参数 , 外界不调用
	 * @参数1: number n1
	 * @参数2: number n2
	 * @示例：preHandle(n1,n2)
	 * @返回：object
	 */
	, preHandle : function (n1, n2) { //#noadd
		if (!(( typeof n1 === 'number' || ( typeof n1 === 'string' && /^[\d]+(\.[\d]+)?$/g.test(n1))) && ( typeof n2 === 'number' || ( typeof n2 === 'string' && /^[\d]+(\.[\d]+)?$/g.test(n2)))
			)) {
			return NaN;
		}
		var s1 = n1.toString(), s2 = n2.toString(), a1 = s1.split("."), a2 = s2.split(".");
		s1 = s1.replace(".", "");
		s2 = s2.replace(".", "");
		return {
			s1 : s1,
			s2 : s2,
			n1 : parseInt(s1, 10),
			n2 : parseInt(s2, 10),
			d1 : a1.length > 1 ? a1[1].length : 0, //小数部分长度
			d2 : a2.length > 1 ? a2[1].length : 0//小数部分长度
		};
	}
	// 计算最大公约数
	, gcd : function(a, b) { //# 最大公约数
		if( b == 0){
			return a;
		};
		return arguments.callee( b, a % b );
	}
	// 最小公倍数
	, lcm : function(a, b) {//# 最小公倍数
		return ( a *  b / arguments.callee(a, b) );
	}
	//随机整数
	//生成从num1到num2(不包括num2)之间的随机数,若只传递一个参数，则生成0到该数之间的随机数
	, randInt : function(num1, num2){  //# 随机整数
		if(num2 == undefined){
			num2 = num1;
			num1 = 0;
		}
		return Math.floor( Math.random() * (num2-num1) +num1 );
	}
	// 随机 生成数组
	//@quantity : 个数
	//@begin：
	//@end
	, randArray : function(quantity, begin, end){ //# 随机生成数组
		var ar = [] ;
		while( quantity -- ){
			ar.push( this.randInt(begin, end) );
		}
		return ar;
	}
	// 生成随机字符串
	//@len 长度
	, randWord : function( wordLen, baseWord ){ //# 随机字符串
		var words = baseWord || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
			, length = words.length
			, len = parseInt( wordLen ) || 0 //输出单词长度
			, out = [] //记录字符
			, pos = 0 // 记录位置
		;
		while( len-- ){
			pos = this.randInt(0, length );
			out.push( words[ pos ] );
		}
		return out.join('');
	}
	// 颜色
	, randColor : function(){ //# 随机颜色
		var color = (Math.random() * 1e7).toString(16);
		return color.slice(6);
	}
};

//############ Array
julyJs.array = {    //# 数组方法
	// inArray, 返回位置！ 不存在则返回 -1；
	index : function(t, arr){ //# 返回当前值所在数组的位置
		if(arr.indexOf){
			return arr.indexOf(t);
		}
		for(var i = arr.length ; i--; ){
			if(arr[i]===t){
				return i*1;
			}
		};
		return -1;
	}
	//返回对象 的 键值！  返回值 类型为数组。
	, getKey : function( data ){ //# 返回对象所有的键值
		var arr = []
			, k
		;
		for( k in data) {
			arr.push( k );
		};
		return arr ;
	}
	//从数组中 随机取出 一个值
	, random : function( arrays ){ //# 从数组中 随机取出 一个值
		arrays = arrays || [];
		var len = arrays.length
			, index = julyJs.math.randInt(0, len - 1 )
		;
		return arrays[ index ] || '';
	}
	// 一维 数组去重
	, unique : function( array ){ //#一维数组去重
		array = array || [];
		for(var i = 0, len = array.length; i < len; i++) {
			for(var j = i+1; j < array.length; j++){
				if( array[i] === array[j] ) {
					array.splice(j,1);
					j--;
				}
			}
		}
		return array;
	}
	// max , 数组中最大的项
	, max : function( array ){//#求数组中最大的项
		return Math.max.apply(null, array);
	}
	// min , 数组中最小的项
	, min : function( array ){ //#求数组中最小的项
		return Math.min.apply(null, array);
	}
	// remove ， 移除
	, remove : function( array, value ){ //#移除数组中某值
		var length = array.length;
		while( length-- ){
			if( value === array[ length ] ){
				array.splice(length, 1);
			}
		}
		return array;
	}
	//清空数组
	, empty : function( array ){ //# 清空数组
		( array || []).length = 0;
		return array;
	}
	//  removeAt ，删除指定位置的 值
	//@index , 索引. 不传递 index ，会删除第一个
	, removeAt : function( array, index ){ //#删除数组中 指定位置的值
		array.splice( index, 1);
		return array;
	}
	//打乱数组排序
	, shuffle : function( arr ){ //#打乱数组排序
		var array = (arr || []).concat()
			, length = array.length
			, i     = length //遍历
			, tmp   = null // 临时
			, rand  = julyJs.math.randInt //位置
			, pos   = 0
		;
		while( i-- ){
			pos = rand( 0, length );
			//交换随机位置
			tmp = array[ pos ];
			array[ pos ] = array[ i ] ;
			array[ i ] = tmp;
		}
		return array;
	}
};

julyJs.image = { //# 图像
	// 预加载图片
	//@imgs : 类型 数组 ， 如 [ '1.jpg', '2.gif' ]
	//@load( index ) : 加载完毕后执行 的方法
	//@error( index ) : 加载出错执行
	preLoad : function( imgs, opt ){ //# 预加载图像
		imgs = imgs || [];
		var options         = {
				load        : julyJs.noop
				, error     : julyJs.noop
			}
			, opts      = null
			, length    = imgs.length
			, img       = []
			, i         = 0
		;
		opts = julyJs.extend( options, opt );
		for( ; i < length; i++ ){
			img[ i ] = new Image();
			img[ i ].src = imgs[ i ];
			img[ i ].i = i;
			img[ i ].onload = function(){
				opts.load( this.i );
			};
			img[ i ].onerror = function(){
				opts.error( this.i );
			};
		}
	}
};


julyJs.json = { //# json 对象
	// 字符串 变为 json 对象
	parse : function( data ) {  //# 格式化字符串，变为 json 对象
		var // JSON RegExp
			rvalidchars = /^[\],:{}\s]*$/
			, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g
			, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g
			, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g
			;
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}
		if ( typeof data === "string" ) {
			data = data.replace(/^\s+|\s+$/g, '');
			if ( data && rvalidchars.test( data.replace( rvalidescape, "@" )
				.replace( rvalidtokens, "]" )
				.replace( rvalidbraces, "")) ) {
				return ( new Function( "return " + data ) )();
			}
		}
		return '';
	}
};

//javascript 模板引擎
// @http://aui.github.io/artTemplate/
julyJs.template = function(){ //# 模板
	var out  ;

	!function(e){var n=function(e,r){return n["string"==typeof r?"compile":"render"].apply(n,arguments)};n.version="2.0.4",n.openTag="<%",n.closeTag="%>",n.isEscape=!0,n.isCompress=!1,n.parser=null,n.render=function(e,r){var t=n.get(e)||i({id:e,name:"Render Error",message:"No Template"});return t(r)},n.compile=function(e,t){function a(r){try{return new s(r,e)+""}catch(o){return u?i(o)():n.compile(e,t,!0)(r)}}var c=arguments,u=c[2],l="anonymous";"string"!=typeof t&&(u=c[1],t=c[0],e=l);try{var s=o(e,t,u)}catch(p){return p.id=e||t,p.name="Syntax Error",i(p)}return a.prototype=s.prototype,a.toString=function(){return s.toString()},e!==l&&(r[e]=a),a};var r=n.cache={},t=n.helpers=function(){var e=function(n,r){return"string"!=typeof n&&(r=typeof n,"number"===r?n+="":n="function"===r?e(n.call(n)):""),n},r={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},t=function(n){return e(n).replace(/&(?![\w#]+;)|[<>"']/g,function(e){return r[e]})},i=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},o=function(e,n){if(i(e))for(var r=0,t=e.length;t>r;r++)n.call(e,e[r],r,e);else for(r in e)n.call(e,e[r],r)};return{$include:n.render,$string:e,$escape:t,$each:o}}();n.helper=function(e,n){t[e]=n},n.onerror=function(n){var r="Template Error\n\n";for(var t in n)r+="<"+t+">\n"+n[t]+"\n\n";e.console&&console.error(r)},n.get=function(t){var i;if(r.hasOwnProperty(t))i=r[t];else if("document"in e){var o=document.getElementById(t);if(o){var a=o.value||o.innerHTML;i=n.compile(t,a.replace(/^\s*|\s*$/g,""))}}return i};var i=function(e){return n.onerror(e),function(){return"{Template Error}"}},o=function(){var e=t.$each,r="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",i=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,o=/[^\w$]+/g,a=new RegExp(["\\b"+r.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),c=/^\d[^,]*|,\d[^,]*/g,u=/^,+|,+$/g,l=function(e){return e.replace(i,"").replace(o,",").replace(a,"").replace(c,"").replace(u,"").split(/^$|,+/)};return function(r,i,o){function a(e){return m+=e.split(/\n/).length-1,n.isCompress&&(e=e.replace(/[\n\r\t\s]+/g," ").replace(/<!--.*?-->/g,"")),e&&(e=x[1]+p(e)+x[2]+"\n"),e}function c(e){var r=m;if($?e=$(e):o&&(e=e.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===e.indexOf("=")){var i=!/^=[=#]/.test(e);if(e=e.replace(/^=[=#]?|[\s;]*$/g,""),i&&n.isEscape){var a=e.replace(/\s*\([^\)]+\)/,"");t.hasOwnProperty(a)||/^(include|print)$/.test(a)||(e="$escape("+e+")")}else e="$string("+e+")";e=x[1]+e+x[2]}return o&&(e="$line="+r+";"+e),u(e),e+"\n"}function u(n){n=l(n),e(n,function(e){e&&!y.hasOwnProperty(e)&&(s(e),y[e]=!0)})}function s(e){var n;"print"===e?n=T:"include"===e?(v.$include=t.$include,n=O):(n="$data."+e,t.hasOwnProperty(e)&&(v[e]=t[e],n=0===e.indexOf("$")?"$helpers."+e:n+"===undefined?$helpers."+e+":"+n)),w+=e+"="+n+","}function p(e){return"'"+e.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}var f=n.openTag,d=n.closeTag,$=n.parser,g=i,h="",m=1,y={$data:1,$id:1,$helpers:1,$out:1,$line:1},v={},w="var $helpers=this,"+(o?"$line=0,":""),b="".trim,x=b?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],E=b?"$out+=$text;return $text;":"$out.push($text);",T="function($text){"+E+"}",O="function(id,data){data=data||$data;var $text=$helpers.$include(id,data,$id);"+E+"}";e(g.split(f),function(e){e=e.split(d);var n=e[0],r=e[1];1===e.length?h+=a(n):(h+=c(n),r&&(h+=a(r)))}),g=h,o&&(g="try{"+g+"}catch(e){"+"throw {"+"id:$id,"+"name:'Render Error',"+"message:e.message,"+"line:$line,"+"source:"+p(i)+".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')"+"};"+"}"),g=w+x[0]+g+"return new String("+x[3]+");";try{var S=new Function("$data","$id",g);return S.prototype=v,S}catch(P){throw P.temp="function anonymous($data,$id) {"+g+"}",P}}}();"function"==typeof define?define(function(){return n}):"undefined"!=typeof exports&&(module.exports=n),out=n}(window);
	//改变默认界定符号，防止 和 asp，phg 冲突
	//out.openTag = "<!--[";
	//out.closeTag = "]-->";
	return out ;
}



julyJs.browser = { //#浏览器
	browsers : { //# 浏览器内核类别
		weixin		: /micromessenger(\/[\d\.]+)*/   //微信内置浏览器
		, mqq		: /mqqbrowser(\/[\d\.]+)*/       //手机QQ浏览器
		, uc		: /ucbrowser(\/[\d\.]+)*/            //UC浏览器
		, chrome	: /(?:chrome|crios)(\/[\d\.]+)*/  //chrome浏览器
		, firefox	: /firefox(\/[\d\.]+)*/          //火狐浏览器
		, opera		: /opera(\/|\s)([\d\.]+)*/     //欧朋浏览器
		, sougou	: /sogoumobilebrowser(\/[\d\.]+)*/   //搜狗手机浏览器
		, baidu		: /baidubrowser(\/[\d\.]+)*/          //百度手机浏览器
		, 360		: /360browser([\d\.]*)/                         //360浏览器
		, safari	: /safari(\/[\d\.]+)*/		//苹果浏览器
		, ie		: /msie\s([\d\.]+)*/    // ie 浏览器
	}
	//@errCall : 错误回调
	, addFav : function( url, title, errCall){ //#加入收藏夹
		try{
			window.external.addFavorite(url, title);
		}catch(e){
			try{
				window.sidebar.addPanel(title, url, '');
			}catch (e){
				errCall();
			}
		}
	},
	//浏览器版本
	coreInit : function(){ //#noadd
		var i 			= null
			, browsers 	= this.browsers
			, ua		= window.navigator.userAgent.toLowerCase()
			, brower	= ''
			, pos		= 1
		;
		for( i in browsers){
			if( brower = ua.match( browsers[i] ) ){
				if( i == 'opera'){
					pos = 2;
				}else{
					pos = 1;
				}
				this.version = (brower[ pos ] || '').replace(/[\/\s]+/, '');
				this.core = i ;
				return i;
			}
		}
	}
	// 检测IE版本 ！仅支持IE:  5,6,7,8,9 版本
	, ie : (function(){ //# 检测IE版本 ！仅支: ie5,6,7,8,9
		var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
			);
		return v > 4 ? v : false ;
	})()
	, isWebkit : /webkit/i.test(navigator.userAgent)
	, version : 0
	, core	: ''

};

//###########  cookie
julyJs.cookie = { //# Cookie
	// 浏览器是够支持 cookie
	enable  : !!navigator.cookieEnabled
	//读取COOKIE
	, get : function( name ){ //#读取 cookie
		var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)")
			, val = document.cookie.match(reg)
		;
		return val ? (val[2] ? unescape(val[2]) : "") : '';
	}
	//写入COOKIES
	, set : function(name, value, expires, path, domain, secure){ //# 写入 cookie
		var exp = new Date()
			, expires = arguments[2] || null
			, path = arguments[3] || "/"
			, domain = arguments[4] || null
			, secure = arguments[5] || false
		;
		expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
		document.cookie = name + '=' + escape(value) + ( expires ? ';expires=' + exp.toGMTString() : '') + ( path ? ';path=' + path : '') + ( domain ? ';domain=' + domain : '') + ( secure ? ';secure' : '');
	}
	//删除cookie
	, del : function(name, path, domain, secure){ //#删除 cookie
		var value = $getCookie(name);
		if(value != null) {
			var exp = new Date();
			exp.setMinutes(exp.getMinutes() - 1000);
			path = path || "/";
			document.cookie = name + '=;expires=' + exp.toGMTString() + ( path ? ';path=' + path : '') + ( domain ? ';domain=' + domain : '') + ( secure ? ';secure' : '');
		}
	}
};


//############  url
julyJs.url = { //#URL
	//参数：变量名，url为空则表从当前页面的url中取
	getQuery : function(name, url){
		var u  		= arguments[1] || window.location.search
			, reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
			, r = u.substr(u.indexOf("?")+1).match(reg)
		;
		return r != null ? r[2] : "";
	}
	, getHash : function(name, url){ //# 获取 hash值
		var u = arguments[1] || location.hash;
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = u.substr(u.indexOf("#") + 1).match(reg);
		if (r != null){
			return r[2];
		}
		return "";
	}
	, parse : function(url) { //# 解析URL
		var a =  document.createElement('a');
		url = url || document.location.href;
		a.href = url ;
		return {
			source		: url
			, protocol	: a.protocol.replace(':','')
			, host		: a.hostname
			, port		: a.port
			, query		: a.search
			, file		: (a.pathname.match(/([^\/?#]+)$/i) || [,''])[1]
			, hash		: a.hash.replace('#','')
			, path		: a.pathname.replace(/^([^\/])/,'/$1')
			, relative	: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1]
			, segments	: a.pathname.replace(/^\//,'').split('/')
		};
	}
};

//####################  regExp
julyJs.regExp = {  //# 字符串匹配
	//是否为 数字！整数，浮点数
	isNum : function( num ){ //# 是否为数组
		return ! isNaN( num ) ;
	}
	, isEmail : function( mail ){//# 是否为 邮箱
		return /^([a-z0-9]+[_\-\.]?)*[a-z0-9]+@([a-z0-9]+[_\-\.]?)*[a-z0-9]+\.[a-z]{2,5}$/i.test( mail );
	}
	, isIdCard : function( card ){ //# 是否为 身份证
		return /^(\d{14}|\d{17})(\d|[xX])$/.test( card );
	}
	, isMobile : function( mobile ){ //# 是否为 手机
		return /^0*1\d{10}$/.test( mobile ) ;
	}
	, isQQ : function( qq ){ //# 是否为 QQ
		return /^[1-9]\d{4,10}$/.test( qq );
	}
	, isTel:function( tel ){ //# 是否为 电话
		return /^\d{3,4}-\d{7,8}(-\d{1,6})?$/.text( tel ) ;
	}
	, isUrl : function( url ){ //# 是否为 URL
		return /https?:\/\/[a-z0-9\.\-]{1,255}\.[0-9a-z\-]{1,255}/i.test( url );
	}
	, isColor : function( color ){ //# 是否为 16进制颜色
		return /#([\da-f]{3}){1,2}$/i.test( color );
	}
	//@id ： 身份证 ，
	// @now : 当前时间 如：new Date('2013/12/12') , '2013/12/12'
	// @age ： 允许的年龄
	, isAdult : function( id, allowAge, now ){ //# 是否年龄是否成年
		var age = 0 // 用户 年月日
			, nowDate = 0  //当前年月日
		;
		allowAge = parseFloat( allowAge ) || 18;
		now = typeof now == 'string' ? new Date( now ) : ( now || new Date() );


		if( ! this.isIdCard( id ) ){
			return false ;
		}
		//15位身份证
		if( 15 == id.length ){
			age = '19'+ id.slice(6, 6);
		}else{
			age = id.slice(6, 14);
		}
		// 类型转换 整型
		age = ~~age;
		nowDate = ~~( julyJs.date.format('YYYYMMDD', now) );
		//比较年龄
		if( nowDate - age < allowAge * 1e4 ){
			return false ;
		}
		return true ;
	}
	//浮点数
	, isFloat : function( num ){ //# 是否为 浮点数
		return /^(([1-9]\d*)|(\d+\.\d+)|0)$/.test( num );
	}
	//正整数
	, isInt : function( num ){ //# 是否为 正整数
		return /^[1-9]\d*$/.test( num );
	}
	//是否全为汉字
	, isChinese : function( str ){ //# 是否全为 汉字
		return /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+$/gi.test(str);
	}

};

//####################  字符
julyJs.string = { //# 字符串
	codeHtml : function(content){ //# 转义 HTML 字符
		return this.replace(content, {
			'&'			: "&amp;"
			, '"'		: "&quot;"
			, "'"		: '&#39;'
			, '<'		: "&lt;"
			, '>'		: "&gt;"
			, ' '		: "&nbsp;"
			, '\t'		: "&#09;"
			, '('		: "&#40;"
			, ')'		: "&#41;"
			, '*'		: "&#42;"
			, '+'		: "&#43;"
			, ','		: "&#44;"
			, '-'		: "&#45;"
			, '.'		: "&#46;"
			, '/'		: "&#47;"
			, '?'		: "&#63;"
			, '\\'		: "&#92;"
			, '\n'		: "<br>"
		});
	}
	//重复字符串
	, repeat : function( word, length, end ){ //# 重复字符串
		end = end || ''; //加在末位
		length = ~~length;
		return new Array( length * 1 + 1).join( word ) +''+ end ;
	}
	//增加前缀
	, addPre : function( pre, word, size){ //# 补齐。如给数字前 加 0
		pre = pre || '0';
		size = parseInt( size ) || 0;
		word = String(word || '');
		var length = Math.max(0, size - word.length ) ;
		return this.repeat( pre, length, word );
	}
	//去除两边空格
	, trim : function( text ){ //# 去除两边空格
		return ( text || '' ).replace(/^\s+|\s$/, '');
	}
	//字符串替换
	, replace : function(str, re){ //# 字符串替换
		str = str || '';
		for(var key in re){
			replace(key,re[key]);
		};
		function replace(a,b){
			var arr = str.split(a);
			str = arr.join(b);
		};
		return str;
	}
	, xss : function(str, type){ //# XSS 转义
		//空过滤
		if(!str){
			return str === 0 ? "0" : "";
		}
		switch(type){
			case "html": //过滤html字符串中的XSS
				return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r){
					return "&#" + r.charCodeAt(0) + ";"
				}).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g,"<br />").replace(/\r/g,"<br />");
				break;
			case "htmlEp": //过滤DOM节点属性中的XSS
				return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(r){
					return "&#" + r.charCodeAt(0) + ";"
				});
				break;
			case "url": //过滤url
				return escape(str).replace(/\+/g, "%2B");
				break;
			case "miniUrl":
				return str.replace(/%/g, "%25");
				break;
			case "script":
				return str.replace(/[\\"']/g, function(r){
					return "\\" + r;
				}).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
				break;
			case "reg":
				return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a){
					return "\\" + a;
				});
				break;
			default:
				return escape(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r){
					return "&#" + r.charCodeAt(0) + ";"
				}).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g,"<br />").replace(/\r/g,"<br />");
				break;
		}
	}
	// badword , 过滤敏感词
	//@text : 要过滤的文本 , 类型 ：字符串
	//@words : 敏感词 ，类型，数组, 如 ： ['你妹', '我丢' ,'我靠']
	// 如果 用 正则匹配， text 长度 100万，words 100万，需要 4秒！
	, badWord : function( text, words){ //# 敏感词过滤
		text = String( text || '' );
		words = words || [];
		var reg = new RegExp( words.join('|') , 'g')
			, _self = this ;
		return text.replace( reg, function( $0 ){
			var length = String( $0 || '' ).length ;
			return _self.repeat( '*', length);
		});
	}

};

//###############  加密
julyJs.encrypt = { //# 加密
	md5 : function( words ){  //# md5 哈希算法
		/*
		 * Crypto-JS 3.1.2
		 * http://code.google.com/p/crypto-js
		 */
		var CryptoJS=function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
			g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,g)).finalize(a)}}});var k=m.algo={};return m}(Math);
		(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
					C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);
		return CryptoJS.MD5( words).toString() ;
	}
	// sha1
	, sha1 : function( words ){ //# sha1  哈希算法
		var CryptoJS=function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,f)).finalize(b)}}});var s=p.algo={};return p}(Math);
		(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();
		return CryptoJS.SHA1( words).toString();
	}
	// time33 哈希
	, time33 : function( words ){ //# time33 哈希算法
		words = words || '';
		//哈希time33算法
		for(var i = 0, len = words.length, hash = 5381; i < len; ++i){
			hash += ( hash << 5) + words.charAt(i).charCodeAt();
		};
		return hash & 0x7fffffff;
	}
}


//###############  日期 时间
julyJs.date = { //# 日期时间
	//@s : 开始时间
	//@e : 结束时间
	//@n : 当前时间 , n 的格式为 毫秒数
	isInArea : function(s, e, n){ //# 判断时间区域
		var start = this.parse(s),
			end = this.parse(e),
			now = parseFloat( n ) || new Date()
			;
		start 	= Math.min(start, end);
		end 	= Math.max(start, end);
		return now >= start && now <= end ? true : false;
	}
	//把 字符窜转化为 毫秒
	//@date : 2013-03-02 1:2:2
	, parse : function( date ){ //# 格式化时间
		return Date.parse( date ); //.replace(/-/g, '/')
	}
	//@time , 时间 , 如 new Date('2013/11/10 0:12:12')
	//@pre ， 星期的 前缀，如：周 ，星期
	//@ nums ，如：一二三四五六日
	, getWeek : function( time, pre, nums){ //# 获取星期几
		time    = typeof time == 'string' ? this.parse( time ) : ( time || new Date() );
		pre     = pre || '星期'; //周
		nums    = '日一二三四五六';
		return pre + nums[ time.getDay() ] ;
	}
	//@formatType : YYYY, YY, MM
	//@ time : new Date('2013/11/12')
	//@weeks : 日一二三四五六
	, format : function( formatType, time, weeks){ //格式化输出时间
		var pre = '0'

		;
		formatType  = formatType || 'YYYY-MM-DD'
		weeks = weeks || '日一二三四五六';
		time = time || new Date();

		//格式化时间
		return (formatType || '')
			.replace(/yyyy|YYYY/g   , time.getFullYear())
			.replace(/yy|YY/g       , julyJs.string.addPre( pre, time.getFullYear() % 100), 2	)
			.replace(/mm|MM/g       , julyJs.string.addPre( pre, time.getMonth()+1,2))
			.replace(/m|M/g         , time.getMonth()+1)
			.replace(/dd|DD/g       , julyJs.string.addPre( pre, time.getDate(),2)	)
			.replace(/d|D/g         , time.getDate())
			.replace(/hh|HH/g       , julyJs.string.addPre( pre, time.getHours(),2))
			.replace(/h|H/g         , time.getHours())
			.replace(/ii|II/g       , julyJs.string.addPre( pre, time.getMinutes(),2))
			.replace(/i|I/g         , time.getMinutes())
			.replace(/ss|SS/g       , julyJs.string.addPre( pre, time.getSeconds(),2))
			.replace(/s|S/g         , time.getSeconds())
			.replace(/w/g           , time.getDay())
			.replace(/W/g           , weeks[time.getDay()])
		;
	}
	//倒计时
	, countDown : function( opt ){ //# 倒计时
		var option = {
				nowTime		: 0	//		当前时间, ，2013/02/01 18:30:30
				, endTime	: 0			//截止时间 ，2013/02/01 18:30:30
				, interval	: 1			//间隔回调时间，秒
				, called	: function(day, hour, second, minute ){}//每次回调
				, finaled	: function(){} //完成后回调
			}
			, opts = {}
			, timer = null
		;
		opts = julyJs.extend( option, opt );

		//当前时间
		if( ! opts.nowTime ){
			opts.nowTime = (new Date()).getTime();
		}else{
			opts.nowTime = this.parse( opts.nowTime );
		}
		//当前时间
		if( ! opts.endTime ){
			opts.endTime = (new Date()).getTime();
		}else{
			opts.endTime = this.parse( opts.endTime );
		}

		timer = setInterval( loop , opts.interval * 1e3);
		// 循环
		function loop(){
			var ts = opts.endTime - opts.nowTime //计算剩余的毫秒数
				, dd = parseInt(ts / 8.64e7 )	//计算剩余的天数
				, hh = parseInt(ts / 3.6e7 % 24 )//计算剩余的小时数
				, mm = parseInt(ts / 6e4 % 60 )//计算剩余的分钟数
				, ss = parseInt(ts / 1e3 % 60 )//计算剩余的秒数
			;
			//当前时间递减
			opts.nowTime += opts.interval * 1e3 ;
			if( ts <= 0 ){
				clearInterval(timer);
				opts.finaled();
			}else{
				opts.called(dd, hh, mm, ss);
			}
		}
	}
};
