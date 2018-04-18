// 引入配置好的axios库
import Axios from './index'
// 定义获取新闻列表接口的方法
function getNewsList(page) {
    return Axios.get('/news/list', {
        // get方法传递params参数对象
        params: {
            channelname: 'shehui',
            page: page,
            limit: 10
        }
    })
}
// 获取图形验证码
function getImgCaptcha() {
    return Axios.get('/img/captcha')
}
// 获取短信验证码
function getSmsCaptcha(captcha, phone) {
    // post请求参数写在第二个参数位置
    return Axios.post('/sms/captcha', {
        type: 'register',
        imgCaptcha: captcha,
        // 此处手机号请填写正确格式手机号
        phone: phone
    })
}
// 获取短信验证码 找回密码
function getSmsCaptchaf(captcha, phone) {
    // post请求参数写在第二个参数位置
    return Axios.post('/sms/captcha', {
        type: 'reset',
        imgCaptcha: captcha,
        // 此处手机号请填写正确格式手机号
        phone: phone
    })
}
//获取短信
function getShortmessage(phone) {
    return Axios.get('/sms/captcha/receive', {
        params: {
            phone: phone,
            type: 'register'
        }
    })
}
//获取短信 找回密码
function getShortmessagef(phone) {
    return Axios.get('/sms/captcha/receive', {
        params: {
            phone: phone,
            type: 'reset'
        }
    })
}
//注册
function postregister(phone, password, smsCaptcha) {
    // post请求参数写在第二个参数位置
    return Axios.post('/account/register', {
        phone: phone,
        password: password,
        smsCaptcha: smsCaptcha
    })
}
//找回密码
function postregisterf(phone, password, smsCaptcha) {
    // post请求参数写在第二个参数位置
    return Axios.post('/account/reset', {
        phone: phone,
        password: password,
        smsCaptcha: smsCaptcha
    })
}
//登录
function postlogin(phone, password) {
    // post请求参数写在第二个参数位置
    return Axios.post('/account/login', {
        phone: phone,
        password: password
    })
}
//获取新闻列表
function getnewlist(channelname, page) {
    return Axios.get('/news/list', {
        params: {
            channelname: channelname,
            page: page,
            limit: '2'
        }
    })
}

//获取新闻详情
function getdetails(id) {
    return Axios.get('/news/details', {
        params: {
            'id': id
        }
    })
}

//关键字搜索
function getKeyword(keyword, page) {
    return Axios.get('/news/search', {
        params: {
            keyword: keyword,
            page: page,
            limit: '2'
        }
    })
}

//热词搜索
function gethotlist() {
    return Axios.get('/hotNews/list', {

    })
}

//评论
function postaddcomments(articleId, content) {
    // post请求参数写在第二个参数位置
    return Axios.post('/comment/add', {
        articleId: articleId,
        content: content,
        token: localStorage.token
    })
}

//评论列表
function getReviewlist(id, page) {
    return Axios.get('/comment/list', {
        params: {
            id: id,
            page: page,
            limit: '1'
        }
    })
}
//评论评论
function postaddcommentsid(commentId, content) {
    // post请求参数写在第二个参数位置
    return Axios.post('/comment/add', {
        commentId: commentId,
        content: content,
        token: localStorage.token
    })
}

//我的消息列表
function getMynews(page) {
    return Axios.get('/message/list', {
        params: {
            token: localStorage.token,
            page: page,
            limit: '3'
        }
    })
}

//点赞
function postaddrate(commentId, rate) {
    // post请求参数写在第二个参数位置
    return Axios.post('/comment/rate', {
        commentId: commentId,
        token: localStorage.token,
        rate: rate
    })
}

//用户评论列表
function getusercomments(page) {
    return Axios.get('/user/comments', {
        params: {
            token: localStorage.token,
            page: page,
            limit: '4'
        }
    })
}

//用户评论列表
function getcommentslevel(commentId) {
    return Axios.get('/comments/level', {
        params: {
            commentId: commentId
        }
    })
}
//我的消息提示
function getmessagecount() {
    return Axios.get('/message/count', {
        params: {
            token: localStorage.token
        }
    })
}
//设置消息已读
function postmessagecheck(commentId) {
    // post请求参数写在第二个参数位置
    return Axios.post('/message/check', {
        commentId: commentId,
        token: localStorage.token,

    })
}

// 导出接口方法
export {
    getNewsList,
    getImgCaptcha,
    getSmsCaptcha,
    getShortmessage,
    postregister,
    postlogin,
    getSmsCaptchaf,
    getShortmessagef,
    postregisterf,
    getnewlist,
    getdetails,
    getKeyword,
    gethotlist,
    postaddcomments,
    getReviewlist,
    postaddcommentsid,
    getMynews,
    postaddrate,
    getusercomments,
    getcommentslevel,
    getmessagecount,
    postmessagecheck

}