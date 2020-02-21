/**
 *防抖函数
 */
export function  debounce(func,delay){
  let time = null;
  return function (...args) {
    if(time) clearTimeout(time)
    time = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

/**
 * 将时间戳转化为时间格式的字符串
 * 时间戳：1535694719     北京时间1970年01月01日08时00分00秒起至现在的总【毫秒数】
 *                       使用前先将时间戳*1000转为秒
 * RegExp.$1：与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
 * padStart(length,'x')：通过给字符串前面补x是字符串长度为length
 */
export function dataFormate(data,fmt) {
  //处理年份
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(data.getFullYear()+'').substr(4-RegExp.$1.length))
  }

  //处理其他时间
  let o = {
    'M+': data.getMonth()+1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getMinutes(),
  }

  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + ''
      let length = RegExp.$1.length
      fmt = fmt.replace(RegExp.$1,length === 1 ? str: str.padStart(length,'0'))
    }
  }

  return fmt
}
