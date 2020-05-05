/*对当前账号进行保存*/

//存
export function saveUser(user){
  localStorage.setItem('userId',JSON.stringify(user))
}

//取
export function getUser(){
  return JSON.parse(localStorage.getItem('userId') || '{}')
}

//删
export function removeUser(){
  localStorage.removeItem('userId')
}