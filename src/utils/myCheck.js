 // 验证邮箱
 export function checkEmail (rule, value, callback) {
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('邮箱不合法'))
    }
}
 
 // 验证手机号
export function checkPhone (rule, value, callback) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('手机号不合法'))
    }
}