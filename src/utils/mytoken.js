const Token='heimamm'
// 本地存储设置token
export function setToken(data){
    window.localStorage.setItem(Token,data)
}
// 本地存储获取token
export function getToken(){
   return window.localStorage.getItem(Token)
}
// 本地存储删除token
export function removeToken(){
    window.localStorage.removeItem(Token)
}