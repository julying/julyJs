julyJs
======

做网站常用的一些Javascript基础函数，现在整理一下，希望抛砖引玉！


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

/*
 ■■■ 函数简介 ■■■
julyJs.version :
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
 　　　　.countDown : 倒计 　　　　时
*/
