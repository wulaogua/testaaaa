const dev = process.env.NODE_ENV === 'development'

// 对象 补齐函数  
function objFor(obj, bcObj) {
  for (let x in bcObj) {
    if (obj[x] == undefined) {
      obj[x] = bcObj[x];
    } else if (obj[x].constructor == Object && bcObj[x].constructor == Object) {
      obj[x] = objFor(obj[x], bcObj[x]);
    }
  }
  return obj;
}

// 时间 格式化处理
function dateFormat(date, fmt='yyyy-MM-dd hh:mm:ss') {
  if(!isNaN(date) && (date+'').length==8){
    let time_y = date.substr(0, 4), time_M = date.substr(4, 2), time_d = date.substr(6, 2)
    date = time_y + '-' + time_M + '-' + time_d
  }else if(!isNaN(date) && (date+'').length==6){
    let time_y = date.substr(0, 4)
    let time_M = date.substr(4, 2)
    date = time_y + '-' + time_M
  }else if(!isNaN(date) && (date+'').length==4){
    let time_y = date.substr(0, 4)
    date = new Date()
    date.setFullYear(time_y)
  }
  var date = new Date(date);
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

// 数组 转 对象数组
function arrToObjArr (data, name='', valueGet) {
  let obj = {}
  // 局部转换
  let nameArr = name
  if (name) {
    if (!(name.constructor == Array)) {
      nameArr = name.split(',')
    }
    setObj()
  }else{
    setObj()
  }
  return obj

  function setObj() {
    data.forEach((val, key) => {
      if (!nameArr) {
        nameArr = Object.keys(val)
      }
      nameArr.forEach((val1) => {
        let value = '', keys = val1
        // 取值
        if (typeof val1 == 'function') {
          let { value: value_1, key: key_1 } = val1(val)
          value = value_1
          keys = key_1
        }else{
          value = valueGet ? valueGet(val, keys) : val[val1]
        }
        // 存值
        if (obj[keys]) {
          obj[keys].push(value)
        }else{
          obj[keys] = []
          obj[keys][key] = value
        }
      })
    })
  }
}

// 前端 Blob 文件流 下载
// data 数据,fileName 文件名(包括后缀)
function downloadBlob(data,fileName,suffix=''){
  const link = document.createElement('a');
  let blob = new Blob([data],{ type: 'application/vnd.ms-excel' });
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = fileName + suffix;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


let timeFunAll = [];  // timeFun 方法使用

// 方法集合
const tools = {
  objFor,
  dateFormat,
  downloadBlob,
  arrToObjArr,
  // 不重要的方法
  timeFun,getId,getDate,
  numStr,arrSum,toFixedNum,numFilt,
  setNumDigit
}

export default tools

// 不是很重要的 方法

/* 数组求和 */
function arrSum (data=[], getNum=()=>{}) {
  let sum = 0
  data.forEach(val => {
    if (isNaN(val)) {
      sum += getNum(val) * 1 || 0
    }else{
      sum += val * 1
    }
  })
  return sum
}
/* 获取时间 单位 秒 */
function getDate(num=0,fmt="yyyy-MM-dd hh:mm:ss"){
  num*=1000;
  let dateTime = new Date();
  let time = dateTime.getTime()*1;
  time+=num;
  if(fmt){
    return datetimeFormat(time,fmt);
  }else{
    return time;
  }
}

// id 
function getId(code=6,fmt=''){
  let time = tools.getDate(0,fmt);
  let numAll = '';
  for(let i=0;i<code;i++){
    let num = Math.ceil(Math.random()*9);
    numAll+=num;
  }
  let id = time+numAll;
  return id;
}
// 一定时间内 不得执行同一个函数
function timeFun(fun=()=>{},params=[],time=500){
  let timeFun = (id)=>{
    return setTimeout(()=>{
      fun(...params);
      timeFunAll.forEach((val,key)=>{ val.id==id?timeFunAll[key]=false:''; })
      closeTimeFunAll();
    },time);
  }
  // play
  if(timeFunAll.length>0){
    let bool = false;
    timeFunAll.forEach(val=>{
      let itemFun = val.fun;
      if(fun==itemFun){ bool=true; clearTimeout(val.timeFun); val.timeFun = timeFun(val.id); }
    })
    if(!bool){
      createTimeFun();
    }
  }else{
    createTimeFun();
  }
  // 
  function createTimeFun(){
    let timeFunObj = {
      id:timeFunAll.length,fun,timeFun: timeFun(timeFunAll.length)
    }
    timeFunAll.push(timeFunObj);
  }
  // 清空
  function closeTimeFunAll(){
    let bool = timeFunAll.some(val=>val);
    bool || (timeFunAll=[]);
  }
}

// 数字 三位 逗号处理
function numStr(num) {
  num += '';
  let arr = num.split('');
  for (let i = arr.length, code = 0; i >= 0; i--) {
    if(isNaN(arr[i-1])){
      code = 0;
      continue;
    }
    if (code != 0 && i!=0 && code % 3 == 0) {
      arr.splice(i, 0, ',');
      i++;
      code = 0;
    }else{
      code++
    }
  }
  return arr.join('');
}

// 保留几位小数
function toFixedNum(num,decimal=2){
  num *= 1
  if (isNaN(num)) { return 0 }
  return num.toFixed(decimal)*1
}

// 普通数值处理
function numFilt (num, decimal=0, fixedIf=false) {
  let val = num ? num*1 : '--', unit = ''
  // 超过1万时
  if (val >= 10000) {
    let numFixed =  decimal&&fixedIf ? decimal : 2
    unit='万'
    val = (val/10000).toFixed(numFixed)*1
    console.log(val, numFixed, 'num112')
  }
  return { val, unit, valUnit: val+unit }
}

// 设置 数字位数
function setNumDigit (num, digit = 2) {
  num += ''
  digit *= 1
  let buNum = digit - num.length
  for(let i = 0; i<buNum; i++) {
    num = '0' + num
  }
  return num
}
